'use client';

import { useState, useMemo } from 'react';
import {
    CreditCard,
    CheckCircle2,
    Globe2,
    Search,
    Filter,
    Plus,
    X,
    ShieldCheck,
    Check,
} from 'lucide-react';
import {
    cardGateways,
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

const ALL_CURRENCIES = ['GBP', 'USD', 'EUR', 'BDT', 'PKR', 'PHP', 'NGN'];

// ── Add New Gateway Modal ───────────────────────────────────────
function AddGatewayModal({ onClose, onSave }: { onClose: () => void; onSave: (gw: CardGateway) => void }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [mode, setMode] = useState<'Live' | 'Sandbox'>('Sandbox');
    const [currencies, setCurrencies] = useState<string[]>(['GBP']);
    const [feePercent, setFeePercent] = useState(2.9);
    const [feeFixed, setFeeFixed] = useState('£0.20');
    const [threeDsEnabled, setThreeDsEnabled] = useState(true);
    const [error, setError] = useState('');

    const toggleCurrency = (code: string) => {
        setCurrencies((prev) => {
            const next = prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code];
            return next.length === 0 ? prev : next;
        });
    };

    const handleSave = () => {
        if (!name.trim()) {
            setError('Gateway name is required.');
            return;
        }
        const newGateway: CardGateway = {
            id: `gw-${Date.now()}`,
            name: name.trim(),
            description: description.trim() || 'No description provided.',
            mode,
            currencies,
            feePercent: Number(feePercent) || 0,
            feeFixed,
            threeDsEnabled,
            status: 'Active',
        } as CardGateway;
        onSave(newGateway);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl dark:bg-gray-800">
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-700">
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Add New Gateway</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <X size={18} />
                    </button>
                </div>

                <div className="space-y-4 p-5">
                    {error && (
                        <div className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-900/30 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Gateway Name *</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Stripe"
                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Description</label>
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Short description of this gateway"
                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Mode</label>
                            <div className="flex gap-2">
                                {(['Live', 'Sandbox'] as const).map((m) => (
                                    <button
                                        key={m}
                                        type="button"
                                        onClick={() => setMode(m)}
                                        className={`flex-1 rounded-lg border py-1.5 text-xs font-medium transition-colors ${mode === m
                                            ? 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-950/40 dark:text-blue-400'
                                            : 'border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Fee Percent (%)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={feePercent}
                                onChange={(e) => setFeePercent(Number(e.target.value))}
                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Fixed Fee</label>
                            <input
                                value={feeFixed}
                                onChange={(e) => setFeeFixed(e.target.value)}
                                placeholder="e.g. £0.20"
                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">Supported Currencies</label>
                        <div className="flex flex-wrap gap-1.5">
                            {ALL_CURRENCIES.map((code) => (
                                <button
                                    key={code}
                                    type="button"
                                    onClick={() => toggleCurrency(code)}
                                    className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${currencies.includes(code)
                                        ? 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-950/40 dark:text-blue-400'
                                        : 'border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>
                    </div>

                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                        <input
                            type="checkbox"
                            checked={threeDsEnabled}
                            onChange={(e) => setThreeDsEnabled(e.target.checked)}
                            className="h-4 w-4 rounded"
                        />
                        Enable 3D Secure
                    </label>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-gray-100 px-5 py-4 dark:border-gray-700">
                    <button onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700">
                        <Check size={13} /> Add Gateway
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function CardGatewaysPage() {
    const [gateways, setGateways] = useState<CardGateway[]>(cardGateways);
    const [modeFilter, setModeFilter] = useState('All Modes');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [search, setSearch] = useState('');
    const [managingGateway, setManagingGateway] = useState<CardGateway | null>(null);
    const [addOpen, setAddOpen] = useState(false);
    const [toast, setToast] = useState<string | null>(null);

    // manage form state
    const [manageMode, setManageMode] = useState<'Live' | 'Sandbox'>('Sandbox');
    const [manageFeePercent, setManageFeePercent] = useState('');
    const [manageFeeFixed, setManageFeeFixed] = useState('');
    const [manageThreeDs, setManageThreeDs] = useState(false);
    const [manageActive, setManageActive] = useState(false);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const openManage = (gw: CardGateway) => {
        setManagingGateway(gw);
        setManageMode(gw.mode);
        setManageFeePercent(String(gw.feePercent));
        setManageFeeFixed(gw.feeFixed);
        setManageThreeDs(gw.threeDsEnabled);
        setManageActive(gw.status === 'Active');
    };

    const saveManage = () => {
        if (!managingGateway) return;
        setGateways((prev) =>
            prev.map((g) =>
                g.id === managingGateway.id
                    ? {
                        ...g,
                        mode: manageMode,
                        feePercent: Number(manageFeePercent) || 0,
                        feeFixed: manageFeeFixed,
                        threeDsEnabled: manageThreeDs,
                        status: manageActive ? 'Active' : 'Inactive',
                    }
                    : g
            )
        );
        showToast(`"${managingGateway.name}" updated successfully`);
        setManagingGateway(null);
    };

    const filteredGateways: CardGateway[] = useMemo(() => {
        return gateways.filter((gw) => {
            const matchesMode = modeFilter === 'All Modes' || gw.mode === modeFilter;
            const matchesStatus = statusFilter === 'All Status' || gw.status === statusFilter;
            const matchesSearch =
                search.trim() === '' ||
                gw.name.toLowerCase().includes(search.toLowerCase()) ||
                gw.currencies.some((c) => c.toLowerCase().includes(search.toLowerCase()));
            return matchesMode && matchesStatus && matchesSearch;
        });
    }, [gateways, modeFilter, statusFilter, search]);

    const activeCount = gateways.filter((g) => g.status === 'Active').length;
    const liveCount = gateways.filter((g) => g.mode === 'Live').length;
    const sandboxCount = gateways.filter((g) => g.mode === 'Sandbox').length;

    const handleAddGateway = (gw: CardGateway) => {
        setGateways((prev) => [gw, ...prev]);
        showToast(`Gateway "${gw.name}" added successfully`);
        setAddOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6">
            {/* Toast */}
            {toast && (
                <div className="fixed top-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm text-white shadow-lg dark:bg-white dark:text-gray-900">
                    <Check size={14} className="text-emerald-400 dark:text-emerald-600" />
                    {toast}
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Card Gateways</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage card payment gateway integrations and their configurations.
                    </p>
                </div>
                <button
                    onClick={() => setAddOpen(true)}
                    className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
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
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{gateways.length}</p>
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
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">All Gateways</h2>
                    <button
                        onClick={() => setAddOpen(true)}
                        className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
                    >
                        <Plus size={13} /> Add Gateway
                    </button>
                </div>

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
                    <button
                        onClick={() => showToast('Advanced filters panel would open here')}
                        className="flex items-center justify-center rounded-lg border border-gray-300 p-2 text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
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
                                onClick={() => openManage(gw)}
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

            {/* Add New Gateway Modal */}
            {addOpen && <AddGatewayModal onClose={() => setAddOpen(false)} onSave={handleAddGateway} />}

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
                                    value={manageMode}
                                    onChange={(e) => setManageMode(e.target.value as 'Live' | 'Sandbox')}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                >
                                    <option value="Live">Live</option>
                                    <option value="Sandbox">Sandbox</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Fee Percent</label>
                                <input
                                    value={manageFeePercent}
                                    onChange={(e) => setManageFeePercent(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">Fixed Fee</label>
                                <input
                                    value={manageFeeFixed}
                                    onChange={(e) => setManageFeeFixed(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                                />
                            </div>
                            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                                <input
                                    type="checkbox"
                                    checked={manageThreeDs}
                                    onChange={(e) => setManageThreeDs(e.target.checked)}
                                    className="h-4 w-4 rounded"
                                />
                                Enable 3D Secure
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                                <input
                                    type="checkbox"
                                    checked={manageActive}
                                    onChange={(e) => setManageActive(e.target.checked)}
                                    className="h-4 w-4 rounded"
                                />
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
                                onClick={saveManage}
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