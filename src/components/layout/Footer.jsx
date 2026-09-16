import React, { useState } from 'react';
import { Coffee, MapPin, Phone, Mail, Clock, Heart, Sparkles, Send, Globe, MessageCircle } from 'lucide-react';
import { useCafe } from '../../context/CafeContext';
import CafeLogo from '../common/CafeLogo';

export default function Footer({ setCurrentPage }) {
  const { addToast } = useCafe();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    addToast('🎉 Welcome to the Brew Club! Tasting event invite sent to your inbox.', 'success');
    setEmail('');
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#fbf5ec] via-[#f7eee0] to-[#eee0cd] border-t-2 border-amber-400/40 pt-8 sm:pt-10 pb-6 overflow-hidden z-10 text-[#2d1405] shadow-2xl">
      {/* Radiant ambient gold aurora glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-16 bg-gradient-to-r from-amber-400/25 via-orange-400/20 to-amber-400/25 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 pb-6 border-b border-amber-900/15">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-2.5">
            <div className="flex items-center gap-3">
              <CafeLogo size="footer" animated={true} showSteam={true} showRing={true} showAura={true} />
              <div>
                <span className="font-heading font-black text-xl tracking-tight text-[#2d1405] block leading-none">
                  Morning Brew <span className="text-gradient-amber font-black">Cafe</span>
                </span>
                <span className="text-[10px] text-[#783e15] font-extrabold uppercase tracking-widest mt-0.5 block">
                  Artisanal Coffee & 3D Lounge
                </span>
              </div>
            </div>
            
            <p className="text-xs text-[#5c3316] leading-relaxed max-w-sm font-medium">
              Artisanal single-origin coffee roastery and handcrafted patisserie. Exclusive in-person sensory dining with 3D table reservations.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <a href="#instagram" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white/90 border border-amber-300/80 flex items-center justify-center text-[#783e15] hover:text-white hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-500 hover:border-amber-500 shadow-xs transition-all">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#facebook" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white/90 border border-amber-300/80 flex items-center justify-center text-[#783e15] hover:text-white hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-500 hover:border-amber-500 shadow-xs transition-all">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/></svg>
              </a>
              <a href="#twitter" aria-label="Twitter" className="w-8 h-8 rounded-full bg-white/90 border border-amber-300/80 flex items-center justify-center text-[#783e15] hover:text-white hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-500 hover:border-amber-500 shadow-xs transition-all">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-[#3c1704] uppercase tracking-wider font-heading flex items-center gap-1">
              <Sparkles size={12} className="text-amber-600" /> Explore
            </h4>
            <ul className="space-y-1 text-xs text-[#5c3316] font-medium">
              <li>
                <button onClick={() => setCurrentPage('home')} className="hover:text-amber-800 transition-colors">
                  Home Experience
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('menu')} className="hover:text-amber-800 transition-colors">
                  Artisanal Menu
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('about')} className="hover:text-amber-800 transition-colors">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('reservation')} className="hover:text-amber-800 transition-colors">
                  3D Booking
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Contact */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-[#3c1704] uppercase tracking-wider font-heading flex items-center gap-1">
              <Clock size={12} className="text-amber-600" /> Hours & Visit
            </h4>
            <div className="space-y-1.5 text-xs text-[#5c3316]">
              <div className="flex items-start gap-1.5">
                <Clock size={13} className="text-amber-700 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[#2d1405] font-bold">Mon–Sun: 6:30 AM – 10:30 PM</div>
                </div>
              </div>
              <div className="flex items-start gap-1.5">
                <MapPin size={13} className="text-amber-700 mt-0.5 flex-shrink-0" />
                <span>482 Artisanal Avenue, Downtown</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={13} className="text-amber-700 flex-shrink-0" />
                <span>+1 (555) 345-BREW</span>
              </div>
            </div>
          </div>

          {/* VIP Brew Newsletter */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-[#3c1704] uppercase tracking-wider font-heading flex items-center gap-1">
              <Sparkles size={12} className="text-amber-600" /> VIP Club
            </h4>
            <p className="text-[11px] text-[#5c3316] leading-tight">
              Secret micro-lot drops and cupping tasting invites.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-1.5">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                  className="w-full py-2 px-3 pr-9 rounded-xl bg-white border border-amber-300/80 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 shadow-sm"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1 top-1 bottom-1 px-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 font-bold hover:shadow-sm transition-all flex items-center justify-center shadow-xs"
                >
                  <Send size={11} />
                </button>
              </div>
              <span className="text-[9px] text-[#8c5a36] block font-medium">In-person cafe experience. No spam.</span>
            </form>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#783e15]">
          <div className="font-medium text-[11px]">
            © {new Date().getFullYear()} Morning Brew Cafe. In-Person Artisanal Roastery.
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <button
              onClick={() => setCurrentPage('privacy')}
              className="text-[#783e15] hover:text-amber-900 transition-colors font-bold underline"
            >
              Privacy & Policy
            </button>
            <div className="flex items-center gap-1 text-[#783e15] font-medium">
              <span>Brewed with</span>
              <Heart size={11} className="text-rose-600 fill-rose-600" />
              <span>& 3D WebGL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
