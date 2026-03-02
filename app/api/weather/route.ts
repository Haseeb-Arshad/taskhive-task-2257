import { NextRequest, NextResponse } from 'next/server';
import { getWeatherByCity } from '@/lib/weatherService';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');

  if (!city || city.trim().length === 0) {
    return NextResponse.json(
      {
        error: 'Missing required query parameter: city',
        code: 'MISSING_CITY_PARAM',
      },
      { status: 400 }
    );
  }

  const normalizedCity = city.trim();

  if (normalizedCity.length < 2) {
    return NextResponse.json(
      {
        error: 'City name must be at least 2 characters long',
        code: 'INVALID_CITY_PARAM',
      },
      { status: 400 }
    );
  }

  if (normalizedCity.length > 100) {
    return NextResponse.json(
      {
        error: 'City name must not exceed 100 characters',
        code: 'INVALID_CITY_PARAM',
      },
      { status: 400 }
    );
  }

  try {
    const weatherData = await getWeatherByCity(normalizedCity);

    if (!weatherData) {
      return NextResponse.json(
        {
          error: `No weather data found for city: ${normalizedCity}`,
          code: 'CITY_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        data: weatherData,
        meta: {
          city: normalizedCity,
          timestamp: new Date().toISOString(),
          cached: false,
        },
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error: unknown) {
    console.error('[Weather API] Failed to fetch weather data:', error);

    const isNotFound =
      error instanceof Error &&
      (error.message.toLowerCase().includes('not found') ||
        error.message.toLowerCase().includes('no data'));

    if (isNotFound) {
      return NextResponse.json(
        {
          error: `City not found: ${normalizedCity}`,
          code: 'CITY_NOT_FOUND',
          suggestion: 'Check the spelling or try a nearby major city.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to retrieve weather data. Please try again shortly.',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    );
  }
}
