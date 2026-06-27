'use client';

import { useState, useMemo } from 'react';
import {
    Search,
    ChevronDown,
    Plus,
    Trash2,
    X,
    ShieldOff,
    ShieldAlert,
    Clock,
    ShieldCheck,
    CheckCircle2,
    AlertTriangle,
} from 'lucide-react';
import {
    blacklistStats,
    blacklistData,
    blacklistStatusBadge,
    blacklistStatusDot,
    blacklistReasonBadge,
    blacklistEntryTypeOptions,
    blacklistReasonOptions,
    blacklistStatusOptions,
    blacklistTotalCount,
    type BlacklistEntry,
    type BlacklistEntryType,
    type BlacklistReason,
    type BlacklistStatus,
} from '@/lib/data';

const statIconMap = {
    total: ShieldOff,
    active: ShieldAlert,
    review: Clock,
    lifted: ShieldCheck,
} as const;

const statIconColor: Record<string, string> = {
    total: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
    active: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400',
    review: 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    lifted: 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400',
};

export default function CustomerBlacklistPage() {
    const [entries, setEntries] = useState<BlacklistEntry[]>(blacklistData);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<'All' | BlacklistEntryType>('All');
    const [statusFilter, setStatusFilter] = useState<'All' | BlacklistStatus>('All');
    const [toast, setToast] = useState<string | null>(null);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [liftTarget, setLiftTarget] = useState<BlacklistEntry | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<BlacklistEntry | null>(null);

    // form state
    const [formEntryType, setFormEntryType] = useState<BlacklistEntryType>('Customer Account');
    const [formIdentifier, setFormIdentifier] = useState('');
    const [formRelatedName, setFormRelatedName] = useState('');
    const [formReason, setFormReason] = useState<BlacklistReason>('Fraud');
    const [formNotes, setFormNotes] = useState('');

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const resetForm = () => {
        setFormEntryType('Customer Account');
        setFormIdentifier('');
        setFormRelatedName('');
        setFormReason('Fraud');
        setFormNotes('');
    };

    const handleCreateSubmit = () => {
        if (!formIdentifier.trim() || !formNotes.trim()) {
            showToast('Please provide an identifier and notes');
            return;
        }
        const newEntry: BlacklistEntry = {
            id: `bl-${Date.now()}`,
            entryType: formEntryType,
            identifier: formIdentifier.trim(),
            relatedCustomerName: formRelatedName.trim() || null,
            reason: formReason,
            notes: formNotes.trim(),
            status: 'Active',
            blacklistedBy: 'Admin Rahman',
            blacklistedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            reviewDate: null,
        };
        setEntries((prev) => [newEntry, ...prev]);
        showToast(`"${newEntry.identifier}" added to blacklist`);
        setCreateModalOpen(false);
        resetForm();
    };

    const handleLift = () => {
        if (!liftTarget) return;
        setEntries((prev) => prev.map((e) => (e.id === liftTarget.id ? { ...e, status: 'Lifted' } : e)));
        showToast(`Blacklist lifted for "${liftTarget.identifier}"`);
        setLiftTarget(null);
    };

    const handleMarkUnderReview = (entry: BlacklistEntry) => {
        setEntries((prev) => prev.map((e) => (e.id === entry.id ? { ...e, status: 'Under Review' } : e)));
        showToast(`"${entry.identifier}" marked for review`);
    };

    const confirmDelete = () => {
        if (!deleteTarget) return;
        setEntries((prev) => prev.filter((e) => e.id !== deleteTarget.id));
        showToast(`Entry "${deleteTarget.identifier}" removed`);
        setDeleteTarget(null);
    };

    const filteredEntries = useMemo(() => {
        return entries.filter((e) => {
            const matchesSearch = searchQuery
                ? e.identifier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (e.relatedCustomerName ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                e.notes.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            const matchesType = typeFilter === 'All' ? true : e.entryType === typeFilter;
            const matchesStatus = statusFilter === 'All' ? true : e.status === statusFilter;
            return matchesSearch && matchesType && matchesStatus;
        });
    }, [entries, searchQuery, typeFilter, statusFilter]);

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
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Blacklist</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage blocked customers, phone numbers, devices, and accounts flagged for fraud or compliance risk.
                    </p>
                </div>
                <button
                    onClick={() => setCreateModalOpen(true)}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition font-medium w-fit"
                >
                    <Plus size={16} />
                    Add to Blacklist
                </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {blacklistStats.map((stat) => {
                    const Icon = statIconMap[stat.icon];
                    return (
                        <div key={stat.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-3">
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
                        placeholder="Search by identifier, name, or notes..."
                        className="bg-transparent outline-none w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                    />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value as 'All' | BlacklistEntryType)}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Entry Types</option>
                        {blacklistEntryTypeOptions.map((t) => (
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
                        onChange={(e) => setStatusFilter(e.target.value as 'All' | BlacklistStatus)}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Statuses</option>
                        {blacklistStatusOptions.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
            </div>

            {/* Entries list */}
            <div className="flex flex-col gap-3">
                {filteredEntries.map((entry) => (
                    <div key={entry.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                            <div>
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <code className="text-sm font-mono font-semibold text-slate-800 dark:text-white">{entry.identifier}</code>
                                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                        {entry.entryType}
                                    </span>
                                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${blacklistReasonBadge[entry.reason]}`}>{entry.reason}</span>
                                </div>
                                {entry.relatedCustomerName && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Related customer: {entry.relatedCustomerName}</p>
                                )}
                            </div>
                            <span className="flex items-center gap-1.5 text-xs font-medium whitespace-nowrap shrink-0">
                                <span className={`w-1.5 h-1.5 rounded-full ${blacklistStatusDot[entry.status]}`} />
                                <span className={`px-2 py-0.5 rounded-full ${blacklistStatusBadge[entry.status]}`}>{entry.status}</span>
                            </span>
                        </div>

                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{entry.notes}</p>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                                Blacklisted by {entry.blacklistedBy} on {entry.blacklistedAt}
                                {entry.reviewDate && <span> · Review by {entry.reviewDate}</span>}
                            </p>
                            <div className="flex items-center gap-1.5 shrink-0">
                                {entry.status === 'Active' && (
                                    <button
                                        onClick={() => handleMarkUnderReview(entry)}
                                        className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-amber-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10"
                                    >
                                        <Clock size={12} /> Mark for Review
                                    </button>
                                )}
                                {entry.status !== 'Lifted' && (
                                    <button
                                        onClick={() => setLiftTarget(entry)}
                                        className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-green-200 dark:border-green-500/30 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/10"
                                    >
                                        <CheckCircle2 size={12} /> Lift Blacklist
                                    </button>
                                )}
                                <button
                                    onClick={() => setDeleteTarget(entry)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                                    aria-label="Delete entry"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredEntries.length === 0 && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center text-slate-400 text-sm">
                        No blacklist entries match your filters.
                    </div>
                )}
            </div>

            <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 text-center">
                Showing {filteredEntries.length} of {blacklistTotalCount.toLocaleString()} entries
            </p>

            {/* Add to blacklist modal */}
            {createModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="font-semibold text-slate-800 dark:text-white">Add to Blacklist</h2>
                            <button
                                onClick={() => {
                                    setCreateModalOpen(false);
                                    resetForm();
                                }}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-5 space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Entry Type</label>
                                    <select
                                        value={formEntryType}
                                        onChange={(e) => setFormEntryType(e.target.value as BlacklistEntryType)}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                    >
                                        {blacklistEntryTypeOptions.map((t) => (
                                            <option key={t} value={t}>
                                                {t}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Reason</label>
                                    <select
                                        value={formReason}
                                        onChange={(e) => setFormReason(e.target.value as BlacklistReason)}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                    >
                                        {blacklistReasonOptions.map((r) => (
                                            <option key={r} value={r}>
                                                {r}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">
                                    {formEntryType === 'Phone Number'
                                        ? 'Phone Number'
                                        : formEntryType === 'National ID'
                                            ? 'National ID Number'
                                            : formEntryType === 'Bank Account'
                                                ? 'Bank Account Number'
                                                : formEntryType === 'Device'
                                                    ? 'Device ID / Fingerprint'
                                                    : 'Customer ID'}
                                </label>
                                <input
                                    value={formIdentifier}
                                    onChange={(e) => setFormIdentifier(e.target.value)}
                                    placeholder="e.g. CUST_1234 or +8801XXXXXXXXX"
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 font-mono"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Related Customer Name (optional)</label>
                                <input
                                    value={formRelatedName}
                                    onChange={(e) => setFormRelatedName(e.target.value)}
                                    placeholder="e.g. Jasim Uddin"
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Notes</label>
                                <textarea
                                    value={formNotes}
                                    onChange={(e) => setFormNotes(e.target.value)}
                                    rows={3}
                                    placeholder="Explain why this is being blacklisted..."
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 resize-none"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 p-5 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={() => {
                                    setCreateModalOpen(false);
                                    resetForm();
                                }}
                                className="text-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button onClick={handleCreateSubmit} className="text-sm px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 font-medium">
                                Add to Blacklist
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Lift confirmation modal */}
            {liftTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm p-5">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle size={18} className="text-amber-500" />
                            <h2 className="font-semibold text-slate-800 dark:text-white">Lift Blacklist</h2>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                            This will restore normal access for{' '}
                            <code className="font-mono text-slate-700 dark:text-slate-200">{liftTarget.identifier}</code>. Make sure the underlying issue
                            has been resolved.
                        </p>
                        <div className="flex items-center justify-end gap-2">
                            <button
                                onClick={() => setLiftTarget(null)}
                                className="text-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button onClick={handleLift} className="text-sm px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 font-medium">
                                Lift Blacklist
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete confirmation modal */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm p-5">
                        <h2 className="font-semibold text-slate-800 dark:text-white mb-2">Delete Entry</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                            Are you sure you want to permanently remove{' '}
                            <code className="font-mono text-slate-700 dark:text-slate-200">{deleteTarget.identifier}</code> from the blacklist records?
                        </p>
                        <div className="flex items-center justify-end gap-2">
                            <button
                                onClick={() => setDeleteTarget(null)}
                                className="text-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button onClick={confirmDelete} className="text-sm px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 font-medium">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}