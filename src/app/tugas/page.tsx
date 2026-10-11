'use client';

import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Copy,
  Check,
  Search,
  Users,
  User,
  Sparkles,
  ExternalLink,
  Flame,
  FileText,
  Filter,
  CheckCircle,
  ChevronRight,
  FolderGit2,
  Megaphone,
  BellRing,
  Info,
} from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';
import { ClassAssignment } from '@/types';
import { PastelCloud, PastelStar, PastelClover } from '@/components/common/DecorativeElements';

export default function TugasPage() {
  const { state, addAssignment, deleteAssignment, toggleAssignmentCompleted } = useClassData();

  // Filter States
  const [activeTab, setActiveTab] = useState<'semua' | 'tugas' | 'pemberitahuan' | 'mendesak' | 'pending' | 'selesai'>('semua');
  const [selectedSubject, setSelectedSubject] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copiedWa, setCopiedWa] = useState(false);
  const [todayTime, setTodayTime] = useState<number>(0);

  React.useEffect(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    setTodayTime(now.getTime());
  }, []);

  // New Assignment / Announcement Form State
  const [formData, setFormData] = useState({
    category: 'Tugas' as 'Tugas' | 'Pemberitahuan',
    title: '',
    subject: 'PDKV',
    customSubject: '',
    teacher: 'Pak Derri',
    announcedBy: 'Dea Anggia (Sekretaris 1)',
    deadline: '',
    deadlineTime: '23:59',
    description: '',
    type: 'Individu' as 'Individu' | 'Kelompok',
    submissionType: 'Google Classroom' as ClassAssignment['submissionType'],
    priority: 'Sedang' as 'Tinggi' | 'Sedang' | 'Biasa',
  });

  const subjectsList = [
    'PDKV',
    'Fotografi',
    'Informatika',
    'Matematika',
    'B Inggris',
    'B Indo',
    'IPAS',
    'PKN',
    'Sejarah',
    'Seni Budaya',
    'Lainnya',
  ];

  // Helper to calculate days remaining
  const getDeadlineStatus = (deadlineStr: string) => {
    if (!todayTime) {
      return { label: 'Tenggat', days: 99, color: 'bg-[#DEF0FC] text-[#263B50] border-[#BEE0F9]', isUrgent: false };
    }

    const due = new Date(deadlineStr);
    due.setHours(0, 0, 0, 0);

    const diffTime = due.getTime() - todayTime;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { label: 'Terlewat', days: diffDays, color: 'bg-rose-100 text-rose-700 border-rose-200', isUrgent: false };
    }
    if (diffDays === 0) {
      return { label: 'Hari Ini!', days: 0, color: 'bg-rose-500 text-white border-rose-600 animate-pulse', isUrgent: true };
    }
    if (diffDays === 1) {
      return { label: 'Besok!', days: 1, color: 'bg-amber-500 text-white border-amber-600 animate-pulse', isUrgent: true };
    }
    if (diffDays <= 3) {
      return { label: `${diffDays} Hari Lagi`, days: diffDays, color: 'bg-amber-100 text-amber-800 border-amber-200', isUrgent: true };
    }
    return { label: `${diffDays} Hari Lagi`, days: diffDays, color: 'bg-[#DEF0FC] text-[#263B50] border-[#BEE0F9]', isUrgent: false };
  };

  // Filtered Assignments
  const assignments = state.assignments || [];

  const filteredAssignments = useMemo(() => {
    return assignments.filter((asg) => {
      // Tab filter
      const status = getDeadlineStatus(asg.deadline);
      const isNotice = asg.category === 'Pemberitahuan';
      const isTask = asg.category !== 'Pemberitahuan';

      if (activeTab === 'tugas') {
        if (!isTask) return false;
      } else if (activeTab === 'pemberitahuan') {
        if (!isNotice) return false;
      } else if (activeTab === 'mendesak') {
        if (asg.isCompleted || (!status.isUrgent && status.days > 2)) return false;
      } else if (activeTab === 'pending') {
        if (asg.isCompleted) return false;
      } else if (activeTab === 'selesai') {
        if (!asg.isCompleted) return false;
      }

      // Subject filter
      if (selectedSubject !== 'Semua' && asg.subject !== selectedSubject) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = asg.title.toLowerCase().includes(q);
        const matchSubject = asg.subject.toLowerCase().includes(q);
        const matchTeacher = asg.teacher?.toLowerCase().includes(q);
        const matchDesc = asg.description.toLowerCase().includes(q);
        if (!matchTitle && !matchSubject && !matchTeacher && !matchDesc) return false;
      }

      return true;
    });
  }, [assignments, activeTab, selectedSubject, searchQuery]);

  // Statistics
  const totalCount = assignments.length;
  const taskCount = assignments.filter((a) => a.category !== 'Pemberitahuan').length;
  const noticeCount = assignments.filter((a) => a.category === 'Pemberitahuan').length;
  const pendingCount = assignments.filter((a) => !a.isCompleted).length;
  const completedCount = assignments.filter((a) => a.isCompleted).length;
  const urgentCount = assignments.filter((a) => !a.isCompleted && getDeadlineStatus(a.deadline).isUrgent).length;

  // Handle Form Submit
  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.deadline) return;

    const actualSubject = formData.category === 'Pemberitahuan'
      ? (formData.subject === 'Lainnya' && formData.customSubject.trim() ? formData.customSubject.trim() : formData.subject || 'Pemberitahuan Kelas')
      : (formData.subject === 'Lainnya' && formData.customSubject.trim() ? formData.customSubject.trim() : formData.subject);

    addAssignment({
      category: formData.category,
      title: formData.title.trim(),
      subject: actualSubject,
      teacher: formData.teacher.trim(),
      announcedBy: formData.announcedBy || 'Dea Anggia (Sekretaris 1)',
      deadline: formData.deadline,
      deadlineTime: formData.deadlineTime || '23:59',
      description: formData.description.trim(),
      type: formData.type,
      submissionType: formData.category === 'Pemberitahuan' ? 'Tidak Ada (Info)' : formData.submissionType,
      priority: formData.priority,
      isCompleted: false,
    });

    setIsAddModalOpen(false);
    setFormData({
      category: 'Tugas',
      title: '',
      subject: 'PDKV',
      customSubject: '',
      teacher: 'Pak Derri',
      announcedBy: 'Dea Anggia (Sekretaris 1)',
      deadline: '',
      deadlineTime: '23:59',
      description: '',
      type: 'Individu',
      submissionType: 'Google Classroom',
      priority: 'Sedang',
    });
  };

  // Copy Rekap to WhatsApp
  const handleCopyWhatsAppFormat = () => {
    const uncompleted = assignments.filter((a) => !a.isCompleted);
    let text = `📢 *REKAP TUGAS & PEMBERITAHUAN KELAS ${state.classInfo.name}*\n`;
    text += `Diperbarui: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}\n`;
    text += `------------------------------------\n\n`;

    if (uncompleted.length === 0) {
      text += `🎉 Alhamdulillah saat ini belum ada tugas atau pengumuman pending! Nikmati waktu santai.\n`;
    } else {
      uncompleted.forEach((a, idx) => {
        const stat = getDeadlineStatus(a.deadline);
        const prefix = a.category === 'Pemberitahuan' ? '📢 [PEMBERITAHUAN]' : `📝 [${a.subject}]`;
        text += `*${idx + 1}. ${prefix} ${a.title}*\n`;
        if (a.announcedBy) text += `   • Dari: ${a.announcedBy}\n`;
        if (a.teacher && a.teacher !== '-') text += `   • Guru: ${a.teacher}\n`;
        text += `   • Batas/Waktu: ${a.deadline} (${a.deadlineTime || '23:59'}) [${stat.label}]\n`;
        if (a.category !== 'Pemberitahuan') {
          text += `   • Tipe: ${a.type} | Kumpul via: ${a.submissionType}\n`;
        }
        if (a.description) text += `   • Rincian: ${a.description}\n`;
        text += `\n`;
      });
    }

    text += `------------------------------------\n`;
    text += `🌐 Cek detail lengkap di website kelas: https://x-dkv1.vercel.app/tugas\n`;
    text += `Semangat berkarya warga ${state.classInfo.name}! ✨`;

    navigator.clipboard.writeText(text);
    setCopiedWa(true);
    setTimeout(() => setCopiedWa(false), 2500);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-[#DCEEFB] p-6 sm:p-8 shadow-md shadow-[#8BB4E7]/15">
        <PastelCloud className="absolute -top-10 -right-10 w-52 opacity-35 pointer-events-none" />
        <PastelStar className="absolute top-6 left-1/3 w-5 h-5 text-[#8BB4E7] animate-pulse pointer-events-none" />
        <PastelClover className="absolute bottom-4 right-1/4 w-6 h-6 animate-bounce pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DEF0FC] border border-[#BEE0F9] text-xs font-bold text-[#263B50]">
              <Megaphone className="w-3.5 h-3.5 text-[#5A9FE8]" />
              <span>Agenda Akademik & Pengumuman Resmi • Kelas {state.classInfo.name}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#263B50] tracking-tight">
              Papan Tugas & Pemberitahuan Kelas
            </h1>
            <p className="text-xs sm:text-sm text-[#647E99] max-w-2xl leading-relaxed">
              Pusat informasi resmi pengurus kelas: pengumuman agenda, tugas mandiri/kelompok, PR mapel produktif DKV, dan edaran penting dengan notifikasi deadline otomatis!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            <button
              type="button"
              onClick={handleCopyWhatsAppFormat}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#DEF0FC] hover:bg-[#cde4f7] text-[#263B50] text-xs font-bold border border-[#BEE0F9] transition-all shadow-xs"
              title="Salin rekap seluruh tugas aktif untuk dibagikan ke WhatsApp grup kelas"
            >
              {copiedWa ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#5A9FE8]" />}
              <span>{copiedWa ? 'Tersalin ke Clipboard!' : 'Salin Format WA'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setFormData((prev) => ({ ...prev, category: 'Tugas' }));
                setIsAddModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#8BB4E7] hover:bg-[#7BAEDB] text-white text-xs font-bold shadow-md shadow-[#8BB4E7]/30 transition-all hover:scale-102"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Tugas</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  category: 'Pemberitahuan',
                  subject: 'Pemberitahuan Kelas',
                  teacher: '-',
                  submissionType: 'Tidak Ada (Info)',
                  type: 'Individu',
                }));
                setIsAddModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#3BB4CD] hover:bg-[#2fa0b7] text-white text-xs font-bold shadow-md shadow-[#3BB4CD]/30 transition-all hover:scale-102"
            >
              <Megaphone className="w-4 h-4" />
              <span>Buat Pemberitahuan</span>
            </button>
          </div>
        </div>

        {/* 2. Quick Counter Metrics Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-6 border-t border-[#E4EEF8] mt-6">
          <div className="bg-[#F7FBFF] rounded-2xl p-3 border border-[#E0EEF9] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#DEF0FC] text-[#5A9FE8] flex items-center justify-center font-black">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-[#647E99] font-semibold block">Semua Info</span>
              <span className="text-lg font-black text-[#263B50]">{totalCount}</span>
            </div>
          </div>

          <div className="bg-[#F7FBFF] rounded-2xl p-3 border border-[#E0EEF9] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-[#647E99] font-semibold block">Pemberitahuan</span>
              <span className="text-lg font-black text-purple-700">{noticeCount}</span>
            </div>
          </div>

          <div className="bg-[#F7FBFF] rounded-2xl p-3 border border-[#E0EEF9] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-[#647E99] font-semibold block">Deadline Dekat</span>
              <span className="text-lg font-black text-amber-700">{urgentCount}</span>
            </div>
          </div>

          <div className="bg-[#F7FBFF] rounded-2xl p-3 border border-[#E0EEF9] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-[#647E99] font-semibold block">Belum Selesai</span>
              <span className="text-lg font-black text-blue-700">{pendingCount}</span>
            </div>
          </div>

          <div className="bg-[#F7FBFF] rounded-2xl p-3 border border-[#E0EEF9] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-[#647E99] font-semibold block">Selesai</span>
              <span className="text-lg font-black text-emerald-700">{completedCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Filter Bar (Status Tabs & Subject Picker) */}
      <div className="bg-white rounded-3xl border border-[#E4EEF8] p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Status Tab Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'semua', label: 'Semua', count: totalCount },
              { id: 'tugas', label: '📝 Tugas & PR', count: taskCount },
              { id: 'pemberitahuan', label: '📢 Pemberitahuan', count: noticeCount },
              { id: 'mendesak', label: '🔥 Deadline Dekat', count: urgentCount },
              { id: 'pending', label: '⏳ Belum Selesai', count: pendingCount },
              { id: 'selesai', label: '✅ Selesai', count: completedCount },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-[#8BB4E7] text-white shadow-xs scale-102'
                    : 'bg-[#F7FBFF] text-[#647E99] hover:bg-[#DEF0FC] hover:text-[#263B50] border border-[#E0EEF9]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    activeTab === tab.id ? 'bg-white/30 text-white' : 'bg-[#E0EEF9] text-[#263B50]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-[#8BB4E7] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari tugas / mapel / guru..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-2xl bg-[#F7FBFF] border border-[#E0EEF9] focus:bg-white focus:border-[#8BB4E7] text-[#263B50] outline-none transition-all placeholder:text-[#94A3B8]"
            />
          </div>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-[#F1F5F9] pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-[#647E99] shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#5A9FE8]" />
            <span>Mapel:</span>
          </span>
          {['Semua', ...subjectsList.filter((s) => s !== 'Lainnya')].map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all shrink-0 ${
                selectedSubject === sub
                  ? 'bg-[#263B50] text-white shadow-xs'
                  : 'bg-[#F7FBFF] text-[#647E99] hover:bg-[#DEF0FC] border border-[#E0EEF9]'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Assignment Cards Grid */}
      {filteredAssignments.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E4EEF8] p-12 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#DEF0FC] text-[#5A9FE8] mx-auto flex items-center justify-center text-2xl">
            ✨
          </div>
          <h3 className="font-black text-lg text-[#263B50]">Tidak Ada Tugas Ditemukan</h3>
          <p className="text-xs text-[#647E99] max-w-md mx-auto">
            {activeTab === 'selesai'
              ? 'Belum ada tugas yang ditandai selesai.'
              : 'Semua tugas pada filter ini sudah rampung atau belum ada yang didaftarkan. Tetap semangat!'}
          </p>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#8BB4E7] text-white text-xs font-bold hover:bg-[#7BAEDB] transition-colors inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Tugas Baru</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAssignments.map((asg) => {
            const status = getDeadlineStatus(asg.deadline);

            return (
              <div
                key={asg.id}
                className={`group bg-white rounded-3xl border transition-all duration-300 p-5 shadow-xs flex flex-col justify-between relative overflow-hidden ${
                  asg.isCompleted
                    ? 'border-emerald-200 bg-emerald-50/20 opacity-80'
                    : status.isUrgent
                    ? 'border-amber-300 ring-2 ring-amber-200/50 shadow-md shadow-amber-100 hover:shadow-lg'
                    : 'border-[#DCEEFB] hover:border-[#8BB4E7] hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Header: Category, Subject & Countdown Pill */}
                  <div className="flex items-start justify-between gap-2 pb-3 mb-3 border-b border-[#F1F5F9]">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border flex items-center gap-1 ${
                          asg.category === 'Pemberitahuan'
                            ? 'bg-purple-100 text-purple-800 border-purple-200'
                            : 'bg-blue-100 text-blue-800 border-blue-200'
                        }`}
                      >
                        {asg.category === 'Pemberitahuan' ? '📢 Info / Edaran' : '📝 Tugas PR'}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-xl bg-[#DEF0FC] text-[#263B50] font-black text-xs border border-[#BEE0F9]">
                        {asg.subject}
                      </span>
                      {asg.category !== 'Pemberitahuan' && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            asg.type === 'Kelompok'
                              ? 'bg-purple-100 text-purple-700 border border-purple-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {asg.type}
                        </span>
                      )}
                    </div>

                    {/* Deadline Countdown Pill */}
                    <div
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black border flex items-center gap-1 shrink-0 ${
                        asg.isCompleted ? 'bg-emerald-100 text-emerald-700 border-emerald-300' : status.color
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      <span>{asg.isCompleted ? 'Selesai' : status.label}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5 mb-4">
                    <h3
                      className={`font-black text-base text-[#263B50] group-hover:text-[#5A9FE8] transition-colors leading-snug ${
                        asg.isCompleted ? 'line-through text-[#94A3B8]' : ''
                      }`}
                    >
                      {asg.title}
                    </h3>
                    {asg.description && (
                      <p className="text-xs text-[#647E99] leading-relaxed line-clamp-3">
                        {asg.description}
                      </p>
                    )}
                  </div>

                  {/* Officer Announcement Badge */}
                  <div className="flex items-center gap-1.5 text-[10px] text-[#647E99] bg-[#DEF0FC]/60 border border-[#D5E8F8] px-2.5 py-1 rounded-xl mb-3.5">
                    <span>📢</span>
                    <span>Diumumkan oleh: <strong className="text-[#263B50]">{asg.announcedBy || 'Pengurus Kelas X DKV 1'}</strong></span>
                  </div>
                </div>

                {/* Footer Info: Teacher, Submission, & Actions */}
                <div className="pt-3 border-t border-[#F1F5F9] space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-[#647E99]">
                    {asg.teacher && (
                      <span className="flex items-center gap-1 truncate">
                        <User className="w-3.5 h-3.5 text-[#5A9FE8] shrink-0" />
                        <span className="font-semibold">{asg.teacher}</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1 font-bold text-[#263B50]">
                      <FolderGit2 className="w-3.5 h-3.5 text-[#8BB4E7]" />
                      <span>{asg.submissionType}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-[#94A3B8] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Tenggat: {asg.deadline} ({asg.deadlineTime || '23:59'})</span>
                    </span>

                    <div className="flex items-center gap-1.5">
                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => deleteAssignment(asg.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Hapus Tugas"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Complete / Uncomplete Toggle Button */}
                      <button
                        type="button"
                        onClick={() => toggleAssignmentCompleted(asg.id)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          asg.isCompleted
                            ? 'bg-emerald-500 text-white shadow-xs'
                            : 'bg-[#DEF0FC] text-[#263B50] hover:bg-[#8BB4E7] hover:text-white'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{asg.isCompleted ? 'Selesai' : 'Tandai Selesai'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. MODAL FORM: TAMBAH TUGAS BARU */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative max-w-lg w-full bg-white rounded-3xl border border-[#DCEEFB] p-6 shadow-2xl max-h-[92vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4EEF8]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#DEF0FC] text-[#5A9FE8] flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-[#263B50]">
                    Catat Tugas Baru
                  </h3>
                  <p className="text-xs text-[#647E99]">Tambahkan PR atau proyek kelas X DKV 1</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-[#263B50] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-4">
              {/* Pilihan Kategori: Tugas vs Pemberitahuan */}
              <div>
                <label className="block text-xs font-bold text-[#263B50] mb-1.5">
                  Jenis Informasi *
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-[#F0F7FD] border border-[#E0EEF9]">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, category: 'Tugas' })}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      formData.category === 'Tugas'
                        ? 'bg-white text-[#263B50] shadow-sm border border-[#DCEEFB]'
                        : 'text-[#647E99] hover:text-[#263B50]'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#5A9FE8]" />
                    <span>📝 Tugas / PR</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        category: 'Pemberitahuan',
                        subject: 'Pemberitahuan Kelas',
                        teacher: '-',
                        submissionType: 'Tidak Ada (Info)',
                      })
                    }
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      formData.category === 'Pemberitahuan'
                        ? 'bg-white text-[#263B50] shadow-sm border border-[#DCEEFB]'
                        : 'text-[#647E99] hover:text-[#263B50]'
                    }`}
                  >
                    <Megaphone className="w-3.5 h-3.5 text-[#3BB4CD]" />
                    <span>📢 Pemberitahuan</span>
                  </button>
                </div>
              </div>

              {/* Judul Informasi */}
              <div>
                <label className="block text-xs font-bold text-[#263B50] mb-1">
                  {formData.category === 'Pemberitahuan' ? 'Judul Pengumuman / Info *' : 'Judul Tugas / Nama PR *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    formData.category === 'Pemberitahuan'
                      ? 'Contoh: Pengambilan Seragam Praktek / Iuran Kas Kelas'
                      : 'Contoh: Sketsa Logo Vektor Varian 1'
                  }
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F7FBFF] border border-[#E0EEF9] focus:bg-white focus:border-[#8BB4E7] text-xs font-semibold text-[#263B50] outline-none"
                />
              </div>

              {/* Diumumkan Oleh (Pengurus Kelas) */}
              <div>
                <label className="block text-xs font-bold text-[#263B50] mb-1">
                  📢 Diumumkan Oleh (Pengurus Kelas) *
                </label>
                <select
                  value={formData.announcedBy}
                  onChange={(e) => setFormData({ ...formData, announcedBy: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-2xl bg-[#F7FBFF] border border-[#E0EEF9] focus:bg-white focus:border-[#8BB4E7] text-xs font-semibold text-[#263B50] outline-none"
                >
                  <option value="Dea Anggia (Sekretaris 1)">Dea Anggia (Sekretaris 1)</option>
                  <option value="Kesya (Sekretaris 2)">Kesya (Sekretaris 2)</option>
                  <option value="Ahmad Zalqi (Ketua Kelas)">Ahmad Zalqi (Ketua Kelas)</option>
                  <option value="Sri Mulyaningtyas (Wakil Ketua)">Sri Mulyaningtyas (Wakil Ketua)</option>
                  <option value="Adel (Bendahara 1)">Adel (Bendahara 1)</option>
                  <option value="Selly (Bendahara 2)">Selly (Bendahara 2)</option>
                  <option value="Pengurus Kelas X DKV 1">Pengurus Kelas X DKV 1</option>
                </select>
              </div>

              {/* Mapel & Guru */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#263B50] mb-1">
                    {formData.category === 'Pemberitahuan' ? 'Kategori / Topik' : 'Mata Pelajaran *'}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-2xl bg-[#F7FBFF] border border-[#E0EEF9] focus:bg-white focus:border-[#8BB4E7] text-xs font-semibold text-[#263B50] outline-none"
                  >
                    {formData.category === 'Pemberitahuan' && (
                      <option value="Pemberitahuan Kelas">Pemberitahuan Kelas</option>
                    )}
                    {subjectsList.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#263B50] mb-1">
                    Guru Pengampu
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Pak Derri"
                    value={formData.teacher}
                    onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                    className="w-full px-3 py-2 rounded-2xl bg-[#F7FBFF] border border-[#E0EEF9] focus:bg-white focus:border-[#8BB4E7] text-xs font-semibold text-[#263B50] outline-none"
                  />
                </div>
              </div>

              {formData.subject === 'Lainnya' && (
                <div>
                  <label className="block text-xs font-bold text-[#263B50] mb-1">
                    Ketik Nama Mata Pelajaran:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama mapel lainnya..."
                    value={formData.customSubject}
                    onChange={(e) => setFormData({ ...formData, customSubject: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-2xl bg-[#F7FBFF] border border-[#E0EEF9] text-xs text-[#263B50]"
                  />
                </div>
              )}

              {/* Deadline Tanggal & Jam */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#263B50] mb-1">
                    Tanggal Tenggat (Deadline) *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-2xl bg-[#F7FBFF] border border-[#E0EEF9] focus:bg-white focus:border-[#8BB4E7] text-xs font-semibold text-[#263B50] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#263B50] mb-1">
                    Pukul / Jam
                  </label>
                  <input
                    type="time"
                    value={formData.deadlineTime}
                    onChange={(e) => setFormData({ ...formData, deadlineTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-2xl bg-[#F7FBFF] border border-[#E0EEF9] focus:bg-white focus:border-[#8BB4E7] text-xs font-semibold text-[#263B50] outline-none"
                  />
                </div>
              </div>

              {/* Tipe Tugas & Pengumpulan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#263B50] mb-1">
                    Sifat Tugas
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-2xl bg-[#F7FBFF] border border-[#E0EEF9] text-xs font-semibold text-[#263B50] outline-none"
                  >
                    <option value="Individu">Individu (Mandiri)</option>
                    <option value="Kelompok">Kelompok</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#263B50] mb-1">
                    Media Pengumpulan
                  </label>
                  <select
                    value={formData.submissionType}
                    onChange={(e) => setFormData({ ...formData, submissionType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-2xl bg-[#F7FBFF] border border-[#E0EEF9] text-xs font-semibold text-[#263B50] outline-none"
                  >
                    {formData.category === 'Pemberitahuan' && (
                      <option value="Tidak Ada (Info)">Tidak Ada Pengumpulan (Info Saja)</option>
                    )}
                    <option value="Google Classroom">Google Classroom</option>
                    <option value="Buku / Kertas">Buku / Kertas Folio / Gambar</option>
                    <option value="Link Drive">Link Google Drive</option>
                    <option value="Flashdisk / File">Flashdisk / File Langsung</option>
                    <option value="Langsung di Kelas">Langsung di Kelas</option>
                  </select>
                </div>
              </div>

              {/* Catatan / Instruksi */}
              <div>
                <label className="block text-xs font-bold text-[#263B50] mb-1">
                  Catatan & Petunjuk Pengerjaan
                </label>
                <textarea
                  rows={3}
                  placeholder="Instruksi tambahan, format file yang diminta, dll..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-2xl bg-[#F7FBFF] border border-[#E0EEF9] focus:bg-white focus:border-[#8BB4E7] text-xs text-[#263B50] outline-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E4EEF8]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#647E99] hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-[#8BB4E7] hover:bg-[#7BAEDB] text-white text-xs font-black shadow-md shadow-[#8BB4E7]/30 transition-all"
                >
                  Simpan Tugas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
