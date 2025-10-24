<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class ArchiveStudentController extends Controller
{
    /**
     * 🟢 Get all archived students
     */
    public function index()
    {
        $students = Student::where('is_archived', true)->get();
        return response()->json($students, 200);
    }

    /**
     * 🟡 Restore (unarchive) student
     */
    public function restore($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found.'], 404);
        }

        $student->is_archived = false;
        $student->save();

        return response()->json(['message' => 'Student restored successfully!'], 200);
    }

    /**
     * 🔴 Permanently delete student
     */
    public function destroy($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found.'], 404);
        }

        $student->delete();

        return response()->json(['message' => 'Student permanently deleted!'], 200);
    }
}
