import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CardBox from 'src/components/shared/CardBox';
import axiosInstance from 'src/api/axios';

export const StatusRumahList = () => {
  const [houseData, setHouseData] = useState([]);
  const [totalRumah, setTotalRumah] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatusRumah = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/rumah');
      const allRumah = response.data;
      setTotalRumah(allRumah.length);
      
      // Kita ambil 5 data teratas saja untuk dashboard
      setHouseData(allRumah.slice(0, 5));
    } catch (error) {
      console.error("Gagal mengambil status perumahan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatusRumah();
  }, []);

  return (
    <CardBox className="h-full w-full p-0 overflow-hidden">
      <div className="p-6 border-b border-border dark:border-darkborder sm:flex items-center justify-between">
        <div>
          <h5 className="card-title text-lg font-bold">Status Perumahan</h5>
          <p className="text-sm text-muted-foreground font-normal">
            Ringkasan 5 rumah dari total {totalRumah} unit
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/master/rumah"
            className="text-sm font-semibold text-primary hover:underline transition-all"
          >
            Lihat Semua Master Rumah &rarr;
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-lightsecondary dark:bg-darksecondary text-muted-foreground">
              <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">No. Rumah</th>
              <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Status Rumah</th>
              <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Nama Penghuni</th>
              <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Status Menetap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border dark:divide-darkborder">
            {isLoading ? (
              <tr>
                <td colSpan="4" className="px-6 py-10 text-center text-muted-foreground italic">
                  Menyisir data blok...
                </td>
              </tr>
            ) : houseData.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-10 text-center text-muted-foreground">
                  Belum ada data rumah terdaftar.
                </td>
              </tr>
            ) : (
              houseData.map((house) => {
                // Mengambil data penghuni dari relasi yang dikirim Laravel
                const penghuni = house.penghuni_aktif?.penghuni || house.penghuniAktif?.penghuni;

                return (
                  <tr key={house.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-foreground dark:text-white">
                      {house.nomor_rumah}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          house.status === 'Dihuni'
                            ? 'bg-success/10 text-success'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {house.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-gray-300">
                      {house.status === 'Dihuni' && penghuni ? penghuni.nama_lengkap : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {house.status === 'Dihuni' && penghuni ? (
                        <span
                          className={`font-bold ${
                            penghuni.status_menetap === 'Tetap' ? 'text-primary' : 'text-warning'
                          }`}
                        >
                          {penghuni.status_menetap}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </CardBox>
  );
};