'use client';

import { useState, useMemo } from 'react';
import {
    ShieldAlert,
    CheckCircle2,
    Ban,
    Eye,
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
    fraudFilters,
    fraudFiltersTotalCount,
    fraudFilterTypeOptions,
    fraudFilterRiskLevelOptions,
    bankStatusFilterOptions,
    type FraudFilter,
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

function RiskBadge({ level }: { level: string }) {
    const classes =
        level === 'High'
            ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
            : level === 'Medium'
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${classes}`}>
            {level}
        </span>
    );
}

function ActionBadge({ action }: { action: string }) {
    const classes =
        action === 'Block'
            ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
            : action === 'Flag for Review'
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400';
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${classes}`}>
            {action}
        </span>
    );
}

export default function FraudFiltersPage() {
    const [typeFilter, setTypeFilter] = useState('All Types');
    const [riskFilter, setRiskFilter] = useState('All Risk Levels');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [editingFilter, setEditingFilter] = useState<FraudFilter | null>(null);

    const filteredFilters: FraudFilter[] = useMemo(() => {
        return fraudFilters.filter((f) => {
            const matchesType = typeFilter === 'All Types' || f.type === typeFilter;
            const matchesRisk = riskFilter === 'All Risk Levels' || f.riskLevel === riskFilter;
            const matchesStatus = statusFilter === 'All Status' || f.status === statusFilter;
            const matchesSearch =
                search.trim() === '' ||
                f.name.toLowerCase().includes(search.toLowerCase()) ||
                f.triggerCondition.toLowerCase().includes(search.toLowerCase());
            return matchesType && matchesRisk && matchesStatus && matchesSearch;
        });
    }, [typeFilter, riskFilter, statusFilter, search]);

    const totalPages = Math.max(1, Math.ceil(filteredFilters.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paginatedFilters = filteredFilters.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const activeCount = fraudFilters.filter((f) => f.status === 'Active').length;
    const blockedTotal = fraudFilters
        .filter((f) => f.action === 'Block')
        .reduce((sum, f) => sum + f.triggeredCount, 0);
    const flaggedTotal = fraudFilters
        .filter((f) => f.action === 'Flag for Review')
        .reduce((sum, f) => sum + f.triggeredCount, 0);

    return (
        <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Fraud Filters</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Configure rules that detect and stop suspicious card transactions.
                    </p>
                </div>
                <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    <Plus size={15} /> Add New Filter
                </button>
            </div>

            {/* Stat cards */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
                            <ShieldAlert size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Filters</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{fraudFiltersTotalCount}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                            <CheckCircle2 size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Active Filters</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{activeCount}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
                            <Ban size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Transactions Blocked</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{blockedTotal}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
                            <Eye size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Flagged for Review</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{flaggedTotal}</p>
                </div>
            </div>

            {/* Main table card */}
            <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-5">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">All Fraud Filters</h2>

                {/* Filter bar */}
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
                    <select
                        value={typeFilter}
                        onChange={(e) => {
                            setTypeFilter(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                    >
                        {fraudFilterTypeOptions.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                    <select
                        value={riskFilter}
                        onChange={(e) => {
                            setRiskFilter(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                    >
                        {fraudFilterRiskLevelOptions.map((r) => (
                            <option key={r} value={r}>
                                {r}
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
                            placeholder="Search filters..."
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
                    <table className="min-w-230 w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 text-xs uppercase text-gray-500 dark:border-gray-700 dark:text-gray-400">
                                <th className="py-2 pr-4 font-medium">Filter Name</th>
                                <th className="py-2 pr-4 font-medium">Type</th>
                                <th className="py-2 pr-4 font-medium">Trigger Condition</th>
                                <th className="py-2 pr-4 font-medium">Action</th>
                                <th className="py-2 pr-4 font-medium">Risk Level</th>
                                <th className="py-2 pr-4 font-medium">Triggered</th>
                                <th className="py-2 pr-4 font-medium">Status</th>
                                <th className="py-2 pr-2 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {paginatedFilters.map((f) => (
                                <tr key={f.id} className="text-gray-700 dark:text-gray-200">
                                    <td className="py-2.5 pr-4 font-medium text-gray-900 dark:text-white">{f.name}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{f.type}</td>
                                    <td className="py-2.5 pr-4">{f.triggerCondition}</td>
                                    <td className="py-2.5 pr-4">
                                        <ActionBadge action={f.action} />
                                    </td>
                                    <td className="py-2.5 pr-4">
                                        <RiskBadge level={f.riskLevel} />
                                    </td>
                                    <td className="py-2.5 pr-4">{f.triggeredCount}</td>
                                    <td className="py-2.5 pr-4">
                                        <StatusBadge status={f.status} />
                                    </td>
                                    <td className="relative py-2.5 pr-2 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => setEditingFilter(f)}
                                                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                            <button
                                                onClick={() => setOpenMenuId(openMenuId === f.id ? null : f.id)}
                                                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                            >
                                                <MoreVertical size={14} />
                                            </button>
                                        </div>
                                        {openMenuId === f.id && (
                                            <div
                                                onClick={(e) => e.stopPropagation()}
                                                className="absolute right-2 top-9 z-10 w-40 rounded-lg border border-gray-200 bg-white py-1 text-left shadow-lg dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <button className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                                                    View Trigger Log
                                                </button>
                                                <button className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                                                    {f.status === 'Active' ? 'Deactivate' : 'Activate'}
                                                </button>
                                                <button className="block w-full px-3 py-1.5 text-left text-xs text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                                                    Delete Filter
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {paginatedFilters.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="py-6 text-center text-sm text-gray-400">
                                        No fraud filters match the selected filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Showing {filteredFilters.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{' '}
                        {Math.min(currentPage * pageSize, filteredFilters.length)} of {fraudFiltersTotalCount} filters
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

            {/* Edit filter modal */}
            {editingFilter && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setEditingFilter(null)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md rounded-xl bg-white p-5 dark:bg-gray-800"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Edit fraud filter</h3>
                            <button
                                onClick={() => setEditingFilter(null)}
                                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="mt-4 space-y-3 text-sm">
                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Filter Name</label>
                                <input
                                    defaultValue={editingFilter.name}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Trigger Condition</label>
                                <input
                                    defaultValue={editingFilter.triggerCondition}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Action</label>
                                <select
                                    defaultValue={editingFilter.action}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                >
                                    <option value="Block">Block</option>
                                    <option value="Flag for Review">Flag for Review</option>
                                    <option value="Require 3DS">Require 3DS</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Risk Level</label>
                                <select
                                    defaultValue={editingFilter.riskLevel}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                >
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                                <input type="checkbox" defaultChecked={editingFilter.status === 'Active'} className="h-4 w-4 rounded" />
                                Filter active
                            </label>
                        </div>

                        <div className="mt-5 flex gap-2">
                            <button
                                onClick={() => setEditingFilter(null)}
                                className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setEditingFilter(null)}
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