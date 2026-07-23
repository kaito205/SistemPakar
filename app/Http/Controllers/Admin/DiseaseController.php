<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Disease;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DiseaseController extends Controller
{
    public function index()
    {
        $diseases = Disease::withCount('rules')->orderBy('code')->get();
        return Inertia::render('Admin/Penyakit', [
            'diseases' => $diseases
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|unique:diseases,code',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'solution' => 'nullable|string',
        ]);

        Disease::create($validated);

        return redirect()->back()->with('message', 'Penyakit berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $disease = Disease::findOrFail($id);

        $validated = $request->validate([
            'code' => 'required|string|unique:diseases,code,' . $id,
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'solution' => 'nullable|string',
        ]);

        $disease->update($validated);

        return redirect()->back()->with('message', 'Penyakit berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $disease = Disease::findOrFail($id);
        $disease->delete();

        return redirect()->back()->with('message', 'Penyakit berhasil dihapus.');
    }
}
