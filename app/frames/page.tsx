"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Sparkles, 
  Award, 
  CheckCircle, 
  ChevronDown, 
  Layers, 
  Heart, 
  Camera, 
  GraduationCap, 
  Home, 
  Gift, 
  Briefcase, 
  ArrowRight,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxWrapper from '@/components/ParallaxWrapper';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FrameStyle {
  id: string;
  name: string;
  description: string;
  image: string;
  frameClass: string;
  innerBorderClass: string;
}

export default function FramesPage() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  
  const frameStyles: FrameStyle[] = [
    {
      id: 'classic-wood',
      name: 'Classic Wood',
      description: 'Warm oak and rich walnut hand-stained finishes that ground portraiture and wedding memories in organic warmth.',
      image: '/images/wedding1.jpg',
      frameClass: 'border-[16px] border-[#653b1b] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45)]',
      innerBorderClass: 'border-4 border-[#fbfaf8] outline outline-1 outline-black/10'
    },
    {
      id: 'modern-black',
      name: 'Modern Black',
      description: 'Sleek, matte black aluminum with sharp profile lines. Perfect for high-contrast monochrome and architecture prints.',
      image: '/images/portrait3.jpg',
      frameClass: 'border-[16px] border-[#18181b] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]',
      innerBorderClass: 'border-4 border-[#fafafa] outline outline-1 outline-black/5'
    },
    {
      id: 'minimal-white',
      name: 'Minimal White',
      description: 'Stark gallery white wooden profile. Highlights organic textures, clean space, and fine-art landscapes.',
      image: '/images/portrait4.jpg',
      frameClass: 'border-[16px] border-[#f4f4f5] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]',
      innerBorderClass: 'border-4 border-white outline outline-1 outline-slate-200'
    },
    {
      id: 'luxury-gold',
      name: 'Luxury Gold',
      description: 'Hand-gilded gold leaf frames boasting subtle metallic brush details. Adds a touch of classical majesty.',
      image: '/images/wedding2.jpg',
      frameClass: 'border-[16px] border-[#d9ad26] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]',
      innerBorderClass: 'border-4 border-[#fffdf9] outline outline-1 outline-[#d9ad26]/30'
    },
    {
      id: 'rustic-finish',
      name: 'Rustic Finish',
      description: 'Weathered barn-wood profiles with rich grain textures. Fits candid lifestyle photography and scenic outdoor shoots.',
      image: '/images/birthday2.jpg',
      frameClass: 'border-[16px] border-[#8a7261] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)]',
      innerBorderClass: 'border-4 border-[#fcfbf9] outline outline-1 outline-stone-300'
    },
    {
      id: 'floating-glass',
      name: 'Floating Glass',
      description: 'Two layers of premium archival acrylic glass suspending the print. Creates an illusion of floating weightlessly.',
      image: '/images/portrait6.jpg',
      frameClass: 'bg-white/10 backdrop-blur-sm p-8 border border-white/30 rounded-lg shadow-2xl',
      innerBorderClass: 'border border-slate-300/40 shadow-inner'
    }
  ];

  const features = [
    {
      icon: <Shield className="h-6 w-6 text-slate-700" />,
      title: "Premium Materials",
      description: "Sourced FSC-certified hardwoods, solid metals, and anti-reflective museum-grade acrylic glass for true clarity."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-amber-600" />,
      title: "Museum-Quality Printing",
      description: "Fine-art giclée prints using 12-color archival pigment inks on 100% cotton-rag papers that resist fading for 100+ years."
    },
    {
      icon: <Award className="h-6 w-6 text-slate-800" />,
      title: "Made to Last",
      description: "Individually handcrafted by master framing artisans with dust seals, acid-free backing boards, and archival mounts."
    }
  ];

  const perfectFor = [
    { icon: <Heart className="h-5 w-5 text-rose-500" />, name: "Wedding Photos" },
    { icon: <Camera className="h-5 w-5 text-indigo-500" />, name: "Family Portraits" },
    { icon: <GraduationCap className="h-5 w-5 text-amber-500" />, name: "Graduation" },
    { icon: <Layers className="h-5 w-5 text-emerald-500" />, name: "Landscape Photography" },
    { icon: <Briefcase className="h-5 w-5 text-slate-500" />, name: "Corporate Offices" },
    { icon: <Home className="h-5 w-5 text-amber-700" />, name: "Home Decor" },
    { icon: <Gift className="h-5 w-5 text-purple-500" />, name: "Special Gifts" }
  ];

  const timelineSteps = [
    { num: "01", name: "Choose Your Photo", desc: "Select a digital file from your session with us or upload your custom favorite image." },
    { num: "02", name: "Select Your Frame", desc: "Consult on material finishes, dimensions, and custom mat-board options." },
    { num: "03", name: "Printing & Framing", desc: "We handle the color-calibration print on heavy fine-art paper and assemble the frame." },
    { num: "04", name: "Quality Inspection", desc: "Each frame is polished, dust-sealed, and strictly inspected for structural integrity." },
    { num: "05", name: "Pickup or Delivery", desc: "Your completed piece is carefully packaged and shipped to your door or ready for pickup." }
  ];

  const galleryImages = [
    { title: "Framed Fine Art Landscape", img: "/images/event1.jpg" },
    { title: "Wall Showcase Mockup", img: "/images/portrait1.jpg" },
    { title: "Premium Gilded Portrait", img: "/images/wedding1.jpg" },
    { title: "Living Room Concept", img: "/images/portrait2.jpg" },
    { title: "Gallery Exhibition Layout", img: "/images/portrait8.jpg" },
    { title: "Classic Dark Wood Finish", img: "/images/birthday3.jpg" }
  ];

  const FAQs = [
    { q: "How long does custom framing take?", a: "Every frame is handcrafted individually. Typically, standard framing takes 7 to 10 business days from the date of image selection. If rush ordering is requested, we can complete it in 3 to 4 days for an additional fee." },
    { q: "Can I frame photos not taken by you?", a: "Yes, absolutely! While we primarily frame photographs taken during our portrait sessions, we are fully equipped to color-correct, print, and custom-frame any high-resolution digital photograph you provide." },
    { q: "What frame sizes are available?", a: "We support a wide array of options ranging from tabletop 8x10 prints all the way to statement 40x60 gallery prints. Custom bespoke sizing is also completely supported to suit your specific wall requirements." },
    { q: "Do you offer delivery or hanging installation?", a: "Yes. We offer fully insured local delivery in Sri Lanka. For premium heavy frames, our team can coordinate standard wall-mounting installation instructions or perform setup upon delivery." },
    { q: "Can I customize frame colors or choose double mat-boards?", a: "Yes, custom configuration is at the core of what we do. During our consultation, we will review various wood stain tones, double-mat setups, spacer choices, and floating mounts to match your room aesthetics." }
  ];

  const testimonials = [
    { name: "Eleanor Vance", role: "Art Curator", quote: "The archival print quality matched with the precision of their walnut frames is remarkable. They transformed our wedding portraits into museum-grade statement pieces." },
    { name: "Marcus Senadheera", role: "Homeowner", quote: "I wanted a floating glass style for a black-and-white landscape shot. Tharu's team advised on spacing, and the final piece looks stunning on my concrete dining wall." },
    { name: "Devika & Ruwan", role: "Clients", quote: "Absolute perfection. The craftsmanship is flawless, the frame feels solid, and the anti-glare acrylic allows the fine textures in our wedding gallery to emerge clearly." }
  ];

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(headingRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.4 }
    );

    tl.fromTo(subheadingRef.current,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 1.2 },
      '-=1.0'
    );

    if (buttonsRef.current) {
      tl.fromTo(buttonsRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.0 },
        '-=0.9'
      );
    }

    if (photoRef.current) {
      tl.fromTo(photoRef.current,
        { opacity: 0, y: 50, scale: 1.12 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 1.4,
          onComplete: () => {
            gsap.set(photoRef.current, { clearProps: "transform,scale" });
          }
        },
        '-=1.2'
      );
    }
  }, { scope: heroRef });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, x)));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!sliderRef.current || !e.touches[0]) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, x)));
  };

  const scrollToCollections = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('collections');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-[10%] left-[-15%] w-[45rem] h-[45rem] rounded-full bg-slate-50 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-[40%] right-[-15%] w-[50rem] h-[50rem] rounded-full bg-amber-50/20 blur-3xl -z-10 pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative overflow-hidden pt-4 pb-16 lg:pt-6 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            
            {/* Hero Text */}
            <div className="space-y-6 lg:max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                Artisanal Craftsmanship
              </span>
              <h1 ref={headingRef} className="font-serif text-5xl font-light leading-[1.12] text-primary sm:text-6xl lg:text-7xl opacity-0 translate-y-[60px]">
                Preserve Your <br/>
                <span className="font-normal italic">Memories</span>.<br/>
                Frame Them Beautifully.
              </h1>
              <p ref={subheadingRef} className="max-w-xl text-base leading-8 text-muted sm:text-lg opacity-0 translate-y-[25px]">
                Transform your favorite photographs into timeless pieces of art with handcrafted premium frames made to complement every space.
              </p>
              <div ref={buttonsRef} className="flex flex-wrap items-center gap-4 pt-4 opacity-0 scale-90">
                <a
                  href="#collections"
                  onClick={scrollToCollections}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-slate-800"
                >
                  Explore Frames <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-all hover:bg-slate-50"
                >
                  Request a Quote
                </Link>
              </div>
            </div>

            {/* Hero Image Wall Collage */}
            <div ref={photoRef} className="relative opacity-0 translate-y-[50px] scale-[1.12]">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-2xl">
                <ParallaxWrapper speed={5} className="h-full w-full">
                  {/* Outer Frame Mockup built inside container */}
                  <div className="h-full w-full bg-[#eeeae3] p-12 flex items-center justify-center">
                    <div className="border-[18px] border-[#221e1d] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] p-6 bg-white w-[82%] aspect-[4/5] flex items-center justify-center">
                      <div className="w-full h-full overflow-hidden relative group">
                        <img
                          src="/images/wedding1.jpg"
                          alt="Beautifully framed photograph showcase"
                          className="h-full w-full object-cover transition-transform duration-750 group-hover:scale-[1.03]"
                        />
                      </div>
                    </div>
                  </div>
                </ParallaxWrapper>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. WHY FRAME YOUR PHOTOS? */}
      <section className="border-t border-b border-slate-100 bg-[#faf8f5] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <ScrollReveal y={30} className="text-center space-y-4 mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Why Frame?</span>
            <h2 className="font-serif text-3xl font-light text-primary sm:text-4xl">
              Elevate Your Photography
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted">
              We focus on premium materials, color accuracy, and meticulous structural seals so your memories stay vibrant forever.
            </p>
          </ScrollReveal>

          <ScrollReveal y={45} stagger={0.18} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feat, i) => (
              <div key={i} className="rounded-3xl bg-white p-8 border border-slate-100/50 shadow-sm transition-all duration-300 hover:shadow-md space-y-4">
                <div className="rounded-2xl bg-amber-50/70 p-3.5 w-max">
                  {feat.icon}
                </div>
                <h3 className="font-serif text-xl font-medium text-primary">{feat.title}</h3>
                <p className="text-xs leading-relaxed text-muted">{feat.description}</p>
              </div>
            ))}
          </ScrollReveal>

        </div>
      </section>

      {/* 3. FRAME COLLECTIONS */}
      <section id="collections" className="py-20 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <ScrollReveal y={30} className="text-center space-y-4 mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Custom Finishes</span>
            <h2 className="font-serif text-3xl font-light text-primary sm:text-4xl">
              Explore Our Collections
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted">
              Choose from classic woods, minimalist metal frames, gold-leaf finishes, or weightless floating glass.
            </p>
          </ScrollReveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {frameStyles.map((item, idx) => (
              <ScrollReveal y={40} delay={idx * 0.1} key={item.id} className="group flex flex-col h-full rounded-[2.5rem] bg-[#faf8f5] border border-slate-100 p-6 transition-all duration-500 hover:shadow-xl hover:shadow-slate-100/60">
                {/* Visual Mockup Area */}
                <div className="aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-[#f0ede6] p-8 flex items-center justify-center mb-6">
                  {/* Framed Graphic */}
                  <div className={`w-[85%] aspect-[3/4] p-4 bg-white flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02] ${item.frameClass}`}>
                    <div className={`w-full h-full overflow-hidden ${item.innerBorderClass}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-750 group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                </div>

                {/* Info details */}
                <div className="flex flex-col flex-grow space-y-3 px-2">
                  <h3 className="font-serif text-xl font-medium text-primary">{item.name}</h3>
                  <p className="text-xs leading-relaxed text-muted flex-grow">{item.description}</p>
                  
                  <div className="pt-4 border-t border-slate-200/50">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary hover:text-muted"
                    >
                      Inquire Custom Build <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* 4. BEFORE & AFTER SHOWCASE */}
      <section className="border-t border-b border-slate-100 bg-[#faf8f5] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <ScrollReveal y={30} className="text-center space-y-4 mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">The Transformation</span>
            <h2 className="font-serif text-3xl font-light text-primary sm:text-4xl">
              Professional Framing Effect
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted">
              Slide back and forth to see how a professional print and custom mat-bordered classic wood frame completely elevates a raw digital photograph.
            </p>
          </ScrollReveal>

          {/* Interactive Comparison Slider */}
          <ScrollReveal y={40} className="flex justify-center">
            <div 
              ref={sliderRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-[2.5rem] bg-slate-200 select-none shadow-2xl cursor-ew-resize border border-slate-200/50"
            >
              {/* ORIGINAL UNFRAMED IMAGE (LEFT SIDE) */}
              <div className="absolute inset-0 h-full w-full">
                <img
                  src="/images/wedding2.jpg"
                  alt="Original photograph"
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                <div className="absolute left-6 top-6 rounded-full bg-black/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-md">
                  Original Photograph
                </div>
              </div>

              {/* FRAMED IMAGE (RIGHT SIDE - CLIPPED) */}
              <div 
                className="absolute inset-0 h-full overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                {/* Styled Room Mockup Backdrop */}
                <div className="absolute inset-0 h-full w-[100vw] max-w-4xl bg-[#dfdad1] p-12 sm:p-20 flex items-center justify-center">
                  <div className="border-[20px] border-[#382212] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.65)] p-8 bg-white max-h-[85%] aspect-[4/5] flex items-center justify-center">
                    <div className="w-full h-full overflow-hidden border-2 border-white outline outline-1 outline-slate-200">
                      <img
                        src="/images/wedding2.jpg"
                        alt="Framed display mockup"
                        className="h-full w-full object-cover"
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute right-6 top-6 rounded-full bg-amber-600/90 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-md">
                  Custom Framed Display
                </div>
              </div>

              {/* SLIDER LINE & BUTTON */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-md"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-primary text-white shadow-xl hover:bg-slate-800 transition-colors">
                  <div className="flex gap-1 items-center justify-center">
                    <span className="text-xs">&lt;</span>
                    <span className="text-xs">&gt;</span>
                  </div>
                </div>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* 5. PERFECT FOR */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <ScrollReveal y={30} className="text-center space-y-4 mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Versatile Displays</span>
            <h2 className="font-serif text-3xl font-light text-primary sm:text-4xl">
              Perfect For Every Space
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted">
              Whether you are showcasing family memories or mounting gallery exhibits, custom framing protects and refines the story.
            </p>
          </ScrollReveal>

          <ScrollReveal y={35} stagger={0.12} className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
            {perfectFor.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 rounded-full bg-[#faf8f5] px-6 py-3 border border-slate-100 text-sm font-medium text-primary hover:border-slate-300 transition-colors">
                {item.icon}
                <span>{item.name}</span>
              </div>
            ))}
          </ScrollReveal>

        </div>
      </section>

      {/* 6. FRAMING PROCESS */}
      <section className="border-t border-b border-slate-100 bg-[#faf8f5] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <ScrollReveal y={30} className="text-center space-y-4 mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">The Journey</span>
            <h2 className="font-serif text-3xl font-light text-primary sm:text-4xl">
              Our Framing Process
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted">
              Five simple phases to convert raw captures into elegant ready-to-mount physical masterpieces.
            </p>
          </ScrollReveal>

          {/* Timeline Wrapper */}
          <div className="relative mt-12">
            {/* Background connecting line (visible on large screen) */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 hidden lg:block" />

            <ScrollReveal y={40} stagger={0.15} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="relative bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between space-y-4 z-10 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-serif text-slate-200 font-bold tracking-wider">{step.num}</span>
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-base font-semibold text-primary">{step.name}</h3>
                    <p className="text-[11px] leading-relaxed text-muted">{step.desc}</p>
                  </div>
                </div>
              ))}
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* 7. FEATURED GALLERY */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <ScrollReveal y={30} className="text-center space-y-4 mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Wall Inspirations</span>
            <h2 className="font-serif text-3xl font-light text-primary sm:text-4xl">
              Featured Custom Work
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted">
              A collection of finished customer pieces hung in contemporary rooms, showing diverse framing combinations.
            </p>
          </ScrollReveal>

          {/* Masonry-style Grid */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {galleryImages.map((item, idx) => (
              <ScrollReveal y={40} delay={idx * 0.1} key={idx} className="group relative overflow-hidden rounded-[2rem] bg-slate-50 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all duration-500">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-750 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">Custom Framed Setup</span>
                  <h3 className="mt-1 font-serif text-base font-medium text-white">{item.title}</h3>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                    <span>View Concept Details</span>
                    <Maximize2 className="h-3.5 w-3.5" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="border-t border-b border-slate-100 bg-[#faf8f5] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <ScrollReveal y={30} className="text-center space-y-4 mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Client Reviews</span>
            <h2 className="font-serif text-3xl font-light text-primary sm:text-4xl">
              Flawless Framing Experience
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted">
              Read how our clients rate the craft quality, protective shipping, and overall interior look of their pieces.
            </p>
          </ScrollReveal>

          <ScrollReveal y={40} stagger={0.15} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((test, i) => (
              <div key={i} className="flex flex-col justify-between rounded-3xl bg-white p-8 border border-slate-100/50 shadow-sm relative">
                <span className="text-5xl font-serif text-slate-100 absolute right-6 top-4 select-none">“</span>
                <p className="text-xs italic leading-relaxed text-muted relative z-10">"{test.quote}"</p>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-primary">{test.name}</h4>
                    <p className="text-[10px] text-muted">{test.role}</p>
                  </div>
                  <div className="flex gap-0.5 text-amber-500">
                    {"★★★★★".split("").map((star, idx) => <span key={idx}>{star}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </ScrollReveal>

        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          
          <ScrollReveal y={30} className="text-center space-y-4 mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Common Questions</span>
            <h2 className="font-serif text-3xl font-light text-primary sm:text-4xl">
              Framing FAQs
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted">
              Find answers to production lead times, shipping details, print materials, and customization possibilities.
            </p>
          </ScrollReveal>

          <ScrollReveal y={40} className="space-y-4">
            {FAQs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index}
                  className="rounded-2xl border border-slate-200/60 bg-white shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between p-5 text-left transition hover:bg-[#faf8f5]"
                  >
                    <span className="text-xs font-semibold tracking-wide text-primary">{faq.q}</span>
                    <ChevronDown 
                      className={`h-4 w-4 text-muted transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} 
                    />
                  </button>
                  
                  {/* Smooth open drawer wrapper */}
                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-[200px] border-t border-slate-100 p-5 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                  >
                    <p className="text-xs leading-relaxed text-muted">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </ScrollReveal>

        </div>
      </section>

      {/* 10. CALL TO ACTION */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 px-6 py-20 text-center shadow-2xl sm:px-12 md:py-24">
          {/* Dark Background Overlay Image */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 mix-blend-overlay -z-10" style={{ backgroundImage: "url('/images/wedding1.jpg')" }} />
          {/* Parallax dark element */}
          <div className="absolute top-[10%] left-[-10%] w-[30rem] h-[30rem] rounded-full bg-slate-800/60 blur-3xl -z-10 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">Transform Your Walls</span>
            <h2 className="font-serif text-3xl font-light leading-tight text-white sm:text-4xl md:text-5xl">
              Turn Your Favorite Moments <br/>
              Into Timeless Artwork
            </h2>
            <p className="text-xs leading-relaxed text-slate-300 max-w-lg mx-auto">
              Our master framing team will craft the perfect custom layout for your physical display. Get in touch to schedule a design consultation today.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-all hover:bg-slate-50"
              >
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-white/10 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
