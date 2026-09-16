import React from 'react';

/**
 * Animated Cafe Logo Component
 * Features:
 * - High resolution circular cafe logo
 * - Rotating golden particle/halo ring
 * - Ambient amber pulsating aura
 * - Rising animated steam plumes above the logo cup
 * - Glint light sweep on hover and ambient
 * - 3D scale and hover responsiveness
 */
export default function CafeLogo({
  size = 'md',
  animated = true,
  showSteam = true,
  showRing = true,
  showAura = true,
  className = '',
  onClick,
}) {
  // Size mapping
  const sizeMap = {
    xs: {
      container: 'w-8 h-8',
      ringPadding: 'p-[1.5px]',
      steamScale: 'scale-50 -top-3',
    },
    sm: {
      container: 'w-10 h-10',
      ringPadding: 'p-[2px]',
      steamScale: 'scale-75 -top-4',
    },
    nav: {
      container: 'w-11 h-11 sm:w-12 sm:h-12',
      ringPadding: 'p-[2.5px]',
      steamScale: 'scale-90 -top-4',
    },
    footer: {
      container: 'w-11 h-11 sm:w-12 sm:h-12',
      ringPadding: 'p-[2.5px]',
      steamScale: 'scale-90 -top-4',
    },
    md: {
      container: 'w-16 h-16',
      ringPadding: 'p-[3px]',
      steamScale: 'scale-100 -top-5',
    },
    lg: {
      container: 'w-24 h-24',
      ringPadding: 'p-[3.5px]',
      steamScale: 'scale-125 -top-7',
    },
    xl: {
      container: 'w-36 h-36',
      ringPadding: 'p-[4px]',
      steamScale: 'scale-150 -top-9',
    },
    hero: {
      container: 'w-48 h-48 sm:w-56 sm:h-56',
      ringPadding: 'p-[5px]',
      steamScale: 'scale-[1.8] -top-12',
    },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const containerClass = [
    'relative inline-flex items-center justify-center select-none group',
    onClick ? 'cursor-pointer' : '',
    animated ? 'animate-logo-float' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div onClick={onClick} className={containerClass}>
      {/* 1. Pulsing Ambient Golden/Amber Aurora Glow */}
      {showAura && (
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-tr from-amber-600/40 via-yellow-500/30 to-orange-500/40 blur-xl pointer-events-none ${
            animated ? 'animate-logo-aura' : 'opacity-60'
          }`}
        />
      )}

      {/* 2. Rising Animated Steam Plumes */}
      {showSteam && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 pointer-events-none z-20 flex items-center justify-center ${currentSize.steamScale}`}
        >
          <div className="relative w-8 h-8">
            <svg
              className="absolute left-1/4 w-3.5 h-6 text-amber-200/70 animate-logo-steam-1 filter blur-[0.5px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M8 19c-2-3 2-6 0-9s2-6 0-9" />
            </svg>
            <svg
              className="absolute right-1/4 w-3.5 h-6 text-yellow-100/60 animate-logo-steam-2 filter blur-[0.5px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M16 19c2-3-2-6 0-9s-2-6 0-9" />
            </svg>
          </div>
        </div>
      )}

      {/* 3. Outer Rotating Golden Halo Ring */}
      {showRing ? (
        <div
          className={`relative ${currentSize.container} rounded-full ${currentSize.ringPadding} bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-700 shadow-[0_4px_20px_rgba(217,119,6,0.35)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_30px_rgba(245,158,11,0.5)]`}
        >
          {/* Subtle spinning dashed cosmic ring overlay */}
          <div className="absolute -inset-[3px] rounded-full border border-amber-400/40 border-dashed animate-logo-ring pointer-events-none" />

          {/* Inner Logo Image Frame */}
          <div className="relative w-full h-full rounded-full overflow-hidden bg-[#180f08] flex items-center justify-center shadow-inner">
            <img
              src="/logo.png"
              alt="Morning Brew Cafe Official Logo"
              className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
              onError={(e) => {
                e.currentTarget.src = '/logo.jpg';
              }}
            />

            {/* 4. Light Shimmer Glint Sweep */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
              <div className="w-1/2 h-[200%] bg-gradient-to-r from-transparent via-white/35 to-transparent -top-1/2 animate-logo-glint pointer-events-none" />
            </div>
          </div>
        </div>
      ) : (
        /* Standalone Circular Logo */
        <div
          className={`relative ${currentSize.container} rounded-full overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105`}
        >
          <img
            src="/logo.png"
            alt="Morning Brew Cafe Logo"
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              e.currentTarget.src = '/logo.jpg';
            }}
          />
        </div>
      )}
    </div>
  );
}
