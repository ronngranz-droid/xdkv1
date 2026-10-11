'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bell,
  X,
  Clock,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  FolderGit2,
  User,
  CheckCircle2,
} from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';

export default function AssignmentNotificationToast() {
  const { state } = useClassData();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [todayTime, setTodayTime] = useState<number>(0);

  useEffect(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    setTodayTime(now.getTime());

    // Check if dismissed in this browser session
    const dismissed = sessionStorage.getItem('dismissed_assignment_toast');
    if (!dismissed) {
      // Delay 1.5 seconds after load so it feels like a natural incoming alert
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setIsDismissed(true);
    }
  }, []);

  const assignments = state.assignments || [];
  // Find the most urgent or first uncompleted assignment
  const urgentAssignment = assignments.find((a) => !a.isCompleted) || assignments[0];

  if (!urgentAssignment || isDismissed || !isVisible) {
    return null;
  }

  // Calculate deadline countdown
  const getCountdown = (deadlineStr: string) => {
    if (!todayTime) return { label: 'Segera', isUrgent: false, color: 'bg-[#DEF0FC] text-[#263B50]' };
    const due = new Date(deadlineStr);
    due.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((due.getTime() - todayTime) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { label: 'Terlewat', isUrgent: false, color: 'bg-rose-100 text-rose-700' };
    }
    if (diffDays === 0) {
      return { label: '🚨 Hari Ini!', isUrgent: true, color: 'bg-rose-500 text-white animate-pulse' };
    }
    if (diffDays === 1) {
      return { label: '⚠️ Besok!', isUrgent: true, color: 'bg-amber-500 text-white animate-pulse' };
    }
    if (diffDays <= 3) {
      return { label: `⏳ ${diffDays} Hari Lagi`, isUrgent: true, color: 'bg-amber-100 text-amber-800' };
    }
    return { label: `⏳ ${diffDays} Hari Lagi`, isUrgent: false, color: 'bg-[#DEF0FC] text-[#263B50]' };
  };

  const countdown = getCountdown(urgentAssignment.deadline);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('dismissed_assignment_toast', 'true');
  };

  return (
    <div className="fixed top-20 sm:top-24 right-3 sm:right-6 z-50 max-w-sm sm:max-w-md w-full animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="relative bg-white/95 backdrop-blur-md rounded-3xl border-2 border-[#8BB4E7] p-4 sm:p-5 shadow-2xl shadow-[#8BB4E7]/35 space-y-3">
        {/* Glow Accent Border */}
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-500 animate-ping" />

        {/* Top Header */}
        <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-[#E4EEF8]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-black animate-bounce-gemoy shrink-0">
              <Bell className="w-4 h-4 fill-rose-500" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-rose-600">
                  Notifikasi Tugas Kelas
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              </div>
              <p className="text-[10px] text-[#647E99] font-medium">
                📢 Diumumkan oleh: <strong className="text-[#263B50]">{urgentAssignment.announcedBy || 'Pengurus Kelas X DKV 1'}</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            className="p-1.5 rounded-full text-slate-400 hover:text-[#263B50] hover:bg-slate-100 transition-colors"
            title="Tutup Notifikasi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Assignment Card Snippet */}
        <div className="p-3 rounded-2xl bg-[#F7FBFF] border border-[#E0EEF9] space-y-2">
          <div className="flex items-center justify-between gap-1">
            <span className="px-2.5 py-0.5 rounded-md bg-[#DEF0FC] text-[#263B50] font-black text-[10px]">
              {urgentAssignment.subject} {urgentAssignment.teacher ? `• ${urgentAssignment.teacher}` : ''}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${countdown.color}`}>
              {countdown.label}
            </span>
          </div>

          <h4 className="font-extrabold text-xs sm:text-sm text-[#263B50] leading-snug">
            {urgentAssignment.title}
          </h4>

          {urgentAssignment.description && (
            <p className="text-[11px] text-[#647E99] line-clamp-2 leading-relaxed">
              {urgentAssignment.description}
            </p>
          )}

          <div className="flex items-center justify-between pt-1 text-[10px] text-[#647E99] border-t border-[#EDF4FA]">
            <span>Sifat: <strong className="text-[#263B50]">{urgentAssignment.type}</strong></span>
            <span>Kumpul via: <strong className="text-[#263B50]">{urgentAssignment.submissionType}</strong></span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="text-[10px] text-[#94A3B8]">
            Tenggat: {urgentAssignment.deadline} ({urgentAssignment.deadlineTime || '23:59'})
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleDismiss}
              className="px-3 py-1.5 rounded-xl text-[11px] font-bold text-[#647E99] hover:bg-slate-100 transition-colors"
            >
              Nanti
            </button>
            <Link
              href="/tugas"
              onClick={handleDismiss}
              className="px-3.5 py-1.5 rounded-xl bg-[#8BB4E7] hover:bg-[#7BAEDB] text-white text-[11px] font-black shadow-xs flex items-center gap-1 transition-all hover:scale-102"
            >
              <span>Lihat Detail</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
