'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  Clock,
  Printer,
  Sparkles,
  Download,
  X,
  Image as ImageIcon,
  Columns,
  ListFilter,
  Search,
  Edit3,
  Plus,
  Trash2,
  Check,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';
import { DayOfWeek, ScheduleItem } from '@/types';
import { getCurrentIndonesianDay } from '@/lib/utils/time';
import { PastelCloud, PastelStar } from '@/components/common/DecorativeElements';

interface ScheduleSlot {
  time: string;
  isBreak?: boolean;
  senin: { subject: string; teacher?: string; isSpecial?: boolean };
  selasa: { subject: string; teacher?: string; isSpecial?: boolean };
  rabu: { subject: string; teacher?: string; isSpecial?: boolean };
  kamis: { subject: string; teacher?: string; isSpecial?: boolean };
  jumat: { subject: string; teacher?: string; isSpecial?: boolean };
}

// 13 Rows matching the exact authentic Snoopy schedule poster
const schedulePosterData: ScheduleSlot[] = [
  {
    time: '07.15-08.00',
    senin: { subject: 'Upacara', isSpecial: true },
    selasa: { subject: 'Pkn', teacher: 'Media' },
    rabu: { subject: 'perwalian' },
    kamis: { subject: 'Pdkv', teacher: 'Derri' },
    jumat: { subject: 'sejari', teacher: 'Swastika' },
  },
  {
    time: '08.00-08.45',
    senin: { subject: 'B Inggris', teacher: 'Raka' },
    selasa: { subject: 'Pkn' },
    rabu: { subject: 'Pjok', teacher: 'Imam' },
    kamis: { subject: 'Pdkv' },
    jumat: { subject: 'sejari' },
  },
  {
    time: '08.45-09.30',
    senin: { subject: 'B inggris' },
    selasa: { subject: 'b inggris', teacher: 'Raka' },
    rabu: { subject: 'Pjok' },
    kamis: { subject: 'Informatika', teacher: 'Desi' },
    jumat: { subject: 'B indo', teacher: 'Evi' },
  },
  {
    time: 'Istirahat 15menit',
    isBreak: true,
    senin: { subject: '-' },
    selasa: { subject: '-' },
    rabu: { subject: '-' },
    kamis: { subject: '-' },
    jumat: { subject: '-' },
  },
  {
    time: '09.45-10.30',
    senin: { subject: 'Mtk', teacher: 'Angga' },
    selasa: { subject: 'B inggris' },
    rabu: { subject: 'Pjok' },
    kamis: { subject: 'informatika' },
    jumat: { subject: 'B indo' },
  },
  {
    time: '10.30-11.15',
    senin: { subject: 'Mtk' },
    selasa: { subject: 'Senbud', teacher: 'Alfian' },
    rabu: { subject: 'Pdkv', teacher: 'Syahrul' },
    kamis: { subject: 'informatika' },
    jumat: { subject: 'b indo' },
  },
  {
    time: '11.15-12.00',
    senin: { subject: 'Ipas', teacher: 'Marleni' },
    selasa: { subject: 'Seni budaya' },
    rabu: { subject: 'Pdkv' },
    kamis: { subject: 'Informatika' },
    jumat: { subject: '-' },
  },
  {
    time: 'Istirahat 30menit',
    isBreak: true,
    senin: { subject: '-' },
    selasa: { subject: '-' },
    rabu: { subject: '-' },
    kamis: { subject: '-' },
    jumat: { subject: '-' },
  },
  {
    time: '12.30-13.10',
    senin: { subject: 'Ipas' },
    selasa: { subject: 'Pdkv', teacher: 'Nuzulian' },
    rabu: { subject: 'Mtk', teacher: 'Angga' },
    kamis: { subject: 'B indo', teacher: 'Evi' },
    jumat: { subject: '-' },
  },
  {
    time: '13.10-13.50',
    senin: { subject: 'ipas' },
    selasa: { subject: 'Pdkv' },
    rabu: { subject: 'Mtk' },
    kamis: { subject: 'B indo' },
    jumat: { subject: '-' },
  },
  {
    time: '13.50-14.30',
    senin: { subject: 'fotografi', teacher: 'Amelia' },
    selasa: { subject: 'Pdkv' },
    rabu: { subject: 'mtk' },
    kamis: { subject: 'B Indo' },
    jumat: { subject: '-' },
  },
  {
    time: '14.30-15.10',
    senin: { subject: 'fotografi' },
    selasa: { subject: 'Pai', teacher: 'M ansori' },
    rabu: { subject: 'Ipas', teacher: 'Marleni' },
    kamis: { subject: 'K. grafis', teacher: 'Dhiska' },
    jumat: { subject: '-' },
  },
  {
    time: '15.10-15.50',
    senin: { subject: 'Fotografi' },
    selasa: { subject: 'pai' },
    rabu: { subject: 'ipas' },
    kamis: { subject: 'Kom grafis' },
    jumat: { subject: '-' },
  },
];

