# 🏫 ClassHub — Website Portal Digital Kelas Modern (X DKV 1)

**ClassHub** adalah website portal digital kelas modern, interaktif, responsif, dan fungsional yang dirancang khusus untuk memenuhi kebutuhan informasi harian kelas (jadwal pelajaran, jadwal piket kebersihan, struktur organisasi, direktori anggota, dan pengumuman).

Website ini menerapkan panduan desain **Soft Pastel Blue × Pure White Aesthetic**:
* **Background Utama:** `#F7FBFF`
* **Card & Panel:** `#FFFFFF` dengan border halus `#E4EEF8`
* **Pastel Blue Accent:** `#DCEEFF`, `#B9DCFF`
* **Primary & Accent Blue:** `#83BDF5`, `#5A9FE8`
* **Teks & Kontras:** `#263B50` (Teks Utama) & `#71849A` (Teks Sekunder)

---

## 🌟 Fitur Utama & Modul

### 1. Dashboard / Beranda (`/`)
* **Sapaan Dinamis Berdasarkan Waktu:** Menampilkan "Selamat Pagi", "Selamat Siang", "Selamat Sore", atau "Selamat Malam" secara otomatis dengan ikon dan pesan penyemangat.
* **Identitas Kelas:** Nama kelas (X DKV 1), tahun ajaran, nama sekolah, nomor ruang kelas, dan semboyan kelas.
* **Ringkasan Jadwal Pelajaran Hari Ini:** Deteksi jadwal aktif hari ini, indikator mata pelajaran yang sedang berlangsung (*Live Progress Indicator*), jam istirahat, serta guru pengampu.
* **Ringkasan Regu Piket Hari Ini:** Tampilan foto regu, anggota piket bertugas, dan checklist interaktif langsung dari beranda.
* **Pengumuman Terkini:** Banner pengumuman penting yang disematkan (*pinned*) dan modal baca detail.
* **Kartu Statistik Kunci:** Total siswa (rasio L/P), jumlah sesi belajar hari ini, persentase tuntas piket, dan kabar aktif.

### 2. Struktur Organisasi Kelas (`/struktur`)
* **Hierarki Lengkap:**
  * Wali Kelas & Pembina
  * Ketua Kelas & Wakil Ketua Kelas
  * Sekretariat (Sekretaris 1 & 2)
  * Kebendaharaan (Bendahara 1 & 2)
  * 6 Koordinator Seksi Bidang: Seksi Kebersihan, Keamanan, Perlengkapan, Rohani, Olahraga, Media & Kreatif.
  * Anggota Kelas.
* **2 Mode Tampilan Fleksibel:**
  * **Bagan Pohon (Tree Diagram):** Susunan visual hierarki vertikal-horizontal dengan garis penghubung biru pastel.
  * **Daftar Kartu (Grid View):** Dikelompokkan rapi berdasarkan dewan pimpinan, administrasi, dan seksi bidang.
* **Modal Detail Pengurus:** Menampilkan foto profil, jabatan, NIS, kontak sosmed, dan catatan tugas.

### 3. Jadwal Pelajaran (`/jadwal`)
* **5 Hari Belajar (Senin s/d Jumat):** Jadwal lengkap dari jam ke-1 hingga jam terakhir.
* **Indikator Waktu Real-Time:** Menandai sesi pelajaran yang *Sedang Berlangsung*, *Mata Pelajaran Berikutnya*, atau waktu istirahat secara otomatis.
* **2 Format Tampilan:**
  * **Tampilan Harian (Day Cards):** Navigasi tab antarhari yang nyaman digunakan di smartphone.
  * **Tampilan Mingguan (Weekly Table):** Tabel matriks mingguan untuk layar desktop atau tablet.
* **Pencarian Cepat:** Filter nama mata pelajaran, nama guru, atau nomor laboratorium komputer.
* **Fitur Cetak Jadwal (Print / PDF):** Tombol cetak khusus dengan CSS print-friendly.

### 4. Jadwal Piket Kebersihan & Interactive Checklist (`/piket`)
* **Regu Piket Harian (Senin s/d Jumat):** Nama regu, instruksi khusus wali kelas, dan foto kekompakan regu.
* **Interactive Checklist Tugas:**
  * Menyapu & mengepel lantai.
  * Membersihkan papan tulis & spidol.
  * Merapikan meja guru & kursi siswa.
  * Mengosongkan tempat sampah ke bak pembuangan.
  * Mematikan AC, proyektor, lampu, dan colokan listrik.
  * Menutup jendela dan mengunci pintu.
* **Persistensi Data Nyata:** Checklist tersimpan langsung pada storage browser (tidak hilang saat reload halaman).
* **Progress Bar & Celebration Confetti:** Menghitung persentase kebersihan (misal: 100% Tuntas) dan memunculkan animasi konfeti perayaan saat seluruh tugas selesai!
* **Tombol Reset Checklist:** Mengulang tugas harian untuk persiapan giliran piket berikutnya.

