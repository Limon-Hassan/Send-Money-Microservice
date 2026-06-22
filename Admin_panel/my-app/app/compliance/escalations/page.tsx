'use client';

import { useState } from 'react';
import {
    ChevronRight, Search, Download, X, Eye, ArrowUpCircle, Clock3, CheckCircle2,
    AlertTriangle, Hourglass, Check,
} from 'lucide-react';
import {
    escalationItems,
    escalationsStats,
    escalationSourceOptions,
    escalationLevelOptions,
    escalationStatusOptions,
    EscalationItem,
    EscalationStatusType,
} from '@/lib/data';

// ── helpers ───────────────────────────────────────────────────
const statusClasses: Record<EscalationStatusType, string> = {
    'Pending Response': 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
    Acknowledged: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    'In Progress': 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    Resolved: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
};

const levelClasses: Record<string, string> = {
    'Level 1 - Team Lead': 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
    'Level 2 - Senior Manager': 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    'Level 3 - Executive': 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    'Level 4 - Regulatory': 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
};

const sourceClasses: Record<string, string> = {
    'AML Alert': 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    'Fraud Case': 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400',
    'Compliance Case': 'bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400',
    'Sanctions Hit': 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
    'PEP Match': 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
};

const isOverdue = (dueDate: string, status: EscalationStatusType) => {
    if (status === 'Resolved') return false;
    return new Date(dueDate) < new Date('2025-05-12');
};

