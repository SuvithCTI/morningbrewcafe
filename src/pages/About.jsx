import React, { useState } from 'react';
import { Coffee, Award, Sparkles, Heart, Globe, Flame, Droplets, CheckCircle2 } from 'lucide-react';

export default function About({ setCurrentPage }) {
  const [activeStep, setActiveStep] = useState(0);

  const journeySteps = [
    {
      step: '01',
      title: 'High-Altitude Ethical Harvesting',
      location: 'Yirgacheffe Ethiopia & Huila Colombia',
      description: 'We partner directly with family-owned smallholder farms perched at 1,800m+ above sea level. Cherries are hand-picked at peak ripeness for high natural sweetness and complex fruit clarity.',
      icon: '🌱',
      tag: 'Direct Trade'
    },
    {
      step: '02',
      title: 'Precision Drum Roasting',
      location: 'In-House Small Batch Roastery',
      description: 'Every single lot has a customized thermodynamic curve. Our Loring drum roaster applies indirect convection heat to caramelize organic sugars without bitter charring.',
      icon: '🔥',
      tag: 'Small Batch 15kg'
    },
    {
      step: '03',
      title: 'Dialing In & Mineral Water Chemistry',
      location: 'Artisanal Barista Stage',
      description: 'Our water is remineralized to precisely 130ppm with magnesium and calcium for optimum flavor extraction. Shots are pulled on custom Synesso MVP machines with 0.1g scale accuracy.',
      icon: '💧',
      tag: 'Scientific Extraction'
    },
    {
      step: '04',
      title: 'Micro-Foam Velvet Pour',
      location: 'Your Table in Cafe Lounge',
      description: 'Steamed at 62°C to achieve liquid silk texture. Organic pasture whole milk or house-made oat milk poured with intricate rosette and tulip latte art.',
      icon: '☕',
      tag: 'Artisanal Finish'
    }
  ];

  const galleryImages = [
    { url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80', title: 'Cozy Sunlit Dining Lounge' },
    { url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80', title: 'Artisanal Roastery Counter' },
    { url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', title: 'Pour-Over Chemex Bar' },
    { url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80', title: 'Fresh Daily Pastry Counter' },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* Header & Story Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Coffee size={14} />
            Our Artisanal Story
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading leading-tight">
            Crafting Coffee as an <span className="text-gradient-amber">Art Form</span>
          </h1>
          <p className="text-base text-stone-300 leading-relaxed font-light">
            Founded in 2021 with a simple obsession: to transform your daily morning ritual into a sensory masterpiece. We believe that true coffee excellence begins thousands of miles away in fertile mountain soils and culminates in a perfectly balanced cup served in a warm, welcoming space.
          </p>
          <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl flex-shrink-0">
              ☕
            </div>
            <div className="text-xs text-stone-300">
              <strong className="text-white block mb-0.5">Zero Compromise on Quality</strong>
              Every bean is 100% specialty grade, roasted within 7 days of consumption for ultimate aromatics.
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-500/20 aspect-video lg:aspect-square bg-stone-950">
            <img
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80"
              alt="Morning Brew Artisanal Roastery & Espresso Lab"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80';
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Our Roastery & Espresso Lab
              </span>
              <p className="text-xs text-stone-300 font-light">
                Where passionate coffee craft meets state-of-the-art roasting technology.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE BEAN-TO-CUP JOURNEY */}
      <section className="rounded-3xl bg-gradient-to-b from-stone-900/90 to-[#120d0a]/95 border border-stone-800 p-6 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            The Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            From Green Bean to Golden Cup
          </h2>
          <p className="text-xs text-stone-400 mt-2">
            Click through our 4-stage artisanal journey to see how perfection is crafted.
          </p>
        </div>

        {/* Step Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {journeySteps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                activeStep === idx
                  ? 'bg-amber-500/20 border-amber-500 text-white shadow-glow-amber scale-105'
                  : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className="text-xl mb-2">{s.icon}</div>
              <div className="text-xs font-bold font-heading">{s.step}. {s.title}</div>
              <div className="text-[10px] text-amber-300/80 mt-1">{s.tag}</div>
            </button>
          ))}
        </div>

        {/* Active Step Feature Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-stone-950/80 border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
              Stage {journeySteps[activeStep].step} • {journeySteps[activeStep].location}
            </span>
            <h3 className="text-2xl font-bold text-white font-heading">
              {journeySteps[activeStep].title}
            </h3>
            <p className="text-sm text-stone-300 leading-relaxed max-w-2xl font-light">
              {journeySteps[activeStep].description}
            </p>
          </div>

          <div className="w-24 h-24 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-4xl shadow-inner flex-shrink-0">
            {journeySteps[activeStep].icon}
          </div>
        </div>
      </section>

      {/* AMBIANCE PHOTO GALLERY */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            A Glimpse Into Morning Brew
          </h2>
          <button
            onClick={() => setCurrentPage('reservation')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            Reserve a Table →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((img, idx) => (
            <div key={idx} className="relative rounded-2xl overflow-hidden aspect-square group shadow-lg">
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-xs font-semibold text-white">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
