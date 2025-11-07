<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AllAcademicYear extends Model
{

    // ✅ Correct table name
    protected $table = 'all_academic_years';

    protected $fillable = [
        'year_name',
        'start_date',
        'end_date',
    ];
}
