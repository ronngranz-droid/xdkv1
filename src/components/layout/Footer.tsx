'use client';

import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';
import { PastelCloud, PastelStar } from '@/components/common/DecorativeElements';

export default function Footer() {
  const { state } = useClassData();

  return (
    <footer className="relative mt-auto border-t border-[#DCEEFB] bg-white/80 backdrop-blur-md py-6 sm:py-8 overflow-hidden text-center select-none">
      {/* Soft background accents */}
      <PastelCloud className="absolute -top-6 -left-10 w-44 opacity-25 pointer-events-none" />
      <PastelStar className="absolute top-4 right-16 w-4 h-4 text-[#8BB4E7] opacity-60 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#647E99]">
        <div className="flex items-center gap-2">
          <span className="font-black text-[#263B50] tracking-wide text-sm">
            {state.classInfo.name}
          </span>
          <span>•</span>
          <span className="italic font-medium text-[#647E99]">
            &ldquo;{state.classInfo.slogan}&rdquo;
          </span>
        </div>

        <p className="flex items-center gap-1.5 text-[11px] text-[#647E99]">
          <span>Dibuat dengan</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>untuk kebersamaan seluruh warga kelas {state.classInfo.name}</span>
        </p>
      </div>
    </footer>
  );
}
