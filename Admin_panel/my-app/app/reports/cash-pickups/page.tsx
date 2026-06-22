'use client';

import { useState, useMemo } from 'react';
import {
    Wallet,
    CheckCircle2,
    Clock,
    AlertCircle,
    TrendingUp,
    Search,
    Filter,
    Download,
    Eye,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
} from 'lucide-react';
import {
    cashPickupReportStats,
    cashPickupReportRows,
    cashPickupReportTotalCount,
    cashPickupCountryFilterOptions,
    cashPickupStatusFilterOptions,
    cashPickupAgentFilterOptions,
    type CashPickupReportStat,
    type CashPickupReportRow,
} from '@/lib/data';

const PAGE_SIZE_OPTIONS = [10, 25, 50];

const STAT_ICONS: Record<string, React.ReactNode> = {
    'total-pickups': <Wallet size={16} />,
    'completed-pickups': <CheckCircle2 size={16} />,
    'pending-pickups': <Clock size={16} />,
    'expired-pickups': <AlertCircle size={16} />,
    'avg-pickup-amount': <TrendingUp size={16} />,
};

const STAT_COLORS: Record<string, { bg: string; color: string }> = {
    'total-pickups': { bg: 'bg-orange-100 dark:bg-orange-900/40', color: 'text-orange-600 dark:text-orange-400' },
    'completed-pickups': { bg: 'bg-green-100 dark:bg-green-900/40', color: 'text-green-600 dark:text-green-400' },
    'pending-pickups': { bg: 'bg-amber-100 dark:bg-amber-900/40', color: 'text-amber-600 dark:text-amber-400' },
    'expired-pickups': { bg: 'bg-red-100 dark:bg-red-900/40', color: 'text-red-600 dark:text-red-400' },
    'avg-pickup-amount': { bg: 'bg-blue-100 dark:bg-blue-900/40', color: 'text-blue-600 dark:text-blue-400' },
};

function StatCard({ stat }: { stat: CashPickupReportStat }) {
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

function StatusBadge({ status }: { status: string }) {
    const classes =
        status === 'Completed'
            ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
            : status === 'Pending'
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
                : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400';
    return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${classes}`}>{status}</span>;
}

export default function CashPickupsPage() {
    const [countryFilter, setCountryFilter] = useState('All Countries');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [agentFilter, setAgentFilter] = useState('All Agents');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const filteredRows: CashPickupReportRow[] = useMemo(() => {
        return cashPickupReportRows.filter((r) => {
            const matchesCountry = countryFilter === 'All Countries' || r.country === countryFilter;
            const matchesStatus = statusFilter === 'All Status' || r.status === statusFilter;
            const matchesAgent = agentFilter === 'All Agents' || r.agentName === agentFilter;
            const matchesSearch =
                search.trim() === '' ||
                r.pickupId.toLowerCase().includes(search.toLowerCase()) ||
                r.customerName.toLowerCase().includes(search.toLowerCase());
            return matchesCountry && matchesStatus && matchesAgent && matchesSearch;
        });
    }, [countryFilter, statusFilter, agentFilter, search]);

    const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paginatedRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Cash Pickups</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Track and manage cash pickup requests across all agents and branches.
                    </p>
                </div>
                <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    <Download size={15} /> Export Report
                </button>
            </div>

            {/* Stat cards */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {cashPickupReportStats.map((stat) => (
                    <StatCard key={stat.id} stat={stat} />
                ))}
            </div>

            {/* Main table card */}
            <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-5">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">All Cash Pickups</h2>

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
                            placeholder="Search by pickup ID or customer name..."
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-8 pr-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                        />
                    </div>
                    <select
                        value={countryFilter}
                        onChange={(e) => {
                            setCountryFilter(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                    >
                        {cashPickupCountryFilterOptions.map((c) => (
                            <option key={c} value={c}>
                                {c}
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
                        {cashPickupStatusFilterOptions.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    <select
                        value={agentFilter}
                        onChange={(e) => {
                            setAgentFilter(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                    >
                        {cashPickupAgentFilterOptions.map((a) => (
                            <option key={a} value={a}>
                                {a}
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
                                <th className="py-2 pr-4 font-medium">Pickup ID</th>
                                <th className="py-2 pr-4 font-medium">Customer Name</th>
                                <th className="py-2 pr-4 font-medium">Agent</th>
                                <th className="py-2 pr-4 font-medium">Branch</th>
                                <th className="py-2 pr-4 font-medium">Country</th>
                                <th className="py-2 pr-4 font-medium">Amount</th>
                                <th className="py-2 pr-4 font-medium">Currency</th>
                                <th className="py-2 pr-4 font-medium">Status</th>
                                <th className="py-2 pr-4 font-medium">Requested Date</th>
                                <th className="py-2 pr-2 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {paginatedRows.map((r) => (
                                <tr key={r.id} className="text-gray-700 dark:text-gray-200">
                                    <td className="py-2.5 pr-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{r.pickupId}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.customerName}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.agentName}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.branch}</td>
                                    <td className="py-2.5 pr-4">
                                        <span className="flex items-center gap-1.5 whitespace-nowrap">
                                            <span>{r.countryFlag}</span> {r.country}
                                        </span>
                                    </td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.amount}</td>
                                    <td className="py-2.5 pr-4">{r.currency}</td>
                                    <td className="py-2.5 pr-4">
                                        <StatusBadge status={r.status} />
                                    </td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.requestedDate}</td>
                                    <td className="relative py-2.5 pr-2 text-right">
                                        <button
                                            onClick={() => setOpenMenuId(openMenuId === r.id ? null : r.id)}
                                            className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                        >
                                            <Eye size={15} />
                                        </button>
                                        {openMenuId === r.id && (
                                            <div
                                                onClick={(e) => e.stopPropagation()}
                                                className="absolute right-2 top-9 z-10 w-40 rounded-lg border border-gray-200 bg-white py-1 text-left shadow-lg dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <button className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                                                    View Details
                                                </button>
                                                <button className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                                                    Resend Notification
                                                </button>
                                                <button className="block w-full px-3 py-1.5 text-left text-xs text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                                                    Cancel Pickup
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {paginatedRows.length === 0 && (
                                <tr>
                                    <td colSpan={10} className="py-6 text-center text-sm text-gray-400 dark:text-gray-500">
                                        No cash pickups match the selected filters.
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
                        {Math.min(currentPage * pageSize, filteredRows.length)} of {cashPickupReportTotalCount} pickups
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