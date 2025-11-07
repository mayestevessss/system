<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AllAcademicYear extends Model
{
    use HasFactory;

    // ✅ Correct table name
    protected $table = 'all_academic_years';

    protected $fillable = [
        'year_name',
        'start_date',
        'end_date',
    ];
}
