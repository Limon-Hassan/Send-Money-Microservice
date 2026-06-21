'use client';

import { useState } from 'react';
import {
    ChevronRight, Search, ChevronDown, Filter, Eye, Calendar, Download,
    XCircle, Percent, AlertOctagon, RefreshCcw, X,
} from 'lucide-react';
import {
    cancelledPickupRequests,
    cancelledStatsCashPickup,
    CancelledPickupRequest,
    PickupRefundStatus,
} from '@/lib/data';

// ── helpers ───────────────────────────────────────────────────
const currencySymbol: Record<string, string> = { BDT: '৳', PHP: '₱', INR: '₹', AED: 'AED ' };
const sym = (c: string) => currencySymbol[c] ?? '';

const fmtDateTime = (iso: string) => {
    const d = new Date(iso);
    return `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
};

const refundClasses: Record<PickupRefundStatus, string> = {
    'Not Applicable': 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
    Pending: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    Refunded: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
};

// ── Stat cards ────────────────────────────────────────────────
function StatCards() {
    const s = cancelledStatsCashPickup;
    const cards = [
        { label: 'Total Cancelled', value: s.totalCancelled, icon: XCircle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950' },
        { label: 'Cancellation Rate', value: `${s.cancellationRatePct}%`, icon: Percent, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950' },
        { label: 'Top Reason', value: s.topReason, icon: AlertOctagon, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950', small: true },
        { label: 'Refunds Pending', value: s.refundsPending, icon: RefreshCcw, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950' },
    ];
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {cards.map(c => (
                <div key={c.label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5">
                    <div className="flex items-center justify-between mb-1">
                        <p className="text-[11px] text-gray-400 dark:text-gray-500">{c.label}</p>
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${c.bg} ${c.color}`}>
                            <c.icon size={12} />
                        </span>
                    </div>
                    <p className={`font-bold text-gray-900 dark:text-white ${c.small ? 'text-[13px]' : 'text-lg'}`}>{c.value}</p>
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
                    placeholder="Search by transaction number, name, mobile..."
                    className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                All Reasons <ChevronDown size={13} />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                All Refund Status <ChevronDown size={13} />
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

// ── View Modal ───────────────────────────────────────────────
function ViewModal({ request, onClose, onMarkRefunded }: {
    request: CancelledPickupRequest; onClose: () => void; onMarkRefunded: (id: string) => void;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-5" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white">Cancelled Request Details</h3>
                    <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">
                        <X size={16} />
                    </button>
                </div>

                <div className="flex items-center justify-center mb-3">
                    <span className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 flex items-center justify-center">
                        <XCircle size={24} />
                    </span>
                </div>

                <div className="space-y-2 mb-5 bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                    {[
                        ['Transaction', request.id],
                        ['Sender', request.senderName],
                        ['Recipient', request.recipientName],
                        ['Amount', `${sym(request.currency)}${request.amount.toLocaleString()} ${request.currency}`],
                        ['Cancelled By', request.cancelledBy],
                        ['Cancelled At', fmtDateTime(request.cancelledAt)],
                        ['Reason', request.cancelReason],
                    ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between text-[12px]">
                            <span className="text-gray-400 dark:text-gray-500">{label}</span>
                            <span className="text-gray-700 dark:text-gray-200 font-medium text-right">{value}</span>
                        </div>
                    ))}
                    <div className="flex items-center justify-between text-[12px]">
                        <span className="text-gray-400 dark:text-gray-500">Refund Status</span>
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${refundClasses[request.refundStatus]}`}>{request.refundStatus}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        Close
                    </button>
                    {request.refundStatus === 'Pending' && (
                        <button
                            onClick={() => { onMarkRefunded(request.id); onClose(); }}
                            className="flex-1 px-3 py-2 rounded-lg bg-emerald-600 text-white text-[12px] font-medium hover:bg-emerald-700 cursor-pointer"
                        >
                            Mark Refunded
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────
export default function CancelledRequestsPage() {
    const [requests, setRequests] = useState<CancelledPickupRequest[]>(cancelledPickupRequests);
    const [search, setSearch] = useState('');
    const [viewing, setViewing] = useState<CancelledPickupRequest | null>(null);
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2500);
    };

    const handleMarkRefunded = (id: string) => {
        setRequests(prev => prev.map(r => (r.id === id ? { ...r, refundStatus: 'Refunded' } : r)));
        showToast(`${id} marked as refunded`);
    };

    const filteredRows = requests.filter(r => {
        if (!search) return true;
        const q = search.toLowerCase();
        return r.id.toLowerCase().includes(q) || r.senderName.toLowerCase().includes(q) || r.mobile.includes(q);
    });

    return (
        <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* header */}
            <div className="mb-5">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Cancelled Requests</h1>
                <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                    <span>Dashboard</span><ChevronRight size={12} />
                    <span>Cash Pickup</span><ChevronRight size={12} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Cancelled Requests</span>
                </div>
            </div>

            <StatCards />

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                <FilterBar search={search} setSearch={setSearch} />

                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[980px]">
                        <thead>
                            <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                                <th className="px-4 py-2.5 font-medium">Transaction Number</th>
                                <th className="px-2 py-2.5 font-medium">Sender → Recipient</th>
                                <th className="px-2 py-2.5 font-medium">Amount</th>
                                <th className="px-2 py-2.5 font-medium">Cancelled By</th>
                                <th className="px-2 py-2.5 font-medium">Cancelled At</th>
                                <th className="px-2 py-2.5 font-medium">Reason</th>
                                <th className="px-2 py-2.5 font-medium">Refund Status</th>
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
                                        <p className="text-[13px] font-semibold text-gray-900 dark:text-white">{sym(r.currency)}{r.amount.toLocaleString()}</p>
                                    </td>
                                    <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.cancelledBy}</td>
                                    <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{fmtDateTime(r.cancelledAt)}</td>
                                    <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.cancelReason}</td>
                                    <td className="px-2 py-2.5 whitespace-nowrap">
                                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${refundClasses[r.refundStatus]}`}>{r.refundStatus}</span>
                                    </td>
                                    <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                        <button onClick={() => setViewing(r)} className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                                            <Eye size={13} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredRows.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">
                                        No cancelled requests match your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
                    <span>Showing 1 to {filteredRows.length} of {cancelledStatsCashPickup.totalCancelled} cancelled requests</span>
                    <div className="flex items-center gap-1">
                        <button className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">‹</button>
                        <button className="px-2.5 py-1 rounded bg-blue-600 text-white cursor-pointer">1</button>
                        <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">2</button>
                        <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">3</button>
                        <span className="px-1">...</span>
                        <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">11</button>
                        <button className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">›</button>
                    </div>
                    <select className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded px-2 py-1 text-[12px] text-gray-600 dark:text-gray-300">
                        <option>10 / page</option>
                        <option>20 / page</option>
                        <option>50 / page</option>
                    </select>
                </div>
            </div>

            {viewing && (
                <ViewModal request={viewing} onClose={() => setViewing(null)} onMarkRefunded={handleMarkRefunded} />
            )}

            {toast && (
                <div className="fixed bottom-5 right-5 bg-gray-900 dark:bg-gray-700 text-white text-[12px] px-4 py-2.5 rounded-lg shadow-lg z-50">
                    {toast}
                </div>
            )}
        </div>
    );
}