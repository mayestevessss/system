<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListInactive extends Model
{
    use HasFactory;

    protected $table = 'list_inactive';

    protected $fillable = [
        'student_id',
        'fullname',
        'course',
        'year_level',
        'status',
    ];
}
