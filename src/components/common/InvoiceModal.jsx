import React from 'react';
import { X, Printer, Download, Coffee, CheckCircle2, QrCode } from 'lucide-react';

export default function InvoiceModal({ order, onClose }) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#140e0b] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Actions Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="py-1.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 flex items-center gap-1.5 border border-stone-700 transition-colors"
            >
              <Printer size={13} />
              <span>Print Invoice</span>
            </button>
          </div>

          <button
            onClick={onClose}
            aria-label="Close invoice modal"
            className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Printable Receipt Paper */}
        <div className="mt-4 p-6 rounded-2xl bg-[#fdfbf7] text-[#1a120c] font-mono shadow-inner border border-stone-300">
          
          {/* Header */}
          <div className="text-center pb-4 border-b-2 border-dashed border-stone-400">
            <div className="flex items-center justify-center gap-1.5 font-sans font-black text-lg text-amber-900 uppercase tracking-tight">
              <Coffee size={20} className="text-amber-700" />
              Morning Brew Cafe
            </div>
            <div className="text-[10px] text-stone-600 mt-0.5">
              482 Artisanal Ave, Downtown Roastery Plaza
            </div>
            <div className="text-[10px] text-stone-600">Tel: +1 (555) 345-BREW</div>
            <div className="text-[10px] text-stone-500 mt-1">Tax ID: US-BREW-8941092</div>
          </div>

          {/* Receipt Info */}
          <div className="py-3 text-[11px] border-b border-dashed border-stone-300 space-y-1">
            <div className="flex justify-between">
              <span className="text-stone-600">Order ID:</span>
              <span className="font-bold text-black">#{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Date & Time:</span>
              <span>{new Date(order.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Customer:</span>
              <span>{order.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Type:</span>
              <span className="font-semibold">{order.orderType}</span>
            </div>
          </div>

          {/* Itemized list */}
          <div className="py-4 border-b-2 border-dashed border-stone-400 space-y-2 text-xs">
            <div className="flex justify-between text-[10px] uppercase font-bold text-stone-500 pb-1">
              <span>Qty Item</span>
              <span>Total</span>
            </div>

            {order.items?.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start text-[11px]">
                <div className="pr-4">
                  <span className="font-bold mr-1">{item.quantity}x</span>
                  <span>{item.name}</span>
                  {item.customization && (
                    <div className="text-[9px] text-stone-600">
                      {item.customization.size} • {item.customization.milk}
                      {item.customization.syrup && item.customization.syrup !== 'None' ? ` • ${item.customization.syrup}` : ''}
                    </div>
                  )}
                </div>
                <span className="font-semibold flex-shrink-0">
                  ₹{((item.unitPrice || item.price) * item.quantity).toFixed(0)}
                </span>
              </div>
            ))}
          </div>

          {/* Financials Breakdown */}
          <div className="py-3 text-xs space-y-1 border-b-2 border-dashed border-stone-400">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal:</span>
              <span>₹{(order.subtotal || 0).toFixed(0)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount:</span>
                <span>-₹{order.discount.toFixed(0)}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-600">
              <span>Tax (5% GST):</span>
              <span>₹{(order.tax || 0).toFixed(0)}</span>
            </div>
            {order.tip > 0 && (
              <div className="flex justify-between text-stone-600">
                <span>Barista Tip:</span>
                <span>₹{order.tip.toFixed(0)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-black text-black pt-1 border-t border-stone-300">
              <span>GRAND TOTAL:</span>
              <span>₹{(order.total || 0).toFixed(0)}</span>
            </div>
          </div>

          {/* Payment & Barcode Footer */}
          <div className="pt-4 text-center space-y-2">
            <div className="text-[11px] font-semibold text-stone-700">
              Payment Method: {order.paymentMethod || 'Credit Card'} (PAID)
            </div>
            <div className="inline-block py-1 px-4 bg-stone-200 text-stone-800 text-[10px] font-mono tracking-widest uppercase rounded">
              ||| | |||| || ||||| ||| |||| |
            </div>
            <div className="text-[10px] text-stone-500 font-sans">
              Thank you for sipping with Morning Brew! Enjoy every drop. ☕
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
