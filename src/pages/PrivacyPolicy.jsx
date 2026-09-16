import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, ArrowLeft, Mail, Phone, Calendar, Sparkles } from 'lucide-react';

export default function PrivacyPolicy({ setCurrentPage }) {
  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <button
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors mb-2"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck size={14} />
          Trust & Security
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
          Privacy & Data Policy
        </h1>
        
        <p className="text-xs sm:text-sm text-stone-400">
          Last updated: September 2026 • Morning Brew Artisanal Roastery & Lounge
        </p>
      </div>

      {/* Intro Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/80 border border-stone-800 backdrop-blur-xl shadow-xl space-y-4">
        <h2 className="text-xl font-bold font-heading text-amber-300 flex items-center gap-2">
          <Lock size={18} className="text-amber-400" />
          Our Commitment to Your Privacy
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
          At <strong>Morning Brew Cafe</strong>, we respect your personal privacy as much as we value the purity of our single-origin roasts. Because we operate exclusively as an in-person artisanal cafe with real-time 3D table reservations, we only collect information essential to delivering a flawless dining and hospitality experience.
        </p>
      </div>

      {/* Policy Sections Grid */}
      <div className="space-y-6 text-xs sm:text-sm text-stone-300">
        
        {/* Section 1 */}
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-3">
          <div className="flex items-center gap-2 text-base font-bold font-heading text-white">
            <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-mono">01</span>
            <h3>Information We Collect</h3>
          </div>
          <p className="text-stone-400 leading-relaxed">
            When you interact with our website or reserve an artisanal table, we may collect:
          </p>
          <ul className="space-y-2 text-stone-300 pl-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Account & Contact Info:</strong> Your full name, email address, and phone number for digital booking confirmation tickets and login security.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Reservation Preferences:</strong> Chosen 3D table zone, date, time slot, guest count, dietary requests, and special occasions.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Loyalty Rewards Data:</strong> Brew Points earned from in-person table visits and tasting reward redemption history.</span>
            </li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-3">
          <div className="flex items-center gap-2 text-base font-bold font-heading text-white">
            <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-mono">02</span>
            <h3>Advance Booking Deposits & Payment Security</h3>
          </div>
          <p className="text-stone-400 leading-relaxed">
            We require a nominal advance booking deposit (flat ₹100 per table reservation) to guarantee priority zero-wait seating. 
          </p>
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <Sparkles size={14} /> 100% Bill-Deductible Guarantee:
            </div>
            <p className="text-stone-300">
              Your entire ₹100 advance deposit is credited directly to your final food and beverage bill at checkout when you dine with us.
            </p>
          </div>
          <p className="text-stone-400 leading-relaxed pt-1">
            <strong>Payment Processing:</strong> All transactions (UPI, Credit/Debit Cards, Net Banking) are encrypted using industry-standard 256-bit SSL protocols. We never store raw credit card numbers or banking PINs on our servers.
          </p>
        </div>

        {/* Section 3 */}
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-3">
          <div className="flex items-center gap-2 text-base font-bold font-heading text-white">
            <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-mono">03</span>
            <h3>How We Use Your Information</h3>
          </div>
          <ul className="space-y-2 text-stone-300 pl-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>To generate and verify your <strong>digital booking QR ticket</strong> upon arrival at the cafe.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>To communicate reservation updates, table availability changes, or free cancellation requests.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>To send optional VIP Brew Club emails for secret micro-lot drops and cupping tasting events (you can unsubscribe anytime).</span>
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-3">
          <div className="flex items-center gap-2 text-base font-bold font-heading text-white">
            <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-mono">04</span>
            <h3>Third-Party Sharing & Cookies</h3>
          </div>
          <p className="text-stone-400 leading-relaxed">
            <strong>We do not sell, rent, or trade your personal data.</strong> Your information is only shared with verified payment processors for the sole purpose of transaction settlement.
          </p>
          <p className="text-stone-400 leading-relaxed">
            Our interactive 3D WebGL graphics execute locally on your browser hardware and do not collect or transmit private device logs.
          </p>
        </div>

        {/* Section 5: Contact & Rights */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-stone-900/80 to-[#18110b] border border-amber-500/30 space-y-4">
          <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
            <Mail size={16} className="text-amber-400" />
            Questions & Privacy Inquiries
          </h3>
          <p className="text-stone-300 leading-relaxed">
            If you wish to view, modify, or permanently delete your account and booking history, please reach out to our privacy officer:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
              <span className="text-stone-500 block mb-0.5">Email Support</span>
              <strong className="text-amber-400 font-mono">privacy@morningbrewcafe.com</strong>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
              <span className="text-stone-500 block mb-0.5">Roastery Lounge Address</span>
              <strong className="text-white">482 Artisanal Avenue, Downtown Plaza</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-800">
        <button
          onClick={() => setCurrentPage('home')}
          className="w-full sm:w-auto py-3 px-6 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors"
        >
          ← Return to Home
        </button>

        <button
          onClick={() => setCurrentPage('reservation')}
          className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-gradient-to-r from-emerald-500 to-amber-500 text-stone-950 text-xs font-bold font-heading hover:shadow-glow-amber transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Calendar size={15} />
          <span>Book Your Artisanal Table</span>
        </button>
      </div>

    </div>
  );
}
