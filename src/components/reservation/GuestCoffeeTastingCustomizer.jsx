import React, { useState } from 'react';
import { 
  Coffee, Sparkles, Plus, Trash2, Check, Flame, Users, Droplets, Zap, 
  Wand2, ChevronRight, SlidersHorizontal, RefreshCw, UserPlus, X, User
} from 'lucide-react';
import { defaultDrinkOptions, tastingPresets, createDefaultGuestTasting } from '../../utils/tastingDefaults';
export { defaultDrinkOptions, tastingPresets, createDefaultGuestTasting };

export default function GuestCoffeeTastingCustomizer({ 
  guestTastings, 
  setGuestTastings, 
  totalGuests, 
  onAddMember, 
  onRemoveMember 
}) {
  const [activeGuestIndex, setActiveGuestIndex] = useState(0);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMemberNameInput, setNewMemberNameInput] = useState('');

  // Safeguard active guest
  const currentGuest = guestTastings[activeGuestIndex] || guestTastings[0] || createDefaultGuestTasting(1);

  const updateCurrentGuest = (fields) => {
    setGuestTastings(prev => {
      const updated = [...prev];
      if (updated[activeGuestIndex]) {
        updated[activeGuestIndex] = { ...updated[activeGuestIndex], ...fields };
      }
      return updated;
    });
  };

  const handleAddNewMember = (nameToUse) => {
    const targetName = nameToUse || newMemberNameInput.trim() || `Guest ${guestTastings.length + 1}`;
    if (onAddMember) {
      const newIdx = onAddMember(targetName);
      if (typeof newIdx === 'number') {
        setActiveGuestIndex(newIdx);
      } else {
        setActiveGuestIndex(guestTastings.length);
      }
    } else {
      const newGuest = createDefaultGuestTasting(guestTastings.length + 1, targetName);
      setGuestTastings(prev => [...prev, newGuest]);
      setActiveGuestIndex(guestTastings.length);
    }
    setNewMemberNameInput('');
    setShowAddMemberModal(false);
  };

  const handleRemoveGuest = (indexToRemove, e) => {
    if (e) e.stopPropagation();
    if (guestTastings.length <= 1) return;

    if (onRemoveMember) {
      onRemoveMember(indexToRemove);
    } else {
      setGuestTastings(prev => prev.filter((_, idx) => idx !== indexToRemove));
    }

    if (activeGuestIndex >= indexToRemove && activeGuestIndex > 0) {
      setActiveGuestIndex(activeGuestIndex - 1);
    }
  };

  const applyPreset = (preset) => {
    updateCurrentGuest({
      baseCoffee: preset.base,
      size: preset.size,
      roastType: preset.roast,
      milkType: preset.milk,
      syrup: preset.syrup,
      topping: preset.topping,
      temperature: preset.temp,
      extraShots: preset.shots
    });
  };

  // Find visual config for the 3D Mug rendering
  const activeBaseConfig = defaultDrinkOptions.coffeeBases.find(b => b.name === currentGuest.baseCoffee) || defaultDrinkOptions.coffeeBases[0];

  return (
    <div className="space-y-6 rounded-3xl bg-stone-900/90 border border-amber-500/30 p-4 sm:p-7 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Radiant ambient background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      {/* Header with Quick Add Member CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Sparkles size={14} className="text-amber-400" />
            Virtual Coffee Tasting Pre-Selection
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            Customize Coffee Taste for Each Member ({guestTastings.length} {guestTastings.length === 1 ? 'Guest' : 'Guests'})
          </h3>
          <p className="text-xs text-stone-300 mt-1">
            Add party members and give each guest their own unique roast, milk, and artisanal foam.
          </p>
        </div>

        {/* Add Member Top CTA */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            type="button"
            onClick={() => setShowAddMemberModal(true)}
            className="py-2 px-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-stone-950 font-black text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <UserPlus size={15} />
            <span>+ Add Member</span>
          </button>

          <div className="px-3 py-2 rounded-2xl bg-stone-950 border border-amber-500/30 text-xs text-amber-300 font-semibold flex items-center gap-1.5">
            <Users size={15} className="text-amber-400" />
            <span>{guestTastings.length} Guests</span>
          </div>
        </div>
      </div>

      {/* Inline Add Member Popover / Input Bar */}
      {showAddMemberModal && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/80 via-[#1c120c] to-amber-950/80 border border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-stone-950 font-bold flex items-center justify-center text-xs flex-shrink-0">
              <UserPlus size={16} />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Add New Party Member</span>
              <span className="text-[10px] text-stone-400">Give them a name or use default</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              autoFocus
              value={newMemberNameInput}
              onChange={e => setNewMemberNameInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddNewMember();
                }
              }}
              placeholder={`e.g. Alex, Rahul, Sarah...`}
              className="py-2 px-3 rounded-xl bg-stone-950 border border-amber-500/40 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 flex-1 sm:w-48"
            />
            <button
              type="button"
              onClick={() => handleAddNewMember()}
              className="py-2 px-4 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-sm whitespace-nowrap"
            >
              Add Member
            </button>
            <button
              type="button"
              onClick={() => setShowAddMemberModal(false)}
              className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-white"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Guest Selector Tabs with + Add Button */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-stone-400 font-medium">
          <span>Select Member to Style Coffee:</span>
          <span className="text-amber-400 font-bold">Currently Styling: {currentGuest.guestName}</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {guestTastings.map((guest, idx) => {
            const isSelected = activeGuestIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveGuestIndex(idx)}
                className={`group px-3.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 border flex items-center gap-2 flex-shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 border-amber-400 shadow-glow-amber scale-105'
                    : 'bg-stone-950/80 text-stone-300 border-stone-800 hover:border-amber-500/50 hover:text-white'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  isSelected ? 'bg-stone-950 text-amber-400' : 'bg-stone-800 text-stone-300'
                }`}>
                  {idx + 1}
                </div>
                <span>{guest.guestName}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-stone-950/40 text-stone-950' : 'bg-stone-900 text-amber-300'
                }`}>
                  {guest.baseCoffee}
                </span>

                {/* Remove guest button if more than 1 guest */}
                {guestTastings.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => handleRemoveGuest(idx, e)}
                    title={`Remove ${guest.guestName}`}
                    className={`p-1 rounded-full opacity-60 hover:opacity-100 transition-opacity ${
                      isSelected ? 'hover:bg-stone-950/40 text-stone-950' : 'hover:bg-rose-900/60 text-stone-400 hover:text-rose-300'
                    }`}
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            );
          })}

          {/* Quick Add Member Pill */}
          <button
            type="button"
            onClick={() => handleAddNewMember()}
            className="px-3.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap border border-dashed border-amber-500/50 hover:border-amber-400 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-all flex items-center gap-1.5 flex-shrink-0"
          >
            <Plus size={14} />
            <span>+ Add Member</span>
          </button>
        </div>
      </div>

      {/* 2-Column Customizer Body: Left 3D Mug Visualizer, Right Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
        
        {/* Left Col: 3D Coffee Mug Simulation for Active Guest */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 sm:p-6 rounded-3xl bg-stone-950/70 border border-stone-800/90 text-center relative overflow-hidden">
          <div className="mb-3">
            <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold block">
              Live Preview for {currentGuest.guestName}
            </span>
            <h4 className="text-lg font-bold text-white font-heading">
              {currentGuest.size} {currentGuest.baseCoffee}
            </h4>
            <span className="text-xs text-stone-400 block mt-0.5">
              {currentGuest.milkType} • {currentGuest.temperature.split(' ')[0]}
            </span>
          </div>

          {/* 3D Glass Mug Visualizer */}
          <div className="relative w-44 h-60 sm:w-48 sm:h-64 rounded-b-[38px] rounded-t-lg border-4 border-stone-400/30 bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md shadow-2xl p-2 flex flex-col justify-end overflow-hidden my-2">
            {/* Glass reflections */}
            <div className="absolute top-0 left-2.5 w-2.5 h-full bg-white/15 rounded-full blur-[1px] pointer-events-none z-30"></div>
            <div className="absolute top-0 right-2.5 w-1 h-full bg-white/10 rounded-full pointer-events-none z-30"></div>

            {/* Handle */}
            <div className="absolute top-12 -right-8 w-8 h-24 rounded-r-3xl border-4 border-l-0 border-stone-400/30 pointer-events-none"></div>

            {/* Steam bubbles */}
            {!currentGuest.temperature.includes('Iced') && (
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 flex gap-2.5 pointer-events-none">
                <div className="w-2.5 h-9 bg-amber-200/40 rounded-full filter blur-md animate-steam"></div>
                <div className="w-3 h-11 bg-white/30 rounded-full filter blur-md animate-steam" style={{ animationDelay: '0.8s' }}></div>
                <div className="w-2.5 h-7 bg-amber-100/30 rounded-full filter blur-md animate-steam" style={{ animationDelay: '1.6s' }}></div>
              </div>
            )}

            {/* Ice Cubes if Iced */}
            {currentGuest.temperature.includes('Iced') && (
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20 pointer-events-none">
                <div className="w-6 h-6 rounded-lg bg-white/30 border border-white/40 rotate-12 backdrop-blur-sm"></div>
                <div className="w-6 h-6 rounded-lg bg-white/25 border border-white/40 -rotate-12 backdrop-blur-sm"></div>
              </div>
            )}

            {/* Topping Top Overlay */}
            {currentGuest.topping !== 'None' && (
              <div className="relative z-20 w-full mb-1">
                <div className="w-full py-1 px-1.5 rounded-t-xl bg-amber-900/70 border-b border-amber-400/30 text-[9px] text-center text-amber-200 font-bold tracking-wide flex items-center justify-center gap-1 shadow-inner">
                  <Sparkles size={10} className="text-amber-300" />
                  <span>{currentGuest.topping}</span>
                </div>
              </div>
            )}

            {/* Foam Micro-layer */}
            <div
              className="w-full rounded-t-2xl transition-all duration-500 relative flex items-center justify-center shadow-md"
              style={{
                height: activeBaseConfig.foamHeight,
                backgroundColor: activeBaseConfig.milkColor,
                backgroundImage: 'radial-gradient(circle, rgba(217, 119, 6, 0.35) 15%, transparent 20%)',
                backgroundSize: '14px 14px'
              }}
            >
              <span className="text-[9px] font-bold text-amber-950 uppercase tracking-widest opacity-80 truncate px-2">
                {currentGuest.baseCoffee} Crema
              </span>
            </div>

            {/* Coffee Base Layer */}
            <div
              className="w-full rounded-b-[30px] transition-all duration-700 relative overflow-hidden flex flex-col items-center justify-center"
              style={{
                height: activeBaseConfig.liquidHeight,
                background: `linear-gradient(to top, ${activeBaseConfig.liquidColor}, ${currentGuest.milkType === 'Whole Milk' ? '#78350f' : '#92400e'})`
              }}
            >
              {currentGuest.syrup !== 'None' && (
                <div className="absolute bottom-0 inset-x-0 h-5 bg-amber-400/30 blur-[2px] animate-pulse"></div>
              )}

              <div className="relative z-10 text-center px-2 space-y-0.5">
                <span className="text-[11px] font-bold text-white block drop-shadow-md">
                  {currentGuest.extraShots > 0 ? `+${currentGuest.extraShots} Shot${currentGuest.extraShots > 1 ? 's' : ''}` : 'Single Shot'}
                </span>
                <span className="text-[9px] text-amber-200/90 block truncate">
                  {currentGuest.syrup !== 'None' ? currentGuest.syrup : currentGuest.milkType}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Details Tag */}
          <div className="mt-3 p-2.5 rounded-xl bg-stone-900/90 border border-stone-800 text-[11px] text-stone-300 w-full space-y-1">
            <div className="flex justify-between">
              <span className="text-stone-400">Roast Profile:</span>
              <strong className="text-amber-300 font-medium">{currentGuest.roastType.split(' ')[0]}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Sweetness:</span>
              <strong className="text-amber-300 font-medium">{currentGuest.sweetness.split(' ')[0]}</strong>
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Controls for Active Guest */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Member Name Editor & Quick Preset Bar */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-stone-950/70 p-3 rounded-2xl border border-stone-800">
              <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
                <User size={15} className="text-amber-400 flex-shrink-0" />
                <label className="text-xs font-bold text-stone-300 uppercase tracking-wider flex-shrink-0">
                  Member:
                </label>
                <input
                  type="text"
                  value={currentGuest.guestName}
                  onChange={e => updateCurrentGuest({ guestName: e.target.value })}
                  placeholder={`Guest ${activeGuestIndex + 1}`}
                  className="py-1.5 px-3 rounded-lg bg-stone-900 border border-stone-700 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-500 flex-1 sm:max-w-[200px]"
                />
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto pt-1 sm:pt-0 border-t sm:border-t-0 border-stone-900">
                {guestTastings.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setGuestTastings(prev => prev.map((g) => ({
                        ...g,
                        baseCoffee: currentGuest.baseCoffee,
                        size: currentGuest.size,
                        roastType: currentGuest.roastType,
                        milkType: currentGuest.milkType,
                        syrup: currentGuest.syrup,
                        topping: currentGuest.topping,
                        temperature: currentGuest.temperature,
                        sweetness: currentGuest.sweetness,
                        extraShots: currentGuest.extraShots
                      })));
                    }}
                    className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                    title="Copy this recipe to all party members"
                  >
                    <Wand2 size={12} /> Apply to all ({guestTastings.length})
                  </button>
                )}

                {guestTastings.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => handleRemoveGuest(activeGuestIndex, e)}
                    className="py-1 px-2.5 rounded-lg bg-rose-950/50 hover:bg-rose-900/80 border border-rose-500/30 text-rose-300 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Trash2 size={11} />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick 1-Click Tasting Recipes (Desktop/Tablet only) */}
            <div className="hidden sm:block p-3 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-2">
              <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                <Wand2 size={12} /> Quick Barista Recipe Presets:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {tastingPresets.map((p, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => applyPreset(p)}
                    className="py-1.5 px-2 rounded-xl bg-stone-900 hover:bg-amber-950/40 border border-stone-800 hover:border-amber-500/40 text-[11px] text-left text-stone-300 hover:text-white transition-all truncate"
                    title={p.desc}
                  >
                    <span className="font-bold block truncate text-amber-200">{p.name}</span>
                    <span className="text-[9px] text-stone-500 block truncate">{p.base} • {p.milk}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 1. Base Coffee Choice */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
              1. Choose Coffee Base
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
              {defaultDrinkOptions.coffeeBases.map(b => (
                <button
                  type="button"
                  key={b.name}
                  onClick={() => updateCurrentGuest({ baseCoffee: b.name })}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all border text-center truncate ${
                    currentGuest.baseCoffee === b.name
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 border-amber-400 shadow-glow-amber font-bold scale-[1.02]'
                      : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Size & Shots */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                2. Cup Size
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {defaultDrinkOptions.sizes.map(s => (
                  <button
                    type="button"
                    key={s.name}
                    onClick={() => updateCurrentGuest({ size: s.name })}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all border text-center ${
                      currentGuest.size === s.name
                        ? 'bg-amber-500/25 text-amber-300 border-amber-500 shadow-sm font-bold'
                        : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
                    }`}
                  >
                    <div>{s.name}</div>
                    <div className="text-[10px] opacity-70">{s.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                3. Extra Espresso Shots
              </label>
              <div className="flex items-center gap-1.5 bg-stone-950 p-1 rounded-xl border border-stone-800">
                {[0, 1, 2, 3].map(shots => (
                  <button
                    type="button"
                    key={shots}
                    onClick={() => updateCurrentGuest({ extraShots: shots })}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      currentGuest.extraShots === shots
                        ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    {shots === 0 ? 'Standard' : `+${shots}`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Milk & Temperature */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                4. Artisanal Milk
              </label>
              <select
                value={currentGuest.milkType}
                onChange={e => updateCurrentGuest({ milkType: e.target.value })}
                className="w-full py-2.5 px-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              >
                {defaultDrinkOptions.milks.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                5. Serving Temperature
              </label>
              <select
                value={currentGuest.temperature}
                onChange={e => updateCurrentGuest({ temperature: e.target.value })}
                className="w-full py-2.5 px-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              >
                {defaultDrinkOptions.temperatures.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 4. Syrups & Topping Dust */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                6. Flavor Syrup Infusion
              </label>
              <select
                value={currentGuest.syrup}
                onChange={e => updateCurrentGuest({ syrup: e.target.value })}
                className="w-full py-2.5 px-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              >
                {defaultDrinkOptions.syrups.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                7. Barista Topping Dust
              </label>
              <select
                value={currentGuest.topping}
                onChange={e => updateCurrentGuest({ topping: e.target.value })}
                className="w-full py-2.5 px-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              >
                {defaultDrinkOptions.toppings.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 5. Custom Taste Note */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
              8. Taste Note for Barista (Optional)
            </label>
            <input
              type="text"
              value={currentGuest.notes || ''}
              onChange={e => updateCurrentGuest({ notes: e.target.value })}
              placeholder="e.g., Extra hot, oat foam on top, very light sweetness..."
              className="w-full py-2 px-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500"
            />
          </div>

        </div>

      </div>

      {/* Summary Grid of All Guests' Tailored Drinks with Add More Button */}
      <div className="pt-4 border-t border-stone-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-bold text-amber-300">
          <span className="flex items-center gap-1.5">
            <Check size={14} className="text-emerald-400" />
            Table Coffee Tasting Summary ({guestTastings.length} Custom Drinks Ready):
          </span>
          <button
            type="button"
            onClick={() => handleAddNewMember()}
            className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
          >
            <Plus size={14} /> + Add Another Member
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {guestTastings.map((g, idx) => (
            <div
              key={idx}
              onClick={() => setActiveGuestIndex(idx)}
              className={`p-3 rounded-xl border transition-all cursor-pointer text-left relative group ${
                activeGuestIndex === idx
                  ? 'bg-amber-500/15 border-amber-400/80 shadow-sm'
                  : 'bg-stone-950/60 border-stone-800 hover:border-stone-700'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] flex items-center justify-center font-black">
                    {idx + 1}
                  </span>
                  {g.guestName}
                </span>
                <span className="text-[10px] font-mono font-bold text-amber-300">
                  {g.size}
                </span>
              </div>
              <div className="text-xs font-semibold text-amber-200 truncate">{g.baseCoffee}</div>
              <div className="text-[10px] text-stone-400 truncate mt-0.5">
                {g.milkType} • {g.syrup !== 'None' ? g.syrup : 'Classic'} {g.topping !== 'None' ? `• ${g.topping}` : ''}
              </div>
              {g.notes && (
                <div className="text-[9px] text-amber-300/80 italic truncate mt-1">"{g.notes}"</div>
              )}
            </div>
          ))}

          {/* Add member card in summary grid */}
          <button
            type="button"
            onClick={() => handleAddNewMember()}
            className="p-3 rounded-xl border border-dashed border-stone-800 hover:border-amber-500/50 bg-stone-950/40 hover:bg-amber-500/10 text-stone-400 hover:text-amber-300 transition-all flex flex-col items-center justify-center gap-1 min-h-[75px]"
          >
            <UserPlus size={16} />
            <span className="text-xs font-bold">+ Add Another Guest</span>
          </button>
        </div>
      </div>

    </div>
  );
}
