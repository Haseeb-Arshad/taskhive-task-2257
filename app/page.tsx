'use client';

import { useState, useCallback } from 'react';
import SearchBar from '@/components/SearchBar';
import CurrentWeather from '@/components/CurrentWeather';
import HourlyForecast from '@/components/HourlyForecast';
import WeeklyForecast from '@/components/WeeklyForecast';
import WeatherMetrics from '@/components/WeatherMetrics';
import AirQualityCard from '@/components/AirQualityCard';
import SunriseSunset from '@/components/SunriseSunset';
import WeatherAlerts from '@/components/WeatherAlerts';
import { WeatherData } from '@/types/weather';

// ─── Skeleton Components ──────────────────────────────────────────────────────

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-white/5 border border-white/10 animate-pulse ${className ?? ''}`}
    />
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {/* Current weather skeleton */}
      <SkeletonBlock className="h-52" />
      {/* Alerts placeholder – smaller */}
      <SkeletonBlock className="h-16" />
      {/* Hourly */}
      <SkeletonBlock className="h-36" />
      {/* Weekly */}
      <SkeletonBlock className="h-72" />
      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-3">
        <SkeletonBlock className="h-28" />
        <SkeletonBlock className="h-28" />
        <SkeletonBlock className="h-28" />
        <SkeletonBlock className="h-28" />
      </div>
      {/* AQI + Sunrise row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkeletonBlock className="h-64" />
        <SkeletonBlock className="h-64" />
      </div>
    </div>
  );
}

// ─── Empty / Hero State ───────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      {/* Animated weather icon */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-sky-500/10 blur-2xl scale-150" />
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          className="relative z-10 opacity-70"
        >
          {/* Sun */}
          <circle cx="32" cy="32" r="14" fill="#fbbf24" opacity="0.9" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <line
              key={i}
              x1={32 + 18 * Math.cos((deg * Math.PI) / 180)}
              y1={32 + 18 * Math.sin((deg * Math.PI) / 180)}
              x2={32 + 24 * Math.cos((deg * Math.PI) / 180)}
              y2={32 + 24 * Math.sin((deg * Math.PI) / 180)}
              stroke="#fbbf24"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.7"
            />
          ))}
          {/* Cloud */}
          <rect x="28" y="48" width="36" height="20" rx="10" fill="#e2e8f0" opacity="0.9" />
          <circle cx="36" cy="50" r="10" fill="#e2e8f0" opacity="0.9" />
          <circle cx="52" cy="49" r="8" fill="#e2e8f0" opacity="0.9" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Check the Weather</h2>
      <p className="text-white/40 text-sm max-w-[28ch] leading-relaxed">
        Search for any city or location to see detailed weather analytics.
      </p>

      <div className="mt-8 flex flex-wrap gap-2 justify-center">
        {['New York', 'Tokyo', 'London', 'Sydney', 'Dubai'].map((city) => (
          <span
            key={city}
            className="text-xs text-white/30 border border-white/10 rounded-full px-3 py-1"
          >
            {city}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Error State ──────────────────────────────────────────────────────────────

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h3 className="text-white font-semibold mb-1">Something went wrong</h3>
      <p className="text-white/40 text-sm mb-6 max-w-[30ch] leading-relaxed">{message}</p>
      <button
        onClick={onRetry}
        className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-colors active:scale-95"
      >
        Try again
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const fetchWeather = useCallback(async (location: string) => {
    if (!location.trim()) return;
    setLoading(true);
    setError(null);
    setQuery(location);

    try {
      const res = await fetch(
        `/api/weather?location=${encodeURIComponent(location.trim())}`,
        { cache: 'no-store' }
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? `Request failed (${res.status})`);
      }
      const data: WeatherData = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load weather data.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRetry = useCallback(() => {
    if (query) fetchWeather(query);
  }, [query, fetchWeather]);

  const today = weather?.daily?.[0] ?? null;

  return (
    <main className="min-h-[100dvh] bg-[#0b0f1a] text-white">
      {/* Ambient background gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-sky-500/5 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 pt-12 pb-24">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-baseline gap-2 mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-white">Nimbus</h1>
            <span className="text-xs text-white/25 font-medium tracking-widest uppercase">Weather</span>
          </div>
          <SearchBar onSearch={fetchWeather} isLoading={loading} />
        </header>

        {/* Content */}
        {loading && <LoadingSkeleton />}

        {!loading && error && (
          <ErrorState message={error} onRetry={handleRetry} />
        )}

        {!loading && !error && !weather && <EmptyState />}

        {!loading && !error && weather && (
          <div className="space-y-4">
            {/* Active weather alerts */}
            {weather.alerts && weather.alerts.length > 0 && (
              <WeatherAlerts alerts={weather.alerts} />
            )}

            {/* Current conditions */}
            <CurrentWeather data={weather} />

            {/* Hourly forecast */}
            {weather.hourly && weather.hourly.length > 0 && (
              <HourlyForecast hourly={weather.hourly} />
            )}

            {/* 7-day forecast */}
            {weather.daily && weather.daily.length > 0 && (
              <WeeklyForecast daily={weather.daily} />
            )}

            {/* Metrics grid */}
            <WeatherMetrics data={weather} />

            {/* AQI + Sunrise/Sunset side-by-side on wider screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weather.airQuality && (
                <AirQualityCard airQuality={weather.airQuality} />
              )}
              {today && (
                <SunriseSunset today={today} />
              )}
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-white/20 pt-4">
              Data refreshes automatically &middot; Last updated{' '}
              {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
