'use client';

import { useState } from 'react';
import {
    ChevronRight, Search, Plus, Pencil, MoreVertical, X,
    Globe2, RefreshCw, Power,
} from 'lucide-react';
import {
    managedCountries,
    managedCorridors,
    countriesCorridorsStats,
    regionOptions,
    ManagedCountry,
    ManagedCorridor,
    CountryStatus,
    CorridorStatusMgmt,
} from '@/lib/data';

// ── helpers ───────────────────────────────────────────────────
const countryStatusClasses: Record<CountryStatus, string> = {
    Active: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    Inactive: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
};

const corridorStatusClasses: Record<CorridorStatusMgmt, string> = {
    Active: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    Inactive: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
    Suspended: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
};

const TABS = ['Countries', 'Corridors'] as const;

// ── Stat cards ────────────────────────────────────────────────
function StatCards() {
    const s = countriesCorridorsStats;
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {[
                { label: 'Total Countries', value: s.totalCountries },
                { label: 'Active Countries', value: s.activeCountries },
                { label: 'Total Corridors', value: s.totalCorridors },
                { label: 'Active Corridors', value: s.activeCorridors },
            ].map(c => (
                <div key={c.label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5">
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-1">{c.label}</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{c.value}</p>
                </div>
            ))}
        </div>
    );
}

