import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';

const geist = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Roboto_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Atmosphere — Weather Intelligence',
  description:
    'Hyper-local weather analytics with detailed daily and weekly forecasts, air quality, UV index, and real-time atmospheric insights.',
  keywords: ['weather', 'forecast', 'analytics', 'meteorology', 'climate'],
  authors: [{ name: 'Atmosphere' }],
  openGraph: {
    title: 'Atmosphere — Weather Intelligence',
    description: 'Hyper-local weather analytics with detailed daily and weekly forecasts.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#0a0f1e',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
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
