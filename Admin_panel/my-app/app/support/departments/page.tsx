'use client';

import {
    Plus,
    Search,
    Users,
    Ticket,
    CheckCircle2,
    Clock,
    Pencil,
    Trash2,
    MoreVertical,
    Building2,
} from 'lucide-react';
import {
    supportDepartments,
    supportDepartmentsTotalCount,
    departmentOverviewStats,
} from '@/lib/data';

const Page = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Departments
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Organize support agents into departments and track performance.
                    </p>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition">
                    <Plus size={16} />
                    New Department
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {departmentOverviewStats.map((stat) => (
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
                        {stat.change !== 0 ? (
                            <p
                                className={`text-xs mt-1 ${stat.change > 0
                                        ? 'text-emerald-600 dark:text-emerald-400'
                                        : 'text-red-500'
                                    }`}
                            >
                                {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}%{' '}
                                <span className="text-slate-400">{stat.changeLabel}</span>
                            </p>
                        ) : (
                            <p className="text-xs mt-1 text-slate-400">{stat.changeLabel}</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                <div className="relative max-w-md">
                    <Search
                        size={16}
                        className="absolute left-3 top-3 text-slate-400"
                    />
                    <input
                        placeholder="Search departments..."
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    />
                </div>
            </div>

            {/* Department Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {supportDepartments.map((dept) => (
                    <div
                        key={dept.id}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
                    >
                        {/* Top row */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-3 min-w-0">
                                <div
                                    className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${dept.color}`}
                                >
                                    <Building2 size={18} />
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                                            {dept.name}
                                        </h3>
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-[11px] font-medium shrink-0 ${dept.isActive
                                                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                                                }`}
                                        >
                                            {dept.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                                        {dept.description}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                                <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition">
                                    <Pencil size={14} />
                                </button>
                                <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition">
                                    <Trash2 size={14} />
                                </button>
                                <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                                    <MoreVertical size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Manager */}
                        <div className="flex items-center gap-2 mb-4 px-1">
                            <img
                                src={dept.managerAvatar}
                                alt={dept.manager}
                                className="w-6 h-6 rounded-full object-cover"
                            />
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Managed by{' '}
                                <span className="font-medium text-slate-700 dark:text-slate-200">
                                    {dept.manager}
                                </span>
                            </p>
                        </div>

                        {/* Mini stats */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3">
                                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                                    <Ticket size={12} />
                                    <span className="text-[11px]">Open</span>
                                </div>
                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                                    {dept.openTickets}
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3">
                                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                                    <CheckCircle2 size={12} />
                                    <span className="text-[11px]">Resolved</span>
                                </div>
                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                                    {dept.resolvedThisWeek}
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3">
                                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                                    <Clock size={12} />
                                    <span className="text-[11px]">Avg. Time</span>
                                </div>
                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                                    {dept.avgResponseTime}
                                </p>
                            </div>
                        </div>

                        {/* Agents */}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex items-center -space-x-2">
                                {dept.agents.map((agent) => (
                                    <img
                                        key={agent.name}
                                        src={agent.avatar}
                                        alt={agent.name}
                                        title={agent.name}
                                        className="w-7 h-7 rounded-full object-cover border-2 border-white dark:border-slate-900"
                                    />
                                ))}
                                {dept.agentCount > dept.agents.length && (
                                    <span className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-medium text-slate-500 dark:text-slate-400">
                                        +{dept.agentCount - dept.agents.length}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                <Users size={13} />
                                {dept.agentCount} agents
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                Showing {supportDepartments.length} of {supportDepartmentsTotalCount}{' '}
                departments
            </p>
        </div>
    );
};

export default Page;