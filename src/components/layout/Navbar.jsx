import React, { useState, useEffect } from 'react';
import { Coffee, Calendar, User, Sparkles, Menu as MenuIcon, X, ShieldAlert, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

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
          ? 'py-3 bg-[#110d0a]/90 backdrop-blur-xl border-b border-amber-500/20 shadow-2xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-[2px] shadow-glow-amber group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#18110b] rounded-[14px] flex items-center justify-center">
                <Coffee size={22} className="text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                Morning Brew <span className="text-amber-400">Cafe</span>
              </span>
              <span className="block text-[10px] text-amber-200/70 tracking-widest uppercase font-semibold">
                3D Artisanal Roastery & Lounge
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-stone-900/60 p-1.5 rounded-full border border-stone-800/80 backdrop-blur-md">
            {navItems.map(item => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 relative ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-glow-amber font-bold'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  {item.label}
                  {item.id === 'reservation' && (
                    <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  )}
                </button>
              );
            })}

            {/* Admin Dashboard link if user is admin */}
            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                  currentPage === 'admin'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-rose-400 hover:bg-rose-950/40 border border-rose-500/30'
                }`}
              >
                <ShieldAlert size={12} />
                Admin Panel
              </button>
            )}
          </nav>

          {/* Action Icons: Table CTA, User Auth */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Table Reservation Button */}
            <button
              onClick={() => handleNavClick('reservation')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all"
            >
              <Calendar size={14} />
              <span>Book Table</span>
            </button>

            {/* User Profile / Login Trigger */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('profile')}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-stone-900/80 border border-amber-500/30 hover:border-amber-400 transition-all"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-amber-400"
                  />
                  <span className="hidden md:inline text-xs font-semibold text-stone-200 max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  {user.role === 'admin' && (
                    <span className="hidden md:inline-block px-1.5 py-0.5 rounded text-[9px] bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
                      ADMIN
                    </span>
                  )}
                </button>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 text-stone-400 hover:text-rose-400 transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-xs font-bold font-heading hover:shadow-glow-amber transition-all flex items-center gap-1.5"
              >
                <User size={14} />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full bg-stone-900/80 border border-stone-800 text-stone-300 hover:text-white"
            >
              {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 mx-4 p-4 rounded-3xl bg-[#18110b]/95 border border-amber-500/30 backdrop-blur-2xl shadow-2xl space-y-2 animate-fadeIn">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-between text-left transition-colors ${
                currentPage === item.id
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                  : 'text-stone-300 hover:bg-stone-900'
              }`}
            >
              <span>{item.label}</span>
              {item.id === 'reservation' && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Book Table
                </span>
              )}
            </button>
          ))}

          <button
            onClick={() => handleNavClick('admin')}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-rose-300 bg-rose-950/30 border border-rose-500/30 flex items-center gap-2"
          >
            <ShieldAlert size={14} />
            Admin Panel Dashboard
          </button>
        </div>
      )}
    </header>
  );
}
