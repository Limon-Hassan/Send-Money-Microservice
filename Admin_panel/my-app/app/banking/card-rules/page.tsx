'use client';

import { useState, useMemo } from 'react';
import {
    FileText,
    CheckCircle2,
    XCircle,
    ShieldCheck,
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
    cardPaymentRules,
    cardPaymentRulesTotalCount,
    cardPaymentRuleCurrencyFilterOptions,
    bankStatusFilterOptions,
    type CardPaymentRule,
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

export default function CardPaymentRulesPage() {
    const [currencyFilter, setCurrencyFilter] = useState('All Currencies');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [editingRule, setEditingRule] = useState<CardPaymentRule | null>(null);

    const filteredRules: CardPaymentRule[] = useMemo(() => {
        return cardPaymentRules.filter((r) => {
            const matchesCurrency = currencyFilter === 'All Currencies' || r.currency === currencyFilter;
            const matchesStatus = statusFilter === 'All Status' || r.status === statusFilter;
            const matchesSearch =
                search.trim() === '' ||
                r.currency.toLowerCase().includes(search.toLowerCase()) ||
                r.appliesToGateway.toLowerCase().includes(search.toLowerCase());
            return matchesCurrency && matchesStatus && matchesSearch;
        });
    }, [currencyFilter, statusFilter, search]);

    const totalPages = Math.max(1, Math.ceil(filteredRules.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paginatedRules = filteredRules.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const activeCount = cardPaymentRules.filter((r) => r.status === 'Active').length;
    const threeDsCount = cardPaymentRules.filter((r) => r.threeDsEnabled).length;
    const avgFee = (cardPaymentRules.reduce((sum, r) => sum + r.feePercent, 0) / cardPaymentRules.length).toFixed(1);

    return (
        <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Card Payment Rules</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Set transaction limits, fees, and 3D Secure requirements by currency.
                    </p>
                </div>
                <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    <Plus size={15} /> Add New Rule
                </button>
            </div>

            {/* Stat cards */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400">
                            <FileText size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Rules</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{cardPaymentRulesTotalCount}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                            <CheckCircle2 size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Active Rules</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{activeCount}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                            <ShieldCheck size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">3DS Enabled</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{threeDsCount}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
                            <FileText size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Average Fee</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{avgFee}%</p>
                </div>
            </div>

            {/* Main table card */}
            <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-5">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">All Payment Rules</h2>

                {/* Filter bar */}
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
                    <select
                        value={currencyFilter}
                        onChange={(e) => {
                            setCurrencyFilter(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                    >
                        {cardPaymentRuleCurrencyFilterOptions.map((c) => (
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
                            placeholder="Search currency or gateway..."
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
                    <table className="min-w-[860px] w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 text-xs uppercase text-gray-500 dark:border-gray-700 dark:text-gray-400">
                                <th className="py-2 pr-4 font-medium">Currency</th>
                                <th className="py-2 pr-4 font-medium">Min Limit</th>
                                <th className="py-2 pr-4 font-medium">Max Limit</th>
                                <th className="py-2 pr-4 font-medium">Fee %</th>
                                <th className="py-2 pr-4 font-medium">Fixed Fee</th>
                                <th className="py-2 pr-4 font-medium">3DS</th>
                                <th className="py-2 pr-4 font-medium">Applies To</th>
                                <th className="py-2 pr-4 font-medium">Status</th>
                                <th className="py-2 pr-2 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {paginatedRules.map((r) => (
                                <tr key={r.id} className="text-gray-700 dark:text-gray-200">
                                    <td className="py-2.5 pr-4 font-medium text-gray-900 dark:text-white">{r.currency}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.minLimit}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.maxLimit}</td>
                                    <td className="py-2.5 pr-4">{r.feePercent}%</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.fixedFee}</td>
                                    <td className="py-2.5 pr-4">
                                        <span
                                            className={`inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white ${r.threeDsEnabled ? 'bg-green-500' : 'bg-gray-300'
                                                }`}
                                        >
                                            ✓
                                        </span>
                                    </td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.appliesToGateway}</td>
                                    <td className="py-2.5 pr-4">
                                        <StatusBadge status={r.status} />
                                    </td>
                                    <td className="relative py-2.5 pr-2 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => setEditingRule(r)}
                                                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                            >
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
                                                    Duplicate Rule
                                                </button>
                                                <button className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                                                    {r.status === 'Active' ? 'Deactivate' : 'Activate'}
                                                </button>
                                                <button className="block w-full px-3 py-1.5 text-left text-xs text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                                                    Delete Rule
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {paginatedRules.length === 0 && (
                                <tr>
                                    <td colSpan={9} className="py-6 text-center text-sm text-gray-400">
                                        No payment rules match the selected filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Showing {filteredRules.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{' '}
                        {Math.min(currentPage * pageSize, filteredRules.length)} of {cardPaymentRulesTotalCount} rules
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

            {/* Edit rule modal */}
            {editingRule && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setEditingRule(null)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md rounded-xl bg-white p-5 dark:bg-gray-800"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                Edit {editingRule.currency} payment rule
                            </h3>
                            <button
                                onClick={() => setEditingRule(null)}
                                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Min Limit</label>
                                <input
                                    defaultValue={editingRule.minLimit}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Max Limit</label>
                                <input
                                    defaultValue={editingRule.maxLimit}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Fee Percent</label>
                                <input
                                    defaultValue={editingRule.feePercent}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Fixed Fee</label>
                                <input
                                    defaultValue={editingRule.fixedFee}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Applies To Gateway</label>
                                <input
                                    defaultValue={editingRule.appliesToGateway}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                />
                            </div>
                            <label className="col-span-2 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                                <input type="checkbox" defaultChecked={editingRule.threeDsEnabled} className="h-4 w-4 rounded" />
                                Require 3D Secure
                            </label>
                        </div>

                        <div className="mt-5 flex gap-2">
                            <button
                                onClick={() => setEditingRule(null)}
                                className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setEditingRule(null)}
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