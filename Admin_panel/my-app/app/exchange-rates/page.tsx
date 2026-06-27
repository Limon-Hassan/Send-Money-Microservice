'use client';

import { useState } from 'react';
import {
  ChevronRight, Search, ChevronDown, Filter, RefreshCw, Pencil, MoreVertical,
  X, ToggleRight, History, SlidersHorizontal, Bell, Plus, RotateCcw, Clock,
  AlertTriangle, ShieldCheck, CalendarClock, ArrowRight,
} from 'lucide-react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  Tooltip as ChartTooltip, Filler, ChartOptions, TooltipItem,
} from 'chart.js';
import { Line as LineChartJS } from 'react-chartjs-2';
import { flagForCountryName } from '@/lib/countries_data';



import {
  currencyRates,
  exchangeRateStats,
  rateMovement1D,
  rateMovement7D,
  rateMovement30D,
  rateSummary,
  CurrencyRate,
  RateStatus,
  rateOverrides,
  overrideStats,
  overrideLog,
  overrideDurationOptions,
  RateOverride,
  OverrideStatus,
  OverrideLogEntry,
} from '@/lib/data';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTooltip, Filler);

// ── helpers ───────────────────────────────────────────────────
const currencyCountryMap: Record<string, string> = {
  GBP: 'United Kingdom',
  USD: 'United States',
  EUR: 'Europe',
  BDT: 'Bangladesh',
  AED: 'UAE',
  INR: 'India',
  PKR: 'Pakistan',
  NGN: 'Nigeria',
  CAD: 'Canada',
  AUD: 'Australia',
  PHP: 'Philippines',
  SAR: 'Saudi Arabia',
};

function CurrencyFlag({ code, size = 'w-4 h-4' }: { code: string; size?: string }) {
  const country = currencyCountryMap[code];
  if (!country) return null;
  return (
    <img
      src={flagForCountryName(country)}
      alt={code}
      className={`${size} rounded-full object-cover inline-block shrink-0`}
    />
  );
}



const statusClasses: Record<RateStatus, string> = {
  Active: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
  Inactive: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
  Paused: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
};

const overrideStatusClasses: Record<OverrideStatus, string> = {
  Active: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
  Scheduled: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
  Expired: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
  Reverted: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
};

const logActionClasses: Record<OverrideLogEntry['action'], string> = {
  Created: 'bg-emerald-50 text-emerald-500 dark:bg-emerald-950 dark:text-emerald-400',
  Updated: 'bg-blue-50 text-blue-500 dark:bg-blue-950 dark:text-blue-400',
  Reverted: 'bg-amber-50 text-amber-500 dark:bg-amber-950 dark:text-amber-400',
  Expired: 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-400',
};

