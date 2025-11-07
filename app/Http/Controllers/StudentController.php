<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class StudentController extends Controller
{
    /**
     * 🧾 GET /api/students
     * Get all active (non-archived) students
     */
    public function index(Request $request)
    {
        $students = Student::where('is_archived', false)
            ->where('status', 'Active')
            ->orderBy('id', 'asc')
            ->get();

        return response()->json($students, 200);
    }

    /**
     * 👁️ GET /api/students/{id}
     */
    public function show($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found.'], 404);
        }

        return response()->json($student, 200);
    }

    /**
     * ➕ POST /api/students
     * Add a new student
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'student_id' => 'nullable|string|max:20|unique:students,student_id',
            'fullname' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
            'department' => 'nullable|string|max:100',
            'course' => 'nullable|string|max:100',
            'year_level' => 'nullable|string|max:50',
            'contact_number' => 'nullable|string|max:20',
            'adviser' => 'nullable|string|max:100',
            'gender' => ['nullable', Rule::in(['M', 'F', 'O'])],
        ]);

        $data['is_archived'] = false;

        $student = Student::create($data);

        return response()->json([
            'message' => 'Student added successfully!',
            'student' => $student
        ], 201);
    }

    /**
     * ✏️ PUT/PATCH /api/students/{id}
     * Update an existing student
     */
    public function update(Request $request, $id)
    {
        $student = Student::find($id);
        if (!$student) {
            return response()->json(['message' => 'Student not found.'], 404);
        }

        $data = $request->validate([
            'student_id' => ['sometimes', 'string', 'max:20', Rule::unique('students')->ignore($student->id)],
            'fullname' => 'sometimes|required|string|max:255',
            'email' => ['sometimes', 'required', 'email', Rule::unique('students')->ignore($student->id)],
            'department' => 'nullable|string|max:100',
            'course' => 'nullable|string|max:100',
            'year_level' => 'nullable|string|max:50',
            'contact_number' => 'nullable|string|max:20',
            'adviser' => 'nullable|string|max:100',
            'gender' => ['nullable', Rule::in(['M', 'F', 'O'])],
        ]);

        $student->update($data);

        return response()->json([
            'message' => 'Student updated successfully!',
            'student' => $student
        ], 200);
    }

    /**
     * 📦 PUT /api/students/{id}/archive
     * Archive a student (move to Archivestu)
     */
    public function archive($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found.'], 404);
        }

        // Mark as archived
        $student->is_archived = true;
        $student->save();

        return response()->json([
            'message' => 'Student archived successfully!',
            'student' => $student
        ], 200);
    }

    /**
     * 🔄 PUT /api/students/{id}/restore
     * Restore a student from archive
     */
    public function restore($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found.'], 404);
        }

        $student->is_archived = false;
        $student->save();

        return response()->json([
            'message' => 'Student restored successfully!',
            'student' => $student
        ], 200);
    }

    /**
     * ❌ DELETE /api/students/{id}
     * Permanently delete a student
     */
    public function destroy($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found.'], 404);
        }

        $student->delete();

        return response()->json(['message' => 'Student permanently deleted.'], 200);
    }

    /**
     * 📂 GET /api/archived-students
     * Show all archived students
     */
    public function archivedList()
    {
        $students = Student::where('is_archived', true)
            ->orderBy('id', 'asc')
            ->get();

        return response()->json($students, 200);
    }

    /**
     * 🔁 PATCH /api/students/{student}/status
     * Update only the student's status field
     */
    public function updateStatus(Request $request, Student $student)
    {
        try {
            $data = $request->validate([
                'status' => 'required|string|in:Active,Inactive',
            ]);

            $student->status = $data['status'];
            $student->save();

            return response()->json([
                'message' => 'Student status updated successfully.',
                'student' => $student
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Invalid status value.',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Error updating student status: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to update student status.'
            ], 500);
        }
    }
}
