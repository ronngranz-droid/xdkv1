'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Sparkles,
  Crown,
  Shield,
  BookOpen,
  DollarSign,
  UtensilsCrossed,
  Heart,
  X,
  Camera,
  Star,
  Compass,
  Edit3,
  Plus,
  Trash2,
  Check,
  Smile,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';
import { Student } from '@/types';
import {
  PastelCloud,
  PastelStar,
  PastelClover,
  PastelWashiTape,
  PastelSparkle,
  PastelFlower,
} from '@/components/common/DecorativeElements';

// Pastel color palette for student avatar cards
const pastelGradients = [
  'from-[#DCEEFF] to-[#B9DCFF]', // Soft Sky Blue
  'from-[#FFE4E6] to-[#FECDD3]', // Pastel Rose
  'from-[#FEF3C7] to-[#FDE68A]', // Butter Yellow
  'from-[#DCFCE7] to-[#BBF7D0]', // Mint Green
  'from-[#EDE9FE] to-[#DDD6FE]', // Lavender
  'from-[#FFEDD5] to-[#FED7AA]', // Peach
  'from-[#CFFAFE] to-[#A5F3FC]', // Aqua
];

export default function AnggotaPage() {
  const { state, updateStudent, addStudent, deleteStudent } = useClassData();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'pengurus' | 'mbg' | 'anggota'>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Quick edit & add student modal state
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const [newStudentForm, setNewStudentForm] = useState<Omit<Student, 'id'>>({
    name: '',
    nis: '',
    gender: 'L',
    role: '',
    picketDay: 'Senin',
    quote: '',
    instagram: '',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Official roles mapping from the authentic posters
  const getStudentRoleInfo = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('zalqi') && !n.includes('ahmad')) {
      return { role: 'Ketua Kelas & MBG', icon: Crown, badgeColor: 'bg-amber-100 text-amber-800 border-amber-300' };
    }
    if (n.includes('zalqi') || n.includes('ahmad zalqi')) {
      return { role: 'Ketua Kelas', icon: Crown, badgeColor: 'bg-amber-100 text-amber-800 border-amber-300' };
    }
    if (n.includes('sri') || n.includes('mulyaningtyas')) {
      return { role: 'Wakil Ketua', icon: Shield, badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300' };
    }
    if (n.includes('dea')) {
      return { role: 'Sekretaris 1', icon: BookOpen, badgeColor: 'bg-pink-100 text-pink-800 border-pink-300' };
    }
    if (n.includes('kesya')) {
      return { role: 'Sekretaris 2', icon: BookOpen, badgeColor: 'bg-pink-100 text-pink-800 border-pink-300' };
    }
    if (n.includes('adel')) {
      return { role: 'Bendahara 1', icon: DollarSign, badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    }
    if (n.includes('selly')) {
      return { role: 'Bendahara 2', icon: DollarSign, badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    }
    if (n.includes('riza') || n.includes('ilham') || n.includes('andre') || n.includes('akbar')) {
      return { role: 'Tim Pengambil MBG', icon: UtensilsCrossed, badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300' };
    }
    return { role: 'Keluarga X DKV 1', icon: Star, badgeColor: 'bg-[#DCEEFF] text-[#263B50] border-[#B9DCFF]' };
  };

  const filteredStudents = useMemo(() => {
    return state.students.filter((student) => {
      const q = searchQuery.toLowerCase().trim();
      const roleInfo = getStudentRoleInfo(student.name);

      const matchesSearch =
        !q ||
        student.name.toLowerCase().includes(q) ||
        student.nis.toLowerCase().includes(q) ||
        roleInfo.role.toLowerCase().includes(q);

      let matchesCategory = true;
      if (activeCategory === 'pengurus') {
        matchesCategory =
          roleInfo.role.includes('Ketua') ||
          roleInfo.role.includes('Sekretaris') ||
          roleInfo.role.includes('Bendahara');
      } else if (activeCategory === 'mbg') {
        matchesCategory = roleInfo.role.includes('MBG');
      } else if (activeCategory === 'anggota') {
        matchesCategory = roleInfo.role === 'Keluarga X DKV 1';
      }

      return matchesSearch && matchesCategory;
    });
  }, [state.students, searchQuery, activeCategory]);

  return (
    <div className="space-y-7 animate-in fade-in duration-200">
      {/* 1. CUTE PASTEL HEADER BANNER */}
      <div className="relative overflow-hidden rounded-3xl sm:rounded-[36px] bg-gradient-to-b from-[#EBF6FF] via-[#F4FAFF] to-[#E5F3FD] border-2 border-[#B9DCFF] p-6 sm:p-9 shadow-md text-center space-y-4">
        {/* Floating cute elements */}
        <PastelCloud className="absolute -top-8 -left-8 w-48 opacity-40 pointer-events-none" />
        <PastelCloud className="absolute -top-6 -right-10 w-52 opacity-40 pointer-events-none" />
        <PastelClover className="absolute top-6 left-8 w-7 h-7 drop-shadow-xs animate-bounce" />
        <PastelStar className="absolute top-8 right-12 w-6 h-6 text-yellow-400 drop-shadow-xs animate-pulse" />
        <PastelFlower className="absolute bottom-4 left-14 w-6 h-6 text-pink-300" />
        <PastelSparkle className="absolute bottom-6 right-16 w-5 h-5 text-sky-400" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#B9DCFF] text-xs font-bold text-[#263B50] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#5A9FE8]" />
            <span>Keluarga Besar {state.classInfo.name}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{state.students.length} Siswa Kompak</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[#263B50] tracking-tight">
            Warga Kelas {state.classInfo.name}
          </h1>

          <p className="text-xs sm:text-sm text-[#71849A] leading-relaxed max-w-xl mx-auto">
            Mengenal lebih dekat 35 teman sekelas. Kompak bersama, berkarya bersama, dan saling mendukung setiap hari!
          </p>

          {/* Quick Action Button */}
          <div className="pt-2 flex items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#5A9FE8] hover:bg-[#468ed9] text-white text-xs font-black shadow-md shadow-[#5A9FE8]/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Warga Baru</span>
            </button>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white hover:bg-[#F7FBFF] border border-[#B9DCFF] text-[#263B50] text-xs font-extrabold shadow-2xs transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#5A9FE8]" />
              <span>Panel Admin Lengkap</span>
            </Link>
          </div>
        </div>

        {/* 2. CUTE SEARCH & CATEGORY FILTER */}
        <div className="relative z-10 max-w-xl mx-auto space-y-3 pt-2">
          {/* Cute Search Input */}
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#5A9FE8]" />
            <input
              type="text"
              placeholder="Cari nama teman sekelas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border-2 border-[#B9DCFF] text-xs sm:text-sm text-[#263B50] placeholder-[#71849A] shadow-xs focus:outline-none focus:border-[#5A9FE8] focus:ring-2 focus:ring-[#DCEEFF] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#71849A] hover:text-[#263B50]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Cute Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {[
              { id: 'all', label: `Semua (${state.students.length})` },
              { id: 'pengurus', label: 'Pengurus Kelas' },
              { id: 'mbg', label: 'Tim MBG' },
              { id: 'anggota', label: 'Warga Kelas' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === tab.id
                    ? 'bg-[#5A9FE8] text-white shadow-xs scale-105'
                    : 'bg-white/80 text-[#71849A] hover:text-[#263B50] border border-[#E4EEF8]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#263B50] text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 3. CUTE STUDENT CARDS GRID */}
      {filteredStudents.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E4EEF8] p-12 text-center text-xs text-[#71849A] space-y-2">
          <Users className="w-8 h-8 text-[#5A9FE8] mx-auto opacity-50" />
          <p className="font-bold text-sm text-[#263B50]">Nama tidak ditemukan</p>
          <p>Coba gunakan kata kunci pencarian yang lain.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {filteredStudents.map((student, idx) => {
            const roleInfo = getStudentRoleInfo(student.name);
            const RoleIcon = roleInfo.icon;
            const gradientBg = pastelGradients[idx % pastelGradients.length];

            return (
              <div
                key={student.id}
                className="group bg-white rounded-3xl border-2 border-[#E4EEF8] hover:border-[#83BDF5] p-3.5 sm:p-4 flex flex-col justify-between items-center text-center shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Cute Washi Tape on Top Center */}
                <PastelWashiTape className="absolute -top-2 left-1/2 -translate-x-1/2 opacity-70 group-hover:opacity-100 transition-opacity" />

                {/* Edit Button Floating Quick Action */}
                <button
                  type="button"
                  title="Edit Data Warga"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingStudent(student);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-xl bg-white/90 border border-[#DCEEFF] text-[#5A9FE8] hover:bg-[#DCEEFF] transition-colors shadow-2xs z-10 opacity-70 group-hover:opacity-100"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>

                <div
                  onClick={() => setSelectedStudent(student)}
                  className="w-full flex flex-col items-center pt-2 cursor-pointer"
                >
                  {/* Number Tag */}
                  <div className="w-full flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#F7FBFF] border border-[#E4EEF8] text-[#71849A]">
                      #{student.nis}
                    </span>
                    <span className="text-[10px] text-[#83BDF5] font-bold">DKV</span>
                  </div>

                  {/* Cute Pastel Avatar Circle */}
                  <div
                    className={`w-16 h-16 sm:w-18 sm:h-18 rounded-3xl bg-gradient-to-tr ${gradientBg} border-2 border-white shadow-xs flex items-center justify-center text-xl sm:text-2xl font-black text-[#263B50] group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300 mb-3 select-none`}
                  >
                    {student.name.charAt(0)}
                  </div>

                  {/* Student Name */}
                  <h3 className="font-extrabold text-sm sm:text-base text-[#263B50] group-hover:text-[#5A9FE8] transition-colors truncate w-full mb-1">
                    {student.name}
                  </h3>

                  {/* Role Badge */}
                  <div
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold border ${roleInfo.badgeColor} max-w-full truncate shadow-2xs`}
                  >
                    <RoleIcon className="w-3 h-3 shrink-0" />
                    <span className="truncate">{roleInfo.role}</span>
                  </div>
                </div>

                {/* Card Footer Cute Detail with Quick Edit */}
                <div className="w-full pt-2.5 mt-2.5 border-t border-[#F0F7FD] flex items-center justify-between gap-1 text-[10px] font-semibold text-[#71849A]">
                  <button
                    type="button"
                    onClick={() => setSelectedStudent(student)}
                    className="hover:text-[#5A9FE8] transition-colors"
                  >
                    Profil
                  </button>
                  <span className="text-slate-300">•</span>
                  <button
                    type="button"
                    onClick={() => setEditingStudent(student)}
                    className="text-[#5A9FE8] font-bold hover:underline flex items-center gap-0.5"
                  >
                    <Edit3 className="w-2.5 h-2.5" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. CUTE POP-UP BIODATA CARD MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative max-w-sm w-full bg-white rounded-[32px] border-2 border-[#B9DCFF] p-6 shadow-2xl flex flex-col items-center text-center space-y-4">
            {/* Top Washi Tape */}
            <PastelWashiTape className="absolute -top-2 left-1/2 -translate-x-1/2 w-24 h-5" />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#F7FBFF] border border-[#E4EEF8] text-[#71849A] hover:bg-rose-50 hover:text-rose-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Big Avatar */}
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#DCEEFF] to-[#B9DCFF] border-4 border-white shadow-md flex items-center justify-center text-3xl font-black text-[#263B50] mt-2">
              {selectedStudent.name.charAt(0)}
            </div>

            {/* Identity */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold px-3 py-0.5 rounded-full bg-[#F7FBFF] border border-[#E4EEF8] text-[#71849A]">
                No. Presensi #{selectedStudent.nis}
              </span>
              <h3 className="text-xl font-black text-[#263B50]">{selectedStudent.name}</h3>
              <p className="text-xs text-[#5A9FE8] font-bold">
                {getStudentRoleInfo(selectedStudent.name).role}
              </p>
            </div>

            {/* Info Badges */}
            <div className="w-full bg-[#F7FBFF] rounded-2xl p-3.5 border border-[#E4EEF8] text-xs text-[#71849A] space-y-1.5">
              <div className="flex justify-between">
                <span>Kelas:</span>
                <strong className="text-[#263B50]">{state.classInfo.name}</strong>
              </div>
              <div className="flex justify-between">
                <span>Hari Piket:</span>
                <strong className="text-[#263B50]">{selectedStudent.picketDay || 'Belum Ada'}</strong>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-emerald-600 font-bold">Siswa Aktif</span>
              </div>
              {selectedStudent.quote && (
                <div className="pt-1 text-left border-t border-[#E4EEF8]">
                  <span className="block text-[10px] text-[#71849A]">Motto / Pesan:</span>
                  <p className="text-xs italic text-[#263B50]">&ldquo;{selectedStudent.quote}&rdquo;</p>
                </div>
              )}
            </div>

            <div className="w-full flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const target = selectedStudent;
                  setSelectedStudent(null);
                  setEditingStudent(target);
                }}
                className="flex-1 py-2.5 rounded-2xl bg-[#DEF0FC] text-[#263B50] border border-[#BEE0F9] text-xs font-bold hover:bg-[#8BB4E7] hover:text-white transition-all flex items-center justify-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Warga Ini</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="py-2.5 px-4 rounded-2xl bg-slate-100 text-[#71849A] text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. MODAL EDIT SISWA */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative max-w-md w-full bg-white rounded-[32px] border-2 border-[#B9DCFF] p-6 shadow-2xl space-y-4">
            <PastelWashiTape className="absolute -top-2 left-1/2 -translate-x-1/2 w-24 h-5" />

            <div className="flex items-center justify-between pb-2 border-b border-[#E4EEF8]">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#5A9FE8]" />
                <h3 className="font-black text-base text-[#263B50]">Edit Data Warga Kelas</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                className="p-1 rounded-lg text-[#71849A] hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateStudent(editingStudent.id, editingStudent);
                showToast(`Data ${editingStudent.name} berhasil diperbarui!`);
                setEditingStudent(null);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-[#263B50] mb-1">Nama Lengkap / Panggilan *</label>
                <input
                  type="text"
                  required
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] focus:bg-white text-xs font-semibold text-[#263B50] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#263B50] mb-1">Nomor Presensi / NIS</label>
                  <input
                    type="text"
                    value={editingStudent.nis}
                    onChange={(e) => setEditingStudent({ ...editingStudent, nis: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] focus:bg-white text-xs text-[#263B50] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#263B50] mb-1">Hari Piket</label>
                  <select
                    value={editingStudent.picketDay || 'Senin'}
                    onChange={(e) => setEditingStudent({ ...editingStudent, picketDay: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] text-xs text-[#263B50] outline-none"
                  >
                    <option value="Senin">Senin</option>
                    <option value="Selasa">Selasa</option>
                    <option value="Rabu">Rabu</option>
                    <option value="Kamis">Kamis</option>
                    <option value="Jumat">Jumat</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#263B50] mb-1">Jabatan / Peran di Kelas</label>
                <input
                  type="text"
                  placeholder="Contoh: Sekretaris 1, Bendahara, Tim MBG..."
                  value={editingStudent.role || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, role: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] text-xs text-[#263B50] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#263B50] mb-1">Motto / Kutipan Pribadi</label>
                <input
                  type="text"
                  placeholder="Kata-kata penyemangat..."
                  value={editingStudent.quote || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, quote: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] text-xs text-[#263B50] outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-[#E4EEF8]">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Yakin ingin menghapus ${editingStudent.name} dari daftar warga?`)) {
                      deleteStudent(editingStudent.id);
                      showToast(`${editingStudent.name} berhasil dihapus.`);
                      setEditingStudent(null);
                    }
                  }}
                  className="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingStudent(null)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#71849A] hover:bg-slate-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#5A9FE8] hover:bg-[#468ed9] text-white text-xs font-black shadow-md shadow-[#5A9FE8]/30 transition-all flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. MODAL TAMBAH WARGA BARU */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative max-w-md w-full bg-white rounded-[32px] border-2 border-[#B9DCFF] p-6 shadow-2xl space-y-4">
            <PastelWashiTape className="absolute -top-2 left-1/2 -translate-x-1/2 w-24 h-5" />

            <div className="flex items-center justify-between pb-2 border-b border-[#E4EEF8]">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#5A9FE8]" />
                <h3 className="font-black text-base text-[#263B50]">Tambah Warga Kelas Baru</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-[#71849A] hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newStudentForm.name.trim()) return;
                const pad = String(state.students.length + 1).padStart(2, '0');
                addStudent({
                  ...newStudentForm,
                  nis: newStudentForm.nis.trim() || pad,
                });
                showToast(`Warga baru ${newStudentForm.name} berhasil ditambahkan!`);
                setIsAddModalOpen(false);
                setNewStudentForm({
                  name: '',
                  nis: '',
                  gender: 'L',
                  role: '',
                  picketDay: 'Senin',
                  quote: '',
                  instagram: '',
                });
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-[#263B50] mb-1">Nama Siswa *</label>
                <input
                  type="text"
                  required
                  placeholder="Ketik nama lengkap atau panggilan..."
                  value={newStudentForm.name}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] focus:bg-white text-xs font-semibold text-[#263B50] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#263B50] mb-1">Nomor Presensi / NIS</label>
                  <input
                    type="text"
                    placeholder="Contoh: 36"
                    value={newStudentForm.nis}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, nis: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] text-xs text-[#263B50] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#263B50] mb-1">Hari Piket</label>
                  <select
                    value={newStudentForm.picketDay}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, picketDay: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] text-xs text-[#263B50] outline-none"
                  >
                    <option value="Senin">Senin</option>
                    <option value="Selasa">Selasa</option>
                    <option value="Rabu">Rabu</option>
                    <option value="Kamis">Kamis</option>
                    <option value="Jumat">Jumat</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#263B50] mb-1">Jabatan (Opsional)</label>
                <input
                  type="text"
                  placeholder="Kosongkan jika anggota biasa..."
                  value={newStudentForm.role || ''}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, role: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] text-xs text-[#263B50] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#263B50] mb-1">Motto / Kutipan (Opsional)</label>
                <input
                  type="text"
                  placeholder="Kutipan semangat..."
                  value={newStudentForm.quote || ''}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, quote: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] text-xs text-[#263B50] outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#E4EEF8]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#71849A] hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#5A9FE8] hover:bg-[#468ed9] text-white text-xs font-black shadow-md shadow-[#5A9FE8]/30 transition-all flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambahkan Warga</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
