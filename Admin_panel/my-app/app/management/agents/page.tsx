'use client';

import { useState } from 'react';
import {
    ChevronRight, Search, Plus, Pencil, MoreVertical, X, UserPlus, Landmark, Power,
} from 'lucide-react';
import {
    managedAgents,
    managedBranches,
    agentsBranchesStats,
    agentStatusOptions,
    branchStatusOptionsManagement,
    branchTypeOptions,
    ManagedAgent,
    ManagedBranch,
    ManagedAgentStatus,
    ManagedBranchStatus,
} from '@/lib/data';

// ── helpers ───────────────────────────────────────────────────
const agentStatusClasses: Record<ManagedAgentStatus, string> = {
    Active: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    Inactive: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
    Suspended: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
};

const branchStatusClasses: Record<ManagedBranchStatus, string> = {
    Active: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    Inactive: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    Maintenance: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    Closed: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
};

const TABS = ['Agents', 'Branches'] as const;

// ── Stat cards ────────────────────────────────────────────────
function StatCards() {
    const s = agentsBranchesStats;
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {[
                { label: 'Total Agents', value: s.totalAgents },
                { label: 'Active Agents', value: s.activeAgents },
                { label: 'Total Branches', value: s.totalBranches },
                { label: 'Active Branches', value: s.activeBranches },
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

// ── Filter bar (functional status select) ──────────────────────
function FilterBar({
    search, setSearch, placeholder, statusFilter, setStatusFilter, statusOptions, onAddClick, addLabel,
}: {
    search: string; setSearch: (v: string) => void; placeholder: string;
    statusFilter: string; setStatusFilter: (v: string) => void; statusOptions: string[];
    onAddClick: () => void; addLabel: string;
}) {
    return (
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
            <div className="flex items-center gap-2 flex-1 min-w-40 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
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

// ── Pagination footer (reusable) ────────────────────────────────
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
    );
}

// ── Agents Table ──────────────────────────────────────────────
function AgentsTable({ rows, onToggleStatus }: { rows: ManagedAgent[]; onToggleStatus: (id: string) => void }) {
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-230">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="px-4 py-2.5 font-medium">Agent</th>
                            <th className="px-2 py-2.5 font-medium">Branch</th>
                            <th className="px-2 py-2.5 font-medium">Country</th>
                            <th className="px-2 py-2.5 font-medium">Commission</th>
                            <th className="px-2 py-2.5 font-medium">Transactions</th>
                            <th className="px-2 py-2.5 font-medium">Volume</th>
                            <th className="px-2 py-2.5 font-medium">Status</th>
                            <th className="px-2 py-2.5 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageRows.map(a => (
                            <tr key={a.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                                <td className="px-4 py-2.5 whitespace-nowrap">
                                    <p className="text-[13px] font-medium text-gray-800 dark:text-gray-100">{a.name}</p>
                                    <p className="text-[10px] text-gray-400 dark:text-gray-500">{a.email}</p>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{a.branch}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-600 dark:text-gray-300">{a.flag} {a.country}</span>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{a.commissionRatePct}%</td>
                                <td className="px-2 py-2.5 text-[12px] font-medium text-gray-900 dark:text-white whitespace-nowrap">{a.totalTransactions.toLocaleString()}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-700 dark:text-gray-200 whitespace-nowrap">{a.volumeCurrency}{a.volume.toLocaleString()}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${agentStatusClasses[a.status]}`}>{a.status}</span>
                                </td>
                                <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"><Pencil size={13} /></button>
                                        <button
                                            onClick={() => onToggleStatus(a.id)}
                                            className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                                            title={a.status === 'Active' ? 'Suspend' : 'Activate'}
                                        >
                                            <Power size={13} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 && (
                            <tr><td colSpan={8} className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">No agents match your search.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
            <PaginationFooter totalRows={rows.length} label="agents" page={page} setPage={setPage} pageSize={pageSize} />
        </>
    );
}

// ── Branches Table ────────────────────────────────────────────
function BranchesTable({ rows, onToggleStatus }: { rows: ManagedBranch[]; onToggleStatus: (id: string) => void }) {
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-230">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="px-4 py-2.5 font-medium">Branch</th>
                            <th className="px-2 py-2.5 font-medium">Code</th>
                            <th className="px-2 py-2.5 font-medium">Country / City</th>
                            <th className="px-2 py-2.5 font-medium">Manager</th>
                            <th className="px-2 py-2.5 font-medium">Type</th>
                            <th className="px-2 py-2.5 font-medium">Agents</th>
                            <th className="px-2 py-2.5 font-medium">Status</th>
                            <th className="px-2 py-2.5 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageRows.map(b => (
                            <tr key={b.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                                <td className="px-4 py-2.5 text-[13px] font-medium text-gray-800 dark:text-gray-100 whitespace-nowrap">{b.name}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap font-mono">{b.code}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-600 dark:text-gray-300">{b.flag} {b.city}, {b.country}</span>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{b.manager}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{b.type}</td>
                                <td className="px-2 py-2.5 text-[12px] font-medium text-gray-900 dark:text-white whitespace-nowrap">{b.agentsCount}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${branchStatusClasses[b.status]}`}>{b.status}</span>
                                </td>
                                <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"><Pencil size={13} /></button>
                                        <button
                                            onClick={() => onToggleStatus(b.id)}
                                            className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                                            title={b.status === 'Active' ? 'Deactivate' : 'Activate'}
                                        >
                                            <Power size={13} />
                                        </button>
                                        <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><MoreVertical size={14} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 && (
                            <tr><td colSpan={8} className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">No branches match your search.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
            <PaginationFooter totalRows={rows.length} label="branches" page={page} setPage={setPage} pageSize={pageSize} />
        </>
    );
}

// ── Add Agent Modal ────────────────────────────────────────────
function AddAgentModal({
    branches, onClose, onAdd,
}: { branches: ManagedBranch[]; onClose: () => void; onAdd: (name: string, email: string, phone: string, branch: string, commission: number) => void }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [branch, setBranch] = useState('');
    const [commission, setCommission] = useState('1.0');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-sm p-5" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <UserPlus size={16} className="text-blue-600" /> Add Agent
                    </h3>
                    <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><X size={16} /></button>
                </div>
                <div className="space-y-3">
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Agent / Business Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. ABC Exchange"
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                    </div>
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="agent@example.com"
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                    </div>
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Phone</label>
                        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+880 1XXX XXXXXX"
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                    </div>
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Assign Branch</label>
                        <select value={branch} onChange={e => setBranch(e.target.value)}
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 cursor-pointer">
                            <option value="">Select branch</option>
                            {branches.map(b => <option key={b.id} value={b.name}>{b.flag} {b.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Commission Rate (%)</label>
                        <input type="number" step="0.1" value={commission} onChange={e => setCommission(e.target.value)}
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-5">
                    <button onClick={onClose} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">Cancel</button>
                    <button
                        disabled={!name || !email || !branch}
                        onClick={() => { onAdd(name, email, phone, branch, parseFloat(commission) || 1.0); onClose(); }}
                        className="flex-1 px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Add Agent
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Add Branch Modal ───────────────────────────────────────────
function AddBranchModal({ onClose, onAdd }: { onClose: () => void; onAdd: (name: string, city: string, country: string, manager: string, type: string) => void }) {
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
                            {branchTypeOptions.map(t => <option key={t} value={t}>{t}</option>)}
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
export default function AgentsBranchesPage() {
    const [activeTab, setActiveTab] = useState<string>('Agents');
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [agents, setAgents] = useState(managedAgents);
    const [branches, setBranches] = useState(managedBranches);
    const [showAddAgent, setShowAddAgent] = useState(false);
    const [showAddBranch, setShowAddBranch] = useState(false);
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setStatusFilter('All Status');
        setSearch('');
    };

    const toggleAgentStatus = (id: string) => {
        setAgents(prev => prev.map(a => (a.id === id ? { ...a, status: a.status === 'Active' ? 'Suspended' : 'Active' } : a)));
        showToast('Agent status updated');
    };

    const toggleBranchStatus = (id: string) => {
        setBranches(prev => prev.map(b => (b.id === id ? { ...b, status: b.status === 'Active' ? 'Inactive' : 'Active' } : b)));
        showToast('Branch status updated');
    };

    const handleAddAgent = (name: string, email: string, phone: string, branch: string, commission: number) => {
        const branchInfo = branches.find(b => b.name === branch);
        setAgents(prev => [
            {
                id: `AGT-${Date.now()}`, name, email, phone, branch,
                country: branchInfo?.country ?? '—', flag: branchInfo?.flag ?? '🏳️',
                status: 'Active', commissionRatePct: commission, totalTransactions: 0, volume: 0, volumeCurrency: '£', joinedDate: 'Just now',
            },
            ...prev,
        ]);
        showToast(`${name} added as agent`);
    };

    const handleAddBranch = (name: string, city: string, country: string, manager: string, type: string) => {
        setBranches(prev => [
            {
                id: `BRN-${Date.now()}`, name, code: `NEW-${Math.floor(Math.random() * 900 + 100)}`,
                country, flag: '🏳️', city, manager: manager || '—', type: type as ManagedBranch['type'],
                agentsCount: 0, status: 'Active', openedDate: 'Just now',
            },
            ...prev,
        ]);
        showToast(`${name} added`);
    };

    const filteredAgents = agents.filter(a => {
        if (statusFilter !== 'All Status' && a.status !== statusFilter) return false;
        if (!search) return true;
        const q = search.toLowerCase();
        return a.name.toLowerCase().includes(q) || a.branch.toLowerCase().includes(q) || a.email.toLowerCase().includes(q);
    });

    const filteredBranches = branches.filter(b => {
        if (statusFilter !== 'All Status' && b.status !== statusFilter) return false;
        if (!search) return true;
        const q = search.toLowerCase();
        return b.name.toLowerCase().includes(q) || b.city.toLowerCase().includes(q) || b.manager.toLowerCase().includes(q);
    });

    return (
        <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="mb-5">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Agents & Branches</h1>
                <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                    <span>Dashboard</span><ChevronRight size={12} />
                    <span>Management</span><ChevronRight size={12} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Agents & Branches</span>
                </div>
            </div>

            <StatCards />

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                <PageTabs active={activeTab} setActive={handleTabChange} />
                {activeTab === 'Agents' ? (
                    <>
                        <FilterBar
                            search={search} setSearch={setSearch} placeholder="Search agents, branch, or email..."
                            statusFilter={statusFilter} setStatusFilter={setStatusFilter} statusOptions={agentStatusOptions}
                            onAddClick={() => setShowAddAgent(true)} addLabel="Add Agent"
                        />
                        <AgentsTable rows={filteredAgents} onToggleStatus={toggleAgentStatus} />
                    </>
                ) : (
                    <>
                        <FilterBar
                            search={search} setSearch={setSearch} placeholder="Search branches, city, or manager..."
                            statusFilter={statusFilter} setStatusFilter={setStatusFilter} statusOptions={branchStatusOptionsManagement}
                            onAddClick={() => setShowAddBranch(true)} addLabel="Add Branch"
                        />
                        <BranchesTable rows={filteredBranches} onToggleStatus={toggleBranchStatus} />
                    </>
                )}
            </div>

            {showAddAgent && <AddAgentModal branches={branches} onClose={() => setShowAddAgent(false)} onAdd={handleAddAgent} />}
            {showAddBranch && <AddBranchModal onClose={() => setShowAddBranch(false)} onAdd={handleAddBranch} />}

            {toast && (
                <div className="fixed bottom-5 right-5 bg-gray-900 dark:bg-gray-700 text-white text-[12px] px-4 py-2.5 rounded-lg shadow-lg z-50">
                    {toast}
                </div>
            )}
        </div>
    );
}