import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CafeProvider } from './context/CafeContext';

import Background3D from './components/layout/Background3D';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomizeModal from './components/menu/CustomizeModal';
import AuthModal from './components/common/AuthModal';
import NotificationToast from './components/common/NotificationToast';
import FloatingContactButton from './components/common/FloatingContactButton';

import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Reservation from './pages/Reservation';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['home', 'about', 'menu', 'reservation', 'contact', 'profile', 'admin', 'privacy'].includes(hash)) {
        setCurrentPage(hash);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.location.hash = newPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={handlePageChange} />;
      case 'about':
        return <About setCurrentPage={handlePageChange} />;
      case 'menu':
        return <Menu setCurrentPage={handlePageChange} />;
      case 'reservation':
        return <Reservation setCurrentPage={handlePageChange} />;
      case 'contact':
        return <Contact setCurrentPage={handlePageChange} />;
      case 'profile':
        return <Profile setCurrentPage={handlePageChange} />;
      case 'admin':
        return <AdminDashboard setCurrentPage={handlePageChange} />;
      case 'privacy':
        return <PrivacyPolicy setCurrentPage={handlePageChange} />;
      default:
        return <Home setCurrentPage={handlePageChange} />;
    }
  };

  return (
    <AuthProvider>
      <CafeProvider>
        <div className="relative min-h-screen bg-transparent text-[#f4ede4] flex flex-col justify-between selection:bg-amber-500 selection:text-black">
          
          {/* 3D Animated Background Canvas & Glow Orbs */}
          <Background3D currentPage={currentPage} />

          {/* Glassmorphic Navbar */}
          <Navbar currentPage={currentPage} setCurrentPage={handlePageChange} />

          {/* Main Content Area */}
          <main className="relative z-10 flex-grow">
            {renderPage()}
          </main>

          {/* Footer */}
          <Footer setCurrentPage={handlePageChange} />

          {/* Drink & Bakery Details Modal */}
          <CustomizeModal onNavigateReservation={() => handlePageChange('reservation')} />

          {/* User Login & Registration Modal */}
          <AuthModal />

          {/* Global Notification Toasts */}
          <NotificationToast />

          {/* Persistent Floating Contact Icon Button on Every Page */}
          <FloatingContactButton currentPage={currentPage} setCurrentPage={handlePageChange} />

        </div>
      </CafeProvider>
    </AuthProvider>
  );
}
