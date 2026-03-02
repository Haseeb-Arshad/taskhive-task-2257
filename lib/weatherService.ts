import type {
  WeatherData,
  CurrentWeather,
  HourlyForecast,
  DailyForecast,
  WeatherAlert,
  AirQuality,
  SunMoonData,
  PollenData,
  WeatherCondition,
  WeatherConditionCode,
} from '@/types/weather';

const CITY_DATABASE: Record<
  string,
  {
    country: string;
    lat: number;
    lon: number;
    timezone: string;
    baseTempC: number;
    tempVariance: number;
    humidity: number;
    hasAlerts?: boolean;
  }
> = {
  'new york': {
    country: 'US',
    lat: 40.7128,
    lon: -74.006,
    timezone: 'America/New_York',
    baseTempC: 18,
    tempVariance: 8,
    humidity: 65,
    hasAlerts: true,
  },
  london: {
    country: 'GB',
    lat: 51.5074,
    lon: -0.1278,
    timezone: 'Europe/London',
    baseTempC: 12,
    tempVariance: 6,
    humidity: 78,
  },
  tokyo: {
    country: 'JP',
    lat: 35.6762,
    lon: 139.6503,
    timezone: 'Asia/Tokyo',
    baseTempC: 20,
    tempVariance: 9,
    humidity: 72,
  },
  paris: {
    country: 'FR',
    lat: 48.8566,
    lon: 2.3522,
    timezone: 'Europe/Paris',
    baseTempC: 14,
    tempVariance: 7,
    humidity: 70,
  },
  sydney: {
    country: 'AU',
    lat: -33.8688,
    lon: 151.2093,
    timezone: 'Australia/Sydney',
    baseTempC: 22,
    tempVariance: 8,
    humidity: 60,
  },
  dubai: {
    country: 'AE',
    lat: 25.2048,
    lon: 55.2708,
    timezone: 'Asia/Dubai',
    baseTempC: 35,
    tempVariance: 5,
    humidity: 50,
  },
  'los angeles': {
    country: 'US',
    lat: 34.0522,
    lon: -118.2437,
    timezone: 'America/Los_Angeles',
    baseTempC: 24,
    tempVariance: 6,
    humidity: 55,
  },
  chicago: {
    country: 'US',
    lat: 41.8781,
    lon: -87.6298,
    timezone: 'America/Chicago',
    baseTempC: 15,
    tempVariance: 10,
    humidity: 68,
    hasAlerts: true,
  },
  toronto: {
    country: 'CA',
    lat: 43.6532,
    lon: -79.3832,
    timezone: 'America/Toronto',
    baseTempC: 14,
    tempVariance: 9,
    humidity: 67,
  },
  berlin: {
    country: 'DE',
    lat: 52.52,
    lon: 13.405,
    timezone: 'Europe/Berlin',
    baseTempC: 11,
    tempVariance: 7,
    humidity: 73,
  },
  mumbai: {
    country: 'IN',
    lat: 19.076,
    lon: 72.8777,
    timezone: 'Asia/Kolkata',
    baseTempC: 30,
    tempVariance: 4,
    humidity: 80,
  },
  singapore: {
    country: 'SG',
    lat: 1.3521,
    lon: 103.8198,
    timezone: 'Asia/Singapore',
    baseTempC: 30,
    tempVariance: 3,
    humidity: 85,
  },
  'mexico city': {
    country: 'MX',
    lat: 19.4326,
    lon: -99.1332,
    timezone: 'America/Mexico_City',
    baseTempC: 19,
    tempVariance: 6,
    humidity: 58,
  },
  moscow: {
    country: 'RU',
    lat: 55.7558,
    lon: 37.6176,
    timezone: 'Europe/Moscow',
    baseTempC: 4,
    tempVariance: 12,
    humidity: 76,
  },
  cairo: {
    country: 'EG',
    lat: 30.0444,
    lon: 31.2357,
    timezone: 'Africa/Cairo',
    baseTempC: 28,
    tempVariance: 7,
    humidity: 40,
  },
};

