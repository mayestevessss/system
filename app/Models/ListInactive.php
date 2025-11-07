<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ListInactive extends Model
{

    protected $table = 'list_inactive';

    protected $fillable = [
        'student_id',
        'fullname',
        'course',
        'year_level',
        'status',
    ];
}
