export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: string;
  children?: ChildItem[];
  item?: unknown;
  url?: string;
  color?: string;
  disabled?: boolean;
  subtitle?: string;
  badge?: boolean;
  badgeType?: string;
  isPro?: boolean;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: string;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: string;
  disabled?: boolean;
  subtitle?: string;
  badgeType?: string;
  badge?: boolean;
  isPro?: boolean;
}

import { uniqueId } from 'lodash';

const SidebarContent: MenuItem[] = [
  {
    heading: 'Beranda',
    children: [
      {
        name: 'Dashboard',
        icon: 'solar:widget-2-linear',
        id: uniqueId(),
        url: '/dashboard',
        isPro: false,
      },
    ],
  },
  {
    heading: 'Master Data',
    children: [
      {
        name: 'Data Rumah',
        icon: 'solar:home-2-linear', 
        id: uniqueId(),
        url: '/master/rumah',
        isPro: false,
      },
      {
        name: 'Data Penghuni',
        icon: 'solar:users-group-rounded-linear', // Ikon grup orang/warga
        id: uniqueId(),
        url: '/master/penghuni',
        isPro: false,
      },
    ],
  },
  {
    heading: 'Administrasi',
    children: [
      {
        name: 'Penerimaan Iuran',
        icon: 'solar:wallet-money-linear', // Ikon dompet untuk iuran masuk
        id: uniqueId(),
        url: '/administrasi/iuran',
        isPro: false,
      },
      {
        name: 'Pengeluaran RT',
        icon: 'solar:card-send-linear', // Ikon kartu untuk pengeluaran
        id: uniqueId(),
        url: '/administrasi/pengeluaran',
        isPro: false,
      },
      {
        name: 'Laporan Keuangan',
        icon: 'solar:document-text-linear', // Ikon dokumen untuk report
        id: uniqueId(),
        url: '/administrasi/laporan',
        isPro: false,
      },
    ],
  },
  {
    heading: 'Pengaturan',
    children: [
      {
        id: uniqueId(),
        name: 'Profil Akun',
        icon: 'solar:user-circle-linear',
        url: '/user-profile',
        isPro: false,
      },
    ],
  },
];

export default SidebarContent;
