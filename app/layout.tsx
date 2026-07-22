import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tharu Photography | Portrait & Fine Art Lifestyle Photographer',
  description: 'Premium portrait, wedding, and fine-art lifestyle photography portfolio and booking platform.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#faf8f5',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-background text-primary antialiased min-h-screen flex flex-col justify-between">
        <SmoothScroll />
        <Navbar />
        <main className="flex-grow w-full min-w-0 relative z-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

