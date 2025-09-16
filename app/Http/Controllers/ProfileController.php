<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $profiles = Profile::all();
        return response()->json($profiles);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'lastname' => 'required|string|unique:profiles',
            'address' => 'required|string',
            'phone' => 'nullable|string',
            'email' => 'required|email|unique:profiles'
        ]);

        $profile = Profile::create($request->all());
        return response()->json($profile, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function show(Profile $profile)
    {
        return response()->json($profile);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Profile $profile)
    {
        $request->validate([
            'name' => 'sometimes|required|string',
            'lastname' => 'sometimes|required|string|unique:profiles,lastname,' . $profile->id,
            'address' => 'sometimes|required|string',
            'phone' => 'nullable|string',
            'email' => 'sometimes|required|email|unique:profiles,email,' . $profile->id
        ]);

        $profile->update($request->all());
        return response()->json($profile);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function destroy(Profile $profile)
    {
        $profile->delete();
        return response()->json(null, 204);
    }
}
