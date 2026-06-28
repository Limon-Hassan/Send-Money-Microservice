'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import {
    ShieldCheck,
    Clock,
    ShieldX,
    FileQuestion,
    Search,
    Filter,
    Download,
    Eye,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    XCircle,
    X,
} from 'lucide-react';
import {
    Chart,
    ArcElement,
    Tooltip,
    Legend,
    DoughnutController,
} from 'chart.js';
import {
    bankVerificationStatus,
    bankVerificationTotal,
    bankVerificationRecords,
    bankVerificationTotalCount,
    bankVerificationStatusFilterOptions,
    countryFilterOptions,
    type BankVerificationRecord,
} from '@/lib/data';

import { flagForCountryName } from '@/lib/countries_data';




Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

const PAGE_SIZE_OPTIONS = [10, 25, 50];

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
    const classes =
        status === 'Verified'
            ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
            : status === 'Pending'
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
                : status === 'Rejected'
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${classes}`}>
            {status}
        </span>
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
        <div className="relative mx-auto h-37.5 w-37.5">
            <canvas ref={canvasRef} />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">{bankVerificationTotal}</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Total Banks</p>
            </div>
        </div>
    );
}

export default function BankVerificationPage() {
    const [countryFilter, setCountryFilter] = useState('All Countries');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [activeRecord, setActiveRecord] = useState<BankVerificationRecord | null>(null);

    const filteredRecords: BankVerificationRecord[] = useMemo(() => {
        return bankVerificationRecords.filter((r) => {
            const matchesCountry = countryFilter === 'All Countries' || r.country === countryFilter;
            const matchesStatus = statusFilter === 'All Status' || r.status === statusFilter;
            const matchesSearch =
                search.trim() === '' ||
                r.bankName.toLowerCase().includes(search.toLowerCase()) ||
                r.swiftBic.toLowerCase().includes(search.toLowerCase());
            return matchesCountry && matchesStatus && matchesSearch;
        });
    }, [countryFilter, statusFilter, search]);

    const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paginatedRecords = filteredRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Bank Verification</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Review and verify international bank accounts before they go live.
                    </p>
                </div>
            </div>

            {/* Stat cards */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Verified', icon: <ShieldCheck size={16} />, bg: 'bg-green-100 dark:bg-green-900/40', color: 'text-green-600 dark:text-green-400', value: bankVerificationStatus[0] },
                    { label: 'Pending', icon: <Clock size={16} />, bg: 'bg-amber-100 dark:bg-amber-900/40', color: 'text-amber-600 dark:text-amber-400', value: bankVerificationStatus[1] },
                    { label: 'Rejected', icon: <ShieldX size={16} />, bg: 'bg-red-100 dark:bg-red-900/40', color: 'text-red-600 dark:text-red-400', value: bankVerificationStatus[2] },
                    { label: 'Not Submitted', icon: <FileQuestion size={16} />, bg: 'bg-gray-100 dark:bg-gray-700', color: 'text-gray-600 dark:text-gray-300', value: bankVerificationStatus[3] },
                ].map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center gap-2">
                            <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}>
                                {stat.icon}
                            </span>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                        </div>
                        <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{stat.value.count}</p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{stat.value.percent}% of total banks</p>
                    </div>
                ))}
            </div>

            {/* Main grid */}
            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                {/* Table */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-5 lg:col-span-2">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">Verification Requests</h2>

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
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setPage(1);
                            }}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                        >
                            {bankVerificationStatusFilterOptions.map((c) => (
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
                                placeholder="Search banks or SWIFT/BIC..."
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
                        <table className="min-w-190 w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 text-xs uppercase text-gray-500 dark:border-gray-700 dark:text-gray-400">
                                    <th className="py-2 pr-4 font-medium">Bank Name</th>
                                    <th className="py-2 pr-4 font-medium">Country</th>
                                    <th className="py-2 pr-4 font-medium">SWIFT / BIC</th>
                                    <th className="py-2 pr-4 font-medium">Status</th>
                                    <th className="py-2 pr-4 font-medium">Submitted</th>
                                    <th className="py-2 pr-4 font-medium">Reviewer</th>
                                    <th className="py-2 pr-2 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {paginatedRecords.map((r) => (
                                    <tr key={r.id} className="text-gray-700 dark:text-gray-200">
                                        <td className="py-2.5 pr-4 font-medium text-gray-900 dark:text-white">{r.bankName}</td>
                                        <td className="py-2.5 pr-4">
                                            <span className="flex items-center gap-1.5 whitespace-nowrap">
                                                <CountryFlag country={r.country} /> {r.country}
                                            </span>
                                        </td>
                                        <td className="py-2.5 pr-4">{r.swiftBic}</td>
                                        <td className="py-2.5 pr-4">
                                            <StatusBadge status={r.status} />
                                        </td>
                                        <td className="py-2.5 pr-4 whitespace-nowrap">{r.submittedDate}</td>
                                        <td className="py-2.5 pr-4 whitespace-nowrap">{r.reviewer ?? '—'}</td>
                                        <td className="relative py-2.5 pr-2 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => setActiveRecord(r)}
                                                    className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                                >
                                                    <Eye size={14} />
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
                                                    <button className="block w-full px-3 py-1.5 text-left text-xs text-green-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                                                        Approve
                                                    </button>
                                                    <button className="block w-full px-3 py-1.5 text-left text-xs text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                                                        Reject
                                                    </button>
                                                    <button className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                                                        Request Documents
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {paginatedRecords.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="py-6 text-center text-sm text-gray-400">
                                            No verification requests match the selected filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Showing {filteredRecords.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{' '}
                            {Math.min(currentPage * pageSize, filteredRecords.length)} of {bankVerificationTotalCount} banks
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

                {/* Sidebar: donut breakdown */}
                <div className="space-y-5">
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Status Breakdown</h2>
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
                    </div>
                </div>
            </div>

            {/* Verification detail modal */}
            {activeRecord && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setActiveRecord(null)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md rounded-xl bg-white p-5 dark:bg-gray-800"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Verification details</h3>
                            <button
                                onClick={() => setActiveRecord(null)}
                                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="mt-4 space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Bank Name</span>
                                <span className="font-medium text-gray-900 dark:text-white">{activeRecord.bankName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Country</span>
                                <span className="flex items-center gap-1.5 text-gray-700 dark:text-gray-200">
                                    <CountryFlag country={activeRecord.country} /> {activeRecord.country}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">SWIFT / BIC</span>
                                <span className="text-gray-700 dark:text-gray-200">{activeRecord.swiftBic}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Status</span>
                                <StatusBadge status={activeRecord.status} />
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Submitted Date</span>
                                <span className="text-gray-700 dark:text-gray-200">{activeRecord.submittedDate}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Verified Date</span>
                                <span className="text-gray-700 dark:text-gray-200">{activeRecord.verifiedDate ?? '—'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Reviewer</span>
                                <span className="text-gray-700 dark:text-gray-200">{activeRecord.reviewer ?? '—'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Documents Submitted</span>
                                <span className="text-gray-700 dark:text-gray-200">{activeRecord.documentsCount}</span>
                            </div>
                        </div>

                        {activeRecord.status === 'Pending' && (
                            <div className="mt-5 flex gap-2">
                                <button
                                    onClick={() => setActiveRecord(null)}
                                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-green-600 py-2 text-sm font-medium text-white hover:bg-green-700"
                                >
                                    <CheckCircle2 size={14} /> Approve
                                </button>
                                <button
                                    onClick={() => setActiveRecord(null)}
                                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-600 py-2 text-sm font-medium text-white hover:bg-red-700"
                                >
                                    <XCircle size={14} /> Reject
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}