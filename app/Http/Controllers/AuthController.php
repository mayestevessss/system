<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            // Log the incoming request data
            \Log::info('Registration attempt', [
                'request_data' => $request->all(),
                'headers' => $request->headers->all()
            ]);

            $validated = $request->validate([
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:6',
                'name' => 'required|string|max:255',
            ]);

            \Log::info('Validation passed', ['validated_data' => $validated]);

            // Check database connection
            try {
                \DB::connection()->getPDO();
                \Log::info('Database connected');
            } catch (\Exception $e) {
                \Log::error('Database connection failed', ['error' => $e->getMessage()]);
                return response()->json(['message' => 'Database connection failed'], 500);
            }

            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'name' => $request->name,
            ]);

            \Log::info('User created', ['user_id' => $user->id]);

            return response()->json(['message' => 'User registered successfully'], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::warning('Validation failed', ['errors' => $e->errors()]);
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            \Log::error('Registration failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
