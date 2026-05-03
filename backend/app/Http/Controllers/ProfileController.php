<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    // Mengambil data profile user yang sedang login
    public function show(Request $request)
    {
        return response()->json([
            'status' => 'success',
            'data' => $request->user()
        ]);
    }

    // Mengupdate data profile
    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'nik' => 'nullable|string|max:16|unique:users,nik,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'position' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'block' => 'nullable|string|max:255',
            'rt_rw' => 'nullable|string|max:10',
            'village' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
        ]);

        $user->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Profil berhasil diperbarui.',
            'data' => $user
        ]);
    }
}