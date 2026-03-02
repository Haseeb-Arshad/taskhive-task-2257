'use client';

import React from 'react';

// Base shimmer animation class
const shimmer = 'animate-pulse bg-white/10 rounded-xl';

function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`${shimmer} ${className}`} />;
}

export function CurrentWeatherSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4">
      {/* Location row */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <SkeletonBlock className="h-7 w-40" />
          <SkeletonBlock className="h-4 w-24" />
        </div>
        <SkeletonBlock className="h-10 w-10 rounded-full" />
      </div>

      {/* Temperature */}
      <div className="flex items-end gap-4 py-2">
        <SkeletonBlock className="h-20 w-36" />
        <div className="space-y-2 mb-2">
          <SkeletonBlock className="h-4 w-28" />
          <SkeletonBlock className="h-4 w-20" />
        </div>
      </div>

      {/* Condition */}
      <SkeletonBlock className="h-6 w-32" />

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 pt-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <SkeletonBlock className="h-3 w-12" />
            <SkeletonBlock className="h-5 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HourlyForecastSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4">
      <SkeletonBlock className="h-5 w-36" />
      <div className="flex gap-3 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex flex-col items-center gap-2"
          >
            <SkeletonBlock className="h-3 w-10" />
            <SkeletonBlock className="h-8 w-8 rounded-full" />
            <SkeletonBlock className="h-4 w-10" />
            <SkeletonBlock className="h-3 w-8" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function WeeklyForecastSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4">
      <SkeletonBlock className="h-5 w-32" />
      <div className="space-y-3">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <SkeletonBlock className="h-4 w-16" />
            <SkeletonBlock className="h-6 w-6 rounded-full" />
            <div className="flex items-center gap-2">
              <SkeletonBlock className="h-2 w-20 rounded-full" />
            </div>
            <div className="flex gap-2">
              <SkeletonBlock className="h-4 w-10" />
              <SkeletonBlock className="h-4 w-10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WeatherMetricsSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4">
      <SkeletonBlock className="h-5 w-28" />
      <div className="grid grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-2">
            <SkeletonBlock className="h-3 w-16" />
            <SkeletonBlock className="h-6 w-20" />
            <SkeletonBlock className="h-2 w-full rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AirQualityCardSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <SkeletonBlock className="h-5 w-28" />
        <SkeletonBlock className="h-6 w-20 rounded-full" />
      </div>
      <SkeletonBlock className="h-12 w-24" />
      <SkeletonBlock className="h-3 w-full rounded-full" />
      <div className="grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-1">
            <SkeletonBlock className="h-3 w-14" />
            <SkeletonBlock className="h-4 w-10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SunriseSunsetSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4">
      <SkeletonBlock className="h-5 w-32" />
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <SkeletonBlock className="h-4 w-14" />
          <SkeletonBlock className="h-7 w-16" />
        </div>
        <SkeletonBlock className="h-16 w-16 rounded-full" />
        <div className="space-y-2 text-right">
          <SkeletonBlock className="h-4 w-14" />
          <SkeletonBlock className="h-7 w-16" />
        </div>
      </div>
      <SkeletonBlock className="h-3 w-full rounded-full" />
      <div className="grid grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="space-y-1">
            <SkeletonBlock className="h-3 w-16" />
            <SkeletonBlock className="h-4 w-12" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function WeatherAlertsSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-3">
      <SkeletonBlock className="h-5 w-32" />
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="border border-white/10 rounded-xl p-4 space-y-2"
        >
          <div className="flex items-center gap-2">
            <SkeletonBlock className="h-4 w-4 rounded-full" />
            <SkeletonBlock className="h-4 w-40" />
          </div>
          <SkeletonBlock className="h-3 w-full" />
          <SkeletonBlock className="h-3 w-3/4" />
        </div>
      ))}
    </div>
  );
}

export function FullPageSkeleton() {
  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <CurrentWeatherSkeleton />
      <HourlyForecastSkeleton />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WeatherMetricsSkeleton />
        <AirQualityCardSkeleton />
      </div>
      <WeeklyForecastSkeleton />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SunriseSunsetSkeleton />
        <WeatherAlertsSkeleton />
      </div>
    </div>
  );
}
