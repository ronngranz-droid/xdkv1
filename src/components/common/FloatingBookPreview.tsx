'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, BookOpen, ChevronRight, Sparkles } from 'lucide-react';

export default function FloatingBookPreview() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-16 right-4 sm:bottom-6 sm:right-6 z-30 p-3 rounded-full bg-[#8BB4E7] text-white shadow-xl hover:scale-105 transition-all border-2 border-white flex items-center gap-2 group"
        title="Buka Catatan Kelas"
      >
        <BookOpen className="w-5 h-5 animate-pulse" />
        <span className="text-xs font-bold hidden sm:inline-block pr-1">Catatan X DKV 1</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-16 right-3 sm:bottom-6 sm:right-6 z-30 max-w-[340px] w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-2xl border-2 border-white/90 ring-4 ring-[#8BB4E7]/20 transition-all">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Tutup preview"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3.5">
          {/* Cute Open Storybook Icon matching reference */}
          <div className="shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#DEF0FC] to-[#FFF3DC] border border-[#BEE0F9] flex items-center justify-center shadow-xs">
            <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
              {/* Left page */}
              <path
                d="M8 12C14 10 22 12 24 16V38C22 34 14 32 8 34V12Z"
                fill="#FFFFFF"
                stroke="#8BB4E7"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {/* Right page */}
              <path
                d="M40 12C34 10 26 12 24 16V38C26 34 34 32 40 34V12Z"
                fill="#F8FBFE"
                stroke="#8BB4E7"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {/* Lines */}
              <line x1="12" y1="18" x2="20" y2="18" stroke="#BEE0F9" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="12" y1="24" x2="20" y2="24" stroke="#BEE0F9" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="28" y1="18" x2="36" y2="18" stroke="#BEE0F9" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="28" y1="24" x2="36" y2="24" stroke="#BEE0F9" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Book Info */}
          <div className="pr-4">
            <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#5A9FE8]">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Digital Storybook</span>
            </div>
            <h4 className="text-sm font-extrabold text-[#263B50] leading-snug">
              X DKV 1 Chronicles
            </h4>
            <p className="text-[11px] text-[#647E99] mt-0.5 leading-relaxed line-clamp-2">
              Jelajahi jadwal harian, struktur Snoopy, piket harian, dan kirim menfess anonim ke teman sekelas.
            </p>
          </div>
        </div>

        {/* Action Buttons styled like the reference */}
        <div className="flex items-center gap-2 mt-3.5 pt-2 border-t border-[#DCEEFB]">
          <Link
            href="/jadwal"
            className="flex-1 py-1.5 px-3 rounded-full bg-white border border-[#BEE0F9] text-[#263B50] hover:bg-[#DEF0FC] text-center text-xs font-bold transition-all shadow-xs"
          >
            Lihat Jadwal
          </Link>
          <Link
            href="/menfess"
            className="flex-1 py-1.5 px-3 rounded-full bg-[#8BB4E7] hover:bg-[#7BAEDB] text-white text-center text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1"
          >
            <span>Menfess</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
