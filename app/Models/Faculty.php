<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    use HasFactory;

    protected $table = 'faculties';

    protected $fillable = [
        'fullname',
        'email',
        'department',
        'department_id',
        'position',
        'gender',
    ];

    /**
     * ✅ Relationship: Faculty belongs to a Department
     */
    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }
}
