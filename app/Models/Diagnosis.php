<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Diagnosis extends Model
{
    protected $table = 'diagnoses';

    protected $fillable = [
        'nama',
        'nim',
        'prodi',
        'angkatan',
        'depression_level_id',
        'score',
        'level_name',
        'level_code',
        'answers',
        'suggestions',
        'is_read',
    ];

    protected $casts = [
        'answers' => 'array',
        'suggestions' => 'array',
        'score' => 'float',
        'is_read' => 'boolean',
    ];

    public function depressionLevel()
    {
        return $this->belongsTo(DepressionLevel::class);
    }
}
