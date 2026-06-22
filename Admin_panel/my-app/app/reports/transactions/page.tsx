'use client';

import { useState, useMemo } from 'react';
import {
    BarChart3,
    CheckCircle2,
    Clock,
    XCircle,
    DollarSign,
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
    reportTransactions,
    reportTransactionsTotalCount,
    reportTxnCountryFilterOptions,
    reportTxnCurrencyFilterOptions,
    reportTxnStatusFilterOptions,
    reportTxnAgentFilterOptions,
    transactionsPageStats,
    type ReportTransaction,
    type TransactionsPageStat,
} from '@/lib/data';

const PAGE_SIZE_OPTIONS = [10, 25, 50];

const STAT_ICONS: Record<string, React.ReactNode> = {
    'total-txns': <BarChart3 size={16} />,
    'completed-txns': <CheckCircle2 size={16} />,
    'pending-txns': <Clock size={16} />,
    'failed-txns': <XCircle size={16} />,
    'total-volume': <DollarSign size={16} />,
};

const STAT_COLORS: Record<string, { bg: string; color: string }> = {
    'total-txns': { bg: 'bg-blue-100 dark:bg-blue-900/40', color: 'text-blue-600 dark:text-blue-400' },
    'completed-txns': { bg: 'bg-green-100 dark:bg-green-900/40', color: 'text-green-600 dark:text-green-400' },
    'pending-txns': { bg: 'bg-amber-100 dark:bg-amber-900/40', color: 'text-amber-600 dark:text-amber-400' },
    'failed-txns': { bg: 'bg-red-100 dark:bg-red-900/40', color: 'text-red-600 dark:text-red-400' },
    'total-volume': { bg: 'bg-purple-100 dark:bg-purple-900/40', color: 'text-purple-600 dark:text-purple-400' },
};

function StatCard({ stat }: { stat: TransactionsPageStat }) {
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

export default function TransactionsPage() {
    const [countryFilter, setCountryFilter] = useState('All Countries');
    const [currencyFilter, setCurrencyFilter] = useState('All Currencies');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [agentFilter, setAgentFilter] = useState('All Agents');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const filteredTransactions: ReportTransaction[] = useMemo(() => {
        return reportTransactions.filter((t) => {
            const matchesCountry =
                countryFilter === 'All Countries' || t.sendCountry === countryFilter || t.receiveCountry === countryFilter;
            const matchesCurrency = currencyFilter === 'All Currencies' || t.currency === currencyFilter;
            const matchesStatus = statusFilter === 'All Status' || t.status === statusFilter;
            const matchesAgent = agentFilter === 'All Agents';
            const matchesSearch =
                search.trim() === '' ||
                t.transactionNo.toLowerCase().includes(search.toLowerCase()) ||
                t.sender.toLowerCase().includes(search.toLowerCase()) ||
                t.recipient.toLowerCase().includes(search.toLowerCase());
            return matchesCountry && matchesCurrency && matchesStatus && matchesAgent && matchesSearch;
        });
    }, [countryFilter, currencyFilter, statusFilter, agentFilter, search]);

    const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Transactions</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        View and manage all platform transactions across every corridor and currency.
                    </p>
                </div>
                <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    <Download size={15} /> Export Report
                </button>
            </div>

            {/* Stat cards */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {transactionsPageStats.map((stat) => (
                    <StatCard key={stat.id} stat={stat} />
                ))}
            </div>

            {/* Main table card */}
            <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-5">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">All Transactions</h2>

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
                            placeholder="Search by transaction number, sender, or recipient..."
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
                        {reportTxnCountryFilterOptions.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                    <select
                        value={currencyFilter}
                        onChange={(e) => {
                            setCurrencyFilter(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                    >
                        {reportTxnCurrencyFilterOptions.map((c) => (
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
                        {reportTxnStatusFilterOptions.map((s) => (
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
                        {reportTxnAgentFilterOptions.map((a) => (
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
                    <table className="min-w-225 w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 text-xs uppercase text-gray-500 dark:border-gray-700 dark:text-gray-400">
                                <th className="py-2 pr-4 font-medium">Transaction No.</th>
                                <th className="py-2 pr-4 font-medium">Sender</th>
                                <th className="py-2 pr-4 font-medium">Recipient</th>
                                <th className="py-2 pr-4 font-medium">Send Country</th>
                                <th className="py-2 pr-4 font-medium">Receive Country</th>
                                <th className="py-2 pr-4 font-medium">Amount</th>
                                <th className="py-2 pr-4 font-medium">Currency</th>
                                <th className="py-2 pr-4 font-medium">Fee</th>
                                <th className="py-2 pr-4 font-medium">Net Payout</th>
                                <th className="py-2 pr-4 font-medium">Status</th>
                                <th className="py-2 pr-4 font-medium">Date & Time</th>
                                <th className="py-2 pr-2 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {paginatedTransactions.map((t) => (
                                <tr key={t.id} className="text-gray-700 dark:text-gray-200">
                                    <td className="py-2.5 pr-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{t.transactionNo}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{t.sender}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{t.recipient}</td>
                                    <td className="py-2.5 pr-4">
                                        <span className="flex items-center gap-1.5 whitespace-nowrap">
                                            <span>{t.sendCountryFlag}</span> {t.sendCountry}
                                        </span>
                                    </td>
                                    <td className="py-2.5 pr-4">
                                        <span className="flex items-center gap-1.5 whitespace-nowrap">
                                            <span>{t.receiveCountryFlag}</span> {t.receiveCountry}
                                        </span>
                                    </td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{t.amount}</td>
                                    <td className="py-2.5 pr-4">{t.currency}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{t.fee}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{t.netPayout}</td>
                                    <td className="py-2.5 pr-4">
                                        <StatusBadge status={t.status} />
                                    </td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{t.dateTime}</td>
                                    <td className="relative py-2.5 pr-2 text-right">
                                        <button
                                            onClick={() => setOpenMenuId(openMenuId === t.id ? null : t.id)}
                                            className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                        >
                                            <Eye size={15} />
                                        </button>
                                        {openMenuId === t.id && (
                                            <div
                                                onClick={(e) => e.stopPropagation()}
                                                className="absolute right-2 top-9 z-10 w-40 rounded-lg border border-gray-200 bg-white py-1 text-left shadow-lg dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <button className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                                                    View Details
                                                </button>
                                                <button className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                                                    Download Receipt
                                                </button>
                                                <button className="block w-full px-3 py-1.5 text-left text-xs text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                                                    Flag Transaction
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {paginatedTransactions.length === 0 && (
                                <tr>
                                    <td colSpan={12} className="py-6 text-center text-sm text-gray-400 dark:text-gray-500">
                                        No transactions match the selected filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Showing {filteredTransactions.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{' '}
                        {Math.min(currentPage * pageSize, filteredTransactions.length)} of {reportTransactionsTotalCount} transactions
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