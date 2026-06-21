'use client';

import { useState } from 'react';
import {
    Calendar, ChevronDown, Plus, Search, Download, Users, Filter,
    Eye, Pencil, Trash2, FileText, Clock3, CheckCircle2, XCircle,
} from 'lucide-react';
import {
    Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale,
    PointElement, LineElement, Tooltip as ChartTooltip, Filler,
} from 'chart.js';
import { Line as LineChartJS, Doughnut, Bar } from 'react-chartjs-2';
import {
    cashPickupDashboardStats,
    cashPickupSparklines,
    requestSummaryDonut,
    requestSummaryTotal,
    todaysActivity,
    topAgentsThisWeek,
    requestsOverviewWeekly,
    requestsByCountry,
    requestsByCountryTotal,
    requestsByStatus,
    recentPickupRequests,
    CashPickupStatus,
} from '@/lib/data';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement, ChartTooltip, Filler);

// ── helpers ───────────────────────────────────────────────────
const statusClasses: Record<CashPickupStatus, string> = {
    Pending: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    Approved: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    Completed: 'bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400',
    Cancelled: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
};

const currencySymbol: Record<string, string> = { BDT: '৳', PHP: '₱', INR: '₹', AED: 'AED ' };
const sym = (c: string) => currencySymbol[c] ?? '';

const activityIcon: Record<string, { Icon: React.ElementType; classes: string }> = {
    created: { Icon: FileText, classes: 'bg-blue-50 text-blue-500 dark:bg-blue-950 dark:text-blue-400' },
    approved: { Icon: CheckCircle2, classes: 'bg-emerald-50 text-emerald-500 dark:bg-emerald-950 dark:text-emerald-400' },
    completed: { Icon: CheckCircle2, classes: 'bg-violet-50 text-violet-500 dark:bg-violet-950 dark:text-violet-400' },
    cancelled: { Icon: XCircle, classes: 'bg-red-50 text-red-500 dark:bg-red-950 dark:text-red-400' },
};

const sparklineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    elements: { point: { radius: 2, hoverRadius: 3 } },
    scales: { x: { display: false }, y: { display: false } },
};

function sparklineData(values: number[], color: string) {
    return {
        labels: values.map((_, i) => i),
        datasets: [{
            data: values,
            borderColor: color,
            backgroundColor: `${color}1a`,
            pointBackgroundColor: color,
            pointBorderColor: color,
            fill: true,
            tension: 0.4,
            borderWidth: 2,
        }],
    };
}

