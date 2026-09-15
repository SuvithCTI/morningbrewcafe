import React, { useState } from 'react';
import { X, User, Mail, Lock, Phone, Sparkles, ShieldAlert, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCafe } from '../../context/CafeContext';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalTab, setAuthModalTab, login, register, loginDemo, loading } = useAuth();
  const { addToast } = useCafe();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (authModalTab === 'login') {
      const res = await login(email, password);
      if (res.success) {
        addToast(res.message, 'success');
      } else {
        setError(res.error);
      }
    } else {
      const res = await register(name, email, password, phone);
      if (res.success) {
        addToast(res.message, 'success');
      } else {
        setError(res.error);
      }
    }
  };

  const handleDemo = async (role) => {
    setError('');
    const res = await loginDemo(role);
    if (res.success) {
      addToast(res.message, 'success');
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-[#160f0b] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          aria-label="Close authentication modal"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-glow-amber">
            <User size={24} />
          </div>
          <h3 className="text-2xl font-bold font-heading text-white">
            {authModalTab === 'login' ? 'Welcome to Morning Brew' : 'Create Your Account'}
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            {authModalTab === 'login'
              ? 'Sign in to access your orders, brew points, and reservations.'
              : 'Join the Brew Club to earn points and enjoy member discounts.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-stone-900/90 p-1 rounded-xl border border-stone-800 mb-5">
          <button
            onClick={() => {
              setAuthModalTab('login');
              setError('');
            }}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
              authModalTab === 'login'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setAuthModalTab('register');
              setError('');
            }}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
              authModalTab === 'register'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300">
            {error}
          </div>
        )}

        {/* Fast 1-Click Demo Buttons for Instant Testing */}
        <div className="mb-5 p-3 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
            <Sparkles size={11} /> 1-Click Fast Demo Login
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemo('customer')}
              disabled={loading}
              className="py-1.5 px-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <User size={13} className="text-amber-400" />
              Customer Demo
            </button>
            <button
              type="button"
              onClick={() => handleDemo('admin')}
              disabled={loading}
              className="py-1.5 px-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/40 border border-rose-500/40 text-rose-200 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <ShieldAlert size={13} className="text-rose-400" />
              Admin Demo
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {authModalTab === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full py-2.5 px-3 pl-9 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
                <User size={14} className="absolute left-3 top-3 text-stone-500" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full py-2.5 px-3 pl-9 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
              <Mail size={14} className="absolute left-3 top-3 text-stone-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full py-2.5 px-3 pl-9 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
              <Lock size={14} className="absolute left-3 top-3 text-stone-500" />
            </div>
          </div>

          {authModalTab === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Phone Number (Optional)</label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full py-2.5 px-3 pl-9 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
                <Phone size={14} className="absolute left-3 top-3 text-stone-500" />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-stone-950 font-bold font-heading text-sm shadow-glow-amber hover:shadow-glow-orange hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Authenticating...' : (authModalTab === 'login' ? 'Sign In to Account' : 'Create My Account')}</span>
            <ArrowRight size={15} />
          </button>
        </form>

      </div>
    </div>
  );
}
