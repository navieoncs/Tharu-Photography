"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BookSessionButton from '@/components/BookSessionButton';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/services' },
    { name: 'Dronography', href: '/drone' },
    { name: 'Frames', href: '/frames' },
    { name: 'About', href: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Fixed bar — always stays on screen while scrolling */}
      <header
        className={`fixed top-0 left-0 right-0 z-[200] w-full border-b border-slate-200/70 bg-[#faf8f5] transition-shadow duration-300 ${
          scrolled || isOpen
            ? 'shadow-[0_8px_30px_rgba(17,24,39,0.08)]'
            : 'shadow-none'
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 transition-[padding] duration-300 ${
            scrolled ? 'py-3 sm:py-3.5' : 'py-4 sm:py-5'
          }`}
        >
          <Link
            href="/"
            className="relative z-10 flex shrink-0 items-center"
            aria-label="Tharu Photography home"
          >
            <img
              src="/images/logo.png"
              alt="Tharu Photography"
              className="h-9 w-auto object-contain scale-[2.15] origin-left sm:h-10 sm:scale-[2.25]"
            />
          </Link>

          <nav className="hidden items-center gap-5 xl:gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`whitespace-nowrap text-[10px] uppercase tracking-[0.18em] transition-colors duration-200 hover:text-primary xl:text-xs xl:tracking-[0.22em] ${
                  isActive(link.href) ? 'text-primary font-semibold' : 'text-muted'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <BookSessionButton className="ml-1 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-primary px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200 active:scale-95 xl:ml-3 xl:px-5 xl:text-xs xl:tracking-[0.18em]" />
          </nav>

          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="max-h-[min(100dvh-4.5rem,100vh)] overflow-y-auto border-t border-slate-200/60 bg-[#faf8f5] px-4 py-5 shadow-xl animate-fade-in sm:px-6 lg:hidden">
            <nav className="flex flex-col gap-1 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-xl px-3 py-3.5 text-sm uppercase tracking-[0.18em] transition-colors ${
                    isActive(link.href)
                      ? 'bg-white text-primary font-semibold shadow-sm'
                      : 'text-muted hover:bg-white hover:text-primary'
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

      {/* Spacer so page content is not hidden under the fixed bar */}
      <div
        className={`shrink-0 w-full transition-[height] duration-300 ${
          scrolled ? 'h-[3.75rem] sm:h-[4rem]' : 'h-[4.25rem] sm:h-[4.75rem]'
        }`}
        aria-hidden
      />
    </>
  );
}
