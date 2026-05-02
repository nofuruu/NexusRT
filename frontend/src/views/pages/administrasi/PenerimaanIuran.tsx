import { useState, useEffect } from 'react';
import CardBox from 'src/components/shared/CardBox';
import axiosInstance from 'src/api/axios';
import { Icon } from '@iconify/react';
import { Button } from 'src/components/ui/button';

const PenerimaanIuran = () => {
  const [dataPemasukan, setDataPemasukan] = useState([]);
  const [dataRumah, setDataRumah] = useState([]); // Untuk dropdown pilihan rumah
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // === STATE MODAL FORM PEMBAYARAN ===
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');

  // Default Form: Bulan dan Tahun saat ini
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const [formData, setFormData] = useState({
    rumah_id: '',
    jenis_iuran: 'Satpam', // Default
    skema_bayar: 'Bulanan', // Default
    bulan: currentMonth,
    tahun: currentYear,
    tanggal_bayar: today.toISOString().split('T')[0],
  });

  // === FUNGSI FETCH DATA ===
  const fetchData = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const [pemasukanRes, rumahRes] = await Promise.all([
        axiosInstance.get('/keuangan/pemasukan'),
        axiosInstance.get('/rumah'),
      ]);
      setDataPemasukan(pemasukanRes.data);
      // Filter rumah yang HANYA berstatus "Dihuni" untuk form pilihan
      const rumahDihuni = rumahRes.data.filter((r) => r.status === 'Dihuni');
      setDataRumah(rumahDihuni);
    } catch (error) {
      console.error('Gagal mengambil data:', error);
      setErrorMessage('Gagal memuat data dari server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // === FUNGSI HANDLE INPUT FORM ===
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // === FUNGSI BUKA MODAL ===
  const handleOpenModal = () => {
    setModalError('');
    setFormData({
      rumah_id: '',
      jenis_iuran: 'Satpam',
      skema_bayar: 'Bulanan',
      bulan: currentMonth,
      tahun: currentYear,
      tanggal_bayar: today.toISOString().split('T')[0],
    });
    setIsModalOpen(true);
  };

  // === FUNGSI SUBMIT PEMBAYARAN ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setModalError('');

    try {
      await axiosInstance.post('/keuangan/pemasukan', formData);
      setIsModalOpen(false);
      fetchData(); // Refresh tabel setelah sukses
    } catch (error) {
      console.error('Gagal memproses pembayaran:', error);
      setModalError(error.response?.data?.message || 'Terjadi kesalahan pada server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // === HELPER FORMAT RUPIAH & BULAN ===
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
    <div className="grid grid-cols-1 gap-6 relative">
      <CardBox className="p-0 overflow-hidden">
        {/* Header Tabel */}
        <div className="p-6 border-b border-border dark:border-darkborder sm:flex items-center justify-between">
          <div>
            <h5 className="card-title text-lg font-bold">Penerimaan Iuran Warga</h5>
            <p className="text-sm text-muted-foreground font-normal mt-1">
              Catat dan pantau pembayaran iuran Satpam & Kebersihan bulanan
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <Button onClick={fetchData} variant="outline" className="flex items-center gap-2">
              <Icon icon="solar:refresh-linear" width="18" />
              Refresh
            </Button>
            <Button onClick={handleOpenModal} className="flex items-center gap-2">
              <Icon icon="solar:wallet-money-linear" width="18" />
              Terima Iuran
            </Button>
          </div>
        </div>

        {errorMessage && <div className="p-4 bg-red-50 text-red-600 text-sm">{errorMessage}</div>}

        {/* Tabel Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-lightsecondary dark:bg-darksecondary text-muted-foreground">
                <th className="px-6 py-4 font-semibold text-sm">Tanggal Transaksi</th>
                <th className="px-6 py-4 font-semibold text-sm">Nomor Rumah</th>
                <th className="px-6 py-4 font-semibold text-sm">Jenis Iuran</th>
                <th className="px-6 py-4 font-semibold text-sm">Untuk Bulan</th>
                <th className="px-6 py-4 font-semibold text-sm">Nominal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border dark:divide-darkborder">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-muted-foreground">
                    Memuat data...
                  </td>
                </tr>
              ) : dataPemasukan.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-muted-foreground">
                    Belum ada transaksi pembayaran.
                  </td>
                </tr>
              ) : (
                dataPemasukan.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-foreground">{item.tanggal_bayar}</td>
                    <td className="px-6 py-4 text-sm font-bold text-foreground dark:text-white">
                      {item.rumah?.nomor_rumah || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.jenis_iuran === 'Satpam'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-info/10 text-info'
                        }`}
                      >
                        {item.jenis_iuran}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {namaBulan[item.bulan - 1]} {item.tahun}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-success dark:text-green-400">
                      + {formatRupiah(item.jumlah_bayar)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardBox>

      {/* === MODAL TERIMA IURAN === */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <CardBox className="w-full max-w-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-foreground">Penerimaan Iuran Baru</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon icon="solar:close-circle-linear" width="24" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {modalError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
                  {modalError}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-1">
                  Rumah (Warga) <span className="text-error">*</span>
                </label>
                <select
                  required
                  name="rumah_id"
                  value={formData.rumah_id}
                  onChange={handleInputChange}
                  className="w-full border border-border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary dark:bg-darksecondary dark:text-white"
                >
                  <option value="" disabled>
                    -- Pilih Rumah --
                  </option>
                  {dataRumah.map((rumah) => (
                    <option key={rumah.id} value={rumah.id}>
                      {rumah.nomor_rumah} -{' '}
                      {rumah.penghuniAktif?.penghuni?.nama_lengkap || 'Unknown'}
                    </option>
                  ))}
                </select>
                {dataRumah.length === 0 && (
                  <p className="text-xs text-warning mt-1">Tidak ada rumah yang sedang dihuni.</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Jenis Iuran
                  </label>
                  <select
                    name="jenis_iuran"
                    value={formData.jenis_iuran}
                    onChange={handleInputChange}
                    className="w-full border border-border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary dark:bg-darksecondary dark:text-white"
                  >
                    <option value="Satpam">Satpam (Rp 100.000)</option>
                    <option value="Kebersihan">Kebersihan (Rp 15.000)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Skema Bayar
                  </label>
                  <select
                    name="skema_bayar"
                    value={formData.skema_bayar}
                    onChange={handleInputChange}
                    className="w-full border border-border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary dark:bg-darksecondary dark:text-white"
                  >
                    <option value="Bulanan">Per Bulan</option>
                    <option value="Tahunan">Setahun Penuh (12 Bulan)</option>
                  </select>
                </div>
              </div>

              {/* Tampilkan Pilihan Bulan HANYA jika Skema Bayarnya Bulanan */}
              {formData.skema_bayar === 'Bulanan' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Untuk Bulan
                  </label>
                  <select
                    name="bulan"
                    value={formData.bulan}
                    onChange={handleInputChange}
                    className="w-full border border-border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary dark:bg-darksecondary dark:text-white"
                  >
                    {namaBulan.map((bulan, index) => (
                      <option key={index} value={index + 1}>
                        {bulan}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Tahun <span className="text-error">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    name="tahun"
                    min="2020"
                    max="2100"
                    value={formData.tahun}
                    onChange={handleInputChange}
                    className="w-full border border-border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary dark:bg-darksecondary dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Tanggal Bayar <span className="text-error">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    name="tanggal_bayar"
                    value={formData.tanggal_bayar}
                    onChange={handleInputChange}
                    className="w-full border border-border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary dark:bg-darksecondary dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" disabled={isSubmitting || !formData.rumah_id}>
                  {isSubmitting ? 'Memproses...' : 'Simpan Pembayaran'}
                </Button>
              </div>
            </form>
          </CardBox>
        </div>
      )}
    </div>
  );
};

export default PenerimaanIuran;
