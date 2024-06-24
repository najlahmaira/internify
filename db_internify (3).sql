-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2024 at 02:11 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_internify`
--

-- --------------------------------------------------------

--
-- Table structure for table `anggota`
--

CREATE TABLE `anggota` (
  `id_anggota` char(36) NOT NULL,
  `id_kelompok` int(11) NOT NULL,
  `nim_anggota` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `anggota`
--

INSERT INTO `anggota` (`id_anggota`, `id_kelompok`, `nim_anggota`, `created_at`, `updated_at`) VALUES
('aa9675aa-2bea-11ef-a91a-e0d4643cc6a6', 2, '2011522023', '2024-06-16 14:13:48', '2024-06-16 14:13:48');

-- --------------------------------------------------------

--
-- Table structure for table `kelompok`
--

CREATE TABLE `kelompok` (
  `id_kelompok` int(11) NOT NULL,
  `nim_ketua` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kelompok`
--

INSERT INTO `kelompok` (`id_kelompok`, `nim_ketua`, `created_at`, `updated_at`) VALUES
(2, '2011522056', '2024-06-16 14:13:19', '2024-06-16 14:13:19');

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `nim_ketua` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `nama` varchar(50) NOT NULL,
  `password` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`nim_ketua`, `created_at`, `updated_at`, `nama`, `password`) VALUES
('2011522023', '2024-06-16 14:13:33', '2024-06-16 14:13:33', 'cahaya ilahi', '$2b$10$nq8UWb1dugZkz6pk88sP6uswuy2xqZ0ULWgqL/tBir530umfL/H3C'),
('2011522056', '2024-06-16 14:11:16', '2024-06-16 14:18:49', 'cahaya', '$2b$10$NjNDJsrXwpcvGA/FZybzkeJu3tXugGbdj.FHdkX7XHyzkSVw6rxDu'),
('221521000', '2024-06-18 01:46:09', '2024-06-18 01:46:09', 'najla', '$2b$10$8uu24HX/xafgLgRD/hm1UeiE79.UzpvW0yFnuyfzk5D41WQLeatw2');

-- --------------------------------------------------------

--
-- Table structure for table `pengajuan_kp`
--

