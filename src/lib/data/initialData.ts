import {
  ClassHubState,
  Student,
  OrgNode,
  ScheduleItem,
  PicketDayData,
  PicketTask,
  Announcement,
  PolaroidMemory,
  MenfessMessage,
  ClassPoll,
  ClassSong,
  ClassAssignment,
} from '@/types';

// ==========================================
// 35 NAMA SISWA RESMI DARI PENGGUNA & POSTER X DKV 1
// ==========================================
export const officialStudentRoster: Array<{ name: string; picketDay?: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat'; role?: string }> = [
  // --- REGU SENIN (6 SISWA) ---
  { name: 'Kesya', picketDay: 'Senin', role: 'Sekretaris 2' },
  { name: 'Suwitri', picketDay: 'Senin' },
  { name: 'Sasa', picketDay: 'Senin' },
  { name: 'Filsya', picketDay: 'Senin' },
  { name: 'Reva', picketDay: 'Senin' },
  { name: 'Umy', picketDay: 'Senin' },

  // --- REGU SELASA (7 SISWA) ---
  { name: 'Maya', picketDay: 'Selasa' },
  { name: 'Nurhaliza', picketDay: 'Selasa' },
  { name: 'Yola', picketDay: 'Selasa' },
  { name: 'Emi', picketDay: 'Selasa' },
  { name: 'Sarlia', picketDay: 'Selasa' },
  { name: 'Sandra', picketDay: 'Selasa' },
  { name: 'Melany', picketDay: 'Selasa' },

  // --- REGU RABU (7 SISWA) ---
  { name: 'Tiara', picketDay: 'Rabu' },
  { name: 'Dea', picketDay: 'Rabu', role: 'Sekretaris 1' },
  { name: 'Wildea', picketDay: 'Rabu' },
  { name: 'Evaa', picketDay: 'Rabu' },
  { name: 'Zilfa', picketDay: 'Rabu' },
  { name: 'Velencya', picketDay: 'Rabu' },
  { name: 'Aprilia', picketDay: 'Rabu' },

  // --- REGU KAMIS (7 SISWA) ---
  { name: 'Adel', picketDay: 'Kamis', role: 'Bendahara 1' },
  { name: 'Selly', picketDay: 'Kamis', role: 'Bendahara 2' },
  { name: 'Alinda', picketDay: 'Kamis' },
  { name: 'Pina', picketDay: 'Kamis' },
  { name: 'Sahrini', picketDay: 'Kamis' },
  { name: 'Uya', picketDay: 'Kamis' },
  { name: 'Azizah', picketDay: 'Kamis' },

  // --- REGU JUMAT (3 SISWA) ---
  { name: 'Natasya', picketDay: 'Jumat' },
  { name: 'Dheana', picketDay: 'Jumat' },
  { name: 'Juwita', picketDay: 'Jumat' },

  // --- TIM MBG & PENGURUS KELAS KHUSUS (5 SISWA) ---
  { name: 'Ahmad Zalqi', role: 'Ketua Kelas & Tim MBG' },
  { name: 'Sri Mulyaningtyas', role: 'Wakil Ketua Kelas' },
  { name: 'Ilham', role: 'Tim MBG' },
  { name: 'Andre', role: 'Tim MBG' },
  { name: 'Riza', role: 'Tim MBG' },
];

export const officialStudentNames: string[] = officialStudentRoster.map((s) => s.name);

export const initialStudents: Student[] = officialStudentRoster.map((item, index) => {
  const pad = String(index + 1).padStart(2, '0');
  return {
    id: `std-${index + 1}`,
    nis: pad,
    name: item.name,
    gender: 'L',
    role: item.role,
    picketDay: item.picketDay,
    isOrganigram: !!item.role,
  };
});

