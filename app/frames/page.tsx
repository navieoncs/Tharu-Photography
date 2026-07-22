"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, 
  ArrowRight,
  Maximize2
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/ScrollReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type FrameCategory = 'Compact' | 'Standard' | 'Large';
type SizeFilter = 'All' | FrameCategory;
type UnitMode = 'in' | 'cm';

type FrameSize = {
  label: string;
  width: number;
  height: number;
  note?: string;
  category: FrameCategory;
  bestFor: string;
};

const FRAME_SIZES: FrameSize[] = [
  { label: '4×4', width: 4, height: 4, category: 'Compact', bestFor: 'Mini keepsakes, shelves & gifts' },
  { label: '4×6', width: 4, height: 6, category: 'Compact', bestFor: 'Classic photo prints & desktops' },
  { label: '5×7', width: 5, height: 7, category: 'Compact', bestFor: 'Portraits on side tables' },
  { label: '6×8', width: 6, height: 8, category: 'Compact', bestFor: 'Entryway accents & niches' },
  { label: '8×10', width: 8, height: 10, category: 'Standard', bestFor: 'Most popular wall portraits' },
  { label: '10×12', width: 10, height: 12, category: 'Standard', bestFor: 'Family photos & bedrooms' },
  { label: '10×15', width: 10, height: 15, category: 'Standard', bestFor: 'Vertical lifestyle shots' },
  { label: 'A4', width: 8.27, height: 11.69, note: '210 × 297 mm', category: 'Standard', bestFor: 'Documents & fine prints' },
  { label: '12×15', width: 12, height: 15, category: 'Large', bestFor: 'Living room feature pieces' },
  { label: '12×18', width: 12, height: 18, category: 'Large', bestFor: 'Hallways & tall compositions' },
  { label: 'A3', width: 11.69, height: 16.54, note: '297 × 420 mm', category: 'Large', bestFor: 'Exhibition-style prints' },
  { label: '16×24', width: 16, height: 24, category: 'Large', bestFor: 'Bold gallery walls' },
  { label: '20×30', width: 20, height: 30, category: 'Large', bestFor: 'Statement hero artwork' },
];

const SIZE_FILTERS: SizeFilter[] = ['All', 'Compact', 'Standard', 'Large'];

const CATEGORY_COPY: Record<FrameCategory, string> = {
  Compact: 'Desk & shelf displays',
  Standard: 'Wall portraits & homes',
  Large: 'Statement gallery pieces',
};

const MAX_FRAME_DIM = 30; // inches — largest height for proportional scale

function formatDimensions(size: FrameSize, unit: UnitMode) {
  if (unit === 'cm') {
    const w = (size.width * 2.54).toFixed(1);
    const h = (size.height * 2.54).toFixed(1);
    return `${w} × ${h} cm`;
  }
  if (size.note) return size.note;
  return `${size.width}" × ${size.height}"`;
}

function formatInches(size: FrameSize) {
  if (Number.isInteger(size.width) && Number.isInteger(size.height)) {
    return `${size.width}" × ${size.height}"`;
  }
  return `≈ ${size.width.toFixed(1)}" × ${size.height.toFixed(1)}"`;
}

/** Proportional mini frame preview scaled to the largest size (20×30) */
function FrameSizePreview({
  width,
  height,
  maxBox = 72,
  active = false,
  className = '',
}: {
  width: number;
  height: number;
  maxBox?: number;
  active?: boolean;
  className?: string;
}) {
  const scale = maxBox / MAX_FRAME_DIM;
  const w = Math.max(width * scale, 12);
  const h = Math.max(height * scale, 12);
  const border = Math.max(3, Math.min(8, maxBox / 14));

  return (
    <div className={`flex w-full items-center justify-center ${className}`}>
      <div
        className={`relative bg-[#f4f1ec] transition-all duration-500 ease-out ${
          active ? 'scale-105' : 'group-hover:scale-[1.04]'
        }`}
        style={{
          width: `${w}px`,
          height: `${h}px`,
          border: `${border}px solid ${active ? '#1c1917' : '#3f2a1a'}`,
          boxShadow: active
            ? 'inset 0 0 0 2px #faf8f5, 0 16px 32px -12px rgba(0,0,0,0.45)'
            : 'inset 0 0 0 2px #faf8f5, 0 8px 18px -10px rgba(0,0,0,0.35)',
        }}
        aria-hidden
      >
        <div className="absolute inset-[2px] overflow-hidden bg-gradient-to-br from-slate-100 via-amber-50/50 to-slate-200/80">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.9),transparent_55%)]" />
        </div>
      </div>
    </div>
  );
}

