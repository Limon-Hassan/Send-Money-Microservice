'use client';

import { useState, useMemo } from 'react';
import {
    Settings2,
    CalendarClock,
    Share2,
    Star,
    Search,
    Filter,
    Download,
    Pencil,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    Plus,
    X,
} from 'lucide-react';
import {
    customReportsPageStats,
    customReportRows,
    customReportRowsTotalCount,
    customReportDataSources,
    customReportAvailableFields,
    customReportDataSourceFilterOptions,
    customReportFrequencyFilterOptions,
    type CustomReportsStat,
    type CustomReportRow,
} from '@/lib/data';

const PAGE_SIZE_OPTIONS = [10, 25, 50];

const STAT_ICONS: Record<string, React.ReactNode> = {
    'total-custom-reports': <Settings2 size={16} />,
    'scheduled-reports': <CalendarClock size={16} />,
    'shared-reports': <Share2 size={16} />,
    'most-used': <Star size={16} />,
};

const STAT_COLORS: Record<string, { bg: string; color: string }> = {
    'total-custom-reports': { bg: 'bg-blue-100 dark:bg-blue-900/40', color: 'text-blue-600 dark:text-blue-400' },
    'scheduled-reports': { bg: 'bg-purple-100 dark:bg-purple-900/40', color: 'text-purple-600 dark:text-purple-400' },
    'shared-reports': { bg: 'bg-green-100 dark:bg-green-900/40', color: 'text-green-600 dark:text-green-400' },
    'most-used': { bg: 'bg-amber-100 dark:bg-amber-900/40', color: 'text-amber-600 dark:text-amber-400' },
};

