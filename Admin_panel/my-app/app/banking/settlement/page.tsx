'use client';

import { useState, useMemo } from 'react';
import {
    Settings2,
    CalendarClock,
    CheckCircle2,
    XCircle,
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
    settlementRules,
    settlementRulesTotalCount,
    countryFilterOptions,
    currencyFilterOptions,
    settlementFrequencyFilterOptions,
    bankStatusFilterOptions,
    type SettlementRule,
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

function FrequencyBadge({ frequency }: { frequency: string }) {
    const classes =
        frequency === 'Daily'
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
            : frequency === 'Weekly'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400'
                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400';
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${classes}`}>
            {frequency}
        </span>
    );
}

export default function SettlementRulesPage() {
    const [countryFilter, setCountryFilter] = useState('All Countries');
    const [currencyFilter, setCurrencyFilter] = useState('All Currencies');
    const [frequencyFilter, setFrequencyFilter] = useState('All Frequencies');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [editingRule, setEditingRule] = useState<SettlementRule | null>(null);

    const filteredRules: SettlementRule[] = useMemo(() => {
        return settlementRules.filter((r) => {
            const matchesCountry = countryFilter === 'All Countries' || r.country === countryFilter;
            const matchesCurrency = currencyFilter === 'All Currencies' || r.currency === currencyFilter;
            const matchesFrequency = frequencyFilter === 'All Frequencies' || r.frequency === frequencyFilter;
            const matchesStatus = statusFilter === 'All Status' || r.status === statusFilter;
            const matchesSearch =
                search.trim() === '' || r.bankName.toLowerCase().includes(search.toLowerCase());
            return matchesCountry && matchesCurrency && matchesFrequency && matchesStatus && matchesSearch;
        });
    }, [countryFilter, currencyFilter, frequencyFilter, statusFilter, search]);

    const totalPages = Math.max(1, Math.ceil(filteredRules.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paginatedRules = filteredRules.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const activeCount = settlementRules.filter((r) => r.status === 'Active').length;
    const autoSettleCount = settlementRules.filter((r) => r.autoSettle).length;
    const dailyCount = settlementRules.filter((r) => r.frequency === 'Daily').length;

    return (
        <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Settlement Rules</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Configure how and when funds settle with each banking partner.
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
                            <Settings2 size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Rules</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{settlementRulesTotalCount}</p>
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
                            <CalendarClock size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Daily Settlements</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{dailyCount}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
                            <Settings2 size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Auto-Settle Enabled</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{autoSettleCount}</p>
                </div>
            </div>

            {/* Main table card */}
            <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-5">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">All Settlement Rules</h2>

                {/* Filter bar */}
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
                    <select
                        value={countryFilter}
                        onChange={(e) => {
                            setCountryFilter(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                    >
                        {countryFilterOptions.map((c) => (
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
                        {currencyFilterOptions.map((c) => (
                            <option key={c} value={c}>
                                {c}
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
                        {settlementFrequencyFilterOptions.map((c) => (
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
                        {bankStatusFilterOptions.map((c) => (
                            <option key={c} value={c}>
                                {c}
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
                            placeholder="Search banks..."
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
                                <th className="py-2 pr-4 font-medium">Bank Name</th>
                                <th className="py-2 pr-4 font-medium">Country</th>
                                <th className="py-2 pr-4 font-medium">Currency</th>
                                <th className="py-2 pr-4 font-medium">Frequency</th>
                                <th className="py-2 pr-4 font-medium">Cutoff Time</th>
                                <th className="py-2 pr-4 font-medium">Min. Amount</th>
                                <th className="py-2 pr-4 font-medium">Auto-Settle</th>
                                <th className="py-2 pr-4 font-medium">Status</th>
                                <th className="py-2 pr-2 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {paginatedRules.map((r) => (
                                <tr key={r.id} className="text-gray-700 dark:text-gray-200">
                                    <td className="py-2.5 pr-4 font-medium text-gray-900 dark:text-white">{r.bankName}</td>
                                    <td className="py-2.5 pr-4">
                                        <span className="flex items-center gap-1.5 whitespace-nowrap">
                                            <span>{r.countryFlag}</span> {r.country}
                                        </span>
                                    </td>
                                    <td className="py-2.5 pr-4">{r.currency}</td>
                                    <td className="py-2.5 pr-4">
                                        <FrequencyBadge frequency={r.frequency} />
                                    </td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.cutoffTime}</td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{r.minSettlementAmount}</td>
                                    <td className="py-2.5 pr-4">
                                        {r.autoSettle ? (
                                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">
                                                ✓
                                            </span>
                                        ) : (
                                            <span className="text-gray-300 dark:text-gray-600">—</span>
                                        )}
                                    </td>
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
                                                    View History
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
                                        No settlement rules match the selected filters.
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
                        {Math.min(currentPage * pageSize, filteredRules.length)} of {settlementRulesTotalCount} rules
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
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Edit settlement rule</h3>
                            <button
                                onClick={() => setEditingRule(null)}
                                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="mt-4 space-y-3 text-sm">
                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Bank</label>
                                <input
                                    defaultValue={editingRule.bankName}
                                    disabled
                                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-gray-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Frequency</label>
                                <select
                                    defaultValue={editingRule.frequency}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                >
                                    {settlementFrequencyFilterOptions.filter((f) => f !== 'All Frequencies').map((f) => (
                                        <option key={f} value={f}>
                                            {f}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Cutoff Time</label>
                                <input
                                    defaultValue={editingRule.cutoffTime}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Minimum Settlement Amount</label>
                                <input
                                    defaultValue={editingRule.minSettlementAmount}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                />
                            </div>
                            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                                <input type="checkbox" defaultChecked={editingRule.autoSettle} className="h-4 w-4 rounded" />
                                Enable auto-settle
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