// ── Tabs ──────────────────────────────────────────────────────
function PageTabs({ active, setActive }: { active: string; setActive: (v: string) => void }) {
    return (
        <div className="flex items-center gap-6 px-4 pt-3 border-b border-gray-100 dark:border-gray-700/60">
            {TABS.map(tab => (
                <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={`pb-2.5 text-[13px] font-medium border-b-2 -mb-px transition-colors cursor-pointer ${active === tab
                            ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                            : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}

// ── Filter bar ────────────────────────────────────────────────
function FilterBar({
    search, setSearch, placeholder, onAddClick, addLabel, statusFilter, setStatusFilter, statusOptions,
}: {
    search: string; setSearch: (v: string) => void; placeholder: string;
    onAddClick: () => void; addLabel: string;
    statusFilter: string; setStatusFilter: (v: string) => void; statusOptions: string[];
}) {
    return (
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
            <div className="flex items-center gap-2 flex-1 min-w-[160px] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
                <Search size={14} className="text-gray-400 dark:text-gray-500" />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder={placeholder}
                    className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
            </div>
            <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none"
            >
                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button
                onClick={onAddClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 cursor-pointer sm:ml-auto"
            >
                <Plus size={13} /> {addLabel}
            </button>
        </div>
    );
}

// ── Countries Table ───────────────────────────────────────────
function CountriesTable({
    rows, onToggleStatus,
}: { rows: ManagedCountry[]; onToggleStatus: (id: string) => void }) {
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[760px]">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="px-4 py-2.5 font-medium">Country</th>
                            <th className="px-2 py-2.5 font-medium">Region</th>
                            <th className="px-2 py-2.5 font-medium">Currency</th>
                            <th className="px-2 py-2.5 font-medium">Corridors</th>
                            <th className="px-2 py-2.5 font-medium">Added On</th>
                            <th className="px-2 py-2.5 font-medium">Status</th>
                            <th className="px-2 py-2.5 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageRows.map(c => (
                            <tr key={c.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                                <td className="px-4 py-2.5 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-800 dark:text-gray-100">
                                        <span className="text-base">{c.flag}</span> {c.name}
                                    </span>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{c.region}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{c.currency}</td>
                                <td className="px-2 py-2.5 text-[12px] font-medium text-gray-900 dark:text-white whitespace-nowrap">{c.corridorCount}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{c.addedOn}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${countryStatusClasses[c.status]}`}>{c.status}</span>
                                </td>
                                <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                                            <Pencil size={13} />
                                        </button>
                                        <button
                                            onClick={() => onToggleStatus(c.id)}
                                            className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                                            title={c.status === 'Active' ? 'Deactivate' : 'Activate'}
                                        >
                                            <Power size={13} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">
                                    No countries match your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
                <span>Showing {pageRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {(currentPage - 1) * pageSize + pageRows.length} of {rows.length} countries</span>
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

// ── Corridors Table ───────────────────────────────────────────
function CorridorsTable({
    rows, onToggleStatus,
}: { rows: ManagedCorridor[]; onToggleStatus: (id: string) => void }) {
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[920px]">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="px-4 py-2.5 font-medium">Sending Country</th>
                            <th className="px-2 py-2.5 font-medium">Receiving Country</th>
                            <th className="px-2 py-2.5 font-medium">Currency Pair</th>
                            <th className="px-2 py-2.5 font-medium">Transactions</th>
                            <th className="px-2 py-2.5 font-medium">Volume</th>
                            <th className="px-2 py-2.5 font-medium">Fee Rules</th>
                            <th className="px-2 py-2.5 font-medium">Status</th>
                            <th className="px-2 py-2.5 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageRows.map(c => (
                            <tr key={c.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                                <td className="px-4 py-2.5 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-700 dark:text-gray-300">{c.sendingFlag} {c.sendingCountry}</span>
                                </td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-700 dark:text-gray-300">{c.receivingFlag} {c.receivingCountry}</span>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{c.currencyPair}</td>
                                <td className="px-2 py-2.5 text-[12px] font-medium text-gray-900 dark:text-white whitespace-nowrap">{c.transactions.toLocaleString()}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-700 dark:text-gray-200 whitespace-nowrap">{c.volumeCurrency}{c.volume.toLocaleString()}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{c.feeRulesCount}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${corridorStatusClasses[c.status]}`}>{c.status}</span>
                                </td>
                                <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                                            <Pencil size={13} />
                                        </button>
                                        <button
                                            onClick={() => onToggleStatus(c.id)}
                                            className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                                            title={c.status === 'Active' ? 'Suspend' : 'Activate'}
                                        >
                                            <Power size={13} />
                                        </button>
                                        <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">
                                            <MoreVertical size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 && (
                            <tr>
                                <td colSpan={8} className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">
                                    No corridors match your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
                <span>Showing {pageRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {(currentPage - 1) * pageSize + pageRows.length} of {rows.length} corridors</span>
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

// ── Add Country Modal ──────────────────────────────────────────
function AddCountryModal({ onClose, onAdd }: { onClose: () => void; onAdd: (name: string, region: string, currency: string) => void }) {
    const [name, setName] = useState('');
    const [region, setRegion] = useState('Asia');
    const [currency, setCurrency] = useState('');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-sm p-5" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Globe2 size={16} className="text-blue-600" /> Add Country
                    </h3>
                    <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><X size={16} /></button>
                </div>
                <div className="space-y-3">
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Country Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Vietnam"
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                    </div>
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Region</label>
                        <select value={region} onChange={e => setRegion(e.target.value)}
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 cursor-pointer">
                            {regionOptions.filter(r => r !== 'All Regions').map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Currency Code</label>
                        <input value={currency} onChange={e => setCurrency(e.target.value.toUpperCase())} placeholder="e.g. VND" maxLength={3}
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-5">
                    <button onClick={onClose} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">Cancel</button>
                    <button
                        disabled={!name || !currency}
                        onClick={() => { onAdd(name, region, currency); onClose(); }}
                        className="flex-1 px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Add Country
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Add Corridor Modal ─────────────────────────────────────────
function AddCorridorModal({
    countries, onClose, onAdd,
}: { countries: ManagedCountry[]; onClose: () => void; onAdd: (from: string, to: string) => void }) {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-sm p-5" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <RefreshCw size={15} className="text-blue-600" /> Add Corridor
                    </h3>
                    <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><X size={16} /></button>
                </div>
                <div className="space-y-3">
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Sending Country</label>
                        <select value={from} onChange={e => setFrom(e.target.value)}
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 cursor-pointer">
                            <option value="">Select country</option>
                            {countries.map(c => <option key={c.id} value={c.name}>{c.flag} {c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Receiving Country</label>
                        <select value={to} onChange={e => setTo(e.target.value)}
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 cursor-pointer">
                            <option value="">Select country</option>
                            {countries.map(c => <option key={c.id} value={c.name}>{c.flag} {c.name}</option>)}
                        </select>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-5">
                    <button onClick={onClose} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">Cancel</button>
                    <button
                        disabled={!from || !to || from === to}
                        onClick={() => { onAdd(from, to); onClose(); }}
                        className="flex-1 px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Add Corridor
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────
export default function CountriesCorridorsPage() {
    const [activeTab, setActiveTab] = useState<string>('Countries');
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [countries, setCountries] = useState(managedCountries);
    const [corridors, setCorridors] = useState(managedCorridors);
    const [showAddCountry, setShowAddCountry] = useState(false);
    const [showAddCorridor, setShowAddCorridor] = useState(false);
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

    const toggleCountryStatus = (id: string) => {
        setCountries(prev => prev.map(c => (c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c)));
        showToast('Country status updated');
    };

    const toggleCorridorStatus = (id: string) => {
        setCorridors(prev => prev.map(c => (c.id === id ? { ...c, status: c.status === 'Active' ? 'Suspended' : 'Active' } : c)));
        showToast('Corridor status updated');
    };

    const handleAddCountry = (name: string, region: string, currency: string) => {
        setCountries(prev => [
            { id: `CTY-${Date.now()}`, name, flag: '🏳️', region: region as ManagedCountry['region'], currency, corridorCount: 0, status: 'Active', addedOn: 'Just now' },
            ...prev,
        ]);
        showToast(`${name} added`);
    };

    const handleAddCorridor = (from: string, to: string) => {
        const fromC = countries.find(c => c.name === from);
        const toC = countries.find(c => c.name === to);
        setCorridors(prev => [
            {
                id: `COR-${Date.now()}`, sendingCountry: from, sendingFlag: fromC?.flag ?? '🏳️',
                receivingCountry: to, receivingFlag: toC?.flag ?? '🏳️',
                currencyPair: `${fromC?.currency ?? '?'} → ${toC?.currency ?? '?'}`,
                transactions: 0, volume: 0, volumeCurrency: '', feeRulesCount: 0, status: 'Active',
            },
            ...prev,
        ]);
        showToast(`Corridor ${from} → ${to} added`);
    };

    // reset filters when switching tabs so a "Suspended" filter doesn't silently hide everything on Countries tab
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setStatusFilter('All Status');
        setSearch('');
    };

    const filteredCountries = countries.filter(c => {
        if (statusFilter !== 'All Status' && c.status !== statusFilter) return false;
        return !search || c.name.toLowerCase().includes(search.toLowerCase());
    });
    const filteredCorridors = corridors.filter(c => {
        if (statusFilter !== 'All Status' && c.status !== statusFilter) return false;
        return !search || c.sendingCountry.toLowerCase().includes(search.toLowerCase()) || c.receivingCountry.toLowerCase().includes(search.toLowerCase());
    });

    const countryStatusOptions = ['All Status', 'Active', 'Inactive'];
    const corridorStatusOptions = ['All Status', 'Active', 'Inactive', 'Suspended'];

    return (
        <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="mb-5">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Countries & Corridors</h1>
                <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                    <span>Dashboard</span><ChevronRight size={12} />
                    <span>Management</span><ChevronRight size={12} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Countries & Corridors</span>
                </div>
            </div>

            <StatCards />

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                <PageTabs active={activeTab} setActive={handleTabChange} />
                {activeTab === 'Countries' ? (
                    <>
                        <FilterBar
                            search={search} setSearch={setSearch} placeholder="Search countries..."
                            onAddClick={() => setShowAddCountry(true)} addLabel="Add Country"
                            statusFilter={statusFilter} setStatusFilter={setStatusFilter} statusOptions={countryStatusOptions}
                        />
                        <CountriesTable rows={filteredCountries} onToggleStatus={toggleCountryStatus} />
                    </>
                ) : (
                    <>
                        <FilterBar
                            search={search} setSearch={setSearch} placeholder="Search corridors..."
                            onAddClick={() => setShowAddCorridor(true)} addLabel="Add Corridor"
                            statusFilter={statusFilter} setStatusFilter={setStatusFilter} statusOptions={corridorStatusOptions}
                        />
                        <CorridorsTable rows={filteredCorridors} onToggleStatus={toggleCorridorStatus} />
                    </>
                )}
            </div>

            {showAddCountry && <AddCountryModal onClose={() => setShowAddCountry(false)} onAdd={handleAddCountry} />}
            {showAddCorridor && <AddCorridorModal countries={countries} onClose={() => setShowAddCorridor(false)} onAdd={handleAddCorridor} />}

            {toast && (
                <div className="fixed bottom-5 right-5 bg-gray-900 dark:bg-gray-700 text-white text-[12px] px-4 py-2.5 rounded-lg shadow-lg z-50">
                    {toast}
                </div>
            )}
        </div>
    );
}