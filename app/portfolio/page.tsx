"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/ScrollReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Photo {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const photos: Photo[] = [
  {
    id: 1,
    title: 'First Year Joy',
    category: 'Birthday',
    image: '/images/birthday1.jpg',
    description: 'Celebrating a beautiful milestone with family.'
  },
  {
    id: 2,
    title: 'Golden Celebration',
    category: 'Birthday',
    image: '/images/birthday2.jpg',
    description: 'A magnificent evening for a 50th birthday gala.'
  },
  {
    id: 3,
    title: 'Surprise Party Moments',
    category: 'Birthday',
    image: '/images/birthday3.jpg',
    description: 'Capturing genuine reactions and heartfelt laughs.'
  },
  {
    id: 4,
    title: 'Sweet Sixteen',
    category: 'Birthday',
    image: '/images/birthday4.jpg',
    description: 'A glamorous and fun-filled afternoon for the birthday girl.'
  },
  {
    id: 7,
    title: 'Corporate Gala',
    category: 'Event',
    image: '/images/event2.jpg',
    description: 'An elegant evening of networking and celebration.'
  },
  {
    id: 8,
    title: 'Charity Ball',
    category: 'Event',
    image: '/images/event3.jpg',
    description: 'Documenting the speeches and candid interactions.'
  },
  {
    id: 9,
    title: 'Melody in Motion',
    category: 'Portrait',
    image: '/images/portrait1.jpg',
    description: 'Soft forest light and graceful violin melodies.'
  },
  {
    id: 10,
    title: 'Golden Meadow',
    category: 'Portrait',
    image: '/images/portrait2.jpg',
    description: 'Radiant light, flowing colors in tall grass.'
  },
  {
    id: 11,
    title: 'Urban Edge',
    category: 'Portrait',
    image: '/images/portrait3.jpg',
    description: 'A sharp, modern look against the city skyline.'
  },
  {
    id: 12,
    title: 'Classic Headshot',
    category: 'Portrait',
    image: '/images/portrait4.jpg',
    description: 'Professional and clean studio lighting.'
  },
  {
    id: 13,
    title: 'Creative Soul',
    category: 'Portrait',
    image: '/images/portrait5.jpg',
    description: "Artistic lighting highlighting the subject's passion."
  },
  {
    id: 14,
    title: 'Autumn Stroll',
    category: 'Portrait',
    image: '/images/portrait6.jpg',
    description: 'Warm tones and cozy vibes in the park.'
  },
  {
    id: 15,
    title: 'Vintage Glamour',
    category: 'Portrait',
    image: '/images/portrait7.jpg',
    description: 'A timeless, classic Hollywood style portrait.'
  },
  {
    id: 16,
    title: 'Gallery Exhibition Layout',
    category: 'Portrait',
    image: '/images/portrait8.jpg',
    description: 'A showcase of fine art and elegance.'
  },
  {
    id: 17,
    title: 'Classic Muscle',
    category: 'Vehicle',
    image: '/images/vehicle1.jpg',
    description: 'A restored vintage beauty catching the evening sun.'
  },
  {
    id: 18,
    title: 'Modern Speed',
    category: 'Vehicle',
    image: '/images/vehicle2.jpg',
    description: 'Sleek lines and aerodynamic design in motion.'
  },
  {
    id: 19,
    title: 'Premium Gilded Portrait',
    category: 'Wedding',
    image: '/images/wedding1.jpg',
    description: 'The bride and groom in a classic embrace.'
  },
  {
    id: 20,
    title: 'Golden Union',
    category: 'Wedding',
    image: '/images/wedding2.jpg',
    description: 'Vows shared as the sky melted into hues of amber.'
  }
];

export default function Portfolio() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Target the individual item wrappers for staggered reveal
    const items = gsap.utils.toArray('.gallery-item');
    
    gsap.fromTo(items,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );

    // Subtle image zoom-in on viewport entry
    const imgs = gsap.utils.toArray('.gallery-item img');
    imgs.forEach((img: any) => {
      gsap.fromTo(img,
        { scale: 1.12 },
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
            // Reset transforms so that standard CSS hover transitions work
            gsap.set(img, { clearProps: 'transform,scale' });
          }
        }
      );
    });
  }, { scope: galleryRef });

  const handlePrev = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return prevIndex === 0 ? photos.length - 1 : prevIndex - 1;
    });
  }, [selectedPhotoIndex]);

  const handleNext = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return prevIndex === photos.length - 1 ? 0 : prevIndex + 1;
    });
  }, [selectedPhotoIndex]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
    },
    [selectedPhotoIndex, handlePrev, handleNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (selectedPhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedPhotoIndex, handleKeyDown]);

  return (
    <div className="bg-white pt-4 pb-12 sm:pt-10 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal y={30} triggerHook="top 85%" className="space-y-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Portfolio</span>
          <h1 className="font-serif text-3xl font-light text-primary sm:text-5xl lg:text-6xl">
            Selected Galleries
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted">
            Explore stories of love, light, and quiet elegance.
          </p>
        </ScrollReveal>

        {/* Gallery Grid */}
        <div ref={galleryRef} className="mt-10 grid gap-4 sm:mt-16 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className="gallery-item group relative cursor-pointer overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-slate-100 transition-all duration-500 hover:shadow-xl hover:shadow-slate-100"
            >
              {/* Image element */}
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                  src={photo.image}
                  alt={photo.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-750 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Overlay: always visible on touch devices, hover on desktop */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 sm:p-6 opacity-100 sm:opacity-0 transition-opacity duration-300 sm:group-hover:opacity-100">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-300">
                  {photo.category}
                </span>
                <h3 className="mt-1 font-serif text-base sm:text-lg font-medium text-white">{photo.title}</h3>
                <div className="mt-3 sm:mt-4 flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white">
                  <span>View Fullscreen</span>
                  <Maximize2 className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {photos.length === 0 && (
          <div className="py-24 text-center text-muted">No photographs in this category yet.</div>
        )}
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300 p-3 sm:p-6">
          {/* Close button */}
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute right-3 top-3 sm:right-6 sm:top-6 z-[110] rounded-full bg-white/10 p-2.5 sm:p-3 text-white transition hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-[110] rounded-full bg-white/10 p-2.5 sm:p-3 text-white transition hover:bg-white/20 active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-[110] rounded-full bg-white/10 p-2.5 sm:p-3 text-white transition hover:bg-white/20 active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Media Content Area */}
          <div className="relative max-h-[90dvh] w-full max-w-[min(90vw,56rem)] flex flex-col items-center justify-center px-8 sm:px-12">
            <img
              src={photos[selectedPhotoIndex].image}
              alt={photos[selectedPhotoIndex].title}
              className="max-h-[70dvh] sm:max-h-[75vh] w-auto max-w-full object-contain rounded-lg select-none shadow-2xl animate-fade-in"
            />
            {/* Image Details Caption */}
            <div className="mt-4 sm:mt-6 text-center text-white max-w-lg space-y-1 px-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                {photos[selectedPhotoIndex].category}
              </span>
              <h2 className="font-serif text-lg sm:text-xl font-light">
                {photos[selectedPhotoIndex].title}
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
