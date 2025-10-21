<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'fullname',
        'email',
        'department',
        'department_id',
        'course',
        'course_id',
        'year_level',
        'contact_number',
        'adviser',
        'gender',
        'is_archived',
    ];

    protected $casts = [
        'is_archived' => 'boolean',
    ];

    /**
     * ✅ Relationship: Student belongs to a Department
     */
    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    /**
     * ✅ Relationship: Student belongs to a Course
     */
    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }
}
