'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Camera,
  MessageCircleHeart,
  CalendarDays,
  Sparkles,
  Users,
  Shield,
  Menu,
  X,
  Search,
  Clock,
  Heart,
  BookOpen,
} from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { state, isAdmin } = useClassData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      };
      setCurrentTime(now.toLocaleDateString('id-ID', options) + ' WIB');
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase().trim();
    if (q.includes('jadwal') || q.includes('mapel') || q.includes('pelajaran')) {
      router.push('/jadwal');
    } else if (q.includes('tugas') || q.includes('pr') || q.includes('proyek') || q.includes('deadline')) {
      router.push('/tugas');
    } else if (q.includes('struktur') || q.includes('ketua') || q.includes('wali')) {
      router.push('/struktur');
    } else if (q.includes('piket') || q.includes('bersih')) {
      router.push('/piket');
    } else if (q.includes('foto') || q.includes('momen') || q.includes('galeri')) {
      router.push('/galeri');
    } else if (q.includes('menfess') || q.includes('pesan') || q.includes('curhat') || q.includes('ngl')) {
      router.push('/menfess');
    } else {
      router.push(`/anggota?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navLinks = [
    { href: '/', label: 'Beranda', icon: LayoutDashboard },
    { href: '/jadwal', label: 'Jadwal', icon: CalendarDays },
    { href: '/tugas', label: 'Tugas', icon: BookOpen },
    { href: '/struktur', label: 'Struktur', icon: Users },
    { href: '/piket', label: 'Piket', icon: Sparkles },
    { href: '/anggota', label: 'Warga Kelas', icon: Users },
    { href: '/galeri', label: 'Galeri', icon: Camera },
    { href: '/menfess', label: 'Menfess', icon: MessageCircleHeart },
    { href: '/admin', label: 'Admin', icon: Shield, highlight: true },
  ];

  return (
    <>
      {/* Floating Pill Capsule Header Container (Matching Reference Image) */}
      <header className="sticky top-2 z-40 px-3 sm:px-6 max-w-6xl mx-auto w-full transition-all duration-300">
        <div className="bg-[#8BB4E7] text-white rounded-full shadow-lg shadow-[#8BB4E7]/35 border border-white/40 px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4 backdrop-blur-md">
          
          {/* Left Side: Pill Search Bar + Class Badge */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Pill Input */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                placeholder="Cari..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-24 sm:w-36 md:w-44 pl-7 pr-3 py-1 text-xs rounded-full bg-white/25 hover:bg-white/35 focus:bg-white focus:text-[#263B50] focus:placeholder-gray-400 placeholder-white/80 text-white outline-none border border-white/30 transition-all shadow-inner"
              />
              <Search className="w-3.5 h-3.5 text-white/80 absolute left-2.5 pointer-events-none" />
            </form>

            {/* Class Pill Badge (Bold X DKV 1) */}
            <Link
              href="/"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-black tracking-wide border border-white/30 transition-all"
            >
              <span>{state.classInfo.name}</span>
            </Link>
          </div>

          {/* Center Navigation: Clean White Pills matching Reference Image */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-[#263B50] shadow-sm scale-105'
                      : 'text-white/90 hover:text-white hover:bg-white/20'
                  } ${
                    item.highlight && isAdmin
                      ? 'bg-emerald-100 text-emerald-800'
                      : ''
                  }`}
                >
                  <span>{item.label}</span>
                  {item.highlight && isAdmin && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Medium Screen Nav */}
          <nav className="hidden md:flex xl:hidden items-center gap-1">
            {[
              { href: '/', label: 'Beranda' },
              { href: '/jadwal', label: 'Jadwal' },
              { href: '/tugas', label: 'Tugas' },
              { href: '/struktur', label: 'Struktur' },
              { href: '/piket', label: 'Piket' },
              { href: '/menfess', label: 'Menfess' },
              { href: '/admin', label: 'Admin' },
            ].map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-white text-[#263B50] shadow-sm'
                      : 'text-white/90 hover:text-white hover:bg-white/20'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side: Avatar & Mobile Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Cute Mascot / Profile Avatar */}
            <Link
              href="/struktur"
              title="Wali Kelas: Ibu Marleni | Ketua: Ahmad Zalqi"
              className="flex items-center gap-1.5 group p-0.5 rounded-full hover:bg-white/20 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-[#FFF2D6] border-2 border-white flex items-center justify-center text-sm shadow-xs overflow-hidden group-hover:scale-110 transition-transform">
                {/* Cute Boy / Mascot Emoji */}
                <span className="select-none group-hover:animate-wiggle">👦🏻</span>
              </div>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 bg-white rounded-3xl p-4 shadow-xl border border-[#DCEEFB] space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
            {currentTime && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-[#647E99] bg-[#DEF0FC] rounded-full mb-2">
                <Clock className="w-3 h-3 text-[#5A9FE8]" />
                <span>{currentTime}</span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-1.5">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#8BB4E7] text-white shadow-sm'
                        : 'text-[#263B50] hover:bg-[#DEF0FC]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Floating Bottom Nav for Mobile Devices */}
      <nav className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-white/95 backdrop-blur-md rounded-full border border-[#DCEEFB] px-2 py-1.5 flex items-center justify-around shadow-xl shadow-[#8BB4E7]/25">
        {[
          { href: '/', label: 'Beranda', icon: LayoutDashboard },
          { href: '/jadwal', label: 'Jadwal', icon: CalendarDays },
          { href: '/tugas', label: 'Tugas', icon: BookOpen },
          { href: '/piket', label: 'Piket', icon: Sparkles },
          { href: '/menfess', label: 'Menfess', icon: MessageCircleHeart },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-full transition-all ${
                isActive ? 'text-[#8BB4E7] font-bold' : 'text-[#647E99]'
              }`}
            >
              <div
                className={`p-1 rounded-full transition-all ${
                  isActive ? 'bg-[#DEF0FC] scale-110' : 'hover:bg-[#DEF0FC]/50'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[9px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
