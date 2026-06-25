'use client';

import { useState, useMemo } from 'react';
import {
    Plus,
    Search,
    ChevronDown,
    Pencil,
    Trash2,
    X,
    Shield,
    ShieldCheck,
    ShieldX,
    AlertOctagon,
    Power,
    Search as SearchIcon,
    CheckCircle2,
    XCircle,
} from 'lucide-react';
import {
    ipWhitelistStats,
    ipWhitelistRulesData,
    ipRuleActionBadge,
    ipRuleStatusBadge,
    ipRuleStatusDot,
    ipRuleScopeOptions,
    ipRuleActionOptions,
    ipRuleAvailableKeys,
    type IpWhitelistRule,
    type IpRuleAction,
    type IpRuleScope,
    type IpRuleStatus,
} from '@/lib/data';

const statIconMap = {
    total: Shield,
    allow: ShieldCheck,
    block: ShieldX,
    blockedToday: AlertOctagon,
} as const;

const statIconColor: Record<string, string> = {
    total: 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    allow: 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400',
    block: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400',
    blockedToday: 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
};

type ModalMode = null | 'create' | 'edit';

// Basic IPv4 CIDR containment check
function ipToInt(ip: string): number | null {
    const parts = ip.trim().split('.');
    if (parts.length !== 4) return null;
    let result = 0;
    for (const part of parts) {
        const n = Number(part);
        if (isNaN(n) || n < 0 || n > 255) return null;
        result = (result << 8) + n;
    }
    return result >>> 0;
}

function isIpInCidr(ip: string, cidr: string): boolean {
    const [range, bitsStr] = cidr.split('/');
    const bits = bitsStr ? parseInt(bitsStr, 10) : 32;
    const ipInt = ipToInt(ip);
    const rangeInt = ipToInt(range);
    if (ipInt === null || rangeInt === null) return false;
    if (bits === 0) return true;
    const mask = bits === 32 ? 0xffffffff : (~(0xffffffff >>> bits)) >>> 0;
    return (ipInt & mask) === (rangeInt & mask);
}