function StatCard({ stat }: { stat: CustomReportsStat }) {
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
                : frequency === 'Monthly'
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
    return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${classes}`}>{frequency}</span>;
}

export default function CustomReportsPage() {
    const [dataSourceFilter, setDataSourceFilter] = useState('All Data Sources');
    const [frequencyFilter, setFrequencyFilter] = useState('All Frequencies');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const [builderOpen, setBuilderOpen] = useState(false);
    const [builderName, setBuilderName] = useState('');
    const [builderSource, setBuilderSource] = useState(customReportDataSources[0]);
    const [builderFields, setBuilderFields] = useState<string[]>([]);
    const [builderFrequency, setBuilderFrequency] = useState('One-time');
    const [toast, setToast] = useState<string | null>(null);

    const filteredRows: CustomReportRow[] = useMemo(() => {
        return customReportRows.filter((r) => {
            const matchesSource = dataSourceFilter === 'All Data Sources' || r.dataSource === dataSourceFilter;
            const matchesFrequency = frequencyFilter === 'All Frequencies' || r.frequency === frequencyFilter;
            const matchesSearch =
                search.trim() === '' ||
                r.reportName.toLowerCase().includes(search.toLowerCase()) ||
                r.createdBy.toLowerCase().includes(search.toLowerCase());
            return matchesSource && matchesFrequency && matchesSearch;
        });
    }, [dataSourceFilter, frequencyFilter, search]);

    const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paginatedRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    function toggleField(field: string) {
        setBuilderFields((prev) => (prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]));
    }

    function handleCreateReport() {
        if (!builderName.trim() || builderFields.length === 0) {
            setToast('Please name the report and select at least one field.');
            setTimeout(() => setToast(null), 3000);
            return;
        }
        setToast(`"${builderName}" report created successfully.`);
        setTimeout(() => setToast(null), 3000);
        setBuilderOpen(false);
        setBuilderName('');
        setBuilderFields([]);
        setBuilderSource(customReportDataSources[0]);
        setBuilderFrequency('One-time');
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Custom Reports</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Build, schedule, and share reports tailored to your team's needs.
                    </p>
                </div>
                <button
                    onClick={() => setBuilderOpen(true)}
                    className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    <Plus size={15} /> Create Custom Report
                </button>
            </div>

            {/* Stat cards */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {customReportsPageStats.map((stat) => (
                    <StatCard key={stat.id} stat={stat} />
                ))}
            </div>

            {/* Main table card */}
            <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-5">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">All Custom Reports</h2>

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
                            placeholder="Search by report name or creator..."
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-8 pr-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                        />
                    </div>
                    <select
                        value={dataSourceFilter}
                        onChange={(e) => {
                            setDataSourceFilter(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                    >
                        {customReportDataSourceFilterOptions.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    <select
                        value={frequencyFilter}
                        onChange={(e) => {
                            setFrequencyFilter(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                    >
                        {customReportFrequencyFilterOptions.map((f) => (
                            <option key={f} value={f}>
                                {f}
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
                    <table className="min-w-215 w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 text-xs uppercase text-gray-500 dark:border-gray-700 dark:text-gray-400">
                                <th className="py-2 pr-4 font-medium">Report Name</th>
                                <th className="py-2 pr-4 font-medium">Data Source</th>
                                <th className="py-2 pr-4 font-medium">Frequency</th>
                                <th className="py-2 pr-4 font-medium">Created By</th>
                                <th className="py-2 pr-4 font-medium">Created Date</th>
                                <th className="py-2 pr-4 font-medium">Last Run</th>
                                <th className="py-2 pr-4 font-medium">Shared</th>
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
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.createdBy}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.createdDate}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.lastRun}</td>
                                    <td className="py-2.5 pr-4">
                                        {r.shared ? (
                                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">✓</span>
                                        ) : (
                                            <span className="text-gray-300 dark:text-gray-600">—</span>
                                        )}
                                    </td>
                                    <td className="relative py-2.5 pr-2 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                                <Pencil size={14} />
                                            </button>
                                            <button
                                                onClick={() => setOpenMenuId(openMenuId === r.id ? null : r.id)}
                                                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                            >
                                                <MoreVertical size={14} />
                                            </button>
                                        </div>
                                        {openMenuId === r.id && (
                                            <div
                                                onClick={(e) => e.stopPropagation()}
                                                className="absolute right-2 top-9 z-10 w-36 rounded-lg border border-gray-200 bg-white py-1 text-left shadow-lg dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <button className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                                                    Run Now
                                                </button>
                                                <button className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                                                    Duplicate
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
                                        No custom reports match the selected filters.
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
                        {Math.min(currentPage * pageSize, filteredRows.length)} of {customReportRowsTotalCount} reports
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

            {/* Report builder modal */}
            {builderOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setBuilderOpen(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-5 dark:bg-gray-800"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Create custom report</h3>
                            <button onClick={() => setBuilderOpen(false)} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="mt-4 space-y-4 text-sm">
                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Report Name</label>
                                <input
                                    value={builderName}
                                    onChange={(e) => setBuilderName(e.target.value)}
                                    placeholder="e.g. Weekly Corridor Performance"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Data Source</label>
                                <select
                                    value={builderSource}
                                    onChange={(e) => {
                                        setBuilderSource(e.target.value);
                                        setBuilderFields([]);
                                    }}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                >
                                    {customReportDataSources.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Fields to Include</label>
                                <div className="flex flex-wrap gap-2">
                                    {customReportAvailableFields[builderSource].map((field) => (
                                        <button
                                            key={field}
                                            onClick={() => toggleField(field)}
                                            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${builderFields.includes(field)
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/40 dark:text-blue-300'
                                                    : 'border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            {field}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Frequency</label>
                                <select
                                    value={builderFrequency}
                                    onChange={(e) => setBuilderFrequency(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                >
                                    <option value="One-time">One-time</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                </select>
                            </div>

                            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                                <input type="checkbox" className="h-4 w-4 rounded" />
                                Share this report with my team
                            </label>
                        </div>

                        <div className="mt-5 flex gap-2">
                            <button
                                onClick={() => setBuilderOpen(false)}
                                className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateReport}
                                className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                Create Report
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast notification */}
            {toast && (
                <div className="fixed bottom-5 right-5 z-50 rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white shadow-lg dark:bg-gray-700">
                    {toast}
                </div>
            )}
        </div>
    );
}