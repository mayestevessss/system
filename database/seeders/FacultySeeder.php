<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Faculty;

class FacultySeeder extends Seeder
{
    public function run(): void
    {
        Faculty::create([
            'fullname' => 'Prof. Maria Santos',
            'email' => 'maria.santos@school.edu',
            'department' => 'College of Education',
            'position' => 'Instructor',
            'gender' => 'F', // ✅ fixed
        ]);

        Faculty::create([
            'fullname' => 'Dr. John Dela Cruz',
            'email' => 'john.delacruz@school.edu',
            'department' => 'College of Engineering',
            'position' => 'Dean',
            'gender' => 'M', // ✅ fixed
        ]);
    }
}
