"use client";
import { useState } from "react";


const statCards = [
  { label: "Total Transactions", value: "24,752", change: "+12.5%", positive: true, sub: "vs last 7 days", color: "#2563eb", bgColor: "#eff6ff" },
  { label: "Total Cash Pickups", value: "8,642", change: "+8.3%", positive: true, sub: "vs last 7 days", color: "#f59e0b", bgColor: "#fffbeb" },
  { label: "Total Revenue (Fees)", value: "$425,780", change: "+15.7%", positive: true, sub: "vs last 7 days", color: "#16a34a", bgColor: "#f0fdf4" },
  { label: "Total Payouts", value: "$4,256,540", change: "+10.2%", positive: true, sub: "vs last 7 days", color: "#0891b2", bgColor: "#ecfeff" },
  { label: "Pending Transactions", value: "1,248", change: "+5.2%", positive: true, sub: "vs last 7 days", color: "#d97706", bgColor: "#fefce8" },
  { label: "Failed Transactions", value: "156", change: "-3.1%", positive: false, sub: "vs last 7 days", color: "#dc2626", bgColor: "#fef2f2" },
  { label: "Active Users", value: "12,856", change: "+9.4%", positive: true, sub: "vs last 7 days", color: "#7c3aed", bgColor: "#faf5ff" },
  { label: "Active Agents", value: "214", change: "+6.7%", positive: true, sub: "vs last 7 days", color: "#db2777", bgColor: "#fdf2f8" },
];

const dailyLabels = ["May 6", "May 7", "May 8", "May 9", "May 10", "May 11", "May 12"];
const dailyValues = [2100, 3200, 2800, 3800, 3400, 4600, 4900];

const monthlyLabels = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
const monthlyValues = [180000, 220000, 160000, 290000, 340000, 410000, 425780];

const statusDist = [
  { label: "Completed", value: 18752, pct: 75.8, color: "#16a34a" },
  { label: "Pending", value: 3124, pct: 12.6, color: "#f59e0b" },
  { label: "Failed", value: 1563, pct: 6.3, color: "#ef4444" },
  { label: "Refunded", value: 1313, pct: 5.3, color: "#6366f1" },
];

const recentTxns = [
  { id: "TXN-2505124789", sender: "John Doe", recipient: "Rahim Uddin", sendCountry: "United Kingdom", sendFlag: "🇬🇧", recvCountry: "Bangladesh", recvFlag: "🇧🇩", amount: "£500.00", currency: "GBP", rate: "165.2500", fee: "£3.50", netPayout: "৳62,625.00", status: "Completed", dt: "May 12, 2025 10:30 AM" },
  { id: "TXN-2505124788", sender: "Ahmed Khan", recipient: "Maria Santos", sendCountry: "United States", sendFlag: "🇺🇸", recvCountry: "Philippines", recvFlag: "🇵🇭", amount: "$300.00", currency: "USD", rate: "122.2500", fee: "$2.50", netPayout: "₱36,675.00", status: "Pending", dt: "May 12, 2025 09:15 AM" },
  { id: "TXN-2505124787", sender: "Rashid Ahmed", recipient: "Sabir Hossain", sendCountry: "United Kingdom", sendFlag: "🇬🇧", recvCountry: "Bangladesh", recvFlag: "🇧🇩", amount: "£28.00", currency: "GBP", rate: "165.2500", fee: "£4.00", netPayout: "৳123,937.50", status: "Completed", dt: "May 12, 2025 08:45 AM" },
  { id: "TXN-2505124786", sender: "Imran Hossain", recipient: "Mohammed Ali", sendCountry: "Saudi Arabia", sendFlag: "🇸🇦", recvCountry: "Bangladesh", recvFlag: "🇧🇩", amount: "SAR 1,000.00", currency: "SAR", rate: "28.5600", fee: "SAR 8.00", netPayout: "৳30,560.00", status: "Failed", dt: "May 12, 2025 08:20 AM" },
  { id: "TXN-2505124785", sender: "Fatima Ali", recipient: "Arif Khan", sendCountry: "United Arab Emirates", sendFlag: "🇦🇪", recvCountry: "Pakistan", recvFlag: "🇵🇰", amount: "AED 1,250.00", currency: "AED", rate: "33.2800", fee: "AED 6.00", netPayout: "Rs. 162,100.00", status: "Pending", dt: "May 12, 2025 07:55 AM" },
];

