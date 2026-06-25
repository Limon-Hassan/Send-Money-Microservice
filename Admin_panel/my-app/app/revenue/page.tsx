'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { Chart, registerables, type ChartConfiguration } from 'chart.js';
Chart.register(...registerables);

import {
    Download,
    ArrowUpRight,
    ArrowDownRight,
    Wallet,
    TrendingUp,
    ReceiptText,
    LineChart as LineChartIcon,
    ChevronDown,
    Globe2,
    Search,
} from 'lucide-react';
import {
    revenueStatCards,
    revenueMonthlyTrend,
    revenueYearlyTrend,
    revenueBySource,
    revenueByRegion,
    revenueRecentTransactions,
    revenueTxnTypeBadge,
    revenueTxnStatusBadge,
    revenueTxnTotalCount,
    type RevenueViewMode,
    type RevenueTrendPoint,
} from '@/lib/data';

const statIconMap = {
    total: Wallet,
    net: TrendingUp,
    expense: ReceiptText,
    growth: LineChartIcon,
} as const;

const statIconColor: Record<string, string> = {
    total: 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    net: 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400',
    expense: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400',
    growth: 'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
};

function formatCurrency(n: number): string {
    return `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

function RevenueTrendChart({ data }: { data: RevenueTrendPoint[] }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        if (chartRef.current) chartRef.current.destroy();
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const incomeGradient = ctx.createLinearGradient(0, 0, 0, 280);
        incomeGradient.addColorStop(0, 'rgba(37, 99, 235, 0.25)');
        incomeGradient.addColorStop(1, 'rgba(37, 99, 235, 0)');

        const config: ChartConfiguration<'line'> = {
            type: 'line',
            data: {
                labels: data.map((d) => d.label),
                datasets: [
                    {
                        label: 'Income',
                        data: data.map((d) => d.income),
                        borderColor: '#2563eb',
                        backgroundColor: incomeGradient,
                        borderWidth: 2.5,
                        pointRadius: 3,
                        pointHoverRadius: 6,
                        pointBackgroundColor: '#2563eb',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 1.5,
                        tension: 0.4,
                        fill: true,
                    },
                    {
                        label: 'Expenses & Refunds',
                        data: data.map((d) => d.expense),
                        borderColor: '#ef4444',
                        backgroundColor: 'transparent',
                        borderWidth: 2,
                        borderDash: [5, 4],
                        pointRadius: 3,
                        pointHoverRadius: 6,
                        pointBackgroundColor: '#ef4444',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 1.5,
                        tension: 0.4,
                        fill: false,
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
                        labels: { boxWidth: 10, boxHeight: 10, usePointStyle: true, color: '#94a3b8', font: { size: 12 } },
                    },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        padding: 12,
                        cornerRadius: 10,
                        callbacks: {
                            label: (item) => `${item.dataset.label}: $${Number(item.raw).toLocaleString()}`,
                        },
                    },
                },
                scales: {
                    x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 11 } } },
                    y: {
                        grid: { color: 'rgba(148, 163, 184, 0.15)' },
                        ticks: { color: '#94a3b8', font: { size: 11 }, callback: (v) => `$${Number(v) / 1000}K` },
                    },
                },
            },
        };

        chartRef.current = new Chart(ctx, config);
        return () => chartRef.current?.destroy();
    }, [data]);

    return (
        <div className="relative h-72">
            <canvas ref={canvasRef} />
        </div>
    );
}

function RevenueSourceDonut() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);
    const total = revenueBySource.reduce((sum, s) => sum + s.amount, 0);

    useEffect(() => {
        if (!canvasRef.current) return;
        if (chartRef.current) chartRef.current.destroy();
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const config: ChartConfiguration<'doughnut'> = {
            type: 'doughnut',
            data: {
                labels: revenueBySource.map((s) => s.category),
                datasets: [
                    {
                        data: revenueBySource.map((s) => s.amount),
                        backgroundColor: revenueBySource.map((s) => s.color),
                        borderColor: '#fff',
                        borderWidth: 2,
                        hoverOffset: 8,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        padding: 10,
                        cornerRadius: 8,
                        callbacks: {
                            label: (item) => {
                                const value = Number(item.raw);
                                const pct = ((value / total) * 100).toFixed(1);
                                return `${item.label}: $${value.toLocaleString()} (${pct}%)`;
                            },
                        },
                    },
                },
            },
            plugins: [
                {
                    id: 'centerLabel',
                    afterDraw: (chart) => {
                        const { ctx: c, chartArea } = chart;
                        const centerX = (chartArea.left + chartArea.right) / 2;
                        const centerY = (chartArea.top + chartArea.bottom) / 2;
                        c.save();
                        c.textAlign = 'center';
                        c.textBaseline = 'middle';
                        c.font = '700 20px sans-serif';
                        c.fillStyle = '#1e293b';
                        c.fillText(`$${(total / 1000).toFixed(0)}K`, centerX, centerY - 8);
                        c.font = '400 11px sans-serif';
                        c.fillStyle = '#94a3b8';
                        c.fillText('Total Revenue', centerX, centerY + 12);
                        c.restore();
                    },
                },
            ],
        };

        chartRef.current = new Chart(ctx, config);
        return () => chartRef.current?.destroy();
    }, [total]);

    return (
        <div className="relative h-48 w-48 mx-auto">
            <canvas ref={canvasRef} />
        </div>
    );
}

export default function RevenuePage() {
    const [viewMode, setViewMode] = useState<RevenueViewMode>('Monthly');
    const [toast, setToast] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const trendData = viewMode === 'Monthly' ? revenueMonthlyTrend : revenueYearlyTrend;

    const filteredTransactions = useMemo(() => {
        return revenueRecentTransactions.filter((t) =>
            searchQuery
                ? t.txnId.toLowerCase().includes(searchQuery.toLowerCase()) || t.customer.toLowerCase().includes(searchQuery.toLowerCase())
                : true
        );
    }, [searchQuery]);

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
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Revenue</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Track income, expenses, and net profit across the platform.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1">
                        {(['Monthly', 'Yearly'] as RevenueViewMode[]).map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setViewMode(mode)}
                                className={`text-sm px-3.5 py-1.5 rounded-lg transition ${viewMode === mode
                                        ? 'bg-blue-600 text-white font-medium'
                                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => showToast('Revenue report exported')}
                        className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
                    >
                        <Download size={16} />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {revenueStatCards.map((stat) => {
                    const Icon = statIconMap[stat.icon];
                    const ArrowIcon = stat.changeDirection === 'up' ? ArrowUpRight : ArrowDownRight;
                    const toneColor = stat.changeTone === 'good' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
                    return (
                        <div key={stat.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <span className={`p-2 rounded-xl ${statIconColor[stat.icon]}`}>
                                    <Icon size={16} />
                                </span>
                                <p className="text-xs font-medium text-slate-600 dark:text-slate-300">{stat.label}</p>
                            </div>
                            <p className="text-2xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
                            <p className={`text-xs font-medium flex items-center gap-1 mt-1.5 ${toneColor}`}>
                                <ArrowIcon size={12} />
                                {stat.change} vs last period
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Trend chart + Donut */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="font-semibold text-slate-800 dark:text-white text-sm">
                            Income vs Expenses <span className="text-slate-400 font-normal">({viewMode === 'Monthly' ? 'This Year' : 'Last 6 Years'})</span>
                        </h2>
                    </div>
                    <RevenueTrendChart data={trendData} />
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6">
                    <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-3">Revenue by Source</h2>
                    <RevenueSourceDonut />
                    <div className="flex flex-col gap-2 mt-4">
                        {revenueBySource.map((src) => (
                            <div key={src.id} className="flex items-center justify-between text-xs">
                                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: src.color }} />
                                    {src.category}
                                </span>
                                <span className="font-medium text-slate-700 dark:text-slate-200">{src.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Revenue by region + Recent transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Region breakdown */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Globe2 size={16} className="text-blue-600 dark:text-blue-400" />
                        <h2 className="font-semibold text-slate-800 dark:text-white text-sm">Revenue by Region</h2>
                    </div>
                    <div className="flex flex-col gap-3">
                        {revenueByRegion.map((region) => {
                            const ArrowIcon = region.trendDirection === 'up' ? ArrowUpRight : ArrowDownRight;
                            const toneColor = region.trendDirection === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
                            return (
                                <div key={region.id}>
                                    <div className="flex items-center justify-between mb-1 text-sm">
                                        <span className="text-slate-700 dark:text-slate-200">{region.region}</span>
                                        <span className="font-medium text-slate-800 dark:text-white">{formatCurrency(region.amount)}</span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-1">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${region.percentage}%` }} />
                                    </div>
                                    <p className={`text-[11px] flex items-center gap-1 ${toneColor}`}>
                                        <ArrowIcon size={10} />
                                        {region.trendPercent} · {region.percentage}% of total
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent revenue transactions */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-slate-800 dark:text-white text-sm">Recent Revenue Transactions</h2>
                        <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 w-44">
                            <Search size={13} />
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="bg-transparent outline-none w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto -mx-2">
                        <table className="w-full text-sm min-w-140">
                            <thead>
                                <tr className="text-left text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
                                    <th className="py-2 px-2 font-medium">Transaction</th>
                                    <th className="py-2 px-2 font-medium">Type</th>
                                    <th className="py-2 px-2 font-medium">Customer</th>
                                    <th className="py-2 px-2 font-medium">Status</th>
                                    <th className="py-2 px-2 font-medium text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.map((txn) => (
                                    <tr key={txn.id} className="border-b border-slate-50 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                                        <td className="py-2.5 px-2">
                                            <p className="text-xs font-mono text-slate-600 dark:text-slate-300">{txn.txnId}</p>
                                            <p className="text-[11px] text-slate-400 dark:text-slate-500">{txn.date}</p>
                                        </td>
                                        <td className="py-2.5 px-2">
                                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap ${revenueTxnTypeBadge[txn.type]}`}>
                                                {txn.type}
                                            </span>
                                        </td>
                                        <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">{txn.customer}</td>
                                        <td className="py-2.5 px-2">
                                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${revenueTxnStatusBadge[txn.status]}`}>{txn.status}</span>
                                        </td>
                                        <td className={`py-2.5 px-2 text-right font-medium whitespace-nowrap ${txn.amount < 0 ? 'text-red-600 dark:text-red-400' : 'text-slate-800 dark:text-white'}`}>
                                            {txn.amount < 0 ? '-' : ''}${Math.abs(txn.amount).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                                {filteredTransactions.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="py-6 text-center text-slate-400 text-sm">
                                            No transactions match your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
                        Showing {filteredTransactions.length} of {revenueTxnTotalCount.toLocaleString()} revenue transactions
                    </p>
                </div>
            </div>
        </div>
    );
}