<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rule extends Model
{
    protected $fillable = [
        'depression_level_id',
        'symptom_ids',
        'logic',
    ];

    protected $casts = [
        'symptom_ids' => 'array',
    ];

    public function depressionLevel()
    {
        return $this->belongsTo(DepressionLevel::class);
    }
}
