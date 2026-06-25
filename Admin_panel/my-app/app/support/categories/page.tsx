'use client';

import {
    Plus,
    Search,
    ArrowLeftRight,
    Wallet,
    ShieldCheck,
    CreditCard,
    Wrench,
    Undo2,
    HelpCircle,
    Pencil,
    Trash2,
    MoreVertical,
    Power,
} from 'lucide-react';
import {
    ticketCategoriesFull,
    ticketCategoriesTotalCount,
    ticketCategoryOverviewStats,
    ticketCategoryPriorityBadgeStyles,
} from '@/lib/data';

const iconMap: Record<string, React.ElementType> = {
    ArrowLeftRight,
    Wallet,
    ShieldCheck,
    CreditCard,
    Wrench,
    Undo2,
    HelpCircle,
};

const Page = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Ticket Categories
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Organize tickets into categories and set default SLA rules.
                    </p>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition">
                    <Plus size={16} />
                    New Category
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {ticketCategoryOverviewStats.map((stat) => (
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

            {/* Main Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                {/* Search */}
                <div className="p-5 border-b border-slate-200 dark:border-slate-800">
                    <div className="relative max-w-md">
                        <Search
                            size={16}
                            className="absolute left-3 top-3 text-slate-400"
                        />
                        <input
                            placeholder="Search categories..."
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-275">
                        <thead className="bg-slate-50 dark:bg-slate-800/50">
                            <tr className="text-left text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                <th className="px-5 py-4">Category</th>
                                <th className="px-5 py-4">Total Tickets</th>
                                <th className="px-5 py-4">Open</th>
                                <th className="px-5 py-4">Avg. Resolution</th>
                                <th className="px-5 py-4">Default Priority</th>
                                <th className="px-5 py-4">Default SLA Policy</th>
                                <th className="px-5 py-4">Status</th>
                                <th className="px-5 py-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {ticketCategoriesFull.map((cat) => {
                                const Icon = iconMap[cat.icon] ?? HelpCircle;
                                return (
                                    <tr
                                        key={cat.id}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${cat.color}`}
                                                >
                                                    <Icon size={16} />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">
                                                        {cat.name}
                                                    </p>
                                                    <p className="text-xs text-slate-400 max-w-55 truncate">
                                                        {cat.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                            {cat.totalTickets.toLocaleString()}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                            {cat.openTickets}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                            {cat.avgResolutionTime}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-xs font-medium ${ticketCategoryPriorityBadgeStyles[cat.defaultPriority]}`}
                                            >
                                                {cat.defaultPriority}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            {cat.defaultSlaPolicy}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cat.isActive
                                                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                                                    }`}
                                            >
                                                <Power size={11} />
                                                {cat.isActive ? 'Active' : 'Inactive'}
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
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between gap-4 p-5 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Showing {ticketCategoriesFull.length} of{' '}
                        {ticketCategoriesTotalCount} categories
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Page;