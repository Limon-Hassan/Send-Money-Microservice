"use client";

import { useState, useMemo } from "react";
import {
  type AllTransaction,
  type TxStatus,
  type TxMethod,
  type TxMethodType,
  allTransactionsData,
  txStatCards,
  txStatusOptions,
  txCountryOptions,
  txMethodOptions,
  TX_TOTAL,
  TX_PAGE_SIZE,
} from "@/lib/data";

// ─── Status styles ────────────────────────────────────────────────────────────
const statusStyle: Record<TxStatus, { bg: string; text: string; dot: string }> = {
  Completed: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  Pending: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400" },
  Failed: { bg: "bg-red-50", text: "text-red-600", dot: "bg-red-500" },
  Refunded: { bg: "bg-indigo-50", text: "text-indigo-600", dot: "bg-indigo-400" },
};

// ─── Sparkline with dots + hover tooltip ─────────────────────────────────────
const Sparkline = ({ points, color }: { points: number[]; color: string }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const W = 120, H = 36, PAD = 6;

  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;

  const xs = points.map((_, i) => PAD + (i / (points.length - 1)) * (W - PAD * 2));
  const ys = points.map(v => PAD + (1 - (v - min) / range) * (H - PAD * 2));

  const linePath = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");

  // filled area under line
  const areaPath = `${linePath} L${xs[xs.length - 1].toFixed(1)},${H} L${xs[0].toFixed(1)},${H} Z`;

  return (
    <div className="relative" style={{ width: W, height: H }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" className="overflow-visible">
        {/* area fill */}
        <path d={areaPath} fill={color} fillOpacity="0.08" />
        {/* line */}
        <path d={linePath} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* dots */}
        {xs.map((x, i) => (
          <g key={i}>
            {/* invisible hit area */}
            <circle
              cx={x} cy={ys[i]} r={8}
              fill="transparent"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            />
            {/* visible dot */}
            <circle
              cx={x} cy={ys[i]}
              r={hovered === i ? 4 : 2.5}
              fill={color}
              stroke="white"
              strokeWidth={hovered === i ? 2 : 1.5}
              style={{ transition: "r 0.1s" }}
              pointerEvents="none"
            />
          </g>
        ))}
      </svg>

      {/* Tooltip */}
      {hovered !== null && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: xs[hovered],
            top: ys[hovered] - 28,
            transform: "translateX(-50%)",
          }}
        >
          <div
            className="text-white text-[10px] font-semibold px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap"
            style={{ backgroundColor: color }}
          >
            {points[hovered].toLocaleString()}
          </div>
          {/* arrow */}
          <div className="flex justify-center">
            <div className="w-0 h-0" style={{
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderTop: `4px solid ${color}`,
            }} />
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ initials, size = "md" }: { initials: string; size?: "sm" | "md" }) => {
  const palettes = [
    "bg-blue-100 text-blue-700", "bg-green-100 text-green-700",
    "bg-purple-100 text-purple-700", "bg-pink-100 text-pink-700",
    "bg-amber-100 text-amber-700", "bg-cyan-100 text-cyan-700",
    "bg-rose-100 text-rose-700", "bg-teal-100 text-teal-700",
  ];
  const palette = palettes[(initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % palettes.length];
  return (
    <span className={`inline-flex items-center justify-center rounded-full font-semibold shrink-0 ${size === "sm" ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm"} ${palette}`}>
      {initials.slice(0, 2)}
    </span>
  );
};

// ─── Method badge ─────────────────────────────────────────────────────────────
const MethodBadge = ({ type, method }: { type: TxMethodType; method: TxMethod }) => {
  if (method === "Visa Card") return <span className="font-bold text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded">VISA</span>;
  if (method === "Mastercard") return <span className="font-bold text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded">MC</span>;
  if (method === "bKash") return <span className="font-bold text-[10px] bg-pink-600 text-white px-1.5 py-0.5 rounded">bKash</span>;
  if (method === "Nagad") return <span className="font-bold text-[10px] bg-orange-500 text-white px-1.5 py-0.5 rounded">Nagad</span>;
  if (type === "bank") return <span className="text-base">🏦</span>;
  if (type === "cash") return <span className="text-base">💵</span>;
  return <span className="text-base">📱</span>;
};

// ─── Status badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: TxStatus }) => {
  const s = statusStyle[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
};

// ─── Detail panel content ─────────────────────────────────────────────────────
const DetailContent = ({ tx }: { tx: AllTransaction }) => (
  <div className="p-5 space-y-5">
    <div>
      <StatusBadge status={tx.status} />
      <div className="mt-2 font-bold text-gray-900 text-lg leading-tight">{tx.id}</div>
      <div className="text-xs text-gray-400 mt-0.5">{tx.date} {tx.time}</div>
    </div>
    <section>
      <h3 className="font-semibold text-gray-800 text-sm mb-3">Transaction Overview</h3>
      <div className="divide-y divide-gray-50">
        {[
          { label: "Amount", value: tx.amount, sub: tx.amountLocal },
          { label: "Fee", value: tx.fee },
          { label: "Exchange Rate", value: tx.exchangeRate },
          { label: "Total Debit", value: tx.totalDebit },
          { label: "Payment Method", value: tx.method },
          { label: "Purpose", value: tx.purpose },
        ].map(row => (
          <div key={row.label} className="flex justify-between items-center py-2">
            <span className="text-gray-400 text-xs">{row.label}</span>
            <span className="text-right">
              <span className="font-medium text-gray-800 text-xs block">{row.value}</span>
              {row.sub && <span className="text-gray-400 text-xs">{row.sub}</span>}
            </span>
          </div>
        ))}
      </div>
    </section>
    <section>
      <h3 className="font-semibold text-gray-800 text-sm mb-3">Sender Information</h3>
      <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
        <Avatar initials={tx.sender.avatar} />
        <div>
          <div className="font-semibold text-gray-900 text-sm">{tx.sender.name}</div>
          <div className="text-xs text-gray-500">{tx.sender.email}</div>
          <div className="text-xs text-gray-500">{tx.sender.phone}</div>
          <div className="text-xs text-gray-500 mt-0.5">{tx.sender.flag} {tx.sender.country}</div>
        </div>
      </div>
    </section>
    <section>
      <h3 className="font-semibold text-gray-800 text-sm mb-3">Receiver Information</h3>
      <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-lg shrink-0">{tx.receiver.flag}</div>
        <div>
          <div className="font-semibold text-gray-900 text-sm">{tx.receiver.name}</div>
          <div className="text-xs text-gray-500">{tx.receiver.phone}</div>
          <div className="text-xs text-gray-500 mt-0.5">{tx.receiver.flag} {tx.receiver.country}</div>
        </div>
      </div>
    </section>
    <section>
      <h3 className="font-semibold text-gray-800 text-sm mb-4">Transaction Timeline</h3>
      <div className="relative pl-5 space-y-4">
        {tx.timeline.map((step, i) => (
          <div key={i} className="relative">
            {i < tx.timeline.length - 1 && <div className="absolute left-[-12px] top-4 w-0.5 h-full bg-green-100" />}
            <div className="absolute left-[-16px] top-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-sm" />
            <div className="flex justify-between items-start gap-2">
              <span className="text-xs font-medium text-gray-700">{step.label}</span>
              <span className="text-xs text-gray-400 whitespace-nowrap">{step.date} {step.time}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
    <section className="border border-gray-100 rounded-xl p-4">
      <div className="font-semibold text-gray-800 text-sm">Need Help?</div>
      <div className="text-xs text-gray-400 mt-0.5 mb-3">Contact our support team for assistance.</div>
      <button className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
        💬 Contact Support
      </button>
    </section>
  </div>
);

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AllTransactionsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [countryFilter, setCountryFilter] = useState("All Countries");
  const [methodFilter, setMethodFilter] = useState("All Methods");
  const [page, setPage] = useState(1);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [activeTx, setActiveTx] = useState<AllTransaction>(allTransactionsData[0]);
  const [panelOpen, setPanelOpen] = useState(true);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return allTransactionsData.filter(tx => {
      if (q && !tx.id.toLowerCase().includes(q) && !tx.sender.name.toLowerCase().includes(q) && !tx.receiver.name.toLowerCase().includes(q)) return false;
      if (statusFilter !== "All Status" && tx.status !== statusFilter) return false;
      if (countryFilter !== "All Countries" && tx.sender.country !== countryFilter && tx.receiver.country !== countryFilter) return false;
      if (methodFilter !== "All Methods" && tx.method !== methodFilter) return false;
      return true;
    });
  }, [search, statusFilter, countryFilter, methodFilter]);

  const totalPages = Math.max(1, Math.ceil(TX_TOTAL / TX_PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * TX_PAGE_SIZE, page * TX_PAGE_SIZE);

  const pageNumbers = (): (number | "…")[] => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const nums: (number | "…")[] = [1];
    if (page > 3) nums.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) nums.push(i);
    if (page < totalPages - 2) nums.push("…");
    nums.push(totalPages);
    return nums;
  };

  const toggleCheck = (id: string) =>
    setCheckedIds(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  const toggleAll = () =>
    setCheckedIds(prev => prev.size === pageData.length ? new Set() : new Set(pageData.map(t => t.id)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <p className="text-xs text-gray-400 mb-1">
          Dashboard <span className="mx-1 text-gray-300">›</span>
          Transactions <span className="mx-1 text-gray-300">›</span>
          <span className="text-gray-700 font-medium">All Transactions</span>
        </p>
        <h1 className="text-xl font-bold text-gray-900">All Transactions</h1>
      </div>

      <div className="p-3 sm:p-5 space-y-4">

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
          {txStatCards.map(card => (
            <div key={card.label} className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                {/* icon */}
                <span
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${card.color}18` }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    {card.label === "Total Transactions" && (
                      <>
                        <line x1="3" y1="5" x2="15" y2="5" stroke={card.color} strokeWidth="1.8" strokeLinecap="round" />
                        <line x1="3" y1="9" x2="12" y2="9" stroke={card.color} strokeWidth="1.8" strokeLinecap="round" />
                        <line x1="3" y1="13" x2="9" y2="13" stroke={card.color} strokeWidth="1.8" strokeLinecap="round" />
                      </>
                    )}
                    {card.label === "Completed" && (
                      <path d="M4 9.5L7.5 13L14 6" stroke={card.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    )}
                    {card.label === "Pending" && (
                      <>
                        <circle cx="9" cy="9" r="6" stroke={card.color} strokeWidth="1.8" />
                        <path d="M9 6V9.5L11.5 12" stroke={card.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </>
                    )}
                    {card.label === "Failed" && (
                      <>
                        <circle cx="9" cy="9" r="6" stroke={card.color} strokeWidth="1.8" />
                        <path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke={card.color} strokeWidth="1.8" strokeLinecap="round" />
                      </>
                    )}
                    {card.label === "Refunded" && (
                      <path d="M14 8A5 5 0 1 1 9 4H13M13 4L13 7M13 4H10" stroke={card.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    )}
                  </svg>
                </span>
                <span className="text-xs text-gray-500 leading-tight font-medium">{card.label}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-1 tracking-tight">{card.value}</div>
              <div className={`text-xs font-semibold ${card.positive ? "text-green-600" : "text-red-500"}`}>
                ↑ {card.change}
              </div>
              {/* Sparkline with dots */}
              <div className="mt-2">
                <Sparkline points={card.spark} color={card.sparkColor} />
              </div>
            </div>
          ))}
        </div>

        {/* ── Table + Detail ── */}
        <div className="flex gap-4 items-start">

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex-1 min-w-0">

            {/* Filter bar */}
            <div className="flex flex-wrap gap-2 p-3 sm:p-4 border-b border-gray-100">
              <div className="relative flex-1 min-w-[160px]">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm select-none">🔍</span>
                <input
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 placeholder-gray-400"
                  placeholder="Search by Transaction ID, Sender, Receiver..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                />
              </div>
              {[
                { val: statusFilter, set: setStatusFilter, opts: txStatusOptions },
                { val: countryFilter, set: setCountryFilter, opts: txCountryOptions },
                { val: methodFilter, set: setMethodFilter, opts: txMethodOptions },
              ].map(({ val, set, opts }) => (
                <select key={opts[0]} value={val} onChange={e => { set(e.target.value); setPage(1); }}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {opts.map(o => <option key={o}>{o}</option>)}
                </select>
              ))}
              <button className="flex items-center gap-1.5 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100">
                ⚙ <span className="hidden sm:inline">Filters</span>
              </button>
              <button className="flex items-center text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100">↕</button>
            </div>

            {/* Table body */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/60">
                    <th className="px-4 py-3 w-8">
                      <input type="checkbox" className="rounded border-gray-300"
                        checked={checkedIds.size === pageData.length && pageData.length > 0} onChange={toggleAll} />
                    </th>
                    {["Transaction ID", "Sender", "Receiver", "Amount", "Method", "Status", "Date & Time", "Actions"].map(h => (
                      <th key={h} className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {pageData.length === 0 ? (
                    <tr><td colSpan={9} className="text-center py-12 text-gray-400 text-sm">No transactions match your filters.</td></tr>
                  ) : pageData.map(tx => {
                    const isActive = activeTx?.id === tx.id && panelOpen;
                    return (
                      <tr key={tx.id}
                        className={`hover:bg-blue-50/40 cursor-pointer transition-colors ${isActive ? "bg-blue-50" : ""}`}
                        onClick={() => { setActiveTx(tx); setPanelOpen(true); }}>
                        <td className="px-4 py-3" onClick={e => { e.stopPropagation(); toggleCheck(tx.id); }}>
                          <input type="checkbox" className="rounded border-gray-300" checked={checkedIds.has(tx.id)} onChange={() => { }} />
                        </td>
                        <td className="px-3 py-3 font-medium text-blue-600 whitespace-nowrap text-xs">{tx.id}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2 min-w-[130px]">
                            <Avatar initials={tx.sender.avatar} size="sm" />
                            <div>
                              <div className="font-medium text-gray-800 text-xs leading-tight">{tx.sender.name}</div>
                              <div className="text-gray-400 text-[11px]">{tx.sender.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1.5 min-w-[110px]">
                            <span className="text-base">{tx.receiver.flag}</span>
                            <div>
                              <div className="font-medium text-gray-800 text-xs leading-tight">{tx.receiver.name}</div>
                              <div className="text-gray-400 text-[11px]">{tx.receiver.country}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <div className="font-semibold text-gray-900 text-xs">{tx.amount}</div>
                          <div className="text-gray-400 text-[11px]">{tx.amountLocal}</div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1.5 whitespace-nowrap">
                            <MethodBadge type={tx.methodType} method={tx.method} />
                            <span className="text-gray-600 text-xs">{tx.method}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3"><StatusBadge status={tx.status} /></td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <div className="text-gray-700 text-xs">{tx.date}</div>
                          <div className="text-gray-400 text-[11px]">{tx.timeAgo}</div>
                        </td>
                        <td className="px-3 py-3" onClick={e => e.stopPropagation()}>
                          <button className="text-gray-400 hover:text-gray-600 px-1 text-lg leading-none">⋯</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-gray-100">
              <span className="text-xs text-gray-500">
                Showing {(page - 1) * TX_PAGE_SIZE + 1} to {Math.min(page * TX_PAGE_SIZE, TX_TOTAL)} of {TX_TOTAL.toLocaleString()} transactions
              </span>
              <div className="flex items-center gap-1">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 text-sm">‹</button>
                {pageNumbers().map((p2, i) =>
                  p2 === "…" ? (
                    <span key={`e${i}`} className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">…</span>
                  ) : (
                    <button key={p2} onClick={() => setPage(p2 as number)}
                      className={`w-8 h-8 rounded-lg border text-sm font-medium transition-colors ${page === p2 ? "bg-blue-600 border-blue-600 text-white" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                      {p2}
                    </button>
                  )
                )}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 text-sm">›</button>
                <select className="ml-1 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-600 bg-gray-50">
                  <option>10 / page</option><option>25 / page</option><option>50 / page</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop detail panel */}
          {panelOpen && (
            <div className="hidden lg:block w-[320px] shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm self-start sticky top-4 max-h-[calc(100vh-120px)] overflow-y-auto">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                <span className="font-bold text-gray-900">Transaction Details</span>
                <button onClick={() => setPanelOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">✕</button>
              </div>
              <DetailContent tx={activeTx} />
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom sheet */}
      {panelOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setPanelOpen(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <span className="font-bold text-gray-900">Transaction Details</span>
              <button onClick={() => setPanelOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <DetailContent tx={activeTx} />
          </div>
        </div>
      )}
    </div>
  );
}