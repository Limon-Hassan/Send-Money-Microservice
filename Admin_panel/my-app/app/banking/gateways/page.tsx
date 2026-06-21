'use client';

import { useState, useMemo } from 'react';
import {
    CreditCard,
    CheckCircle2,
    XCircle,
    Globe2,
    Search,
    Filter,
    Plus,
    X,
    ShieldCheck,
} from 'lucide-react';
import {
    cardGateways,
    cardGatewaysTotalCount,
    gatewayModeFilterOptions,
    bankStatusFilterOptions,
    type CardGateway,
} from '@/lib/data';

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

function ModeBadge({ mode }: { mode: string }) {
    const classes =
        mode === 'Live'
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
            : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400';
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${classes}`}>
            {mode}
        </span>
    );
}

export default function CardGatewaysPage() {
    const [modeFilter, setModeFilter] = useState('All Modes');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [search, setSearch] = useState('');
    const [managingGateway, setManagingGateway] = useState<CardGateway | null>(null);

    const filteredGateways: CardGateway[] = useMemo(() => {
        return cardGateways.filter((gw) => {
            const matchesMode = modeFilter === 'All Modes' || gw.mode === modeFilter;
            const matchesStatus = statusFilter === 'All Status' || gw.status === statusFilter;
            const matchesSearch =
                search.trim() === '' ||
                gw.name.toLowerCase().includes(search.toLowerCase()) ||
                gw.currencies.some((c) => c.toLowerCase().includes(search.toLowerCase()));
            return matchesMode && matchesStatus && matchesSearch;
        });
    }, [modeFilter, statusFilter, search]);

    const activeCount = cardGateways.filter((g) => g.status === 'Active').length;
    const liveCount = cardGateways.filter((g) => g.mode === 'Live').length;
    const sandboxCount = cardGateways.filter((g) => g.mode === 'Sandbox').length;

    return (
        <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Card Gateways</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage card payment gateway integrations and their configurations.
                    </p>
                </div>
                <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    <Plus size={15} /> Add New Gateway
                </button>
            </div>

            {/* Stat cards */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400">
                            <CreditCard size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Gateways</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{cardGatewaysTotalCount}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                            <CheckCircle2 size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Active Gateways</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{activeCount}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                            <Globe2 size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Live Mode</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{liveCount}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
                            <ShieldCheck size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Sandbox Mode</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{sandboxCount}</p>
                </div>
            </div>

            {/* Main card */}
            <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-5">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">All Gateways</h2>

                {/* Filter bar */}
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
                    <select
                        value={modeFilter}
                        onChange={(e) => setModeFilter(e.target.value)}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                    >
                        {gatewayModeFilterOptions.map((m) => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
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
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search gateways or currencies..."
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-8 pr-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                        />
                    </div>
                    <button className="flex items-center justify-center rounded-lg border border-gray-300 p-2 text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                        <Filter size={15} />
                    </button>
                </div>

                {/* Gateway grid */}
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredGateways.map((gw) => (
                        <div key={gw.id} className="flex flex-col rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <span className="text-base font-semibold text-gray-900 dark:text-white">{gw.name}</span>
                                <StatusBadge status={gw.status} />
                            </div>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{gw.description}</p>

                            <div className="mt-3 space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                                <p className="flex items-center justify-between">
                                    <span className="text-gray-400 dark:text-gray-500">Mode:</span>
                                    <ModeBadge mode={gw.mode} />
                                </p>
                                <p className="flex justify-between gap-2">
                                    <span className="text-gray-400 dark:text-gray-500">Currencies:</span>
                                    <span className="text-right">{gw.currencies.join(', ')}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="text-gray-400 dark:text-gray-500">Fee:</span>
                                    <span>
                                        {gw.feePercent}% + {gw.feeFixed}
                                    </span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="text-gray-400 dark:text-gray-500">3DS:</span>
                                    <span
                                        className={
                                            gw.threeDsEnabled
                                                ? 'font-medium text-green-600 dark:text-green-400'
                                                : 'font-medium text-red-600 dark:text-red-400'
                                        }
                                    >
                                        {gw.threeDsEnabled ? 'Enabled' : 'Disabled'}
                                    </span>
                                </p>
                            </div>

                            <button
                                onClick={() => setManagingGateway(gw)}
                                className="mt-3 rounded-lg border border-gray-300 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                                Manage
                            </button>
                        </div>
                    ))}
                    {filteredGateways.length === 0 && (
                        <div className="col-span-full py-6 text-center text-sm text-gray-400">
                            No gateways match the selected filters.
                        </div>
                    )}
                </div>
            </div>

            {/* Manage gateway modal */}
            {managingGateway && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setManagingGateway(null)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md rounded-xl bg-white p-5 dark:bg-gray-800"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Manage {managingGateway.name}</h3>
                            <button
                                onClick={() => setManagingGateway(null)}
                                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="mt-4 space-y-3 text-sm">
                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Mode</label>
                                <select
                                    defaultValue={managingGateway.mode}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                >
                                    <option value="Live">Live</option>
                                    <option value="Sandbox">Sandbox</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Fee Percent</label>
                                <input
                                    defaultValue={managingGateway.feePercent}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Fixed Fee</label>
                                <input
                                    defaultValue={managingGateway.feeFixed}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                />
                            </div>
                            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                                <input type="checkbox" defaultChecked={managingGateway.threeDsEnabled} className="h-4 w-4 rounded" />
                                Enable 3D Secure
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                                <input type="checkbox" defaultChecked={managingGateway.status === 'Active'} className="h-4 w-4 rounded" />
                                Gateway active
                            </label>
                        </div>

                        <div className="mt-5 flex gap-2">
                            <button
                                onClick={() => setManagingGateway(null)}
                                className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setManagingGateway(null)}
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