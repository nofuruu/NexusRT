import { useState, useEffect } from "react";
import CardBox from "../../shared/CardBox";
import iconConnect from "src/assets/images/svgs/icon-connect.svg";
import iconSpeechBubble from "src/assets/images/svgs/icon-speech-bubble.svg";
import iconFavorites from "src/assets/images/svgs/icon-favorites.svg";
import iconMailbox from "src/assets/images/svgs/icon-mailbox.svg";
import iconBriefcase from "src/assets/images/svgs/icon-briefcase.svg";
import iconUser from "src/assets/images/svgs/icon-user-male.svg";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import axiosInstance from "src/api/axios";

import 'swiper/css';
import { Link } from "react-router-dom";

const TopCards = () => {
  const [stats, setStats] = useState({
    saldoKas: 0,
    rumahIsi: 0,
    totalRumah: 0,
    totalPenghuni: 0,
    totalPengeluaran: 0,
    rumahKosong: 0,
    tunggakan: 0 // Opsional jika ingin dihitung lebih detail nanti
  });

  const fetchData = async () => {
    try {
      const [rumahRes, penghuniRes, laporanRes] = await Promise.all([
        axiosInstance.get('/rumah'),
        axiosInstance.get('/penghuni'),
        axiosInstance.get('/keuangan/laporan-tahunan') // Mengambil total saldo
      ]);

      const rumahs = rumahRes.data;
      const dihuni = rumahs.filter(r => r.status === 'Dihuni').length;
      
      // Menghitung total pengeluaran dari array laporan
      const pengeluaranTotal = laporanRes.data.pengeluaran.reduce((a, b) => a + Math.abs(b), 0);

      setStats({
        saldoKas: laporanRes.data.total_saldo_tahun_ini,
        rumahIsi: dihuni,
        totalRumah: rumahs.length,
        totalPenghuni: penghuniRes.data.length,
        totalPengeluaran: pengeluaranTotal,
        rumahKosong: rumahs.length - dihuni,
        tunggakan: 0 // Logika tunggakan bisa ditambahkan sesuai kebutuhan filter bulan
      });
    } catch (error) {
      console.error("Gagal mengambil dashboard stats:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatSingkatRupiah = (angka) => {
    if (angka >= 1000000) return `Rp ${(angka / 1000000).toFixed(1)} Jt`;
    if (angka >= 1000) return `Rp ${(angka / 1000).toFixed(0)} Rb`;
    return `Rp ${angka}`;
  };

  const TopCardInfo = [
    {
      key: "card-kas",
      title: "Saldo Kas",
      desc: formatSingkatRupiah(stats.saldoKas),
      img: iconBriefcase,
      bgcolor: "bg-success/10",
      textclr: "text-success",
      url: "/administrasi/laporan"
    },
    {
      key: "card-rumah-isi",
      title: "Rumah Dihuni",
      desc: `${stats.rumahIsi}/${stats.totalRumah}`,
      img: iconMailbox,
      bgcolor: "bg-info/10",
      textclr: "text-info",
      url: "/master/rumah"
    },
    {
      key: "card-penghuni",
      title: "Total Penghuni",
      desc: `${stats.totalPenghuni} Jiwa`,
      img: iconUser,
      bgcolor: "bg-primary/10",
      textclr: "text-primary",
      url: "/master/penghuni"
    },
    {
      key: "card-pengeluaran",
      title: "Total Pengeluaran",
      desc: formatSingkatRupiah(stats.totalPengeluaran),
      img: iconConnect,
      bgcolor: "bg-error/10",
      textclr: "text-error",
      url: "/administrasi/pengeluaran"
    },
    {
      key: "card-rumah-kosong",
      title: "Rumah Kosong",
      desc: `${stats.rumahKosong} Unit`,
      img: iconFavorites,
      bgcolor: "bg-secondary/10",
      textclr: "text-primary",
      url: "/master/rumah"
    },
    {
        key: "card-tunggakan",
        title: "Tunggakan",
        desc: "Check Data",
        img: iconSpeechBubble,
        bgcolor: "bg-warning/10",
        textclr: "text-warning",
        url: "/administrasi/iuran"
      },
  ];

  return (
    <div className="mb-8">
      <Swiper
        slidesPerView={6}
        spaceBetween={24}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 6 },
        }}
      >
        {TopCardInfo.map((item) => (
          <SwiperSlide key={item.key}>
            <Link to={item.url}>
              <CardBox className={`shadow-none ${item.bgcolor} w-full border-none`}>
                <div className="text-center hover:scale-105 transition-all">
                  <div className="flex justify-center">
                    <img src={item.img} width="40" height="40" className="mb-3" alt={item.title} />
                  </div>
                  <p className={`text-xs font-semibold ${item.textclr} mb-1 uppercase tracking-wider`}>
                    {item.title}
                  </p>
                  <h5 className={`text-lg font-bold ${item.textclr}`}>
                    {item.desc}
                  </h5>
                </div>
              </CardBox>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export { TopCards };