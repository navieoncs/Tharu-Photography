"use client";

import Link from 'next/link';
import { Camera, Heart, Sun, Award, Mail, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxWrapper from '@/components/ParallaxWrapper';

export default function About() {
  const pillars = [
    {
      icon: <Sun className="h-6 w-6 text-amber-600" />,
      title: 'Natural Light Focus',
      text: 'We study the movement of the sun, chasing soft morning haze and the rich, golden warm light of late afternoons to paint our subjects naturally.'
    },
    {
      icon: <Heart className="h-6 w-6 text-rose-600" />,
      title: 'Unscripted Moments',
      text: 'While we guide you with gentle directions, our true focus is the in-between laughs, quiet sighs, and real expressions that showcase the heart.'
    },
    {
      icon: <Camera className="h-6 w-6 text-indigo-600" />,
      title: 'Minimalist Framing',
      text: 'Our compositions prioritize breathing room, thin clean lines, and an editorial crop style that removes distractions and highlights the core story.'
    }
  ];

  const stats = [
    { val: '3+', label: 'Years Active' },
    { val: '70+', label: 'Stories Captured' },
    { val: '3K+', label: 'Delivered Images' },
    { val: '100%', label: 'Happy Clients' }
  ];

  const gearList = [
    { category: 'Camera Bodies', items: ['Sony Alpha 7R V (61MP Ultra Resolution)', 'Fujifilm GFX 50S II (Medium Format Depth)'] },
    { category: 'Prime Lenses', items: ['Sony FE 50mm f/1.2 GM (Signature Portrait)', 'Sony FE 85mm f/1.4 GM (High-Compression Bokeh)', 'Fujinon GF 80mm f/1.7 R WR (Medium Format Warmth)'] },
    { category: 'Editing Suite', items: ['Capture One Pro (Raw Development)', 'Adobe Lightroom Classic', 'Bespoke Film Grain Emulations'] }
  ];

  return (
    <div className="bg-white pt-6 pb-16 sm:pt-10 sm:pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Page Header */}
        <ScrollReveal y={30} triggerHook="top 85%" className="space-y-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">The Story</span>
          <h1 className="font-serif text-4xl font-light text-primary sm:text-5xl lg:text-6xl">
            Behind the Lens
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted">
            A look into our creative philosophy, technical gear, and the story of Tharu Photography.
          </p>
        </ScrollReveal>

        {/* Bio & Intro Grid */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* Portrait Image frame with parallax */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-xl shadow-slate-100/50 aspect-[4/5]">
            <ParallaxWrapper speed={10} className="h-full w-full">
              <img
                src="/images/tharu.jpg"
                alt="Tharu Portrait"
                className="h-[120%] w-[120%] -translate-y-[10%] object-cover transition duration-700 hover:scale-[1.02]"
              />
            </ParallaxWrapper>
          </div>

          {/* Narrative Text */}
          <ScrollReveal y={40} triggerHook="top 80%" className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">Meet the Photographer</span>
            <h2 className="font-serif text-3xl font-light text-primary sm:text-4xl">
              Hello, I'm <span className="font-normal italic">Tharu</span>.
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              Photography, to me, is the art of pausing time to capture feeling. I started my journey with a simple vintage film camera, fascinated by how light could transform ordinary spaces into moments of quiet beauty. 
            </p>
            <p className="text-sm leading-relaxed text-muted">
              Over the last three years, Tharu Photography has grown into a boutique creative studio dedicated to documenting weddings, elopements, and individual portraits. We approach every session as a collaborative editorial project. We steer away from rigid, overly staged setups, choosing instead to guide our subjects into comfortable spaces where their genuine personalities shine.
            </p>
            
            {/* Stats list */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100 sm:grid-cols-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="font-serif text-3xl font-medium text-primary">{stat.val}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Pillars / Philosophy Grid */}
        <div className="mt-28 border-t border-slate-100 pt-20">
          <ScrollReveal y={30} triggerHook="top 85%" className="text-center space-y-3 mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Our Core Pillars</span>
            <h2 className="font-serif text-3xl font-light text-primary sm:text-4xl">Creative Philosophy</h2>
          </ScrollReveal>

          <ScrollReveal stagger={0.15} triggerHook="top 80%" className="grid gap-10 md:grid-cols-3">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="rounded-3xl bg-[#faf8f5] p-8 border border-slate-100 space-y-4">
                <div className="rounded-2xl bg-white p-3.5 w-fit shadow-sm">
                  {pillar.icon}
                </div>
                <h3 className="font-serif text-lg font-medium text-primary">{pillar.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{pillar.text}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>

        {/* Gear and technical details */}
        <ScrollReveal y={40} triggerHook="top 80%" className="mt-28 border-t border-slate-100 pt-20">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Technical Details</span>
              <h2 className="mt-2 font-serif text-3xl font-light text-primary sm:text-4xl">The Equipment</h2>
              <p className="mt-4 text-xs leading-relaxed text-muted max-w-sm">
                We believe that equipment should empower creativity, not define it. We select top-tier full-frame and medium-format bodies coupled with ultra-wide aperture prime lenses to ensure unmatched detail, texture rendering, and dynamic range in all lighting situations.
              </p>
            </div>
            <div className="space-y-8">
              {gearList.map((gear, idx) => (
                <div key={idx} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                  <h3 className="font-serif text-base font-medium text-primary mb-3">{gear.category}</h3>
                  <ul className="grid gap-2 sm:grid-cols-2 text-xs text-muted">
                    {gear.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-300"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal y={50} triggerHook="top 85%" className="mt-28 border-t border-slate-100 pt-20 text-center space-y-6">
          <h2 className="font-serif text-3xl font-light text-primary sm:text-4xl">Let's craft your story together.</h2>
          <p className="text-sm text-muted max-w-lg mx-auto leading-relaxed">
            Reach out to share your project dates, style ideas, and locations. We look forward to working with you.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800"
            >
              Get In Touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
