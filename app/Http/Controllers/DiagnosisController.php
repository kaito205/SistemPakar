<?php

namespace App\Http\Controllers;

use App\Models\Diagnosis;
use App\Models\Disease;
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
                'nim' => 'nullable|string|max:50',
                'prodi' => 'nullable|string|max:255',
                'angkatan' => 'nullable|string|max:10',
                'responses' => 'required|array',
                'responses.*.symptom_id' => 'required|exists:symptoms,id',
                'responses.*.user_cf' => 'required|numeric|min:0|max:1',
            ]);

            $userResponses = collect($validated['responses'])->keyBy('symptom_id');
            $diseases = Disease::with(['rules.symptom'])->orderBy('code')->get();

            $results = [];

            foreach ($diseases as $disease) {
                $matchedSymptoms = [];
                $cfCalculatedList = [];

                foreach ($disease->rules as $rule) {
                    $userRes = $userResponses->get($rule->symptom_id);
                    $userCf = $userRes ? (float)$userRes['user_cf'] : 0.0;

                    if ($userCf > 0) {
                        $cfPakar = (float)$rule->cf_pakar;
                        $cfCombinePart = $userCf * $cfPakar;

                        $cfCalculatedList[] = $cfCombinePart;
                        $matchedSymptoms[] = [
                            'symptom_code' => $rule->symptom->code,
                            'symptom_name' => $rule->symptom->name,
                            'user_cf' => $userCf,
                            'cf_pakar' => $cfPakar,
                            'cf_he' => round($cfCombinePart, 4),
                        ];
                    }
                }

                // Combine CFs using Certainty Factor formula: CF_comb = CF_old + CF_new * (1 - CF_old)
                $combinedCf = 0.0;
                if (!empty($cfCalculatedList)) {
                    $combinedCf = $cfCalculatedList[0];
                    for ($i = 1; $i < count($cfCalculatedList); $i++) {
                        $nextCf = $cfCalculatedList[$i];
                        $combinedCf = $combinedCf + $nextCf * (1 - $combinedCf);
                    }
                }

                $percentage = round($combinedCf * 100, 2);

                $results[] = [
                    'disease_id' => $disease->id,
                    'disease_code' => $disease->code,
                    'disease_name' => $disease->name,
                    'description' => $disease->description,
                    'solution' => $disease->solution,
                    'cf' => round($combinedCf, 4),
                    'percentage' => $percentage,
                    'matched_symptoms' => $matchedSymptoms,
                ];
            }

            // Sort results by CF percentage descending
            usort($results, function ($a, $b) {
                return $b['percentage'] <=> $a['percentage'];
            });

            $topResult = $results[0] ?? null;

            if ($topResult && $topResult['percentage'] > 0) {
                $finalDiseaseId = $topResult['disease_id'];
                $finalDiseaseCode = $topResult['disease_code'];
                $finalDiseaseName = $topResult['disease_name'];
                $finalScore = $topResult['percentage'];
                $solutionsList = array_values(array_filter(explode("\n", $topResult['solution'])));
            } else {
                $finalDiseaseId = null;
                $finalDiseaseCode = 'P000';
                $finalDiseaseName = 'Sehat / Tidak Terdeteksi Diabetes';
                $finalScore = 0.0;
                $solutionsList = [
                    'Tidak terdeteksi gejala signifikan diabetes melitus.',
                    'Tetap jaga pola makan seimbang, kurangi konsumsi gula berlebih, dan olahraga teratur.'
                ];
            }

            // Build dictionary of user answers
            $answersDict = [];
            foreach ($userResponses as $symptomId => $resp) {
                if ($resp['user_cf'] > 0) {
                    $sym = Symptom::find($symptomId);
                    if ($sym) {
                        $answersDict[$sym->code] = [
                            'name' => $sym->name,
                            'user_cf' => (float)$resp['user_cf'],
                        ];
                    }
                }
            }

            // Save to database
            $diagnosisLog = Diagnosis::create([
                'nama' => $validated['nama'],
                'nim' => $validated['nim'] ?? '-',
                'prodi' => $validated['prodi'] ?? '-',
                'angkatan' => $validated['angkatan'] ?? '-',
                'disease_id' => $finalDiseaseId,
                'score' => $finalScore,
                'disease_code' => $finalDiseaseCode,
                'disease_name' => $finalDiseaseName,
                'answers' => $answersDict,
                'solutions' => $solutionsList,
            ]);

            return response()->json([
                'success' => true,
                'diagnosis_id' => $diagnosisLog->id,
                'top_result' => $topResult,
                'results' => $results,
                'solutions' => $solutionsList,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat memproses diagnosa: ' . $e->getMessage()
            ], 500);
        }
    }
}
