'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import {
    Landmark,
    ArrowLeftRight,
    CreditCard,
    Activity,
    ShieldAlert,
    Wallet,
    Search,
    Filter,
    Download,
    Pencil,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Plus,
    Building2,
    FileText,
    ArrowUpRight,
    ArrowDownRight,
    Globe,
} from 'lucide-react';
import {
    Chart,
    ArcElement,
    Tooltip,
    Legend,
    DoughnutController,
} from 'chart.js';
import {
    bankingCardStats,
    internationalBankAccounts,
    cardGateways,
    cardPaymentRules,
    bankVerificationStatus,
    bankVerificationTotal,
    bankVerificationList,
    topBankCorridors,
    countryFilterOptions,
    currencyFilterOptions,
    bankStatusFilterOptions,
    bankCorridors,
    corridorTotalCount,
    corridorCountryFilterOptions,
    corridorCurrencyFilterOptions,
    type InternationalBankAccount,
    type BankCorridor,
} from '@/lib/data';

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

const TABS = ['International Banks', 'Bank Corridors', 'Card Gateways', 'Card Payment Rules'] as const;
type Tab = (typeof TABS)[number];

const PAGE_SIZE_OPTIONS = [10, 25, 50];

function StatusBadge({ status }: { status: string }) {
    const isActive = status === 'Active' || status === 'Verified';
    const isPending = status === 'Pending' || status === 'Sandbox';
    const isInactive = status === 'Inactive' || status === 'Rejected';

    const classes = isActive
        ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
        : isPending
            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
            : isInactive
                ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${classes}`}>
            {status}
        </span>
    );
}

function StatCard({
    icon,
    iconBg,
    iconColor,
    label,
    value,
    change,
    changeLabel,
    linkLabel,
}: {
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    label: string;
    value: string;
    change: number;
    changeLabel: string;
    linkLabel: string;
}) {
    const positive = change >= 0;
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center gap-2">
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
                    {icon}
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            </div>
            <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
            <p
                className={`mt-1 flex items-center gap-1 text-xs font-medium ${positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}
            >
                {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {Math.abs(change)}% {changeLabel}
            </p>
            <button className="mt-3 flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400">
                {linkLabel} <ChevronRight size={12} />
            </button>
        </div>
    );
}

function VerificationDonut() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        if (chartRef.current) chartRef.current.destroy();

        chartRef.current = new Chart(canvasRef.current, {
            type: 'doughnut',
            data: {
                labels: bankVerificationStatus.map((s) => s.label),
                datasets: [
                    {
                        data: bankVerificationStatus.map((s) => s.count),
                        backgroundColor: bankVerificationStatus.map((s) => s.color),
                        borderWidth: 0,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '72%',
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true },
                },
            },
        });

        return () => {
            chartRef.current?.destroy();
        };
    }, []);

    return (
        <div className="relative mx-auto h-[140px] w-[140px]">
            <canvas ref={canvasRef} />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">{bankVerificationTotal}</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Total Banks</p>
            </div>
        </div>
    );
}

