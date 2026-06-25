'use client';

import { useState } from 'react';
import {
    Search,
    Filter,
    Calendar,
    Download,
    Ban,
    ShieldCheck,
    CheckCircle2,
    XCircle,
    ShieldOff,
} from 'lucide-react';
import {
    loginAttemptsFull,
    loginAttemptsTotalCount,
    loginAttemptResultTabs,
    loginAttemptResultBadgeStyles,
    loginAttemptOverviewStats,
    type LoginAttemptResult,
} from '@/lib/data';

const resultIconMap: Record<LoginAttemptResult, React.ElementType> = {
    Success: CheckCircle2,
    Failed: XCircle,
    Blocked: Ban,
};

const Page = () => {
    const [attempts, setAttempts] = useState(loginAttemptsFull);
    const [activeTab, setActiveTab] = useState<LoginAttemptResult | 'All'>(
        'All',
    );
    const [searchQuery, setSearchQuery] = useState('');
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2000);
    };

    const filteredAttempts = attempts.filter((a) => {
        const resultMatch = activeTab === 'All' || a.result === activeTab;
        const searchMatch =
            !searchQuery ||
            a.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.ipAddress.includes(searchQuery) ||
            a.location.toLowerCase().includes(searchQuery.toLowerCase());
        return resultMatch && searchMatch;
    });

    const toggleBlockIp = (id: string) => {
        const target = attempts.find((a) => a.id === id);
        if (!target) return;
        const newBlockedState = !target.isIpBlocked;
        setAttempts((prev) =>
            prev.map((a) =>
                a.ipAddress === target.ipAddress
                    ? { ...a, isIpBlocked: newBlockedState }
                    : a,
            ),
        );
        showToast(
            newBlockedState
                ? `IP ${target.ipAddress} blocked`
                : `IP ${target.ipAddress} unblocked`,
        );
    };

    const handleExport = () => {
        showToast(`Exporting ${filteredAttempts.length} login attempts as CSV...`);
    };

    return (
        <div className="space-y-6">
            {/* Toast */}
            {toast && (
                <div className="fixed top-5 right-5 z-50 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-xl shadow-lg">
                    {toast}
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Login Attempts
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Monitor login activity and block suspicious IP addresses.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                        <Calendar size={16} />
                        May 6 - May 12, 2025
                    </button>

                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition"
                    >
                        <Download size={16} />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {loginAttemptOverviewStats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4"
                    >
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                            {stat.label}
                        </p>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">
                            {stat.value}
                        </p>
                        <p
                            className={`text-xs mt-1 ${stat.change >= 0
                                    ? 'text-emerald-600 dark:text-emerald-400'
                                    : 'text-red-500'
                                }`}
                        >
                            {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)}%{' '}
                            <span className="text-slate-400">{stat.changeLabel}</span>
                        </p>
                    </div>
                ))}
            </div>

            {/* Main Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                {/* Top Filters */}
                <div className="p-5 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        {loginAttemptResultTabs.map((tab) => (
                            <button
                                key={tab.label}
                                onClick={() => setActiveTab(tab.result)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition whitespace-nowrap ${activeTab === tab.result
                                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                            >
                                {tab.label}
                                {tab.count !== null && (
                                    <span className="ml-1.5 text-xs opacity-70">
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                        <div className="lg:col-span-3 relative">
                            <Search
                                size={16}
                                className="absolute left-3 top-3 text-slate-400"
                            />
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by username, IP or location..."
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                            />
                        </div>

                        <button className="px-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center gap-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                            <Filter size={15} />
                            Filters
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-250">
                        <thead className="bg-slate-50 dark:bg-slate-800/50">
                            <tr className="text-left text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                <th className="px-5 py-4">User</th>
                                <th className="px-5 py-4">IP Address</th>
                                <th className="px-5 py-4">Location</th>
                                <th className="px-5 py-4">Device</th>
                                <th className="px-5 py-4">Result</th>
                                <th className="px-5 py-4">Reason</th>
                                <th className="px-5 py-4">Time</th>
                                <th className="px-5 py-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filteredAttempts.map((a) => {
                                const ResultIcon = resultIconMap[a.result];
                                return (
                                    <tr
                                        key={a.id}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={a.avatar}
                                                    alt={a.username}
                                                    className="w-8 h-8 rounded-full object-cover shrink-0"
                                                />
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">
                                                        {a.fullName}
                                                    </p>
                                                    <p className="text-xs text-slate-400 truncate">
                                                        @{a.username}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                                {a.ipAddress}
                                            </span>
                                            {a.isIpBlocked && (
                                                <span className="ml-2 inline-flex items-center gap-1 text-[11px] text-red-500">
                                                    <Ban size={10} />
                                                    Blocked
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            {a.location}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            {a.device}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium w-fit whitespace-nowrap ${loginAttemptResultBadgeStyles[a.result]}`}
                                            >
                                                <ResultIcon size={12} />
                                                {a.result}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400 max-w-50 truncate">
                                            {a.reason}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            {a.time}
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-center">
                                                <button
                                                    onClick={() => toggleBlockIp(a.id)}
                                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${a.isIpBlocked
                                                            ? 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                            : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20'
                                                        }`}
                                                >
                                                    {a.isIpBlocked ? (
                                                        <>
                                                            <ShieldCheck size={13} />
                                                            Unblock
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ShieldOff size={13} />
                                                            Block IP
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}

                            {filteredAttempts.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="px-5 py-10 text-center text-sm text-slate-400"
                                    >
                                        No login attempts match your search or filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-5 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Showing 1-{filteredAttempts.length} of{' '}
                        {loginAttemptsTotalCount.toLocaleString()} attempts
                    </p>

                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <button
                                key={num}
                                className={`w-8 h-8 rounded-lg border text-sm transition ${num === 1
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;