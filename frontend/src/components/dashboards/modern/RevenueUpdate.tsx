import { useState } from 'react';
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

const RevenueUpdate = () => {
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState(`Tahun ${currentYear}`);

  // Strongly typed chart data
  interface MonthlyChartData {
    series: ApexAxisChartSeries;
    xaxis: ApexOptions['xaxis'];
  }

  // Data Mockup - Nantinya data ini dihasilkan dari Backend (SUM Iuran per bulan)
  // Nilai di sini adalah representasi Ribuan Rupiah. Contoh: 1500 = Rp 1.500.000
  const chartDataByMonth: Record<string, MonthlyChartData> = {
    'Tahun 2026': {
      series: [
        {
          name: 'Pemasukan',
          data: [1500, 2700, 2200, 3000, 1500, 1000, 1400, 2400, 1900, 2300, 1400, 1100],
        },
        {
          name: 'Pengeluaran',
          data: [-1800, -1100, -2500, -1500, -600, -1800, -1200, -2300, -1900, -2300, -1200, -2500],
        },
      ],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
      },
    },
    'Tahun 2025': {
      series: [
        {
          name: 'Pemasukan',
          data: [2000, 2500, 2800, 3000, 2000, 1500, 2300, 1500, 1000, 1400, 2400, 1900],
        },
        {
          name: 'Pengeluaran',
          data: [-1200, -1500, -2000, -1000, -800, -1300, -1500, -600, -1800, -1200, -2300, -1900],
        },
      ],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
      },
    },
    'Tahun 2024': {
      series: [
        {
          name: 'Pemasukan',
          data: [1800, 2200, 2600, 3000, 1700, 1200, 2000, 2500, 2800, 1800, 2000, 1500],
        },
        {
          name: 'Pengeluaran',
          data: [-1500, -1300, -2200, -1200, -700, -1600, -1200, -1500, -2000, -1000, -800, -1300],
        },
      ],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
      },
    },
  };

  const baseChartOptions: ApexOptions = {
    chart: {
      toolbar: { show: false },
      type: 'bar' as const,
      fontFamily: 'inherit',
      foreColor: '#7C8FAC',
      height: 310,
      stacked: true,
      width: '100%',
      offsetX: -20,
    },
    colors: ['var(--color-primary)', 'var(--color-error)'], // Menggunakan warna merah (error) untuk pengeluaran
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '20%',
        borderRadius: 6,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },
    dataLabels: { enabled: false },
    legend: { 
      show: true, // Menampilkan legenda Pemasukan vs Pengeluaran agar RT tidak bingung
      position: 'bottom',
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
    },
    yaxis: {
      min: -3000,
      max: 3000,
      tickAmount: 6,
      labels: {
        formatter: (val: number) => {
          // Menyesuaikan label agar menjadi "1.5 Jt" atau "500 Rb" dll
          if (val === 0) return '0';
          const isNegative = val < 0;
          const absVal = Math.abs(val);
          const formatted = absVal >= 1000 ? `${absVal / 1000} Jt` : `${absVal} Rb`;
          return isNegative ? `-${formatted}` : formatted;
        },
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) => {
          // Tooltip menunjukkan nilai Rupiah utuh
          const absoluteVal = Math.abs(val) * 1000;
          return `Rp ${absoluteVal.toLocaleString('id-ID')}`;
        },
      },
    },
  };

  const ChartData: ApexOptions = {
    ...baseChartOptions,
    xaxis: {
      ...chartDataByMonth[selectedYear].xaxis,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
  };

  return (
    <>
      <CardBox className="pb-0 h-full w-full">
        <div className="sm:flex items-center justify-between mb-6">
          <div>
            <h5 className="card-title">Grafik Keuangan</h5>
            <p className="text-sm text-muted-foreground font-normal">
              Ringkasan Pemasukan & Pengeluaran RT
            </p>
          </div>
          <div className="sm:mt-0 mt-4">
            <Select
              value={selectedYear}
              onValueChange={(val) => setSelectedYear(val as keyof typeof chartDataByMonth)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Pilih Tahun" />
              </SelectTrigger>
              <SelectContent>
                {/* Looping keys dari object data agar select option selalu sinkron */}
                {Object.keys(chartDataByMonth).map((year) => (
                   <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Chart
          options={ChartData}
          series={chartDataByMonth[selectedYear].series}
          type="bar"
          height="316px"
          width={'100%'}
        />
      </CardBox>
    </>
  );
};

export { RevenueUpdate };