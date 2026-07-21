<?php

namespace Database\Seeders;

use App\Models\Symptom;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SymptomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $symptoms = [
            [
                'code' => 'D1',
                'name' => 'Kesedihan',
                'expert_cf' => 1.0,
                'suggestion' => 'Cobalah untuk menyadari bahwa semua orang pada saat yang berbeda juga mengalami hal yang sama seperti Anda rasakan. Yakinkan diri, cepat atau lambat kesedihan ini akan berakhir.',
            ],
            [
                'code' => 'D2',
                'name' => 'Pesimis',
                'expert_cf' => 0.2,
                'suggestion' => 'Saat keyakinan sudah mantap dalam hati, maka dia akan begitu semangat dalam berikhtiar, optimis, dan menyongsong masa depan yang lebih baik. Masa lalu boleh kelabu. Saat ini mungkin banyak masalah. Tetapi, tidak ada alasan kalau besok akan tetap seperti ini.',
            ],
            [
                'code' => 'D3',
                'name' => 'Kegagalan',
                'expert_cf' => 0.8,
                'suggestion' => 'Bersyukurlah jika anda mengalami kegagalan atau kemalangan. Karena dengan kegagalan anda sedang disiapkan untuk meraih kesuksesan yang lebih besar. Anda akan ditempa untuk menjadi lebih kuat dari sebelumnya.',
            ],
            [
                'code' => 'D4',
                'name' => 'Kehilangan Kenikmatan',
                'expert_cf' => 0.5,
                'suggestion' => 'Mencobalah untuk membuka diri dan menerima masukan dari orang lain, tujuan nya agar kita tidak selalu terdiam karena terpikir sutu masalah.',
            ],
            [
                'code' => 'D5',
                'name' => 'Perasaan Bersalah',
                'expert_cf' => 0.4,
                'suggestion' => 'Perasaan bersalah muncul karena merasa Tertekan karena Berbagai Kewajiban Dalam penyusunan skripsi, dengan ini cobalah anda untuk mencoba dan berpikir positif dan terus mencoba.',
            ],
            [
                'code' => 'D6',
                'name' => 'Perasaan Dihukum',
                'expert_cf' => 0.3,
                'suggestion' => 'Perasaan dihukum muncul karena berawalkan dari kegagalan yang pernah anda alami secara terus menerus, untuk menetralisir itu perlu adanya dukungan dari orang lain, berusahalah terus karena sejatinya itu adalah ujian hidup yang harus anda lewati.',
            ],
            [
                'code' => 'D7',
                'name' => 'Pikiran Bunuh Diri',
                'expert_cf' => 0.8,
                'suggestion' => 'Gunakan kesadaran Anda sebagai manusia utuh. Daripada memikirkan masalah atau pemecahannya, lebih baik kita bergerak ke jalan yang baru: jangan pikirkan masalah itu dulu. Dengan menggunakan kesadaran yang kita miliki, kita harus mengabaikan pikiran yang mengatakan bahwa situasi yang sedang kita hadapi itu sangat "complicated". Ingat bahwa pikiran bukanlah diri kita yang sebenarnya. Dengan prinsip ini, gunakanlah kesadaran kita yang sepenuhnya sebagai ciptaan Allah yang utuh Intinya, kesadaran Anda harus mampu mengatakan, "Ini dapat diatasi".',
            ],
            [
                'code' => 'D8',
                'name' => 'Gelisah',
                'expert_cf' => 0.8,
                'suggestion' => 'Tantangan, pada hakikatnya bukan untuk dihindari, melainkan justru untuk dilakoni. Hidup itu sendiri adalah tantangan, adalah masalah. Mengapa kita mesti menghindar? Di sinilah kadang-kadang kita lupa pada kesejatian diri. Selalu berusaha dan katakan dalam hati ini pasti berahir dengan.',
            ],
            [
                'code' => 'D9',
                'name' => 'Kehilangan Ketertarikan',
                'expert_cf' => 1.0,
                'suggestion' => 'Jangan selalu terdiam karena masalah yang ini, masih banyak yang harus anda lakukan cobalah bangkit "anda masih di tunggu" bangkitlah sekarang!!',
            ],
            [
                'code' => 'D10',
                'name' => 'Keraguan',
                'expert_cf' => 1.0,
                'suggestion' => 'Sebetulnya, semangat yang kuat itu diperlukan untuk mengatasi semua keraguan dan cobaan yang bisa mematikan kesungguhannya untuk mencapai hal-hal penting atau besar yang diinginkannya.',
            ],
            [
                'code' => 'D11',
                'name' => 'Kehilangan Energi',
                'expert_cf' => 0.3,
                'suggestion' => 'Yang pasti, setiap masalah yang nyata, pasti ada pemecahannya, dan tentu saja setiap usaha pasti ada hasilnya. Asal Anda tahu apa yang harus dilakukan, dan kenapa masalah itu terjadi, pemecahan sudah ada di tangan. Anda tinggal menggerakkan diri, perangi segala kemalasan yang membawa kerugian itu.',
            ],
            [
                'code' => 'D12',
                'name' => 'Perubahan Pola Tidur',
                'expert_cf' => 0.8,
                'suggestion' => 'Susah tidur atau Insomnia adalah paduan dari gejala dan akibat dari depresi dan kegelisahan. Karena otak menggunakan "sinyal" serupa untuk mengatur jadwal tidur dan emosi, sangat sulit untuk menentukan mana yang harus dimunculkan lebih dulu.',
            ],
            [
                'code' => 'D13',
                'name' => 'Perubahan Nafsu Makan',
                'expert_cf' => 1.0,
                'suggestion' => 'Pikirkan bagaimana rasa malas ini mempengaruhi kualitas hidup Anda, hubungan Anda, membuat Anda kehilangan kesempatan, kesehatan dan energi yang memburuk. Lalu buat daftar apa saja yang dapat Anda lakukan. Jangan biarkan diri anda tersiksa, anda masih dibutuhkan banyak orang.',
            ],
            [
                'code' => 'D14',
                'name' => 'Sulit Konsentrasi',
                'expert_cf' => 0.4,
                'suggestion' => 'Anda harus belajar untuk mendorong diri sendiri untuk membatasi. Jika Anda menemukan konsentrasi Anda, lakukan trik sederhana tapi manjur ini. Ambillah nafas dalam-dalam dan perlahan. Ketika Anda mengambil nafas seperti itu, seketika itu juga otak Anda terstimulasi masuk pada frekwensi Low beta.',
            ],
            [
                'code' => 'D15',
                'name' => 'Kelelahan',
                'expert_cf' => 0.2,
                'suggestion' => 'Kelelahan anda muncul disebabkan karena pikiran anda yang lelah untuk memikirkan masalah ini. Jadi, cobalah untuk menenangankan diri dangan istirahat atau dengan mencari tempat yang bisa membuat anda tenang untuk sementara waktu.',
            ],
        ];

        foreach ($symptoms as $symptom) {
            Symptom::create($symptom);
        }
    }
}
