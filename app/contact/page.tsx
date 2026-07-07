import BookingForm from '@/components/BookingForm';
import { Facebook, Phone, Mail, MapPin, Compass, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="space-y-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Inquire</span>
          <h1 className="font-serif text-4xl font-light text-primary sm:text-5xl lg:text-6xl">
            Book a Session
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted">
            Have an event date in mind or want to organize a branding portrait session? Let's begin the planning conversation.
          </p>
        </div>

        {/* Form and details grid */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          
          {/* Details Column */}
          <div className="space-y-8">
            
            {/* Quick Contact Card */}
            <div className="rounded-[2.5rem] bg-[#faf8f5] p-8 border border-slate-100 space-y-6">
              <h3 className="font-serif text-xl font-medium text-primary">Contact Details</h3>
              <p className="text-xs text-muted leading-relaxed">
                If you prefer direct emails or phone calls, please reach out below. We look forward to coordinating with you.
              </p>
              
              <ul className="space-y-4 text-xs text-muted">
                <li className="flex items-center gap-3">
                  <div className="rounded-xl bg-white p-2.5 shadow-sm text-primary">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] block uppercase tracking-wider text-slate-400">Phone Support</span>
                    <a href="tel:+94771234567" className="font-semibold text-primary transition hover:text-muted">+94 71 532 7267</a>
                  </div>
                </li>
                
                <li className="flex items-center gap-3">
                  <div className="rounded-xl bg-white p-2.5 shadow-sm text-primary">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] block uppercase tracking-wider text-slate-400">Email Inquiry</span>
                    <a href="mailto:o.k.dtharushalakshan@gmail.com" className="font-semibold text-primary transition hover:text-muted">o.k.dtharushalakshan@gmail.com</a>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <div className="rounded-xl bg-white p-2.5 shadow-sm text-primary">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] block uppercase tracking-wider text-slate-400">Main Studio Base</span>
                    <span className="font-semibold text-primary">Colombo, Sri Lanka</span>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <div className="rounded-xl bg-white p-2.5 shadow-sm text-primary">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] block uppercase tracking-wider text-slate-400">Inquiry Hours</span>
                    <span className="font-semibold text-primary">Monday – Saturday, 9:00 AM – 6:00 PM</span>
                  </div>
                </li>
              </ul>

              {/* Social Link buttons */}
              <div className="border-t border-slate-200/50 pt-6 space-y-3">
                <span className="text-[10px] block font-bold uppercase tracking-wider text-primary">Social Channels</span>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.facebook.com/people/Tharu-Photography/61566285896022/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-muted shadow-sm transition hover:bg-primary hover:text-white"
                  >
                    <Facebook className="h-3.5 w-3.5" />
                    <span>Facebook Profile</span>
                  </a>
                  <a
                    href="https://www.tiktok.com/@tharu_photograph?is_from_webapp=1&sender_device=pc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-muted shadow-sm transition hover:bg-primary hover:text-white"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                    </svg>
                    <span>TikTok</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Travel Coverage details */}
            <div className="rounded-[2.5rem] bg-[#faf8f5] p-8 border border-slate-100 space-y-4">
              <div className="flex items-center gap-2 text-primary font-serif text-lg font-medium">
                <Compass className="h-5 w-5 text-slate-500 animate-spin-slow" />
                <span>Travel & Coverage Area</span>
              </div>
              <p className="text-xs leading-relaxed text-muted">
                Our main photography studio is based in Colombo, Sri Lanka. However, we love chasing unique lighting in remote locations. 
              </p>
              <div className="rounded-2xl bg-white p-4 text-xs text-muted space-y-2 border border-slate-100">
                <p><strong>Standard Local Area:</strong> Colombo, Mount Lavinia, Negombo, Kalutara (No travel fee)</p>
                <p><strong>Travel/Destination Coverage:</strong> Galle, Kandy, Ella, Bentota, Trincomalee, Nuwara Eliya, Jaffna (Standard mileage/transport fee applies)</p>
              </div>
              <p className="text-[10px] text-muted italic">
                * We are fully passport-ready and available for international elopements and branding projects worldwide.
              </p>
            </div>

          </div>

          {/* Form Column */}
          <div>
            <BookingForm />
          </div>

        </div>

      </div>
    </div>
  );
}
