<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Faculty;
use App\Models\Course;
use App\Models\Department;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    /**
     * Display dashboard statistics (students per course & faculty per department).
     */
    public function index(): JsonResponse
    {
        // 🔹 Students per Course
        $studentsPerCourse = Student::query()
            ->selectRaw('course, COUNT(*) as total')
            ->whereNull('is_archived')
            ->orWhere('is_archived', false)
            ->groupBy('course')
            ->pluck('total', 'course');

        // 🔹 Faculty per Department
        $facultyPerDepartment = Faculty::query()
            ->selectRaw('department, COUNT(*) as total')
            ->groupBy('department')
            ->pluck('total', 'department');

        // 🔹 Summary counts
        $summary = [
            'students'     => Student::where('is_archived', false)->count(),
            'faculty'      => Faculty::count(),
            'courses'      => Course::count(),
            'departments'  => Department::count(),
        ];

        return response()->json([
            'success' => true,
            'summary' => $summary,
            'studentsPerCourse' => $studentsPerCourse,
            'facultyPerDepartment' => $facultyPerDepartment,
        ]);
    }
}
