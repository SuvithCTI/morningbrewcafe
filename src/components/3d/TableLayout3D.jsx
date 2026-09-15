import React from 'react';
import { Users, CheckCircle2, Lock, Sparkles, MapPin, Eye } from 'lucide-react';

export const cafeTables = [
  { id: 'T-01', zone: 'Sunlit Window', seats: 2, status: 'Available', view: 'Street & Garden View', coords: { x: '12%', y: '22%' } },
  { id: 'T-02', zone: 'Sunlit Window', seats: 2, status: 'Reserved', view: 'Street View', coords: { x: '12%', y: '50%' } },
  { id: 'T-03', zone: 'Sunlit Window', seats: 4, status: 'Available', view: 'Corner Bay Window', coords: { x: '12%', y: '78%' } },
  
  { id: 'T-04', zone: 'Central Dining', seats: 4, status: 'Available', view: 'Near Barista Stage', coords: { x: '42%', y: '25%' } },
  { id: 'T-05', zone: 'Central Dining', seats: 2, status: 'Available', view: 'Main Cafe Hall', coords: { x: '42%', y: '52%' } },
  { id: 'T-06', zone: 'Central Dining', seats: 6, status: 'Available', view: 'Community Oak Table', coords: { x: '42%', y: '78%' } },

  { id: 'T-07', zone: 'Bar Counter', seats: 1, status: 'Available', view: 'Front Row Espresso Bar', coords: { x: '68%', y: '20%' } },
  { id: 'T-08', zone: 'Bar Counter', seats: 1, status: 'Reserved', view: 'Front Row Espresso Bar', coords: { x: '68%', y: '36%' } },
  { id: 'T-09', zone: 'Cozy Fireplace', seats: 4, status: 'Available', view: 'Warm Hearth & Bookshelf', coords: { x: '68%', y: '65%' } },

  { id: 'T-10', zone: 'VIP Velvet Lounge', seats: 6, status: 'Available', view: 'Private Luxury Alcove', coords: { x: '88%', y: '30%' } },
  { id: 'T-11', zone: 'Outdoor Patio', seats: 4, status: 'Available', view: 'Open Air Terrace & Flora', coords: { x: '88%', y: '72%' } },
];

export default function TableLayout3D({ selectedTable, onSelectTable }) {
  return (
    <div className="w-full bg-[#140e0b]/90 border border-amber-500/20 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Header & Legend */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            <Sparkles size={14} />
            Interactive 3D Cafe Floor Visualizer
          </div>
          <h3 className="text-xl font-bold font-heading text-white">Select Your Preferred Table</h3>
          <p className="text-xs text-stone-400">Click on any green available table to reserve your spot</p>
        </div>

        {/* Status Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-sm"></span>
            <span className="text-stone-300">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-glow-amber animate-pulse"></span>
            <span className="text-amber-300 font-semibold">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-rose-500/80"></span>
            <span className="text-stone-400">Reserved</span>
          </div>
        </div>
      </div>

      {/* 3D Isometric Floor Grid Area */}
      <div className="relative mt-6 w-full min-h-[420px] md:min-h-[480px] rounded-2xl bg-gradient-to-b from-[#1c130d] to-[#0d0907] border border-amber-900/40 p-4 md:p-8 overflow-hidden shadow-inner flex items-center justify-center">
        
        {/* Architectural Room Labels */}
        <div className="absolute top-4 left-6 px-3 py-1 rounded-lg bg-stone-900/80 border border-stone-800 text-[11px] text-amber-200/70 font-medium">
          🌿 Sunlit Window Bay
        </div>
        <div className="absolute top-4 right-6 px-3 py-1 rounded-lg bg-stone-900/80 border border-stone-800 text-[11px] text-amber-200/70 font-medium">
          ✨ VIP Velvet Lounge & Patio
        </div>
        <div className="absolute bottom-4 left-6 px-3 py-1 rounded-lg bg-stone-900/80 border border-stone-800 text-[11px] text-amber-200/70 font-medium">
          ☕ Main Roastery Stage
        </div>
        <div className="absolute bottom-4 right-6 px-3 py-1 rounded-lg bg-stone-900/80 border border-stone-800 text-[11px] text-amber-200/70 font-medium">
          🔥 Fireplace Hearth
        </div>

        {/* Ambient Grid Floor Lines */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #f59e0b 1px, transparent 1px), linear-gradient(to bottom, #f59e0b 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        ></div>

        {/* Interactive Table Nodes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full relative z-10 max-w-4xl py-4">
          {cafeTables.map(table => {
            const isSelected = selectedTable?.id === table.id;
            const isReserved = table.status === 'Reserved';

            return (
              <button
                key={table.id}
                disabled={isReserved}
                onClick={() => onSelectTable(table)}
                className={`group relative p-4 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between ${
                  isReserved
                    ? 'bg-stone-900/40 border-stone-800 opacity-50 cursor-not-allowed'
                    : isSelected
                    ? 'bg-gradient-to-b from-amber-500/25 to-amber-900/40 border-amber-400 shadow-glow-amber scale-105 ring-2 ring-amber-400'
                    : 'bg-stone-900/80 border-stone-800 hover:border-emerald-500/60 hover:bg-stone-800/80 hover:-translate-y-1 shadow-lg'
                }`}
              >
                {/* Table Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-extrabold px-2.5 py-1 rounded-lg ${
                    isSelected
                      ? 'bg-amber-400 text-stone-950 shadow-sm'
                      : isReserved
                      ? 'bg-stone-800 text-stone-400'
                      : 'bg-stone-800 text-amber-300 group-hover:bg-emerald-500/20 group-hover:text-emerald-300'
                  }`}>
                    {table.id}
                  </span>

                  <span className={`w-2.5 h-2.5 rounded-full ${
                    isReserved ? 'bg-rose-500' : isSelected ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'
                  }`}></span>
                </div>

                {/* Table Visual Shape Icon */}
                <div className="my-2 flex items-center justify-center">
                  <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-lg'
                      : isReserved
                      ? 'bg-stone-800/80 text-stone-500'
                      : 'bg-stone-800 text-stone-300 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 border border-stone-700/50'
                  }`}>
                    <Users size={18} className="mb-0.5" />
                    <span className="text-[10px] font-bold">{table.seats} Seats</span>
                  </div>
                </div>

                {/* Zone & View Info */}
                <div className="mt-2 pt-2 border-t border-stone-800/80">
                  <div className="text-xs font-semibold text-stone-200 truncate">{table.zone}</div>
                  <div className="text-[11px] text-stone-400 truncate">{table.view}</div>
                </div>

                {/* Selected Checkmark Badge */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center shadow-md">
                    <CheckCircle2 size={16} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Table Summary Banner */}
      {selectedTable && (
        <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold font-heading text-base">
              {selectedTable.id}
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                Selected: {selectedTable.zone} ({selectedTable.id})
              </div>
              <div className="text-xs text-amber-200/80">
                Accommodates up to {selectedTable.seats} guests • {selectedTable.view}
              </div>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1.5">
            <CheckCircle2 size={14} /> Ready to Book
          </span>
        </div>
      )}
    </div>
  );
}
