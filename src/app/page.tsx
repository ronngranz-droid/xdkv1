'use client';

import React from 'react';
import HeroBanner from '@/components/dashboard/HeroBanner';
import StatsGrid from '@/components/dashboard/StatsGrid';
import TodayScheduleCard from '@/components/dashboard/TodayScheduleCard';
import TodayPicketCard from '@/components/dashboard/TodayPicketCard';
import PolaroidMemoriesPreview from '@/components/dashboard/PolaroidMemoriesPreview';
import QuickMenfessWidget from '@/components/dashboard/QuickMenfessWidget';
import RandomQuoteWidget from '@/components/dashboard/RandomQuoteWidget';
import QuickNavCard from '@/components/dashboard/QuickNavCard';

export default function HomePage() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* 1. Hero Ocean Breeze Welcome Banner */}
      <HeroBanner />

      {/* 2. Key Metrics & Classroom Pulse */}
      <StatsGrid />

      {/* 3. Polaroid Mading Kelas (Kenangan & Momen Seru) */}
      <PolaroidMemoriesPreview />

      {/* 4. Daily Briefing Grid: Schedule & Picket Duty */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <TodayScheduleCard />
        </div>
        <div className="lg:col-span-5">
          <TodayPicketCard />
        </div>
      </div>

      {/* 5. Fun Interactive Zone: Menfess & Quote Semangat Hari Ini */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <QuickMenfessWidget />
        </div>
        <div className="lg:col-span-5">
          <RandomQuoteWidget />
        </div>
      </div>

      {/* 6. Quick Nav Portal */}
      <div>
        <QuickNavCard />
      </div>
    </div>
  );
}
