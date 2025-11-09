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
        echo "🔧 Seeding Departments, Courses, and Academic Years...\n";

        // === Departments ===
        echo "📁 Creating Departments...\n";

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

        $engineering = AllDepartment::updateOrCreate(
            ['code' => 'ENG'],
            [
                'name' => 'Engineering',
                'description' => 'Engineering Department',
            ]
        );

        $businessAdmin = AllDepartment::updateOrCreate(
            ['code' => 'BA'],
            [
                'name' => 'Business Administration',
                'description' => 'Business Administration Department',
            ]
        );

        $artsSciences = AllDepartment::updateOrCreate(
            ['code' => 'AS'],
            [
                'name' => 'Arts and Sciences',
                'description' => 'Arts and Sciences Department',
            ]
        );

        $education = AllDepartment::updateOrCreate(
            ['code' => 'EDUC'],
            [
                'name' => 'Education',
                'description' => 'Education Department',
            ]
        );

        $it = AllDepartment::updateOrCreate(
            ['code' => 'IT'],
            [
                'name' => 'Information Technology',
                'description' => 'Information Technology Department',
            ]
        );

        $collegeEducation = AllDepartment::updateOrCreate(
            ['code' => 'COE'],
            [
                'name' => 'College of Education',
                'description' => 'College of Education',
            ]
        );

        $collegeEngineering = AllDepartment::updateOrCreate(
            ['code' => 'COENG'],
            [
                'name' => 'College of Engineering',
                'description' => 'College of Engineering',
            ]
        );

        $engineeringDept = AllDepartment::updateOrCreate(
            ['code' => 'ENGDEPT'],
            [
                'name' => 'Engineering Department',
                'description' => 'Engineering Department',
            ]
        );

        echo "  ✅ " . AllDepartment::count() . " departments created/updated\n";

        // === Courses ===
        echo "📚 Creating Courses...\n";

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

        AllCourse::updateOrCreate(
            ['code' => 'BSE'],
            [
                'name' => 'BSE',
                'department_id' => $education->id,
                'description' => 'Bachelor of Secondary Education',
            ]
        );

        AllCourse::updateOrCreate(
            ['code' => 'BSBA'],
            [
                'name' => 'BSBA',
                'department_id' => $businessAdmin->id,
                'description' => 'Bachelor of Science in Business Administration',
            ]
        );

        AllCourse::updateOrCreate(
            ['code' => 'BAS'],
            [
                'name' => 'BAS',
                'department_id' => $artsSciences->id,
                'description' => 'Bachelor of Arts and Sciences',
            ]
        );

        AllCourse::updateOrCreate(
            ['code' => 'BSED'],
            [
                'name' => 'BSEd',
                'department_id' => $education->id,
                'description' => 'Bachelor of Science in Education',
            ]
        );

        AllCourse::updateOrCreate(
            ['code' => 'BSIT'],
            [
                'name' => 'BSIT',
                'department_id' => $it->id,
                'description' => 'Bachelor of Science in Information Technology',
            ]
        );

        AllCourse::updateOrCreate(
            ['code' => 'CS'],
            [
                'name' => 'Computer Science',
                'department_id' => $csd->id,
                'description' => 'Computer Science Program',
            ]
        );

        echo "  ✅ " . AllCourse::count() . " courses created/updated\n";

        // === Academic Years ===
        echo "📅 Creating Academic Years...\n";

        AllAcademicYear::updateOrCreate(
            ['year_name' => '2025-2026'],
            [
                'start_date' => '2025-08-01',
                'end_date' => '2026-05-31',
            ]
        );

        AllAcademicYear::updateOrCreate(
            ['year_name' => '2024-2025'],
            [
                'start_date' => '2024-08-01',
                'end_date' => '2025-05-31',
            ]
        );

        echo "  ✅ " . AllAcademicYear::count() . " academic years created/updated\n";
        echo "✅ System settings seeded successfully!\n\n";
    }
}
