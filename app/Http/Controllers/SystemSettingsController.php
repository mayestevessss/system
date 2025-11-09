<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AllDepartment;
use App\Models\AllCourse;
use App\Models\AllAcademicYear;

class SystemSettingsController extends Controller
{
    // ===== Departments =====
    public function getDepartments()
    {
        return response()->json(AllDepartment::all());
    }

    public function storeDepartment(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:10|unique:all_departments,code',
            'description' => 'nullable|string',
        ]);

        $department = AllDepartment::create($validated);
        return response()->json($department, 201);
    }

    // ===== Courses =====
    public function getCourses()
    {
        return response()->json(AllCourse::with('department')->get());
    }

    public function storeCourse(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:10|unique:all_courses,code',
            'department_id' => 'required|exists:all_departments,id',
            'description' => 'nullable|string',
        ]);

        $course = AllCourse::create($validated);
        return response()->json($course, 201);
    }

    // ===== Academic Years =====
    public function getAcademicYears()
    {
        return response()->json(AllAcademicYear::all());
    }

    public function storeAcademicYear(Request $request)
    {
        $validated = $request->validate([
            'year_name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        $academicYear = AllAcademicYear::create($validated);
        return response()->json($academicYear, 201);
    }
}
