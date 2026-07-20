import Link from 'next/link';
import { Facebook, Mail, Phone, MapPin } from 'lucide-react';
import BookSessionButton from '@/components/BookSessionButton';

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-[#faf8f5] py-16 text-primary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <img src="/images/logo.png" alt="Tharu Photography" className="h-9 w-auto object-contain scale-[2.25] origin-left" />
            </Link>
            <p className="text-sm leading-relaxed text-muted max-w-xs">
              Capturing pure emotion, editorial portraits, and fine-art lifestyle photography with quiet elegance.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.facebook.com/people/Tharu-Photography/61566285896022/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white p-2 text-muted shadow-sm transition hover:bg-primary hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.tiktok.com/@tharu_photograph?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white p-2 text-muted shadow-sm transition hover:bg-primary hover:text-white"
                aria-label="TikTok"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Explore</h3>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <Link href="/" className="transition hover:text-primary">Home</Link>
              </li>
              <li>
                <Link href="/portfolio" className="transition hover:text-primary">Portfolio</Link>
              </li>
              <li>
                <Link href="/services" className="transition hover:text-primary">Services & Pricing</Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-primary">About</Link>
              </li>
              <li>
                <Link href="/frames" className="transition hover:text-primary">Frames</Link>
              </li>
              <li>
                <BookSessionButton className="transition hover:text-primary" />
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Contact</h3>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400" />
                <a href="tel:+94715327267" className="transition hover:text-primary">+94 71 532 7267</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <a href="mailto:o.k.dtharushalakshan@gmail.com" className="transition hover:text-primary">o.k.dtharushalakshan@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
                <span>Colombo, Sri Lanka</span>
              </li>
            </ul>
          </div>

          {/* Studio Hours */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Studio Hours</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>Mon - Fri: 9:00 AM - 6:00 PM</li>
              <li>Sat: 10:00 AM - 4:00 PM</li>
              <li>Sun: Closed / Booked sessions only</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-200/60 pt-8 flex flex-col items-center justify-between gap-4 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Tharu Photography. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <BookSessionButton className="transition hover:text-primary" />
          </p>
        </div>
      </div>
    </footer>
  );
}
