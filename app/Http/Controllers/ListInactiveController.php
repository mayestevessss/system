<?php

namespace App\Http\Controllers;

use App\Models\ListInactive;
use Illuminate\Http\Request;

class ListInactiveController extends Controller
{
    // ✅ Get all inactive students
    public function index()
    {
        $inactiveStudents = \App\Models\Student::where('status', 'Inactive')
            ->where('is_archived', false)
            ->orderBy('id', 'asc')
            ->get();
            
        return response()->json($inactiveStudents);
    }

    // ✅ Add a student to inactive list
    public function store(Request $request)
    {
        $data = $request->validate([
            'student_id' => 'required|string|unique:list_inactive',
            'fullname' => 'required|string',
            'course' => 'required|string',
            'year_level' => 'required|string',
            'status' => 'nullable|string|in:Active,Inactive',
        ]);

        $student = ListInactive::create($data);
        return response()->json($student, 201);
    }

    // ✅ Change student status (Inactive ↔ Active)
    public function updateStatus($id)
    {
        $student = ListInactive::findOrFail($id);

        $student->status = $student->status === 'Inactive' ? 'Active' : 'Inactive';
        $student->save();

        return response()->json([
            'message' => 'Status updated successfully',
            'student' => $student
        ]);
    }

    // ✅ Delete from inactive list
    public function destroy($id)
    {
        $student = ListInactive::findOrFail($id);
        $student->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
