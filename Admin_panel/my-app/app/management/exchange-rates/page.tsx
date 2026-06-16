"use client";
import { useState } from "react";

interface CurrencyPair {
  id: string; pair: string; baseCurrency: string; baseFlag: string;
  quoteCurrency: string; quoteFlag: string; liveRate: number;
  rateChange: number; rateChangePct: number; ourRate: number;
  spread: number; spreadPct: number; status: "Active" | "Inactive";
  baseName: string; quoteName: string; rateSource: string;
  nextUpdate: string; priority: string;
}

const pairs: CurrencyPair[] = [
  { id: "1", pair: "GBP / USD", baseCurrency: "GBP", baseFlag: "🇬🇧", quoteCurrency: "USD", quoteFlag: "🇺🇸", liveRate: 1.2567, rateChange: 0.0034, rateChangePct: 0.27, ourRate: 1.2486, spread: 0.0081, spreadPct: 0.65, status: "Active", baseName: "GBP - British Pound", quoteName: "USD - US Dollar", rateSource: "Xe.com", nextUpdate: "May 12, 2025 2:31 PM", priority: "1 (High)" },
  { id: "2", pair: "GBP / EUR", baseCurrency: "GBP", baseFlag: "🇬🇧", quoteCurrency: "EUR", quoteFlag: "🇪🇺", liveRate: 1.1678, rateChange: -0.0021, rateChangePct: -0.18, ourRate: 1.1603, spread: 0.0075, spreadPct: 0.64, status: "Active", baseName: "GBP - British Pound", quoteName: "EUR - Euro", rateSource: "Xe.com", nextUpdate: "May 12, 2025 2:31 PM", priority: "2 (High)" },
  { id: "3", pair: "GBP / BDT", baseCurrency: "GBP", baseFlag: "🇬🇧", quoteCurrency: "BDT", quoteFlag: "🇧🇩", liveRate: 154.8500, rateChange: 0.3200, rateChangePct: 0.21, ourRate: 153.6200, spread: 1.2300, spreadPct: 0.79, status: "Active", baseName: "GBP - British Pound", quoteName: "BDT - Bangladeshi Taka", rateSource: "Xe.com", nextUpdate: "May 12, 2025 2:31 PM", priority: "3 (Medium)" },
  { id: "4", pair: "USD / BDT", baseCurrency: "USD", baseFlag: "🇺🇸", quoteCurrency: "BDT", quoteFlag: "🇧🇩", liveRate: 123.2500, rateChange: 0.1500, rateChangePct: 0.12, ourRate: 122.3800, spread: 0.8700, spreadPct: 0.71, status: "Active", baseName: "USD - US Dollar", quoteName: "BDT - Bangladeshi Taka", rateSource: "Xe.com", nextUpdate: "May 12, 2025 2:31 PM", priority: "4 (Medium)" },
  { id: "5", pair: "EUR / USD", baseCurrency: "EUR", baseFlag: "🇪🇺", quoteCurrency: "USD", quoteFlag: "🇺🇸", liveRate: 1.0763, rateChange: 0.0015, rateChangePct: 0.14, ourRate: 1.0695, spread: 0.0068, spreadPct: 0.63, status: "Active", baseName: "EUR - Euro", quoteName: "USD - US Dollar", rateSource: "Xe.com", nextUpdate: "May 12, 2025 2:31 PM", priority: "5 (Medium)" },
  { id: "6", pair: "EUR / BDT", baseCurrency: "EUR", baseFlag: "🇪🇺", quoteCurrency: "BDT", quoteFlag: "🇧🇩", liveRate: 132.2800, rateChange: -0.2100, rateChangePct: -0.16, ourRate: 131.3200, spread: 0.9600, spreadPct: 0.73, status: "Active", baseName: "EUR - Euro", quoteName: "BDT - Bangladeshi Taka", rateSource: "Xe.com", nextUpdate: "May 12, 2025 2:31 PM", priority: "6 (Low)" },
  { id: "7", pair: "USD / EUR", baseCurrency: "USD", baseFlag: "🇺🇸", quoteCurrency: "EUR", quoteFlag: "🇪🇺", liveRate: 0.9289, rateChange: -0.0012, rateChangePct: -0.13, ourRate: 0.9232, spread: 0.0057, spreadPct: 0.61, status: "Active", baseName: "USD - US Dollar", quoteName: "EUR - Euro", rateSource: "Xe.com", nextUpdate: "May 12, 2025 2:31 PM", priority: "7 (Low)" },
  { id: "8", pair: "AUD / USD", baseCurrency: "AUD", baseFlag: "🇦🇺", quoteCurrency: "USD", quoteFlag: "🇺🇸", liveRate: 0.6642, rateChange: 0.0023, rateChangePct: 0.35, ourRate: 0.6600, spread: 0.0042, spreadPct: 0.63, status: "Active", baseName: "AUD - Australian Dollar", quoteName: "USD - US Dollar", rateSource: "Xe.com", nextUpdate: "May 12, 2025 2:31 PM", priority: "8 (Low)" },
];

