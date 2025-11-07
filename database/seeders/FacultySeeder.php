<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Faculty;

class FacultySeeder extends Seeder
{
    public function run(): void
    {
        // ✅ Make seeding idempotent (no duplicate email error)
        Faculty::updateOrCreate(
            ['email' => 'maria.santos@school.edu'],
            [
                'fullname' => 'Prof. Maria Santos',
                'department' => 'College of Education',
                'position' => 'Instructor',
                'gender' => 'F',
                'employee_id' => 'EMP-' . rand(10000, 99999),
                'contact_number' => '09' . str_pad(rand(0, 999999999), 9, '0', STR_PAD_LEFT),
                'is_archived' => false,
            ]
        );

        Faculty::updateOrCreate(
            ['email' => 'john.delacruz@school.edu'],
            [
                'fullname' => 'Dr. John Dela Cruz',
                'department' => 'College of Engineering',
                'position' => 'Dean',
                'gender' => 'M',
                'employee_id' => 'EMP-' . rand(10000, 99999),
                'contact_number' => '09' . str_pad(rand(0, 999999999), 9, '0', STR_PAD_LEFT),
                'is_archived' => false,
            ]
        );
    }
}
