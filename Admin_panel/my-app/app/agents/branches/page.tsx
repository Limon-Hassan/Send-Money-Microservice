'use client';

import { useState } from 'react';
import {
    ChevronRight, Search, Plus, Pencil, MoreVertical, X, Landmark, Power, Eye,
} from 'lucide-react';
import {
    partnerBranches,
    partnerBranchesStats,
    partnerBranchStatusOptions,
    partnerBranchTypeOptions,
    PartnerBranch,
    PartnerBranchStatus,
    PartnerBranchType,
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



const statusClasses: Record<PartnerBranchStatus, string> = {
    Active: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    Inactive: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
    Maintenance: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
};

const fmtCompact = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
    return n.toLocaleString();
};

// ── Stat cards ────────────────────────────────────────────────
function StatCards() {
    const s = partnerBranchesStats;
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {[
                { label: 'Total Branches', value: s.totalBranches.toLocaleString() },
                { label: 'Active Branches', value: s.activeBranches.toLocaleString() },
                { label: 'Countries Covered', value: s.totalCountries.toString() },
                { label: 'Monthly Volume', value: `£${fmtCompact(s.totalMonthlyVolume)}` },
            ].map(c => (
                <div key={c.label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5">
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-1">{c.label}</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{c.value}</p>
                </div>
            ))}
        </div>
    );
}

