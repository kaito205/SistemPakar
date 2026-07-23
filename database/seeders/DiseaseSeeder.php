<?php

namespace Database\Seeders;

use App\Models\Disease;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class DiseaseSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Disease::truncate();
        Schema::enableForeignKeyConstraints();

        $diseases = [
            [
                'code' => 'P001',
                'name' => 'Diabetes Tipe 1',
                'description' => 'Diabetes tipe 1 disebabkan oleh kerusakan sel beta pankreas akibat reaksi autoimun sehingga pankreas tidak dapat menghasilkan hormon insulin secara optimal. Umumnya menyerang penderita pada usia muda (di bawah 20 tahun).',
                'solution' => "1. Terapi insulin seumur hidup sesuai arahan dokter spesialis endokrin.\n2. Pemantauan kadar gula darah secara rutin (glukometer mandiri).\n3. Konsultasi pola makan gizi seimbang dan pengaturan asupan karbohidrat.\n4. Rutin berolahraga dan menjaga pola hidup sehat.",
            ],
            [
                'code' => 'P002',
                'name' => 'Diabetes Tipe 2',
                'description' => 'Diabetes tipe 2 disebabkan oleh resistensi insulin di mana sel-sel tubuh kurang sensitif terhadap insulin sehingga glukosa menumpuk dalam darah. Lebih dari 85% penderita diabetes menderita tipe 2 ini akibat faktor gaya hidup dan obesitas.',
                'solution' => "1. Mengubah gaya hidup menjadi lebih aktif dan rutin berolahraga minimal 30 menit sehari.\n2. Mengurangi konsumsi makanan/minuman manis, gula tinggi, dan makanan cepat saji.\n3. Memperbanyak konsumsi serat seperti sayur dan buah-buahan segar.\n4. Menjaga berat badan ideal dan minum obat penurun gula darah sesuai petunjuk dokter.",
            ],
        ];

        foreach ($diseases as $d) {
            Disease::create($d);
        }
    }
}
