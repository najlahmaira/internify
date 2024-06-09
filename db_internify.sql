-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 09, 2024 at 11:48 AM
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
('2111522021', '2024-06-09 07:52:01', '2024-06-09 07:52:01', 'nadini', '$2b$10$FIBUSF229rvxcFkECsL2Ee2Z44XHtgnNAyXmiEC9MR2Z2KC8aUgQu');

-- --------------------------------------------------------

--
-- Table structure for table `pengajuan_kp`
--

CREATE TABLE `pengajuan_kp` (
  `id_pengajuan` char(36) NOT NULL,
  `nip` varchar(20) NOT NULL,
  `id_kelompok` int(11) NOT NULL,
  `id_suratPengantar` char(36) NOT NULL,
  `id_suratBalasan` char(36) NOT NULL,
  `id_proposal` char(36) NOT NULL,
  `id_suratTugas` char(36) NOT NULL,
  `status_pengajuan` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

--
-- Dumping data for table `proposal`
--

INSERT INTO `proposal` (`id_proposal`, `tanggal_pengajuan`, `judul_proposal`, `perusahaan_tujuan`, `lokasi`, `file_proposal`, `status_proposal`, `created_at`, `updated_at`) VALUES
('7f05d8b9-56da-48cf-afe0-989960489196', '0000-00-00', 'ini judul', 'telkomsel', 'padang', '52605-180560-1-PB.pdf', 'menunggu', '2024-06-09 09:39:45', '2024-06-09 09:39:45');

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
('2111522021', 'kak dini', '$2b$10$M4BjRReoM3vKuXru2fVbf..E6BYQM6Hwu1QadgBIMiKpPLDXx9uIS', '2024-06-09 08:00:00', '2024-06-09 08:00:00');

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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaW0iOiIyMTExNTIyMDIxIiwiaWF0IjoxNzE3OTIyODk4LCJleHAiOjE3MTg1Mjc2OTh9.Y5bLRzMOVG1hRleyEc3QRl2pFf3DwJseZAV7ysFeeFI', '2111522021', '2024-06-09 08:48:11', '2024-06-16');

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
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXAiOiIyMTExNTIyMDIxIiwiaWF0IjoxNzE3OTIzMDA0LCJleHAiOjE3MTg1Mjc4MDR9.i_NItrsgmr3HYRjkVJwpE2HxIcIQAnTLhQfk_Qpk8wM', '2111522021', '2024-06-09 08:50:01', '2024-06-16');

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
  MODIFY `id_kelompok` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `token_mahasiswa`
--
ALTER TABLE `token_mahasiswa`
  MODIFY `id_token` int(36) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `token_sekretaris`
--
ALTER TABLE `token_sekretaris`
  MODIFY `id_token` int(36) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  ADD CONSTRAINT `pengajuan_kp_ibfk_7` FOREIGN KEY (`id_proposal`) REFERENCES `proposal` (`id_proposal`);

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
