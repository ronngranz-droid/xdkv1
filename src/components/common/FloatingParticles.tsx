'use client';

import React, { useId } from 'react';

// Animated floating particles and pastel storybook background doodles matching reference image media_1791635008134_a8978863.png
export default function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Large Soft Dreamy Pastel Blue Clouds & Gradients */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#CDE5FA]/40 blur-3xl animate-float-slow" />
      <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] rounded-full bg-[#BEE0F9]/35 blur-3xl animate-float-reverse" />
      <div className="absolute -bottom-32 left-1/4 w-[28rem] h-[28rem] rounded-full bg-[#CFE8FD]/40 blur-3xl animate-float-slow" />

      {/* 2. Floating Animated Bubbles */}
      <div className="particle-bubble bubble-1" />
      <div className="particle-bubble bubble-2" />
      <div className="particle-bubble bubble-3" />
      <div className="particle-bubble bubble-4" />
      <div className="particle-bubble bubble-5" />
      <div className="particle-bubble bubble-6" />
      <div className="particle-bubble bubble-7" />
      <div className="particle-bubble bubble-8" />
      <div className="particle-bubble bubble-9" />
      <div className="particle-bubble bubble-10" />

      {/* 3. Twinkling & Floating 4-Point Pastel Stars */}
      <div className="particle-star star-1">
        <svg viewBox="0 0 24 24" fill="#8BB4E7" className="w-5 h-5 drop-shadow-xs">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>
      <div className="particle-star star-2">
        <svg viewBox="0 0 24 24" fill="#FED7AA" className="w-4 h-4 drop-shadow-xs">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>
      <div className="particle-star star-3">
        <svg viewBox="0 0 24 24" fill="#8BB4E7" className="w-6 h-6 drop-shadow-xs">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>
      <div className="particle-star star-4">
        <svg viewBox="0 0 24 24" fill="#BBF7D0" className="w-4 h-4 drop-shadow-xs">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>
      <div className="particle-star star-5">
        <svg viewBox="0 0 24 24" fill="#FECDD3" className="w-5 h-5 drop-shadow-xs">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>
      <div className="particle-star star-6">
        <svg viewBox="0 0 24 24" fill="#8BB4E7" className="w-4 h-4 drop-shadow-xs">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>

      {/* 4. Soft Pastel Sparkles */}
      <div className="particle-sparkle sparkle-1" />
      <div className="particle-sparkle sparkle-2" />
      <div className="particle-sparkle sparkle-3" />
      <div className="particle-sparkle sparkle-4" />

      {/* 5. Authentic Storybook Doodles on Left and Right Margins (Inspired directly by reference image) */}
      {/* Left side doodle: Cute waving girl */}
      <div className="hidden 2xl:block absolute top-72 left-4 w-32 opacity-25 hover:opacity-40 transition-opacity">
        <svg viewBox="0 0 100 120" fill="none" stroke="#7BAEDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Head & Hair */}
          <circle cx="50" cy="40" r="22" />
          <path d="M30 35 C32 20, 68 20, 70 35" />
          <path d="M30 35 Q22 45, 26 55" />
          <path d="M70 35 Q78 45, 74 55" />
          {/* Eyes & Smile */}
          <circle cx="43" cy="38" r="2" fill="#7BAEDB" />
          <circle cx="57" cy="38" r="2" fill="#7BAEDB" />
          <path d="M46 47 Q50 51, 54 47" />
          {/* Dress & Arms */}
          <path d="M35 62 L25 95 L75 95 L65 62 Z" />
          <path d="M35 65 Q18 55, 12 40" /> {/* Waving Hand */}
          <circle cx="12" cy="38" r="3" />
          <path d="M65 65 Q80 75, 84 85" />
          {/* Cute Heart */}
          <path d="M50 72 C47 69, 44 71, 44 74 C44 78, 50 82, 50 82 C50 82, 56 78, 56 74 C56 71, 53 69, 50 72 Z" fill="#7BAEDB" />
        </svg>
      </div>

      {/* Left side doodle: Cute sitting cat */}
      <div className="hidden 2xl:block absolute top-[36rem] left-8 w-24 opacity-25 hover:opacity-40 transition-opacity">
        <svg viewBox="0 0 80 80" fill="none" stroke="#7BAEDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Ears */}
          <polygon points="25,25 32,12 40,24" />
          <polygon points="46,24 54,12 61,25" />
          {/* Head */}
          <circle cx="43" cy="35" r="18" />
          <circle cx="37" cy="33" r="1.5" fill="#7BAEDB" />
          <circle cx="49" cy="33" r="1.5" fill="#7BAEDB" />
          <path d="M41 38 Q43 40, 45 38" />
          {/* Whiskers */}
          <line x1="26" y1="35" x2="16" y2="33" />
          <line x1="26" y1="38" x2="16" y2="39" />
          <line x1="60" y1="35" x2="70" y2="33" />
          <line x1="60" y1="38" x2="70" y2="39" />
          {/* Body & Tail */}
          <path d="M32 50 C32 68, 54 68, 54 50" />
          <path d="M54 55 Q68 52, 65 42" />
        </svg>
      </div>

      {/* Right side doodle: Cute little dinosaur */}
      <div className="hidden 2xl:block absolute top-[28rem] right-6 w-28 opacity-25 hover:opacity-40 transition-opacity">
        <svg viewBox="0 0 100 120" fill="none" stroke="#7BAEDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Dino Head & Body */}
          <path d="M30 80 C20 80, 20 50, 40 40 C50 35, 65 30, 75 42 C82 50, 75 62, 68 65 C68 75, 78 85, 85 90 C75 92, 55 92, 45 90" />
          {/* Spikes on back */}
          <polygon points="38,36 43,28 47,35" fill="#7BAEDB" />
          <polygon points="49,34 54,26 58,33" fill="#7BAEDB" />
          <polygon points="60,32 65,24 69,32" fill="#7BAEDB" />
          {/* Eye & Smile */}
          <circle cx="66" cy="46" r="2" fill="#7BAEDB" />
          <path d="M68 53 Q63 56, 58 52" />
          {/* Belly */}
          <path d="M45 60 Q35 70, 45 80" strokeDasharray="3 3" />
          {/* Little Feet */}
          <path d="M36 82 L34 94 L42 94" />
          <path d="M52 82 L50 94 L58 94" />
        </svg>
      </div>

      {/* Right side doodle: Cute jumping boy */}
      <div className="hidden 2xl:block absolute top-48 right-6 w-28 opacity-25 hover:opacity-40 transition-opacity">
        <svg viewBox="0 0 100 120" fill="none" stroke="#7BAEDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Head & Hair */}
          <circle cx="50" cy="35" r="20" />
          <path d="M32 30 Q40 18, 50 18 Q62 18, 68 30" />
          {/* Happy eyes & grin */}
          <path d="M42 32 Q45 28, 48 32" />
          <path d="M54 32 Q57 28, 60 32" />
          <path d="M45 42 Q51 48, 57 42" />
          {/* Arms stretched happily */}
          <path d="M36 55 L18 42" />
          <path d="M64 55 L82 40" />
          {/* Shirt */}
          <rect x="36" y="52" width="28" height="28" rx="6" />
          {/* Shorts & Jumping Legs */}
          <path d="M38 80 L32 98" />
          <path d="M62 80 L70 94" />
        </svg>
      </div>
    </div>
  );
}
