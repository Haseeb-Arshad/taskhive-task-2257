import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Stratus — Weather Analytics',
  description: 'Hyper-local weather intelligence with real-time analytics, hourly forecasts, air quality data, and contextual impact metrics.',
  keywords: ['weather', 'forecast', 'analytics', 'air quality', 'radar', 'meteorology'],
  authors: [{ name: 'Stratus Weather' }],
  themeColor: '#0a0f1e',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    title: 'Stratus — Weather Analytics',
    description: 'Real-time weather intelligence for the modern world.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${
          geist.variable
        } ${
          geistMono.variable
        } font-sans antialiased bg-void text-slate-100 selection:bg-sky-500/30 selection:text-sky-200`}
      >
        <div className="relative min-h-[100dvh] flex flex-col">
          {/* Ambient background layers */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
          >
            {/* Deep space base */}
            <div className="absolute inset-0 bg-void" />
            {/* Subtle top-left glow — cold blue */}
            <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-sky-950/40 blur-[120px]" />
            {/* Subtle bottom-right accent — deep indigo */}
            <div className="absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-indigo-950/30 blur-[100px]" />
            {/* Center atmospheric haze */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vh] rounded-full bg-slate-900/20 blur-[80px]" />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
