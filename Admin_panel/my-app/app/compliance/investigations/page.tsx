'use client';

import { useState } from 'react';
import {
    ChevronRight, Search, Download, X, Eye, FolderSearch, Activity, FileSearch,
    ShieldX, Clock3, Check,
} from 'lucide-react';
import {
    fraudInvestigations,
    fraudInvestigationsStats,
    investigationStageOptions,
    investigationOutcomeOptions,
    investigationPriorityOptions,
    FraudInvestigation,
    InvestigationOutcome,
    InvestigationPriorityLevel,
} from '@/lib/data';

// ── helpers ───────────────────────────────────────────────────
const outcomeClasses: Record<InvestigationOutcome, string> = {
    Pending: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    'Confirmed Fraud': 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
    Cleared: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    Inconclusive: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
};

const priorityClasses: Record<InvestigationPriorityLevel, string> = {
    Low: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
    Medium: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    High: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    Critical: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
};

const currencySymbol: Record<string, string> = { GBP: '£', USD: '$', EUR: '€', BDT: '৳', PHP: '₱', AED: 'AED ', SAR: 'SAR ' };
const sym = (c: string) => currencySymbol[c] ?? '';

// ── Stat cards ────────────────────────────────────────────────
function StatCards() {
    const s = fraudInvestigationsStats;
    const cards = [
        { label: 'Total Investigations', value: s.totalInvestigations.toString(), icon: FolderSearch, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950' },
        { label: 'Active', value: s.activeInvestigations.toString(), icon: Activity, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950' },
        { label: 'Evidence Pending', value: s.evidencePending.toString(), icon: FileSearch, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950' },
        { label: 'Confirmed Outcomes', value: s.confirmedOutcomes.toString(), icon: ShieldX, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950' },
        { label: 'Avg Resolution', value: `${s.avgResolutionDays}d`, icon: Clock3, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950' },
    ];
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
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
    search, setSearch, stageFilter, setStageFilter, outcomeFilter, setOutcomeFilter, priorityFilter, setPriorityFilter,
}: {
    search: string; setSearch: (v: string) => void;
    stageFilter: string; setStageFilter: (v: string) => void;
    outcomeFilter: string; setOutcomeFilter: (v: string) => void;
    priorityFilter: string; setPriorityFilter: (v: string) => void;
}) {
    return (
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
            <div className="flex items-center gap-2 flex-1 min-w-45 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
                <Search size={14} className="text-gray-400 dark:text-gray-500" />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search investigation ID, case, or customer..."
                    className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
            </div>
            <select value={stageFilter} onChange={e => setStageFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none">
                {investigationStageOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={outcomeFilter} onChange={e => setOutcomeFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none">
                {investigationOutcomeOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none">
                {investigationPriorityOptions.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer sm:ml-auto">
                <Download size={13} /> Export
            </button>
        </div>
    );
}

// ── Investigations Table ──────────────────────────────────────
function InvestigationsTable({ rows, onView }: { rows: FraudInvestigation[]; onView: (i: FraudInvestigation) => void }) {
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
                            <th className="px-4 py-2.5 font-medium">Investigation ID</th>
                            <th className="px-2 py-2.5 font-medium">Linked Case</th>
                            <th className="px-2 py-2.5 font-medium">Customer</th>
                            <th className="px-2 py-2.5 font-medium">Amount</th>
                            <th className="px-2 py-2.5 font-medium">Investigator</th>
                            <th className="px-2 py-2.5 font-medium">Stage</th>
                            <th className="px-2 py-2.5 font-medium">Outcome</th>
                            <th className="px-2 py-2.5 font-medium">Priority</th>
                            <th className="px-2 py-2.5 font-medium">Evidence</th>
                            <th className="px-2 py-2.5 font-medium">Target Close</th>
                            <th className="px-2 py-2.5 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageRows.map(i => (
                            <tr key={i.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                                <td className="px-4 py-2.5 text-[12px] text-blue-600 dark:text-blue-400 font-medium whitespace-nowrap">{i.id}</td>
                                <td className="px-2 py-2.5 text-[11.5px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{i.linkedCaseId}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <p className="text-[12px] text-gray-700 dark:text-gray-300">{i.customerName}</p>
                                    <p className="text-[10px] text-gray-400 dark:text-gray-500">{i.flag} {i.customerId}</p>
                                </td>
                                <td className="px-2 py-2.5 text-[13px] font-semibold text-gray-900 dark:text-white whitespace-nowrap">{sym(i.currency)}{i.amountInvolved.toLocaleString()}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{i.investigator}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{i.stage}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${outcomeClasses[i.outcome]}`}>{i.outcome}</span>
                                </td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${priorityClasses[i.priority]}`}>{i.priority}</span>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] font-medium text-gray-900 dark:text-white whitespace-nowrap">{i.evidenceCount}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{i.targetCloseDate}</td>
                                <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                    <button onClick={() => onView(i)} className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                                        <Eye size={13} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 && (
                            <tr><td colSpan={11} className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">No investigations match your search.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
                <span>Showing {pageRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {(currentPage - 1) * pageSize + pageRows.length} of {rows.length} investigations</span>
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

// ── Investigation Detail Modal (with timeline + outcome update) ─
function InvestigationDetailModal({
    investigation, onClose, onUpdateOutcome,
}: { investigation: FraudInvestigation; onClose: () => void; onUpdateOutcome: (id: string, outcome: InvestigationOutcome) => void }) {
    const [outcome, setOutcome] = useState<InvestigationOutcome>(investigation.outcome);
    const OUTCOMES: InvestigationOutcome[] = ['Pending', 'Confirmed Fraud', 'Cleared', 'Inconclusive'];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg p-5 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white">{investigation.id}</h3>
                    <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><X size={16} /></button>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-[13px] font-medium text-gray-800 dark:text-gray-100">{investigation.customerName}</p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500">{investigation.flag} {investigation.customerId} · linked to {investigation.linkedCaseId}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[16px] font-bold text-gray-900 dark:text-white">{sym(investigation.currency)}{investigation.amountInvolved.toLocaleString()}</p>
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${priorityClasses[investigation.priority]}`}>{investigation.priority}</span>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-1">Findings Summary</p>
                    <p className="text-[12px] text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 rounded-lg p-3">{investigation.findings}</p>
                </div>

                <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-2">Investigation Timeline</p>
                <div className="space-y-3 mb-5">
                    {investigation.timeline.map((step, idx) => (
                        <div key={step.label} className="flex gap-3 relative">
                            {idx !== investigation.timeline.length - 1 && (
                                <div className={`absolute left-2.25 top-5 -bottom-3 w-px ${step.completed ? 'bg-emerald-300 dark:bg-emerald-700' : 'bg-gray-200 dark:bg-gray-700'}`} />
                            )}
                            <span className={`shrink-0 w-4.5 h-4.5 rounded-full flex items-center justify-center mt-0.5 ${step.completed ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                                }`}>
                                {step.completed && <Check size={11} />}
                            </span>
                            <div>
                                <p className={`text-[12px] font-medium ${step.completed ? 'text-gray-800 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'}`}>{step.label}</p>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500">{step.date}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1.5 block">Update Outcome</label>
                <div className="grid grid-cols-2 gap-2 mb-5">
                    {OUTCOMES.map(o => (
                        <button
                            key={o}
                            onClick={() => setOutcome(o)}
                            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border text-[12px] font-medium cursor-pointer transition-colors ${outcome === o
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300'
                                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            {outcome === o && <Check size={12} />} {o}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        Cancel
                    </button>
                    <button
                        onClick={() => { onUpdateOutcome(investigation.id, outcome); onClose(); }}
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
export default function FraudInvestigationsPage() {
    const [investigations, setInvestigations] = useState(fraudInvestigations);
    const [search, setSearch] = useState('');
    const [stageFilter, setStageFilter] = useState('All Stages');
    const [outcomeFilter, setOutcomeFilter] = useState('All Outcomes');
    const [priorityFilter, setPriorityFilter] = useState('All Priority');
    const [viewing, setViewing] = useState<FraudInvestigation | null>(null);
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

    const handleUpdateOutcome = (id: string, outcome: InvestigationOutcome) => {
        setInvestigations(prev => prev.map(i => (i.id === id ? { ...i, outcome } : i)));
        showToast(`${id} outcome updated to ${outcome}`);
    };

    const filteredRows = investigations.filter(i => {
        if (stageFilter !== 'All Stages' && i.stage !== stageFilter) return false;
        if (outcomeFilter !== 'All Outcomes' && i.outcome !== outcomeFilter) return false;
        if (priorityFilter !== 'All Priority' && i.priority !== priorityFilter) return false;
        if (!search) return true;
        const q = search.toLowerCase();
        return i.id.toLowerCase().includes(q) || i.linkedCaseId.toLowerCase().includes(q) || i.customerName.toLowerCase().includes(q);
    });

    return (
        <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="mb-5">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Fraud Investigations</h1>
                <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                    <span>Dashboard</span><ChevronRight size={12} />
                    <span>KYC & Compliance</span><ChevronRight size={12} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Fraud Investigations</span>
                </div>
            </div>

            <StatCards />

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                <FilterBar
                    search={search} setSearch={setSearch}
                    stageFilter={stageFilter} setStageFilter={setStageFilter}
                    outcomeFilter={outcomeFilter} setOutcomeFilter={setOutcomeFilter}
                    priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter}
                />
                <InvestigationsTable rows={filteredRows} onView={setViewing} />
            </div>

            {viewing && (
                <InvestigationDetailModal investigation={viewing} onClose={() => setViewing(null)} onUpdateOutcome={handleUpdateOutcome} />
            )}

            {toast && (
                <div className="fixed bottom-5 right-5 bg-gray-900 dark:bg-gray-700 text-white text-[12px] px-4 py-2.5 rounded-lg shadow-lg z-50">
                    {toast}
                </div>
            )}
        </div>
    );
}