import type { WeatherConditionCode, AQICategory } from '@/types/weather';

export function getWeatherIcon(
  code: WeatherConditionCode,
  isDay: boolean
): string {
  const icons: Record<WeatherConditionCode, { day: string; night: string }> = {
    clear: { day: 'sun', night: 'moon' },
    'partly-cloudy': { day: 'cloud-sun', night: 'cloud-moon' },
    cloudy: { day: 'cloud', night: 'cloud' },
    overcast: { day: 'clouds', night: 'clouds' },
    fog: { day: 'cloud-fog', night: 'cloud-fog' },
    drizzle: { day: 'cloud-drizzle', night: 'cloud-drizzle' },
    rain: { day: 'cloud-rain', night: 'cloud-rain' },
    'heavy-rain': { day: 'cloud-rain-wind', night: 'cloud-rain-wind' },
    thunderstorm: { day: 'cloud-lightning', night: 'cloud-lightning' },
    snow: { day: 'cloud-snow', night: 'cloud-snow' },
    sleet: { day: 'cloud-sleet', night: 'cloud-sleet' },
    hail: { day: 'cloud-hail', night: 'cloud-hail' },
    windy: { day: 'wind', night: 'wind' },
  };
  const entry = icons[code] ?? icons['cloudy'];
  return isDay ? entry.day : entry.night;
}

export function getWeatherEmoji(
  code: WeatherConditionCode,
  isDay: boolean
): string {
  const emojiMap: Record<WeatherConditionCode, { day: string; night: string }> = {
    clear: { day: 'CLEAR_DAY', night: 'CLEAR_NIGHT' },
    'partly-cloudy': { day: 'PARTLY_CLOUDY_DAY', night: 'PARTLY_CLOUDY_NIGHT' },
    cloudy: { day: 'CLOUDY', night: 'CLOUDY' },
    overcast: { day: 'OVERCAST', night: 'OVERCAST' },
    fog: { day: 'FOG', night: 'FOG' },
    drizzle: { day: 'DRIZZLE', night: 'DRIZZLE' },
    rain: { day: 'RAIN', night: 'RAIN' },
    'heavy-rain': { day: 'HEAVY_RAIN', night: 'HEAVY_RAIN' },
    thunderstorm: { day: 'THUNDERSTORM', night: 'THUNDERSTORM' },
    snow: { day: 'SNOW', night: 'SNOW' },
    sleet: { day: 'SLEET', night: 'SLEET' },
    hail: { day: 'HAIL', night: 'HAIL' },
    windy: { day: 'WINDY', night: 'WINDY' },
  };
  const entry = emojiMap[code] ?? emojiMap['cloudy'];
  return isDay ? entry.day : entry.night;
}

const WIND_DIRECTIONS = [
  'N', 'NNE', 'NE', 'ENE',
  'E', 'ESE', 'SE', 'SSE',
  'S', 'SSW', 'SW', 'WSW',
  'W', 'WNW', 'NW', 'NNW',
];

export function getWindDirection(degrees: number): string {
  const normalized = ((degrees % 360) + 360) % 360;
  const index = Math.round(normalized / 22.5) % 16;
  return WIND_DIRECTIONS[index];
}

export function getWindDirectionFull(degrees: number): string {
  const short = getWindDirection(degrees);
  const fullNames: Record<string, string> = {
    N: 'North',
    NNE: 'North-Northeast',
    NE: 'Northeast',
    ENE: 'East-Northeast',
    E: 'East',
    ESE: 'East-Southeast',
    SE: 'Southeast',
    SSE: 'South-Southeast',
    S: 'South',
    SSW: 'South-Southwest',
    SW: 'Southwest',
    WSW: 'West-Southwest',
    W: 'West',
    WNW: 'West-Northwest',
    NW: 'Northwest',
    NNW: 'North-Northwest',
  };
  return fullNames[short] ?? short;
}

