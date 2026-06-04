'use client';

import { CURRENCIES, type Currency } from '@/src/lib/country_api_data';
import { CheckCircle, ChevronDown, Search, X } from 'lucide-react';
import FlagImg from './FlagImg';
import { useState, useRef, useEffect } from 'react';

const CurrencyDropDown = ({
  selected,
  onChange,
  disabled,
}: {
  selected: string;
  onChange: (code: string) => void;
  disabled?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currency = CURRENCIES.find(c => c.code === selected);
  const filtered = CURRENCIES.filter(
    c =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.country.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(o => !o)}
        className="h-full px-3 bg-gray-50 border-l border-gray-200 flex items-center gap-1.5 hover:bg-gray-100 rounded-r-xl transition min-w-22.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {currency && (
          <FlagImg flag={currency.flag} code={currency.code} size={18} />
        )}
        <span className="text-sm font-semibold text-gray-700">{selected}</span>
        <ChevronDown size={12} className="text-gray-400 flex-shrink-0" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 flex flex-col max-h-72">
          <div className="p-2 border-b border-gray-100 shrink-0">
            <div className="relative">
              <Search
                size={13}
                className="absolute left-2.5 top-2.5 text-gray-400"
              />
              <input
                ref={inputRef}
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search currency or country…"
                className="w-full pl-7 pr-7 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-green-600"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2 top-2.5 text-gray-300 hover:text-gray-500"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          <div className="overflow-y-auto flex-1 z-99999">
            {filtered.length === 0 ? (
              <div className="py-6 text-center text-xs text-gray-400">
                No results
              </div>
            ) : (
              filtered.map(c => (
                <button
                  key={c.code}
                  onClick={() => {
                    onChange(c.code);
                    setOpen(false);
                    setSearch('');
                  }}
                  className={`w-full px-3 py-2 text-left flex items-center gap-2.5 hover:bg-gray-50 transition ${selected === c.code ? 'bg-green-50' : ''}`}
                >
                  <FlagImg flag={c.flag} code={c.code} size={20} />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-gray-800">
                      {c.code}
                    </span>
                    <span className="text-xs text-gray-400 ml-1.5 truncate">
                      {c.name}
                    </span>
                  </div>
                  {selected === c.code && (
                    <CheckCircle
                      size={13}
                      className="text-green-600 ml-auto shrink-0"
                    />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyDropDown;
