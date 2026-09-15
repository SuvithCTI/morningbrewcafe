import React, { useState } from 'react';
import { Search, SlidersHorizontal, Sparkles, Coffee, Flame, Filter, Star, ArrowUpDown, Calendar } from 'lucide-react';
import MenuItemCard from '../components/menu/MenuItemCard';
import { useCafe } from '../context/CafeContext';

export default function Menu({ setCurrentPage }) {
  const {
    menuItems,
    selectedCategory,
    setSelectedCategory,
    selectedDietary,
    setSelectedDietary,
    searchQuery,
    setSearchQuery
  } = useCafe();

  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    'All',
    'Coffee & Drinks',
    'Café Food'
  ];

  const dietaryOptions = ['All', 'Vegetarian', 'Non-Veg', 'Vegan', 'Gluten-Free'];

  let filtered = menuItems.filter(item => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }
    if (selectedDietary !== 'All') {
      if (!item.dietary || !item.dietary.some(d => d.toLowerCase().includes(selectedDietary.toLowerCase()))) {
        return false;
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchTags = item.tags && item.tags.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchTags) return false;
    }
    return true;
  });

  filtered.sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'calories') return (a.calories || 0) - (b.calories || 0);
    return 0;
  });

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <Coffee size={14} />
          In-Person Dining Menu
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
          Handcrafted To Inspire
        </h1>
        <p className="text-sm text-stone-400">
          Explore single-origin coffees, organic botanical teas, and fresh bakery treats served warm in our dining lounge.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 sm:p-6 rounded-3xl bg-stone-900/80 border border-stone-800 backdrop-blur-xl shadow-xl space-y-4">
        
        {/* Top Controls: Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name, ingredients, or roast flavor..."
              className="w-full py-2.5 px-4 pl-10 rounded-2xl bg-stone-950 border border-stone-700/60 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
            <Search size={16} className="absolute left-3.5 top-3 text-stone-500" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-stone-400 flex items-center gap-1">
              <ArrowUpDown size={13} /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="py-2 px-3 rounded-xl bg-stone-950 border border-stone-700/60 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
            >
              <option value="featured">Featured / Best Picks</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated ★</option>
              <option value="calories">Lowest Calories (kcal)</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 border-amber-400 shadow-glow-amber font-bold scale-105'
                  : 'bg-stone-950/60 text-stone-300 border-stone-800 hover:border-stone-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dietary Tag Filter Pills (Hidden on Mobile View) */}
        <div className="hidden sm:flex items-center gap-2 overflow-x-auto pt-2 border-t border-stone-800/80">
          <span className="text-xs text-stone-500 flex items-center gap-1 flex-shrink-0">
            <Filter size={12} /> Dietary:
          </span>
          {dietaryOptions.map(diet => (
            <button
              key={diet}
              onClick={() => setSelectedDietary(diet)}
              className={`px-3 py-1 rounded-xl text-[11px] font-medium transition-all ${
                selectedDietary === diet
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'bg-stone-950/40 text-stone-400 border border-stone-800 hover:text-stone-200'
              }`}
            >
              {diet}
            </button>
          ))}
        </div>

      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-stone-400 px-1">
        <span>Showing {filtered.length} culinary creations</span>
        {selectedCategory !== 'All' && (
          <span className="text-amber-400 font-semibold">Category: {selectedCategory}</span>
        )}
      </div>

      {/* Menu Items Grid */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-stone-900/40 border border-stone-800 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
            <Coffee size={28} />
          </div>
          <h3 className="text-lg font-bold text-white">No Items Matched Your Criteria</h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            Try adjusting your search query or removing dietary filters to explore more items.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedDietary('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold font-heading hover:bg-amber-400"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {filtered.map(item => (
            <MenuItemCard
              key={item.id}
              item={item}
              onReserveTable={() => setCurrentPage && setCurrentPage('reservation')}
            />
          ))}
        </div>
      )}

    </div>
  );
}
