<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        echo "👤 Creating Admin Users...\n";

        // Admin user with username "admin123"
        User::updateOrCreate(
            ['email' => 'admin123'],
            [
                'first_name' => 'Admin',
                'middle_name' => '',
                'last_name' => 'User',
                'phone' => '09123456789',
                'address' => 'Admin Office',
                'age' => 30,
                'gender' => 'Male',
                'password' => Hash::make('admin123'),
            ]
        );

        // Additional sample admin user
        User::updateOrCreate(
            ['email' => 'john@gmail.com'],
            [
                'first_name' => 'John',
                'middle_name' => 'N/A',
                'last_name' => 'Lydrick',
                'phone' => '63+994947920',
                'address' => '123 St. Main, P-4 123',
                'age' => 21,
                'gender' => 'Male',
                'password' => Hash::make('12345'),
            ]
        );

        echo "  ✅ " . User::count() . " admin users created/updated\n";
        echo "  📧 Login credentials:\n";
        echo "     - Email: admin123 | Password: admin123\n";
        echo "     - Email: john@gmail.com | Password: 12345\n\n";
    }
}