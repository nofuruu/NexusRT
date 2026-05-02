import { Link } from 'react-router-dom';
import CardBox from 'src/components/shared/CardBox';

export const StatusRumahList = () => {
  // Data Mockup (Nantinya di-fetch dari backend: tabel 'rumah' di-join dengan 'penghuni')
  // Menampilkan sebagian dari total 20 rumah
  const houseData = [
    {
      id: 1,
      no_rumah: 'Blok A-01',
      status_rumah: 'Dihuni',
      nama_penghuni: 'Budi Santoso',
      status_penghuni: 'Tetap',
    },
    {
      id: 2,
      no_rumah: 'Blok A-02',
      status_rumah: 'Tidak Dihuni',
      nama_penghuni: '-',
      status_penghuni: '-',
    },
    {
      id: 3,
      no_rumah: 'Blok A-03',
      status_rumah: 'Dihuni',
      nama_penghuni: 'Siti Aminah',
      status_penghuni: 'Kontrak',
    },
    {
      id: 4,
      no_rumah: 'Blok A-04',
      status_rumah: 'Dihuni',
      nama_penghuni: 'Agus Salim',
      status_penghuni: 'Tetap',
    },
    {
      id: 5,
      no_rumah: 'Blok A-05',
      status_rumah: 'Tidak Dihuni',
      nama_penghuni: '-',
      status_penghuni: '-',
    },
  ];

  return (
    <CardBox className="h-full w-full p-0 overflow-hidden">
      <div className="p-6 border-b border-border dark:border-darkborder sm:flex items-center justify-between">
        <div>
          <h5 className="card-title">Status Perumahan</h5>
          <p className="text-sm text-muted-foreground font-normal">
            Ringkasan 5 rumah dari total 20 rumah
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          {/* Tombol yang akan mengarahkan ke halaman CRUD Master Rumah */}
          <Link
            to="/rumah"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Lihat Semua Master Rumah &rarr;
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-lightsecondary dark:bg-darksecondary text-muted-foreground">
              <th className="px-6 py-4 font-semibold text-sm">No. Rumah</th>
              <th className="px-6 py-4 font-semibold text-sm">Status Rumah</th>
              <th className="px-6 py-4 font-semibold text-sm">Nama Penghuni</th>
              <th className="px-6 py-4 font-semibold text-sm">Status Menetap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border dark:divide-darkborder">
            {houseData.map((house) => (
              <tr key={house.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground dark:text-white">
                  {house.no_rumah}
                </td>
                <td className="px-6 py-4">
                  {/* Badge Status Rumah */}
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      house.status_rumah === 'Dihuni'
                        ? 'bg-success/10 text-success dark:bg-success/20'
                        : 'bg-muted text-muted-foreground dark:bg-gray-700'
                    }`}
                  >
                    {house.status_rumah}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-foreground dark:text-gray-300">
                  {house.nama_penghuni}
                </td>
                <td className="px-6 py-4 text-sm">
                  {/* Styling khusus untuk membedakan penghuni Tetap dan Kontrak */}
                  {house.status_penghuni !== '-' ? (
                    <span
                      className={`font-medium ${
                        house.status_penghuni === 'Tetap' ? 'text-primary' : 'text-warning'
                      }`}
                    >
                      {house.status_penghuni}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardBox>
  );
};
