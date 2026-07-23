<?php

namespace Database\Seeders;

use App\Models\Disease;
use App\Models\Rule;
use App\Models\Symptom;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class RuleSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Rule::truncate();
        Schema::enableForeignKeyConstraints();

        $p001 = Disease::where('code', 'P001')->first();
        $p002 = Disease::where('code', 'P002')->first();

        if (!$p001 || !$p002) {
            return;
        }

        $symptoms = Symptom::all()->keyBy('code');

        // Rules for Diabetes Tipe 1 (P001)
        $rulesP001 = [
            'G001' => 1.0,
            'G002' => 1.0,
            'G003' => 1.0,
            'G004' => 0.6,
            'G005' => 0.6,
            'G007' => 0.8,
            'G008' => 0.6,
            'G009' => 0.6,
            'G012' => 0.6,
            'G014' => 0.6,
            'G017' => 0.8,
            'G018' => 0.6,
            'G019' => 0.8,
            'G021' => 1.0,
            'G022' => 0.8,
            'G023' => 1.0,
            'G024' => 0.8,
            'G025' => 0.8,
            'G026' => 0.8,
        ];

        foreach ($rulesP001 as $code => $cfPakar) {
            if (isset($symptoms[$code])) {
                Rule::create([
                    'disease_id' => $p001->id,
                    'symptom_id' => $symptoms[$code]->id,
                    'cf_pakar' => $cfPakar,
                ]);
            }
        }

        // Rules for Diabetes Tipe 2 (P002)
        $rulesP002 = [
            'G001' => 1.0,
            'G002' => 1.0,
            'G003' => 0.8,
            'G004' => 0.6,
            'G005' => 0.6,
            'G006' => 0.8,
            'G007' => 0.8,
            'G008' => 0.6,
            'G009' => 0.6,
            'G010' => 0.8,
            'G011' => 1.0,
            'G012' => 0.6,
            'G013' => 0.8,
            'G014' => 0.6,
            'G015' => 0.6,
            'G016' => 0.6,
            'G017' => 0.8,
            'G018' => 0.6,
            'G019' => 0.8,
            'G020' => 1.0,
        ];

        foreach ($rulesP002 as $code => $cfPakar) {
            if (isset($symptoms[$code])) {
                Rule::create([
                    'disease_id' => $p002->id,
                    'symptom_id' => $symptoms[$code]->id,
                    'cf_pakar' => $cfPakar,
                ]);
            }
        }
    }
}
