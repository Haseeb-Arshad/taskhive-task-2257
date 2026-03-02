'use client';

import { DailyData } from '@/types/weather';
import { getWeatherIcon } from '@/lib/weatherUtils';
import { Drop, ArrowRight } from '@phosphor-icons/react';

interface WeeklyForecastProps {
  daily: DailyData[];
  unit: 'C' | 'F';
}

function getDayLabel(dt: number, index: number): string {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';
  const date = new Date(dt * 1000);
  return date.toLocaleDateString([], { weekday: 'long' });
}

export default function WeeklyForecast({ daily, unit }: WeeklyForecastProps) {
  const displayTemp = (celsius: number) =>
    unit === 'F' ? Math.round((celsius * 9) / 5 + 32) : Math.round(celsius);

  const days = daily.slice(0, 7);

  const allHighs = days.map(d => d.temp.max);
  const allLows = days.map(d => d.temp.min);
  const globalMin = Math.min(...allLows);
  const globalMax = Math.max(...allHighs);
  const globalRange = globalMax - globalMin || 1;

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
      <div className="px-6 pt-5 pb-1">
        <h2 className="text-white/50 text-xs uppercase tracking-widest font-semibold">
          7-Day Forecast
        </h2>
      </div>

      <div className="divide-y divide-white/5">
        {days.map((day, index) => {
          const conditionCode = day.weather[0]?.id ?? 800;
          const icon = getWeatherIcon(conditionCode, true);
          const description = day.weather[0]?.description ?? 'Clear';
          const pop = day.pop ? Math.round(day.pop * 100) : 0;
          const isToday = index === 0;

          // Range bar calculations
          const lowNorm = (day.temp.min - globalMin) / globalRange;
          const highNorm = (day.temp.max - globalMin) / globalRange;
          const barLeft = lowNorm * 100;
          const barWidth = (highNorm - lowNorm) * 100;

          return (
            <div
              key={day.dt}
              className={`
                flex items-center gap-4 px-6 py-4
                transition-colors duration-200 hover:bg-white/5
                ${isToday ? 'bg-sky-500/5' : ''}
              `}
            >
              {/* Day name */}
              <div className="w-24 flex-none">
                <p
                  className={`text-sm font-semibold ${
                    isToday ? 'text-sky-300' : 'text-white/80'
                  }`}
                >
                  {getDayLabel(day.dt, index)}
                </p>
                {pop > 0 && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <Drop size={10} weight="fill" className="text-sky-400" />
                    <span className="text-[10px] text-sky-400 font-medium">{pop}%</span>
                  </div>
                )}
              </div>

              {/* Icon + description */}
              <div className="flex items-center gap-2 w-36 flex-none">
                <span className="text-2xl leading-none select-none">{icon}</span>
                <span className="text-white/40 text-xs capitalize leading-tight hidden sm:block">
                  {description}
                </span>
              </div>

              {/* Temperature range bar */}
              <div className="flex-1 flex items-center gap-3">
                <span className="text-white/40 text-sm font-medium w-8 text-right">
                  {displayTemp(day.temp.min)}°
                </span>

                <div className="relative flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-sky-400 to-orange-400"
                    style={{
                      left: `${barLeft}%`,
                      width: `${Math.max(barWidth, 8)}%`,
                    }}
                  />
                </div>

                <span className="text-white/80 text-sm font-semibold w-8">
                  {displayTemp(day.temp.max)}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
