import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useEffect } from "react";
import BreadcrumbComp from "src/layouts/full/shared/breadcrumb/BreadcrumbComp";
import CardBox from "src/components/shared/CardBox";
import profileImg from "src/assets/images/profile/user-1.jpg";
import { Button } from "src/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "src/components/ui/dialog";
import { Label } from "src/components/ui/label";
import { Input } from "src/components/ui/input";
import axiosInstance from 'src/api/axios';

const UserProfile = () => {
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState<"personal" | "address" | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // State profile disamakan persis dengan field database Laravel
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        position: "",
        nik: "",
        location: "",
        block: "",
        rt_rw: "",
        village: "",
        city: ""
    });

    const [tempProfile, setTempProfile] = useState(profile);

    const BCrumb = [
        { to: "/", title: "Home" },
        { title: "Profil Pengurus" },
    ];

    // Mengambil data dari API saat halaman dimuat
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get('/profile');
                // Laravel mengirimkan data di dalam property 'data'
                const userData = response.data.data; 
                
                // Mengubah null menjadi string kosong agar input React tidak error (uncontrolled input)
                const safeData = Object.keys(userData).reduce((acc, key) => {
                    acc[key] = userData[key] === null ? "" : userData[key];
                    return acc;
                }, {} as any);

                setProfile(safeData);
            } catch (error) {
                console.error("Gagal mengambil data profil", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Set temp data saat modal dibuka
    useEffect(() => {
        if (openModal) {
            setTempProfile(profile);
        }
    }, [openModal, profile]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Mengirim data ke Laravel menggunakan metode PUT
            const response = await axiosInstance.put('/profile', tempProfile);
            
            // Update state UI dengan data terbaru dari server
            setProfile(response.data.data);
            setOpenModal(false);
        } catch (error) {
            console.error("Gagal menyimpan data:", error);
            alert("Gagal menyimpan perubahan. Periksa koneksi atau input Anda.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Icon icon="solar:spinner-linear" className="animate-spin text-4xl text-primary" /></div>;
    }

    return (
        <>
            <BreadcrumbComp title="Profil Pengurus" items={BCrumb} />
            <div className="flex flex-col gap-6">
                <CardBox className="p-6 overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-center gap-6 rounded-xl relative w-full break-words">
                        <div>
                            <img src={profileImg} alt="image" width={80} height={80} className="rounded-full ring-4 ring-primary/20" />
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center sm:justify-between items-center w-full">
                            <div className="flex flex-col sm:text-left text-center gap-1.5">
                                <h5 className="card-title text-xl">{profile.name}</h5>
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 md:gap-3">
                                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-md uppercase tracking-wider">
                                        {profile.position || 'Belum diatur'}
                                    </span>
                                    <div className="hidden h-4 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                        <Icon icon="solar:map-point-outline" /> {profile.location || 'Alamat belum diatur'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBox>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <CardBox className="p-6 overflow-hidden h-full flex flex-col justify-between">
                        <div>
                            <h5 className="card-title mb-6 flex items-center gap-2">
                                <Icon icon="solar:user-id-outline" className="text-primary text-xl" /> Data Pribadi
                            </h5>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
                                <div><p className="text-xs text-muted-foreground">Nama Lengkap</p><p className="font-medium">{profile.name}</p></div>
                                <div><p className="text-xs text-muted-foreground">NIK</p><p className="font-medium">{profile.nik || '-'}</p></div>
                                <div><p className="text-xs text-muted-foreground">Email</p><p className="font-medium">{profile.email}</p></div>
                                <div><p className="text-xs text-muted-foreground">No. HP / WhatsApp</p><p className="font-medium">{profile.phone || '-'}</p></div>
                                <div><p className="text-xs text-muted-foreground">Jabatan Kepengurusan</p><p className="font-medium">{profile.position || '-'}</p></div>
                            </div>
                        </div>
                        <div className="flex justify-end border-t pt-4 mt-auto">
                            <Button onClick={() => { setModalType("personal"); setOpenModal(true); }} className="flex items-center gap-2">
                                <Icon icon="solar:pen-new-square-outline" width="18" /> Edit Data
                            </Button>
                        </div>
                    </CardBox>

                    <CardBox className="p-6 overflow-hidden h-full flex flex-col justify-between">
                        <div>
                            <h5 className="card-title mb-6 flex items-center gap-2">
                                <Icon icon="solar:home-angle-outline" className="text-primary text-xl" /> Domisili / Alamat
                            </h5>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
                                <div><p className="text-xs text-muted-foreground">Perumahan / Wilayah</p><p className="font-medium">{profile.location || '-'}</p></div>
                                <div><p className="text-xs text-muted-foreground">Blok / Nomor</p><p className="font-medium">{profile.block || '-'}</p></div>
                                <div><p className="text-xs text-muted-foreground">RT / RW</p><p className="font-medium">{profile.rt_rw || '-'}</p></div>
                                <div><p className="text-xs text-muted-foreground">Kelurahan</p><p className="font-medium">{profile.village || '-'}</p></div>
                                <div><p className="text-xs text-muted-foreground">Kota / Kabupaten</p><p className="font-medium">{profile.city || '-'}</p></div>
                            </div>
                        </div>
                        <div className="flex justify-end border-t pt-4 mt-auto">
                            <Button onClick={() => { setModalType("address"); setOpenModal(true); }} className="flex items-center gap-2">
                                <Icon icon="solar:pen-new-square-outline" width="18" /> Edit Alamat
                            </Button>
                        </div>
                    </CardBox>
                </div>
            </div>

            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="mb-4 text-xl">
                            {modalType === "personal" ? "Edit Data Pribadi" : "Edit Domisili"}
                        </DialogTitle>
                    </DialogHeader>

                    {modalType === "personal" ? (
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div className="flex flex-col gap-2 lg:col-span-2">
                                <Label htmlFor="name">Nama Lengkap</Label>
                                <Input id="name" value={tempProfile.name} onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="nik">NIK (Nomor Induk Kependudukan)</Label>
                                <Input id="nik" value={tempProfile.nik} onChange={(e) => setTempProfile({ ...tempProfile, nik: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="position">Jabatan (Admin/RT/RW)</Label>
                                <Input id="position" value={tempProfile.position} onChange={(e) => setTempProfile({ ...tempProfile, position: e.target.value })} />
                            </div>
                            {/* Email dinonaktifkan editnya untuk keamanan login */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email">Email Sistem</Label>
                                <Input id="email" type="email" value={tempProfile.email} disabled className="bg-gray-100 cursor-not-allowed" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="phone">No. WhatsApp</Label>
                                <Input id="phone" value={tempProfile.phone} onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })} />
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div className="flex flex-col gap-2 lg:col-span-2">
                                <Label htmlFor="location">Nama Perumahan / Wilayah</Label>
                                <Input id="location" value={tempProfile.location} onChange={(e) => setTempProfile({ ...tempProfile, location: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="block">Blok / Nomor Rumah</Label>
                                <Input id="block" value={tempProfile.block} onChange={(e) => setTempProfile({ ...tempProfile, block: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="rt_rw">RT / RW</Label>
                                <Input id="rt_rw" value={tempProfile.rt_rw} onChange={(e) => setTempProfile({ ...tempProfile, rt_rw: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="village">Kelurahan / Desa</Label>
                                <Input id="village" value={tempProfile.village} onChange={(e) => setTempProfile({ ...tempProfile, village: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="city">Kota / Kabupaten</Label>
                                <Input id="city" value={tempProfile.city} onChange={(e) => setTempProfile({ ...tempProfile, city: e.target.value })} />
                            </div>
                        </div>
                    )}

                    <DialogFooter className="flex gap-2 mt-6">
                        <Button variant="outline" onClick={() => setOpenModal(false)} disabled={isSaving}>
                            Batal
                        </Button>
                        <Button onClick={handleSave} disabled={isSaving}>
                            {isSaving ? (
                                <>
                                    <Icon icon="solar:spinner-linear" className="mr-2 animate-spin" /> Menyimpan...
                                </>
                            ) : (
                                "Simpan Perubahan"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UserProfile;