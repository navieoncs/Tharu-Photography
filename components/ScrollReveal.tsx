"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  triggerHook?: string; // e.g., "top 80%"
}

export default function ScrollReveal({
  children,
  className = "",
  y = 50,
  duration = 0.8,
  delay = 0,
  stagger = 0,
  triggerHook = "top 80%"
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReduced) {
      // Instantly reveal if prefers-reduced-motion is active
      gsap.set(containerRef.current, { opacity: 1, y: 0 });
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    // If stagger is set, target individual child elements, otherwise target the container itself.
    const targets = stagger > 0 ? Array.from(element.children) : element;

    gsap.fromTo(targets, 
      {
        opacity: 0,
        y: y,
      },
      {
        opacity: 1,
        y: 0,
        duration: duration,
        delay: delay,
        stagger: stagger,
        ease: 'power3.out', // premium and smooth easing
        scrollTrigger: {
          trigger: element,
          start: triggerHook,
          toggleActions: 'play none none none', // Play once
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