// ==========================================
// STRUKTUR ORGANISASI RESMI DARI POSTER X DKV 1
// ==========================================
export const initialOrgHierarchy: OrgNode[] = [
  {
    positionKey: 'wali_kelas',
    title: 'Wali Kelas',
    department: 'Pimpinan',
    customName: 'Ibu Marleni',
    customNote: 'Wali Kelas X DKV 1',
  },
  {
    positionKey: 'ketua_kelas',
    title: 'Ketua Kelas',
    department: 'Pimpinan',
    customName: 'Ahmad Zalqi',
    customNote: 'Ketua Kelas X DKV 1',
  },
  {
    positionKey: 'wakil_ketua',
    title: 'Wakil Ketua',
    department: 'Pimpinan',
    customName: 'Sri Mulyaningtyas',
    customNote: 'Wakil Ketua Kelas X DKV 1',
  },
  {
    positionKey: 'sekretaris_1',
    title: 'Sekretaris 1',
    department: 'Administrasi',
    customName: 'Dea Anggia',
    customNote: 'Sekretaris 1 X DKV 1',
  },
  {
    positionKey: 'sekretaris_2',
    title: 'Sekretaris 2',
    department: 'Administrasi',
    customName: 'Kesya',
    customNote: 'Sekretaris 2 X DKV 1',
  },
  {
    positionKey: 'bendahara_1',
    title: 'Bendahara 1',
    department: 'Administrasi',
    customName: 'Adel',
    customNote: 'Bendahara 1 X DKV 1',
  },
  {
    positionKey: 'bendahara_2',
    title: 'Bendahara 2',
    department: 'Administrasi',
    customName: 'Selly',
    customNote: 'Bendahara 2 X DKV 1',
  },
];

// Tim Pengambil MBG (Makan Bergizi Gratis)
export const initialMbgTeam: string[] = [
  'Riza',
  'Zalqi',
  'Ilham',
  'Akbar',
  'Andre',
];

