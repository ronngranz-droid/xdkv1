'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CalendarDays, Clock, MapPin, User, Coffee, ArrowRight, Sparkles } from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';
import { DayOfWeek } from '@/types';
import { getCurrentIndonesianDay, getPeriodStatus } from '@/lib/utils/time';

export default function TodayScheduleCard() {
  const { state } = useClassData();
  const [currentToday, setCurrentToday] = useState<DayOfWeek>('Senin');
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Senin');
  const [currentMinutes, setCurrentMinutes] = useState<number | undefined>(undefined);

  useEffect(() => {
    const today = getCurrentIndonesianDay();
    setCurrentToday(today);
    setSelectedDay(today);
    const now = new Date();
    setCurrentMinutes(now.getHours() * 60 + now.getMinutes());
  }, []);

  const days: DayOfWeek[] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
  const daySchedules = state.schedules
    .filter((s) => s.day === selectedDay)
    .sort((a, b) => a.period - b.period);

  return (
    <div className="bg-white rounded-3xl border border-[#E4EEF8] p-5 sm:p-6 shadow-sm shadow-[#B9DCFF]/20 flex flex-col h-full">
      {/* Header with Title and Day Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[#E4EEF8]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#DCEEFF] border border-[#B9DCFF] flex items-center justify-center text-[#263B50]">
            <CalendarDays className="w-5 h-5 text-[#5A9FE8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#263B50]">Jadwal Pelajaran</h2>
              {selectedDay === currentToday && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#DCEEFF] text-[#263B50] border border-[#B9DCFF]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Hari Ini
                </span>
              )}
            </div>
            <p className="text-xs text-[#71849A]">Mata pelajaran & guru pengampu</p>
          </div>
        </div>

        {/* Small Day Selector Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {days.map((day) => {
            const isSelected = selectedDay === day;
            const isToday = currentToday === day;
            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#5A9FE8] text-white shadow-xs'
                    : 'bg-[#F7FBFF] text-[#71849A] hover:text-[#263B50] border border-[#E4EEF8]'
                }`}
              >
                {day}
                {isToday && !isSelected && (
                  <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-[#5A9FE8]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Schedule Items List */}
      <div className="space-y-3 flex-1 overflow-y-auto max-h-[380px] pr-1">
        {daySchedules.length === 0 ? (
          <div className="py-14 text-center space-y-2">
            <CalendarDays className="w-8 h-8 text-[#5A9FE8] mx-auto opacity-50" />
            <p className="text-xs font-semibold text-[#263B50]">
              Jadwal pelajaran hari {selectedDay} belum diatur.
            </p>
            <p className="text-[11px] text-[#71849A]">
              Dapat ditambahkan melalui menu Admin jika data resmi sudah tersedia.
            </p>
          </div>
        ) : (
          daySchedules.map((item) => {
            const status = getPeriodStatus(item.day, item.startTime, item.endTime, currentMinutes, currentToday);

            if (item.isBreak) {
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#F7FBFF] border border-dashed border-[#B9DCFF] text-[#71849A]"
                >
                  <Coffee className="w-4 h-4 text-[#83BDF5] shrink-0" />
                  <div className="flex-1 text-xs font-medium">
                    <span className="font-semibold text-[#263B50]">{item.subject}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#71849A]">
                    <Clock className="w-3 h-3" />
                    <span>{item.startTime} - {item.endTime}</span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                  status === 'current'
                    ? 'bg-[#DCEEFF]/60 border-[#5A9FE8] shadow-xs'
                    : status === 'next'
                    ? 'bg-sky-50/50 border-[#83BDF5]'
                    : 'bg-[#F7FBFF] border-[#E4EEF8] hover:border-[#B9DCFF]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white border border-[#E4EEF8] text-[#263B50]">
                        Jam ke-{item.period}
                      </span>
                      {status === 'current' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                          Sedang Berlangsung
                        </span>
                      )}
                      {status === 'next' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                          Mapel Berikutnya
                        </span>
                      )}
                      <h3 className="font-bold text-sm sm:text-base text-[#263B50]">
                        {item.subject}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#71849A] pt-1">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#5A9FE8]" />
                        <span>{item.teacher}</span>
                      </div>
                      {item.room && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#83BDF5]" />
                          <span>{item.room}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Time Badge */}
                  <div className="shrink-0 text-right">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white border border-[#E4EEF8] text-xs font-bold text-[#263B50]">
                      <Clock className="w-3 h-3 text-[#5A9FE8]" />
                      <span>{item.startTime} - {item.endTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer link to full schedule */}
      <div className="pt-4 mt-4 border-t border-[#E4EEF8] flex items-center justify-between">
        <span className="text-xs text-[#71849A]">Lihat susunan mingguan lengkap</span>
        <Link
          href="/jadwal"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5A9FE8] hover:text-[#263B50] group transition-colors"
        >
          <span>Buka Jadwal Lengkap</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
