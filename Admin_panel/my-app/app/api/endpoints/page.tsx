'use client';

import { useState, useMemo } from 'react';
import {
    Plus,
    Search,
    ChevronDown,
    Pencil,
    Trash2,
    X,
    PlugZap,
    ShieldCheck,
    FlaskConical,
    AlertTriangle,
    Copy,
    Check,
    Eye,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import {
    endpointsStats,
    endpointsData,
    endpointsMethodBadge,
    endpointsStatusBadge,
    endpointsStatusDot,
    endpointsMethodOptions,
    endpointsStatusOptions,
    endpointsModuleOptions,
    endpointsRateLimitOptions,
    type EndpointRecord,
    type EndpointsMethod,
    type EndpointsStatus,
    type EndpointsModuleName,
} from '@/lib/data';

const statIconMap = {
    total: PlugZap,
    active: ShieldCheck,
    beta: FlaskConical,
    deprecated: AlertTriangle,
} as const;

const statIconColor: Record<string, string> = {
    total: 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    active: 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400',
    beta: 'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
    deprecated: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400',
};

type ModalMode = null | 'create' | 'edit';
type DetailTarget = EndpointRecord | null;

export default function EndpointsPage() {
    const [endpoints, setEndpoints] = useState<EndpointRecord[]>(endpointsData);
    const [searchQuery, setSearchQuery] = useState('');
    const [methodFilter, setMethodFilter] = useState<'All' | EndpointsMethod>('All');
    const [moduleFilter, setModuleFilter] = useState<'All' | EndpointsModuleName>('All');
    const [statusFilter, setStatusFilter] = useState<'All' | EndpointsStatus>('All');
    const [toast, setToast] = useState<string | null>(null);
    const [modalMode, setModalMode] = useState<ModalMode>(null);
    const [editingEndpoint, setEditingEndpoint] = useState<EndpointRecord | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<EndpointRecord | null>(null);
    const [detailTarget, setDetailTarget] = useState<DetailTarget>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    // form state
    const [formMethod, setFormMethod] = useState<EndpointsMethod>('GET');
    const [formPath, setFormPath] = useState('');
    const [formName, setFormName] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [formModule, setFormModule] = useState<EndpointsModuleName>('Transactions');
    const [formStatus, setFormStatus] = useState<EndpointsStatus>('Active');
    const [formScope, setFormScope] = useState('');
    const [formRateLimit, setFormRateLimit] = useState(endpointsRateLimitOptions[0]);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const resetForm = () => {
        setFormMethod('GET');
        setFormPath('');
        setFormName('');
        setFormDescription('');
        setFormModule('Transactions');
        setFormStatus('Active');
        setFormScope('');
        setFormRateLimit(endpointsRateLimitOptions[0]);
    };

    const openCreateModal = () => {
        resetForm();
        setModalMode('create');
    };

    const openEditModal = (ep: EndpointRecord) => {
        setEditingEndpoint(ep);
        setFormMethod(ep.method);
        setFormPath(ep.path);
        setFormName(ep.name);
        setFormDescription(ep.description);
        setFormModule(ep.module);
        setFormStatus(ep.status);
        setFormScope(ep.requiredScope);
        setFormRateLimit(ep.rateLimit);
        setModalMode('edit');
    };

    const closeModal = () => {
        setModalMode(null);
        setEditingEndpoint(null);
        resetForm();
    };

    const handleCreateSubmit = () => {
        if (!formPath.trim() || !formName.trim() || !formScope.trim()) {
            showToast('Please fill in path, name, and required scope');
            return;
        }
        const newEndpoint: EndpointRecord = {
            id: `ep-${Date.now()}`,
            method: formMethod,
            path: formPath.trim(),
            name: formName.trim(),
            description: formDescription.trim() || 'No description provided.',
            module: formModule,
            status: formStatus,
            requiredScope: formScope.trim(),
            rateLimit: formRateLimit,
            avgResponseMs: 0,
            callsToday: 0,
            lastCalled: 'Never',
            versionTag: 'v1',
        };
        setEndpoints((prev) => [newEndpoint, ...prev]);
        showToast(`Endpoint "${newEndpoint.name}" created`);
        closeModal();
    };

    const handleEditSubmit = () => {
        if (!editingEndpoint) return;
        if (!formPath.trim() || !formName.trim() || !formScope.trim()) {
            showToast('Please fill in path, name, and required scope');
            return;
        }
        setEndpoints((prev) =>
            prev.map((ep) =>
                ep.id === editingEndpoint.id
                    ? {
                        ...ep,
                        method: formMethod,
                        path: formPath.trim(),
                        name: formName.trim(),
                        description: formDescription.trim(),
                        module: formModule,
                        status: formStatus,
                        requiredScope: formScope.trim(),
                        rateLimit: formRateLimit,
                    }
                    : ep
            )
        );
        showToast(`Endpoint "${formName.trim()}" updated`);
        closeModal();
    };

    const confirmDelete = () => {
        if (!deleteTarget) return;
        setEndpoints((prev) => prev.filter((ep) => ep.id !== deleteTarget.id));
        showToast(`Endpoint "${deleteTarget.name}" deleted`);
        setDeleteTarget(null);
    };

    const handleCopyPath = (ep: EndpointRecord) => {
        setCopiedId(ep.id);
        showToast('Endpoint path copied');
        setTimeout(() => setCopiedId(null), 1500);
    };

    const cycleStatus = (ep: EndpointRecord) => {
        const order: EndpointsStatus[] = ['Active', 'Beta', 'Deprecated'];
        const next = order[(order.indexOf(ep.status) + 1) % order.length];
        setEndpoints((prev) => prev.map((e) => (e.id === ep.id ? { ...e, status: next } : e)));
        showToast(`"${ep.name}" marked as ${next}`);
    };

    const filteredEndpoints = useMemo(() => {
        return endpoints.filter((ep) => {
            const matchesSearch = searchQuery
                ? ep.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ep.name.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            const matchesMethod = methodFilter === 'All' ? true : ep.method === methodFilter;
            const matchesModule = moduleFilter === 'All' ? true : ep.module === moduleFilter;
            const matchesStatus = statusFilter === 'All' ? true : ep.status === statusFilter;
            return matchesSearch && matchesMethod && matchesModule && matchesStatus;
        });
    }, [endpoints, searchQuery, methodFilter, moduleFilter, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredEndpoints.length / pageSize));
    const paginatedEndpoints = filteredEndpoints.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Endpoints</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage the registry of available API endpoints, their scopes, and usage.
                    </p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium w-fit"
                >
                    <Plus size={16} />
                    Add Endpoint
                </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {endpointsStats.map((stat) => {
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
                        placeholder="Search by path or name..."
                        className="bg-transparent outline-none w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                    />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={methodFilter}
                        onChange={(e) => {
                            setMethodFilter(e.target.value as 'All' | EndpointsMethod);
                            setCurrentPage(1);
                        }}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Methods</option>
                        {endpointsMethodOptions.map((m) => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={moduleFilter}
                        onChange={(e) => {
                            setModuleFilter(e.target.value as 'All' | EndpointsModuleName);
                            setCurrentPage(1);
                        }}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Modules</option>
                        {endpointsModuleOptions.map((m) => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value as 'All' | EndpointsStatus);
                            setCurrentPage(1);
                        }}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Statuses</option>
                        {endpointsStatusOptions.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
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
                                <th className="py-2.5 px-2 font-medium">Method</th>
                                <th className="py-2.5 px-2 font-medium">Endpoint</th>
                                <th className="py-2.5 px-2 font-medium">Module</th>
                                <th className="py-2.5 px-2 font-medium">Required Scope</th>
                                <th className="py-2.5 px-2 font-medium">Status</th>
                                <th className="py-2.5 px-2 font-medium">Avg Response</th>
                                <th className="py-2.5 px-2 font-medium">Calls Today</th>
                                <th className="py-2.5 px-2 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedEndpoints.map((ep) => (
                                <tr key={ep.id} className="border-b border-slate-50 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                                    <td className="py-3 px-2">
                                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${endpointsMethodBadge[ep.method]}`}>
                                            {ep.method}
                                        </span>
                                    </td>
                                    <td className="py-3 px-2">
                                        <button onClick={() => setDetailTarget(ep)} className="text-left hover:underline">
                                            <p className="font-medium text-slate-700 dark:text-slate-200">{ep.name}</p>
                                            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">{ep.path}</p>
                                        </button>
                                    </td>
                                    <td className="py-3 px-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">{ep.module}</td>
                                    <td className="py-3 px-2">
                                        <code className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 whitespace-nowrap">
                                            {ep.requiredScope}
                                        </code>
                                    </td>
                                    <td className="py-3 px-2">
                                        <button
                                            onClick={() => cycleStatus(ep)}
                                            className="flex items-center gap-1.5 text-xs font-medium whitespace-nowrap hover:opacity-80"
                                            title="Click to cycle status"
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full ${endpointsStatusDot[ep.status]}`} />
                                            <span className={`px-2 py-0.5 rounded-full ${endpointsStatusBadge[ep.status]}`}>{ep.status}</span>
                                        </button>
                                    </td>
                                    <td className="py-3 px-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">{ep.avgResponseMs} ms</td>
                                    <td className="py-3 px-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">{ep.callsToday.toLocaleString()}</td>
                                    <td className="py-3 px-2">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <button
                                                onClick={() => handleCopyPath(ep)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                                                aria-label="Copy path"
                                            >
                                                {copiedId === ep.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                            </button>
                                            <button
                                                onClick={() => openEditModal(ep)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                                                aria-label="Edit endpoint"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                            <button
                                                onClick={() => setDeleteTarget(ep)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                                                aria-label="Delete endpoint"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {paginatedEndpoints.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="py-8 text-center text-slate-400 text-sm">
                                        No endpoints match your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 text-xs text-slate-500 dark:text-slate-400">
                    <p>
                        Showing {paginatedEndpoints.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{' '}
                        {Math.min(currentPage * pageSize, filteredEndpoints.length)} of {filteredEndpoints.length} endpoints
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

            {/* Detail drawer/modal */}
            {detailTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${endpointsMethodBadge[detailTarget.method]}`}>
                                    {detailTarget.method}
                                </span>
                                <h2 className="font-semibold text-slate-800 dark:text-white">{detailTarget.name}</h2>
                            </div>
                            <button onClick={() => setDetailTarget(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-5 space-y-4 text-sm">
                            <div>
                                <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Path</p>
                                <div className="flex items-center gap-2">
                                    <code className="font-mono text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg text-xs break-all">
                                        {detailTarget.path}
                                    </code>
                                    <button onClick={() => handleCopyPath(detailTarget)} className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                                        {copiedId === detailTarget.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Description</p>
                                <p className="text-slate-600 dark:text-slate-300">{detailTarget.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Module</p>
                                    <p className="text-slate-700 dark:text-slate-200">{detailTarget.module}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Version</p>
                                    <p className="text-slate-700 dark:text-slate-200">{detailTarget.versionTag}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Required Scope</p>
                                    <code className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                        {detailTarget.requiredScope}
                                    </code>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Rate Limit</p>
                                    <p className="text-slate-700 dark:text-slate-200">{detailTarget.rateLimit}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Avg Response Time</p>
                                    <p className="text-slate-700 dark:text-slate-200">{detailTarget.avgResponseMs} ms</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Calls Today</p>
                                    <p className="text-slate-700 dark:text-slate-200">{detailTarget.callsToday.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Last Called</p>
                                    <p className="text-slate-700 dark:text-slate-200">{detailTarget.lastCalled}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Status</p>
                                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${endpointsStatusBadge[detailTarget.status]}`}>
                                        {detailTarget.status}
                                    </span>
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
                            <button
                                onClick={() => setDetailTarget(null)}
                                className="text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium"
                            >
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
                                {modalMode === 'create' ? 'Add Endpoint' : 'Edit Endpoint'}
                            </h2>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-5 space-y-4">
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Method</label>
                                    <select
                                        value={formMethod}
                                        onChange={(e) => setFormMethod(e.target.value as EndpointsMethod)}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                    >
                                        {endpointsMethodOptions.map((m) => (
                                            <option key={m} value={m}>
                                                {m}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Path</label>
                                    <input
                                        value={formPath}
                                        onChange={(e) => setFormPath(e.target.value)}
                                        placeholder="/api/v1/resource"
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 font-mono"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Name</label>
                                <input
                                    value={formName}
                                    onChange={(e) => setFormName(e.target.value)}
                                    placeholder="e.g. Create Transaction"
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Description</label>
                                <textarea
                                    value={formDescription}
                                    onChange={(e) => setFormDescription(e.target.value)}
                                    placeholder="Describe what this endpoint does..."
                                    rows={2}
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Module</label>
                                    <select
                                        value={formModule}
                                        onChange={(e) => setFormModule(e.target.value as EndpointsModuleName)}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                    >
                                        {endpointsModuleOptions.map((m) => (
                                            <option key={m} value={m}>
                                                {m}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Status</label>
                                    <select
                                        value={formStatus}
                                        onChange={(e) => setFormStatus(e.target.value as EndpointsStatus)}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                    >
                                        {endpointsStatusOptions.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Required Scope</label>
                                    <input
                                        value={formScope}
                                        onChange={(e) => setFormScope(e.target.value)}
                                        placeholder="e.g. transactions:write"
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Rate Limit</label>
                                    <select
                                        value={formRateLimit}
                                        onChange={(e) => setFormRateLimit(e.target.value)}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                    >
                                        {endpointsRateLimitOptions.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
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
                                {modalMode === 'create' ? 'Add Endpoint' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete confirmation modal */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm p-5">
                        <h2 className="font-semibold text-slate-800 dark:text-white mb-2">Delete Endpoint</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                            Are you sure you want to delete{' '}
                            <span className="font-medium text-slate-700 dark:text-slate-200">{deleteTarget.name}</span>? This will remove it from the
                            registry. This cannot be undone.
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
                                Delete Endpoint
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}