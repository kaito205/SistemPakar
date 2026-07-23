<?php

namespace Database\Seeders;

use App\Models\Symptom;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class SymptomSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Symptom::truncate();
        Schema::enableForeignKeyConstraints();

        $symptoms = [
            ['code' => 'G001', 'name' => 'Sering buang air kecil (poliuri)', 'description' => 'Kondisi sering buang air kecil terutama di malam hari akibat kadar glukosa tinggi dalam darah.'],
            ['code' => 'G002', 'name' => 'Sering merasa lapar (polifagi)', 'description' => 'Keadaan sering merasa lapar akibat sel tubuh gagal mendapatkan pasokan glukosa yang cukup.'],
            ['code' => 'G003', 'name' => 'Sering merasa haus (polidipsi)', 'description' => 'Rasa haus berlebihan akibat kadar gula menyerap cairan jaringan tubuh.'],
            ['code' => 'G004', 'name' => 'Penglihatan kabur', 'description' => 'Gangguan penglihatan akibat penumpukan cairan pada lensa mata.'],
            ['code' => 'G005', 'name' => 'Berat badan turun drastis', 'description' => 'Penurunan berat badan tanpa sebab yang jelas akibat pemecahan jaringan otot dan lemak.'],
            ['code' => 'G006', 'name' => 'Obesitas', 'description' => 'Kelebihan berat badan yang signifikan yang memicu resistensi insulin.'],
            ['code' => 'G007', 'name' => 'Luka sulit sembuh', 'description' => 'Proses penyembuhan luka yang sangat lambat akibat sirkulasi darah terganggu.'],
            ['code' => 'G008', 'name' => 'Sering merasa lelah', 'description' => 'Rasa lelah dan lemas berlebihan walaupun sudah cukup istirahat.'],
            ['code' => 'G009', 'name' => 'Infeksi kulit berulang', 'description' => 'Kemunculan infeksi pada kulit, bisul, atau jamur secara berulang.'],
            ['code' => 'G010', 'name' => 'Kaki kebas / sering kesemutan', 'description' => 'Rasa kebas, mati rasa, atau kesemutan pada area kaki dan jemari.'],
            ['code' => 'G011', 'name' => 'Usia > 20', 'description' => 'Pasien berusia di atas 20 tahun.'],
            ['code' => 'G012', 'name' => 'Gatal-gatal', 'description' => 'Rasa gatal pada kulit di beberapa bagian tubuh tanpa sebab alergi jelas.'],
            ['code' => 'G013', 'name' => 'Gusi sering infeksi dan luka', 'description' => 'Infeksi, pembengkakan, atau luka berulang pada gusi dan area mulut.'],
            ['code' => 'G014', 'name' => 'Sering mengantuk', 'description' => 'Rasa kantuk berlebihan terutama setelah makan.'],
            ['code' => 'G015', 'name' => 'Mudah terserang influenza', 'description' => 'Daya tahan tubuh menurun sehingga mudah terserang flu dan infeksi ringan.'],
            ['code' => 'G016', 'name' => 'Pendengaran berkurang', 'description' => 'Penurunan daya pendengaran akibat kerusakan syaraf pendengaran.'],
            ['code' => 'G017', 'name' => 'Memiliki keluarga yang terkena diabetes', 'description' => 'Riwayat genetik keluarga (orang tua/saudara) penderita diabetes.'],
            ['code' => 'G018', 'name' => 'Tekanan darah tinggi', 'description' => 'Hipertensi atau tekanan darah di atas rentang normal.'],
            ['code' => 'G019', 'name' => 'Air seni dikerubuti semut', 'description' => 'Adanya kandungan gula tinggi dalam urin sehingga menarik perhatian semut.'],
            ['code' => 'G020', 'name' => 'Acanthosis nigricans (leher menghitam)', 'description' => 'Perubahan warna kulit menjadi gelap kehitaman di lipatan leher atau ketiak.'],
            ['code' => 'G021', 'name' => 'Usia < 20', 'description' => 'Pasien berusia di bawah 20 tahun.'],
            ['code' => 'G022', 'name' => 'Enuresis (mengompol / tidak bisa menahan BAK)', 'description' => 'Kesulitan menahan buang air kecil atau mengompol saat tidur.'],
            ['code' => 'G023', 'name' => 'Hiperglikemia', 'description' => 'Kadar gula darah sewaktu > 200 mg/dl atau puasa >= 126 mg/dl.'],
            ['code' => 'G024', 'name' => 'Nokturia', 'description' => 'Sering terbangun di malam hari hanya untuk buang air kecil.'],
            ['code' => 'G025', 'name' => 'Nafas berbau keton', 'description' => 'Aroma nafas berbau manis atau seperti buah akibat penumpukan keton (ketoasidosis).'],
            ['code' => 'G026', 'name' => 'Mual, muntah, sakit perut', 'description' => 'Gangguan pencernaan berupa mual, muntah, dan nyeri di perut.'],
        ];

        foreach ($symptoms as $s) {
            Symptom::create($s);
        }
    }
}
