import { useState, useEffect } from 'react';
import axiosInstance from 'src/api/axios'; // Pastikan path import axios ini sesuai dengan struktur foldermu
import userImg from '../../../assets/images/profile/user-1.jpg';
import supportImg from '../../../assets/images/dashboard/customer-support-img.png';

const ProfileWelcome = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/user');
        setUser(response.data);
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []); 

  return (
    <div className="relative flex items-center justify-between bg-lightsecondary rounded-lg p-6">
      <div className="flex items-center gap-3">
        <div>
          <img src={userImg} alt="user-img" width={50} height={50} className="rounded-full" />
        </div>
        <div className="flex flex-col gap-0.5">
          <h5 className="card-title">
            {isLoading ? (
              'Memuat data...'
              ) : (
              `Selamat Datang Kembali, ${user?.name || 'Admin'} 👋`
            )}
          </h5>
          <p className="text-muted-foreground">Cek Laporan Perumahan Disini</p>
        </div>
      </div>

      <div className="hidden sm:block absolute right-8 bottom-0">
        <img src={supportImg} alt="support-img" width={145} height={95} />
      </div>
    </div>
  );
};

export default ProfileWelcome;