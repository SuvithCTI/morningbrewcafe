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
      q: 'Do you offer dairy-free and vegan beverage options?',
      a: 'Absolutely! We offer organic oat, almond, and coconut milks, plus a full line of vegan pastries, matcha bowls, and avocado sourdough toasts.'
    },
    {
      q: 'How does table reservation work?',
      a: 'You can pick your favorite booth or patio table on our 3D visual floor map, pick a date and time, and receive an instant digital ticket code with zero reservation fees.'
    },
    {
      q: 'Are all beans roasted in-house?',
      a: 'Yes! We roast weekly in small 15kg batches using our Loring convection roaster to guarantee maximum freshness and sweetness.'
    },
    {
      q: 'Can I host private events or book group seating?',
      a: 'Yes! Call our direct events desk or send us a message below for private coffee tastings, corporate morning sessions, and special occasions.'
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
        
        {/* Left Col: Cafe Visit Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-6">
            <h3 className="text-xl font-bold font-heading text-white">Visit Our Roastery</h3>

            <div className="space-y-4 text-xs text-stone-300">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-950/60 border border-stone-800">
                <MapPin size={18} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-white block text-sm mb-0.5">Flagship Cafe & Lab</strong>
                  <span>482 Artisanal Avenue, Downtown Roastery Plaza, Metro City</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-950/60 border border-stone-800">
                <Clock size={18} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-white block text-sm mb-0.5">Operating Hours</strong>
                  <span>Monday – Friday: 6:30 AM – 9:00 PM</span>
                  <span className="block mt-0.5">Saturday – Sunday: 7:30 AM – 10:30 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-950/60 border border-stone-800">
                <Phone size={18} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-white block text-sm mb-0.5">Call Us</strong>
                  <span>Direct: +1 (555) 345-BREW (2739)</span>
                  <span className="block mt-0.5">Events & Group Booking: +1 (555) 345-EVENT</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-950/60 border border-stone-800">
                <Mail size={18} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-white block text-sm mb-0.5">Email Inquiries</strong>
                  <span>hello@morningbrew.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Message Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-6">
            <h3 className="text-xl font-bold font-heading text-white">Send Us a Direct Message</h3>
            
            {contactSubmitted ? (
              <div className="p-8 text-center rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-3">
                <CheckCircle2 size={36} className="text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Thank You!</h4>
                <p className="text-xs text-stone-300">
                  Your message has been safely delivered to our customer care team. We will get back to you shortly.
                </p>
                <button
                  onClick={() => setContactSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-xs font-bold text-stone-200 hover:bg-stone-700"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={e => setContactName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full py-2.5 px-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={e => setContactEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full py-2.5 px-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Subject</label>
                  <input
                    type="text"
                    value={contactSubject}
                    onChange={e => setContactSubject(e.target.value)}
                    placeholder="General Inquiry / Private Event / Seating"
                    className="w-full py-2.5 px-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={e => setContactMessage(e.target.value)}
                    placeholder="Write your message or inquiry here..."
                    className="w-full py-2.5 px-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="py-3 px-6 rounded-xl bg-amber-500 text-stone-950 font-bold font-heading text-xs hover:bg-amber-400 transition-all flex items-center gap-2 shadow-md"
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
              className="rounded-2xl bg-stone-900/80 border border-stone-800 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left text-xs sm:text-sm font-bold text-white flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`text-amber-400 transform transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
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
