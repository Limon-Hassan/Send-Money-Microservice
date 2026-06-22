'use client';

import { useState, useMemo } from 'react';
import {
    CalendarClock,
    CheckCircle2,
    PauseCircle,
    Play,
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
    Plus,
} from 'lucide-react';
import {
    scheduledReportsPageStats,
    scheduledReportRows,
    scheduledReportRowsTotalCount,
    scheduledReportFrequencyFilterOptions,
    scheduledReportStatusFilterOptions,
    type ScheduledReportsStat,
    type ScheduledReportRow,
} from '@/lib/data';

const PAGE_SIZE_OPTIONS = [10, 25, 50];

const STAT_ICONS: Record<string, React.ReactNode> = {
    'total-scheduled': <CalendarClock size={16} />,
    'active-schedules': <CheckCircle2 size={16} />,
    'paused-schedules': <PauseCircle size={16} />,
    'running-today': <Play size={16} />,
};

const STAT_COLORS: Record<string, { bg: string; color: string }> = {
    'total-scheduled': { bg: 'bg-blue-100 dark:bg-blue-900/40', color: 'text-blue-600 dark:text-blue-400' },
    'active-schedules': { bg: 'bg-green-100 dark:bg-green-900/40', color: 'text-green-600 dark:text-green-400' },
    'paused-schedules': { bg: 'bg-gray-100 dark:bg-gray-700', color: 'text-gray-500 dark:text-gray-300' },
    'running-today': { bg: 'bg-purple-100 dark:bg-purple-900/40', color: 'text-purple-600 dark:text-purple-400' },
};

function StatCard({ stat }: { stat: ScheduledReportsStat }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center gap-2">
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${STAT_COLORS[stat.id].bg} ${STAT_COLORS[stat.id].color}`}>
                    {STAT_ICONS[stat.id]}
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
            <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{stat.changeLabel}</p>
        </div>
    );
}

function FrequencyBadge({ frequency }: { frequency: string }) {
    const classes =
        frequency === 'Daily'
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
            : frequency === 'Weekly'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400'
                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400';
    return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${classes}`}>{frequency}</span>;
}

export default function ScheduledReportsPage() {
    const [frequencyFilter, setFrequencyFilter] = useState('All Frequencies');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [scheduleStates, setScheduleStates] = useState(
        scheduledReportRows.reduce<Record<string, boolean>>((acc, r) => {
            acc[r.id] = r.enabled;
            return acc;
        }, {})
    );

    const filteredRows: ScheduledReportRow[] = useMemo(() => {
        return scheduledReportRows.filter((r) => {
            const matchesFrequency = frequencyFilter === 'All Frequencies' || r.frequency === frequencyFilter;
            const matchesStatus =
                statusFilter === 'All Status' ||
                (statusFilter === 'Active' && scheduleStates[r.id]) ||
                (statusFilter === 'Paused' && !scheduleStates[r.id]);
            const matchesSearch = search.trim() === '' || r.reportName.toLowerCase().includes(search.toLowerCase());
            return matchesFrequency && matchesStatus && matchesSearch;
        });
    }, [frequencyFilter, statusFilter, search, scheduleStates]);

    const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paginatedRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Scheduled Reports</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage automated report delivery schedules and recipients.
                    </p>
                </div>
                <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    <Plus size={15} /> New Schedule
                </button>
            </div>

            {/* Stat cards */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {scheduledReportsPageStats.map((stat) => (
                    <StatCard key={stat.id} stat={stat} />
                ))}
            </div>

            {/* Main table card */}
            <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-5">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">All Schedules</h2>

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
                            placeholder="Search by report name..."
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-8 pr-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                        />
                    </div>
                    <select
                        value={frequencyFilter}
                        onChange={(e) => {
                            setFrequencyFilter(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                    >
                        {scheduledReportFrequencyFilterOptions.map((f) => (
                            <option key={f} value={f}>
                                {f}
                            </option>
                        ))}
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                    >
                        {scheduledReportStatusFilterOptions.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    <button className="flex items-center justify-center rounded-lg border border-gray-300 p-2 text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                        <Filter size={15} />
                    </button>
                </div>

                {/* Table */}
                <div className="mt-4 overflow-x-auto">
                    <table className="min-w-225 w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 text-xs uppercase text-gray-500 dark:border-gray-700 dark:text-gray-400">
                                <th className="py-2 pr-4 font-medium">Report Name</th>
                                <th className="py-2 pr-4 font-medium">Data Source</th>
                                <th className="py-2 pr-4 font-medium">Frequency</th>
                                <th className="py-2 pr-4 font-medium">Cadence</th>
                                <th className="py-2 pr-4 font-medium">Next Run</th>
                                <th className="py-2 pr-4 font-medium">Recipients</th>
                                <th className="py-2 pr-4 font-medium">Enabled</th>
                                <th className="py-2 pr-2 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {paginatedRows.map((r) => (
                                <tr key={r.id} className="text-gray-700 dark:text-gray-200">
                                    <td className="py-2.5 pr-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{r.reportName}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.dataSource}</td>
                                    <td className="py-2.5 pr-4">
                                        <FrequencyBadge frequency={r.frequency} />
                                    </td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.cadence}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.nextRun}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.recipients.join(', ')}</td>
                                    <td className="py-2.5 pr-4">
                                        <button
                                            onClick={() => setScheduleStates((prev) => ({ ...prev, [r.id]: !prev[r.id] }))}
                                            className={`relative h-5 w-9 rounded-full transition-colors ${scheduleStates[r.id] ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                                                }`}
                                        >
                                            <span
                                                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${scheduleStates[r.id] ? 'translate-x-4' : 'translate-x-0.5'
                                                    }`}
                                            />
                                        </button>
                                    </td>
                                    <td className="relative py-2.5 pr-2 text-right">
                                        <button
                                            onClick={() => setOpenMenuId(openMenuId === r.id ? null : r.id)}
                                            className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                        >
                                            <MoreVertical size={15} />
                                        </button>
                                        {openMenuId === r.id && (
                                            <div
                                                onClick={(e) => e.stopPropagation()}
                                                className="absolute right-2 top-9 z-10 w-36 rounded-lg border border-gray-200 bg-white py-1 text-left shadow-lg dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <button className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                                                    Run Now
                                                </button>
                                                <button className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                                                    Edit Schedule
                                                </button>
                                                <button className="block w-full px-3 py-1.5 text-left text-xs text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {paginatedRows.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="py-6 text-center text-sm text-gray-400 dark:text-gray-500">
                                        No scheduled reports match the selected filters.
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
                        {Math.min(currentPage * pageSize, filteredRows.length)} of {scheduledReportRowsTotalCount} schedules
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