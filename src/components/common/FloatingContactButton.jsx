import React from 'react';
import { MessageSquare, Phone, Sparkles } from 'lucide-react';

export default function FloatingContactButton({ currentPage, setCurrentPage }) {
  const isContactPage = currentPage === 'contact';

  return (
    <aside aria-label="Quick Contact Assistance" className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip Label on Hover */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 pointer-events-none">
        {isContactPage ? 'You are on Contact Us' : 'Need Help? Contact Us'}
      </span>

      {/* Floating Small Icon Button */}
      <button
        onClick={() => setCurrentPage('contact')}
        aria-label="Contact Cafe Concierge"
        className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_6px_25px_rgba(245,158,11,0.35)] hover:shadow-[0_8px_35px_rgba(245,158,11,0.6)] hover:scale-110 active:scale-95 ${
          isContactPage
            ? 'bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 text-stone-950 ring-4 ring-amber-500/30'
            : 'bg-gradient-to-tr from-[#1f150d] via-[#2d1d12] to-[#1a110a] text-amber-400 border border-amber-400/50 hover:text-stone-950 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-amber-400 hover:to-orange-500'
        }`}
      >
        {/* Pulsing halo ring */}
        {!isContactPage && (
          <span className="absolute -inset-1 rounded-full bg-amber-500/20 animate-ping pointer-events-none" />
        )}

        <MessageSquare size={20} className="transition-transform duration-300 group-hover:rotate-6" />

        {/* Small live notification dot */}
        <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-stone-900 rounded-full shadow-xs" />
      </button>
    </aside>
  );
}
