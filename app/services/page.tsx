"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Check, Sparkles, Clock, Compass, FileText, ArrowRight } from 'lucide-react';

interface Package {
  name: string;
  category: string;
  price: string;
  duration: string;
  deliverables: string[];
  features: string[];
  popular?: boolean;
}

const packages: Package[] = [
  {
    name: 'Editorial Portrait',
    category: 'Individual & Branding',
    price: '$350',
    duration: '1.5 Hours',
    deliverables: ['25 Fully Edited High-Res Photos', 'Private Digital Gallery', 'Personal Print License'],
    features: ['1 Location', 'Up to 2 outfit changes', 'Creative direction & styling prep guide', 'Sneak peek within 48 hours']
  },
  {
    name: 'Intimate Story',
    category: 'Weddings & Elopements',
    price: '$1,800',
    duration: '6 Hours',
    deliverables: ['300+ Curated & Edited Photos', 'Private Gallery & Print Shop Access', 'Sneak Peek Gallery'],
    features: ['Pre-wedding consult & timeline planning', 'One lead photographer', 'High-res & web-size download options', 'Digital delivery in 6 weeks'],
    popular: true
  },
  {
    name: 'Full Day Union',
    category: 'Weddings & Elopements',
    price: '$2,800',
    duration: '10 Hours',
    deliverables: ['500+ Curated & Edited Photos', 'High-Res Digital Gallery', 'Luxury Layflat Album (10x10)'],
    features: ['Everything in Intimate Story', 'Complimentary engagement session', 'Second photographer included', 'Digital delivery in 8 weeks']
  },
  {
    name: 'Event Coverage',
    category: 'Birthdays & Celebrations',
    price: '$180/hr',
    duration: 'Minimum 3 Hours',
    deliverables: ['50+ Edited Photos per hour', 'Online Gallery Download', 'Commercial / Event License'],
    features: ['Candid documentary capture', 'Highlight edit styling', 'Group portrait setups', 'Digital delivery in 3 weeks']
  }
];

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "When should we book our session?",
    answer: "For portrait and lifestyle sessions, we recommend booking 4 to 6 weeks in advance. For weddings and elopements, we typically book 6 to 12 months in advance as we limit our schedule to ensure exceptional, bespoke quality."
  },
  {
    question: "Do you travel for destination shoots?",
    answer: "Absolutely! We love photographing stories in new settings. Travel within Colombo is included. For destination shoots in Sri Lanka (Galle, Kandy, Ella, etc.) or internationally, we charge standard travel expenses and accommodation fee guidelines."
  },
  {
    question: "How long does it take to receive the images?",
    answer: "For portrait and event sessions, you will receive your final gallery within 2 to 3 weeks. For weddings and elopements, the curation and fine-art color work takes 6 to 8 weeks. We always send a 10-image sneak peek within 48 hours of your shoot!"
  },
  {
    question: "Do you deliver raw or unedited files?",
    answer: "No, we do not deliver raw files. The curation and editing are key parts of our signature editorial style. We select the best frames that capture genuine emotion and color-grade them to perfection, delivering a polished and coherent narrative."
  },
  {
    question: "What happens if we need to reschedule?",
    answer: "We understand that life is unpredictable. You may reschedule your session up to 14 days before your date without penalty. For weather-dependent outdoor shoots, we track the forecast closely and will coordinate a reschedule if rain or high winds interfere."
  }
];

export default function Services() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Intro Header */}
        <div className="space-y-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Services & Investment</span>
          <h1 className="font-serif text-4xl font-light text-primary sm:text-5xl lg:text-6xl">
            Investment in Art
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted">
            Transparent packages designed for editorial beauty. Every package includes personalized planning and a beautiful digital gallery.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col justify-between rounded-[2.5rem] bg-white p-8 border transition-all duration-300 ${
                pkg.popular
                  ? 'border-primary shadow-xl shadow-slate-100 ring-2 ring-primary/5'
                  : 'border-slate-100 shadow-sm hover:border-slate-300'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                  Most Requested
                </span>
              )}
              
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted">{pkg.category}</span>
                  <h3 className="mt-2 font-serif text-xl font-medium text-primary">{pkg.name}</h3>
                </div>
                
                <div className="border-t border-slate-100 pt-4">
                  <span className="text-4xl font-light text-primary">{pkg.price}</span>
                  <span className="text-xs text-muted block mt-1">session fee</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span>Duration: {pkg.duration}</span>
                </div>

                {/* Deliverables */}
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">What's Included</span>
                  <ul className="space-y-2 text-xs text-muted">
                    {pkg.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-slate-400 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Session Details</span>
                  <ul className="space-y-2 text-xs text-muted">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href="/contact"
                  className={`inline-flex w-full items-center justify-center rounded-full py-3.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all ${
                    pkg.popular
                      ? 'bg-primary text-white hover:bg-slate-800'
                      : 'bg-slate-50 text-primary hover:bg-slate-100'
                  }`}
                >
                  Inquire Package
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ROADMAP SECTION: How It Works */}
        <div className="mt-28 border-t border-slate-100 pt-20">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">The Experience</span>
            <h2 className="font-serif text-3xl font-light text-primary sm:text-4xl">Your Journey with Us</h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted">
              We design a smooth, premium experience from the first click to the final gallery delivery.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-5">
            {[
              { num: '01', title: 'Inquire', text: 'Select package, pick your preferred date, and share your vision in our secure calendar form.' },
              { num: '02', title: 'Consult', text: 'We connect to refine styling guidelines, decide location backdrops, and outline the timeline.' },
              { num: '03', title: 'The Shoot', text: 'A relaxed session focused on natural poses, raw smiles, and beautiful play of lighting.' },
              { num: '04', title: 'Art Edit', text: 'We review all shots frame by frame, color grading details to match our editorial signature.' },
              { num: '05', title: 'Gallery', text: 'Receive your private digital gallery download link and option to order custom art prints.' }
            ].map((step, idx) => (
              <div key={idx} className="relative space-y-4 rounded-3xl bg-[#faf8f5] p-6 text-left border border-slate-100">
                <span className="font-serif text-4xl font-light italic text-slate-300 block">{step.num}</span>
                <h3 className="font-serif text-lg font-medium text-primary">{step.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ ACCORDION */}
        <div className="mt-28 max-w-4xl mx-auto border-t border-slate-100 pt-20">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">FAQ</span>
            <h2 className="font-serif text-3xl font-light text-primary sm:text-4xl">Common Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-slate-100 bg-[#faf8f5] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left font-serif text-base font-medium text-primary hover:text-muted focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-primary' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? 'max-h-60 border-t border-slate-200/50' : 'max-h-0'
                    }`}
                  >
                    <div className="p-6 text-sm leading-relaxed text-muted bg-white">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-28 rounded-[3rem] bg-[#111827] px-8 py-12 text-center text-white md:px-12 md:py-16">
          <h2 className="font-serif text-3xl font-light leading-tight sm:text-4xl">Have a unique project in mind?</h2>
          <p className="mt-3 text-sm text-slate-300 max-w-lg mx-auto">
            We love crafting custom sessions. Let us know what you want to build and we will send a tailored estimate.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition hover:bg-slate-50"
            >
              Get Custom Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
