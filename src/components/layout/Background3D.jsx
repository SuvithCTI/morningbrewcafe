import React from 'react';
import FloatingBeans3D from '../3d/FloatingBeans3D';

export default function Background3D({ currentPage = 'home' }) {
  // Page-specific color profiles and dynamic ambient lighting
  const pageThemes = {
    home: {
      theme: 'rosegold',
      bgBase: '#2a0d16',
      dotColor: 'rgba(251, 113, 133, 0.45)',
      orb1: 'from-rose-400/60 via-pink-400/45 to-amber-300/40',
      orb1Anim: 'animate-golden-aura',
      orb2: 'from-amber-200/55 via-rose-300/45 to-orange-400/35',
      orb2Anim: 'animate-sunburst-pulse',
      orb3: 'from-pink-500/50 via-rose-400/40 to-amber-400/35',
      orb3Anim: 'animate-aurora-3',
      vignette: 'rgba(38, 11, 20, 0.35)'
    },
    about: {
      theme: 'matcha',
      bgBase: '#03110b',
      dotColor: 'rgba(16, 185, 129, 0.35)',
      orb1: 'from-emerald-500/35 via-teal-600/30 to-cyan-700/20',
      orb1Anim: 'animate-botanical-drift',
      orb2: 'from-teal-400/30 via-emerald-600/25 to-green-950/30',
      orb2Anim: 'animate-aurora-2',
      orb3: 'from-lime-500/25 via-emerald-700/20 to-teal-800/20',
      orb3Anim: 'animate-aurora-3',
      vignette: 'rgba(2, 10, 7, 0.8)'
    },
    menu: {
      theme: 'berry',
      bgBase: '#130508',
      dotColor: 'rgba(244, 63, 94, 0.35)',
      orb1: 'from-rose-500/35 via-pink-600/30 to-purple-700/25',
      orb1Anim: 'animate-spice-swirl',
      orb2: 'from-amber-500/30 via-rose-600/25 to-fuchsia-800/20',
      orb2Anim: 'animate-aurora-1',
      orb3: 'from-fuchsia-600/25 via-rose-700/20 to-purple-950/30',
      orb3Anim: 'animate-aurora-3',
      vignette: 'rgba(12, 3, 6, 0.8)'
    },
    reservation: {
      theme: 'cosmic',
      bgBase: '#050716',
      dotColor: 'rgba(99, 102, 241, 0.35)',
      orb1: 'from-indigo-500/35 via-blue-600/30 to-violet-700/25',
      orb1Anim: 'animate-cosmic-pulse',
      orb2: 'from-amber-400/30 via-indigo-600/25 to-blue-950/30',
      orb2Anim: 'animate-aurora-2',
      orb3: 'from-purple-600/25 via-indigo-700/20 to-blue-800/25',
      orb3Anim: 'animate-aurora-1',
      vignette: 'rgba(3, 4, 15, 0.8)'
    },
    contact: {
      theme: 'ocean',
      bgBase: '#031017',
      dotColor: 'rgba(6, 182, 212, 0.35)',
      orb1: 'from-cyan-500/35 via-teal-500/30 to-blue-600/25',
      orb1Anim: 'animate-ocean-wave',
      orb2: 'from-sky-400/30 via-cyan-600/25 to-teal-950/30',
      orb2Anim: 'animate-aurora-1',
      orb3: 'from-blue-600/25 via-teal-700/20 to-cyan-800/25',
      orb3Anim: 'animate-aurora-3',
      vignette: 'rgba(2, 9, 14, 0.8)'
    },
    profile: {
      theme: 'royal',
      bgBase: '#0f0416',
      dotColor: 'rgba(168, 85, 247, 0.35)',
      orb1: 'from-purple-500/35 via-fuchsia-600/30 to-pink-600/25',
      orb1Anim: 'animate-royal-glow',
      orb2: 'from-amber-400/30 via-purple-600/25 to-violet-950/30',
      orb2Anim: 'animate-aurora-2',
      orb3: 'from-violet-600/25 via-fuchsia-700/20 to-purple-900/25',
      orb3Anim: 'animate-aurora-3',
      vignette: 'rgba(9, 2, 14, 0.8)'
    },
    admin: {
      theme: 'flame',
      bgBase: '#120406',
      dotColor: 'rgba(239, 68, 68, 0.35)',
      orb1: 'from-red-500/35 via-rose-600/30 to-orange-600/25',
      orb1Anim: 'animate-cyber-radar',
      orb2: 'from-amber-500/30 via-red-600/25 to-rose-950/30',
      orb2Anim: 'animate-aurora-2',
      orb3: 'from-rose-700/25 via-orange-600/20 to-red-950/30',
      orb3Anim: 'animate-aurora-1',
      vignette: 'rgba(11, 2, 4, 0.85)'
    }
  };

  const currentTheme = pageThemes[currentPage] || pageThemes.home;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-colors duration-1000 ease-in-out"
      style={{ backgroundColor: currentTheme.bgBase }}
    >
      {/* 3D Dynamic Interactive Particle Canvas (Beans, Crystals, Leaves, Embers) */}
      <FloatingBeans3D colorTheme={currentTheme.theme} />

      {/* Dynamic Morphing Aurora Orb 1 */}
      <div
        className={`absolute -top-32 -left-32 w-[620px] h-[620px] rounded-full bg-gradient-to-tr ${currentTheme.orb1} blur-[140px] ${currentTheme.orb1Anim} transition-all duration-1000`}
      ></div>

      {/* Dynamic Morphing Aurora Orb 2 */}
      <div
        className={`absolute top-1/4 -right-32 w-[680px] h-[680px] rounded-full bg-gradient-to-bl ${currentTheme.orb2} blur-[150px] ${currentTheme.orb2Anim} transition-all duration-1000`}
      ></div>

      {/* Dynamic Morphing Aurora Orb 3 */}
      <div
        className={`absolute -bottom-32 left-1/3 w-[720px] h-[720px] rounded-full bg-gradient-to-tr ${currentTheme.orb3} blur-[160px] ${currentTheme.orb3Anim} transition-all duration-1000`}
      ></div>

      {/* Ambient Vignette Mesh */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, ${currentTheme.vignette} 100%)`
        }}
      ></div>

      {/* Dynamic Geometric Particle Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none transition-all duration-1000"
        style={{
          backgroundImage: `radial-gradient(${currentTheme.dotColor} 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      ></div>
    </div>
  );
}

