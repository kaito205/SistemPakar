<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Symptom extends Model
{
    protected $fillable = [
        'code',
        'name',
        'expert_cf',
        'suggestion',
    ];

    protected $casts = [
        'expert_cf' => 'decimal:2',
    ];
}
