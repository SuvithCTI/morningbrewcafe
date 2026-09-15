import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Users, Sparkles, CheckCircle2, QrCode, ArrowRight, 
  ShieldCheck, Heart, Lock, User, LogIn, CreditCard, Smartphone, 
  Wallet, DollarSign, AlertCircle, X, ChevronRight, Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import TableLayout3D, { cafeTables } from '../components/3d/TableLayout3D';
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
  const [occasion, setOccasion] = useState('Casual Coffee & Catchup');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Advance Payment State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8921');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState(null);

  const advancePerGuest = 100;
  const totalAdvance = guests * advancePerGuest;

  useEffect(() => {
    if (user) {
      setUserName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setUpiId(`${user.email?.split('@')[0] || 'morningbrew'}@okaxis`);
    }
  }, [user]);

  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:30 AM', '12:00 PM',
    '01:30 PM', '03:00 PM', '04:30 PM', '06:00 PM', '07:30 PM', '09:00 PM'
  ];

  const occasions = [
    'Casual Coffee & Catchup',
    'Quiet Remote Work / Study',
    'Business Strategy Meeting',
    'Romantic Coffee Date',
    'Birthday / Celebration'
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
      occasion,
      specialRequests,
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
          Pick your preferred zone on our interactive 3D floor map, pay a nominal advance deposit (100% deductible from your cafe bill), and enjoy priority zero-wait seating.
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
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-md mx-auto">
              To reserve and guarantee your table with live 3D visual selection and digital confirmation tickets, please sign in to your Morning Brew account.
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

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => openAuthModal('login')}
              className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-stone-950 font-bold font-heading text-sm shadow-glow-amber hover:shadow-glow-orange hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <LogIn size={18} />
              <span>Sign In to Order Table</span>
            </button>
            <button
              onClick={() => openAuthModal('register')}
              className="py-4 px-6 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs transition-colors border border-stone-700"
            >
              Create Free Account
            </button>
          </div>
        </div>
      ) : confirmedReservation ? (

        /* Confirmed Digital Ticket Card */
        <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1c1813] to-[#120d0a] border border-emerald-500/40 shadow-2xl space-y-6 animate-fadeIn">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-glow-amber">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">Table Reserved & Guaranteed!</h2>
            <p className="text-xs text-stone-400">
              A digital confirmation pass has been dispatched to <strong>{confirmedReservation.email}</strong>
            </p>
          </div>

          {/* Digital Ticket */}
          <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Booking Pass ID</span>
                <div className="text-base font-extrabold text-amber-400 font-mono">
                  {confirmedReservation.id}
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 size={12} /> {confirmedReservation.status} & Paid
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-stone-500 block">Date & Time</span>
                <span className="text-white font-bold">{confirmedReservation.date} at {confirmedReservation.time}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Table Zone</span>
                <span className="text-white font-bold">{confirmedReservation.tableZone}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Party Size</span>
                <span className="text-white font-bold">{confirmedReservation.guests} Guests</span>
              </div>
              <div>
                <span className="text-stone-500 block">Occasion</span>
                <span className="text-white font-bold">{confirmedReservation.occasion}</span>
              </div>
            </div>

            {/* Advance Deposit Highlight Pill */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/30 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-emerald-300">
                <span>Advance Deposit Paid:</span>
                <span className="text-sm font-extrabold font-mono text-white">₹{confirmedReservation.advancePaid || totalAdvance}</span>
              </div>
              <p className="text-[11px] text-stone-300">
                ✨ <strong>100% Deductible:</strong> Show this pass upon seating at the cafe. ₹{confirmedReservation.advancePaid || totalAdvance} will be subtracted from your final coffee & food bill.
              </p>
            </div>

            {confirmedReservation.specialRequests && (
              <div className="pt-2 border-t border-stone-800 text-xs">
                <span className="text-stone-500 block">Special Notes:</span>
                <p className="text-stone-300 italic">{confirmedReservation.specialRequests}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setConfirmedReservation(null)}
              className="flex-1 py-3.5 rounded-xl bg-stone-800 text-xs font-bold text-stone-300 hover:bg-stone-700 transition-colors"
            >
              Book Another Table
            </button>
            <button
              onClick={() => setCurrentPage('menu')}
              className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-xs font-bold font-heading hover:shadow-glow-amber transition-colors shadow-md"
            >
              Pre-Order Coffee & Food →
            </button>
          </div>
        </div>
      ) : (
        /* Reservation Form + 3D Layout */
        <div className="space-y-10">
          
          {/* 3D Floor Visualizer */}
          <TableLayout3D
            selectedTable={selectedTable}
            onSelectTable={(table) => setSelectedTable(table)}
          />

          {/* Booking Form Details */}
          <form
            onSubmit={handleProceedToPayment}
            className="p-6 sm:p-10 rounded-3xl bg-stone-900/80 border border-stone-800 backdrop-blur-xl shadow-2xl space-y-8"
          >
            <div className="border-b border-stone-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xl font-bold font-heading text-white">Reservation & Guest Details</h3>
                <p className="text-xs text-stone-400">Complete your guest info to choose your table advance deposit</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold self-start sm:self-auto">
                Table Selected: {selectedTable?.id} ({selectedTable?.zone})
              </span>
            </div>

            {/* Guest Name & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full py-2.5 px-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="eleanor@example.com"
                  className="w-full py-2.5 px-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">Phone Number *</label>
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

            {/* Date, Time Slots & Guests */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Date & Guests */}
              <div className="lg:col-span-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">Party Size</label>
                  <div className="flex gap-2 bg-stone-950 p-1 rounded-xl border border-stone-800">
                    {[1, 2, 4, 6, 8].map(g => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => setGuests(g)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          guests === g
                            ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                            : 'text-stone-400 hover:text-white'
                        }`}
                      >
                        {g} {g === 8 ? '+' : ''}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">Occasion</label>
                  <select
                    value={occasion}
                    onChange={e => setOccasion(e.target.value)}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  >
                    {occasions.map((occ, i) => (
                      <option key={i} value={occ}>{occ}</option>
                    ))}
                  </select>
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

            {/* Advance Deposit Summary Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                  <Sparkles size={14} /> Advance Table Booking Deposit
                </div>
                <p className="text-xs text-stone-300">
                  ₹{advancePerGuest} per guest × {guests} guests = <strong className="text-white font-mono text-sm">₹{totalAdvance}</strong>
                </p>
                <span className="text-[11px] text-emerald-400 block font-medium">
                  ✓ 100% of this ₹{totalAdvance} advance is deducted directly from your final dining bill.
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
                <span>Proceed to Pay ₹{totalAdvance} Advance</span>
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
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-400 block">Advance Booking Fee:</span>
                <span className="text-[11px] text-emerald-400 font-semibold">100% credited to your cafe bill</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-amber-400 font-heading">₹{totalAdvance}</span>
              </div>
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
