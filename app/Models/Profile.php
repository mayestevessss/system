<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{

    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'email',
        'phone',
        'address',
        'age',
        'gender',
        'password',
    ];

    protected $hidden = [
        'password',
    ];
}
