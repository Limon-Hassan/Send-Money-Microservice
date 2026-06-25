'use client';

import { useState, useMemo } from 'react';
import {
    Plus,
    Search,
    ChevronDown,
    Pencil,
    Trash2,
    X,
    Gauge,
    ShieldCheck,
    AlertOctagon,
    Activity,
    PauseCircle,
    PlayCircle,
} from 'lucide-react';
import {
    rateLimitStats,
    rateLimitRulesData,
    rateLimitStatusBadge,
    rateLimitStatusDot,
    rateLimitTargetBadge,
    rateLimitUtilizationColor,
    rateLimitTargetTypeOptions,
    rateLimitWindowOptions,
    type RateLimitRule,
    type RateLimitTargetType,
    type RateLimitWindow,
    type RateLimitStatus,
} from '@/lib/data';

const statIconMap = {
    total: Gauge,
    active: ShieldCheck,
    throttled: AlertOctagon,
    utilization: Activity,
} as const;

const statIconColor: Record<string, string> = {
    total: 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    active: 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400',
    throttled: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400',
    utilization: 'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
};

type ModalMode = null | 'create' | 'edit';

export default function RateLimitingPage() {
    const [rules, setRules] = useState<RateLimitRule[]>(rateLimitRulesData);
    const [searchQuery, setSearchQuery] = useState('');
    const [targetFilter, setTargetFilter] = useState<'All' | RateLimitTargetType>('All');
    const [statusFilter, setStatusFilter] = useState<'All' | RateLimitStatus>('All');
    const [toast, setToast] = useState<string | null>(null);
    const [modalMode, setModalMode] = useState<ModalMode>(null);
    const [editingRule, setEditingRule] = useState<RateLimitRule | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<RateLimitRule | null>(null);

    // form state
    const [formName, setFormName] = useState('');
    const [formTargetType, setFormTargetType] = useState<RateLimitTargetType>('API Key');
    const [formTargetLabel, setFormTargetLabel] = useState('');
    const [formLimit, setFormLimit] = useState(100);
    const [formWindow, setFormWindow] = useState<RateLimitWindow>('Per Minute');
    const [formBurst, setFormBurst] = useState(10);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const resetForm = () => {
        setFormName('');
        setFormTargetType('API Key');
        setFormTargetLabel('');
        setFormLimit(100);
        setFormWindow('Per Minute');
        setFormBurst(10);
    };

    const openCreateModal = () => {
        resetForm();
        setModalMode('create');
    };

    const openEditModal = (rule: RateLimitRule) => {
        setEditingRule(rule);
        setFormName(rule.name);
        setFormTargetType(rule.targetType);
        setFormTargetLabel(rule.targetLabel);
        setFormLimit(rule.limit);
        setFormWindow(rule.window);
        setFormBurst(rule.burstAllowance);
        setModalMode('edit');
    };

    const closeModal = () => {
        setModalMode(null);
        setEditingRule(null);
        resetForm();
    };

    const handleCreateSubmit = () => {
        if (!formName.trim() || !formTargetLabel.trim() || formLimit <= 0) {
            showToast('Please fill in name, target, and a valid limit');
            return;
        }
        const newRule: RateLimitRule = {
            id: `rl-${Date.now()}`,
            name: formName.trim(),
            targetType: formTargetType,
            targetLabel: formTargetLabel.trim(),
            limit: formLimit,
            window: formWindow,
            burstAllowance: formBurst,
            currentUsage: 0,
            status: 'Active',
            throttledToday: 0,
            createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        };
        setRules((prev) => [newRule, ...prev]);
        showToast(`Rule "${newRule.name}" created`);
        closeModal();
    };

    const handleEditSubmit = () => {
        if (!editingRule) return;
        if (!formName.trim() || !formTargetLabel.trim() || formLimit <= 0) {
            showToast('Please fill in name, target, and a valid limit');
            return;
        }
        setRules((prev) =>
            prev.map((r) =>
                r.id === editingRule.id
                    ? {
                        ...r,
                        name: formName.trim(),
                        targetType: formTargetType,
                        targetLabel: formTargetLabel.trim(),
                        limit: formLimit,
                        window: formWindow,
                        burstAllowance: formBurst,
                    }
                    : r
            )
        );
        showToast(`Rule "${formName.trim()}" updated`);
        closeModal();
    };

    const confirmDelete = () => {
        if (!deleteTarget) return;
        setRules((prev) => prev.filter((r) => r.id !== deleteTarget.id));
        showToast(`Rule "${deleteTarget.name}" deleted`);
        setDeleteTarget(null);
    };

    const handleTogglePause = (rule: RateLimitRule) => {
        const nextStatus: RateLimitStatus = rule.status === 'Active' ? 'Paused' : 'Active';
        setRules((prev) => prev.map((r) => (r.id === rule.id ? { ...r, status: nextStatus } : r)));
        showToast(`"${rule.name}" ${nextStatus === 'Active' ? 'activated' : 'paused'}`);
    };

    const filteredRules = useMemo(() => {
        return rules.filter((r) => {
            const matchesSearch = searchQuery
                ? r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.targetLabel.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            const matchesTarget = targetFilter === 'All' ? true : r.targetType === targetFilter;
            const matchesStatus = statusFilter === 'All' ? true : r.status === statusFilter;
            return matchesSearch && matchesTarget && matchesStatus;
        });
    }, [rules, searchQuery, targetFilter, statusFilter]);

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen relative">
            {/* Toast */}
            {toast && (
                <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg dark:bg-white dark:text-slate-900">
                    {toast}
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Rate Limiting</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Configure request throttling rules per key, endpoint, module, or globally.
                    </p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium w-fit"
                >
                    <Plus size={16} />
                    Add Rule
                </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {rateLimitStats.map((stat) => {
                    const Icon = statIconMap[stat.icon];
                    return (
                        <div
                            key={stat.id}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-3"
                        >
                            <span className={`p-2.5 rounded-xl ${statIconColor[stat.icon]}`}>
                                <Icon size={18} />
                            </span>
                            <div>
                                <p className="text-xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-4 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 flex-1 min-w-50">
                    <Search size={15} />
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by rule name or target..."
                        className="bg-transparent outline-none w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                    />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={targetFilter}
                        onChange={(e) => setTargetFilter(e.target.value as 'All' | RateLimitTargetType)}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Target Types</option>
                        {rateLimitTargetTypeOptions.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as 'All' | RateLimitStatus)}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Paused">Paused</option>
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
            </div>

            {/* Rules list */}
            <div className="flex flex-col gap-3">
                {filteredRules.map((rule) => {
                    const utilizationPct = Math.min(100, Math.round((rule.currentUsage / rule.limit) * 100));
                    return (
                        <div
                            key={rule.id}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center gap-4"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <p className="font-medium text-slate-800 dark:text-white text-sm">{rule.name}</p>
                                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${rateLimitTargetBadge[rule.targetType]}`}>
                                        {rule.targetType}
                                    </span>
                                    <button
                                        onClick={() => handleTogglePause(rule)}
                                        className="flex items-center gap-1.5 text-xs font-medium"
                                        title="Toggle status"
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${rateLimitStatusDot[rule.status]}`} />
                                        <span className={`px-2 py-0.5 rounded-full ${rateLimitStatusBadge[rule.status]}`}>{rule.status}</span>
                                    </button>
                                </div>
                                <p className="text-xs text-slate-400 dark:text-slate-500 font-mono truncate">{rule.targetLabel}</p>

                                <div className="mt-3 max-w-md">
                                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                                        <span>
                                            {rule.currentUsage} / {rule.limit} requests
                                        </span>
                                        <span>{utilizationPct}%</span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                        <div className={`h-full rounded-full ${rateLimitUtilizationColor(utilizationPct)}`} style={{ width: `${utilizationPct}%` }} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 text-center shrink-0">
                                <div>
                                    <p className="text-sm font-bold text-slate-800 dark:text-white">{rule.limit}</p>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500">{rule.window}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800 dark:text-white">+{rule.burstAllowance}</p>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Burst</p>
                                </div>
                                <div>
                                    <p className={`text-sm font-bold ${rule.throttledToday > 0 ? 'text-red-600 dark:text-red-400' : 'text-slate-800 dark:text-white'}`}>
                                        {rule.throttledToday}
                                    </p>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Throttled Today</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                    onClick={() => handleTogglePause(rule)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                                    aria-label="Pause/Resume"
                                >
                                    {rule.status === 'Paused' ? <PlayCircle size={16} /> : <PauseCircle size={16} />}
                                </button>
                                <button
                                    onClick={() => openEditModal(rule)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                                    aria-label="Edit rule"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button
                                    onClick={() => setDeleteTarget(rule)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                                    aria-label="Delete rule"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    );
                })}

                {filteredRules.length === 0 && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center text-slate-400 text-sm">
                        No rate limit rules match your filters.
                    </div>
                )}
            </div>

            {/* Create / Edit Modal */}
            {(modalMode === 'create' || modalMode === 'edit') && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="font-semibold text-slate-800 dark:text-white">
                                {modalMode === 'create' ? 'Add Rate Limit Rule' : 'Edit Rate Limit Rule'}
                            </h2>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-5 space-y-4">
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Rule Name</label>
                                <input
                                    value={formName}
                                    onChange={(e) => setFormName(e.target.value)}
                                    placeholder="e.g. Transaction Service Key Limit"
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Target Type</label>
                                    <select
                                        value={formTargetType}
                                        onChange={(e) => setFormTargetType(e.target.value as RateLimitTargetType)}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                    >
                                        {rateLimitTargetTypeOptions.map((t) => (
                                            <option key={t} value={t}>
                                                {t}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Target Label</label>
                                    <input
                                        value={formTargetLabel}
                                        onChange={(e) => setFormTargetLabel(e.target.value)}
                                        placeholder="e.g. KEY_xxxx or /api/v1/path"
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 font-mono"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Limit</label>
                                    <input
                                        type="number"
                                        value={formLimit}
                                        onChange={(e) => setFormLimit(Number(e.target.value))}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Window</label>
                                    <select
                                        value={formWindow}
                                        onChange={(e) => setFormWindow(e.target.value as RateLimitWindow)}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                    >
                                        {rateLimitWindowOptions.map((w) => (
                                            <option key={w} value={w}>
                                                {w}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Burst Allowance</label>
                                    <input
                                        type="number"
                                        value={formBurst}
                                        onChange={(e) => setFormBurst(Number(e.target.value))}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 p-5 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={closeModal}
                                className="text-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={modalMode === 'create' ? handleCreateSubmit : handleEditSubmit}
                                className="text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium"
                            >
                                {modalMode === 'create' ? 'Add Rule' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete confirmation modal */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm p-5">
                        <h2 className="font-semibold text-slate-800 dark:text-white mb-2">Delete Rule</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                            Are you sure you want to delete{' '}
                            <span className="font-medium text-slate-700 dark:text-slate-200">{deleteTarget.name}</span>? Traffic for this target will no
                            longer be throttled. This cannot be undone.
                        </p>
                        <div className="flex items-center justify-end gap-2">
                            <button
                                onClick={() => setDeleteTarget(null)}
                                className="text-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="text-sm px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 font-medium"
                            >
                                Delete Rule
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}