export default function BankingCardPaymentManagementPage() {
    const [activeTab, setActiveTab] = useState<Tab>('International Banks');
    const [countryFilter, setCountryFilter] = useState('All Countries');
    const [currencyFilter, setCurrencyFilter] = useState('All Currencies');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [headerCountry, setHeaderCountry] = useState('All Countries');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    // Bank Corridors tab state
    const [corridorCountryFilter, setCorridorCountryFilter] = useState('All Countries');
    const [corridorCurrencyFilter, setCorridorCurrencyFilter] = useState('All Currencies');
    const [corridorStatusFilter, setCorridorStatusFilter] = useState('All Status');
    const [corridorSearch, setCorridorSearch] = useState('');
    const [corridorPage, setCorridorPage] = useState(1);
    const [corridorPageSize, setCorridorPageSize] = useState(10);
    const [openCorridorMenuId, setOpenCorridorMenuId] = useState<string | null>(null);

    const filteredBanks: InternationalBankAccount[] = useMemo(() => {
        return internationalBankAccounts.filter((bank) => {
            const matchesCountry = countryFilter === 'All Countries' || bank.country === countryFilter;
            const matchesCurrency = currencyFilter === 'All Currencies' || bank.currency === currencyFilter;
            const matchesStatus = statusFilter === 'All Status' || bank.status === statusFilter;
            const matchesSearch =
                search.trim() === '' ||
                bank.bankName.toLowerCase().includes(search.toLowerCase()) ||
                bank.accountHolder.toLowerCase().includes(search.toLowerCase());
            return matchesCountry && matchesCurrency && matchesStatus && matchesSearch;
        });
    }, [countryFilter, currencyFilter, statusFilter, search]);

    // For display purposes we simulate a larger total (48 banks) like the design,
    // while real pagination operates on the actual filtered fake-data array.
    const totalBanksCount = 48;
    const totalPages = Math.max(1, Math.ceil(filteredBanks.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paginatedBanks = filteredBanks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const filteredCorridors: BankCorridor[] = useMemo(() => {
        return bankCorridors.filter((c) => {
            const matchesCountry =
                corridorCountryFilter === 'All Countries' ||
                c.fromCountry === corridorCountryFilter ||
                c.toCountry === corridorCountryFilter;
            const matchesCurrency =
                corridorCurrencyFilter === 'All Currencies' ||
                c.fromCurrency === corridorCurrencyFilter ||
                c.toCurrency === corridorCurrencyFilter;
            const matchesStatus = corridorStatusFilter === 'All Status' || c.status === corridorStatusFilter;
            const matchesSearch =
                corridorSearch.trim() === '' ||
                c.fromCountry.toLowerCase().includes(corridorSearch.toLowerCase()) ||
                c.toCountry.toLowerCase().includes(corridorSearch.toLowerCase()) ||
                c.settlementBank.toLowerCase().includes(corridorSearch.toLowerCase());
            return matchesCountry && matchesCurrency && matchesStatus && matchesSearch;
        });
    }, [corridorCountryFilter, corridorCurrencyFilter, corridorStatusFilter, corridorSearch]);

    const corridorTotalPages = Math.max(1, Math.ceil(filteredCorridors.length / corridorPageSize));
    const corridorCurrentPage = Math.min(corridorPage, corridorTotalPages);
    const paginatedCorridors = filteredCorridors.slice(
        (corridorCurrentPage - 1) * corridorPageSize,
        corridorCurrentPage * corridorPageSize
    );

    const statIcons = [
        { icon: <Landmark size={16} />, bg: 'bg-blue-100 dark:bg-blue-900/40', color: 'text-blue-600 dark:text-blue-400' },
        { icon: <ArrowLeftRight size={16} />, bg: 'bg-purple-100 dark:bg-purple-900/40', color: 'text-purple-600 dark:text-purple-400' },
        { icon: <CreditCard size={16} />, bg: 'bg-pink-100 dark:bg-pink-900/40', color: 'text-pink-600 dark:text-pink-400' },
        { icon: <Activity size={16} />, bg: 'bg-green-100 dark:bg-green-900/40', color: 'text-green-600 dark:text-green-400' },
        { icon: <ShieldAlert size={16} />, bg: 'bg-red-100 dark:bg-red-900/40', color: 'text-red-600 dark:text-red-400' },
        { icon: <Wallet size={16} />, bg: 'bg-violet-100 dark:bg-violet-900/40', color: 'text-violet-600 dark:text-violet-400' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                        Banking &amp; Card Payment Management
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage international banks, corridors and card payment configurations.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                        <select
                            value={headerCountry}
                            onChange={(e) => setHeaderCountry(e.target.value)}
                            className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                        >
                            {countryFilterOptions.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        <Globe size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-blue-700">
                        <Plus size={15} /> Add New Bank
                    </button>
                </div>
            </div>

            {/* Stat cards */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {bankingCardStats.map((stat, i) => (
                    <StatCard
                        key={stat.id}
                        icon={statIcons[i].icon}
                        iconBg={statIcons[i].bg}
                        iconColor={statIcons[i].color}
                        label={stat.label}
                        value={stat.value}
                        change={stat.change}
                        changeLabel={stat.changeLabel}
                        linkLabel={stat.linkLabel}
                    />
                ))}
            </div>

            {/* Tabs */}
            <div className="mt-6 flex gap-5 overflow-x-auto border-b border-gray-200 dark:border-gray-700">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`whitespace-nowrap border-b-2 pb-2.5 text-sm font-medium transition-colors ${activeTab === tab
                                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Main grid */}
            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                {/* Left / main column */}
                <div className="space-y-5 lg:col-span-2">
                    {activeTab === 'International Banks' && (
                        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-5">
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white">International Bank Accounts</h2>

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
                                <table className="min-w-[760px] w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-200 text-xs uppercase text-gray-500 dark:border-gray-700 dark:text-gray-400">
                                            <th className="py-2 pr-4 font-medium">Bank Name</th>
                                            <th className="py-2 pr-4 font-medium">Country</th>
                                            <th className="py-2 pr-4 font-medium">SWIFT / BIC</th>
                                            <th className="py-2 pr-4 font-medium">Currency</th>
                                            <th className="py-2 pr-4 font-medium">Account Holder</th>
                                            <th className="py-2 pr-4 font-medium">Status</th>
                                            <th className="py-2 pr-4 font-medium">Default</th>
                                            <th className="py-2 pr-4 font-medium">Daily Limit</th>
                                            <th className="py-2 pr-2 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {paginatedBanks.map((bank) => (
                                            <tr key={bank.id} className="text-gray-700 dark:text-gray-200">
                                                <td className="py-2.5 pr-4 font-medium text-gray-900 dark:text-white">{bank.bankName}</td>
                                                <td className="py-2.5 pr-4">
                                                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                                                        <span>{bank.countryFlag}</span> {bank.country}
                                                    </span>
                                                </td>
                                                <td className="py-2.5 pr-4">{bank.swiftBic}</td>
                                                <td className="py-2.5 pr-4">{bank.currency}</td>
                                                <td className="py-2.5 pr-4">{bank.accountHolder}</td>
                                                <td className="py-2.5 pr-4">
                                                    <StatusBadge status={bank.status} />
                                                </td>
                                                <td className="py-2.5 pr-4">
                                                    {bank.isDefault ? (
                                                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">
                                                            ✓
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-300 dark:text-gray-600">—</span>
                                                    )}
                                                </td>
                                                <td className="py-2.5 pr-4 whitespace-nowrap">{bank.dailyLimit}</td>
                                                <td className="relative py-2.5 pr-2 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                                            <Pencil size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => setOpenMenuId(openMenuId === bank.id ? null : bank.id)}
                                                            className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                                        >
                                                            <MoreVertical size={14} />
                                                        </button>
                                                    </div>
                                                    {openMenuId === bank.id && (
                                                        <div
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="absolute right-2 top-9 z-10 w-36 rounded-lg border border-gray-200 bg-white py-1 text-left shadow-lg dark:border-gray-700 dark:bg-gray-800"
                                                        >
                                                            <button className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                                                                View Details
                                                            </button>
                                                            <button className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                                                                Set as Default
                                                            </button>
                                                            <button className="block w-full px-3 py-1.5 text-left text-xs text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                                                                Deactivate
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        {paginatedBanks.length === 0 && (
                                            <tr>
                                                <td colSpan={9} className="py-6 text-center text-sm text-gray-400">
                                                    No banks match the selected filters.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Showing {filteredBanks.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{' '}
                                    {Math.min(currentPage * pageSize, filteredBanks.length)} of {totalBanksCount} banks
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
                    )}

                    {activeTab === 'Bank Corridors' && (
                        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-5">
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Bank Corridors</h2>

                            {/* Filter bar */}
                            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
                                <select
                                    value={corridorCountryFilter}
                                    onChange={(e) => {
                                        setCorridorCountryFilter(e.target.value);
                                        setCorridorPage(1);
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
                                    value={corridorCurrencyFilter}
                                    onChange={(e) => {
                                        setCorridorCurrencyFilter(e.target.value);
                                        setCorridorPage(1);
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
                                    value={corridorStatusFilter}
                                    onChange={(e) => {
                                        setCorridorStatusFilter(e.target.value);
                                        setCorridorPage(1);
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
                                        value={corridorSearch}
                                        onChange={(e) => {
                                            setCorridorSearch(e.target.value);
                                            setCorridorPage(1);
                                        }}
                                        placeholder="Search corridors..."
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
                                <table className="min-w-[820px] w-full text-left text-sm">
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
                                                        <span>{c.fromFlag}</span> {c.fromCountry}
                                                    </span>
                                                </td>
                                                <td className="py-2.5 pr-4">
                                                    <span className="flex items-center gap-1.5 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        <span>{c.toFlag}</span> {c.toCountry}
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
                                                        <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                                            <Pencil size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => setOpenCorridorMenuId(openCorridorMenuId === c.id ? null : c.id)}
                                                            className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                                        >
                                                            <MoreVertical size={14} />
                                                        </button>
                                                    </div>
                                                    {openCorridorMenuId === c.id && (
                                                        <div
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="absolute right-2 top-9 z-10 w-36 rounded-lg border border-gray-200 bg-white py-1 text-left shadow-lg dark:border-gray-700 dark:bg-gray-800"
                                                        >
                                                            <button className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                                                                View Details
                                                            </button>
                                                            <button className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                                                                Set as Default
                                                            </button>
                                                            <button className="block w-full px-3 py-1.5 text-left text-xs text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                                                                Deactivate
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
                                    Showing {filteredCorridors.length === 0 ? 0 : (corridorCurrentPage - 1) * corridorPageSize + 1} to{' '}
                                    {Math.min(corridorCurrentPage * corridorPageSize, filteredCorridors.length)} of {corridorTotalCount} corridors
                                </p>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={() => setCorridorPage((p) => Math.max(1, p - 1))}
                                        disabled={corridorCurrentPage === 1}
                                        className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-gray-500 disabled:opacity-40 dark:border-gray-600 dark:text-gray-300"
                                    >
                                        <ChevronLeft size={14} />
                                    </button>
                                    {Array.from({ length: Math.min(corridorTotalPages, 3) }, (_, i) => i + 1).map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => setCorridorPage(p)}
                                            className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-medium ${corridorCurrentPage === p
                                                    ? 'bg-blue-600 text-white'
                                                    : 'border border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-300'
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                    {corridorTotalPages > 3 && <span className="px-1 text-xs text-gray-400">...</span>}
                                    <button
                                        onClick={() => setCorridorPage((p) => Math.min(corridorTotalPages, p + 1))}
                                        disabled={corridorCurrentPage === corridorTotalPages}
                                        className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-gray-500 disabled:opacity-40 dark:border-gray-600 dark:text-gray-300"
                                    >
                                        <ChevronRight size={14} />
                                    </button>
                                    <select
                                        value={corridorPageSize}
                                        onChange={(e) => {
                                            setCorridorPageSize(Number(e.target.value));
                                            setCorridorPage(1);
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
                    )}

                    {activeTab !== 'International Banks' && activeTab !== 'Bank Corridors' && (
                        <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-gray-300 text-sm text-gray-400 dark:border-gray-700">
                            {activeTab} content goes here.
                        </div>
                    )}

                    {/* Card Payment Gateways */}
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-5">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Card Payment Gateways</h2>
                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {cardGateways.map((gw) => (
                                <div
                                    key={gw.id}
                                    className="flex flex-col rounded-lg border border-gray-200 p-3.5 dark:border-gray-700"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-base font-semibold text-gray-900 dark:text-white">{gw.name}</span>
                                        <StatusBadge status={gw.status} />
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{gw.description}</p>
                                    <div className="mt-3 space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                                        <p className="flex justify-between">
                                            <span className="text-gray-400 dark:text-gray-500">Mode:</span>
                                            <span className={gw.mode === 'Sandbox' ? 'font-medium text-amber-600 dark:text-amber-400' : 'font-medium'}>
                                                {gw.mode}
                                            </span>
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
                                            <span className={gw.threeDsEnabled ? 'font-medium text-green-600 dark:text-green-400' : 'font-medium text-red-600 dark:text-red-400'}>
                                                {gw.threeDsEnabled ? 'Enabled' : 'Disabled'}
                                            </span>
                                        </p>
                                    </div>
                                    <button className="mt-3 rounded-lg border border-gray-300 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
                                        Manage
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button className="mt-3 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400">
                            View All Gateways →
                        </button>
                    </div>

                    {/* Top Bank Corridors */}
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Top Bank Corridors</h2>
                            <button className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400">
                                View All Corridors →
                            </button>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                            {topBankCorridors.map((c) => (
                                <div key={c.id} className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                                    <p className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                                        <span>{c.fromFlag}</span>
                                        {c.fromCountry} <ArrowLeftRight size={11} className="text-gray-400" /> {c.toCountry}{' '}
                                        <span>{c.toFlag}</span>
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        {c.fromCurrency} → {c.toCurrency}
                                    </p>
                                    <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{c.volume}</p>
                                    <div className="mt-1.5">
                                        <StatusBadge status={c.status} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right sidebar */}
                <div className="space-y-5">
                    {/* Bank Verification Status */}
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Bank Verification Status</h2>
                            <button className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400">View All</button>
                        </div>

                        <VerificationDonut />

                        <div className="mt-4 space-y-2">
                            {bankVerificationStatus.map((s) => (
                                <div key={s.label} className="flex items-center justify-between text-xs">
                                    <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                                        {s.label}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400">
                                        {s.count} ({s.percent}%)
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 space-y-2.5 border-t border-gray-100 pt-3 dark:border-gray-700">
                            {bankVerificationList.map((b) => (
                                <div key={b.id} className="flex items-center justify-between text-xs">
                                    <span className="flex items-center gap-1.5 text-gray-700 dark:text-gray-200">
                                        <span>{b.countryFlag}</span> {b.bankName}
                                    </span>
                                    <StatusBadge status={b.status} />
                                </div>
                            ))}
                        </div>

                        <button className="mt-3 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400">
                            Go to Verification →
                        </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
                        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                            {[
                                { icon: <Building2 size={16} />, label: 'New Bank' },
                                { icon: <ArrowLeftRight size={16} />, label: 'New Corridor' },
                                { icon: <CreditCard size={16} />, label: 'New Gateway' },
                                { icon: <FileText size={16} />, label: 'Create Rule' },
                            ].map((action) => (
                                <button
                                    key={action.label}
                                    className="flex flex-col items-center gap-1.5 rounded-lg border border-gray-200 p-3 text-center text-[11px] text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                                        {action.icon}
                                    </span>
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Card Payment Rules Overview */}
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Card Payment Rules Overview</h2>
                            <button className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400">View All</button>
                        </div>
                        <div className="mt-3 overflow-x-auto">
                            <table className="min-w-[320px] w-full text-left text-xs">
                                <thead>
                                    <tr className="border-b border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400">
                                        <th className="py-1.5 pr-2 font-medium">Currency</th>
                                        <th className="py-1.5 pr-2 font-medium">Min</th>
                                        <th className="py-1.5 pr-2 font-medium">Max</th>
                                        <th className="py-1.5 pr-2 font-medium">Fee %</th>
                                        <th className="py-1.5 pr-2 font-medium">Fixed</th>
                                        <th className="py-1.5 pr-2 text-center font-medium">3DS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {cardPaymentRules.map((r) => (
                                        <tr key={r.id} className="text-gray-700 dark:text-gray-200">
                                            <td className="py-1.5 pr-2 font-medium">{r.currency}</td>
                                            <td className="py-1.5 pr-2">{r.minLimit}</td>
                                            <td className="py-1.5 pr-2">{r.maxLimit}</td>
                                            <td className="py-1.5 pr-2">{r.feePercent}%</td>
                                            <td className="py-1.5 pr-2">{r.fixedFee}</td>
                                            <td className="py-1.5 pr-2 text-center">
                                                <span
                                                    className={`inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white ${r.threeDsEnabled ? 'bg-green-500' : 'bg-gray-300'
                                                        }`}
                                                >
                                                    ✓
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button className="mt-3 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400">
                            Manage Payment Rules →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}