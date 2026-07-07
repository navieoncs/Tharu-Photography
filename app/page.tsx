import Link from 'next/link';
import { ArrowRight, Star, Heart, Camera, Calendar, Award } from 'lucide-react';

export default function Home() {
  const featuredWorks = [
    {
      title: 'Aurelia & James',
      category: 'Wedding & Elopement',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
      description: 'An intimate sunset exchange of vows in the coastal hills.'
    },
    {
      title: 'Serenade of Light',
      category: 'Editorial Portrait',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      description: 'Exploring geometry, soft shadows, and classical form.'
    },
    {
      title: 'Whisper in the Forest',
      category: 'Pre-shoot / Couples',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800',
      description: 'A quiet morning stroll captured through light-leaks.'
    }
  ];

  const testimonials = [
    {
      quote: "Working with Tharu was an absolute dream. They have a rare ability to find quiet, raw moments of intimacy amidst the noise of the day. The images feel less like photos and more like poetry.",
      author: "Eleanor & Marcus",
      location: "December Wedding"
    },
    {
      quote: "Every portrait is a masterpiece. They made me feel completely at ease in front of the lens, capturing an authenticity I haven't seen in any studio work before. Exquisite and highly recommended.",
      author: "Devon R.",
      location: "Editorial Portrait Client"
    }
  ];

  return (
    <div className="relative">
      {/* 1. HERO SECTION: Editorial split or layered screen */}
      <section className="relative overflow-hidden bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Text details */}
            <div className="space-y-6 lg:max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                Editorial & Fine-art
              </span>
              <h1 className="font-serif text-5xl font-light leading-[1.15] text-primary sm:text-6xl lg:text-7xl">
                Capturing <br/>
                <span className="font-normal italic">pure emotion</span> in quiet elegance.
              </h1>
              <p className="max-w-xl text-base leading-8 text-muted sm:text-lg">
                Tharu Photography crafts timeless visual narratives that balance natural light, organic texture, and editorial poise for clients who value artistic detail.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-slate-800"
                >
                  Explore Work <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-all hover:bg-slate-50"
                >
                  Inquire Now
                </Link>
              </div>
            </div>

            {/* Visual Grid Hero Collage */}
            <div className="relative grid grid-cols-2 gap-4 lg:gap-6">
              <div className="space-y-4 lg:space-y-6">
                <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-xl shadow-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600"
                    alt="Editorial Portrait"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="aspect-[3/4] overflow-hidden rounded-[2rem] bg-slate-100 shadow-xl shadow-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600"
                    alt="Wedding details"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8 lg:space-y-6 lg:pt-12">
                <div className="aspect-[3/4] overflow-hidden rounded-[2rem] bg-slate-100 shadow-xl shadow-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600"
                    alt="Lifestyle portraiture"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-xl shadow-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1517530094915-500495b15ade?auto=format&fit=crop&q=80&w=600"
                    alt="Outdoor couple portrait"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & KEY PILLARS */}
      <section className="bg-[#faf8f5] py-16 border-t border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start gap-4 rounded-3xl bg-white p-8 shadow-sm">
              <div className="rounded-2xl bg-amber-50 p-3 text-amber-600">
                <Camera className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-primary">Uncompromising Detail</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  High-fidelity capture using premium medium-format lenses for deep textures and natural tonalities.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-3xl bg-white p-8 shadow-sm">
              <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-primary">Genuine Connection</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Creating an environment of absolute comfort where laughter, quiet glances, and pure feelings emerge organically.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-3xl bg-white p-8 shadow-sm sm:col-span-2 lg:col-span-1">
              <div className="rounded-2xl bg-rose-50 p-3 text-rose-600">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-primary">Editorial Polish</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Tailored styling guides, light coaching, and bespoke curation that elevate every image to magazine standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED WORK SHOWCASE */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-100 pb-8 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">A curated edit</span>
              <h2 className="mt-2 font-serif text-3xl font-light text-primary sm:text-4xl">Featured Stories</h2>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary hover:text-muted"
            >
              View All Portfolios <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {featuredWorks.map((work, idx) => (
              <article key={idx} className="group relative flex flex-col items-start">
                <div className="aspect-[3/4] w-full overflow-hidden rounded-[2.5rem] bg-slate-100">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-6 space-y-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted">{work.category}</span>
                  <h3 className="font-serif text-xl font-medium text-primary transition hover:text-muted">
                    <Link href="/portfolio">{work.title}</Link>
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{work.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE SERVICE EXPERIENCE */}
      <section className="bg-[#faf8f5] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Offerings</span>
            <h2 className="font-serif text-3xl font-light text-primary sm:text-4xl">Services Tailored for You</h2>
            <p className="text-base text-muted leading-relaxed">
              Whether documenting a grand wedding elopement, capturing editorial branding portraiture, or preserving family legacies, we bring clean composition and elevated aesthetics.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="rounded-[2.5rem] bg-white p-10 border border-slate-100 shadow-sm space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Classic</span>
              <h3 className="font-serif text-2xl font-light text-primary">Weddings & Elopements</h3>
              <p className="text-sm leading-relaxed text-muted">
                Visual narratives documenting wedding pre-shoots, ceremony highlights, fine-art couple sessions, and details.
              </p>
              <ul className="space-y-2 text-xs text-muted">
                <li>• Planning & timeline coordination</li>
                <li>• High-resolution digital gallery</li>
                <li>• Bespoke fine-art edit style</li>
              </ul>
              <div className="pt-4">
                <Link href="/services" className="text-xs font-semibold uppercase tracking-[0.18em] text-primary hover:text-muted inline-flex items-center gap-1">
                  View packages <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-[2.5rem] bg-white p-10 border border-slate-100 shadow-sm space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Editorial</span>
              <h3 className="font-serif text-2xl font-light text-primary">Portraits & Branding</h3>
              <p className="text-sm leading-relaxed text-muted">
                Striking individual sessions, fashion editorials, and commercial branding collections that emphasize authentic character.
              </p>
              <ul className="space-y-2 text-xs text-muted">
                <li>• Creative direction & mood board</li>
                <li>• Studio or outdoor lighting setups</li>
                <li>• Professional commercial licensing</li>
              </ul>
              <div className="pt-4">
                <Link href="/services" className="text-xs font-semibold uppercase tracking-[0.18em] text-primary hover:text-muted inline-flex items-center gap-1">
                  View packages <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-[2.5rem] bg-white p-10 border border-slate-100 shadow-sm space-y-6 md:col-span-2 lg:col-span-1">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-rose-600 bg-rose-50 px-3 py-1 rounded-full">Milestones</span>
              <h3 className="font-serif text-2xl font-light text-primary">Events & Birthdays</h3>
              <p className="text-sm leading-relaxed text-muted">
                Candid and elegant coverage of family reunions, anniversaries, corporate launches, and birthday celebrations.
              </p>
              <ul className="space-y-2 text-xs text-muted">
                <li>• Documentary style capturing raw smiles</li>
                <li>• Rapid sneak-peek turnaround</li>
                <li>• Full digital downloads</li>
              </ul>
              <div className="pt-4">
                <Link href="/services" className="text-xs font-semibold uppercase tracking-[0.18em] text-primary hover:text-muted inline-flex items-center gap-1">
                  View packages <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="bg-white py-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Kind words</span>
              <h2 className="font-serif text-3xl font-light text-primary sm:text-4xl">Client Love</h2>
              <p className="text-sm leading-relaxed text-muted">
                Feedback from clients who trusted us with their core visual memories and editorial portraits.
              </p>
              <div className="flex gap-1.5 pt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              {testimonials.map((test, idx) => (
                <div key={idx} className="rounded-3xl bg-[#faf8f5] p-8 space-y-4">
                  <p className="text-sm italic leading-relaxed text-primary">"{test.quote}"</p>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-primary">{test.author}</p>
                    <p className="text-[11px] text-muted">{test.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BOOKING INQUIRY */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[3rem] bg-primary px-8 py-16 text-center text-white shadow-2xl md:px-12 md:py-20">
            <div className="mx-auto max-w-2xl space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-300">Reserve your date</span>
              <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl">
                Ready to create <br className="sm:hidden" />
                <span className="italic font-normal text-slate-200">something beautiful?</span>
              </h2>
              <p className="text-sm leading-relaxed text-slate-300">
                Spaces are limited as we only photograph a select number of weddings and portraits per season to guarantee exceptional artistic quality.
              </p>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary transition hover:bg-slate-100 active:scale-95"
                >
                  Start Booking Inquiry <Calendar className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
