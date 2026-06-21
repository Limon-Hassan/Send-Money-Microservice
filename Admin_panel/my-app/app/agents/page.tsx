'use client';

import { useState } from 'react';
import {
    ChevronRight, Calendar, ChevronDown, Plus, Search, Filter, Download,
    MoreVertical, Info, CheckCircle2, TrendingUp, DollarSign, FileText, GitBranch,
    UserPlus,
} from 'lucide-react';
import {
    Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement,
    Tooltip as ChartTooltip, Filler, ChartOptions, TooltipItem,
} from 'chart.js';
import { Line as LineChartJS, Doughnut } from 'react-chartjs-2';
import {
    agentPartnerStats,
    partnerAgents,
    topPerformingAgents,
    agentRecentActivities,
    agentVolumeOverview,
    commissionOverview,
    agentStatusOverview,
    PartnerAgentStatus,
    agentBranches,
    agentPartnersList,
    agentCommissionRows,
} from '@/lib/data';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, ChartTooltip, Filler);

// ── helpers ───────────────────────────────────────────────────
const statusClasses: Record<PartnerAgentStatus, string> = {
    Active: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    Pending: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    Inactive: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
};

const fmtCompact = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
    return n.toLocaleString();
};

const activityIcon: Record<string, { Icon: React.ElementType; classes: string }> = {
    approved: { Icon: CheckCircle2, classes: 'bg-emerald-50 text-emerald-500 dark:bg-emerald-950 dark:text-emerald-400' },
    volume: { Icon: TrendingUp, classes: 'bg-blue-50 text-blue-500 dark:bg-blue-950 dark:text-blue-400' },
    commission: { Icon: DollarSign, classes: 'bg-amber-50 text-amber-500 dark:bg-amber-950 dark:text-amber-400' },
    document: { Icon: FileText, classes: 'bg-purple-50 text-purple-500 dark:bg-purple-950 dark:text-purple-400' },
    branch: { Icon: GitBranch, classes: 'bg-teal-50 text-teal-500 dark:bg-teal-950 dark:text-teal-400' },
};

const TABS = ['Agent List', 'Add Agent', 'Branches', 'Partner List', 'Commission'] as const;

// ── Local nav tabs (switches content inline on this same page) ───
function LocalTabs({ active, setActive }: { active: string; setActive: (v: string) => void }) {
    return (
        <div className="flex items-center gap-6 px-4 pt-3 border-b border-gray-100 dark:border-gray-700/60 overflow-x-auto">
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
    );
}