const corridors = [
  { name: "UK → Bangladesh", txns: 5248, vol: "£2,456,780", pct: 100 },
  { name: "USA → Bangladesh", txns: 4125, vol: "$1,856,230", pct: 79 },
  { name: "UAE → Pakistan", txns: 2856, vol: "AED 3,125,450", pct: 54 },
  { name: "Saudi Arabia → Bangladesh", txns: 1985, vol: "SAR 2,145,600", pct: 38 },
  { name: "Canada → India", txns: 1256, vol: "CAD 856,230", pct: 24 },
];

const agents = [
  { name: "Abul Hasan", branch: "Gulshan Branch", av: "AH", txns: 1256, rate: "98.5%" },
  { name: "Kamal Hossain", branch: "Uttara Branch", av: "KH", txns: 985, rate: "97.2%" },
  { name: "Juan Dela Cruz", branch: "Manila Branch", av: "JD", txns: 874, rate: "96.1%" },
  { name: "Amit Kumar", branch: "Mumbai Branch", av: "AK", txns: 763, rate: "95.7%" },
  { name: "Rashed Alom", branch: "Sylhet Branch", av: "RA", txns: 654, rate: "95.4%" },
];

const revenueSummary = [
  ["Total Fees Collected", "$425,780"],
  ["Transaction Count", "24,752"],
  ["Average Fee per Transaction", "$17.20"],
  ["Total Payouts", "$4,256,540"],
  ["Net Revenue", "$425,780"],
];

const quickReports = [
  "Transaction Report", "Cash Pickup Report", "Agent Performance Report",
  "Revenue & Finance Report", "Compliance Report", "Customer Report", "System Activity Report",
];

const schedules = [
  { label: "Daily Transaction Report", sub: "Every day at 06:00 AM", on: true },
  { label: "Weekly Summary Report", sub: "Every Monday at 09:00 AM", on: true },
  { label: "Monthly Revenue Report", sub: "1st of every month at 10:00 AM", on: true },
  { label: "Compliance Summary Report", sub: "Every Friday at 06:00 PM", on: false },
];

const recentExports = [
  { name: "Transaction_Report_May_12_2025.xlsx", date: "May 12, 2025 10:30 AM", type: "xlsx" },
  { name: "Revenue_Report_April_2025.pdf", date: "May 12, 2025 09:15 AM", type: "pdf" },
  { name: "Agent_Performance_May_2025.xlsx", date: "May 12, 2025 08:45 AM", type: "xlsx" },
];

const avColors: Record<string, string> = { AH: "#2563eb", KH: "#0891b2", JD: "#7c3aed", AK: "#16a34a", RA: "#f59e0b" };


const Spark = ({ color, up }: { color: string; up: boolean }) => {
  const pts = up
    ? [4, 10, 6, 14, 8, 12, 5, 16, 9, 18, 11, 20, 14, 22]
    : [20, 16, 18, 12, 16, 10, 14, 8, 12, 6, 10, 5, 8, 4];
  const W = 120, H = 28, max = Math.max(...pts), min = Math.min(...pts), r = max - min || 1;
  const coords = pts.map((p, i) => ({ x: (i / (pts.length - 1)) * W, y: 2 + (1 - (p - min) / r) * (H - 4) }));
  const line = coords.map(c => `${c.x},${c.y}`).join(" ");
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" className="block mt-2">
      <polyline points={line} stroke={color} strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {coords.map((c, i) => <circle key={i} cx={c.x} cy={c.y} r="2.4" fill={color} stroke="#fff" strokeWidth="0.8" />)}
    </svg>
  );
};


