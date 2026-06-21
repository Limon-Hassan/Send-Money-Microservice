'use client';

import { useState } from 'react';
import {
    ChevronRight, Search, Download, X, Eye, DollarSign, CheckCircle2, Clock3, AlertTriangle,
} from 'lucide-react';
import {
    commissionRecords,
    commissionPageStats,
    commissionStatusOptions,
    commissionPeriodOptions,
    CommissionRecord,
    CommissionPayoutStatus,
} from '@/lib/data';

// ── helpers ───────────────────────────────────────────────────
const statusClasses: Record<CommissionPayoutStatus, string> = {
    Paid: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    Pending: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    Processing: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    Failed: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
};

const fmtCompact = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
    return n.toLocaleString();
};

// ── Stat cards ────────────────────────────────────────────────
function StatCards() {
    const s = commissionPageStats;
    const cards = [
        { label: 'Total Commission (This Month)', value: `£${fmtCompact(s.totalCommissionThisMonth)}`, icon: DollarSign, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950' },
        { label: 'Paid Commission', value: `£${fmtCompact(s.paidCommission)}`, icon: CheckCircle2, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950' },
        { label: 'Pending Commission', value: `£${fmtCompact(s.pendingCommission)}`, icon: Clock3, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950' },
        { label: 'Avg Commission Rate', value: `${s.avgCommissionRatePct}%`, icon: AlertTriangle, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950' },
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
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{c.value}</p>
                </div>
            ))}
        </div>
    );
}

// ── Filter bar ────────────────────────────────────────────────
function FilterBar({
    search, setSearch, statusFilter, setStatusFilter, periodFilter, setPeriodFilter,
}: {
    search: string; setSearch: (v: string) => void;
    statusFilter: string; setStatusFilter: (v: string) => void;
    periodFilter: string; setPeriodFilter: (v: string) => void;
}) {
    return (
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
            <div className="flex items-center gap-2 flex-1 min-w-45 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
                <Search size={14} className="text-gray-400 dark:text-gray-500" />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search agent name or code..."
                    className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
            </div>
            <select
                value={periodFilter}
                onChange={e => setPeriodFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none"
            >
                {commissionPeriodOptions.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none"
            >
                {commissionStatusOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer sm:ml-auto">
                <Download size={13} /> Export
            </button>
        </div>
    );
}

// ── Commission Table ──────────────────────────────────────────
function CommissionTable({
    rows, onMarkPaid, onView,
}: { rows: CommissionRecord[]; onMarkPaid: (id: string) => void; onView: (c: CommissionRecord) => void }) {
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-245">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="px-4 py-2.5 font-medium">Agent</th>
                            <th className="px-2 py-2.5 font-medium">Period</th>
                            <th className="px-2 py-2.5 font-medium">Volume</th>
                            <th className="px-2 py-2.5 font-medium">Rate</th>
                            <th className="px-2 py-2.5 font-medium">Commission</th>
                            <th className="px-2 py-2.5 font-medium">Bonus</th>
                            <th className="px-2 py-2.5 font-medium">Total Payout</th>
                            <th className="px-2 py-2.5 font-medium">Status</th>
                            <th className="px-2 py-2.5 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageRows.map(c => (
                            <tr key={c.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                                <td className="px-4 py-2.5 whitespace-nowrap">
                                    <p className="text-[13px] font-medium text-gray-800 dark:text-gray-100">{c.agentName}</p>
                                    <p className="text-[10px] text-blue-600 dark:text-blue-400 flex items-center gap-1">{c.flag} {c.agentCode}</p>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{c.period}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-700 dark:text-gray-200 whitespace-nowrap">£{c.volume.toLocaleString()}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{c.ratePct}%</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-700 dark:text-gray-200 whitespace-nowrap">£{c.commission.toLocaleString()}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{c.bonus > 0 ? `£${c.bonus.toLocaleString()}` : '—'}</td>
                                <td className="px-2 py-2.5 text-[13px] font-semibold text-gray-900 dark:text-white whitespace-nowrap">£{c.totalPayout.toLocaleString()}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusClasses[c.status]}`}>{c.status}</span>
                                </td>
                                <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => onView(c)} className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                                            <Eye size={13} />
                                        </button>
                                        {(c.status === 'Pending' || c.status === 'Failed') && (
                                            <button
                                                onClick={() => onMarkPaid(c.id)}
                                                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900 cursor-pointer"
                                            >
                                                <CheckCircle2 size={11} /> Mark Paid
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 && (
                            <tr><td colSpan={9} className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">No commission records match your search.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
                <span>Showing {pageRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {(currentPage - 1) * pageSize + pageRows.length} of {rows.length} records</span>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >‹</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`px-2.5 py-1 rounded cursor-pointer ${p === currentPage ? 'bg-blue-600 text-white' : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                        >
                            {p}
                        </button>
                    ))}
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >›</button>
                </div>
                <select className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded px-2 py-1 text-[12px] text-gray-600 dark:text-gray-300">
                    <option>10 / page</option><option>20 / page</option><option>50 / page</option>
                </select>
            </div>
        </>
    );
}

// ── View Commission Modal ───────────────────────────────────────
function ViewCommissionModal({ record, onClose }: { record: CommissionRecord; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-5" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white">Commission Details</h3>
                    <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><X size={16} /></button>
                </div>
                <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[13px] font-semibold flex items-center justify-center">
                        {record.agentName.split(' ').slice(0, 2).map(w => w[0]).join('')}
                    </span>
                    <div>
                        <p className="text-[14px] font-semibold text-gray-900 dark:text-white">{record.agentName}</p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500">{record.flag} {record.agentCode}</p>
                    </div>
                </div>
                <div className="space-y-2 mb-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                    {[
                        ['Period', record.period],
                        ['Volume', `£${record.volume.toLocaleString()}`],
                        ['Commission Rate', `${record.ratePct}%`],
                        ['Base Commission', `£${record.commission.toLocaleString()}`],
                        ['Bonus', record.bonus > 0 ? `£${record.bonus.toLocaleString()}` : 'None'],
                        ['Total Payout', `£${record.totalPayout.toLocaleString()}`],
                        ['Payment Method', record.paymentMethod],
                        ['Paid On', record.paidOn ?? 'Not yet paid'],
                    ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between text-[12px]">
                            <span className="text-gray-400 dark:text-gray-500">{label}</span>
                            <span className="text-gray-700 dark:text-gray-200 font-medium text-right">{value}</span>
                        </div>
                    ))}
                    <div className="flex items-center justify-between text-[12px]">
                        <span className="text-gray-400 dark:text-gray-500">Status</span>
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusClasses[record.status]}`}>{record.status}</span>
                    </div>
                </div>
                <button onClick={onClose} className="w-full px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 cursor-pointer">
                    Close
                </button>
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────
export default function CommissionPage() {
    const [records, setRecords] = useState(commissionRecords);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [periodFilter, setPeriodFilter] = useState('May 2025');
    const [viewing, setViewing] = useState<CommissionRecord | null>(null);
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

    const handleMarkPaid = (id: string) => {
        setRecords(prev => prev.map(c => (c.id === id ? { ...c, status: 'Paid', paidOn: 'Just now' } : c)));
        showToast('Marked as paid');
    };

    const filteredRows = records.filter(c => {
        if (statusFilter !== 'All Status' && c.status !== statusFilter) return false;
        if (periodFilter && c.period !== periodFilter) return false;
        if (!search) return true;
        const q = search.toLowerCase();
        return c.agentName.toLowerCase().includes(q) || c.agentCode.toLowerCase().includes(q);
    });

    return (
        <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="mb-5">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Commission</h1>
                <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                    <span>Dashboard</span><ChevronRight size={12} />
                    <span>Agents & Partners</span><ChevronRight size={12} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Commission</span>
                </div>
            </div>

            <StatCards />

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                <FilterBar
                    search={search} setSearch={setSearch}
                    statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                    periodFilter={periodFilter} setPeriodFilter={setPeriodFilter}
                />
                <CommissionTable rows={filteredRows} onMarkPaid={handleMarkPaid} onView={setViewing} />
            </div>

            {viewing && <ViewCommissionModal record={viewing} onClose={() => setViewing(null)} />}

            {toast && (
                <div className="fixed bottom-5 right-5 bg-gray-900 dark:bg-gray-700 text-white text-[12px] px-4 py-2.5 rounded-lg shadow-lg z-50">
                    {toast}
                </div>
            )}
        </div>
    );
}