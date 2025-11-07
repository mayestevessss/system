<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{

    protected $fillable = [
        'fullname',
        'email',
        'department',
        'position',
        'gender',
        'contact_number',
        'is_archived',
        'status',
    ];
}
