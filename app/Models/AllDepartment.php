<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AllDepartment extends Model
{
    use HasFactory;

    // ✅ Correct table name (with underscore)
    protected $table = 'all_departments';

    protected $fillable = [
        'name',
        'code',
        'description',
    ];

    // ✅ A department has many courses
    public function courses()
    {
        return $this->hasMany(AllCourse::class, 'department_id');
    }
}
