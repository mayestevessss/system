<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;

class ListreportStudentController extends Controller
{
    // ✅ Get all students
    public function index()
    {
        $students = Student::all();
        return response()->json($students);
    }

    // ✅ Update student status (Active / Inactive)
    public function updateStatus(Request $request, $id)
    {
        try {
            $student = Student::findOrFail($id);
            $student->status = $request->input('status');
            $student->save();

            return response()->json([
                'message' => 'Status updated successfully',
                'student' => $student
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong while updating status',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
