import { NextRequest, NextResponse } from 'next/server';

interface CitySuggestion {
  name: string;
  country: string;
  region: string;
  displayName: string;
}

// Comprehensive list of world cities for suggestion matching
const CITY_DATABASE: CitySuggestion[] = [
  // United States
  { name: 'New York', country: 'US', region: 'New York', displayName: 'New York, NY, US' },
  { name: 'Los Angeles', country: 'US', region: 'California', displayName: 'Los Angeles, CA, US' },
  { name: 'Chicago', country: 'US', region: 'Illinois', displayName: 'Chicago, IL, US' },
  { name: 'Houston', country: 'US', region: 'Texas', displayName: 'Houston, TX, US' },
  { name: 'Phoenix', country: 'US', region: 'Arizona', displayName: 'Phoenix, AZ, US' },
  { name: 'Philadelphia', country: 'US', region: 'Pennsylvania', displayName: 'Philadelphia, PA, US' },
  { name: 'San Antonio', country: 'US', region: 'Texas', displayName: 'San Antonio, TX, US' },
  { name: 'San Diego', country: 'US', region: 'California', displayName: 'San Diego, CA, US' },
  { name: 'Dallas', country: 'US', region: 'Texas', displayName: 'Dallas, TX, US' },
  { name: 'San Jose', country: 'US', region: 'California', displayName: 'San Jose, CA, US' },
  { name: 'Austin', country: 'US', region: 'Texas', displayName: 'Austin, TX, US' },
  { name: 'Jacksonville', country: 'US', region: 'Florida', displayName: 'Jacksonville, FL, US' },
  { name: 'Fort Worth', country: 'US', region: 'Texas', displayName: 'Fort Worth, TX, US' },
  { name: 'Columbus', country: 'US', region: 'Ohio', displayName: 'Columbus, OH, US' },
  { name: 'Charlotte', country: 'US', region: 'North Carolina', displayName: 'Charlotte, NC, US' },
  { name: 'San Francisco', country: 'US', region: 'California', displayName: 'San Francisco, CA, US' },
  { name: 'Indianapolis', country: 'US', region: 'Indiana', displayName: 'Indianapolis, IN, US' },
  { name: 'Seattle', country: 'US', region: 'Washington', displayName: 'Seattle, WA, US' },
  { name: 'Denver', country: 'US', region: 'Colorado', displayName: 'Denver, CO, US' },
  { name: 'Nashville', country: 'US', region: 'Tennessee', displayName: 'Nashville, TN, US' },
  { name: 'Oklahoma City', country: 'US', region: 'Oklahoma', displayName: 'Oklahoma City, OK, US' },
  { name: 'El Paso', country: 'US', region: 'Texas', displayName: 'El Paso, TX, US' },
  { name: 'Washington', country: 'US', region: 'DC', displayName: 'Washington, DC, US' },
  { name: 'Boston', country: 'US', region: 'Massachusetts', displayName: 'Boston, MA, US' },
  { name: 'Las Vegas', country: 'US', region: 'Nevada', displayName: 'Las Vegas, NV, US' },
  { name: 'Memphis', country: 'US', region: 'Tennessee', displayName: 'Memphis, TN, US' },
  { name: 'Louisville', country: 'US', region: 'Kentucky', displayName: 'Louisville, KY, US' },
  { name: 'Baltimore', country: 'US', region: 'Maryland', displayName: 'Baltimore, MD, US' },
  { name: 'Milwaukee', country: 'US', region: 'Wisconsin', displayName: 'Milwaukee, WI, US' },
  { name: 'Albuquerque', country: 'US', region: 'New Mexico', displayName: 'Albuquerque, NM, US' },
  { name: 'Tucson', country: 'US', region: 'Arizona', displayName: 'Tucson, AZ, US' },
  { name: 'Fresno', country: 'US', region: 'California', displayName: 'Fresno, CA, US' },
  { name: 'Sacramento', country: 'US', region: 'California', displayName: 'Sacramento, CA, US' },
  { name: 'Atlanta', country: 'US', region: 'Georgia', displayName: 'Atlanta, GA, US' },
  { name: 'Miami', country: 'US', region: 'Florida', displayName: 'Miami, FL, US' },
  { name: 'Minneapolis', country: 'US', region: 'Minnesota', displayName: 'Minneapolis, MN, US' },
  { name: 'Portland', country: 'US', region: 'Oregon', displayName: 'Portland, OR, US' },
  { name: 'Raleigh', country: 'US', region: 'North Carolina', displayName: 'Raleigh, NC, US' },
  { name: 'Tampa', country: 'US', region: 'Florida', displayName: 'Tampa, FL, US' },
  { name: 'Pittsburgh', country: 'US', region: 'Pennsylvania', displayName: 'Pittsburgh, PA, US' },
  // Europe
  { name: 'London', country: 'GB', region: 'England', displayName: 'London, England, GB' },
  { name: 'Paris', country: 'FR', region: 'Ile-de-France', displayName: 'Paris, Ile-de-France, FR' },
  { name: 'Berlin', country: 'DE', region: 'Berlin', displayName: 'Berlin, DE' },
  { name: 'Madrid', country: 'ES', region: 'Community of Madrid', displayName: 'Madrid, ES' },
  { name: 'Rome', country: 'IT', region: 'Lazio', displayName: 'Rome, Lazio, IT' },
  { name: 'Amsterdam', country: 'NL', region: 'North Holland', displayName: 'Amsterdam, NL' },
  { name: 'Brussels', country: 'BE', region: 'Brussels', displayName: 'Brussels, BE' },
  { name: 'Vienna', country: 'AT', region: 'Vienna', displayName: 'Vienna, AT' },
  { name: 'Stockholm', country: 'SE', region: 'Stockholm', displayName: 'Stockholm, SE' },
  { name: 'Oslo', country: 'NO', region: 'Oslo', displayName: 'Oslo, NO' },
  { name: 'Copenhagen', country: 'DK', region: 'Capital Region', displayName: 'Copenhagen, DK' },
  { name: 'Helsinki', country: 'FI', region: 'Uusimaa', displayName: 'Helsinki, FI' },
  { name: 'Zurich', country: 'CH', region: 'Zurich', displayName: 'Zurich, CH' },
  { name: 'Lisbon', country: 'PT', region: 'Lisbon', displayName: 'Lisbon, PT' },
  { name: 'Athens', country: 'GR', region: 'Attica', displayName: 'Athens, Attica, GR' },
  { name: 'Warsaw', country: 'PL', region: 'Masovian', displayName: 'Warsaw, PL' },
  { name: 'Prague', country: 'CZ', region: 'Prague', displayName: 'Prague, CZ' },
  { name: 'Budapest', country: 'HU', region: 'Budapest', displayName: 'Budapest, HU' },
  { name: 'Bucharest', country: 'RO', region: 'Ilfov', displayName: 'Bucharest, RO' },
  { name: 'Dublin', country: 'IE', region: 'Leinster', displayName: 'Dublin, IE' },
  { name: 'Munich', country: 'DE', region: 'Bavaria', displayName: 'Munich, Bavaria, DE' },
  { name: 'Hamburg', country: 'DE', region: 'Hamburg', displayName: 'Hamburg, DE' },
  { name: 'Barcelona', country: 'ES', region: 'Catalonia', displayName: 'Barcelona, Catalonia, ES' },
  { name: 'Milan', country: 'IT', region: 'Lombardy', displayName: 'Milan, Lombardy, IT' },
  // Asia
  { name: 'Tokyo', country: 'JP', region: 'Tokyo', displayName: 'Tokyo, JP' },
  { name: 'Shanghai', country: 'CN', region: 'Shanghai', displayName: 'Shanghai, CN' },
  { name: 'Beijing', country: 'CN', region: 'Beijing', displayName: 'Beijing, CN' },
  { name: 'Mumbai', country: 'IN', region: 'Maharashtra', displayName: 'Mumbai, Maharashtra, IN' },
  { name: 'Delhi', country: 'IN', region: 'Delhi', displayName: 'Delhi, IN' },
  { name: 'Bangalore', country: 'IN', region: 'Karnataka', displayName: 'Bangalore, Karnataka, IN' },
  { name: 'Singapore', country: 'SG', region: 'Singapore', displayName: 'Singapore, SG' },
  { name: 'Seoul', country: 'KR', region: 'Seoul', displayName: 'Seoul, KR' },
  { name: 'Bangkok', country: 'TH', region: 'Bangkok', displayName: 'Bangkok, TH' },
  { name: 'Jakarta', country: 'ID', region: 'Jakarta', displayName: 'Jakarta, ID' },
  { name: 'Kuala Lumpur', country: 'MY', region: 'Kuala Lumpur', displayName: 'Kuala Lumpur, MY' },
  { name: 'Hong Kong', country: 'HK', region: 'Hong Kong', displayName: 'Hong Kong, HK' },
  { name: 'Taipei', country: 'TW', region: 'Taipei', displayName: 'Taipei, TW' },
  { name: 'Osaka', country: 'JP', region: 'Osaka', displayName: 'Osaka, JP' },
  { name: 'Karachi', country: 'PK', region: 'Sindh', displayName: 'Karachi, Sindh, PK' },
  { name: 'Lahore', country: 'PK', region: 'Punjab', displayName: 'Lahore, Punjab, PK' },
  { name: 'Dhaka', country: 'BD', region: 'Dhaka', displayName: 'Dhaka, BD' },
  { name: 'Colombo', country: 'LK', region: 'Western', displayName: 'Colombo, LK' },
  { name: 'Hanoi', country: 'VN', region: 'Hanoi', displayName: 'Hanoi, VN' },
  { name: 'Ho Chi Minh City', country: 'VN', region: 'Ho Chi Minh', displayName: 'Ho Chi Minh City, VN' },
  { name: 'Manila', country: 'PH', region: 'Metro Manila', displayName: 'Manila, Metro Manila, PH' },
  { name: 'Riyadh', country: 'SA', region: 'Riyadh', displayName: 'Riyadh, SA' },
  { name: 'Dubai', country: 'AE', region: 'Dubai', displayName: 'Dubai, AE' },
  { name: 'Istanbul', country: 'TR', region: 'Istanbul', displayName: 'Istanbul, TR' },
  { name: 'Tehran', country: 'IR', region: 'Tehran', displayName: 'Tehran, IR' },
  // Americas
  { name: 'Toronto', country: 'CA', region: 'Ontario', displayName: 'Toronto, Ontario, CA' },
  { name: 'Vancouver', country: 'CA', region: 'British Columbia', displayName: 'Vancouver, BC, CA' },
  { name: 'Montreal', country: 'CA', region: 'Quebec', displayName: 'Montreal, Quebec, CA' },
  { name: 'Calgary', country: 'CA', region: 'Alberta', displayName: 'Calgary, Alberta, CA' },
  { name: 'Mexico City', country: 'MX', region: 'CDMX', displayName: 'Mexico City, MX' },
  { name: 'Sao Paulo', country: 'BR', region: 'Sao Paulo', displayName: 'Sao Paulo, BR' },
  { name: 'Rio de Janeiro', country: 'BR', region: 'Rio de Janeiro', displayName: 'Rio de Janeiro, BR' },
  { name: 'Buenos Aires', country: 'AR', region: 'Buenos Aires', displayName: 'Buenos Aires, AR' },
  { name: 'Santiago', country: 'CL', region: 'Santiago', displayName: 'Santiago, CL' },
  { name: 'Bogota', country: 'CO', region: 'Bogota', displayName: 'Bogota, CO' },
  { name: 'Lima', country: 'PE', region: 'Lima', displayName: 'Lima, PE' },
  { name: 'Caracas', country: 'VE', region: 'Capital District', displayName: 'Caracas, VE' },
  // Africa & Oceania
  { name: 'Cairo', country: 'EG', region: 'Cairo', displayName: 'Cairo, EG' },
  { name: 'Lagos', country: 'NG', region: 'Lagos', displayName: 'Lagos, NG' },
  { name: 'Nairobi', country: 'KE', region: 'Nairobi', displayName: 'Nairobi, KE' },
  { name: 'Cape Town', country: 'ZA', region: 'Western Cape', displayName: 'Cape Town, ZA' },
  { name: 'Johannesburg', country: 'ZA', region: 'Gauteng', displayName: 'Johannesburg, ZA' },
  { name: 'Casablanca', country: 'MA', region: 'Casablanca', displayName: 'Casablanca, MA' },
  { name: 'Addis Ababa', country: 'ET', region: 'Addis Ababa', displayName: 'Addis Ababa, ET' },
  { name: 'Accra', country: 'GH', region: 'Greater Accra', displayName: 'Accra, GH' },
  { name: 'Sydney', country: 'AU', region: 'New South Wales', displayName: 'Sydney, NSW, AU' },
  { name: 'Melbourne', country: 'AU', region: 'Victoria', displayName: 'Melbourne, VIC, AU' },
  { name: 'Brisbane', country: 'AU', region: 'Queensland', displayName: 'Brisbane, QLD, AU' },
  { name: 'Perth', country: 'AU', region: 'Western Australia', displayName: 'Perth, WA, AU' },
  { name: 'Auckland', country: 'NZ', region: 'Auckland', displayName: 'Auckland, NZ' },
];

