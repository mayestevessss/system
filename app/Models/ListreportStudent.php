<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ListreportStudent extends Model
{

    protected $table = 'listreport_students';

    protected $fillable = [
        'student_id',
        'fullname',
        'course',
        'year_level',
        'status',
    ];
}