const fmtDateTime = (iso: string) => {
  const d = new Date(iso);
  return `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
};

const fmtRate = (n: number) => n.toFixed(4);
const fmtChange = (n: number, pct: number) => {
  const sign = n >= 0 ? '+' : '';
  return `${sign}${n.toFixed(4)} (${sign}${pct.toFixed(2)}%)`;
};

const RANGE_DATA: Record<'1D' | '7D' | '30D', typeof rateMovement1D> = {
  '1D': rateMovement1D,
  '7D': rateMovement7D,
  '30D': rateMovement30D,
};

const TABS = ['Live Rates', 'Manual Override', 'Spread Management'] as const;

// ── Stat cards row ────────────────────────────────────────────
function StatCards() {
  const s = exchangeRateStats;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5">
        <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-1">Total Currency Pairs</p>
        <p className="text-lg font-bold text-gray-900 dark:text-white">{s.totalCurrencyPairs}</p>
        <p className="text-[11px] text-gray-400 dark:text-gray-500">{s.activePairs} Active Pairs</p>
      </div>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5">
        <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-1">Last Updated</p>
        <p className="text-lg font-bold text-gray-900 dark:text-white">{s.lastUpdated.split(' ').slice(0, 3).join(' ')}</p>
        <p className="text-[11px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          Auto Refresh in {s.autoRefreshSeconds}s
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5">
        <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-1">Base Currency</p>
        <p className="text-lg font-bold text-gray-900 dark:text-white">{s.baseCurrency}</p>
        <p className="text-[11px] text-gray-400 dark:text-gray-500">{s.baseCurrencyName}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5">
        <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-1">Average Spread</p>
        <p className="text-lg font-bold text-gray-900 dark:text-white">{s.averageSpreadPct}%</p>
        <p className="text-[11px] text-gray-400 dark:text-gray-500">Across all pairs</p>
      </div>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5 col-span-2 sm:col-span-1">
        <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-1">Rate Source</p>
        <p className="text-lg font-bold text-gray-900 dark:text-white">{s.rateSource}</p>
        <p className="text-[11px] text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
          Primary Provider
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
            {s.rateSourceStatus}
          </span>
        </p>
      </div>
    </div>
  );
}

// ── Filter / search bar ───────────────────────────────────────
function FilterBar({ search, setSearch }: { search: string; setSearch: (v: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
      <div className="flex items-center gap-2 flex-1 min-w-40 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
        <Search size={14} className="text-gray-400 dark:text-gray-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search currency pair..."
          className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
      </div>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
        All Base Currencies <ChevronDown size={13} />
      </button>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
        All Quote Currencies <ChevronDown size={13} />
      </button>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
        All Status <ChevronDown size={13} />
      </button>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
        <Filter size={13} /> Filters
      </button>
      <button className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
        <RefreshCw size={13} />
      </button>
    </div>
  );
}

// ── Rates table ───────────────────────────────────────────────
function RatesTable({
  rows, selectedId, onSelect,
}: { rows: CurrencyRate[]; selectedId: string; onSelect: (r: CurrencyRate) => void }) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-205">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
              <th className="px-4 py-2.5 font-medium">Currency Pair</th>
              <th className="px-2 py-2.5 font-medium">Base Currency</th>
              <th className="px-2 py-2.5 font-medium">Quote Currency</th>
              <th className="px-2 py-2.5 font-medium">Live Rate</th>
              <th className="px-2 py-2.5 font-medium">Our Rate</th>
              <th className="px-2 py-2.5 font-medium">Spread</th>
              <th className="px-2 py-2.5 font-medium">Spread (%)</th>
              <th className="px-2 py-2.5 font-medium">Last Updated</th>
              <th className="px-2 py-2.5 font-medium">Status</th>
              <th className="px-2 py-2.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr
                key={r.id}
                onClick={() => onSelect(r)}
                className={`border-b border-gray-50 dark:border-gray-700/40 last:border-0 cursor-pointer transition-colors ${selectedId === r.id
                    ? 'bg-blue-50/60 dark:bg-blue-950/30'
                    : 'hover:bg-gray-50/60 dark:hover:bg-gray-700/30'
                  }`}
              >
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-800 dark:text-gray-100">
                    <CurrencyFlag code={r.baseCurrency} /><CurrencyFlag code={r.quoteCurrency} />
                    {r.baseCurrency} / {r.quoteCurrency}
                  </span>
                </td>
                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.baseCurrency}</td>
                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.quoteCurrency}</td>
                <td className="px-2 py-2.5 whitespace-nowrap">
                  <p className="text-[13px] font-semibold text-gray-900 dark:text-white">{fmtRate(r.liveRate)}</p>
                  <p className={`text-[11px] ${r.liveChange >= 0 ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                    {fmtChange(r.liveChange, r.liveChangePct)}
                  </p>
                </td>
                <td className="px-2 py-2.5 text-[13px] font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">{fmtRate(r.ourRate)}</td>
                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.spread.toFixed(4)}</td>
                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.spreadPct.toFixed(2)}%</td>
                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{r.lastUpdated}</td>
                <td className="px-2 py-2.5 whitespace-nowrap">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusClasses[r.status]}`}>{r.status}</span>
                </td>
                <td className="px-2 py-2.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                      <Pencil size={13} />
                    </button>
                    <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
        <span>Showing 1 to {rows.length} of {exchangeRateStats.totalCurrencyPairs} currency pairs</span>
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">‹</button>
          <button className="px-2.5 py-1 rounded bg-blue-600 text-white cursor-pointer">1</button>
          <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">2</button>
          <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">3</button>
          <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">4</button>
          <button className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">›</button>
        </div>
        <select className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded px-2 py-1 text-[12px] text-gray-600 dark:text-gray-300">
          <option>10 / page</option>
          <option>20 / page</option>
          <option>50 / page</option>
        </select>
      </div>
    </>
  );
}

// ── Rate Movement chart ───────────────────────────────────────
function RateMovementChart({ pairLabel }: { pairLabel: string }) {
  const [range, setRange] = useState<'1D' | '7D' | '30D'>('1D');
  const series = RANGE_DATA[range];

  const chartData = {
    labels: series.map(p => p.time),
    datasets: [
      {
        label: 'Rate',
        data: series.map(p => p.rate),
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37,99,235,0.08)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#2563eb',
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'line'>) => Number(ctx.parsed.y).toFixed(4),
        },
        backgroundColor: '#111827',
        titleFont: { size: 11 },
        bodyFont: { size: 12 },
        padding: 8,
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 10 }, color: '#9ca3af' },
      },
      y: {
        grid: { color: '#f1f5f9' },
        ticks: { font: { size: 10 }, color: '#9ca3af' },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Rate Movement ({pairLabel})</h3>
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-0.5">
          {(['1D', '7D', '30D'] as const).map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${range === r
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="h-55">
        <LineChartJS data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

// ── Rate Summary panel ─────────────────────────────────────────
function RateSummaryCard() {
  const s = rateSummary;
  const Row = ({ label, value, positive }: { label: string; value: string; positive?: boolean }) => (
    <div className="flex items-center justify-between">
      <span className="text-[12px] text-gray-500 dark:text-gray-400">{label}</span>
      <span className={`text-[13px] font-semibold ${positive === undefined ? 'text-gray-800 dark:text-gray-100'
          : positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'
        }`}>
        {value}
      </span>
    </div>
  );
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
      <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 mb-3">Rate Summary</h3>
      <div className="grid grid-cols-2 gap-y-3 gap-x-4">
        <Row label="Today's High" value={s.todaysHigh.toFixed(4)} positive />
        <Row label="30 Days High" value={s.thirtyDayHigh.toFixed(4)} />
        <Row label="Today's Low" value={s.todaysLow.toFixed(4)} positive={false} />
        <Row label="30 Days Low" value={s.thirtyDayLow.toFixed(4)} />
        <Row label="7 Days High" value={s.sevenDayHigh.toFixed(4)} />
        <Row label="Average (7D)" value={s.average7d.toFixed(4)} />
        <Row label="7 Days Low" value={s.sevenDayLow.toFixed(4)} />
        <Row label="Volatility (7D)" value={`${s.volatility7d}%`} />
      </div>
    </div>
  );
}

// ── Right sidebar: Rate Details ───────────────────────────────
function RateDetailsPanel({ rate }: { rate: CurrencyRate }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Rate Details</h3>
        <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">
          <X size={15} />
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-gray-900 dark:text-white">
          <CurrencyFlag code={rate.baseCurrency} size="w-5 h-5" /><CurrencyFlag code={rate.quoteCurrency} size="w-5 h-5" />
          {rate.baseCurrency} / {rate.quoteCurrency}
        </span>
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusClasses[rate.status]}`}>{rate.status}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5">
          <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-0.5">Live Rate</p>
          <p className="text-[15px] font-bold text-gray-900 dark:text-white">{fmtRate(rate.liveRate)}</p>
          <p className={`text-[11px] ${rate.liveChange >= 0 ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
            {fmtChange(rate.liveChange, rate.liveChangePct)}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5">
          <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-0.5">Our Rate</p>
          <p className="text-[15px] font-bold text-gray-900 dark:text-white">{fmtRate(rate.ourRate)}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5">
          <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-0.5">Spread</p>
          <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">{rate.spread.toFixed(4)}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5">
          <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-0.5">Spread (%)</p>
          <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">{rate.spreadPct.toFixed(2)}%</p>
        </div>
      </div>

      <h4 className="text-[12px] font-semibold text-gray-700 dark:text-gray-300 mb-2">Rate Information</h4>
      <div className="space-y-2 mb-4">
        {[
          ['Base Currency', `${rate.baseCurrency} - ${rate.baseCurrencyName}`],
          ['Quote Currency', `${rate.quoteCurrency} - ${rate.quoteCurrencyName}`],
          ['Rate Source', rate.source],
          ['Last Updated', rate.lastUpdated],
          ['Next Update', rate.nextUpdate],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between text-[12px]">
            <span className="text-gray-400 dark:text-gray-500">{label}</span>
            <span className="text-gray-700 dark:text-gray-200 font-medium text-right">{value}</span>
          </div>
        ))}
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-gray-400 dark:text-gray-500">Status</span>
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusClasses[rate.status]}`}>{rate.status}</span>
        </div>
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-gray-400 dark:text-gray-500">Auto Update</span>
          <ToggleRight size={28} className={rate.autoUpdate ? 'text-blue-600' : 'text-gray-300 dark:text-gray-600'} />
        </div>
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-gray-400 dark:text-gray-500">Priority</span>
          <span className="text-gray-700 dark:text-gray-200 font-medium">
            {rate.priority === 'High' ? '1 (High)' : rate.priority === 'Medium' ? '2 (Medium)' : '3 (Low)'}
          </span>
        </div>
      </div>

      <h4 className="text-[12px] font-semibold text-gray-700 dark:text-gray-300 mb-2">Quick Actions</h4>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <button className="flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
          <SlidersHorizontal size={13} /> Manual Override
        </button>
        <button className="flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
          <Pencil size={13} /> Edit Spread
        </button>
      </div>
      <button className="w-full flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
        <History size={13} /> View History
      </button>
    </div>
  );
}