// ── Filter bar ────────────────────────────────────────────────
function FilterBar({
    search, setSearch, statusFilter, setStatusFilter, typeFilter, setTypeFilter, onAddClick,
}: {
    search: string; setSearch: (v: string) => void;
    statusFilter: string; setStatusFilter: (v: string) => void;
    typeFilter: string; setTypeFilter: (v: string) => void;
    onAddClick: () => void;
}) {
    return (
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
            <div className="flex items-center gap-2 flex-1 min-w-45 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
                <Search size={14} className="text-gray-400 dark:text-gray-500" />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search branch, city, or manager..."
                    className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
            </div>
            <select
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none"
            >
                {partnerBranchTypeOptions.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none"
            >
                {partnerBranchStatusOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button
                onClick={onAddClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 cursor-pointer sm:ml-auto"
            >
                <Plus size={13} /> Add Branch
            </button>
        </div>
    );
}

// ── Branches Table ────────────────────────────────────────────
function BranchesTable({
    rows, onToggleStatus, onView,
}: { rows: PartnerBranch[]; onToggleStatus: (id: string) => void; onView: (b: PartnerBranch) => void }) {
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
                            <th className="px-4 py-2.5 font-medium">Branch</th>
                            <th className="px-2 py-2.5 font-medium">Code</th>
                            <th className="px-2 py-2.5 font-medium">Country / City</th>
                            <th className="px-2 py-2.5 font-medium">Manager</th>
                            <th className="px-2 py-2.5 font-medium">Type</th>
                            <th className="px-2 py-2.5 font-medium">Agents</th>
                            <th className="px-2 py-2.5 font-medium">Monthly Volume</th>
                            <th className="px-2 py-2.5 font-medium">Status</th>
                            <th className="px-2 py-2.5 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageRows.map(b => (
                            <tr key={b.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                                <td className="px-4 py-2.5 text-[13px] font-medium text-gray-800 dark:text-gray-100 whitespace-nowrap">{b.name}</td>
                                <td className="px-2 py-2.5 text-[12px] text-blue-600 dark:text-blue-400 font-medium whitespace-nowrap font-mono">{b.code}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-600 dark:text-gray-300"><CountryFlag country={b.country}  /> {b.country}</span>
                                </td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <p className="text-[12px] text-gray-700 dark:text-gray-300">{b.manager}</p>
                                    <p className="text-[10px] text-gray-400 dark:text-gray-500">{b.managerPhone}</p>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{b.type}</td>
                                <td className="px-2 py-2.5 text-[12px] font-medium text-gray-900 dark:text-white whitespace-nowrap">{b.agentsCount}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-700 dark:text-gray-200 whitespace-nowrap">{b.volumeCurrency}{b.monthlyVolume.toLocaleString()}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusClasses[b.status]}`}>{b.status}</span>
                                </td>
                                <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => onView(b)} className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                                            <Eye size={13} />
                                        </button>
                                        <button className="text-gray-400 dark:text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer">
                                            <Pencil size={13} />
                                        </button>
                                        <button
                                            onClick={() => onToggleStatus(b.id)}
                                            className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                                            title={b.status === 'Active' ? 'Deactivate' : 'Activate'}
                                        >
                                            <Power size={13} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 && (
                            <tr><td colSpan={9} className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">No branches match your search.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
                <span>Showing {pageRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {(currentPage - 1) * pageSize + pageRows.length} of {rows.length} branches</span>
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

// ── View Branch Modal ───────────────────────────────────────────
function ViewBranchModal({ branch, onClose }: { branch: PartnerBranch; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-5" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white">Branch Details</h3>
                    <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><X size={16} /></button>
                </div>
                <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        <Landmark size={18} />
                    </span>
                    <div>
                        <p className="text-[14px] font-semibold text-gray-900 dark:text-white">{branch.name}</p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 font-mono">{branch.code}</p>
                    </div>
                </div>
                <div className="space-y-2">
                    {[
                        ['Address', branch.address],
                        ['City / Country', `${branch.city}, ${branch.flag} ${branch.country}`],
                        ['Manager', branch.manager],
                        ['Manager Phone', branch.managerPhone],
                        ['Type', branch.type],
                        ['Agents Assigned', branch.agentsCount.toString()],
                        ['Monthly Volume', `${branch.volumeCurrency}${branch.monthlyVolume.toLocaleString()}`],
                        ['Opened On', branch.openedDate],
                    ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between text-[12px]">
                            <span className="text-gray-400 dark:text-gray-500">{label}</span>
                            <span className="text-gray-700 dark:text-gray-200 font-medium text-right">{value}</span>
                        </div>
                    ))}
                    <div className="flex items-center justify-between text-[12px]">
                        <span className="text-gray-400 dark:text-gray-500">Status</span>
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusClasses[branch.status]}`}>{branch.status}</span>
                    </div>
                </div>
                <button onClick={onClose} className="w-full mt-5 px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 cursor-pointer">
                    Close
                </button>
            </div>
        </div>
    );
}

// ── Add Branch Modal ───────────────────────────────────────────
function AddBranchModal({
    onClose, onAdd,
}: { onClose: () => void; onAdd: (name: string, city: string, country: string, manager: string, type: string) => void }) {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [manager, setManager] = useState('');
    const [type, setType] = useState('Sub Branch');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-sm p-5" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Landmark size={15} className="text-blue-600" /> Add Branch
                    </h3>
                    <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><X size={16} /></button>
                </div>
                <div className="space-y-3">
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Branch Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Mirpur Branch"
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">City</label>
                            <input value={city} onChange={e => setCity(e.target.value)} placeholder="Dhaka"
                                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                        </div>
                        <div>
                            <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Country</label>
                            <input value={country} onChange={e => setCountry(e.target.value)} placeholder="Bangladesh"
                                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                        </div>
                    </div>
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Branch Manager</label>
                        <input value={manager} onChange={e => setManager(e.target.value)} placeholder="Manager name"
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                    </div>
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Branch Type</label>
                        <select value={type} onChange={e => setType(e.target.value)}
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 cursor-pointer">
                            {partnerBranchTypeOptions.filter(t => t !== 'All Types').map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-5">
                    <button onClick={onClose} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">Cancel</button>
                    <button
                        disabled={!name || !city || !country}
                        onClick={() => { onAdd(name, city, country, manager, type); onClose(); }}
                        className="flex-1 px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Add Branch
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────
export default function BranchesPage() {
    const [branches, setBranches] = useState(partnerBranches);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [typeFilter, setTypeFilter] = useState('All Types');
    const [showAddBranch, setShowAddBranch] = useState(false);
    const [viewing, setViewing] = useState<PartnerBranch | null>(null);
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

    const toggleStatus = (id: string) => {
        setBranches(prev => prev.map(b => (b.id === id ? { ...b, status: b.status === 'Active' ? 'Inactive' : 'Active' } : b)));
        showToast('Branch status updated');
    };

    const handleAddBranch = (name: string, city: string, country: string, manager: string, type: string) => {
        setBranches(prev => [
            {
                id: `PBR-${Date.now()}`, name, code: `NEW-${Math.floor(Math.random() * 900 + 100)}`,
                country, flag: '🏳️', city, address: '—', manager: manager || '—', managerPhone: '—',
                type: type as PartnerBranchType, agentsCount: 0, monthlyVolume: 0, volumeCurrency: '£',
                status: 'Active', openedDate: 'Just now',
            },
            ...prev,
        ]);
        showToast(`${name} added`);
    };

    const filteredRows = branches.filter(b => {
        if (statusFilter !== 'All Status' && b.status !== statusFilter) return false;
        if (typeFilter !== 'All Types' && b.type !== typeFilter) return false;
        if (!search) return true;
        const q = search.toLowerCase();
        return b.name.toLowerCase().includes(q) || b.city.toLowerCase().includes(q) || b.manager.toLowerCase().includes(q);
    });

    return (
        <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="mb-5">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Branches</h1>
                <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                    <span>Dashboard</span><ChevronRight size={12} />
                    <span>Agents & Partners</span><ChevronRight size={12} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Branches</span>
                </div>
            </div>

            <StatCards />

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                <FilterBar
                    search={search} setSearch={setSearch}
                    statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                    typeFilter={typeFilter} setTypeFilter={setTypeFilter}
                    onAddClick={() => setShowAddBranch(true)}
                />
                <BranchesTable rows={filteredRows} onToggleStatus={toggleStatus} onView={setViewing} />
            </div>

            {showAddBranch && <AddBranchModal onClose={() => setShowAddBranch(false)} onAdd={handleAddBranch} />}
            {viewing && <ViewBranchModal branch={viewing} onClose={() => setViewing(null)} />}

            {toast && (
                <div className="fixed bottom-5 right-5 bg-gray-900 dark:bg-gray-700 text-white text-[12px] px-4 py-2.5 rounded-lg shadow-lg z-50">
                    {toast}
                </div>
            )}
        </div>
    );
}