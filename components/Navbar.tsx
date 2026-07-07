"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-[#faf8f5]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link href="/" className="text-xl font-bold uppercase tracking-[0.35em] text-primary">
          THARU
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
          <Link
            href="/contact"
            className="ml-4 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200 active:scale-95"
          >
            Book Session
          </Link>
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
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-primary py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-all hover:bg-slate-800"
            >
              Book Session
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
