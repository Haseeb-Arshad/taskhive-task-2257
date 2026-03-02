'use client';

import { DailyForecast } from '@/types/weather';

interface SunriseSunsetProps {
  today: DailyForecast;
  timezone?: string;
}

function parseTime(timeStr: string): { hours: number; minutes: number } {
  if (!timeStr) return { hours: 0, minutes: 0 };
  // Handle both HH:MM and ISO formats
  const match = timeStr.match(/(\d{1,2}):(\d{2})/);
  if (match) {
    return { hours: parseInt(match[1]), minutes: parseInt(match[2]) };
  }
  const d = new Date(timeStr);
  return { hours: d.getHours(), minutes: d.getMinutes() };
}

function toMinutes(hours: number, minutes: number): number {
  return hours * 60 + minutes;
}

function formatTime(timeStr: string): string {
  if (!timeStr) return '--:--';
  const { hours, minutes } = parseTime(timeStr);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  return `${h}:${String(minutes).padStart(2, '0')} ${ampm}`;
}

export default function SunriseSunset({ today, timezone }: SunriseSunsetProps) {
  const sunriseStr = today.sunrise ?? '06:00';
  const sunsetStr = today.sunset ?? '18:00';

  const sunrise = parseTime(sunriseStr);
  const sunset = parseTime(sunsetStr);
  const now = new Date();
  const currentMin = toMinutes(now.getHours(), now.getMinutes());
  const sunriseMin = toMinutes(sunrise.hours, sunrise.minutes);
  const sunsetMin = toMinutes(sunset.hours, sunset.minutes);

  // Day length
  const dayLengthMin = sunsetMin - sunriseMin;
  const dayHours = Math.floor(dayLengthMin / 60);
  const dayMins = dayLengthMin % 60;

  // Sun position along arc (0 = sunrise, 1 = sunset)
  let sunProgress = (currentMin - sunriseMin) / (sunsetMin - sunriseMin);
  sunProgress = Math.max(0, Math.min(1, sunProgress));
  const isDaytime = currentMin >= sunriseMin && currentMin <= sunsetMin;

  // SVG arc parameters
  const W = 280;
  const H = 130;
  const cx = W / 2;
  const cy = H + 10;
  const r = H + 10;

  // Arc path: semicircle from left to right
  const startX = cx - r;
  const startY = cy;
  const endX = cx + r;
  const endY = cy;

  // Sun position on arc
  const angle = Math.PI - sunProgress * Math.PI; // PI = left (sunrise), 0 = right (sunset)
  const sunX = cx + r * Math.cos(angle);
  const sunY = cy - r * Math.sin(angle);

  // Progress arc
  const progressAngle = Math.PI - sunProgress * Math.PI;
  const progX = cx + r * Math.cos(progressAngle);
  const progY = cy - r * Math.sin(progressAngle);

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-white/50 tracking-widest uppercase">Sun & Moon</h3>
        <span className="text-xs text-white/30">
          Day length: {dayHours}h {dayMins}m
        </span>
      </div>

      {/* Arc Diagram */}
      <div className="flex justify-center mb-4">
        <svg
          viewBox={`0 0 ${W} ${H + 20}`}
          width="100%"
          style={{ maxWidth: W }}
          overflow="visible"
        >
          {/* Horizon line */}
          <line
            x1={startX}
            y1={cy}
            x2={endX}
            y2={cy}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />

          {/* Background arc (full) */}
          <path
            d={`M ${startX} ${cy} A ${r} ${r} 0 0 1 ${endX} ${endY}`}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Progress arc */}
          {isDaytime && (
            <path
              d={`M ${startX} ${cy} A ${r} ${r} 0 0 1 ${progX} ${progY}`}
              fill="none"
              stroke="rgba(251,191,36,0.5)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}

          {/* Glow under arc */}
          <defs>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sun circle */}
          {isDaytime && (
            <>
              <circle cx={sunX} cy={sunY} r={14} fill="url(#sunGlow)" />
              <circle cx={sunX} cy={sunY} r={7} fill="#fbbf24" />
              <circle cx={sunX} cy={sunY} r={10} fill="none" stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.4" />
            </>
          )}

          {/* Sunrise dot */}
          <circle cx={startX} cy={cy} r={4} fill="#fb923c" />

          {/* Sunset dot */}
          <circle cx={endX} cy={cy} r={4} fill="#c084fc" />
        </svg>
      </div>

      {/* Time labels */}
      <div className="flex justify-between items-center">
        <div className="text-left">
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className="w-2 h-2 rounded-full bg-orange-400" />
            <span className="text-xs text-white/40">Sunrise</span>
          </div>
          <span className="text-base font-semibold text-white">{formatTime(sunriseStr)}</span>
        </div>

        {!isDaytime && (
          <div className="text-center">
            <span className="text-xs text-white/30">Currently</span>
            <div className="text-sm font-medium text-white/60">{currentMin < sunriseMin ? 'Before sunrise' : 'After sunset'}</div>
          </div>
        )}

        {isDaytime && (
          <div className="text-center">
            <span className="text-xs text-white/30">Progress</span>
            <div className="text-sm font-medium text-amber-400">{Math.round(sunProgress * 100)}%</div>
          </div>
        )}

        <div className="text-right">
          <div className="flex items-center justify-end gap-1.5 mb-0.5">
            <span className="text-xs text-white/40">Sunset</span>
            <div className="w-2 h-2 rounded-full bg-purple-400" />
          </div>
          <span className="text-base font-semibold text-white">{formatTime(sunsetStr)}</span>
        </div>
      </div>

      {/* Moon phase */}
      {today.moonPhase !== undefined && (
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-white/40">Moon Phase</span>
          <span className="text-sm text-white/70 capitalize">{today.moonPhase}</span>
        </div>
      )}
    </div>
  );
}
