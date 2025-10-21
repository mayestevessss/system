<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Department;
use App\Models\Course;
use App\Models\Faculty;
use App\Models\Student;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Departments
        $deptA = Department::create(['name' => 'Computer Science', 'code' => 'CS']);
        $deptB = Department::create(['name' => 'Education', 'code' => 'EDU']);
        $deptC = Department::create(['name' => 'Business', 'code' => 'BUS']);

        // Courses
        $course1 = Course::create(['name' => 'BS Computer Science', 'code' => 'BSCS', 'department_id' => $deptA->id]);
        $course2 = Course::create(['name' => 'BS Information Technology', 'code' => 'BSIT', 'department_id' => $deptA->id]);
        $course3 = Course::create(['name' => 'Bachelor of Elementary Education', 'code' => 'BEED', 'department_id' => $deptB->id]);
        $course4 = Course::create(['name' => 'BS Business Administration', 'code' => 'BSBA', 'department_id' => $deptC->id]);

        // Faculty sample
        Faculty::create(['first_name'=>'Maria','last_name'=>'Santos','email'=>'maria.santos@example.com','department_id'=>$deptA->id]);
        Faculty::create(['first_name'=>'Jose','last_name'=>'Dela Cruz','email'=>'jose.delacruz@example.com','department_id'=>$deptB->id]);
        Faculty::create(['first_name'=>'Anna','last_name'=>'Lopez','email'=>'anna.lopez@example.com','department_id'=>$deptC->id]);
        Faculty::create(['first_name'=>'Mark','last_name'=>'Reyes','email'=>'mark.reyes@example.com','department_id'=>$deptA->id]);

        // Students sample (create multiple for counts)
        $students = [
            ['first_name'=>'Juan','last_name'=>'Garcia','student_number'=>'S1001','course_id'=>$course1->id],
            ['first_name'=>'Ana','last_name'=>'Velasquez','student_number'=>'S1002','course_id'=>$course1->id],
            ['first_name'=>'Liza','last_name'=>'Torres','student_number'=>'S1003','course_id'=>$course2->id],
            ['first_name'=>'Rex','last_name'=>'Santos','student_number'=>'S1004','course_id'=>$course3->id],
            ['first_name'=>'Mia','last_name'=>'Lopez','student_number'=>'S1005','course_id'=>$course4->id],
        ];

        foreach ($students as $s) {
            Student::create($s);
        }
    }
}
