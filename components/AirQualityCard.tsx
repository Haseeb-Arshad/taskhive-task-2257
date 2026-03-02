'use client';

import { AirQuality } from '@/types/weather';

interface AirQualityCardProps {
  airQuality: AirQuality;
}

function getAQILevel(aqi: number): {
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
  description: string;
} {
  if (aqi <= 50) return { label: 'Good', color: '#22c55e', bgColor: 'bg-green-500/10', textColor: 'text-green-400', description: 'Air quality is satisfactory with little or no risk.' };
  if (aqi <= 100) return { label: 'Moderate', color: '#eab308', bgColor: 'bg-yellow-500/10', textColor: 'text-yellow-400', description: 'Air quality is acceptable. Sensitive groups may experience minor issues.' };
  if (aqi <= 150) return { label: 'Unhealthy (Sensitive)', color: '#f97316', bgColor: 'bg-orange-500/10', textColor: 'text-orange-400', description: 'Sensitive groups should limit prolonged outdoor exertion.' };
  if (aqi <= 200) return { label: 'Unhealthy', color: '#ef4444', bgColor: 'bg-red-500/10', textColor: 'text-red-400', description: 'Everyone may begin to experience health effects.' };
  if (aqi <= 300) return { label: 'Very Unhealthy', color: '#a855f7', bgColor: 'bg-purple-500/10', textColor: 'text-purple-400', description: 'Health alert: everyone may experience serious effects.' };
  return { label: 'Hazardous', color: '#7f1d1d', bgColor: 'bg-red-900/20', textColor: 'text-red-300', description: 'Health emergency. Everyone is likely to be affected.' };
}

const pollutants = [
  { key: 'pm2_5', label: 'PM2.5', unit: 'µg/m³', max: 250 },
  { key: 'pm10', label: 'PM10', unit: 'µg/m³', max: 430 },
  { key: 'no2', label: 'NO₂', unit: 'µg/m³', max: 200 },
  { key: 'o3', label: 'O₃', unit: 'µg/m³', max: 180 },
] as const;

export default function AirQualityCard({ airQuality }: AirQualityCardProps) {
  const level = getAQILevel(airQuality.aqi);
  const gaugePercent = Math.min((airQuality.aqi / 500) * 100, 100);

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-medium text-white/50 tracking-widest uppercase">Air Quality</h3>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${level.bgColor} ${level.textColor}`}>
          {level.label}
        </span>
      </div>

      <div className="flex items-end gap-3 mb-4">
        <span className="text-5xl font-bold text-white tracking-tighter">{airQuality.aqi}</span>
        <span className="text-white/40 text-sm mb-2">AQI US</span>
      </div>

      {/* Gauge Bar */}
      <div className="mb-3">
        <div className="relative h-2.5 rounded-full overflow-hidden bg-white/10">
          {/* Gradient track */}
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
            style={{
              width: `${gaugePercent}%`,
              background: `linear-gradient(to right, #22c55e, #eab308, #f97316, #ef4444, #a855f7)`,
            }}
          />
        </div>
        {/* Scale labels */}
        <div className="flex justify-between mt-1.5 text-[10px] text-white/30">
          <span>0</span>
          <span>100</span>
          <span>200</span>
          <span>300</span>
          <span>500</span>
        </div>
      </div>

      <p className="text-xs text-white/40 mb-5 leading-relaxed">{level.description}</p>

      {/* Pollutant Breakdown */}
      <div className="space-y-3">
        {pollutants.map(({ key, label, unit, max }) => {
          const value = airQuality[key as keyof AirQuality] as number;
          const pct = Math.min((value / max) * 100, 100);
          return (
            <div key={key}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-white/50">{label}</span>
                <span className="text-xs font-medium text-white/80">
                  {typeof value === 'number' ? value.toFixed(1) : '—'} <span className="text-white/30">{unit}</span>
                </span>
              </div>
              <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-sky-400/60 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
