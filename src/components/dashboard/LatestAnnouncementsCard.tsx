'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Megaphone, Pin, ArrowRight, Calendar, User, X, Tag } from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';
import { Announcement } from '@/types';

export default function LatestAnnouncementsCard() {
  const { state } = useClassData();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const announcements = [...state.announcements]
    .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0))
    .slice(0, 3);

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Penting':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Tugas':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Kegiatan':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Ujian':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-[#DCEEFF] text-[#263B50] border-[#B9DCFF]';
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl border border-[#E4EEF8] p-5 sm:p-6 shadow-sm shadow-[#B9DCFF]/20 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-[#E4EEF8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DCEEFF] border border-[#B9DCFF] flex items-center justify-center text-[#263B50]">
              <Megaphone className="w-5 h-5 text-[#5A9FE8]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#263B50]">Pengumuman & Info</h2>
              <p className="text-xs text-[#71849A]">Kabar terhangat dan agenda kelas</p>
            </div>
          </div>

          <Link
            href="/pengumuman"
            className="text-xs font-bold text-[#5A9FE8] hover:text-[#263B50] inline-flex items-center gap-1 group transition-colors"
          >
            <span>Semua</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Announcements List */}
        <div className="space-y-3 flex-1 overflow-y-auto">
          {announcements.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#71849A]">
              Belum ada pengumuman kelas saat ini.
            </div>
          ) : (
            announcements.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedAnnouncement(item)}
                className="group cursor-pointer p-4 rounded-2xl bg-[#F7FBFF] border border-[#E4EEF8] hover:border-[#83BDF5] hover:bg-white transition-all duration-200 shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getCategoryBadgeClass(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>
                    {item.isPinned && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        <Pin className="w-2.5 h-2.5 fill-current" />
                        Disematkan
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#71849A] shrink-0">{item.date}</span>
                </div>

                <h3 className="text-sm font-bold text-[#263B50] group-hover:text-[#5A9FE8] transition-colors line-clamp-1 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#71849A] line-clamp-2 leading-relaxed">
                  {item.content}
                </p>

                <div className="mt-2.5 pt-2 border-t border-[#E4EEF8]/60 flex items-center justify-between text-[11px] text-[#71849A]">
                  <span className="truncate max-w-[180px]">Oleh: {item.author}</span>
                  <span className="text-[#5A9FE8] font-semibold group-hover:underline">
                    Baca detail →
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal Detail Announcement */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-[#E4EEF8] max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getCategoryBadgeClass(
                      selectedAnnouncement.category
                    )}`}
                  >
                    {selectedAnnouncement.category}
                  </span>
                  {selectedAnnouncement.isPinned && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      <Pin className="w-3 h-3 fill-current" /> Disematkan
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-[#263B50] leading-snug">
                  {selectedAnnouncement.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAnnouncement(null)}
                className="p-2 rounded-xl text-[#71849A] hover:bg-[#F7FBFF] hover:text-[#263B50] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#71849A] py-2 border-y border-[#E4EEF8]">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#5A9FE8]" />
                <span>{selectedAnnouncement.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#5A9FE8]" />
                <span>{selectedAnnouncement.date}</span>
              </div>
              {selectedAnnouncement.dueDate && (
                <div className="flex items-center gap-1.5 text-rose-600 font-semibold">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Batas: {selectedAnnouncement.dueDate}</span>
                </div>
              )}
            </div>

            <div className="text-sm text-[#263B50] leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto">
              {selectedAnnouncement.content}
            </div>

            {selectedAnnouncement.tags && selectedAnnouncement.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {selectedAnnouncement.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#F7FBFF] text-[#71849A] border border-[#E4EEF8]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedAnnouncement(null)}
                className="px-4 py-2 rounded-xl bg-[#5A9FE8] text-white font-medium text-xs hover:bg-[#468ed9] transition-colors"
              >
                Tutup Informasi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