// ==========================================
// JADWAL PELAJARAN RESMI DARI POSTER X DKV 1
// ==========================================
export const initialSchedules: ScheduleItem[] = [
  // --- SENIN ---
  { id: 'sch-sen-1', day: 'Senin', period: 1, startTime: '07.15', endTime: '08.00', subject: 'Upacara', teacher: '-', room: 'Lapangan' },
  { id: 'sch-sen-2', day: 'Senin', period: 2, startTime: '08.00', endTime: '08.45', subject: 'B Inggris', teacher: 'Raka' },
  { id: 'sch-sen-3', day: 'Senin', period: 3, startTime: '08.45', endTime: '09.30', subject: 'B Inggris', teacher: 'Raka' },
  { id: 'sch-sen-brk1', day: 'Senin', period: 0, startTime: '09.30', endTime: '09.45', subject: 'Istirahat', teacher: '-', isBreak: true },
  { id: 'sch-sen-4', day: 'Senin', period: 4, startTime: '09.45', endTime: '10.30', subject: 'Mtk', teacher: 'Angga' },
  { id: 'sch-sen-5', day: 'Senin', period: 5, startTime: '10.30', endTime: '11.15', subject: 'Mtk', teacher: 'Angga' },
  { id: 'sch-sen-6', day: 'Senin', period: 6, startTime: '11.15', endTime: '12.00', subject: 'Ipas', teacher: 'Marleni' },
  { id: 'sch-sen-brk2', day: 'Senin', period: 0, startTime: '12.00', endTime: '12.30', subject: 'Istirahat / ISHOMA', teacher: '-', isBreak: true },
  { id: 'sch-sen-7', day: 'Senin', period: 7, startTime: '12.30', endTime: '13.10', subject: 'Ipas', teacher: 'Marleni' },
  { id: 'sch-sen-8', day: 'Senin', period: 8, startTime: '13.10', endTime: '13.50', subject: 'Ipas', teacher: 'Marleni' },
  { id: 'sch-sen-9', day: 'Senin', period: 9, startTime: '13.50', endTime: '14.30', subject: 'Fotografi', teacher: 'Amelia', room: 'Lab Fotografi' },
  { id: 'sch-sen-10', day: 'Senin', period: 10, startTime: '14.30', endTime: '15.10', subject: 'Fotografi', teacher: 'Amelia', room: 'Lab Fotografi' },
  { id: 'sch-sen-11', day: 'Senin', period: 11, startTime: '15.10', endTime: '15.50', subject: 'Fotografi', teacher: 'Amelia', room: 'Lab Fotografi' },

  // --- SELASA ---
  { id: 'sch-sel-1', day: 'Selasa', period: 1, startTime: '07.15', endTime: '08.00', subject: 'Pkn', teacher: 'Media' },
  { id: 'sch-sel-2', day: 'Selasa', period: 2, startTime: '08.00', endTime: '08.45', subject: 'Pkn', teacher: 'Media' },
  { id: 'sch-sel-3', day: 'Selasa', period: 3, startTime: '08.45', endTime: '09.30', subject: 'B Inggris', teacher: 'Raka' },
  { id: 'sch-sel-brk1', day: 'Selasa', period: 0, startTime: '09.30', endTime: '09.45', subject: 'Istirahat', teacher: '-', isBreak: true },
  { id: 'sch-sel-4', day: 'Selasa', period: 4, startTime: '09.45', endTime: '10.30', subject: 'B Inggris', teacher: 'Raka' },
  { id: 'sch-sel-5', day: 'Selasa', period: 5, startTime: '10.30', endTime: '11.15', subject: 'Senbud', teacher: 'Alfian' },
  { id: 'sch-sel-6', day: 'Selasa', period: 6, startTime: '11.15', endTime: '12.00', subject: 'Seni Budaya', teacher: 'Alfian' },
  { id: 'sch-sel-brk2', day: 'Selasa', period: 0, startTime: '12.00', endTime: '12.30', subject: 'Istirahat / ISHOMA', teacher: '-', isBreak: true },
  { id: 'sch-sel-7', day: 'Selasa', period: 7, startTime: '12.30', endTime: '13.10', subject: 'Pdkv', teacher: 'Nuzulian', room: 'Lab Komputer DKV' },
  { id: 'sch-sel-8', day: 'Selasa', period: 8, startTime: '13.10', endTime: '13.50', subject: 'Pdkv', teacher: 'Nuzulian', room: 'Lab Komputer DKV' },
  { id: 'sch-sel-9', day: 'Selasa', period: 9, startTime: '13.50', endTime: '14.30', subject: 'Pdkv', teacher: 'Nuzulian', room: 'Lab Komputer DKV' },
  { id: 'sch-sel-10', day: 'Selasa', period: 10, startTime: '14.30', endTime: '15.10', subject: 'Pai', teacher: 'M Ansori' },
  { id: 'sch-sel-11', day: 'Selasa', period: 11, startTime: '15.10', endTime: '15.50', subject: 'Pai', teacher: 'M Ansori' },

  // --- RABU ---
  { id: 'sch-rab-1', day: 'Rabu', period: 1, startTime: '07.15', endTime: '08.00', subject: 'Perwalian', teacher: 'Wali Kelas' },
  { id: 'sch-rab-2', day: 'Rabu', period: 2, startTime: '08.00', endTime: '08.45', subject: 'Pjok', teacher: 'Imam', room: 'Lapangan Olahraga' },
  { id: 'sch-rab-3', day: 'Rabu', period: 3, startTime: '08.45', endTime: '09.30', subject: 'Pjok', teacher: 'Imam', room: 'Lapangan Olahraga' },
  { id: 'sch-rab-brk1', day: 'Rabu', period: 0, startTime: '09.30', endTime: '09.45', subject: 'Istirahat', teacher: '-', isBreak: true },
  { id: 'sch-rab-4', day: 'Rabu', period: 4, startTime: '09.45', endTime: '10.30', subject: 'Pjok', teacher: 'Imam', room: 'Lapangan Olahraga' },
  { id: 'sch-rab-5', day: 'Rabu', period: 5, startTime: '10.30', endTime: '11.15', subject: 'Pdkv', teacher: 'Syahrul', room: 'Lab Komputer DKV' },
  { id: 'sch-rab-6', day: 'Rabu', period: 6, startTime: '11.15', endTime: '12.00', subject: 'Pdkv', teacher: 'Syahrul', room: 'Lab Komputer DKV' },
  { id: 'sch-rab-brk2', day: 'Rabu', period: 0, startTime: '12.00', endTime: '12.30', subject: 'Istirahat / ISHOMA', teacher: '-', isBreak: true },
  { id: 'sch-rab-7', day: 'Rabu', period: 7, startTime: '12.30', endTime: '13.10', subject: 'Mtk', teacher: 'Angga' },
  { id: 'sch-rab-8', day: 'Rabu', period: 8, startTime: '13.10', endTime: '13.50', subject: 'Mtk', teacher: 'Angga' },
  { id: 'sch-rab-9', day: 'Rabu', period: 9, startTime: '13.50', endTime: '14.30', subject: 'Mtk', teacher: 'Angga' },
  { id: 'sch-rab-10', day: 'Rabu', period: 10, startTime: '14.30', endTime: '15.10', subject: 'Ipas', teacher: 'Marleni' },
  { id: 'sch-rab-11', day: 'Rabu', period: 11, startTime: '15.10', endTime: '15.50', subject: 'Ipas', teacher: 'Marleni' },

  // --- KAMIS ---
  { id: 'sch-kam-1', day: 'Kamis', period: 1, startTime: '07.15', endTime: '08.00', subject: 'Pdkv', teacher: 'Derri', room: 'Lab Komputer DKV' },
  { id: 'sch-kam-2', day: 'Kamis', period: 2, startTime: '08.00', endTime: '08.45', subject: 'Pdkv', teacher: 'Derri', room: 'Lab Komputer DKV' },
  { id: 'sch-kam-3', day: 'Kamis', period: 3, startTime: '08.45', endTime: '09.30', subject: 'Informatika', teacher: 'Desi', room: 'Lab Komputer' },
  { id: 'sch-kam-brk1', day: 'Kamis', period: 0, startTime: '09.30', endTime: '09.45', subject: 'Istirahat', teacher: '-', isBreak: true },
  { id: 'sch-kam-4', day: 'Kamis', period: 4, startTime: '09.45', endTime: '10.30', subject: 'Informatika', teacher: 'Desi', room: 'Lab Komputer' },
  { id: 'sch-kam-5', day: 'Kamis', period: 5, startTime: '10.30', endTime: '11.15', subject: 'Informatika', teacher: 'Desi', room: 'Lab Komputer' },
  { id: 'sch-kam-6', day: 'Kamis', period: 6, startTime: '11.15', endTime: '12.00', subject: 'Informatika', teacher: 'Desi', room: 'Lab Komputer' },
  { id: 'sch-kam-brk2', day: 'Kamis', period: 0, startTime: '12.00', endTime: '12.30', subject: 'Istirahat / ISHOMA', teacher: '-', isBreak: true },
  { id: 'sch-kam-7', day: 'Kamis', period: 7, startTime: '12.30', endTime: '13.10', subject: 'B Indo', teacher: 'Evi' },
  { id: 'sch-kam-8', day: 'Kamis', period: 8, startTime: '13.10', endTime: '13.50', subject: 'B Indo', teacher: 'Evi' },
  { id: 'sch-kam-9', day: 'Kamis', period: 9, startTime: '13.50', endTime: '14.30', subject: 'B Indo', teacher: 'Evi' },
  { id: 'sch-kam-10', day: 'Kamis', period: 10, startTime: '14.30', endTime: '15.10', subject: 'K. Grafis', teacher: 'Dhiska', room: 'Lab Desain Grafis' },
  { id: 'sch-kam-11', day: 'Kamis', period: 11, startTime: '15.10', endTime: '15.50', subject: 'Kom Grafis', teacher: 'Dhiska', room: 'Lab Desain Grafis' },

  // --- JUMAT ---
  { id: 'sch-jum-1', day: 'Jumat', period: 1, startTime: '07.15', endTime: '08.00', subject: 'Sejari', teacher: 'Swastika' },
  { id: 'sch-jum-2', day: 'Jumat', period: 2, startTime: '08.00', endTime: '08.45', subject: 'Sejari', teacher: 'Swastika' },
  { id: 'sch-jum-3', day: 'Jumat', period: 3, startTime: '08.45', endTime: '09.30', subject: 'B Indo', teacher: 'Evi' },
  { id: 'sch-jum-brk1', day: 'Jumat', period: 0, startTime: '09.30', endTime: '09.45', subject: 'Istirahat', teacher: '-', isBreak: true },
  { id: 'sch-jum-4', day: 'Jumat', period: 4, startTime: '09.45', endTime: '10.30', subject: 'B Indo', teacher: 'Evi' },
  { id: 'sch-jum-5', day: 'Jumat', period: 5, startTime: '10.30', endTime: '11.15', subject: 'B Indo', teacher: 'Evi' },
];

