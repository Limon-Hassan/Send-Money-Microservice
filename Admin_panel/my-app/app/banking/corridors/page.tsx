'use client';

import { useState, useMemo } from 'react';
import {
    ArrowLeftRight,
    Search,
    Filter,
    Download,
    Pencil,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    Plus,
    Landmark,
    CheckCircle2,
    XCircle,
    TrendingUp,
    X,
    Check,
} from 'lucide-react';
import {
    bankCorridors,
    corridorCountryFilterOptions,
    corridorCurrencyFilterOptions,
    bankStatusFilterOptions,
    type BankCorridor,
} from '@/lib/data';
import { flagForCountryName } from '@/lib/countries_data';




const PAGE_SIZE_OPTIONS = [10, 25, 50];

const COUNTRY_FLAGS: Record<string, string> = {
    'United Kingdom': '🇬🇧', Bangladesh: '🇧🇩', India: '🇮🇳', Pakistan: '🇵🇰',
    'United States': '🇺🇸', 'United Arab Emirates': '🇦🇪', Philippines: '🇵🇭', Nigeria: '🇳🇬',
};

function CountryFlag({ country, size = 'w-4 h-4' }: { country: string; size?: string }) {
    return (
        <img
            src={flagForCountryName(country)}
            alt={country}
            className={`${size} rounded-full object-cover inline-block shrink-0`}
        />
    );
}




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

