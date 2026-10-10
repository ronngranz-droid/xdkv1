'use client';

import React from 'react';
import Link from 'next/link';
import {
  Camera,
  MessageCircleHeart,
  CalendarDays,
  Sparkles,
  Users,
  ArrowRight,
} from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';

export default function QuickNavCard() {
  const { state } = useClassData();
  const hubs = [
    {
      title: 'Galeri Momen Seru',
      desc: 'Mading foto polaroid, candid kebersamaan di koridor kelas, ruang belajar, dan halaman.',
      href: '/galeri',
      icon: Camera,
      badge: `${state.memories.length} Foto`,
    },
    {
      title: 'Kotak Menfess & Curcol',
      desc: 'Kirim pesan rahasia, salam hangat, atau apresiasi manis buat temen sekelas secara anonim.',
      href: '/menfess',
      icon: MessageCircleHeart,
      badge: 'Pesan Anonim',
    },
    {
      title: 'Jadwal Pelajaran',
      desc: 'Jadwal belajar resmi X DKV 1 lengkap dengan jam pelajaran, guru pengampu, dan ruang kelas.',
      href: '/jadwal',
      icon: CalendarDays,
      badge: 'Senin - Jumat',
    },
    {
      title: 'Jadwal Piket Kebersihan',
      desc: 'Regu piket kebersihan harian poster Snoopy & Charlie Brown pembagian 5 regu harian.',
      href: '/piket',
      icon: Sparkles,
      badge: '5 Regu Harian',
    },
    {
      title: 'Warga Kelas',
      desc: `Direktori kartu polaroid 35 siswa resmi kelas X DKV 1 dan peran pengurus kelas.`,
      href: '/anggota',
      icon: Users,
      badge: `${state.students.length} Siswa`,
    },
    {
      title: 'Struktur Organisasi',
      desc: 'Papan bagan Snoopy Doghouse: Wali Kelas Ibu Marleni, Ketua Ahmad Zalqi, dan Tim MBG.',
      href: '/struktur',
      icon: Users,
      badge: 'Snoopy Style',
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#DCEEFB] p-5 sm:p-6 shadow-md shadow-[#8BB4E7]/15">
      <div className="mb-5 pb-3 border-b border-[#DCEEFB] flex items-center justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-black text-[#263B50]">
            Pusat Jelajah Digital X DKV 1
          </h2>
          <p className="text-xs text-[#647E99]">
            Akses cepat modul kebersamaan, jadwal, piket, dan direktori warga kelas
          </p>
        </div>
        <Link
          href="/admin"
          className="text-xs font-bold px-3 py-1 rounded-full bg-[#DEF0FC] border border-[#BEE0F9] text-[#263B50] hover:bg-[#8BB4E7] hover:text-white transition-colors"
        >
          Admin
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {hubs.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={idx}
              href={item.href}
              className="group p-4 rounded-2xl bg-[#F7FBFF] border border-[#DCEEFB] hover:border-[#8BB4E7] hover:bg-white transition-all duration-200 shadow-xs hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#DEF0FC] border border-[#BEE0F9] flex items-center justify-center text-[#263B50] group-hover:bg-[#8BB4E7] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white border border-[#DCEEFB] text-[#647E99]">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#263B50] group-hover:text-[#5A9FE8] transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#647E99] line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#DCEEFB] flex items-center justify-between text-xs font-bold text-[#5A9FE8]">
                <span>Buka Modul</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
