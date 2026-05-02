import { useState, useEffect } from 'react';
import CardBox from 'src/components/shared/CardBox';
import axiosInstance from 'src/api/axios';
import { Icon } from '@iconify/react';
import { Button } from 'src/components/ui/button';

const LaporanKeuangan = () => {
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const fetchLaporan = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/keuangan/laporan-tahunan?tahun=${selectedYear}`);
      setReportData(response.data);
    } catch (error) {
      console.error('Gagal memuat laporan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLaporan();
  }, [selectedYear]);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const namaBulan = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Filter & Ringkasan Saldo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardBox className="md:col-span-1">
          <label className="block text-sm font-medium mb-2">Pilih Tahun Laporan</label>
          <div className="flex gap-2">
            <input
              type="number"
              className="w-full border rounded-md p-2 dark:bg-darksecondary"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            />
            <Button onClick={fetchLaporan}>
              <Icon icon="solar:magnifer-linear" />
            </Button>
          </div>
        </CardBox>

        <CardBox className="md:col-span-2 bg-primary text-white">
          <div className="flex items-center justify-between h-full">
            <div>
              <p className="text-white/80 text-sm">Total Saldo Akhir Tahun {selectedYear}</p>
              <h2 className="text-3xl font-bold mt-1">
                {isLoading ? '...' : formatRupiah(reportData?.total_saldo_tahun_ini || 0)}
              </h2>
            </div>
            <Icon icon="solar:wad-of-money-bold-duotone" width="60" className="opacity-20" />
          </div>
        </CardBox>
      </div>

      {/* Tabel Rincian Per Bulan */}
      <CardBox className="p-0 overflow-hidden">
        <div className="p-6 border-b border-border">
          <h5 className="card-title text-lg font-bold">Rincian Arus Kas Bulanan</h5>
          <p className="text-sm text-muted-foreground mt-1">
            Perbandingan pemasukan iuran dan pengeluaran operasional
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-lightsecondary dark:bg-darksecondary text-muted-foreground">
                <th className="px-6 py-4 font-semibold text-sm">Bulan</th>
                <th className="px-6 py-4 font-semibold text-sm text-right">Pemasukan (Iuran)</th>
                <th className="px-6 py-4 font-semibold text-sm text-right">Pengeluaran</th>
                <th className="px-6 py-4 font-semibold text-sm text-right">Selisih</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border dark:divide-darkborder">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center">
                    Menghitung Laporan...
                  </td>
                </tr>
              ) : (
                namaBulan.map((bulan, index) => {
                  const masuk = reportData?.pemasukan[index] || 0;
                  const keluar = Math.abs(reportData?.pengeluaran[index] || 0); 
                  const selisih = masuk - keluar;

                  return (
                    <tr key={index} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">{bulan}</td>
                      <td className="px-6 py-4 text-sm text-right text-success font-medium">
                        {masuk > 0 ? formatRupiah(masuk) : '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-right text-error font-medium">
                        {keluar > 0 ? formatRupiah(keluar) : '-'}
                      </td>
                      <td
                        className={`px-6 py-4 text-sm text-right font-bold ${selisih >= 0 ? 'text-primary' : 'text-error'}`}
                      >
                        {formatRupiah(selisih)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </CardBox>
    </div>
  );
};

export default LaporanKeuangan;