const LineChart = ({ labels, values }: { labels: string[]; values: number[] }) => {
  const W = 400, H = 160, PX = 36, PY = 12, PB = 28;
  const max = Math.max(...values), min = 0;
  const range = max - min || 1;
  const coords = values.map((v, i) => ({
    x: PX + (i / (values.length - 1)) * (W - PX - 8),
    y: PY + (1 - (v - min) / range) * (H - PY - PB),
  }));
  const line = coords.map(c => `${c.x},${c.y}`).join(" ");
  const area = `M${coords[0].x},${H - PB} ` + coords.map(c => `L${c.x},${c.y}`).join(" ") + ` L${coords[coords.length - 1].x},${H - PB} Z`;
  const yTicks = [0, 1000, 2000, 3000, 4000, 5000];
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} fill="none" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {yTicks.map(v => {
        const y = PY + (1 - v / max) * (H - PY - PB);
        return (
          <g key={v}>
            <line x1={PX} y1={y} x2={W - 4} y2={y} stroke="#f1f5f9" strokeWidth="1" />
            <text x={PX - 4} y={y + 4} textAnchor="end" fontSize="8" fill="#94a3b8">{v >= 1000 ? `${v / 1000}K` : v}</text>
          </g>
        );
      })}
      <path d={area} fill="url(#lg1)" />
      <polyline points={line} stroke="#2563eb" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {coords.map((c, i) => <circle key={i} cx={c.x} cy={c.y} r="3.5" fill="#2563eb" stroke="#fff" strokeWidth="1.5" />)}
      {labels.map((l, i) => {
        const x = PX + (i / (labels.length - 1)) * (W - PX - 8);
        return <text key={l} x={x} y={H - 4} textAnchor="middle" fontSize="8" fill="#94a3b8">{l}</text>;
      })}
    </svg>
  );
};


const BarChart = ({ labels, values }: { labels: string[]; values: number[] }) => {
  const W = 400, H = 160, PX = 40, PY = 12, PB = 24;
  const max = Math.max(...values);
  const barW = (W - PX - 8) / values.length * 0.55;
  const gap = (W - PX - 8) / values.length;
  const yTicks = [0, 100000, 200000, 300000, 400000];
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} fill="none" preserveAspectRatio="none">
      {yTicks.map(v => {
        const y = PY + (1 - v / max) * (H - PY - PB);
        return (
          <g key={v}>
            <line x1={PX} y1={y} x2={W - 4} y2={y} stroke="#f1f5f9" strokeWidth="1" />
            <text x={PX - 4} y={y + 4} textAnchor="end" fontSize="8" fill="#94a3b8">{v === 0 ? "$0" : `$${v / 1000}K`}</text>
          </g>
        );
      })}
      {values.map((v, i) => {
        const x = PX + i * gap + (gap - barW) / 2;
        const barH = (v / max) * (H - PY - PB);
        const y = PY + (H - PY - PB) - barH;
        return <rect key={i} x={x} y={y} width={barW} height={barH} fill="#2563eb" rx="3" />;
      })}
      {labels.map((l, i) => {
        const x = PX + i * gap + gap / 2;
        return <text key={l} x={x} y={H - 4} textAnchor="middle" fontSize="8.5" fill="#94a3b8">{l}</text>;
      })}
    </svg>
  );
};


const DonutChart = () => {
  const cx = 70, cy = 70, R = 54, r = 36;
  let cumPct = 0;
  const slices = statusDist.map(d => {
    const start = cumPct;
    cumPct += d.pct;
    return { ...d, start, end: cumPct };
  });
  const toXY = (pct: number, radius: number) => {
    const rad = (pct / 100) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };
  const arc = (start: number, end: number) => {
    const s = toXY(start, R), e = toXY(end, R);
    const si = toXY(start, r), ei = toXY(end, r);
    const large = end - start > 50 ? 1 : 0;
    return `M${s.x},${s.y} A${R},${R} 0 ${large} 1 ${e.x},${e.y} L${ei.x},${ei.y} A${r},${r} 0 ${large} 0 ${si.x},${si.y} Z`;
  };
  return (
    <svg viewBox="0 0 140 140" className="w-full max-w-[140px]">
      {slices.map(s => (
        <path key={s.label} d={arc(s.start, s.end)} fill={s.color} stroke="#fff" strokeWidth="2" />
      ))}
      <circle cx={cx} cy={cy} r={r - 2} fill="white" />
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">24,752</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="8" fill="#64748b">Total</text>
    </svg>
  );
};