const CONDITIONS: WeatherConditionCode[] = [
  'clear',
  'partly-cloudy',
  'cloudy',
  'overcast',
  'drizzle',
  'rain',
  'thunderstorm',
  'fog',
  'windy',
];

const CONDITION_META: Record<
  WeatherConditionCode,
  { label: string; description: string }
> = {
  clear: { label: 'Clear Sky', description: 'Bright sunshine with no clouds' },
  'partly-cloudy': {
    label: 'Partly Cloudy',
    description: 'Mix of sun and clouds',
  },
  cloudy: { label: 'Cloudy', description: 'Mostly cloudy skies' },
  overcast: { label: 'Overcast', description: 'Completely covered by clouds' },
  fog: { label: 'Foggy', description: 'Low visibility due to fog' },
  drizzle: { label: 'Drizzle', description: 'Light scattered drizzle' },
  rain: { label: 'Rain', description: 'Steady rainfall' },
  'heavy-rain': { label: 'Heavy Rain', description: 'Intense heavy rainfall' },
  thunderstorm: {
    label: 'Thunderstorm',
    description: 'Thunderstorms with lightning',
  },
  snow: { label: 'Snow', description: 'Snowfall expected' },
  sleet: { label: 'Sleet', description: 'Mixed rain and snow' },
  hail: { label: 'Hail', description: 'Hailstones falling' },
  windy: { label: 'Windy', description: 'Strong gusty winds' },
};

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return ((s >>> 0) / 0xffffffff);
  };
}

function pickCondition(rand: () => number, humidity: number): WeatherConditionCode {
  const r = rand();
  if (humidity > 80) {
    if (r < 0.3) return 'rain';
    if (r < 0.5) return 'cloudy';
    if (r < 0.65) return 'overcast';
    if (r < 0.75) return 'drizzle';
    if (r < 0.85) return 'thunderstorm';
    return 'fog';
  } else if (humidity > 65) {
    if (r < 0.35) return 'partly-cloudy';
    if (r < 0.55) return 'cloudy';
    if (r < 0.7) return 'clear';
    if (r < 0.82) return 'drizzle';
    if (r < 0.92) return 'rain';
    return 'overcast';
  } else {
    if (r < 0.45) return 'clear';
    if (r < 0.75) return 'partly-cloudy';
    if (r < 0.88) return 'cloudy';
    return 'windy';
  }
}

function buildCondition(
  code: WeatherConditionCode,
  hour: number
): WeatherCondition {
  const meta = CONDITION_META[code];
  return {
    code,
    label: meta.label,
    description: meta.description,
    isDay: hour >= 6 && hour < 20,
  };
}

function cToF(c: number): number {
  return Math.round(c * 9 / 5 + 32);
}

function generateCurrentWeather(
  cityKey: string,
  cityData: (typeof CITY_DATABASE)[string]
): CurrentWeather {
  const now = Date.now();
  const seed = Math.floor(now / (1000 * 60 * 30)) + cityKey.charCodeAt(0) * 37;
  const rand = seededRandom(seed);

  const hour = new Date().getHours();
  const dayProgress = hour / 24;
  const tempOffset = Math.sin(dayProgress * Math.PI * 2 - Math.PI / 2) * cityData.tempVariance;
  const tempC = cityData.baseTempC + tempOffset + (rand() - 0.5) * 3;
  const feelsLikeC = tempC - rand() * 4;
  const humidityVariance = (rand() - 0.5) * 15;
  const humidity = Math.max(20, Math.min(99, cityData.humidity + humidityVariance));
  const condition = pickCondition(rand, humidity);

  const nowSec = Math.floor(now / 1000);
  const todayMidnight = nowSec - (nowSec % 86400);
  const sunriseOffset = 6 * 3600 + Math.floor(rand() * 3600);
  const sunsetOffset = 19 * 3600 + Math.floor(rand() * 3600);

  return {
    city: cityKey
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
    country: cityData.country,
    coordinates: { lat: cityData.lat, lon: cityData.lon },
    temperature: Math.round(cToF(tempC)),
    feelsLike: Math.round(cToF(feelsLikeC)),
    humidity: Math.round(humidity),
    pressure: Math.round(1000 + rand() * 30 + 3),
    visibility: Math.round(8 + rand() * 8),
    windSpeed: Math.round(rand() * 20 + 3),
    windDegree: Math.round(rand() * 360),
    windGust: Math.round(rand() * 10 + 15),
    uvIndex: hour >= 6 && hour < 20 ? Math.round(rand() * 10 + 1) : 0,
    cloudCover: Math.round(rand() * 100),
    dewPoint: Math.round(cToF(tempC - rand() * 10 - 3)),
    condition: buildCondition(condition, hour),
    sunrise: todayMidnight + sunriseOffset,
    sunset: todayMidnight + sunsetOffset,
    timestamp: nowSec,
    timezone: cityData.timezone,
    high: Math.round(cToF(tempC + cityData.tempVariance * 0.6)),
    low: Math.round(cToF(tempC - cityData.tempVariance * 0.8)),
  };
}

