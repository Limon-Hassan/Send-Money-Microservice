'use client';

import { useState } from 'react';
import {
    ChevronRight, Search, Download, X, Eye, ShieldOff, RefreshCw, ListChecks, Calendar, Check,
} from 'lucide-react';
import {
    sanctionedEntities,
    sanctionScreeningHits,
    sanctionsListStats,
    sanctionTypeOptions,
    sanctionListSourceOptions,
    screeningHitStatusOptions,
    SanctionedEntity,
    SanctionScreeningHit,
    SanctionEntryStatus,
    ScreeningHitStatus,
} from '@/lib/data';

import { flagForCountryName } from '@/lib/countries_data';


// ── helpers ───────────────────────────────────────────────────

function CountryFlag({ country, size = 'w-4 h-4' }: { country: string; size?: string }) {
    return (
        <img
            src={flagForCountryName(country)}
            alt={country}
            className={`${size} rounded-full object-cover inline-block shrink-0`}
        />
    );
}


const entityStatusClasses: Record<SanctionEntryStatus, string> = {
    Active: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
    Removed: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
};

const hitStatusClasses: Record<ScreeningHitStatus, string> = {
    'Pending Review': 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    'Confirmed Match': 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
    'False Positive': 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
    Cleared: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
};

const listSourceClasses: Record<string, string> = {
    'OFAC SDN': 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    'UN Consolidated': 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400',
    'EU Sanctions': 'bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400',
    'UK HMT': 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400',
    Interpol: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
};

const matchScoreColor = (score: number) => {
    if (score >= 85) return 'text-red-600 dark:text-red-400';
    if (score >= 65) return 'text-amber-600 dark:text-amber-400';
    return 'text-gray-500 dark:text-gray-400';
};

const TABS = ['Sanctions Database', 'Screening Hits'] as const;