// ── Stat card with sparkline ────────────────────────────────
function StatCard({
    label, value, changePct, Icon, iconClasses, sparkColor, sparkValues,
}: {
    label: string; value: number; changePct: number; Icon: React.ElementType;
    iconClasses: string; sparkColor: string; sparkValues: number[];
}) {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center ${iconClasses}`}>
                    <Icon size={14} />
                </span>
                <p className="text-[12px] text-gray-500 dark:text-gray-400">{label}</p>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white mb-1">{value.toLocaleString()}</p>
            <p className="text-[11px] text-emerald-500 dark:text-emerald-400 mb-2">+{changePct}% from last week</p>
            <div className="h-[36px]">
                <LineChartJS data={sparklineData(sparkValues, sparkColor)} options={sparklineOptions} />
            </div>
        </div>
    );
}

function StatCardsRow() {
    const s = cashPickupDashboardStats;
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
            <StatCard label="Total Requests" value={s.totalRequests} changePct={s.totalChangePct}
                Icon={FileText} iconClasses="bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                sparkColor="#3b82f6" sparkValues={cashPickupSparklines.total} />
            <StatCard label="Pending Requests" value={s.pendingRequests} changePct={s.pendingChangePct}
                Icon={Clock3} iconClasses="bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
                sparkColor="#f59e0b" sparkValues={cashPickupSparklines.pending} />
            <StatCard label="Approved Requests" value={s.approvedRequests} changePct={s.approvedChangePct}
                Icon={CheckCircle2} iconClasses="bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                sparkColor="#16a34a" sparkValues={cashPickupSparklines.approved} />
            <StatCard label="Completed Requests" value={s.completedRequests} changePct={s.completedChangePct}
                Icon={CheckCircle2} iconClasses="bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400"
                sparkColor="#7c3aed" sparkValues={cashPickupSparklines.completed} />
            <StatCard label="Cancelled Requests" value={s.cancelledRequests} changePct={s.cancelledChangePct}
                Icon={XCircle} iconClasses="bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
                sparkColor="#ef4444" sparkValues={cashPickupSparklines.cancelled} />
        </div>
    );
}

// ── Quick Actions ─────────────────────────────────────────────
function QuickActions() {
    const actions = [
        { label: 'Add New Pickup Request', sub: 'Create a new pickup request', Icon: Plus, color: 'text-blue-600 dark:text-blue-400' },
        { label: 'Search Request', sub: 'Find existing requests', Icon: Search, color: 'text-gray-600 dark:text-gray-300' },
        { label: 'Export Report', sub: 'Export to Excel / PDF', Icon: Download, color: 'text-gray-600 dark:text-gray-300' },
        { label: 'Manage Agents', sub: 'View and manage agents', Icon: Users, color: 'text-gray-600 dark:text-gray-300' },
    ];
    return (
        <div className="mb-5">
            <h2 className="text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {actions.map(a => (
                    <button key={a.label} className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                        <span className={`w-9 h-9 rounded-lg bg-gray-50 dark:bg-gray-700 flex items-center justify-center ${a.color}`}>
                            <a.Icon size={16} />
                        </span>
                        <div>
                            <p className="text-[12px] font-medium text-gray-800 dark:text-gray-100">{a.label}</p>
                            <p className="text-[11px] text-gray-400 dark:text-gray-500">{a.sub}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

// ── Recent Requests Table ──────────────────────────────────────
function RecentRequestsTable() {
    const [search, setSearch] = useState('');
    const rows = recentPickupRequests.filter(r => {
        if (!search) return true;
        const q = search.toLowerCase();
        return r.id.toLowerCase().includes(q) || r.senderName.toLowerCase().includes(q) || r.mobile.includes(q);
    });

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl mb-5">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
                <h2 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Recent Pickup Requests</h2>
            </div>

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
                    All Countries <ChevronDown size={13} />
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    All Status <ChevronDown size={13} />
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    All Agents <ChevronDown size={13} />
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <Filter size={13} /> Filters
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <Download size={13} /> Export
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[920px]">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="px-4 py-2.5 font-medium">Transaction Number</th>
                            <th className="px-2 py-2.5 font-medium">Sender Name</th>
                            <th className="px-2 py-2.5 font-medium">Recipient Name</th>
                            <th className="px-2 py-2.5 font-medium">Country</th>
                            <th className="px-2 py-2.5 font-medium">City</th>
                            <th className="px-2 py-2.5 font-medium">Mobile</th>
                            <th className="px-2 py-2.5 font-medium">Amount</th>
                            <th className="px-2 py-2.5 font-medium">Pickup Date</th>
                            <th className="px-2 py-2.5 font-medium">Agent Name</th>
                            <th className="px-2 py-2.5 font-medium">Status</th>
                            <th className="px-2 py-2.5 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(r => (
                            <tr key={r.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                                <td className="px-4 py-2.5 text-[12px] text-blue-600 dark:text-blue-400 font-medium whitespace-nowrap">{r.id}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-700 dark:text-gray-300 whitespace-nowrap">{r.senderName}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-700 dark:text-gray-300 whitespace-nowrap">{r.recipientName}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-600 dark:text-gray-300">{r.countryFlag} {r.country}</span>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{r.city}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{r.mobile}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <p className="text-[13px] font-semibold text-gray-900 dark:text-white">{sym(r.currency)}{r.amount.toLocaleString()}</p>
                                    <p className="text-[10px] text-gray-400 dark:text-gray-500">{r.currency}</p>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{r.pickupDate}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.agentName}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusClasses[r.status]}`}>{r.status}</span>
                                </td>
                                <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"><Eye size={13} /></button>
                                        <button className="text-gray-400 dark:text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"><Pencil size={13} /></button>
                                        <button className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 cursor-pointer"><Trash2 size={13} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
                <span>Showing 1 to {rows.length} of {cashPickupDashboardStats.totalRequests.toLocaleString()} requests</span>
                <div className="flex items-center gap-1">
                    <button className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">‹</button>
                    <button className="px-2.5 py-1 rounded bg-blue-600 text-white cursor-pointer">1</button>
                    <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">2</button>
                    <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">3</button>
                    <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">4</button>
                    <span className="px-1">...</span>
                    <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">156</button>
                    <button className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">›</button>
                </div>
                <select className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded px-2 py-1 text-[12px] text-gray-600 dark:text-gray-300">
                    <option>10 / page</option>
                    <option>20 / page</option>
                    <option>50 / page</option>
                </select>
            </div>
        </div>
    );
}

