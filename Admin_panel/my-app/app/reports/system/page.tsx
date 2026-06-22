'use client';

import { useState, useMemo } from 'react';
import {
    Activity,
    Users2,
    ShieldAlert,
    Server,
    Search,
    Filter,
    Download,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
} from 'lucide-react';
import {
    systemActivityStats,
    systemActivityRows,
    systemActivityRowsTotalCount,
    systemActivityModuleFilterOptions,
    systemActivityResultFilterOptions,
    type SystemActivityStat,
    type SystemActivityRow,
} from '@/lib/data';

const PAGE_SIZE_OPTIONS = [10, 25, 50];

const STAT_ICONS: Record<string, React.ReactNode> = {
    'total-events-today': <Activity size={16} />,
    'active-sessions': <Users2 size={16} />,
    'failed-logins': <ShieldAlert size={16} />,
    'system-uptime': <Server size={16} />,
};

const STAT_COLORS: Record<string, { bg: string; color: string }> = {
    'total-events-today': { bg: 'bg-blue-100 dark:bg-blue-900/40', color: 'text-blue-600 dark:text-blue-400' },
    'active-sessions': { bg: 'bg-purple-100 dark:bg-purple-900/40', color: 'text-purple-600 dark:text-purple-400' },
    'failed-logins': { bg: 'bg-red-100 dark:bg-red-900/40', color: 'text-red-600 dark:text-red-400' },
    'system-uptime': { bg: 'bg-green-100 dark:bg-green-900/40', color: 'text-green-600 dark:text-green-400' },
};

function StatCard({ stat }: { stat: SystemActivityStat }) {
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

function ResultBadge({ result }: { result: string }) {
    const isSuccess = result === 'Success';
    const classes = isSuccess
        ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
        : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400';
    return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${classes}`}>{result}</span>;
}

export default function SystemActivityPage() {
    const [moduleFilter, setModuleFilter] = useState('All Modules');
    const [resultFilter, setResultFilter] = useState('All Results');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const filteredRows: SystemActivityRow[] = useMemo(() => {
        return systemActivityRows.filter((r) => {
            const matchesModule = moduleFilter === 'All Modules' || r.module === moduleFilter;
            const matchesResult = resultFilter === 'All Results' || r.result === resultFilter;
            const matchesSearch =
                search.trim() === '' ||
                r.user.toLowerCase().includes(search.toLowerCase()) ||
                r.action.toLowerCase().includes(search.toLowerCase()) ||
                r.ipAddress.includes(search);
            return matchesModule && matchesResult && matchesSearch;
        });
    }, [moduleFilter, resultFilter, search]);

    const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paginatedRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">System Activity</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Monitor user actions, login activity, and system events across the platform.
                    </p>
                </div>
                <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    <Download size={15} /> Export Report
                </button>
            </div>

            {/* Stat cards */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {systemActivityStats.map((stat) => (
                    <StatCard key={stat.id} stat={stat} />
                ))}
            </div>

            {/* Main table card */}
            <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-5">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">Activity Log</h2>

                {/* Filter bar */}
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
                    <div className="relative flex-1">
                        <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            placeholder="Search by user, action, or IP address..."
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-8 pr-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                        />
                    </div>
                    <select
                        value={moduleFilter}
                        onChange={(e) => {
                            setModuleFilter(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                    >
                        {systemActivityModuleFilterOptions.map((m) => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                    <select
                        value={resultFilter}
                        onChange={(e) => {
                            setResultFilter(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                    >
                        {systemActivityResultFilterOptions.map((r) => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>
                    <button className="flex items-center justify-center rounded-lg border border-gray-300 p-2 text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                        <Filter size={15} />
                    </button>
                    <button className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                        <Download size={14} /> Export
                    </button>
                </div>

                {/* Table */}
                <div className="mt-4 overflow-x-auto">
                    <table className="min-w-195 w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 text-xs uppercase text-gray-500 dark:border-gray-700 dark:text-gray-400">
                                <th className="py-2 pr-4 font-medium">Time</th>
                                <th className="py-2 pr-4 font-medium">User</th>
                                <th className="py-2 pr-4 font-medium">Action</th>
                                <th className="py-2 pr-4 font-medium">Module</th>
                                <th className="py-2 pr-4 font-medium">IP Address</th>
                                <th className="py-2 pr-2 font-medium">Result</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {paginatedRows.map((r) => (
                                <tr key={r.id} className="text-gray-700 dark:text-gray-200">
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.time}</td>
                                    <td className="py-2.5 pr-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{r.user}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.action}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.module}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.ipAddress}</td>
                                    <td className="py-2.5 pr-2">
                                        <ResultBadge result={r.result} />
                                    </td>
                                </tr>
                            ))}
                            {paginatedRows.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-6 text-center text-sm text-gray-400 dark:text-gray-500">
                                        No activity matches the selected filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Showing {filteredRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{' '}
                        {Math.min(currentPage * pageSize, filteredRows.length)} of {systemActivityRowsTotalCount.toLocaleString()} events
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
                        {totalPages > 3 && <span className="px-1 text-xs text-gray-400">...</span>}
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