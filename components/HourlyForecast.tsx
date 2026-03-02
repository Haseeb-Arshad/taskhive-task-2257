'use client';

import { useRef } from 'react';
import { HourlyData } from '@/types/weather';
import { getWeatherIcon } from '@/lib/weatherUtils';
import { Drop } from '@phosphor-icons/react';

interface HourlyForecastProps {
  hourly: HourlyData[];
  unit: 'C' | 'F';
}

function formatHour(dt: number): string {
  const date = new Date(dt * 1000);
  const hours = date.getHours();
  if (hours === 0) return '12 AM';
  if (hours === 12) return '12 PM';
  return hours < 12 ? `${hours} AM` : `${hours - 12} PM`;
}

export default function HourlyForecast({ hourly, unit }: HourlyForecastProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const displayTemp = (celsius: number) =>
    unit === 'F' ? Math.round((celsius * 9) / 5 + 32) : Math.round(celsius);

  const now = Math.floor(Date.now() / 1000);
  const upcoming = hourly
    .filter(h => h.dt >= now - 1800)
    .slice(0, 24);

  const temps = upcoming.map(h => h.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const tempRange = maxTemp - minTemp || 1;

  return (
    <div
      className="
        rounded-3xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_40px_-15px_rgba(0,0,0,0.3)]
        overflow-hidden
      "
    >
      <div className="px-6 pt-5 pb-2">
        <h2 className="text-white/50 text-xs uppercase tracking-widest font-semibold">
          24-Hour Forecast
        </h2>
      </div>

      <div
        ref={scrollRef}
        className="
          flex gap-2 overflow-x-auto
          px-4 pb-5 pt-2
          scrollbar-none
          snap-x snap-mandatory
        "
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {upcoming.map((hour, index) => {
          const isNow = index === 0;
          const normalizedTemp = (hour.temp - minTemp) / tempRange;
          const conditionCode = hour.weather[0]?.id ?? 800;
          const isDay = hour.weather[0]?.icon?.includes('d') ?? true;
          const icon = getWeatherIcon(conditionCode, isDay);
          const pop = hour.pop ? Math.round(hour.pop * 100) : 0;

          return (
            <div
              key={hour.dt}
              className={`
                flex-none flex flex-col items-center gap-3
                snap-center
                px-4 py-4 rounded-2xl
                transition-all duration-200
                min-w-[72px]
                ${isNow
                  ? 'bg-sky-500/20 border border-sky-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]'
                  : 'hover:bg-white/5'
                }
              `}
            >
              {/* Time */}
              <span
                className={`text-xs font-semibold tracking-wide ${
                  isNow ? 'text-sky-300' : 'text-white/40'
                }`}
              >
                {isNow ? 'Now' : formatHour(hour.dt)}
              </span>

              {/* Icon */}
              <span className="text-2xl leading-none select-none">{icon}</span>

              {/* Temperature bar */}
              <div className="relative w-1 h-12 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="
                    absolute bottom-0 left-0 right-0 rounded-full
                    bg-gradient-to-t from-sky-500 to-sky-300
                  "
                  style={{
                    height: `${Math.max(15, normalizedTemp * 100)}%`,
                    transition: 'height 0.3s ease-out',
                  }}
                />
              </div>

              {/* Temperature */}
              <span
                className={`text-sm font-bold ${
                  isNow ? 'text-white' : 'text-white/80'
                }`}
              >
                {displayTemp(hour.temp)}°
              </span>

              {/* Precipitation */}
              {pop > 0 && (
                <div className="flex items-center gap-0.5">
                  <Drop size={10} weight="fill" className="text-sky-400" />
                  <span className="text-[10px] text-sky-400 font-medium">{pop}%</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
