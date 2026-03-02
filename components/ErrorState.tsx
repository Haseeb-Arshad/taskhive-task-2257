'use client';

import React from 'react';

interface ErrorStateProps {
  message?: string;
  type?: 'not_found' | 'network' | 'generic';
  city?: string;
  onRetry?: () => void;
}

const errorConfig = {
  not_found: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>
    ),
    title: 'City Not Found',
    description: (city?: string) =>
      city
        ? `We couldn't find weather data for "${city}". Check the spelling or try a nearby city.`
        : 'We couldn't find that location. Try searching for a different city or region.',
    accentColor: 'text-amber-400',
    borderColor: 'border-amber-400/20',
    bgColor: 'bg-amber-400/5',
  },
  network: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3l18 18M10.584 10.587a2 2 0 0 0 2.828 2.83M6.343 6.346A8 8 0 0 0 6 8c0 1.32.507 2.52 1.337 3.415m1.26 1.26C9.477 13.58 10.678 14 12 14c2.21 0 4-1.79 4-4 0-1.322-.42-2.523-1.126-3.402M9 3h6M3 9h1.5M19.5 9H21M3 15h1.5M19.5 15H21M9 21h6"
        />
      </svg>
    ),
    title: 'Connection Problem',
    description: () =>
      'Unable to reach weather services. Please check your internet connection and try again.',
    accentColor: 'text-rose-400',
    borderColor: 'border-rose-400/20',
    bgColor: 'bg-rose-400/5',
  },
  generic: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
        />
      </svg>
    ),
    title: 'Something Went Wrong',
    description: () =>
      'An unexpected error occurred while fetching weather data. Please try again in a moment.',
    accentColor: 'text-sky-400',
    borderColor: 'border-sky-400/20',
    bgColor: 'bg-sky-400/5',
  },
};

export default function ErrorState({
  message,
  type = 'generic',
  city,
  onRetry,
}: ErrorStateProps) {
  const config = errorConfig[type];

  return (
    <div
      className={`
        relative overflow-hidden
        rounded-2xl border ${config.borderColor} ${config.bgColor}
        backdrop-blur-md p-8
        flex flex-col items-center text-center gap-5
        animate-in fade-in slide-in-from-bottom-4 duration-500
      `}
    >
      {/* Decorative blurred blob */}
      <div
        className={`
          absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 blur-3xl
          ${type === 'not_found' ? 'bg-amber-400' : type === 'network' ? 'bg-rose-400' : 'bg-sky-400'}
        `}
      />

      {/* Icon */}
      <div className={`${config.accentColor} opacity-80`}>{config.icon}</div>

      {/* Text */}
      <div className="space-y-2 max-w-sm">
        <h3 className="text-lg font-semibold tracking-tight text-white">
          {config.title}
        </h3>
        <p className="text-sm text-white/50 leading-relaxed">
          {message || config.description(city)}
        </p>
      </div>

      {/* Retry button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className={`
            group flex items-center gap-2
            px-5 py-2.5 rounded-xl
            text-sm font-medium text-white
            border border-white/10
            bg-white/5 hover:bg-white/10
            transition-all duration-200
            active:scale-[0.97]
          `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          Try Again
        </button>
      )}

      {/* Subtle tip */}
      {type === 'not_found' && (
        <p className="text-xs text-white/30">
          Tip: Try searching for the nearest major city or use English city names.
        </p>
      )}
    </div>
  );
}
