"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, Check, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/ScrollReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceCategory {
  name: string;
  category: string;
  description: string;
  deliverables: string[];
  features: string[];
}

const services: ServiceCategory[] = [
  {
    name: 'Weddings & Elopements',
    category: 'Selected Unions',
    description: 'Cinematic visual narratives documenting wedding pre-shoots, ceremony highlights, fine-art couple sessions, and details.',
    deliverables: ['Custom high-resolution digital gallery', 'Optional luxury layflat albums', 'Custom coverage timeline plan'],
    features: ['Tailored hourly packages', 'Lead + second photographer options', 'Pre-wedding consultation & timeline planning']
  },
  {
    name: 'Editorial Portraits',
    category: 'Creative Sessions',
    description: 'Striking individual sessions, fashion editorials, and commercial branding collections that emphasize authentic character.',
    deliverables: ['High-res retouched digital files', 'Creative direction & styling support', 'Bespoke print package options'],
    features: ['Studio or outdoor lighting setups', 'Multiple outfit changes', 'Creative storyboard planning']
  },
  {
    name: 'Milestones & Birthdays',
    category: 'Documentary Coverage',
    description: 'Candid and elegant coverage of family reunions, anniversaries, corporate launches, and birthday celebrations.',
    deliverables: ['Curated digital downloads', 'Online gallery sharing link', 'Rapid sneak-peek turnaround'],
    features: ['Documentary-style candid capture', 'Group portrait coordination', 'Full digital downloads']
  },
  {
    name: 'Commercial & Branding',
    category: 'Product & Fashion Campaigns',
    description: 'Custom campaigns, product catalogs, lifestyle lookbooks, and high-end imagery tailored for editorial prints and platforms.',
    deliverables: ['Commercial licensing permissions', 'High-res & web-optimized delivery', 'Full digital asset suite'],
    features: ['Commercial lighting & staging setups', 'Product styling & detail framing', 'Custom usage licenses']
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

  const heroSectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(headingRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.4 }
    );

    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 1.2 },
      '-=1.0'
    );
  }, { scope: heroSectionRef });

  return (
    <div className="bg-white pt-6 pb-16 sm:pt-10 sm:pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Intro Header */}
        <div ref={heroSectionRef} className="space-y-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Services & Investment</span>
          <h1 ref={headingRef} className="font-serif text-4xl font-light text-primary sm:text-5xl lg:text-6xl opacity-0 translate-y-[60px]">
            Investment in Art
          </h1>
          <p ref={subtitleRef} className="mx-auto max-w-xl text-sm leading-relaxed text-muted opacity-0 translate-y-[25px]">
            Bespoke collections tailored for editorial beauty. Rates and coverage options are customized and negotiated directly over the phone.
          </p>
        </div>

        {/* Services Categories Grid */}
        <ScrollReveal stagger={0.12} triggerHook="top 80%" className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((svc, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between rounded-[2.5rem] bg-white p-8 border border-slate-100 shadow-sm hover:border-slate-300 transition-all duration-300"
            >
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted">{svc.category}</span>
                  <h3 className="mt-2 font-serif text-xl font-medium text-primary">{svc.name}</h3>
                </div>
                
                <div className="border-t border-slate-100 pt-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Rates</span>
                  <p className="mt-1 text-sm font-medium text-primary">Negotiated over phone</p>
                </div>

                <p className="text-xs leading-relaxed text-muted">{svc.description}</p>

                {/* Deliverables */}
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Typical Deliverables</span>
                  <ul className="space-y-2 text-xs text-muted">
                    {svc.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-slate-400 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Available Options</span>
                  <ul className="space-y-2 text-xs text-muted">
                    {svc.features.map((feature, i) => (
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
                  className="inline-flex w-full items-center justify-center rounded-full py-3.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all bg-slate-50 text-primary hover:bg-slate-100"
                >
                  Inquire Details
                </Link>
              </div>
            </div>
          ))}
        </ScrollReveal>

        {/* ROADMAP SECTION: How It Works */}
        <div className="mt-28 border-t border-slate-100 pt-20">
          <ScrollReveal y={30} triggerHook="top 85%" className="text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">The Experience</span>
            <h2 className="font-serif text-3xl font-light text-primary sm:text-4xl">Your Journey with Us</h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted">
              We design a smooth, premium experience from the first click to the final gallery delivery.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger={0.12} triggerHook="top 80%" className="mt-16 grid gap-8 md:grid-cols-5">
            {[
              { num: '01', title: 'Inquire', text: 'Select service type, pick your preferred date, and share your vision in our secure calendar form.' },
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
          </ScrollReveal>
        </div>

        {/* FAQ ACCORDION */}
        <div className="mt-28 max-w-4xl mx-auto border-t border-slate-100 pt-20">
          <ScrollReveal y={30} triggerHook="top 85%" className="text-center space-y-3 mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">FAQ</span>
            <h2 className="font-serif text-3xl font-light text-primary sm:text-4xl">Common Questions</h2>
          </ScrollReveal>

          <ScrollReveal stagger={0.1} triggerHook="top 85%" className="space-y-4">
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
          </ScrollReveal>
        </div>

        {/* CTA Banner */}
        <ScrollReveal y={40} triggerHook="top 85%" className="mt-28 rounded-[3rem] bg-[#111827] px-8 py-12 text-center text-white md:px-12 md:py-16">
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
        </ScrollReveal>

      </div>
    </div>
  );
}
