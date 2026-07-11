"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Heart, Camera, Calendar, Award } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/ScrollReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const featuredWorks = [
    {
      title: 'Golden Union',
      category: 'Wedding',
      image: '/images/wedding2.jpg',
      description: 'Vows shared as the sky melted into hues of amber and rose.'
    },
    {
      title: 'Melody in Motion',
      category: 'Portrait',
      image: '/images/portrait1.jpg',
      description: 'Soft forest light and graceful violin melodies in perfect harmony.'
    },
    {
      title: 'Golden Meadow',
      category: 'Portrait',
      image: '/images/portrait2.jpg',
      description: 'Radiant light, flowing colors, and a carefree moment among the tall grass.'
    }
  ];

  const testimonials = [
    {
      quote: "Working with Tharu was an absolute dream. They have a rare ability to find quiet, raw moments of intimacy amidst the noise of the day. The images feel less like photos and more like poetry.",
      author: "Eleanor & Marcus",
      location: "December Wedding"
    },
    {
      quote: "Every portrait is a masterpiece. They made me feel completely at ease in front of the lens, capturing an authenticity I haven't seen in any studio work before. Exquisite and highly recommended.",
      author: "Devon R.",
      location: "Editorial Portrait Client"
    }
  ];

  const heroSectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const columnLeftRef = useRef<HTMLDivElement>(null);
  const columnRightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Timeline for Hero entry animations on initial page load
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Heading slides upward while fading in
    tl.fromTo(headingRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.4 }
    );

    // Subtitle fades in after the heading
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 1.2 },
      '-=1.0'
    );

    // CTA button scales from 0.9 to 1 and fades in
    tl.fromTo(ctaRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.0 },
      '-=0.9'
    );

    // Hero Collage image entry staggering with subtle zoom-in
    const heroImages = gsap.utils.toArray('.hero-image-wrapper');
    tl.fromTo(heroImages,
      { opacity: 0, y: 50, scale: 1.12 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 1.4, 
        stagger: 0.15,
        onComplete: () => {
          // Clear transform on completion to allow CSS hover effects to work smoothly
          gsap.set(heroImages.map((wrapper: any) => wrapper.querySelector('img')), { clearProps: "transform,scale" });
        }
      },
      '-=1.2'
    );

    // Scroll-driven subtle parallax for the collage columns
    gsap.to(columnLeftRef.current, {
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    gsap.to(columnRightRef.current, {
      y: 40,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Subtle entrance zoom-in for featured works images
    const featuredImgs = gsap.utils.toArray('.featured-img-container img');
    featuredImgs.forEach((img: any) => {
      gsap.fromTo(img,
        { scale: 1.15 },
        {
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          onComplete: () => {
            gsap.set(img, { clearProps: 'transform,scale' });
          }
        }
      );
    });

  }, { scope: heroSectionRef });

  return (
    <div className="relative overflow-hidden">
      {/* Decorative floating parallax elements in the background */}
      <div className="absolute top-[20%] left-[-10%] w-[35rem] h-[35rem] rounded-full bg-slate-100/50 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-[60%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-amber-50/30 blur-3xl -z-10 pointer-events-none" />

      {/* 1. HERO SECTION: Editorial split or layered screen */}
      <section ref={heroSectionRef} className="relative overflow-hidden bg-white pt-4 pb-12 lg:pt-6 lg:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Text details */}
            <div className="space-y-6 lg:max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                Editorial & Fine-art
              </span>
              <h1 ref={headingRef} className="font-serif text-5xl font-light leading-[1.15] text-primary sm:text-6xl lg:text-7xl">
                Capturing <br/>
                <span className="font-normal italic">pure emotion</span> in quiet elegance.
              </h1>
              <p ref={subtitleRef} className="max-w-xl text-base leading-8 text-muted sm:text-lg">
                Tharu Photography crafts timeless visual narratives that balance natural light, organic texture, and editorial poise for clients who value artistic detail.
              </p>
              <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-slate-800"
                >
                  Explore Work <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-all hover:bg-slate-50"
                >
                  Inquire Now
                </Link>
              </div>
            </div>

            {/* Visual Grid Hero Collage with Parallax columns */}
            <div className="relative grid grid-cols-2 gap-4 lg:gap-6">
              <div ref={columnLeftRef} className="space-y-4 lg:space-y-6 will-change-transform">
                <div className="hero-image-wrapper overflow-hidden rounded-[2rem] bg-slate-100 shadow-xl shadow-slate-100">
                  <img
                    src="/images/portrait3.jpg"
                    alt="Editorial Portrait"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
                <div className="hero-image-wrapper aspect-[3/4] overflow-hidden rounded-[2rem] bg-slate-100 shadow-xl shadow-slate-100">
                  <img
                    src="/images/wedding1.jpg"
                    alt="Wedding details"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
              </div>
              <div ref={columnRightRef} className="space-y-4 pt-8 lg:space-y-6 lg:pt-12 will-change-transform">
                <div className="hero-image-wrapper aspect-[3/4] overflow-hidden rounded-[2rem] bg-slate-100 shadow-xl shadow-slate-100">
                  <img
                    src="/images/birthday2.jpg"
                    alt="Lifestyle portraiture"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
                <div className="hero-image-wrapper overflow-hidden rounded-[2rem] bg-slate-100 shadow-xl shadow-slate-100">
                  <img
                    src="/images/portrait4.jpg"
                    alt="Outdoor couple portrait"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & KEY PILLARS */}
      <ScrollReveal y={40} triggerHook="top 85%">
        <section className="bg-[#faf8f5] py-16 border-t border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h3 className="font-serif text-lg font-medium text-primary">Uncompromising Detail</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  High-fidelity capture using premium medium-format lenses for deep textures and natural tonalities.
                </p>
              </div>
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h3 className="font-serif text-lg font-medium text-primary">Genuine Connection</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Creating an environment of absolute comfort where laughter, quiet glances, and pure feelings emerge organically.
                </p>
              </div>
              <div className="rounded-3xl bg-white p-8 shadow-sm sm:col-span-2 lg:col-span-1">
                <h3 className="font-serif text-lg font-medium text-primary">Editorial Polish</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Tailored styling guides, light coaching, and bespoke curation that elevate every image to magazine standards.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 3. FEATURED WORK SHOWCASE */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal y={30} triggerHook="top 85%">
            <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-100 pb-8 md:flex-row md:items-end">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">A curated edit</span>
                <h2 className="mt-2 font-serif text-3xl font-light text-primary sm:text-4xl">Featured Stories</h2>
              </div>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary hover:text-muted"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger={0.15} triggerHook="top 80%" className="mt-12 grid gap-10 md:grid-cols-3">
            {featuredWorks.map((work, idx) => (
              <article key={idx} className="group relative flex flex-col items-start">
                <div className="featured-img-container aspect-[3/4] w-full overflow-hidden rounded-[2.5rem] bg-slate-100">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-6 space-y-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted">{work.category}</span>
                  <h3 className="font-serif text-xl font-medium text-primary transition hover:text-muted">
                    <Link href="/portfolio">{work.title}</Link>
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{work.description}</p>
                </div>
              </article>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* 4. THE SERVICE EXPERIENCE */}
      <section className="bg-[#faf8f5] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal y={30} triggerHook="top 85%" className="mx-auto max-w-3xl text-center space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Offerings</span>
            <h2 className="font-serif text-3xl font-light text-primary sm:text-4xl">Services Tailored for You</h2>
            <p className="text-base text-muted leading-relaxed">
              Whether documenting a grand wedding elopement, capturing editorial branding portraiture, or preserving family legacies, we bring clean composition and elevated aesthetics.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger={0.15} triggerHook="top 80%" className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="rounded-[2.5rem] bg-white p-10 border border-slate-100 shadow-sm space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Classic</span>
              <h3 className="font-serif text-2xl font-light text-primary">Weddings & Elopements</h3>
              <p className="text-sm leading-relaxed text-muted">
                Visual narratives documenting wedding pre-shoots, ceremony highlights, fine-art couple sessions, and details.
              </p>
              <ul className="space-y-2 text-xs text-muted">
                <li>• Planning & timeline coordination</li>
                <li>• High-resolution digital gallery</li>
                <li>• Bespoke fine-art edit style</li>
              </ul>
              <div className="pt-4">
                <Link href="/contact" className="text-xs font-semibold uppercase tracking-[0.18em] text-primary hover:text-muted inline-flex items-center gap-1">
                  Inquire details <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-[2.5rem] bg-white p-10 border border-slate-100 shadow-sm space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Editorial</span>
              <h3 className="font-serif text-2xl font-light text-primary">Portraits & Branding</h3>
              <p className="text-sm leading-relaxed text-muted">
                Striking individual sessions, fashion editorials, and commercial branding collections that emphasize authentic character.
              </p>
              <ul className="space-y-2 text-xs text-muted">
                <li>• Creative direction & mood board</li>
                <li>• Studio or outdoor lighting setups</li>
                <li>• Professional commercial licensing</li>
              </ul>
              <div className="pt-4">
                <Link href="/contact" className="text-xs font-semibold uppercase tracking-[0.18em] text-primary hover:text-muted inline-flex items-center gap-1">
                  Inquire details <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-[2.5rem] bg-white p-10 border border-slate-100 shadow-sm space-y-6 md:col-span-2 lg:col-span-1">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-rose-600 bg-rose-50 px-3 py-1 rounded-full">Milestones</span>
              <h3 className="font-serif text-2xl font-light text-primary">Events & Birthdays</h3>
              <p className="text-sm leading-relaxed text-muted">
                Candid and elegant coverage of family reunions, anniversaries, corporate launches, and birthday celebrations.
              </p>
              <ul className="space-y-2 text-xs text-muted">
                <li>• Documentary style capturing raw smiles</li>
                <li>• Rapid sneak-peek turnaround</li>
                <li>• Full digital downloads</li>
              </ul>
              <div className="pt-4">
                <Link href="/contact" className="text-xs font-semibold uppercase tracking-[0.18em] text-primary hover:text-muted inline-flex items-center gap-1">
                  Inquire details <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="bg-white py-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal stagger={0.15} triggerHook="top 80%" className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Kind words</span>
              <h2 className="font-serif text-3xl font-light text-primary sm:text-4xl">Client Love</h2>
              <p className="text-sm leading-relaxed text-muted">
                Feedback from clients who trusted us with their core visual memories and editorial portraits.
              </p>
              <div className="flex gap-1.5 pt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              {testimonials.map((test, idx) => (
                <div key={idx} className="rounded-3xl bg-[#faf8f5] p-8 space-y-4">
                  <p className="text-sm italic leading-relaxed text-primary">"{test.quote}"</p>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-primary">{test.author}</p>
                    <p className="text-[11px] text-muted">{test.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. CALL TO ACTION BOOKING INQUIRY */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal y={50} triggerHook="top 85%" className="rounded-[3rem] bg-primary px-8 py-16 text-center text-white shadow-2xl md:px-12 md:py-20">
            <div className="mx-auto max-w-2xl space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-300">Reserve your date</span>
              <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl">
                Ready to create <br className="sm:hidden" />
                <span className="italic font-normal text-slate-200">something beautiful?</span>
              </h2>
              <p className="text-sm leading-relaxed text-slate-300">
                Spaces are limited as we only photograph a select number of weddings and portraits per season to guarantee exceptional artistic quality.
              </p>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary transition hover:bg-slate-100 active:scale-95"
                >
                  Start Booking Inquiry <Calendar className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
