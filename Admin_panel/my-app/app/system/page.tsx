'use client';

import { useState } from 'react';
import {
    Calendar,
    X,
    User,
    Shield,
    Code2,
    XCircle,
    ShieldAlert,
    Monitor,
    Search,
    Plus,
    Eye,
    Pencil,
    Lock,
    MoreVertical,
    Fingerprint,
    KeyRound,
    Users,
    Globe,
    AlarmClockCheck,
    AlertTriangle,
    CheckCircle2,
    Info,
    XOctagon,
} from 'lucide-react';
import {
    systemOverviewStats,
    recentAdminUsers,
    recentAdminUsersTotalCount,
    adminUserRoleFilterOptions,
    adminUserRoleBadgeStyles,
    adminUserStatusBadgeStyles,
    systemSecurityOverview,
    roleDistribution,
    roleDistributionTotal,
    apiRequestsThisWeek,
    topApiEndpointsThisWeek,
    systemHealthChecks,
    systemHealthStatusColor,
    rolePermissionMatrix,
    recentSystemActivities,
    systemAlertsRecent,
} from '@/lib/data';

const statIconMap: Record<string, React.ElementType> = {
    'active-admin-users': User,
    'total-roles': Shield,
    'api-requests-today': Code2,
    'failed-api-calls': XCircle,
    'security-alerts': ShieldAlert,
    'system-uptime': Monitor,
};

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
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-8">
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

const DonutChart = ({
    data,
    total,
}: {
    data: { label: string; count: number; percent: number; color: string }[];
    total: number;
}) => {
    const [hovered, setHovered] = useState<number | null>(null);
    let cumulative = 0;
    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    return (
        <div className="relative w-36 h-36 mx-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {data.map((d, idx) => {
                    const dash = (d.percent / 100) * circumference;
                    const offset = circumference - (cumulative / 100) * circumference;
                    cumulative += d.percent;
                    const isHovered = hovered === idx;
                    return (
                        <circle
                            key={d.label}
                            cx="50"
                            cy="50"
                            r={radius}
                            fill="none"
                            stroke={d.color}
                            strokeWidth={isHovered ? 17 : 14}
                            strokeDasharray={`${dash} ${circumference - dash}`}
                            strokeDashoffset={offset}
                            style={{
                                cursor: 'pointer',
                                opacity: hovered === null || isHovered ? 1 : 0.45,
                                transition: 'stroke-width 0.15s, opacity 0.15s',
                            }}
                            onMouseEnter={() => setHovered(idx)}
                            onMouseLeave={() => setHovered(null)}
                        />
                    );
                })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                {hovered !== null ? (
                    <>
                        <span
                            className="text-base font-bold"
                            style={{ color: data[hovered].color }}
                        >
                            {data[hovered].count}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 text-center px-2 leading-tight">
                            {data[hovered].label}
                        </span>
                        <span className="text-[10px] text-slate-400">
                            {data[hovered].percent}%
                        </span>
                    </>
                ) : (
                    <>
                        <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                            {total}
                        </span>
                        <span className="text-[11px] text-slate-400">Total Roles</span>
                    </>
                )}
            </div>
        </div>
    );
};

const alertIconMap: Record<string, { Icon: React.ElementType; color: string }> = {
    error: { Icon: XOctagon, color: 'text-red-500' },
    warning: { Icon: AlertTriangle, color: 'text-amber-500' },
    success: { Icon: CheckCircle2, color: 'text-emerald-500' },
    info: { Icon: Info, color: 'text-blue-500' },
};

