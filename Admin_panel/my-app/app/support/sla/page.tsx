'use client';

import {
    Plus,
    AlertTriangle,
    Pencil,
    Trash2,
    MoreVertical,
    Power,
    TrendingUp,
    TrendingDown,
} from 'lucide-react';
import {
    slaManagementStats,
    slaPolicies,
    slaPolicyPriorityBadgeStyles,
    slaBreachAlerts,
} from '@/lib/data';

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const points = data
        .map((val, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = 100 - ((val - min) / range) * 100;
            return `${x},${y}`;
        })
        .join(' ');

    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-10">
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
};

const Page = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        SLA Management
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Define and monitor service level agreement policies.
                    </p>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition">
                    <Plus size={16} />
                    New SLA Policy
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {slaManagementStats.map((stat) => (
                    <div
                        key={stat.id}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4"
                    >
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                            {stat.label}
                        </p>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">
                            {stat.value}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                            {stat.change >= 0 ? (
                                <TrendingUp size={12} className="text-emerald-500" />
                            ) : (
                                <TrendingDown size={12} className="text-emerald-500" />
                            )}
                            <span className="text-xs text-emerald-600 dark:text-emerald-400">
                                {Math.abs(stat.change)}%
                            </span>
                            <span className="text-xs text-slate-400">
                                {stat.changeLabel}
                            </span>
                        </div>
                        <Sparkline data={stat.trend} color={stat.trendColor} />
                    </div>
                ))}
            </div>

            {/* Breach Alerts */}
            <div className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/40 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 p-5 border-b border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-500/5">
                    <AlertTriangle size={18} className="text-red-500" />
                    <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        Active SLA Breaches
                    </h2>
                    <span className="ml-auto px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold">
                        {slaBreachAlerts.length} Tickets
                    </span>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {slaBreachAlerts.map((breach) => (
                        <div
                            key={breach.id}
                            className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                                        {breach.ticketId}
                                    </span>
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${slaPolicyPriorityBadgeStyles[breach.priority]}`}
                                    >
                                        {breach.priority}
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                                        {breach.breachType} overdue
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    {breach.customerName} • Overdue by{' '}
                                    <span className="font-medium text-red-500">
                                        {breach.overdueBy}
                                    </span>
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <img
                                    src={breach.assignedAvatar}
                                    alt={breach.assignedTo}
                                    className="w-6 h-6 rounded-full object-cover"
                                />
                                <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                    {breach.assignedTo}
                                </span>
                            </div>

                            <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition whitespace-nowrap">
                                View Ticket
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* SLA Policies Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        SLA Policies
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Rules that define response and resolution time targets.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-225">
                        <thead className="bg-slate-50 dark:bg-slate-800/50">
                            <tr className="text-left text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                <th className="px-5 py-4">Policy Name</th>
                                <th className="px-5 py-4">Priority</th>
                                <th className="px-5 py-4">First Response</th>
                                <th className="px-5 py-4">Resolution Target</th>
                                <th className="px-5 py-4">Applies To</th>
                                <th className="px-5 py-4">Compliance</th>
                                <th className="px-5 py-4">Status</th>
                                <th className="px-5 py-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {slaPolicies.map((policy) => (
                                <tr
                                    key={policy.id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                                >
                                    <td className="px-5 py-4 text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">
                                        {policy.name}
                                        {policy.businessHoursOnly && (
                                            <p className="text-[11px] text-slate-400 font-normal">
                                                Business hours only
                                            </p>
                                        )}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${slaPolicyPriorityBadgeStyles[policy.priority]}`}
                                        >
                                            {policy.priority}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                        {policy.firstResponseTarget}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                        {policy.resolutionTarget}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400 max-w-50 truncate">
                                        {policy.appliesTo}
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-20 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${policy.complianceRate >= 80
                                                            ? 'bg-emerald-500'
                                                            : policy.complianceRate >= 70
                                                                ? 'bg-amber-500'
                                                                : 'bg-red-500'
                                                        }`}
                                                    style={{ width: `${policy.complianceRate}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                                {policy.complianceRate}%
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${policy.isActive
                                                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                                                }`}
                                        >
                                            <Power size={11} />
                                            {policy.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-center gap-1">
                                            <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition">
                                                <Pencil size={15} />
                                            </button>
                                            <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition">
                                                <Trash2 size={15} />
                                            </button>
                                            <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                                                <MoreVertical size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Page;