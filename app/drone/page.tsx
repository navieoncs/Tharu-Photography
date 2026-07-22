"use client";

import { useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Mountain,
  Building2,
  Heart,
  Map,
  Video,
  Camera,
  Wind,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/ScrollReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const offerings = [
  {
    icon: Heart,
    title: 'Wedding Aerials',
    text: 'Sweeping ceremony reveals, couple portraits from altitude, and cinematic venue flyovers that place your day in the landscape.',
  },
  {
    icon: Building2,
    title: 'Property & Estates',
    text: 'Clean, high-resolution exterior and estate sequences for listings, hotels, and architectural showcases.',
  },
  {
    icon: Mountain,
    title: 'Landscapes & Travel',
    text: 'Dramatic coastlines, hill country, and destination stories captured with stable flight and editorial colour.',
  },
  {
    icon: Video,
    title: 'Cinematic Video',
    text: 'Smooth tracking shots, orbit reveals, and altitude transitions designed for films, reels, and highlight edits.',
  },
];

const processSteps = [
  {
    num: '01',
    title: 'Brief & Location',
    desc: 'We map your venue, wind windows, and the shots that matter most — from first kiss reveals to estate flyovers.',
  },
  {
    num: '02',
    title: 'Flight Plan',
    desc: 'Safe flight paths, altitude, and composition are planned so every pass feels intentional, never improvised.',
  },
  {
    num: '03',
    title: 'Capture Day',
    desc: 'Quiet, precise operation with dual attention to ground moments and the sky — timed around golden light when possible.',
  },
  {
    num: '04',
    title: 'Edit & Deliver',
    desc: 'Cinematic grade, stabilised sequences, and stills curated into a gallery that matches our portrait work.',
  },
];

const highlights = [
  { icon: Camera, label: '4K Aerial Stills & Video' },
  { icon: Wind, label: 'Smooth Cinematic Flight' },
  { icon: ShieldCheck, label: 'Safety-First Operation' },
  { icon: Compass, label: 'Sri Lanka Wide Coverage' },
];

export default function DronePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const overlapRef = useRef<HTMLElement>(null);
  const droneImgRef = useRef<HTMLDivElement>(null);
  const droneFloatRef = useRef<HTMLDivElement>(null);
  const sideCopyRef = useRef<HTMLDivElement>(null);
  const floatLabelRef = useRef<HTMLDivElement>(null);

  // Hero entrance
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.4 }
    );
    tl.fromTo(
      subheadingRef.current,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 1.2 },
      '-=1.0'
    );
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 1 },
        '-=0.9'
      );
    }
  }, { scope: heroRef });

  // Overlap section — cinematic fade/rise entrance; settle pose locked (no snap)
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!overlapRef.current) return;

    const drone = droneImgRef.current;
    const floatEl = droneFloatRef.current;
    const copy = sideCopyRef.current;
    const badge = floatLabelRef.current;
    const section = overlapRef.current;

    // Start state — all motion ends at the same identity pose
    gsap.set(drone, {
      opacity: 0,
      y: 96,
      x: 28,
      scale: 0.9,
      rotate: -5,
      filter: 'blur(8px)',
      transformOrigin: '50% 55%',
    });
    gsap.set(copy, { opacity: 0, y: 36 });
    gsap.set(badge, { opacity: 0, y: 20, scale: 0.96 });
    if (floatEl) gsap.set(floatEl, { y: 0, rotate: 0 });

    if (prefersReduced) {
      gsap.set(drone, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotate: 0,
        filter: 'blur(0px)',
      });
      gsap.set([copy, badge], { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      let floatTween: gsap.core.Tween | null = null;
      let hasPlayed = false;
      let userHasScrolled = false;

      const lockSettledPose = () => {
        // Keep transform at identity via GSAP (no clearProps → no CSS snap)
        gsap.set(drone, {
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
          filter: 'blur(0px)',
        });
        gsap.set(copy, { y: 0, opacity: 1 });
        gsap.set(badge, { y: 0, scale: 1, opacity: 1 });
      };

      const enter = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          lockSettledPose();

          // Soft hover on INNER layer only — outer shell stays fixed
          if (floatEl) {
            floatTween = gsap.to(floatEl, {
              y: -12,
              rotate: 1.2,
              duration: 3.4,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
            });
          }
        },
      });

      // 1) Drone: fade + rise + gentle approach (settles cleanly to rest)
      enter.to(drone, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotate: 0,
        filter: 'blur(0px)',
        duration: 1.55,
        ease: 'power4.out',
      });

      // 2) Editorial copy rises slightly after drone is readable
      enter.to(
        copy,
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          ease: 'power3.out',
        },
        '-=1.15'
      );

      // 3) Platform badge
      enter.to(
        badge,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power2.out',
        },
        '-=0.65'
      );

      const sectionInView = () =>
        section.getBoundingClientRect().top < window.innerHeight * 0.58;

      const tryPlayEntrance = () => {
        if (hasPlayed) return;
        if (!userHasScrolled || window.scrollY < 40) return;
        if (!sectionInView()) return;
        hasPlayed = true;
        enter.play(0);
      };

      const onScroll = () => {
        if (window.scrollY >= 40) userHasScrolled = true;
        tryPlayEntrance();
      };

      window.addEventListener('scroll', onScroll, { passive: true });

      ScrollTrigger.create({
        trigger: section,
        start: 'top 55%',
        onEnter: tryPlayEntrance,
      });

      return () => {
        floatTween?.kill();
        window.removeEventListener('scroll', onScroll);
      };
    }, overlapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Ambient gradients */}
      <div className="pointer-events-none absolute top-[-5%] left-[-10%] h-[40rem] w-[40rem] rounded-full bg-slate-50 blur-3xl -z-10" />
      <div className="pointer-events-none absolute top-[35%] right-[-15%] h-[45rem] w-[45rem] rounded-full bg-sky-50/40 blur-3xl -z-10" />
      <div className="pointer-events-none absolute bottom-[10%] left-[20%] h-[30rem] w-[30rem] rounded-full bg-amber-50/30 blur-3xl -z-10" />

      {/* 1. HERO */}
      <section ref={heroRef} className="relative pt-4 pb-12 sm:pt-6 sm:pb-16 lg:pt-10 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center space-y-5 sm:space-y-6">
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted sm:text-xs sm:tracking-[0.3em]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
              </span>
              Aerial Studio · Dronography
            </span>
            <h1
              ref={headingRef}
              className="font-serif text-4xl font-light leading-[1.1] text-primary sm:text-5xl md:text-6xl lg:text-7xl opacity-0 translate-y-[60px]"
            >
              Stories from{' '}
              <span className="italic font-normal">Above</span>
            </h1>
            <p
              ref={subheadingRef}
              className="mx-auto max-w-xl text-sm leading-7 text-muted sm:text-base sm:leading-8 md:text-lg opacity-0 translate-y-[25px]"
            >
              Precision aerial photography and cinematic drone video for weddings,
              estates, and landscapes, elevating every frame with a bird&apos;s-eye narrative.
            </p>
            <div
              ref={ctaRef}
              className="flex flex-col items-stretch justify-center gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 opacity-0 scale-95"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all hover:bg-slate-800 sm:px-7 sm:text-xs sm:tracking-[0.2em]"
              >
                Book Aerial Session <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#capabilities"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary transition-all hover:bg-slate-50 sm:px-7 sm:text-xs sm:tracking-[0.2em]"
              >
                Explore Capabilities
              </a>
            </div>
          </div>

          {/* Quick highlight strip */}
          <ScrollReveal y={30} className="mt-10 grid grid-cols-1 gap-3 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-[#faf8f5]/80 px-3 py-3 sm:px-4 sm:py-3.5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-700">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-primary leading-snug sm:text-[11px] sm:tracking-[0.12em]">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      {/* 2. GSAP OVERLAP — large transparent DJI over typography */}
      <section
        ref={overlapRef}
        className="relative overflow-hidden border-t border-b border-slate-100 bg-[#faf8f5] py-12 sm:py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Mobile: stacked. Desktop: overlapping composition */}
          <div className="relative flex flex-col gap-8 md:min-h-[520px] lg:min-h-[640px] md:block">
            {/* Side editorial copy */}
            <div
              ref={sideCopyRef}
              className="relative z-10 w-full max-w-md space-y-4 md:pt-12 md:pl-2 opacity-0 order-1"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-700/80">
                Signature craft
              </span>
              <h2 className="font-serif text-2xl font-light text-primary sm:text-3xl md:text-4xl leading-tight">
                Flight-ready artistry for unforgettable days
              </h2>
              <p className="text-sm leading-relaxed text-muted max-w-sm">
                From intimate ring reveals to sweeping venue orbits, our drone work is
                directed like a film unit — quiet on set, precise in the air, and finished
                with the same editorial grade as our portraiture.
              </p>
              <ul className="space-y-2 pt-2">
                {['Licensed & insured operation', 'Wedding-day discrete flight', 'Stills + 4K motion packages'].map(
                  (line) => (
                    <li
                      key={line}
                      className="flex items-center gap-2 text-xs text-primary/80"
                    >
                      <span className="h-1 w-1 rounded-full bg-amber-600" />
                      {line}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Large DJI PNG — contained on mobile, overlapping on md+ */}
            <div
              ref={droneImgRef}
              className="pointer-events-none relative z-20 w-full max-w-lg mx-auto md:absolute md:right-[-4%] lg:right-0 md:top-0 md:mx-0 md:w-[78%] lg:w-[68%] md:max-w-[900px] will-change-transform opacity-0 order-2"
            >
              <div ref={droneFloatRef} className="relative will-change-transform">
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[40%] h-[55%] w-[70%] rounded-full bg-sky-200/30 blur-3xl"
                  aria-hidden
                />
                <img
                  src="/images/djinew.png"
                  alt="DJI drone prepared for wedding aerial and ring presentation"
                  className="relative w-full h-auto object-contain drop-shadow-[0_30px_50px_rgba(15,23,42,0.22)] scale-105 sm:scale-110 md:scale-[1.25] lg:scale-[1.35] origin-center"
                  draggable={false}
                />
              </div>
            </div>

            {/* Floating badge */}
            <div
              ref={floatLabelRef}
              className="relative z-30 self-start md:absolute md:bottom-10 md:left-auto md:right-[12%] lg:right-[18%] opacity-0 order-3"
            >
              <div className="inline-flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-xl shadow-slate-200/60 backdrop-blur-md">
                <Map className="h-4 w-4 text-sky-600 shrink-0" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                    Platform
                  </p>
                  <p className="text-xs font-semibold text-primary">
                    DJI · Cinematic Aerial
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES */}
      <section id="capabilities" className="py-14 sm:py-20 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal y={30} className="text-center space-y-4 mb-10 sm:mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
              What We Capture
            </span>
            <h2 className="font-serif text-2xl font-light text-primary sm:text-3xl md:text-4xl">
              Dronography for every altitude of your story
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted">
              Aerial stills and motion designed to pair with our ground photography —
              one cohesive visual language from the aisle to the horizon.
            </p>
          </ScrollReveal>

          <ScrollReveal y={40} stagger={0.12} className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {offerings.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-slate-100 hover:border-slate-200 space-y-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-50 to-slate-50 border border-sky-100/60 text-slate-800 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-primary tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted">{item.text}</p>
                </div>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      {/* 4. PROCESS */}
      <section className="border-t border-b border-slate-100 bg-[#faf8f5] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal y={30} className="text-center space-y-4 mb-10 sm:mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
              How It Works
            </span>
            <h2 className="font-serif text-2xl font-light text-primary sm:text-3xl md:text-4xl">
              From brief to skyline
            </h2>
          </ScrollReveal>

          <ScrollReveal y={35} stagger={0.1} className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div
                key={step.num}
                className="relative rounded-3xl bg-white border border-slate-100 p-6 shadow-sm space-y-3"
              >
                <span className="font-serif text-3xl text-slate-200 font-bold tracking-wider">
                  {step.num}
                </span>
                <h3 className="font-serif text-lg font-medium text-primary">{step.title}</h3>
                <p className="text-[11px] leading-relaxed text-muted">{step.desc}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* 5. DETAIL BAND */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:gap-12 lg:grid-cols-2 lg:items-center">
            <ScrollReveal y={30} className="space-y-5 sm:space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                Why Aerial Matters
              </span>
              <h2 className="font-serif text-2xl font-light text-primary sm:text-3xl md:text-4xl leading-tight">
                Context, scale, and emotion only the sky can give
              </h2>
              <p className="text-sm leading-relaxed text-muted">
                A single overhead frame can show the full geometry of a ceremony, the
                coastline holding your resort, or the estate that becomes your forever
                home. We treat altitude as another lens in the story — not a gimmick.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { val: '4K+', label: 'Resolution ready' },
                  { val: 'Safe', label: 'Flight protocols' },
                  { val: 'Same day', label: 'Sneak peeks available' },
                  { val: 'Matched', label: 'Colour to studio work' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-slate-100 bg-[#faf8f5] px-4 py-4"
                  >
                    <p className="font-serif text-2xl text-primary font-medium">{stat.val}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal y={40} className="relative">
              <div className="relative overflow-hidden rounded-[2.5rem] aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] shadow-2xl">
                <img
                  src="/images/WhyAerial Matters.png"
                  alt="Why Aerial Matters"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 space-y-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70">
                    Ground + sky
                  </p>
                  <p className="font-serif text-2xl text-white font-light">
                    One continuous visual story
                  </p>
                </div>
              </div>
              {/* Accent card */}
              <div className="absolute -bottom-4 -left-2 sm:left-6 sm:-bottom-6 max-w-[240px] rounded-2xl border border-slate-100 bg-white p-5 shadow-xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                  Ideal for
                </p>
                <p className="mt-2 text-sm leading-relaxed text-primary">
                  Weddings · Resorts · Real estate · Events · Destination films
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 px-6 py-20 text-center shadow-2xl sm:px-12 md:py-24">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay -z-10"
            style={{ backgroundImage: "url('/images/event2.jpg')" }}
          />
          <div className="absolute top-[10%] right-[-10%] w-[28rem] h-[28rem] rounded-full bg-sky-900/40 blur-3xl -z-10 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-sky-400">
              Ready to take flight
            </span>
            <h2 className="font-serif text-3xl font-light leading-tight text-white sm:text-4xl md:text-5xl">
              Book your aerial session
            </h2>
            <p className="text-xs leading-relaxed text-slate-300 max-w-lg mx-auto">
              Tell us the date, location, and the shots you imagine. We&apos;ll plan a
              safe flight path and craft a sky-level chapter for your gallery.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-all hover:bg-slate-50"
              >
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-white/10 transition-all"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
