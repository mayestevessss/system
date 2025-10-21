<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class ArchiveStudentController extends Controller
{
    // 🟢 Fetch all archived students
    public function index()
    {
        $students = Student::where('is_archived', true)->get();
        return response()->json($students);
    }

    // 🟡 Restore student (unarchive)
    public function restore($id)
    {
        $student = Student::findOrFail($id);
        $student->is_archived = false;
        $student->save();

        return response()->json(['message' => 'Student restored successfully!']);
    }

    // 🔴 Permanently delete student
    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        $student->delete();

        return response()->json(['message' => 'Student permanently deleted!']);
    }
}
