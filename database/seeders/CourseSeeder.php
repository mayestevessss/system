<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        Course::insert([
            ['title' => 'Web Development', 'description' => 'HTML, CSS, JS Basics'],
            ['title' => 'Database Systems', 'description' => 'SQL and Relational Models'],
        ]);
    }
}