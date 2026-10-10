'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, Heart, ArrowRight } from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';

export default function PolaroidMemoriesPreview() {
  const { state, likeMemory } = useClassData();

  const previewMemories = state.memories.slice(0, 3);

  return (
    <div className="bg-white rounded-3xl border border-[#D5E8F8] p-5 sm:p-6 shadow-sm shadow-[#B5DCF9]/20">
      <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#E0EEF9]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#D8ECFC] border border-[#B5DCF9] flex items-center justify-center text-[#4B96E6]">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-[#1D354D]">
              Mading & Polaroid Momen Kelas
            </h3>
            <p className="text-[11px] text-[#647E99]">Foto candid dan kenangan seru kebersamaan</p>
          </div>
        </div>
        <Link
          href="/galeri"
          className="text-xs font-bold text-[#4B96E6] hover:underline flex items-center gap-1 group"
        >
          <span>Buka Galeri Lengkap</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {previewMemories.map((mem, idx) => {
          const rotations = ['rotate-1', '-rotate-1', 'rotate-0'];
          return (
            <div
              key={mem.id}
              className={`group bg-[#F7FBFF] p-3.5 pb-4 rounded-2xl border border-[#E0EEF9] shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${rotations[idx]} relative`}
            >
              {/* Cute Washi Tape */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#D8ECFC]/90 border border-[#B5DCF9] rounded-xs rotate-1 pointer-events-none" />

              <div className="overflow-hidden rounded-xl aspect-4/3 mb-2.5 relative bg-slate-100">
                <img
                  src={mem.imageUrl}
                  alt={mem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex items-start justify-between gap-1 mb-1">
                <h4 className="font-bold text-xs text-[#1D354D] truncate group-hover:text-[#4B96E6] transition-colors">
                  {mem.title}
                </h4>
                <button
                  type="button"
                  onClick={() => likeMemory(mem.id)}
                  className="flex items-center gap-0.5 text-[11px] text-rose-500 font-bold shrink-0 hover:scale-110 active:scale-95 transition-transform"
                >
                  <Heart className="w-3 h-3 fill-rose-500" />
                  <span>{mem.likes}</span>
                </button>
              </div>

              <p className="text-[11px] text-[#647E99] line-clamp-1">
                {mem.caption}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
