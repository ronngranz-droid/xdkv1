import { DayOfWeek } from '@/types';

export function getIndonesianGreeting(): { text: string; subtext: string; iconType: 'sun' | 'sun-dim' | 'sunset' | 'moon' } {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 11) {
    return {
      text: 'Selamat Pagi',
      subtext: 'Awali hari dengan semangat belajar dan senyum ceria!',
      iconType: 'sun',
    };
  } else if (hour >= 11 && hour < 15) {
    return {
      text: 'Selamat Siang',
      subtext: 'Tetap fokus dan jangan lupa istirahat serta jaga kesehatan!',
      iconType: 'sun-dim',
    };
  } else if (hour >= 15 && hour < 18) {
    return {
      text: 'Selamat Sore',
      subtext: 'Selesaikan tugas hari ini dengan tuntas dan rapi!',
      iconType: 'sunset',
    };
  } else {
    return {
      text: 'Selamat Malam',
      subtext: 'Istirahat yang cukup untuk menyambut hari esok!',
      iconType: 'moon',
    };
  }
}

export function getCurrentIndonesianDay(): DayOfWeek {
  const dayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday, ...
  const map: Record<number, DayOfWeek> = {
    1: 'Senin',
    2: 'Selasa',
    3: 'Rabu',
    4: 'Kamis',
    5: 'Jumat',
  };
  return map[dayIndex] || 'Senin'; // Defaults to Monday for weekend view or fallback
}

export function isWeekend(): boolean {
  const dayIndex = new Date().getDay();
  return dayIndex === 0 || dayIndex === 6;
}

export function formatIndonesianFullDate(): string {
  const now = new Date();
  return now.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function parseTimeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

export function getPeriodStatus(
  scheduleDay: DayOfWeek,
  startTime: string,
  endTime: string,
  currentMinutes?: number,
  activeCurrentDay?: DayOfWeek
): 'current' | 'next' | 'done' | 'upcoming' {
  if (currentMinutes === undefined || !activeCurrentDay) {
    return 'upcoming';
  }
  if (activeCurrentDay !== scheduleDay) {
    return 'upcoming';
  }

  const startMin = parseTimeToMinutes(startTime);
  const endMin = parseTimeToMinutes(endTime);

  if (currentMinutes >= startMin && currentMinutes <= endMin) {
    return 'current';
  } else if (currentMinutes > endMin) {
    return 'done';
  } else if (currentMinutes >= startMin - 45 && currentMinutes < startMin) {
    return 'next';
  }
  return 'upcoming';
}
