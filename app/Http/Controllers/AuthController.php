<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // 🧾 REGISTER
    public function register(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name'  => 'required|string|max:100',
            'email'      => 'required|email|unique:users,email',
            'password'   => 'required|min:6',
        ]);

        $user = User::create([
            'first_name' => $validated['first_name'],
            'last_name'  => $validated['last_name'],
            'email'      => $validated['email'],
            'password'   => Hash::make($validated['password']),
        ]);

        // Generate a simple token for frontend authentication
        $token = base64_encode($user->id . ':' . time());

        return response()->json([
            'success' => true,
            'message' => 'Registration successful!',
            'user'    => $user,
            'token'   => $token,
        ], 201);
    }

    // 🔐 LOGIN
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email'    => 'required|string',  // Accept any string, not just valid emails
            'password' => 'required',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid email or password',
            ], 401);
        }

        // Generate a simple token for frontend authentication
        $token = base64_encode($user->id . ':' . time());

        return response()->json([
            'success' => true,
            'message' => 'Login successful!',
            'user'    => $user,
            'token'   => $token,
        ]);
    }

    // 🚪 LOGOUT
    public function logout(Request $request)
    {
        // For simple token-based auth, logout is handled on the frontend
        // by removing the token from localStorage
        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully.',
        ]);
    }
}
