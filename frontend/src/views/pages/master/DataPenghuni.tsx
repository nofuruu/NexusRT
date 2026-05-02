import { useState, useEffect } from 'react';
import CardBox from 'src/components/shared/CardBox';
import axiosInstance from 'src/api/axios';
import { Icon } from '@iconify/react';
import { Button } from 'src/components/ui/button'; 

const DataPenghuni = () => {
  const [dataPenghuni, setDataPenghuni] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // === STATE UNTUK MODAL FORM (TAMBAH & EDIT) ===
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');

  // State Form Input
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    status_menetap: 'Tetap', // Default
    nomor_telepon: '',
    sudah_menikah: 0, // 0 = Belum, 1 = Sudah
  });

  // === FUNGSI FETCH DATA ===
  const fetchPenghuni = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await axiosInstance.get('/penghuni');
      setDataPenghuni(response.data);
    } catch (error) {
      console.error('Gagal mengambil data penghuni:', error);
      setErrorMessage('Gagal memuat data dari server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPenghuni();
  }, []);

  // === FUNGSI BUKA MODAL TAMBAH ===
  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setEditId(null);
    setFormData({ nama_lengkap: '', status_menetap: 'Tetap', nomor_telepon: '', sudah_menikah: 0 });
    setModalError('');
    setIsModalOpen(true);
  };

  // === FUNGSI BUKA MODAL EDIT ===
  const handleOpenEditModal = (penghuni) => {
    setIsEditMode(true);
    setEditId(penghuni.id);
    setFormData({
      nama_lengkap: penghuni.nama_lengkap,
      status_menetap: penghuni.status_menetap,
      nomor_telepon: penghuni.nomor_telepon,
      sudah_menikah: penghuni.sudah_menikah ? 1 : 0,
    });
    setModalError('');
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setModalError('');

    try {
      if (isEditMode) {
        await axiosInstance.put(`/penghuni/${editId}`, formData);
      } else {
        await axiosInstance.post('/penghuni', formData);
      }
      setIsModalOpen(false);
      fetchPenghuni(); // Refresh tabel
    } catch (error) {
      console.error('Gagal menyimpan data:', error);
      setModalError(error.response?.data?.message || 'Terjadi kesalahan pada server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 relative">
      <CardBox className="p-0 overflow-hidden">
        {/* Header Tabel */}
        <div className="p-6 border-b border-border dark:border-darkborder sm:flex items-center justify-between">
          <div>
            <h5 className="card-title text-lg font-bold">Master Data Penghuni</h5>
            <p className="text-sm text-muted-foreground font-normal mt-1">
              Kelola daftar warga tetap dan kontrak
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <Button onClick={fetchPenghuni} variant="outline" className="flex items-center gap-2">
              <Icon icon="solar:refresh-linear" width="18" />
              Refresh
            </Button>
            <Button onClick={handleOpenAddModal} className="flex items-center gap-2">
              <Icon icon="solar:user-plus-rounded-linear" width="18" />
              Tambah Penghuni
            </Button>
          </div>
        </div>

        {errorMessage && <div className="p-4 bg-red-50 text-red-600 text-sm">{errorMessage}</div>}

        {/* Tabel Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-lightsecondary dark:bg-darksecondary text-muted-foreground">
                <th className="px-6 py-4 font-semibold text-sm w-16">No</th>
                <th className="px-6 py-4 font-semibold text-sm">Nama Lengkap</th>
                <th className="px-6 py-4 font-semibold text-sm">Status Menetap</th>
                <th className="px-6 py-4 font-semibold text-sm">No. Telepon</th>
                <th className="px-6 py-4 font-semibold text-sm">Pernikahan</th>
                <th className="px-6 py-4 font-semibold text-sm text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border dark:divide-darkborder">
              {isLoading ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-muted-foreground">Memuat data...</td></tr>
              ) : dataPenghuni.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-muted-foreground">Belum ada data penghuni.</td></tr>
              ) : (
                dataPenghuni.map((penghuni, index) => (
                  <tr key={penghuni.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-foreground">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground dark:text-white">
                      {penghuni.nama_lengkap}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        penghuni.status_menetap === 'Tetap' ? 'bg-primary/10 text-primary' : 'bg-warning/10 text-warning'
                      }`}>
                        {penghuni.status_menetap}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{penghuni.nomor_telepon}</td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {penghuni.sudah_menikah ? 'Sudah Menikah' : 'Belum Menikah'}
                    </td>
                    <td className="px-6 py-4 text-sm flex justify-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleOpenEditModal(penghuni)} title="Edit Data">
                        <Icon icon="solar:pen-linear" width="16" /> Edit
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardBox>

      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <CardBox className="w-full max-w-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-foreground">
                {isEditMode ? 'Edit Data Penghuni' : 'Tambah Penghuni Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <Icon icon="solar:close-circle-linear" width="24" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              {modalError && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">{modalError}</div>}
              
              {/* Input Nama */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-1">Nama Lengkap <span className="text-error">*</span></label>
                <input
                  type="text" required name="nama_lengkap"
                  value={formData.nama_lengkap} onChange={handleInputChange}
                  className="w-full border border-border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary dark:bg-darksecondary dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-1">Nomor Telepon <span className="text-error">*</span></label>
                <input
                  type="text" required name="nomor_telepon"
                  placeholder="Contoh: 08123456789"
                  value={formData.nomor_telepon} onChange={handleInputChange}
                  className="w-full border border-border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary dark:bg-darksecondary dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Status Menetap <span className="text-error">*</span></label>
                  <select
                    name="status_menetap" value={formData.status_menetap} onChange={handleInputChange}
                    className="w-full border border-border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary dark:bg-darksecondary dark:text-white"
                  >
                    <option value="Tetap">Warga Tetap</option>
                    <option value="Kontrak">Kontrak / Sementara</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Status Pernikahan <span className="text-error">*</span></label>
                  <select
                    name="sudah_menikah" value={formData.sudah_menikah} onChange={handleInputChange}
                    className="w-full border border-border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary dark:bg-darksecondary dark:text-white"
                  >
                    <option value={0}>Belum Menikah</option>
                    <option value={1}>Sudah Menikah</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Batal</Button>
                <Button type="submit" disabled={isSubmitting || !formData.nama_lengkap}>
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Data'}
                </Button>
              </div>
            </form>
          </CardBox>
        </div>
      )}

    </div>
  );
};

export default DataPenghuni;