// ── Add New Corridor Modal ───────────────────────────────────────
function AddCorridorModal({
    onClose,
    onSave,
}: {
    onClose: () => void;
    onSave: (corridor: BankCorridor) => void;
}) {
    const countries = corridorCountryFilterOptions.filter((c) => c !== 'All Countries');
    const currencies = corridorCurrencyFilterOptions.filter((c) => c !== 'All Currencies');

    const [fromCountry, setFromCountry] = useState(countries[0] ?? '');
    const [toCountry, setToCountry] = useState(countries[1] ?? countries[0] ?? '');
    const [fromCurrency, setFromCurrency] = useState(currencies[0] ?? '');
    const [toCurrency, setToCurrency] = useState(currencies[1] ?? currencies[0] ?? '');
    const [settlementBank, setSettlementBank] = useState('');
    const [feePercent, setFeePercent] = useState(1.0);
    const [dailyVolumeLimit, setDailyVolumeLimit] = useState('');
    const [isDefault, setIsDefault] = useState(false);
    const [error, setError] = useState('');

    const handleSave = () => {
        if (!settlementBank.trim() || !fromCountry || !toCountry) {
            setError('Settlement bank, from-country and to-country are required.');
            return;
        }
        const newCorridor: BankCorridor = {
            id: `corridor-${Date.now()}`,
            fromCountry,
            fromFlag: COUNTRY_FLAGS[fromCountry] ?? '🏳️',
            toCountry,
            toFlag: COUNTRY_FLAGS[toCountry] ?? '🏳️',
            fromCurrency,
            toCurrency,
            settlementBank: settlementBank.trim(),
            feePercent: Number(feePercent) || 0,
            status: 'Active',
            isDefault,
            dailyVolumeLimit: dailyVolumeLimit.trim() || '—',
        } as BankCorridor;
        onSave(newCorridor);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl dark:bg-gray-800">
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-700">
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Add New Corridor</h2>
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

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">From Country</label>
                            <select
                                value={fromCountry}
                                onChange={(e) => setFromCountry(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                            >
                                {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">To Country</label>
                            <select
                                value={toCountry}
                                onChange={(e) => setToCountry(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                            >
                                {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">From Currency</label>
                            <select
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                            >
                                {currencies.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">To Currency</label>
                            <select
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                            >
                                {currencies.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Settlement Bank *</label>
                            <input
                                value={settlementBank}
                                onChange={(e) => setSettlementBank(e.target.value)}
                                placeholder="e.g. Barclays Bank"
                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Fee (%)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={feePercent}
                                onChange={(e) => setFeePercent(Number(e.target.value))}
                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Daily Volume Limit</label>
                            <input
                                value={dailyVolumeLimit}
                                onChange={(e) => setDailyVolumeLimit(e.target.value)}
                                placeholder="e.g. £1,000,000"
                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div className="flex items-center gap-2 pt-6">
                            <button
                                type="button"
                                onClick={() => setIsDefault(!isDefault)}
                                className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${isDefault ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}
                            >
                                <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition ${isDefault ? 'translate-x-5' : 'translate-x-1'}`} />
                            </button>
                            <span className="text-xs text-gray-600 dark:text-gray-300">Set as default for this pair</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-gray-100 px-5 py-4 dark:border-gray-700">
                    <button onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700">
                        <Check size={13} /> Add Corridor
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function BankCorridorsPage() {
    const [corridors, setCorridors] = useState<BankCorridor[]>(bankCorridors);
    const [countryFilter, setCountryFilter] = useState('All Countries');
    const [currencyFilter, setCurrencyFilter] = useState('All Currencies');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [addOpen, setAddOpen] = useState(false);
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const filteredCorridors: BankCorridor[] = useMemo(() => {
        return corridors.filter((c) => {
            const matchesCountry =
                countryFilter === 'All Countries' || c.fromCountry === countryFilter || c.toCountry === countryFilter;
            const matchesCurrency =
                currencyFilter === 'All Currencies' || c.fromCurrency === currencyFilter || c.toCurrency === currencyFilter;
            const matchesStatus = statusFilter === 'All Status' || c.status === statusFilter;
            const matchesSearch =
                search.trim() === '' ||
                c.fromCountry.toLowerCase().includes(search.toLowerCase()) ||
                c.toCountry.toLowerCase().includes(search.toLowerCase()) ||
                c.settlementBank.toLowerCase().includes(search.toLowerCase());
            return matchesCountry && matchesCurrency && matchesStatus && matchesSearch;
        });
    }, [corridors, countryFilter, currencyFilter, statusFilter, search]);

    const totalPages = Math.max(1, Math.ceil(filteredCorridors.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paginatedCorridors = filteredCorridors.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const activeCount = corridors.filter((c) => c.status === 'Active').length;
    const inactiveCount = corridors.filter((c) => c.status === 'Inactive').length;
    const avgFee = (corridors.reduce((sum, c) => sum + c.feePercent, 0) / corridors.length).toFixed(1);

    const handleAddCorridor = (corridor: BankCorridor) => {
        setCorridors((prev) => [corridor, ...prev]);
        showToast(`Corridor ${corridor.fromCountry} → ${corridor.toCountry} added successfully`);
        setAddOpen(false);
    };

    const handleSetDefault = (c: BankCorridor) => {
        setCorridors((prev) =>
            prev.map((x) =>
                x.fromCurrency === c.fromCurrency && x.toCurrency === c.toCurrency ? { ...x, isDefault: x.id === c.id } : x
            )
        );
        showToast(`Corridor ${c.fromCountry} → ${c.toCountry} set as default`);
        setOpenMenuId(null);
    };

    const handleToggleStatus = (c: BankCorridor) => {
        const nextStatus = c.status === 'Active' ? 'Inactive' : 'Active';
        setCorridors((prev) => prev.map((x) => (x.id === c.id ? { ...x, status: nextStatus as BankCorridor['status'] } : x)));
        showToast(`Corridor ${c.fromCountry} → ${c.toCountry} ${nextStatus === 'Active' ? 'activated' : 'deactivated'}`);
        setOpenMenuId(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6" onClick={() => setOpenMenuId(null)}>
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
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Bank Corridors</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage international remittance corridors between countries and settlement banks.
                    </p>
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); setAddOpen(true); }}
                    className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    <Plus size={15} /> Add New Corridor
                </button>
            </div>

            {/* Stat cards */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400">
                            <ArrowLeftRight size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Corridors</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{corridors.length}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                            <CheckCircle2 size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Active Corridors</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{activeCount}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
                            <XCircle size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Inactive Corridors</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{inactiveCount}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                            <TrendingUp size={16} />
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Average Fee</p>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{avgFee}%</p>
                </div>
            </div>

            {/* Main table card */}
            <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Landmark size={16} className="text-gray-400" />
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">All Corridors</h2>
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); setAddOpen(true); }}
                        className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
                    >
                        <Plus size={13} /> Add Corridor
                    </button>
                </div>

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
                        {corridorCountryFilterOptions.map((c) => (
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
                        {corridorCurrencyFilterOptions.map((c) => (
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
                            placeholder="Search corridors..."
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-8 pr-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                        />
                    </div>
                    <button
                        onClick={() => showToast('Advanced filters panel would open here')}
                        className="flex items-center justify-center rounded-lg border border-gray-300 p-2 text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        <Filter size={15} />
                    </button>
                    <button
                        onClick={() => showToast(`Exporting ${filteredCorridors.length} corridor record(s) as CSV`)}
                        className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        <Download size={14} /> Export
                    </button>
                </div>

                {/* Table */}
                <div className="mt-4 overflow-x-auto">
                    <table className="min-w-205 w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 text-xs uppercase text-gray-500 dark:border-gray-700 dark:text-gray-400">
                                <th className="py-2 pr-4 font-medium">From</th>
                                <th className="py-2 pr-4 font-medium">To</th>
                                <th className="py-2 pr-4 font-medium">Currency Pair</th>
                                <th className="py-2 pr-4 font-medium">Settlement Bank</th>
                                <th className="py-2 pr-4 font-medium">Fee %</th>
                                <th className="py-2 pr-4 font-medium">Status</th>
                                <th className="py-2 pr-4 font-medium">Default</th>
                                <th className="py-2 pr-4 font-medium">Daily Volume Limit</th>
                                <th className="py-2 pr-2 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {paginatedCorridors.map((c) => (
                                <tr key={c.id} className="text-gray-700 dark:text-gray-200">
                                    <td className="py-2.5 pr-4">
                                        <span className="flex items-center gap-1.5 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            <CountryFlag country={c.fromCountry} /> {c.fromCountry}
                                        </span>
                                    </td>
                                    <td className="py-2.5 pr-4">
                                        <span className="flex items-center gap-1.5 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            <CountryFlag country={c.toCountry} /> {c.toCountry}
                                        </span>
                                    </td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">
                                        {c.fromCurrency} → {c.toCurrency}
                                    </td>
                                    <td className="py-2.5 pr-4">{c.settlementBank}</td>
                                    <td className="py-2.5 pr-4">{c.feePercent}%</td>
                                    <td className="py-2.5 pr-4">
                                        <StatusBadge status={c.status} />
                                    </td>
                                    <td className="py-2.5 pr-4">
                                        {c.isDefault ? (
                                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">
                                                ✓
                                            </span>
                                        ) : (
                                            <span className="text-gray-300 dark:text-gray-600">—</span>
                                        )}
                                    </td>
                                    <td className="py-2.5 pr-4 whitespace-nowrap">{c.dailyVolumeLimit}</td>
                                    <td className="relative py-2.5 pr-2 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); showToast(`Editing corridor ${c.fromCountry} → ${c.toCountry}`); }}
                                                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === c.id ? null : c.id); }}
                                                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                            >
                                                <MoreVertical size={14} />
                                            </button>
                                        </div>
                                        {openMenuId === c.id && (
                                            <div
                                                onClick={(e) => e.stopPropagation()}
                                                className="absolute right-2 top-9 z-10 w-36 rounded-lg border border-gray-200 bg-white py-1 text-left shadow-lg dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <button
                                                    onClick={() => { showToast(`Viewing details for ${c.fromCountry} → ${c.toCountry}`); setOpenMenuId(null); }}
                                                    className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                                                >
                                                    View Details
                                                </button>
                                                <button
                                                    onClick={() => handleSetDefault(c)}
                                                    className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                                                >
                                                    Set as Default
                                                </button>
                                                <button
                                                    onClick={() => handleToggleStatus(c)}
                                                    className="block w-full px-3 py-1.5 text-left text-xs text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                >
                                                    {c.status === 'Active' ? 'Deactivate' : 'Activate'}
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {paginatedCorridors.length === 0 && (
                                <tr>
                                    <td colSpan={9} className="py-6 text-center text-sm text-gray-400">
                                        No corridors match the selected filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Showing {filteredCorridors.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{' '}
                        {Math.min(currentPage * pageSize, filteredCorridors.length)} of {corridors.length} corridors
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

            {/* Add New Corridor Modal */}
            {addOpen && (
                <div onClick={(e) => e.stopPropagation()}>
                    <AddCorridorModal onClose={() => setAddOpen(false)} onSave={handleAddCorridor} />
                </div>
            )}
        </div>
    );
}