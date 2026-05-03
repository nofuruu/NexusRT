<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use App\Models\Pengeluaran;
use App\Models\Rumah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KeuanganController extends Controller
{
    // ==========================================
    // 1. MODUL PEMASUKAN (IURAN WARGA)
    // ==========================================

    public function indexPemasukan()
    {
        $pembayaran = Pembayaran::with('rumah')->orderBy('tanggal_bayar', 'desc')->get();
        return response()->json($pembayaran);
    }

    public function storePemasukan(Request $request)
    {
        $request->validate([
            'rumah_id' => 'required|exists:rumahs,id',
            'jenis_iuran' => 'required|in:Satpam,Kebersihan',
            'skema_bayar' => 'required|in:Bulanan,Tahunan',
            'bulan' => 'required_if:skema_bayar,Bulanan|nullable|integer|min:1|max:12',
            'tahun' => 'required|integer|min:2020',
            'tanggal_bayar' => 'required|date',
        ]);

        $rumah = Rumah::findOrFail($request->rumah_id);

        if ($rumah->status === 'Tidak dihuni') {
            return response()->json(['message' => 'Rumah ini kosong, tidak bisa menerima pembayaran iuran.'], 400);
        }

        $tarif = ($request->jenis_iuran === 'Satpam') ? 100000 : 15000;

        DB::beginTransaction();
        try {
            if ($request->skema_bayar === 'Tahunan') {
                for ($i = 1; $i <= 12; $i++) {
                    Pembayaran::updateOrCreate(
                        [
                            'rumah_id' => $request->rumah_id,
                            'jenis_iuran' => $request->jenis_iuran,
                            'bulan' => $i,
                            'tahun' => $request->tahun,
                        ],
                        [
                            'jumlah_bayar' => $tarif,
                            'tanggal_bayar' => $request->tanggal_bayar
                        ]
                    );
                }
                $message = "Pembayaran iuran {$request->jenis_iuran} untuk 1 Tahun ({$request->tahun}) berhasil dicatat.";
            } else {
                Pembayaran::updateOrCreate(
                    [
                        'rumah_id' => $request->rumah_id,
                        'jenis_iuran' => $request->jenis_iuran,
                        'bulan' => $request->bulan,
                        'tahun' => $request->tahun,
                    ],
                    [
                        'jumlah_bayar' => $tarif,
                        'tanggal_bayar' => $request->tanggal_bayar
                    ]
                );
                $message = "Pembayaran iuran {$request->jenis_iuran} untuk Bulan {$request->bulan} Tahun {$request->tahun} berhasil dicatat.";
            }

            DB::commit();
            return response()->json(['message' => $message], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Terjadi kesalahan saat memproses pembayaran.', 'error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        // 1. Validasi Input
        $validated = $request->validate([
            'rumah_id' => 'required|exists:rumahs,id',
            'jenis_iuran' => 'required|in:Satpam,Kebersihan',
            'skema_bayar' => 'required|in:Bulanan,Tahunan',
            'bulan' => 'nullable|integer|min:1|max:12',
            'tahun' => 'required|integer|min:2020',
            'tanggal_bayar' => 'required|date',
        ]);

        $pemasukan = Pembayaran::findOrFail($id); // Sesuaikan nama Model dengan milikmu (Pemasukan / Iuran)

        $tarif_dasar = 0;
        if ($request->jenis_iuran === 'Satpam') {
            $tarif_dasar = 100000;
        } else if ($request->jenis_iuran === 'Kebersihan') {
            $tarif_dasar = 15000;
        }

        $jumlah_bayar = ($request->skema_bayar === 'Tahunan') ? ($tarif_dasar * 12) : $tarif_dasar;

        $pemasukan->update([
            'rumah_id' => $request->rumah_id,
            'jenis_iuran' => $request->jenis_iuran,
            'skema_bayar' => $request->skema_bayar,
            'bulan' => ($request->skema_bayar === 'Tahunan') ? null : $request->bulan, // Kosongkan bulan jika bayar tahunan
            'tahun' => $request->tahun,
            'tanggal_bayar' => $request->tanggal_bayar,
            'jumlah_bayar' => $jumlah_bayar,
        ]);

        $pemasukan->load('rumah');

        return response()->json([
            'status' => 'success',
            'message' => 'Data iuran berhasil dikoreksi.',
            'data' => $pemasukan
        ]);
    }

    /**
     */
    public function destroy($id)
    {
        $pemasukan = Pembayaran::findOrFail($id);

        try {
            // Hapus permanen
            $pemasukan->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Transaksi iuran berhasil dihapus/dibatalkan.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat menghapus data transaksi.'
            ], 500);
        }
    }


    // ==========================================
    // 2. MODUL PENGELUARAN RT
    // ==========================================

    public function indexPengeluaran()
    {
        $pengeluaran = Pengeluaran::orderBy('tanggal_pengeluaran', 'desc')->get();
        return response()->json($pengeluaran);
    }

    public function storePengeluaran(Request $request)
    {
        $request->validate([
            'keterangan' => 'required|string|max:255',
            'jumlah_pengeluaran' => 'required|integer|min:1',
            'tanggal_pengeluaran' => 'required|date',
        ]);

        $pengeluaran = Pengeluaran::create($request->all());

        return response()->json(['message' => 'Pengeluaran berhasil dicatat', 'data' => $pengeluaran], 201);
    }


    // ==========================================
    // 3. MODUL LAPORAN GRAFIK (Untuk Dashboard)
    // ==========================================

    public function getLaporanTahunan(Request $request)
    {
        $tahun = $request->query('tahun', date('Y'));

        $pemasukanDB = Pembayaran::selectRaw('bulan, SUM(jumlah_bayar) as total')
            ->where('tahun', $tahun)
            ->groupBy('bulan')
            ->pluck('total', 'bulan');

        $pengeluaranDB = Pengeluaran::selectRaw('MONTH(tanggal_pengeluaran) as bulan, SUM(jumlah_pengeluaran) as total')
            ->whereYear('tanggal_pengeluaran', $tahun)
            ->groupBy('bulan')
            ->pluck('total', 'bulan');

        $chartPemasukan = [];
        $chartPengeluaran = [];

        for ($i = 1; $i <= 12; $i++) {
            $chartPemasukan[] = $pemasukanDB[$i] ?? 0;
            $chartPengeluaran[] = - ($pengeluaranDB[$i] ?? 0);
        }

        return response()->json([
            'tahun' => $tahun,
            'pemasukan' => $chartPemasukan,
            'pengeluaran' => $chartPengeluaran,
            'total_saldo_tahun_ini' => array_sum($chartPemasukan) + array_sum($chartPengeluaran)
        ]);
    }
}
