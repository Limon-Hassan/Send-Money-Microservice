'use client';

import { useState } from 'react';
import {
    ChevronRight, Search, ChevronDown, Filter, Eye, Check, X as XIcon,
    Clock3, AlertTriangle, Calendar,
} from 'lucide-react';
import {
    pendingPickupRequests,
    pendingStatsCashPickup,
    PendingPickupRequest,
} from '@/lib/data';

// ── helpers ───────────────────────────────────────────────────
const currencySymbol: Record<string, string> = { BDT: '৳', PHP: '₱', INR: '₹', AED: 'AED ' };
const sym = (c: string) => currencySymbol[c] ?? '';

const fmtWaiting = (mins: number) => {
    if (mins < 60) return `${mins}m`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m ? `${h}h ${m}m` : `${h}h`;
};

const waitingColor = (mins: number) => {
    if (mins >= 180) return 'text-red-500 dark:text-red-400';
    if (mins >= 60) return 'text-amber-500 dark:text-amber-400';
    return 'text-gray-500 dark:text-gray-400';
};

const priorityClasses: Record<string, string> = {
    High: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
    Normal: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
};

// ── Stat cards ────────────────────────────────────────────────
function StatCards() {
    const s = pendingStatsCashPickup;
    const cards = [
        { label: 'Total Pending', value: s.totalPending, icon: Clock3, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950' },
        { label: 'High Priority', value: s.highPriority, icon: AlertTriangle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950' },
        { label: 'Avg Wait Time', value: fmtWaiting(s.avgWaitMins), icon: Clock3, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950' },
        { label: 'Oldest Waiting', value: fmtWaiting(s.oldestWaitMins), icon: AlertTriangle, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950' },
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
            <div className="flex items-center gap-2 flex-1 min-w-45 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
                <Search size={14} className="text-gray-400 dark:text-gray-500" />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by transaction number, name, mobile..."
                    className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                All Priority <ChevronDown size={13} />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                All Agents <ChevronDown size={13} />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <Calendar size={13} /> <span className="hidden sm:inline">Date Range</span> <ChevronDown size={13} />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <Filter size={13} /> Filters
            </button>
        </div>
    );
}

// ── Confirm modal (used for both approve and reject) ───────────
function ConfirmModal({
    request, action, onClose, onConfirm,
}: {
    request: PendingPickupRequest; action: 'approve' | 'reject';
    onClose: () => void; onConfirm: () => void;
}) {
    const isApprove = action === 'approve';
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-sm p-5" onClick={e => e.stopPropagation()}>
                <span className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${isApprove ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400'
                    }`}>
                    {isApprove ? <Check size={22} /> : <XIcon size={22} />}
                </span>
                <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white text-center mb-1">
                    {isApprove ? 'Approve this request?' : 'Reject this request?'}
                </h3>
                <p className="text-[12px] text-gray-500 dark:text-gray-400 text-center mb-4">
                    {request.id} · {request.senderName} → {request.recipientName} · {sym(request.currency)}{request.amount.toLocaleString()}
                </p>
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 px-3 py-2 rounded-lg text-white text-[12px] font-medium cursor-pointer ${isApprove ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'
                            }`}
                    >
                        {isApprove ? 'Approve' : 'Reject'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────
export default function PendingRequestsPage() {
    const [requests, setRequests] = useState<PendingPickupRequest[]>(pendingPickupRequests);
    const [search, setSearch] = useState('');
    const [confirmAction, setConfirmAction] = useState<{ request: PendingPickupRequest; action: 'approve' | 'reject' } | null>(null);
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2500);
    };

    const handleConfirm = () => {
        if (!confirmAction) return;
        const { request, action } = confirmAction;
        setRequests(prev => prev.filter(r => r.id !== request.id));
        showToast(`${request.id} ${action === 'approve' ? 'approved' : 'rejected'}`);
        setConfirmAction(null);
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
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Pending Requests</h1>
                <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                    <span>Dashboard</span><ChevronRight size={12} />
                    <span>Cash Pickup</span><ChevronRight size={12} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Pending Requests</span>
                </div>
            </div>

            <StatCards />

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                <FilterBar search={search} setSearch={setSearch} />

                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-230">
                        <thead>
                            <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                                <th className="px-4 py-2.5 font-medium">Transaction Number</th>
                                <th className="px-2 py-2.5 font-medium">Sender → Recipient</th>
                                <th className="px-2 py-2.5 font-medium">Country</th>
                                <th className="px-2 py-2.5 font-medium">Amount</th>
                                <th className="px-2 py-2.5 font-medium">Agent</th>
                                <th className="px-2 py-2.5 font-medium">Waiting</th>
                                <th className="px-2 py-2.5 font-medium">Priority</th>
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
                                    <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.agentName}</td>
                                    <td className="px-2 py-2.5 whitespace-nowrap">
                                        <span className={`text-[12px] font-medium flex items-center gap-1 ${waitingColor(r.waitingMins)}`}>
                                            <Clock3 size={11} /> {fmtWaiting(r.waitingMins)}
                                        </span>
                                    </td>
                                    <td className="px-2 py-2.5 whitespace-nowrap">
                                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${priorityClasses[r.priority]}`}>{r.priority}</span>
                                    </td>
                                    <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <button className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer p-1">
                                                <Eye size={13} />
                                            </button>
                                            <button
                                                onClick={() => setConfirmAction({ request: r, action: 'approve' })}
                                                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900 cursor-pointer"
                                            >
                                                <Check size={11} /> Approve
                                            </button>
                                            <button
                                                onClick={() => setConfirmAction({ request: r, action: 'reject' })}
                                                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 text-[11px] font-medium hover:bg-red-100 dark:hover:bg-red-900 cursor-pointer"
                                            >
                                                <XIcon size={11} /> Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredRows.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">
                                        No pending requests match your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
                    <span>Showing 1 to {filteredRows.length} of {pendingStatsCashPickup.totalPending} pending requests</span>
                    <div className="flex items-center gap-1">
                        <button className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">‹</button>
                        <button className="px-2.5 py-1 rounded bg-blue-600 text-white cursor-pointer">1</button>
                        <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">2</button>
                        <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">3</button>
                        <span className="px-1">...</span>
                        <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">36</button>
                        <button className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">›</button>
                    </div>
                    <select className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded px-2 py-1 text-[12px] text-gray-600 dark:text-gray-300">
                        <option>10 / page</option>
                        <option>20 / page</option>
                        <option>50 / page</option>
                    </select>
                </div>
            </div>

            {confirmAction && (
                <ConfirmModal
                    request={confirmAction.request}
                    action={confirmAction.action}
                    onClose={() => setConfirmAction(null)}
                    onConfirm={handleConfirm}
                />
            )}

            {toast && (
                <div className="fixed bottom-5 right-5 bg-gray-900 dark:bg-gray-700 text-white text-[12px] px-4 py-2.5 rounded-lg shadow-lg z-50">
                    {toast}
                </div>
            )}
        </div>
    );
}