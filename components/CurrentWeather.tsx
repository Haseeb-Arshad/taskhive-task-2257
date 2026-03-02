'use client';

import { WeatherData } from '@/types/weather';
import { MapPin, CalendarBlank, Thermometer, Drop } from '@phosphor-icons/react';
import { getWeatherIcon, formatTemperature, formatDate, getWeatherGradient } from '@/lib/weatherUtils';

interface CurrentWeatherProps {
  data: WeatherData;
  unit: 'C' | 'F';
}

export default function CurrentWeather({ data, unit }: CurrentWeatherProps) {
  const { current, location } = data;

  const displayTemp = (celsius: number) =>
    unit === 'F' ? Math.round((celsius * 9) / 5 + 32) : Math.round(celsius);

  const conditionCode = current.weather[0]?.id ?? 800;
  const isDay = current.weather[0]?.icon?.includes('d') ?? true;
  const description = current.weather[0]?.description ?? 'Clear';
  const icon = getWeatherIcon(conditionCode, isDay);

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div
      className="
        relative overflow-hidden rounded-3xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_30px_60px_-20px_rgba(0,0,0,0.4)]
        p-8 md:p-10
      "
    >
      {/* Decorative background orb */}
      <div
        className="
          absolute -top-20 -right-20 w-64 h-64 rounded-full
          bg-sky-500/10 blur-3xl pointer-events-none
        "
      />
      <div
        className="
          absolute -bottom-16 -left-16 w-48 h-48 rounded-full
          bg-indigo-500/10 blur-3xl pointer-events-none
        "
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        {/* Left: Location + Temperature */}
        <div className="flex flex-col gap-4">
          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin size={16} weight="fill" className="text-sky-400" />
            <span className="text-white/80 text-sm font-medium tracking-wide">
              {location.name}
              {location.state ? `, ${location.state}` : ''}
              {location.country ? `, ${location.country}` : ''}
            </span>
          </div>

          {/* Main Temperature */}
          <div className="flex items-start gap-1">
            <span
              className="
                text-[7rem] md:text-[8rem] leading-none font-bold tracking-tighter
                text-white
              "
            >
              {displayTemp(current.temp)}
            </span>
            <span className="text-3xl text-white/60 mt-4 font-light">°{unit}</span>
          </div>

          {/* Description */}
          <p className="text-white/60 text-lg capitalize font-medium -mt-2">
            {description}
          </p>

          {/* Feels like + Humidity */}
          <div className="flex items-center gap-5 mt-1">
            <div className="flex items-center gap-2">
              <Thermometer size={16} weight="fill" className="text-orange-400/80" />
              <span className="text-white/50 text-sm">
                Feels like{' '}
                <span className="text-white/80 font-semibold">
                  {displayTemp(current.feels_like)}°
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Drop size={16} weight="fill" className="text-sky-400/80" />
              <span className="text-white/50 text-sm">
                Humidity{' '}
                <span className="text-white/80 font-semibold">
                  {current.humidity}%
                </span>
              </span>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-2 mt-2">
            <CalendarBlank size={14} className="text-white/30" />
            <span className="text-white/30 text-xs font-medium">
              {dateStr} &bull; {timeStr}
            </span>
          </div>
        </div>

        {/* Right: Weather Icon + Stats */}
        <div className="flex flex-col items-center gap-6">
          {/* Large weather icon */}
          <div
            className="
              w-40 h-40 flex items-center justify-center
              text-[7rem] leading-none
              drop-shadow-2xl
              select-none
              animate-float
            "
            style={{
              filter: 'drop-shadow(0 10px 30px rgba(56,189,248,0.25))',
              animation: 'float 6s ease-in-out infinite',
            }}
          >
            {icon}
          </div>

          {/* Hi / Lo */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">High</p>
              <p className="text-white font-bold text-lg">
                {displayTemp(current.temp_max ?? current.temp)}°
              </p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Low</p>
              <p className="text-white font-bold text-lg">
                {displayTemp(current.temp_min ?? current.temp)}°
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
