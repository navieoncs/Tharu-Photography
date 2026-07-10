"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Gallery() {
  const images = [
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1517530094915-500495b15ade?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000',
  ];

  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Target the image container boxes (the outer div with rounded-[2rem] bg-slate-900)
    const imageContainers = gsap.utils.toArray('.image-container');
    
    imageContainers.forEach((container: any) => {
      const img = container.querySelector('img');
      
      // Fade in and translate container up
      gsap.fromTo(container,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Subtle zoom-in (image scales from 1.12 to 1)
      if (img) {
        gsap.fromTo(img,
          { scale: 1.12 },
          {
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            onComplete: () => {
              // Reset transform inline style to let CSS hover effects work smoothly
              gsap.set(img, { clearProps: "transform,scale" });
            }
          }
        );
      }
    });

    // Also reveal text cards
    const textCards = gsap.utils.toArray('.text-card');
    textCards.forEach((card: any) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="work" className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
      <div className="space-y-8">
        <div className="text-card rounded-3xl bg-white p-10 shadow-[0_40px_120px_rgba(15,23,42,0.06)]">
          <span className="text-sm uppercase tracking-[0.32em] text-muted">Capturing moments</span>
          <h2 className="mt-6 text-3xl font-semibold leading-tight text-primary sm:text-4xl">
            Capturing moments with quiet elegance.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-muted">
            Specializing in editorial portraiture and fine art lifestyle photography, creating refined visuals with minimalist storytelling.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="image-container overflow-hidden rounded-[2rem] bg-slate-900">
            <img src={images[0]} alt="Editorial portrait" className="h-full w-full object-cover transition duration-300 hover:scale-[1.03]" />
          </div>
          <div className="image-container overflow-hidden rounded-[2rem] bg-slate-900 sm:col-span-2">
            <img src={images[1]} alt="Fine art lifestyle" className="h-full w-full object-cover transition duration-300 hover:scale-[1.03]" />
          </div>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="image-container overflow-hidden rounded-[2rem] bg-slate-900">
          <img src={images[2]} alt="Studio session" className="h-full w-full object-cover transition duration-300 hover:scale-[1.03]" />
        </div>
        <div className="text-card rounded-3xl bg-white p-10 shadow-[0_40px_120px_rgba(15,23,42,0.06)]">
          <p className="text-sm uppercase tracking-[0.32em] text-muted">Editorial gallery</p>
          <p className="mt-6 text-base leading-8 text-muted">
            A refined edit of imagery that balances light, texture, and quiet motion for a polished visual narrative.
          </p>
        </div>
      </div>
    </section>
  );
}
