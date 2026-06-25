'use client';

import { useState, useMemo, useRef, useEffect, Fragment } from 'react';
import { Chart, registerables, type ChartConfiguration } from 'chart.js';
Chart.register(...registerables);

import {
    Search,
    ChevronDown,
    Download,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    ScrollText,
    AlertTriangle,
    Gauge,
    BellRing,
    ArrowUpRight,
    ArrowDownRight,
    X,
    RefreshCw,
} from 'lucide-react';
import {
    monitorStats,
    monitorTrafficData,
    monitorResponseDistribution,
    monitorLogsData,
    monitorLogsTotalCount,
    monitorAlertsData,
    monitorLevelBadge,
    monitorLevelDot,
    monitorMethodBadge,
    monitorStatusCodeColor,
    monitorLevelOptions,
    monitorMethodOptions,
    type MonitorLogEntry,
    type MonitorLogLevel,
    type MonitorLogMethod,
} from '@/lib/data';

const statIconMap = {
    logs: ScrollText,
    errorRate: AlertTriangle,
    responseTime: Gauge,
    alerts: BellRing,
} as const;

const statIconColor: Record<string, string> = {
    logs: 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    errorRate: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400',
    responseTime: 'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
    alerts: 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
};

function TrafficErrorChart() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        if (chartRef.current) chartRef.current.destroy();
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const requestsGradient = ctx.createLinearGradient(0, 0, 0, 220);
        requestsGradient.addColorStop(0, 'rgba(59, 130, 246, 0.25)');
        requestsGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

        const config: ChartConfiguration<'line'> = {
            type: 'line',
            data: {
                labels: monitorTrafficData.map((d) => d.label),
                datasets: [
                    {
                        label: 'Requests',
                        data: monitorTrafficData.map((d) => d.requests),
                        borderColor: '#3b82f6',
                        backgroundColor: requestsGradient,
                        borderWidth: 2.5,
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        tension: 0.35,
                        fill: true,
                        yAxisID: 'y',
                    },
                    {
                        label: 'Errors',
                        data: monitorTrafficData.map((d) => d.errors),
                        borderColor: '#ef4444',
                        backgroundColor: 'transparent',
                        borderWidth: 2,
                        borderDash: [4, 4],
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        tension: 0.35,
                        fill: false,
                        yAxisID: 'y1',
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: {
                        position: 'top',
                        align: 'end',
                        labels: { boxWidth: 10, boxHeight: 10, usePointStyle: true, color: '#94a3b8', font: { size: 11 } },
                    },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        padding: 10,
                        cornerRadius: 8,
                    },
                },
                scales: {
                    x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 11 } } },
                    y: {
                        position: 'left',
                        grid: { color: 'rgba(148, 163, 184, 0.15)' },
                        ticks: { color: '#94a3b8', font: { size: 11 } },
                    },
                    y1: {
                        position: 'right',
                        grid: { display: false },
                        ticks: { color: '#94a3b8', font: { size: 11 } },
                    },
                },
            },
        };

        chartRef.current = new Chart(ctx, config);
        return () => chartRef.current?.destroy();
    }, []);

    return (
        <div className="relative h-56">
            <canvas ref={canvasRef} />
        </div>
    );
}

function ResponseDistributionChart() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        if (chartRef.current) chartRef.current.destroy();
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const config: ChartConfiguration<'bar'> = {
            type: 'bar',
            data: {
                labels: monitorResponseDistribution.map((d) => d.label),
                datasets: [
                    {
                        label: 'Requests',
                        data: monitorResponseDistribution.map((d) => d.count),
                        backgroundColor: ['#22c55e', '#3b82f6', '#a855f7', '#f59e0b', '#ef4444'],
                        borderRadius: 6,
                        maxBarThickness: 36,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        padding: 10,
                        cornerRadius: 8,
                        callbacks: { label: (item) => `${Number(item.raw).toLocaleString()} requests` },
                    },
                },
                scales: {
                    x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 10 } } },
                    y: { grid: { color: 'rgba(148, 163, 184, 0.15)' }, ticks: { color: '#94a3b8', font: { size: 10 } } },
                },
            },
        };

        chartRef.current = new Chart(ctx, config);
        return () => chartRef.current?.destroy();
    }, []);

    return (
        <div className="relative h-56">
            <canvas ref={canvasRef} />
        </div>
    );
}

