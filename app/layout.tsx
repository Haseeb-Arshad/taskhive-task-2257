import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Atmosphere — Weather Intelligence',
  description:
    'Hyper-local weather analytics with detailed daily and weekly forecasts, air quality, UV index, and real-time atmospheric insights.',
  keywords: ['weather', 'forecast', 'analytics', 'meteorology', 'climate'],
  authors: [{ name: 'Atmosphere' }],
  themeColor: '#0a0f1e',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
  },
  openGraph: {
    title: 'Atmosphere — Weather Intelligence',
    description: 'Hyper-local weather analytics with detailed daily and weekly forecasts.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-atm-base text-atm-text-primary min-h-[100dvh] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
