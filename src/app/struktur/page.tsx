'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  GraduationCap,
  Crown,
  Shield,
  BookOpen,
  DollarSign,
  UtensilsCrossed,
  Download,
  X,
  Image as ImageIcon,
  Sparkles,
  Music,
} from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';
import { PastelCloud, PastelStar } from '@/components/common/DecorativeElements';

export default function StrukturPage() {
  const { state } = useClassData();
  const [showPosterModal, setShowPosterModal] = useState(false);

  // Authentic MBG team from poster
  const mbgTeam = ['Riza', 'Zalqi', 'Ilham', 'Akbar', 'Andre'];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-[#E4EEF8] shadow-xs print:hidden">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#71849A] block">
            Kepengurusan Resmi Kelas X DKV 1
          </span>
          <h2 className="text-base sm:text-lg font-extrabold text-[#263B50]">
            Bagan Struktur Organisasi Kelas
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPosterModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold bg-[#DCEEFF] text-[#263B50] border border-[#B9DCFF] hover:bg-[#B9DCFF] transition-colors"
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#5A9FE8]" />
            <span>Foto Poster Asli</span>
          </button>
          <a
            href="/images/struktur_poster.jpg"
            download="Struktur_Organisasi_X_DKV_1.jpg"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold bg-[#F7FBFF] text-[#263B50] border border-[#E4EEF8] hover:bg-[#DCEEFF] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#5A9FE8]" />
            <span>Unduh HD</span>
          </a>
        </div>
      </div>

      {/* ============================================================ */}
      {/* POSTER STRUKTUR KELAS (SESUAI POSTER RESMI SNOOPY X DKV 1) */}
      {/* ============================================================ */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#65A7D8] via-[#85BFEA] to-[#B1D8F4] border-2 border-[#B9DCFF] p-4 sm:p-8 lg:p-10 shadow-lg space-y-8">
        {/* Decorative Floating Clouds & Stars */}
        <PastelCloud className="absolute -top-12 -left-10 w-52 opacity-60 pointer-events-none" />
        <PastelCloud className="absolute top-8 -right-12 w-48 opacity-60 pointer-events-none" />
        <PastelStar className="absolute top-12 left-1/4 w-5 h-5 text-white/90 drop-shadow-sm" />
        <PastelStar className="absolute top-28 right-1/4 w-6 h-6 text-white/90 drop-shadow-sm" />
        <PastelStar className="absolute bottom-24 left-10 w-5 h-5 text-white/90 drop-shadow-sm" />

        {/* 1. CHALKBOARD HEADER: STRUKTUR KELAS */}
        <div className="max-w-md mx-auto relative z-10">
          <div className="bg-[#244E3B] border-8 border-[#C98E53] rounded-2xl p-4 sm:p-6 text-center shadow-2xl relative">
            <span className="absolute top-1 left-2 text-white/40 text-xs font-mono">★</span>
            <span className="absolute bottom-1 right-2 text-white/40 text-xs font-mono">★</span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-widest uppercase font-serif drop-shadow-md">
              STRUKTUR KELAS
            </h1>
            <p className="text-[10px] sm:text-xs text-[#A3D1B5] font-semibold tracking-wider uppercase mt-1">
              X DKV 1 • TAHUN AJARAN {state.classInfo.academicYear}
            </p>
          </div>
        </div>

        {/* 2. RED DOGHOUSE SHAPED ORGANIZATIONAL TREE CONTAINER */}
        <div className="max-w-3xl mx-auto relative z-10 bg-[#DE3C31] border-4 border-[#BA251B] rounded-3xl p-5 sm:p-8 shadow-2xl text-center space-y-6">
          {/* LEVEL 1: WALI KELAS */}
          <div className="space-y-1.5 flex flex-col items-center">
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-emerald-100 drop-shadow-sm flex items-center gap-1">
              <GraduationCap className="w-4 h-4 text-emerald-200" />
              <span>WALI KELAS</span>
            </span>
            <div className="w-full max-w-xs bg-white text-[#1E3A2F] py-2.5 px-4 rounded-xl shadow-md border-2 border-emerald-100 font-black text-sm sm:text-base tracking-wide uppercase">
              IBU MARLENI
            </div>
          </div>

          {/* LEVEL 2: KETUA KELAS & WAKIL KETUA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
            {/* KETUA KELAS */}
            <div className="space-y-1.5 flex flex-col items-center">
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-emerald-100 drop-shadow-sm flex items-center gap-1">
                <Crown className="w-4 h-4 text-amber-200" />
                <span>KETUA KELAS</span>
              </span>
              <div className="w-full bg-white text-[#1E3A2F] py-2.5 px-4 rounded-xl shadow-md border-2 border-emerald-100 font-black text-xs sm:text-sm tracking-wide uppercase">
                AHMAD ZALQI
              </div>
            </div>

            {/* WAKIL KETUA */}
            <div className="space-y-1.5 flex flex-col items-center">
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-emerald-100 drop-shadow-sm flex items-center gap-1">
                <Shield className="w-4 h-4 text-emerald-200" />
                <span>WAKIL KETUA</span>
                <Music className="w-3.5 h-3.5 text-amber-200 ml-1" />
              </span>
              <div className="w-full bg-white text-[#1E3A2F] py-2.5 px-4 rounded-xl shadow-md border-2 border-emerald-100 font-black text-xs sm:text-sm tracking-wide uppercase">
                SRI MULYANINGTYAS
              </div>
            </div>
          </div>

          {/* LEVEL 3: SEKRETARIS & BENDAHARA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
            {/* SEKRETARIS (2 SISWA) */}
            <div className="space-y-2 flex flex-col items-center">
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-emerald-100 drop-shadow-sm flex items-center gap-1">
                <BookOpen className="w-4 h-4 text-emerald-200" />
                <span>SEKRETARIS</span>
              </span>
              <div className="w-full space-y-1.5">
                <div className="w-full bg-white text-[#1E3A2F] py-2 px-3 rounded-xl shadow-sm border border-emerald-100 font-black text-xs sm:text-sm tracking-wide uppercase flex items-center justify-between">
                  <span>DEA ANGGIA</span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">Sekre 1</span>
                </div>
                <div className="w-full bg-white text-[#1E3A2F] py-2 px-3 rounded-xl shadow-sm border border-emerald-100 font-black text-xs sm:text-sm tracking-wide uppercase flex items-center justify-between">
                  <span>KESYA</span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">Sekre 2</span>
                </div>
              </div>
            </div>

            {/* BENDAHARA (2 SISWA) */}
            <div className="space-y-2 flex flex-col items-center">
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-emerald-100 drop-shadow-sm flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-amber-200" />
                <span>BENDAHARA</span>
              </span>
              <div className="w-full space-y-1.5">
                <div className="w-full bg-white text-[#1E3A2F] py-2 px-3 rounded-xl shadow-sm border border-emerald-100 font-black text-xs sm:text-sm tracking-wide uppercase flex items-center justify-between">
                  <span>ADEL</span>
                  <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full">Bendahara 1</span>
                </div>
                <div className="w-full bg-white text-[#1E3A2F] py-2 px-3 rounded-xl shadow-sm border border-emerald-100 font-black text-xs sm:text-sm tracking-wide uppercase flex items-center justify-between">
                  <span>SELLY</span>
                  <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full">Bendahara 2</span>
                </div>
              </div>
            </div>
          </div>

          {/* LEVEL 4: PENGAMBIL MBG (TIM MAKAN BERGIZI GRATIS) */}
          <div className="pt-4 border-t-2 border-white/20 space-y-3">
            <div className="inline-block">
              <span className="px-4 py-1.5 rounded-full bg-[#35B3CD] text-white text-xs sm:text-sm font-black tracking-widest uppercase shadow-sm border border-white flex items-center gap-1.5">
                <UtensilsCrossed className="w-4 h-4" />
                <span>PENGAMBIL MBG</span>
              </span>
            </div>

            {/* Grid 3 di atas, 2 di bawah sesuai poster */}
            <div className="space-y-2 max-w-lg mx-auto">
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {mbgTeam.slice(0, 3).map((name) => (
                  <div
                    key={name}
                    className="bg-white text-[#1E3A2F] py-2 px-2.5 rounded-xl shadow-sm font-black text-xs sm:text-sm tracking-wide uppercase"
                  >
                    {name}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-xs mx-auto">
                {mbgTeam.slice(3).map((name) => (
                  <div
                    key={name}
                    className="bg-white text-[#1E3A2F] py-2 px-2.5 rounded-xl shadow-sm font-black text-xs sm:text-sm tracking-wide uppercase"
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. FOOTER INFO CARD */}
        <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-white text-center shadow-md relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left text-xs text-[#263B50]">
            <p className="font-bold">Kelas X Desain Komunikasi Visual 1</p>
            <p className="text-[#71849A] text-[11px]">Bagan resmi kepengurusan kelas & tim operasional MBG</p>
          </div>
          <Link
            href="/anggota"
            className="px-4 py-2 rounded-xl bg-[#5A9FE8] text-white text-xs font-bold hover:bg-[#468ed9] transition-colors shadow-xs"
          >
            Lihat 35 Warga Kelas
          </Link>
        </div>
      </div>

      {/* MODAL POP-UP POSTER STRUKTUR ASLI */}
      {showPosterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative max-w-2xl w-full bg-white rounded-3xl border border-[#E4EEF8] p-5 sm:p-6 shadow-2xl max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-[#E4EEF8] mb-4">
              <div>
                <h3 className="text-base font-bold text-[#263B50]">
                  Poster Struktur Organisasi Resmi X DKV 1
                </h3>
                <p className="text-xs text-[#71849A]">
                  Desain asli poster Snoopy Doghouse & Peanuts
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/images/struktur_poster.jpg"
                  download="Struktur_Organisasi_X_DKV_1.jpg"
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
                src="/images/struktur_poster.jpg"
                alt="Poster Struktur Resmi X DKV 1"
                className="max-h-[68vh] w-auto object-contain rounded-xl shadow-xs"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
