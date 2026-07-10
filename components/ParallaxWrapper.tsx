"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxWrapperProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // positive = moves down (parallax depth), negative = moves up
}

export default function ParallaxWrapper({
  children,
  className = "",
  speed = 15,
}: ParallaxWrapperProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const element = elementRef.current;
    if (!element) return;

    // Use yPercent to ensure GPU acceleration and smooth rendering
    gsap.fromTo(element,
      { yPercent: -speed },
      {
        yPercent: speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );
  }, { scope: elementRef });

  return (
    <div ref={elementRef} className={`${className} will-change-transform`}>
      {children}
    </div>
  );
}