// ── Stat cards ────────────────────────────────────────────────
function StatCards() {
    const s = escalationsStats;
    const cards = [
        { label: 'Total Escalations', value: s.totalEscalations.toString(), icon: ArrowUpCircle, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950' },
        { label: 'Pending Response', value: s.pendingResponse.toString(), icon: Clock3, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950' },
        { label: 'In Progress', value: s.inProgress.toString(), icon: Hourglass, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950' },
        { label: 'Resolved', value: s.resolved.toString(), icon: CheckCircle2, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950' },
        { label: 'Overdue', value: s.overdue.toString(), icon: AlertTriangle, color: 'text-red-700 dark:text-red-300', bg: 'bg-red-100 dark:bg-red-900' },
        { label: 'Avg Response Time', value: `${s.avgResponseHours}h`, icon: Clock3, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950' },
    ];
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
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
    search, setSearch, sourceFilter, setSourceFilter, levelFilter, setLevelFilter, statusFilter, setStatusFilter,
}: {
    search: string; setSearch: (v: string) => void;
    sourceFilter: string; setSourceFilter: (v: string) => void;
    levelFilter: string; setLevelFilter: (v: string) => void;
    statusFilter: string; setStatusFilter: (v: string) => void;
}) {
    return (
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
            <div className="flex items-center gap-2 flex-1 min-w-45 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
                <Search size={14} className="text-gray-400 dark:text-gray-500" />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search escalation ID, title, or customer..."
                    className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
            </div>
            <select value={sourceFilter} onChange={e => setSourceFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none">
                {escalationSourceOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={levelFilter} onChange={e => setLevelFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none">
                {escalationLevelOptions.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none">
                {escalationStatusOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer sm:ml-auto">
                <Download size={13} /> Export
            </button>
        </div>
    );
}

// ── Escalations Table ─────────────────────────────────────────
function EscalationsTable({ rows, onView }: { rows: EscalationItem[]; onView: (e: EscalationItem) => void }) {
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-270">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="px-4 py-2.5 font-medium">Escalation</th>
                            <th className="px-2 py-2.5 font-medium">Source</th>
                            <th className="px-2 py-2.5 font-medium">Customer</th>
                            <th className="px-2 py-2.5 font-medium">Escalated By → To</th>
                            <th className="px-2 py-2.5 font-medium">Level</th>
                            <th className="px-2 py-2.5 font-medium">Status</th>
                            <th className="px-2 py-2.5 font-medium">Due Date</th>
                            <th className="px-2 py-2.5 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageRows.map(e => {
                            const overdue = isOverdue(e.dueDate, e.status);
                            return (
                                <tr key={e.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                                    <td className="px-4 py-2.5 whitespace-nowrap">
                                        <p className="text-[12px] text-blue-600 dark:text-blue-400 font-medium">{e.id}</p>
                                        <p className="text-[12px] text-gray-700 dark:text-gray-300 max-w-55 truncate">{e.title}</p>
                                    </td>
                                    <td className="px-2 py-2.5 whitespace-nowrap">
                                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${sourceClasses[e.sourceType]}`}>{e.sourceType}</span>
                                        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{e.sourceId}</p>
                                    </td>
                                    <td className="px-2 py-2.5 whitespace-nowrap">
                                        <p className="text-[12px] text-gray-700 dark:text-gray-300">{e.customerName}</p>
                                        {e.customerId !== '—' && <p className="text-[10px] text-gray-400 dark:text-gray-500">{e.flag} {e.customerId}</p>}
                                    </td>
                                    <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{e.escalatedBy} <span className="text-gray-300 dark:text-gray-600">→</span> {e.escalatedTo}</td>
                                    <td className="px-2 py-2.5 whitespace-nowrap">
                                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${levelClasses[e.level]}`}>{e.level}</span>
                                    </td>
                                    <td className="px-2 py-2.5 whitespace-nowrap">
                                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusClasses[e.status]}`}>{e.status}</span>
                                    </td>
                                    <td className="px-2 py-2.5 whitespace-nowrap">
                                        <span className={`text-[12px] ${overdue ? 'text-red-500 dark:text-red-400 font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>
                                            {e.dueDate} {overdue && '(Overdue)'}
                                        </span>
                                    </td>
                                    <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                        <button onClick={() => onView(e)} className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                                            <Eye size={13} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {rows.length === 0 && (
                            <tr><td colSpan={8} className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">No escalations match your search.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
                <span>Showing {pageRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {(currentPage - 1) * pageSize + pageRows.length} of {rows.length} escalations</span>
                <div className="flex items-center gap-1">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                        className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">‹</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button key={p} onClick={() => setPage(p)}
                            className={`px-2.5 py-1 rounded cursor-pointer ${p === currentPage ? 'bg-blue-600 text-white' : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                            {p}
                        </button>
                    ))}
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                        className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">›</button>
                </div>
                <select className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded px-2 py-1 text-[12px] text-gray-600 dark:text-gray-300">
                    <option>10 / page</option><option>20 / page</option><option>50 / page</option>
                </select>
            </div>
        </>
    );
}

// ── Escalation Detail Modal ──────────────────────────────────────
function EscalationDetailModal({
    escalation, onClose, onUpdateStatus,
}: { escalation: EscalationItem; onClose: () => void; onUpdateStatus: (id: string, status: EscalationStatusType) => void }) {
    const [status, setStatus] = useState<EscalationStatusType>(escalation.status);
    const STATUSES: EscalationStatusType[] = ['Pending Response', 'Acknowledged', 'In Progress', 'Resolved'];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg p-5 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white">{escalation.id}</h3>
                    <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><X size={16} /></button>
                </div>

                <p className="text-[13px] font-medium text-gray-800 dark:text-gray-100 mb-1">{escalation.title}</p>
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${sourceClasses[escalation.sourceType]}`}>{escalation.sourceType}</span>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${levelClasses[escalation.level]}`}>{escalation.level}</span>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusClasses[escalation.status]}`}>{escalation.status}</span>
                </div>

                <div className="space-y-2 mb-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                    {[
                        ['Source Reference', escalation.sourceId],
                        ['Customer', escalation.customerName === 'N/A' ? 'N/A (Institutional)' : `${escalation.customerName} (${escalation.customerId})`],
                        ['Country', `${escalation.flag} ${escalation.country}`],
                        ['Escalated By', escalation.escalatedBy],
                        ['Escalated To', escalation.escalatedTo],
                        ['Escalated Date', escalation.escalatedDate],
                        ['Due Date', escalation.dueDate],
                    ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between text-[12px]">
                            <span className="text-gray-400 dark:text-gray-500">{label}</span>
                            <span className="text-gray-700 dark:text-gray-200 font-medium text-right">{value}</span>
                        </div>
                    ))}
                </div>

                <div className="mb-4">
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-1">Escalation Reason</p>
                    <p className="text-[12px] text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 rounded-lg p-3">{escalation.reason}</p>
                </div>

                <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1.5 block">Update Status</label>
                <div className="grid grid-cols-2 gap-2 mb-5">
                    {STATUSES.map(s => (
                        <button
                            key={s}
                            onClick={() => setStatus(s)}
                            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border text-[11.5px] font-medium cursor-pointer transition-colors ${status === s
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300'
                                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            {status === s && <Check size={11} />} {s}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        Cancel
                    </button>
                    <button
                        onClick={() => { onUpdateStatus(escalation.id, status); onClose(); }}
                        className="flex-1 px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 cursor-pointer"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────
export default function EscalationsPage() {
    const [escalations, setEscalations] = useState(escalationItems);
    const [search, setSearch] = useState('');
    const [sourceFilter, setSourceFilter] = useState('All Sources');
    const [levelFilter, setLevelFilter] = useState('All Levels');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [viewing, setViewing] = useState<EscalationItem | null>(null);
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

    const handleUpdateStatus = (id: string, status: EscalationStatusType) => {
        setEscalations(prev => prev.map(e => (e.id === id ? { ...e, status } : e)));
        showToast(`${id} updated to ${status}`);
    };

    const filteredRows = escalations.filter(e => {
        if (sourceFilter !== 'All Sources' && e.sourceType !== sourceFilter) return false;
        if (levelFilter !== 'All Levels' && e.level !== levelFilter) return false;
        if (statusFilter !== 'All Status' && e.status !== statusFilter) return false;
        if (!search) return true;
        const q = search.toLowerCase();
        return e.id.toLowerCase().includes(q) || e.title.toLowerCase().includes(q) || e.customerName.toLowerCase().includes(q);
    });

    return (
        <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="mb-5">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Escalations</h1>
                <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                    <span>Dashboard</span><ChevronRight size={12} />
                    <span>KYC & Compliance</span><ChevronRight size={12} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Escalations</span>
                </div>
            </div>

            <StatCards />

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                <FilterBar
                    search={search} setSearch={setSearch}
                    sourceFilter={sourceFilter} setSourceFilter={setSourceFilter}
                    levelFilter={levelFilter} setLevelFilter={setLevelFilter}
                    statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                />
                <EscalationsTable rows={filteredRows} onView={setViewing} />
            </div>

            {viewing && (
                <EscalationDetailModal escalation={viewing} onClose={() => setViewing(null)} onUpdateStatus={handleUpdateStatus} />
            )}

            {toast && (
                <div className="fixed bottom-5 right-5 bg-gray-900 dark:bg-gray-700 text-white text-[12px] px-4 py-2.5 rounded-lg shadow-lg z-50">
                    {toast}
                </div>
            )}
        </div>
    );
}