// ── Stat cards ────────────────────────────────────────────────
function StatCards() {
    const s = sanctionsListStats;
    const cards = [
        { label: 'Total Sanctioned Entities', value: s.totalEntities.toLocaleString(), icon: ShieldOff, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950' },
        { label: 'Active Hits (This Week)', value: s.activeHitsThisWeek.toString(), icon: ListChecks, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950' },
        { label: 'Lists Monitored', value: s.listsMonitored.toString(), icon: ListChecks, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950' },
        { label: 'Last Sync', value: s.lastSyncTime.split(' ').slice(0, 3).join(' '), icon: RefreshCw, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950' },
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

// ── Tabs ──────────────────────────────────────────────────────
function PageTabs({ active, setActive }: { active: string; setActive: (v: string) => void }) {
    return (
        <div className="flex items-center justify-between px-4 pt-3 border-b border-gray-100 dark:border-gray-700/60">
            <div className="flex items-center gap-6 overflow-x-auto">
                {TABS.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActive(tab)}
                        className={`pb-2.5 text-[13px] font-medium border-b-2 -mb-px transition-colors cursor-pointer whitespace-nowrap ${active === tab
                            ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                            : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 mb-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <RefreshCw size={13} /> Sync Lists
            </button>
        </div>
    );
}

// ── Pagination footer ────────────────────────────────────────
function PaginationFooter({
    totalRows, label, page, setPage, pageSize,
}: { totalRows: number; label: string; page: number; setPage: (n: number | ((p: number) => number)) => void; pageSize: number }) {
    const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
    const currentPage = Math.min(page, totalPages);
    const from = totalRows === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const to = Math.min(currentPage * pageSize, totalRows);
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
            <span>Showing {from} to {to} of {totalRows} {label}</span>
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
    );
}

// ── Sanctions Database Table ──────────────────────────────────
function SanctionsDatabaseTable({
    rows, search, setSearch, typeFilter, setTypeFilter, sourceFilter, setSourceFilter, onView,
}: {
    rows: SanctionedEntity[]; search: string; setSearch: (v: string) => void;
    typeFilter: string; setTypeFilter: (v: string) => void;
    sourceFilter: string; setSourceFilter: (v: string) => void;
    onView: (e: SanctionedEntity) => void;
}) {
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
            <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
                <div className="flex items-center gap-2 flex-1 min-w-45 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
                    <Search size={14} className="text-gray-400 dark:text-gray-500" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, alias, or ID..."
                        className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500" />
                </div>
                <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none">
                    {sanctionTypeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <select value={sourceFilter} onChange={e => setSourceFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none">
                    {sanctionListSourceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer sm:ml-auto">
                    <Download size={13} /> Export
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-230">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="px-4 py-2.5 font-medium">Name / Aliases</th>
                            <th className="px-2 py-2.5 font-medium">Type</th>
                            <th className="px-2 py-2.5 font-medium">Country</th>
                            <th className="px-2 py-2.5 font-medium">List Source</th>
                            <th className="px-2 py-2.5 font-medium">Date Added</th>
                            <th className="px-2 py-2.5 font-medium">Status</th>
                            <th className="px-2 py-2.5 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageRows.map(e => (
                            <tr key={e.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                                <td className="px-4 py-2.5 whitespace-nowrap">
                                    <p className="text-[13px] font-medium text-gray-800 dark:text-gray-100">{e.name}</p>
                                    <p className="text-[10px] text-gray-400 dark:text-gray-500">{e.id}{e.aliases.length > 0 ? ` · aka ${e.aliases[0]}${e.aliases.length > 1 ? ` +${e.aliases.length - 1}` : ''}` : ''}</p>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{e.type}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-600 dark:text-gray-300"><CountryFlag country={e.country} /> {e.country}</span>
                                </td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${listSourceClasses[e.listSource]}`}>{e.listSource}</span>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{e.dateAdded}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${entityStatusClasses[e.status]}`}>{e.status}</span>
                                </td>
                                <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                    <button onClick={() => onView(e)} className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                                        <Eye size={13} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 && (
                            <tr><td colSpan={7} className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">No entities match your search.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
            <PaginationFooter totalRows={rows.length} label="entities" page={page} setPage={setPage} pageSize={pageSize} />
        </>
    );
}

// ── Screening Hits Table ──────────────────────────────────────
function ScreeningHitsTable({
    rows, search, setSearch, statusFilter, setStatusFilter, onUpdateStatus,
}: {
    rows: SanctionScreeningHit[]; search: string; setSearch: (v: string) => void;
    statusFilter: string; setStatusFilter: (v: string) => void;
    onUpdateStatus: (id: string, status: ScreeningHitStatus) => void;
}) {
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
            <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
                <div className="flex items-center gap-2 flex-1 min-w-45 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
                    <Search size={14} className="text-gray-400 dark:text-gray-500" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customer or matched entity..."
                        className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500" />
                </div>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none">
                    {screeningHitStatusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer sm:ml-auto">
                    <Calendar size={13} /> <span className="hidden sm:inline">Date Range</span>
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-250">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="px-4 py-2.5 font-medium">Customer</th>
                            <th className="px-2 py-2.5 font-medium">Matched Entity</th>
                            <th className="px-2 py-2.5 font-medium">Match Score</th>
                            <th className="px-2 py-2.5 font-medium">List Source</th>
                            <th className="px-2 py-2.5 font-medium">Status</th>
                            <th className="px-2 py-2.5 font-medium">Reviewed By</th>
                            <th className="px-2 py-2.5 font-medium">Screened At</th>
                            <th className="px-2 py-2.5 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageRows.map(h => (
                            <tr key={h.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                                <td className="px-4 py-2.5 whitespace-nowrap">
                                    <p className="text-[12px] text-gray-700 dark:text-gray-300">{h.customerName}</p>
                                    <p className="text-[10px] text-gray-400 dark:text-gray-500">{h.customerId}</p>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap max-w-55 truncate">{h.matchedEntity}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[13px] font-bold ${matchScoreColor(h.matchScore)}`}>{h.matchScore}%</span>
                                </td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${listSourceClasses[h.listSource]}`}>{h.listSource}</span>
                                </td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${hitStatusClasses[h.status]}`}>{h.status}</span>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{h.reviewedBy ?? '—'}</td>
                                <td className="px-2 py-2.5 text-[11.5px] text-gray-400 dark:text-gray-500 whitespace-nowrap">{h.screenedAt}</td>
                                <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                    {h.status === 'Pending Review' && (
                                        <div className="flex items-center justify-end gap-1.5">
                                            <button onClick={() => onUpdateStatus(h.id, 'Confirmed Match')}
                                                className="px-2 py-1 rounded-lg bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 text-[10.5px] font-medium hover:bg-red-100 dark:hover:bg-red-900 cursor-pointer">
                                                Confirm
                                            </button>
                                            <button onClick={() => onUpdateStatus(h.id, 'False Positive')}
                                                className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10.5px] font-medium hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
                                                False Positive
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 && (
                            <tr><td colSpan={8} className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">No screening hits match your search.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
            <PaginationFooter totalRows={rows.length} label="hits" page={page} setPage={setPage} pageSize={pageSize} />
        </>
    );
}

// ── Entity Detail Modal ──────────────────────────────────────────
function EntityDetailModal({ entity, onClose }: { entity: SanctionedEntity; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-5" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white">Sanctioned Entity Detail</h3>
                    <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><X size={16} /></button>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-[14px] font-semibold text-gray-900 dark:text-white">{entity.name}</p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500">{entity.id} · {entity.flag} {entity.country}</p>
                    </div>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${entityStatusClasses[entity.status]}`}>{entity.status}</span>
                </div>
                <div className="space-y-2 mb-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                    {[
                        ['Type', entity.type],
                        ['List Source', entity.listSource],
                        ['Aliases', entity.aliases.length > 0 ? entity.aliases.join(', ') : 'None recorded'],
                        ['Date Added', entity.dateAdded],
                    ].map(([label, value]) => (
                        <div key={label} className="flex items-start justify-between text-[12px] gap-3">
                            <span className="text-gray-400 dark:text-gray-500 shrink-0">{label}</span>
                            <span className="text-gray-700 dark:text-gray-200 font-medium text-right">{value}</span>
                        </div>
                    ))}
                </div>
                <div>
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-1">Listing Reason</p>
                    <p className="text-[12px] text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 rounded-lg p-3">{entity.reason}</p>
                </div>
                <button onClick={onClose} className="w-full mt-5 px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 cursor-pointer">
                    Close
                </button>
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────
export default function SanctionsListPage() {
    const [activeTab, setActiveTab] = useState<string>('Sanctions Database');
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('All Types');
    const [sourceFilter, setSourceFilter] = useState('All Lists');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [hits, setHits] = useState(sanctionScreeningHits);
    const [viewing, setViewing] = useState<SanctionedEntity | null>(null);
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setSearch('');
        setTypeFilter('All Types');
        setSourceFilter('All Lists');
        setStatusFilter('All Status');
    };

    const handleUpdateHitStatus = (id: string, status: ScreeningHitStatus) => {
        setHits(prev => prev.map(h => (h.id === id ? { ...h, status, reviewedBy: 'Current Officer' } : h)));
        showToast(`Hit marked as ${status}`);
    };

    const filteredEntities = sanctionedEntities.filter(e => {
        if (typeFilter !== 'All Types' && e.type !== typeFilter) return false;
        if (sourceFilter !== 'All Lists' && e.listSource !== sourceFilter) return false;
        if (!search) return true;
        const q = search.toLowerCase();
        return e.name.toLowerCase().includes(q) || e.aliases.some(a => a.toLowerCase().includes(q)) || e.id.toLowerCase().includes(q);
    });

    const filteredHits = hits.filter(h => {
        if (statusFilter !== 'All Status' && h.status !== statusFilter) return false;
        if (!search) return true;
        const q = search.toLowerCase();
        return h.customerName.toLowerCase().includes(q) || h.matchedEntity.toLowerCase().includes(q);
    });

    return (
        <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="mb-5">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Sanctions List</h1>
                <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                    <span>Dashboard</span><ChevronRight size={12} />
                    <span>KYC & Compliance</span><ChevronRight size={12} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Sanctions List</span>
                </div>
            </div>

            <StatCards />

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                <PageTabs active={activeTab} setActive={handleTabChange} />
                {activeTab === 'Sanctions Database' ? (
                    <SanctionsDatabaseTable
                        rows={filteredEntities} search={search} setSearch={setSearch}
                        typeFilter={typeFilter} setTypeFilter={setTypeFilter}
                        sourceFilter={sourceFilter} setSourceFilter={setSourceFilter}
                        onView={setViewing}
                    />
                ) : (
                    <ScreeningHitsTable
                        rows={filteredHits} search={search} setSearch={setSearch}
                        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                        onUpdateStatus={handleUpdateHitStatus}
                    />
                )}
            </div>

            {viewing && <EntityDetailModal entity={viewing} onClose={() => setViewing(null)} />}

            {toast && (
                <div className="fixed bottom-5 right-5 bg-gray-900 dark:bg-gray-700 text-white text-[12px] px-4 py-2.5 rounded-lg shadow-lg z-50">
                    {toast}
                </div>
            )}
        </div>
    );
}