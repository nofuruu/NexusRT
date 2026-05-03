import { useState, useEffect } from 'react';
import CardBox from 'src/components/shared/CardBox';
import axiosInstance from 'src/api/axios';
import { Icon } from '@iconify/react';
import { Button } from 'src/components/ui/button';

const DataRumah = () => {
  // === STATE DATA UTAMA ===
  const [dataRumah, setDataRumah] = useState([]);
  const [dataPenghuni, setDataPenghuni] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // === STATE MODAL TAMBAH RUMAH ===
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nomorRumah, setNomorRumah] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');

  // === STATE MODAL EDIT RUMAH ===
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editRumahId, setEditRumahId] = useState('');
  const [editNomorRumah, setEditNomorRumah] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // === STATE MODAL HAPUS RUMAH ===
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [rumahToDelete, setRumahToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // === STATE MODAL ISI RUMAH (ASSIGN) ===
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedRumah, setSelectedRumah] = useState(null);
  const [selectedPenghuniId, setSelectedPenghuniId] = useState('');
  const [tanggalMulai, setTanggalMulai] = useState(new Date().toISOString().split('T')[0]);
  const [isAssigning, setIsAssigning] = useState(false);
  const [assignError, setAssignError] = useState('');

  // === STATE MODAL KOSONGKAN RUMAH ===
  const [isKosongkanModalOpen, setIsKosongkanModalOpen] = useState(false);
  const [rumahToKosongkan, setRumahToKosongkan] = useState(null);
  const [isMengosongkan, setIsMengosongkan] = useState(false);

  // === FUNGSI FETCH DATA ===
  const fetchData = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const [rumahRes, penghuniRes] = await Promise.all([
        axiosInstance.get('/rumah'),
        axiosInstance.get('/penghuni'),
      ]);
      setDataRumah(rumahRes.data);
      setDataPenghuni(penghuniRes.data);
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

  // === FUNGSI TAMBAH RUMAH ===
  const handleTambahRumah = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setModalError('');

    try {
      await axiosInstance.post('/rumah', { nomor_rumah: nomorRumah });
      setIsModalOpen(false);
      setNomorRumah('');
      fetchData();
    } catch (error) {
      console.error('Gagal menambah rumah:', error);
      setModalError(error.response?.data?.message || 'Terjadi kesalahan pada server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // === FUNGSI EDIT RUMAH ===
  const openEditModal = (rumah) => {
    setEditRumahId(rumah.id);
    setEditNomorRumah(rumah.nomor_rumah);
    setIsEditModalOpen(true);
  };

  const handleEditRumah = async (e) => {
    e.preventDefault();
    setIsEditing(true);
    try {
      await axiosInstance.put(`/rumah/${editRumahId}`, { nomor_rumah: editNomorRumah });
      setIsEditModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Gagal mengupdate rumah:', error);
      alert(error.response?.data?.message || 'Terjadi kesalahan saat mengupdate data.');
    } finally {
      setIsEditing(false);
    }
  };

  // === FUNGSI HAPUS RUMAH ===
  const openDeleteModal = (rumah) => {
    setRumahToDelete(rumah);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteRumah = async () => {
    if (!rumahToDelete) return;
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/rumah/${rumahToDelete.id}`);
      setIsDeleteModalOpen(false);
      setRumahToDelete(null);
      fetchData();
    } catch (error) {
      console.error('Gagal menghapus rumah:', error);
      alert(
        error.response?.data?.message || 'Data rumah ini masih memiliki relasi penghuni/histori.',
      );
    } finally {
      setIsDeleting(false);
    }
  };

  // === FUNGSI SUBMIT ISI RUMAH ===
  const openAssignModal = (rumah) => {
    setSelectedRumah(rumah);
    setSelectedPenghuniId('');
    setTanggalMulai(new Date().toISOString().split('T')[0]);
    setAssignError('');
    setIsAssignModalOpen(true);
  };

  const handleAssignPenghuni = async (e) => {
    e.preventDefault();
    setIsAssigning(true);
    setAssignError('');

    try {
      await axiosInstance.post(`/rumah/${selectedRumah.id}/assign`, {
        penghuni_id: selectedPenghuniId,
        tanggal_mulai: tanggalMulai,
      });

      setIsAssignModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Gagal mengisi rumah:', error);
      setAssignError(error.response?.data?.message || 'Terjadi kesalahan saat memproses data.');
    } finally {
      setIsAssigning(false);
    }
  };

  // === FUNGSI KOSONGKAN RUMAH ===
  const openKosongkanModal = (rumah) => {
    setRumahToKosongkan(rumah);
    setIsKosongkanModalOpen(true);
  };

  const handleKosongkanRumah = async () => {
    if (!rumahToKosongkan) return;
    setIsMengosongkan(true);
    try {
      await axiosInstance.post(`/rumah/${rumahToKosongkan.id}/kosongkan`);
      setIsKosongkanModalOpen(false);
      setRumahToKosongkan(null);
      fetchData();
    } catch (error) {
      console.error('Gagal mengosongkan rumah:', error);
      alert(error.response?.data?.message || 'Terjadi kesalahan saat mengosongkan rumah.');
    } finally {
      setIsMengosongkan(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 relative">
      <CardBox className="p-0 overflow-hidden">
        <div className="p-6 border-b border-border dark:border-darkborder sm:flex items-center justify-between">
          <div>
            <h5 className="card-title text-lg font-bold">Data Master Rumah</h5>
            <p className="text-sm text-muted-foreground font-normal mt-1">
              Kelola status hunian dan data historis rumah
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <Button onClick={fetchData} variant="outline" className="flex items-center gap-2">
              <Icon icon="solar:refresh-linear" width="18" />
              Refresh
            </Button>
            <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
              <Icon icon="solar:add-circle-linear" width="18" />
              Tambah Rumah
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
                <th className="px-6 py-4 font-semibold text-sm">Nomor Rumah</th>
                <th className="px-6 py-4 font-semibold text-sm">Status</th>
                <th className="px-6 py-4 font-semibold text-sm">Kepala Keluarga</th>
                <th className="px-6 py-4 font-semibold text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border dark:divide-darkborder">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-muted-foreground">
                    Memuat data...
                  </td>
                </tr>
              ) : dataRumah.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-muted-foreground">
                    Belum ada data rumah.
                  </td>
                </tr>
              ) : (
                dataRumah.map((rumah, index) => {
                  const penghuniAktif =
                    rumah.penghuni_aktif?.penghuni || rumah.penghuniAktif?.penghuni;

                  return (
                    <tr key={rumah.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground">{index + 1}</td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {rumah.nomor_rumah}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            rumah.status === 'Dihuni'
                              ? 'bg-success/10 text-success'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {rumah.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {rumah.status === 'Dihuni' && penghuniAktif ? (
                          <div>
                            <p className="font-medium">{penghuniAktif.nama_lengkap}</p>
                            <span className="text-xs text-muted-foreground">
                              {penghuniAktif.status_menetap}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm flex gap-1">
                        {rumah.status === 'Tidak dihuni' ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-primary border-primary hover:bg-primary hover:text-white"
                            onClick={() => openAssignModal(rumah)}
                          >
                            Isi Rumah
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-warning border-warning hover:bg-warning hover:text-white"
                            onClick={() => openKosongkanModal(rumah)}
                          >
                            Kosongkan
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" title="Lihat Histori">
                          <Icon icon="solar:history-linear" width="18" />
                        </Button>

                        <div className="w-px h-6 bg-border mx-1 self-center"></div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-primary hover:bg-primary/10"
                          title="Edit"
                          onClick={() => openEditModal(rumah)}
                        >
                          <Icon icon="solar:pen-new-square-outline" width="18" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-error hover:bg-error/10"
                          title="Hapus"
                          onClick={() => openDeleteModal(rumah)}
                        >
                          <Icon icon="solar:trash-bin-trash-outline" width="18" />
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </CardBox>

      {/* MODAL TAMBAH RUMAH */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <CardBox className="w-full max-w-md p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-foreground">Tambah Rumah Baru</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon icon="solar:close-circle-linear" width="24" />
              </button>
            </div>
            <form onSubmit={handleTambahRumah}>
              {modalError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
                  {modalError}
                </div>
              )}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nomor/Blok Rumah <span className="text-error">*</span>
                </label>
                {/* FIX STYLE INPUT: bg-transparent text-foreground */}
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Contoh: Blok A-01"
                  value={nomorRumah}
                  onChange={(e) => setNomorRumah(e.target.value)}
                  className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" disabled={isSubmitting || !nomorRumah.trim()}>
                  {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                </Button>
              </div>
            </form>
          </CardBox>
        </div>
      )}

      {/* MODAL EDIT RUMAH */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <CardBox className="w-full max-w-md p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-foreground">Edit Data Rumah</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon icon="solar:close-circle-linear" width="24" />
              </button>
            </div>
            <form onSubmit={handleEditRumah}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nomor/Blok Rumah <span className="text-error">*</span>
                </label>
                {/* FIX STYLE INPUT */}
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Contoh: Blok A-01"
                  value={editNomorRumah}
                  onChange={(e) => setEditNomorRumah(e.target.value)}
                  className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" disabled={isEditing || !editNomorRumah.trim()}>
                  {isEditing ? 'Menyimpan...' : 'Update Data'}
                </Button>
              </div>
            </form>
          </CardBox>
        </div>
      )}

      {/* MODAL HAPUS RUMAH */}
      {isDeleteModalOpen && rumahToDelete && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <CardBox className="w-full max-w-sm p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-error/10 flex items-center justify-center mb-4">
                <Icon icon="solar:trash-bin-trash-bold-duotone" className="text-2xl text-error" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">Hapus Rumah?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Anda yakin ingin menghapus rumah blok <strong>{rumahToDelete.nomor_rumah}</strong>?
                Tindakan ini tidak dapat dibatalkan.
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
                  onClick={handleDeleteRumah}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
                </Button>
              </div>
            </div>
          </CardBox>
        </div>
      )}

      {/* MODAL KOSONGKAN RUMAH */}
      {isKosongkanModalOpen && rumahToKosongkan && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <CardBox className="w-full max-w-sm p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center mb-4">
                <Icon icon="solar:danger-triangle-bold-duotone" className="text-2xl text-warning" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">Kosongkan Rumah?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Penghuni di rumah <strong>{rumahToKosongkan.nomor_rumah}</strong> akan dikeluarkan
                dari status aktif, dan rumah akan ditandai sebagai kosong.
              </p>

              <div className="flex w-full gap-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsKosongkanModalOpen(false)}
                  disabled={isMengosongkan}
                >
                  Batal
                </Button>
                <Button
                  className="w-full bg-warning hover:bg-warning/90 text-white"
                  onClick={handleKosongkanRumah}
                  disabled={isMengosongkan}
                >
                  {isMengosongkan ? 'Memproses...' : 'Ya, Kosongkan'}
                </Button>
              </div>
            </div>
          </CardBox>
        </div>
      )}

      {/* MODAL ISI RUMAH */}
      {isAssignModalOpen && selectedRumah && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <CardBox className="w-full max-w-md p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-foreground">Isi Rumah</h3>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon icon="solar:close-circle-linear" width="24" />
              </button>
            </div>

            <form onSubmit={handleAssignPenghuni}>
              {assignError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
                  {assignError}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-1">
                  Nomor Rumah
                </label>
                <input
                  type="text"
                  value={selectedRumah.nomor_rumah}
                  disabled
                  // Style Khusus Disabled: bg-muted text-muted-foreground
                  className="w-full border border-border bg-muted text-muted-foreground cursor-not-allowed rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-1">
                  Pilih Kepala Keluarga <span className="text-error">*</span>
                </label>
                {/* FIX STYLE DROPDOWN: bg-background text-foreground di select dan option */}
                <select
                  required
                  value={selectedPenghuniId}
                  onChange={(e) => setSelectedPenghuniId(e.target.value)}
                  className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                >
                  <option value="" disabled className="bg-background text-muted-foreground">
                    -- Pilih Penghuni --
                  </option>
                  {dataPenghuni.map((penghuni) => (
                    <option
                      key={penghuni.id}
                      value={penghuni.id}
                      className="bg-background text-foreground"
                    >
                      {penghuni.nama_lengkap} ({penghuni.status_menetap})
                    </option>
                  ))}
                </select>
                {dataPenghuni.length === 0 && (
                  <p className="text-xs text-warning mt-1">
                    Data penghuni kosong. Silakan tambah data di Master Penghuni terlebih dahulu.
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-1">
                  Tanggal Mulai Menempati <span className="text-error">*</span>
                </label>
                {/* FIX STYLE INPUT TANGGAL */}
                <input
                  type="date"
                  required
                  value={tanggalMulai}
                  onChange={(e) => setTanggalMulai(e.target.value)}
                  className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsAssignModalOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" disabled={isAssigning || !selectedPenghuniId}>
                  {isAssigning ? 'Memproses...' : 'Simpan & Isi Rumah'}
                </Button>
              </div>
            </form>
          </CardBox>
        </div>
      )}
    </div>
  );
};

export default DataRumah;
