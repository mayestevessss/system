<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class ListInactiveController extends Controller
{
    /**
     * Return all students currently marked as Inactive (and not archived).
     */
    public function index()
    {
        return response()->json(
            Student::where('status', 'Inactive')
                ->where('is_archived', false)
                ->orderBy('id', 'asc')
                ->get()
        );
    }

    /**
     * Toggle a student's status (default: set back to Active).
     */
    public function updateStatus(Request $request, $id)
    {
        $student = Student::findOrFail($id);

        $newStatus = $request->input('status', 'Active');
        $student->status = $newStatus;
        $student->save();

        return response()->json([
            'message' => 'Status updated successfully',
            'student' => $student,
        ]);
    }
}
