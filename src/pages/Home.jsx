import React, { useState } from 'react';
import { Coffee, Sparkles, ArrowRight, Award, ShieldCheck, Heart, Clock, Compass, ChevronRight, Play, Calendar } from 'lucide-react';
import CoffeeCup3D from '../components/3d/CoffeeCup3D';
import CoffeeCustomizer3D from '../components/3d/CoffeeCustomizer3D';
import MenuItemCard from '../components/menu/MenuItemCard';
import { useCafe } from '../context/CafeContext';

export default function Home({ setCurrentPage }) {
  const { menuItems } = useCafe();
  const [cupTheme, setCupTheme] = useState('darjeeling'); // 'darjeeling' | 'masala_tea' | 'green_tea'

  const specials = menuItems.filter(item => item.isSpecial).slice(0, 4);

  const getCupColorProps = () => {
    if (cupTheme === 'masala_tea') {
      return { cupColor: '#ffffff', liquidColor: '#92400e', foamColor: '#fef3c7' };
    }
    if (cupTheme === 'green_tea') {
      return { cupColor: '#ffffff', liquidColor: '#166534', foamColor: '#dcfce7' };
    }
    // Default Darjeeling Gold Amber Tea
    return { cupColor: '#ffffff', liquidColor: '#d97706', foamColor: '#fffbeb' };
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-16">
      
      {/* HERO SECTION WITH 3D CANVAS */}
      <section className="relative min-h-[90vh] flex items-center pt-24 sm:pt-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Left Hero Content (order-2 on mobile, order-1 on lg screens) */}
            <div className="order-2 lg:order-1 lg:col-span-6 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-transparent border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md shadow-lg">
                <Sparkles size={16} className="text-amber-400 animate-spin-slow" />
                <span>In-Person Artisanal Roastery & Patisserie</span>
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white font-heading tracking-tight leading-[1.12]">
                Wake Up to <br />
                <span className="text-gradient-amber">Perfection</span> in <br />
                <span className="text-gradient-rose">Every Single Drop</span>
              </h1>

              <p className="text-base sm:text-lg text-stone-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                An exclusive in-person sensory cafe experience. Hand-roasted single-origin beans, velvety micro-foams, and fresh morning pastries served fresh at your reserved table.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setCurrentPage('reservation')}
                  className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 text-stone-950 font-extrabold font-heading text-base shadow-lg hover:shadow-glow-amber hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Calendar size={20} />
                  <span>Reserve Table (In-Person)</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => setCurrentPage('menu')}
                  className="w-full sm:w-auto py-4 px-7 rounded-2xl bg-stone-900/80 hover:bg-stone-800 border border-amber-500/30 text-white font-bold text-base hover:border-amber-400 transition-all flex items-center justify-center gap-2"
                >
                  <Coffee size={18} className="text-amber-400" />
                  <span>Explore Menu</span>
                </button>
              </div>

              {/* Social Proof Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-800/80 text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 font-heading">100%</div>
                  <div className="text-xs text-stone-400">Single-Origin Arabica</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-rose-400 font-heading">4.9★</div>
                  <div className="text-xs text-stone-400">Artisanal Craftsmanship</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-heading">3D</div>
                  <div className="text-xs text-stone-400">Visual Table Layout</div>
                </div>
              </div>

            </div>

            {/* Right Hero 3D Interactive Coffee Canvas (order-1 on mobile, order-2 on lg screens) */}
            <div className="order-1 lg:order-2 lg:col-span-6 relative flex flex-col items-center">
              {/* 3D Canvas Box */}
              <div className="w-full max-w-sm sm:max-w-md lg:max-w-xl xl:max-w-2xl aspect-square relative rounded-full flex items-center justify-center">
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-amber-500/20 via-orange-500/10 to-transparent blur-2xl pointer-events-none"></div>
                <CoffeeCup3D {...getCupColorProps()} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* INTERACTIVE 3D COFFEE FLAVOR LAB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={14} />
            Virtual Tasting Experience
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Explore Your Flavor Profile
          </h2>
          <p className="text-sm text-stone-400 mt-2">
            Simulate custom roast extractions, plant milks, and artisanal flavor syrups in our real-time 3D coffee builder.
          </p>
        </div>

        <CoffeeCustomizer3D onNavigateReservation={() => setCurrentPage('reservation')} />
      </section>

      {/* DAILY SPECIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              Chef & Barista Picks
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              Today's Signature Specials
            </h2>
          </div>

          <button
            onClick={() => setCurrentPage('menu')}
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View Full Menu</span>
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {specials.map(item => (
            <MenuItemCard key={item.id} item={item} onReserveTable={() => setCurrentPage('reservation')} />
          ))}
        </div>
      </section>

      {/* WHY MORNING BREW CAFE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-stone-900/80 to-[#140e0b]/90 border border-stone-800 p-8 sm:p-12 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              Why Coffee Lovers Choose Us
            </h2>
            <p className="text-sm text-stone-400 mt-2">
              Every detail of Morning Brew is calibrated to deliver an extraordinary in-person sensory experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl shadow-inner">
                ☕
              </div>
              <h3 className="text-lg font-bold text-white font-heading">Micro-Lot Roasting</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                We roast our green coffee beans weekly in small 15kg batches, preserving subtle floral notes and rich chocolate undertones.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xl shadow-inner">
                🥐
              </div>
              <h3 className="text-lg font-bold text-white font-heading">Handmade Parisian Pastries</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Layered French butter croissants, rich brioches, and artisan sourdough baked fresh every morning by our master patissiers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl shadow-inner">
                ✨
              </div>
              <h3 className="text-lg font-bold text-white font-heading">Interactive 3D Seating</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Reserve your favorite window booth or fireplace table on our 3D floor map with instant digital ticket passes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TABLE RESERVATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-amber-950/90 via-[#1c120c]/95 to-amber-900/80 border border-amber-500/30 p-8 sm:p-14 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 text-center lg:text-left max-w-xl">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              Priority Seating
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              Secure Your Cozy Window Table
            </h2>
            <p className="text-sm text-amber-100/80 leading-relaxed">
              Planning a morning date, business meetup, or quiet work session? Pick your exact table on our interactive 3D floor map with zero waiting time.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('reservation')}
            className="py-4 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-400 text-stone-950 font-extrabold font-heading text-base shadow-glow-amber hover:scale-105 active:scale-95 transition-all duration-200 flex-shrink-0 flex items-center gap-2"
          >
            <Calendar size={20} />
            <span>Open 3D Table Visualizer</span>
            <ArrowRight size={18} />
          </button>

        </div>
      </section>

    </div>
  );
}