function RateAlertCard() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-1.5">
        <Bell size={14} className="text-gray-500 dark:text-gray-400" />
        <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Rate Alert</h3>
      </div>
      <p className="text-[12px] text-gray-400 dark:text-gray-500 mb-3">Create alerts for rate movements</p>
      <button className="w-full flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 cursor-pointer">
        <Plus size={13} /> Create Alert
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ── MANUAL OVERRIDE TAB ───────────────────────────────────────
// ════════════════════════════════════════════════════════════

function OverrideStatCards() {
  const s = overrideStats;
  const cards = [
    { label: 'Active Overrides', value: s.activeOverrides, icon: ShieldCheck, color: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Expiring Soon', value: s.expiringSoon, icon: Clock, color: 'text-amber-600 dark:text-amber-400' },
    { label: 'Total Today', value: s.totalOverridesToday, icon: CalendarClock, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Avg Duration', value: `${s.avgOverrideDurationHours}h`, icon: RotateCcw, color: 'text-purple-600 dark:text-purple-400' },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[11px] text-gray-400 dark:text-gray-500">{label}</p>
            <Icon size={14} className={color} />
          </div>
          <p className={`text-lg font-bold text-gray-900 dark:text-white`}>{value}</p>
        </div>
      ))}
    </div>
  );
}

