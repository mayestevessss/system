<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Student;

class StudentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $default = [
            [
                'fullname' => 'Remitar, John',
                'email' => 'john@gmail.com',
                'course' => 'BSBA',
                'student_id' => 'STU1001',
                'year_level' => '3rd Year',
                'department' => 'Business Administration',
                'contact_number' => '09171234567',
                'adviser' => 'Prof. Santos',
                'gender' => 'M',
                'is_archived' => false,
            ],
            [
                'fullname' => 'Esteves, May Bellyne',
                'email' => 'may.esteves@gmail.com',
                'course' => 'BSEd',
                'student_id' => 'STU2002',
                'year_level' => '4th Year',
                'department' => 'Education',
                'contact_number' => '09181234567',
                'adviser' => 'Prof. Dela Cruz',
                'gender' => 'F',
                'is_archived' => false,
            ],
            [
                'fullname' => 'Cimafranca, Samantha',
                'email' => 'cimafranca.sam@gmail.com',
                'course' => 'BSIT',
                'student_id' => 'STU3003',
                'year_level' => '4th Year',
                'department' => 'Information Technology',
                'contact_number' => '09384561234',
                'adviser' => 'Prof. Tan',
                'gender' => 'F',
                'is_archived' => false,
            ],
            [
                'fullname' => 'Deloso, John',
                'email' => 'deloso123@gmail.com',
                'course' => 'BSE',
                'student_id' => 'STU4004',
                'year_level' => '2nd Year',
                'department' => 'Engineering',
                'contact_number' => '09231234567',
                'adviser' => 'Prof. Garcia',
                'gender' => 'M',
                'is_archived' => false,
            ],
            [
                'fullname' => 'Caybot, Irah',
                'email' => 'irahcaybot@gmail.com',
                'course' => 'BAS',
                'student_id' => 'STU5005',
                'year_level' => '1st Year',
                'department' => 'Arts and Sciences',
                'contact_number' => '09561234567',
                'adviser' => 'Prof. Ramos',
                'gender' => 'F',
                'is_archived' => false,
            ],
        ];

        foreach ($default as $s) {
            Student::updateOrCreate(['email' => $s['email']], $s);
        }
    }
}
