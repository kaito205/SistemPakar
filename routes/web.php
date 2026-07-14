<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('User/Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/admin/gejala', function () {
    return Inertia::render('Admin/Gejala');
})->middleware(['auth', 'verified'])->name('admin.gejala');

Route::get('/admin/aturan', function () {
    return Inertia::render('Admin/Aturan');
})->middleware(['auth', 'verified'])->name('admin.aturan');

Route::get('/admin/riwayat', function () {
    return Inertia::render('Admin/Riwayat');
})->middleware(['auth', 'verified'])->name('admin.riwayat');

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
