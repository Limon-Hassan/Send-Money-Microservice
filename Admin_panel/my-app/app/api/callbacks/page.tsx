'use client';

import { useState, useMemo } from 'react';
import {
    Plus,
    Search,
    ChevronDown,
    Pencil,
    Trash2,
    X,
    Link2,
    CheckCircle2,
    AlertTriangle,
    AppWindow,
    Copy,
    Check,
    Zap,
    Star,
} from 'lucide-react';
import {
    callbackUrlStats,
    callbackUrlsData,
    callbackUrlTypeBadge,
    callbackUrlVerificationBadge,
    callbackUrlVerificationDot,
    callbackUrlEnvBadge,
    callbackUrlTypeOptions,
    callbackUrlEnvOptions,
    callbackUrlAvailableKeys,
    type CallbackUrlRecord,
    type CallbackUrlType,
    type CallbackUrlEnvironment,
    type CallbackUrlVerificationStatus,
} from '@/lib/data';

const statIconMap = {
    total: Link2,
    verified: CheckCircle2,
    unverified: AlertTriangle,
    apps: AppWindow,
} as const;

const statIconColor: Record<string, string> = {
    total: 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    verified: 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400',
    unverified: 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    apps: 'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
};

type ModalMode = null | 'create' | 'edit';

export default function CallbackUrlsPage() {
    const [urls, setUrls] = useState<CallbackUrlRecord[]>(callbackUrlsData);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<'All' | CallbackUrlType>('All');
    const [envFilter, setEnvFilter] = useState<'All' | CallbackUrlEnvironment>('All');
    const [toast, setToast] = useState<string | null>(null);
    const [modalMode, setModalMode] = useState<ModalMode>(null);
    const [editingUrl, setEditingUrl] = useState<CallbackUrlRecord | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<CallbackUrlRecord | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [verifyingId, setVerifyingId] = useState<string | null>(null);

    // form state
    const [formUrl, setFormUrl] = useState('');
    const [formLabel, setFormLabel] = useState('');
    const [formType, setFormType] = useState<CallbackUrlType>('OAuth Redirect');
    const [formKeyId, setFormKeyId] = useState(callbackUrlAvailableKeys[0].id);
    const [formEnv, setFormEnv] = useState<CallbackUrlEnvironment>('Sandbox');

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const resetForm = () => {
        setFormUrl('');
        setFormLabel('');
        setFormType('OAuth Redirect');
        setFormKeyId(callbackUrlAvailableKeys[0].id);
        setFormEnv('Sandbox');
    };

    const openCreateModal = () => {
        resetForm();
        setModalMode('create');
    };

    const openEditModal = (url: CallbackUrlRecord) => {
        setEditingUrl(url);
        setFormUrl(url.url);
        setFormLabel(url.label);
        setFormType(url.type);
        setFormKeyId(url.associatedKeyId);
        setFormEnv(url.environment);
        setModalMode('edit');
    };

    const closeModal = () => {
        setModalMode(null);
        setEditingUrl(null);
        resetForm();
    };

    const handleCreateSubmit = () => {
        if (!formUrl.trim() || !formLabel.trim()) {
            showToast('Please fill in the URL and a label');
            return;
        }
        const keyInfo = callbackUrlAvailableKeys.find((k) => k.id === formKeyId)!;
        const newUrl: CallbackUrlRecord = {
            id: `cb-${Date.now()}`,
            url: formUrl.trim(),
            label: formLabel.trim(),
            type: formType,
            associatedKeyId: keyInfo.id,
            associatedKeyName: keyInfo.name,
            environment: formEnv,
            verificationStatus: 'Unverified',
            isDefault: false,
            lastVerifiedAt: 'Never',
            createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        };
        setUrls((prev) => [newUrl, ...prev]);
        showToast(`Callback URL "${newUrl.label}" added`);
        closeModal();
    };

    const handleEditSubmit = () => {
        if (!editingUrl) return;
        if (!formUrl.trim() || !formLabel.trim()) {
            showToast('Please fill in the URL and a label');
            return;
        }
        const keyInfo = callbackUrlAvailableKeys.find((k) => k.id === formKeyId)!;
        setUrls((prev) =>
            prev.map((u) =>
                u.id === editingUrl.id
                    ? {
                        ...u,
                        url: formUrl.trim(),
                        label: formLabel.trim(),
                        type: formType,
                        associatedKeyId: keyInfo.id,
                        associatedKeyName: keyInfo.name,
                        environment: formEnv,
                        verificationStatus: 'Unverified' as CallbackUrlVerificationStatus,
                    }
                    : u
            )
        );
        showToast(`Callback URL "${formLabel.trim()}" updated`);
        closeModal();
    };

    const confirmDelete = () => {
        if (!deleteTarget) return;
        setUrls((prev) => prev.filter((u) => u.id !== deleteTarget.id));
        showToast(`Callback URL "${deleteTarget.label}" deleted`);
        setDeleteTarget(null);
    };

    const handleCopy = (url: CallbackUrlRecord) => {
        setCopiedId(url.id);
        showToast('URL copied to clipboard');
        setTimeout(() => setCopiedId(null), 1500);
    };

    const handleVerify = (url: CallbackUrlRecord) => {
        setVerifyingId(url.id);
        setTimeout(() => {
            setVerifyingId(null);
            const willSucceed = url.verificationStatus !== 'Failed';
            setUrls((prev) =>
                prev.map((u) =>
                    u.id === url.id
                        ? {
                            ...u,
                            verificationStatus: willSucceed ? 'Verified' : 'Failed',
                            lastVerifiedAt: willSucceed ? 'Just now' : u.lastVerifiedAt,
                        }
                        : u
                )
            );
            showToast(willSucceed ? `"${url.label}" verified successfully` : `Verification failed for "${url.label}"`);
        }, 1100);
    };

    const handleSetDefault = (url: CallbackUrlRecord) => {
        setUrls((prev) =>
            prev.map((u) => (u.type === url.type && u.associatedKeyId === url.associatedKeyId ? { ...u, isDefault: u.id === url.id } : u))
        );
        showToast(`"${url.label}" set as default for ${url.type}`);
    };

    const filteredUrls = useMemo(() => {
        return urls.filter((u) => {
            const matchesSearch = searchQuery
                ? u.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
                u.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                u.associatedKeyName.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            const matchesType = typeFilter === 'All' ? true : u.type === typeFilter;
            const matchesEnv = envFilter === 'All' ? true : u.environment === envFilter;
            return matchesSearch && matchesType && matchesEnv;
        });
    }, [urls, searchQuery, typeFilter, envFilter]);

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
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Callback URLs</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage redirect and OAuth callback URLs registered for each API key.
                    </p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium w-fit"
                >
                    <Plus size={16} />
                    Add Callback URL
                </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {callbackUrlStats.map((stat) => {
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
                        placeholder="Search by URL, label, or key..."
                        className="bg-transparent outline-none w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                    />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value as 'All' | CallbackUrlType)}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Types</option>
                        {callbackUrlTypeOptions.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={envFilter}
                        onChange={(e) => setEnvFilter(e.target.value as 'All' | CallbackUrlEnvironment)}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Environments</option>
                        {callbackUrlEnvOptions.map((e) => (
                            <option key={e} value={e}>
                                {e}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
            </div>

            {/* List */}
            <div className="flex flex-col gap-3">
                {filteredUrls.map((url) => {
                    const isVerifying = verifyingId === url.id;
                    return (
                        <div key={url.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <p className="font-medium text-slate-800 dark:text-white text-sm">{url.label}</p>
                                    {url.isDefault && (
                                        <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                                            <Star size={10} fill="currentColor" /> Default
                                        </span>
                                    )}
                                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${callbackUrlTypeBadge[url.type]}`}>{url.type}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${callbackUrlEnvBadge[url.environment]}`}>{url.environment}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <code className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">{url.url}</code>
                                    <button onClick={() => handleCopy(url)} className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 shrink-0">
                                        {copiedId === url.id ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                                    </button>
                                </div>
                                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                                    Key: <span className="font-mono">{url.associatedKeyId}</span> · {url.associatedKeyName}
                                </p>
                            </div>

                            <div className="flex items-center gap-4 shrink-0">
                                <div className="text-center">
                                    <span className="flex items-center gap-1.5 text-xs font-medium whitespace-nowrap">
                                        <span className={`w-1.5 h-1.5 rounded-full ${callbackUrlVerificationDot[url.verificationStatus]}`} />
                                        <span className={`px-2 py-0.5 rounded-full ${callbackUrlVerificationBadge[url.verificationStatus]}`}>
                                            {url.verificationStatus}
                                        </span>
                                    </span>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Last verified: {url.lastVerifiedAt}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                    onClick={() => handleVerify(url)}
                                    disabled={isVerifying}
                                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-60"
                                >
                                    <Zap size={12} className={isVerifying ? 'animate-pulse' : ''} />
                                    {isVerifying ? 'Verifying...' : 'Verify'}
                                </button>
                                {!url.isDefault && (
                                    <button
                                        onClick={() => handleSetDefault(url)}
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10"
                                        aria-label="Set as default"
                                        title="Set as default"
                                    >
                                        <Star size={14} />
                                    </button>
                                )}
                                <button
                                    onClick={() => openEditModal(url)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                                    aria-label="Edit"
                                >
                                    <Pencil size={14} />
                                </button>
                                <button
                                    onClick={() => setDeleteTarget(url)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                                    aria-label="Delete"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    );
                })}

                {filteredUrls.length === 0 && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center text-slate-400 text-sm">
                        No callback URLs match your filters.
                    </div>
                )}
            </div>

            {/* Create / Edit Modal */}
            {(modalMode === 'create' || modalMode === 'edit') && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="font-semibold text-slate-800 dark:text-white">
                                {modalMode === 'create' ? 'Add Callback URL' : 'Edit Callback URL'}
                            </h2>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-5 space-y-4">
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Label</label>
                                <input
                                    value={formLabel}
                                    onChange={(e) => setFormLabel(e.target.value)}
                                    placeholder="e.g. Payment Success Redirect"
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Callback URL</label>
                                <input
                                    value={formUrl}
                                    onChange={(e) => setFormUrl(e.target.value)}
                                    placeholder="https://example.com/callback"
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 font-mono"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Type</label>
                                    <select
                                        value={formType}
                                        onChange={(e) => setFormType(e.target.value as CallbackUrlType)}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                    >
                                        {callbackUrlTypeOptions.map((t) => (
                                            <option key={t} value={t}>
                                                {t}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Environment</label>
                                    <select
                                        value={formEnv}
                                        onChange={(e) => setFormEnv(e.target.value as CallbackUrlEnvironment)}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                    >
                                        {callbackUrlEnvOptions.map((e) => (
                                            <option key={e} value={e}>
                                                {e}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Associated API Key</label>
                                <select
                                    value={formKeyId}
                                    onChange={(e) => setFormKeyId(e.target.value)}
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                >
                                    {callbackUrlAvailableKeys.map((k) => (
                                        <option key={k.id} value={k.id}>
                                            {k.name} ({k.id})
                                        </option>
                                    ))}
                                </select>
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
                                {modalMode === 'create' ? 'Add URL' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete confirmation modal */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm p-5">
                        <h2 className="font-semibold text-slate-800 dark:text-white mb-2">Delete Callback URL</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                            Are you sure you want to delete <span className="font-medium text-slate-700 dark:text-slate-200">{deleteTarget.label}</span>?
                            Redirects relying on this URL will break. This cannot be undone.
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
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}