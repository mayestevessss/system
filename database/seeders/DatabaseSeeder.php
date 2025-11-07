<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        // Call all individual seeders here
        $this->call([
            StudentSeeder::class,
            FacultySeeder::class,
            CourseSeeder::class,
            SystemSettingsSeeder::class,
        ]);
    }
}