function scoreMatch(city: CitySuggestion, query: string): number {
  const normalizedQuery = query.toLowerCase().trim();
  const normalizedName = city.name.toLowerCase();
  const normalizedDisplay = city.displayName.toLowerCase();

  // Exact match gets highest priority
  if (normalizedName === normalizedQuery) return 100;

  // Starts with query - very high priority
  if (normalizedName.startsWith(normalizedQuery)) return 90;

  // Display name starts with query
  if (normalizedDisplay.startsWith(normalizedQuery)) return 80;

  // City name contains query as a whole word
  const wordBoundaryRegex = new RegExp(`\\b${normalizedQuery}`, 'i');
  if (wordBoundaryRegex.test(normalizedName)) return 70;

  // Any part of city name contains query
  if (normalizedName.includes(normalizedQuery)) return 60;

  // Display name contains query
  if (normalizedDisplay.includes(normalizedQuery)) return 40;

  return 0;
}

function getSuggestions(query: string, limit: number): CitySuggestion[] {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) return [];

  const scored = CITY_DATABASE
    .map((city) => ({ city, score: scoreMatch(city, normalizedQuery) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      // Sort by score descending, then alphabetically by name
      if (b.score !== a.score) return b.score - a.score;
      return a.city.name.localeCompare(b.city.name);
    })
    .slice(0, limit)
    .map(({ city }) => city);

  return scored;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query') ?? searchParams.get('q') ?? '';
  const limitParam = searchParams.get('limit');

  if (!query || query.trim().length === 0) {
    return NextResponse.json(
      { ok: true, data: [], meta: { count: 0, query: '' } },
      { status: 200 }
    );
  }

  const trimmedQuery = query.trim();

  if (trimmedQuery.length < 1) {
    return NextResponse.json(
      { ok: true, data: [], meta: { count: 0, query: trimmedQuery } },
      { status: 200 }
    );
  }

  if (trimmedQuery.length > 100) {
    return NextResponse.json(
      {
        error: 'Query must not exceed 100 characters',
        code: 'QUERY_TOO_LONG',
      },
      { status: 400 }
    );
  }

  let limit = 8;
  if (limitParam) {
    const parsed = parseInt(limitParam, 10);
    if (!isNaN(parsed) && parsed > 0 && parsed <= 20) {
      limit = parsed;
    }
  }

  try {
    const suggestions = getSuggestions(trimmedQuery, limit);

    return NextResponse.json(
      {
        ok: true,
        data: suggestions,
        meta: {
          count: suggestions.length,
          query: trimmedQuery,
          timestamp: new Date().toISOString(),
        },
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error: unknown) {
    console.error('[Suggestions API] Failed to generate suggestions:', error);
    return NextResponse.json(
      {
        error: 'Failed to retrieve city suggestions.',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    );
  }
}