// Jadwal Piket (Kosong pembagian anggotanya sampai ada info jadwal piket fiks)
export const initialPicketDays: PicketDayData[] = [
  { day: 'Senin', groupName: 'Regu Senin' },
  { day: 'Selasa', groupName: 'Regu Selasa' },
  { day: 'Rabu', groupName: 'Regu Rabu' },
  { day: 'Kamis', groupName: 'Regu Kamis' },
  { day: 'Jumat', groupName: 'Regu Jumat' },
];

export const initialPicketTasks: PicketTask[] = [
  { id: 'task-1', title: 'Menyapu lantai ruang kelas' },
  { id: 'task-2', title: 'Mengepel lantai ruang kelas' },
  { id: 'task-3', title: 'Membersihkan papan tulis' },
  { id: 'task-4', title: 'Merapikan meja dan kursi' },
  { id: 'task-5', title: 'Membuang sampah ke bak pembuangan' },
  { id: 'task-6', title: 'Mematikan lampu, kipas angin, dan peralatan listrik' },
  { id: 'task-7', title: 'Mengunci pintu kelas sebelum pulang' },
];

export const initialAnnouncements: Announcement[] = [];

// ==========================================
// FOTO GALERI RESMI DARI PENGGUNA
// ==========================================
export const initialMemories: PolaroidMemory[] = [
  {
    id: 'mem-1',
    title: 'Foto Bersama di Koridor Kelas',
    caption: 'Momen kebersamaan teman-teman kelas di koridor sekolah.',
    imageUrl: '/images/gallery1.jpg',
    date: '10 Oktober 2026',
    tags: ['MomenKelas', 'Kebersamaan'],
    likes: 0,
    category: 'Seru',
    location: 'Koridor Kelas',
  },
  {
    id: 'mem-2',
    title: 'Kekompakan di Dalam Ruang Kelas',
    caption: 'Foto ceria bersama seluruh teman-teman di dalam ruangan kelas.',
    imageUrl: '/images/gallery2.png',
    date: '10 Oktober 2026',
    tags: ['RuangKelas', 'Ceria'],
    likes: 0,
    category: 'Candid',
    location: 'Ruang Kelas',
  },
  {
    id: 'mem-3',
    title: 'Dokumentasi Acara & Kostum Kreasi',
    caption: 'Foto bersama di halaman depan dengan kostum kreasi hijau dan seragam sekolah.',
    imageUrl: '/images/gallery3.jpg',
    date: '10 Oktober 2026',
    tags: ['KegiatanSekolah', 'Kompak'],
    likes: 0,
    category: 'Seru',
    location: 'Halaman Sekolah',
  },
];

