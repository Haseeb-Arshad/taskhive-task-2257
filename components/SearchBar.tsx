'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MagnifyingGlass, MapPin, X, CircleNotch } from '@phosphor-icons/react';

interface Suggestion {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

interface SearchBarProps {
  onSearch: (city: string, lat?: number, lon?: number) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchSuggestions = useCallback(async (value: string) => {
    if (value.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    setIsFetchingSuggestions(true);
    try {
      const res = await fetch(`/api/weather/suggestions?q=${encodeURIComponent(value)}`);
      const data = await res.json();
      if (data.suggestions) {
        setSuggestions(data.suggestions);
      }
    } catch {
      setSuggestions([]);
    } finally {
      setIsFetchingSuggestions(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fetchSuggestions]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (suggestion: Suggestion) => {
    const label = `${suggestion.name}${suggestion.state ? ', ' + suggestion.state : ''}, ${suggestion.country}`;
    setQuery(label);
    setSuggestions([]);
    setIsFocused(false);
    setSelectedIndex(-1);
    onSearch(suggestion.name, suggestion.lat, suggestion.lon);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSuggestions([]);
      setIsFocused(false);
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!suggestions.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setIsFocused(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const showDropdown = isFocused && (suggestions.length > 0 || isFetchingSuggestions);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`
            relative flex items-center gap-3 px-5 py-4 rounded-2xl
            bg-white/10 backdrop-blur-xl
            border border-white/20
            shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_20px_40px_-15px_rgba(0,0,0,0.3)]
            transition-all duration-300 ease-out
            ${isFocused ? 'border-white/40 bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_25px_50px_-15px_rgba(0,0,0,0.4)]' : ''}
          `}
        >
          <div className="flex-shrink-0">
            {isLoading ? (
              <CircleNotch
                size={20}
                weight="bold"
                className="text-white/70 animate-spin"
              />
            ) : (
              <MagnifyingGlass
                size={20}
                weight="bold"
                className={`transition-colors duration-200 ${isFocused ? 'text-white' : 'text-white/60'}`}
              />
            )}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
            }}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search city or location..."
            className="
              flex-1 bg-transparent outline-none border-none
              text-white placeholder-white/40
              text-base font-medium
              caret-white
            "
            autoComplete="off"
          />

          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="
                flex-shrink-0 p-1 rounded-full
                text-white/40 hover:text-white/80
                transition-colors duration-200
                active:scale-95
              "
            >
              <X size={16} weight="bold" />
            </button>
          )}

          <button
            type="submit"
            className="
              flex-shrink-0 px-4 py-2 rounded-xl
              bg-white/20 hover:bg-white/30
              border border-white/20
              text-white text-sm font-semibold
              transition-all duration-200
              active:scale-[0.98] active:-translate-y-[1px]
              shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]
            "
          >
            Search
          </button>
        </div>
      </form>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="
            absolute top-full left-0 right-0 mt-2 z-50
            bg-slate-900/95 backdrop-blur-xl
            border border-white/10
            rounded-2xl overflow-hidden
            shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]
            animate-in
          "
          style={{
            animation: 'fadeSlideDown 0.15s ease-out forwards',
          }}
        >
          {isFetchingSuggestions && suggestions.length === 0 ? (
            <div className="flex items-center gap-3 px-5 py-4 text-white/50">
              <CircleNotch size={16} className="animate-spin" />
              <span className="text-sm">Searching locations...</span>
            </div>
          ) : (
            <ul className="py-2">
              {suggestions.map((s, i) => (
                <li key={`${s.lat}-${s.lon}`}>
                  <button
                    type="button"
                    onClick={() => handleSelect(s)}
                    className={`
                      w-full flex items-center gap-3 px-5 py-3
                      text-left transition-all duration-150
                      ${selectedIndex === i ? 'bg-white/10' : 'hover:bg-white/5'}
                    `}
                  >
                    <MapPin
                      size={16}
                      weight="fill"
                      className="flex-shrink-0 text-sky-400"
                    />
                    <div>
                      <span className="text-white text-sm font-medium">{s.name}</span>
                      {s.state && (
                        <span className="text-white/50 text-sm">, {s.state}</span>
                      )}
                      <span className="text-white/40 text-sm">, {s.country}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
