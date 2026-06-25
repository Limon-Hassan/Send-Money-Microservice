'use client';

import { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    Mail,
    Eye,
    Pencil,
    Trash2,
    MoreVertical,
} from 'lucide-react';
import {
    supportAgentsFull,
    supportAgentsTotalCount,
    agentStatusTabs,
    agentStatusBadgeStyles,
    agentStatusDotColor,
    agentRoleOptions,
    agentDepartmentOptions,
    supportAgentOverviewStats,
    type AgentStatus,
} from '@/lib/data';

const Page = () => {
    const [activeTab, setActiveTab] = useState<AgentStatus | 'All'>('All');

    const filteredAgents =
        activeTab === 'All'
            ? supportAgentsFull
            : supportAgentsFull.filter((a) => a.status === activeTab);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Support Agents
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Manage your support team and monitor their performance.
                    </p>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition">
                    <Plus size={16} />
                    Add Agent
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {supportAgentOverviewStats.map((stat) => (
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
                {/* Top Filters */}
                <div className="p-5 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        {agentStatusTabs.map((tab) => (
                            <button
                                key={tab.label}
                                onClick={() => setActiveTab(tab.status)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition whitespace-nowrap ${activeTab === tab.status
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
                                placeholder="Search agents..."
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                            />
                        </div>

                        <select className="px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200">
                            {agentRoleOptions.map((opt) => (
                                <option key={opt}>{opt}</option>
                            ))}
                        </select>

                        <div className="flex gap-2">
                            <select className="flex-1 px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200">
                                {agentDepartmentOptions.map((opt) => (
                                    <option key={opt}>{opt}</option>
                                ))}
                            </select>

                            <button className="px-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                                <Filter size={15} />
                                Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-275">
                        <thead className="bg-slate-50 dark:bg-slate-800/50">
                            <tr className="text-left text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                <th className="px-5 py-4">Agent</th>
                                <th className="px-5 py-4">Role</th>
                                <th className="px-5 py-4">Department</th>
                                <th className="px-5 py-4">Status</th>
                                <th className="px-5 py-4">Resolved</th>
                                <th className="px-5 py-4">Avg. Response</th>
                                <th className="px-5 py-4">CSAT</th>
                                <th className="px-5 py-4">Joined</th>
                                <th className="px-5 py-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filteredAgents.map((agent) => (
                                <tr
                                    key={agent.id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative shrink-0">
                                                <img
                                                    src={agent.avatar}
                                                    alt={agent.name}
                                                    className="w-9 h-9 rounded-full object-cover"
                                                />
                                                <span
                                                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900 ${agentStatusDotColor[agent.status]}`}
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">
                                                    {agent.name}
                                                </p>
                                                <p className="text-xs text-slate-400 flex items-center gap-1 truncate">
                                                    <Mail size={11} />
                                                    {agent.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                        {agent.role}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                        {agent.department}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${agentStatusBadgeStyles[agent.status]}`}
                                        >
                                            {agent.status}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                        {agent.ticketsResolved} / {agent.ticketsAssigned}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                        {agent.avgResponseTime}
                                    </td>

                                    <td className="px-5 py-4 text-sm whitespace-nowrap">
                                        {agent.csatScore > 0 ? (
                                            <span
                                                className={`font-medium ${agent.csatScore >= 90
                                                        ? 'text-emerald-600 dark:text-emerald-400'
                                                        : agent.csatScore >= 80
                                                            ? 'text-amber-600 dark:text-amber-400'
                                                            : 'text-red-500'
                                                    }`}
                                            >
                                                {agent.csatScore}%
                                            </span>
                                        ) : (
                                            <span className="text-slate-400">-</span>
                                        )}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                        {agent.joined}
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-center gap-1">
                                            <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition">
                                                <Eye size={15} />
                                            </button>
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

                {/* Pagination */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-5 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Showing 1-{filteredAgents.length} of {supportAgentsTotalCount}{' '}
                        agents
                    </p>

                    <div className="flex items-center gap-2">
                        {[1, 2, 3].map((num) => (
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