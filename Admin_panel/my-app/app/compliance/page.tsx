'use client';

import { useState } from 'react';
import {
    Calendar, ChevronDown, Eye, MoreVertical, ArrowUpRight,
    ShieldAlert, AlertTriangle, UserX, SearchCheck, FolderOpen, FileText, CalendarClock,
} from 'lucide-react';
import {
    Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement,
    Tooltip as ChartTooltip, Filler, ChartOptions,
} from 'chart.js';
import { Line as LineChartJS, Doughnut } from 'react-chartjs-2';
import {
    complianceDateRangeLabel,
    complianceOverviewStats,
    complianceSparklines,
    alertDistributionDonut,
    alertDistributionTotal,
    riskLevelDistributionDonut,
    riskLevelDistributionTotal,
    caseStatusOverviewDonut,
    caseStatusOverviewTotal,
    investigationStatusDonut,
    investigationStatusTotal,
    recentAmlAlerts,
    recentFraudCases,
    recentAuditLogs,
    sanctionsScreening,
    pepScreening,
    riskAssessmentSummary,
    COMPLIANCE_TABS,
    AmlAlertRow,
    AlertRiskLevel,
    AlertStatus,
    FraudCaseStatus,
} from '@/lib/data';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, ChartTooltip, Filler);

// ── helpers ───────────────────────────────────────────────────
const riskLevelClasses: Record<AlertRiskLevel, string> = {
    Low: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    Medium: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    High: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
    Critical: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
};

const alertStatusClasses: Record<AlertStatus, string> = {
    New: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    'Under Review': 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    Escalated: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
    Cleared: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
};

const fraudStatusClasses: Record<FraudCaseStatus, string> = {
    Investigating: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    Open: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    Resolved: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
};

const currencySymbol: Record<string, string> = { BDT: '৳', PHP: '₱', GBP: '£', USD: '$', INR: '₹' };
const sym = (c: string) => currencySymbol[c] ?? '';

const sparklineOptions: ChartOptions<'line'> = {
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
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointBackgroundColor: color,
        }],
    };
}

const donutOptions: ChartOptions<'doughnut'> = {
    responsive: true, maintainAspectRatio: false, cutout: '68%',
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
};