### 5. Direktori Anggota Kelas (`/anggota`)
* **Daftar 30 Siswa Lengkap:** Foto profil, NIS, nama lengkap, jabatan kelas, dan hari piket.
* **Filter Multi-Kriteria:**
  * Filter Peran (Semua / Pengurus Inti / Anggota Biasa).
  * Filter Hari Piket (Senin - Jumat).
  * Filter Gender (Semua / Laki-laki / Perempuan).
* **Pencarian Instan:** Mencari berdasarkan nama atau NIS secara langsung.
* **Tampilan Fleksibel:** Toggle antara *Grid Kartu* dan *Tabel/List*.
* **Modal Profil Siswa:** Detail NIS, gender, hari piket, motto/quote, dan Instagram.

### 6. Papan Pengumuman Kelas (`/pengumuman`)
* **Kategori Informasi:** `Penting`, `Tugas`, `Kegiatan`, `Ujian`, dan `Info Umum`.
* **Disematkan (Pinned):** Pengumuman krusial ditempatkan di paling atas dengan highlight border biru.
* **Tenggat Waktu (Due Date):** Penanda batas waktu pengumpulan tugas atau tanggal ujian STS.
* **Modal Baca Penuh:** Membaca pengumuman panjang lengkap dengan tags dan pengirim.
* **Pencarian & Filter Kategori:** Menemukan pengumuman lama dengan cepat.

### 7. Panel Administrator (`/admin`)
* **Autentikasi Terproteksi:** Dilindungi kata sandi administrator (Kata sandi default: `admin` atau `admin123`).
* **CRUD Lengkap Tanpa Edit Source Code:**
  * **Identitas Kelas:** Ubah nama kelas, nama panjang, slogan, ruang, dan wali kelas.
  * **Kelola Anggota:** Tambah siswa baru, ubah foto, ubah peran, ubah hari piket, atau hapus siswa.
  * **Kelola Jadwal:** Tambah jam pelajaran baru, ubah nama guru, jam mulai/selesai, ruangan, atau hapus.
  * **Kelola Piket:** Ubah nama regu piket, tambah butir tugas kebersihan baru ke checklist.
  * **Kelola Pengumuman:** Buat pengumuman baru, sematkan ke posisi teratas, atau hapus.
* **Backup & Restore JSON:**
  * Ekspor seluruh data kelas menjadi file cadangan `.json` sekali klik.
  * Impor data JSON cadangan untuk memulihkan konfigurasi.
  * Tombol reset ke setelan data bawaan awal.

---

## 🚀 Cara Menjalankan Proyek

Proyek ini dibangun menggunakan **Next.js (App Router, TypeScript)** dan **Tailwind CSS**.

### Prasyarat
* Node.js v18+ atau v20+ (Telah diuji dan bekerja di Node.js v26.4.0).
* npm atau yarn / pnpm.

### 1. Masuk ke Direktori Proyek
```bash
cd "C:\Users\LENOVO\.gemini\antigravity\scratch\classhub"
```

### 2. Jalankan Server Pengembangan (Dev)
```bash
npm run dev
```
Buka browser di [http://localhost:4000](http://localhost:4000).

### 3. Build & Jalankan Mode Produksi
```bash
npm run build
npm start
```

---

## 📁 Struktur Direktori

```
classhub/
├── src/
│   ├── app/
│   │   ├── admin/page.tsx        # Halaman Admin Panel & Manajemen Data
│   │   ├── anggota/page.tsx      # Direktori Siswa & Filter Pencarian
│   │   ├── jadwal/page.tsx       # Jadwal Pelajaran Harian & Mingguan
│   │   ├── pengumuman/page.tsx   # Papan Kabar & Agenda Kelas
│   │   ├── piket/page.tsx        # Jadwal Piket & Checklist Interaktif
│   │   ├── struktur/page.tsx     # Bagan Pohon & Kartu Struktur Organisasi
│   │   ├── globals.css           # Design Tokens Blue Pastel & Pure White
│   │   ├── layout.tsx            # Root Layout & Provider
│   │   └── page.tsx              # Beranda / Dashboard Kelas
│   ├── components/
│   │   ├── common/               # Elemen Dekorasi Awan, Bintang & Badge
│   │   ├── dashboard/            # Komponen Beranda (Hero, Stats, Daily Cards)
│   │   └── layout/               # Navbar & Footer
│   ├── context/
│   │   └── ClassDataContext.tsx  # Central State & LocalStorage Persistence
│   ├── lib/
│   │   ├── data/initialData.ts   # Data Contoh Realistis X DKV 1
│   │   └── utils/time.ts         # Format Tanggal & Waktu Bahasa Indonesia
│   └── types/
│       └── index.ts              # Definisi Tipe TypeScript
├── package.json
└── README.md
```

---

## 🔒 Akses Administrator
* **URL:** `/admin`
* **Kata Sandi Default:** `admin` atau `admin123`
* Anda dapat mengubah data siswa, jadwal pelajaran, dan identitas kelas kapan saja melalui panel ini.
