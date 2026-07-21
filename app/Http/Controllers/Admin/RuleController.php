<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Rule;
use App\Models\Symptom;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RuleController extends Controller
{
    public function index()
    {
        $symptoms = Symptom::orderBy('code')->get()->map(function ($s) {
            return [
                'id' => $s->id,
                'code' => $s->code,
                'name' => $s->name,
                'weight' => (float)$s->expert_cf
            ];
        });

        $rules = Rule::with('depressionLevel')->get()->map(function ($rule) {
            // Resolve symptom IDs to symptom codes
            $symptomCodes = Symptom::whereIn('id', $rule->symptom_ids)
                ->orderBy('code')
                ->pluck('code')
                ->toArray();

            $colorMap = [
                'M1' => 'teal',
                'M2' => 'amber',
                'M3' => 'rose'
            ];

            return [
                'id' => $rule->id,
                'code' => $rule->depressionLevel->code,
                'name' => $rule->depressionLevel->name,
                'symptoms' => $symptomCodes,
                'color' => $colorMap[$rule->depressionLevel->code] ?? 'slate',
                'description' => $rule->depressionLevel->description,
            ];
        });

        return Inertia::render('Admin/Aturan', [
            'dbSymptoms' => $symptoms,
            'dbRules' => $rules
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'symptoms' => 'required|array',
            'symptoms.*' => 'string|exists:symptoms,code',
        ]);

        $rule = Rule::findOrFail($id);

        // Resolve symptom codes to symptom IDs
        $symptomIds = Symptom::whereIn('code', $validated['symptoms'])
            ->pluck('id')
            ->toArray();

        $rule->update([
            'symptom_ids' => $symptomIds
        ]);

        return redirect()->back()->with('success', 'Aturan CF berhasil diperbarui.');
    }
}
