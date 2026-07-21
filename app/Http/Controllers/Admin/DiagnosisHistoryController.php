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
                'email' => "NIM: {$log->nim} • {$log->prodi} ({$log->angkatan})",
                'date' => $log->created_at->translatedFormat('d F Y, H:i'),
                'score' => (float)$log->score,
                'level' => $log->level_name,
                'type' => $log->level_code,
                'answers' => $log->answers ?: [],
                'suggestions' => $log->suggestions ?: [],
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

        return redirect()->back()->with('success', 'Log diagnosa berhasil dihapus.');
    }
}
