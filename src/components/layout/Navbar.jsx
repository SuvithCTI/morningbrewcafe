import React, { useState, useEffect } from 'react';
import { Calendar, User, Sparkles, Menu as MenuIcon, X, ShieldAlert, LogOut, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import CafeLogo from '../common/CafeLogo';

export default function Navbar({ currentPage, setCurrentPage }) {
  const { user, openAuthModal, logout, isAdmin } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'menu', label: 'Cafe Menu' },
    { id: 'reservation', label: 'Reserve Table' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-2.5 bg-gradient-to-r from-[#fffdfa]/95 via-[#faf4ea]/95 to-[#fffdfa]/95 backdrop-blur-2xl border-b border-amber-500/25 shadow-[0_6px_30px_rgba(180,83,9,0.08)] text-stone-900'
          : 'py-3 bg-gradient-to-r from-[#fefcf8]/90 via-[#f8f1e4]/90 to-[#fefcf8]/90 backdrop-blur-xl border-b border-amber-400/20 shadow-sm text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          
          {/* Brand Logo with animations */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 group text-left focus:outline-none flex-shrink-0"
          >
            <CafeLogo size="nav" animated={true} showSteam={true} showRing={true} showAura={true} />
            <div className="min-w-0">
              <span className="font-heading font-black text-base sm:text-lg lg:text-xl tracking-tight text-[#2d1405] flex items-center gap-1.5 leading-none">
                Morning Brew <span className="text-gradient-amber font-black">Cafe</span>
              </span>
              <span className="block text-[9px] sm:text-[10px] text-[#783e15] tracking-widest uppercase font-extrabold mt-0.5 truncate">
                3D Artisanal Roastery & Lounge
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/85 p-1.5 rounded-full border border-amber-300/60 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] flex-shrink-0">
            {navItems.map(item => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 xl:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 relative whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-stone-950 shadow-md font-black scale-105'
                      : 'text-stone-700 hover:text-amber-950 hover:bg-amber-100/60'
                  }`}
                >
                  {item.label}
                  {item.id === 'reservation' && (
                    <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  )}
                </button>
              );
            })}

            {/* Admin Dashboard link if user is admin */}
            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`px-3 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  currentPage === 'admin'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-rose-700 hover:bg-rose-100 border border-rose-300/80 bg-rose-50/50'
                }`}
              >
                <ShieldAlert size={13} className="text-rose-600" />
                <span>Admin Panel</span>
              </button>
            )}
          </nav>

          {/* Action Icons: Small Contact Icon, Table CTA, User Auth */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            
            {/* Small Contact Icon Button */}
            <button
              onClick={() => handleNavClick('contact')}
              title="Contact Us"
              aria-label="Contact Us"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-xs ${
                currentPage === 'contact'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md scale-105 ring-2 ring-amber-400/40'
                  : 'bg-white/90 border border-amber-300/80 text-[#5c2a07] hover:bg-amber-100/80 hover:text-[#2d1405]'
              }`}
            >
              <MessageSquare size={16} />
            </button>

            {/* Table Reservation Button */}
            <button
              onClick={() => handleNavClick('reservation')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white text-xs font-black shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
            >
              <Calendar size={14} />
              <span>Book Table</span>
            </button>

            {/* User Profile / Login Trigger */}
            {user ? (
              <div className="flex items-center gap-1 sm:gap-1.5">
                <button
                  onClick={() => handleNavClick('profile')}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1.5 rounded-full bg-white border transition-all shadow-sm ${
                    currentPage === 'profile' ? 'border-amber-500 ring-2 ring-amber-400/30' : 'border-amber-300/80 hover:border-amber-500'
                  }`}
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-amber-500 flex-shrink-0"
                  />
                  <span className="hidden sm:inline text-xs font-extrabold text-[#2d1405] max-w-[70px] lg:max-w-[90px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  {user.role === 'admin' && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-rose-100 text-rose-700 border border-rose-300 font-black leading-none flex-shrink-0">
                      ADMIN
                    </span>
                  )}
                </button>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 rounded-full text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-stone-950 text-xs font-black font-heading hover:shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                <User size={14} />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="lg:hidden p-2 rounded-full bg-white border border-amber-200 text-[#2d1405] hover:bg-amber-50 shadow-xs flex-shrink-0"
            >
              {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 mx-3 sm:mx-4 p-4 rounded-3xl bg-[#fdfaf4] border border-amber-400/40 backdrop-blur-2xl shadow-2xl space-y-2.5 animate-fadeIn text-[#2d1405]">
          
          {/* User Profile Mini Header in Drawer */}
          {user ? (
            <div className="p-3 rounded-2xl bg-white/90 border border-amber-300/80 flex items-center justify-between gap-3 mb-2 shadow-xs">
              <div 
                onClick={() => handleNavClick('profile')}
                className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0"
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-amber-500 flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#2d1405] truncate">{user.name}</div>
                  <div className="text-[10px] text-amber-700 font-semibold">{user.loyaltyPoints || 340} Brew Points</div>
                </div>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-xl text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-300/80 flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-[#421d07]">Welcome to Morning Brew</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-xs shadow-xs"
              >
                Sign In
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <div className="space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between text-left transition-colors ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-stone-950 shadow-md font-black'
                    : 'text-[#421d07] hover:bg-amber-100/60'
                }`}
              >
                <span>{item.label}</span>
                {item.id === 'reservation' && (
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-black shadow-xs">
                    Book Table
                  </span>
                )}
              </button>
            ))}
          </div>

        </div>
      )}
    </header>
  );
}