const WorldMap = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 500 280" className="w-full h-full" fill="none">
      <rect width="500" height="280" fill="#f8fafc" rx="4" />
      
      <path d="M 60 60 Q 80 40 110 50 Q 130 45 145 60 Q 155 70 150 90 Q 145 110 130 120 Q 110 130 95 125 Q 80 120 70 110 Q 55 95 60 60 Z" fill="#dbeafe" stroke="#bfdbfe" strokeWidth="1" />
      <path d="M 110 145 Q 125 135 140 145 Q 155 155 155 175 Q 155 200 140 215 Q 125 225 115 215 Q 100 205 100 185 Q 98 165 110 145 Z" fill="#dbeafe" stroke="#bfdbfe" strokeWidth="1" />
      <path d="M 220 55 Q 240 45 260 50 Q 275 55 278 68 Q 280 82 265 90 Q 250 95 235 88 Q 218 78 220 55 Z" fill="#dbeafe" stroke="#bfdbfe" strokeWidth="1" />
      <path d="M 225 105 Q 245 95 265 100 Q 285 108 290 130 Q 295 160 285 185 Q 275 205 255 210 Q 235 212 222 195 Q 210 178 212 155 Q 213 125 225 105 Z" fill="#dbeafe" stroke="#bfdbfe" strokeWidth="1" />
      <path d="M 280 48 Q 330 35 380 45 Q 420 52 435 70 Q 445 88 435 105 Q 420 120 390 125 Q 355 128 325 118 Q 295 108 282 90 Q 270 72 280 48 Z" fill="#dbeafe" stroke="#bfdbfe" strokeWidth="1" />
      <circle cx="368" cy="115" r="12" fill="#2563eb" opacity="0.8" />
      <circle cx="368" cy="115" r="7" fill="#1d4ed8" />
      <path d="M 380 170 Q 410 158 435 168 Q 455 178 455 198 Q 452 218 430 225 Q 408 228 392 218 Q 375 205 375 188 Q 374 176 380 170 Z" fill="#dbeafe" stroke="#bfdbfe" strokeWidth="1" />
      <circle cx="237" cy="62" r="7" fill="#3b82f6" opacity="0.7" />
      <circle cx="328" cy="100" r="6" fill="#3b82f6" opacity="0.6" />
      <circle cx="310" cy="108" r="8" fill="#60a5fa" opacity="0.5" />
      <circle cx="82" cy="60" r="6" fill="#60a5fa" opacity="0.5" />
      <rect x="10" y="255" width="80" height="8" rx="2" fill="url(#mapGrad)" />
      <defs>
        <linearGradient id="mapGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <text x="10" y="272" fontSize="7" fill="#64748b">Low</text>
      <text x="72" y="272" fontSize="7" fill="#64748b">High</text>
    </svg>
  </div>
);


const Toggle = ({ on }: { on: boolean }) => (
  <div className={`relative w-9 h-[18px] rounded-full cursor-pointer flex-shrink-0 transition-colors ${on ? "bg-blue-600" : "bg-slate-300"}`}>
    <div className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white transition-all ${on ? "left-[18px]" : "left-[2px]"}`} />
  </div>
);


const StatusBadge = ({ s }: { s: string }) => {
  const map: Record<string, string> = { Completed: "bg-green-100 text-green-700", Pending: "bg-yellow-100 text-yellow-700", Failed: "bg-red-100 text-red-600" };
  return <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${map[s] || "bg-slate-100 text-slate-600"}`}>{s}</span>;
};

