import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle2, ChevronDown } from 'lucide-react';
import { useCafe } from '../context/CafeContext';

export default function Contact() {
  const { addToast } = useCafe();

  // Contact Message form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // FAQ state
  const [openFaq, setOpenFaq] = useState(null);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    addToast('📩 Message sent! Our team will respond within 24 hours.', 'success');
  };

  const faqs = [
    {
      q: 'How does the ₹100 advance table deposit work?',
      a: 'We require a flat ₹100 advance deposit per reservation to hold your table. 100% of this ₹100 is credited directly toward your final food & coffee bill when you dine with us. You can cancel with a full refund up to 1 hour prior to your booking.'
    },
    {
      q: 'How does table reservation and 3D seating work?',
      a: 'You can pick your favorite booth or patio table directly on our interactive 3D floor map, choose your date and time slot, and receive an instant digital confirmation ticket.'
    },
    {
      q: 'Are all coffee beans roasted in-house?',
      a: 'Yes! We ethically source 100% specialty-grade Arabica beans from Ethiopia & Colombia, roasting weekly in small 15kg batches for maximum sweetness and aroma.'
    },
    {
      q: 'Do you offer dairy-free, vegan, and gluten-free choices?',
      a: 'Yes! We offer organic oat, almond, and coconut milks at no extra cost, alongside fresh plant-based artisan toasts, matcha bowls, and gluten-free pastries.'
    },
    {
      q: 'Is the cafe suitable for remote work and study?',
      a: 'Yes! We provide complimentary 500Mbps high-speed fiber Wi-Fi, dedicated universal AC power outlets at private booths, and a quiet lounge area.'
    }
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <MessageSquare size={14} />
          Get In Touch
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
          Contact & Visit Our Cafe
        </h1>
        <p className="text-xs sm:text-sm text-stone-400">
          Have a question, inquiry, or planning a group visit? We would love to hear from you.
        </p>
      </div>

      {/* Grid: Contact Info & Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Cafe Visit Cards (Low Opacity Light Glass Theme) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/20 via-white/10 to-amber-500/10 backdrop-blur-xl border border-amber-400/30 shadow-2xl space-y-6 text-stone-100">
            <h3 className="text-xl font-extrabold font-heading text-white flex items-center gap-2">
              <MapPin size={20} className="text-amber-400" />
              Visit Our Roastery
            </h3>

            <div className="space-y-3 text-xs text-stone-200">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 shadow-xs hover:border-amber-400/60 hover:bg-white/25 transition-all">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center flex-shrink-0 font-bold border border-amber-400/30">
                  <MapPin size={18} />
                </div>
                <div>
                  <strong className="text-white block text-sm mb-0.5 font-bold">Flagship Cafe & Lab</strong>
                  <span className="font-light text-stone-200">482 Artisanal Avenue, Downtown Roastery Plaza, Metro City</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 shadow-xs hover:border-amber-400/60 hover:bg-white/25 transition-all">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center flex-shrink-0 font-bold border border-amber-400/30">
                  <Clock size={18} />
                </div>
                <div>
                  <strong className="text-white block text-sm mb-0.5 font-bold">Operating Hours</strong>
                  <span className="font-light text-stone-200 block">Monday – Friday: 6:30 AM – 9:00 PM</span>
                  <span className="font-light text-stone-200 block mt-0.5">Saturday – Sunday: 7:30 AM – 10:30 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 shadow-xs hover:border-amber-400/60 hover:bg-white/25 transition-all">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center flex-shrink-0 font-bold border border-amber-400/30">
                  <Phone size={18} />
                </div>
                <div>
                  <strong className="text-white block text-sm mb-0.5 font-bold">Call Us</strong>
                  <span className="font-light text-stone-200 block">Direct: +1 (555) 345-BREW (2739)</span>
                  <span className="font-light text-stone-200 block mt-0.5">Events & Group Booking: +1 (555) 345-EVENT</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 shadow-xs hover:border-amber-400/60 hover:bg-white/25 transition-all">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center flex-shrink-0 font-bold border border-amber-400/30">
                  <Mail size={18} />
                </div>
                <div>
                  <strong className="text-white block text-sm mb-0.5 font-bold">Email Inquiries</strong>
                  <span className="font-semibold text-amber-300">hello@morningbrew.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Message Form (Low Opacity Light Glass Theme) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/20 via-white/10 to-amber-500/10 backdrop-blur-xl border border-amber-400/30 shadow-2xl space-y-6 text-stone-100">
            <h3 className="text-xl font-extrabold font-heading text-white flex items-center gap-2">
              <Send size={20} className="text-amber-400" />
              Send Us a Direct Message
            </h3>
            
            {contactSubmitted ? (
              <div className="p-8 text-center rounded-2xl bg-emerald-950/40 border border-emerald-500/40 shadow-sm space-y-3 text-emerald-200 backdrop-blur-md">
                <CheckCircle2 size={36} className="text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white font-heading">Thank You!</h4>
                <p className="text-xs text-stone-200">
                  Your message has been safely delivered to our customer care team. We will get back to you shortly.
                </p>
                <button
                  onClick={() => setContactSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-200 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={e => setContactName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full py-2.5 px-3.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 focus:bg-white/25 transition-all shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-200 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={e => setContactEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full py-2.5 px-3.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 focus:bg-white/25 transition-all shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-200 mb-1">Subject</label>
                  <input
                    type="text"
                    value={contactSubject}
                    onChange={e => setContactSubject(e.target.value)}
                    placeholder="General Inquiry / Private Event / Seating"
                    className="w-full py-2.5 px-3.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 focus:bg-white/25 transition-all shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-200 mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={e => setContactMessage(e.target.value)}
                    placeholder="Write your message or inquiry here..."
                    className="w-full py-2.5 px-3.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 focus:bg-white/25 transition-all shadow-xs"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="py-3.5 px-7 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-stone-950 font-black font-heading text-xs shadow-glow-amber hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Send size={14} />
                  <span>Submit Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* FAQ SECTION */}
      <section className="max-w-3xl mx-auto space-y-6 pt-6">
        <h2 className="text-2xl font-bold font-heading text-white text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-stone-900/80 border border-stone-800 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left text-xs sm:text-sm font-bold text-white flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`text-amber-400 transform transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs text-stone-300 leading-relaxed border-t border-stone-800/60">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
