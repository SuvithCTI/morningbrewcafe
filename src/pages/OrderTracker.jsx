import React, { useState } from 'react';
import { Coffee, CheckCircle2, Clock, Sparkles, Truck, FileText, ArrowRight, RotateCcw, AlertCircle, ChefHat } from 'lucide-react';
import InvoiceModal from '../components/common/InvoiceModal';
import { useCafe } from '../context/CafeContext';
import { useCart } from '../context/CartContext';

export default function OrderTracker({ setCurrentPage }) {
  const { orders, activeTrackingOrder, setActiveTrackingOrder, updateOrderStatus } = useCafe();
  const { addToCart } = useCart();
  const [showInvoice, setShowInvoice] = useState(false);
  const [searchOrderId, setSearchOrderId] = useState('');

  const currentOrder = activeTrackingOrder || (orders.length > 0 ? orders[0] : null);

  const stages = [
    { key: 'Placed', label: 'Order Confirmed', icon: '📝', desc: 'Received & routed to the barista station.' },
    { key: 'Brewing', label: 'Barista Brewing', icon: '☕', desc: 'Grinding beans & micro-foaming velvet milk.' },
    { key: 'Quality Check', label: 'Quality Inspected', icon: '✨', desc: 'Temperature, crema & packaging verified.' },
    { key: 'Ready / Out for Delivery', label: 'Ready / On The Way', icon: '🚀', desc: 'Ready for table service or pickup.' },
    { key: 'Delivered', label: 'Completed', icon: '🎉', desc: 'Enjoy your handcrafted brew!' }
  ];

  const getStageIndex = (status) => {
    if (!status) return 0;
    const lower = status.toLowerCase();
    if (lower.includes('placed')) return 0;
    if (lower.includes('brew')) return 1;
    if (lower.includes('quality') || lower.includes('check')) return 2;
    if (lower.includes('ready') || lower.includes('delivery')) return 3;
    if (lower.includes('deliver') || lower.includes('complete')) return 4;
    return 1;
  };

  const currentStageIdx = getStageIndex(currentOrder?.orderStatus);

  const handleReorder = (item) => {
    addToCart(item, item.customization || {});
  };

  const handleSearchOrder = (e) => {
    e.preventDefault();
    if (!searchOrderId) return;
    const found = orders.find(o => o.id.toLowerCase() === searchOrderId.trim().toLowerCase());
    if (found) {
      setActiveTrackingOrder(found);
      setSearchOrderId('');
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <Clock size={14} />
          Live Barista Order Tracker
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
          Track Your Fresh Brew
        </h1>
        <p className="text-xs sm:text-sm text-stone-400">
          Follow your cup from the espresso grinder through extraction and table delivery.
        </p>

        {/* Quick Order Lookup Form */}
        <form onSubmit={handleSearchOrder} className="pt-2 flex max-w-xs mx-auto gap-2">
          <input
            type="text"
            value={searchOrderId}
            onChange={e => setSearchOrderId(e.target.value)}
            placeholder="Search Order ID (e.g. MB-88210)"
            className="w-full py-2 px-3 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            className="py-2 px-3 rounded-xl bg-stone-800 text-xs font-bold text-amber-300 hover:bg-stone-700 transition-colors border border-stone-700"
          >
            Find
          </button>
        </form>
      </div>

      {currentOrder ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left / Main Tracker Box */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#17100c] border border-amber-500/30 shadow-2xl space-y-8 relative overflow-hidden">
              {/* Glow background */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

              {/* Order Status Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
                <div>
                  <span className="text-xs text-stone-500 uppercase font-bold tracking-wider">Live Order ID</span>
                  <div className="text-2xl font-black text-white font-mono flex items-center gap-2">
                    #{currentOrder.id}
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-sans font-semibold border border-amber-500/40">
                      {currentOrder.orderType}
                    </span>
                  </div>
                  <div className="text-xs text-stone-400 mt-1">
                    Placed at {new Date(currentOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Guest: {currentOrder.customerName}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowInvoice(true)}
                    className="py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-2 transition-colors"
                  >
                    <FileText size={15} className="text-amber-400" />
                    <span>View Receipt</span>
                  </button>
                </div>
              </div>

              {/* Animated 4-Stage Progress Tracker */}
              <div className="space-y-6">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <ChefHat size={16} /> Barista Status: {currentOrder.orderStatus}
                  </span>
                  <span className="text-stone-400">
                    Est. Time: <strong className="text-white">{currentOrder.estimatedTime}</strong>
                  </span>
                </div>

                {/* Progress Bar Line */}
                <div className="relative w-full h-3 bg-stone-900 rounded-full overflow-hidden p-0.5 border border-stone-800">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-300 rounded-full transition-all duration-700 shadow-glow-amber"
                    style={{ width: `${Math.min(100, ((currentStageIdx + 1) / 4) * 100)}%` }}
                  ></div>
                </div>

                {/* Step Circles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  {stages.slice(0, 4).map((st, idx) => {
                    const isDone = currentStageIdx >= idx;
                    const isCurrent = currentStageIdx === idx;

                    return (
                      <div
                        key={st.key}
                        className={`p-3.5 rounded-2xl border transition-all ${
                          isCurrent
                            ? 'bg-amber-500/20 border-amber-500 shadow-glow-amber scale-105'
                            : isDone
                            ? 'bg-stone-900/90 border-emerald-500/40 text-stone-200'
                            : 'bg-stone-950/50 border-stone-800 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xl">{st.icon}</span>
                          {isDone ? (
                            <CheckCircle2 size={16} className="text-emerald-400" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-stone-700"></span>
                          )}
                        </div>
                        <div className={`text-xs font-bold ${isCurrent ? 'text-amber-300' : 'text-white'}`}>
                          {st.label}
                        </div>
                        <p className="text-[10px] text-stone-400 mt-1 leading-tight">{st.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Demo Status Advance Buttons (for easy live demonstration) */}
              <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-stone-400 flex items-center gap-1.5 font-medium">
                  <Sparkles size={14} className="text-amber-400" />
                  Simulate Barista Action:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Placed', 'Brewing', 'Quality Check', 'Ready / Out for Delivery', 'Delivered'].map(s => (
                    <button
                      key={s}
                      onClick={() => updateOrderStatus(currentOrder.id, s)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                        currentOrder.orderStatus === s
                          ? 'bg-amber-500 text-stone-950 font-bold'
                          : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
                      }`}
                    >
                      {s.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right / Order Summary Side Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-5">
              <h3 className="text-base font-bold font-heading text-white pb-3 border-b border-stone-800">
                Itemized Summary
              </h3>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {currentOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start text-xs pb-3 border-b border-stone-800/60 last:border-0">
                    <div>
                      <div className="font-bold text-white">
                        {item.quantity}x {item.name}
                      </div>
                      {item.customization && (
                        <div className="text-[10px] text-stone-400">
                          {item.customization.size} • {item.customization.milk}
                          {item.customization.syrup && item.customization.syrup !== 'None' ? ` • ${item.customization.syrup}` : ''}
                        </div>
                      )}
                    </div>
                    <span className="font-bold text-stone-200">
                      ${((item.unitPrice || item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Breakdown */}
              <div className="pt-3 border-t border-stone-800 space-y-1.5 text-xs text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-stone-200">${(currentOrder.subtotal || 0).toFixed(2)}</span>
                </div>
                {currentOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount:</span>
                    <span>-${currentOrder.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax & Tip:</span>
                  <span className="text-stone-200">
                    ${((currentOrder.tax || 0) + (currentOrder.tip || 0)).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white font-heading pt-2 border-t border-stone-800">
                  <span>Paid Total:</span>
                  <span className="text-amber-400">${(currentOrder.total || 0).toFixed(2)}</span>
                </div>
              </div>

              {/* Re-order CTA */}
              <button
                onClick={() => {
                  currentOrder.items?.forEach(item => handleReorder(item));
                  setCurrentPage('menu');
                }}
                className="w-full py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-stone-700"
              >
                <RotateCcw size={14} className="text-amber-400" />
                <span>Re-order Items</span>
              </button>
            </div>
          </div>

        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-stone-900/40 border border-stone-800 space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
            <Coffee size={28} />
          </div>
          <h3 className="text-lg font-bold text-white">No Active Orders Yet</h3>
          <p className="text-xs text-stone-400">
            Once you place an order, you can track every step of preparation right here in real-time.
          </p>
          <button
            onClick={() => setCurrentPage('menu')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold font-heading hover:bg-amber-400 transition-colors shadow-md"
          >
            Start an Order
          </button>
        </div>
      )}

      {/* Order History Table */}
      {orders.length > 1 && (
        <div className="space-y-4 pt-6">
          <h3 className="text-xl font-bold font-heading text-white">Your Order History</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map(ord => (
              <div
                key={ord.id}
                onClick={() => setActiveTrackingOrder(ord)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeTrackingOrder?.id === ord.id
                    ? 'bg-amber-500/10 border-amber-500/60 shadow-md ring-1 ring-amber-500/40'
                    : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono font-bold text-amber-400 text-xs">#{ord.id}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-300">
                    {ord.orderStatus}
                  </span>
                </div>
                <div className="text-xs text-stone-300 font-medium truncate">
                  {ord.items?.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                </div>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-stone-800/80 text-xs">
                  <span className="text-stone-500">{new Date(ord.createdAt).toLocaleDateString()}</span>
                  <span className="font-bold text-white">${(ord.total || 0).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {showInvoice && currentOrder && (
        <InvoiceModal order={currentOrder} onClose={() => setShowInvoice(false)} />
      )}

    </div>
  );
}
