<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'first_name' => 'John',
            'middle_name' => 'N/A',
            'last_name' => 'Lydrick',
            'email' => 'john@gmail.com',
            'phone' => '63+994947920',
            'address' => '123 St. Main, P-4 123',
            'age' => 21,
            'gender' => 'Male',
            'password' => Hash::make('12345'),
        ]);
    }
}
