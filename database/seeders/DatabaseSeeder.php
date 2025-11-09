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
        echo "\n🌱 Starting Database Seeding...\n";
        echo "================================\n\n";

        // Call all individual seeders here
        $this->call([
            UserSeeder::class,              // Admin users
            SystemSettingsSeeder::class,    // Departments, Courses, Academic Years
            StudentSeeder::class,           // Sample students
            FacultySeeder::class,           // Sample faculty
        ]);

        echo "\n================================\n";
        echo "✅ Database seeding completed successfully!\n";
        echo "🚀 You can now login with:\n";
        echo "   Username: admin123\n";
        echo "   Password: admin123\n\n";
    }
}
