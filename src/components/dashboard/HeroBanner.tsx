'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  Sparkles,
  Camera,
  Users,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';
import {
  PastelStar,
  PastelSparkle,
  PastelClover,
  PastelBubble,
} from '@/components/common/DecorativeElements';

export default function HeroBanner() {
  const { state } = useClassData();

  // The 3 authentic class group photos provided by the user
  const photos = [
    { url: '/images/gallery3.jpg', label: 'Kostum Kreasi' },
    { url: '/images/gallery1.jpg', label: 'Koridor Kelas' },
    { url: '/images/gallery2.png', label: 'Ruang Kelas' },
  ];
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  return (
    <div className="relative overflow-hidden rounded-3xl sm:rounded-[36px] border-2 border-[#B9DCFF] shadow-lg shadow-[#83BDF5]/20 group">
      {/* Background Photo with Cinematic Dark/Pastel Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={photos[selectedPhoto].url}
          alt={`Foto Bersama Kelas ${state.classInfo.name}`}
          className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.10] transition-all duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A365D]/30 via-transparent to-[#0D9488]/20" />
      </div>

      {/* Cute Floating Decorative Elements over the photo */}
      <PastelClover className="absolute top-6 left-8 z-10 w-7 h-7 drop-shadow-md animate-bounce" />
      <PastelStar className="absolute top-8 right-12 z-10 w-6 h-6 text-yellow-300 drop-shadow-md animate-pulse" />
      <PastelSparkle className="absolute bottom-20 left-10 z-10 w-5 h-5 text-cyan-200 drop-shadow-md" />
      <PastelBubble className="absolute top-1/3 right-8 z-10" size={18} />
      <PastelBubble className="absolute bottom-1/4 left-1/4 z-10" size={14} />

      {/* Main Content (Center Typography matching TikTok screenshot) */}
      <div className="relative z-10 px-6 py-14 sm:py-20 md:py-24 lg:py-28 flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6">
        {/* Cute Pill Badge with Gemoy Bounce */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white text-xs font-bold shadow-md animate-bounce-gemoy hover:scale-105 transition-transform cursor-default">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin-slow" />
          <span>Website Resmi Kelas {state.classInfo.name}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>35 Siswa Kompak</span>
        </div>

        {/* Big Bold Typography from Screenshot */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-widest uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] font-sans">
            WELCOME TO
          </h1>
          <div className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-wider uppercase text-[#5AB2FF] drop-shadow-[0_6px_18px_rgba(0,0,0,0.95)] select-none">
            {state.classInfo.name}
          </div>
        </div>

        {/* Slogan Quote with Drop Shadow */}
        <p className="text-xs sm:text-base md:text-lg text-white font-semibold italic max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] px-4 leading-relaxed">
          &ldquo;{state.classInfo.slogan}&rdquo;
        </p>

        {/* Quick Action Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/jadwal"
            className="px-5 py-2.5 rounded-2xl bg-[#5A9FE8] text-white text-xs sm:text-sm font-bold shadow-lg hover:bg-[#468ed9] hover:scale-105 transition-all flex items-center gap-2 border border-white/30"
          >
            <CalendarDays className="w-4 h-4" />
            <span>Jadwal Pelajaran</span>
          </Link>
          <Link
            href="/galeri"
            className="px-5 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md text-[#263B50] text-xs sm:text-sm font-bold shadow-lg hover:bg-white hover:scale-105 transition-all flex items-center gap-2 border border-white/40"
          >
            <Camera className="w-4 h-4 text-[#5A9FE8]" />
            <span>Mading Foto Kelas</span>
          </Link>
          <Link
            href="/struktur"
            className="px-5 py-2.5 rounded-2xl bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-bold shadow-lg hover:bg-white/30 hover:scale-105 transition-all flex items-center gap-2 border border-white/30"
          >
            <Users className="w-4 h-4 text-emerald-300" />
            <span>Struktur Kelas</span>
          </Link>
        </div>

        {/* Photo Switcher in Corner */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[11px] text-white/80 font-medium drop-shadow-sm">Ganti Foto Sampul:</span>
          {photos.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedPhoto(idx)}
              className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all backdrop-blur-md ${
                selectedPhoto === idx
                  ? 'bg-white text-[#263B50] shadow-md scale-105'
                  : 'bg-black/40 text-white/80 hover:bg-black/60 border border-white/20'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
