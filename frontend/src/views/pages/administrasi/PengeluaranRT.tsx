import { useState, useEffect } from 'react';
import CardBox from 'src/components/shared/CardBox';
import axiosInstance from 'src/api/axios';
import { Icon } from '@iconify/react';
import { Button } from 'src/components/ui/button';

const PengeluaranRT = () => {
  const [dataPengeluaran, setDataPengeluaran] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // === STATE MODAL FORM ===
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');

  const [formData, setFormData] = useState({
    keterangan: '',
    jumlah_pengeluaran: '',
    tanggal_pengeluaran: new Date().toISOString().split('T')[0],
  });

  // === FUNGSI FETCH DATA ===
  const fetchPengeluaran = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await axiosInstance.get('/keuangan/pengeluaran');
      setDataPengeluaran(response.data);
    } catch (error) {
      setErrorMessage('Gagal memuat data pengeluaran.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPengeluaran();
  }, []);

  // === FUNGSI SUBMIT ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setModalError('');

    try {
      await axiosInstance.post('/keuangan/pengeluaran', formData);
      setIsModalOpen(false);
      setFormData({
        keterangan: '',
        jumlah_pengeluaran: '',
        tanggal_pengeluaran: new Date().toISOString().split('T')[0],
      });
      fetchPengeluaran();
    } catch (error) {
      setModalError(error.response?.data?.message || 'Gagal menyimpan data.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <div className="grid grid-cols-1 gap-6 relative">
      <CardBox className="p-0 overflow-hidden">
        <div className="p-6 border-b border-border dark:border-darkborder sm:flex items-center justify-between">
          <div>
            <h5 className="card-title text-lg font-bold">Pengeluaran Kas RT</h5>
            <p className="text-sm text-muted-foreground mt-1">
              Catat semua biaya operasional, gaji satpam, dan perbaikan fasilitas
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <Button onClick={fetchPengeluaran} variant="outline">
              <Icon icon="solar:refresh-linear" className="mr-2" /> Refresh
            </Button>
            <Button onClick={() => setIsModalOpen(true)}>
              <Icon icon="solar:card-send-linear" className="mr-2" /> Catat Pengeluaran
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-lightsecondary dark:bg-darksecondary text-muted-foreground">
                <th className="px-6 py-4 font-semibold text-sm">Tanggal</th>
                <th className="px-6 py-4 font-semibold text-sm">Keterangan</th>
                <th className="px-6 py-4 font-semibold text-sm">Nominal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border dark:divide-darkborder">
              {isLoading ? (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center">
                    Memuat...
                  </td>
                </tr>
              ) : dataPengeluaran.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center">
                    Belum ada catatan pengeluaran.
                  </td>
                </tr>
              ) : (
                dataPengeluaran.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-sm">{item.tanggal_pengeluaran}</td>
                    <td className="px-6 py-4 text-sm font-medium">{item.keterangan}</td>
                    <td className="px-6 py-4 text-sm font-bold text-error">
                      - {formatRupiah(item.jumlah_pengeluaran)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardBox>

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <CardBox className="w-full max-w-md p-6">
            <h3 className="text-lg font-bold mb-4">Input Pengeluaran Baru</h3>
            <form onSubmit={handleSubmit}>
              {modalError && (
                <div className="mb-4 p-2 bg-red-50 text-red-600 text-xs rounded">{modalError}</div>
              )}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Keterangan Pengeluaran</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Gaji Satpam Januari"
                  className="w-full border rounded-md p-2 text-sm dark:bg-darksecondary"
                  value={formData.keterangan}
                  onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nominal (Rp)</label>
                <input
                  type="number"
                  required
                  placeholder="0"
                  className="w-full border rounded-md p-2 text-sm dark:bg-darksecondary"
                  value={formData.jumlah_pengeluaran}
                  onChange={(e) => setFormData({ ...formData, jumlah_pengeluaran: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Tanggal</label>
                <input
                  type="date"
                  required
                  className="w-full border rounded-md p-2 text-sm dark:bg-darksecondary"
                  value={formData.tanggal_pengeluaran}
                  onChange={(e) =>
                    setFormData({ ...formData, tanggal_pengeluaran: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  Simpan
                </Button>
              </div>
            </form>
          </CardBox>
        </div>
      )}
    </div>
  );
};

export default PengeluaranRT;
