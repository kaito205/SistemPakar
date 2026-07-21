<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TeamMember;

class TeamMemberSeeder extends Seeder
{
    public function run(): void
    {
        TeamMember::create([
            'name' => 'Ikmal Nurhamdi',
            'role' => 'Ketua Kelompok',
            'bio' => 'Memimpin koordinasi tim, analisis sistem pakar, pengumpulan rules Certainty Factor dan penulisan deskripsi sistem.',
            'initials' => 'IN',
            'image_path' => '/img/ikmal.jpeg',
            'instagram' => 'https://www.instagram.com/ikmalnrhamdi/',
            'github' => 'https://github.com/ikmalnurhamdi',
            'linkedin' => 'https://linkedin.com/in/ikmal-nurhamdi/',
        ]);

        TeamMember::create([
            'name' => 'Muhammad Jaja Maulana',
            'role' => 'Frontend Developer',
            'bio' => 'Mewujudkan arsitektur kode React, integrasi Inertia, desain UI/UX bertema terang yang premium, serta transisi animasi kustom.',
            'initials' => 'MM',
            'image_path' => '/img/jaja.png',
            'instagram' => 'https://www.instagram.com/majmu.io/',
            'github' => 'https://github.com/kaito205',
            'linkedin' => 'https://linkedin.com/in/jajamaulana/',
        ]);

        TeamMember::create([
            'name' => 'Fauzi Gilang Raihan',
            'role' => 'Backend Developer',
            'bio' => 'Merancang struktur database, penanganan data diagnosis, skema kompilasi, serta penyusunan logika controller backend.',
            'initials' => 'FG',
            'image_path' => '/img/gilang.png',
            'instagram' => 'https://www.instagram.com/fauzigilangraihan/',
            'github' => 'https://github.com/',
            'linkedin' => 'https://www.linkedin.com/in/fauzi-g-raihan-6884843aa/',
        ]);

        TeamMember::create([
            'name' => 'Ikhwan Gifari',
            'role' => 'Data Analyst (Pakar)',
            'bio' => 'Mencari data ahli/pakar, menganalisis gejala depresi mahasiswa, merumuskan nilai keyakinan Certainty Factor (MB & MD).',
            'initials' => 'IG',
            'image_path' => '/img/ikhwan.jpeg',
            'instagram' => 'https://www.instagram.com/wan_gifarr/',
            'github' => 'https://github.com/ikhwangifari',
            'linkedin' => 'https://www.linkedin.com/in/ikhwan-gifari25/',
        ]);
    }
}
