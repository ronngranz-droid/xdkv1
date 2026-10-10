'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Users, ShieldCheck, Heart } from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';
import { getCurrentIndonesianDay } from '@/lib/utils/time';
import { DayOfWeek } from '@/types';

export default function TodayPicketCard() {
  const { state } = useClassData();
  const [currentDay, setCurrentDay] = useState<DayOfWeek>('Senin');

  useEffect(() => {
    setCurrentDay(getCurrentIndonesianDay());
  }, []);

  const picketGroup = state.picketDays.find((p) => p.day === currentDay);
  const dutyStudents = state.students.filter((s) => s.picketDay === currentDay);

  return (
    <div className="bg-white rounded-3xl border border-[#E4EEF8] p-5 sm:p-6 shadow-sm shadow-[#B9DCFF]/20 flex flex-col h-full justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-5 pb-4 border-b border-[#E4EEF8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DCEEFF] border border-[#B9DCFF] flex items-center justify-center text-[#263B50]">
              <Sparkles className="w-5 h-5 text-[#5A9FE8]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-[#263B50]">Piket Hari Ini</h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#DCEEFF] text-[#263B50] border border-[#B9DCFF]">
                  {currentDay}
                </span>
              </div>
              <p className="text-xs text-[#71849A]">{picketGroup?.groupName || `Regu ${currentDay}`}</p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F7FBFF] text-[#5A9FE8] border border-[#E4EEF8]">
            <Users className="w-3.5 h-3.5" />
            <span>{dutyStudents.length > 0 ? `${dutyStudents.length} Siswa` : 'Regu Harian'}</span>
          </span>
        </div>

        {/* Group Members */}
        <div className="mb-5 p-4 rounded-2xl bg-[#F7FBFF] border border-[#E4EEF8]">
          <span className="text-[11px] font-bold text-[#71849A] block mb-2.5 uppercase tracking-wide">
            {dutyStudents.length > 0 ? `Petugas Regu ${currentDay}` : 'Petugas Bertugas Hari Ini'}
          </span>
          {dutyStudents.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {dutyStudents.map((std) => (
                <div
                  key={std.id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E4EEF8] text-xs font-semibold text-[#263B50] shadow-2xs hover:border-[#83BDF5] transition-colors"
                  title={std.name}
                >
                  <div className="w-5 h-5 rounded-full bg-[#DCEEFF] flex items-center justify-center text-[10px] font-bold text-[#263B50] overflow-hidden">
                    {std.avatarUrl ? (
                      <img src={std.avatarUrl} alt={std.name} className="w-full h-full object-cover" />
                    ) : (
                      std.name.charAt(0)
                    )}
                  </div>
                  <span className="truncate max-w-[120px]">{std.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#71849A] leading-relaxed">
              Jadwal pembagian regu piket hari {currentDay} sedang dipersiapkan oleh pengurus kelas.
            </p>
          )}
        </div>

        {/* Friendly Classroom Note */}
        <div className="p-3.5 rounded-2xl bg-[#DCEEFF]/40 border border-[#B9DCFF]/60 flex items-start gap-2.5 text-xs text-[#263B50]">
          <Heart className="w-4 h-4 text-[#5A9FE8] shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[11px]">
            Mari jaga kenyamanan dan kebersihan ruang kelas {state.classInfo.name} bersama-sama agar suasana belajar selalu asyik dan kompak.
          </p>
        </div>
      </div>

      {/* Footer link to full picket poster */}
      <div className="pt-4 mt-5 border-t border-[#E4EEF8] flex items-center justify-between">
        <span className="text-xs text-[#71849A]">Lihat regu piket Senin – Jumat</span>
        <Link
          href="/piket"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5A9FE8] hover:text-[#263B50] group transition-colors"
        >
          <span>Papan Jadwal Piket</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
