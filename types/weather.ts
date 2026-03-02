export interface Coordinates {
  lat: number;
  lon: number;
}

export type WeatherConditionCode =
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'overcast'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'heavy-rain'
  | 'thunderstorm'
  | 'snow'
  | 'sleet'
  | 'hail'
  | 'windy';

export interface WeatherCondition {
  code: WeatherConditionCode;
  label: string;
  description: string;
  isDay: boolean;
}

export interface CurrentWeather {
  city: string;
  country: string;
  coordinates: Coordinates;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  visibility: number;
  windSpeed: number;
  windDegree: number;
  windGust: number;
  uvIndex: number;
  cloudCover: number;
  dewPoint: number;
  condition: WeatherCondition;
  sunrise: number;
  sunset: number;
  timestamp: number;
  timezone: string;
  high: number;
  low: number;
}

export interface HourlyForecast {
  timestamp: number;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDegree: number;
  precipProbability: number;
  precipAmount: number;
  uvIndex: number;
  cloudCover: number;
  condition: WeatherCondition;
  pressure: number;
  dewPoint: number;
}

export interface DailyForecast {
  date: number;
  tempHigh: number;
  tempLow: number;
  feelsLikeHigh: number;
  feelsLikeLow: number;
  humidity: number;
  windSpeed: number;
  windDegree: number;
  windGust: number;
  precipProbability: number;
  precipAmount: number;
  uvIndexMax: number;
  cloudCover: number;
  condition: WeatherCondition;
  sunrise: number;
  sunset: number;
  moonPhase: number;
  pressure: number;
  summary: string;
}

export type AlertSeverity = 'minor' | 'moderate' | 'severe' | 'extreme';

export interface WeatherAlert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  event: string;
  start: number;
  end: number;
  areas: string[];
  source: string;
}

export type AQICategory =
  | 'good'
  | 'moderate'
  | 'unhealthy-sensitive'
  | 'unhealthy'
  | 'very-unhealthy'
  | 'hazardous';

export interface AirQuality {
  aqi: number;
  category: AQICategory;
  label: string;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  so2: number;
  co: number;
  dominantPollutant: string;
  healthAdvice: string;
  timestamp: number;
}

export interface SunMoonData {
  sunrise: number;
  sunset: number;
  solarNoon: number;
  goldenHourMorning: number;
  goldenHourEvening: number;
  dayLength: number;
  moonrise: number;
  moonset: number;
  moonPhase: number;
  moonPhaseName: string;
  moonIllumination: number;
}

export interface PollenData {
  tree: number;
  grass: number;
  ragweed: number;
  overall: 'low' | 'moderate' | 'high' | 'very-high';
  dominantAllergen: string;
}

export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  alerts: WeatherAlert[];
  airQuality: AirQuality;
  sunMoon: SunMoonData;
  pollen: PollenData;
}
