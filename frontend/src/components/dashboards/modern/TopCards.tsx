import CardBox from "../../shared/CardBox"
import iconConnect from "src/assets/images/svgs/icon-connect.svg"
import iconSpeechBubble from "src/assets/images/svgs/icon-speech-bubble.svg"
import iconFavorites from "src/assets/images/svgs/icon-favorites.svg"
import iconMailbox from "src/assets/images/svgs/icon-mailbox.svg"
import iconBriefcase from "src/assets/images/svgs/icon-briefcase.svg"
import iconUser from "src/assets/images/svgs/icon-user-male.svg"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";

import 'swiper/css';
import { Link } from "react-router-dom"; // Sangat disarankan menggunakan react-router-dom

const TopCards = () => {

  // Data disesuaikan dengan kebutuhan Skill Fit Test RT
  const TopCardInfo = [
    {
      key: "card-kas",
      title: "Saldo Kas",
      desc: "Rp 5.2 Jt", // Mockup saldo
      img: iconBriefcase, // Cocok untuk administrasi/keuangan
      bgcolor: "bg-success/10 dark:bg-success/10",
      textclr: "text-success dark:text-success",
      url: "/pembayaran" // Arahkan ke halaman manajemen pembayaran
    },
    {
      key: "card-rumah-isi",
      title: "Rumah Dihuni",
      desc: "15/20",
      img: iconMailbox, // Cocok untuk representasi rumah/alamat
      bgcolor: "bg-info/10 dark:bg-info/10",
      textclr: "text-info dark:text-info",
      url: "/rumah"
    },
    {
      key: "card-penghuni",
      title: "Total Penghuni",
      desc: "32 Jiwa",
      img: iconUser, // Representasi warga
      bgcolor: "bg-primary/10 dark:bg-lightprimary",
      textclr: "text-primary dark:text-primary",
      url: "/penghuni"
    },
    {
      key: "card-tunggakan",
      title: "Tunggakan",
      desc: "3 Rumah",
      img: iconSpeechBubble, // Sebagai pengingat/notifikasi
      bgcolor: "bg-error/10 dark:bg-error/10",
      textclr: "text-error dark:text-error",
      url: "/pembayaran"
    },
    {
      key: "card-pengeluaran",
      title: "Pengeluaran",
      desc: "Rp 1.1 Jt",
      img: iconConnect, 
      bgcolor: "bg-warning/10 dark:bg-warning/10",
      textclr: "text-warning dark:text-warning",
      url: "/pembayaran"
    },
    {
      key: "card-rumah-kosong",
      title: "Rumah Kosong",
      desc: "5 Unit",
      img: iconFavorites, 
      bgcolor: "bg-secondary/10 dark:bg-secondary/10",
      textclr: "text-primary dark:text-primary",
      url: "/rumah"
    },
  ];

  return (
    <>
      <div>
        <Swiper
          slidesPerView={6}
          spaceBetween={24}
          loop={true}
          freeMode={true}
          grabCursor={true}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 14 },
            768: { slidesPerView: 3, spaceBetween: 18 },
            1030: { slidesPerView: 4, spaceBetween: 18 },
            1200: { slidesPerView: 6, spaceBetween: 24 },
          }}
          className="mySwiper"
        >
          {
            TopCardInfo.map((item) => {
              return (
                <SwiperSlide key={item.key}>
                  <Link to={item.url}>
                    <CardBox className={`shadow-none ${item.bgcolor} w-full border-none`}>
                      <div className="text-center hover:scale-105 transition-all ease-in-out">
                        <div className="flex justify-center">
                          <img 
                            src={item.img}
                            width="50" 
                            height="50" 
                            className="mb-3" 
                            alt={`${item.title}-icon`} 
                          />
                        </div>
                        <p className={`font-semibold ${item.textclr} mb-1`}>
                          {item.title}
                        </p>
                        <h5 className={`text-lg font-semibold ${item.textclr} mb-0`}>
                          {item.desc}
                        </h5>
                      </div>
                    </CardBox>
                  </Link>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
    </>
  )
}

export { TopCards }