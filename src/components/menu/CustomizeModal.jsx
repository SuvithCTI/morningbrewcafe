import React, { useState } from 'react';
import { X, Sparkles, Coffee, Flame, Zap, Calendar, Heart, CheckCircle2 } from 'lucide-react';
import { useCafe } from '../../context/CafeContext';

export default function CustomizeModal({ onNavigateReservation }) {
  const { customizingItem, setCustomizingItem } = useCafe();

  if (!customizingItem) return null;

  const isDrink = customizingItem.category.toLowerCase().includes('coffee') || 
                  customizingItem.category.toLowerCase().includes('tea') || 
                  customizingItem.category.toLowerCase().includes('brew');

  const [selectedSize, setSelectedSize] = useState('Regular (12oz)');
  const [selectedMilk, setSelectedMilk] = useState('Oat Milk');

  const handleBookTable = () => {
    setCustomizingItem(null);
    if (onNavigateReservation) {
      onNavigateReservation();
    } else {
      window.location.hash = 'reservation';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#150f0b] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh] preserve-3d"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setCustomizingItem(null)}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X size={18} />
        </button>

        {/* Item Header Banner */}
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-stone-800">
          <img
            src={customizingItem.image}
            alt={customizingItem.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80';
            }}
            className="w-32 h-32 rounded-2xl object-cover shadow-xl ring-2 ring-amber-500/30 flex-shrink-0"
          />
          <div className="text-center sm:text-left">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              {customizingItem.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              {customizingItem.name}
            </h2>
            <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">
              {customizingItem.description}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-xs text-stone-300">
              <span className="flex items-center gap-1"><Flame size={12} className="text-orange-400" /> {customizingItem.calories} kcal</span>
              {customizingItem.caffeine && (
                <span className="text-amber-300 flex items-center gap-1"><Zap size={12} /> {customizingItem.caffeine}</span>
              )}
              <span className="font-extrabold text-amber-400 font-heading text-base ml-auto">
                ₹{Number(customizingItem.price).toFixed(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Ingredients & Tasting Profile */}
        <div className="py-5 space-y-5 border-b border-stone-800 text-xs">
          <div>
            <h4 className="font-bold text-amber-300 uppercase tracking-wider mb-2 font-heading">
              Artisanal Ingredients & Recipe
            </h4>
            <div className="flex flex-wrap gap-2">
              {(customizingItem.ingredients || ['Single-Origin Arabica', 'Organic Spring Water', 'Velvet Foam']).map((ing, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 flex items-center gap-1.5"
                >
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* In-Cafe Dining Notice */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border border-amber-500/20 text-stone-300 space-y-1">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <Coffee size={14} /> Served Fresh Exclusively in Our Roastery Cafe
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              We do not offer delivery or online shipping in order to preserve the uncompromised micro-crema, temperature, and fresh aromatic complexity of every pour.
            </p>
          </div>
        </div>

        {/* Action Footer: Table Booking CTA */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-stone-400">
            Visit us in person or reserve a table to experience this brew fresh at your table.
          </div>

          <button
            onClick={handleBookTable}
            className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 text-stone-950 font-bold font-heading text-xs shadow-lg hover:shadow-glow-amber hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 flex-shrink-0"
          >
            <Calendar size={15} />
            <span>Reserve Table to Taste</span>
          </button>
        </div>

      </div>
    </div>
  );
}
