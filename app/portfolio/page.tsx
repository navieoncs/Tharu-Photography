"use client";

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface Photo {
  id: number;
  title: string;
  category: 'Weddings' | 'Portraits' | 'Events' | 'Fine Art';
  image: string;
  description: string;
}

const photos: Photo[] = [
  {
    id: 1,
    title: 'Aurelia & James',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    description: 'An intimate sunset exchange of vows in the coastal hills.'
  },
  {
    id: 2,
    title: 'Serenade of Light',
    category: 'Portraits',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
    description: 'Exploring geometry, soft shadows, and classical form.'
  },
  {
    id: 3,
    title: 'Aesthetic Rings',
    category: 'Fine Art',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200',
    description: 'Still life fine art capture of heirloom wedding bands.'
  },
  {
    id: 4,
    title: 'The Forest Stroll',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200',
    description: 'A quiet morning couple session captured through forest light-leaks.'
  },
  {
    id: 5,
    title: 'Minimalist Silhouette',
    category: 'Portraits',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200',
    description: 'Strong lines and high contrast editorial portrait in studio.'
  },
  {
    id: 6,
    title: 'Midnight Revelry',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=1200',
    description: 'Candid smiles and active energy under fairy lights.'
  },
  {
    id: 7,
    title: 'Whisper of Wind',
    category: 'Fine Art',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200',
    description: 'Abstract movement and wind-swept tall grass landscape.'
  },
  {
    id: 8,
    title: 'Sun-drenched Lovers',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200',
    description: 'Golden hour embrace in a field of wild barley.'
  },
  {
    id: 9,
    title: 'Bespoke Joy',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1200',
    description: 'Lively crowd capturing celebratory cheers at a modern birthday.'
  },
  {
    id: 10,
    title: 'Refined Simplicity',
    category: 'Fine Art',
    image: 'https://images.unsplash.com/photo-1517530094915-500495b15ade?auto=format&fit=crop&q=80&w=1200',
    description: 'Symmetric monochrome reflection on smooth basalt rocks.'
  },
  {
    id: 11,
    title: 'Gaze of Honesty',
    category: 'Portraits',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200',
    description: 'Direct natural-light portrait focusing on organic texture.'
  },
  {
    id: 12,
    title: 'Grand Gala Toast',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200',
    description: 'Long table details and warm interactions at an editorial reception.'
  }
];

const categories = ['All', 'Weddings', 'Portraits', 'Events', 'Fine Art'] as const;

type FilterType = typeof categories[number];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredPhotos = photos.filter(
    (photo) => activeFilter === 'All' || photo.category === activeFilter
  );

  const handlePrev = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return prevIndex === 0 ? filteredPhotos.length - 1 : prevIndex - 1;
    });
  }, [selectedPhotoIndex, filteredPhotos]);

  const handleNext = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return prevIndex === filteredPhotos.length - 1 ? 0 : prevIndex + 1;
    });
  }, [selectedPhotoIndex, filteredPhotos]);

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
            Explore stories of love, light, and quiet elegance. Filter by category to view custom collections.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 border-b border-slate-100 pb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveFilter(category);
                setSelectedPhotoIndex(null);
              }}
              className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-[#faf8f5] text-muted hover:bg-slate-100 hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
          {filteredPhotos.map((photo, index) => (
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
                <p className="mt-1 text-xs text-slate-200 line-clamp-2">{photo.description}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white">
                  <span>View Fullscreen</span>
                  <Maximize2 className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
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
              src={filteredPhotos[selectedPhotoIndex].image}
              alt={filteredPhotos[selectedPhotoIndex].title}
              className="max-h-[75vh] max-w-[85vw] object-contain rounded-lg select-none shadow-2xl animate-fade-in"
            />
            {/* Image Details Caption */}
            <div className="mt-6 text-center text-white max-w-lg space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                {filteredPhotos[selectedPhotoIndex].category} ({selectedPhotoIndex + 1} / {filteredPhotos.length})
              </span>
              <h2 className="font-serif text-xl font-light">
                {filteredPhotos[selectedPhotoIndex].title}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {filteredPhotos[selectedPhotoIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
