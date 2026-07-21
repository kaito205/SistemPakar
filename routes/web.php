<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $symptoms = \App\Models\Symptom::orderBy('code')->get()->map(function ($s) {
        return [
            'code' => $s->code,
            'name' => $s->name,
            'desc' => $s->suggestion,
        ];
    });

    // Load M1 rule symptom codes
    $m1Rule = \App\Models\Rule::whereHas('depressionLevel', function ($q) {
        $q->where('code', 'M1');
    })->first();
    $m1Codes = $m1Rule ? \App\Models\Symptom::whereIn('id', $m1Rule->symptom_ids)->orderBy('code')->pluck('code')->implode(', ') : 'D2, D13';

    // Load M2 rule symptom codes
    $m2Rule = \App\Models\Rule::whereHas('depressionLevel', function ($q) {
        $q->where('code', 'M2');
    })->first();
    $m2Codes = '10 Gejala';
    if ($m2Rule) {
        $codes = \App\Models\Symptom::whereIn('id', $m2Rule->symptom_ids)->orderBy('code')->pluck('code')->toArray();
        if (count($codes) > 0) {
            $m2Codes = count($codes) . " Gejala (" . implode(', ', array_slice($codes, 0, 2)) . "...)";
        }
    }

    // Load M3 rule symptom codes
    $m3Rule = \App\Models\Rule::whereHas('depressionLevel', function ($q) {
        $q->where('code', 'M3');
    })->first();
    $m3Codes = $m3Rule ? \App\Models\Symptom::whereIn('id', $m3Rule->symptom_ids)->orderBy('code')->pluck('code')->implode(', ') : 'D4, D7, D9';

    $teamMembers = \App\Models\TeamMember::orderBy('id')->get()->map(function ($member) {
        return [
            'id' => $member->id,
            'name' => $member->name,
            'role' => $member->role,
            'bio' => $member->bio,
            'initials' => $member->initials,
            'imagePath' => $member->image_path,
            'socials' => [
                'instagram' => $member->instagram,
                'github' => $member->github,
                'linkedin' => $member->linkedin,
            ]
        ];
    });

    return Inertia::render('User/Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'dbSymptoms' => $symptoms,
        'levelRules' => [
            'M1' => $m1Codes,
            'M2' => $m2Codes,
            'M3' => $m3Codes,
        ],
        'teamMembers' => $teamMembers
    ]);
});

Route::get('/dashboard', function () {
    $total = \App\Models\Diagnosis::count();
    $m1Count = \App\Models\Diagnosis::where('level_code', 'M1')->count();
    $m2Count = \App\Models\Diagnosis::where('level_code', 'M2')->count();
    $m3Count = \App\Models\Diagnosis::where('level_code', 'M3')->count();
    
    \Carbon\Carbon::setLocale('id');
    $recentDiagnoses = \App\Models\Diagnosis::orderBy('created_at', 'desc')->take(5)->get()->map(function ($log) {
        return [
            'id' => $log->id,
            'name' => $log->nama,
            'date' => $log->created_at->translatedFormat('d F Y, H:i'),
            'score' => (float)$log->score,
            'level' => $log->level_name,
            'type' => $log->level_code,
        ];
    });

    $symptomsCount = \App\Models\Symptom::count();
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
            'm1' => $m1Count,
            'm2' => $m2Count,
            'm3' => $m3Count,
        ],
        'recentDiagnoses' => $recentDiagnoses,
        'symptomsCount' => $symptomsCount,
        'rulesCount' => $rulesCount,
        'trendData' => $trendData
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/admin/gejala', [\App\Http\Controllers\Admin\SymptomController::class, 'index'])->middleware(['auth', 'verified'])->name('admin.gejala');
Route::post('/admin/gejala', [\App\Http\Controllers\Admin\SymptomController::class, 'store'])->middleware(['auth', 'verified'])->name('admin.gejala.store');
Route::put('/admin/gejala/{id}', [\App\Http\Controllers\Admin\SymptomController::class, 'update'])->middleware(['auth', 'verified'])->name('admin.gejala.update');
Route::delete('/admin/gejala/{id}', [\App\Http\Controllers\Admin\SymptomController::class, 'destroy'])->middleware(['auth', 'verified'])->name('admin.gejala.destroy');

Route::get('/admin/aturan', [\App\Http\Controllers\Admin\RuleController::class, 'index'])->middleware(['auth', 'verified'])->name('admin.aturan');
Route::put('/admin/aturan/{id}', [\App\Http\Controllers\Admin\RuleController::class, 'update'])->middleware(['auth', 'verified'])->name('admin.aturan.update');

Route::get('/admin/riwayat', [\App\Http\Controllers\Admin\DiagnosisHistoryController::class, 'index'])->middleware(['auth', 'verified'])->name('admin.riwayat');
Route::delete('/admin/riwayat/{id}', [\App\Http\Controllers\Admin\DiagnosisHistoryController::class, 'destroy'])->middleware(['auth', 'verified'])->name('admin.riwayat.destroy');

Route::get('/admin/tim', [\App\Http\Controllers\Admin\TeamController::class, 'index'])->middleware(['auth', 'verified'])->name('admin.tim');
Route::post('/admin/tim', [\App\Http\Controllers\Admin\TeamController::class, 'store'])->middleware(['auth', 'verified'])->name('admin.tim.store');
Route::put('/admin/tim/{id}', [\App\Http\Controllers\Admin\TeamController::class, 'update'])->middleware(['auth', 'verified'])->name('admin.tim.update');
Route::delete('/admin/tim/{id}', [\App\Http\Controllers\Admin\TeamController::class, 'destroy'])->middleware(['auth', 'verified'])->name('admin.tim.destroy');

Route::post('/admin/notifications/read', function () {
    \App\Models\Diagnosis::where('is_read', false)->update(['is_read' => true]);
    return redirect()->back();
})->middleware(['auth', 'verified'])->name('admin.notifications.read');

Route::get('/diagnosa', function () {
    return Inertia::render('User/DiagnosisForm');
})->name('diagnosa.form');

Route::get('/diagnosa/hasil', function () {
    return Inertia::render('User/DiagnosisResult');
})->name('diagnosa.result');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