function CreateOverrideForm() {
  const [pairId, setPairId] = useState(currencyRates[0].id);
  const [overrideRate, setOverrideRate] = useState('');
  const [reason, setReason] = useState('');
  const [duration, setDuration] = useState(overrideDurationOptions[2]);
  const [autoRevert, setAutoRevert] = useState(true);

  const pair = currencyRates.find(r => r.id === pairId) ?? currencyRates[0];
  const overrideNum = parseFloat(overrideRate);
  const diffPct = !isNaN(overrideNum) && pair.liveRate
    ? ((overrideNum - pair.liveRate) / pair.liveRate) * 100
    : null;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
      <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 mb-4">Create New Override</h3>

      <div className="space-y-3.5">
        <div>
          <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Currency Pair</label>
          <select
            value={pairId}
            onChange={e => setPairId(e.target.value)}
            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 cursor-pointer"
          >
            {currencyRates.map(r => (
              <option key={r.id} value={r.id}>
                {r.baseCurrency} / {r.quoteCurrency}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5">
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-0.5">Live Rate</p>
            <p className="text-[14px] font-bold text-gray-900 dark:text-white">{pair.liveRate.toFixed(4)}</p>
          </div>
          <div>
            <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Override Rate</label>
            <input
              type="number"
              step="0.0001"
              value={overrideRate}
              onChange={e => setOverrideRate(e.target.value)}
              placeholder={pair.liveRate.toFixed(4)}
              className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400 dark:focus:border-blue-500"
            />
          </div>
        </div>

        {diffPct !== null && (
          <div className={`flex items-center gap-1.5 text-[12px] font-medium ${diffPct >= 0 ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
            <ArrowRight size={12} className={diffPct < 0 ? 'rotate-90' : '-rotate-90'} />
            {diffPct >= 0 ? '+' : ''}{diffPct.toFixed(2)}% vs live rate
          </div>
        )}

        <div>
          <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Reason for Override</label>
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            rows={3}
            placeholder="Explain why this rate is being overridden (required for audit log)…"
            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400 dark:focus:border-blue-500 resize-none"
          />
        </div>

        <div>
          <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Duration</label>
          <select
            value={duration}
            onChange={e => setDuration(e.target.value as typeof duration)}
            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 cursor-pointer"
          >
            {overrideDurationOptions.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3 py-2.5">
          <div>
            <p className="text-[12px] font-medium text-gray-700 dark:text-gray-200">Auto-revert</p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500">Automatically restore live rate after expiry</p>
          </div>
          <button onClick={() => setAutoRevert(v => !v)} className="cursor-pointer">
            <ToggleRight size={30} className={autoRevert ? 'text-blue-600' : 'text-gray-300 dark:text-gray-600 rotate-180'} />
          </button>
        </div>

        {autoRevert === false && duration !== 'Until Reverted' && (
          <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg px-3 py-2">
            <AlertTriangle size={13} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-700 dark:text-amber-400">
              Auto-revert is off — this override will stay active past its duration until manually reverted.
            </p>
          </div>
        )}

        <button
          disabled={!overrideRate || !reason}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-blue-600 text-white text-[13px] font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          Apply Override
        </button>
      </div>
    </div>
  );
}

function ActiveOverridesTable({ rows }: { rows: RateOverride[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
        <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Active &amp; Scheduled Overrides</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-190">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
              <th className="px-4 py-2.5 font-medium">Pair</th>
              <th className="px-2 py-2.5 font-medium">Live Rate</th>
              <th className="px-2 py-2.5 font-medium">Override Rate</th>
              <th className="px-2 py-2.5 font-medium">Diff</th>
              <th className="px-2 py-2.5 font-medium">Set By</th>
              <th className="px-2 py-2.5 font-medium">Expires</th>
              <th className="px-2 py-2.5 font-medium">Status</th>
              <th className="px-2 py-2.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-800 dark:text-gray-100">
                    <CurrencyFlag code={r.baseCurrency} /><CurrencyFlag code={r.quoteCurrency} />
                    {r.baseCurrency} / {r.quoteCurrency}
                  </span>
                </td>
                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{r.liveRate.toFixed(4)}</td>
                <td className="px-2 py-2.5 text-[13px] font-semibold text-gray-900 dark:text-white whitespace-nowrap">{r.overrideRate.toFixed(4)}</td>
                <td className="px-2 py-2.5 whitespace-nowrap">
                  <span className={`text-[12px] font-medium ${r.diffPct >= 0 ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                    {r.diffPct >= 0 ? '+' : ''}{r.diffPct.toFixed(2)}%
                  </span>
                </td>
                <td className="px-2 py-2.5 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-600 dark:text-gray-300">
                    <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[9px] font-semibold flex items-center justify-center">
                      {r.setByInitials}
                    </span>
                    {r.setBy}
                  </span>
                </td>
                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {r.expiresAt ? fmtDateTime(r.expiresAt) : 'Manual only'}
                </td>
                <td className="px-2 py-2.5 whitespace-nowrap">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${overrideStatusClasses[r.status]}`}>{r.status}</span>
                </td>
                <td className="px-2 py-2.5 text-right whitespace-nowrap">
                  {(r.status === 'Active' || r.status === 'Scheduled') ? (
                    <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-[11px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <RotateCcw size={11} /> Revert
                    </button>
                  ) : (
                    <span className="text-[11px] text-gray-300 dark:text-gray-600">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OverrideActivityLog({ rows }: { rows: OverrideLogEntry[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
      <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 mb-4">Override Activity Log</h3>
      <div className="space-y-4 max-h-140 overflow-y-auto pr-1">
        {rows.map((log, idx) => (
          <div key={log.id} className="flex gap-3 relative">
            {idx !== rows.length - 1 && (
              <div className="absolute left-3.75 top-7 -bottom-4 w-px bg-gray-100 dark:bg-gray-700" />
            )}
            <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold ${logActionClasses[log.action]}`}>
              {log.action[0]}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5 flex-wrap">
                <p className="text-[12px] font-medium text-gray-800 dark:text-gray-100">
                  {log.action} <span className="text-gray-400 dark:text-gray-500">·</span> {log.pairLabel}
                </p>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 whitespace-nowrap">{fmtDateTime(log.timestamp)}</span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-0.5">{log.note}</p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500">
                Rate: <span className="font-medium text-gray-600 dark:text-gray-300">{log.rate.toFixed(4)}</span> · by {log.performedBy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ManualOverridePanel() {
  return (
    <div>
      <OverrideStatCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <CreateOverrideForm />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <ActiveOverridesTable rows={rateOverrides} />
          <OverrideActivityLog rows={overrideLog} />
        </div>
      </div>
    </div>
  );
}


export default function ExchangeRatesPage() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Live Rates');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<CurrencyRate>(currencyRates[0]);

  const filteredRows = currencyRates.filter(r => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      r.baseCurrency.toLowerCase().includes(q) ||
      r.quoteCurrency.toLowerCase().includes(q) ||
      `${r.baseCurrency}/${r.quoteCurrency}`.toLowerCase().includes(q)
    );
  });

  const pairLabel = `${selected.baseCurrency} / ${selected.quoteCurrency}`;

  return (
    <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* header */}
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Exchange Rates</h1>
        <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
          <span>Dashboard</span><ChevronRight size={12} />
          <span>Exchange Rates</span><ChevronRight size={12} />
          <span className="text-gray-700 dark:text-gray-300 font-medium">Live Rates</span>
        </div>
      </div>

      {/* tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 dark:border-gray-700 mb-5">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2.5 text-[13px] font-medium border-b-2 -mb-px transition-colors cursor-pointer ${activeTab === tab
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Manual Override' && <ManualOverridePanel />}

      {activeTab === 'Spread Management' && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-10 text-center text-[13px] text-gray-400 dark:text-gray-500">
          Spread Management — coming soon
        </div>
      )}

      {activeTab === 'Live Rates' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* left / main column */}
          <div className="lg:col-span-2 space-y-4">
            <StatCards />

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
              <FilterBar search={search} setSearch={setSearch} />
              <RatesTable rows={filteredRows} selectedId={selected.id} onSelect={setSelected} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RateMovementChart pairLabel={pairLabel} />
              <RateSummaryCard />
            </div>
          </div>

          {/* right sidebar */}
          <div className="space-y-4">
            <RateDetailsPanel rate={selected} />
            <RateAlertCard />
          </div>
        </div>
      )}
    </div>
  );
}