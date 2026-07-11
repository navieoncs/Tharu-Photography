"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BookSessionButton from '@/components/BookSessionButton';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Frames', href: '/frames' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Shrink header padding and increase background opacity/blur on scroll
    gsap.to(containerRef.current, {
      paddingTop: '0.75rem', // equivalent to py-3
      paddingBottom: '0.75rem',
      scrollTrigger: {
        trigger: document.body,
        start: 'top+=50 top',
        end: 'top+=100 top',
        scrub: true,
      }
    });

    gsap.to(headerRef.current, {
      backgroundColor: 'rgba(250, 248, 245, 0.95)',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 4px 20px rgba(17, 24, 39, 0.03)',
      scrollTrigger: {
        trigger: document.body,
        start: 'top+=50 top',
        end: 'top+=100 top',
        scrub: true,
      }
    });
  }, { scope: headerRef });

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-[#faf8f5]/85 backdrop-blur-md">
      <div ref={containerRef} className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link href="/" className="flex items-center">
          <img src="/images/logo.png" alt="Tharu Photography" className="h-10 w-auto object-contain scale-[2.25] origin-left" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xs uppercase tracking-[0.25em] transition-colors duration-200 hover:text-primary ${
                isActive(link.href) ? 'text-primary font-semibold' : 'text-muted'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <BookSessionButton
            className="ml-4 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200 active:scale-95"
          />
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary hover:text-muted focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="border-t border-slate-200/60 bg-[#faf8f5] px-6 py-6 shadow-xl animate-fade-in md:hidden">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm uppercase tracking-[0.2em] py-2 border-b border-slate-100 transition-colors ${
                  isActive(link.href) ? 'text-primary font-semibold' : 'text-muted'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <BookSessionButton
              onClick={() => setIsOpen(false)}
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-primary py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-all hover:bg-slate-800"
            />
          </nav>
        </div>
      )}
    </header>
  );
}