// ── Header Stat Cards ───────────────────────────────────────────
function StatCards() {
    const s = agentPartnerStats;
    const cards = [
        { label: 'Total Agents', value: s.totalAgents.toLocaleString(), note: s.totalAgentsChangeNote, noteColor: 'text-gray-400 dark:text-gray-500', icon: '👥', bg: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400' },
        { label: 'Active Agents', value: s.activeAgents.toLocaleString(), note: `${s.activeAgentsPctOfTotal}% of total`, noteColor: 'text-gray-400 dark:text-gray-500', icon: '⚡', bg: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' },
        { label: 'Total Transactions', value: s.totalTransactions.toLocaleString(), note: `+${s.totalTransactionsChangePct}% from last month`, noteColor: 'text-emerald-500 dark:text-emerald-400', icon: '🔁', bg: 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400' },
        { label: 'Total Volume', value: `£${fmtCompact(s.totalVolume)}`, note: `+${s.totalVolumeChangePct}% from last month`, noteColor: 'text-emerald-500 dark:text-emerald-400', icon: '📦', bg: 'bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400' },
        { label: 'Total Commission', value: `£${s.totalCommission.toLocaleString()}`, note: `+${s.totalCommissionChangePct}% from last month`, noteColor: 'text-emerald-500 dark:text-emerald-400', icon: '📊', bg: 'bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400' },
    ];
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
            {cards.map(c => (
                <div key={c.label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[13px] ${c.bg}`}>{c.icon}</span>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400">{c.label}</p>
                        </div>
                        <Info size={12} className="text-gray-300 dark:text-gray-600" />
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{c.value}</p>
                    <p className={`text-[11px] mt-0.5 ${c.noteColor}`}>{c.note}</p>
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
                    placeholder="Search agents by name, code, email..."
                    className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                All Status <ChevronDown size={13} />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                All Countries <ChevronDown size={13} />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <Filter size={13} /> Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer sm:ml-auto">
                <Download size={13} /> Export
            </button>
        </div>
    );
}

// ── Agent Table ───────────────────────────────────────────────
function AgentTable({ rows }: { rows: typeof partnerAgents }) {
    const [page, setPage] = useState(1);
    const pageSize = 8;
    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[920px]">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="px-4 py-2.5 font-medium">Agent Name</th>
                            <th className="px-2 py-2.5 font-medium">Agent Code</th>
                            <th className="px-2 py-2.5 font-medium">Country</th>
                            <th className="px-2 py-2.5 font-medium">Contact</th>
                            <th className="px-2 py-2.5 font-medium">Status</th>
                            <th className="px-2 py-2.5 font-medium">Total Volume</th>
                            <th className="px-2 py-2.5 font-medium">Transactions</th>
                            <th className="px-2 py-2.5 font-medium">Commission</th>
                            <th className="px-2 py-2.5 font-medium text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageRows.map(a => (
                            <tr key={a.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                                <td className="px-4 py-2.5 whitespace-nowrap">
                                    <div className="flex items-center gap-2.5">
                                        <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] font-semibold flex items-center justify-center">
                                            {a.name.split(' ').slice(0, 2).map(w => w[0]).join('')}
                                        </span>
                                        <p className="text-[13px] font-medium text-gray-800 dark:text-gray-100">{a.name}</p>
                                    </div>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-blue-600 dark:text-blue-400 font-medium whitespace-nowrap">{a.code}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-600 dark:text-gray-300">{a.flag} {a.country}</span>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{a.contact}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusClasses[a.status]}`}>{a.status}</span>
                                </td>
                                <td className="px-2 py-2.5 text-[13px] font-semibold text-gray-900 dark:text-white whitespace-nowrap">£{a.totalVolume.toLocaleString()}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{a.transactions.toLocaleString()}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-700 dark:text-gray-200 whitespace-nowrap">£{a.commission.toLocaleString()}</td>
                                <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                    <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">
                                        <MoreVertical size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
                <span>Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, rows.length)} of {agentPartnerStats.totalAgents} agents</span>
                <div className="flex items-center gap-1">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                        className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">‹</button>
                    <button className="px-2.5 py-1 rounded bg-blue-600 text-white cursor-pointer">{currentPage}</button>
                    <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">{Math.min(currentPage + 1, totalPages)}</button>
                    <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">{Math.min(currentPage + 2, totalPages)}</button>
                    <span className="px-1">...</span>
                    <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">{totalPages}</button>
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                        className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">›</button>
                </div>
            </div>
        </>
    );
}

// ── Add Agent (inline form) ────────────────────────────────────
function AddAgentPanel({ onAdd }: { onAdd: (name: string, email: string, phone: string, country: string) => void }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');

    return (
        <div className="p-5 max-w-lg">
            <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <UserPlus size={15} />
                </span>
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Add New Agent</h3>
            </div>
            <div className="space-y-3">
                <div>
                    <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Agent / Business Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Skyline Transfers"
                        className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                </div>
                <div>
                    <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="agent@example.com"
                        className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Phone</label>
                        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+880 1XXX XXXXXX"
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                    </div>
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Country</label>
                        <input value={country} onChange={e => setCountry(e.target.value)} placeholder="e.g. Bangladesh"
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                    </div>
                </div>
            </div>
            <button
                disabled={!name || !email}
                onClick={() => { onAdd(name, email, phone, country); setName(''); setEmail(''); setPhone(''); setCountry(''); }}
                className="mt-5 flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
                <Plus size={13} /> Add Agent
            </button>
        </div>
    );
}

// ── Branches (inline table) ────────────────────────────────────
function BranchesPanel() {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
                <thead>
                    <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                        <th className="px-4 py-2.5 font-medium">Branch Name</th>
                        <th className="px-2 py-2.5 font-medium">Code</th>
                        <th className="px-2 py-2.5 font-medium">Country</th>
                        <th className="px-2 py-2.5 font-medium">Manager</th>
                        <th className="px-2 py-2.5 font-medium">Agents</th>
                        <th className="px-2 py-2.5 font-medium">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {agentBranches.map(b => (
                        <tr key={b.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                            <td className="px-4 py-2.5 text-[13px] font-medium text-gray-800 dark:text-gray-100 whitespace-nowrap">{b.name}</td>
                            <td className="px-2 py-2.5 text-[12px] text-blue-600 dark:text-blue-400 font-medium whitespace-nowrap">{b.code}</td>
                            <td className="px-2 py-2.5 whitespace-nowrap">
                                <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-600 dark:text-gray-300">{b.flag} {b.country}</span>
                            </td>
                            <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{b.manager}</td>
                            <td className="px-2 py-2.5 text-[12px] font-medium text-gray-900 dark:text-white whitespace-nowrap">{b.agentsCount}</td>
                            <td className="px-2 py-2.5 whitespace-nowrap">
                                <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${b.status === 'Active'
                                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                                        : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                                    }`}>{b.status}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ── Partner List (inline table) ────────────────────────────────
function PartnerListPanel() {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
                <thead>
                    <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                        <th className="px-4 py-2.5 font-medium">Partner Name</th>
                        <th className="px-2 py-2.5 font-medium">Type</th>
                        <th className="px-2 py-2.5 font-medium">Country</th>
                        <th className="px-2 py-2.5 font-medium">Commission Rate</th>
                        <th className="px-2 py-2.5 font-medium">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {agentPartnersList.map(p => (
                        <tr key={p.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                            <td className="px-4 py-2.5 text-[13px] font-medium text-gray-800 dark:text-gray-100 whitespace-nowrap">{p.name}</td>
                            <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{p.type}</td>
                            <td className="px-2 py-2.5 whitespace-nowrap">
                                <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-600 dark:text-gray-300">{p.flag} {p.country}</span>
                            </td>
                            <td className="px-2 py-2.5 text-[12px] font-medium text-gray-900 dark:text-white whitespace-nowrap">{p.commissionRatePct}%</td>
                            <td className="px-2 py-2.5 whitespace-nowrap">
                                <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${p.status === 'Active' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                                        : p.status === 'Pending' ? 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
                                            : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                                    }`}>{p.status}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ── Commission (inline table) ───────────────────────────────────
function CommissionPanel() {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[760px]">
                <thead>
                    <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                        <th className="px-4 py-2.5 font-medium">Agent</th>
                        <th className="px-2 py-2.5 font-medium">Period</th>
                        <th className="px-2 py-2.5 font-medium">Volume</th>
                        <th className="px-2 py-2.5 font-medium">Rate</th>
                        <th className="px-2 py-2.5 font-medium">Commission</th>
                        <th className="px-2 py-2.5 font-medium">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {agentCommissionRows.map(c => (
                        <tr key={c.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                            <td className="px-4 py-2.5 whitespace-nowrap">
                                <p className="text-[13px] font-medium text-gray-800 dark:text-gray-100">{c.agentName}</p>
                                <p className="text-[10px] text-blue-600 dark:text-blue-400">{c.agentCode}</p>
                            </td>
                            <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{c.period}</td>
                            <td className="px-2 py-2.5 text-[12px] text-gray-700 dark:text-gray-200 whitespace-nowrap">£{c.volume.toLocaleString()}</td>
                            <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{c.ratePct}%</td>
                            <td className="px-2 py-2.5 text-[13px] font-semibold text-gray-900 dark:text-white whitespace-nowrap">£{c.commission.toLocaleString()}</td>
                            <td className="px-2 py-2.5 whitespace-nowrap">
                                <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${c.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
                                    }`}>{c.status}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ── Top Performing Agents ───────────────────────────────────────
function TopPerformingAgentsCard() {
    const rankColors = ['bg-orange-500', 'bg-gray-400', 'bg-amber-700', 'bg-blue-600', 'bg-blue-900'];
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Top Performing Agents</h3>
                <button className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 cursor-pointer">
                    This Month <ChevronDown size={11} />
                </button>
            </div>
            <div className="space-y-3">
                {topPerformingAgents.map((a, i) => (
                    <div key={a.code} className="flex items-center gap-2.5">
                        <span className={`w-6 h-6 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0 ${rankColors[i]}`}>
                            {a.rank}
                        </span>
                        <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] font-semibold flex items-center justify-center shrink-0">
                            {a.name.split(' ').slice(0, 2).map(w => w[0]).join('')}
                        </span>
                        <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-medium text-gray-800 dark:text-gray-100 truncate">{a.name}</p>
                            <p className="text-[10px] text-gray-400 dark:text-gray-500">{a.code}</p>
                        </div>
                        <div className="text-right shrink-0">
                            <p className="text-[12px] font-semibold text-gray-900 dark:text-white">£{a.volume.toLocaleString()}</p>
                            <p className="text-[10px] text-emerald-500 dark:text-emerald-400">+{a.changePct}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Recent Activities ────────────────────────────────────────────
function RecentActivitiesCard() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Recent Activities</h3>
                <button className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">View All</button>
            </div>
            <div className="space-y-3">
                {agentRecentActivities.map(a => {
                    const { Icon, classes } = activityIcon[a.type];
                    return (
                        <div key={a.id} className="flex items-start gap-2.5">
                            <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${classes}`}>
                                <Icon size={13} />
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="text-[12px] text-gray-700 dark:text-gray-300 leading-snug">{a.text}</p>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{a.timeAgo}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ── Volume Overview chart ────────────────────────────────────────
function VolumeOverviewChart() {
    const data = {
        labels: agentVolumeOverview.labels,
        datasets: [{
            data: agentVolumeOverview.values,
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37,99,235,0.08)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#2563eb',
            pointRadius: 3,
        }],
    };
    const options: ChartOptions<'line'> = {
        responsive: true, maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#111827', padding: 8, cornerRadius: 6,
                callbacks: { label: (ctx: TooltipItem<'line'>) => `£${Number(ctx.parsed.y).toLocaleString()}` },
            },
        },
        scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#9ca3af' } },
            y: {
                grid: { color: '#f1f5f9' },
                ticks: {
                    font: { size: 10 }, color: '#9ca3af',
                    callback: (value: string | number) => {
                        const v = Number(value);
                        return `£${v >= 1000000 ? (v / 1000000).toFixed(1) + 'M' : (v / 1000).toFixed(0) + 'K'}`;
                    },
                },
            },
        },
    };
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Volume Overview</h3>
                <button className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 cursor-pointer">
                    This Month <ChevronDown size={11} />
                </button>
            </div>
            <div className="h-[200px]">
                <LineChartJS data={data} options={options} />
            </div>
        </div>
    );
}

// ── Commission Overview donut ────────────────────────────────────
function CommissionOverviewChart() {
    const c = commissionOverview;
    const data = {
        labels: ['Paid Commission', 'Pending Commission'],
        datasets: [{ data: [c.paid, c.pending], backgroundColor: ['#16a34a', '#f59e0b'], borderWidth: 0, hoverOffset: 4 }],
    };
    const options: ChartOptions<'doughnut'> = {
        responsive: true, maintainAspectRatio: false, cutout: '72%',
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
    };
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Commission Overview</h3>
                <button className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 cursor-pointer">
                    This Month <ChevronDown size={11} />
                </button>
            </div>
            <div className="relative h-[140px] mb-3">
                <Doughnut data={data} options={options} />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-base font-bold text-gray-900 dark:text-white">£{c.total.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500">Total Commission</p>
                </div>
            </div>
            <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[12px]">
                    <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Paid Commission</span>
                    <span className="text-gray-500 dark:text-gray-400">£{c.paid.toLocaleString()} ({c.paidPct}%)</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                    <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300"><span className="w-2 h-2 rounded-full bg-amber-500" /> Pending Commission</span>
                    <span className="text-gray-500 dark:text-gray-400">£{c.pending.toLocaleString()} ({c.pendingPct}%)</span>
                </div>
            </div>
        </div>
    );
}

// ── Agent Status donut ───────────────────────────────────────────
function AgentStatusChart() {
    const s = agentStatusOverview;
    const data = {
        labels: ['Active', 'Pending', 'Inactive'],
        datasets: [{ data: [s.active, s.pending, s.inactive], backgroundColor: ['#16a34a', '#f59e0b', '#ef4444'], borderWidth: 0, hoverOffset: 4 }],
    };
    const options: ChartOptions<'doughnut'> = {
        responsive: true, maintainAspectRatio: false, cutout: '72%',
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
    };
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 mb-3">Agent Status</h3>
            <div className="relative h-[140px] mb-3">
                <Doughnut data={data} options={options} />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-base font-bold text-gray-900 dark:text-white">{s.total}</p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500">Total Agents</p>
                </div>
            </div>
            <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[12px]">
                    <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Active</span>
                    <span className="text-gray-500 dark:text-gray-400">{s.active} ({s.activePct}%)</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                    <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300"><span className="w-2 h-2 rounded-full bg-amber-500" /> Pending</span>
                    <span className="text-gray-500 dark:text-gray-400">{s.pending} ({s.pendingPct}%)</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                    <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300"><span className="w-2 h-2 rounded-full bg-red-500" /> Inactive</span>
                    <span className="text-gray-500 dark:text-gray-400">{s.inactive} ({s.inactivePct}%)</span>
                </div>
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────
export default function AgentListPage() {
    const [activeTab, setActiveTab] = useState<string>('Agent List');
    const [search, setSearch] = useState('');
    const [agents, setAgents] = useState(partnerAgents);
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

    const handleAddAgent = (name: string, email: string, phone: string, country: string) => {
        setAgents(prev => [
            {
                id: `AGT-${Date.now()}`, code: `AGT-${1000 + prev.length + 1}`, name, country: country || '—',
                flag: '🏳️', contact: phone || email, status: 'Pending', totalVolume: 0, transactions: 0, commission: 0,
            },
            ...prev,
        ]);
        showToast(`${name} added — pending approval`);
        setActiveTab('Agent List');
    };

    const filteredRows = agents.filter(a => {
        if (!search) return true;
        const q = search.toLowerCase();
        return a.name.toLowerCase().includes(q) || a.code.toLowerCase().includes(q) || a.contact.includes(q);
    });

    return (
        <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Agents & Partners</h1>
                    <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                        <span>Dashboard</span><ChevronRight size={12} />
                        <span>Agents & Partners</span><ChevronRight size={12} />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{activeTab}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer whitespace-nowrap">
                        <Calendar size={13} /> {agentPartnerStats.dateRangeLabel} <ChevronDown size={13} />
                    </button>
                    <button
                        onClick={() => setActiveTab('Add Agent')}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 cursor-pointer whitespace-nowrap"
                    >
                        <Plus size={13} /> Add New Agent
                    </button>
                </div>
            </div>

            <StatCards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                        <LocalTabs active={activeTab} setActive={setActiveTab} />

                        {activeTab === 'Agent List' && (
                            <>
                                <FilterBar search={search} setSearch={setSearch} />
                                <AgentTable rows={filteredRows} />
                            </>
                        )}
                        {activeTab === 'Add Agent' && <AddAgentPanel onAdd={handleAddAgent} />}
                        {activeTab === 'Branches' && <BranchesPanel />}
                        {activeTab === 'Partner List' && <PartnerListPanel />}
                        {activeTab === 'Commission' && <CommissionPanel />}
                    </div>
                </div>
                <div className="lg:col-span-1 space-y-4">
                    <TopPerformingAgentsCard />
                    <RecentActivitiesCard />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <VolumeOverviewChart />
                <CommissionOverviewChart />
                <AgentStatusChart />
            </div>

            {toast && (
                <div className="fixed bottom-5 right-5 bg-gray-900 dark:bg-gray-700 text-white text-[12px] px-4 py-2.5 rounded-lg shadow-lg z-50">
                    {toast}
                </div>
            )}
        </div>
    );
}