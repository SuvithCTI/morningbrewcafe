import React, { useState } from 'react';
import { Star, Sparkles, Sliders, Flame, Zap, Eye, Calendar } from 'lucide-react';
import { useCafe } from '../../context/CafeContext';

export default function MenuItemCard({ item, onReserveTable }) {
  const { setCustomizingItem } = useCafe();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg) translateY(-6px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out, box-shadow 0.4s ease-out'
      }}
      className="group relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-stone-900/90 to-[#120d0a]/95 border border-stone-800 hover:border-amber-500/40 p-2.5 sm:p-5 flex flex-col justify-between shadow-lg hover:shadow-glow-amber overflow-hidden cursor-pointer transition-all"
      onClick={() => setCustomizingItem(item)}
    >
      {/* Background radial glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${item.accentColor || '#f59e0b'}25 0%, transparent 70%)`
        }}
      ></div>

      <div>
        {/* Top Image Container */}
        <div className="relative w-full h-32 sm:h-52 rounded-xl sm:rounded-2xl overflow-hidden bg-stone-950 mb-2.5 sm:mb-4">
          <img
            src={item.image}
            alt={item.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80';
            }}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20"></div>

          {/* Badges */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-wrap gap-1 sm:gap-1.5">
            {item.isSpecial && (
              <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 text-[8px] sm:text-[10px] font-extrabold tracking-wider uppercase shadow-md flex items-center gap-0.5 sm:gap-1">
                <Sparkles size={8} className="sm:w-2.5 sm:h-2.5" /> Special
              </span>
            )}
            {item.isPopular && (
              <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-rose-500/90 text-white text-[8px] sm:text-[10px] font-extrabold tracking-wider uppercase shadow-md">
                Popular
              </span>
            )}
          </div>

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] sm:text-[11px] font-bold text-amber-300 flex items-center gap-0.5 sm:gap-1">
            <Star size={10} className="fill-amber-400 text-amber-400 sm:w-3 sm:h-3" />
            <span>{item.rating || 4.9}</span>
          </div>

          {/* Calorie & Caffeine Pill */}
          <div className="absolute bottom-1.5 left-2 right-2 sm:bottom-2.5 sm:left-3 sm:right-3 flex items-center justify-between text-[9px] sm:text-[11px] text-stone-300 font-medium">
            <span className="px-1.5 py-0.5 rounded bg-stone-900/80 backdrop-blur-sm border border-stone-700/50 flex items-center gap-0.5 sm:gap-1">
              <Flame size={9} className="text-orange-400 sm:w-2.5 sm:h-2.5" /> {item.calories} <span className="hidden sm:inline">kcal</span>
            </span>
            {item.caffeine && (
              <span className="px-1.5 py-0.5 rounded bg-stone-900/80 backdrop-blur-sm border border-stone-700/50 flex items-center gap-0.5 sm:gap-1 text-amber-300">
                <Zap size={9} className="text-amber-400 sm:w-2.5 sm:h-2.5" /> {item.caffeine}
              </span>
            )}
          </div>
        </div>

        {/* Dietary Tags (Hidden on Mobile View) */}
        {item.dietary && item.dietary.length > 0 && (
          <div className="hidden sm:flex flex-wrap gap-1 sm:gap-1.5 mb-1.5 sm:mb-2">
            {item.dietary.slice(0, 2).map((d, idx) => (
              <span
                key={idx}
                className="text-[8px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20"
              >
                {d}
              </span>
            ))}
          </div>
        )}

        {/* Title & Category */}
        <div className="mb-1 sm:mb-2">
          <span className="text-[9px] sm:text-[11px] font-semibold text-stone-400 tracking-wider uppercase block">
            {item.category}
          </span>
          <h3 className="text-xs sm:text-base md:text-lg font-bold text-white font-heading group-hover:text-amber-300 transition-colors leading-tight sm:leading-snug line-clamp-1 sm:line-clamp-2">
            {item.name}
          </h3>
        </div>

        {/* Short Description */}
        <p className="text-[10px] sm:text-xs text-stone-400 line-clamp-1 sm:line-clamp-2 leading-tight sm:leading-relaxed mb-2 sm:mb-4">
          {item.description}
        </p>
      </div>

      {/* Footer / Price & Details CTA */}
      <div className="pt-2 sm:pt-3 border-t border-stone-800/80 flex items-center justify-between gap-1.5 sm:gap-2">
        <div>
          <span className="text-[8px] sm:text-[10px] text-stone-500 uppercase block font-medium">Price</span>
          <span className="text-sm sm:text-xl font-extrabold text-amber-400 font-heading">
            ₹{Number(item.price).toFixed(0)}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setCustomizingItem(item);
          }}
          className="py-1 px-2 sm:py-2 sm:px-3.5 rounded-lg sm:rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/30 text-[10px] sm:text-xs font-bold font-heading flex items-center gap-1 transition-all shadow-sm flex-shrink-0"
        >
          <Eye size={12} className="sm:w-3.5 sm:h-3.5" />
          <span className="hidden xs:inline">Details</span>
        </button>
      </div>
    </div>
  );
}
