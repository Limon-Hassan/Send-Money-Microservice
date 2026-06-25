'use client';

import { useState, useRef, useEffect } from 'react';
import { Chart, registerables, type ChartConfiguration } from 'chart.js';
Chart.register(...registerables);
import {
    Globe,
    Server,
    RotateCcw,
    ArrowUpRight,
    ArrowDownRight,
    ChevronDown,
    RefreshCw,
    Download,
    Search,
    SlidersHorizontal,
    Eye,
    Pencil,
    MoreVertical,
    ShieldAlert,
    KeyRound,
    Webhook,
    PlugZap,
    FileText,
    ChevronLeft,
    ChevronRight,
    Calendar,
} from 'lucide-react';
import {
    overviewStatCards,
    overviewVolumeData,
    overviewSuccessCount,
    overviewFailedCount,
    overviewSuccessRate,
    overviewEndpointUsageData,
    overviewHealthData,
    overviewHealthDotColor,
    overviewEnvStatusData,
    overviewEnvLastUpdated,
    overviewRecentApiKeysData,
    overviewKeyStatusBadge,
    overviewKeyEnvBadge,
    overviewLogsData,
    overviewLogsTotalCount,
    overviewLogTabs,
    overviewMethodBadge,
    overviewStatusCodeColor,
    overviewRecentWebhookEventsData,
    overviewWebhookStatusBadge,
    overviewQuickActionsData,
    type OverviewLogTab,
} from '@/lib/data';

// ---------- Small inline icon helpers ----------

const statIconMap = {
    requests: Globe,
    success: ArrowUpRight,
    failed: ArrowDownRight,
    response: RotateCcw,
    keys: KeyRound,
    blocked: ShieldAlert,
    webhook: Webhook,
} as const;

const statIconColor: Record<string, string> = {
    requests: 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    success: 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400',
    failed: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400',
    response: 'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
    keys: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
    blocked: 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    webhook: 'bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400',
};

const sparkStroke: Record<string, string> = {
    blue: '#3b82f6',
    green: '#22c55e',
    red: '#ef4444',
    purple: '#a855f7',
    indigo: '#6366f1',
    amber: '#f59e0b',
    sky: '#0ea5e9',
};

function Sparkline({ values, color }: { values: number[]; color: string }) {
    const w = 100;
    const h = 28;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;
    const points = values
        .map((v, i) => {
            const x = (i / (values.length - 1)) * w;
            const y = h - ((v - min) / range) * h;
            return `${x},${y}`;
        })
        .join(' ');

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-7" preserveAspectRatio="none">
            <polyline
                points={points}
                fill="none"
                stroke={sparkStroke[color]}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="3 3"
            />
        </svg>
    );
}

function RequestVolumeChart() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const gradient = ctx.createLinearGradient(0, 0, 0, 220);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.25)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

        const config: ChartConfiguration<'line'> = {
            type: 'line',
            data: {
                labels: overviewVolumeData.map((d) => d.label),
                datasets: [
                    {
                        label: 'Requests',
                        data: overviewVolumeData.map((d) => d.value),
                        borderColor: '#3b82f6',
                        backgroundColor: gradient,
                        borderWidth: 2.5,
                        pointBackgroundColor: '#3b82f6',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 1.5,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        tension: 0.35,
                        fill: true,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        padding: 10,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            title: (items) => items[0]?.label ?? '',
                            label: (item) => `${Number(item.raw).toLocaleString()} requests`,
                        },
                    },
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: '#94a3b8', font: { size: 11 } },
                    },
                    y: {
                        grid: { color: 'rgba(148, 163, 184, 0.15)' },
                        ticks: {
                            color: '#94a3b8',
                            font: { size: 11 },
                            callback: (value) => `${Number(value) / 1000}K`,
                        },
                    },
                },
            },
        };

        chartRef.current = new Chart(ctx, config);

        return () => {
            chartRef.current?.destroy();
        };
    }, []);

    return (
        <div className="relative h-56">
            <canvas ref={canvasRef} />
        </div>
    );
}

