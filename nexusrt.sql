-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 03, 2026 at 01:10 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nexusrt`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `histori_rumahs`
--

CREATE TABLE `histori_rumahs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `rumah_id` bigint(20) UNSIGNED NOT NULL,
  `penghuni_id` bigint(20) UNSIGNED NOT NULL,
  `tanggal_mulai` date NOT NULL,
  `tanggal_selesai` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `histori_rumahs`
--

INSERT INTO `histori_rumahs` (`id`, `rumah_id`, `penghuni_id`, `tanggal_mulai`, `tanggal_selesai`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2026-05-02', '2026-05-03', '2026-05-02 09:51:34', '2026-05-03 03:46:23'),
(2, 2, 2, '2026-05-02', '2026-05-03', '2026-05-02 09:52:36', '2026-05-03 03:46:26'),
(3, 3, 3, '2026-05-02', '2026-05-03', '2026-05-02 10:22:28', '2026-05-03 03:46:29');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_08_14_170933_add_two_factor_columns_to_users_table', 1),
(5, '2026_01_27_000001_create_teams_table', 1),
(6, '2026_01_27_000002_add_current_team_id_to_users_table', 1),
(7, '2026_05_02_023935_create_personal_access_tokens_table', 1),
(8, '2026_05_02_045500_remove_unused_columns_from_users_table', 2),
(9, '2026_05_02_161607_create_rumahs_table', 3),
(10, '2026_05_02_161608_create_penghunis_table', 3),
(11, '2026_05_02_161839_create_histori_rumahs_table', 3),
(12, '2026_05_02_165412_create_pembayarans_table', 4),
(13, '2026_05_02_165414_create_pengeluarans_table', 4),
(14, '2026_05_03_053140_add_profile_fields_to_users_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `msuser`
--

CREATE TABLE `msuser` (
  `userid` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pembayarans`
--

CREATE TABLE `pembayarans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `rumah_id` bigint(20) UNSIGNED NOT NULL,
  `jenis_iuran` enum('Satpam','Kebersihan') NOT NULL,
  `bulan` int(11) NOT NULL,
  `tahun` int(11) NOT NULL,
  `jumlah_bayar` int(11) NOT NULL,
  `tanggal_bayar` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pembayarans`
--

INSERT INTO `pembayarans` (`id`, `rumah_id`, `jenis_iuran`, `bulan`, `tahun`, `jumlah_bayar`, `tanggal_bayar`, `created_at`, `updated_at`) VALUES
(1, 1, 'Satpam', 5, 2026, 100000, '2026-05-02', '2026-05-02 10:07:08', '2026-05-02 10:07:08'),
(2, 1, 'Satpam', 1, 2026, 100000, '2026-05-02', '2026-05-02 10:19:16', '2026-05-02 10:19:16'),
(3, 1, 'Satpam', 2, 2026, 100000, '2026-05-02', '2026-05-02 10:19:16', '2026-05-02 10:19:16'),
(4, 1, 'Satpam', 3, 2026, 100000, '2026-05-02', '2026-05-02 10:19:16', '2026-05-02 10:19:16'),
(5, 1, 'Satpam', 4, 2026, 100000, '2026-05-02', '2026-05-02 10:19:16', '2026-05-02 10:19:16'),
(6, 1, 'Satpam', 6, 2026, 100000, '2026-05-02', '2026-05-02 10:19:16', '2026-05-02 10:19:16'),
(7, 1, 'Satpam', 7, 2026, 100000, '2026-05-02', '2026-05-02 10:19:16', '2026-05-02 10:19:16'),
(8, 1, 'Satpam', 8, 2026, 100000, '2026-05-02', '2026-05-02 10:19:16', '2026-05-02 10:19:16'),
(9, 1, 'Satpam', 9, 2026, 100000, '2026-05-02', '2026-05-02 10:19:16', '2026-05-02 10:19:16'),
(10, 1, 'Satpam', 10, 2026, 100000, '2026-05-02', '2026-05-02 10:19:16', '2026-05-02 10:19:16'),
(11, 1, 'Satpam', 11, 2026, 100000, '2026-05-02', '2026-05-02 10:19:16', '2026-05-02 10:19:16'),
(12, 1, 'Satpam', 12, 2026, 100000, '2026-05-02', '2026-05-02 10:19:16', '2026-05-02 10:19:16'),
(13, 2, 'Kebersihan', 1, 2026, 15000, '2026-05-02', '2026-05-02 10:19:39', '2026-05-02 10:19:39'),
(14, 2, 'Kebersihan', 2, 2026, 15000, '2026-05-02', '2026-05-02 10:19:39', '2026-05-02 10:19:39'),
(15, 2, 'Kebersihan', 3, 2026, 15000, '2026-05-02', '2026-05-02 10:19:39', '2026-05-02 10:19:39'),
(16, 2, 'Kebersihan', 4, 2026, 15000, '2026-05-02', '2026-05-02 10:19:39', '2026-05-02 10:19:39'),
(17, 2, 'Kebersihan', 5, 2026, 15000, '2026-05-02', '2026-05-02 10:19:39', '2026-05-02 10:19:39'),
(18, 2, 'Kebersihan', 6, 2026, 15000, '2026-05-02', '2026-05-02 10:19:39', '2026-05-02 10:19:39'),
(19, 2, 'Kebersihan', 7, 2026, 15000, '2026-05-02', '2026-05-02 10:19:39', '2026-05-02 10:19:39'),
(20, 2, 'Kebersihan', 8, 2026, 15000, '2026-05-02', '2026-05-02 10:19:39', '2026-05-02 10:19:39'),
(21, 2, 'Kebersihan', 9, 2026, 15000, '2026-05-02', '2026-05-02 10:19:39', '2026-05-02 10:19:39'),
(22, 2, 'Kebersihan', 10, 2026, 15000, '2026-05-02', '2026-05-02 10:19:39', '2026-05-02 10:19:39'),
(23, 2, 'Kebersihan', 11, 2026, 15000, '2026-05-02', '2026-05-02 10:19:39', '2026-05-02 10:19:39'),
(24, 2, 'Kebersihan', 12, 2026, 15000, '2026-05-02', '2026-05-02 10:19:39', '2026-05-02 10:19:39'),
(25, 2, 'Satpam', 1, 2026, 100000, '2026-05-02', '2026-05-02 10:20:16', '2026-05-02 10:20:16'),
(26, 2, 'Satpam', 2, 2026, 100000, '2026-05-02', '2026-05-02 10:20:16', '2026-05-02 10:20:16'),
(27, 2, 'Satpam', 3, 2026, 100000, '2026-05-02', '2026-05-02 10:20:16', '2026-05-02 10:20:16'),
(28, 2, 'Satpam', 4, 2026, 100000, '2026-05-02', '2026-05-02 10:20:16', '2026-05-02 10:20:16'),
(29, 2, 'Satpam', 5, 2026, 100000, '2026-05-02', '2026-05-02 10:20:16', '2026-05-02 10:20:16'),
(30, 2, 'Satpam', 6, 2026, 100000, '2026-05-02', '2026-05-02 10:20:16', '2026-05-02 10:20:16'),
(31, 2, 'Satpam', 7, 2026, 100000, '2026-05-02', '2026-05-02 10:20:16', '2026-05-02 10:20:16'),
(32, 2, 'Satpam', 8, 2026, 100000, '2026-05-02', '2026-05-02 10:20:16', '2026-05-02 10:20:16'),
(33, 2, 'Satpam', 9, 2026, 100000, '2026-05-02', '2026-05-02 10:20:16', '2026-05-02 10:20:16'),
(34, 2, 'Satpam', 10, 2026, 100000, '2026-05-02', '2026-05-02 10:20:16', '2026-05-02 10:20:16'),
(35, 2, 'Satpam', 11, 2026, 100000, '2026-05-02', '2026-05-02 10:20:16', '2026-05-02 10:20:16'),
(36, 2, 'Satpam', 12, 2026, 100000, '2026-05-02', '2026-05-02 10:20:16', '2026-05-02 10:20:16'),
(37, 1, 'Satpam', 1, 2027, 100000, '2026-05-02', '2026-05-02 10:20:37', '2026-05-02 10:20:37'),
(38, 1, 'Satpam', 2, 2027, 100000, '2026-05-02', '2026-05-02 10:20:37', '2026-05-02 10:20:37'),
(39, 1, 'Satpam', 3, 2027, 100000, '2026-05-02', '2026-05-02 10:20:37', '2026-05-02 10:20:37'),
(40, 1, 'Satpam', 4, 2027, 100000, '2026-05-02', '2026-05-02 10:20:37', '2026-05-02 10:20:37'),
(41, 1, 'Satpam', 5, 2027, 100000, '2026-05-02', '2026-05-02 10:20:37', '2026-05-02 10:20:37'),
(42, 1, 'Satpam', 6, 2027, 100000, '2026-05-02', '2026-05-02 10:20:37', '2026-05-02 10:20:37'),
(43, 1, 'Satpam', 7, 2027, 100000, '2026-05-02', '2026-05-02 10:20:37', '2026-05-02 10:20:37'),
(44, 1, 'Satpam', 8, 2027, 100000, '2026-05-02', '2026-05-02 10:20:37', '2026-05-02 10:20:37'),
(45, 1, 'Satpam', 9, 2027, 100000, '2026-05-02', '2026-05-02 10:20:37', '2026-05-02 10:20:37'),
(46, 1, 'Satpam', 10, 2027, 100000, '2026-05-02', '2026-05-02 10:20:37', '2026-05-02 10:20:37'),
(47, 1, 'Satpam', 11, 2027, 100000, '2026-05-02', '2026-05-02 10:20:37', '2026-05-02 10:20:37'),
(48, 1, 'Satpam', 12, 2027, 100000, '2026-05-02', '2026-05-02 10:20:37', '2026-05-02 10:20:37'),
(49, 4, 'Satpam', 1, 2026, 100000, '2026-05-02', '2026-05-02 10:22:45', '2026-05-02 10:22:45'),
(50, 4, 'Satpam', 2, 2026, 100000, '2026-05-02', '2026-05-02 10:22:45', '2026-05-02 10:22:45'),
(51, 4, 'Satpam', 3, 2026, 100000, '2026-05-02', '2026-05-02 10:22:45', '2026-05-02 10:22:45'),
(52, 4, 'Satpam', 4, 2026, 100000, '2026-05-02', '2026-05-02 10:22:45', '2026-05-02 10:22:45'),
(53, 4, 'Satpam', 5, 2026, 100000, '2026-05-02', '2026-05-02 10:22:45', '2026-05-02 10:22:45'),
(54, 4, 'Satpam', 6, 2026, 100000, '2026-05-02', '2026-05-02 10:22:45', '2026-05-02 10:22:45'),
(55, 4, 'Satpam', 7, 2026, 100000, '2026-05-02', '2026-05-02 10:22:45', '2026-05-02 10:22:45'),
(56, 4, 'Satpam', 8, 2026, 100000, '2026-05-02', '2026-05-02 10:22:45', '2026-05-02 10:22:45'),
(57, 4, 'Satpam', 9, 2026, 100000, '2026-05-02', '2026-05-02 10:22:45', '2026-05-02 10:22:45'),
(58, 4, 'Satpam', 10, 2026, 100000, '2026-05-02', '2026-05-02 10:22:45', '2026-05-02 10:22:45'),
(59, 4, 'Satpam', 11, 2026, 100000, '2026-05-02', '2026-05-02 10:22:45', '2026-05-02 10:22:45'),
(60, 4, 'Satpam', 12, 2026, 100000, '2026-05-02', '2026-05-02 10:22:45', '2026-05-02 10:22:45'),
(61, 3, 'Satpam', 1, 2026, 100000, '2026-05-02', '2026-05-02 10:23:03', '2026-05-02 10:23:03'),
(62, 3, 'Satpam', 2, 2026, 100000, '2026-05-02', '2026-05-02 10:23:03', '2026-05-02 10:23:03'),
(63, 3, 'Satpam', 3, 2026, 100000, '2026-05-02', '2026-05-02 10:23:03', '2026-05-02 10:23:03'),
(64, 3, 'Satpam', 4, 2026, 100000, '2026-05-02', '2026-05-02 10:23:03', '2026-05-02 10:23:03'),
(65, 3, 'Satpam', 5, 2026, 100000, '2026-05-02', '2026-05-02 10:23:03', '2026-05-02 10:23:03'),
(66, 3, 'Satpam', 6, 2026, 100000, '2026-05-02', '2026-05-02 10:23:03', '2026-05-02 10:23:03'),
(67, 3, 'Satpam', 7, 2026, 100000, '2026-05-02', '2026-05-02 10:23:03', '2026-05-02 10:23:03'),
(68, 3, 'Satpam', 8, 2026, 100000, '2026-05-02', '2026-05-02 10:23:03', '2026-05-02 10:23:03'),
(69, 3, 'Satpam', 9, 2026, 100000, '2026-05-02', '2026-05-02 10:23:03', '2026-05-02 10:23:03'),
(70, 3, 'Satpam', 10, 2026, 100000, '2026-05-02', '2026-05-02 10:23:03', '2026-05-02 10:23:03'),
(71, 3, 'Satpam', 11, 2026, 100000, '2026-05-02', '2026-05-02 10:23:03', '2026-05-02 10:23:03');

-- --------------------------------------------------------

--
-- Table structure for table `pengeluarans`
--

CREATE TABLE `pengeluarans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `keterangan` varchar(255) NOT NULL,
  `jumlah_pengeluaran` int(11) NOT NULL,
  `tanggal_pengeluaran` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pengeluarans`
--

INSERT INTO `pengeluarans` (`id`, `keterangan`, `jumlah_pengeluaran`, `tanggal_pengeluaran`, `created_at`, `updated_at`) VALUES
(1, 'Gaji Satpam Bulan Mei', 3000000, '2026-05-02', '2026-05-02 10:10:04', '2026-05-02 10:10:04'),
(2, 'Beli Tong Sampah', 1000000, '2026-05-02', '2026-05-02 10:33:22', '2026-05-02 10:33:22');

-- --------------------------------------------------------

--
-- Table structure for table `penghunis`
--

CREATE TABLE `penghunis` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `foto_ktp` varchar(255) DEFAULT NULL,
  `status_menetap` enum('Tetap','Kontrak') NOT NULL,
  `nomor_telepon` varchar(255) NOT NULL,
  `sudah_menikah` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `penghunis`
--

INSERT INTO `penghunis` (`id`, `nama_lengkap`, `foto_ktp`, `status_menetap`, `nomor_telepon`, `sudah_menikah`, `created_at`, `updated_at`) VALUES
(1, 'Aswin', NULL, 'Tetap', '08696969696', 0, '2026-05-02 09:51:25', '2026-05-03 03:55:59'),
(2, 'Pak Subardi', NULL, 'Kontrak', '08696969696', 0, '2026-05-02 09:52:26', '2026-05-02 22:54:01'),
(3, 'Pak Purnomo', NULL, 'Kontrak', '089528511993', 1, '2026-05-02 10:21:42', '2026-05-02 10:21:42');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', '1ad8b45ee676bda064f2c02281ca02a54d510d58cbdfd14886f1cc3b242276ff', '[\"*\"]', NULL, NULL, '2026-05-02 08:24:01', '2026-05-02 08:24:01'),
(2, 'App\\Models\\User', 1, 'auth_token', 'da5432059d3487e8c1d87f00506d76917b95b5e2c47dba796d20ab450ea89e97', '[\"*\"]', NULL, NULL, '2026-05-02 08:26:23', '2026-05-02 08:26:23'),
(3, 'App\\Models\\User', 1, 'auth_token', 'a6a9f2f18ace89ac176026da13693d62dda35d2e3b6e9d998bd82ea5ca1897c6', '[\"*\"]', NULL, NULL, '2026-05-02 08:26:47', '2026-05-02 08:26:47'),
(4, 'App\\Models\\User', 1, 'auth_token', '4fca9e0b0826f6e23b6229316d0e16e05c58bc46980990fd0d321ae1d58773cf', '[\"*\"]', NULL, NULL, '2026-05-02 08:26:51', '2026-05-02 08:26:51'),
(5, 'App\\Models\\User', 1, 'auth_token', '122a7d14da0ef6b330c2b193fc3cedeeb6ddd1ef6c99e568f184733f769c5294', '[\"*\"]', '2026-05-02 08:41:47', NULL, '2026-05-02 08:28:14', '2026-05-02 08:41:47'),
(6, 'App\\Models\\User', 1, 'auth_token', '77a691150e5cb1192387e51e177b96f6ce45952b4fee8f72229d0a0157b6a4fa', '[\"*\"]', '2026-05-02 08:56:32', NULL, '2026-05-02 08:42:02', '2026-05-02 08:56:32'),
(7, 'App\\Models\\User', 1, 'auth_token', 'a476d66ae0ae42ab1525075d93416b2e02d4f216bbe420e523e699af50f52348', '[\"*\"]', '2026-05-02 08:58:34', NULL, '2026-05-02 08:57:26', '2026-05-02 08:58:34'),
(8, 'App\\Models\\User', 1, 'auth_token', '8e3baa5d116b9d0c9e17453ea22068ec43ef2672c18bc85bb30706697572693e', '[\"*\"]', '2026-05-02 08:59:10', NULL, '2026-05-02 08:59:09', '2026-05-02 08:59:10'),
(9, 'App\\Models\\User', 1, 'auth_token', '00848e820bf62450bd44097c216103eb6028d6bf043e40a973e8cdec579321d7', '[\"*\"]', '2026-05-02 09:07:18', NULL, '2026-05-02 08:59:18', '2026-05-02 09:07:18'),
(10, 'App\\Models\\User', 1, 'auth_token', '370dcdfeae08741527149e77d1752d62e7dfa1275514c0d18a4097460a4e57b7', '[\"*\"]', '2026-05-02 10:02:33', NULL, '2026-05-02 09:09:52', '2026-05-02 10:02:33'),
(11, 'App\\Models\\User', 1, 'auth_token', 'bc1fe258f5275d4aa4b4b1169231d375c2ae92ba32926866f80c8dd7da7566bc', '[\"*\"]', '2026-05-02 10:07:16', NULL, '2026-05-02 10:02:39', '2026-05-02 10:07:16'),
(12, 'App\\Models\\User', 1, 'auth_token', '5536c7166643eceb5f24d3ab54606b310078ab3c20a33ebb99d5ce21a5d71923', '[\"*\"]', '2026-05-02 10:10:04', NULL, '2026-05-02 10:07:32', '2026-05-02 10:10:04'),
(13, 'App\\Models\\User', 1, 'auth_token', 'f0bd649702d3f47fc2d9cdaf157372c50a881c5fa315ae4088b7731b255b7897', '[\"*\"]', '2026-05-02 10:55:14', NULL, '2026-05-02 10:10:24', '2026-05-02 10:55:14'),
(15, 'App\\Models\\User', 1, 'auth_token', '43c45f6193a2a76016232c3cc654866cd471757ca861400e99dd5192fe38049e', '[\"*\"]', '2026-05-02 21:51:35', NULL, '2026-05-02 21:51:30', '2026-05-02 21:51:35'),
(17, 'App\\Models\\User', 1, 'auth_token', '5a80a6e991512cc3c6e8177b97570c10fff28712bbf1a726a17a2bc1e7531980', '[\"*\"]', '2026-05-02 22:29:33', NULL, '2026-05-02 22:11:48', '2026-05-02 22:29:33');

-- --------------------------------------------------------

--
-- Table structure for table `rumahs`
--

CREATE TABLE `rumahs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nomor_rumah` varchar(255) NOT NULL,
  `status` enum('Dihuni','Tidak dihuni') NOT NULL DEFAULT 'Tidak dihuni',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rumahs`
--

INSERT INTO `rumahs` (`id`, `nomor_rumah`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Blok A-01', 'Tidak dihuni', '2026-05-02 09:45:31', '2026-05-03 03:46:23'),
(2, 'Blok A-02', 'Tidak dihuni', '2026-05-02 09:46:12', '2026-05-03 03:46:26'),
(3, 'Blok A-03', 'Tidak dihuni', '2026-05-02 10:21:13', '2026-05-03 03:46:29'),
(4, 'Blok A-04', 'Tidak dihuni', '2026-05-02 10:21:20', '2026-05-03 03:46:31'),
(5, 'Blok A-05TEs', 'Tidak dihuni', '2026-05-02 22:53:32', '2026-05-03 03:49:30');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('5XQx8lEiQPKgwplk2wUfNRRxriKciOI2PdQV46yN', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJMeEZ4cldoMjNXczBNT1NtY3hIZjF5UGV1bmI4YVM2bHVwRUpjczBTIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwIiwicm91dGUiOm51bGx9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1777784566);

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `is_personal` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `team_invitations`
--

CREATE TABLE `team_invitations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(64) NOT NULL,
  `team_id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `invited_by` bigint(20) UNSIGNED NOT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `accepted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `team_members`
--

CREATE TABLE `team_members` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `team_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `role` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nik` varchar(16) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL COMMENT 'Jabatan: misal Ketua RT 01',
  `role` enum('superadmin','admin','warga') NOT NULL DEFAULT 'warga',
  `location` varchar(255) DEFAULT NULL COMMENT 'Perumahan / Wilayah',
  `block` varchar(255) DEFAULT NULL COMMENT 'Blok / Nomor Rumah',
  `rt_rw` varchar(10) DEFAULT NULL COMMENT 'Contoh: 01/05',
  `village` varchar(255) DEFAULT NULL COMMENT 'Kelurahan',
  `city` varchar(255) DEFAULT NULL COMMENT 'Kota / Kabupaten',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `nik`, `phone`, `position`, `role`, `location`, `block`, `rt_rw`, `village`, `city`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'barasuara', 'byob@gmail.com', NULL, NULL, NULL, 'warga', NULL, NULL, NULL, NULL, NULL, NULL, '$2y$12$ffYBj5bliGxRsWVoXVifuuH361HHMNNZsIiQXe8ioMTxoOxVSSG0S', NULL, '2026-05-02 08:22:42', '2026-05-02 08:22:42'),
(2, 'Naufal Santoso', 'naufal.admin@nexusrt.id', '3573012345678901', '0812-3456-7890', 'Ketua RT 01', 'admin', 'Perumahan Puri Indah', 'Blok A1 No. 12', '01/05', 'Kelurahan Sukamaju', 'Jakarta Selatan', NULL, '$2y$12$Vjde6Xbko0Rcp/u1mjx6Z.mVIOyT7NKkOytQavfgDyuWkd.INgDSS', NULL, '2026-05-02 22:35:30', '2026-05-02 22:53:09'),
(3, 'Budi Santoso', 'warga@nexusrt.id', '3573012345678999', '0811-2222-3333', 'Kepala Keluarga', 'warga', 'Perumahan Nexus Indah', 'Blok C3 No. 8', '01/05', 'Kelurahan Sukamaju', 'Jakarta Selatan', NULL, '$2y$12$LcslpExrVvrpwrkNyYBcGeymk6I27JkUq.0a2eMO8TZmxy8.UgAuu', NULL, '2026-05-02 22:35:30', '2026-05-02 22:35:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `histori_rumahs`
--
ALTER TABLE `histori_rumahs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `histori_rumahs_rumah_id_foreign` (`rumah_id`),
  ADD KEY `histori_rumahs_penghuni_id_foreign` (`penghuni_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `msuser`
--
ALTER TABLE `msuser`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `pembayarans`
--
ALTER TABLE `pembayarans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pembayarans_rumah_id_foreign` (`rumah_id`);

--
-- Indexes for table `pengeluarans`
--
ALTER TABLE `pengeluarans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `penghunis`
--
ALTER TABLE `penghunis`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `rumahs`
--
ALTER TABLE `rumahs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rumahs_nomor_rumah_unique` (`nomor_rumah`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `teams_slug_unique` (`slug`);

--
-- Indexes for table `team_invitations`
--
ALTER TABLE `team_invitations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `team_invitations_code_unique` (`code`),
  ADD KEY `team_invitations_team_id_foreign` (`team_id`),
  ADD KEY `team_invitations_invited_by_foreign` (`invited_by`);

--
-- Indexes for table `team_members`
--
ALTER TABLE `team_members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `team_members_team_id_user_id_unique` (`team_id`,`user_id`),
  ADD KEY `team_members_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_nik_unique` (`nik`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `histori_rumahs`
--
ALTER TABLE `histori_rumahs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `msuser`
--
ALTER TABLE `msuser`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pembayarans`
--
ALTER TABLE `pembayarans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `pengeluarans`
--
ALTER TABLE `pengeluarans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `penghunis`
--
ALTER TABLE `penghunis`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `rumahs`
--
ALTER TABLE `rumahs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `team_invitations`
--
ALTER TABLE `team_invitations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `team_members`
--
ALTER TABLE `team_members`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `histori_rumahs`
--
ALTER TABLE `histori_rumahs`
  ADD CONSTRAINT `histori_rumahs_penghuni_id_foreign` FOREIGN KEY (`penghuni_id`) REFERENCES `penghunis` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `histori_rumahs_rumah_id_foreign` FOREIGN KEY (`rumah_id`) REFERENCES `rumahs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pembayarans`
--
ALTER TABLE `pembayarans`
  ADD CONSTRAINT `pembayarans_rumah_id_foreign` FOREIGN KEY (`rumah_id`) REFERENCES `rumahs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `team_invitations`
--
ALTER TABLE `team_invitations`
  ADD CONSTRAINT `team_invitations_invited_by_foreign` FOREIGN KEY (`invited_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `team_invitations_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `team_members`
--
ALTER TABLE `team_members`
  ADD CONSTRAINT `team_members_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `team_members_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
