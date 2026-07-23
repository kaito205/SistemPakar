<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diagnosis extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'nim',
        'prodi',
        'angkatan',
        'disease_id',
        'score',
        'disease_name',
        'disease_code',
        'answers',
        'solutions',
        'is_read',
    ];

    protected $casts = [
        'answers' => 'array',
        'solutions' => 'array',
        'is_read' => 'boolean',
    ];

    public function disease()
    {
        return $this->belongsTo(Disease::class);
    }
}