function generateHourlyForecast(
  cityData: (typeof CITY_DATABASE)[string],
  baseTemp: number,
  seed: number
): HourlyForecast[] {
  const hours: HourlyForecast[] = [];
  const nowMs = Date.now();
  const nowSec = Math.floor(nowMs / 1000);
  const currentHour = Math.floor(nowSec / 3600) * 3600;

  for (let i = 0; i < 48; i++) {
    const ts = currentHour + i * 3600;
    const hr = new Date(ts * 1000).getHours();
    const rand = seededRandom(seed + i * 17 + 1337);
    const dayProg = hr / 24;
    const tempOffset =
      Math.sin(dayProg * Math.PI * 2 - Math.PI / 2) * cityData.tempVariance;
    const tempC =
      cityData.baseTempC + tempOffset + (rand() - 0.5) * 4;
    const humidity = Math.max(
      20,
      Math.min(99, cityData.humidity + (rand() - 0.5) * 20)
    );
    const condition = pickCondition(rand, humidity);
    const precipProb =
      condition === 'rain'
        ? 0.6 + rand() * 0.3
        : condition === 'drizzle'
        ? 0.3 + rand() * 0.3
        : condition === 'thunderstorm'
        ? 0.7 + rand() * 0.25
        : rand() * 0.2;

    hours.push({
      timestamp: ts,
      temperature: Math.round(cToF(tempC)),
      feelsLike: Math.round(cToF(tempC - rand() * 4)),
      humidity: Math.round(humidity),
      windSpeed: Math.round(rand() * 18 + 3),
      windDegree: Math.round(rand() * 360),
      precipProbability: Math.round(precipProb * 100),
      precipAmount: precipProb > 0.4 ? Math.round(rand() * 12 * 10) / 10 : 0,
      uvIndex: hr >= 6 && hr < 20 ? Math.round(rand() * 10 + 1) : 0,
      cloudCover: Math.round(rand() * 100),
      condition: buildCondition(condition, hr),
      pressure: Math.round(1005 + rand() * 25),
      dewPoint: Math.round(cToF(tempC - rand() * 12)),
    });
  }
  return hours;
}

