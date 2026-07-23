<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (User::where('email', 'admin@gmail.com')->doesntExist()) {
            User::factory()->create([
                'name' => 'Pakar Admin',
                'email' => 'admin@gmail.com',
                'password' => bcrypt('password'),
            ]);
        }

        $this->call([
            DiseaseSeeder::class,
            SymptomSeeder::class,
            RuleSeeder::class,
            TeamMemberSeeder::class,
        ]);
    }
}
