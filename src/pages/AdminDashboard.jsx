import React, { useState } from 'react';
import { ShieldAlert, Plus, Edit, Trash2, CheckCircle2, Clock, Calendar, Users, Star, Sparkles, X, Filter } from 'lucide-react';
import { useCafe } from '../context/CafeContext';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard({ setCurrentPage }) {
  const { menuItems, reservations, reviews, addMenuItem, updateMenuItem, deleteMenuItem, addToast } = useCafe();
  const { isAdmin, user, loginDemo } = useAuth();

  const [activeTab, setActiveTab] = useState('reservations'); // 'reservations' | 'menu' | 'reviews' | 'analytics'
  
  // Menu Item Modal state
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('Coffee & Drinks');
  const [itemPrice, setItemPrice] = useState('');
  const [itemCalories, setItemCalories] = useState('150');
  const [itemCaffeine, setItemCaffeine] = useState('120mg');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [itemDietary, setItemDietary] = useState('Vegetarian');
  const [itemIsSpecial, setItemIsSpecial] = useState(false);

  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setItemName('');
    setItemCategory('Coffee & Drinks');
    setItemPrice('');
    setItemCalories('150');
    setItemCaffeine('120mg');
    setItemDescription('');
    setItemImage('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80');
    setItemDietary('Vegetarian');
    setItemIsSpecial(false);
    setShowItemModal(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setItemName(item.name);
    setItemCategory(item.category);
    setItemPrice(item.price.toString());
    setItemCalories(item.calories?.toString() || '150');
    setItemCaffeine(item.caffeine || '');
    setItemDescription(item.description);
    setItemImage(item.image);
    setItemDietary(item.dietary ? item.dietary.join(', ') : '');
    setItemIsSpecial(Boolean(item.isSpecial));
    setShowItemModal(true);
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    if (!itemName || !itemPrice) return;

    if (editingItem) {
      updateMenuItem({
        ...editingItem,
        name: itemName,
        category: itemCategory,
        price: parseFloat(itemPrice),
        calories: parseInt(itemCalories, 10) || 150,
        caffeine: itemCaffeine,
        description: itemDescription,
        image: itemImage,
        dietary: itemDietary.split(',').map(s => s.trim()),
        isSpecial: itemIsSpecial
      });
    } else {
      addMenuItem({
        id: `mb-${Date.now()}`,
        name: itemName,
        category: itemCategory,
        price: parseFloat(itemPrice),
        rating: 5.0,
        reviewsCount: 1,
        calories: parseInt(itemCalories, 10) || 150,
        caffeine: itemCaffeine,
        description: itemDescription || 'Artisanal handcrafted culinary delicacy.',
        image: itemImage || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
        dietary: itemDietary.split(',').map(s => s.trim()),
        isSpecial: itemIsSpecial,
        isPopular: false
      });
    }

    setShowItemModal(false);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-950/80 via-[#1c100c] to-stone-900 border border-rose-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-widest mb-1">
            <ShieldAlert size={16} /> Staff & Manager Control Center
          </div>
          <h1 className="text-3xl font-extrabold text-white font-heading">
            Cafe Operations Dashboard
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Real-time control for in-cafe table reservations, menu catalog CRUD & customer feedback.
          </p>
        </div>

        {!isAdmin && (
          <button
            onClick={() => loginDemo('admin')}
            className="py-2.5 px-5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs font-heading shadow-md transition-colors flex items-center gap-2"
          >
            <ShieldAlert size={14} />
            <span>Switch to Admin Mode</span>
          </button>
        )}
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-400 font-medium">
            <span>Booked Tables</span>
            <Calendar size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-heading">
            {reservations.length}
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold">88% peak occupancy</span>
        </div>

        <div className="p-5 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-400 font-medium">
            <span>Menu Catalog</span>
            <Users size={16} className="text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 font-heading">
            {menuItems.length}
          </div>
          <span className="text-[10px] text-stone-400">Active cafe offerings</span>
        </div>

        <div className="p-5 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-400 font-medium">
            <span>Customer Rating</span>
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-heading">
            4.9★
          </div>
          <span className="text-[10px] text-stone-400">{reviews.length} community reviews</span>
        </div>

        <div className="p-5 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-400 font-medium">
            <span>Daily Cafe Footfall</span>
            <Clock size={16} className="text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-heading">
            240+
          </div>
          <span className="text-[10px] text-blue-400 font-semibold">Guests welcomed daily</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex bg-stone-900/90 p-1.5 rounded-2xl border border-stone-800 max-w-xl overflow-x-auto scrollbar-none gap-1">
        {[
          { id: 'reservations', label: `Reservations (${reservations.length})` },
          { id: 'menu', label: `Menu Items (${menuItems.length})` },
          { id: 'reviews', label: `Reviews (${reviews.length})` },
          { id: 'analytics', label: 'Analytics' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: RESERVATIONS MANAGEMENT */}
      {activeTab === 'reservations' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold font-heading text-white">Table Booking Records ({reservations.length})</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reservations.map(res => (
              <div
                key={res.id}
                className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-3 hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-400">#{res.id}</span>
                    <h4 className="text-base font-bold text-white font-heading mt-0.5">{res.userName}</h4>
                    <div className="text-xs text-stone-400">{res.email} • {res.phone}</div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    {res.status}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-stone-950 text-xs text-stone-300 space-y-1">
                  <div><strong>Table Zone:</strong> {res.tableZone}</div>
                  <div><strong>Date & Time:</strong> {res.date} at {res.time} ({res.guests} guests)</div>
                  {res.specialRequests && (
                    <div className="text-amber-200/80 italic pt-1">Notes: "{res.specialRequests}"</div>
                  )}
                  {res.tastingOrders && res.tastingOrders.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-stone-800 space-y-1">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                        ☕ Barista Tasting Orders ({res.tastingOrders.length}):
                      </span>
                      <div className="space-y-1">
                        {res.tastingOrders.map((t, idx) => (
                          <div key={idx} className="text-[11px] text-stone-300 bg-stone-900 px-2 py-1 rounded flex justify-between">
                            <span className="text-white font-medium">{t.guestName || `Guest ${idx + 1}`}:</span>
                            <span className="text-amber-300">{t.size} {t.baseCoffee} • {t.milkType} {t.syrup !== 'None' ? `(${t.syrup})` : ''}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MENU CRUD MANAGEMENT */}
      {activeTab === 'menu' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-heading text-white">Cafe Menu Items ({menuItems.length})</h2>
            <button
              onClick={handleOpenCreateModal}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs font-heading shadow-md hover:shadow-glow-amber transition-all flex items-center gap-1.5"
            >
              <Plus size={16} className="stroke-[3]" />
              <span>Add New Item</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map(item => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 flex items-start justify-between gap-3 hover:border-amber-500/40 transition-colors"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover ring-1 ring-amber-500/20 flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-stone-400 font-semibold uppercase">{item.category}</span>
                  <h4 className="text-sm font-bold text-white truncate font-heading">{item.name}</h4>
                  <div className="text-xs font-bold text-amber-400 mt-0.5">
                    ₹{Number(item.price).toFixed(0)}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => handleOpenEditModal(item)}
                    title="Edit item"
                    className="p-2 rounded-lg bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => deleteMenuItem(item.id)}
                    title="Delete item"
                    className="p-2 rounded-lg bg-stone-800 text-stone-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: REVIEWS MONITOR */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold font-heading text-white">Community Reviews ({reviews.length})</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map(rev => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white">{rev.userName}</span>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-amber-400" />
                    ))}
                  </div>
                </div>
                <h5 className="text-xs font-bold text-amber-300">"{rev.title}"</h5>
                <p className="text-xs text-stone-300 leading-relaxed italic">"{rev.comment}"</p>
                <span className="text-[10px] text-stone-500 block">{rev.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold font-heading text-white">Cafe Occupancy & Category Insights</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                Hourly Peak Seating Occupancy
              </h3>
              <div className="space-y-3 pt-2">
                {[
                  { time: '7:00 AM - 9:00 AM', occupancy: '85%' },
                  { time: '9:00 AM - 11:00 AM', occupancy: '98% (Peak)' },
                  { time: '11:00 AM - 1:00 PM', occupancy: '78%' },
                  { time: '1:00 PM - 3:00 PM', occupancy: '90%' },
                  { time: '3:00 PM - 5:00 PM', occupancy: '70%' },
                  { time: '5:00 PM - 8:00 PM', occupancy: '65%' },
                ].map((hr, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs text-stone-300">
                      <span>{hr.time}</span>
                      <span className="font-bold text-amber-400">{hr.occupancy}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-950 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full" style={{ width: hr.occupancy.split('%')[0] + '%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                Most Popular In-Cafe Offerings
              </h3>
              <div className="space-y-3 pt-2 text-xs">
                {[
                  { cat: 'Caramel Macchiato', area: 'Sunlit Window Booths' },
                  { cat: 'Chicken Burger', area: 'Espresso Bar Counter' },
                  { cat: 'White Sauce Pasta', area: 'All Seating' },
                  { cat: 'Oreo Milkshake', area: 'VIP Velvet Lounge' }
                ].map((c, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-stone-950 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">{c.cat}</div>
                      <div className="text-[10px] text-stone-500">Preferred zone: {c.area}</div>
                    </div>
                    <span className="text-emerald-400 font-semibold text-xs">Top Ordered</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT MENU ITEM MODAL */}
      {showItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl bg-[#160f0b] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowItemModal(false)}
              aria-label="Close modal"
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X size={16} />
            </button>

            <h3 className="text-xl font-bold font-heading text-white mb-4">
              {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
            </h3>

            <form onSubmit={handleSaveItem} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-stone-300 mb-1">Item Name *</label>
                  <input
                    type="text"
                    required
                    value={itemName}
                    onChange={e => setItemName(e.target.value)}
                    placeholder="e.g. Lavender Honey Cortado"
                    className="w-full py-2 px-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-stone-300 mb-1">Category *</label>
                  <select
                    value={itemCategory}
                    onChange={e => setItemCategory(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200"
                  >
                    <option value="Coffee & Drinks">Coffee & Drinks</option>
                    <option value="Café Food">Café Food</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-300 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    step="1"
                    required
                    value={itemPrice}
                    onChange={e => setItemPrice(e.target.value)}
                    placeholder="280"
                    className="w-full py-2 px-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 mb-1">Calories (kcal)</label>
                  <input
                    type="number"
                    value={itemCalories}
                    onChange={e => setItemCalories(e.target.value)}
                    placeholder="180"
                    className="w-full py-2 px-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 mb-1">Caffeine (mg)</label>
                  <input
                    type="text"
                    value={itemCaffeine}
                    onChange={e => setItemCaffeine(e.target.value)}
                    placeholder="150mg"
                    className="w-full py-2 px-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 mb-1">Image URL</label>
                <input
                  type="url"
                  value={itemImage}
                  onChange={e => setItemImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full py-2 px-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200"
                />
              </div>

              <div>
                <label className="block text-stone-300 mb-1">Dietary Tags (comma separated)</label>
                <input
                  type="text"
                  value={itemDietary}
                  onChange={e => setItemDietary(e.target.value)}
                  placeholder="Vegetarian, Gluten-Free, Vegan"
                  className="w-full py-2 px-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200"
                />
              </div>

              <div>
                <label className="block text-stone-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={itemDescription}
                  onChange={e => setItemDescription(e.target.value)}
                  placeholder="Handcrafted preparation details..."
                  className="w-full py-2 px-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="specialCheck"
                  checked={itemIsSpecial}
                  onChange={e => setItemIsSpecial(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <label htmlFor="specialCheck" className="text-stone-300 font-semibold cursor-pointer">
                  Mark as Chef's Special / Featured on Homepage
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-3 py-3 rounded-xl bg-amber-500 text-stone-950 font-bold font-heading text-xs hover:bg-amber-400 transition-colors shadow-md"
              >
                {editingItem ? 'Save Changes' : 'Create Menu Item'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
