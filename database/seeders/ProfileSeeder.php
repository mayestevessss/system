<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Profile;

class ProfileSeeder extends Seeder
{
    public function run(): void
    {
        Profile::create([
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