export function formatTime(unixSeconds: number, format: '12h' | '24h' = '12h'): string {
  const date = new Date(unixSeconds * 1000);
  if (format === '24h') {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatShortTime(unixSeconds: number): string {
  const date = new Date(unixSeconds * 1000);
  const h = date.getHours();
  if (h === 0) return '12am';
  if (h === 12) return '12pm';
  return h < 12 ? `${h}am` : `${h - 12}pm`;
}

export function formatDate(
  unixSeconds: number,
  options?: Intl.DateTimeFormatOptions
): string {
  const date = new Date(unixSeconds * 1000);
  return date.toLocaleDateString('en-US', options ?? { weekday: 'short', month: 'short', day: 'numeric' });
}

export function formatShortDate(unixSeconds: number): string {
  const date = new Date(unixSeconds * 1000);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export interface AQIInfo {
  label: string;
  description: string;
  color: string;
  bgColor: string;
  textColor: string;
  range: string;
}

export function getAQILabel(aqi: number): AQIInfo {
  if (aqi <= 50) {
    return {
      label: 'Good',
      description: 'Air quality is satisfactory with little to no risk.',
      color: '#22c55e',
      bgColor: 'bg-green-500/15',
      textColor: 'text-green-400',
      range: '0 - 50',
    };
  } else if (aqi <= 100) {
    return {
      label: 'Moderate',
      description: 'Acceptable quality; sensitive individuals may notice effects.',
      color: '#eab308',
      bgColor: 'bg-yellow-500/15',
      textColor: 'text-yellow-400',
      range: '51 - 100',
    };
  } else if (aqi <= 150) {
    return {
      label: 'Unhealthy for Sensitive Groups',
      description: 'Sensitive groups should reduce prolonged outdoor exertion.',
      color: '#f97316',
      bgColor: 'bg-orange-500/15',
      textColor: 'text-orange-400',
      range: '101 - 150',
    };
  } else if (aqi <= 200) {
    return {
      label: 'Unhealthy',
      description: 'Everyone may experience health effects. Reduce outdoor time.',
      color: '#ef4444',
      bgColor: 'bg-red-500/15',
      textColor: 'text-red-400',
      range: '151 - 200',
    };
  } else if (aqi <= 300) {
    return {
      label: 'Very Unhealthy',
      description: 'Health warnings of emergency conditions. Avoid outdoor activity.',
      color: '#a855f7',
      bgColor: 'bg-purple-500/15',
      textColor: 'text-purple-400',
      range: '201 - 300',
    };
  } else {
    return {
      label: 'Hazardous',
      description: 'Serious health effects for everyone. Stay indoors.',
      color: '#7f1d1d',
      bgColor: 'bg-red-900/30',
      textColor: 'text-red-300',
      range: '301+',
    };
  }
}

export function getAQICategoryInfo(category: AQICategory): AQIInfo {
  const map: Record<AQICategory, AQIInfo> = {
    good: {
      label: 'Good',
      description: 'Air quality is satisfactory with little to no risk.',
      color: '#22c55e',
      bgColor: 'bg-green-500/15',
      textColor: 'text-green-400',
      range: '0 - 50',
    },
    moderate: {
      label: 'Moderate',
      description: 'Acceptable quality; sensitive individuals may notice effects.',
      color: '#eab308',
      bgColor: 'bg-yellow-500/15',
      textColor: 'text-yellow-400',
      range: '51 - 100',
    },
    'unhealthy-sensitive': {
      label: 'Unhealthy for Sensitive Groups',
      description: 'Sensitive groups should reduce prolonged outdoor exertion.',
      color: '#f97316',
      bgColor: 'bg-orange-500/15',
      textColor: 'text-orange-400',
      range: '101 - 150',
    },
    unhealthy: {
      label: 'Unhealthy',
      description: 'Everyone may experience health effects. Reduce outdoor time.',
      color: '#ef4444',
      bgColor: 'bg-red-500/15',
      textColor: 'text-red-400',
      range: '151 - 200',
    },
    'very-unhealthy': {
      label: 'Very Unhealthy',
      description: 'Health warnings of emergency conditions. Avoid outdoor activity.',
      color: '#a855f7',
      bgColor: 'bg-purple-500/15',
      textColor: 'text-purple-400',
      range: '201 - 300',
    },
    hazardous: {
      label: 'Hazardous',
      description: 'Serious health effects for everyone. Stay indoors.',
      color: '#7f1d1d',
      bgColor: 'bg-red-900/30',
      textColor: 'text-red-300',
      range: '301+',
    },
  };
  return map[category];
}

export interface UVInfo {
  label: string;
  description: string;
  spfRecommendation: string;
  color: string;
  bgColor: string;
  textColor: string;
}

export function getUVIndexLabel(uv: number): UVInfo {
  if (uv <= 2) {
    return {
      label: 'Low',
      description: 'No protection needed for most people.',
      spfRecommendation: 'SPF 15+ optional',
      color: '#22c55e',
      bgColor: 'bg-green-500/15',
      textColor: 'text-green-400',
    };
  } else if (uv <= 5) {
    return {
      label: 'Moderate',
      description: 'Some protection recommended.',
      spfRecommendation: 'SPF 30+ recommended',
      color: '#eab308',
      bgColor: 'bg-yellow-500/15',
      textColor: 'text-yellow-400',
    };
  } else if (uv <= 7) {
    return {
      label: 'High',
      description: 'Protection essential. Seek shade midday.',
      spfRecommendation: 'SPF 30-50+ required',
      color: '#f97316',
      bgColor: 'bg-orange-500/15',
      textColor: 'text-orange-400',
    };
  } else if (uv <= 10) {
    return {
      label: 'Very High',
      description: 'Extra precautions needed. Unprotected skin burns quickly.',
      spfRecommendation: 'SPF 50+ essential',
      color: '#ef4444',
      bgColor: 'bg-red-500/15',
      textColor: 'text-red-400',
    };
  } else {
    return {
      label: 'Extreme',
      description: 'Take all precautions. Avoid midday sun.',
      spfRecommendation: 'SPF 50+ + protective clothing',
      color: '#a855f7',
      bgColor: 'bg-purple-500/15',
      textColor: 'text-purple-400',
    };
  }
}

export function getPollenLabel(
  level: number
): { label: string; color: string; textColor: string } {
  if (level <= 2) return { label: 'Low', color: '#22c55e', textColor: 'text-green-400' };
  if (level <= 5) return { label: 'Moderate', color: '#eab308', textColor: 'text-yellow-400' };
  if (level <= 8) return { label: 'High', color: '#f97316', textColor: 'text-orange-400' };
  return { label: 'Very High', color: '#ef4444', textColor: 'text-red-400' };
}

export function getMoonPhaseName(phase: number): string {
  const phases = [
    'New Moon',
    'Waxing Crescent',
    'First Quarter',
    'Waxing Gibbous',
    'Full Moon',
    'Waning Gibbous',
    'Last Quarter',
    'Waning Crescent',
  ];
  const idx = Math.round(phase * (phases.length - 1));
  return phases[Math.min(idx, phases.length - 1)];
}

export function celsiusToFahrenheit(c: number): number {
  return Math.round(c * 9 / 5 + 32);
}

export function fahrenheitToCelsius(f: number): number {
  return Math.round((f - 32) * 5 / 9);
}

export function getTemperatureColor(tempF: number): string {
  if (tempF <= 32) return 'text-blue-300';
  if (tempF <= 50) return 'text-blue-400';
  if (tempF <= 65) return 'text-cyan-400';
  if (tempF <= 80) return 'text-green-400';
  if (tempF <= 90) return 'text-yellow-400';
  if (tempF <= 100) return 'text-orange-400';
  return 'text-red-400';
}

export function getPrecipitationLabel(probability: number): string {
  if (probability < 10) return 'Very unlikely';
  if (probability < 30) return 'Slight chance';
  if (probability < 50) return 'Possible';
  if (probability < 70) return 'Likely';
  if (probability < 90) return 'Very likely';
  return 'Almost certain';
}

export function getHumidityLabel(humidity: number): string {
  if (humidity < 30) return 'Very Dry';
  if (humidity < 40) return 'Dry';
  if (humidity < 60) return 'Comfortable';
  if (humidity < 75) return 'Humid';
  return 'Very Humid';
}

export function getVisibilityLabel(visibilityMiles: number): string {
  if (visibilityMiles < 0.25) return 'Dense fog';
  if (visibilityMiles < 1) return 'Fog';
  if (visibilityMiles < 3) return 'Mist';
  if (visibilityMiles < 6) return 'Haze';
  if (visibilityMiles < 10) return 'Clear';
  return 'Excellent';
}

export function getPressureTrend(hpa: number): { label: string; icon: string } {
  if (hpa < 1009) return { label: 'Low pressure — unsettled', icon: 'arrow-down' };
  if (hpa < 1013) return { label: 'Slightly low — changeable', icon: 'minus' };
  if (hpa < 1022) return { label: 'Normal — stable', icon: 'minus' };
  return { label: 'High pressure — settled', icon: 'arrow-up' };
}
