'use client';

import { useState, useMemo } from 'react';
import {
    Plus,
    Search,
    ChevronDown,
    Pencil,
    Trash2,
    X,
    Webhook as WebhookIcon,
    ShieldCheck,
    AlertTriangle,
    Activity,
    Copy,
    Check,
    Eye,
    EyeOff,
    PauseCircle,
    PlayCircle,
    Zap,
    ChevronRight,
} from 'lucide-react';
import {
    webhooksStats,
    webhooksData,
    webhooksStatusBadge,
    webhooksStatusDot,
    webhooksEnvBadge,
    webhooksDeliveryStatusColor,
    webhooksAvailableEvents,
    webhooksEnvOptions,
    webhooksStatusOptions,
    type WebhookRecord,
    type WebhooksEnvironment,
    type WebhooksStatus,
} from '@/lib/data';

const statIconMap = {
    total: WebhookIcon,
    active: ShieldCheck,
    failing: AlertTriangle,
    rate: Activity,
} as const;

const statIconColor: Record<string, string> = {
    total: 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    active: 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400',
    failing: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400',
    rate: 'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
};

type ModalMode = null | 'create' | 'edit';

export default function WebhooksPage() {
    const [webhooks, setWebhooks] = useState<WebhookRecord[]>(webhooksData);
    const [searchQuery, setSearchQuery] = useState('');
    const [envFilter, setEnvFilter] = useState<'All' | WebhooksEnvironment>('All');
    const [statusFilter, setStatusFilter] = useState<'All' | WebhooksStatus>('All');
    const [toast, setToast] = useState<string | null>(null);
    const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [modalMode, setModalMode] = useState<ModalMode>(null);
    const [editingWebhook, setEditingWebhook] = useState<WebhookRecord | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<WebhookRecord | null>(null);
    const [detailTarget, setDetailTarget] = useState<WebhookRecord | null>(null);
    const [testingId, setTestingId] = useState<string | null>(null);

    // form state
    const [formName, setFormName] = useState('');
    const [formUrl, setFormUrl] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [formEnv, setFormEnv] = useState<WebhooksEnvironment>('Sandbox');
    const [formEvents, setFormEvents] = useState<string[]>([]);
    const [formRetry, setFormRetry] = useState(true);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const resetForm = () => {
        setFormName('');
        setFormUrl('');
        setFormDescription('');
        setFormEnv('Sandbox');
        setFormEvents([]);
        setFormRetry(true);
    };

    const openCreateModal = () => {
        resetForm();
        setModalMode('create');
    };

    const openEditModal = (wh: WebhookRecord) => {
        setEditingWebhook(wh);
        setFormName(wh.name);
        setFormUrl(wh.url);
        setFormDescription(wh.description);
        setFormEnv(wh.environment);
        setFormEvents(wh.events);
        setFormRetry(wh.retryEnabled);
        setModalMode('edit');
    };

    const closeModal = () => {
        setModalMode(null);
        setEditingWebhook(null);
        resetForm();
    };

    const toggleFormEvent = (event: string) => {
        setFormEvents((prev) => (prev.includes(event) ? prev.filter((e) => e !== event) : [...prev, event]));
    };

    const randomHex = (len: number) =>
        Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const handleCreateSubmit = () => {
        if (!formName.trim() || !formUrl.trim() || formEvents.length === 0) {
            showToast('Please fill in name, URL, and select at least one event');
            return;
        }
        const fullSecret = `whsec_${randomHex(40)}`;
        const newWebhook: WebhookRecord = {
            id: `wh-${Date.now()}`,
            name: formName.trim(),
            url: formUrl.trim(),
            description: formDescription.trim() || 'No description provided.',
            events: formEvents,
            environment: formEnv,
            status: 'Active',
            secretPreview: `whsec_${'•'.repeat(12)}${fullSecret.slice(-4)}`,
            secretFull: fullSecret,
            successRate: 100,
            totalDeliveries: 0,
            failedDeliveries: 0,
            lastTriggered: 'Never',
            createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            retryEnabled: formRetry,
            recentDeliveries: [],
        };
        setWebhooks((prev) => [newWebhook, ...prev]);
        setRevealedIds((prev) => new Set(prev).add(newWebhook.id));
        showToast(`Webhook "${newWebhook.name}" created`);
        closeModal();
    };

    const handleEditSubmit = () => {
        if (!editingWebhook) return;
        if (!formName.trim() || !formUrl.trim() || formEvents.length === 0) {
            showToast('Please fill in name, URL, and select at least one event');
            return;
        }
        setWebhooks((prev) =>
            prev.map((wh) =>
                wh.id === editingWebhook.id
                    ? {
                        ...wh,
                        name: formName.trim(),
                        url: formUrl.trim(),
                        description: formDescription.trim(),
                        environment: formEnv,
                        events: formEvents,
                        retryEnabled: formRetry,
                    }
                    : wh
            )
        );
        showToast(`Webhook "${formName.trim()}" updated`);
        closeModal();
    };

    const confirmDelete = () => {
        if (!deleteTarget) return;
        setWebhooks((prev) => prev.filter((wh) => wh.id !== deleteTarget.id));
        showToast(`Webhook "${deleteTarget.name}" deleted`);
        setDeleteTarget(null);
    };

    const toggleReveal = (id: string) => {
        setRevealedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const handleCopySecret = (wh: WebhookRecord) => {
        setCopiedId(wh.id);
        showToast('Signing secret copied');
        setTimeout(() => setCopiedId(null), 1500);
    };

    const handleTogglePause = (wh: WebhookRecord) => {
        const nextStatus: WebhooksStatus = wh.status === 'Paused' ? 'Active' : 'Paused';
        setWebhooks((prev) => prev.map((w) => (w.id === wh.id ? { ...w, status: nextStatus } : w)));
        showToast(`"${wh.name}" ${nextStatus === 'Active' ? 'resumed' : 'paused'}`);
    };

    const handleTestPing = (wh: WebhookRecord) => {
        setTestingId(wh.id);
        setTimeout(() => {
            setTestingId(null);
            const success = wh.status !== 'Failing';
            showToast(success ? `Test ping to "${wh.name}" succeeded (200 OK)` : `Test ping to "${wh.name}" failed (503)`);
            if (success && wh.status === 'Failing') {
                setWebhooks((prev) => prev.map((w) => (w.id === wh.id ? { ...w, status: 'Active' } : w)));
            }
        }, 1100);
    };

    const filteredWebhooks = useMemo(() => {
        return webhooks.filter((wh) => {
            const matchesSearch = searchQuery
                ? wh.name.toLowerCase().includes(searchQuery.toLowerCase()) || wh.url.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            const matchesEnv = envFilter === 'All' ? true : wh.environment === envFilter;
            const matchesStatus = statusFilter === 'All' ? true : wh.status === statusFilter;
            return matchesSearch && matchesEnv && matchesStatus;
        });
    }, [webhooks, searchQuery, envFilter, statusFilter]);

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
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Webhooks</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Configure outgoing webhook endpoints and monitor delivery health.
                    </p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium w-fit"
                >
                    <Plus size={16} />
                    Add Webhook
                </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {webhooksStats.map((stat) => {
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
                        placeholder="Search by name or URL..."
                        className="bg-transparent outline-none w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                    />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={envFilter}
                        onChange={(e) => setEnvFilter(e.target.value as 'All' | WebhooksEnvironment)}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Environments</option>
                        {webhooksEnvOptions.map((e) => (
                            <option key={e} value={e}>
                                {e}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as 'All' | WebhooksStatus)}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Statuses</option>
                        {webhooksStatusOptions.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
            </div>

            {/* Webhook cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredWebhooks.map((wh) => {
                    const isRevealed = revealedIds.has(wh.id);
                    const isTesting = testingId === wh.id;
                    return (
                        <div key={wh.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col gap-3">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <button onClick={() => setDetailTarget(wh)} className="font-semibold text-slate-800 dark:text-white text-sm hover:underline text-left">
                                            {wh.name}
                                        </button>
                                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${webhooksEnvBadge[wh.environment]}`}>
                                            {wh.environment}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-1 break-all">{wh.url}</p>
                                </div>
                                <button
                                    onClick={() => handleTogglePause(wh)}
                                    className="flex items-center gap-1.5 text-xs font-medium whitespace-nowrap shrink-0"
                                    title="Toggle status"
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full ${webhooksStatusDot[wh.status]}`} />
                                    <span className={`px-2 py-0.5 rounded-full ${webhooksStatusBadge[wh.status]}`}>{wh.status}</span>
                                </button>
                            </div>

                            <p className="text-xs text-slate-500 dark:text-slate-400">{wh.description}</p>

                            <div className="flex flex-wrap gap-1.5">
                                {wh.events.slice(0, 4).map((ev) => (
                                    <code key={ev} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                        {ev}
                                    </code>
                                ))}
                                {wh.events.length > 4 && (
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                        +{wh.events.length - 4} more
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2 text-xs">
                                <code className="flex-1 text-slate-400 dark:text-slate-500 font-mono truncate">
                                    {isRevealed ? wh.secretFull : wh.secretPreview}
                                </code>
                                <button onClick={() => toggleReveal(wh.id)} className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                                    {isRevealed ? <EyeOff size={13} /> : <Eye size={13} />}
                                </button>
                                <button onClick={() => handleCopySecret(wh)} className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                                    {copiedId === wh.id ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                                </button>
                            </div>

                            <div className="grid grid-cols-3 gap-2 text-center border-t border-slate-100 dark:border-slate-800 pt-3">
                                <div>
                                    <p className="text-sm font-bold text-slate-800 dark:text-white">{wh.successRate}%</p>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Success Rate</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800 dark:text-white">{wh.totalDeliveries.toLocaleString()}</p>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Total Deliveries</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800 dark:text-white">{wh.lastTriggered}</p>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Last Triggered</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-2 pt-1">
                                <button
                                    onClick={() => handleTestPing(wh)}
                                    disabled={isTesting}
                                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-60"
                                >
                                    <Zap size={13} className={isTesting ? 'animate-pulse' : ''} />
                                    {isTesting ? 'Sending...' : 'Send Test Ping'}
                                </button>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={() => handleTogglePause(wh)}
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                                        aria-label="Pause/Resume"
                                    >
                                        {wh.status === 'Paused' ? <PlayCircle size={15} /> : <PauseCircle size={15} />}
                                    </button>
                                    <button
                                        onClick={() => openEditModal(wh)}
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                                        aria-label="Edit webhook"
                                    >
                                        <Pencil size={15} />
                                    </button>
                                    <button
                                        onClick={() => setDeleteTarget(wh)}
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                                        aria-label="Delete webhook"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {filteredWebhooks.length === 0 && (
                    <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center text-slate-400 text-sm">
                        No webhooks match your filters.
                    </div>
                )}
            </div>

            {/* Detail modal with recent deliveries */}
            {detailTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="font-semibold text-slate-800 dark:text-white">{detailTarget.name}</h2>
                            <button onClick={() => setDetailTarget(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-5 space-y-4 text-sm">
                            <p className="text-slate-600 dark:text-slate-300">{detailTarget.description}</p>
                            <div>
                                <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Subscribed Events</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {detailTarget.events.map((ev) => (
                                        <code key={ev} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                            {ev}
                                        </code>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">Recent Deliveries</p>
                                <div className="space-y-2">
                                    {detailTarget.recentDeliveries.length === 0 && (
                                        <p className="text-xs text-slate-400 dark:text-slate-500">No deliveries yet.</p>
                                    )}
                                    {detailTarget.recentDeliveries.map((d) => (
                                        <div key={d.id} className="flex items-center justify-between text-xs border border-slate-100 dark:border-slate-800 rounded-lg px-3 py-2">
                                            <div className="flex items-center gap-2">
                                                <ChevronRight size={12} className="text-slate-400" />
                                                <code className="text-slate-600 dark:text-slate-300">{d.eventName}</code>
                                            </div>
                                            <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
                                                <span>{d.responseTimeMs} ms</span>
                                                <span className={`font-medium ${webhooksDeliveryStatusColor(d.success)}`}>{d.statusCode}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 p-5 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={() => {
                                    openEditModal(detailTarget);
                                    setDetailTarget(null);
                                }}
                                className="text-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                            >
                                <Pencil size={14} /> Edit
                            </button>
                            <button onClick={() => setDetailTarget(null)} className="text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create / Edit Modal */}
            {(modalMode === 'create' || modalMode === 'edit') && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="font-semibold text-slate-800 dark:text-white">
                                {modalMode === 'create' ? 'Add Webhook' : 'Edit Webhook'}
                            </h2>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-5 space-y-4">
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Name</label>
                                <input
                                    value={formName}
                                    onChange={(e) => setFormName(e.target.value)}
                                    placeholder="e.g. Core Transaction Sync"
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Endpoint URL</label>
                                <input
                                    value={formUrl}
                                    onChange={(e) => setFormUrl(e.target.value)}
                                    placeholder="https://example.com/webhooks/endpoint"
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 font-mono"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Description</label>
                                <textarea
                                    value={formDescription}
                                    onChange={(e) => setFormDescription(e.target.value)}
                                    placeholder="What does this webhook do?"
                                    rows={2}
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 resize-none"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Environment</label>
                                <select
                                    value={formEnv}
                                    onChange={(e) => setFormEnv(e.target.value as WebhooksEnvironment)}
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                >
                                    {webhooksEnvOptions.map((e) => (
                                        <option key={e} value={e}>
                                            {e}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Subscribed Events</label>
                                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1">
                                    {webhooksAvailableEvents.map((ev) => {
                                        const active = formEvents.includes(ev);
                                        return (
                                            <button
                                                key={ev}
                                                onClick={() => toggleFormEvent(ev)}
                                                className={`text-[11px] px-3 py-1.5 rounded-full border font-mono transition ${active
                                                        ? 'bg-blue-600 border-blue-600 text-white'
                                                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                    }`}
                                            >
                                                {ev}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formRetry}
                                    onChange={(e) => setFormRetry(e.target.checked)}
                                    className="rounded border-slate-300 dark:border-slate-600"
                                />
                                Automatically retry failed deliveries
                            </label>
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
                                {modalMode === 'create' ? 'Add Webhook' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete confirmation modal */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm p-5">
                        <h2 className="font-semibold text-slate-800 dark:text-white mb-2">Delete Webhook</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                            Are you sure you want to delete{' '}
                            <span className="font-medium text-slate-700 dark:text-slate-200">{deleteTarget.name}</span>? It will stop receiving event
                            deliveries immediately. This cannot be undone.
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
                                Delete Webhook
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}