<?php

namespace Database\Seeders;

use App\Models\DepressionLevel;
use App\Models\Rule;
use App\Models\Symptom;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepressionLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $depressionLevels = [
            [
                'code' => 'M1',
                'name' => 'Depresi Ringan (Mild Depression)',
                'description' => 'Pada depresi ringan, mood yang rendah datang dan pergi dan penyakit datang setelah kejadian stressfull yang spesifik. Individu akan merasa cemas dan juga tidak bersemangat. Perubahan gaya hidup biasanya dibutuhkan untuk mengurangi depresi jenis ini.',
            ],
            [
                'code' => 'M2',
                'name' => 'Depresi Sedang (Moderate Depression)',
                'description' => 'Pada depresi sedang mood yang rendah berlangsung terus dan individu mengalami simtom fisik juga walaupun berbeda-beda tiap individu. Perubahan gaya hidup saja tidak cukup dan bantuan diperlukan untuk mengatasinya.',
            ],
            [
                'code' => 'M3',
                'name' => 'Depresi Berat (Severe Depression)',
                'description' => 'Depresi berat adalah penyakit yang tingkat depresinya parah. Individu akan mengalami gangguan dalam kemampuan untuk bekerja, tidur, makan, dan menikmati hal yang menyenangkan dan penting untuk mendapatkan bantuan medis secepat mungkin.',
            ],
        ];

        foreach ($depressionLevels as $level) {
            DepressionLevel::create($level);
        }

        $this->createRules();
    }

    private function createRules()
    {
        $m1 = DepressionLevel::where('code', 'M1')->first();
        $m2 = DepressionLevel::where('code', 'M2')->first();
        $m3 = DepressionLevel::where('code', 'M3')->first();

        $d2 = Symptom::where('code', 'D2')->first();
        $d13 = Symptom::where('code', 'D13')->first();

        $d1 = Symptom::where('code', 'D1')->first();
        $d3 = Symptom::where('code', 'D3')->first();
        $d5 = Symptom::where('code', 'D5')->first();
        $d6 = Symptom::where('code', 'D6')->first();
        $d8 = Symptom::where('code', 'D8')->first();
        $d10 = Symptom::where('code', 'D10')->first();
        $d11 = Symptom::where('code', 'D11')->first();
        $d12 = Symptom::where('code', 'D12')->first();
        $d14 = Symptom::where('code', 'D14')->first();
        $d15 = Symptom::where('code', 'D15')->first();

        $d4 = Symptom::where('code', 'D4')->first();
        $d7 = Symptom::where('code', 'D7')->first();
        $d9 = Symptom::where('code', 'D9')->first();

        Rule::create([
            'depression_level_id' => $m1->id,
            'symptom_ids' => [$d2->id, $d13->id],
            'logic' => 'AND',
        ]);

        Rule::create([
            'depression_level_id' => $m2->id,
            'symptom_ids' => [$d1->id, $d3->id, $d5->id, $d6->id, $d8->id, $d10->id, $d11->id, $d12->id, $d14->id, $d15->id],
            'logic' => 'AND',
        ]);

        Rule::create([
            'depression_level_id' => $m3->id,
            'symptom_ids' => [$d4->id, $d7->id, $d9->id],
            'logic' => 'AND',
        ]);
    }
}
