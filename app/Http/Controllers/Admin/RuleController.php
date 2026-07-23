<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Disease;
use App\Models\Rule;
use App\Models\Symptom;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RuleController extends Controller
{
    public function index()
    {
        $diseases = Disease::orderBy('code')->get();
        $symptoms = Symptom::orderBy('code')->get();
        $rules = Rule::with(['disease', 'symptom'])->orderBy('id')->get()->map(function ($r) {
            return [
                'id' => $r->id,
                'disease_id' => $r->disease_id,
                'disease_code' => $r->disease->code ?? '',
                'disease_name' => $r->disease->name ?? '',
                'symptom_id' => $r->symptom_id,
                'symptom_code' => $r->symptom->code ?? '',
                'symptom_name' => $r->symptom->name ?? '',
                'cf_pakar' => (float)$r->cf_pakar,
            ];
        });

        return Inertia::render('Admin/Aturan', [
            'diseases' => $diseases,
            'symptoms' => $symptoms,
            'rules' => $rules
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'disease_id' => 'required|exists:diseases,id',
            'symptom_id' => 'required|exists:symptoms,id',
            'cf_pakar' => 'required|numeric|min:0|max:1',
        ]);

        Rule::updateOrCreate(
            [
                'disease_id' => $validated['disease_id'],
                'symptom_id' => $validated['symptom_id'],
            ],
            [
                'cf_pakar' => $validated['cf_pakar'],
            ]
        );

        return redirect()->back()->with('success', 'Aturan Basis Pengetahuan & CF Pakar berhasil disimpan.');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'cf_pakar' => 'required|numeric|min:0|max:1',
        ]);

        $rule = Rule::findOrFail($id);
        $rule->update([
            'cf_pakar' => $validated['cf_pakar'],
        ]);

        return redirect()->back()->with('success', 'Bobot CF Pakar berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $rule = Rule::findOrFail($id);
        $rule->delete();

        return redirect()->back()->with('success', 'Aturan berhasil dihapus.');
    }
}