const chartData1D = [1.231, 1.234, 1.2325, 1.236, 1.2345, 1.238, 1.240, 1.2385, 1.242, 1.2445, 1.243, 1.246, 1.248, 1.251, 1.249, 1.253, 1.252, 1.2555, 1.2567];
const chartData7D = [1.220, 1.225, 1.230, 1.228, 1.235, 1.240, 1.238, 1.245, 1.243, 1.249, 1.247, 1.252, 1.255, 1.2567];
const chartData30D = [1.210, 1.215, 1.220, 1.218, 1.225, 1.230, 1.228, 1.235, 1.240, 1.238, 1.245, 1.243, 1.249, 1.247, 1.252, 1.255, 1.2567];
const xLabels = ["12 AM", "03 AM", "06 AM", "09 AM", "12 PM", "03 PM", "06 PM", "09 PM"];

const RateChart = ({ points, color = "#2563eb" }: { points: number[]; color?: string }) => {
  const W = 400, H = 90, PX = 4, PY = 6;
  const max = Math.max(...points), min = Math.min(...points);
  const range = max - min || 0.001;
  const coords = points.map((p, i) => ({
    x: PX + (i / (points.length - 1)) * (W - PX * 2),
    y: PY + (1 - (p - min) / range) * (H - PY * 2),
  }));
  const line = coords.map(c => `${c.x},${c.y}`).join(" ");
  const area = `M${coords[0].x},${H} ` + coords.map(c => `L${c.x},${c.y}`).join(" ") + ` L${coords[coords.length - 1].x},${H} Z`;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} fill="none" preserveAspectRatio="none" className="block">
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#cg)" />
      <polyline points={line} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {coords.map((c, i) => <circle key={i} cx={c.x} cy={c.y} r="2.2" fill={color} stroke="#fff" strokeWidth="0.8" />)}
    </svg>
  );
};