// ── 7 Stat Cards Row ─────────────────────────────────────────
function StatCardsRow() {
    const s = complianceOverviewStats;
    const sp = complianceSparklines;
    const cards = [
        { label: 'AML Alerts', value: s.amlAlerts, changePct: s.amlAlertsChangePct, Icon: ShieldAlert, color: '#2563eb', iconBg: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400', spark: sp.amlAlerts },
        { label: 'Fraud Alerts', value: s.fraudAlerts, changePct: s.fraudAlertsChangePct, Icon: AlertTriangle, color: '#f59e0b', iconBg: 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400', spark: sp.fraudAlerts },
        { label: 'High-Risk Customers', value: s.highRiskCustomers, changePct: s.highRiskCustomersChangePct, Icon: UserX, color: '#7c3aed', iconBg: 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400', spark: sp.highRiskCustomers },
        { label: 'Open Investigations', value: s.openInvestigations, changePct: s.openInvestigationsChangePct, Icon: SearchCheck, color: '#16a34a', iconBg: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400', spark: sp.openInvestigations },
        { label: 'Compliance Cases', value: s.complianceCases, changePct: s.complianceCasesChangePct, Icon: FolderOpen, color: '#ef4444', iconBg: 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400', spark: sp.complianceCases },
        { label: 'Audit Events Today', value: s.auditEventsToday, changePct: s.auditEventsTodayChangePct, Icon: FileText, color: '#0d9488', iconBg: 'bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400', spark: sp.auditEventsToday },
        { label: 'Risk Reviews Due', value: s.riskReviewsDue, changePct: s.riskReviewsDueChangePct, Icon: CalendarClock, color: '#ea580c', iconBg: 'bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400', spark: sp.riskReviewsDue },
    ];
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 mb-5">
            {cards.map(c => {
                const isUp = c.changePct >= 0;
                return (
                    <div key={c.label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5">
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${c.iconBg}`}>
                                <c.Icon size={14} />
                            </span>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">{c.label}</p>
                        </div>
                        <p className="text-xl font-bold text-gray-900 dark:text-white mb-1">{c.value.toLocaleString()}</p>
                        <p className={`text-[11px] mb-2 flex items-center gap-0.5 ${isUp ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                            <ArrowUpRight size={10} className={isUp ? '' : 'rotate-90'} />
                            {isUp ? '+' : ''}{c.changePct}% vs last 7 days
                        </p>
                        <div className="h-[32px]">
                            <LineChartJS data={sparklineData(c.spark, c.color)} options={sparklineOptions} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// ── Reusable Donut Card ──────────────────────────────────────
function DonutCard({
    title, data, total,
}: { title: string; data: { label: string; value: number; pct: number; color: string }[]; total: number }) {
    const chartData = {
        labels: data.map(d => d.label),
        datasets: [{ data: data.map(d => d.value), backgroundColor: data.map(d => d.color), borderWidth: 0, hoverOffset: 4 }],
    };
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
                <button className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 cursor-pointer">
                    This Week <ChevronDown size={11} />
                </button>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative w-[110px] h-[110px] shrink-0">
                    <Doughnut data={chartData} options={donutOptions} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <p className="text-[15px] font-bold text-gray-900 dark:text-white">{total.toLocaleString()}</p>
                        <p className="text-[9px] text-gray-400 dark:text-gray-500">Total</p>
                    </div>
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                    {data.map(d => (
                        <div key={d.label} className="flex items-center justify-between text-[11px] gap-2">
                            <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 truncate">
                                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} /> {d.label}
                            </span>
                            <span className="text-gray-400 dark:text-gray-500 shrink-0 whitespace-nowrap">{d.value} ({d.pct}%)</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ── Tabbed Recent Activity Table ─────────────────────────────
function TabbedTable() {
    const [activeTab, setActiveTab] = useState<string>(COMPLIANCE_TABS[0]);

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center justify-between px-4 pt-3 border-b border-gray-100 dark:border-gray-700/60">
                <div className="flex items-center gap-5 overflow-x-auto">
                    {COMPLIANCE_TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2.5 text-[12.5px] font-medium border-b-2 -mb-px transition-colors cursor-pointer whitespace-nowrap ${activeTab === tab
                                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                                    : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab === 'Recent AML Alerts' ? (
                <AmlAlertsTable rows={recentAmlAlerts} />
            ) : (
                <div className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">
                    {activeTab} — no data configured in this preview.
                </div>
            )}

            <div className="px-4 py-3">
                <button className="text-[12px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center gap-1">
                    View All AML Alerts <ArrowUpRight size={11} className="rotate-45" />
                </button>
            </div>
        </div>
    );
}

function AmlAlertsTable({ rows }: { rows: AmlAlertRow[] }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1000px]">
                <thead>
                    <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                        <th className="px-4 py-2.5 font-medium">Alert ID</th>
                        <th className="px-2 py-2.5 font-medium">Transaction No.</th>
                        <th className="px-2 py-2.5 font-medium">Customer Name</th>
                        <th className="px-2 py-2.5 font-medium">Country</th>
                        <th className="px-2 py-2.5 font-medium">Amount</th>
                        <th className="px-2 py-2.5 font-medium">Risk Score</th>
                        <th className="px-2 py-2.5 font-medium">Alert Type</th>
                        <th className="px-2 py-2.5 font-medium">Status</th>
                        <th className="px-2 py-2.5 font-medium">Assigned Officer</th>
                        <th className="px-2 py-2.5 font-medium">Review Date</th>
                        <th className="px-2 py-2.5 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(r => (
                        <tr key={r.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                            <td className="px-4 py-2.5 text-[12px] text-blue-600 dark:text-blue-400 font-medium whitespace-nowrap">{r.id}</td>
                            <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.transactionNo}</td>
                            <td className="px-2 py-2.5 text-[12px] text-gray-700 dark:text-gray-300 whitespace-nowrap">{r.customerName}</td>
                            <td className="px-2 py-2.5 whitespace-nowrap">
                                <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-600 dark:text-gray-300">{r.flag} {r.country}</span>
                            </td>
                            <td className="px-2 py-2.5 whitespace-nowrap">
                                <p className="text-[13px] font-semibold text-gray-900 dark:text-white">{sym(r.currency)}{r.amount.toLocaleString()}</p>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500">{r.currency}</p>
                            </td>
                            <td className="px-2 py-2.5 whitespace-nowrap">
                                <span className="text-[12px] font-semibold text-gray-800 dark:text-gray-100">{r.riskScore}</span>
                                <span className={`ml-1.5 text-[10px] font-medium px-1.5 py-0.5 rounded ${riskLevelClasses[r.riskLevel]}`}>{r.riskLevel}</span>
                            </td>
                            <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.alertType}</td>
                            <td className="px-2 py-2.5 whitespace-nowrap">
                                <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${alertStatusClasses[r.status]}`}>{r.status}</span>
                            </td>
                            <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.assignedOfficer}</td>
                            <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{r.reviewDate}</td>
                            <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-2">
                                    <button className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"><Eye size={13} /></button>
                                    <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><MoreVertical size={14} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ── Sanctions Screening sidebar widget ───────────────────────
function SanctionsScreeningCard() {
    const s = sanctionsScreening;
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Sanctions Screening</h3>
                <button className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 cursor-pointer">
                    This Week <ChevronDown size={11} />
                </button>
            </div>
            <div className="space-y-2.5 mb-3">
                <div className="flex items-center justify-between text-[12px]">
                    <span className="text-gray-500 dark:text-gray-400">Screened Transactions</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{s.screenedTransactions.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                    <span className="text-gray-500 dark:text-gray-400">Hits Found</span>
                    <span className="font-semibold text-red-500 dark:text-red-400">{s.hitsFound}</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                    <span className="text-gray-500 dark:text-gray-400">Cleared</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{s.cleared.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                    <span className="text-gray-500 dark:text-gray-400">Hit Rate</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">{s.hitRatePct}%</span>
                </div>
            </div>
            <button className="text-[12px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center gap-1">
                View Screening Results <ArrowUpRight size={11} className="rotate-45" />
            </button>
        </div>
    );
}

// ── PEP Screening sidebar widget ──────────────────────────────
function PepScreeningCard() {
    const s = pepScreening;
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 mb-3">PEP Screening</h3>
            <div className="space-y-2.5 mb-3">
                <div className="flex items-center justify-between text-[12px]">
                    <span className="text-gray-500 dark:text-gray-400">Screened Customers</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{s.screenedCustomers.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                    <span className="text-gray-500 dark:text-gray-400">PEP Matches</span>
                    <span className="font-semibold text-red-500 dark:text-red-400">{s.pepMatches}</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                    <span className="text-gray-500 dark:text-gray-400">Cleared</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{s.cleared.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                    <span className="text-gray-500 dark:text-gray-400">Match Rate</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">{s.matchRatePct}%</span>
                </div>
            </div>
            <button className="text-[12px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center gap-1">
                View PEP Results <ArrowUpRight size={11} className="rotate-45" />
            </button>
        </div>
    );
}

// ── Recent Fraud Cases (bottom) ────────────────────────────────
function RecentFraudCasesCard() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Recent Fraud Cases</h3>
                <button className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">View All</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[420px]">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="py-2 font-medium">Case ID</th>
                            <th className="py-2 font-medium">Customer Name</th>
                            <th className="py-2 font-medium">Fraud Type</th>
                            <th className="py-2 font-medium">Risk Score</th>
                            <th className="py-2 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentFraudCases.map(c => (
                            <tr key={c.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0">
                                <td className="py-2 text-[11.5px] text-blue-600 dark:text-blue-400 font-medium whitespace-nowrap">{c.id}</td>
                                <td className="py-2 text-[12px] text-gray-700 dark:text-gray-300 whitespace-nowrap">{c.customerName}</td>
                                <td className="py-2 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{c.fraudType}</td>
                                <td className="py-2 text-[12px] font-medium text-gray-800 dark:text-gray-100 whitespace-nowrap">{c.riskScore}</td>
                                <td className="py-2 whitespace-nowrap">
                                    <span className={`text-[10.5px] font-medium px-2 py-0.5 rounded ${fraudStatusClasses[c.status]}`}>{c.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ── Recent Audit Logs (bottom) ─────────────────────────────────
function RecentAuditLogsCard() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Recent Audit Logs</h3>
                <button className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">View All</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[460px]">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="py-2 font-medium">Time</th>
                            <th className="py-2 font-medium">User</th>
                            <th className="py-2 font-medium">Action</th>
                            <th className="py-2 font-medium">Module</th>
                            <th className="py-2 font-medium">IP Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentAuditLogs.map(l => (
                            <tr key={l.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0">
                                <td className="py-2 text-[11.5px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{l.time}</td>
                                <td className="py-2 text-[12px] text-gray-700 dark:text-gray-300 whitespace-nowrap">{l.user}</td>
                                <td className="py-2 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{l.action}</td>
                                <td className="py-2 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{l.module}</td>
                                <td className="py-2 text-[11.5px] text-gray-400 dark:text-gray-500 whitespace-nowrap font-mono">{l.ipAddress}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ── Risk Assessment Summary (bottom) ───────────────────────────
function RiskAssessmentSummaryCard() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Risk Assessment Summary</h3>
                <button className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">View All</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[360px]">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="py-2 font-medium">Risk Category</th>
                            <th className="py-2 font-medium">Customers</th>
                            <th className="py-2 font-medium">Percentage</th>
                            <th className="py-2 font-medium">Trend</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riskAssessmentSummary.map(r => (
                            <tr key={r.category} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0">
                                <td className="py-2 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${riskLevelClasses[r.category]}`}>{r.category} Risk</span>
                                </td>
                                <td className="py-2 text-[12px] font-medium text-gray-800 dark:text-gray-100 whitespace-nowrap">{r.customers}</td>
                                <td className="py-2 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.pct}%</td>
                                <td className="py-2 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium flex items-center gap-0.5 ${r.trendUp ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                                        <ArrowUpRight size={10} className={r.trendUp ? '' : 'rotate-90'} /> {r.trendPct}%
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────
export default function ComplianceOverviewPage() {
    return (
        <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Compliance Overview</h1>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-0.5">
                        Monitor compliance activities, manage risks, and ensure regulatory adherence.
                    </p>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer whitespace-nowrap">
                    <Calendar size={13} /> {complianceDateRangeLabel} <ChevronDown size={13} />
                </button>
            </div>

            <StatCardsRow />

            {/* 4 donut charts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                <DonutCard title="Alert Distribution" data={alertDistributionDonut} total={alertDistributionTotal} />
                <DonutCard title="Risk Level Distribution" data={riskLevelDistributionDonut} total={riskLevelDistributionTotal} />
                <DonutCard title="Case Status Overview" data={caseStatusOverviewDonut} total={caseStatusOverviewTotal} />
                <DonutCard title="Investigation Status" data={investigationStatusDonut} total={investigationStatusTotal} />
            </div>

            {/* main table + sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-5">
                <div className="lg:col-span-3">
                    <TabbedTable />
                </div>
                <div className="lg:col-span-1 space-y-4">
                    <SanctionsScreeningCard />
                    <PepScreeningCard />
                </div>
            </div>

            {/* bottom 3-column row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                <RecentFraudCasesCard />
                <RecentAuditLogsCard />
                <RiskAssessmentSummaryCard />
            </div>

            {/* footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-gray-200 dark:border-gray-700 text-[11px] text-gray-400 dark:text-gray-500">
                <span>© 2025 SendMoney. All rights reserved.</span>
                <span>Secure · Reliable · Compliant</span>
            </div>
        </div>
    );
}