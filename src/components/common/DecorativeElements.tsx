import React from 'react';

// Soft Pastel Ocean Wave Divider
export function PastelWave({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-full text-[#DCEEFF] fill-current pointer-events-none select-none ${className}`}
      viewBox="0 0 1440 120"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path d="M0,32L48,42.7C96,53,192,75,288,80C384,85,480,75,576,64C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
    </svg>
  );
}

// Bintang Laut Lucu (Starfish)
export function PastelStarfish({ className = '', size = 22 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#83BDF5"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none opacity-85 hover:rotate-12 transition-transform ${className}`}
    >
      <path d="M12 2C11.5 4 10.5 7 9.5 8C8.5 9 5.5 8.5 3 9.5C5 11 7 12 7.5 13.5C8 15 7.5 18 8.5 20C10 18.5 11 16.5 12 16.5C13 16.5 14 18.5 15.5 20C16.5 18 16 15 16.5 13.5C17 12 19 11 21 9.5C18.5 8.5 15.5 9 14.5 8C13.5 7 12.5 4 12 2Z" />
    </svg>
  );
}

// Kerang Laut Aesthetic (Seashell)
export function PastelShell({ className = '', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#5A9FE8"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      <path d="M12 21C6 21 3 15 3 10C3 5 7 3 12 3C17 3 21 5 21 10C21 15 18 21 12 21Z" fill="#DCEEFF" fillOpacity="0.6" />
      <path d="M12 3V21" />
      <path d="M7 6L12 21" />
      <path d="M17 6L12 21" />
      <path d="M4 11L12 21" />
      <path d="M20 11L12 21" />
    </svg>
  );
}

// Ubur-ubur Pastel Gemoy (Jellyfish)
export function PastelJellyfish({ className = '', size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none opacity-80 ${className}`}
    >
      <path
        d="M5 11C5 7 8 4 12 4C16 4 19 7 19 11C19 13 17 14 15 13C13 12 11 14 9 13C7 12 5 13 5 11Z"
        fill="#B9DCFF"
        stroke="#5A9FE8"
        strokeWidth="1.5"
      />
      <path d="M8 14V20C8 20.5 7.5 21 7 20.5" stroke="#83BDF5" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 14V21C11 21.5 11.5 21 12 20.5" stroke="#5A9FE8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 14V20C14 20.5 13.5 21 13 20.5" stroke="#83BDF5" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 14V19C16 19.5 16.5 19 17 18.5" stroke="#83BDF5" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="9" r="1" fill="#263B50" />
      <circle cx="15" cy="9" r="1" fill="#263B50" />
    </svg>
  );
}

// Ikan Kecil Lucu (Little Swimmer Fish)
export function PastelFish({ className = '', size = 22 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#83BDF5"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none opacity-80 ${className}`}
    >
      <path d="M18 12C18 15 14 17 10 16C7 15.2 4 13.5 2 12C4 10.5 7 8.8 10 8C14 7 18 9 18 12Z" fill="#B9DCFF" stroke="#5A9FE8" strokeWidth="1.2" />
      <path d="M17 12L22 8V16L17 12Z" fill="#83BDF5" />
      <circle cx="6" cy="11" r="1" fill="#263B50" />
    </svg>
  );
}

// Gelembung Air Laut (Water Bubble)
export function PastelBubble({ className = '', size = 14 }: { className?: string; size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-full bg-gradient-to-tr from-[#B9DCFF]/50 to-[#DCEEFF]/80 border border-[#83BDF5]/40 backdrop-blur-2xs shadow-2xs animate-pulse pointer-events-none select-none ${className}`}
    />
  );
}

export function PastelCloud({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`text-[#DCEEFF] fill-current opacity-70 pointer-events-none select-none ${className}`}
      viewBox="0 0 100 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 20,45 A 15,15 0 0,1 35,22 A 22,22 0 0,1 68,18 A 18,18 0 0,1 85,35 A 15,15 0 0,1 82,50 A 10,10 0 0,1 20,45 Z" />
    </svg>
  );
}

export function PastelStar({ className = '', size = 16 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#B9DCFF"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none opacity-80 ${className}`}
    >
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  );
}

export function PastelSparkle({ className = '', size = 12 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="#83BDF5"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none opacity-75 ${className}`}
    >
      <path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z" />
    </svg>
  );
}

// Semanggi 4 Daun Keberuntungan (Four-Leaf Clover)
export function PastelClover({ className = '', size = 22 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none transition-transform hover:scale-110 ${className}`}
    >
      <path
        d="M16 16C13 10 7 10 7 14C7 18 13 16 16 16Z"
        fill="#82CF87"
        stroke="#4FA855"
        strokeWidth="1.2"
      />
      <path
        d="M16 16C22 10 28 10 28 14C28 18 22 16 16 16Z"
        fill="#96DC9A"
        stroke="#4FA855"
        strokeWidth="1.2"
      />
      <path
        d="M16 16C10 19 10 25 14 25C18 25 16 19 16 16Z"
        fill="#82CF87"
        stroke="#4FA855"
        strokeWidth="1.2"
      />
      <path
        d="M16 16C10 13 10 7 14 7C18 7 16 13 16 16Z"
        fill="#A6E6AA"
        stroke="#4FA855"
        strokeWidth="1.2"
      />
      <path d="M16 16C16 23 18 28 20 30" stroke="#4FA855" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Jamur Hutan Gemoy (Cute Toadstool Mushroom)
export function PastelMushroom({ className = '', size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Mushroom Cap */}
      <path
        d="M6 18C6 10 11 6 16 6C21 6 26 10 26 18C26 19 25 20 23 20C18 20 14 20 9 20C7 20 6 19 6 18Z"
        fill="#F87171"
        stroke="#DC2626"
        strokeWidth="1.2"
      />
      {/* Polka Dots */}
      <circle cx="12" cy="11" r="2" fill="white" />
      <circle cx="18" cy="10" r="1.5" fill="white" />
      <circle cx="21" cy="15" r="1.8" fill="white" />
      <circle cx="10" cy="16" r="1.5" fill="white" />
      {/* Stem */}
      <path
        d="M12 20V26C12 27.5 13 28 16 28C19 28 20 27.5 20 26V20"
        fill="#FEF3C7"
        stroke="#D97706"
        strokeWidth="1.2"
      />
    </svg>
  );
}

// Bunga Daisy Kecil Imut (Cute Little Flower)
export function PastelFlower({ className = '', size = 18 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      <circle cx="12" cy="7" r="3" fill="#DCEEFF" stroke="#83BDF5" strokeWidth="1" />
      <circle cx="12" cy="17" r="3" fill="#DCEEFF" stroke="#83BDF5" strokeWidth="1" />
      <circle cx="7" cy="12" r="3" fill="#DCEEFF" stroke="#83BDF5" strokeWidth="1" />
      <circle cx="17" cy="12" r="3" fill="#DCEEFF" stroke="#83BDF5" strokeWidth="1" />
      <circle cx="12" cy="12" r="3.2" fill="#FDE047" stroke="#EAB308" strokeWidth="1" />
    </svg>
  );
}

// Selotip Washi Tape Aesthetic untuk Mading & Kartu
export function PastelWashiTape({ className = '' }: { className?: string }) {
  return (
    <div
      className={`h-4 w-16 bg-[#FFF2B2]/80 border-t border-b border-amber-300/60 shadow-xs backdrop-blur-xs -rotate-2 rounded-xs select-none pointer-events-none ${className}`}
    />
  );
}

