<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ListreportStudent;

class ListreportStudentSeeder extends Seeder
{
    public function run(): void
    {
        ListreportStudent::create([
            'student_id' => 'STU-001',
            'fullname' => 'Juan Dela Cruz',
            'course' => 'BSIT',
            'year_level' => '4th Year',
            'status' => 'Active',
        ]);

        ListreportStudent::create([
            'student_id' => 'STU-002',
            'fullname' => 'Maria Santos',
            'course' => 'BSBA',
            'year_level' => '3rd Year',
            'status' => 'Inactive',
        ]);
    }
}