export const initialAssignments: ClassAssignment[] = [
  {
    id: 'asg-notif-1',
    category: 'Pemberitahuan',
    title: 'Edaran Jadwal Pengambilan Seragam Praktek & Perlengkapan DKV',
    subject: 'Pemberitahuan Kelas',
    teacher: 'Ibu Marleni',
    announcedBy: 'Ahmad Zalqi (Ketua Kelas)',
    deadline: '2026-10-17',
    deadlineTime: '12:00',
    description: 'Diberitahukan kepada seluruh warga kelas X DKV 1 untuk melunasi dan mengambil rompi praktek serta perlengkapan gambar di ruang koperasi siswa paling lambat hari Sabtu sebelum jam istirahat kedua.',
    type: 'Individu',
    submissionType: 'Tidak Ada (Info)',
    priority: 'Tinggi',
    isCompleted: false,
    createdAt: '2026-10-11',
  },
  {
    id: 'asg-1',
    category: 'Tugas',
    title: 'Sketsa & Vektor Logo Monogram DKV',
    subject: 'PDKV',
    teacher: 'Pak Derri',
    announcedBy: 'Dea Anggia (Sekretaris 1)',
    deadline: '2026-10-14',
    deadlineTime: '23:59',
    description: 'Buat 3 alternatif sketsa logo monogram inisial nama sendiri di buku sketsa, lalu digitalisasi 1 pilihan terbaik menggunakan software vektor (CorelDraw / Illustrator). Simpan format PDF & PNG transparan.',
    type: 'Individu',
    submissionType: 'Google Classroom',
    priority: 'Tinggi',
    isCompleted: false,
    createdAt: '2026-10-10',
  },
  {
    id: 'asg-2',
    category: 'Tugas',
    title: 'Praktik Fotografi Komposisi Rule of Thirds',
    subject: 'Fotografi',
    teacher: 'Bu Amelia',
    announcedBy: 'Ahmad Zalqi (Ketua Kelas)',
    deadline: '2026-10-16',
    deadlineTime: '15:00',
    description: 'Ambil 5 foto di area sekolah dengan menerapkan teknik komposisi Rule of Thirds dan Leading Lines. Jangan diedit berlebihan, kumpulkan file JPEG asli beserta catatan aperture & shutter speed.',
    type: 'Kelompok',
    submissionType: 'Link Drive',
    priority: 'Sedang',
    isCompleted: false,
    createdAt: '2026-10-10',
  },
  {
    id: 'asg-3',
    category: 'Tugas',
    title: 'Latihan Soal Barisan & Deret Geometri',
    subject: 'Matematika',
    teacher: 'Pak Angga',
    announcedBy: 'Kesya (Sekretaris 2)',
    deadline: '2026-10-15',
    deadlineTime: '07:15',
    description: 'Kerjakan latihan soal halaman 42 nomor 1 sampai 10 di buku latihan catatan matematika lengkap dengan cara pengerjaan sebelum jam masuk.',
    type: 'Individu',
    submissionType: 'Buku / Kertas',
    priority: 'Sedang',
    isCompleted: false,
    createdAt: '2026-10-11',
  },
  {
    id: 'asg-4',
    category: 'Tugas',
    title: 'Laporan Analisis Data & Rumus Spreadsheet',
    subject: 'Informatika',
    teacher: 'Bu Desi',
    announcedBy: 'Adel (Bendahara 1)',
    deadline: '2026-10-18',
    deadlineTime: '21:00',
    description: 'Kerjakan lembar kerja rumus IF bersarang, VLOOKUP, dan SUMIFS pada file Excel yang telah dibagikan di grup kelas.',
    type: 'Individu',
    submissionType: 'Google Classroom',
    priority: 'Biasa',
    isCompleted: false,
    createdAt: '2026-10-11',
  },
];

export const initialMenfess: MenfessMessage[] = [];
export const initialPolls: ClassPoll[] = [];
export const initialPlaylist: ClassSong[] = [];

export const initialClassHubState: ClassHubState = {
  classInfo: {
    name: 'X DKV 1',
    fullName: 'X Desain Komunikasi Visual 1',
    schoolName: 'SMK',
    academicYear: '2025/2026',
    semester: 'Semester Ganjil',
    slogan: 'Kompak, Kreatif, dan Berprestasi',
    roomNumber: 'Ruang X DKV 1',
    homeroomTeacher: {
      name: 'Ibu Marleni',
      subject: 'IPAS / Guru Produktif',
    },
  },
  students: initialStudents,
  orgHierarchy: initialOrgHierarchy,
  schedules: initialSchedules,
  picketDays: initialPicketDays,
  picketTasks: initialPicketTasks,
  picketCompleted: {},
  announcements: initialAnnouncements,
  assignments: initialAssignments,
  memories: initialMemories,
  menfess: initialMenfess,
  polls: initialPolls,
  playlist: initialPlaylist,
};
