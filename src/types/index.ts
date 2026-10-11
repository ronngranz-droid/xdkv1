export type DayOfWeek = 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';

export interface ClassInfo {
  name: string; // e.g. "X DKV 1"
  fullName: string; // e.g. "X Desain Komunikasi Visual 1"
  schoolName: string; // e.g. "SMK Negeri 1 Surabaya"
  academicYear: string; // e.g. "2024/2025"
  semester: string; // e.g. "Semester Ganjil"
  slogan: string; // e.g. "Kreatif Berkreasi, Kompak Berprestasi"
  roomNumber: string; // e.g. "Ruang DKV-101"
  homeroomTeacher: {
    name: string;
    nip?: string;
    subject: string;
    photoUrl?: string;
    contact?: string;
  };
}

export interface Student {
  id: string;
  nis: string;
  name: string;
  gender: 'L' | 'P';
  role?: string;
  picketDay?: DayOfWeek;
  avatarUrl?: string;
  quote?: string;
  instagram?: string;
  birthday?: string; // e.g. "15 Oktober"
  hobbies?: string[];
  isOrganigram?: boolean;
  organigramPosition?: OrgPositionKey;
}

export type OrgPositionKey =
  | 'wali_kelas'
  | 'ketua_kelas'
  | 'wakil_ketua'
  | 'sekretaris_1'
  | 'sekretaris_2'
  | 'bendahara_1'
  | 'bendahara_2'
  | 'pengambil_mbg'
  | 'seksi_kebersihan'
  | 'seksi_keamanan'
  | 'seksi_perlengkapan'
  | 'seksi_rohani'
  | 'seksi_olahraga'
  | 'seksi_media';

export interface OrgNode {
  positionKey: OrgPositionKey;
  title: string;
  department: 'Pimpinan' | 'Administrasi' | 'Seksi Bidang' | 'Tim Khusus';
  assignedStudentId?: string;
  customName?: string;
  customPhoto?: string;
  customNote?: string;
}

export interface ScheduleItem {
  id: string;
  day: DayOfWeek;
  period: number;
  startTime: string;
  endTime: string;
  subject: string;
  teacher: string;
  room?: string;
  isBreak?: boolean;
  colorTheme?: string;
}

export interface PicketTask {
  id: string;
  title: string;
  description?: string;
}

export interface PicketDayData {
  day: DayOfWeek;
  groupName: string;
  groupLeaderId?: string;
  groupPhotoUrl?: string;
  notes?: string;
}

export type AnnouncementCategory = 'Penting' | 'Tugas' | 'Kegiatan' | 'Ujian' | 'Info Umum';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: AnnouncementCategory;
  author: string;
  date: string;
  isPinned: boolean;
  dueDate?: string;
  tags?: string[];
}

// ==========================================
// FITUR SERU-SERUAN KELAS (FUN & PLAYFUL)
// ==========================================

export interface PolaroidMemory {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  date: string;
  tags: string[];
  likes: number;
  category: 'Seru' | 'Praktikum' | 'Trip' | 'Candid';
  location?: string;
}

export interface MenfessMessage {
  id: string;
  sender: string; // e.g. "Secret Admirer", "Anak Pojok Belakang", or actual name
  receiver: string; // e.g. "Devina", "Ketua Kelas", "Warga DKV 1"
  message: string;
  colorTheme: 'pastel-blue' | 'pastel-pink' | 'pastel-yellow' | 'pastel-mint' | 'pastel-lavender';
  sticker: '✨' | '💌' | '🐱' | '☕' | '🎉' | '💖' | '🎨' | '⭐';
  likes: number;
  date: string;
}

export interface ClassPoll {
  id: string;
  title: string;
  description?: string;
  category: 'Penghargaan' | 'Kebiasaan' | 'Seru';
  options: {
    id: string;
    label: string;
    votes: number;
    avatarUrl?: string;
  }[];
  totalVotes: number;
}

export interface ClassSong {
  id: string;
  title: string;
  artist: string;
  duration: string;
  albumCover: string;
  vibe: string;
}

export interface ClassAssignment {
  id: string;
  title: string;
  subject: string;
  teacher?: string;
  deadline: string; // Format YYYY-MM-DD
  deadlineTime?: string; // Format HH:mm, e.g. "23:59"
  description: string;
  type: 'Individu' | 'Kelompok';
  submissionType: 'Google Classroom' | 'Buku / Kertas' | 'Flashdisk / File' | 'Link Drive' | 'Langsung di Kelas';
  isCompleted?: boolean;
  priority: 'Tinggi' | 'Sedang' | 'Biasa';
  createdAt: string;
}

export interface ClassHubState {
  classInfo: ClassInfo;
  students: Student[];
  orgHierarchy: OrgNode[];
  schedules: ScheduleItem[];
  picketDays: PicketDayData[];
  picketTasks: PicketTask[];
  picketCompleted: Record<string, boolean>;
  announcements: Announcement[];
  // Assignments / PR Kelas
  assignments: ClassAssignment[];
  // Fun features
  memories: PolaroidMemory[];
  menfess: MenfessMessage[];
  polls: ClassPoll[];
  playlist: ClassSong[];
}
