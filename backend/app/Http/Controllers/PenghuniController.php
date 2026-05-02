<?php

namespace App\Http\Controllers;

use App\Models\Penghuni;
use Illuminate\Http\Request;

class PenghuniController extends Controller
{
    public function index()
    {
        $penghunis = Penghuni::all();
        return response()->json($penghunis);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'status_menetap' => 'required|in:Tetap,Kontrak',
            'nomor_telepon' => 'required|string|max:20',
            'sudah_menikah' => 'required|boolean',
        ]);

        $penghuni = Penghuni::create($request->all());

        return response()->json(['message' => 'Penghuni berhasil ditambahkan', 'data' => $penghuni], 201);
    }

    public function show($id)
    {
        $penghuni = Penghuni::with('historiRumah.rumah')->findOrFail($id);
        return response()->json($penghuni);
    }

    public function update(Request $request, $id)
    {
        $penghuni = Penghuni::findOrFail($id);

        $request->validate([
            'nama_lengkap' => 'sometimes|required|string|max:255',
            'status_menetap' => 'sometimes|required|in:Tetap,Kontrak',
            'nomor_telepon' => 'sometimes|required|string|max:20',
            'sudah_menikah' => 'sometimes|required|boolean',
        ]);

        $penghuni->update($request->all());

        return response()->json(['message' => 'Data penghuni berhasil diupdate', 'data' => $penghuni]);
    }

    public function destroy($id)
    {
        $penghuni = Penghuni::findOrFail($id);
        $penghuni->delete();

        return response()->json(['message' => 'Penghuni berhasil dihapus']);
    }
}
