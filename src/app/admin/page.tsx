'use client';

import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Unlock,
  KeyRound,
  LogOut,
  Settings,
  Users,
  CalendarDays,
  Sparkles,
  Megaphone,
  Database,
  Plus,
  Trash2,
  Edit2,
  Save,
  Check,
  AlertCircle,
  Download,
  Upload,
  RefreshCw,
  X,
} from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';
import { Student, DayOfWeek, ScheduleItem, Announcement, AnnouncementCategory } from '@/types';
import { PastelCloud, PastelStar } from '@/components/common/DecorativeElements';

export default function AdminPage() {
  const {
    state,
    isAdmin,
    loginAdmin,
    logoutAdmin,
    updateClassInfo,
    addStudent,
    updateStudent,
    deleteStudent,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    updatePicketDay,
    addPicketTask,
    deletePicketTask,
    resetToDefaultData,
    exportDataToJson,
    importDataFromJson,
  } = useClassData();

  // Authentication State
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab in Admin
  const [activeTab, setActiveTab] = useState<
    'info' | 'students' | 'schedule' | 'picket' | 'announcements' | 'backup'
  >('info');

  // Success banner feedback
  const [successMsg, setSuccessMsg] = useState('');
  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Class Info Edit State
  const [classInfoForm, setClassInfoForm] = useState(state.classInfo);

  // Student Modal / Edit State
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [newStudentData, setNewStudentData] = useState<Omit<Student, 'id'>>({
    nis: '',
    name: '',
    gender: 'L',
    role: '',
    picketDay: 'Senin',
    avatarUrl: '',
    quote: '',
    instagram: '',
  });

  // Schedule Modal / Edit State
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleItem | null>(null);
  const [newScheduleData, setNewScheduleData] = useState<Omit<ScheduleItem, 'id'>>({
    day: 'Senin',
    period: 1,
    startTime: '07:00',
    endTime: '08:30',
    subject: '',
    teacher: '',
    room: 'Ruang DKV-101',
    isBreak: false,
  });

  // Announcement Modal / Form State
  const [isAddAnnounceOpen, setIsAddAnnounceOpen] = useState(false);
  const [newAnnounceData, setNewAnnounceData] = useState<Omit<Announcement, 'id' | 'date'>>({
    title: '',
    content: '',
    category: 'Info Umum',
    author: 'Pengurus Kelas',
    isPinned: false,
    dueDate: '',
  });

  // Picket task input
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');

  // JSON Import state
  const [jsonInput, setJsonInput] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passwordInput)) {
      setLoginError('');
      setPasswordInput('');
      triggerSuccess('Berhasil login sebagai Administrator!');
    } else {
      setLoginError('Password salah! Coba kata sandi standar: "admin" atau "admin123"');
    }
  };

  // IF NOT AUTHENTICATED: SHOW BEAUTIFUL PASTEL LOGIN MODAL
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 sm:p-8 bg-white rounded-3xl border border-[#E4EEF8] shadow-sm shadow-[#B9DCFF]/20 relative overflow-hidden animate-in fade-in duration-200">
        <PastelCloud className="absolute -top-10 -right-10 w-40 opacity-40" />
        <PastelStar className="absolute bottom-6 left-6 w-4 h-4 text-[#83BDF5]" />

        <div className="text-center space-y-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#DCEEFF] border border-[#B9DCFF] flex items-center justify-center text-[#5A9FE8] mx-auto shadow-2xs">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#263B50]">
            Panel Administrator ClassHub
          </h1>
          <p className="text-xs text-[#71849A] leading-relaxed">
            Masukkan kata sandi pengurus/admin untuk mengelola data anggota kelas, struktur, jadwal pelajaran, dan pengumuman.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#263B50] mb-1.5">
              Kata Sandi Admin
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71849A]" />
              <input
                type="password"
                placeholder="Masukkan password admin..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-[#F7FBFF] border border-[#E4EEF8] text-[#263B50] focus:outline-none focus:border-[#83BDF5] focus:bg-white"
                autoFocus
              />
            </div>
            {loginError && (
              <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {loginError}
              </p>
            )}
          </div>

          <div className="p-3 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8] text-[11px] text-[#71849A] leading-relaxed">
            <strong className="text-[#263B50]">Info Default:</strong> Password admin bawaan adalah <code className="bg-[#DCEEFF] text-[#263B50] px-1.5 py-0.5 rounded font-mono font-bold">admin</code> atau <code className="bg-[#DCEEFF] text-[#263B50] px-1.5 py-0.5 rounded font-mono font-bold">admin123</code>.
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#5A9FE8] text-white text-xs font-bold hover:bg-[#468ed9] transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <Unlock className="w-4 h-4" />
            <span>Masuk ke Admin Panel</span>
          </button>
        </form>
      </div>
    );
  }

  // IF AUTHENTICATED: SHOW FULL RICH MANAGEMENT DASHBOARD
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Admin Header */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-[#E4EEF8] p-6 sm:p-8 shadow-sm shadow-[#B9DCFF]/20">
        <PastelCloud className="absolute -top-8 -right-8 w-48 opacity-40" />
        <PastelStar className="absolute top-6 left-1/3 w-4 h-4 text-[#83BDF5]" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-xs font-semibold text-emerald-800">
              <Shield className="w-3.5 h-3.5" />
              <span>Sesi Administrator Aktif • Hak Akses Penuh</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#263B50] tracking-tight">
              Pusat Pengelolaan Data {state.classInfo.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#71849A] max-w-2xl leading-relaxed">
              Seluruh perubahan yang Anda lakukan langsung tersimpan secara reaktif pada penyimpanan web portal dan dapat diekspor menjadi cadangan JSON kapan saja.
            </p>
          </div>

          <button
            type="button"
            onClick={logoutAdmin}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#F7FBFF] border border-[#E4EEF8] text-rose-600 hover:bg-rose-50 transition-colors self-start md:self-auto"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Sesi Admin</span>
          </button>
        </div>
      </div>

      {/* Success Banner */}
      {successMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { key: 'info', label: 'Identitas Kelas', icon: Settings },
          { key: 'students', label: `Anggota (${state.students.length})`, icon: Users },
          { key: 'schedule', label: `Jadwal (${state.schedules.length})`, icon: CalendarDays },
          { key: 'picket', label: 'Jadwal Piket', icon: Sparkles },
          { key: 'announcements', label: `Pengumuman (${state.announcements.length})`, icon: Megaphone },
          { key: 'backup', label: 'Backup & Restore', icon: Database },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#5A9FE8] text-white shadow-xs'
                  : 'bg-white border border-[#E4EEF8] text-[#71849A] hover:text-[#263B50]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: IDENTITAS KELAS */}
      {activeTab === 'info' && (
        <div className="bg-white rounded-3xl border border-[#E4EEF8] p-6 sm:p-8 shadow-sm shadow-[#B9DCFF]/15 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[#263B50]">Pengaturan Identitas Kelas</h2>
            <p className="text-xs text-[#71849A]">Ubah nama kelas, sekolah, slogan, dan informasi wali kelas</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#263B50] mb-1">Nama Singkat Kelas</label>
              <input
                type="text"
                value={classInfoForm.name}
                onChange={(e) => setClassInfoForm({ ...classInfoForm, name: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F7FBFF] border border-[#E4EEF8] text-[#263B50] focus:outline-none focus:border-[#83BDF5]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#263B50] mb-1">Nama Panjang / Jurusan</label>
              <input
                type="text"
                value={classInfoForm.fullName}
                onChange={(e) => setClassInfoForm({ ...classInfoForm, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F7FBFF] border border-[#E4EEF8] text-[#263B50] focus:outline-none focus:border-[#83BDF5]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#263B50] mb-1">Nama Sekolah</label>
              <input
                type="text"
                value={classInfoForm.schoolName}
                onChange={(e) => setClassInfoForm({ ...classInfoForm, schoolName: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F7FBFF] border border-[#E4EEF8] text-[#263B50] focus:outline-none focus:border-[#83BDF5]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#263B50] mb-1">Tahun Ajaran</label>
              <input
                type="text"
                value={classInfoForm.academicYear}
                onChange={(e) => setClassInfoForm({ ...classInfoForm, academicYear: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F7FBFF] border border-[#E4EEF8] text-[#263B50] focus:outline-none focus:border-[#83BDF5]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#263B50] mb-1">Slogan / Motto Kelas</label>
              <input
                type="text"
                value={classInfoForm.slogan}
                onChange={(e) => setClassInfoForm({ ...classInfoForm, slogan: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F7FBFF] border border-[#E4EEF8] text-[#263B50] focus:outline-none focus:border-[#83BDF5]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#263B50] mb-1">Ruang Kelas</label>
              <input
                type="text"
                value={classInfoForm.roomNumber}
                onChange={(e) => setClassInfoForm({ ...classInfoForm, roomNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F7FBFF] border border-[#E4EEF8] text-[#263B50] focus:outline-none focus:border-[#83BDF5]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#263B50] mb-1">Nama Wali Kelas</label>
              <input
                type="text"
                value={classInfoForm.homeroomTeacher.name}
                onChange={(e) =>
                  setClassInfoForm({
                    ...classInfoForm,
                    homeroomTeacher: { ...classInfoForm.homeroomTeacher, name: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F7FBFF] border border-[#E4EEF8] text-[#263B50] focus:outline-none focus:border-[#83BDF5]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#E4EEF8] flex justify-end">
            <button
              type="button"
              onClick={() => {
                updateClassInfo(classInfoForm);
                triggerSuccess('Informasi kelas berhasil diperbarui!');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#5A9FE8] text-white text-xs font-bold hover:bg-[#468ed9] flex items-center gap-2 shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Identitas</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: KELOLA SISWA */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-3xl border border-[#E4EEF8] p-6 sm:p-8 shadow-sm shadow-[#B9DCFF]/15 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#263B50]">Kelola Data Anggota Kelas</h2>
              <p className="text-xs text-[#71849A]">Tambah, edit nama, NIS, foto, peran, dan kelompok piket</p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddStudentOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5A9FE8] text-white text-xs font-bold hover:bg-[#468ed9] shadow-xs self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Siswa Baru</span>
            </button>
          </div>

          {/* Student Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E4EEF8] text-[#71849A] uppercase tracking-wider">
                  <th className="py-3 px-3">Nama Siswa</th>
                  <th className="py-3 px-3">NIS</th>
                  <th className="py-3 px-3">Gender</th>
                  <th className="py-3 px-3">Jabatan</th>
                  <th className="py-3 px-3">Hari Piket</th>
                  <th className="py-3 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4EEF8]">
                {state.students.map((student) => (
                  <tr key={student.id} className="hover:bg-[#F7FBFF]">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#DCEEFF] flex items-center justify-center font-bold text-[#263B50] overflow-hidden shrink-0">
                          {student.avatarUrl ? (
                            <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
                          ) : (
                            student.name.charAt(0)
                          )}
                        </div>
                        <span className="font-bold text-[#263B50]">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-[#71849A]">{student.nis}</td>
                    <td className="py-3 px-3 text-[#71849A]">{student.gender}</td>
                    <td className="py-3 px-3">
                      {student.role ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCEEFF] text-[#263B50]">
                          {student.role}
                        </span>
                      ) : (
                        <span className="text-[#71849A]">-</span>
                      )}
                    </td>
                    <td className="py-3 px-3">{student.picketDay}</td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingStudent(student)}
                          className="p-1.5 rounded-lg bg-[#F7FBFF] text-[#5A9FE8] hover:bg-[#DCEEFF] transition-colors"
                          title="Edit Siswa"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Hapus data siswa ${student.name}?`)) {
                              deleteStudent(student.id);
                              triggerSuccess(`Siswa ${student.name} berhasil dihapus.`);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-[#F7FBFF] text-rose-600 hover:bg-rose-100 transition-colors"
                          title="Hapus Siswa"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: KELOLA JADWAL PELAJARAN */}
      {activeTab === 'schedule' && (
        <div className="bg-white rounded-3xl border border-[#E4EEF8] p-6 sm:p-8 shadow-sm shadow-[#B9DCFF]/15 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#263B50]">Kelola Jadwal Pelajaran</h2>
              <p className="text-xs text-[#71849A]">Tambah sesi baru, edit waktu, nama guru, atau hapus mapel</p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddScheduleOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5A9FE8] text-white text-xs font-bold hover:bg-[#468ed9] shadow-xs self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Sesi Mapel</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E4EEF8] text-[#71849A] uppercase tracking-wider">
                  <th className="py-3 px-3">Hari</th>
                  <th className="py-3 px-3">Jam Ke</th>
                  <th className="py-3 px-3">Waktu</th>
                  <th className="py-3 px-3">Mata Pelajaran</th>
                  <th className="py-3 px-3">Guru / Pengampu</th>
                  <th className="py-3 px-3">Ruang</th>
                  <th className="py-3 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4EEF8]">
                {state.schedules.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F7FBFF]">
                    <td className="py-3 px-3 font-bold text-[#263B50]">{item.day}</td>
                    <td className="py-3 px-3 text-[#71849A]">Ke-{item.period}</td>
                    <td className="py-3 px-3 font-mono">{item.startTime} - {item.endTime}</td>
                    <td className="py-3 px-3 font-semibold text-[#263B50]">
                      {item.subject} {item.isBreak && <span className="text-amber-600">(Istirahat)</span>}
                    </td>
                    <td className="py-3 px-3 text-[#71849A]">{item.teacher}</td>
                    <td className="py-3 px-3 text-[#71849A]">{item.room || '-'}</td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingSchedule(item)}
                          className="p-1.5 rounded-lg bg-[#F7FBFF] text-[#5A9FE8] hover:bg-[#DCEEFF]"
                          title="Edit Jadwal"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Hapus jadwal ${item.subject} (${item.day})?`)) {
                              deleteSchedule(item.id);
                              triggerSuccess('Jadwal berhasil dihapus.');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-[#F7FBFF] text-rose-600 hover:bg-rose-100"
                          title="Hapus Jadwal"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: KELOLA PIKET & TUGAS KEBERSIHAN */}
      {activeTab === 'picket' && (
        <div className="bg-white rounded-3xl border border-[#E4EEF8] p-6 sm:p-8 shadow-sm shadow-[#B9DCFF]/15 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[#263B50]">Pengaturan Tugas & Regu Piket</h2>
            <p className="text-xs text-[#71849A]">Ubah nama regu harian dan kelola daftar item checklist tugas kebersihan</p>
          </div>

          {/* Group Names Editor */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#71849A]">
              Nama Regu Piket Harian
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {state.picketDays.map((pd) => (
                <div key={pd.day} className="p-3.5 rounded-2xl bg-[#F7FBFF] border border-[#E4EEF8] space-y-2">
                  <span className="text-xs font-bold text-[#263B50] block">Hari {pd.day}</span>
                  <input
                    type="text"
                    defaultValue={pd.groupName}
                    onBlur={(e) => {
                      updatePicketDay(pd.day, { groupName: e.target.value });
                      triggerSuccess(`Nama regu ${pd.day} diperbarui!`);
                    }}
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-[#E4EEF8] text-[#263B50] focus:outline-none focus:border-[#83BDF5]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Task Checklist Management */}
          <div className="space-y-4 pt-4 border-t border-[#E4EEF8]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#71849A]">
              Daftar Tugas Checklist Kebersihan
            </h3>

            {/* Add Task Form */}
            <div className="p-4 rounded-2xl bg-[#F7FBFF] border border-[#E4EEF8] space-y-3">
              <span className="text-xs font-bold text-[#263B50] block">Tambah Butir Tugas Kebersihan Baru</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Judul tugas (cth: Merapikan taplak meja guru)..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E4EEF8] text-[#263B50] focus:outline-none focus:border-[#83BDF5]"
                />
                <input
                  type="text"
                  placeholder="Deskripsi/petunjuk singkat (opsional)..."
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E4EEF8] text-[#263B50] focus:outline-none focus:border-[#83BDF5]"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (newTaskTitle.trim()) {
                    addPicketTask(newTaskTitle, newTaskDesc);
                    setNewTaskTitle('');
                    setNewTaskDesc('');
                    triggerSuccess('Tugas kebersihan baru berhasil ditambahkan!');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-[#5A9FE8] text-white text-xs font-bold hover:bg-[#468ed9]"
              >
                + Tambah Tugas ke Checklist
              </button>
            </div>

            {/* Tasks list */}
            <div className="space-y-2">
              {state.picketTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3.5 rounded-2xl bg-white border border-[#E4EEF8] flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <h4 className="font-bold text-[#263B50]">{task.title}</h4>
                    {task.description && <p className="text-[#71849A] text-[11px]">{task.description}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Hapus tugas "${task.title}"?`)) {
                        deletePicketTask(task.id);
                        triggerSuccess('Tugas berhasil dihapus.');
                      }
                    }}
                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: KELOLA PENGUMUMAN */}
      {activeTab === 'announcements' && (
        <div className="bg-white rounded-3xl border border-[#E4EEF8] p-6 sm:p-8 shadow-sm shadow-[#B9DCFF]/15 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#263B50]">Kelola Pengumuman Kelas</h2>
              <p className="text-xs text-[#71849A]">Buat kabar baru, ubah status disematkan, atau hapus kabar lama</p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddAnnounceOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5A9FE8] text-white text-xs font-bold hover:bg-[#468ed9] shadow-xs self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Pengumuman Baru</span>
            </button>
          </div>

          <div className="space-y-3">
            {state.announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-4 rounded-2xl bg-[#F7FBFF] border border-[#E4EEF8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold px-2 py-0.5 rounded-full bg-white border border-[#E4EEF8] text-[10px]">
                      {ann.category}
                    </span>
                    {ann.isPinned && (
                      <span className="font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px]">
                        Disematkan
                      </span>
                    )}
                    <span className="text-[#71849A] text-[11px]">{ann.date}</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#263B50]">{ann.title}</h4>
                  <p className="text-[#71849A] line-clamp-2">{ann.content}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      updateAnnouncement(ann.id, { isPinned: !ann.isPinned });
                      triggerSuccess('Status sematan pengumuman diperbarui!');
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-colors ${
                      ann.isPinned
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-white border border-[#E4EEF8] text-[#71849A]'
                    }`}
                  >
                    {ann.isPinned ? 'Lepas Sematan' : 'Sematkan'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Hapus pengumuman "${ann.title}"?`)) {
                        deleteAnnouncement(ann.id);
                        triggerSuccess('Pengumuman dihapus.');
                      }
                    }}
                    className="p-2 rounded-xl text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: BACKUP & RESTORE */}
      {activeTab === 'backup' && (
        <div className="bg-white rounded-3xl border border-[#E4EEF8] p-6 sm:p-8 shadow-sm shadow-[#B9DCFF]/15 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[#263B50]">Cadangan Data & Sinkronisasi (Backup / Restore)</h2>
            <p className="text-xs text-[#71849A]">
              Ekspor seluruh data kelas (siswa, struktur, jadwal, pengumuman) ke format file JSON atau pulihkan data dari teks JSON.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Export */}
            <div className="p-5 rounded-2xl bg-[#F7FBFF] border border-[#E4EEF8] space-y-3">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-[#5A9FE8]" />
                <h3 className="font-bold text-sm text-[#263B50]">Ekspor Data JSON</h3>
              </div>
              <p className="text-xs text-[#71849A] leading-relaxed">
                Unduh salinan lengkap data website kelas Anda agar dapat disimpan sebagai arsip atau dipindahkan ke komputer lain.
              </p>
              <button
                type="button"
                onClick={() => {
                  const dataStr = exportDataToJson();
                  const blob = new Blob([dataStr], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `classhub-backup-${Date.now()}.json`;
                  a.click();
                  triggerSuccess('File backup JSON berhasil diunduh!');
                }}
                className="w-full py-2.5 rounded-xl bg-[#5A9FE8] text-white text-xs font-bold hover:bg-[#468ed9] flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Unduh File Backup JSON</span>
              </button>
            </div>

            {/* Reset to Initial */}
            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-3">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-sm text-rose-900">Reset ke Data Awal</h3>
              </div>
              <p className="text-xs text-rose-750 leading-relaxed">
                Kembalikan seluruh data kelas ke format standar awal contoh X DKV 1. Seluruh perubahan kustom akan dibersihkan.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (confirm('PERINGATAN: Apakah Anda yakin ingin mereset seluruh data ke data bawaan awal? Tindakan ini tidak dapat dibatalkan.')) {
                    resetToDefaultData();
                    triggerSuccess('Data berhasil direset ke setelan awal!');
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset ke Data Default</span>
              </button>
            </div>
          </div>

          {/* Import JSON */}
          <div className="pt-4 border-t border-[#E4EEF8] space-y-3">
            <h3 className="font-bold text-sm text-[#263B50]">Impor Data dari JSON</h3>
            <textarea
              placeholder="Tempelkan (paste) isi JSON cadangan di sini..."
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              rows={4}
              className="w-full p-3 text-xs rounded-xl bg-[#F7FBFF] border border-[#E4EEF8] font-mono text-[#263B50] focus:outline-none focus:border-[#83BDF5]"
            />
            <button
              type="button"
              onClick={() => {
                if (importDataFromJson(jsonInput)) {
                  setJsonInput('');
                  triggerSuccess('Data JSON berhasil diimpor!');
                } else {
                  alert('Format JSON tidak valid atau struktur tidak cocok.');
                }
              }}
              className="px-4 py-2 rounded-xl bg-[#5A9FE8] text-white text-xs font-bold hover:bg-[#468ed9] flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Impor dan Terapkan Data</span>
            </button>
          </div>
        </div>
      )}

      {/* MODAL: ADD STUDENT */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-[#E4EEF8] max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#263B50]">Tambah Siswa Baru</h3>
              <button
                type="button"
                onClick={() => setIsAddStudentOpen(false)}
                className="p-1.5 rounded-lg text-[#71849A] hover:bg-[#F7FBFF]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="col-span-2">
                <label className="block font-bold text-[#263B50] mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Nama siswa..."
                  value={newStudentData.name}
                  onChange={(e) => setNewStudentData({ ...newStudentData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#263B50] mb-1">NIS</label>
                <input
                  type="text"
                  placeholder="2401xx"
                  value={newStudentData.nis}
                  onChange={(e) => setNewStudentData({ ...newStudentData, nis: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#263B50] mb-1">Jenis Kelamin</label>
                <select
                  value={newStudentData.gender}
                  onChange={(e) => setNewStudentData({ ...newStudentData, gender: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                >
                  <option value="L">Laki-laki (L)</option>
                  <option value="P">Perempuan (P)</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-[#263B50] mb-1">Jabatan Kelas (Opsional)</label>
                <input
                  type="text"
                  placeholder="Cth: Anggota, Seksi..."
                  value={newStudentData.role || ''}
                  onChange={(e) => setNewStudentData({ ...newStudentData, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#263B50] mb-1">Hari Piket</label>
                <select
                  value={newStudentData.picketDay}
                  onChange={(e) => setNewStudentData({ ...newStudentData, picketDay: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                >
                  <option value="Senin">Senin</option>
                  <option value="Selasa">Selasa</option>
                  <option value="Rabu">Rabu</option>
                  <option value="Kamis">Kamis</option>
                  <option value="Jumat">Jumat</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block font-bold text-[#263B50] mb-1">URL Foto Profil (Opsional)</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={newStudentData.avatarUrl || ''}
                  onChange={(e) => setNewStudentData({ ...newStudentData, avatarUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddStudentOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#71849A] hover:bg-[#F7FBFF]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  if (newStudentData.name && newStudentData.nis) {
                    addStudent(newStudentData);
                    setIsAddStudentOpen(false);
                    setNewStudentData({
                      nis: '',
                      name: '',
                      gender: 'L',
                      role: '',
                      picketDay: 'Senin',
                      avatarUrl: '',
                      quote: '',
                      instagram: '',
                    });
                    triggerSuccess('Siswa berhasil ditambahkan!');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-[#5A9FE8] text-white text-xs font-bold hover:bg-[#468ed9]"
              >
                Simpan Siswa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT STUDENT */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-[#E4EEF8] max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#263B50]">Edit Data Siswa</h3>
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                className="p-1.5 rounded-lg text-[#71849A] hover:bg-[#F7FBFF]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="col-span-2">
                <label className="block font-bold text-[#263B50] mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#263B50] mb-1">NIS</label>
                <input
                  type="text"
                  value={editingStudent.nis}
                  onChange={(e) => setEditingStudent({ ...editingStudent, nis: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#263B50] mb-1">Jenis Kelamin</label>
                <select
                  value={editingStudent.gender}
                  onChange={(e) => setEditingStudent({ ...editingStudent, gender: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                >
                  <option value="L">Laki-laki (L)</option>
                  <option value="P">Perempuan (P)</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-[#263B50] mb-1">Jabatan</label>
                <input
                  type="text"
                  value={editingStudent.role || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#263B50] mb-1">Hari Piket</label>
                <select
                  value={editingStudent.picketDay}
                  onChange={(e) => setEditingStudent({ ...editingStudent, picketDay: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                >
                  <option value="Senin">Senin</option>
                  <option value="Selasa">Selasa</option>
                  <option value="Rabu">Rabu</option>
                  <option value="Kamis">Kamis</option>
                  <option value="Jumat">Jumat</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block font-bold text-[#263B50] mb-1">Kutipan / Motto</label>
                <input
                  type="text"
                  value={editingStudent.quote || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#71849A] hover:bg-[#F7FBFF]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  updateStudent(editingStudent.id, editingStudent);
                  setEditingStudent(null);
                  triggerSuccess('Perubahan siswa berhasil disimpan!');
                }}
                className="px-4 py-2 rounded-xl bg-[#5A9FE8] text-white text-xs font-bold hover:bg-[#468ed9]"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD SCHEDULE */}
      {isAddScheduleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-[#E4EEF8] max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#263B50]">Tambah Sesi Pelajaran</h3>
              <button
                type="button"
                onClick={() => setIsAddScheduleOpen(false)}
                className="p-1.5 rounded-lg text-[#71849A] hover:bg-[#F7FBFF]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-[#263B50] mb-1">Hari</label>
                <select
                  value={newScheduleData.day}
                  onChange={(e) => setNewScheduleData({ ...newScheduleData, day: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                >
                  <option value="Senin">Senin</option>
                  <option value="Selasa">Selasa</option>
                  <option value="Rabu">Rabu</option>
                  <option value="Kamis">Kamis</option>
                  <option value="Jumat">Jumat</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-[#263B50] mb-1">Jam Ke-</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={newScheduleData.period}
                  onChange={(e) => setNewScheduleData({ ...newScheduleData, period: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#263B50] mb-1">Mulai (HH:MM)</label>
                <input
                  type="text"
                  placeholder="07:00"
                  value={newScheduleData.startTime}
                  onChange={(e) => setNewScheduleData({ ...newScheduleData, startTime: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#263B50] mb-1">Selesai (HH:MM)</label>
                <input
                  type="text"
                  placeholder="08:30"
                  value={newScheduleData.endTime}
                  onChange={(e) => setNewScheduleData({ ...newScheduleData, endTime: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                />
              </div>
              <div className="col-span-2">
                <label className="block font-bold text-[#263B50] mb-1">Mata Pelajaran</label>
                <input
                  type="text"
                  placeholder="Nama mata pelajaran..."
                  value={newScheduleData.subject}
                  onChange={(e) => setNewScheduleData({ ...newScheduleData, subject: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#263B50] mb-1">Guru Pengampu</label>
                <input
                  type="text"
                  placeholder="Nama guru..."
                  value={newScheduleData.teacher}
                  onChange={(e) => setNewScheduleData({ ...newScheduleData, teacher: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#263B50] mb-1">Ruangan</label>
                <input
                  type="text"
                  placeholder="Lab DKV / Ruang 101..."
                  value={newScheduleData.room || ''}
                  onChange={(e) => setNewScheduleData({ ...newScheduleData, room: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddScheduleOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#71849A] hover:bg-[#F7FBFF]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  if (newScheduleData.subject) {
                    addSchedule(newScheduleData);
                    setIsAddScheduleOpen(false);
                    triggerSuccess('Jadwal pelajaran berhasil ditambahkan!');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-[#5A9FE8] text-white text-xs font-bold hover:bg-[#468ed9]"
              >
                Simpan Jadwal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD ANNOUNCEMENT */}
      {isAddAnnounceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-[#E4EEF8] max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#263B50]">Buat Pengumuman Baru</h3>
              <button
                type="button"
                onClick={() => setIsAddAnnounceOpen(false)}
                className="p-1.5 rounded-lg text-[#71849A] hover:bg-[#F7FBFF]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#263B50] mb-1">Judul Pengumuman</label>
                <input
                  type="text"
                  placeholder="Judul info atau agenda..."
                  value={newAnnounceData.title}
                  onChange={(e) => setNewAnnounceData({ ...newAnnounceData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#263B50] mb-1">Kategori</label>
                  <select
                    value={newAnnounceData.category}
                    onChange={(e) => setNewAnnounceData({ ...newAnnounceData, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                  >
                    <option value="Info Umum">Info Umum</option>
                    <option value="Penting">Penting</option>
                    <option value="Tugas">Tugas</option>
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Ujian">Ujian</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#263B50] mb-1">Pengirim / Penulis</label>
                  <input
                    type="text"
                    value={newAnnounceData.author}
                    onChange={(e) => setNewAnnounceData({ ...newAnnounceData, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-[#263B50] mb-1">Batas Waktu / Tenggat (Opsional)</label>
                <input
                  type="text"
                  placeholder="Cth: 15 Oktober 2026"
                  value={newAnnounceData.dueDate || ''}
                  onChange={(e) => setNewAnnounceData({ ...newAnnounceData, dueDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#263B50] mb-1">Isi Pesan Lengkap</label>
                <textarea
                  rows={4}
                  placeholder="Tuliskan isi pengumuman secara rinci..."
                  value={newAnnounceData.content}
                  onChange={(e) => setNewAnnounceData({ ...newAnnounceData, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8]"
                />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="pinCheck"
                  checked={newAnnounceData.isPinned}
                  onChange={(e) => setNewAnnounceData({ ...newAnnounceData, isPinned: e.target.checked })}
                  className="rounded border-[#B9DCFF]"
                />
                <label htmlFor="pinCheck" className="font-semibold text-[#263B50]">
                  Sematkan di posisi teratas (Pin to top)
                </label>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddAnnounceOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#71849A] hover:bg-[#F7FBFF]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  if (newAnnounceData.title && newAnnounceData.content) {
                    addAnnouncement(newAnnounceData);
                    setIsAddAnnounceOpen(false);
                    setNewAnnounceData({
                      title: '',
                      content: '',
                      category: 'Info Umum',
                      author: 'Pengurus Kelas',
                      isPinned: false,
                      dueDate: '',
                    });
                    triggerSuccess('Pengumuman baru dipublikasikan!');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-[#5A9FE8] text-white text-xs font-bold hover:bg-[#468ed9]"
              >
                Publikasikan Pengumuman
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
