import CardBox from 'src/components/shared/CardBox';

export const RecentTransaction = () => {
  // Mockup data transaksi disesuaikan dengan skenario RT
  const timelineData = [
    {
      key: 'timeline1',
      time: '09:30',
      desc: 'Iuran Satpam & Kebersihan',
      amount: '+ Rp 115.000',
      source: 'Rumah No. 05',
      isIncome: true, // Pemasukan
      borderColor: 'border-success',
      isLastItem: false,
    },
    {
      key: 'timeline2',
      time: '10:00',
      desc: 'Token Listrik Pos Satpam',
      amount: '- Rp 50.000',
      source: 'Pengeluaran',
      isIncome: false, // Pengeluaran
      borderColor: 'border-warning',
      isLastItem: false,
    },
    {
      key: 'timeline3',
      time: '11:15',
      desc: 'Iuran Kebersihan (1 Tahun)',
      amount: '+ Rp 180.000',
      source: 'Rumah No. 12',
      isIncome: true,
      borderColor: 'border-primary',
      isLastItem: false,
    },
    {
      key: 'timeline4',
      time: '14:20',
      desc: 'Perbaikan Selokan Warga',
      amount: '- Rp 350.000',
      source: 'Pengeluaran',
      isIncome: false,
      borderColor: 'border-error',
      isLastItem: false,
    },
    {
      key: 'timeline5',
      time: '16:00',
      desc: 'Iuran Satpam',
      amount: '+ Rp 100.000',
      source: 'Rumah No. 03',
      isIncome: true,
      borderColor: 'border-success',
      isLastItem: false,
    },
    {
      key: 'timeline6',
      time: '08:00',
      desc: 'Iuran Satpam & Kebersihan',
      amount: '+ Rp 115.000',
      source: 'Rumah No. 08',
      isIncome: true,
      borderColor: 'border-success',
      isLastItem: true, // Item terakhir untuk menghilangkan garis border timeline
    },
  ];

  return (
    <CardBox className="h-full w-full">
      <div>
        <h5 className="card-title">Aktivitas Kas Terbaru</h5>
        <p className="text-sm text-muted-foreground font-normal">
          Riwayat pemasukan iuran & pengeluaran RT
        </p>
      </div>

      <div className="mt-6">
        {timelineData.map((item) => {
          return (
            <div key={item.key} className="flex gap-x-3">
              {/* Bagian Waktu */}
              <div className="w-1/4 text-end">
                <span className="font-medium text-foreground dark:text-muted-foreground">
                  {item.time}
                </span>
              </div>
              
              {/* Bagian Garis Timeline */}
              <div
                className={`relative ${
                  item.isLastItem ? 'after:hidden' : ''
                } after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-border`}
              >
                <div className="relative z-1 w-7 h-7 flex justify-center items-center">
                  <div
                    className={`h-3 w-3 rounded-full bg-transparent border-2 ${item.borderColor}`}
                  ></div>
                </div>
              </div>

              {/* Bagian Konten/Deskripsi Transaksi */}
              <div className="w-3/4 pt-0.5 pb-6">
                <div>
                  <h6 className="font-semibold text-foreground dark:text-white">
                    {item.desc}
                  </h6>
                  <div className="flex items-center gap-2 mt-1">
                    <span 
                      className={`font-medium ${
                        item.isIncome ? 'text-success dark:text-green-400' : 'text-error dark:text-red-400'
                      }`}
                    >
                      {item.amount}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      • {item.source}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </CardBox>
  );
};