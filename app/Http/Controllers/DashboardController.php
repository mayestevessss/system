<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Faculty;
use App\Models\AllCourse;
use App\Models\AllDepartment;
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
            ->where(function($query) {
                $query->whereNull('is_archived')
                      ->orWhere('is_archived', false);
            })
            ->groupBy('course')
            ->pluck('total', 'course');

        // 🔹 Faculty per Department (exclude archived)
        $facultyPerDepartment = Faculty::query()
            ->selectRaw('department, COUNT(*) as total')
            ->where(function($query) {
                $query->whereNull('is_archived')
                      ->orWhere('is_archived', false);
            })
            ->groupBy('department')
            ->pluck('total', 'department');

        // 🔹 Summary counts
        $summary = [
            'students'     => Student::where('is_archived', false)->count(),
            'faculty'      => Faculty::where('is_archived', false)->count(),
            'courses'      => AllCourse::count(),
            'departments'  => AllDepartment::count(),
        ];

        return response()->json([
            'success' => true,
            'summary' => $summary,
            'studentsPerCourse' => $studentsPerCourse,
            'facultyPerDepartment' => $facultyPerDepartment,
        ]);
    }
}
