'use client';

import { useState, useMemo } from 'react';
import {
    Plus,
    Search,
    ChevronDown,
    Eye,
    EyeOff,
    Copy,
    Check,
    Pencil,
    Ban,
    PlayCircle,
    Trash2,
    X,
    KeyRound,
    ShieldCheck,
    Server,
    FlaskConical,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import {
    apiKeysStats,
    apiKeysData,
    apiKeysStatusBadge,
    apiKeysEnvBadge,
    apiKeysStatusDot,
    apiKeysAvailableModules,
    apiKeysRateLimitOptions,
    type ApiKeyRecord,
    type ApiKeysEnvironment,
    type ApiKeysStatus,
} from '@/lib/data';

const statIconMap = {
    total: KeyRound,
    active: ShieldCheck,
    production: Server,
    sandbox: FlaskConical,
} as const;

const statIconColor: Record<string, string> = {
    total: 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    active: 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400',
    production: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
    sandbox: 'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
};

type ModalMode = null | 'generate' | 'edit';

export default function ApiKeysPage() {
    const [keys, setKeys] = useState<ApiKeyRecord[]>(apiKeysData);
    const [searchQuery, setSearchQuery] = useState('');
    const [envFilter, setEnvFilter] = useState<'All' | ApiKeysEnvironment>('All');
    const [statusFilter, setStatusFilter] = useState<'All' | ApiKeysStatus>('All');
    const [toast, setToast] = useState<string | null>(null);
    const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [modalMode, setModalMode] = useState<ModalMode>(null);
    const [editingKey, setEditingKey] = useState<ApiKeyRecord | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<ApiKeyRecord | null>(null);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    // form state for generate/edit modal
    const [formName, setFormName] = useState('');
    const [formOwner, setFormOwner] = useState('');
    const [formEnv, setFormEnv] = useState<ApiKeysEnvironment>('Sandbox');
    const [formRateLimit, setFormRateLimit] = useState(apiKeysRateLimitOptions[0]);
    const [formModules, setFormModules] = useState<string[]>([]);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const resetForm = () => {
        setFormName('');
        setFormOwner('');
        setFormEnv('Sandbox');
        setFormRateLimit(apiKeysRateLimitOptions[0]);
        setFormModules([]);
    };

    const openGenerateModal = () => {
        resetForm();
        setModalMode('generate');
    };

    const openEditModal = (key: ApiKeyRecord) => {
        setEditingKey(key);
        setFormName(key.keyName);
        setFormOwner(key.owner);
        setFormEnv(key.environment);
        setFormRateLimit(key.rateLimit);
        setFormModules(key.moduleAccess);
        setModalMode('edit');
        setOpenMenuId(null);
    };

    const closeModal = () => {
        setModalMode(null);
        setEditingKey(null);
        resetForm();
    };

    const toggleFormModule = (name: string) => {
        setFormModules((prev) => (prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name]));
    };

    const randomHex = (len: number) =>
        Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const handleGenerateSubmit = () => {
        if (!formName.trim() || !formOwner.trim() || formModules.length === 0) {
            showToast('Please fill in name, owner, and at least one module');
            return;
        }
        const prefix = formEnv === 'Production' ? 'sk_live_' : 'sk_test_';
        const fullSecret = prefix + randomHex(40);
        const newKey: ApiKeyRecord = {
            id: `akr-${Date.now()}`,
            keyId: `KEY_${randomHex(10)}`,
            keyName: formName.trim(),
            owner: formOwner.trim(),
            ownerAvatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 50) + 1}`,
            moduleAccess: formModules,
            environment: formEnv,
            status: 'Active',
            rateLimit: formRateLimit,
            lastUsed: 'Never',
            createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            expiresAt: null,
            secretPreview: `${prefix}${'•'.repeat(12)}${fullSecret.slice(-4)}`,
            secretFull: fullSecret,
            totalRequests: 0,
        };
        setKeys((prev) => [newKey, ...prev]);
        setRevealedIds((prev) => new Set(prev).add(newKey.id));
        showToast(`API key "${newKey.keyName}" generated`);
        closeModal();
    };

    const handleEditSubmit = () => {
        if (!editingKey) return;
        if (!formName.trim() || !formOwner.trim() || formModules.length === 0) {
            showToast('Please fill in name, owner, and at least one module');
            return;
        }
        setKeys((prev) =>
            prev.map((k) =>
                k.id === editingKey.id
                    ? {
                        ...k,
                        keyName: formName.trim(),
                        owner: formOwner.trim(),
                        environment: formEnv,
                        rateLimit: formRateLimit,
                        moduleAccess: formModules,
                    }
                    : k
            )
        );
        showToast(`API key "${formName.trim()}" updated`);
        closeModal();
    };

    const toggleReveal = (id: string) => {
        setRevealedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const handleCopy = (key: ApiKeyRecord) => {
        setCopiedId(key.id);
        showToast('Key copied to clipboard');
        setTimeout(() => setCopiedId(null), 1500);
    };

    const handleSuspendToggle = (key: ApiKeyRecord) => {
        const nextStatus: ApiKeysStatus = key.status === 'Active' ? 'Suspended' : 'Active';
        setKeys((prev) => prev.map((k) => (k.id === key.id ? { ...k, status: nextStatus } : k)));
        showToast(`"${key.keyName}" ${nextStatus === 'Active' ? 'activated' : 'suspended'}`);
        setOpenMenuId(null);
    };

    const confirmDelete = () => {
        if (!deleteTarget) return;
        setKeys((prev) => prev.map((k) => (k.id === deleteTarget.id ? { ...k, status: 'Revoked' as ApiKeysStatus } : k)));
        showToast(`"${deleteTarget.keyName}" revoked`);
        setDeleteTarget(null);
    };

    const filteredKeys = useMemo(() => {
        return keys.filter((k) => {
            const matchesSearch = searchQuery
                ? k.keyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                k.keyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                k.owner.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            const matchesEnv = envFilter === 'All' ? true : k.environment === envFilter;
            const matchesStatus = statusFilter === 'All' ? true : k.status === statusFilter;
            return matchesSearch && matchesEnv && matchesStatus;
        });
    }, [keys, searchQuery, envFilter, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredKeys.length / pageSize));
    const paginatedKeys = filteredKeys.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">API Keys</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage, generate, and monitor API keys across all environments.
                    </p>
                </div>
                <button
                    onClick={openGenerateModal}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium w-fit"
                >
                    <Plus size={16} />
                    Generate API Key
                </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {apiKeysStats.map((stat) => {
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
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="Search by key name, ID, or owner..."
                        className="bg-transparent outline-none w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                    />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={envFilter}
                        onChange={(e) => {
                            setEnvFilter(e.target.value as 'All' | ApiKeysEnvironment);
                            setCurrentPage(1);
                        }}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Environments</option>
                        <option value="Production">Production</option>
                        <option value="Sandbox">Sandbox</option>
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value as 'All' | ApiKeysStatus);
                            setCurrentPage(1);
                        }}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Suspended">Suspended</option>
                        <option value="Revoked">Revoked</option>
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                <div className="overflow-x-auto -mx-2">
                    <table className="w-full text-sm min-w-225">
                        <thead>
                            <tr className="text-left text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
                                <th className="py-2.5 px-2 font-medium">Key</th>
                                <th className="py-2.5 px-2 font-medium">Owner</th>
                                <th className="py-2.5 px-2 font-medium">Module Access</th>
                                <th className="py-2.5 px-2 font-medium">Environment</th>
                                <th className="py-2.5 px-2 font-medium">Status</th>
                                <th className="py-2.5 px-2 font-medium">Rate Limit</th>
                                <th className="py-2.5 px-2 font-medium">Last Used</th>
                                <th className="py-2.5 px-2 font-medium">Created At</th>
                                <th className="py-2.5 px-2 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedKeys.map((key) => {
                                const isRevealed = revealedIds.has(key.id);
                                return (
                                    <tr key={key.id} className="border-b border-slate-50 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                                        <td className="py-3 px-2">
                                            <p className="font-medium text-slate-700 dark:text-slate-200">{key.keyName}</p>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <code className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                                                    {isRevealed ? key.secretFull : key.secretPreview}
                                                </code>
                                                <button
                                                    onClick={() => toggleReveal(key.id)}
                                                    className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                                                    aria-label="Toggle reveal"
                                                >
                                                    {isRevealed ? <EyeOff size={12} /> : <Eye size={12} />}
                                                </button>
                                                <button
                                                    onClick={() => handleCopy(key)}
                                                    className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                                                    aria-label="Copy key"
                                                >
                                                    {copiedId === key.id ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-3 px-2">
                                            <div className="flex items-center gap-2 whitespace-nowrap">
                                                <img src={key.ownerAvatar} alt={key.owner} className="w-6 h-6 rounded-full" />
                                                <span className="text-slate-600 dark:text-slate-300">{key.owner}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-2">
                                            <div className="flex flex-wrap gap-1 max-w-45">
                                                {key.moduleAccess.map((m) => (
                                                    <span
                                                        key={m}
                                                        className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                                                    >
                                                        {m}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-3 px-2">
                                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap ${apiKeysEnvBadge[key.environment]}`}>
                                                {key.environment}
                                            </span>
                                        </td>
                                        <td className="py-3 px-2">
                                            <span className="flex items-center gap-1.5 text-xs font-medium whitespace-nowrap">
                                                <span className={`w-1.5 h-1.5 rounded-full ${apiKeysStatusDot[key.status]}`} />
                                                <span className={`px-2 py-0.5 rounded-full ${apiKeysStatusBadge[key.status]}`}>{key.status}</span>
                                            </span>
                                        </td>
                                        <td className="py-3 px-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">{key.rateLimit}</td>
                                        <td className="py-3 px-2 text-slate-500 dark:text-slate-400 whitespace-nowrap">{key.lastUsed}</td>
                                        <td className="py-3 px-2 text-slate-500 dark:text-slate-400 whitespace-nowrap">{key.createdAt}</td>
                                        <td className="py-3 px-2">
                                            <div className="relative flex items-center justify-end">
                                                <button
                                                    onClick={() => setOpenMenuId(openMenuId === key.id ? null : key.id)}
                                                    className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                                >
                                                    <Pencil size={14} className="hidden" />
                                                    <ChevronDown size={14} />
                                                </button>
                                                {openMenuId === key.id && (
                                                    <div className="absolute right-0 top-8 z-20 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-1 text-sm">
                                                        <button
                                                            onClick={() => openEditModal(key)}
                                                            className="w-full flex items-center gap-2 px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                                        >
                                                            <Pencil size={14} /> Edit
                                                        </button>
                                                        {key.status !== 'Revoked' && (
                                                            <button
                                                                onClick={() => handleSuspendToggle(key)}
                                                                className="w-full flex items-center gap-2 px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                                            >
                                                                {key.status === 'Active' ? (
                                                                    <>
                                                                        <Ban size={14} /> Suspend
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <PlayCircle size={14} /> Activate
                                                                    </>
                                                                )}
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => {
                                                                setDeleteTarget(key);
                                                                setOpenMenuId(null);
                                                            }}
                                                            className="w-full flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                                                        >
                                                            <Trash2 size={14} /> Revoke
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {paginatedKeys.length === 0 && (
                                <tr>
                                    <td colSpan={9} className="py-8 text-center text-slate-400 text-sm">
                                        No API keys match your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 text-xs text-slate-500 dark:text-slate-400">
                    <p>
                        Showing {paginatedKeys.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{' '}
                        {Math.min(currentPage * pageSize, filteredKeys.length)} of {filteredKeys.length} keys
                    </p>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40"
                        >
                            <ChevronLeft size={14} />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setCurrentPage(p)}
                                className={`w-7 h-7 rounded-lg text-xs ${currentPage === p
                                        ? 'bg-blue-600 text-white'
                                        : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40"
                        >
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Generate / Edit Modal */}
            {(modalMode === 'generate' || modalMode === 'edit') && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="font-semibold text-slate-800 dark:text-white">
                                {modalMode === 'generate' ? 'Generate New API Key' : 'Edit API Key'}
                            </h2>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-5 space-y-4">
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Key Name</label>
                                <input
                                    value={formName}
                                    onChange={(e) => setFormName(e.target.value)}
                                    placeholder="e.g. Transaction Service"
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Owner</label>
                                <input
                                    value={formOwner}
                                    onChange={(e) => setFormOwner(e.target.value)}
                                    placeholder="e.g. Finance Team"
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Environment</label>
                                    <select
                                        value={formEnv}
                                        onChange={(e) => setFormEnv(e.target.value as ApiKeysEnvironment)}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                    >
                                        <option value="Production">Production</option>
                                        <option value="Sandbox">Sandbox</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Rate Limit</label>
                                    <select
                                        value={formRateLimit}
                                        onChange={(e) => setFormRateLimit(e.target.value)}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                    >
                                        {apiKeysRateLimitOptions.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Module Access</label>
                                <div className="flex flex-wrap gap-2">
                                    {apiKeysAvailableModules.map((mod) => {
                                        const active = formModules.includes(mod.name);
                                        return (
                                            <button
                                                key={mod.id}
                                                onClick={() => toggleFormModule(mod.name)}
                                                className={`text-xs px-3 py-1.5 rounded-full border transition ${active
                                                        ? 'bg-blue-600 border-blue-600 text-white'
                                                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                    }`}
                                            >
                                                {mod.name}
                                            </button>
                                        );
                                    })}
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
                                onClick={modalMode === 'generate' ? handleGenerateSubmit : handleEditSubmit}
                                className="text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium"
                            >
                                {modalMode === 'generate' ? 'Generate Key' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Revoke confirmation modal */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm p-5">
                        <h2 className="font-semibold text-slate-800 dark:text-white mb-2">Revoke API Key</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                            Are you sure you want to revoke <span className="font-medium text-slate-700 dark:text-slate-200">{deleteTarget.keyName}</span>? Any
                            application using this key will immediately lose access. This cannot be undone.
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
                                Revoke Key
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}