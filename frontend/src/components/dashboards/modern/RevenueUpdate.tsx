import { useState, useEffect } from 'react';
import CardBox from '../../shared/CardBox';
import Chart from 'react-apexcharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { ApexOptions } from 'apexcharts';
import axiosInstance from 'src/api/axios';

const RevenueUpdate = () => {
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [series, setSeries] = useState([
    { name: 'Pemasukan', data: Array(12).fill(0) },
    { name: 'Pengeluaran', data: Array(12).fill(0) }
  ]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data dari API berdasarkan tahun yang dipilih
  const fetchChartData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/keuangan/laporan-tahunan?tahun=${selectedYear}`);
      
      // Update series dengan data aktual
      // Nilai dari API sudah dalam satuan Rupiah penuh, ApexChart akan memformatnya di label
      setSeries([
        {
          name: 'Pemasukan',
          data: response.data.pemasukan.map(val => val / 1000) // Ubah ke satuan Ribuan agar skala grafik pas
        },
        {
          name: 'Pengeluaran',
          data: response.data.pengeluaran.map(val => val / 1000) // Ubah ke satuan Ribuan
        }
      ]);
    } catch (error) {
      console.error("Gagal memuat data grafik:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [selectedYear]);

  const baseChartOptions: ApexOptions = {
    chart: {
      toolbar: { show: false },
      type: 'bar',
      fontFamily: 'inherit',
      foreColor: '#7C8FAC',
      stacked: true,
      offsetX: -10,
    },
    colors: ['#0085db', '#fb977d'], // Biru untuk masuk, Soft Red untuk keluar
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '25%',
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    legend: { show: true, position: 'bottom' },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        formatter: (val: number) => {
          if (val === 0) return '0';
          const absVal = Math.abs(val);
          // Mengubah label skala menjadi Jt atau Rb
          return absVal >= 1000 ? `${(val / 1000).toFixed(1)} Jt` : `${val} Rb`;
        },
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) => {
          // Tooltip dikembalikan ke angka asli (dikali 1000 karena kita simpan dalam ribuan)
          return `Rp ${Math.abs(val * 1000).toLocaleString('id-ID')}`;
        },
      },
    },
  };

  return (
    <CardBox className="pb-0 h-full w-full">
      <div className="sm:flex items-center justify-between mb-6">
        <div>
          <h5 className="card-title text-lg font-bold">Grafik Keuangan Aktual</h5>
          <p className="text-sm text-muted-foreground font-normal">
            Ringkasan Pemasukan & Pengeluaran RT {selectedYear}
          </p>
        </div>
        <div className="sm:mt-0 mt-4">
          <Select
            value={selectedYear}
            onValueChange={(val) => setSelectedYear(val)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Tahun" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="h-[316px] flex items-center justify-center text-muted-foreground">
          Menghitung Arus Kas...
        </div>
      ) : (
        <Chart
          options={baseChartOptions}
          series={series}
          type="bar"
          height="316px"
          width={'100%'}
        />
      )}
    </CardBox>
  );
};

export { RevenueUpdate };