// ── ICON SVG helpers ──────────────────────────────────────────────────────────
const DocIcon = () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
const ChevronRight = () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
const XlsIcon = () => <div className="w-7 h-7 rounded bg-green-100 flex items-center justify-center text-green-700 text-[9px] font-bold">XLS</div>;
const PdfIcon = () => <div className="w-7 h-7 rounded bg-red-100 flex items-center justify-center text-red-600 text-[9px] font-bold">PDF</div>;

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function ReportsAnalyticsPage() {
  const [txFilter, setTxFilter] = useState("All Countries");
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="p-4 sm:p-5 lg:p-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-0.5">Reports & Analytics Overview</h1>
            <p className="text-sm text-slate-500">Comprehensive insights and performance analytics across the platform.</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-700 hover:bg-slate-50 cursor-pointer whitespace-nowrap">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" /><line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" /><line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" /></svg>
              May 6 – May 12, 2025
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-700 hover:bg-slate-50 cursor-pointer">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M22 3H2l8 9.46V19l4 2v-8.54z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 cursor-pointer whitespace-nowrap">
              Export Report
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>

        {/* Main layout: left content + right sidebar */}
        <div className="flex gap-5 items-start">
          <div className="flex-1 min-w-0 space-y-5">

            {/* Stat Cards — 4 per row on lg, 2 on sm, 1 on xs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3">
              {statCards.map((s, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-100 p-3 sm:p-4">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-[11px] text-slate-500 leading-tight">{s.label}</p>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.bgColor }}>
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
                        <path d="M12 2v20M2 12h20" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-slate-900 leading-tight">{s.value}</p>
                  <p className={`text-[11px] mt-0.5 ${s.positive ? "text-green-600" : "text-red-500"}`}>
                    {s.change} <span className="text-slate-400">{s.sub}</span>
                  </p>
                  <Spark color={s.color} up={s.positive} />
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {/* Daily Volume */}
              <div className="bg-white rounded-xl border border-slate-100 p-4 md:col-span-1">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-sm">Daily Transaction Volume</h3>
                  <select className="text-xs border border-slate-200 rounded-md px-2 py-1 bg-white text-slate-600 cursor-pointer">
                    <option>This Week</option>
                    <option>Last Week</option>
                  </select>
                </div>
                <div className="h-[160px]">
                  <LineChart labels={dailyLabels} values={dailyValues} />
                </div>
              </div>

              {/* Monthly Revenue */}
              <div className="bg-white rounded-xl border border-slate-100 p-4 md:col-span-1">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-sm">Monthly Revenue Trend</h3>
                  <select className="text-xs border border-slate-200 rounded-md px-2 py-1 bg-white text-slate-600 cursor-pointer">
                    <option>This Month</option>
                    <option>Last Month</option>
                  </select>
                </div>
                <div className="h-[160px]">
                  <BarChart labels={monthlyLabels} values={monthlyValues} />
                </div>
              </div>

              {/* World Map */}
              <div className="bg-white rounded-xl border border-slate-100 p-4 md:col-span-1">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-sm">Transactions by Country</h3>
                  <select className="text-xs border border-slate-200 rounded-md px-2 py-1 bg-white text-slate-600 cursor-pointer">
                    <option>This Month</option>
                  </select>
                </div>
                <div className="h-[160px]">
                  <WorldMap />
                </div>
              </div>

              {/* Status Distribution */}
              <div className="bg-white rounded-xl border border-slate-100 p-4 md:col-span-1">
                <h3 className="font-semibold text-sm mb-3">Status Distribution</h3>
                <div className="flex items-center gap-3">
                  <DonutChart />
                  <div className="space-y-1.5 flex-1">
                    {statusDist.map(s => (
                      <div key={s.label} className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                        <div>
                          <p className="text-[11px] font-medium text-slate-700">{s.label}</p>
                          <p className="text-[10px] text-slate-400">{s.value.toLocaleString()} ({s.pct}%)</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100">
                <h3 className="font-bold text-sm mb-3">Recent Transactions</h3>
                <div className="flex flex-wrap gap-2 items-center">
                  <div className="relative flex-1 min-w-[160px]">
                    <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" width="13" height="13" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" /><path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                    <input placeholder="Search by transaction number..." className="w-full pl-7 pr-3 h-8 border border-slate-200 rounded-lg text-xs outline-none bg-slate-50 focus:ring-2 focus:ring-blue-500" />
                  </div>
                  {["All Countries", "All Currencies", "All Status", "All Agents"].map(opt => (
                    <select key={opt} defaultValue={opt} className="h-8 border border-slate-200 rounded-lg text-xs px-2 bg-white cursor-pointer text-slate-600">
                      <option>{opt}</option>
                    </select>
                  ))}
                  <button className="h-8 px-3 border border-slate-200 rounded-lg bg-white text-xs text-slate-600 flex items-center gap-1 cursor-pointer hover:bg-slate-50">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M22 3H2l8 9.46V19l4 2v-8.54z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                    More Filters
                  </button>
                  <button className="h-8 px-3 border border-slate-200 rounded-lg bg-white text-xs text-slate-600 flex items-center gap-1 cursor-pointer hover:bg-slate-50">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                    Export
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      {["Transaction No.", "Sender", "Recipient", "Send Country", "Receive Country", "Amount", "Currency", "Rate", "Fee", "Net Payout", "Status", "Date & Time", "Actions"].map(h => (
                        <th key={h} className="px-3 py-2.5 text-left font-semibold text-slate-600 whitespace-nowrap text-[11px]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentTxns.map((t, i) => (
                      <tr key={t.id} className={`border-b border-slate-50 hover:bg-blue-50 cursor-pointer ${i % 2 === 0 ? "bg-white" : "bg-slate-50/40"}`}>
                        <td className="px-3 py-2.5 font-medium text-blue-600 whitespace-nowrap">{t.id}</td>
                        <td className="px-3 py-2.5 text-slate-700 whitespace-nowrap">{t.sender}</td>
                        <td className="px-3 py-2.5 text-slate-700 whitespace-nowrap">{t.recipient}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap"><span className="mr-1">{t.sendFlag}</span>{t.sendCountry}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap"><span className="mr-1">{t.recvFlag}</span>{t.recvCountry}</td>
                        <td className="px-3 py-2.5 font-medium whitespace-nowrap">{t.amount}</td>
                        <td className="px-3 py-2.5 text-slate-500">{t.currency}</td>
                        <td className="px-3 py-2.5 text-slate-700">{t.rate}</td>
                        <td className="px-3 py-2.5 text-slate-700">{t.fee}</td>
                        <td className="px-3 py-2.5 font-medium whitespace-nowrap">{t.netPayout}</td>
                        <td className="px-3 py-2.5"><StatusBadge s={t.status} /></td>
                        <td className="px-3 py-2.5 text-slate-500 whitespace-nowrap">{t.dt}</td>
                        <td className="px-3 py-2.5">
                          <button className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom 3 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Top Corridors */}
              <div className="bg-white rounded-xl border border-slate-100 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm">Top Sending Corridors <span className="text-slate-400 font-normal text-xs">(This Month)</span></h3>
                </div>
                <div className="space-y-1 mb-1">
                  <div className="grid grid-cols-3 text-[11px] text-slate-400 font-semibold pb-1 border-b border-slate-100">
                    <span>Corridor</span><span className="text-right">Transactions</span><span className="text-right">Total Volume</span>
                  </div>
                  {corridors.map((c, i) => (
                    <div key={i} className="grid grid-cols-3 text-xs py-2 border-b border-slate-50">
                      <span className="text-slate-700 font-medium text-[11px]">{c.name}</span>
                      <span className="text-right text-slate-600">{c.txns.toLocaleString()}</span>
                      <span className="text-right text-slate-700 font-medium">{c.vol}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-2 flex items-center gap-1 text-blue-600 text-xs font-medium hover:underline cursor-pointer">
                  View All Corridors →
                </button>
              </div>

              {/* Top Agents */}
              <div className="bg-white rounded-xl border border-slate-100 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm">Top Agents by Transactions <span className="text-slate-400 font-normal text-xs">(This Month)</span></h3>
                </div>
                <div className="space-y-1 mb-1">
                  <div className="grid grid-cols-4 text-[11px] text-slate-400 font-semibold pb-1 border-b border-slate-100">
                    <span className="col-span-2">Agent</span><span className="text-right">Txns</span><span className="text-right">Rate</span>
                  </div>
                  {agents.map((a, i) => (
                    <div key={i} className="grid grid-cols-4 items-center py-2 border-b border-slate-50">
                      <div className="col-span-2 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                          style={{ background: avColors[a.av] || "#64748b" }}>{a.av}</div>
                        <div>
                          <p className="text-xs font-medium text-slate-800 leading-tight">{a.name}</p>
                          <p className="text-[10px] text-slate-400 leading-tight">{a.branch}</p>
                        </div>
                      </div>
                      <span className="text-right text-xs text-slate-600">{a.txns.toLocaleString()}</span>
                      <span className="text-right text-xs font-medium text-green-600">{a.rate}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-2 flex items-center gap-1 text-blue-600 text-xs font-medium hover:underline cursor-pointer">
                  View All Agents →
                </button>
              </div>

              {/* Revenue Summary */}
              <div className="bg-white rounded-xl border border-slate-100 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm">Revenue Summary <span className="text-slate-400 font-normal text-xs">(This Month)</span></h3>
                </div>
                <div className="space-y-0">
                  {revenueSummary.map(([label, value], i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-slate-50">
                      <span className="text-xs text-slate-500">{label}</span>
                      <span className="text-sm font-bold text-slate-900">{value}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-3 flex items-center gap-1 text-blue-600 text-xs font-medium hover:underline cursor-pointer">
                  View Full Report →
                </button>
              </div>
            </div>

          </div>{/* end left */}

          {/* RIGHT SIDEBAR */}
          <div className="hidden xl:flex w-64 shrink-0 flex-col gap-4">

            {/* Quick Reports */}
            <div className="bg-white rounded-xl border border-slate-100 p-4">
              <h3 className="font-bold text-sm mb-3">Quick Reports</h3>
              <div className="space-y-0.5">
                {quickReports.map(r => (
                  <button key={r} className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-50 cursor-pointer text-left group transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <DocIcon />
                      </div>
                      <span className="text-xs text-slate-700 font-medium">{r}</span>
                    </div>
                    <span className="text-slate-300 group-hover:text-slate-500 transition-colors"><ChevronRight /></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Report Schedules */}
            <div className="bg-white rounded-xl border border-slate-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm">Report Schedules</h3>
                <button className="text-xs text-blue-600 hover:underline cursor-pointer">View All</button>
              </div>
              <div className="space-y-3">
                {schedules.map((s, i) => (
                  <div key={i} className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-700 truncate">{s.label}</p>
                      <p className="text-[10px] text-slate-400 leading-tight">{s.sub}</p>
                    </div>
                    <Toggle on={s.on} />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Exports */}
            <div className="bg-white rounded-xl border border-slate-100 p-4">
              <h3 className="font-bold text-sm mb-3">Recent Exports</h3>
              <div className="space-y-2.5">
                {recentExports.map((e, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    {e.type === "xlsx" ? <XlsIcon /> : <PdfIcon />}
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium text-slate-700 truncate">{e.name}</p>
                      <p className="text-[10px] text-slate-400">{e.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-3 flex items-center gap-1 text-blue-600 text-xs font-medium hover:underline cursor-pointer">
                View All Exports →
              </button>
            </div>
          </div>

        </div>{/* end flex */}

        {/* Mobile sidebar collapsed at bottom */}
        <div className="xl:hidden mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Quick Reports mobile */}
          <div className="bg-white rounded-xl border border-slate-100 p-4">
            <h3 className="font-bold text-sm mb-3">Quick Reports</h3>
            <div className="space-y-0.5">
              {quickReports.slice(0, 4).map(r => (
                <button key={r} className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-slate-50 cursor-pointer text-left">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 text-[10px]">
                      <DocIcon />
                    </div>
                    <span className="text-xs text-slate-700">{r}</span>
                  </div>
                  <ChevronRight />
                </button>
              ))}
            </div>
          </div>
          {/* Schedules mobile */}
          <div className="bg-white rounded-xl border border-slate-100 p-4">
            <h3 className="font-bold text-sm mb-3">Report Schedules</h3>
            <div className="space-y-3">
              {schedules.map((s, i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-700 truncate">{s.label}</p>
                    <p className="text-[10px] text-slate-400">{s.sub}</p>
                  </div>
                  <Toggle on={s.on} />
                </div>
              ))}
            </div>
          </div>
          {/* Exports mobile */}
          <div className="bg-white rounded-xl border border-slate-100 p-4">
            <h3 className="font-bold text-sm mb-3">Recent Exports</h3>
            <div className="space-y-2.5">
              {recentExports.map((e, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  {e.type === "xlsx" ? <XlsIcon /> : <PdfIcon />}
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-slate-700 truncate">{e.name}</p>
                    <p className="text-[10px] text-slate-400">{e.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}