/** Wall mockup — selected frame scaled against max size silhouette */
function WallScalePreview({ size }: { size: FrameSize }) {
  const wallW = 200;
  const wallH = 240;
  const scale = Math.min((wallW - 40) / 20, (wallH - 48) / 30);
  const w = size.width * scale;
  const h = size.height * scale;
  const maxW = 20 * scale;
  const maxH = 30 * scale;

  return (
    <div
      className="relative mx-auto flex items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 w-full max-w-[280px] h-[220px] sm:h-[280px] md:h-[300px]"
      style={{
        background:
          'linear-gradient(160deg, #e8e4dc 0%, #d9d3c8 45%, #cfc8bb 100%)',
      }}
      aria-hidden
    >
      {/* Wall texture lines */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: 'repeating-linear-gradient(90deg, #000 0 1px, transparent 1px 28px)',
      }} />

      {/* Ghost max size (20×30) */}
      <div
        className="absolute border border-dashed border-slate-500/30 rounded-[2px]"
        style={{ width: maxW, height: maxH }}
        title="20×30 reference"
      />

      {/* Active frame */}
      <div
        className="relative z-10 transition-all duration-500 ease-out"
        style={{
          width: w,
          height: h,
          border: '7px solid #2c1810',
          boxShadow: 'inset 0 0 0 3px #f7f4ef, 0 18px 40px -12px rgba(0,0,0,0.5)',
          background: '#f0ebe3',
        }}
      >
        <div className="absolute inset-[4px] bg-gradient-to-br from-[#f8f6f2] via-[#e7e2d8] to-[#d6d0c4]" />
        <div className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-[70%] rounded-full bg-slate-600/40 shadow-sm" />
      </div>

      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/45 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
        vs 20×30 max
      </span>
    </div>
  );
}