const Page = () => {
    const [users, setUsers] = useState(recentAdminUsers);
    const [showAddModal, setShowAddModal] = useState(false);
    const [form, setForm] = useState({
        fullName: '',
        username: '',
        role: 'Support Agent',
        branch: '',
    });
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2000);
    };

    const handleAddUser = () => {
        if (!form.fullName.trim() || !form.username.trim()) {
            showToast('Please fill in full name and username.');
            return;
        }
        const newUser = {
            id: `usr-${Date.now()}`,
            userId: `USR-${Date.now().toString().slice(-9)}`,
            fullName: form.fullName,
            username: form.username,
            role: form.role as any,
            branch: form.branch || 'Head Office',
            status: 'Active' as const,
            lastLogin: 'Never',
            createdAt: 'Just now',
        };
        setUsers([newUser, ...users]);
        setForm({ fullName: '', username: '', role: 'Support Agent', branch: '' });
        setShowAddModal(false);
        showToast('Admin user added successfully!');
    };

    return (
        <div className="space-y-6">
            {/* Toast */}
            {toast && (
                <div className="fixed top-5 right-5 z-50 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-xl shadow-lg">
                    {toast}
                </div>
            )}

            {/* Add User Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                                Add Admin User
                            </h2>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                                    Full Name
                                </label>
                                <input
                                    value={form.fullName}
                                    onChange={(e) =>
                                        setForm({ ...form, fullName: e.target.value })
                                    }
                                    placeholder="e.g. Sadia Rahman"
                                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                                    Username
                                </label>
                                <input
                                    value={form.username}
                                    onChange={(e) =>
                                        setForm({ ...form, username: e.target.value })
                                    }
                                    placeholder="e.g. sadia.rahman"
                                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                                    Role
                                </label>
                                <select
                                    value={form.role}
                                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200"
                                >
                                    {adminUserRoleFilterOptions
                                        .filter((r) => r !== 'All Roles')
                                        .map((opt) => (
                                            <option key={opt}>{opt}</option>
                                        ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                                    Branch / Country
                                </label>
                                <input
                                    value={form.branch}
                                    onChange={(e) =>
                                        setForm({ ...form, branch: e.target.value })
                                    }
                                    placeholder="e.g. Head Office"
                                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-6">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddUser}
                                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition"
                            >
                                Add User
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        System Overview
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Manage system users, roles, settings, APIs, and security
                        configurations.
                    </p>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                    <Calendar size={16} />
                    May 6 - May 12, 2025
                </button>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                {systemOverviewStats.map((stat) => {
                    const Icon = statIconMap[stat.id] ?? Monitor;
                    const positive = stat.isInverse ? stat.change < 0 : stat.change >= 0;
                    return (
                        <div
                            key={stat.id}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: `${stat.trendColor}1A` }}
                                >
                                    <Icon size={14} style={{ color: stat.trendColor }} />
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                    {stat.label}
                                </p>
                            </div>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">
                                {stat.value}
                            </p>
                            <p
                                className={`text-[11px] mt-0.5 ${positive
                                        ? 'text-emerald-600 dark:text-emerald-400'
                                        : 'text-red-500'
                                    }`}
                            >
                                {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)}%{' '}
                                <span className="text-slate-400">{stat.changeLabel}</span>
                            </p>
                            <Sparkline data={stat.trend} color={stat.trendColor} />
                        </div>
                    );
                })}
            </div>

            {/* Recent Admin Users + Security Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
                {/* Recent Admin Users */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 p-5 border-b border-slate-200 dark:border-slate-800">
                        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                            Recent Admin Users
                        </h2>

                        <div className="flex flex-wrap items-center gap-2">
                            <select className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-xs text-slate-700 dark:text-slate-200">
                                {adminUserRoleFilterOptions.map((opt) => (
                                    <option key={opt}>{opt}</option>
                                ))}
                            </select>

                            <div className="relative">
                                <Search
                                    size={14}
                                    className="absolute left-3 top-2.5 text-slate-400"
                                />
                                <input
                                    placeholder="Search users..."
                                    className="pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-xs text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                                />
                            </div>

                            <button
                                onClick={() => setShowAddModal(true)}
                                className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-medium transition whitespace-nowrap"
                            >
                                <Plus size={14} />
                                Add User
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-225">
                            <thead className="bg-slate-50 dark:bg-slate-800/50">
                                <tr className="text-left text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    <th className="px-5 py-3">User ID</th>
                                    <th className="px-5 py-3">Full Name</th>
                                    <th className="px-5 py-3">Username</th>
                                    <th className="px-5 py-3">Role</th>
                                    <th className="px-5 py-3">Branch / Country</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3">Last Login</th>
                                    <th className="px-5 py-3">Created At</th>
                                    <th className="px-5 py-3 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {users.map((u) => (
                                    <tr
                                        key={u.id}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                                    >
                                        <td className="px-5 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">
                                            {u.userId}
                                        </td>
                                        <td className="px-5 py-3 text-sm text-slate-700 dark:text-slate-200 whitespace-nowrap">
                                            {u.fullName}
                                        </td>
                                        <td className="px-5 py-3 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            {u.username}
                                        </td>
                                        <td className="px-5 py-3">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${adminUserRoleBadgeStyles[u.role]}`}
                                            >
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                            {u.branch}
                                        </td>
                                        <td className="px-5 py-3">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-xs font-medium ${adminUserStatusBadgeStyles[u.status]}`}
                                            >
                                                {u.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            {u.lastLogin}
                                        </td>
                                        <td className="px-5 py-3 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            {u.createdAt}
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center justify-center gap-1">
                                                <button
                                                    onClick={() => showToast(`Viewing ${u.fullName}`)}
                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition"
                                                >
                                                    <Eye size={14} />
                                                </button>
                                                <button
                                                    onClick={() => showToast(`Editing ${u.fullName}`)}
                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition"
                                                >
                                                    <Pencil size={14} />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setUsers((prev) =>
                                                            prev.map((usr) =>
                                                                usr.id === u.id
                                                                    ? {
                                                                        ...usr,
                                                                        status:
                                                                            usr.status === 'Suspended'
                                                                                ? 'Active'
                                                                                : 'Suspended',
                                                                    }
                                                                    : usr,
                                                            ),
                                                        )
                                                    }
                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                                                >
                                                    <Lock size={14} />
                                                </button>
                                                <button
                                                    onClick={() => showToast(`More options for ${u.fullName}`)}
                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                                >
                                                    <MoreVertical size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 p-4 border-t border-slate-200 dark:border-slate-800">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Showing 1 to {users.length} of{' '}
                            {recentAdminUsersTotalCount} users
                        </p>
                        <div className="flex items-center gap-1.5">
                            {[1, 2, 3, 4, 5].map((n) => (
                                <button
                                    key={n}
                                    className={`w-7 h-7 rounded-lg border text-xs transition ${n === 1
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    {n}
                                </button>
                            ))}
                            <span className="text-xs text-slate-400">...</span>
                            <button className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                                16
                            </button>
                        </div>
                    </div>
                </div>

                {/* System Security Overview */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
                        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                            System Security Overview
                        </h2>
                        <button
                            onClick={() => showToast('Opening full security report...')}
                            className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            View All
                        </button>
                    </div>

                    <div className="p-4 space-y-3">
                        {systemSecurityOverview.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between gap-3 px-2 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                                        {item.id === 'sec-2fa' && <Fingerprint size={15} />}
                                        {item.id === 'sec-failed-logins' && <Lock size={15} />}
                                        {item.id === 'sec-active-sessions' && <Users size={15} />}
                                        {item.id === 'sec-ip-restrictions' && <Globe size={15} />}
                                        {item.id === 'sec-password-expiry' && <KeyRound size={15} />}
                                        {item.id === 'sec-suspicious' && <ShieldAlert size={15} />}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate">
                                            {item.label}
                                        </p>
                                        <p className="text-[11px] text-slate-400 truncate">
                                            {item.sublabel}
                                        </p>
                                    </div>
                                </div>

                                {item.type === 'ring' ? (
                                    <div className="relative w-9 h-9 shrink-0">
                                        <svg viewBox="0 0 36 36" className="w-9 h-9 -rotate-90">
                                            <circle
                                                cx="18"
                                                cy="18"
                                                r="15"
                                                fill="none"
                                                stroke="currentColor"
                                                className="text-slate-100 dark:text-slate-800"
                                                strokeWidth="4"
                                            />
                                            <circle
                                                cx="18"
                                                cy="18"
                                                r="15"
                                                fill="none"
                                                stroke="#22c55e"
                                                strokeWidth="4"
                                                strokeDasharray={`${(Number(item.value) / 100) * 94.2} 94.2`}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                            {item.value}%
                                        </span>
                                    </div>
                                ) : (
                                    <span
                                        className={`text-sm font-semibold shrink-0 ${item.numberColor}`}
                                    >
                                        {item.value}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Role Distribution + API Requests + Top Endpoints + System Health */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Role Distribution */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                    <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-4">
                        Role Distribution
                    </h2>
                    <DonutChart data={roleDistribution} total={roleDistributionTotal} />
                    <div className="mt-4 space-y-2">
                        {roleDistribution.map((r) => (
                            <div
                                key={r.label}
                                className="flex items-center justify-between text-xs rounded-lg px-1.5 py-1 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-default"
                            >
                                <div className="flex items-center gap-2 min-w-0">
                                    <span
                                        className="w-2 h-2 rounded-full shrink-0"
                                        style={{ backgroundColor: r.color }}
                                    />
                                    <span className="text-slate-600 dark:text-slate-300 truncate">
                                        {r.label}
                                    </span>
                                </div>
                                <span className="text-slate-400 shrink-0">
                                    {r.count} ({r.percent}%)
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* API Requests */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                            API Requests <span className="text-slate-400 font-normal">(This Week)</span>
                        </h2>
                    </div>
                    <svg viewBox="0 0 300 140" className="w-full h-36">
                        {(() => {
                            const max = Math.max(...apiRequestsThisWeek.requests);
                            const points = apiRequestsThisWeek.requests
                                .map((val, i) => {
                                    const x = (i / (apiRequestsThisWeek.requests.length - 1)) * 280 + 10;
                                    const y = 120 - (val / max) * 100;
                                    return `${x},${y}`;
                                })
                                .join(' ');
                            return (
                                <>
                                    <polyline
                                        points={points}
                                        fill="none"
                                        stroke="#3b82f6"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    {apiRequestsThisWeek.requests.map((val, i) => {
                                        const x = (i / (apiRequestsThisWeek.requests.length - 1)) * 280 + 10;
                                        const y = 120 - (val / max) * 100;
                                        return <circle key={i} cx={x} cy={y} r="3" fill="#3b82f6" />;
                                    })}
                                </>
                            );
                        })()}
                    </svg>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        {apiRequestsThisWeek.labels.map((l) => (
                            <span key={l}>{l}</span>
                        ))}
                    </div>
                </div>

                {/* Top API Endpoints */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                    <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-4">
                        Top API Endpoints <span className="text-slate-400 font-normal">(This Week)</span>
                    </h2>
                    <div className="space-y-3">
                        {topApiEndpointsThisWeek.map((ep) => (
                            <div key={ep.path}>
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-slate-600 dark:text-slate-300 truncate">
                                        <span className="font-semibold text-blue-600 dark:text-blue-400 mr-1">
                                            {ep.method}
                                        </span>
                                        {ep.path}
                                    </span>
                                    <span className="text-slate-400 shrink-0 ml-2">
                                        {ep.requests.toLocaleString()}
                                    </span>
                                </div>
                                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-blue-500"
                                        style={{ width: `${(ep.requests / ep.maxScale) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Health */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                            System Health
                        </h2>
                        <button
                            onClick={() => showToast('Opening system health details...')}
                            className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            View Details
                        </button>
                    </div>
                    <div className="space-y-3">
                        {systemHealthChecks.map((h) => (
                            <div
                                key={h.label}
                                className="flex items-center justify-between text-sm"
                            >
                                <span className="text-slate-600 dark:text-slate-300">
                                    {h.label}
                                </span>
                                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                                    <span
                                        className={`w-2 h-2 rounded-full ${systemHealthStatusColor[h.status]}`}
                                    />
                                    {h.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Role & Permissions + Recent Activity + Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Role & Permissions Overview */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                    <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-4">
                        Role & Permissions Overview
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-105 text-xs">
                            <thead>
                                <tr className="text-left text-slate-400">
                                    <th className="py-2 pr-2">Module</th>
                                    <th className="py-2 px-1 text-center">Super Admin</th>
                                    <th className="py-2 px-1 text-center">Admin</th>
                                    <th className="py-2 px-1 text-center">Operations</th>
                                    <th className="py-2 px-1 text-center">Finance</th>
                                    <th className="py-2 px-1 text-center">Compliance</th>
                                    <th className="py-2 px-1 text-center">Support</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {rolePermissionMatrix.map((row) => (
                                    <tr key={row.module}>
                                        <td className="py-2.5 pr-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                            {row.module}
                                        </td>
                                        {(
                                            [
                                                row.superAdmin,
                                                row.admin,
                                                row.operations,
                                                row.finance,
                                                row.compliance,
                                                row.support,
                                            ] as const
                                        ).map((level, idx) => (
                                            <td key={idx} className="py-2.5 px-1 text-center">
                                                {level === 'full' && (
                                                    <CheckCircle2
                                                        size={14}
                                                        className="text-emerald-500 inline"
                                                    />
                                                )}
                                                {level === 'view' && (
                                                    <span className="text-[10px] text-blue-500 font-medium">
                                                        View
                                                    </span>
                                                )}
                                                {level === 'none' && (
                                                    <XOctagon
                                                        size={14}
                                                        className="text-red-400 inline"
                                                    />
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button
                        onClick={() => showToast('Opening full permission matrix...')}
                        className="mt-4 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        View Full Permission Matrix →
                    </button>
                </div>

                {/* Recent System Activity */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                    <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-4">
                        Recent System Activity
                    </h2>
                    <div className="space-y-3">
                        {recentSystemActivities.map((act) => (
                            <div
                                key={act.id}
                                className="text-xs border-b border-slate-100 dark:border-slate-800 pb-2.5 last:border-0 last:pb-0"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-slate-700 dark:text-slate-200">
                                        {act.activity}
                                    </span>
                                    <span className="text-slate-400">{act.time}</span>
                                </div>
                                <p className="text-slate-400 mt-0.5">
                                    {act.user} • {act.module} • {act.ipAddress}
                                </p>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => showToast('Opening all activity logs...')}
                        className="mt-4 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        View All Activity Logs →
                    </button>
                </div>

                {/* System Alerts */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                            System Alerts
                        </h2>
                        <button
                            onClick={() => showToast('Opening all system alerts...')}
                            className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            View All
                        </button>
                    </div>
                    <div className="space-y-3">
                        {systemAlertsRecent.map((alert) => {
                            const { Icon, color } = alertIconMap[alert.type];
                            return (
                                <div key={alert.id} className="flex items-start gap-2.5 text-xs">
                                    <Icon size={15} className={`shrink-0 mt-0.5 ${color}`} />
                                    <div>
                                        <p className="text-slate-700 dark:text-slate-200">
                                            {alert.message}
                                        </p>
                                        <p className="text-slate-400 mt-0.5">{alert.timeAgo}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;