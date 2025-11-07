<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AllDepartment;
use App\Models\AllCourse;
use App\Models\AllAcademicYear;

class SystemSettingsSeeder extends Seeder
{
    public function run(): void
    {
        // === Departments ===
        $csd = AllDepartment::updateOrCreate(
            ['code' => 'CSD'],
            [
                'name' => 'Computer Science Department',
                'description' => 'Focuses on computer systems, software, and AI research.',
            ]
        );

        $math = AllDepartment::updateOrCreate(
            ['code' => 'MATH'],
            [
                'name' => 'Mathematics Department',
                'description' => 'Covers pure and applied mathematics studies.',
            ]
        );

        // === Courses ===
        AllCourse::updateOrCreate(
            ['code' => 'BSCS'],
            [
                'name' => 'BS Computer Science',
                'department_id' => $csd->id,
                'description' => 'Covers programming, algorithms, and systems design.',
            ]
        );

        AllCourse::updateOrCreate(
            ['code' => 'BSMATH'],
            [
                'name' => 'BS Mathematics',
                'department_id' => $math->id,
                'description' => 'Focuses on analytical and statistical computation.',
            ]
        );

        // === Academic Years ===
        AllAcademicYear::updateOrCreate(
            ['year_name' => '9 Year Monthsary / 2025'],
            [
                'start_date' => '2025-02-01',
                'end_date' => '2025-12-31',
            ]
        );

        AllAcademicYear::updateOrCreate(
            ['year_name' => '8 Year Monthsary / 2024'],
            [
                'start_date' => '2024-02-01',
                'end_date' => '2024-12-31',
            ]
        );
    }
}
