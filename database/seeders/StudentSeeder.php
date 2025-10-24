<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Student;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        // ✅ Clear existing records before seeding
        DB::table('students')->truncate();

        $faker = Faker::create();

        // ✅ Sample departments and courses (no IDs)
        $departments = [
            'Information Technology' => 'BSIT',
            'Business Administration' => 'BSBA',
            'Education' => 'BSEd',
            'Engineering' => 'BSE',
            'Arts and Sciences' => 'BAS',
        ];

        $yearLevels = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
        $genders = ['M', 'F'];

        // ✅ Generate 50 random students
        for ($i = 1; $i <= 50; $i++) {
            $department = array_rand($departments);
            $course = $departments[$department];

            Student::create([
                'student_id' => 'STU' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'fullname' => $faker->lastName . ', ' . $faker->firstName,
                'email' => $faker->unique()->safeEmail(),
                'department' => $department,
                'course' => $course,
                'year_level' => $yearLevels[array_rand($yearLevels)],
                'contact_number' => $faker->phoneNumber(),
                'adviser' => 'Prof. ' . $faker->lastName(),
                'gender' => $genders[array_rand($genders)],
                'is_archived' => false,
            ]);
        }

        // ✅ Add a few specific default entries
        $defaults = [
            [
                'student_id' => 'STU9991',
                'fullname' => 'Remitar, John',
                'email' => 'john@gmail.com',
                'department' => 'Business Administration',
                'course' => 'BSBA',
                'year_level' => '3rd Year',
                'contact_number' => '09171234567',
                'adviser' => 'Prof. Santos',
                'gender' => 'M',
                'is_archived' => false,
            ],
            [
                'student_id' => 'STU9992',
                'fullname' => 'Esteves, May Bellyne',
                'email' => 'may.esteves@gmail.com',
                'department' => 'Education',
                'course' => 'BSEd',
                'year_level' => '2nd Year',
                'contact_number' => '09181234567',
                'adviser' => 'Prof. Dela Cruz',
                'gender' => 'F',
                'is_archived' => false,
            ],
        ];

        foreach ($defaults as $student) {
            Student::updateOrCreate(['email' => $student['email']], $student);
        }
    }
}
