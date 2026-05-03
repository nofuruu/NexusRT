import { useState, useEffect } from 'react';
import CardBox from 'src/components/shared/CardBox';
import axiosInstance from 'src/api/axios';
import { Icon } from '@iconify/react';
import { Button } from 'src/components/ui/button';

const PenerimaanIuran = () => {
  const [dataPemasukan, setDataPemasukan] = useState([]);
  const [dataRumah, setDataRumah] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // === STATE MODAL FORM (TAMBAH & EDIT) ===
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');

  // === STATE MODAL HAPUS ===
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Default Form: Bulan dan Tahun saat ini
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const [formData, setFormData] = useState({
    rumah_id: '',
    jenis_iuran: 'Satpam',
    skema_bayar: 'Bulanan',
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

  // === FUNGSI BUKA MODAL TAMBAH ===
  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setEditId(null);
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

  // === FUNGSI BUKA MODAL EDIT (KOREKSI) ===
  const handleOpenEditModal = (item) => {
    setIsEditMode(true);
    setEditId(item.id);
    setModalError('');
    setFormData({
      rumah_id: item.rumah_id,
      jenis_iuran: item.jenis_iuran,
      skema_bayar: item.skema_bayar || 'Bulanan', // Default fallback
      bulan: item.bulan,
      tahun: item.tahun,
      tanggal_bayar: item.tanggal_bayar,
    });
    setIsModalOpen(true);
  };

  // === FUNGSI BUKA MODAL HAPUS ===
  const handleOpenDeleteModal = (item) => {
    setDeleteData(item);
    setIsDeleteModalOpen(true);
  };

  // === FUNGSI SUBMIT (TAMBAH & EDIT) ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setModalError('');

    try {
      if (isEditMode) {
        await axiosInstance.put(`/keuangan/pemasukan/${editId}`, formData);
      } else {
        await axiosInstance.post('/keuangan/pemasukan', formData);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Gagal memproses pembayaran:', error);
      setModalError(error.response?.data?.message || 'Terjadi kesalahan pada server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // === FUNGSI HAPUS DATA ===
  const handleDelete = async () => {
    if (!deleteData) return;
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/keuangan/pemasukan/${deleteData.id}`);
      setIsDeleteModalOpen(false);
      setDeleteData(null);
      fetchData();
    } catch (error) {
      console.error('Gagal menghapus data:', error);
      alert(error.response?.data?.message || 'Gagal menghapus data. Periksa koneksi Anda.');
    } finally {
      setIsDeleting(false);
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
              Catat dan pantau pembayaran iuran bulanan warga
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <Button onClick={fetchData} variant="outline" className="flex items-center gap-2">
              <Icon icon="solar:refresh-linear" width="18" />
              Refresh
            </Button>
            <Button onClick={handleOpenAddModal} className="flex items-center gap-2">
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
                <th className="px-6 py-4 font-semibold text-sm text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border dark:divide-darkborder">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-muted-foreground">
                    Memuat data...
                  </td>
                </tr>
              ) : dataPemasukan.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-muted-foreground">
                    Belum ada transaksi pembayaran.
                  </td>
                </tr>
              ) : (
                dataPemasukan.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-foreground">{item.tanggal_bayar}</td>
                    <td className="px-6 py-4 text-sm font-bold text-foreground">
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
                    <td className="px-6 py-4 text-sm flex justify-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-primary hover:bg-primary/10"
                        onClick={() => handleOpenEditModal(item)}
                        title="Koreksi Data"
                      >
                        <Icon icon="solar:pen-linear" width="18" />
                      </Button>
                      <div className="w-px h-6 bg-border mx-1 self-center"></div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-error hover:bg-error/10"
                        onClick={() => handleOpenDeleteModal(item)}
                        title="Hapus Data"
                      >
                        <Icon icon="solar:trash-bin-trash-outline" width="18" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardBox>

      {/* === MODAL TERIMA & EDIT IURAN === */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <CardBox className="w-full max-w-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-foreground">
                {isEditMode ? 'Koreksi Data Iuran' : 'Penerimaan Iuran Baru'}
              </h3>
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
                  className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                >
                  <option value="" disabled className="bg-background text-muted-foreground">
                    -- Pilih Rumah --
                  </option>
                  {dataRumah.map((rumah) => (
                    <option
                      key={rumah.id}
                      value={rumah.id}
                      className="bg-background text-foreground"
                    >
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
                    className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                  >
                    <option value="Satpam" className="bg-background text-foreground">
                      Satpam (Rp 100.000)
                    </option>
                    <option value="Kebersihan" className="bg-background text-foreground">
                      Kebersihan (Rp 15.000)
                    </option>
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
                    className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                  >
                    <option value="Bulanan" className="bg-background text-foreground">
                      Per Bulan
                    </option>
                    <option value="Tahunan" className="bg-background text-foreground">
                      Setahun Penuh (12 Bulan)
                    </option>
                  </select>
                </div>
              </div>

              {formData.skema_bayar === 'Bulanan' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Untuk Bulan
                  </label>
                  <select
                    name="bulan"
                    value={formData.bulan}
                    onChange={handleInputChange}
                    className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                  >
                    {namaBulan.map((bulan, index) => (
                      <option
                        key={index}
                        value={index + 1}
                        className="bg-background text-foreground"
                      >
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
                    min="2020"
                    max="2100"
                    name="tahun"
                    value={formData.tahun}
                    onChange={handleInputChange}
                    className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
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
                    className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" disabled={isSubmitting || !formData.rumah_id}>
                  {isSubmitting ? 'Memproses...' : isEditMode ? 'Update Data' : 'Simpan Pembayaran'}
                </Button>
              </div>
            </form>
          </CardBox>
        </div>
      )}

      {/* === MODAL HAPUS TRANSAKSI === */}
      {isDeleteModalOpen && deleteData && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <CardBox className="w-full max-w-sm p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-error/10 flex items-center justify-center mb-4">
                <Icon icon="solar:trash-bin-trash-bold-duotone" className="text-2xl text-error" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">Hapus Transaksi?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Yakin ingin membatalkan dan menghapus iuran{' '}
                <strong>{deleteData.jenis_iuran}</strong> untuk rumah{' '}
                <strong>{deleteData.rumah?.nomor_rumah}</strong>? Laporan keuangan otomatis akan
                berkurang.
              </p>

              <div className="flex w-full gap-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsDeleteModalOpen(false)}
                  disabled={isDeleting}
                >
                  Batal
                </Button>
                <Button
                  className="w-full bg-error hover:bg-error/90 text-white"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
                </Button>
              </div>
            </div>
          </CardBox>
        </div>
      )}
    </div>
  );
};

export default PenerimaanIuran;
