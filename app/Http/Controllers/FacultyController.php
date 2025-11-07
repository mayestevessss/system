<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class FacultyController extends Controller
{
    /**
     * 📋 Display all active (non-archived) faculty records.
     */
    public function index()
    {
        $faculties = Faculty::where('is_archived', false)->get();
        return response()->json($faculties, 200);
    }

    /**
     * 🔍 Display a single faculty record by ID.
     */
    public function show($id)
    {
        $faculty = Faculty::find($id);

        if (!$faculty) {
            return response()->json(['message' => 'Faculty not found'], 404);
        }

        // ✅ Return only the essential fields — no department_id or timestamps
        return response()->json([
            'id' => $faculty->id,
            'fullname' => $faculty->fullname,
            'email' => $faculty->email,
            'department' => $faculty->department,
            'position' => $faculty->position,
            'gender' => $faculty->gender,
            'contact_number' => $faculty->contact_number,
        ]);
    }

    /**
     * 🆕 Store a new faculty record with full validation.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'fullname' => 'required|string|max:255',
                'email' => 'required|email|unique:faculties,email',
                'department' => 'required|string|max:255',
                'position' => 'required|string|max:255',
                'gender' => 'required|in:M,F',
                'contact_number' => [
                    'required',
                    'regex:/^09\d{9}$/', // ✅ must start with 09 and have exactly 11 digits
                ],
            ], [
                'contact_number.regex' => 'The contact number must start with 09 and contain exactly 11 digits.',
            ]);

            $faculty = Faculty::create($validated);

            return response()->json([
                'message' => '✅ Faculty added successfully.',
                'faculty' => $faculty,
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while adding faculty.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * ✏️ Update an existing faculty record.
     */
    public function update(Request $request, $id)
    {
        $faculty = Faculty::findOrFail($id);

        try {
            $validated = $request->validate([
                'fullname' => 'required|string|max:255',
                'email' => 'required|email|unique:faculties,email,' . $faculty->id,
                'department' => 'required|string|max:255',
                'position' => 'required|string|max:255',
                'gender' => 'required|in:M,F',
                'contact_number' => [
                    'required',
                    'regex:/^09\d{9}$/',
                ],
            ], [
                'contact_number.regex' => 'The contact number must start with 09 and contain exactly 11 digits.',
            ]);

            $faculty->update($validated);

            return response()->json([
                'message' => '✅ Faculty updated successfully.',
                'faculty' => $faculty,
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while updating faculty.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * 🗃️ Archive a faculty (soft delete).
     */
    public function archive($id)
    {
        $faculty = Faculty::findOrFail($id);
        $faculty->update([
            'is_archived' => true,
            'status' => 'Inactive'
        ]);

        return response()->json(['message' => '✅ Faculty archived successfully.'], 200);
    }

    /**
     * ♻️ Restore an archived faculty.
     */
    public function restore($id)
    {
        $faculty = Faculty::findOrFail($id);
        $faculty->update([
            'is_archived' => false,
            'status' => 'Active'
        ]);

        return response()->json(['message' => '✅ Faculty restored successfully.'], 200);
    }

    /**
     * 🧾 Get all archived faculties.
     */
    public function getArchived()
    {
        $archived = Faculty::where('is_archived', true)->get();
        return response()->json($archived, 200);
    }

    /**
     * ❌ Permanently delete a faculty.
     */
    public function destroy($id)
    {
        $faculty = Faculty::findOrFail($id);
        $faculty->delete();

        return response()->json(['message' => '✅ Faculty deleted successfully.'], 200);
    }
}
