import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Sparkles, Coffee } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCafe } from '../../context/CafeContext';

export default function CartDrawer({ setCurrentPage }) {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    promoCode,
    promoMessage,
    applyPromoCode,
    removePromoCode,
    orderType,
    setOrderType,
    subtotal,
    totalDiscount,
    deliveryFee,
    tax,
    total,
    totalCount
  } = useCart();

  const { addToast } = useCafe();
  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyPromoCode(couponInput);
    if (res.success) {
      addToast(res.message, 'success');
      setCouponInput('');
    } else {
      addToast(res.message, 'warning');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#130d0a] border-l border-amber-500/20 shadow-2xl flex flex-col justify-between overflow-hidden">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-stone-800/80 bg-[#19110d] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <ShoppingBag size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold font-heading text-white">Your Artisanal Order</h3>
                <span className="text-xs text-amber-300/80 font-medium">
                  {totalCount} item{totalCount !== 1 ? 's' : ''} in cart
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart drawer"
              className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Dining Mode Selector */}
          <div className="p-4 bg-stone-950/60 border-b border-stone-800">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
              Select Dining Mode
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-stone-900/80 p-1 rounded-xl border border-stone-800">
              {['Dine-In', 'Takeaway', 'Express Delivery'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setOrderType(mode)}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all ${
                    orderType === mode
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Coffee size={32} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Your Cart is Empty</h4>
                  <p className="text-xs text-stone-400 mt-1 max-w-[220px]">
                    Explore our aromatic roasts and pastries to craft your morning experience.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentPage('menu');
                  }}
                  className="px-5 py-2 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold font-heading hover:bg-amber-400 transition-colors shadow-md"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              items.map(item => (
                <div
                  key={item.cartItemId}
                  className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-800/80 flex items-start gap-3 relative group hover:border-amber-500/30 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover ring-1 ring-amber-500/20 flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0 pr-4">
                    <h5 className="text-sm font-bold text-white truncate font-heading">{item.name}</h5>
                    <div className="text-[11px] text-amber-300/90 font-medium">
                      ₹{item.unitPrice.toFixed(0)} each
                    </div>

                    {/* Customization pills */}
                    {item.customization && (
                      <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-stone-400">
                        {item.customization.size && item.customization.size !== 'Standard' && (
                          <span className="px-1.5 py-0.2 rounded bg-stone-800 border border-stone-700">
                            {item.customization.size}
                          </span>
                        )}
                        {item.customization.milk && item.customization.milk !== 'None' && item.customization.milk !== 'Whole Milk' && (
                          <span className="px-1.5 py-0.2 rounded bg-stone-800 border border-stone-700 text-amber-200/80">
                            {item.customization.milk}
                          </span>
                        )}
                        {item.customization.extraShots > 0 && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-semibold">
                            +{item.customization.extraShots} shot
                          </span>
                        )}
                        {item.customization.syrup && item.customization.syrup !== 'None' && (
                          <span className="px-1.5 py-0.2 rounded bg-stone-800 border border-stone-700">
                            {item.customization.syrup}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Quantity Adjustment */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-stone-800 rounded-lg p-0.5 border border-stone-700">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-300 hover:text-white"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-300 hover:text-white"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="text-xs font-extrabold text-white font-heading ml-auto">
                        ₹{(item.unitPrice * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    title="Remove item"
                    className="text-stone-500 hover:text-rose-400 transition-colors p-1"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 bg-[#160f0c] border-t border-stone-800 space-y-4">
              
              {/* Promo code bar */}
              <div>
                {promoCode ? (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs">
                    <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                      <Sparkles size={13} /> Code <strong>{promoCode}</strong> applied
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-stone-400 hover:text-rose-400 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value)}
                        placeholder="Promo code (e.g. BREW20)"
                        className="w-full py-2 px-3 pl-8 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 uppercase focus:outline-none focus:border-amber-500"
                      />
                      <Tag size={13} className="absolute left-2.5 top-2.5 text-stone-500" />
                    </div>
                    <button
                      type="submit"
                      className="py-2 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 transition-colors border border-stone-700"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-400 pt-2 border-t border-stone-800/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-200">₹{subtotal.toFixed(0)}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-₹{totalDiscount.toFixed(0)}</span>
                  </div>
                )}
                {orderType === 'Express Delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="text-stone-200">₹{deliveryFee.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="text-stone-200">₹{tax.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white font-heading pt-2 border-t border-stone-800">
                  <span>Total</span>
                  <span className="text-amber-400">₹{total.toFixed(0)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-stone-950 font-bold font-heading text-sm flex items-center justify-center gap-2 shadow-glow-amber hover:shadow-glow-orange hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
