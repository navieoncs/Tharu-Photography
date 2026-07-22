"use client";

import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import 'react-day-picker/dist/style.css';

const WHATSAPP_NUMBER = '94715327267';

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [shootType, setShootType] = useState('Editorial Portrait');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [vision, setVision] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !selectedDate) {
      setError('Please fill in your name, email, and choose a preferred date.');
      return;
    }

    setIsSubmitting(true);

    try {
      const message = [
        'New Booking Inquiry',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Shoot Type: ${shootType}`,
        `Preferred Date: ${format(selectedDate, 'PPP')}`,
        `Details: ${vision || 'No additional details provided.'}`,
      ].join('\n');

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setIsSubmitted(true);
    } catch {
      setError('Unable to open WhatsApp. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[1.75rem] sm:rounded-[2.5rem] bg-white p-6 sm:p-12 text-center border border-slate-100 shadow-xl shadow-slate-100/50 animate-fade-in space-y-6">
        <div className="rounded-full bg-emerald-50 p-4 text-emerald-500">
          <CheckCircle2 className="h-12 w-12 animate-pulse" />
        </div>
        <div className="space-y-2">
          <h3 className="font-serif text-2xl font-medium text-primary">Inquiry Sent Successfully</h3>
          <p className="text-sm text-muted max-w-sm">
            Thank you, <span className="font-bold text-primary">{name}</span>! We have reserved a review slot for <span className="font-bold text-primary">{format(selectedDate!, 'PPP')}</span>.
          </p>
        </div>
        <div className="rounded-2xl bg-[#faf8f5] p-4 text-left text-xs text-muted w-full space-y-2 border border-slate-100">
          <p><strong>Service Type:</strong> {shootType}</p>
          <p><strong>Preferred Date:</strong> {format(selectedDate!, 'PPP')}</p>
          <p><strong>Contact Email:</strong> {email}</p>
        </div>
        <p className="text-xs text-muted">
          We typically review details and follow up within 24–48 hours with a customized checklist.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setName('');
            setEmail('');
            setVision('');
            setSelectedDate(undefined);
            setError('');
          }}
          className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary hover:text-muted"
        >
          Submit another inquiry <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[1.75rem] sm:rounded-[2.5rem] bg-white p-5 border border-slate-100 shadow-xl shadow-slate-100/30 sm:p-8 md:p-10">
      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

        {/* Name and Email */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-primary">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aria Sterling"
              className="w-full rounded-2xl border border-slate-200 bg-[#faf8f5] px-4 py-3.5 text-sm text-primary outline-none transition focus:border-primary focus:bg-white"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-primary">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="aria@example.com"
              className="w-full rounded-2xl border border-slate-200 bg-[#faf8f5] px-4 py-3.5 text-sm text-primary outline-none transition focus:border-primary focus:bg-white"
            />
          </div>
        </div>

        {/* Shoot Type and Message */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="shootType" className="text-xs font-bold uppercase tracking-wider text-primary">
              Type of Shoot
            </label>
            <select
              id="shootType"
              name="type_of_shoot"
              value={shootType}
              onChange={(e) => setShootType(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-[#faf8f5] px-4 py-3.5 text-sm text-primary outline-none transition focus:border-primary focus:bg-white"
            >
              <option>Editorial Portrait</option>
              <option>Wedding / Elopement</option>
              <option>Events / Milestones</option>
              <option>Commercial / Branding</option>
              <option>Dronography / Aerial</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-primary">
              Vision & details
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              placeholder="Tell us about the atmosphere, location preferences, and style vibes you're looking to achieve..."
              className="w-full rounded-2xl border border-slate-200 bg-[#faf8f5] px-4 py-4 text-sm text-primary outline-none transition focus:border-primary focus:bg-white"
            />
          </div>
        </div>

        {/* Date Selector Container */}
        <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-[#faf8f5] p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <CalendarIcon className="h-4 w-4 text-slate-400 shrink-0" />
            <span>Select Preferred Date</span>
          </div>

          <div className="flex justify-center bg-white p-2 sm:p-4 rounded-2xl border border-slate-100 shadow-sm w-full max-w-full mx-auto overflow-x-auto">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={{ before: new Date() }}
              className="day-picker !m-0"
            />
          </div>

          {selectedDate ? (
            <p className="text-center text-xs text-muted">
              Selected Date: <span className="font-semibold text-primary">{format(selectedDate, 'PPP')}</span>
            </p>
          ) : (
            <p className="text-center text-xs text-rose-500 font-medium">
              * Please pick an available date from the calendar.
            </p>
          )}
        </div>

        {error && (
          <p className="text-center text-xs font-medium text-rose-500">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800 disabled:bg-slate-300"
        >
          {isSubmitting ? (
            <>
              <span>Sending Inquiry</span>
              <Loader2 className="h-4 w-4 animate-spin" />
            </>
          ) : (
            'Send Booking Inquiry'
          )}
        </button>

      </form>
    </div>
  );
}
