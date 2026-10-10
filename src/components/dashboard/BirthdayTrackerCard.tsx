'use client';

import React from 'react';
import Link from 'next/link';
import { Cake, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';

export default function BirthdayTrackerCard() {
  const { state } = useClassData();

  // Find students with birthdays in October
  const octoberBirthdays = state.students.filter(
    (s) => s.birthday && s.birthday.toLowerCase().includes('oktober')
  );

  return (
    <div className="bg-white rounded-3xl border border-[#E4EEF8] p-5 sm:p-6 shadow-sm shadow-[#B9DCFF]/20 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E4EEF8]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500">
              <Cake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#263B50]">
                Ulang Tahun Bulan Ini
              </h3>
              <p className="text-[11px] text-[#71849A]">Edisi Bulan Oktober • Momen perayaan kelas</p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
            {octoberBirthdays.length} Teman
          </span>
        </div>

        {octoberBirthdays.length > 0 ? (
          <div className="space-y-2.5">
            {octoberBirthdays.slice(0, 4).map((std) => (
              <div
                key={std.id}
                className="p-3 rounded-2xl bg-[#F7FBFF] border border-[#E4EEF8] hover:border-rose-200 transition-colors flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#DCEEFF] flex items-center justify-center text-xs font-bold text-[#263B50] overflow-hidden shrink-0">
                    {std.avatarUrl ? (
                      <img src={std.avatarUrl} alt={std.name} className="w-full h-full object-cover" />
                    ) : (
                      std.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#263B50] line-clamp-1">{std.name}</h4>
                    <span className="text-[10px] text-rose-600 font-semibold">{std.birthday}</span>
                  </div>
                </div>

                <Link
                  href="/menfess"
                  className="px-2.5 py-1 rounded-xl bg-white border border-[#E4EEF8] text-[10px] font-bold text-[#5A9FE8] hover:bg-[#DCEEFF] transition-colors shrink-0"
                >
                  Kirim Ucapan
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 px-4 rounded-2xl bg-[#F7FBFF] border border-[#E4EEF8] text-center">
            <p className="text-xs text-[#71849A]">
              Belum ada tanggal ulang tahun murid yang tercatat. Dapat ditambahkan kapan saja melalui menu Admin.
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-[#E4EEF8] flex items-center justify-between text-xs">
        <span className="text-[11px] text-[#71849A]">Jangan lupa traktiran kantin ya!</span>
        <Link
          href="/anggota"
          className="text-[#5A9FE8] font-bold hover:underline flex items-center gap-1 text-[11px]"
        >
          <span>Cek Semua Tanggal</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
