"use client";

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

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
    title: 'Birthday',
    category: 'Portfolio',
    image: '/images/birthday1.jpg',
    description: ''
  },
  {
    id: 2,
    title: 'Birthday',
    category: 'Portfolio',
    image: '/images/birthday2.jpg',
    description: ''
  },
  {
    id: 3,
    title: 'Birthday',
    category: 'Portfolio',
    image: '/images/birthday3.jpg',
    description: ''
  },
  {
    id: 4,
    title: 'Birthday',
    category: 'Portfolio',
    image: '/images/birthday4.jpg',
    description: ''
  },
  {
    id: 7,
    title: 'Event',
    category: 'Portfolio',
    image: '/images/event2.jpg',
    description: ''
  },
  {
    id: 8,
    title: 'Event',
    category: 'Portfolio',
    image: '/images/event3.jpg',
    description: ''
  },
  {
    id: 9,
    title: 'Portrait',
    category: 'Portfolio',
    image: '/images/portrait1.jpg',
    description: ''
  },
  {
    id: 10,
    title: 'Portrait',
    category: 'Portfolio',
    image: '/images/portrait2.jpg',
    description: ''
  },
  {
    id: 11,
    title: 'Portrait',
    category: 'Portfolio',
    image: '/images/portrait3.jpg',
    description: ''
  },
  {
    id: 12,
    title: 'Portrait',
    category: 'Portfolio',
    image: '/images/portrait4.jpg',
    description: ''
  },
  {
    id: 13,
    title: 'Portrait',
    category: 'Portfolio',
    image: '/images/portrait5.jpg',
    description: ''
  },
  {
    id: 14,
    title: 'Portrait',
    category: 'Portfolio',
    image: '/images/portrait6.jpg',
    description: ''
  },
  {
    id: 15,
    title: 'Portrait',
    category: 'Portfolio',
    image: '/images/portrait7.jpg',
    description: ''
  },
  {
    id: 16,
    title: 'Portrait',
    category: 'Portfolio',
    image: '/images/portrait8.jpg',
    description: ''
  },
  {
    id: 17,
    title: 'Vehicle',
    category: 'Portfolio',
    image: '/images/vehicle1.jpg',
    description: ''
  },
  {
    id: 18,
    title: 'Vehicle',
    category: 'Portfolio',
    image: '/images/vehicle2.jpg',
    description: ''
  },
  {
    id: 19,
    title: 'Wedding',
    category: 'Portfolio',
    image: '/images/wedding1.jpg',
    description: ''
  },
  {
    id: 20,
    title: 'Wedding',
    category: 'Portfolio',
    image: '/images/wedding2.jpg',
    description: ''
  }
];

export default function Portfolio() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

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
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Portfolio</span>
          <h1 className="font-serif text-4xl font-light text-primary sm:text-5xl lg:text-6xl">
            Selected Galleries
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted">
            Explore stories of love, light, and quiet elegance.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group relative cursor-pointer overflow-hidden rounded-[2rem] bg-slate-100 transition-all duration-500 hover:shadow-xl hover:shadow-slate-100"
            >
              {/* Image element */}
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                  src={photo.image}
                  alt={photo.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-750 ease-out group-hover:scale-105"
                />
              </div>

              {/* Hover overlay details */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-300">
                  {photo.category}
                </span>
                <h3 className="mt-1 font-serif text-lg font-medium text-white">{photo.title}</h3>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white">
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300">
          {/* Close button */}
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute right-6 top-6 z-[110] rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={handlePrev}
            className="absolute left-6 z-[110] rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="absolute right-6 z-[110] rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Media Content Area */}
          <div className="relative max-h-[85vh] max-w-[90vw] flex flex-col items-center justify-center">
            <img
              src={photos[selectedPhotoIndex].image}
              alt={photos[selectedPhotoIndex].title}
              className="max-h-[75vh] max-w-[85vw] object-contain rounded-lg select-none shadow-2xl animate-fade-in"
            />
            {/* Image Details Caption */}
            <div className="mt-6 text-center text-white max-w-lg space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                {photos[selectedPhotoIndex].category}
              </span>
              <h2 className="font-serif text-xl font-light">
                {photos[selectedPhotoIndex].title}
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
