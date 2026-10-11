'use client';

import React, { useState } from 'react';
import { Quote, Sparkles, Dices, RefreshCw } from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';

export default function RandomQuoteWidget() {
  const { state } = useClassData();

  const quotesList = [
    { text: 'Jangan biarkan revisi desain grafis merenggut senyuman manismu.', author: 'Ahmad Zalqi (Ketua Kelas)' },
    { text: 'Semangat berkarya dan jaga kekompakan selalu di setiap langkah.', author: 'Sri Mulyaningtyas (Wakil Ketua)' },
    { text: 'Selalu save file karyamu sebelum aplikasi desain not responding!', author: 'Dea Anggia (Sekretaris 1)' },
    { text: 'Catatan rapi dan tugas selesai tepat waktu adalah kunci sukses kita.', author: 'Kesya (Sekretaris 2)' },
    { text: 'Kunci ketenangan hidup warga kelas: bayar uang kas tepat waktu!', author: 'Adel (Bendahara 1)' },
    { text: 'Tertib administrasi kas kelas, lancar semua kegiatan kita.', author: 'Selly (Bendahara 2)' },
    { text: 'Makan siang bergizi gratis tepat waktu, belajar makin bersemangat!', author: 'Tim MBG (Riza, Zalqi, Ilham)' },
    { text: 'Warna boleh nabrak, tapi pertemanan X DKV 1 jangan sampai retak!', author: 'Warga X DKV 1' },
    { text: 'Kompak selalu X DKV 1, karya terindah lahir dari kebersamaan.', author: 'Ibu Marleni (Wali Kelas)' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleShuffle = () => {
    setCurrentIndex((prev) => (prev + 1) % quotesList.length);
  };

  const currentQuote = quotesList[currentIndex];

  return (
    <div className="bg-white rounded-3xl border border-[#D5E8F8] p-5 sm:p-6 shadow-sm shadow-[#B5DCF9]/20 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E0EEF9]">
          <div className="flex items-center gap-2">
            <Quote className="w-4 h-4 text-[#4B96E6]" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#647E99]">
              Quote Receh & Penyemangat Hari Ini
            </h3>
          </div>
          <button
            type="button"
            onClick={handleShuffle}
            className="p-1.5 rounded-lg text-[#647E99] hover:bg-[#D8ECFC] hover:text-[#1D354D] transition-colors flex items-center gap-1 text-[11px] font-semibold"
            title="Ganti Quote"
          >
            <Dices className="w-3.5 h-3.5" />
            <span>Acak</span>
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-[#F0F7FD] border border-[#D5E8F8] space-y-2">
          <p className="text-xs sm:text-sm font-semibold italic text-[#1D354D] leading-relaxed">
            &ldquo;{currentQuote.text}&rdquo;
          </p>
          <div className="text-right">
            <span className="text-[11px] font-bold text-[#4B96E6]">
              — {currentQuote.author}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-3 text-[10px] text-[#647E99] text-center font-medium">
        Fokus pada proses, hasil terbaik akan mengikuti langkahmu.
      </div>
    </div>
  );
}
