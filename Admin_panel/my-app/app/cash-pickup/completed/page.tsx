'use client';

import { useState } from 'react';
import {
    ChevronRight, Search, ChevronDown, Filter, Eye, Download, Calendar,
    CheckCircle2, TrendingUp, Clock3, Percent, X, Printer,
} from 'lucide-react';
import {
    completedPickupRequests,
    completedStatsCashPickup,
    CompletedPickupRequest,
} from '@/lib/data';

// ── helpers ───────────────────────────────────────────────────
const currencySymbol: Record<string, string> = { BDT: '৳', PHP: '₱', INR: '₹', AED: 'AED ' };
const sym = (c: string) => currencySymbol[c] ?? '';

const fmtDateTime = (iso: string) => {
    const d = new Date(iso);
    return `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
};

const fmtCompact = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
    return n.toLocaleString();
};

// ── Stat cards ────────────────────────────────────────────────
function StatCards() {
    const s = completedStatsCashPickup;
    const cards = [
        { label: 'Total Completed', value: s.totalCompleted.toLocaleString(), icon: CheckCircle2, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-950' },
        { label: 'Total Volume', value: `৳${fmtCompact(s.totalVolumeBDT)}`, icon: TrendingUp, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950' },
        { label: 'Avg Completion', value: `${s.avgCompletionMins}m`, icon: Clock3, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950' },
        { label: 'Success Rate', value: `${s.successRatePct}%`, icon: Percent, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950' },
    ];
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {cards.map(c => (
                <div key={c.label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5">
                    <div className="flex items-center justify-between mb-1">
                        <p className="text-[11px] text-gray-400 dark:text-gray-500">{c.label}</p>
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center ${c.bg} ${c.color}`}>
                            <c.icon size={12} />
                        </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{c.value}</p>
                </div>
            ))}
        </div>
    );
}

// ── Filter bar ────────────────────────────────────────────────
function FilterBar({ search, setSearch }: { search: string; setSearch: (v: string) => void }) {
    return (
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
            <div className="flex items-center gap-2 flex-1 min-w-[180px] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
                <Search size={14} className="text-gray-400 dark:text-gray-500" />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by transaction number, name, receipt..."
                    className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                All Agents <ChevronDown size={13} />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <Calendar size={13} /> <span className="hidden sm:inline">Date Range</span> <ChevronDown size={13} />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <Filter size={13} /> Filters
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer sm:ml-auto">
                <Download size={13} /> Export
            </button>
        </div>
    );
}

// ── Receipt Modal ───────────────────────────────────────────────
function ReceiptModal({ request, onClose }: { request: CompletedPickupRequest; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-5" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white">Pickup Receipt</h3>
                    <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">
                        <X size={16} />
                    </button>
                </div>

                <div className="flex items-center justify-center mb-4">
                    <span className="w-12 h-12 rounded-full bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                        <CheckCircle2 size={24} />
                    </span>
                </div>
                <p className="text-center text-[13px] font-semibold text-gray-900 dark:text-white mb-0.5">{request.receiptId}</p>
                <p className="text-center text-[11px] text-gray-400 dark:text-gray-500 mb-4">Transaction {request.id}</p>

                <div className="space-y-2 mb-5 bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                    {[
                        ['Sender', request.senderName],
                        ['Recipient', request.recipientName],
                        ['Amount', `${sym(request.currency)}${request.amount.toLocaleString()} ${request.currency}`],
                        ['Pickup Location', `${request.city}, ${request.country}`],
                        ['Agent', request.agentName],
                        ['Collected By', request.collectedBy],
                        ['Completed At', fmtDateTime(request.completedAt)],
                    ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between text-[12px]">
                            <span className="text-gray-400 dark:text-gray-500">{label}</span>
                            <span className="text-gray-700 dark:text-gray-200 font-medium text-right">{value}</span>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        Close
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 cursor-pointer">
                        <Printer size={13} /> Print Receipt
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────
export default function CompletedRequestsPage() {
    const [search, setSearch] = useState('');
    const [viewing, setViewing] = useState<CompletedPickupRequest | null>(null);

    const filteredRows = completedPickupRequests.filter(r => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
            r.id.toLowerCase().includes(q) ||
            r.senderName.toLowerCase().includes(q) ||
            r.receiptId.toLowerCase().includes(q)
        );
    });

    return (
        <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* header */}
            <div className="mb-5">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Completed Requests</h1>
                <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                    <span>Dashboard</span><ChevronRight size={12} />
                    <span>Cash Pickup</span><ChevronRight size={12} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Completed Requests</span>
                </div>
            </div>

            <StatCards />

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                <FilterBar search={search} setSearch={setSearch} />

                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[960px]">
                        <thead>
                            <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                                <th className="px-4 py-2.5 font-medium">Transaction Number</th>
                                <th className="px-2 py-2.5 font-medium">Sender → Recipient</th>
                                <th className="px-2 py-2.5 font-medium">Country</th>
                                <th className="px-2 py-2.5 font-medium">Amount</th>
                                <th className="px-2 py-2.5 font-medium">Collected By</th>
                                <th className="px-2 py-2.5 font-medium">Completed At</th>
                                <th className="px-2 py-2.5 font-medium">Receipt ID</th>
                                <th className="px-2 py-2.5 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRows.map(r => (
                                <tr key={r.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                                    <td className="px-4 py-2.5 text-[12px] text-blue-600 dark:text-blue-400 font-medium whitespace-nowrap">{r.id}</td>
                                    <td className="px-2 py-2.5 whitespace-nowrap">
                                        <p className="text-[12px] text-gray-700 dark:text-gray-300">{r.senderName} <span className="text-gray-300 dark:text-gray-600">→</span> {r.recipientName}</p>
                                        <p className="text-[10px] text-gray-400 dark:text-gray-500">{r.mobile}</p>
                                    </td>
                                    <td className="px-2 py-2.5 whitespace-nowrap">
                                        <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-600 dark:text-gray-300">{r.countryFlag} {r.city}</span>
                                    </td>
                                    <td className="px-2 py-2.5 whitespace-nowrap">
                                        <p className="text-[13px] font-semibold text-gray-900 dark:text-white">{sym(r.currency)}{r.amount.toLocaleString()}</p>
                                    </td>
                                    <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.collectedBy}</td>
                                    <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{fmtDateTime(r.completedAt)}</td>
                                    <td className="px-2 py-2.5 whitespace-nowrap">
                                        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
                                            {r.receiptId}
                                        </span>
                                    </td>
                                    <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => setViewing(r)}
                                                className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                                            >
                                                <Eye size={13} />
                                            </button>
                                            <button className="text-gray-400 dark:text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer">
                                                <Download size={13} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredRows.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">
                                        No completed requests match your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
                    <span>Showing 1 to {filteredRows.length} of {completedStatsCashPickup.totalCompleted} completed requests</span>
                    <div className="flex items-center gap-1">
                        <button className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">‹</button>
                        <button className="px-2.5 py-1 rounded bg-blue-600 text-white cursor-pointer">1</button>
                        <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">2</button>
                        <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">3</button>
                        <span className="px-1">...</span>
                        <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">54</button>
                        <button className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">›</button>
                    </div>
                    <select className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded px-2 py-1 text-[12px] text-gray-600 dark:text-gray-300">
                        <option>10 / page</option>
                        <option>20 / page</option>
                        <option>50 / page</option>
                    </select>
                </div>
            </div>

            {viewing && <ReceiptModal request={viewing} onClose={() => setViewing(null)} />}
        </div>
    );
}