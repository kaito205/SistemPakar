<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Diagnosis;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DiagnosisHistoryController extends Controller
{
    public function index()
    {
        Carbon::setLocale('id');
        
        $diagnoses = Diagnosis::orderBy('created_at', 'desc')->get()->map(function ($log) {
            return [
                'id' => $log->id,
                'name' => $log->nama,
                'identity' => ($log->nim && $log->nim !== '-') ? "NIM: {$log->nim} • {$log->prodi} ({$log->angkatan})" : "Pengunjung Umum",
                'date' => $log->created_at->translatedFormat('d F Y, H:i'),
                'score' => (float)$log->score,
                'disease_name' => $log->disease_name,
                'disease_code' => $log->disease_code,
                'answers' => $log->answers ?: [],
                'solutions' => $log->solutions ?: [],
            ];
        });

        return Inertia::render('Admin/Riwayat', [
            'logs' => $diagnoses
        ]);
    }

    public function destroy($id)
    {
        $diagnosis = Diagnosis::findOrFail($id);
        $diagnosis->delete();

        return redirect()->back()->with('success', 'Log riwayat diagnosa berhasil dihapus.');
    }
}
