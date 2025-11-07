<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AllCourse extends Model
{
    use HasFactory;

    // ✅ Correct table name
    protected $table = 'all_courses';

    protected $fillable = [
        'name',
        'code',
        'department_id',
        'description',
    ];

    // ✅ A course belongs to one department
    public function department()
    {
        return $this->belongsTo(AllDepartment::class, 'department_id');
    }
}