const Toggle = ({ on }: { on: boolean }) => (
  <div className={`relative w-9 h-5 rounded-full cursor-pointer transition-colors ${on ? "bg-blue-600" : "bg-slate-300"}`}>
    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${on ? "left-4" : "left-0.5"}`} />
  </div>
);

const DR = ({ label, value, badge, toggle }: { label: string; value?: string; badge?: boolean; toggle?: boolean }) => (
  <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
    <span className="text-xs text-slate-500">{label}</span>
    {badge ? <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">Active</span>
      : toggle ? <Toggle on={true} />
        : <span className="text-xs text-slate-800 font-medium text-right max-w-[150px]">{value}</span>}
  </div>
);

export default function ExchangeRatesPage() {
  const [tab, setTab] = useState<"live" | "manual" | "spread">("live");
  const [selected, setSelected] = useState<CurrencyPair>(pairs[0]);
  const [showPanel, setShowPanel] = useState(true);
  const [range, setRange] = useState<"1D" | "7D" | "30D">("1D");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showMobilePanel, setShowMobilePanel] = useState(false);

  const chartPts = range === "1D" ? chartData1D : range === "7D" ? chartData7D : chartData30D;
  const filtered = pairs.filter(p => !search || p.pair.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="p-4 sm:p-6 max-w-screen-2xl mx-auto">

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold mb-1">Exchange Rates</h1>
          <nav className="flex items-center gap-1.5 text-sm text-slate-500">
            <span className="text-blue-600 cursor-pointer hover:underline">Dashboard</span>
            <span>›</span>
            <span className="text-blue-600 cursor-pointer hover:underline">Exchange Rates</span>
            <span>›</span>
            <span>Live Rates</span>
          </nav>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 mb-5 overflow-x-auto">
          {[["live", "Live Rates"], ["manual", "Manual Override"], ["spread", "Spread Management"]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k as any)}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors cursor-pointer
                ${tab === k ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}>
              {l}
            </button>
          ))}
        </div>

        {/* Layout */}
        <div className="flex gap-5 items-start">

          {/* Left */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* Stats Bar */}
            <div className="bg-white rounded-xl border border-slate-100 p-4 sm:p-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                {[
                  { label: "Total Currency Pairs", main: "28", sub: "Active Pairs", subVal: "28" },
                  { label: "Last Updated", main: "May 12, 2025 2:30 PM", sub: "Auto Refresh in 45s", dot: true },
                  { label: "Base Currency", main: "GBP", sub: "British Pound" },
                  { label: "Average Spread", main: "0.65%", sub: "Across all pairs" },
                  { label: "Rate Source", main: "Xe.com", sub: "Primary Provider", badge: true },
                ].map((s, i) => (
                  <div key={i} className="pt-4 sm:pt-0 sm:px-4 first:pt-0 first:pl-0 last:pr-0">
                    <p className="text-xs text-slate-400 font-medium mb-1">{s.label}</p>
                    <p className={`font-bold text-slate-900 mb-1 ${i === 1 ? "text-sm" : "text-xl"}`}>{s.main}</p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
                      {s.dot && <span className="text-green-500 text-base leading-none">●</span>}
                      <span>{s.sub}</span>
                      {s.subVal && <span className="font-semibold text-slate-800">{s.subVal}</span>}
                      {s.badge && <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Connected</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
              {/* Filters */}
              <div className="p-3 sm:p-4 border-b border-slate-100 flex flex-wrap gap-2 items-center">
                <div className="relative flex-1 min-w-[160px]">
                  <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" width="14" height="14" fill="none" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" /><path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search currency pair..."
                    className="w-full pl-8 pr-3 h-8 border border-slate-200 rounded-lg text-sm outline-none bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                {[
                  ["All Base Currencies", ["All Base Currencies", "GBP", "USD", "EUR", "AUD"]],
                  ["All Quote Currencies", ["All Quote Currencies", "USD", "EUR", "BDT", "AUD"]],
                  ["All Status", ["All Status", "Active", "Inactive"]],
                ].map(([ph, opts]: any) => (
                  <select key={ph} defaultValue={ph}
                    className="h-8 border border-slate-200 rounded-lg text-sm px-2 bg-white cursor-pointer text-slate-700 focus:ring-2 focus:ring-blue-500">
                    {opts.map((o: string) => <option key={o}>{o}</option>)}
                  </select>
                ))}
                <button className="h-8 px-3 border border-slate-200 rounded-lg bg-white text-sm text-slate-700 flex items-center gap-1.5 cursor-pointer hover:bg-slate-50">
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M22 3H2l8 9.46V19l4 2v-8.54z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Filters
                </button>
                <button className="h-8 w-8 border border-slate-200 rounded-lg bg-white flex items-center justify-center cursor-pointer hover:bg-slate-50">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      {["Currency Pair", "Base Currency", "Quote Currency", "Live Rate ↕", "Our Rate ↕", "Spread", "Spread (%)", "Last Updated", "Status", "Actions"].map(h => (
                        <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-slate-600 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p, i) => {
                      const active = selected.id === p.id;
                      const up = p.rateChange >= 0;
                      return (
                        <tr key={p.id} onClick={() => { setSelected(p); setShowPanel(true); setShowMobilePanel(true); }}
                          className={`border-b border-slate-50 cursor-pointer transition-colors hover:bg-blue-50
                            ${active ? "bg-blue-50" : i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                          <td className="px-3 py-2.5">
                            <div className="flex items-center gap-2">
                              <span className="text-base">{p.baseFlag}</span>
                              <span className="text-base">{p.quoteFlag}</span>
                              <span className="font-semibold text-slate-900 whitespace-nowrap">{p.pair}</span>
                            </div>
                          </td>
                          <td className="px-3 py-2.5 text-slate-600">{p.baseCurrency}</td>
                          <td className="px-3 py-2.5 text-slate-600">{p.quoteCurrency}</td>
                          <td className="px-3 py-2.5">
                            <div className="font-semibold text-slate-900">{p.liveRate.toFixed(4)}</div>
                            <div className={`text-xs ${up ? "text-green-600" : "text-red-500"}`}>
                              {up ? "+" : ""}{p.rateChange.toFixed(4)} ({up ? "+" : ""}{p.rateChangePct.toFixed(2)}%)
                            </div>
                          </td>
                          <td className="px-3 py-2.5 text-blue-600 font-medium">{p.ourRate.toFixed(4)}</td>
                          <td className="px-3 py-2.5 text-green-600 font-medium">{p.spread.toFixed(4)}</td>
                          <td className="px-3 py-2.5 text-slate-700">{p.spreadPct.toFixed(2)}%</td>
                          <td className="px-3 py-2.5">
                            <div className="text-xs text-slate-600">May 12, 2025</div>
                            <div className="text-xs text-slate-400">2:30 PM</div>
                          </td>
                          <td className="px-3 py-2.5">
                            <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">Active</span>
                          </td>
                          <td className="px-3 py-2.5" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center gap-1">
                              <button className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer rounded">
                                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                              </button>
                              <button className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer rounded">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-4 py-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm text-slate-500">Showing 1 to {filtered.length} of 28 currency pairs</span>
                <div className="flex items-center gap-1.5">
                  <button className="w-7 h-7 rounded-md border border-slate-200 bg-white flex items-center justify-center cursor-pointer hover:bg-slate-50">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                  </button>
                  {[1, 2, 3].map(n => (
                    <button key={n} onClick={() => setPage(n)}
                      className={`w-7 h-7 rounded-md border text-sm cursor-pointer transition-colors
                        ${page === n ? "bg-blue-600 text-white border-blue-600 font-semibold" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}>{n}</button>
                  ))}
                  <span className="text-slate-400 text-sm">...</span>
                  <button className="w-7 h-7 rounded-md border border-slate-200 bg-white text-sm cursor-pointer hover:bg-slate-50 text-slate-700">4</button>
                  <button className="w-7 h-7 rounded-md border border-slate-200 bg-white flex items-center justify-center cursor-pointer hover:bg-slate-50">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                  </button>
                  <select value={perPage} onChange={e => setPerPage(Number(e.target.value))}
                    className="h-7 border border-slate-200 rounded-md text-sm px-1.5 cursor-pointer bg-white text-slate-700">
                    {[10, 25, 50].map(n => <option key={n} value={n}>{n} / page</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Chart */}
              <div className="bg-white rounded-xl border border-slate-100 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm text-slate-800">Rate Movement ({selected.pair})</h3>
                  <div className="flex gap-1">
                    {(["1D", "7D", "30D"] as const).map(r => (
                      <button key={r} onClick={() => setRange(r)}
                        className={`px-2.5 py-1 rounded-md text-xs border cursor-pointer font-medium transition-colors
                          ${range === r ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"}`}>{r}</button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex flex-col justify-between pb-5 text-xs text-slate-400 text-right w-12 shrink-0">
                    {["1.2600", "1.2500", "1.2400", "1.2300", "1.2200"].map(v => <span key={v}>{v}</span>)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <RateChart points={chartPts} color="#2563eb" />
                    <div className="flex justify-between mt-1 text-xs text-slate-400">
                      {xLabels.map(l => <span key={l}>{l}</span>)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rate Summary */}
              <div className="bg-white rounded-xl border border-slate-100 p-4">
                <h3 className="font-semibold text-sm text-slate-800 mb-3">Rate Summary</h3>
                <div className="grid grid-cols-2 gap-x-8">
                  {[
                    ["Today's High", "1.2589", true], ["30 Days High", "1.2789", false],
                    ["Today's Low", "1.2432", true], ["30 Days Low", "1.2210", false],
                    ["7 Days High", "1.2654", false], ["Average (7D)", "1.2486", false],
                    ["7 Days Low", "1.2356", false], ["Volatility (7D)", "0.87%", false],
                  ].map(([label, value, hi]) => (
                    <div key={label as string} className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-xs text-slate-500">{label}</span>
                      <span className={`text-xs font-semibold ${hi ? "text-blue-600" : "text-slate-800"}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel — desktop */}
          {showPanel && (
            <div className="hidden xl:flex w-72 shrink-0 flex-col gap-4">
              <RateDetailsPanel selected={selected} onClose={() => setShowPanel(false)} />
            </div>
          )}
        </div>

        {/* Mobile: View Details Button */}
        <button onClick={() => setShowMobilePanel(true)}
          className="xl:hidden fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2.5 rounded-full shadow-lg text-sm font-semibold z-40 cursor-pointer">
          Rate Details
        </button>

        {/* Mobile Panel Overlay */}
        {showMobilePanel && (
          <div className="xl:hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
            onClick={() => setShowMobilePanel(false)}>
            <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:w-[380px] max-h-[85vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}>
              <RateDetailsPanel selected={selected} onClose={() => setShowMobilePanel(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RateDetailsPanel({ selected, onClose }: { selected: CurrencyPair; onClose: () => void }) {
  const up = selected.rateChange >= 0;
  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center">
        <span className="font-bold text-sm">Rate Details</span>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl leading-none cursor-pointer bg-none border-none">×</button>
      </div>
      <div className="p-4 space-y-4">
        {/* Pair */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl">{selected.baseFlag}</span>
            <span className="text-xl">{selected.quoteFlag}</span>
            <span className="font-bold text-base">{selected.pair}</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">Active</span>
        </div>

        {/* Rate boxes */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-500 mb-1">Live Rate</p>
            <p className="text-lg font-bold">{selected.liveRate.toFixed(4)}</p>
            <p className={`text-xs mt-0.5 ${up ? "text-green-600" : "text-red-500"}`}>
              {up ? "+" : ""}{selected.rateChange.toFixed(4)} ({up ? "+" : ""}{selected.rateChangePct.toFixed(2)}%)
            </p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-500 mb-1">Our Rate</p>
            <p className="text-lg font-bold">{selected.ourRate.toFixed(4)}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-500 mb-1">Spread</p>
            <p className="text-base font-bold">{selected.spread.toFixed(4)}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-500 mb-1">Spread (%)</p>
            <p className="text-base font-bold">{selected.spreadPct.toFixed(2)}%</p>
          </div>
        </div>

        {/* Rate Info */}
        <div>
          <p className="font-bold text-sm mb-2">Rate Information</p>
          <DR label="Base Currency" value={selected.baseName} />
          <DR label="Quote Currency" value={selected.quoteName} />
          <DR label="Rate Source" value={selected.rateSource} />
          <DR label="Last Updated" value="May 12, 2025 2:30 PM" />
          <DR label="Next Update" value={selected.nextUpdate} />
          <DR label="Status" badge />
          <DR label="Auto Update" toggle />
          <DR label="Priority" value={selected.priority} />
        </div>

        {/* Quick Actions */}
        <div>
          <p className="font-bold text-sm mb-2">Quick Actions</p>
          <div className="grid grid-cols-2 gap-2 mb-2">
            {[
              ["Manual Override", "M-12 12 15l-4 1 1-4 9.5-9.5z"],
              ["Edit Spread", "M12 1v2m0 18v2M4.22 4.22l1.42 1.42"],
            ].map(([label]) => (
              <button key={label} className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 cursor-pointer">
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" className="shrink-0">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {label}
              </button>
            ))}
          </div>
          <button className="w-full flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 cursor-pointer">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            View History
          </button>
        </div>

        {/* Rate Alert */}
        <div className="bg-slate-50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="font-bold text-sm">Rate Alert</span>
          </div>
          <p className="text-xs text-slate-500 mb-2">Create alerts for rate movements</p>
          <button className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 cursor-pointer">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            Create Alert
          </button>
        </div>
      </div>
    </div>
  );
}