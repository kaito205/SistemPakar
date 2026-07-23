<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('diagnoses', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('nim')->nullable();
            $table->string('prodi')->nullable();
            $table->string('angkatan')->nullable();
            $table->foreignId('disease_id')->nullable()->constrained('diseases')->onDelete('set null');
            $table->float('score');
            $table->string('disease_code');
            $table->string('disease_name');
            $table->json('answers');
            $table->json('solutions')->nullable();
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diagnoses');
    }
};
