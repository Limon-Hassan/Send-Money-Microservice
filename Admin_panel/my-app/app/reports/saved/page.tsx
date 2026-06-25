'use client';

import { useState, useMemo } from 'react';
import {
    FolderOpen,
    Star,
    Share2,
    HardDrive,
    Search,
    Filter,
    FileText,
    FileSpreadsheet,
    FileBarChart2,
    Download,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import {
    savedReportsPageStats,
    savedReportRows,
    savedReportRowsTotalCount,
    savedReportDataSourceFilterOptions,
    savedReportFileTypeFilterOptions,
    type SavedReportsStat,
    type SavedReportRow,
} from '@/lib/data';

const PAGE_SIZE_OPTIONS = [10, 25, 50];

const STAT_ICONS: Record<string, React.ReactNode> = {
    'total-saved': <FolderOpen size={16} />,
    favorites: <Star size={16} />,
    'shared-with-me': <Share2 size={16} />,
    'storage-used': <HardDrive size={16} />,
};

const STAT_COLORS: Record<string, { bg: string; color: string }> = {
    'total-saved': { bg: 'bg-blue-100 dark:bg-blue-900/40', color: 'text-blue-600 dark:text-blue-400' },
    favorites: { bg: 'bg-amber-100 dark:bg-amber-900/40', color: 'text-amber-600 dark:text-amber-400' },
    'shared-with-me': { bg: 'bg-green-100 dark:bg-green-900/40', color: 'text-green-600 dark:text-green-400' },
    'storage-used': { bg: 'bg-purple-100 dark:bg-purple-900/40', color: 'text-purple-600 dark:text-purple-400' },
};

const FILE_ICONS: Record<string, React.ReactNode> = {
    xlsx: <FileSpreadsheet size={16} className="text-green-600" />,
    pdf: <FileText size={16} className="text-red-500" />,
    csv: <FileBarChart2 size={16} className="text-blue-500" />,
};

function StatCard({ stat }: { stat: SavedReportsStat }) {
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

export default function SavedReportsPage() {
    const [dataSourceFilter, setDataSourceFilter] = useState('All Data Sources');
    const [fileTypeFilter, setFileTypeFilter] = useState('All File Types');
    const [favoritesOnly, setFavoritesOnly] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [favoriteStates, setFavoriteStates] = useState(
        savedReportRows.reduce<Record<string, boolean>>((acc, r) => {
            acc[r.id] = r.favorite;
            return acc;
        }, {})
    );

    const filteredRows: SavedReportRow[] = useMemo(() => {
        return savedReportRows.filter((r) => {
            const matchesSource = dataSourceFilter === 'All Data Sources' || r.dataSource === dataSourceFilter;
            const matchesFileType = fileTypeFilter === 'All File Types' || r.fileType === fileTypeFilter;
            const matchesFavorite = !favoritesOnly || favoriteStates[r.id];
            const matchesSearch =
                search.trim() === '' ||
                r.reportName.toLowerCase().includes(search.toLowerCase()) ||
                r.savedBy.toLowerCase().includes(search.toLowerCase());
            return matchesSource && matchesFileType && matchesFavorite && matchesSearch;
        });
    }, [dataSourceFilter, fileTypeFilter, favoritesOnly, search, favoriteStates]);

    const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paginatedRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Saved Reports</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Browse, organize, and re-download previously generated reports.
                    </p>
                </div>
            </div>

            {/* Stat cards */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {savedReportsPageStats.map((stat) => (
                    <StatCard key={stat.id} stat={stat} />
                ))}
            </div>

            {/* Main table card */}
            <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-5">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">All Saved Reports</h2>

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
                            placeholder="Search by report name or saved by..."
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
                        {savedReportDataSourceFilterOptions.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    <select
                        value={fileTypeFilter}
                        onChange={(e) => {
                            setFileTypeFilter(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                    >
                        {savedReportFileTypeFilterOptions.map((f) => (
                            <option key={f} value={f}>
                                {f === 'All File Types' ? f : f.toUpperCase()}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={() => {
                            setFavoritesOnly((v) => !v);
                            setPage(1);
                        }}
                        className={`flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border px-3 py-2 text-sm transition-colors ${favoritesOnly
                                ? 'border-amber-400 bg-amber-50 text-amber-700 dark:border-amber-500 dark:bg-amber-900/30 dark:text-amber-400'
                                : 'border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`}
                    >
                        <Star size={14} className={favoritesOnly ? 'fill-amber-400' : ''} /> Favorites
                    </button>
                    <button className="flex items-center justify-center rounded-lg border border-gray-300 p-2 text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                        <Filter size={15} />
                    </button>
                </div>

                {/* Table */}
                <div className="mt-4 overflow-x-auto">
                    <table className="min-w-205 w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 text-xs uppercase text-gray-500 dark:border-gray-700 dark:text-gray-400">
                                <th className="py-2 pr-2 font-medium"></th>
                                <th className="py-2 pr-4 font-medium">Report Name</th>
                                <th className="py-2 pr-4 font-medium">Data Source</th>
                                <th className="py-2 pr-4 font-medium">Saved By</th>
                                <th className="py-2 pr-4 font-medium">Saved Date</th>
                                <th className="py-2 pr-4 font-medium">File Size</th>
                                <th className="py-2 pr-2 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {paginatedRows.map((r) => (
                                <tr key={r.id} className="text-gray-700 dark:text-gray-200">
                                    <td className="py-2.5 pr-2">
                                        <button
                                            onClick={() => setFavoriteStates((prev) => ({ ...prev, [r.id]: !prev[r.id] }))}
                                            className="text-gray-400 hover:text-amber-400"
                                        >
                                            <Star size={15} className={favoriteStates[r.id] ? 'fill-amber-400 text-amber-400' : ''} />
                                        </button>
                                    </td>
                                    <td className="py-2.5 pr-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        <span className="flex items-center gap-2">
                                            {FILE_ICONS[r.fileType]}
                                            {r.reportName}.{r.fileType}
                                        </span>
                                    </td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.dataSource}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.savedBy}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.savedDate}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.fileSize}</td>
                                    <td className="relative py-2.5 pr-2 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                                <Download size={14} />
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
                                                    Rename
                                                </button>
                                                <button className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                                                    Share
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
                                    <td colSpan={7} className="py-6 text-center text-sm text-gray-400 dark:text-gray-500">
                                        No saved reports match the selected filters.
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
                        {Math.min(currentPage * pageSize, filteredRows.length)} of {savedReportRowsTotalCount} saved reports
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