// ── Right sidebar: Request Summary donut ───────────────────────
function RequestSummaryCard() {
    const data = {
        labels: requestSummaryDonut.map(d => d.label),
        datasets: [{
            data: requestSummaryDonut.map(d => d.value),
            backgroundColor: requestSummaryDonut.map(d => d.color),
            borderWidth: 0,
            hoverOffset: 4,
        }],
    };
    const options = {
        responsive: true, maintainAspectRatio: false, cutout: '70%',
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
    };
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 mb-3">Request Summary</h3>
            <div className="relative h-[150px] mb-3">
                <Doughnut data={data} options={options} />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{requestSummaryTotal.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500">Total</p>
                </div>
            </div>
            <div className="space-y-1.5">
                {requestSummaryDonut.map(d => (
                    <div key={d.label} className="flex items-center justify-between text-[12px]">
                        <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} /> {d.label}
                        </span>
                        <span className="text-gray-400 dark:text-gray-500">{d.pct}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Today's Activity ────────────────────────────────────────────
function TodaysActivityCard() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 mb-3">Today's Activity</h3>
            <div className="space-y-3 mb-3">
                {todaysActivity.map(a => {
                    const { Icon, classes } = activityIcon[a.type];
                    return (
                        <div key={a.id} className="flex items-start gap-2.5">
                            <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${classes}`}>
                                <Icon size={13} />
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="text-[12px] font-medium text-gray-800 dark:text-gray-100">{a.title}</p>
                                <p className="text-[11px] text-gray-400 dark:text-gray-500">{a.subtitle}</p>
                            </div>
                            <span className="text-[10px] text-gray-400 dark:text-gray-500 whitespace-nowrap">{a.timeAgo}</span>
                        </div>
                    );
                })}
            </div>
            <button className="w-full text-center text-[12px] font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                View All Activity
            </button>
        </div>
    );
}

// ── Top Agents (This Week) ──────────────────────────────────────
function TopAgentsCard() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 mb-3">Top Agents (This Week)</h3>
            <div className="space-y-3">
                {topAgentsThisWeek.map(a => (
                    <div key={a.name} className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] font-semibold flex items-center justify-center shrink-0">
                            {a.initials}
                        </span>
                        <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-medium text-gray-800 dark:text-gray-100">{a.name}</p>
                            <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-1">{a.requests} Requests</p>
                            <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${a.barPct}%` }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Bottom: Requests Overview line chart ────────────────────────
function RequestsOverviewChart() {
    const data = {
        labels: requestsOverviewWeekly.labels,
        datasets: [{
            data: requestsOverviewWeekly.values,
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37,99,235,0.08)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#2563eb',
            pointRadius: 3,
        }],
    };
    const options = {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { backgroundColor: '#111827', padding: 8, cornerRadius: 6 } },
        scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#9ca3af' } },
            y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 }, color: '#9ca3af' } },
        },
    };
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Requests Overview</h3>
                <button className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 cursor-pointer">
                    This Week <ChevronDown size={11} />
                </button>
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">{requestsOverviewWeekly.values.at(-1)}</p>
            <p className="text-[11px] text-emerald-500 dark:text-emerald-400 mb-2">+{requestsOverviewWeekly.changePct}% from last week</p>
            <div className="h-[160px]">
                <LineChartJS data={data} options={options} />
            </div>
        </div>
    );
}

// ── Bottom: Requests by Country donut ───────────────────────────
function RequestsByCountryChart() {
    const data = {
        labels: requestsByCountry.map(c => c.country),
        datasets: [{
            data: requestsByCountry.map(c => c.value),
            backgroundColor: requestsByCountry.map(c => c.color),
            borderWidth: 0,
            hoverOffset: 4,
        }],
    };
    const options = {
        responsive: true, maintainAspectRatio: false, cutout: '65%',
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
    };
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Requests by Country</h3>
                <button className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 cursor-pointer">
                    This Week <ChevronDown size={11} />
                </button>
            </div>
            <div className="relative h-[130px] mb-3">
                <Doughnut data={data} options={options} />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-base font-bold text-gray-900 dark:text-white">{requestsByCountryTotal.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500">Total</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-y-1 gap-x-2">
                {requestsByCountry.map(c => (
                    <div key={c.country} className="flex items-center justify-between text-[11px]">
                        <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 truncate">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} /> {c.country}
                        </span>
                        <span className="text-gray-400 dark:text-gray-500 shrink-0">{c.pct}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Bottom: Requests by Status bar chart ────────────────────────
function RequestsByStatusChart() {
    const data = {
        labels: requestsByStatus.labels,
        datasets: [{
            data: requestsByStatus.values,
            backgroundColor: requestsByStatus.colors,
            borderRadius: 6,
            borderSkipped: false,
            barPercentage: 0.55,
        }],
    };
    const options = {
        responsive: true, maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { backgroundColor: '#111827', padding: 8, cornerRadius: 6 },
        },
        scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#9ca3af' } },
            y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 }, color: '#9ca3af' }, beginAtZero: true },
        },
    };
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Requests by Status</h3>
                <button className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 cursor-pointer">
                    This Week <ChevronDown size={11} />
                </button>
            </div>
            <div className="h-[220px]">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────
export default function CashPickupDashboardPage() {
    return (
        <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Cash Pickup</h1>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-0.5">
                        Welcome back, Admin Rahman! Here's what's happening with cash pickup requests.
                    </p>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer whitespace-nowrap">
                    <Calendar size={13} /> {cashPickupDashboardStats.dateRangeLabel} <ChevronDown size={13} />
                </button>
            </div>

            <StatCardsRow />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <QuickActions />
                    <RecentRequestsTable />
                </div>
                <div className="lg:col-span-1 space-y-4">
                    <RequestSummaryCard />
                    <TodaysActivityCard />
                    <TopAgentsCard />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-1">
                <RequestsOverviewChart />
                <RequestsByCountryChart />
                <RequestsByStatusChart />
            </div>
        </div>
    );
}