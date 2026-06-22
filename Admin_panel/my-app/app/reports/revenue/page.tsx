'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import {
    Gem,
    CreditCard,
    TrendingUp,
    Receipt,
    Calendar,
    Download,
    Filter,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
} from 'lucide-react';
import {
    Chart,
    BarElement,
    BarController,
    CategoryScale,
    LinearScale,
} from 'chart.js';
import {
    revenueFinanceStats,
    revenueBreakdownRows,
    revenueBreakdownTotalCount,
    revenueByCurrency,
    type RevenueFinanceStat,
} from '@/lib/data';

Chart.register(BarElement, BarController, CategoryScale, LinearScale);

const PAGE_SIZE_OPTIONS = [7, 14, 30];

const STAT_ICONS: Record<string, React.ReactNode> = {
    'total-revenue': <Gem size={16} />,
    'total-payouts': <CreditCard size={16} />,
    'net-revenue': <TrendingUp size={16} />,
    'avg-fee': <Receipt size={16} />,
};

const STAT_COLORS: Record<string, { bg: string; color: string }> = {
    'total-revenue': { bg: 'bg-purple-100 dark:bg-purple-900/40', color: 'text-purple-600 dark:text-purple-400' },
    'total-payouts': { bg: 'bg-green-100 dark:bg-green-900/40', color: 'text-green-600 dark:text-green-400' },
    'net-revenue': { bg: 'bg-blue-100 dark:bg-blue-900/40', color: 'text-blue-600 dark:text-blue-400' },
    'avg-fee': { bg: 'bg-amber-100 dark:bg-amber-900/40', color: 'text-amber-600 dark:text-amber-400' },
};

function StatCard({ stat }: { stat: RevenueFinanceStat }) {
    const positive = stat.change >= 0;
    const colors = STAT_COLORS[stat.id];
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center gap-2">
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${colors.bg} ${colors.color}`}>
                    {STAT_ICONS[stat.id]}
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
            <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
            <p className={`mt-1 flex items-center gap-1 text-xs font-medium ${positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {Math.abs(stat.change)}% {stat.changeLabel}
            </p>
        </div>
    );
}

function RevenueTrendChart() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        if (chartRef.current) chartRef.current.destroy();
        const reversed = [...revenueBreakdownRows].reverse();
        chartRef.current = new Chart(canvasRef.current, {
            type: 'bar',
            data: {
                labels: reversed.map((r) => r.date.replace(', 2025', '')),
                datasets: [
                    {
                        label: 'Fees Collected',
                        data: reversed.map((r) => Number(r.feesCollected.replace(/[^0-9.]/g, ''))),
                        backgroundColor: '#a855f7',
                        borderRadius: 4,
                        barThickness: 22,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#9ca3af' } },
                    y: {
                        grid: { color: 'rgba(156,163,175,0.15)' },
                        ticks: { font: { size: 10 }, color: '#9ca3af', callback: (v) => `$${Number(v) / 1000}K` },
                    },
                },
            },
        });
        return () => chartRef.current?.destroy();
    }, []);

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 lg:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Daily Fees Collected</h3>
            <div className="mt-3 h-55">
                <canvas ref={canvasRef} />
            </div>
        </div>
    );
}

export default function RevenueFinancePage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(7);

    const totalPages = Math.max(1, Math.ceil(revenueBreakdownRows.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paginatedRows = useMemo(
        () => revenueBreakdownRows.slice((currentPage - 1) * pageSize, currentPage * pageSize),
        [currentPage, pageSize]
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Revenue & Finance</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Track fee revenue, payouts, and financial performance across the platform.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                        <Calendar size={14} /> May 6 - May 12, 2025
                    </button>
                    <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-blue-700">
                        <Download size={15} /> Export Report
                    </button>
                </div>
            </div>

            {/* Stat cards */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {revenueFinanceStats.map((stat) => (
                    <StatCard key={stat.id} stat={stat} />
                ))}
            </div>

            {/* Chart + Revenue by currency */}
            <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
                <RevenueTrendChart />

                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Revenue by Currency</h3>
                    <div className="mt-3 space-y-3">
                        {revenueByCurrency.map((c) => (
                            <div key={c.id}>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-medium text-gray-700 dark:text-gray-200">{c.currency}</span>
                                    <span className="text-gray-500 dark:text-gray-400">{c.feesCollected}</span>
                                </div>
                                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                                    <div className="h-full rounded-full bg-purple-500" style={{ width: `${c.percentOfTotal}%` }} />
                                </div>
                                <p className="mt-0.5 text-[11px] text-gray-400 dark:text-gray-500">
                                    {c.transactions.toLocaleString()} txns · {c.percentOfTotal}%
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Revenue breakdown table */}
            <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-5">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">Daily Revenue Breakdown</h2>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center justify-center rounded-lg border border-gray-300 p-2 text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                            <Filter size={15} />
                        </button>
                        <button className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                            <Download size={14} /> Export
                        </button>
                    </div>
                </div>

                <div className="mt-4 overflow-x-auto">
                    <table className="min-w-190 w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 text-xs uppercase text-gray-500 dark:border-gray-700 dark:text-gray-400">
                                <th className="py-2 pr-4 font-medium">Date</th>
                                <th className="py-2 pr-4 font-medium">Transactions</th>
                                <th className="py-2 pr-4 font-medium">Gross Volume</th>
                                <th className="py-2 pr-4 font-medium">Fees Collected</th>
                                <th className="py-2 pr-4 font-medium">Payouts</th>
                                <th className="py-2 pr-2 font-medium">Net Revenue</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {paginatedRows.map((r) => (
                                <tr key={r.id} className="text-gray-700 dark:text-gray-200">
                                    <td className="py-2.5 pr-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{r.date}</td>
                                    <td className="py-2.5 pr-4">{r.transactions.toLocaleString()}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.grossVolume}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.feesCollected}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.payouts}</td>
                                    <td className="py-2.5 pr-2 whitespace-nowrap font-medium text-green-600 dark:text-green-400">{r.netRevenue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, revenueBreakdownRows.length)} of{' '}
                        {revenueBreakdownTotalCount.toLocaleString()} total transactions
                    </p>
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-gray-500 disabled:opacity-40 dark:border-gray-600 dark:text-gray-300"
                        >
                            <ChevronLeft size={14} />
                        </button>
                        {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-medium ${currentPage === p
                                        ? 'bg-blue-600 text-white'
                                        : 'border border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-300'
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-gray-500 disabled:opacity-40 dark:border-gray-600 dark:text-gray-300"
                        >
                            <ChevronRight size={14} />
                        </button>
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                                setPage(1);
                            }}
                            className="ml-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-600 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
                        >
                            {PAGE_SIZE_OPTIONS.map((n) => (
                                <option key={n} value={n}>
                                    {n} / page
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}