function generateDailyForecast(
  cityData: (typeof CITY_DATABASE)[string],
  seed: number
): DailyForecast[] {
  const days: DailyForecast[] = [];
  const nowSec = Math.floor(Date.now() / 1000);
  const todayMidnight = nowSec - (nowSec % 86400);

  const summaries = [
    'Comfortable conditions throughout the day',
    'Some clouds but overall pleasant',
    'Expect periods of rain in the afternoon',
    'Bright and sunny with light breezes',
    'Partly cloudy with mild temperatures',
    'Morning fog clearing by midday',
    'Thunderstorms possible in the evening',
    'Cool and breezy with overcast skies',
  ];

  for (let d = 0; d < 7; d++) {
    const date = todayMidnight + d * 86400;
    const rand = seededRandom(seed + d * 7919 + 2053);
    const highC = cityData.baseTempC + cityData.tempVariance * 0.7 + (rand() - 0.4) * 6;
    const lowC = highC - cityData.tempVariance * 0.9 - rand() * 4;
    const humidity = Math.max(20, Math.min(98, cityData.humidity + (rand() - 0.5) * 18));
    const condition = pickCondition(rand, humidity);
    const precipProb =
      condition === 'rain'
        ? 0.55 + rand() * 0.35
        : condition === 'drizzle'
        ? 0.25 + rand() * 0.35
        : condition === 'thunderstorm'
        ? 0.65 + rand() * 0.3
        : rand() * 0.25;

    const sunriseOffset = 6 * 3600 + Math.floor(rand() * 3600);
    const sunsetOffset = 19 * 3600 + Math.floor(rand() * 3600);

    days.push({
      date,
      tempHigh: Math.round(cToF(highC)),
      tempLow: Math.round(cToF(lowC)),
      feelsLikeHigh: Math.round(cToF(highC - rand() * 3)),
      feelsLikeLow: Math.round(cToF(lowC - rand() * 5)),
      humidity: Math.round(humidity),
      windSpeed: Math.round(rand() * 20 + 4),
      windDegree: Math.round(rand() * 360),
      windGust: Math.round(rand() * 12 + 10),
      precipProbability: Math.round(precipProb * 100),
      precipAmount: precipProb > 0.4 ? Math.round(rand() * 20 * 10) / 10 : 0,
      uvIndexMax: Math.round(rand() * 10 + 1),
      cloudCover: Math.round(rand() * 100),
      condition: buildCondition(condition, 12),
      sunrise: date + sunriseOffset,
      sunset: date + sunsetOffset,
      moonPhase: Math.round(rand() * 100) / 100,
      pressure: Math.round(1005 + rand() * 25),
      summary: summaries[Math.floor(rand() * summaries.length)],
    });
  }
  return days;
}

function generateAlerts(cityKey: string, hasAlerts: boolean): WeatherAlert[] {
  if (!hasAlerts) return [];
  const now = Math.floor(Date.now() / 1000);
  return [
    {
      id: `alert-${cityKey}-001`,
      title: 'Wind Advisory',
      description:
        'Southwest winds 25 to 35 mph with gusts up to 55 mph expected. Gusty winds could blow around unsecured objects. Tree limbs could be blown down and a few power outages may result.',
      severity: 'moderate',
      event: 'Wind Advisory',
      start: now - 3600,
      end: now + 18000,
      areas: [
        cityKey
          .split(' ')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' '),
      ],
      source: 'National Weather Service',
    },
  ];
}

function generateAirQuality(seed: number): AirQuality {
  const rand = seededRandom(seed + 9999);
  const aqi = Math.round(rand() * 120 + 8);
  let category: AirQuality['category'];
  let label: string;
  let healthAdvice: string;
  let dominantPollutant: string;

  if (aqi <= 50) {
    category = 'good';
    label = 'Good';
    healthAdvice = 'Air quality is satisfactory. Outdoor activities are safe.';
    dominantPollutant = 'PM2.5';
  } else if (aqi <= 100) {
    category = 'moderate';
    label = 'Moderate';
    healthAdvice =
      'Acceptable air quality. Unusually sensitive individuals may experience symptoms.';
    dominantPollutant = 'O3';
  } else if (aqi <= 150) {
    category = 'unhealthy-sensitive';
    label = 'Unhealthy for Sensitive Groups';
    healthAdvice =
      'Sensitive groups should limit prolonged outdoor exertion.';
    dominantPollutant = 'PM10';
  } else {
    category = 'unhealthy';
    label = 'Unhealthy';
    healthAdvice =
      'Everyone may begin to experience health effects. Limit outdoor activity.';
    dominantPollutant = 'NO2';
  }

  return {
    aqi,
    category,
    label,
    pm25: Math.round(rand() * 50 * 10) / 10,
    pm10: Math.round(rand() * 80 * 10) / 10,
    o3: Math.round(rand() * 90 * 10) / 10,
    no2: Math.round(rand() * 60 * 10) / 10,
    so2: Math.round(rand() * 30 * 10) / 10,
    co: Math.round(rand() * 2 * 100) / 100,
    dominantPollutant,
    healthAdvice,
    timestamp: Math.floor(Date.now() / 1000),
  };
}

