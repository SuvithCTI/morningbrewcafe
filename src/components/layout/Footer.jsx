import React, { useState } from 'react';
import { Coffee, MapPin, Phone, Mail, Clock, Heart, Sparkles, Send, Globe, MessageCircle } from 'lucide-react';
import { useCafe } from '../../context/CafeContext';

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
    <footer className="relative bg-[#0e0a07] border-t border-amber-900/30 pt-16 pb-12 overflow-hidden z-10">
      {/* Glow decorative blur */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-amber-500/10 via-orange-500/15 to-rose-500/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-400 p-[2px] shadow-glow-amber">
                <div className="w-full h-full bg-[#18110b] rounded-[10px] flex items-center justify-center">
                  <Coffee size={20} className="text-amber-400" />
                </div>
              </div>
              <span className="font-heading font-extrabold text-xl text-white">
                Morning Brew <span className="text-amber-400">Cafe</span>
              </span>
            </div>
            
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Artisanal single-origin coffee roastery and handcrafted patisserie. An exclusive in-person sensory dining experience with 3D interactive table reservations.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#instagram" aria-label="Instagram" className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#facebook" aria-label="Facebook" className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/></svg>
              </a>
              <a href="#twitter" aria-label="Twitter" className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-heading">Explore</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <button onClick={() => setCurrentPage('home')} className="hover:text-amber-400 transition-colors">
                  Home Experience
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('menu')} className="hover:text-amber-400 transition-colors">
                  Artisanal Menu
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('about')} className="hover:text-amber-400 transition-colors">
                  Our Coffee Story
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('reservation')} className="hover:text-amber-400 transition-colors">
                  3D Table Booking
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('contact')} className="hover:text-amber-400 transition-colors">
                  Contact Us
                </button>
              </li>

            </ul>
          </div>

          {/* Hours & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-heading">Hours & Visit</h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <Clock size={15} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-stone-200 font-semibold">Mon – Fri: 6:30 AM – 9:00 PM</div>
                  <div>Sat – Sun: 7:30 AM – 10:30 PM</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <span>482 Artisanal Avenue, Downtown Roastery Plaza</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-amber-400 flex-shrink-0" />
                <span>+1 (555) 345-BREW</span>
              </div>
            </div>
          </div>

          {/* VIP Brew Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-heading">VIP Brew Club</h4>
            <p className="text-xs text-stone-400">
              Subscribe for secret micro-lot roast drops, coffee cupping tasting invitations, and exclusive perks.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full py-2.5 px-3.5 pr-10 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 rounded-lg bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors flex items-center justify-center"
                >
                  <Send size={13} />
                </button>
              </div>
              <span className="text-[10px] text-stone-500 block">In-person cafe experience. No spam ever.</span>
            </form>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Morning Brew Cafe. In-Person Artisanal Roastery & Dining Lounge.
          </div>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Brewed with</span>
            <Heart size={13} className="text-rose-500 fill-rose-500" />
            <span>& 3D WebGL Technology</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
