import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useCafe } from '../../context/CafeContext';

export default function NotificationToast() {
  const { toasts, removeToast } = useCafe();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl border shadow-2xl flex items-start gap-3 backdrop-blur-xl animate-fadeIn ${
              isSuccess
                ? 'bg-[#181a13]/95 border-emerald-500/40 text-emerald-200'
                : isWarning
                ? 'bg-[#1e1310]/95 border-amber-500/40 text-amber-200'
                : 'bg-[#14121a]/95 border-blue-500/40 text-blue-200'
            }`}
          >
            <div className="mt-0.5 flex-shrink-0">
              {isSuccess && <CheckCircle2 size={18} className="text-emerald-400" />}
              {isWarning && <AlertCircle size={18} className="text-amber-400" />}
              {!isSuccess && !isWarning && <Info size={18} className="text-blue-400" />}
            </div>

            <div className="flex-1 text-xs font-semibold leading-relaxed">
              {toast.message}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
