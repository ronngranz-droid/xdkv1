'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Users,
  Clock,
  Heart,
  CalendarDays,
  ExternalLink,
  Download,
  CheckCircle2,
  Smile,
  ShieldCheck,
} from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';
import { DayOfWeek } from '@/types';
import { getCurrentIndonesianDay } from '@/lib/utils/time';
import {
  PastelCloud,
  PastelStar,
  PastelClover,
  PastelSparkle,
} from '@/components/common/DecorativeElements';

export default function PiketPage() {
  const { state } = useClassData();
  const [currentToday, setCurrentToday] = useState<DayOfWeek>('Senin');
  const [selectedDayFilter, setSelectedDayFilter] = useState<DayOfWeek | 'Semua'>('Semua');
  const [showPosterModal, setShowPosterModal] = useState(false);

  useEffect(() => {
    setCurrentToday(getCurrentIndonesianDay());
  }, []);

  const days: DayOfWeek[] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

  // Authentic Roster per Day from the Snoopy Poster
  const authenticPicketSchedule: Record<
    DayOfWeek,
    { members: string[]; note: string; color: string; badgeColor: string }
  > = {
    Senin: {
      members: ['Kesya', 'Suwitri', 'Sasa', 'Filsya', 'Reva', 'Umy'],
      note: '6 Siswa • Regu Penyapu & Penata Meja',
      color: '#DEF0FC',
      badgeColor: 'bg-[#8BB4E7] text-white',
    },
    Selasa: {
      members: ['Maya', 'Nurhaliza', 'Yola', 'Emi', 'Sarlia', 'Sandra', 'Melany'],
      note: '7 Siswa • Regu Pel & Kebersihan Lantai',
      color: '#E8F5E9',
      badgeColor: 'bg-emerald-500 text-white',
    },
    Rabu: {
      members: ['Tiara', 'Dea', 'Wildea', 'Evaa', 'Zilfa', 'Velencya', 'Aprilia'],
      note: '7 Siswa • Regu Papan Tulis & Jendela',
      color: '#FEF3C7',
      badgeColor: 'bg-amber-500 text-white',
    },
    Kamis: {
      members: ['Adel', 'Selly', 'Alinda', 'Pina', 'Sahrini', 'Uya', 'Azizah'],
      note: '7 Siswa • Regu Kerapian Kelas & Sampah',
      color: '#FCE7F3',
      badgeColor: 'bg-pink-500 text-white',
    },
    Jumat: {
      members: ['Natasya', 'Dheana', 'Juwita'],
      note: '3 Siswa • Regu Operasi Bersih Akhir Pekan',
      color: '#EDE9FE',
      badgeColor: 'bg-indigo-500 text-white',
    },
  };

  const displayedDays =
    selectedDayFilter === 'Semua' ? days : [selectedDayFilter];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* 1. Header Banner matching Dreamy Pastel Sky Blue Theme */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-[#DCEEFB] p-6 sm:p-8 shadow-md shadow-[#8BB4E7]/15">
        <PastelCloud className="absolute -top-10 -right-10 w-52 opacity-35" />
        <PastelStar className="absolute top-6 left-1/3 w-5 h-5 text-[#8BB4E7] animate-pulse" />
        <PastelClover className="absolute bottom-4 right-1/4 w-6 h-6 animate-bounce" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DEF0FC] border border-[#BEE0F9] text-xs font-bold text-[#263B50]">
              <Sparkles className="w-3.5 h-3.5 text-[#5A9FE8]" />
              <span>Jadwal Regu Piket • Kelas X DKV 1</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>30 Siswa Piket • 5 Siswa Tim MBG</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#263B50] tracking-tight">
              Papan Jadwal Piket Kebersihan
            </h1>
            <p className="text-xs sm:text-sm text-[#647E99] max-w-2xl leading-relaxed">
              Jadwal resmi pembagian regu piket harian kelas {state.classInfo.name} sesuai poster mading Snoopy & Charlie Brown. Kelas bersih dan rapi membuat suasana berkarya selalu produktif!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 self-start md:self-auto">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#DEF0FC] border border-[#BEE0F9] text-xs font-bold text-[#263B50]">
              <Clock className="w-4 h-4 text-[#5A9FE8]" />
              <span>Pagi & Pulang Sekolah</span>
            </div>
            <button
              type="button"
              onClick={() => setShowPosterModal(true)}
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-2xl bg-[#8BB4E7] hover:bg-[#7BAEDB] text-white text-xs font-bold shadow-md shadow-[#8BB4E7]/30 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Buka Poster Asli</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Quick Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-2xl border border-[#DCEEFB] shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-[#647E99] mr-1 hidden sm:inline">Pilih Hari:</span>
          {(['Semua', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setSelectedDayFilter(d)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedDayFilter === d
                  ? 'bg-[#8BB4E7] text-white shadow-xs scale-105'
                  : 'bg-[#DEF0FC]/60 text-[#263B50] hover:bg-[#DEF0FC]'
              }`}
            >
              {d === 'Semua' ? 'Semua Hari (5 Regu)' : d}
              {d === currentToday && (
                <span className="ml-1 text-[10px] opacity-80">(Hari Ini)</span>
              )}
            </button>
          ))}
        </div>

        <div className="text-xs font-bold text-[#647E99] flex items-center gap-1.5">
          <CalendarDays className="w-3.5 h-3.5 text-[#5A9FE8]" />
          <span>Tahun Ajaran {state.classInfo.academicYear}</span>
        </div>
      </div>

      {/* 3. The 5 Columns Picket Grid Matching Poster Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        {displayedDays.map((day) => {
          const config = authenticPicketSchedule[day];
          const isToday = currentToday === day;

          return (
            <div
              key={day}
              className={`rounded-3xl border transition-all flex flex-col justify-between overflow-hidden bg-white shadow-md ${
                isToday
                  ? 'border-[#8BB4E7] ring-4 ring-[#8BB4E7]/25 shadow-lg shadow-[#8BB4E7]/20 scale-[1.02]'
                  : 'border-[#DCEEFB] hover:border-[#8BB4E7] hover:shadow-lg'
              }`}
            >
              <div>
                {/* Day Header Banner with Pill */}
                <div
                  className={`p-4 text-center relative border-b ${
                    isToday
                      ? 'bg-gradient-to-r from-[#8BB4E7] to-[#7BAEDB] text-white border-transparent'
                      : 'bg-[#F2F8FD] border-[#DCEEFB] text-[#263B50]'
                  }`}
                >
                  {isToday && (
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-black bg-white text-[#263B50] shadow-xs animate-pulse">
                      Hari Ini
                    </span>
                  )}
                  <h3 className="font-black text-xl tracking-wide uppercase">
                    {day}
                  </h3>
                  <span
                    className={`text-xs font-semibold block mt-0.5 ${
                      isToday ? 'text-white/95' : 'text-[#647E99]'
                    }`}
                  >
                    Regu {day} ({config.members.length} Siswa)
                  </span>
                </div>

                {/* Day Members Section */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#647E99] pb-1.5 border-b border-[#DCEEFB]">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#5A9FE8]" />
                      <span>Petugas Regu</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#DEF0FC] text-[#263B50] text-[10px]">
                      {config.members.length} Siswa
                    </span>
                  </div>

                  {/* List of Member Names in Cute Rounded Capsules */}
                  <div className="space-y-2">
                    {config.members.map((name, idx) => (
                      <div
                        key={name}
                        className="flex items-center justify-between p-2.5 rounded-2xl bg-[#F7FBFF] border border-[#DCEEFB] hover:bg-[#DEF0FC]/40 hover:border-[#8BB4E7] transition-all group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Number Badge */}
                          <span className="w-6 h-6 rounded-full bg-[#DEF0FC] text-[#263B50] group-hover:bg-[#8BB4E7] group-hover:text-white font-black text-xs flex items-center justify-center shrink-0 transition-colors">
                            {idx + 1}
                          </span>
                          <span className="font-extrabold text-[#263B50] text-sm truncate capitalize">
                            {name}
                          </span>
                        </div>

                        {/* Heart / Sparkle Icon */}
                        <Sparkles className="w-3.5 h-3.5 text-[#8BB4E7]/60 group-hover:text-[#5A9FE8] transition-colors shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Day Card Footer */}
              <div className="p-3 bg-[#F7FBFF] border-t border-[#DCEEFB] text-center">
                <span className="text-[11px] font-bold text-[#647E99] block">
                  {isToday ? '⭐ Bertugas Hari Ini' : `Jadwal Rutin Setiap ${day}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Authentic Snoopy Chalkboard Poster Showcase */}
      <div className="rounded-3xl bg-gradient-to-br from-[#2D5A43] to-[#1E3F2E] border-4 border-[#8B5A2B] p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        {/* Cute Floating Decorative Doodles & Badges */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className="text-2xl select-none">⭐</span>
          <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full border border-white/30 backdrop-blur-xs">
            Poster Resmi Kelas X DKV 1
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Poster Description & Character Callout */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-xs">
              <span className="select-none">🐶</span>
              <span>Tema: Snoopy, Charlie Brown & Woodstock</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-wide text-white drop-shadow-md">
              JADWAL PIKET KELAS X DKV 1
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Poster dinding papan tulis kelas dengan foto dokumentasi masing-masing regu piket memakai seragam olahraga biru-hitam dan alat kebersihan sekolah.
            </p>

            {/* Quick summary of 5 squads */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
              <div className="bg-white/10 rounded-2xl p-2.5 border border-white/15 backdrop-blur-xs">
                <span className="text-xs font-bold block text-yellow-300">Senin (6 Siswa)</span>
                <span className="text-[11px] text-white/90">Kesya, Suwitri, Sasa...</span>
              </div>
              <div className="bg-white/10 rounded-2xl p-2.5 border border-white/15 backdrop-blur-xs">
                <span className="text-xs font-bold block text-yellow-300">Selasa (7 Siswa)</span>
                <span className="text-[11px] text-white/90">Maya, Nurhaliza, Yola...</span>
              </div>
              <div className="bg-white/10 rounded-2xl p-2.5 border border-white/15 backdrop-blur-xs">
                <span className="text-xs font-bold block text-yellow-300">Rabu (7 Siswa)</span>
                <span className="text-[11px] text-white/90">Tiara, Dea, Wildea...</span>
              </div>
              <div className="bg-white/10 rounded-2xl p-2.5 border border-white/15 backdrop-blur-xs">
                <span className="text-xs font-bold block text-yellow-300">Kamis (7 Siswa)</span>
                <span className="text-[11px] text-white/90">Adel, Selly, Alinda...</span>
              </div>
              <div className="bg-white/10 rounded-2xl p-2.5 border border-white/15 backdrop-blur-xs">
                <span className="text-xs font-bold block text-yellow-300">Jumat (4 Siswa)</span>
                <span className="text-[11px] text-white/90">Natasya, Dheana, Juwita, Ira</span>
              </div>
              <div className="bg-white/10 rounded-2xl p-2.5 border border-white/15 backdrop-blur-xs flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setShowPosterModal(true)}
                  className="text-xs font-extrabold text-white underline hover:text-yellow-300 transition-colors"
                >
                  Lihat Foto Regu →
                </button>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setShowPosterModal(true)}
                className="px-5 py-2.5 rounded-full bg-white text-[#1E3F2E] text-xs font-black shadow-lg hover:bg-yellow-300 transition-all flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Buka Poster HD Lengkap</span>
              </button>
              <a
                href="/images/jadwal-piket.png"
                download="Jadwal-Piket-X-DKV-1.png"
                className="px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold border border-white/30 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Unduh File Poster</span>
              </a>
            </div>
          </div>

          {/* Right: Poster Image Thumbnail */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              onClick={() => setShowPosterModal(true)}
              className="relative max-w-[280px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 cursor-pointer group hover:scale-105 transition-all"
            >
              <img
                src="/images/jadwal-piket.png"
                alt="Poster Jadwal Piket X DKV 1"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="px-4 py-2 rounded-full bg-white/90 text-[#263B50] text-xs font-black shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-[#5A9FE8]" />
                  <span>Perbesar Poster</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Classroom Etiquette & Tips */}
      <div className="p-5 rounded-3xl bg-white border border-[#DCEEFB] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#647E99]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#DEF0FC] flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5 text-[#8BB4E7]" />
          </div>
          <div>
            <span className="font-extrabold text-[#263B50] block text-sm">
              Pedoman Kebersihan Kelas X DKV 1
            </span>
            <p className="text-xs text-[#647E99] mt-0.5">
              Sapu lantai, bersihkan papan tulis, kosongkan tempat sampah ke tong luar, dan pastikan kipas/lampu mati sebelum pulang.
            </p>
          </div>
        </div>
        <span className="font-bold text-[#8BB4E7] shrink-0 bg-[#DEF0FC] px-4 py-1.5 rounded-full">
          ✨ Bersih itu Keren!
        </span>
      </div>

      {/* Poster Lightbox Modal */}
      {showPosterModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowPosterModal(false)}
        >
          <div
            className="relative max-w-xl w-full bg-white rounded-3xl p-4 shadow-2xl border-2 border-white/80 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-gray-100">
              <h3 className="font-black text-sm text-[#263B50]">
                Poster Jadwal Piket Kebersihan X DKV 1
              </h3>
              <button
                type="button"
                onClick={() => setShowPosterModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-bold transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="max-h-[75vh] overflow-y-auto rounded-2xl">
              <img
                src="/images/jadwal-piket.png"
                alt="Poster Jadwal Piket Full"
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
            <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-500">
                Snoopy, Charlie Brown & Tim Piket X DKV 1
              </span>
              <a
                href="/images/jadwal-piket.png"
                download="Jadwal-Piket-X-DKV-1.png"
                className="px-4 py-1.5 rounded-full bg-[#8BB4E7] text-white text-xs font-bold hover:bg-[#7BAEDB] transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Gambar</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