export default function JadwalPage() {
  const { state, updateSchedule, addSchedule, deleteSchedule } = useClassData();
  const [currentToday, setCurrentToday] = useState<DayOfWeek>('Senin');
  const [viewMode, setViewMode] = useState<'poster' | 'harian'>('harian');
  const [activeDay, setActiveDay] = useState<DayOfWeek>('Senin');
  const [selectedPosterDay, setSelectedPosterDay] = useState<DayOfWeek | 'Semua'>('Senin');
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Editing Mapel State
  const [editingScheduleItem, setEditingScheduleItem] = useState<ScheduleItem | null>(null);
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const [newScheduleForm, setNewScheduleForm] = useState<Omit<ScheduleItem, 'id'>>({
    day: 'Senin',
    period: 1,
    startTime: '07.15',
    endTime: '08.00',
    subject: '',
    teacher: '',
    room: 'Ruang X DKV 1',
    isBreak: false,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    const today = getCurrentIndonesianDay();
    setCurrentToday(today);
    setActiveDay(today);
    setSelectedPosterDay(today);
  }, []);

  const days: DayOfWeek[] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

  const getSlotForDay = (slot: ScheduleSlot, day: DayOfWeek) => {
    switch (day) {
      case 'Senin': return slot.senin;
      case 'Selasa': return slot.selasa;
      case 'Rabu': return slot.rabu;
      case 'Kamis': return slot.kamis;
      case 'Jumat': return slot.jumat;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Action & View Switcher Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-[#E4EEF8] shadow-xs print:hidden">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setViewMode('harian')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              viewMode === 'harian'
                ? 'bg-[#5A9FE8] text-white shadow-xs'
                : 'bg-[#F7FBFF] text-[#71849A] hover:text-[#263B50] border border-[#E4EEF8]'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Mode Harian (Interaktif)</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('poster')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              viewMode === 'poster'
                ? 'bg-[#5A9FE8] text-white shadow-xs'
                : 'bg-[#F7FBFF] text-[#71849A] hover:text-[#263B50] border border-[#E4EEF8]'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Format Poster X DKV 1</span>
          </button>

          {/* Quick Add Mapel Button */}
          <button
            type="button"
            onClick={() => {
              setNewScheduleForm((prev) => ({ ...prev, day: activeDay }));
              setIsAddScheduleModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-black bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Mapel</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPosterModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold bg-[#DCEEFF] text-[#263B50] border border-[#B9DCFF] hover:bg-[#B9DCFF] transition-colors"
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#5A9FE8]" />
            <span>Foto Poster Asli</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold bg-[#F7FBFF] text-[#263B50] border border-[#E4EEF8] hover:bg-[#DCEEFF] transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-[#5A9FE8]" />
            <span>Cetak / PDF</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* VIEW 1: AUTHENTIC POSTER DESAIN SESUAI GAMBAR PENGGUNA */}
      {/* ============================================================ */}
      {viewMode === 'poster' ? (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#E6F4FE] via-[#EDF7FF] to-[#E2F0FA] border-2 border-[#B9DCFF] p-4 sm:p-7 lg:p-9 shadow-md space-y-6">
          {/* Subtle Decorative Clouds & Stars */}
          <PastelCloud className="absolute -top-10 -left-10 w-48 opacity-40 pointer-events-none" />
          <PastelCloud className="absolute -top-6 -right-10 w-52 opacity-40 pointer-events-none" />
          <PastelStar className="absolute top-12 left-10 w-5 h-5 text-amber-400 opacity-80" />
          <PastelStar className="absolute top-10 right-14 w-6 h-6 text-amber-400 opacity-80" />
          <PastelStar className="absolute top-48 right-8 w-4 h-4 text-emerald-400 opacity-70" />

          {/* Title Header with Bubble Font & Cyan Pill */}
          <div className="text-center space-y-2 relative z-10 pt-2 pb-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2670A8] tracking-wider drop-shadow-xs uppercase select-none font-sans">
              JADWAL PELAJARAN
            </h1>
            <div className="inline-block">
              <span className="px-5 py-1.5 rounded-full bg-[#3BB4CD] text-white text-xs sm:text-sm font-black tracking-widest uppercase shadow-sm">
                X DKV 1
              </span>
            </div>
          </div>

          {/* Mobile Day Selector Pill Strip: Resolves Horizontal Cutoff on Phones */}
          <div className="sm:hidden space-y-2 relative z-10">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold text-[#2670A8] flex items-center gap-1">
                <CalendarDays className="w-3.5 h-3.5" />
                <span>Pilih Hari Pelajaran:</span>
              </span>
              {selectedPosterDay !== 'Semua' && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 text-[#2670A8] border border-[#B9DCFF]">
                  Mode Pas Layar HP ✨
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {(['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Semua'] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedPosterDay(d)}
                  className={`px-3 py-1.5 rounded-full text-xs font-black transition-all shrink-0 ${
                    selectedPosterDay === d
                      ? 'bg-[#2670A8] text-white shadow-sm scale-105'
                      : 'bg-white/90 text-[#263B50] hover:bg-white border border-[#B9DCFF]'
                  }`}
                >
                  {d === 'Semua' ? 'Semua (4 Kolom)' : d}
                  {d === currentToday && (
                    <span className="ml-1 text-[9px] text-emerald-400 font-extrabold">• Hari Ini</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile 2-Column Capsule Layout (WAKTU + SELECTED DAY) - ZERO CUTOFF */}
          {selectedPosterDay !== 'Semua' && (
            <div className="sm:hidden grid grid-cols-12 gap-2 relative z-10">
              {/* Capsule WAKTU (5 Cols) */}
              <div className="col-span-5 bg-white/95 backdrop-blur-xs rounded-2xl border-2 border-dashed border-[#5A9FE8] p-2 shadow-sm flex flex-col">
                <div className="text-center pb-1.5 mb-1.5 border-b border-[#E4EEF8]">
                  <h3 className="font-extrabold text-xs text-[#263B50] uppercase tracking-wide">
                    Waktu
                  </h3>
                </div>
                <div className="space-y-1 flex-1">
                  {schedulePosterData.map((slot, idx) => (
                    <div
                      key={idx}
                      className={`h-7 flex items-center justify-center text-center text-[10px] font-bold rounded-lg px-0.5 ${
                        slot.isBreak
                          ? 'text-rose-500 bg-rose-50 border border-rose-100 text-[9px]'
                          : 'text-[#263B50]'
                      }`}
                    >
                      {slot.time}
                    </div>
                  ))}
                </div>
              </div>

              {/* Capsule SELECTED DAY (7 Cols) */}
              <div
                className={`col-span-7 bg-white/95 backdrop-blur-xs rounded-2xl border-2 border-dashed border-[#5A9FE8] p-2 shadow-sm flex flex-col ${
                  currentToday === selectedPosterDay ? 'ring-2 ring-[#5A9FE8]' : ''
                }`}
              >
                <div className="text-center pb-1.5 mb-1.5 border-b border-[#E4EEF8] flex items-center justify-center gap-1.5">
                  <h3 className="font-extrabold text-xs text-[#263B50] uppercase tracking-wide">
                    {selectedPosterDay}
                  </h3>
                  {currentToday === selectedPosterDay && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="Hari Ini" />
                  )}
                </div>
                <div className="space-y-1 flex-1">
                  {schedulePosterData.map((slot, idx) => {
                    const item = getSlotForDay(slot, selectedPosterDay);
                    return (
                      <div
                        key={idx}
                        className={`h-7 flex items-center justify-center text-center text-[10px] font-bold rounded-lg px-1 truncate ${
                          slot.isBreak
                            ? 'text-[#71849A]/40'
                            : item.isSpecial
                            ? 'text-rose-500 bg-rose-50 border border-rose-100'
                            : 'text-[#263B50]'
                        }`}
                      >
                        <span className="truncate">{item.subject}</span>
                        {item.teacher && (
                          <span className="text-[#5A9FE8] ml-1 font-semibold text-[9px] shrink-0">
                            ({item.teacher})
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Full 4-Column Poster Grid (Shown on Desktop & When Mobile selects "Semua") */}
          <div
            className={`relative z-10 space-y-5 overflow-x-auto ${
              selectedPosterDay !== 'Semua' ? 'hidden sm:block' : 'block'
            }`}
          >
            {/* Scroll Hint on Mobile */}
            <div className="sm:hidden px-3 py-1.5 bg-[#DEF0FC] rounded-full text-[11px] font-bold text-[#2670A8] flex items-center justify-center gap-1.5 border border-[#BEE0F9] mb-1">
              <span>👉 Geser tabel ke samping untuk melihat hari lainnya 👉</span>
            </div>

            {/* ROW 1: WAKTU, SENIN, SELASA, RABU (4 CAPSULES) */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4 min-w-[720px] p-0.5">
              {/* Capsule 1: WAKTU */}
              <div className="bg-white/95 backdrop-blur-xs rounded-3xl border-2 border-dashed border-[#5A9FE8] p-3 sm:p-4 shadow-sm flex flex-col">
                <div className="text-center pb-2 mb-2 border-b border-[#E4EEF8]">
                  <h3 className="font-extrabold text-sm sm:text-base text-[#263B50] uppercase tracking-wide">
                    Waktu
                  </h3>
                </div>
                <div className="space-y-1 flex-1">
                  {schedulePosterData.map((slot, idx) => (
                    <div
                      key={idx}
                      className={`h-7 sm:h-8 flex items-center justify-center text-center text-[11px] sm:text-xs font-semibold rounded-lg ${
                        slot.isBreak
                          ? 'text-rose-500 font-extrabold bg-rose-50/70 border border-rose-100'
                          : 'text-[#263B50]'
                      }`}
                    >
                      {slot.time}
                    </div>
                  ))}
                </div>
              </div>

              {/* Capsule 2: SENIN */}
              <div
                className={`bg-white/95 backdrop-blur-xs rounded-3xl border-2 border-dashed border-[#5A9FE8] p-3 sm:p-4 shadow-sm flex flex-col ${
                  currentToday === 'Senin' ? 'ring-2 ring-[#5A9FE8]' : ''
                }`}
              >
                <div className="text-center pb-2 mb-2 border-b border-[#E4EEF8] flex items-center justify-center gap-1.5">
                  <h3 className="font-extrabold text-sm sm:text-base text-[#263B50] uppercase tracking-wide">
                    Senin
                  </h3>
                  {currentToday === 'Senin' && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" title="Hari Ini" />
                  )}
                </div>
                <div className="space-y-1 flex-1">
                  {schedulePosterData.map((slot, idx) => (
                    <div
                      key={idx}
                      className={`h-7 sm:h-8 flex items-center justify-center text-center text-[11px] sm:text-xs font-semibold rounded-lg px-1 truncate ${
                        slot.isBreak
                          ? 'text-[#71849A]/40 font-bold'
                          : slot.senin.isSpecial
                          ? 'text-rose-500 font-extrabold bg-rose-50/70 border border-rose-100'
                          : 'text-[#263B50]'
                      }`}
                    >
                      {slot.senin.subject}
                      {slot.senin.teacher && (
                        <span className="text-[#5A9FE8] ml-1 font-normal">
                          ({slot.senin.teacher})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Capsule 3: SELASA */}
              <div
                className={`bg-white/95 backdrop-blur-xs rounded-3xl border-2 border-dashed border-[#5A9FE8] p-3 sm:p-4 shadow-sm flex flex-col ${
                  currentToday === 'Selasa' ? 'ring-2 ring-[#5A9FE8]' : ''
                }`}
              >
                <div className="text-center pb-2 mb-2 border-b border-[#E4EEF8] flex items-center justify-center gap-1.5">
                  <h3 className="font-extrabold text-sm sm:text-base text-[#263B50] uppercase tracking-wide">
                    Selasa
                  </h3>
                  {currentToday === 'Selasa' && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" title="Hari Ini" />
                  )}
                </div>
                <div className="space-y-1 flex-1">
                  {schedulePosterData.map((slot, idx) => (
                    <div
                      key={idx}
                      className={`h-7 sm:h-8 flex items-center justify-center text-center text-[11px] sm:text-xs font-semibold rounded-lg px-1 truncate ${
                        slot.isBreak
                          ? 'text-[#71849A]/40 font-bold'
                          : 'text-[#263B50]'
                      }`}
                    >
                      {slot.selasa.subject}
                      {slot.selasa.teacher && (
                        <span className="text-[#5A9FE8] ml-1 font-normal">
                          ({slot.selasa.teacher})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Capsule 4: RABU */}
              <div
                className={`bg-white/95 backdrop-blur-xs rounded-3xl border-2 border-dashed border-[#5A9FE8] p-3 sm:p-4 shadow-sm flex flex-col ${
                  currentToday === 'Rabu' ? 'ring-2 ring-[#5A9FE8]' : ''
                }`}
              >
                <div className="text-center pb-2 mb-2 border-b border-[#E4EEF8] flex items-center justify-center gap-1.5">
                  <h3 className="font-extrabold text-sm sm:text-base text-[#263B50] uppercase tracking-wide">
                    Rabu
                  </h3>
                  {currentToday === 'Rabu' && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" title="Hari Ini" />
                  )}
                </div>
                <div className="space-y-1 flex-1">
                  {schedulePosterData.map((slot, idx) => (
                    <div
                      key={idx}
                      className={`h-7 sm:h-8 flex items-center justify-center text-center text-[11px] sm:text-xs font-semibold rounded-lg px-1 truncate ${
                        slot.isBreak
                          ? 'text-[#71849A]/40 font-bold'
                          : 'text-[#263B50]'
                      }`}
                    >
                      {slot.rabu.subject}
                      {slot.rabu.teacher && (
                        <span className="text-[#5A9FE8] ml-1 font-normal">
                          ({slot.rabu.teacher})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ROW 2: WAKTU, KAMIS, JUMAT, & SNOOPY GRAPHIC AREA (4 COLUMNS) */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4 min-w-[720px]">
              {/* Capsule 1: WAKTU */}
              <div className="bg-white/95 backdrop-blur-xs rounded-3xl border-2 border-dashed border-[#5A9FE8] p-3 sm:p-4 shadow-sm flex flex-col">
                <div className="text-center pb-2 mb-2 border-b border-[#E4EEF8]">
                  <h3 className="font-extrabold text-sm sm:text-base text-[#263B50] uppercase tracking-wide">
                    Waktu
                  </h3>
                </div>
                <div className="space-y-1 flex-1">
                  {schedulePosterData.map((slot, idx) => (
                    <div
                      key={idx}
                      className={`h-7 sm:h-8 flex items-center justify-center text-center text-[11px] sm:text-xs font-semibold rounded-lg ${
                        slot.isBreak
                          ? 'text-rose-500 font-extrabold bg-rose-50/70 border border-rose-100'
                          : 'text-[#263B50]'
                      }`}
                    >
                      {slot.time}
                    </div>
                  ))}
                </div>
              </div>

              {/* Capsule 2: KAMIS */}
              <div
                className={`bg-white/95 backdrop-blur-xs rounded-3xl border-2 border-dashed border-[#5A9FE8] p-3 sm:p-4 shadow-sm flex flex-col ${
                  currentToday === 'Kamis' ? 'ring-2 ring-[#5A9FE8]' : ''
                }`}
              >
                <div className="text-center pb-2 mb-2 border-b border-[#E4EEF8] flex items-center justify-center gap-1.5">
                  <h3 className="font-extrabold text-sm sm:text-base text-[#263B50] uppercase tracking-wide">
                    Kamis
                  </h3>
                  {currentToday === 'Kamis' && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" title="Hari Ini" />
                  )}
                </div>
                <div className="space-y-1 flex-1">
                  {schedulePosterData.map((slot, idx) => (
                    <div
                      key={idx}
                      className={`h-7 sm:h-8 flex items-center justify-center text-center text-[11px] sm:text-xs font-semibold rounded-lg px-1 truncate ${
                        slot.isBreak
                          ? 'text-[#71849A]/40 font-bold'
                          : 'text-[#263B50]'
                      }`}
                    >
                      {slot.kamis.subject}
                      {slot.kamis.teacher && (
                        <span className="text-[#5A9FE8] ml-1 font-normal">
                          ({slot.kamis.teacher})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Capsule 3: JUMAT */}
              <div
                className={`bg-white/95 backdrop-blur-xs rounded-3xl border-2 border-dashed border-[#5A9FE8] p-3 sm:p-4 shadow-sm flex flex-col ${
                  currentToday === 'Jumat' ? 'ring-2 ring-[#5A9FE8]' : ''
                }`}
              >
                <div className="text-center pb-2 mb-2 border-b border-[#E4EEF8] flex items-center justify-center gap-1.5">
                  <h3 className="font-extrabold text-sm sm:text-base text-[#263B50] uppercase tracking-wide">
                    Jumat
                  </h3>
                  {currentToday === 'Jumat' && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" title="Hari Ini" />
                  )}
                </div>
                <div className="space-y-1 flex-1">
                  {schedulePosterData.map((slot, idx) => (
                    <div
                      key={idx}
                      className={`h-7 sm:h-8 flex items-center justify-center text-center text-[11px] sm:text-xs font-semibold rounded-lg px-1 truncate ${
                        slot.isBreak
                          ? 'text-[#71849A]/40 font-bold'
                          : 'text-[#263B50]'
                      }`}
                    >
                      {slot.jumat.subject}
                      {slot.jumat.teacher && (
                        <span className="text-[#5A9FE8] ml-1 font-normal">
                          ({slot.jumat.teacher})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Empty 4th slot to maintain perfect column alignment with row 1 */}
              <div className="hidden lg:block" />
            </div>
          </div>
        </div>
      ) : (
        /* ============================================================ */
        /* VIEW 2: MODE HARIAN & FILTER */
        /* ============================================================ */
        <div className="space-y-5">
          {/* Day Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {days.map((day) => {
              const isSelected = activeDay === day;
              const isToday = currentToday === day;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setActiveDay(day)}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#5A9FE8] text-white shadow-xs'
                      : 'bg-white text-[#71849A] hover:text-[#263B50] border border-[#E4EEF8]'
                  }`}
                >
                  <span>{day}</span>
                  {isToday && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400" title="Hari Ini" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Schedule List for Active Day from state */}
          <div className="bg-white rounded-3xl border border-[#E4EEF8] p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E4EEF8]">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#263B50] flex items-center gap-2">
                  <span>Jadwal Pelajaran Hari {activeDay}</span>
                  {activeDay === currentToday && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DCEEFF] text-[#263B50] border border-[#B9DCFF]">
                      Hari Ini
                    </span>
                  )}
                </h2>
                <p className="text-xs text-[#71849A]">
                  Daftar sesi mata pelajaran kelas X DKV 1 • Klik ikon pensil untuk mengedit nama mapel & guru.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setNewScheduleForm((prev) => ({ ...prev, day: activeDay }));
                  setIsAddScheduleModalOpen(true);
                }}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#5A9FE8] hover:bg-[#468ed9] text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Jam Pelajaran</span>
              </button>
            </div>

            <div className="space-y-2">
              {state.schedules
                .filter((s) => s.day === activeDay)
                .sort((a, b) => a.period - b.period)
                .map((item, idx) => {
                  if (item.isBreak) {
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-2xl bg-rose-50/60 border border-dashed border-rose-200 text-rose-700 text-xs font-bold"
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-rose-400" />
                          <span>{item.startTime} - {item.endTime}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span>{item.subject || 'Istirahat Kelas'}</span>
                          <button
                            type="button"
                            onClick={() => setEditingScheduleItem(item)}
                            className="p-1 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-100/50"
                            title="Edit Sesi Istirahat"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={item.id}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl bg-[#F7FBFF] border border-[#E4EEF8] hover:border-[#83BDF5] hover:bg-[#DEF0FC]/20 transition-all gap-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#DCEEFF] flex items-center justify-center font-black text-xs text-[#263B50] shrink-0">
                          {item.period > 0 ? item.period : idx + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-sm text-[#263B50]">
                              {item.subject}
                            </h4>
                            {item.room && (
                              <span className="text-[10px] bg-white border border-[#E4EEF8] text-[#71849A] px-2 py-0.5 rounded-full font-medium">
                                {item.room}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-[#71849A]">
                            Guru: <strong className="text-[#263B50] font-semibold">{item.teacher || '-'}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E4EEF8]/60">
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-[#E4EEF8] text-xs font-semibold text-[#263B50]">
                          <Clock className="w-3.5 h-3.5 text-[#5A9FE8]" />
                          <span>{item.startTime} - {item.endTime}</span>
                        </div>

                        {/* Quick Edit & Delete Mapel */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setEditingScheduleItem(item)}
                            className="p-1.5 rounded-xl bg-white hover:bg-[#DCEEFF] border border-[#E4EEF8] text-[#5A9FE8] transition-colors"
                            title="Edit Mata Pelajaran"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Hapus sesi pelajaran ${item.subject}?`)) {
                                deleteSchedule(item.id);
                                showToast(`Sesi ${item.subject} berhasil dihapus.`);
                              }
                            }}
                            className="p-1.5 rounded-xl bg-white hover:bg-rose-50 border border-[#E4EEF8] text-rose-500 transition-colors"
                            title="Hapus Sesi Pelajaran"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#263B50] text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MODAL EDIT SESI MAPEL */}
      {editingScheduleItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative max-w-md w-full bg-white rounded-[32px] border-2 border-[#B9DCFF] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E4EEF8]">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#5A9FE8]" />
                <h3 className="font-black text-base text-[#263B50]">Edit Mata Pelajaran</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingScheduleItem(null)}
                className="p-1 rounded-lg text-[#71849A] hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateSchedule(editingScheduleItem.id, editingScheduleItem);
                showToast(`Jadwal ${editingScheduleItem.subject} berhasil diperbarui!`);
                setEditingScheduleItem(null);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-[#263B50] mb-1">Mata Pelajaran *</label>
                <input
                  type="text"
                  required
                  value={editingScheduleItem.subject}
                  onChange={(e) => setEditingScheduleItem({ ...editingScheduleItem, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] focus:bg-white text-xs font-semibold text-[#263B50] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#263B50] mb-1">Guru Pengampu</label>
                <input
                  type="text"
                  placeholder="Contoh: Pak Derri, Bu Amelia..."
                  value={editingScheduleItem.teacher || ''}
                  onChange={(e) => setEditingScheduleItem({ ...editingScheduleItem, teacher: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] focus:bg-white text-xs text-[#263B50] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#263B50] mb-1">Hari</label>
                  <select
                    value={editingScheduleItem.day}
                    onChange={(e) => setEditingScheduleItem({ ...editingScheduleItem, day: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] text-xs text-[#263B50] outline-none"
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
                    min={0}
                    max={12}
                    value={editingScheduleItem.period}
                    onChange={(e) => setEditingScheduleItem({ ...editingScheduleItem, period: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] text-xs text-[#263B50] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#263B50] mb-1">Jam Mulai</label>
                  <input
                    type="text"
                    placeholder="07.15"
                    value={editingScheduleItem.startTime}
                    onChange={(e) => setEditingScheduleItem({ ...editingScheduleItem, startTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] text-xs text-[#263B50] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#263B50] mb-1">Jam Selesai</label>
                  <input
                    type="text"
                    placeholder="08.00"
                    value={editingScheduleItem.endTime}
                    onChange={(e) => setEditingScheduleItem({ ...editingScheduleItem, endTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] text-xs text-[#263B50] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#263B50] mb-1">Ruangan / Tempat</label>
                <input
                  type="text"
                  placeholder="Contoh: Lab Komputer DKV, Lapangan..."
                  value={editingScheduleItem.room || ''}
                  onChange={(e) => setEditingScheduleItem({ ...editingScheduleItem, room: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] text-xs text-[#263B50] outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-[#E4EEF8]">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Hapus sesi ini?`)) {
                      deleteSchedule(editingScheduleItem.id);
                      showToast('Sesi pelajaran berhasil dihapus.');
                      setEditingScheduleItem(null);
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
                    onClick={() => setEditingScheduleItem(null)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#71849A] hover:bg-slate-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#5A9FE8] hover:bg-[#468ed9] text-white text-xs font-black shadow-md shadow-[#5A9FE8]/30 transition-all flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Simpan</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH SESI MAPEL BARU */}
      {isAddScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative max-w-md w-full bg-white rounded-[32px] border-2 border-[#B9DCFF] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E4EEF8]">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#5A9FE8]" />
                <h3 className="font-black text-base text-[#263B50]">Tambah Mapel Hari {newScheduleForm.day}</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddScheduleModalOpen(false)}
                className="p-1 rounded-lg text-[#71849A] hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newScheduleForm.subject.trim()) return;
                addSchedule(newScheduleForm);
                showToast(`Mata pelajaran ${newScheduleForm.subject} berhasil ditambahkan!`);
                setIsAddScheduleModalOpen(false);
                setNewScheduleForm({
                  day: activeDay,
                  period: 1,
                  startTime: '07.15',
                  endTime: '08.00',
                  subject: '',
                  teacher: '',
                  room: 'Ruang X DKV 1',
                  isBreak: false,
                });
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-[#263B50] mb-1">Mata Pelajaran *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Desain Komunikasi Visual"
                  value={newScheduleForm.subject}
                  onChange={(e) => setNewScheduleForm({ ...newScheduleForm, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] focus:bg-white text-xs font-semibold text-[#263B50] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#263B50] mb-1">Guru Pengampu</label>
                <input
                  type="text"
                  placeholder="Contoh: Pak Derri"
                  value={newScheduleForm.teacher || ''}
                  onChange={(e) => setNewScheduleForm({ ...newScheduleForm, teacher: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] text-xs text-[#263B50] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#263B50] mb-1">Hari</label>
                  <select
                    value={newScheduleForm.day}
                    onChange={(e) => setNewScheduleForm({ ...newScheduleForm, day: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] text-xs text-[#263B50] outline-none"
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
                    max={12}
                    value={newScheduleForm.period}
                    onChange={(e) => setNewScheduleForm({ ...newScheduleForm, period: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] text-xs text-[#263B50] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#263B50] mb-1">Waktu Mulai</label>
                  <input
                    type="text"
                    placeholder="07.15"
                    value={newScheduleForm.startTime}
                    onChange={(e) => setNewScheduleForm({ ...newScheduleForm, startTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] text-xs text-[#263B50] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#263B50] mb-1">Waktu Selesai</label>
                  <input
                    type="text"
                    placeholder="08.00"
                    value={newScheduleForm.endTime}
                    onChange={(e) => setNewScheduleForm({ ...newScheduleForm, endTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] text-xs text-[#263B50] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#263B50] mb-1">Ruangan / Tempat</label>
                <input
                  type="text"
                  placeholder="Contoh: Lab Komputer DKV, Ruang Kelas..."
                  value={newScheduleForm.room || ''}
                  onChange={(e) => setNewScheduleForm({ ...newScheduleForm, room: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7FBFF] border border-[#B9DCFF] text-xs text-[#263B50] outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#E4EEF8]">
                <button
                  type="button"
                  onClick={() => setIsAddScheduleModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#71849A] hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#5A9FE8] hover:bg-[#468ed9] text-white text-xs font-black shadow-md shadow-[#5A9FE8]/30 transition-all flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambahkan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL POP-UP POSTER ASLI */}
      {showPosterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative max-w-2xl w-full bg-white rounded-3xl border border-[#E4EEF8] p-5 sm:p-6 shadow-2xl max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-[#E4EEF8] mb-4">
              <div>
                <h3 className="text-base font-bold text-[#263B50]">
                  Poster Jadwal Pelajaran Resmi X DKV 1
                </h3>
                <p className="text-xs text-[#71849A]">
                  Desain asli poster Snoopy & Charlie Brown
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/images/jadwal_poster.png"
                  download="Jadwal_Pelajaran_X_DKV_1.png"
                  className="p-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8] text-[#263B50] hover:bg-[#DCEEFF] transition-colors"
                  title="Unduh Poster HD"
                >
                  <Download className="w-4 h-4 text-[#5A9FE8]" />
                </a>
                <button
                  type="button"
                  onClick={() => setShowPosterModal(false)}
                  className="p-2 rounded-xl bg-[#F7FBFF] border border-[#E4EEF8] text-[#263B50] hover:bg-rose-50 hover:text-rose-600 transition-colors"
                  title="Tutup"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto rounded-2xl border border-[#E4EEF8] bg-[#F7FBFF] flex items-center justify-center p-2">
              <img
                src="/images/jadwal_poster.png"
                alt="Poster Jadwal Resmi X DKV 1"
                className="max-h-[68vh] w-auto object-contain rounded-xl shadow-xs"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
