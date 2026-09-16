import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Users, Sparkles, CheckCircle2, QrCode, ArrowRight, 
  ShieldCheck, Heart, Lock, User, LogIn, CreditCard, Smartphone, 
  Wallet, DollarSign, AlertCircle, X, ChevronRight, Check, Coffee, Wand2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import TableLayout3D, { cafeTables } from '../components/3d/TableLayout3D';
import GuestCoffeeTastingCustomizer from '../components/reservation/GuestCoffeeTastingCustomizer';
import { createDefaultGuestTasting } from '../utils/tastingDefaults';
import { useCafe } from '../context/CafeContext';
import { useAuth } from '../context/AuthContext';

export default function Reservation({ setCurrentPage }) {
  const { submitReservation, loading } = useCafe();
  const { user, openAuthModal } = useAuth();

  const [selectedTable, setSelectedTable] = useState(cafeTables[0]);
  const [userName, setUserName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [date, setDate] = useState('2026-09-18');
  const [time, setTime] = useState('10:30 AM');
  const [guests, setGuests] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');

  // Per-Guest Virtual Coffee Tasting Pre-orders
  const [guestTastings, setGuestTastings] = useState(() => [
    createDefaultGuestTasting(1),
    createDefaultGuestTasting(2)
  ]);
  
  // Advance Payment State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8921');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState(null);

  const totalAdvance = 100;

  // Handle changing guest count and synchronizing tasting drinks
  const handleGuestsChange = (newCount) => {
    setGuests(newCount);
    setGuestTastings(prev => {
      if (newCount > prev.length) {
        const added = [];
        for (let i = prev.length + 1; i <= newCount; i++) {
          added.push(createDefaultGuestTasting(i));
        }
        return [...prev, ...added];
      } else if (newCount < prev.length) {
        return prev.slice(0, newCount);
      }
      return prev;
    });
  };

  // Add individual new party member
  const handleAddMember = (customName) => {
    const nextIdx = guestTastings.length + 1;
    const newGuest = createDefaultGuestTasting(nextIdx, customName);
    const updated = [...guestTastings, newGuest];
    setGuestTastings(updated);
    setGuests(updated.length);
    return updated.length - 1;
  };

  // Remove party member
  const handleRemoveMember = (idxToRemove) => {
    if (guestTastings.length <= 1) return;
    const updated = guestTastings.filter((_, idx) => idx !== idxToRemove);
    setGuestTastings(updated);
    setGuests(updated.length);
  };

  useEffect(() => {
    if (user) {
      setUserName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setUpiId(`${user.email?.split('@')[0] || 'morningbrew'}@okaxis`);
      // Default Guest 1 name to user's name
      setGuestTastings(prev => {
        const updated = [...prev];
        if (updated[0]) {
          updated[0] = { ...updated[0], guestName: `${user.name} (You)` };
        }
        return updated;
      });
    }
  }, [user]);

  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:30 AM', '12:00 PM',
    '01:30 PM', '03:00 PM', '04:30 PM', '06:00 PM', '07:30 PM', '09:00 PM'
  ];

  // Open payment review step
  const handleProceedToPayment = (e) => {
    e.preventDefault();

    if (!user) {
      openAuthModal('login');
      return;
    }

    setShowPaymentModal(true);
  };

  // Complete Payment & Finalize Booking
  const handleConfirmAndPay = async () => {
    setIsProcessingPayment(true);

    const payload = {
      userId: user?.id,
      userName,
      email,
      phone,
      date,
      time,
      guests,
      tableZone: `${selectedTable.zone} (${selectedTable.id})`,
      specialRequests,
      tastingOrders: guestTastings,
      advancePaid: totalAdvance,
      paymentStatus: 'Paid',
      paymentMethod: paymentMethod === 'upi' ? `UPI (${upiId || 'Instant Pay'})` : paymentMethod === 'card' ? 'Credit/Debit Card' : 'Net Banking'
    };

    // Simulate 1.2s secure payment gateway handshake
    setTimeout(async () => {
      const res = await submitReservation(payload);
      setIsProcessingPayment(false);
      setShowPaymentModal(false);

      if (res.success) {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#10b981', '#f59e0b', '#fbbf24', '#ffffff']
        });
        setConfirmedReservation(res.reservation);
      }
    }, 1200);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
          <Calendar size={14} />
          Online Table Reservation
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
          Book Your Artisanal Cafe Table
        </h1>
        <p className="text-sm text-stone-400">
          Pick your preferred zone on our interactive 3D floor map, pay a nominal ₹100 advance deposit (100% deductible from your cafe bill), and enjoy priority zero-wait seating.
        </p>
      </div>

      {/* If Not Logged In, Show Lock / Sign In Gate Card */}
      {!user ? (
        <div className="max-w-xl mx-auto p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-stone-900/95 via-[#18110c] to-stone-900/95 border border-amber-500/40 shadow-2xl text-center space-y-6 animate-fadeIn relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto shadow-glow-amber">
            <Lock size={32} />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-heading text-white">
              Authentication Required
            </h2>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">
              Please sign in or create an account to select 3D seating and confirm your table reservation.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 text-left space-y-2 text-xs text-stone-400">
            <div className="font-semibold text-amber-300 flex items-center gap-1.5">
              <Sparkles size={13} /> Member Benefits on Table Reservations:
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>Instant digital booking QR pass stored in your profile</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>Priority seating & 100% advance deposit deductible from food & drinks</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>Earn 50 bonus Brew Points on your first reservation</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => openAuthModal('login')}
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs shadow-glow-amber hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <LogIn size={15} />
              <span>Sign In to Continue</span>
            </button>
            <button
              onClick={() => openAuthModal('signup')}
              className="py-3 px-6 rounded-xl bg-stone-800 border border-stone-700 text-white font-bold text-xs hover:bg-stone-700 transition-all flex items-center justify-center gap-2"
            >
              <User size={15} />
              <span>Create Free Account</span>
            </button>
          </div>
        </div>
      ) : confirmedReservation ? (
        /* SUCCESS CONFIRMATION RECEIPT TICKET */
        <div className="max-w-2xl mx-auto p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-stone-900 via-[#19110a] to-stone-900 border border-emerald-500/40 shadow-2xl space-y-6 text-center animate-fadeIn relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-glow-emerald">
            <Check size={32} />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              Table Reservation Confirmed
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              We Can't Wait to Host You!
            </h2>
            <p className="text-xs text-stone-400">
              A digital ticket and receipt has been generated for your visit.
            </p>
          </div>

          {/* Ticket Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-stone-950/80 border border-stone-800 text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Booking ID</span>
                <span className="font-mono text-sm font-bold text-amber-400">#{confirmedReservation.id}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Status</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                  <CheckCircle2 size={12} /> Confirmed (Paid)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-stone-500 block text-[10px]">Guest Name</span>
                <strong className="text-white font-medium">{confirmedReservation.userName || confirmedReservation.name}</strong>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Date & Time</span>
                <strong className="text-white font-medium">{confirmedReservation.date} • {confirmedReservation.time}</strong>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Guests & Table</span>
                <strong className="text-white font-medium">{confirmedReservation.guests} Guests • {confirmedReservation.tableZone}</strong>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Advance Paid</span>
                <strong className="text-emerald-400 font-bold font-mono">₹{confirmedReservation.advancePaid || 100} (Credited)</strong>
              </div>
            </div>

            {/* Personalized Guest Coffee Tasting Pre-Orders in Confirmed Pass */}
            {confirmedReservation.tastingOrders && confirmedReservation.tastingOrders.length > 0 && (
              <div className="p-4 rounded-2xl bg-stone-900/90 border border-amber-500/30 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <Coffee size={14} className="text-amber-400" />
                  <span>Personalized Coffee Tasting Pre-Orders ({confirmedReservation.tastingOrders.length} Custom Cups):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {confirmedReservation.tastingOrders.map((drink, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs space-y-0.5">
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-white flex items-center gap-1">
                          <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] flex items-center justify-center font-black">
                            {idx + 1}
                          </span>
                          {drink.guestName || `Guest ${idx + 1}`}
                        </span>
                        <span className="text-amber-400 font-mono">{drink.size} {drink.baseCoffee}</span>
                      </div>
                      <div className="text-[10px] text-stone-400">
                        {drink.milkType} • {drink.roastType?.split(' ')[0]} • {drink.syrup !== 'None' ? drink.syrup : 'Classic'} {drink.topping !== 'None' ? `• ${drink.topping}` : ''}
                      </div>
                      {drink.notes && (
                        <div className="text-[9px] text-amber-300/90 italic">Note: "{drink.notes}"</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
              <Sparkles size={14} className="flex-shrink-0 text-emerald-400" />
              <span>
                <strong>100% Bill Credit:</strong> Show this ticket on arrival. ₹{confirmedReservation.advancePaid || 100} will be discounted from your final food & coffee bill.
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => {
                setConfirmedReservation(null);
                setCurrentPage('menu');
              }}
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs shadow-glow-amber hover:scale-105 transition-all"
            >
              Browse Cafe Menu
            </button>
            <button
              onClick={() => {
                setConfirmedReservation(null);
                setCurrentPage('profile');
              }}
              className="py-3 px-6 rounded-xl bg-stone-800 border border-stone-700 text-white font-bold text-xs hover:bg-stone-700 transition-all"
            >
              View in My Bookings
            </button>
          </div>
        </div>
      ) : (
        /* RESERVATION FORM & 3D TABLE MAP */
        <div className="space-y-12 animate-fadeIn">
          
          {/* 3D Visual Table Selector */}
          <div className="p-4 sm:p-8 rounded-3xl bg-stone-900/80 border border-stone-800 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  <Sparkles size={14} /> Interactive 3D Seating Floor
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  Step 1: Select Your Preferred Table Zone
                </h2>
                <p className="text-xs text-stone-400">
                  Click on any table directly on the 3D floor map or choose from the list below.
                </p>
              </div>

              {/* Active Selected Table Badge */}
              <div className="p-3.5 rounded-2xl bg-stone-950 border border-amber-500/40 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs font-mono">
                  #{selectedTable.id}
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Selected Table</span>
                  <span className="text-xs font-bold text-white block">{selectedTable.zone}</span>
                  <span className="text-[10px] text-amber-300 font-medium">Capacity: up to {selectedTable.capacity} guests</span>
                </div>
              </div>
            </div>

            {/* 3D Canvas Embed */}
            <TableLayout3D
              selectedTable={selectedTable}
              onSelectTable={(table) => setSelectedTable(table)}
            />
          </div>

          {/* Booking Info & Advance Payment Section */}
          <form onSubmit={handleProceedToPayment} className="p-6 sm:p-8 rounded-3xl bg-stone-900/80 border border-stone-800 backdrop-blur-xl shadow-2xl space-y-8">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-2">
                <span>Step 2: Guest Details & Time Slot</span>
              </h2>
              <p className="text-xs text-stone-400">
                Confirm your schedule and guest count for table preparation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Guest Name *
                </label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full py-2.5 px-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full py-2.5 px-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full py-2.5 px-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 pt-2">
              
              {/* Date */}
              <div className="lg:col-span-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Reservation Date
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Number of Guests
                  </label>
                  <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                    {[1, 2, 3, 4, 5, 6].map(g => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => handleGuestsChange(g)}
                        className={`py-2 px-1 sm:px-2.5 rounded-xl text-xs font-bold transition-all border text-center ${
                          guests === g
                            ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-glow-amber scale-105 font-black'
                            : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-white'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div className="lg:col-span-8">
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {timeSlots.map((slot, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setTime(slot)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                        time === slot
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 border-amber-400 shadow-glow-amber scale-105'
                          : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-white'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>

                {/* Special Requests */}
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Special Requests (High chair, quiet corner, wheelchair accessible...)
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={e => setSpecialRequests(e.target.value)}
                    placeholder="Let our hosts know how we can make your visit comfortable..."
                    className="w-full py-2.5 px-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>
              </div>

            </div>

            {/* STEP 3: VIRTUAL COFFEE TASTING CUSTOMIZER PER GUEST */}
            <div className="pt-4 border-t border-stone-800">
              <GuestCoffeeTastingCustomizer
                guestTastings={guestTastings}
                setGuestTastings={setGuestTastings}
                totalGuests={guests}
                onAddMember={handleAddMember}
                onRemoveMember={handleRemoveMember}
              />
            </div>

            {/* Advance Deposit Summary Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                  <Sparkles size={14} /> Advance Table Booking Deposit
                </div>
                <p className="text-xs text-stone-300">
                  Flat Advance Deposit = <strong className="text-white font-mono text-sm">₹{totalAdvance}</strong> (Includes {guests} Custom Guest Tasting Orders)
                </p>
                <span className="text-[11px] text-emerald-400 block font-medium">
                  ✓ 100% of this ₹{totalAdvance} advance is credited directly to your final dining bill at checkout.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest block">Payable Advance</span>
                  <span className="text-2xl font-black text-amber-400 font-heading">₹{totalAdvance}</span>
                </div>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-400 flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>Zero cancellation fee up to 1 hour before scheduled arrival.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 text-stone-950 font-bold font-heading text-sm shadow-lg hover:shadow-glow-amber hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Proceed to Pay ₹{totalAdvance} Advance & Reserve</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </form>
        </div>
      )}

      {/* ADVANCE PAYMENT MODAL */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div 
            className="relative w-full max-w-lg bg-[#150f0b] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 overflow-y-auto max-h-[92vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPaymentModal(false)}
              disabled={isProcessingPayment}
              aria-label="Close payment modal"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                <ShieldCheck size={13} /> Secure Advance Deposit
              </div>
              <h3 className="text-2xl font-bold font-heading text-white">
                Complete Advance Payment
              </h3>
              <p className="text-xs text-stone-400">
                Guarantee table #{selectedTable?.id} on {date} at {time} ({guests} Guests)
              </p>
            </div>

            {/* Amount Callout Box */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400 block">Advance Booking Deposit:</span>
                  <span className="text-[11px] text-emerald-400 font-semibold">100% credited to your dining bill</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-amber-400 font-heading">₹{totalAdvance}</span>
                </div>
              </div>

              {/* Tasting Pre-order summary */}
              {guestTastings && guestTastings.length > 0 && (
                <div className="pt-2.5 border-t border-stone-800/80 space-y-1 text-xs">
                  <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                    <Coffee size={12} className="text-amber-400" />
                    <span>Included Tasting Profiles for Table ({guestTastings.length} Drinks):</span>
                  </div>
                  <div className="space-y-1">
                    {guestTastings.map((g, idx) => (
                      <div key={idx} className="flex justify-between text-[11px] text-stone-300 bg-stone-900/60 px-2 py-1 rounded-lg">
                        <span className="font-medium text-white">{g.guestName}:</span>
                        <span className="text-amber-200">{g.size} {g.baseCoffee} ({g.milkType})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-300">
                Select Payment Mode:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`py-3 px-2 rounded-xl border flex flex-col items-center gap-1.5 text-xs font-bold transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-glow-amber'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-white'
                  }`}
                >
                  <Smartphone size={18} />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-3 px-2 rounded-xl border flex flex-col items-center gap-1.5 text-xs font-bold transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-glow-amber'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-white'
                  }`}
                >
                  <CreditCard size={18} />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`py-3 px-2 rounded-xl border flex flex-col items-center gap-1.5 text-xs font-bold transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-glow-amber'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-white'
                  }`}
                >
                  <Wallet size={18} />
                  <span>Net Banking</span>
                </button>
              </div>
            </div>

            {/* Payment Inputs Based on Selected Method */}
            {paymentMethod === 'upi' && (
              <div className="space-y-3 p-4 rounded-2xl bg-stone-950/70 border border-stone-800/80">
                <div className="flex items-center justify-between text-xs text-stone-300 font-semibold">
                  <span>Enter UPI ID / VPA</span>
                  <span className="text-[10px] text-amber-400">GPay, PhonePe, Paytm</span>
                </div>
                <input
                  type="text"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  placeholder="e.g. yourname@okhdfcbank"
                  className="w-full py-2.5 px-3.5 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <div className="flex items-center gap-2 text-[11px] text-stone-400">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  <span>Instant verification with 256-bit bank encryption</span>
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-3 p-4 rounded-2xl bg-stone-950/70 border border-stone-800/80 text-xs">
                <div>
                  <label className="block text-stone-400 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                    placeholder="4532 0000 0000 8921"
                    className="w-full py-2 px-3 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-stone-400 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      defaultValue="08/29"
                      placeholder="MM/YY"
                      className="w-full py-2 px-3 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1">CVV</label>
                    <input
                      type="password"
                      defaultValue="•••"
                      maxLength={4}
                      placeholder="CVV"
                      className="w-full py-2 px-3 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800/80 space-y-2 text-xs">
                <label className="block text-stone-400">Choose Bank</label>
                <select className="w-full py-2.5 px-3 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500">
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>State Bank of India (SBI)</option>
                  <option>Axis Bank</option>
                  <option>Kotak Mahindra Bank</option>
                </select>
              </div>
            )}

            {/* Pay Button */}
            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={handleConfirmAndPay}
                disabled={isProcessingPayment}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 text-stone-950 font-extrabold font-heading text-sm shadow-glow-amber hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Secure Payment ₹{totalAdvance}...</span>
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    <span>Pay ₹{totalAdvance} Advance & Guarantee Table</span>
                  </>
                )}
              </button>

              <div className="text-center text-[10px] text-stone-500">
                🔒 Safe & encrypted. Advance amount is fully adjustable against your cafe bill.
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
