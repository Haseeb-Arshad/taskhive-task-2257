'use client';

import { WeatherData } from '@/types/weather';
import {
  Drop,
  Wind,
  Sun,
  Eye,
  Gauge,
  Thermometer,
  ArrowUp,
} from '@phosphor-icons/react';

interface WeatherMetricsProps {
  data: WeatherData;
  unit: 'C' | 'F';
}

function getUVLabel(uvi: number): { label: string; color: string } {
  if (uvi <= 2) return { label: 'Low', color: 'text-emerald-400' };
  if (uvi <= 5) return { label: 'Moderate', color: 'text-yellow-400' };
  if (uvi <= 7) return { label: 'High', color: 'text-orange-400' };
  if (uvi <= 10) return { label: 'Very High', color: 'text-red-400' };
  return { label: 'Extreme', color: 'text-purple-400' };
}

function getWindDirection(deg: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
}

function getHumidityLabel(humidity: number): string {
  if (humidity < 30) return 'Dry';
  if (humidity < 60) return 'Comfortable';
  if (humidity < 80) return 'Humid';
  return 'Very Humid';
}

function getVisibilityLabel(vis: number): string {
  const km = vis / 1000;
  if (km >= 10) return 'Excellent';
  if (km >= 5) return 'Good';
  if (km >= 2) return 'Moderate';
  return 'Poor';
}

function MetricCard({
  icon,
  label,
  value,
  subValue,
  accent = 'sky',
  extraContent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  accent?: string;
  extraContent?: React.ReactNode;
}) {
  return (
    <div
      className="
        relative overflow-hidden
        rounded-2xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
        p-5
        transition-all duration-200 hover:bg-white/8 hover:border-white/15
        group
      "
    >
      <div className="flex items-start justify-between gap-2 mb-4">
        <span className="text-white/40 text-xs uppercase tracking-widest font-semibold">
          {label}
        </span>
        <div className="text-white/30 group-hover:text-white/50 transition-colors duration-200">
          {icon}
        </div>
      </div>

      <div>
        <p className="text-white text-2xl font-bold tracking-tight leading-none">
          {value}
        </p>
        {subValue && (
          <p className="text-white/40 text-sm mt-2 font-medium">{subValue}</p>
        )}
        {extraContent && <div className="mt-3">{extraContent}</div>}
      </div>
    </div>
  );
}

export default function WeatherMetrics({ data, unit }: WeatherMetricsProps) {
  const { current } = data;

  const displayTemp = (celsius: number) =>
    unit === 'F' ? Math.round((celsius * 9) / 5 + 32) : Math.round(celsius);

  const uv = getUVLabel(current.uvi ?? 0);
  const windDir = getWindDirection(current.wind_deg ?? 0);
  const humidityLabel = getHumidityLabel(current.humidity);
  const visKm = ((current.visibility ?? 10000) / 1000).toFixed(1);
  const visLabel = getVisibilityLabel(current.visibility ?? 10000);

  // Dew point approximation: Td ≈ T - ((100 - RH) / 5)
  const dewPoint = current.temp - (100 - current.humidity) / 5;

  // Pressure status
  const pressureHpa = current.pressure ?? 1013;
  const pressureStatus = pressureHpa > 1013 ? 'High Pressure' : pressureHpa < 1013 ? 'Low Pressure' : 'Normal';

  // UV progress bar width
  const uvProgress = Math.min(((current.uvi ?? 0) / 11) * 100, 100);

  return (
    <div className="">
      <h2 className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-4">
        Conditions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {/* Humidity */}
        <MetricCard
          icon={<Drop size={18} weight="fill" />}
          label="Humidity"
          value={`${current.humidity}%`}
          subValue={humidityLabel}
          extraContent={
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-400 transition-all duration-700"
                style={{ width: `${current.humidity}%` }}
              />
            </div>
          }
        />

        {/* Wind */}
        <MetricCard
          icon={<Wind size={18} weight="bold" />}
          label="Wind"
          value={`${Math.round(current.wind_speed * 3.6)} km/h`}
          subValue={`${windDir} Direction`}
          extraContent={
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 flex items-center justify-center"
                style={{
                  transform: `rotate(${current.wind_deg ?? 0}deg)`,
                  transition: 'transform 0.5s ease-out',
                }}
              >
                <ArrowUp size={14} weight="bold" className="text-sky-400" />
              </div>
              <span className="text-white/40 text-xs">{windDir}</span>
            </div>
          }
        />

        {/* UV Index */}
        <MetricCard
          icon={<Sun size={18} weight="fill" />}
          label="UV Index"
          value={String(Math.round(current.uvi ?? 0))}
          extraContent={
            <div className="space-y-2">
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${uvProgress}%`,
                    background: 'linear-gradient(to right, #34d399, #fbbf24, #f87171)',
                  }}
                />
              </div>
              <span className={`text-xs font-semibold ${uv.color}`}>{uv.label}</span>
            </div>
          }
        />

        {/* Visibility */}
        <MetricCard
          icon={<Eye size={18} weight="bold" />}
          label="Visibility"
          value={`${visKm} km`}
          subValue={visLabel}
        />

        {/* Pressure */}
        <MetricCard
          icon={<Gauge size={18} weight="bold" />}
          label="Pressure"
          value={`${pressureHpa}`}
          subValue={`hPa &bull; ${pressureStatus}`}
          extraContent={
            <div className="flex items-center gap-1.5">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  pressureHpa > 1013 ? 'bg-emerald-400' : pressureHpa < 1000 ? 'bg-red-400' : 'bg-yellow-400'
                }`}
              />
              <span className="text-white/40 text-xs">{pressureStatus}</span>
            </div>
          }
        />

        {/* Dew Point */}
        <MetricCard
          icon={<Thermometer size={18} weight="fill" />}
          label="Dew Point"
          value={`${displayTemp(dewPoint)}°${unit}`}
          subValue={dewPoint < 10 ? 'Dry comfort' : dewPoint < 16 ? 'Comfortable' : dewPoint < 21 ? 'Slightly humid' : 'Oppressive'}
        />
      </div>
    </div>
  );
}