function SuccessDonut() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const config: ChartConfiguration<'doughnut'> = {
            type: 'doughnut',
            data: {
                labels: ['Successful', 'Failed'],
                datasets: [
                    {
                        data: [overviewSuccessCount, overviewFailedCount],
                        backgroundColor: ['#22c55e', '#ef4444'],
                        borderColor: '#fff',
                        borderWidth: 2,
                        hoverOffset: 6,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '72%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        padding: 10,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: (item) => {
                                const total = overviewSuccessCount + overviewFailedCount;
                                const value = Number(item.raw);
                                const pct = ((value / total) * 100).toFixed(1);
                                return `${item.label}: ${value.toLocaleString()} (${pct}%)`;
                            },
                        },
                    },
                },
            },
            plugins: [
                {
                    id: 'centerText',
                    afterDraw: (chart) => {
                        const { ctx: c, chartArea } = chart;
                        const centerX = (chartArea.left + chartArea.right) / 2;
                        const centerY = (chartArea.top + chartArea.bottom) / 2;
                        c.save();
                        c.textAlign = 'center';
                        c.textBaseline = 'middle';
                        c.font = '700 22px sans-serif';
                        c.fillStyle = '#1e293b';
                        c.fillText(overviewSuccessRate, centerX, centerY - 8);
                        c.font = '400 11px sans-serif';
                        c.fillStyle = '#94a3b8';
                        c.fillText('Success Rate', centerX, centerY + 12);
                        c.restore();
                    },
                },
            ],
        };

        chartRef.current = new Chart(ctx, config);

        return () => {
            chartRef.current?.destroy();
        };
    }, []);

    return (
        <div className="relative h-40 w-40 mx-auto">
            <canvas ref={canvasRef} />
        </div>
    );
}


