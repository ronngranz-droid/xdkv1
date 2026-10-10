'use client';

import React from 'react';

/**
 * FloatingParticles
 * Rich, playful pastel cartoon animations featuring:
 * - Drifting fluffy smiling clouds
 * - Swaying pastel flowers & lucky clovers
 * - Soft shooting stars across the pastel sky
 * - Rising glowing bubbles
 * - Twinkling 4-point stars
 * - Floating musical notes
 * - Playful storybook doodles (Snoopy dancing, Woodstock fluttering, happy students)
 */
export default function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Large Soft Dreamy Pastel Gradients */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#CDE5FA]/40 blur-3xl animate-float-slow" />
      <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] rounded-full bg-[#BEE0F9]/35 blur-3xl animate-float-reverse" />
      <div className="absolute -bottom-32 left-1/4 w-[28rem] h-[28rem] rounded-full bg-[#CFE8FD]/40 blur-3xl animate-float-slow" />

      {/* 2. Drifting Puffy Cartoon Clouds with Happy Smiles */}
      <div className="particle-cloud cloud-drift-1">
        <svg viewBox="0 0 120 60" fill="none" className="w-28 sm:w-36 h-auto drop-shadow-sm opacity-65">
          <path d="M25,50 A20,20 0 0,1 35,20 A24,24 0 0,1 65,15 A26,26 0 0,1 95,25 A18,18 0 0,1 105,50 Z" fill="#FFFFFF" />
          {/* Eyes & Smile */}
          <circle cx="48" cy="33" r="2.2" fill="#7BAEDB" />
          <circle cx="72" cy="33" r="2.2" fill="#7BAEDB" />
          <path d="M57,38 Q60,42 63,38" stroke="#7BAEDB" strokeWidth="2" strokeLinecap="round" />
          {/* Blush cheeks */}
          <circle cx="43" cy="37" r="3.5" fill="#FECDD3" opacity="0.8" />
          <circle cx="77" cy="37" r="3.5" fill="#FECDD3" opacity="0.8" />
        </svg>
      </div>

      <div className="particle-cloud cloud-drift-2">
        <svg viewBox="0 0 110 55" fill="none" className="w-24 sm:w-32 h-auto drop-shadow-sm opacity-55">
          <path d="M22,46 A18,18 0 0,1 30,18 A22,22 0 0,1 58,14 A24,24 0 0,1 86,23 A16,16 0 0,1 96,46 Z" fill="#F4FAFF" />
          {/* Happy closed sleepy eyes */}
          <path d="M44,30 Q48,34 52,30" stroke="#8BB4E7" strokeWidth="2" strokeLinecap="round" />
          <path d="M66,30 Q70,34 74,30" stroke="#8BB4E7" strokeWidth="2" strokeLinecap="round" />
          {/* Blush */}
          <circle cx="39" cy="33" r="3" fill="#FECDD3" opacity="0.75" />
          <circle cx="79" cy="33" r="3" fill="#FECDD3" opacity="0.75" />
        </svg>
      </div>

      <div className="particle-cloud cloud-drift-3">
        <svg viewBox="0 0 100 50" fill="none" className="w-20 sm:w-28 h-auto drop-shadow-sm opacity-50">
          <path d="M20,42 A16,16 0 0,1 28,16 A20,20 0 0,1 54,12 A22,22 0 0,1 78,21 A15,15 0 0,1 88,42 Z" fill="#FFFFFF" />
          {/* Sweet wink */}
          <circle cx="45" cy="27" r="2" fill="#7BAEDB" />
          <path d="M62,26 Q66,23 70,26" stroke="#7BAEDB" strokeWidth="2" strokeLinecap="round" />
          <path d="M54,32 Q57,35 60,32" stroke="#7BAEDB" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>

      {/* 3. Swaying Falling Flowers & Lucky Clovers */}
      {/* Flower 1: Pastel Daisy */}
      <div className="particle-flower flower-1">
        <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6 drop-shadow-xs opacity-75">
          {/* Petals */}
          <circle cx="20" cy="9" r="6" fill="#FFFFFF" stroke="#DEF0FC" strokeWidth="1" />
          <circle cx="31" cy="20" r="6" fill="#FFFFFF" stroke="#DEF0FC" strokeWidth="1" />
          <circle cx="20" cy="31" r="6" fill="#FFFFFF" stroke="#DEF0FC" strokeWidth="1" />
          <circle cx="9" cy="20" r="6" fill="#FFFFFF" stroke="#DEF0FC" strokeWidth="1" />
          {/* Center */}
          <circle cx="20" cy="20" r="5" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1" />
        </svg>
      </div>

      {/* Flower 2: Lucky Four-Leaf Clover */}
      <div className="particle-flower flower-2">
        <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6 drop-shadow-xs opacity-70">
          <path d="M20 20 C14 12 6 18 12 24 C6 30 14 36 20 28 C26 36 34 30 28 24 C34 18 26 12 20 20 Z" fill="#BBF7D0" stroke="#86EFAC" strokeWidth="1" />
          <path d="M20 25 Q19 35 17 38" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Flower 3: Soft Pink Blossom */}
      <div className="particle-flower flower-3">
        <svg viewBox="0 0 40 40" fill="none" className="w-5 h-5 drop-shadow-xs opacity-75">
          <circle cx="20" cy="11" r="5.5" fill="#FECDD3" />
          <circle cx="29" cy="17" r="5.5" fill="#FECDD3" />
          <circle cx="26" cy="28" r="5.5" fill="#FECDD3" />
          <circle cx="14" cy="28" r="5.5" fill="#FECDD3" />
          <circle cx="11" cy="17" r="5.5" fill="#FECDD3" />
          <circle cx="20" cy="20" r="4" fill="#FFFFFF" />
        </svg>
      </div>

      {/* 4. Pastel Shooting Stars / Comet Streaks */}
      <div className="particle-shooting-star" />
      <div className="particle-shooting-star-2" />

      {/* 5. Floating Glowing Bubbles (12 Wobbling Bubbles) */}
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
      <div className="particle-bubble bubble-11" />
      <div className="particle-bubble bubble-12" />

      {/* 6. Twinkling & Floating 4-Point Stars */}
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
      <div className="particle-star star-7">
        <svg viewBox="0 0 24 24" fill="#FDE047" className="w-5 h-5 drop-shadow-xs">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>
      <div className="particle-star star-8">
        <svg viewBox="0 0 24 24" fill="#93C5FD" className="w-4 h-4 drop-shadow-xs">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>

      {/* 7. Floating Musical Notes */}
      <div className="hidden lg:block absolute top-[22%] left-[8%] text-[#7BAEDB]/40 font-bold text-2xl animate-wiggle">
        ♪
      </div>
      <div className="hidden lg:block absolute top-[48%] right-[11%] text-[#FDBA74]/45 font-bold text-xl animate-bounce-gemoy">
        ♫
      </div>
      <div className="hidden lg:block absolute top-[75%] left-[14%] text-[#86EFAC]/40 font-bold text-lg animate-wiggle">
        ♩
      </div>

      {/* 8. Authentic Storybook Doodles on Left and Right Margins */}
      {/* Left side doodle: Cute waving girl */}
      <div className="hidden 2xl:block absolute top-72 left-4 w-32 opacity-25 hover:opacity-50 transition-all hover:scale-105">
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
      <div className="hidden 2xl:block absolute top-[36rem] left-8 w-24 opacity-25 hover:opacity-50 transition-all hover:scale-105">
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

      {/* Left side doodle: Woodstock Flapping Happily (Peanuts companion) */}
      <div className="hidden 2xl:block absolute bottom-24 left-6 w-20 opacity-30 hover:opacity-60 transition-all animate-wiggle">
        <svg viewBox="0 0 60 60" fill="none" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Head tuft */}
          <path d="M22 18 L18 10 M26 16 L25 8 M30 18 L32 10" />
          {/* Round head */}
          <ellipse cx="26" cy="22" rx="8" ry="7" fill="#FEF08A" />
          {/* Eye */}
          <circle cx="28" cy="20" r="1.2" fill="#713F12" />
          {/* Beak */}
          <path d="M33 21 L42 23 L33 26 Z" fill="#FACC15" />
          {/* Tiny body & wings */}
          <path d="M22 28 Q18 36 24 40 L28 40" />
          <path d="M20 32 Q12 30 16 26" />
          {/* Legs */}
          <line x1="23" y1="40" x2="21" y2="48" />
          <line x1="26" y1="40" x2="28" y2="48" />
        </svg>
      </div>

      {/* Right side doodle: Cute dancing Snoopy with ears flying */}
      <div className="hidden 2xl:block absolute top-[14rem] right-8 w-28 opacity-30 hover:opacity-60 transition-all animate-bounce-gemoy">
        <svg viewBox="0 0 100 110" fill="none" stroke="#263B50" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Head */}
          <path d="M42 45 C35 45 28 38 28 28 C28 16 42 12 55 18 C65 22 75 24 82 28 C86 31 84 37 80 39 C72 43 62 42 56 45 Z" fill="#FFFFFF" />
          {/* Floppy black ear */}
          <ellipse cx="34" cy="30" rx="9" ry="14" fill="#263B50" transform="rotate(-20 34 30)" />
          {/* Black nose tip */}
          <ellipse cx="83" cy="31" rx="4" ry="5" fill="#263B50" />
          {/* Happy smile line */}
          <path d="M68 36 Q73 39 70 41" />
          {/* Closed eye */}
          <path d="M52 26 Q56 23 60 26" />
          {/* Dancing Body */}
          <path d="M46 45 C42 55 42 70 52 75 C60 75 64 68 64 56 C64 48 58 45 46 45 Z" fill="#FFFFFF" />
          {/* Red collar */}
          <path d="M44 46 L58 47" stroke="#EF4444" strokeWidth="3" />
          {/* Dancing outstretched paws */}
          <path d="M42 54 L30 46" />
          <path d="M60 54 L72 48" />
          {/* Little dancing feet */}
          <path d="M46 75 L40 88 L48 88" />
          <path d="M56 75 L62 88 L70 88" />
          {/* Little wagging tail */}
          <path d="M42 66 Q34 62 38 56" />
        </svg>
      </div>

      {/* Right side doodle: Cute little dinosaur */}
      <div className="hidden 2xl:block absolute top-[29rem] right-6 w-28 opacity-25 hover:opacity-50 transition-all hover:scale-105">
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
      <div className="hidden 2xl:block absolute bottom-24 right-8 w-28 opacity-25 hover:opacity-50 transition-all hover:scale-105">
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
