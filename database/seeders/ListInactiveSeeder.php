<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ListInactive;

class ListInactiveSeeder extends Seeder
{
    public function run(): void
    {
        ListInactive::create([
            'student_id' => '2025-001',
            'fullname' => 'Juan Dela Cruz',
            'course' => 'BSIT',
            'year_level' => '3rd Year',
            'status' => 'Inactive',
        ]);

        ListInactive::create([
            'student_id' => '2025-002',
            'fullname' => 'Maria Santos',
            'course' => 'BSCS',
            'year_level' => '2nd Year',
            'status' => 'Inactive',
        ]);
    }
}
