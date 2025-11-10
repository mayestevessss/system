<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use Illuminate\Http\Request;

class ListInactiveFacultyController extends Controller
{
    /**
     * Return all faculty currently marked as Inactive (and not archived).
     */
    public function index()
    {
        return response()->json(
            Faculty::where('status', 'Inactive')
                ->where('is_archived', false)
                ->orderBy('id', 'asc')
                ->get()
        );
    }

    /**
     * Toggle a faculty's status (default: set back to Active).
     */
    public function updateStatus(Request $request, $id)
    {
        $faculty = Faculty::findOrFail($id);

        $newStatus = $request->input('status', 'Active');
        $faculty->status = $newStatus;
        $faculty->save();

        return response()->json([
            'message' => 'Status updated successfully',
            'faculty' => $faculty,
        ]);
    }
}