function generateSunMoon(seed: number): SunMoonData {
  const rand = seededRandom(seed + 5555);
  const nowSec = Math.floor(Date.now() / 1000);
  const todayMidnight = nowSec - (nowSec % 86400);
  const sunrise = todayMidnight + 6 * 3600 + Math.floor(rand() * 3600);
  const sunset = todayMidnight + 19 * 3600 + Math.floor(rand() * 3600);
  const solarNoon = Math.floor((sunrise + sunset) / 2);
  const moonPhase = Math.round(rand() * 100) / 100;

  const moonPhaseNames = [
    'New Moon',
    'Waxing Crescent',
    'First Quarter',
    'Waxing Gibbous',
    'Full Moon',
    'Waning Gibbous',
    'Last Quarter',
    'Waning Crescent',
  ];
  const moonPhaseName =
    moonPhaseNames[Math.floor(moonPhase * moonPhaseNames.length)];

  return {
    sunrise,
    sunset,
    solarNoon,
    goldenHourMorning: sunrise + 3600,
    goldenHourEvening: sunset - 3600,
    dayLength: sunset - sunrise,
    moonrise: todayMidnight + 20 * 3600 + Math.floor(rand() * 3600),
    moonset: todayMidnight + 6 * 3600 + Math.floor(rand() * 2400),
    moonPhase,
    moonPhaseName,
    moonIllumination: Math.round(rand() * 100),
  };
}

function generatePollen(seed: number): PollenData {
  const rand = seededRandom(seed + 7777);
  const tree = Math.round(rand() * 10);
  const grass = Math.round(rand() * 10);
  const ragweed = Math.round(rand() * 10);
  const max = Math.max(tree, grass, ragweed);
  let overall: PollenData['overall'];
  let dominantAllergen: string;

  if (max <= 2) overall = 'low';
  else if (max <= 5) overall = 'moderate';
  else if (max <= 8) overall = 'high';
  else overall = 'very-high';

  if (tree >= grass && tree >= ragweed) dominantAllergen = 'Tree pollen';
  else if (grass >= ragweed) dominantAllergen = 'Grass pollen';
  else dominantAllergen = 'Ragweed';

  return { tree, grass, ragweed, overall, dominantAllergen };
}

const weatherCache = new Map<string, { data: WeatherData; expiresAt: number }>();

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const normalizedCity = city.trim().toLowerCase();
  const cached = weatherCache.get(normalizedCity);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  await new Promise((resolve) => setTimeout(resolve, 400 + Math.random() * 300));

  const cityData =
    CITY_DATABASE[normalizedCity] ??
    generateFallbackCityData(normalizedCity);

  const seed =
    Math.floor(Date.now() / (1000 * 60 * 30)) +
    normalizedCity
      .split('')
      .reduce((acc, ch) => acc + ch.charCodeAt(0), 0) * 31;

  const current = generateCurrentWeather(normalizedCity, cityData);
  const hourly = generateHourlyForecast(cityData, current.temperature, seed);
  const daily = generateDailyForecast(cityData, seed);
  const alerts = generateAlerts(normalizedCity, cityData.hasAlerts ?? false);
  const airQuality = generateAirQuality(seed);
  const sunMoon = generateSunMoon(seed);
  const pollen = generatePollen(seed);

  const data: WeatherData = {
    current,
    hourly,
    daily,
    alerts,
    airQuality,
    sunMoon,
    pollen,
  };

  weatherCache.set(normalizedCity, { data, expiresAt: Date.now() + 5 * 60 * 1000 });
  return data;
}

function generateFallbackCityData(
  cityKey: string
): (typeof CITY_DATABASE)[string] {
  const hash = cityKey
    .split('')
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return {
    country: 'US',
    lat: 35 + (hash % 20),
    lon: -95 + (hash % 50),
    timezone: 'America/New_York',
    baseTempC: 15 + (hash % 20),
    tempVariance: 6 + (hash % 6),
    humidity: 50 + (hash % 35),
    hasAlerts: false,
  };
}

export function getPopularCities(): string[] {
  return Object.keys(CITY_DATABASE).map((k) =>
    k
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  );
}
