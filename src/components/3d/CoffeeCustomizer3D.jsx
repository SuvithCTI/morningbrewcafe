import React, { useState } from 'react';
import { Sparkles, Coffee, Calendar, Flame, Check } from 'lucide-react';

export default function CoffeeCustomizer3D({ onNavigateReservation }) {
  const [baseCoffee, setBaseCoffee] = useState('Café Latte');
  const [size, setSize] = useState('Regular');
  const [milkType, setMilkType] = useState('Oat Milk');
  const [roastType, setRoastType] = useState('Blonde Roast (Light & Floral)');
  const [syrup, setSyrup] = useState('Salted Caramel');
  const [topping, setTopping] = useState('Belgian Cocoa Dust');
  const [extraShots, setExtraShots] = useState(1);

  // Dynamic visual configurations with INR base prices
  const coffeeVisuals = {
    'Cappuccino': { liquidHeight: '45%', milkColor: '#fffbeb', liquidColor: '#451a03', foamHeight: '35%', basePrice: 220 },
    'Café Latte': { liquidHeight: '75%', milkColor: '#fffbeb', liquidColor: '#92400e', foamHeight: '18%', basePrice: 240 },
    'Caramel Macchiato': { liquidHeight: '70%', milkColor: '#fef3c7', liquidColor: '#78350f', foamHeight: '22%', basePrice: 280 },
    'Cold Coffee': { liquidHeight: '85%', milkColor: '#ede9fe', liquidColor: '#26140b', foamHeight: '12%', basePrice: 210 },
    'Iced Americano': { liquidHeight: '90%', milkColor: '#382217', liquidColor: '#170c06', foamHeight: '5%', basePrice: 190 }
  };

  const currentVisual = coffeeVisuals[baseCoffee];

  // Price calculations in INR
  let calculatedPrice = currentVisual.basePrice;
  if (size === 'Large') calculatedPrice += 50;
  if (size === 'Small') calculatedPrice -= 30;
  if (milkType !== 'Whole Milk') calculatedPrice += 40;
  if (syrup !== 'None') calculatedPrice += 35;
  calculatedPrice += extraShots * 40;
  if (topping === '24K Gold Flakes') calculatedPrice += 120;

  const handleBookTable = () => {
    if (onNavigateReservation) {
      onNavigateReservation();
    } else {
      window.location.hash = 'reservation';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full rounded-3xl bg-gradient-to-b from-[#1c1510]/90 to-[#100c09]/95 border border-amber-500/20 backdrop-blur-xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
      {/* Background glow ambiance */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: 3D Visualizer Glass Mug */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4">
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-2">
              <Sparkles size={13} className="text-amber-400" />
              Interactive 3D Flavor Lab
            </span>
            <h3 className="text-2xl font-bold font-heading text-white">Virtual Coffee Tasting</h3>
            <p className="text-sm text-stone-400">Preview density and micro-crema before visiting</p>
          </div>

          {/* 3D Glass Mug Simulation */}
          <div className="relative w-52 h-72 rounded-b-[42px] rounded-t-lg border-4 border-stone-400/30 bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md shadow-2xl p-2 flex flex-col justify-end overflow-hidden preserve-3d">
            {/* Glass reflections */}
            <div className="absolute top-0 left-3 w-3 h-full bg-white/15 rounded-full blur-[1px] pointer-events-none z-30"></div>
            <div className="absolute top-0 right-3 w-1.5 h-full bg-white/10 rounded-full pointer-events-none z-30"></div>

            {/* Handle */}
            <div className="absolute top-16 -right-9 w-9 h-28 rounded-r-3xl border-4 border-l-0 border-stone-400/30 pointer-events-none"></div>

            {/* Steam bubbles */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex gap-3 pointer-events-none">
              <div className="w-3 h-10 bg-amber-200/40 rounded-full filter blur-md animate-steam"></div>
              <div className="w-4 h-12 bg-white/30 rounded-full filter blur-md animate-steam" style={{ animationDelay: '0.8s' }}></div>
              <div className="w-3 h-8 bg-amber-100/30 rounded-full filter blur-md animate-steam" style={{ animationDelay: '1.6s' }}></div>
            </div>

            {/* Drizzle & Topping Top Overlay */}
            <div className="relative z-20 w-full mb-1 flex flex-col items-center">
              {topping !== 'None' && (
                <div className="w-full py-1.5 px-2 rounded-t-xl bg-amber-900/60 border-b border-amber-400/30 text-[10px] text-center text-amber-200 font-semibold tracking-wider flex items-center justify-center gap-1 shadow-inner">
                  <Sparkles size={10} className="text-amber-300" />
                  {topping}
                </div>
              )}
            </div>

            {/* Foam Micro-layer */}
            <div
              className="w-full rounded-t-2xl transition-all duration-500 relative flex items-center justify-center shadow-lg"
              style={{
                height: currentVisual.foamHeight,
                backgroundColor: currentVisual.milkColor,
                backgroundImage: 'radial-gradient(circle, rgba(217, 119, 6, 0.4) 15%, transparent 20%)',
                backgroundSize: '16px 16px'
              }}
            >
              <div className="text-[10px] font-bold text-amber-950 uppercase tracking-widest opacity-80">
                {baseCoffee} Micro-Crema
              </div>
            </div>

            {/* Coffee Base Layer */}
            <div
              className="w-full rounded-b-[34px] transition-all duration-700 relative overflow-hidden"
              style={{
                height: currentVisual.liquidHeight,
                background: `linear-gradient(to top, ${currentVisual.liquidColor}, ${milkType === 'Whole Milk' ? '#78350f' : '#92400e'})`
              }}
            >
              {syrup !== 'None' && (
                <div className="absolute bottom-0 inset-x-0 h-6 bg-amber-400/30 blur-[2px] animate-pulse"></div>
              )}

              <div className="absolute inset-0 flex flex-col items-center justify-center text-amber-100/90 text-xs font-medium space-y-1">
                <span className="font-semibold text-white drop-shadow-md">
                  {extraShots > 0 ? `+${extraShots} Espresso Shot${extraShots > 1 ? 's' : ''}` : 'Standard Shot'}
                </span>
                <span className="text-[11px] text-amber-200/80">{milkType} Blend</span>
              </div>
            </div>
          </div>

          {/* Price & Summary Tag */}
          <div className="mt-6 text-center">
            <div className="text-3xl font-extrabold text-gradient-amber font-heading">
              ₹{calculatedPrice.toFixed(0)}
            </div>
            <div className="text-xs text-stone-400 mt-1">
              Served fresh at your reserved cafe table
            </div>
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Base Coffee Type */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2.5">
              1. Choose Coffee Base
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {['Cappuccino', 'Café Latte', 'Caramel Macchiato', 'Cold Coffee', 'Iced Americano'].map(type => (
                <button
                  key={type}
                  onClick={() => setBaseCoffee(type)}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all duration-200 border text-center whitespace-nowrap overflow-hidden text-ellipsis ${
                    baseCoffee === type
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 border-amber-400 shadow-glow-amber scale-105'
                      : 'bg-stone-900/60 text-stone-300 border-stone-800 hover:border-amber-500/40'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Size & Extra Shots */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                2. Cup Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'Small', tag: '8oz' },
                  { name: 'Regular', tag: '12oz' },
                  { name: 'Large', tag: '16oz' }
                ].map(s => (
                  <button
                    key={s.name}
                    onClick={() => setSize(s.name)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all border text-center ${
                      size === s.name
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-sm'
                        : 'bg-stone-900/40 text-stone-400 border-stone-800 hover:text-stone-200'
                    }`}
                  >
                    <div>{s.name}</div>
                    <div className="text-[10px] opacity-70">{s.tag}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                3. Espresso Roast Shots
              </label>
              <div className="flex items-center gap-3 bg-stone-900/60 p-1.5 rounded-xl border border-stone-800">
                {[0, 1, 2, 3].map(shots => (
                  <button
                    key={shots}
                    onClick={() => setExtraShots(shots)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      extraShots === shots
                        ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    {shots === 0 ? 'Single' : `+${shots}`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Milk Choice */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
              4. Artisanal Milk
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Whole Milk', 'Oat Milk', 'Almond Milk', 'Coconut Milk'].map(m => (
                <button
                  key={m}
                  onClick={() => setMilkType(m)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium transition-all border ${
                    milkType === m
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/60'
                      : 'bg-stone-900/40 text-stone-400 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Syrups & Toppings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                5. Gourmet Syrup
              </label>
              <select
                value={syrup}
                onChange={e => setSyrup(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-stone-900/80 border border-stone-700 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              >
                <option value="None">None (Pure Coffee)</option>
                <option value="Salted Caramel">Salted Butter Caramel</option>
                <option value="Madagascar Vanilla">Madagascar Bourbon Vanilla</option>
                <option value="Spiced Hazelnut">Spiced Oregon Hazelnut</option>
                <option value="Persian Rose">Organic Persian Rose</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                6. Barista Topping Dust
              </label>
              <select
                value={topping}
                onChange={e => setTopping(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-stone-900/80 border border-stone-700 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              >
                <option value="None">None</option>
                <option value="Belgian Cocoa Dust">70% Belgian Cocoa Dust</option>
                <option value="Cinnamon Bark">Ceylon Cinnamon Powder</option>
                <option value="Crushed Pistachio">Sicilian Crushed Pistachio</option>
                <option value="24K Gold Flakes">24K Edible Gold Flakes</option>
              </select>
            </div>
          </div>

          {/* Action: Book Table */}
          <div className="pt-2">
            <button
              onClick={handleBookTable}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 text-stone-950 font-bold font-heading text-base flex items-center justify-center gap-3 shadow-lg hover:shadow-glow-amber hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
            >
              <Calendar size={20} className="text-stone-950" />
              <span>Reserve Table to Taste in Cafe • ₹{calculatedPrice.toFixed(0)}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
