<?php

namespace App\Http\Controllers;

use App\Models\DepressionLevel;
use App\Models\Rule;
use App\Models\Symptom;
use Illuminate\Http\Request;

class DiagnosisController extends Controller
{
    public function index()
    {
        $symptoms = Symptom::orderBy('code')->get();
        return response()->json($symptoms);
    }

    public function diagnose(Request $request)
    {
        try {
            $validated = $request->validate([
                'nama' => 'required|string|max:255',
                'nim' => 'required|string|max:50',
                'prodi' => 'required|string|max:255',
                'angkatan' => 'required|string|max:10',
                'responses' => 'required|array',
                'responses.*.symptom_id' => 'required|exists:symptoms,id',
                'responses.*.user_cf' => 'required|numeric|min:-1|max:1',
            ]);

            $responses = collect($validated['responses']);
            $rules = Rule::with('depressionLevel')->get();

            $results = [];

            foreach ($rules as $rule) {
                $symptomCfs = [];

                foreach ($rule->symptom_ids as $symptomId) {
                    $response = $responses->firstWhere('symptom_id', $symptomId);
                    $symptom = Symptom::find($symptomId);

                    if ($response && $symptom) {
                        $cfHe = $response['user_cf'] * $symptom->expert_cf;
                        $symptomCfs[] = $cfHe;
                    }
                }

                if (empty($symptomCfs)) {
                    continue;
                }

                $ruleCf = $this->calculateRuleCf($symptomCfs, $rule->logic);

                if ($ruleCf > 0) {
                    $depressionLevelId = $rule->depression_level_id;

                    if (!isset($results[$depressionLevelId])) {
                        $results[$depressionLevelId] = [
                            'depression_level' => $rule->depressionLevel,
                            'cf' => 0,
                            'matched_symptoms' => [],
                        ];
                    }

                    $results[$depressionLevelId]['cf'] = $this->combineCf(
                        $results[$depressionLevelId]['cf'],
                        $ruleCf
                    );

                    $results[$depressionLevelId]['matched_symptoms'] = array_merge(
                        $results[$depressionLevelId]['matched_symptoms'],
                        $rule->symptom_ids
                    );
                }
            }

            usort($results, function ($a, $b) {
                return $b['cf'] <=> $a['cf'];
            });

            $matchedSymptoms = [];
            foreach ($responses as $response) {
                if ($response['user_cf'] > 0) {
                    $symptom = Symptom::find($response['symptom_id']);
                    if ($symptom) {
                        $matchedSymptoms[] = [
                            'symptom' => $symptom,
                            'user_cf' => $response['user_cf'],
                            'calculated_cf' => $response['user_cf'] * $symptom->expert_cf,
                        ];
                    }
                }
            }

            // Determine final result details for DB storage
            $highestLevelId = null;
            $levelCode = 'Normal';
            $levelName = 'Normal (Tidak Depresi)';
            $score = 0.0;

            if (!empty($results)) {
                $highest = $results[0];
                $highestLevelId = $highest['depression_level']->id;
                $levelCode = $highest['depression_level']->code;
                $score = (float)($highest['cf'] * 100);
            }

            $levelNames = [
                'M1' => 'Depresi Ringan (M1)',
                'M2' => 'Depresi Sedang (M2)',
                'M3' => 'Depresi Berat (M3)',
                'Normal' => 'Normal (Tidak Depresi)'
            ];
            $levelName = $levelNames[$levelCode] ?? $levelName;

            // Compile answers dictionary for easy display on Admin side
            $answers = [];
            foreach ($responses as $response) {
                if ($response['user_cf'] > 0) {
                    $symptom = Symptom::find($response['symptom_id']);
                    if ($symptom) {
                        $answers[$symptom->code] = (float)$response['user_cf'];
                    }
                }
            }

            // Compile recommendations/suggestions
            $suggestions = [];
            foreach ($matchedSymptoms as $item) {
                if (!empty($item['symptom']->suggestion)) {
                    $suggestions[] = $item['symptom']->suggestion;
                }
            }

            // Save to database
            \App\Models\Diagnosis::create([
                'nama' => $validated['nama'],
                'nim' => $validated['nim'],
                'prodi' => $validated['prodi'],
                'angkatan' => $validated['angkatan'],
                'depression_level_id' => $highestLevelId,
                'score' => $score,
                'level_name' => $levelName,
                'level_code' => $levelCode,
                'answers' => $answers,
                'suggestions' => $suggestions,
            ]);

            return response()->json([
                'results' => array_values($results),
                'matched_symptoms' => $matchedSymptoms,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error processing diagnosis: ' . $e->getMessage()
            ], 500);
        }
    }

    private function calculateRuleCf(array $symptomCfs, string $logic): float
    {
        if ($logic === 'AND') {
            return min($symptomCfs);
        } elseif ($logic === 'OR') {
            return max($symptomCfs);
        }
        
        return min($symptomCfs);
    }

    private function combineCf(float $oldCf, float $newCf): float
    {
        return $oldCf + $newCf * (1 - $oldCf);
    }
}
