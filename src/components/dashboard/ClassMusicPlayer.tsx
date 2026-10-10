'use client';

import React, { useState } from 'react';
import {
  Music,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Disc3,
  Sparkles,
} from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';

export default function ClassMusicPlayer() {
  const { state } = useClassData();
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playlist = state.playlist || [];
  const currentSong = playlist.length > 0 ? (playlist[currentTrackIndex] || playlist[0]) : null;

  const handleNext = () => {
    if (playlist.length === 0) return;
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    if (playlist.length === 0) return;
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  if (!currentSong) {
    return (
      <div className="bg-gradient-to-br from-white via-[#F7FBFF] to-[#D8ECFC]/40 rounded-3xl border border-[#D5E8F8] p-5 sm:p-6 shadow-sm shadow-[#B5DCF9]/20 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E0EEF9]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#D8ECFC] border border-[#B5DCF9] flex items-center justify-center text-[#4B96E6]">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#1D354D]">
                  Soundtrack Kelas
                </h3>
                <p className="text-[11px] text-[#647E99]">Lagu santai kelas</p>
              </div>
            </div>
          </div>
          <div className="py-8 text-center text-xs text-[#647E99]">
            Belum ada daftar lagu kelas yang ditambahkan.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white via-[#F7FBFF] to-[#D8ECFC]/40 rounded-3xl border border-[#D5E8F8] p-5 sm:p-6 shadow-sm shadow-[#B5DCF9]/20 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E0EEF9]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#D8ECFC] border border-[#B5DCF9] flex items-center justify-center text-[#4B96E6]">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#1D354D]">
                Soundtrack Kelas
              </h3>
              <p className="text-[11px] text-[#647E99]">Lagu wajib nemenin nugas & santai</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D8ECFC] text-[#1D354D]">
            Lo-Fi Vibe
          </span>
        </div>

        {/* Current Song Display with Spinning Vinyl Disc */}
        <div className="flex items-center gap-4 p-3 rounded-2xl bg-white border border-[#E0EEF9] shadow-2xs">
          <div className="relative shrink-0">
            <div
              className={`w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '6s' }}
            >
              <img
                src={currentSong.albumCover}
                alt={currentSong.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Center vinyl dot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#4B96E6]" />
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EFF7FD] text-[#4B96E6] border border-[#D5E8F8] inline-block mb-1">
              {currentSong.vibe}
            </span>
            <h4 className="font-bold text-sm text-[#1D354D] truncate">
              {currentSong.title}
            </h4>
            <p className="text-xs text-[#647E99] truncate">{currentSong.artist}</p>
          </div>
        </div>

        {/* Fake Equalizer / Wave Animation */}
        <div className="flex items-center justify-center gap-1 my-3 h-5">
          {[40, 70, 30, 90, 50, 80, 60, 100, 45, 65].map((height, i) => (
            <div
              key={i}
              className={`w-1 rounded-full bg-[#78B7F1] transition-all duration-300 ${
                isPlaying ? 'animate-pulse' : 'opacity-40'
              }`}
              style={{
                height: isPlaying ? `${height}%` : '20%',
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Music Player Controls */}
      <div className="pt-2 border-t border-[#E0EEF9] flex items-center justify-between">
        <span className="text-[10px] font-bold text-[#647E99]">{currentSong.duration}</span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="p-2 rounded-xl text-[#647E99] hover:bg-[#D8ECFC] hover:text-[#1D354D] transition-colors"
            title="Lagu Sebelumnya"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-9 h-9 rounded-xl bg-[#4B96E6] text-white flex items-center justify-center shadow-xs hover:bg-[#3a7dc4] hover:scale-105 active:scale-95 transition-all"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="p-2 rounded-xl text-[#647E99] hover:bg-[#D8ECFC] hover:text-[#1D354D] transition-colors"
            title="Lagu Selanjutnya"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1 text-[#647E99]">
          <Volume2 className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