export default function FramesPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>('All');
  const [selectedSizeLabel, setSelectedSizeLabel] = useState('8×10');
  const [hoveredSizeLabel, setHoveredSizeLabel] = useState<string | null>(null);
  const [unitMode, setUnitMode] = useState<UnitMode>('in');
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  const filteredSizes =
    sizeFilter === 'All'
      ? FRAME_SIZES
      : FRAME_SIZES.filter((s) => s.category === sizeFilter);

  const selectedSize =
    FRAME_SIZES.find((s) => s.label === selectedSizeLabel) ?? FRAME_SIZES[4];

  const previewSize =
    FRAME_SIZES.find((s) => s.label === (hoveredSizeLabel ?? selectedSizeLabel)) ??
    selectedSize;

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
    { q: "What frame sizes are available?", a: "We offer 4×4, 4×6, 5×7, 6×8, 8×10, 10×12, 10×15, 12×15, 12×18, 16×24, 20×30, plus A4 and A3. Need something else? Custom sizes are available on request." },
    { q: "Do you offer delivery or hanging installation?", a: "Yes. We offer fully insured local delivery in Sri Lanka. For premium heavy frames, our team can coordinate standard wall-mounting installation instructions or perform setup upon delivery." },
    { q: "Can I customize frame colors or choose double mat-boards?", a: "Yes, custom configuration is at the core of what we do. During our consultation, we will review various wood stain tones, double-mat setups, spacer choices, and floating mounts to match your room aesthetics." }
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
      // Animate in without leaving a CSS scale class that re-expands after clearProps
      tl.fromTo(
        photoRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          clearProps: 'transform',
        },
        '-=1.2'
      );
    }
  }, { scope: heroRef });

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
      <section ref={heroRef} className="relative overflow-hidden pt-4 pb-12 sm:pb-16 lg:pt-6 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            
            {/* Hero Text */}
            <div className="space-y-5 sm:space-y-6 lg:max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted sm:text-xs sm:tracking-[0.3em]">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                Artisanal Craftsmanship
              </span>
              <h1 ref={headingRef} className="font-serif text-4xl font-light leading-[1.12] text-primary sm:text-5xl md:text-6xl lg:text-7xl opacity-0 translate-y-[60px]">
                Preserve Your <br/>
                <span className="font-normal italic">Memories</span>.<br/>
                Frame Them Beautifully.
              </h1>
              <p ref={subheadingRef} className="max-w-xl text-sm leading-7 text-muted sm:text-base sm:leading-8 md:text-lg opacity-0 translate-y-[25px]">
                Transform your favorite photographs into timeless pieces of art with handcrafted premium frames made to complement every space.
              </p>
              <div ref={buttonsRef} className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4 opacity-0 scale-90">
                <a
                  href="#collections"
                  onClick={scrollToCollections}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all hover:bg-slate-800 sm:px-7 sm:text-xs sm:tracking-[0.2em]"
                >
                  Explore Frames <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary transition-all hover:bg-slate-50 sm:px-7 sm:text-xs sm:tracking-[0.2em]"
                >
                  Request a Quote
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div ref={photoRef} className="relative w-full max-w-full opacity-0">
              <div className="relative w-full overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem] shadow-2xl aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]">
                <img
                  src="/images/Frame.jpeg"
                  alt="Beautifully framed photograph showcase"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FRAME SIZES — interactive guide */}
      <section id="sizes" className="border-t border-b border-slate-100 bg-[#faf8f5] py-12 sm:py-16 lg:py-20 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal y={30} className="text-center space-y-4 mb-8 sm:mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Available Sizes</span>
            <h2 className="font-serif text-2xl font-light text-primary sm:text-3xl md:text-4xl">
              Frame Size Guide
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted">
              Tap any size to preview it on the wall. Switch units and filter by category to find the right fit.
            </p>
          </ScrollReveal>

          {/* Controls: category filter + unit toggle */}
          <ScrollReveal y={20} className="mb-8 sm:mb-10 flex flex-col items-stretch sm:items-center gap-4 lg:flex-row lg:justify-between">
            <div
              className="flex flex-wrap items-center justify-center gap-2"
              role="tablist"
              aria-label="Filter frame sizes by category"
            >
              {SIZE_FILTERS.map((filter) => {
                const isActive = sizeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSizeFilter(filter)}
                    className={`rounded-full px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 sm:px-4 sm:text-[11px] sm:tracking-[0.16em] ${
                      isActive
                        ? 'bg-primary text-white shadow-md shadow-slate-300/50'
                        : 'bg-white text-muted border border-slate-200 hover:border-slate-300 hover:text-primary'
                    }`}
                  >
                    {filter}
                    <span className={`ml-1.5 tabular-nums ${isActive ? 'text-white/70' : 'text-slate-400'}`}>
                      {filter === 'All'
                        ? FRAME_SIZES.length
                        : FRAME_SIZES.filter((s) => s.category === filter).length}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              className="inline-flex self-center items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm"
              role="group"
              aria-label="Dimension units"
            >
              {(['in', 'cm'] as UnitMode[]).map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => setUnitMode(unit)}
                  className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 sm:px-4 sm:text-[11px] sm:tracking-[0.16em] ${
                    unitMode === unit
                      ? 'bg-amber-700/90 text-white shadow-sm'
                      : 'text-muted hover:text-primary'
                  }`}
                >
                  {unit === 'in' ? 'Inches' : 'cm'}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_minmax(280px,340px)] lg:items-start">
            {/* Size cards grid */}
            <div
              className="order-2 lg:order-1 grid gap-2.5 sm:gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
              role="listbox"
              aria-label="Frame sizes"
              aria-activedescendant={`size-${selectedSize.label}`}
            >
              {filteredSizes.map((size) => {
                const isSelected = selectedSizeLabel === size.label;
                const isHovered = hoveredSizeLabel === size.label;

                return (
                  <button
                    key={size.label}
                    type="button"
                    id={`size-${size.label}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => setSelectedSizeLabel(size.label)}
                    onMouseEnter={() => setHoveredSizeLabel(size.label)}
                    onMouseLeave={() => setHoveredSizeLabel(null)}
                    onFocus={() => setHoveredSizeLabel(size.label)}
                    onBlur={() => setHoveredSizeLabel(null)}
                    className={`group relative flex flex-col rounded-2xl sm:rounded-3xl p-3 sm:p-4 text-left border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5] ${
                      isSelected
                        ? 'bg-white border-primary/30 shadow-lg shadow-slate-200/80 ring-1 ring-primary/15 scale-[1.02] z-10'
                        : isHovered
                          ? 'bg-white border-amber-200/80 shadow-md shadow-slate-100 -translate-y-0.5'
                          : 'bg-white/80 border-slate-100/80 shadow-sm hover:border-slate-200 hover:shadow-md'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute right-2 top-2 sm:right-3 sm:top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                        ✓
                      </span>
                    )}

                    <FrameSizePreview
                      width={size.width}
                      height={size.height}
                      maxBox={isSelected || isHovered ? 72 : 60}
                      active={isSelected}
                      className="min-h-[4.5rem] sm:min-h-[5.5rem]"
                    />

                    <div className="mt-2 sm:mt-3 space-y-0.5 sm:space-y-1 border-t border-slate-100 pt-2 sm:pt-3">
                      <p className="font-serif text-lg sm:text-xl font-medium tracking-tight text-primary">
                        {size.label}
                      </p>
                      <p className="text-[10px] sm:text-[11px] font-medium tabular-nums tracking-wide text-muted">
                        {formatDimensions(size, unitMode)}
                      </p>
                      <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-slate-400">
                        {size.category}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Live detail panel — first on mobile */}
            <aside className="order-1 lg:order-2 lg:sticky lg:top-28">
              <div className="rounded-[1.75rem] sm:rounded-[2rem] border border-slate-100 bg-white p-4 sm:p-6 shadow-lg shadow-slate-100/80 space-y-4 sm:space-y-5 transition-all duration-300">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
                      Live preview
                    </p>
                    <h3
                      key={previewSize.label}
                      className="mt-1 font-serif text-2xl sm:text-3xl font-medium tracking-tight text-primary transition-all duration-300"
                    >
                      {previewSize.label}
                    </h3>
                  </div>
                  <span className="shrink-0 rounded-full bg-amber-50 border border-amber-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-800">
                    {previewSize.category}
                  </span>
                </div>

                <WallScalePreview size={previewSize} />

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="rounded-2xl bg-[#faf8f5] border border-slate-100 p-3 sm:p-3.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                      Dimensions
                    </p>
                    <p className="mt-1 text-sm font-medium text-primary tabular-nums">
                      {formatDimensions(previewSize, unitMode)}
                    </p>
                    {unitMode === 'cm' || previewSize.note ? (
                      <p className="mt-0.5 text-[10px] text-slate-400 tabular-nums">
                        {formatInches(previewSize)}
                      </p>
                    ) : (
                      <p className="mt-0.5 text-[10px] text-slate-400 tabular-nums">
                        {(previewSize.width * 2.54).toFixed(1)} × {(previewSize.height * 2.54).toFixed(1)} cm
                      </p>
                    )}
                  </div>
                  <div className="rounded-2xl bg-[#faf8f5] border border-slate-100 p-3 sm:p-3.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                      Print area
                    </p>
                    <p className="mt-1 text-sm font-medium text-primary tabular-nums">
                      {unitMode === 'cm'
                        ? `${(previewSize.width * previewSize.height * 6.4516).toFixed(0)} cm²`
                        : `${(previewSize.width * previewSize.height).toFixed(0)} in²`}
                    </p>
                    <p className="mt-0.5 text-[10px] text-slate-400">
                      {previewSize.width >= previewSize.height ? 'Landscape / square' : 'Portrait orientation'}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-amber-50/50 to-white p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Best for
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-primary">
                    {previewSize.bestFor}
                  </p>
                  <p className="mt-2 text-[11px] text-muted">
                    {CATEGORY_COPY[previewSize.category]}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                    <span>Relative size</span>
                    <span className="tabular-nums text-slate-400">
                      {Math.round((previewSize.width * previewSize.height) / (20 * 30) * 100)}% of 20×30
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-800 transition-all duration-500 ease-out"
                      style={{
                        width: `${Math.max(6, (previewSize.width * previewSize.height) / (20 * 30) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 pt-1">
                  <Link
                    href={`/contact?size=${encodeURIComponent(selectedSize.label)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all hover:bg-slate-800"
                  >
                    Quote {selectedSize.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <p className="text-center text-[10px] text-muted">
                    Selected for quote: <span className="font-semibold text-primary">{selectedSize.label}</span>
                    {hoveredSizeLabel && hoveredSizeLabel !== selectedSizeLabel && (
                      <span className="text-slate-400"> · previewing {hoveredSizeLabel}</span>
                    )}
                  </p>
                </div>
              </div>
            </aside>
          </div>

          <ScrollReveal y={25} className="mt-12 text-center">
            <p className="text-xs text-muted">
              Need a custom size?{' '}
              <Link href="/contact" className="font-semibold text-primary underline-offset-4 hover:underline">
                Request a quote
              </Link>{' '}
              and we&apos;ll craft it to fit your wall.
            </p>
          </ScrollReveal>

        </div>
      </section>

      {/* 3. FRAME COLLECTIONS */}
      <section id="collections" className="py-12 sm:py-16 lg:py-20 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal y={30} className="text-center space-y-4 mb-10 sm:mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Custom Finishes</span>
            <h2 className="font-serif text-2xl font-light text-primary sm:text-3xl md:text-4xl">
              Explore Our Collections
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted">
              Choose from classic woods, minimalist metal frames, gold-leaf finishes, or weightless floating glass.
            </p>
          </ScrollReveal>

          {/* Pinterest-style Collection Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { img: '/images/GEM (1).png', name: 'Classic Wood Frame' },
              { img: '/images/GEM (2).png', name: 'Modern Black Frame' },
              { img: '/images/GEM (3).png', name: 'Minimal White Frame' },
              { img: '/images/GEM (4).png', name: 'Luxury Gold Frame' },
              { img: '/images/GEM (5).png', name: 'Rustic Finish Frame' },
              { img: '/images/GEM (6).png', name: 'Floating Glass Frame' },
            ].map((item, idx) => (
              <ScrollReveal
                key={idx}
                y={35}
                delay={idx * 0.08}
                className="group relative overflow-hidden rounded-3xl cursor-pointer"
              >
                {/* Card */}
                <div className="relative overflow-hidden rounded-3xl shadow-md hover:shadow-2xl hover:shadow-slate-200/70 transition-all duration-500 bg-[#faf8f5] border border-slate-100">
                  {/* Image */}
                  <div className="w-full aspect-[3/4] overflow-hidden bg-slate-100">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* 4. FEATURED GALLERY */}
      <section className="border-t border-slate-100 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
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

      {/* 5. FAQ ACCORDION */}
      <section className="border-t border-b border-slate-100 bg-[#faf8f5] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal y={30} className="text-center space-y-4 mb-10 sm:mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Common Questions</span>
            <h2 className="font-serif text-2xl font-light text-primary sm:text-3xl md:text-4xl">
              Framing FAQs
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted">
              Find answers to production lead times, shipping details, print materials, and customization possibilities.
            </p>
          </ScrollReveal>

          <ScrollReveal y={40} className="space-y-3 sm:space-y-4">
            {FAQs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index}
                  className="rounded-2xl border border-slate-200/60 bg-white shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="flex w-full items-start sm:items-center justify-between gap-3 p-4 sm:p-5 text-left transition hover:bg-[#faf8f5]"
                  >
                    <span className="text-xs font-semibold tracking-wide text-primary pr-2">{faq.q}</span>
                    <ChevronDown 
                      className={`h-4 w-4 shrink-0 text-muted transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} 
                    />
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-[28rem] border-t border-slate-100 p-4 sm:p-5 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
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

      {/* 6. CALL TO ACTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] bg-primary px-5 py-14 text-center shadow-2xl sm:px-12 sm:py-20 md:py-24">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-overlay grayscale -z-10" style={{ backgroundImage: "url('/images/wedding1.jpg')" }} />
          <div className="absolute top-[10%] left-[-10%] w-[30rem] h-[30rem] rounded-full bg-white/5 blur-3xl -z-10 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-5 sm:space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Transform Your Walls</span>
            <h2 className="font-serif text-2xl font-light leading-tight text-white sm:text-4xl md:text-5xl">
              Turn Your Favorite Moments <br className="hidden sm:block"/>
              Into Timeless Artwork
            </h2>
            <p className="text-xs leading-relaxed text-slate-300 max-w-lg mx-auto">
              Our master framing team will craft the perfect custom layout for your physical display. Get in touch to schedule a design consultation today.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary transition-all hover:bg-slate-100 sm:px-7 sm:text-xs sm:tracking-[0.2em]"
              >
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white hover:bg-white/10 transition-all sm:px-7 sm:text-xs sm:tracking-[0.2em]"
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