export default function ApiOverviewPage() {
    const [activeLogTab, setActiveLogTab] = useState<OverviewLogTab>('API Logs');
    const [searchQuery, setSearchQuery] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [toast, setToast] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const [environment, setEnvironment] = useState('All Environments');
    const [dateRange, setDateRange] = useState('May 6 - May 12, 2025');
    const environmentOptions = ['All Environments', 'Production', 'Sandbox'];
    const dateRangeOptions = ['May 6 - May 12, 2025', 'Apr 29 - May 5, 2025', 'Last 30 Days', 'Last 90 Days'];

    const cycleEnvironment = () => {
        const idx = environmentOptions.indexOf(environment);
        const next = environmentOptions[(idx + 1) % environmentOptions.length];
        setEnvironment(next);
        showToast(`Filtered by ${next}`);
    };

    const cycleDateRange = () => {
        const idx = dateRangeOptions.indexOf(dateRange);
        const next = dateRangeOptions[(idx + 1) % dateRangeOptions.length];
        setDateRange(next);
        showToast(`Date range set to ${next}`);
    };
    const [endpointFilter, setEndpointFilter] = useState('All Endpoints');
    const [statusFilter, setStatusFilter] = useState('All Status Codes');

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
            showToast('Dashboard refreshed');
        }, 900);
    };

    const endpointOptions = ['All Endpoints', ...Array.from(new Set(overviewLogsData.map((l) => l.endpoint)))];
    const statusOptions = ['All Status Codes', '2xx Success', '4xx Client Error', '5xx Server Error'];

    const filteredLogs = overviewLogsData.filter((log) => {
        const matchesSearch = searchQuery
            ? log.endpoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.requestId.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
        const matchesEndpoint = endpointFilter === 'All Endpoints' ? true : log.endpoint === endpointFilter;
        const matchesStatus =
            statusFilter === 'All Status Codes'
                ? true
                : statusFilter === '2xx Success'
                    ? log.statusCode >= 200 && log.statusCode < 300
                    : statusFilter === '4xx Client Error'
                        ? log.statusCode >= 400 && log.statusCode < 500
                        : log.statusCode >= 500;
        return matchesSearch && matchesEndpoint && matchesStatus;
    });

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen relative">
            {/* Toast */}
            {toast && (
                <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg dark:bg-white dark:text-slate-900">
                    {toast}
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">API Overview</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Real-time monitoring and management of all API activity and integrations.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        onClick={cycleEnvironment}
                        className="flex items-center gap-2 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                        <Globe size={16} />
                        {environment}
                        <ChevronDown size={14} />
                    </button>
                    <button
                        onClick={cycleDateRange}
                        className="flex items-center gap-2 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                        <Calendar size={16} />
                        {dateRange}
                        <ChevronDown size={14} />
                    </button>
                    <button
                        onClick={handleRefresh}
                        className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                        aria-label="Refresh"
                    >
                        <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                    </button>
                    <button
                        onClick={() => showToast('Report exported')}
                        className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
                    >
                        <Download size={16} />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-6">
                {overviewStatCards.map((card) => {
                    const Icon = statIconMap[card.icon];
                    const isPositiveColor = card.changeTone === 'good' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
                    const ArrowIcon = card.changeDirection === 'up' ? ArrowUpRight : ArrowDownRight;
                    return (
                        <div
                            key={card.id}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col gap-3"
                        >
                            <div className="flex items-center gap-2">
                                <span className={`p-1.5 rounded-lg ${statIconColor[card.icon]}`}>
                                    <Icon size={14} />
                                </span>
                                <div className="leading-tight">
                                    <p className="text-xs font-medium text-slate-600 dark:text-slate-300">{card.label}</p>
                                    <p className="text-[11px] text-slate-400 dark:text-slate-500">{card.sublabel}</p>
                                </div>
                            </div>
                            <p className="text-xl font-bold text-slate-800 dark:text-white">{card.value}</p>
                            <Sparkline values={card.sparkline} color={card.sparkColor} />
                            <p className={`text-xs font-medium flex items-center gap-1 ${isPositiveColor}`}>
                                <ArrowIcon size={12} />
                                {card.change} {card.label.includes('Keys') || card.label.includes('IPs') ? 'vs last 7 days' : 'vs yesterday'}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                {/* Request volume */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="font-semibold text-slate-800 dark:text-white text-sm">Request Volume <span className="text-slate-400 font-normal">(This Week)</span></h2>
                        <button onClick={() => showToast('Range updated to This Month')} className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                            This Week <ChevronDown size={12} />
                        </button>
                    </div>
                    <RequestVolumeChart />
                </div>

                {/* Success vs failure */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="font-semibold text-slate-800 dark:text-white text-sm">Success vs Failure Rate</h2>
                        <button onClick={() => showToast('Range updated to This Month')} className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                            This Week <ChevronDown size={12} />
                        </button>
                    </div>
                    <SuccessDonut />
                    <div className="flex items-center justify-center gap-4 mt-2 text-xs">
                        <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                            <span className="w-2 h-2 rounded-full bg-green-500" /> Successful {overviewSuccessCount.toLocaleString()} (91.2%)
                        </span>
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-1 text-xs">
                        <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                            <span className="w-2 h-2 rounded-full bg-red-500" /> Failed {overviewFailedCount.toLocaleString()} (8.8%)
                        </span>
                    </div>
                </div>

                {/* Endpoint usage */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-semibold text-slate-800 dark:text-white text-sm">Endpoint Usage <span className="text-slate-400 font-normal">(Top 10)</span></h2>
                        <button onClick={() => showToast('Range updated to This Month')} className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                            This Week <ChevronDown size={12} />
                        </button>
                    </div>
                    <div className="space-y-2.5">
                        {overviewEndpointUsageData.map((ep) => {
                            const max = overviewEndpointUsageData[0].count;
                            const widthPct = Math.max((ep.count / max) * 100, 8);
                            return (
                                <div key={ep.id} className="flex items-center gap-2 text-xs">
                                    <span className="w-44 truncate text-slate-600 dark:text-slate-300">
                                        <span className="font-semibold mr-1">{ep.method}</span>
                                        {ep.path}
                                    </span>
                                    <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${widthPct}%` }} />
                                    </div>
                                    <span className="w-12 text-right text-slate-500 dark:text-slate-400">{ep.count.toLocaleString()}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                {/* Left: recent keys + logs tabs */}
                <div className="lg:col-span-3 flex flex-col gap-4">
                    {/* Recent API Keys */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-semibold text-slate-800 dark:text-white text-sm">Recent API Keys</h2>
                            <button className="text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
                                View All Keys <ArrowUpRight size={12} />
                            </button>
                        </div>
                        <div className="overflow-x-auto -mx-2">
                            <table className="w-full text-xs min-w-160">
                                <thead>
                                    <tr className="text-left text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
                                        <th className="py-2 px-2 font-medium">Key ID</th>
                                        <th className="py-2 px-2 font-medium">Key Name</th>
                                        <th className="py-2 px-2 font-medium">Owner</th>
                                        <th className="py-2 px-2 font-medium">Module Access</th>
                                        <th className="py-2 px-2 font-medium">Environment</th>
                                        <th className="py-2 px-2 font-medium">Status</th>
                                        <th className="py-2 px-2 font-medium">Rate Limit</th>
                                        <th className="py-2 px-2 font-medium">Created At</th>
                                        <th className="py-2 px-2 font-medium"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {overviewRecentApiKeysData.map((key) => (
                                        <tr key={key.id} className="border-b border-slate-50 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                                            <td className="py-2.5 px-2 font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">{key.keyId}</td>
                                            <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">{key.keyName}</td>
                                            <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">{key.owner}</td>
                                            <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">{key.moduleAccess}</td>
                                            <td className="py-2.5 px-2">
                                                <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${overviewKeyEnvBadge[key.environment]}`}>
                                                    {key.environment}
                                                </span>
                                            </td>
                                            <td className="py-2.5 px-2">
                                                <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${overviewKeyStatusBadge[key.status]}`}>
                                                    {key.status}
                                                </span>
                                            </td>
                                            <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">{key.rateLimit}</td>
                                            <td className="py-2.5 px-2 text-slate-500 dark:text-slate-400 whitespace-nowrap">{key.createdAt}</td>
                                            <td className="py-2.5 px-2">
                                                <div className="flex items-center gap-1.5 text-slate-400">
                                                    <button onClick={() => showToast(`Viewing ${key.keyName}`)} className="hover:text-blue-600 dark:hover:text-blue-400">
                                                        <Eye size={14} />
                                                    </button>
                                                    <button onClick={() => showToast(`Editing ${key.keyName}`)} className="hover:text-blue-600 dark:hover:text-blue-400">
                                                        <Pencil size={14} />
                                                    </button>
                                                    <button onClick={() => showToast(`More options for ${key.keyName}`)} className="hover:text-blue-600 dark:hover:text-blue-400">
                                                        <MoreVertical size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Logs tabs + table */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                        <div className="flex flex-wrap gap-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                            {overviewLogTabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveLogTab(tab)}
                                    className={`text-sm pb-2.5 -mb-px border-b-2 transition ${activeLogTab === tab
                                            ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-medium'
                                            : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <button onClick={() => showToast('Date range cleared')} className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                                <Calendar size={13} />
                                {dateRange}
                                <span className="text-slate-300">✕</span>
                            </button>
                            <div className="relative flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                                <select
                                    value={endpointFilter}
                                    onChange={(e) => {
                                        setEndpointFilter(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="bg-transparent outline-none pr-1 appearance-none"
                                >
                                    {endpointOptions.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown size={12} className="pointer-events-none" />
                            </div>
                            <div className="relative flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => {
                                        setStatusFilter(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="bg-transparent outline-none pr-1 appearance-none"
                                >
                                    {statusOptions.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown size={12} className="pointer-events-none" />
                            </div>
                            <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 flex-1 min-w-40">
                                <Search size={13} />
                                <input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search logs..."
                                    className="bg-transparent outline-none w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                                />
                            </div>
                            <button onClick={() => showToast('More filters panel opened')} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                                <SlidersHorizontal size={13} /> More Filters
                            </button>
                            <button
                                onClick={() => showToast('Logs exported')}
                                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-slate-800 dark:bg-slate-700 text-white"
                            >
                                <Download size={13} /> Export Logs
                            </button>
                        </div>

                        <div className="overflow-x-auto -mx-2">
                            <table className="w-full text-xs min-w-175">
                                <thead>
                                    <tr className="text-left text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
                                        <th className="py-2 px-2 font-medium">Request ID</th>
                                        <th className="py-2 px-2 font-medium">Date & Time</th>
                                        <th className="py-2 px-2 font-medium">Method</th>
                                        <th className="py-2 px-2 font-medium">Endpoint</th>
                                        <th className="py-2 px-2 font-medium">Status Code</th>
                                        <th className="py-2 px-2 font-medium">Response Time</th>
                                        <th className="py-2 px-2 font-medium">IP Address</th>
                                        <th className="py-2 px-2 font-medium">API Key</th>
                                        <th className="py-2 px-2 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLogs.map((log) => (
                                        <tr key={log.id} className="border-b border-slate-50 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                                            <td className="py-2.5 px-2 font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">{log.requestId}</td>
                                            <td className="py-2.5 px-2 text-slate-500 dark:text-slate-400 whitespace-nowrap">{log.dateTime}</td>
                                            <td className="py-2.5 px-2">
                                                <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${overviewMethodBadge[log.method]}`}>
                                                    {log.method}
                                                </span>
                                            </td>
                                            <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">{log.endpoint}</td>
                                            <td className={`py-2.5 px-2 font-medium whitespace-nowrap ${overviewStatusCodeColor(log.statusCode)}`}>{log.statusCode}</td>
                                            <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">{log.responseTimeMs} ms</td>
                                            <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">{log.ipAddress}</td>
                                            <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">{log.apiKeyId}</td>
                                            <td className="py-2.5 px-2">
                                                <button onClick={() => showToast(`Viewing ${log.requestId}`)} className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                                                    <Eye size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredLogs.length === 0 && (
                                        <tr>
                                            <td colSpan={9} className="py-6 text-center text-slate-400 text-sm">
                                                No logs match your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 text-xs text-slate-500 dark:text-slate-400">
                            <p>Showing 1 to {filteredLogs.length} of {overviewLogsTotalCount.toLocaleString()} logs</p>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40"
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft size={14} />
                                </button>
                                {[1, 2, 3, 4, 5].map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setCurrentPage(p)}
                                        className={`w-7 h-7 rounded-lg text-xs ${currentPage === p
                                                ? 'bg-blue-600 text-white'
                                                : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <span className="px-1">…</span>
                                <button
                                    onClick={() => setCurrentPage(250)}
                                    className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300"
                                >
                                    250
                                </button>
                                <button
                                    onClick={() => setCurrentPage((p) => p + 1)}
                                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700"
                                >
                                    <ChevronRight size={14} />
                                </button>
                                <select
                                    onChange={(e) => showToast(`Showing ${e.target.value} per page`)}
                                    className="ml-2 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 bg-transparent"
                                >
                                    <option>5 / page</option>
                                    <option>10 / page</option>
                                    <option>25 / page</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right sidebar column */}
                <div className="flex flex-col gap-4">
                    {/* System Health */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-semibold text-slate-800 dark:text-white text-sm">System Health</h2>
                            <button className="text-xs text-blue-600 dark:text-blue-400 font-medium">View Details</button>
                        </div>
                        <div className="space-y-2.5">
                            {overviewHealthData.map((s) => (
                                <div key={s.id} className="flex items-center justify-between text-sm">
                                    <span className="text-slate-600 dark:text-slate-300">{s.name}</span>
                                    <span className="flex items-center gap-1.5 text-xs font-medium">
                                        <span className={`w-2 h-2 rounded-full ${overviewHealthDotColor[s.status]}`} />
                                        <span
                                            className={
                                                s.status === 'Healthy'
                                                    ? 'text-green-600 dark:text-green-400'
                                                    : s.status === 'Warning'
                                                        ? 'text-amber-600 dark:text-amber-400'
                                                        : 'text-red-600 dark:text-red-400'
                                            }
                                        >
                                            {s.status}
                                        </span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Environment status */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                        <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-3">Environment Status</h2>
                        <div className="space-y-2">
                            {overviewEnvStatusData.map((env) => (
                                <div
                                    key={env.id}
                                    className="flex items-center justify-between border border-slate-100 dark:border-slate-800 rounded-xl px-3 py-2.5"
                                >
                                    <span className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                                        <Server size={14} className="text-slate-400" />
                                        {env.name}
                                    </span>
                                    <span
                                        className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${env.liveStatus === 'Live'
                                                ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                                                : 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400'
                                            }`}
                                    >
                                        {env.liveStatus}
                                    </span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                        Uptime {env.uptime}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-between mt-3 text-[11px] text-slate-400 dark:text-slate-500">
                            <span>Last updated: {overviewEnvLastUpdated}</span>
                            <button onClick={() => showToast('Environment status refreshed')}>
                                <RefreshCw size={13} />
                            </button>
                        </div>
                    </div>

                    {/* Recent webhook events */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-semibold text-slate-800 dark:text-white text-sm">Recent Webhook Events</h2>
                            <button className="text-xs text-blue-600 dark:text-blue-400 font-medium">View All</button>
                        </div>
                        <div className="space-y-3">
                            {overviewRecentWebhookEventsData.map((ev) => (
                                <div key={ev.id} className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300 truncate">
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full ${ev.status === 'Failed' ? 'bg-red-500' : 'bg-green-500'
                                                }`}
                                        />
                                        <span className="truncate">{ev.eventName}</span>
                                    </span>
                                    <span className="text-[11px] text-slate-400 dark:text-slate-500 whitespace-nowrap ml-2">
                                        {ev.timestamp.split(' ').slice(0, 2).join(' ')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick actions */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                        <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-3">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-2">
                            {overviewQuickActionsData.map((action) => {
                                const ActionIcon =
                                    action.icon === 'generate-key'
                                        ? KeyRound
                                        : action.icon === 'add-webhook'
                                            ? Webhook
                                            : action.icon === 'create-endpoint'
                                                ? PlugZap
                                                : FileText;
                                const tone =
                                    action.icon === 'generate-key'
                                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                                        : action.icon === 'add-webhook'
                                            ? 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400'
                                            : action.icon === 'create-endpoint'
                                                ? 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400'
                                                : 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400';
                                return (
                                    <button
                                        key={action.id}
                                        onClick={() => showToast(`${action.label} triggered`)}
                                        className="flex flex-col items-center gap-2 border border-slate-100 dark:border-slate-800 rounded-xl py-3 px-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                                    >
                                        <span className={`p-2 rounded-lg ${tone}`}>
                                            <ActionIcon size={16} />
                                        </span>
                                        <span className="text-xs text-slate-600 dark:text-slate-300 text-center leading-tight">
                                            {action.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}