export default function LogsMonitoringPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [levelFilter, setLevelFilter] = useState<'All' | MonitorLogLevel>('All');
    const [methodFilter, setMethodFilter] = useState<'All' | MonitorLogMethod>('All');
    const [toast, setToast] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
            showToast('Logs refreshed');
        }, 800);
    };

    const dismissAlert = (id: string) => {
        setDismissedAlerts((prev) => new Set(prev).add(id));
    };

    const filteredLogs = useMemo(() => {
        return monitorLogsData.filter((log: MonitorLogEntry) => {
            const matchesSearch = searchQuery
                ? log.endpoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
                log.requestId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                log.message.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            const matchesLevel = levelFilter === 'All' ? true : log.level === levelFilter;
            const matchesMethod = methodFilter === 'All' ? true : log.method === methodFilter;
            return matchesSearch && matchesLevel && matchesMethod;
        });
    }, [searchQuery, levelFilter, methodFilter]);

    const visibleAlerts = monitorAlertsData.filter((a) => !dismissedAlerts.has(a.id));

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
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Logs & Monitoring</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Inspect request logs, traffic trends, and system alerts in real time.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleRefresh}
                        className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                        <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                    </button>
                    <button
                        onClick={() => showToast('Logs exported')}
                        className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
                    >
                        <Download size={16} />
                        Export Logs
                    </button>
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {monitorStats.map((stat) => {
                    const Icon = statIconMap[stat.icon];
                    const ArrowIcon = stat.changeDirection === 'up' ? ArrowUpRight : ArrowDownRight;
                    const toneColor = stat.changeTone === 'good' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
                    return (
                        <div
                            key={stat.id}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`p-1.5 rounded-lg ${statIconColor[stat.icon]}`}>
                                    <Icon size={14} />
                                </span>
                                <p className="text-xs font-medium text-slate-600 dark:text-slate-300">{stat.label}</p>
                            </div>
                            <p className="text-xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
                            <p className={`text-xs font-medium flex items-center gap-1 mt-1 ${toneColor}`}>
                                <ArrowIcon size={12} />
                                {stat.change} vs yesterday
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Active alerts */}
            {visibleAlerts.length > 0 && (
                <div className="flex flex-col gap-2 mb-6">
                    {visibleAlerts.map((alert) => (
                        <div
                            key={alert.id}
                            className={`flex items-start gap-3 rounded-2xl p-4 border ${alert.severity === 'Critical'
                                    ? 'bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/30'
                                    : 'bg-amber-50 border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/30'
                                }`}
                        >
                            <AlertTriangle
                                size={18}
                                className={alert.severity === 'Critical' ? 'text-red-600 dark:text-red-400 mt-0.5' : 'text-amber-600 dark:text-amber-400 mt-0.5'}
                            />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-800 dark:text-white">{alert.title}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{alert.description}</p>
                                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">{alert.triggeredAt}</p>
                            </div>
                            <button onClick={() => dismissAlert(alert.id)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                    <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-2">
                        Traffic & Errors <span className="text-slate-400 font-normal">(Last 24h)</span>
                    </h2>
                    <TrafficErrorChart />
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                    <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-2">Response Time Distribution</h2>
                    <ResponseDistributionChart />
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-4 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 flex-1 min-w-50">
                    <Search size={15} />
                    <input
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="Search by request ID, endpoint, or message..."
                        className="bg-transparent outline-none w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                    />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={levelFilter}
                        onChange={(e) => {
                            setLevelFilter(e.target.value as 'All' | MonitorLogLevel);
                            setCurrentPage(1);
                        }}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Levels</option>
                        {monitorLevelOptions.map((l) => (
                            <option key={l} value={l}>
                                {l}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={methodFilter}
                        onChange={(e) => {
                            setMethodFilter(e.target.value as 'All' | MonitorLogMethod);
                            setCurrentPage(1);
                        }}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Methods</option>
                        {monitorMethodOptions.map((m) => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
            </div>

            {/* Logs table with expandable rows */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                <div className="overflow-x-auto -mx-2">
                    <table className="w-full text-sm min-w-200">
                        <thead>
                            <tr className="text-left text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
                                <th className="py-2.5 px-2 font-medium w-6"></th>
                                <th className="py-2.5 px-2 font-medium">Level</th>
                                <th className="py-2.5 px-2 font-medium">Timestamp</th>
                                <th className="py-2.5 px-2 font-medium">Method</th>
                                <th className="py-2.5 px-2 font-medium">Endpoint</th>
                                <th className="py-2.5 px-2 font-medium">Status</th>
                                <th className="py-2.5 px-2 font-medium">Response Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.map((log) => {
                                const isExpanded = expandedId === log.id;
                                return (
                                    <Fragment key={log.id}>
                                        <tr
                                            onClick={() => setExpandedId(isExpanded ? null : log.id)}
                                            className="border-b border-slate-50 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer"
                                        >
                                            <td className="py-2.5 px-2 text-slate-400">
                                                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                            </td>
                                            <td className="py-2.5 px-2">
                                                <span className="flex items-center gap-1.5 text-xs font-medium whitespace-nowrap">
                                                    <span className={`w-1.5 h-1.5 rounded-full ${monitorLevelDot[log.level]}`} />
                                                    <span className={`px-2 py-0.5 rounded-full ${monitorLevelBadge[log.level]}`}>{log.level}</span>
                                                </span>
                                            </td>
                                            <td className="py-2.5 px-2 text-slate-500 dark:text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                                            <td className="py-2.5 px-2">
                                                <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${monitorMethodBadge[log.method]}`}>{log.method}</span>
                                            </td>
                                            <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300 whitespace-nowrap font-mono text-xs">{log.endpoint}</td>
                                            <td className={`py-2.5 px-2 font-medium whitespace-nowrap ${monitorStatusCodeColor(log.statusCode)}`}>{log.statusCode}</td>
                                            <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">{log.responseTimeMs} ms</td>
                                        </tr>
                                        {isExpanded && (
                                            <tr className="bg-slate-50 dark:bg-slate-800/40">
                                                <td colSpan={7} className="p-4">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                                        <div>
                                                            <p className="text-slate-400 dark:text-slate-500 mb-1">Message</p>
                                                            <p className="text-slate-700 dark:text-slate-200">{log.message}</p>
                                                            <p className="text-slate-400 dark:text-slate-500 mt-3 mb-1">Request ID</p>
                                                            <code className="text-slate-700 dark:text-slate-200">{log.requestId}</code>
                                                            <p className="text-slate-400 dark:text-slate-500 mt-3 mb-1">IP Address / API Key</p>
                                                            <p className="text-slate-700 dark:text-slate-200">
                                                                {log.ipAddress} · {log.apiKeyId}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-slate-400 dark:text-slate-500 mb-1">Request Headers</p>
                                                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-mono space-y-0.5">
                                                                {Object.entries(log.requestHeaders).map(([key, val]) => (
                                                                    <p key={key} className="text-slate-600 dark:text-slate-300">
                                                                        <span className="text-slate-400 dark:text-slate-500">{key}:</span> {val}
                                                                    </p>
                                                                ))}
                                                            </div>
                                                            <p className="text-slate-400 dark:text-slate-500 mt-3 mb-1">Response Body Preview</p>
                                                            <code className="block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-slate-600 dark:text-slate-300 break-all">
                                                                {log.responseBodyPreview}
                                                            </code>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>
                                );
                            })}
                            {filteredLogs.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-slate-400 text-sm">
                                        No logs match your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 text-xs text-slate-500 dark:text-slate-400">
                    <p>
                        Showing 1 to {filteredLogs.length} of {monitorLogsTotalCount.toLocaleString()} logs
                    </p>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40"
                        >
                            <ChevronLeft size={14} />
                        </button>
                        {[1, 2, 3, 4, 5].map((p) => (
                            <button
                                key={p}
                                onClick={() => setCurrentPage(p)}
                                className={`w-7 h-7 rounded-lg text-xs ${currentPage === p ? 'bg-blue-600 text-white' : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage((p) => p + 1)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700"
                        >
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}