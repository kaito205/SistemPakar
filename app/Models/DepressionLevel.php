<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DepressionLevel extends Model
{
    protected $fillable = [
        'code',
        'name',
        'description',
    ];

    public function rules()
    {
        return $this->hasMany(Rule::class);
    }
}
