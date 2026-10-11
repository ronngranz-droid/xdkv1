'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, Check, CheckCircle2, Plus, Flame } from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';

export default function TodayAssignmentsWidget() {
  const { state, toggleAssignmentCompleted } = useClassData();
  const [todayTime, setTodayTime] = useState<number>(0);

  useEffect(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    setTodayTime(now.getTime());
  }, []);

  const assignments = state.assignments || [];
  const pendingAssignments = assignments.filter((a) => !a.isCompleted);
  const displayList = pendingAssignments.slice(0, 3);

  const getDeadlineBadge = (deadlineStr: string) => {
    if (!todayTime) {
      return { label: 'Tenggat', color: 'bg-[#DEF0FC] text-[#263B50]' };
    }
    const due = new Date(deadlineStr);
    due.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((due.getTime() - todayTime) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { label: 'Terlewat', color: 'bg-rose-100 text-rose-700' };
    if (diffDays === 0) return { label: 'Hari Ini!', color: 'bg-rose-500 text-white animate-pulse' };
    if (diffDays === 1) return { label: 'Besok!', color: 'bg-amber-500 text-white animate-pulse' };
    if (diffDays <= 3) return { label: `${diffDays} Hari Lagi`, color: 'bg-amber-100 text-amber-800' };
    return { label: `${diffDays} Hari Lagi`, color: 'bg-[#DEF0FC] text-[#263B50]' };
  };

  return (
    <div className="bg-white rounded-3xl border border-[#D5E8F8] p-5 sm:p-6 shadow-sm shadow-[#B5DCF9]/20 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E0EEF9]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#DEF0FC] border border-[#BEE0F9] flex items-center justify-center text-[#5A9FE8]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-[#1D354D]">
                  Agenda Tugas & PR
                </h3>
                {pendingAssignments.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-50 text-rose-600 border border-rose-200">
                    {pendingAssignments.length} Pending
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#647E99]">Pengingat tenggat tugas kelas X DKV 1</p>
            </div>
          </div>
          <Link
            href="/tugas"
            className="text-[11px] font-bold text-[#4B96E6] hover:underline flex items-center gap-1 group"
          >
            <span>Semua</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* List of Tasks */}
        <div className="space-y-2.5">
          {displayList.length === 0 ? (
            <div className="py-6 text-center space-y-1 bg-[#F7FBFF] rounded-2xl border border-[#E0EEF9] p-4">
              <span className="text-xl">🎉</span>
              <p className="text-xs font-bold text-[#1D354D]">Tidak Ada Tugas Pending!</p>
              <p className="text-[11px] text-[#647E99]">Semua tugas sudah beres dikerjakan.</p>
            </div>
          ) : (
            displayList.map((asg) => {
              const badge = getDeadlineBadge(asg.deadline);
              return (
                <div
                  key={asg.id}
                  className="p-3 rounded-2xl bg-[#F7FBFF] border border-[#E0EEF9] hover:bg-white hover:border-[#8BB4E7] transition-all flex items-center justify-between gap-3 shadow-2xs group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-[#DEF0FC] text-[#263B50] font-bold text-[10px]">
                        {asg.subject}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-[#263B50] truncate group-hover:text-[#5A9FE8] transition-colors">
                      {asg.title}
                    </h4>
                    {asg.teacher && (
                      <span className="text-[10px] text-[#71849A]">Guru: {asg.teacher}</span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleAssignmentCompleted(asg.id)}
                    className="p-2 rounded-xl bg-white border border-[#E0EEF9] text-[#71849A] hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50 transition-all shrink-0"
                    title="Tandai Selesai"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="pt-4 mt-3 border-t border-[#F1F5F9] flex items-center justify-between">
        <span className="text-[11px] text-[#647E99]">
          Selesai: <strong>{assignments.filter((a) => a.isCompleted).length}</strong> / {assignments.length} tugas
        </span>
        <Link
          href="/tugas"
          className="text-xs font-bold text-[#5A9FE8] hover:underline flex items-center gap-1"
        >
          <span>Buka Papan Tugas</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