export default function IpWhitelistPage() {
    const [rules, setRules] = useState<IpWhitelistRule[]>(ipWhitelistRulesData);
    const [searchQuery, setSearchQuery] = useState('');
    const [actionFilter, setActionFilter] = useState<'All' | IpRuleAction>('All');
    const [scopeFilter, setScopeFilter] = useState<'All' | IpRuleScope>('All');
    const [toast, setToast] = useState<string | null>(null);
    const [modalMode, setModalMode] = useState<ModalMode>(null);
    const [editingRule, setEditingRule] = useState<IpWhitelistRule | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<IpWhitelistRule | null>(null);

    // IP lookup tester
    const [testIp, setTestIp] = useState('');
    const [testResult, setTestResult] = useState<{ ip: string; matched: IpWhitelistRule | null } | null>(null);

    // form state
    const [formLabel, setFormLabel] = useState('');
    const [formCidr, setFormCidr] = useState('');
    const [formAction, setFormAction] = useState<IpRuleAction>('Allow');
    const [formScope, setFormScope] = useState<IpRuleScope>('Global');
    const [formKeyId, setFormKeyId] = useState(ipRuleAvailableKeys[0].id);
    const [formExpiry, setFormExpiry] = useState('');

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const resetForm = () => {
        setFormLabel('');
        setFormCidr('');
        setFormAction('Allow');
        setFormScope('Global');
        setFormKeyId(ipRuleAvailableKeys[0].id);
        setFormExpiry('');
    };

    const openCreateModal = () => {
        resetForm();
        setModalMode('create');
    };

    const openEditModal = (rule: IpWhitelistRule) => {
        setEditingRule(rule);
        setFormLabel(rule.label);
        setFormCidr(rule.cidr);
        setFormAction(rule.action);
        setFormScope(rule.scope);
        setFormKeyId(ipRuleAvailableKeys.find((k) => k.name === rule.scopedKeyName)?.id ?? ipRuleAvailableKeys[0].id);
        setFormExpiry(rule.expiresAt ?? '');
        setModalMode('edit');
    };

    const closeModal = () => {
        setModalMode(null);
        setEditingRule(null);
        resetForm();
    };

    const handleCreateSubmit = () => {
        if (!formLabel.trim() || !formCidr.trim()) {
            showToast('Please provide a label and CIDR range');
            return;
        }
        const keyName = formScope === 'API Key' ? ipRuleAvailableKeys.find((k) => k.id === formKeyId)?.name ?? null : null;
        const newRule: IpWhitelistRule = {
            id: `ipr-${Date.now()}`,
            label: formLabel.trim(),
            cidr: formCidr.trim(),
            action: formAction,
            scope: formScope,
            scopedKeyName: keyName,
            status: 'Active',
            hitsToday: 0,
            lastMatched: 'Never',
            expiresAt: formExpiry.trim() || null,
            createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        };
        setRules((prev) => [newRule, ...prev]);
        showToast(`Rule "${newRule.label}" created`);
        closeModal();
    };

    const handleEditSubmit = () => {
        if (!editingRule) return;
        if (!formLabel.trim() || !formCidr.trim()) {
            showToast('Please provide a label and CIDR range');
            return;
        }
        const keyName = formScope === 'API Key' ? ipRuleAvailableKeys.find((k) => k.id === formKeyId)?.name ?? null : null;
        setRules((prev) =>
            prev.map((r) =>
                r.id === editingRule.id
                    ? {
                        ...r,
                        label: formLabel.trim(),
                        cidr: formCidr.trim(),
                        action: formAction,
                        scope: formScope,
                        scopedKeyName: keyName,
                        expiresAt: formExpiry.trim() || null,
                    }
                    : r
            )
        );
        showToast(`Rule "${formLabel.trim()}" updated`);
        closeModal();
    };

    const confirmDelete = () => {
        if (!deleteTarget) return;
        setRules((prev) => prev.filter((r) => r.id !== deleteTarget.id));
        showToast(`Rule "${deleteTarget.label}" deleted`);
        setDeleteTarget(null);
    };

    const handleToggleStatus = (rule: IpWhitelistRule) => {
        const nextStatus: IpRuleStatus = rule.status === 'Active' ? 'Disabled' : 'Active';
        setRules((prev) => prev.map((r) => (r.id === rule.id ? { ...r, status: nextStatus } : r)));
        showToast(`"${rule.label}" ${nextStatus === 'Active' ? 'enabled' : 'disabled'}`);
    };

    const handleTestIp = () => {
        if (!testIp.trim()) {
            showToast('Please enter an IP address to test');
            return;
        }
        const activeRules = rules.filter((r) => r.status === 'Active');
        // Block rules take precedence, checked first; otherwise first matching allow rule wins
        const blockMatch = activeRules.find((r) => r.action === 'Block' && isIpInCidr(testIp.trim(), r.cidr));
        const allowMatch = activeRules.find((r) => r.action === 'Allow' && isIpInCidr(testIp.trim(), r.cidr));
        const matched = blockMatch ?? allowMatch ?? null;
        setTestResult({ ip: testIp.trim(), matched });
    };

    const filteredRules = useMemo(() => {
        return rules.filter((r) => {
            const matchesSearch = searchQuery
                ? r.label.toLowerCase().includes(searchQuery.toLowerCase()) || r.cidr.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            const matchesAction = actionFilter === 'All' ? true : r.action === actionFilter;
            const matchesScope = scopeFilter === 'All' ? true : r.scope === scopeFilter;
            return matchesSearch && matchesAction && matchesScope;
        });
    }, [rules, searchQuery, actionFilter, scopeFilter]);

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
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">IP Whitelist</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage IP-based allow and block rules for global and per-key API access.
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
                {ipWhitelistStats.map((stat) => {
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

            {/* IP Lookup Tester */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 mb-4">
                <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-1">Test an IP Address</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Check whether a given IP would be allowed or blocked by current active rules.</p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 flex-1">
                        <SearchIcon size={15} className="text-slate-400" />
                        <input
                            value={testIp}
                            onChange={(e) => setTestIp(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleTestIp()}
                            placeholder="e.g. 203.0.113.45"
                            className="bg-transparent outline-none w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400 font-mono"
                        />
                    </div>
                    <button
                        onClick={handleTestIp}
                        className="text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium shrink-0"
                    >
                        Test IP
                    </button>
                </div>

                {testResult && (
                    <div
                        className={`mt-3 flex items-start gap-2 rounded-xl p-3 text-sm ${testResult.matched?.action === 'Block'
                                ? 'bg-red-50 dark:bg-red-500/10'
                                : testResult.matched?.action === 'Allow'
                                    ? 'bg-green-50 dark:bg-green-500/10'
                                    : 'bg-amber-50 dark:bg-amber-500/10'
                            }`}
                    >
                        {testResult.matched?.action === 'Block' ? (
                            <XCircle size={16} className="text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                        ) : testResult.matched?.action === 'Allow' ? (
                            <CheckCircle2 size={16} className="text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                        ) : (
                            <AlertOctagon size={16} className="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                        )}
                        <div>
                            {testResult.matched ? (
                                <p className="text-slate-700 dark:text-slate-200">
                                    <code className="font-mono">{testResult.ip}</code> would be{' '}
                                    <span className="font-semibold">{testResult.matched.action === 'Block' ? 'BLOCKED' : 'ALLOWED'}</span> by rule "
                                    {testResult.matched.label}" ({testResult.matched.cidr})
                                </p>
                            ) : (
                                <p className="text-slate-700 dark:text-slate-200">
                                    <code className="font-mono">{testResult.ip}</code> does not match any active rule — default policy applies.
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-4 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 flex-1 min-w-50">
                    <Search size={15} />
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by label or CIDR..."
                        className="bg-transparent outline-none w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                    />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={actionFilter}
                        onChange={(e) => setActionFilter(e.target.value as 'All' | IpRuleAction)}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Actions</option>
                        {ipRuleActionOptions.map((a) => (
                            <option key={a} value={a}>
                                {a}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={scopeFilter}
                        onChange={(e) => setScopeFilter(e.target.value as 'All' | IpRuleScope)}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Scopes</option>
                        {ipRuleScopeOptions.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
            </div>

            {/* Rules list */}
            <div className="flex flex-col gap-2">
                {filteredRules.map((rule) => (
                    <div
                        key={rule.id}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center gap-3"
                    >
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                <p className="font-medium text-slate-800 dark:text-white text-sm">{rule.label}</p>
                                <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${ipRuleActionBadge[rule.action]}`}>{rule.action}</span>
                                <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                    {rule.scope === 'API Key' ? `Key: ${rule.scopedKeyName}` : 'Global'}
                                </span>
                                <button onClick={() => handleToggleStatus(rule)} className="flex items-center gap-1.5 text-[11px] font-medium">
                                    <span className={`w-1.5 h-1.5 rounded-full ${ipRuleStatusDot[rule.status]}`} />
                                    <span className={`px-2 py-0.5 rounded-full ${ipRuleStatusBadge[rule.status]}`}>{rule.status}</span>
                                </button>
                            </div>
                            <code className="text-xs text-slate-500 dark:text-slate-400 font-mono">{rule.cidr}</code>
                            {rule.expiresAt && <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1">Expires: {rule.expiresAt}</p>}
                        </div>

                        <div className="flex items-center gap-5 shrink-0 text-center">
                            <div>
                                <p className="text-sm font-bold text-slate-800 dark:text-white">{rule.hitsToday}</p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500">Hits Today</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{rule.lastMatched}</p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500">Last Matched</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                            <button
                                onClick={() => handleToggleStatus(rule)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                                aria-label="Toggle status"
                            >
                                <Power size={14} />
                            </button>
                            <button
                                onClick={() => openEditModal(rule)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                                aria-label="Edit"
                            >
                                <Pencil size={14} />
                            </button>
                            <button
                                onClick={() => setDeleteTarget(rule)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                                aria-label="Delete"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}

                {filteredRules.length === 0 && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center text-slate-400 text-sm">
                        No rules match your filters.
                    </div>
                )}
            </div>

            {/* Create / Edit Modal */}
            {(modalMode === 'create' || modalMode === 'edit') && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="font-semibold text-slate-800 dark:text-white">{modalMode === 'create' ? 'Add IP Rule' : 'Edit IP Rule'}</h2>
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
                                    placeholder="e.g. HQ Office Network"
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">CIDR Range</label>
                                <input
                                    value={formCidr}
                                    onChange={(e) => setFormCidr(e.target.value)}
                                    placeholder="203.0.113.0/24"
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 font-mono"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Action</label>
                                    <div className="flex gap-2">
                                        {ipRuleActionOptions.map((a) => (
                                            <button
                                                key={a}
                                                onClick={() => setFormAction(a)}
                                                className={`flex-1 text-sm px-3 py-2 rounded-xl border transition ${formAction === a
                                                        ? a === 'Allow'
                                                            ? 'bg-green-600 border-green-600 text-white'
                                                            : 'bg-red-600 border-red-600 text-white'
                                                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                    }`}
                                            >
                                                {a}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Scope</label>
                                    <select
                                        value={formScope}
                                        onChange={(e) => setFormScope(e.target.value as IpRuleScope)}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                    >
                                        {ipRuleScopeOptions.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {formScope === 'API Key' && (
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Apply to Key</label>
                                    <select
                                        value={formKeyId}
                                        onChange={(e) => setFormKeyId(e.target.value)}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                    >
                                        {ipRuleAvailableKeys.map((k) => (
                                            <option key={k.id} value={k.id}>
                                                {k.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Expires On (optional)</label>
                                <input
                                    value={formExpiry}
                                    onChange={(e) => setFormExpiry(e.target.value)}
                                    placeholder="e.g. Aug 1, 2025"
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
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
                        <h2 className="font-semibold text-slate-800 dark:text-white mb-2">Delete IP Rule</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                            Are you sure you want to delete <span className="font-medium text-slate-700 dark:text-slate-200">{deleteTarget.label}</span>?
                            This cannot be undone.
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