CREATE TABLE `pengajuan_kp` (
  `id_pengajuan` char(36) NOT NULL,
  `nip` varchar(20) NOT NULL,
  `id_kelompok` int(11) NOT NULL,
  `id_suratPengantar` char(36) DEFAULT NULL,
  `id_suratBalasan` char(36) DEFAULT NULL,
  `id_proposal` char(36) DEFAULT NULL,
  `id_suratTugas` char(36) DEFAULT NULL,
  `status_pengajuan` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pengajuan_kp`
--

INSERT INTO `pengajuan_kp` (`id_pengajuan`, `nip`, `id_kelompok`, `id_suratPengantar`, `id_suratBalasan`, `id_proposal`, `id_suratTugas`, `status_pengajuan`, `created_at`, `updated_at`) VALUES
('ac0508f6-1056-4b39-92a9-e826ebc6e0c5', '12345678', 2, '233b9285-2beb-11ef-a91a-e0d4643cc6a6', '440f0ba2-1290-4a1c-b3c4-7fe4588458ae', NULL, NULL, 'Diproses', '2024-06-16 14:14:19', '2024-06-18 12:10:46');

-- --------------------------------------------------------

--
-- Table structure for table `proposal`
--

CREATE TABLE `proposal` (
  `id_proposal` char(36) NOT NULL,
  `tanggal_pengajuan` date NOT NULL,
  `judul_proposal` longtext NOT NULL,
  `perusahaan_tujuan` longtext NOT NULL,
  `lokasi` longtext NOT NULL,
  `file_proposal` varchar(256) NOT NULL,
  `status_proposal` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sekretaris`
--

CREATE TABLE `sekretaris` (
  `nip` varchar(20) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `password` varchar(256) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sekretaris`
--

INSERT INTO `sekretaris` (`nip`, `nama`, `password`, `created_at`, `updated_at`) VALUES
('12345678', 'sekre SI', '$2b$10$PJ78cj1RoaxGxzw8vzHEfuWgE73XSMhasBxIRcYXXWBEVmzK73M3u', '2024-06-16 14:11:52', '2024-06-16 14:11:52');

-- --------------------------------------------------------

--
-- Table structure for table `surat_balasan`
--

CREATE TABLE `surat_balasan` (
  `id_suratBalasan` char(36) NOT NULL,
  `tanggal_pengajuan` date NOT NULL,
  `perusahaan_tujuan` longtext NOT NULL,
  `status` varchar(30) NOT NULL,
  `file_surat_balasan` varchar(256) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `surat_balasan`
--

INSERT INTO `surat_balasan` (`id_suratBalasan`, `tanggal_pengajuan`, `perusahaan_tujuan`, `status`, `file_surat_balasan`, `created_at`, `updated_at`) VALUES
('440f0ba2-1290-4a1c-b3c4-7fe4588458ae', '2024-12-12', 'zyx', 'Diterima', 'Colorful Playful Illustration 2024 Calendar.pdf', '2024-06-16 14:17:39', '2024-06-16 14:17:39'),
('fa35b5a3-ed36-486b-8158-197a3c4399b4', '2024-06-19', 'test', 'ditolak', 'jurnaladm,+317-319+-+willy+kurniawan.pdf', '2024-06-18 10:47:59', '2024-06-18 10:47:59');

-- --------------------------------------------------------

--
-- Table structure for table `surat_pengantar`
--

CREATE TABLE `surat_pengantar` (
  `id_suratPengantar` char(36) NOT NULL,
  `perusahaan_tujuan` longtext NOT NULL,
  `tanggal_mulai` date NOT NULL,
  `tanggal_selesai` date NOT NULL,
  `file_suratPengantar` varchar(256) DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `surat_pengantar`
--

INSERT INTO `surat_pengantar` (`id_suratPengantar`, `perusahaan_tujuan`, `tanggal_mulai`, `tanggal_selesai`, `file_suratPengantar`, `status`, `created_at`, `updated_at`) VALUES
('0a81e529-2d60-11ef-9742-8c8caa02d115', 'test', '2024-06-19', '2024-07-24', 'abc.pdf', 'disetujui', '2024-06-18 10:46:35', '2024-06-18 10:46:35'),
('233b9285-2beb-11ef-a91a-e0d4643cc6a6', 'xyz', '2024-06-11', '2024-06-12', 'xyz.pdf', 'disetujui', '2024-06-16 14:17:11', '2024-06-16 14:17:11');

-- --------------------------------------------------------

--
-- Table structure for table `surat_tugas`
--

CREATE TABLE `surat_tugas` (
  `id_surat_tugas` char(36) NOT NULL,
  `perusahaan_tujuan` longtext NOT NULL,
  `tanggal_mulai` date NOT NULL,
  `tanggal_selesai` date NOT NULL,
  `file_surat_tugas` varchar(256) DEFAULT NULL,
  `status` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `surat_tugas`
--

INSERT INTO `surat_tugas` (`id_surat_tugas`, `perusahaan_tujuan`, `tanggal_mulai`, `tanggal_selesai`, `file_surat_tugas`, `status`, `created_at`, `updated_at`) VALUES
('1712b05f-2be6-11ef-a91a-e0d4643cc6a6', 'xyz', '2024-06-19', '2024-06-10', 'xyz.pdf', 'disetujui', '2024-06-16 13:41:03', '2024-06-16 13:41:03');

-- --------------------------------------------------------

--
-- Table structure for table `token_mahasiswa`
--

CREATE TABLE `token_mahasiswa` (
  `id_token` int(36) NOT NULL,
  `token` varchar(256) NOT NULL,
  `nim_ketua` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expires_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `token_mahasiswa`
--

INSERT INTO `token_mahasiswa` (`id_token`, `token`, `nim_ketua`, `created_at`, `expires_at`) VALUES
(4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaW0iOiIyMDExNTIyMDU2IiwiaWF0IjoxNzE4NTQ3MTM5LCJleHAiOjE3MTkxNTE5Mzl9.v_vFgy76zO-SpWdkQ7PYRR0-UfB-HkedJguMoj8I00U', '2011522056', '2024-06-16 14:09:21', '2024-06-23'),
(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaW0iOiIyMDExNTIyMDU2IiwiaWF0IjoxNzE4NTQ3NTM3LCJleHAiOjE3MTkxNTIzMzd9.gmgOURTW_qg8KyoKf1xyNP1hwNXW65MZ4Q6yLztKTq0', '2011522056', '2024-06-16 14:09:21', '2024-06-23'),
(6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaW0iOiIyMjE1MjEwMDAiLCJpYXQiOjE3MTg2NzUxODYsImV4cCI6MTcxOTI3OTk4Nn0.HUwR4w3gBr7eP2jWHfBHgDjV_XCjoUfRN1JurvE4Mg4', '221521000', '2024-06-18 01:23:42', '2024-06-25'),
(7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaW0iOiIyMjE1MjEwMDAiLCJpYXQiOjE3MTg2OTAwNjcsImV4cCI6MTcxOTI5NDg2N30.CcYAoCUyNivRytr930JVXOit5hYL_LYI85t0BUKnEpY', '221521000', '2024-06-18 05:53:06', '2024-06-25'),
(8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaW0iOiIyMjE1MjEwMDAiLCJpYXQiOjE3MTg2OTcyODgsImV4cCI6MTcxOTMwMjA4OH0.YD7i36X1-WUI5P0xjFs0sgVdoXvqbdxdzY-t3c_Ku5A', '221521000', '2024-06-18 07:54:13', '2024-06-25'),
(9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaW0iOiIyMjE1MjEwMDAiLCJpYXQiOjE3MTg3MDI0ODUsImV4cCI6MTcxOTMwNzI4NX0.z02Bpcijv7cdaCJfLUwbzj0YHWN7d3lUomXhOl3B3jI', '221521000', '2024-06-18 09:21:14', '2024-06-25'),
(10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaW0iOiIyMjE1MjEwMDAiLCJpYXQiOjE3MTg3MDcwNTUsImV4cCI6MTcxOTMxMTg1NX0.0HVvndKmB4Uu8CmHCJSeAGvYLiapFSoBCLv9eehvt2M', '221521000', '2024-06-18 10:37:16', '2024-06-25');

-- --------------------------------------------------------

--
-- Table structure for table `token_sekretaris`
--

CREATE TABLE `token_sekretaris` (
  `id_token` int(36) NOT NULL,
  `token` varchar(256) NOT NULL,
  `nip` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expires_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `token_sekretaris`
--

INSERT INTO `token_sekretaris` (`id_token`, `token`, `nip`, `created_at`, `expires_at`) VALUES
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXAiOiIxMjM0NTY3OCIsImlhdCI6MTcxODU0NzU2NCwiZXhwIjoxNzE5MTUyMzY0fQ.n7tOXzTx2BalSvGjG3HfN8Fpmu9D206HOHCWGf5bCRM', '12345678', '2024-06-16 14:09:21', '2024-06-23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `anggota`
--
ALTER TABLE `anggota`
  ADD PRIMARY KEY (`id_anggota`),
  ADD KEY `id_kelompok` (`id_kelompok`);

--
-- Indexes for table `kelompok`
--
ALTER TABLE `kelompok`
  ADD PRIMARY KEY (`id_kelompok`),
  ADD KEY `nim_ketua` (`nim_ketua`);

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`nim_ketua`);

--
-- Indexes for table `pengajuan_kp`
--
ALTER TABLE `pengajuan_kp`
  ADD PRIMARY KEY (`id_pengajuan`),
  ADD KEY `nip` (`nip`,`id_kelompok`,`id_suratPengantar`,`id_suratBalasan`,`id_proposal`,`id_suratTugas`),
  ADD KEY `id_kelompok` (`id_kelompok`),
  ADD KEY `id_suratBalasan` (`id_suratBalasan`),
  ADD KEY `id_suratPengantar` (`id_suratPengantar`),
  ADD KEY `id_suratTugas` (`id_suratTugas`),
  ADD KEY `id_proposal` (`id_proposal`);

--
-- Indexes for table `proposal`
--
ALTER TABLE `proposal`
  ADD PRIMARY KEY (`id_proposal`);

--
-- Indexes for table `sekretaris`
--
ALTER TABLE `sekretaris`
  ADD PRIMARY KEY (`nip`);

--
-- Indexes for table `surat_balasan`
--
ALTER TABLE `surat_balasan`
  ADD PRIMARY KEY (`id_suratBalasan`);

--
-- Indexes for table `surat_pengantar`
--
ALTER TABLE `surat_pengantar`
  ADD PRIMARY KEY (`id_suratPengantar`);

--
-- Indexes for table `surat_tugas`
--
ALTER TABLE `surat_tugas`
  ADD PRIMARY KEY (`id_surat_tugas`);

--
-- Indexes for table `token_mahasiswa`
--
ALTER TABLE `token_mahasiswa`
  ADD PRIMARY KEY (`id_token`),
  ADD KEY `nim_ketua` (`nim_ketua`);

--
-- Indexes for table `token_sekretaris`
--
ALTER TABLE `token_sekretaris`
  ADD PRIMARY KEY (`id_token`),
  ADD KEY `nip` (`nip`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kelompok`
--
ALTER TABLE `kelompok`
  MODIFY `id_kelompok` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `token_mahasiswa`
--
ALTER TABLE `token_mahasiswa`
  MODIFY `id_token` int(36) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `token_sekretaris`
--
ALTER TABLE `token_sekretaris`
  MODIFY `id_token` int(36) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `anggota`
--
ALTER TABLE `anggota`
  ADD CONSTRAINT `anggota_ibfk_1` FOREIGN KEY (`id_kelompok`) REFERENCES `kelompok` (`id_kelompok`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `kelompok`
--
ALTER TABLE `kelompok`
  ADD CONSTRAINT `kelompok_ibfk_1` FOREIGN KEY (`nim_ketua`) REFERENCES `mahasiswa` (`nim_ketua`) ON DELETE CASCADE;

--
-- Constraints for table `pengajuan_kp`
--
ALTER TABLE `pengajuan_kp`
  ADD CONSTRAINT `pengajuan_kp_ibfk_1` FOREIGN KEY (`id_kelompok`) REFERENCES `kelompok` (`id_kelompok`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pengajuan_kp_ibfk_3` FOREIGN KEY (`id_suratBalasan`) REFERENCES `surat_balasan` (`id_suratBalasan`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pengajuan_kp_ibfk_4` FOREIGN KEY (`id_suratPengantar`) REFERENCES `surat_pengantar` (`id_suratPengantar`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pengajuan_kp_ibfk_5` FOREIGN KEY (`id_suratTugas`) REFERENCES `surat_tugas` (`id_surat_tugas`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pengajuan_kp_ibfk_6` FOREIGN KEY (`nip`) REFERENCES `sekretaris` (`nip`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pengajuan_kp_ibfk_7` FOREIGN KEY (`id_proposal`) REFERENCES `proposal` (`id_proposal`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `token_mahasiswa`
--
ALTER TABLE `token_mahasiswa`
  ADD CONSTRAINT `token_mahasiswa_ibfk_1` FOREIGN KEY (`nim_ketua`) REFERENCES `mahasiswa` (`nim_ketua`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `token_sekretaris`
--
ALTER TABLE `token_sekretaris`
  ADD CONSTRAINT `token_sekretaris_ibfk_1` FOREIGN KEY (`nip`) REFERENCES `sekretaris` (`nip`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
