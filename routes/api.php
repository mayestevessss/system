<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    DashboardController,
    ProfileController,
    StudentController,
    ArchiveStudentController,
    FacultyController
};

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Organized backend routes by feature group:
| - Dashboard
| - Profile Management
| - Student Management
| - Archived Students
| - Faculty Management
|
*/

// ✅ Default Authenticated User (for Laravel Sanctum)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// 📊 DASHBOARD
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');

// 👤 PROFILE MANAGEMENT
Route::prefix('profile')->group(function () {
    Route::post('/login', [ProfileController::class, 'login'])->name('profile.login');
    Route::get('/{id}', [ProfileController::class, 'show'])->name('profile.show');
    Route::put('/{id}', [ProfileController::class, 'update'])->name('profile.update');
});

// 🎓 STUDENT MANAGEMENT
Route::prefix('students')->group(function () {
    Route::get('/', [StudentController::class, 'index'])->name('students.index');          // GET all students
    Route::post('/', [StudentController::class, 'store'])->name('students.store');         // POST create student
    Route::get('/{id}', [StudentController::class, 'show'])->name('students.show');        // GET single student
    Route::put('/{id}', [StudentController::class, 'update'])->name('students.update');    // PUT update student
    Route::patch('/{id}', [StudentController::class, 'update'])->name('students.patch');   // PATCH update student
    Route::patch('/{id}/archive', [StudentController::class, 'toggleArchive'])->name('students.archive'); // Archive/unarchive
    Route::delete('/{id}', [StudentController::class, 'destroy'])->name('students.destroy'); // DELETE student
});

// 🗃️ ARCHIVED STUDENTS
Route::prefix('archived-students')->group(function () {
    Route::get('/', [ArchiveStudentController::class, 'index'])->name('archived.index');
    Route::put('/{id}/restore', [ArchiveStudentController::class, 'restore'])->name('archived.restore');
    Route::delete('/{id}', [ArchiveStudentController::class, 'destroy'])->name('archived.destroy');
});

// 👩‍🏫 FACULTY MANAGEMENT
Route::prefix('faculties')->group(function () {
    Route::get('/', [FacultyController::class, 'index'])->name('faculties.index');
    Route::get('/archived', [FacultyController::class, 'getArchived'])->name('faculties.archived');
    Route::post('/', [FacultyController::class, 'store'])->name('faculties.store');
    Route::get('/{id}', [FacultyController::class, 'show'])->name('faculties.show');
    Route::put('/{id}', [FacultyController::class, 'update'])->name('faculties.update');
    Route::patch('/{id}/archive', [FacultyController::class, 'archive'])->name('faculties.archive');
    Route::patch('/{id}/restore', [FacultyController::class, 'restore'])->name('faculties.restore');
    Route::delete('/{id}', [FacultyController::class, 'destroy'])->name('faculties.destroy');
});
