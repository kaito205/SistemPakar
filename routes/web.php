<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $symptoms = \App\Models\Symptom::orderBy('code')->get()->map(function ($s) {
        return [
            'id' => $s->id,
            'code' => $s->code,
            'name' => $s->name,
            'desc' => $s->description,
        ];
    });

    $diseases = \App\Models\Disease::with(['rules.symptom'])->orderBy('code')->get()->map(function ($d) {
        return [
            'id' => $d->id,
            'code' => $d->code,
            'name' => $d->name,
            'description' => $d->description,
            'solution' => $d->solution,
            'symptomsCount' => $d->rules->count(),
            'symptomCodes' => $d->rules->pluck('symptom.code')->filter()->values()->toArray(),
        ];
    });

    return Inertia::render('User/Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'dbSymptoms' => $symptoms,
        'diseases' => $diseases,
    ]);
});

Route::get('/dashboard', function () {
    $total = \App\Models\Diagnosis::count();
    $p001Count = \App\Models\Diagnosis::where('disease_code', 'P001')->count();
    $p002Count = \App\Models\Diagnosis::where('disease_code', 'P002')->count();
    $healthyCount = \App\Models\Diagnosis::where('disease_code', 'P000')->count();
    
    \Carbon\Carbon::setLocale('id');
    $recentDiagnoses = \App\Models\Diagnosis::orderBy('created_at', 'desc')->take(5)->get()->map(function ($log) {
        return [
            'id' => $log->id,
            'name' => $log->nama,
            'date' => $log->created_at->translatedFormat('d F Y, H:i'),
            'score' => (float)$log->score,
            'disease_name' => $log->disease_name,
            'disease_code' => $log->disease_code,
        ];
    });

    $symptomsCount = \App\Models\Symptom::count();
    $diseasesCount = \App\Models\Disease::count();
    $rulesCount = \App\Models\Rule::count();

    // Last 7 days trend data
    $trendData = [];
    $daysShort = [
        'Mon' => 'Sen',
        'Tue' => 'Sel',
        'Wed' => 'Rab',
        'Thu' => 'Kam',
        'Fri' => 'Jum',
        'Sat' => 'Sab',
        'Sun' => 'Ahd'
    ];
    for ($i = 6; $i >= 0; $i--) {
        $date = \Carbon\Carbon::now()->subDays($i);
        $dayEng = $date->format('D');
        $dayLabel = $daysShort[$dayEng] ?? $dayEng;
        
        $count = \App\Models\Diagnosis::whereDate('created_at', $date->toDateString())->count();
        $visitors = $count > 0 ? (int)($count * 1.4 + rand(2, 5)) : rand(1, 4);

        $trendData[] = [
            'label' => $dayLabel,
            'value' => $visitors,
            'active' => $count
        ];
    }

    return Inertia::render('Admin/Dashboard', [
        'stats' => [
            'total' => $total,
            'p001' => $p001Count,
            'p002' => $p002Count,
            'healthy' => $healthyCount,
        ],
        'recentDiagnoses' => $recentDiagnoses,
        'symptomsCount' => $symptomsCount,
        'diseasesCount' => $diseasesCount,
        'rulesCount' => $rulesCount,
        'trendData' => $trendData
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Admin Routes
Route::get('/admin/penyakit', [\App\Http\Controllers\Admin\DiseaseController::class, 'index'])->middleware(['auth', 'verified'])->name('admin.penyakit');
Route::post('/admin/penyakit', [\App\Http\Controllers\Admin\DiseaseController::class, 'store'])->middleware(['auth', 'verified'])->name('admin.penyakit.store');
Route::put('/admin/penyakit/{id}', [\App\Http\Controllers\Admin\DiseaseController::class, 'update'])->middleware(['auth', 'verified'])->name('admin.penyakit.update');
Route::delete('/admin/penyakit/{id}', [\App\Http\Controllers\Admin\DiseaseController::class, 'destroy'])->middleware(['auth', 'verified'])->name('admin.penyakit.destroy');

Route::get('/admin/gejala', [\App\Http\Controllers\Admin\SymptomController::class, 'index'])->middleware(['auth', 'verified'])->name('admin.gejala');
Route::post('/admin/gejala', [\App\Http\Controllers\Admin\SymptomController::class, 'store'])->middleware(['auth', 'verified'])->name('admin.gejala.store');
Route::put('/admin/gejala/{id}', [\App\Http\Controllers\Admin\SymptomController::class, 'update'])->middleware(['auth', 'verified'])->name('admin.gejala.update');
Route::delete('/admin/gejala/{id}', [\App\Http\Controllers\Admin\SymptomController::class, 'destroy'])->middleware(['auth', 'verified'])->name('admin.gejala.destroy');

Route::get('/admin/aturan', [\App\Http\Controllers\Admin\RuleController::class, 'index'])->middleware(['auth', 'verified'])->name('admin.aturan');
Route::post('/admin/aturan', [\App\Http\Controllers\Admin\RuleController::class, 'store'])->middleware(['auth', 'verified'])->name('admin.aturan.store');
Route::put('/admin/aturan/{id}', [\App\Http\Controllers\Admin\RuleController::class, 'update'])->middleware(['auth', 'verified'])->name('admin.aturan.update');
Route::delete('/admin/aturan/{id}', [\App\Http\Controllers\Admin\RuleController::class, 'destroy'])->middleware(['auth', 'verified'])->name('admin.aturan.destroy');

Route::get('/admin/riwayat', [\App\Http\Controllers\Admin\DiagnosisHistoryController::class, 'index'])->middleware(['auth', 'verified'])->name('admin.riwayat');
Route::delete('/admin/riwayat/{id}', [\App\Http\Controllers\Admin\DiagnosisHistoryController::class, 'destroy'])->middleware(['auth', 'verified'])->name('admin.riwayat.destroy');

Route::post('/admin/notifications/read', function () {
    \App\Models\Diagnosis::where('is_read', false)->update(['is_read' => true]);
    return redirect()->back();
})->middleware(['auth', 'verified'])->name('admin.notifications.read');

// User Diagnosis Routes
Route::get('/diagnosa', function () {
    return Inertia::render('User/DiagnosisForm');
})->name('diagnosa.form');

Route::post('/diagnosa/process', [\App\Http\Controllers\DiagnosisController::class, 'diagnose'])->name('diagnosa.process');

Route::get('/diagnosa/hasil', function () {
    return Inertia::render('User/DiagnosisResult');
})->name('diagnosa.result');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
