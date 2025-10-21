<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'department_id',
    ];

    /**
     * ✅ Relationship: Course belongs to a Department
     */
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    /**
     * ✅ Relationship: Course has many Students
     */
    public function students()
    {
        return $this->hasMany(Student::class);
    }
}
