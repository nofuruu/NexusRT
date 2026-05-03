'use client';

import { useState, useEffect, use } from 'react';
import { Icon } from '@iconify/react';
import * as profileData from './data';
import SimpleBar from 'simplebar-react';
import { Link, useNavigate } from 'react-router-dom';
import profileimg from 'src/assets/images/profile/user-1.jpg';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { Button } from 'src/components/ui/button';
import axiosInstance from 'src/api/axios';

const Profile = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // PERBAIKAN 1: Jadikan state user sebagai object placeholder yang memiliki property name dan role
  const [user, setUser] = useState(null); 

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

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await axiosInstance.post('/logout');
    } catch (error) {
      console.error("Gagal logout dari server:", error);
    } finally {
      localStorage.removeItem('token');
      navigate('/auth/auth2/login', { replace: true });
    }
  };

  return (
    <>
      <div className="relative group/menu ps-1 sm:ps-15 shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="hover:text-primary hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary transition-colors">
              <img src={profileimg} alt="logo" height="35" width="35" className="rounded-full" />
            </span>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-screen sm:w-[200px] pb-6 pt-4 rounded-md shadow-lg border-border"
          >
            <div className="px-4 pb-2">
              <p className="text-sm font-semibold text-foreground">
                {isLoading ? (
                  'Memuat data...' 
                ) : (
                   user?.name || 'Admin'
                )}
              </p>
            </div>
            
            <DropdownMenuSeparator className='mb-2' />

            <SimpleBar>
              {profileData.profileDD.map((items, index) => (
                <DropdownMenuItem
                  key={index}
                  asChild
                  className="px-4 py-2 flex justify-between items-center bg-hover group/link w-full cursor-pointer focus:bg-muted"
                >
                  <Link to={items.url}>
                    <div className="w-full">
                      <div className="ps-0 flex items-center gap-3 w-full">
                        <Icon
                          icon={items.icon}
                          className="text-lg text-muted-foreground group-hover/link:text-primary"
                        />
                        <div className="w-3/4">
                          <h5 className="mb-0 text-sm text-muted-foreground group-hover/link:text-primary font-medium">
                            {items.title}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </SimpleBar>

            <DropdownMenuSeparator className='my-2' />

            <div className="pt-2 px-4">
              <Button
                onClick={() => setShowLogoutModal(true)}
                variant="ghost"
                className="w-full justify-start text-error hover:text-error hover:bg-error/10"
              >
                <Icon icon="solar:logout-2-outline" className="mr-2 text-lg" />
                Logout
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* CUSTOM LOGOUT MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-card w-full max-w-sm rounded-xl p-6 shadow-2xl border border-border animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-error/10 flex items-center justify-center mb-4">
                <Icon icon="solar:logout-2-bold-duotone" className="text-2xl text-error" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">Akhiri Sesi?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Anda akan keluar dari sistem NexusRT. Anda perlu login kembali untuk mengakses data warga.
              </p>
              
              <div className="flex w-full gap-3">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setShowLogoutModal(false)}
                  disabled={isLoggingOut}
                >
                  Batal
                </Button>
                <Button 
                  className="w-full bg-error hover:bg-error/90 text-white" 
                  onClick={confirmLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <>
                      <Icon icon="solar:spinner-linear" className="mr-2 h-4 w-4 animate-spin" />
                      Keluar...
                    </>
                  ) : (
                    'Ya, Keluar'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;