'use client';

import { useState, useMemo } from 'react';
import {
    Gauge,
    CheckCircle2,
    CalendarClock,
    CalendarDays,
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
    transactionLimits,
    transactionLimitsTotalCount,
    transactionLimitScopeOptions,
    transactionLimitAppliesToOptions,
    bankStatusFilterOptions,
    type TransactionLimit,
} from '@/lib/data';

const PAGE_SIZE_OPTIONS = [10, 25, 50];

function StatusBadge({ status }: { status: string }) {
    const isActive = status === 'Active';
    const classes = isActive
        ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
        : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400';
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${classes}`}>
            {status}
        </span>
    );
}

function ScopeBadge({ scope }: { scope: string }) {
    const classes =
        scope === 'Per Transaction'
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
            : scope === 'Daily'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400'
                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400';
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${classes}`}>
            {scope}
        </span>
    );
}

export default function TransactionLimitsPage() {
    const [scopeFilter, setScopeFilter] = useState('All Scopes');
    const [appliesToFilter, setAppliesToFilter] = useState('All Audiences');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [editingLimit, setEditingLimit] = useState<TransactionLimit | null>(null);

    const filteredLimits: TransactionLimit[] = useMemo(() => {
        return transactionLimits.filter((l) => {
            const matchesScope = scopeFilter === 'All Scopes' || l.scope === scopeFilter;
            const matchesAppliesTo = appliesToFilter === 'All Audiences' || l.appliesTo === appliesToFilter;
            const matchesStatus = statusFilter === 'All Status' || l.status === statusFilter;
            const matchesSearch = search.trim() === '' || l.name.toLowerCase().includes(search.toLowerCase());
            return matchesScope && matchesAppliesTo && matchesStatus && matchesSearch;
        });
    }, [scopeFilter, appliesToFilter, statusFilter, search]);

    const totalPages = Math.max(1, Math.ceil(filteredLimits.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paginatedLimits = filteredLimits.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const activeCount = transactionLimits.filter((l) => l.status === 'Active').length;
    const dailyCount = transactionLimits.filter((l) => l.scope === 'Daily').length;
    const monthlyCount = transactionLimits.filter((l) => l.scope === 'Monthly').length;

    return (
        <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Transaction Limits</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Set per-transaction, daily, and monthly limits by customer type and currency.
                    </p>
                </div>
                <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    <Plus size={15} /> Add New Limit
                </button>
            </div>

            {/* Stat cards */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                            <Gauge size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Limits</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{transactionLimitsTotalCount}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                            <CheckCircle2 size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Active Limits</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{activeCount}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400">
                            <CalendarClock size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Daily Limits</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{dailyCount}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
                            <CalendarDays size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Limits</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{monthlyCount}</p>
                </div>
            </div>

            {/* Main table card */}
            <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-5">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">All Transaction Limits</h2>

                {/* Filter bar */}
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
                    <select
                        value={scopeFilter}
                        onChange={(e) => {
                            setScopeFilter(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                    >
                        {transactionLimitScopeOptions.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    <select
                        value={appliesToFilter}
                        onChange={(e) => {
                            setAppliesToFilter(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                    >
                        {transactionLimitAppliesToOptions.map((a) => (
                            <option key={a} value={a}>
                                {a}
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
                        {bankStatusFilterOptions.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    <div className="relative flex-1">
                        <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            placeholder="Search limits..."
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-8 pr-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                        />
                    </div>
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
                                <th className="py-2 pr-4 font-medium">Limit Name</th>
                                <th className="py-2 pr-4 font-medium">Scope</th>
                                <th className="py-2 pr-4 font-medium">Currency</th>
                                <th className="py-2 pr-4 font-medium">Min Amount</th>
                                <th className="py-2 pr-4 font-medium">Max Amount</th>
                                <th className="py-2 pr-4 font-medium">Applies To</th>
                                <th className="py-2 pr-4 font-medium">Status</th>
                                <th className="py-2 pr-2 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {paginatedLimits.map((l) => (
                                <tr key={l.id} className="text-gray-700 dark:text-gray-200">
                                    <td className="py-2.5 pr-4 font-medium text-gray-900 dark:text-white">{l.name}</td>
                                    <td className="py-2.5 pr-4">
                                        <ScopeBadge scope={l.scope} />
                                    </td>
                                    <td className="py-2.5 pr-4">{l.currency}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{l.minAmount}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{l.maxAmount}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{l.appliesTo}</td>
                                    <td className="py-2.5 pr-4">
                                        <StatusBadge status={l.status} />
                                    </td>
                                    <td className="relative py-2.5 pr-2 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => setEditingLimit(l)}
                                                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                            <button
                                                onClick={() => setOpenMenuId(openMenuId === l.id ? null : l.id)}
                                                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                            >
                                                <MoreVertical size={14} />
                                            </button>
                                        </div>
                                        {openMenuId === l.id && (
                                            <div
                                                onClick={(e) => e.stopPropagation()}
                                                className="absolute right-2 top-9 z-10 w-36 rounded-lg border border-gray-200 bg-white py-1 text-left shadow-lg dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <button className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                                                    Duplicate Limit
                                                </button>
                                                <button className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                                                    {l.status === 'Active' ? 'Deactivate' : 'Activate'}
                                                </button>
                                                <button className="block w-full px-3 py-1.5 text-left text-xs text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                                                    Delete Limit
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {paginatedLimits.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="py-6 text-center text-sm text-gray-400">
                                        No transaction limits match the selected filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Showing {filteredLimits.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{' '}
                        {Math.min(currentPage * pageSize, filteredLimits.length)} of {transactionLimitsTotalCount} limits
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

            {/* Edit limit modal */}
            {editingLimit && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setEditingLimit(null)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md rounded-xl bg-white p-5 dark:bg-gray-800"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Edit transaction limit</h3>
                            <button
                                onClick={() => setEditingLimit(null)}
                                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="mt-4 space-y-3 text-sm">
                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Limit Name</label>
                                <input
                                    defaultValue={editingLimit.name}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Scope</label>
                                <select
                                    defaultValue={editingLimit.scope}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                >
                                    <option value="Per Transaction">Per Transaction</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Monthly">Monthly</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Min Amount</label>
                                    <input
                                        defaultValue={editingLimit.minAmount}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Max Amount</label>
                                    <input
                                        defaultValue={editingLimit.maxAmount}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Applies To</label>
                                <select
                                    defaultValue={editingLimit.appliesTo}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                >
                                    <option value="All Customers">All Customers</option>
                                    <option value="New Customers">New Customers</option>
                                    <option value="Verified Customers">Verified Customers</option>
                                    <option value="Agent Channel">Agent Channel</option>
                                </select>
                            </div>
                            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                                <input type="checkbox" defaultChecked={editingLimit.status === 'Active'} className="h-4 w-4 rounded" />
                                Limit active
                            </label>
                        </div>

                        <div className="mt-5 flex gap-2">
                            <button
                                onClick={() => setEditingLimit(null)}
                                className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setEditingLimit(null)}
                                className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}