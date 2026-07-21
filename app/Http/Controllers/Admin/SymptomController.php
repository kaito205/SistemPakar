<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Symptom;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SymptomController extends Controller
{
    public function index()
    {
        $symptoms = Symptom::orderBy('code')->get()->map(function ($s) {
            return [
                'id' => $s->id,
                'code' => $s->code,
                'name' => $s->name,
                'weight' => (float)$s->expert_cf,
                'desc' => $s->suggestion,
            ];
        });

        return Inertia::render('Admin/Gejala', [
            'symptoms' => $symptoms
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|unique:symptoms,code|max:20',
            'name' => 'required|string|max:255',
            'weight' => 'required|numeric|min:-1|max:1',
            'desc' => 'required|string',
        ]);

        Symptom::create([
            'code' => $validated['code'],
            'name' => $validated['name'],
            'expert_cf' => $validated['weight'],
            'suggestion' => $validated['desc'],
        ]);

        return redirect()->back()->with('success', 'Gejala baru berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'weight' => 'required|numeric|min:-1|max:1',
            'desc' => 'required|string',
        ]);

        $symptom = Symptom::findOrFail($id);

        $symptom->update([
            'name' => $validated['name'],
            'expert_cf' => $validated['weight'],
            'suggestion' => $validated['desc'],
        ]);

        return redirect()->back()->with('success', 'Gejala berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $symptom = Symptom::findOrFail($id);
        $symptom->delete();

        return redirect()->back()->with('success', 'Gejala berhasil dihapus.');
    }
}
