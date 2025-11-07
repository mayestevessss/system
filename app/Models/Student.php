<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{

    /**
     * ✅ Columns that can be mass-assigned (fillable)
     */
    protected $fillable = [
        'student_id',
        'fullname',
        'email',
        'department', // Department name as text
        'course',     // Course name as text
        'year_level',
        'contact_number',
        'adviser',
        'gender',
        'is_archived',
        'status',
    ];

    /**
     * ✅ Automatically cast specific attributes
     */
    protected $casts = [
        'is_archived' => 'boolean',
    ];

    /**
     * 🧹 Helper to check archive status
     */
    public function isArchived()
    {
        return $this->is_archived === true;
    }
}
