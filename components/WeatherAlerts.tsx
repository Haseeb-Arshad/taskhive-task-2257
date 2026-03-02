'use client';

import { useState } from 'react';
import { WeatherAlert } from '@/types/weather';

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
}

function getSeverityStyle(severity: string) {
  switch (severity?.toLowerCase()) {
    case 'extreme':
      return {
        border: 'border-red-500/60',
        bg: 'bg-red-500/10',
        icon: 'bg-red-500',
        text: 'text-red-300',
        badge: 'bg-red-500/20 text-red-300',
        dot: 'bg-red-400',
      };
    case 'severe':
      return {
        border: 'border-orange-500/60',
        bg: 'bg-orange-500/10',
        icon: 'bg-orange-500',
        text: 'text-orange-300',
        badge: 'bg-orange-500/20 text-orange-300',
        dot: 'bg-orange-400',
      };
    case 'moderate':
      return {
        border: 'border-yellow-500/60',
        bg: 'bg-yellow-500/10',
        icon: 'bg-yellow-500',
        text: 'text-yellow-300',
        badge: 'bg-yellow-500/20 text-yellow-300',
        dot: 'bg-yellow-400',
      };
    default:
      return {
        border: 'border-sky-500/60',
        bg: 'bg-sky-500/10',
        icon: 'bg-sky-500',
        text: 'text-sky-300',
        badge: 'bg-sky-500/20 text-sky-300',
        dot: 'bg-sky-400',
      };
  }
}

function formatAlertTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function SingleAlert({ alert }: { alert: WeatherAlert }) {
  const [expanded, setExpanded] = useState(false);
  const style = getSeverityStyle(alert.severity);

  return (
    <div className={`rounded-xl border ${style.border} ${style.bg} overflow-hidden`}>
      <button
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {/* Pulsing dot */}
        <span className="relative flex-shrink-0 h-2.5 w-2.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${style.dot} opacity-50`} />
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${style.dot}`} />
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-sm font-semibold ${style.text} truncate`}>{alert.event}</span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${style.badge}`}>
              {alert.severity}
            </span>
          </div>
          {!expanded && (
            <p className="text-xs text-white/40 mt-0.5 truncate">
              Until {formatAlertTime(alert.end)}
            </p>
          )}
        </div>

        {/* Chevron */}
        <svg
          className={`flex-shrink-0 w-4 h-4 text-white/30 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-white/10 pt-3 space-y-2">
          <div className="flex gap-6 text-xs text-white/40">
            <span>
              <span className="text-white/30">Starts: </span>
              {formatAlertTime(alert.start)}
            </span>
            <span>
              <span className="text-white/30">Ends: </span>
              {formatAlertTime(alert.end)}
            </span>
          </div>
          {alert.description && (
            <p className="text-xs text-white/60 leading-relaxed">
              {alert.description}
            </p>
          )}
          {alert.source && (
            <p className="text-[10px] text-white/25">Source: {alert.source}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function WeatherAlerts({ alerts }: WeatherAlertsProps) {
  const [showAll, setShowAll] = useState(false);

  if (!alerts || alerts.length === 0) return null;

  const displayed = showAll ? alerts : alerts.slice(0, 2);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-medium text-white/50 tracking-widest uppercase">
          Active Alerts
        </h3>
        <span className="text-xs font-semibold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
          {alerts.length}
        </span>
      </div>

      <div className="space-y-2">
        {displayed.map((alert, i) => (
          <SingleAlert key={`${alert.event}-${i}`} alert={alert} />
        ))}
      </div>

      {alerts.length > 2 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full text-xs text-white/40 hover:text-white/60 py-2 transition-colors"
        >
          {showAll ? 'Show fewer alerts' : `Show ${alerts.length - 2} more alert${alerts.length - 2 > 1 ? 's' : ''}`}
        </button>
      )}
    </div>
  );
}
