'use client';

import { useState, useMemo } from 'react';
import {
    Plus,
    Search,
    ChevronDown,
    Pencil,
    Trash2,
    X,
    ShieldCheck,
    Eye,
    PenLine,
    Crown,
    Lock,
    KeyRound,
} from 'lucide-react';
import {
    accessScopesStats,
    accessScopesData,
    scopesPermissionBadge,
    scopesModuleColor,
    scopesModuleOptions,
    scopesPermissionOptions,
    type AccessScopeRecord,
    type ScopesModuleName,
    type ScopesPermissionLevel,
} from '@/lib/data';

const statIconMap = {
    total: ShieldCheck,
    read: Eye,
    write: PenLine,
    full: Crown,
} as const;

const statIconColor: Record<string, string> = {
    total: 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    read: 'bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400',
    write: 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    full: 'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
};

const permissionIconMap: Record<ScopesPermissionLevel, typeof Eye> = {
    Read: Eye,
    Write: PenLine,
    'Full Access': Crown,
};

type ModalMode = null | 'create' | 'edit';

export default function AccessScopesPage() {
    const [scopes, setScopes] = useState<AccessScopeRecord[]>(accessScopesData);
    const [searchQuery, setSearchQuery] = useState('');
    const [moduleFilter, setModuleFilter] = useState<'All' | ScopesModuleName>('All');
    const [permissionFilter, setPermissionFilter] = useState<'All' | ScopesPermissionLevel>('All');
    const [toast, setToast] = useState<string | null>(null);
    const [modalMode, setModalMode] = useState<ModalMode>(null);
    const [editingScope, setEditingScope] = useState<AccessScopeRecord | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<AccessScopeRecord | null>(null);
    const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(scopesModuleOptions));

    // form state
    const [formName, setFormName] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [formModule, setFormModule] = useState<ScopesModuleName>('Transactions');
    const [formPermission, setFormPermission] = useState<ScopesPermissionLevel>('Read');

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const resetForm = () => {
        setFormName('');
        setFormDescription('');
        setFormModule('Transactions');
        setFormPermission('Read');
    };

    const slugify = (text: string) =>
        text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_+|_+$/g, '');

    const permissionSuffix: Record<ScopesPermissionLevel, string> = {
        Read: 'read',
        Write: 'write',
        'Full Access': 'full',
    };

    const openCreateModal = () => {
        resetForm();
        setModalMode('create');
    };

    const openEditModal = (scope: AccessScopeRecord) => {
        setEditingScope(scope);
        setFormName(scope.name);
        setFormDescription(scope.description);
        setFormModule(scope.module);
        setFormPermission(scope.permissionLevel);
        setModalMode('edit');
    };

    const closeModal = () => {
        setModalMode(null);
        setEditingScope(null);
        resetForm();
    };

    const handleCreateSubmit = () => {
        if (!formName.trim() || !formDescription.trim()) {
            showToast('Please fill in name and description');
            return;
        }
        const newScope: AccessScopeRecord = {
            id: `scope-${Date.now()}`,
            scopeKey: `${formModule.toLowerCase()}:${permissionSuffix[formPermission]}_${slugify(formName).slice(0, 12)}`,
            name: formName.trim(),
            description: formDescription.trim(),
            module: formModule,
            permissionLevel: formPermission,
            isSystemScope: false,
            assignedKeysCount: 0,
            createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        };
        setScopes((prev) => [newScope, ...prev]);
        showToast(`Scope "${newScope.name}" created`);
        closeModal();
    };

    const handleEditSubmit = () => {
        if (!editingScope) return;
        if (!formName.trim() || !formDescription.trim()) {
            showToast('Please fill in name and description');
            return;
        }
        setScopes((prev) =>
            prev.map((s) =>
                s.id === editingScope.id
                    ? {
                        ...s,
                        name: formName.trim(),
                        description: formDescription.trim(),
                        module: formModule,
                        permissionLevel: formPermission,
                    }
                    : s
            )
        );
        showToast(`Scope "${formName.trim()}" updated`);
        closeModal();
    };

    const confirmDelete = () => {
        if (!deleteTarget) return;
        setScopes((prev) => prev.filter((s) => s.id !== deleteTarget.id));
        showToast(`Scope "${deleteTarget.name}" deleted`);
        setDeleteTarget(null);
    };

    const toggleModuleExpand = (mod: string) => {
        setExpandedModules((prev) => {
            const next = new Set(prev);
            if (next.has(mod)) next.delete(mod);
            else next.add(mod);
            return next;
        });
    };

    const filteredScopes = useMemo(() => {
        return scopes.filter((s) => {
            const matchesSearch = searchQuery
                ? s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.scopeKey.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.description.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            const matchesModule = moduleFilter === 'All' ? true : s.module === moduleFilter;
            const matchesPermission = permissionFilter === 'All' ? true : s.permissionLevel === permissionFilter;
            return matchesSearch && matchesModule && matchesPermission;
        });
    }, [scopes, searchQuery, moduleFilter, permissionFilter]);

    const groupedByModule = useMemo(() => {
        const groups = new Map<string, AccessScopeRecord[]>();
        filteredScopes.forEach((s) => {
            const list = groups.get(s.module) ?? [];
            list.push(s);
            groups.set(s.module, list);
        });
        return groups;
    }, [filteredScopes]);

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
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Access Scopes</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Define and manage granular permissions that API keys can be granted.
                    </p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium w-fit"
                >
                    <Plus size={16} />
                    Create Scope
                </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {accessScopesStats.map((stat) => {
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
                        placeholder="Search scopes by name, key, or description..."
                        className="bg-transparent outline-none w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                    />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={moduleFilter}
                        onChange={(e) => setModuleFilter(e.target.value as 'All' | ScopesModuleName)}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Modules</option>
                        {scopesModuleOptions.map((m) => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={permissionFilter}
                        onChange={(e) => setPermissionFilter(e.target.value as 'All' | ScopesPermissionLevel)}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Permissions</option>
                        {scopesPermissionOptions.map((p) => (
                            <option key={p} value={p}>
                                {p}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
            </div>

            {/* Grouped scope cards */}
            <div className="flex flex-col gap-4">
                {Array.from(groupedByModule.entries()).map(([mod, items]) => {
                    const isExpanded = expandedModules.has(mod);
                    return (
                        <div key={mod} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                            <button
                                onClick={() => toggleModuleExpand(mod)}
                                className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${scopesModuleColor[mod as ScopesModuleName]}`}>
                                        {mod}
                                    </span>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">{items.length} scope{items.length !== 1 ? 's' : ''}</span>
                                </div>
                                <ChevronDown size={16} className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>

                            {isExpanded && (
                                <div className="border-t border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
                                    {items.map((scope) => {
                                        const PermIcon = permissionIconMap[scope.permissionLevel];
                                        return (
                                            <div key={scope.id} className="flex items-start sm:items-center justify-between gap-3 p-4 sm:p-5 flex-col sm:flex-row">
                                                <div className="flex items-start gap-3 flex-1">
                                                    <span className={`mt-0.5 p-2 rounded-lg ${scopesPermissionBadge[scope.permissionLevel]}`}>
                                                        <PermIcon size={14} />
                                                    </span>
                                                    <div>
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <p className="font-medium text-slate-800 dark:text-white text-sm">{scope.name}</p>
                                                            {scope.isSystemScope && (
                                                                <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                                                    <Lock size={10} /> System
                                                                </span>
                                                            )}
                                                        </div>
                                                        <code className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">{scope.scopeKey}</code>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md">{scope.description}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
                                                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap ${scopesPermissionBadge[scope.permissionLevel]}`}>
                                                        {scope.permissionLevel}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                                        <KeyRound size={12} /> {scope.assignedKeysCount} keys
                                                    </span>
                                                    <div className="flex items-center gap-1.5">
                                                        <button
                                                            onClick={() => openEditModal(scope)}
                                                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                                                            aria-label="Edit scope"
                                                        >
                                                            <Pencil size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                if (scope.isSystemScope) {
                                                                    showToast('System scopes cannot be deleted');
                                                                    return;
                                                                }
                                                                setDeleteTarget(scope);
                                                            }}
                                                            className={`p-1.5 rounded-lg ${scope.isSystemScope
                                                                ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                                                                : 'text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400'
                                                                }`}
                                                            aria-label="Delete scope"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}

                {groupedByModule.size === 0 && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center text-slate-400 text-sm">
                        No scopes match your filters.
                    </div>
                )}
            </div>

            {/* Create / Edit Modal */}
            {(modalMode === 'create' || modalMode === 'edit') && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="font-semibold text-slate-800 dark:text-white">
                                {modalMode === 'create' ? 'Create Access Scope' : 'Edit Access Scope'}
                            </h2>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-5 space-y-4">
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Scope Name</label>
                                <input
                                    value={formName}
                                    onChange={(e) => setFormName(e.target.value)}
                                    placeholder="e.g. View Transactions"
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Description</label>
                                <textarea
                                    value={formDescription}
                                    onChange={(e) => setFormDescription(e.target.value)}
                                    placeholder="Describe what this scope allows..."
                                    rows={3}
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Module</label>
                                    <select
                                        value={formModule}
                                        onChange={(e) => setFormModule(e.target.value as ScopesModuleName)}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                    >
                                        {scopesModuleOptions.map((m) => (
                                            <option key={m} value={m}>
                                                {m}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Permission Level</label>
                                    <select
                                        value={formPermission}
                                        onChange={(e) => setFormPermission(e.target.value as ScopesPermissionLevel)}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                    >
                                        {scopesPermissionOptions.map((p) => (
                                            <option key={p} value={p}>
                                                {p}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {modalMode === 'create' && (
                                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 text-xs text-slate-500 dark:text-slate-400">
                                    Scope key preview:{' '}
                                    <code className="font-mono text-slate-700 dark:text-slate-300">
                                        {formModule.toLowerCase()}:{permissionSuffix[formPermission]}
                                        {formName ? `_${slugify(formName).slice(0, 12)}` : ''}
                                    </code>
                                </div>
                            )}
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
                                {modalMode === 'create' ? 'Create Scope' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete confirmation modal */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm p-5">
                        <h2 className="font-semibold text-slate-800 dark:text-white mb-2">Delete Scope</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                            Are you sure you want to delete <span className="font-medium text-slate-700 dark:text-slate-200">{deleteTarget.name}</span>? It is
                            currently assigned to {deleteTarget.assignedKeysCount} key{deleteTarget.assignedKeysCount !== 1 ? 's' : ''}. This cannot be undone.
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
                                Delete Scope
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}