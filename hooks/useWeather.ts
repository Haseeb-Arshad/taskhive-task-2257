'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { WeatherData } from '@/types/weather';

type ErrorType = 'not_found' | 'network' | 'generic';

interface WeatherError {
  type: ErrorType;
  message: string;
}

interface UseWeatherReturn {
  data: WeatherData | null;
  loading: boolean;
  error: WeatherError | null;
  city: string;
  fetchWeather: (cityName: string) => Promise<void>;
  retry: () => void;
  clearError: () => void;
}

const STORAGE_KEY = 'weather_last_city';
const DEFAULT_CITY = 'New York';
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  data: WeatherData;
  timestamp: number;
  city: string;
}

const memoryCache = new Map<string, CacheEntry>();

function getCachedData(city: string): WeatherData | null {
  const key = city.toLowerCase().trim();
  const entry = memoryCache.get(key);
  if (!entry) return null;
  const isExpired = Date.now() - entry.timestamp > CACHE_DURATION_MS;
  if (isExpired) {
    memoryCache.delete(key);
    return null;
  }
  return entry.data;
}

function setCachedData(city: string, data: WeatherData): void {
  const key = city.toLowerCase().trim();
  memoryCache.set(key, { data, timestamp: Date.now(), city });
}

function classifyError(status: number, body: unknown): WeatherError {
  if (status === 404) {
    return {
      type: 'not_found',
      message:
        typeof body === 'object' &&
        body !== null &&
        'error' in body &&
        typeof (body as { error: unknown }).error === 'string'
          ? (body as { error: string }).error
          : 'City not found.',
    };
  }
  if (status === 0 || status >= 500) {
    return {
      type: 'network',
      message: 'Network error. Please check your connection.',
    };
  }
  return {
    type: 'generic',
    message: 'An unexpected error occurred.',
  };
}

export function useWeather(): UseWeatherReturn {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<WeatherError | null>(null);
  const [city, setCity] = useState<string>('');

  // Track the latest city requested to avoid stale responses
  const latestCityRef = useRef<string>('');

  const persistCity = useCallback((cityName: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, cityName);
    } catch {
      // localStorage unavailable (private mode, etc.)
    }
  }, []);

  const fetchWeather = useCallback(
    async (cityName: string) => {
      const normalized = cityName.trim();
      if (!normalized) return;

      latestCityRef.current = normalized;
      setCity(normalized);
      setError(null);
      setLoading(true);

      // Check in-memory cache first
      const cached = getCachedData(normalized);
      if (cached) {
        // Only apply if this is still the latest request
        if (latestCityRef.current === normalized) {
          setData(cached);
          setLoading(false);
          persistCity(normalized);
        }
        return;
      }

      try {
        const res = await fetch(
          `/api/weather?city=${encodeURIComponent(normalized)}`,
          { signal: AbortSignal.timeout(10_000) }
        );

        // Guard against stale responses from previous fetches
        if (latestCityRef.current !== normalized) return;

        if (!res.ok) {
          let body: unknown = {};
          try {
            body = await res.json();
          } catch {
            // non-JSON error body
          }
          const weatherError = classifyError(res.status, body);
          setError(weatherError);
          setData(null);
          setLoading(false);
          return;
        }

        const json = await res.json();

        if (latestCityRef.current !== normalized) return;

        if (json?.data) {
          setCachedData(normalized, json.data);
          setData(json.data);
          setError(null);
          persistCity(normalized);
        } else {
          setError({
            type: 'generic',
            message: 'Received unexpected data from the weather service.',
          });
          setData(null);
        }
      } catch (err: unknown) {
        if (latestCityRef.current !== normalized) return;

        const isAbort =
          err instanceof DOMException && err.name === 'AbortError';
        if (isAbort) {
          setError({
            type: 'network',
            message: 'Request timed out. Please try again.',
          });
        } else {
          setError(classifyError(0, {}));
        }
        setData(null);
      } finally {
        if (latestCityRef.current === normalized) {
          setLoading(false);
        }
      }
    },
    [persistCity]
  );

  const retry = useCallback(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city, fetchWeather]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // On mount: restore last city from localStorage or fall back to default
  useEffect(() => {
    let initialCity = DEFAULT_CITY;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && stored.trim()) {
        initialCity = stored.trim();
      }
    } catch {
      // localStorage unavailable
    }
    fetchWeather(initialCity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    loading,
    error,
    city,
    fetchWeather,
    retry,
    clearError,
  };
}
