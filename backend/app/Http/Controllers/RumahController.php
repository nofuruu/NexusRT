<?php

namespace App\Http\Controllers;

use App\Models\Rumah;
use App\Models\HistoriRumah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RumahController extends Controller
{
    public function index()
    {
        $rumahs = Rumah::with('penghuniAktif.penghuni')->get();
        return response()->json($rumahs);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nomor_rumah' => 'required|string|unique:rumahs,nomor_rumah',
        ]);

        $rumah = Rumah::create([
            'nomor_rumah' => $request->nomor_rumah,
            'status' => 'Tidak dihuni'
        ]);

        return response()->json(['message' => 'Rumah berhasil ditambahkan', 'data' => $rumah], 201);
    }

    public function show($id)
    {
        $rumah = Rumah::with(['histori.penghuni'])->findOrFail($id);
        return response()->json($rumah);
    }

    public function update(Request $request, $id)
    {
        $rumah = Rumah::findOrFail($id);

        $request->validate([
            'nomor_rumah' => 'required|string|unique:rumahs,nomor_rumah,' . $id,
        ]);

        $rumah->update(['nomor_rumah' => $request->nomor_rumah]);

        return response()->json(['message' => 'Data rumah berhasil diupdate', 'data' => $rumah]);
    }

    public function destroy($id)
    {
        $rumah = Rumah::findOrFail($id);

        if ($rumah->status === 'Dihuni') {
            return response()->json([
                'status' => 'error',
                'message' => 'Rumah tidak dapat dihapus karena masih berstatus dihuni. Kosongkan rumah terlebih dahulu.'
            ], 400); 
        }

        try {
            if (method_exists($rumah, 'histori')) {
                $rumah->histori()->delete();
            }

            $rumah->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Rumah berhasil dihapus secara permanen.'
            ]);
            
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Rumah ini tidak bisa dihapus karena datanya masih digunakan pada transaksi atau laporan lain.'
            ], 400);
        }
    }

    public function assignPenghuni(Request $request, $id)
    {
        $request->validate([
            'penghuni_id' => 'required|exists:penghunis,id',
            'tanggal_mulai' => 'required|date',
        ]);

        $rumah = Rumah::findOrFail($id);

        DB::beginTransaction();
        try {
            $historiAktif = HistoriRumah::where('rumah_id', $id)
                ->whereNull('tanggal_selesai')
                ->first();

            if ($historiAktif) {
                if ($historiAktif->penghuni_id == $request->penghuni_id) {
                    return response()->json(['message' => 'Penghuni ini sudah menempati rumah ini'], 400);
                }
                $historiAktif->update(['tanggal_selesai' => $request->tanggal_mulai]);
            }

            HistoriRumah::create([
                'rumah_id' => $rumah->id,
                'penghuni_id' => $request->penghuni_id,
                'tanggal_mulai' => $request->tanggal_mulai,
                'tanggal_selesai' => null
            ]);

            $rumah->update(['status' => 'Dihuni']);

            DB::commit();

            return response()->json(['message' => 'Penghuni berhasil ditugaskan ke rumah ini']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Terjadi kesalahan', 'error' => $e->getMessage()], 500);
        }
    }

    public function kosongkan($id)
    {
        $rumah = Rumah::findOrFail($id);

        // 1. Ubah status rumah
        $rumah->update(['status' => 'Tidak dihuni']);

        // 2. Tutup histori aktif (Set tanggal_selesai)
        // Asumsi tabel histori memiliki kolom 'tanggal_selesai' dan relasi ke model HistoriRumah
        $rumah->histori()->whereNull('tanggal_selesai')->update([
            'tanggal_selesai' => now()->toDateString()
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Rumah berhasil dikosongkan'
        ]);
    }
}
