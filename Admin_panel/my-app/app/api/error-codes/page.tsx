'use client';

import { useState, useMemo } from 'react';
import {
    Search,
    ChevronDown,
    ChevronUp,
    Plus,
    Pencil,
    Trash2,
    X,
    ListTree,
    AlertCircle,
    ServerCrash,
    Sparkles,
    Copy,
    Check,
} from 'lucide-react';
import {
    errCodeStats,
    apiErrorCodesData,
    errCodeCategoryColor,
    errCodeStatusColor,
    errCodeStatusBadgeBg,
    errCodeCategoryOptions,
    errCodeStatusOptions,
    type ApiErrorCodeRecord,
    type ErrCodeCategory,
} from '@/lib/data';

const statIconMap = {
    total: ListTree,
    client: AlertCircle,
    server: ServerCrash,
    custom: Sparkles,
} as const;

const statIconColor: Record<string, string> = {
    total: 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    client: 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    server: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400',
    custom: 'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
};

type ModalMode = null | 'create' | 'edit';

export default function ErrorCodesPage() {
    const [errorCodes, setErrorCodes] = useState<ApiErrorCodeRecord[]>(apiErrorCodesData);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<'All' | ErrCodeCategory>('All');
    const [statusFilter, setStatusFilter] = useState<'All' | number>('All');
    const [toast, setToast] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [modalMode, setModalMode] = useState<ModalMode>(null);
    const [editingCode, setEditingCode] = useState<ApiErrorCodeRecord | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<ApiErrorCodeRecord | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // form state
    const [formErrorCode, setFormErrorCode] = useState('');
    const [formHttpStatus, setFormHttpStatus] = useState(400);
    const [formMessage, setFormMessage] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [formCategory, setFormCategory] = useState<ErrCodeCategory>('Validation');
    const [formCauses, setFormCauses] = useState('');
    const [formResolution, setFormResolution] = useState('');

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const resetForm = () => {
        setFormErrorCode('');
        setFormHttpStatus(400);
        setFormMessage('');
        setFormDescription('');
        setFormCategory('Validation');
        setFormCauses('');
        setFormResolution('');
    };

    const openCreateModal = () => {
        resetForm();
        setModalMode('create');
    };

    const openEditModal = (code: ApiErrorCodeRecord) => {
        setEditingCode(code);
        setFormErrorCode(code.errorCode);
        setFormHttpStatus(code.httpStatus);
        setFormMessage(code.message);
        setFormDescription(code.description);
        setFormCategory(code.category);
        setFormCauses(code.commonCauses.join('\n'));
        setFormResolution(code.resolution);
        setModalMode('edit');
    };

    const closeModal = () => {
        setModalMode(null);
        setEditingCode(null);
        resetForm();
    };

    const handleCreateSubmit = () => {
        if (!formErrorCode.trim() || !formMessage.trim()) {
            showToast('Please fill in the error code and message');
            return;
        }
        const newCode: ApiErrorCodeRecord = {
            id: `err-${Date.now()}`,
            errorCode: formErrorCode.trim(),
            httpStatus: formHttpStatus,
            message: formMessage.trim(),
            description: formDescription.trim() || 'No description provided.',
            category: formCategory,
            commonCauses: formCauses.split('\n').map((c) => c.trim()).filter(Boolean),
            resolution: formResolution.trim() || 'No resolution notes provided.',
            isCustom: true,
        };
        setErrorCodes((prev) => [newCode, ...prev]);
        showToast(`Custom error code "${newCode.errorCode}" created`);
        closeModal();
    };

    const handleEditSubmit = () => {
        if (!editingCode) return;
        if (!formErrorCode.trim() || !formMessage.trim()) {
            showToast('Please fill in the error code and message');
            return;
        }
        setErrorCodes((prev) =>
            prev.map((c) =>
                c.id === editingCode.id
                    ? {
                        ...c,
                        errorCode: formErrorCode.trim(),
                        httpStatus: formHttpStatus,
                        message: formMessage.trim(),
                        description: formDescription.trim(),
                        category: formCategory,
                        commonCauses: formCauses.split('\n').map((x) => x.trim()).filter(Boolean),
                        resolution: formResolution.trim(),
                    }
                    : c
            )
        );
        showToast(`Error code "${formErrorCode.trim()}" updated`);
        closeModal();
    };

    const confirmDelete = () => {
        if (!deleteTarget) return;
        setErrorCodes((prev) => prev.filter((c) => c.id !== deleteTarget.id));
        showToast(`Error code "${deleteTarget.errorCode}" deleted`);
        setDeleteTarget(null);
    };

    const handleCopy = (code: ApiErrorCodeRecord) => {
        setCopiedId(code.id);
        showToast('Error code copied');
        setTimeout(() => setCopiedId(null), 1500);
    };

    const filteredCodes = useMemo(() => {
        return errorCodes.filter((c) => {
            const matchesSearch = searchQuery
                ? c.errorCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                String(c.httpStatus).includes(searchQuery)
                : true;
            const matchesCategory = categoryFilter === 'All' ? true : c.category === categoryFilter;
            const matchesStatus = statusFilter === 'All' ? true : c.httpStatus === statusFilter;
            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [errorCodes, searchQuery, categoryFilter, statusFilter]);

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
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Error Codes</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Reference catalog of all API error codes, causes, and recommended resolutions.
                    </p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium w-fit"
                >
                    <Plus size={16} />
                    Add Custom Error Code
                </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {errCodeStats.map((stat) => {
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
                        placeholder="Search by error code, message, or status..."
                        className="bg-transparent outline-none w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                    />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value as 'All' | ErrCodeCategory)}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Categories</option>
                        {errCodeCategoryOptions.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value === 'All' ? 'All' : Number(e.target.value))}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Status Codes</option>
                        {errCodeStatusOptions.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
            </div>

            {/* Error code list */}
            <div className="flex flex-col gap-2">
                {filteredCodes.map((code) => {
                    const isExpanded = expandedId === code.id;
                    return (
                        <div key={code.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                            <button
                                onClick={() => setExpandedId(isExpanded ? null : code.id)}
                                className="w-full flex items-center justify-between gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition text-left"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-lg shrink-0 ${errCodeStatusBadgeBg(code.httpStatus)} ${errCodeStatusColor(code.httpStatus)}`}>
                                        {code.httpStatus}
                                    </span>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <code className="text-sm font-mono font-medium text-slate-800 dark:text-white">{code.errorCode}</code>
                                            {code.isCustom && (
                                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400">
                                                    Custom
                                                </span>
                                            )}
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${errCodeCategoryColor[code.category]}`}>{code.category}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{code.message}</p>
                                    </div>
                                </div>
                                {isExpanded ? <ChevronUp size={16} className="text-slate-400 shrink-0" /> : <ChevronDown size={16} className="text-slate-400 shrink-0" />}
                            </button>

                            {isExpanded && (
                                <div className="border-t border-slate-100 dark:border-slate-800 p-4 space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <code className="text-xs bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg font-mono text-slate-600 dark:text-slate-300">
                                            {code.errorCode}
                                        </code>
                                        <button onClick={() => handleCopy(code)} className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                                            {copiedId === code.id ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                                        </button>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300">{code.description}</p>
                                    <div>
                                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Common Causes</p>
                                        <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-300 space-y-0.5">
                                            {code.commonCauses.map((cause, i) => (
                                                <li key={i}>{cause}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Recommended Resolution</p>
                                        <p className="text-xs text-slate-600 dark:text-slate-300">{code.resolution}</p>
                                    </div>
                                    {code.isCustom && (
                                        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                                            <button
                                                onClick={() => openEditModal(code)}
                                                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                            >
                                                <Pencil size={12} /> Edit
                                            </button>
                                            <button
                                                onClick={() => setDeleteTarget(code)}
                                                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                                            >
                                                <Trash2 size={12} /> Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}

                {filteredCodes.length === 0 && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center text-slate-400 text-sm">
                        No error codes match your filters.
                    </div>
                )}
            </div>

            {/* Create / Edit Modal */}
            {(modalMode === 'create' || modalMode === 'edit') && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="font-semibold text-slate-800 dark:text-white">
                                {modalMode === 'create' ? 'Add Custom Error Code' : 'Edit Custom Error Code'}
                            </h2>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-5 space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Error Code</label>
                                    <input
                                        value={formErrorCode}
                                        onChange={(e) => setFormErrorCode(e.target.value)}
                                        placeholder="custom_my_error"
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">HTTP Status</label>
                                    <select
                                        value={formHttpStatus}
                                        onChange={(e) => setFormHttpStatus(Number(e.target.value))}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                    >
                                        {errCodeStatusOptions.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Message</label>
                                <input
                                    value={formMessage}
                                    onChange={(e) => setFormMessage(e.target.value)}
                                    placeholder="Short human-readable message"
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Description</label>
                                <textarea
                                    value={formDescription}
                                    onChange={(e) => setFormDescription(e.target.value)}
                                    rows={2}
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 resize-none"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Category</label>
                                <select
                                    value={formCategory}
                                    onChange={(e) => setFormCategory(e.target.value as ErrCodeCategory)}
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                >
                                    {errCodeCategoryOptions.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Common Causes (one per line)</label>
                                <textarea
                                    value={formCauses}
                                    onChange={(e) => setFormCauses(e.target.value)}
                                    rows={3}
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 resize-none"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Recommended Resolution</label>
                                <textarea
                                    value={formResolution}
                                    onChange={(e) => setFormResolution(e.target.value)}
                                    rows={2}
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 resize-none"
                                />
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
                                {modalMode === 'create' ? 'Add Error Code' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete confirmation modal */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm p-5">
                        <h2 className="font-semibold text-slate-800 dark:text-white mb-2">Delete Error Code</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                            Are you sure you want to delete{' '}
                            <code className="font-mono text-slate-700 dark:text-slate-200">{deleteTarget.errorCode}</code>? This cannot be undone.
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