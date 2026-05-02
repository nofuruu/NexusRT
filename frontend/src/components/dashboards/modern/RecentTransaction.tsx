import { useState, useEffect } from 'react';
import CardBox from 'src/components/shared/CardBox';
import axiosInstance from 'src/api/axios';

export const RecentTransaction = () => {
  const [timelineData, setTimelineData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecentActivities = async () => {
    setIsLoading(true);
    try {
      // Mengambil data pemasukan dan pengeluaran secara bersamaan
      const [pemasukanRes, pengeluaranRes] = await Promise.all([
        axiosInstance.get('/keuangan/pemasukan'),
        axiosInstance.get('/keuangan/pengeluaran'),
      ]);

      // Map data pemasukan agar sesuai format timeline
      const mapPemasukan = pemasukanRes.data.slice(0, 5).map((item) => ({
        key: `in-${item.id}`,
        time: new Date(item.tanggal_bayar).toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short',
        }),
        desc: `Iuran ${item.jenis_iuran}`,
        amount: `+ Rp ${item.jumlah_bayar.toLocaleString('id-ID')}`,
        source: item.rumah?.nomor_rumah || 'Rumah',
        isIncome: true,
        borderColor: item.jenis_iuran === 'Satpam' ? 'border-primary' : 'border-success',
        rawDate: new Date(item.created_at), // Untuk pengurutan
      }));

      // Map data pengeluaran agar sesuai format timeline
      const mapPengeluaran = pengeluaranRes.data.slice(0, 5).map((item) => ({
        key: `out-${item.id}`,
        time: new Date(item.tanggal_pengeluaran).toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short',
        }),
        desc: item.keterangan,
        amount: `- Rp ${item.jumlah_pengeluaran.toLocaleString('id-ID')}`,
        source: 'Pengeluaran RT',
        isIncome: false,
        borderColor: 'border-error',
        rawDate: new Date(item.created_at),
      }));

      // Gabungkan dan urutkan berdasarkan created_at terbaru
      const combined = [...mapPemasukan, ...mapPengeluaran]
        .sort((a, b) => b.rawDate - a.rawDate)
        .slice(0, 6); // Ambil 6 aktivitas terbaru saja

      setTimelineData(combined);
    } catch (error) {
      console.error('Gagal mengambil aktivitas terbaru:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentActivities();
  }, []);

  return (
    <CardBox className="h-full w-full">
      <div>
        <h5 className="card-title text-lg font-bold">Aktivitas Kas Terbaru</h5>
        <p className="text-sm text-muted-foreground font-normal">
          Riwayat pemasukan iuran & pengeluaran RT aktual
        </p>
      </div>

      <div className="mt-8">
        {isLoading ? (
          <p className="text-sm text-muted-foreground text-center py-10">Sinkronisasi data...</p>
        ) : timelineData.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-10">
            Belum ada aktivitas hari ini.
          </p>
        ) : (
          timelineData.map((item, index) => {
            const isLastItem = index === timelineData.length - 1;
            return (
              <div key={item.key} className="flex gap-x-3">
                {/* Bagian Waktu */}
                <div className="w-1/4 text-end">
                  <span className="text-xs font-semibold text-foreground dark:text-muted-foreground uppercase">
                    {item.time}
                  </span>
                </div>

                {/* Bagian Garis Timeline */}
                <div
                  className={`relative ${
                    isLastItem ? 'after:hidden' : ''
                  } after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-border`}
                >
                  <div className="relative z-1 w-7 h-7 flex justify-center items-center">
                    <div
                      className={`h-2.5 w-2.5 rounded-full bg-transparent border-2 ${item.borderColor}`}
                    ></div>
                  </div>
                </div>

                {/* Bagian Konten */}
                <div className="w-3/4 pt-0.5 pb-6">
                  <div>
                    <h6 className="text-sm font-bold text-foreground dark:text-white truncate max-w-[180px]">
                      {item.desc}
                    </h6>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 mt-0.5">
                      <span
                        className={`text-xs font-bold ${
                          item.isIncome
                            ? 'text-success dark:text-green-400'
                            : 'text-error dark:text-red-400'
                        }`}
                      >
                        {item.amount}
                      </span>
                      <span className="text-muted-foreground text-[10px] hidden sm:inline">•</span>
                      <span className="text-muted-foreground text-[10px] font-medium uppercase tracking-tighter">
                        {item.source}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </CardBox>
  );
};
