'use client';

import { useState } from 'react';
import {
    Search,
    Filter,
    Download,
    ChevronDown,
    Calendar,
    AlertCircle,
    Info,
    AlertTriangle,
} from 'lucide-react';
import {
    activityLogsFull,
    activityLogsTotalCount,
    activityLogModuleOptions,
    activityLogSeverityTabs,
    activityLogSeverityBadgeStyles,
    activityLogModuleBadgeStyles,
    activityLogOverviewStats,
    type ActivityLogSeverity,
} from '@/lib/data';

const severityIconMap: Record<ActivityLogSeverity, React.ElementType> = {
    info: Info,
    warning: AlertTriangle,
    critical: AlertCircle,
};

const Page = () => {
    const [activeTab, setActiveTab] = useState<ActivityLogSeverity | 'All'>(
        'All',
    );
    const [moduleFilter, setModuleFilter] = useState('All Modules');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2000);
    };

    const filteredLogs = activityLogsFull.filter((log) => {
        const severityMatch = activeTab === 'All' || log.severity === activeTab;
        const moduleMatch =
            moduleFilter === 'All Modules' || log.module === moduleFilter;
        const searchMatch =
            !searchQuery ||
            log.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.ipAddress.includes(searchQuery);
        return severityMatch && moduleMatch && searchMatch;
    });

    const handleExport = () => {
        showToast(`Exporting ${filteredLogs.length} log entries as CSV...`);
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
                        Activity Logs
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Track every action taken across the admin platform.
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
                {activityLogOverviewStats.map((stat) => (
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
                        {activityLogSeverityTabs.map((tab) => (
                            <button
                                key={tab.label}
                                onClick={() => setActiveTab(tab.severity)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition whitespace-nowrap ${activeTab === tab.severity
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
                        <div className="lg:col-span-2 relative">
                            <Search
                                size={16}
                                className="absolute left-3 top-3 text-slate-400"
                            />
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by activity, user or IP..."
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                            />
                        </div>

                        <select
                            value={moduleFilter}
                            onChange={(e) => setModuleFilter(e.target.value)}
                            className="px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200"
                        >
                            {activityLogModuleOptions.map((opt) => (
                                <option key={opt}>{opt}</option>
                            ))}
                        </select>

                        <button className="px-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center gap-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                            <Filter size={15} />
                            Filters
                        </button>
                    </div>
                </div>

                {/* Logs List */}
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredLogs.map((log) => {
                        const isExpanded = expandedLogId === log.id;
                        const SeverityIcon = severityIconMap[log.severity];
                        return (
                            <div key={log.id}>
                                <button
                                    onClick={() =>
                                        setExpandedLogId(isExpanded ? null : log.id)
                                    }
                                    className="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                                >
                                    <img
                                        src={log.userAvatar}
                                        alt={log.user}
                                        className="w-9 h-9 rounded-full object-cover shrink-0"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                                {log.activity}
                                            </p>
                                            <span
                                                className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${activityLogModuleBadgeStyles[log.module]}`}
                                            >
                                                {log.module}
                                            </span>
                                            <span
                                                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${activityLogSeverityBadgeStyles[log.severity]}`}
                                            >
                                                <SeverityIcon size={10} />
                                                {log.severity}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            {log.user} • {log.ipAddress} • {log.time}
                                        </p>
                                    </div>

                                    <ChevronDown
                                        size={16}
                                        className={`text-slate-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                {isExpanded && (
                                    <div className="px-4 pb-4 pl-17">
                                        <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4 text-xs text-slate-500 dark:text-slate-400 space-y-1.5">
                                            <p>
                                                <span className="font-medium text-slate-600 dark:text-slate-300">
                                                    Details:
                                                </span>{' '}
                                                {log.details}
                                            </p>
                                            <p>
                                                <span className="font-medium text-slate-600 dark:text-slate-300">
                                                    Device:
                                                </span>{' '}
                                                {log.device}
                                            </p>
                                            <p>
                                                <span className="font-medium text-slate-600 dark:text-slate-300">
                                                    IP Address:
                                                </span>{' '}
                                                {log.ipAddress}
                                            </p>
                                            <p>
                                                <span className="font-medium text-slate-600 dark:text-slate-300">
                                                    Timestamp:
                                                </span>{' '}
                                                {log.time}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {filteredLogs.length === 0 && (
                        <div className="p-10 text-center text-sm text-slate-400">
                            No activity logs match your search or filters.
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-5 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Showing 1-{filteredLogs.length} of{' '}
                        {activityLogsTotalCount.toLocaleString()} log entries
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