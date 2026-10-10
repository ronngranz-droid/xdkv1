'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, CalendarDays, Camera, MessageCircle, ArrowUpRight } from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';
import { getCurrentIndonesianDay } from '@/lib/utils/time';
import { DayOfWeek } from '@/types';

export default function StatsGrid() {
  const { state } = useClassData();
  const [currentDay, setCurrentDay] = useState<DayOfWeek>('Senin');

  useEffect(() => {
    setCurrentDay(getCurrentIndonesianDay());
  }, []);

  const todaySchedules = state.schedules.filter((s) => s.day === currentDay && !s.isBreak);

  const statCards = [
    {
      title: 'Total Anggota Kelas',
      value: `${state.students.length} Siswa`,
      desc: 'Daftar resmi murid kelas X DKV 1',
      icon: Users,
      href: '/anggota',
      badge: 'Resmi',
      badgeColor: 'bg-[#DCEEFF] text-[#263B50]',
    },
    {
      title: `Jadwal Pelajaran (${currentDay})`,
      value: `${todaySchedules.length} Sesi Belajar`,
      desc: 'Termasuk praktikum lab kejuruan',
      icon: CalendarDays,
      href: '/jadwal',
      badge: 'Hari Ini',
      badgeColor: 'bg-[#B9DCFF] text-[#263B50]',
    },
    {
      title: 'Dokumentasi Kelas',
      value: `${state.memories.length} Foto Mading`,
      desc: 'Momen kebersamaan & kegiatan kelas',
      icon: Camera,
      href: '/mading',
      badge: 'Galeri',
      badgeColor: 'bg-[#DCEEFF] text-[#263B50]',
    },
    {
      title: 'Kotak Menfess',
      value: `${state.menfess.length} Pesan Masuk`,
      desc: 'Ruang seru-seruan & pesan teman',
      icon: MessageCircle,
      href: '/menfess',
      badge: 'Interaktif',
      badgeColor: 'bg-[#B9DCFF] text-[#263B50]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {statCards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <Link
            key={idx}
            href={card.href}
            className="group block p-5 rounded-2xl bg-white border border-[#E4EEF8] hover:border-[#83BDF5] transition-all duration-200 shadow-sm shadow-[#B9DCFF]/15 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#DCEEFF] border border-[#B9DCFF] flex items-center justify-center text-[#263B50] group-hover:bg-[#5A9FE8] group-hover:text-white transition-colors">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${card.badgeColor}`}>
                  {card.badge}
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#71849A] group-hover:text-[#5A9FE8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </div>

            <span className="text-xs font-semibold text-[#71849A] block mb-1">
              {card.title}
            </span>
            <div className="text-2xl font-bold text-[#263B50] tracking-tight mb-1">
              {card.value}
            </div>
            <p className="text-xs text-[#71849A] line-clamp-1">
              {card.desc}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
