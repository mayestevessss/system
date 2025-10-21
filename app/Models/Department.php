<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'code'];

    /**
     * ✅ Relationship: A Department has many Faculty members
     */
    public function faculties()
    {
        return $this->hasMany(Faculty::class);
    }

    /**
     * ✅ Relationship: A Department has many Courses
     */
    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    /**
     * ✅ Relationship: A Department has many Students
     */
    public function students()
    {
        return $this->hasMany(Student::class);
    }
}
