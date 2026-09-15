import React, { useState } from 'react';
import { CreditCard, QrCode, ShoppingBag, ShieldCheck, Sparkles, ArrowRight, CheckCircle2, DollarSign, MapPin, Truck, Utensils } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCafe } from '../context/CafeContext';

export default function Checkout({ setCurrentPage }) {
  const {
    items,
    orderType,
    setOrderType,
    subtotal,
    totalDiscount,
    deliveryFee,
    tax,
    tipAmount,
    setTipAmount,
    total,
    clearCart,
    deliveryAddress,
    setDeliveryAddress,
    tableNumber,
    setTableNumber,
    orderNotes,
    setOrderNotes
  } = useCart();

  const { user } = useAuth();
  const { submitOrder, loading } = useCafe();

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card'); // 'Credit Card' | 'UPI' | 'Apple Pay' | 'Cash'
  
  // Card simulation state
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('389');
  const [cardName, setCardName] = useState(user?.name || 'ELEANOR VANCE');

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 max-w-lg mx-auto px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
          <ShoppingBag size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white font-heading">Your Cart is Empty</h2>
        <p className="text-xs text-stone-400">
          Add delicious espresso, cold brew, or fresh bakery treats before heading to checkout.
        </p>
        <button
          onClick={() => setCurrentPage('menu')}
          className="px-6 py-3 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs font-heading hover:bg-amber-400 transition-colors"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const orderPayload = {
      userId: user?.id || 'guest',
      customerName: customerName || 'Valued Guest',
      customerEmail: customerEmail || 'guest@example.com',
      customerPhone: customerPhone || '+1 (555) 000-0000',
      items,
      orderType,
      deliveryAddress: orderType === 'Express Delivery' ? deliveryAddress : '',
      tableNumber: orderType === 'Dine-In' ? tableNumber : '',
      subtotal,
      discount: totalDiscount,
      tax,
      tip: tipAmount,
      total,
      paymentMethod: `${paymentMethod} ${paymentMethod === 'Credit Card' ? '(•••• ' + cardNumber.slice(-4) + ')' : ''}`,
      notes: orderNotes
    };

    const res = await submitOrder(orderPayload);
    if (res.success) {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#fbbf24', '#ec4899', '#ffffff']
      });
      clearCart();
      setCurrentPage('order-tracker');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Page Title */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
          Finalize Your Order
        </h1>
        <p className="text-xs text-stone-400">
          Review your order details and choose your preferred payment method.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Details, Dining Mode, & Payment */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Dining Mode */}
          <div className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-4">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
              1. Dining Mode
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Dine-In', icon: <Utensils size={16} />, desc: 'At your table' },
                { id: 'Takeaway', icon: <ShoppingBag size={16} />, desc: 'Quick pickup' },
                { id: 'Express Delivery', icon: <Truck size={16} />, desc: 'Doorstep dispatch' }
              ].map(mode => (
                <button
                  type="button"
                  key={mode.id}
                  onClick={() => setOrderType(mode.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    orderType === mode.id
                      ? 'bg-amber-500/20 border-amber-500 text-white shadow-glow-amber scale-[1.02]'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-white'
                  }`}
                >
                  <div className="text-amber-400 mb-1">{mode.icon}</div>
                  <div className="text-xs font-bold">{mode.id}</div>
                  <div className="text-[10px] text-stone-500">{mode.desc}</div>
                </button>
              ))}
            </div>

            {/* Conditional Sub-fields */}
            {orderType === 'Dine-In' && (
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Table Number</label>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={e => setTableNumber(e.target.value)}
                  placeholder="e.g. Table #4"
                  className="w-full py-2.5 px-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            )}

            {orderType === 'Express Delivery' && (
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Delivery Address *</label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                  placeholder="e.g. 742 Evergreen Terrace, Apt 3B"
                  className="w-full py-2.5 px-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            )}
          </div>

          {/* 2. Contact Information */}
          <div className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-4">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
              2. Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full py-2 px-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full py-2 px-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Phone *</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full py-2 px-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* 3. Simulated Payment Gateway */}
          <div className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-5">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
              3. Secure Payment Method
            </h3>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Credit Card', 'UPI QR Code', 'Apple / GPay', 'Cash on Counter'].map(pm => (
                <button
                  type="button"
                  key={pm}
                  onClick={() => setPaymentMethod(pm)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                    paymentMethod === pm
                      ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-md'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-white'
                  }`}
                >
                  {pm}
                </button>
              ))}
            </div>

            {/* Credit Card Interactive Visual */}
            {paymentMethod === 'Credit Card' && (
              <div className="space-y-4 pt-2">
                {/* 3D Styled Credit Card */}
                <div className="w-full max-w-sm mx-auto h-48 rounded-2xl bg-gradient-to-tr from-amber-800 via-stone-900 to-amber-600 p-5 shadow-2xl border border-amber-400/40 text-white flex flex-col justify-between relative overflow-hidden preserve-3d">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl pointer-events-none"></div>
                  
                  <div className="flex justify-between items-center relative z-10">
                    <span className="text-xs font-bold tracking-widest text-amber-200">MORNING BREW VIP</span>
                    <span className="text-base font-black italic text-amber-300">VISA</span>
                  </div>

                  <div className="text-lg font-mono tracking-widest text-center py-2 relative z-10">
                    {cardNumber}
                  </div>

                  <div className="flex justify-between text-[11px] font-mono relative z-10">
                    <div>
                      <span className="text-[8px] block text-stone-400 uppercase">Cardholder</span>
                      <span className="font-bold">{cardName || 'ELEANOR VANCE'}</span>
                    </div>
                    <div>
                      <span className="text-[8px] block text-stone-400 uppercase">Expires</span>
                      <span className="font-bold">{cardExpiry}</span>
                    </div>
                  </div>
                </div>

                {/* Card input inputs */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="col-span-2">
                    <label className="block text-stone-300 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={e => setCardExpiry(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 mb-1">CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={e => setCardCvv(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* UPI QR Code Simulator */}
            {paymentMethod === 'UPI QR Code' && (
              <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 text-center space-y-3">
                <div className="w-40 h-40 bg-white p-3 rounded-xl mx-auto flex items-center justify-center shadow-lg">
                  <QrCode size={130} className="text-black" />
                </div>
                <div className="text-xs text-stone-300 font-medium">
                  Scan with any UPI app (GPay, PhonePe, Paytm)
                </div>
                <div className="text-[11px] font-mono text-amber-400">
                  upi://pay?pa=morningbrew@bank&am={total.toFixed(2)}
                </div>
              </div>
            )}

            {/* Apple / GPay Simulator */}
            {paymentMethod === 'Apple / GPay' && (
              <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 text-center space-y-3">
                <div className="text-3xl"> / GPay</div>
                <p className="text-xs text-stone-400">
                  Clicking "Place Order" will trigger 1-Touch biometric authorization for ${total.toFixed(2)}.
                </p>
              </div>
            )}

            {/* Cash on Counter */}
            {paymentMethod === 'Cash on Counter' && (
              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 text-xs text-stone-300 space-y-1">
                <p>💵 Pay at our cashier counter when you pick up or when your order arrives at your table.</p>
              </div>
            )}
          </div>

        </div>

        {/* Right Col: Order Summary & Tip Selector */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800 sticky top-28 space-y-6">
            
            <h3 className="text-base font-bold font-heading text-white pb-3 border-b border-stone-800">
              Order Summary ({items.length} item{items.length !== 1 ? 's' : ''})
            </h3>

            {/* Items summary */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {items.map(item => (
                <div key={item.cartItemId} className="flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-white">
                      {item.quantity}x {item.name}
                    </div>
                    {item.customization && (
                      <div className="text-[10px] text-stone-400">
                        {item.customization.size} • {item.customization.milk}
                      </div>
                    )}
                  </div>
                  <span className="font-semibold text-stone-200">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Barista Tip Selector */}
            <div className="pt-4 border-t border-stone-800 space-y-2">
              <label className="block text-xs font-semibold text-stone-300">
                Support our Baristas with a Tip
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: '$1.00', val: 1.00 },
                  { label: '$1.50', val: 1.50 },
                  { label: '$2.50', val: 2.50 },
                  { label: 'None', val: 0.00 }
                ].map(t => (
                  <button
                    type="button"
                    key={t.label}
                    onClick={() => setTipAmount(t.val)}
                    className={`py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      tipAmount === t.val
                        ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-sm'
                        : 'bg-stone-950 text-stone-400 border-stone-800'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-stone-400 pt-4 border-t border-stone-800">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-stone-200">${subtotal.toFixed(2)}</span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Promo Discount</span>
                  <span>-${totalDiscount.toFixed(2)}</span>
                </div>
              )}
              {orderType === 'Express Delivery' && (
                <div className="flex justify-between">
                  <span>Express Delivery Fee</span>
                  <span className="text-stone-200">${deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Sales Tax</span>
                <span className="text-stone-200">${tax.toFixed(2)}</span>
              </div>
              {tipAmount > 0 && (
                <div className="flex justify-between">
                  <span>Barista Tip</span>
                  <span className="text-amber-300">${tipAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-extrabold text-white font-heading pt-3 border-t border-stone-800">
                <span>Grand Total</span>
                <span className="text-amber-400 font-heading">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-stone-950 font-extrabold font-heading text-base shadow-glow-amber hover:shadow-glow-orange hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles size={18} />
              <span>{loading ? 'Submitting Order...' : `Pay & Place Order • $${total.toFixed(2)}`}</span>
            </button>

            <div className="text-[10px] text-stone-500 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck size={12} className="text-emerald-400" />
              <span>256-Bit Encrypted Secure Checkout</span>
            </div>

          </div>
        </div>

      </form>

    </div>
  );
}
