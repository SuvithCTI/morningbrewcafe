import React from 'react';
import { User, Award, Coffee, Calendar, Gift, Sparkles, LogOut, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCafe } from '../context/CafeContext';

export default function Profile({ setCurrentPage }) {
  const { user, logout, openAuthModal } = useAuth();
  const { reservations, addToast } = useCafe();

  if (!user) {
    return (
      <div className="pt-32 pb-24 max-w-md mx-auto px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
          <User size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white font-heading">Sign In to Your Account</h2>
        <p className="text-xs text-stone-400">
          Access your member loyalty brew points and manage your 3D table bookings.
        </p>
        <button
          onClick={() => openAuthModal('login')}
          className="px-6 py-3 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs font-heading hover:bg-amber-400 transition-colors shadow-md"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  const points = user.loyaltyPoints || 340;
  const userReservations = reservations.filter(r => r.email === user.email || r.userName === user.name);

  const handleRedeemPoints = () => {
    addToast('🎁 100 Brew Points redeemed for a Free Handcrafted Cortado pass on your next cafe visit!', 'success');
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Profile Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900/90 via-[#18110b] to-stone-900/90 border border-amber-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover ring-4 ring-amber-500/40 shadow-xl"
          />
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-bold font-heading text-white">{user.name}</h1>
              {user.role === 'admin' && (
                <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
                  ADMIN
                </span>
              )}
            </div>
            <p className="text-xs text-stone-400 mt-0.5">{user.email} • {user.phone || '+1 (555) 000-0000'}</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[11px] font-bold text-amber-300">
              ☕ Gold Barista Connoisseur Tier
            </span>
          </div>
        </div>

        <button
          onClick={logout}
          className="py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-rose-950/40 border border-stone-800 hover:border-rose-500/40 text-stone-400 hover:text-rose-300 text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Grid: Loyalty Card & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Loyalty Brew Points Card */}
        <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-amber-900/60 via-[#1c120c] to-amber-950/80 border border-amber-500/40 shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles size={14} /> Morning Brew Loyalty Club
              </span>
              <div className="text-4xl font-extrabold text-white font-heading mt-2">
                {points} <span className="text-base font-normal text-amber-200">Brew Points</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-2xl shadow-inner">
              👑
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-stone-300">
              <span>Progress to Free In-Cafe Tasting Pass (400 pts)</span>
              <span className="font-bold text-amber-400">{points} / 400 pts</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-stone-900 border border-amber-500/30 p-0.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full shadow-glow-amber"
                style={{ width: `${Math.min(100, (points / 400) * 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-amber-900/60">
            <span className="text-xs text-amber-200/80">Earn points on every table visit & tasting event</span>
            <button
              onClick={handleRedeemPoints}
              className="py-2 px-4 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold font-heading hover:bg-amber-400 transition-colors shadow-md flex items-center gap-1.5"
            >
              <Gift size={14} />
              <span>Redeem Reward</span>
            </button>
          </div>
        </div>

        {/* Member Perks Box */}
        <div className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-4 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider font-heading">
            Your Member Perks
          </h3>
          <ul className="space-y-2.5 text-xs text-stone-300">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Priority 3D table seating & window booths</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Free oat/almond milk upgrades</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Complimentary birthday pastry</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Invites to private coffee cupping sessions</span>
            </li>
          </ul>
          <button
            onClick={() => setCurrentPage('reservation')}
            className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold text-center transition-colors border border-stone-700"
          >
            Reserve Table with Perks →
          </button>
        </div>

      </div>

      {/* User Table Reservations List */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
            <Calendar size={18} className="text-emerald-400" />
            Your Table Bookings ({userReservations.length})
          </h3>
          <button
            onClick={() => setCurrentPage('reservation')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300"
          >
            Book Another Table
          </button>
        </div>

        {userReservations.length === 0 ? (
          <div className="text-center py-10 text-xs text-stone-400 space-y-3">
            <Calendar size={32} className="text-stone-600 mx-auto" />
            <p>No upcoming table bookings. Use our 3D visualizer to pick a cozy spot!</p>
            <button
              onClick={() => setCurrentPage('reservation')}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-stone-950 font-bold text-xs"
            >
              Reserve a Table
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userReservations.map(res => (
              <div
                key={res.id}
                className="p-5 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col justify-between space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono font-bold text-emerald-400 text-xs">#{res.id}</span>
                    <div className="text-sm text-white font-bold mt-1">{res.tableZone}</div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                    {res.status}
                  </span>
                </div>

                <div className="text-xs text-stone-400 space-y-1 pt-2 border-t border-stone-900">
                  <div><strong>Date:</strong> {res.date} at {res.time}</div>
                  <div><strong>Guests:</strong> {res.guests} Persons</div>
                  <div className="text-emerald-400 font-semibold">
                    <strong>Advance Paid:</strong> ₹{res.advancePaid || 100} (Credited at Cafe)
                  </div>

                  {/* Tasting Orders if available */}
                  {res.tastingOrders && res.tastingOrders.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-stone-900 space-y-1">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-amber-300 block">
                        ☕ Pre-Selected Tasting Drinks:
                      </span>
                      {res.tastingOrders.map((t, idx) => (
                        <div key={idx} className="text-[11px] text-stone-300 bg-stone-900/80 px-2 py-1 rounded">
                          <strong className="text-white">{t.guestName || `Guest ${idx + 1}`}:</strong> {t.size} {t.baseCoffee} ({t.milkType})
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
