<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Faculty;

class FacultyController extends Controller
{
    // 📋 Get all active faculties
    public function index()
    {
        $faculties = Faculty::where('is_archived', false)
            ->orderBy('fullname', 'asc')
            ->get();
        return response()->json($faculties, 200);
    }

    // ➕ Add new faculty
    public function store(Request $request)
    {
        $validated = $request->validate([
            'fullname' => 'required|string|max:255',
            'email' => 'required|email|unique:faculties,email',
            'department' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'gender' => 'required|in:Male,Female,M,F',
        ]);

        if ($validated['gender'] === 'M') $validated['gender'] = 'Male';
        if ($validated['gender'] === 'F') $validated['gender'] = 'Female';

        $faculty = Faculty::create($validated);

        return response()->json([
            'message' => '✅ Faculty added successfully!',
            'faculty' => $faculty,
        ], 201);
    }

    // 👁️ Show faculty
    public function show($id)
    {
        $faculty = Faculty::find($id);
        if (!$faculty) {
            return response()->json(['message' => '❌ Faculty not found.'], 404);
        }
        return response()->json($faculty, 200);
    }

    // ✏️ Update faculty
    public function update(Request $request, $id)
    {
        $faculty = Faculty::find($id);
        if (!$faculty) {
            return response()->json(['message' => '❌ Faculty not found.'], 404);
        }

        $validated = $request->validate([
            'fullname' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:faculties,email,' . $faculty->id,
            'department' => 'sometimes|string|max:255',
            'position' => 'sometimes|string|max:255',
            'gender' => 'sometimes|in:Male,Female,M,F',
        ]);

        if (isset($validated['gender'])) {
            if ($validated['gender'] === 'M') $validated['gender'] = 'Male';
            if ($validated['gender'] === 'F') $validated['gender'] = 'Female';
        }

        $faculty->update($validated);

        return response()->json([
            'message' => '✅ Faculty updated successfully!',
            'faculty' => $faculty,
        ], 200);
    }

    // 🗑️ Delete faculty (permanent delete)
    public function destroy($id)
    {
        $faculty = Faculty::find($id);
        if (!$faculty) {
            return response()->json(['message' => '❌ Faculty not found.'], 404);
        }

        $faculty->delete();
        return response()->json(['message' => '🗑️ Faculty deleted successfully!'], 200);
    }

    // 📦 Archive faculty
    public function archive($id)
    {
        $faculty = Faculty::find($id);
        if (!$faculty) {
            return response()->json(['message' => '❌ Faculty not found.'], 404);
        }

        $faculty->is_archived = true;
        $faculty->save();

        return response()->json(['message' => '📦 Faculty archived successfully!'], 200);
    }

    // 🔁 Restore faculty
    public function restore($id)
    {
        $faculty = Faculty::find($id);
        if (!$faculty) {
            return response()->json(['message' => '❌ Faculty not found.'], 404);
        }

        $faculty->is_archived = false;
        $faculty->save();

        return response()->json(['message' => '♻️ Faculty restored successfully!'], 200);
    }

    // 🗃️ Get archived faculties
    public function getArchived()
    {
        $faculties = Faculty::where('is_archived', true)
            ->orderBy('fullname', 'asc')
            ->get();

        return response()->json($faculties, 200);
    }
}
