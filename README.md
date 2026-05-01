# Aplikasi Manajemen Administrasi Perumahan (Community Management System)

Sistem terintegrasi untuk mengelola administrasi perumahan, meliputi manajemen penghuni, pengelolaan rumah/unit, tracking pembayaran iuran bulanan, dan pelaporan keuangan.

## 📋 Daftar Isi
- [Gambaran Umum](#gambaran-umum)
- [Teknologi](#teknologi)
- [Struktur Proyek](#struktur-proyek)
- [Fitur Utama](#fitur-utama)
- [Persyaratan Sistem](#persyaratan-sistem)
- [Panduan Instalasi](#panduan-instalasi)
- [Status Pengembangan](#status-pengembangan)
- [Dokumentasi Frontend](#dokumentasi-frontend)
- [Dokumentasi Backend](#dokumentasi-backend)
- [Entity Relationship Diagram (ERD)](#entity-relationship-diagram)

---

## 🎯 Gambaran Umum

Aplikasi ini dirancang untuk memudahkan Ketua RT dalam mengelola administrasi perumahan secara digital dan terintegrasi. Sistem ini memungkinkan tracking pembayaran iuran bulanan, manajemen data penghuni, dan pembuatan laporan keuangan dengan visualisasi data yang komprehensif.

**Use Case**: Pengelolaan administrasi perumahan dengan total 20 unit rumah (15 dihuni tetap, 5 kontrak/sementara)

### Iuran Bulanan:
- **Iuran Satpam**: Rp 100.000,-
- **Iuran Kebersihan**: Rp 15.000,-

---

## 🛠️ Teknologi

| Komponen | Teknologi | Versi |
|----------|-----------|-------|
| **Backend** | Laravel (PHP) | 11.x |
| **Frontend** | React + TypeScript | 18.x |
| **Database** | MySQL | 8.0+ |
| **Build Tool** | Vite | 5.x |
| **Package Manager** | pnpm | Latest |

---

## 📁 Struktur Proyek

```
jagoanhostingje/
├── backend/                    # Aplikasi Backend Laravel
│   ├── app/                   # Logika aplikasi
│   │   ├── Actions/           # Business logic/service classes
│   │   ├── Concerns/          # Shared traits
│   │   ├── Enums/             # Enum definitions
│   │   ├── Http/              # Controllers, Requests, Resources
│   │   ├── Models/            # Eloquent models
│   │   ├── Notifications/     # Notification classes
│   │   ├── Policies/          # Authorization policies
│   │   ├── Providers/         # Service providers
│   │   ├── Rules/             # Custom validation rules
│   │   └── Support/           # Helper classes
│   ├── bootstrap/             # Framework initialization
│   ├── config/                # Konfigurasi aplikasi
│   ├── database/              # Migrations, factories, seeders
│   ├── public/                # Entry point aplikasi
│   ├── resources/             # Views, CSS, JS
│   ├── routes/                # Route definitions
│   ├── storage/               # File storage
│   ├── tests/                 # Unit & Feature tests
│   ├── vendor/                # Dependencies (Composer)
│   ├── artisan                # CLI tool
│   └── composer.json          # PHP dependencies
│
├── frontend/                   # Aplikasi Frontend React
│   ├── app/                   # Logika aplikasi React
│   │   ├── Actions/           # Redux actions
│   │   ├── Concerns/          # Custom hooks
│   │   ├── Http/              # API calls
│   │   ├── Models/            # TypeScript interfaces/types
│   │   └── Providers/         # Context providers
│   ├── bootstrap/             # Inisialisasi aplikasi
│   ├── config/                # Konfigurasi frontend
│   ├── public/                # Static assets
│   │   ├── build/             # Production build
│   │   └── fonts-manifest.dev.json
│   ├── resources/             # Components, styles, views
│   │   ├── css/               # Stylesheets
│   │   ├── js/                # React components & utilities
│   │   └── views/             # Page templates
│   ├── routes/                # Frontend routing
│   ├── storage/               # Client-side storage
│   ├── tests/                 # Component tests
│   ├── vendor/                # Dependencies (Composer)
│   ├── vite.config.ts         # Vite configuration
│   ├── tsconfig.json          # TypeScript configuration
│   └── package.json           # NPM dependencies
│
└── README.md                   # Dokumentasi proyek ini

```

---

## ✨ Fitur Utama

### 1. 👥 Manajemen Penghuni (Resident Management)

**Deskripsi**: Sistem untuk mengelola data penghuni rumah secara terstruktur.

**Fitur**:
- ✅ **CRUD Penghuni**: Tambah, ubah, lihat, dan hapus data penghuni
- ✅ **Data Penghuni Lengkap**:
  - Nama Lengkap
  - Upload Foto KTP
  - Status Penghuni (Tetap / Kontrak)
  - Nomor Telepon
  - Status Perkawinan (Belum Menikah / Sudah Menikah)
- ✅ **Riwayat Penghuni**: Tracking historis perubahan data penghuni
- ✅ **Validasi Data**: Memastikan semua data penghuni valid dan lengkap

**Endpoint Backend** (Dalam Pengembangan):
- `GET /api/residents` - Daftar semua penghuni
- `POST /api/residents` - Tambah penghuni baru
- `PUT /api/residents/{id}` - Ubah data penghuni
- `DELETE /api/residents/{id}` - Hapus penghuni

---

### 2. 🏠 Manajemen Rumah/Unit (House Management)

**Deskripsi**: Mengelola informasi unit rumah, penghuni, dan riwayat kepemilikan.

**Fitur**:
- ✅ **CRUD Rumah**: Tambah, ubah, lihat, dan hapus data rumah
- ✅ **Informasi Rumah**:
  - Nomor Rumah
  - Alamat Lengkap
  - Status Penghunian (Dihuni / Tidak Dihuni)
  - Penghuni Aktif (Jika dihuni)
- ✅ **Manajemen Penghuni Rumah**: 
  - Assign/unassign penghuni ke rumah
  - Update status penghunian rumah
- ✅ **Riwayat Penghuni Rumah**: 
  - Histori lengkap siapa saja yang pernah menghuni rumah
  - Tanggal mulai dan berakhir penghunian
- ✅ **Integrasi Riwayat Pembayaran**: 
  - Menampilkan history pembayaran berikut info penghuni yang membayar
  - Status pembayaran (Lunas / Belum Lunas)

**Endpoint Backend** (Dalam Pengembangan):
- `GET /api/houses` - Daftar semua rumah
- `POST /api/houses` - Tambah rumah baru
- `PUT /api/houses/{id}` - Ubah data rumah
- `GET /api/houses/{id}/residents` - Riwayat penghuni rumah
- `GET /api/houses/{id}/payments` - Riwayat pembayaran rumah

---

### 3. 💳 Manajemen Pembayaran (Payment Management)

**Deskripsi**: Tracking dan pencatatan pembayaran iuran bulanan warga.

**Fitur**:
- ✅ **Pencatatan Pembayaran**:
  - Input pembayaran iuran satpam (Rp 100.000)
  - Input pembayaran iuran kebersihan (Rp 15.000)
  - Support pembayaran tahunan untuk iuran kebersihan
  - Support pembayaran bulanan untuk iuran satpam
- ✅ **Informasi Pembayaran Lengkap**:
  - Nama penghuni pembayar
  - Jenis iuran (Satpam / Kebersihan)
  - Jumlah pembayaran
  - Periode pembayaran
  - Tanggal pembayaran
  - Metode pembayaran
  - Status pembayaran (Lunas / Belum Lunas)
- ✅ **Validasi Pembayaran**: 
  - Cegah pembayaran ganda untuk periode yang sama
  - Validasi amount pembayaran
- ✅ **Pencarian & Filter**: 
  - Filter berdasarkan penghuni, periode, status pembayaran

**Endpoint Backend** (Dalam Pengembangan):
- `GET /api/payments` - Daftar pembayaran
- `POST /api/payments` - Catat pembayaran baru
- `GET /api/payments/{id}` - Detail pembayaran
- `PUT /api/payments/{id}` - Update status pembayaran

---

### 4. 📊 Laporan & Visualisasi Data (Reports & Analytics)

**Deskripsi**: Analisis keuangan perumahan dengan visualisasi data komprehensif.

**Fitur A - Laporan Summary (Summary Report)**:
- ✅ **Dashboard Keuangan**:
  - Total Pemasukan per bulan
  - Total Pengeluaran per bulan
  - Saldo Bersih (Pemasukan - Pengeluaran)
  - Grafik perbandingan pemasukan vs pengeluaran
- ✅ **Statistik Pembayaran**:
  - Jumlah pembayaran terima
  - Jumlah pembayaran yang tertunggak
  - Persentase kolektabilitas (payment rate)
- ✅ **Laporan Tahunan** (12 bulan):
  - Tampilkan trend keuangan sepanjang tahun
  - Grafik line chart untuk tracking trend
  - Export data ke Excel/PDF

**Fitur B - Laporan Detail Bulanan (Monthly Detailed Report)**:
- ✅ **Detail Pemasukan**:
  - Breakdown iuran satpam
  - Breakdown iuran kebersihan
  - Per penghuni/per rumah
  - Status pembayaran tiap penghuni
- ✅ **Detail Pengeluaran**:
  - Kategori pengeluaran (Perbaikan jalan, Perbaikan selokan, Gaji satpam, Token listrik, dll)
  - Daftar detail pengeluaran per kategori
  - Total pengeluaran per kategori
- ✅ **Grafik Pendukung**:
  - Pie chart untuk komposisi pengeluaran
  - Bar chart untuk perbandingan bulanan
  - Export laporan ke PDF

---

## 📋 Persyaratan Sistem

### Minimum Requirements:
- **CPU**: Dual Core 2.0 GHz
- **RAM**: 2 GB
- **Storage**: 10 GB SSD
- **OS**: Linux, macOS, atau Windows

### Software Requirements:
- **PHP**: 8.2 atau lebih tinggi
- **Node.js**: 18.x atau lebih tinggi
- **MySQL**: 8.0 atau lebih tinggi
- **Git**: 2.x atau lebih tinggi
- **Composer**: 2.x atau lebih tinggi
- **pnpm**: 8.x atau lebih tinggi

---

## 🚀 Panduan Instalasi

### Prasyarat
Pastikan semua software di atas telah terinstal di sistem Anda.

```bash
# Verifikasi instalasi
php --version
node --version
npm --version
pnpm --version
mysql --version
composer --version
git --version
```

### Step 1: Clone Repository

```bash
git clone https://github.com/your-username/jagoanhostingje.git
cd jagoanhostingje
```

### Step 2: Setup Database

```bash
# Login ke MySQL
mysql -u root -p

# Buat database baru
CREATE DATABASE jagoanhostingje CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Keluar dari MySQL
EXIT;
```

### Step 3: Setup Backend (Laravel)

```bash
cd backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database di file .env
# Ubah nilai DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD sesuai konfigurasi Anda

# Run migrations
php artisan migrate

# (Optional) Seed database dengan data contoh
php artisan db:seed

# Start backend development server
php artisan serve

# Terminal baru: Start Vite dev server untuk assets
npm run dev
# atau jika menggunakan pnpm
pnpm run dev
```

Backend akan berjalan di: `http://localhost:8000`

### Step 4: Setup Frontend (React)

Di terminal baru:

```bash
cd frontend

# Install dependencies
pnpm install

# Configure API endpoint di .env atau config file
# API_BASE_URL=http://localhost:8000/api

# Start development server
pnpm run dev

# Atau gunakan npm
npm run dev
```

Frontend akan berjalan di: `http://localhost:5173` (default Vite)

### Step 5: Verifikasi Setup

1. **Backend**:
   - Akses `http://localhost:8000/api/` atau endpoint health check
   - Pastikan database connected dan migrations berhasil

2. **Frontend**:
   - Akses `http://localhost:5173`
   - Pastikan halaman dapat dimuat tanpa error
   - Verifikasi API integration dengan backend

### Troubleshooting

#### Database Connection Error
```bash
# Pastikan MySQL service berjalan
sudo service mysql start  # Linux
brew services start mysql  # macOS

# Check database credentials di .env
cat backend/.env | grep DB_
```

#### Port Already in Use
```bash
# Backend port 8000 sudah digunakan
php artisan serve --port=8001

# Frontend port 5173 sudah digunakan
npm run dev -- --port 5174
```

#### Dependencies Error
```bash
# Clear cache dan install ulang
cd backend
composer clear-cache
composer install

cd ../frontend
pnpm install --no-frozen-lockfile
```

---

## 📊 Status Pengembangan

### ⚠️ Backend Status: **DALAM PENGEMBANGAN**

#### Completed ✅
- [x] Project structure setup
- [x] Laravel configuration
- [x] Database configuration

#### In Progress 🔄
- [ ] Database migrations untuk semua entities
- [ ] Model-model Eloquent (Resident, House, Payment, dll)
- [ ] API controllers dan routes
- [ ] Validation rules
- [ ] Authorization policies
- [ ] API documentation

#### Not Started ❌
- [ ] Unit & Feature tests
- [ ] API authentication (Laravel Sanctum)
- [ ] File upload handling (KTP photos)
- [ ] Report generation
- [ ] Export functionality

### ✅ Frontend Status: **SIAP DIKEMBANGKAN**

#### Setup ✅
- [x] React project structure
- [x] TypeScript configuration
- [x] Vite configuration
- [x] Routing setup (React Router)

#### Komponen Siap Dikembangkan
- [ ] **Halaman Autentikasi**: Login, Register, Forgot Password
- [ ] **Dashboard**: Overview keuangan dan status perumahan
- [ ] **Manajemen Penghuni**: CRUD residents
- [ ] **Manajemen Rumah**: CRUD houses dengan historical data
- [ ] **Manajemen Pembayaran**: Pencatatan dan tracking pembayaran
- [ ] **Laporan Keuangan**: Summary dan detail reports dengan grafik
- [ ] **Pengaturan**: Konfigurasi aplikasi dan user management

---

## 📱 Dokumentasi Frontend

### Struktur Folder Frontend

```
frontend/resources/
├── js/                          # JavaScript/React code
│   ├── components/              # Reusable React components
│   │   ├── Common/              # Common components (Header, Footer, Sidebar, Modal)
│   │   ├── Forms/               # Form components
│   │   ├── Tables/              # Table components
│   │   ├── Charts/              # Chart components
│   │   └── Layouts/             # Layout components
│   ├── pages/                   # Page components
│   │   ├── auth/                # Authentication pages
│   │   ├── dashboard/           # Dashboard pages
│   │   ├── residents/           # Resident management pages
│   │   ├── houses/              # House management pages
│   │   ├── payments/            # Payment management pages
│   │   └── reports/             # Report pages
│   ├── services/                # API services
│   │   ├── api.ts               # Axios/Fetch configuration
│   │   ├── residents.ts         # Resident API calls
│   │   ├── houses.ts            # House API calls
│   │   ├── payments.ts          # Payment API calls
│   │   └── reports.ts           # Report API calls
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.ts           # Authentication hook
│   │   ├── useFetch.ts          # Data fetching hook
│   │   └── useForm.ts           # Form handling hook
│   ├── context/                 # React Context for state management
│   │   ├── AuthContext.tsx      # Auth context
│   │   ├── AppContext.tsx       # App-wide context
│   │   └── NotificationContext.tsx
│   ├── types/                   # TypeScript types & interfaces
│   │   ├── index.ts             # Type definitions
│   │   └── api.ts               # API response types
│   ├── utils/                   # Utility functions
│   │   ├── constants.ts         # Constants
│   │   ├── formatters.ts        # Data formatting
│   │   ├── validators.ts        # Validation functions
│   │   └── helpers.ts           # Helper functions
│   └── App.tsx                  # Main App component
├── css/                         # Stylesheets
│   ├── main.css                 # Global styles
│   ├── variables.css            # CSS variables
│   └── components/              # Component-specific styles
└── views/                       # HTML templates
    └── index.html               # Main HTML file
```

### Technology Stack Frontend

- **React 18**: UI library
- **TypeScript**: Type safety
- **React Router v6**: Client-side routing
- **Vite**: Build tool dan dev server
- **Axios** atau **Fetch API**: HTTP client untuk API calls
- **Tailwind CSS** atau **CSS Modules**: Styling
- **Chart.js** atau **Recharts**: Visualisasi data dan grafik
- **React Hook Form**: Form management
- **Zustand** atau **Redux**: State management (optional)

### Halaman Frontend yang Akan Dibangun

#### 1. **Halaman Autentikasi**
- Login page
- Register page (jika diperlukan)
- Forgot password page

#### 2. **Dashboard**
- Ringkasan keuangan bulan ini
- Quick stats (Total pendapatan, pengeluaran, saldo)
- Grafik trend keuangan
- Notifikasi pembayaran tertunggak
- Quick actions (Catat pembayaran, tambah penghuni, dll)

#### 3. **Halaman Manajemen Penghuni** (`/residents`)
- Tabel daftar penghuni
- Form tambah penghuni
- Form edit penghuni
- Modal lihat detail penghuni
- Upload/preview foto KTP
- Filter dan search

#### 4. **Halaman Manajemen Rumah** (`/houses`)
- Tabel daftar rumah
- Form tambah rumah
- Form edit rumah
- Modal lihat detail rumah
- Assign/unassign penghuni
- Tab untuk melihat riwayat penghuni
- Tab untuk melihat riwayat pembayaran

#### 5. **Halaman Manajemen Pembayaran** (`/payments`)
- Form pencatatan pembayaran
- Tabel daftar pembayaran
- Filter berdasarkan penghuni, periode, status
- Export pembayaran ke Excel/PDF
- Dashboard pembayaran tertunggak

#### 6. **Halaman Laporan Keuangan** (`/reports`)
- **Tab Summary Report**:
  - Dropdown tahun untuk memilih periode
  - Grafik line chart pemasukan vs pengeluaran (12 bulan)
  - Statistik pembayaran
  - Export laporan
  
- **Tab Detail Report**:
  - Dropdown bulan untuk memilih periode detail
  - Detail pemasukan (breakdown per jenis iuran)
  - Detail pengeluaran (breakdown per kategori)
  - Pie chart komposisi pengeluaran
  - Table detail pengeluaran
  - Export ke PDF

#### 7. **Halaman Pengaturan** (`/settings`)
- Data perumahan (Nama, alamat, foto)
- Kategori pengeluaran management
- User management (untuk admin tambahan)
- Backup & restore data

---

## 🗄️ Dokumentasi Backend

### Status: ⚠️ **DALAM PENGEMBANGAN**

Dokumentasi lengkap backend akan ditambahkan setelah:
1. Database migrations selesai
2. Models dan relationships didefinisikan
3. API endpoints diimplementasikan
4. Authentication system setup

### Daftar Entity yang Akan Dibuat:

- **Residents** (Penghuni)
- **Houses** (Rumah/Unit)
- **Residents_House History** (Riwayat penghuni per rumah)
- **Payments** (Pembayaran iuran)
- **Expenses** (Pengeluaran)
- **Expense Categories** (Kategori pengeluaran)
- **Users** (Admin/RT)
- **Payment Methods** (Metode pembayaran)

### API Documentation

Dokumentasi lengkap API akan tersedia di:
- OpenAPI/Swagger documentation (TBD)
- Postman collection (TBD)

---

## 📐 Entity Relationship Diagram

### Entities & Relationships

```
USERS (Admin/RT)
├─── HAS MANY ──────────────────► RESIDENTS (Penghuni)
│                                    ├─── HAS MANY ──────────────► PAYMENTS
│                                    └─── HAS MANY ──────────────► HOUSES (through pivot table)
│
├─── HAS MANY ──────────────────► HOUSES (Rumah)
│                                    ├─── HAS MANY ──────────────► RESIDENTS (through pivot table)
│                                    ├─── HAS MANY ──────────────► PAYMENTS
│                                    └─── HAS MANY ──────────────► RESIDENT_HOUSE_HISTORY
│
├─── HAS MANY ──────────────────► PAYMENTS (Pembayaran)
│                                    ├─── BELONGS TO ────────────► RESIDENTS
│                                    ├─── BELONGS TO ────────────► HOUSES
│                                    ├─── BELONGS TO ────────────► PAYMENT_METHODS
│                                    └─── BELONGS TO ────────────► PAYMENT_TYPES (Satpam/Kebersihan)
│
└─── HAS MANY ──────────────────► EXPENSES (Pengeluaran)
                                    ├─── BELONGS TO ────────────► EXPENSE_CATEGORIES
                                    └─── BELONGS TO ────────────► USERS
```

### Table Relationships (Normalized)

**Tabel Utama**:
1. `users` - Admin/RT accounts
2. `residents` - Data penghuni
3. `houses` - Data rumah/unit
4. `resident_house` - Pivot table (Many-to-Many)
5. `resident_house_history` - Historical records
6. `payments` - Riwayat pembayaran
7. `payment_types` - Jenis iuran (Satpam/Kebersihan)
8. `payment_methods` - Metode pembayaran
9. `expenses` - Pengeluaran
10. `expense_categories` - Kategori pengeluaran

---

## 📝 Catatan Pengembangan

### Backend (TODO)

```
Priority: HIGH
- [ ] Create database migrations
- [ ] Create Eloquent models
- [ ] Implement API controllers
- [ ] Setup authentication (Laravel Sanctum)
- [ ] Implement authorization (Policies)
- [ ] Add validation rules
- [ ] Add file upload handling
- [ ] Add API error handling

Priority: MEDIUM
- [ ] Setup API documentation
- [ ] Add unit tests
- [ ] Add feature tests
- [ ] Implement pagination
- [ ] Add API rate limiting

Priority: LOW
- [ ] Setup logging
- [ ] Add caching layer
- [ ] Optimize queries
```

### Frontend (TODO)

```
Priority: HIGH
- [ ] Setup authentication flow
- [ ] Create layout components
- [ ] Create resident management pages
- [ ] Create house management pages
- [ ] Create payment management pages
- [ ] Create report pages

Priority: MEDIUM
- [ ] Setup state management
- [ ] Add error handling
- [ ] Add loading states
- [ ] Implement form validation
- [ ] Add confirmation dialogs

Priority: LOW
- [ ] Add animations
- [ ] Optimize performance
- [ ] Add PWA support
- [ ] Add offline support
```

---

## 🔒 Security Considerations

- [ ] Implement CSRF protection
- [ ] Validate all user inputs
- [ ] Use prepared statements (SQL injection prevention)
- [ ] Implement rate limiting
- [ ] Use HTTPS in production
- [ ] Implement proper authentication & authorization
- [ ] Sanitize file uploads
- [ ] Add audit logging


## 📄 Lisensi

github : @nofuruu

---

## 🔗 Links

- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [MySQL Documentation](https://dev.mysql.com/doc)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Vite Documentation](https://vitejs.dev)

---

**Last Updated**: May 1, 2025
**Status**: 🔄 In Development - Backend: Pending | Frontend: Ready
