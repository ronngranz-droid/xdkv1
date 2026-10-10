'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircleHeart, Heart, ArrowRight, Send } from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';

export default function QuickMenfessWidget() {
  const { state, likeMenfess } = useClassData();

  const latestMenfess = state.menfess.slice(0, 2);

  return (
    <div className="bg-white rounded-3xl border border-[#D5E8F8] p-5 sm:p-6 shadow-sm shadow-[#B5DCF9]/20 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E0EEF9]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-500">
              <MessageCircleHeart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#1D354D]">
                Menfess & Curcol Terkini
              </h3>
              <p className="text-[11px] text-[#647E99]">Pesan rahasia dan apresiasi kelas</p>
            </div>
          </div>
          <Link
            href="/menfess"
            className="text-[11px] font-bold text-[#4B96E6] hover:underline flex items-center gap-1"
          >
            <span>Semua</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-3">
          {latestMenfess.length === 0 ? (
            <div className="py-8 text-center space-y-1">
              <p className="text-xs font-semibold text-[#1D354D]">Belum ada pesan menfess.</p>
              <p className="text-[11px] text-[#647E99]">Jadilah yang pertama mengirim pesan anonim!</p>
            </div>
          ) : (
            latestMenfess.map((msg) => (
              <div
                key={msg.id}
                className="p-3.5 rounded-2xl bg-[#EFF7FD] border border-[#D5E8F8] space-y-2 hover:bg-white transition-all shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1D354D] flex items-center gap-1">
                    <span>{msg.sticker}</span>
                    <span>Untuk: {msg.receiver}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => likeMenfess(msg.id)}
                    className="flex items-center gap-1 text-[11px] text-rose-500 font-bold hover:scale-110 active:scale-95 transition-transform"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500" />
                    <span>{msg.likes}</span>
                  </button>
                </div>
                <p className="text-xs text-[#647E99] line-clamp-2 italic">
                  &ldquo;{msg.message}&rdquo;
                </p>
                <span className="text-[10px] text-[#647E99]/70 block text-right">
                  Dari: {msg.sender}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#E0EEF9]">
        <Link
          href="/menfess"
          className="w-full py-2.5 rounded-xl bg-[#D8ECFC] text-[#1D354D] text-xs font-bold hover:bg-[#B5DCF9] transition-all flex items-center justify-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5 text-[#4B96E6]" />
          <span>Kirim Pesan Anonim Sekarang</span>
        </Link>
      </div>
    </div>
  );
}
