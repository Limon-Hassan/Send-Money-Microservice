'use client';

import { useState } from 'react';
import {
    Server,
    FlaskConical,
    Copy,
    Check,
    RefreshCw,
    AlertTriangle,
    X,
    ArrowUpRight,
    KeyRound,
    Webhook,
    Activity,
    Wrench,
    RotateCcw,
    CheckCircle2,
    Circle,
} from 'lucide-react';
import {
    envManagerSnapshots,
    envManagerConfigDiffs,
    envManagerPendingChanges,
    envManagerHealthBadge,
    envManagerHealthDot,
    envManagerEnvBadge,
    envManagerChangeTypeBadge,
    type EnvManagerSnapshot,
    type EnvManagerPendingChange,
} from '@/lib/data';

export default function SandboxProductionPage() {
    const [snapshots, setSnapshots] = useState<EnvManagerSnapshot[]>(envManagerSnapshots);
    const [toast, setToast] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [promoteModalOpen, setPromoteModalOpen] = useState(false);
    const [selectedChanges, setSelectedChanges] = useState<Set<string>>(
        new Set(envManagerPendingChanges.filter((c) => c.testedInSandbox).map((c) => c.id))
    );
    const [isPromoting, setIsPromoting] = useState(false);
    const [pendingChanges, setPendingChanges] = useState<EnvManagerPendingChange[]>(envManagerPendingChanges);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const handleCopyUrl = (snap: EnvManagerSnapshot) => {
        setCopiedId(snap.id);
        showToast('Base URL copied');
        setTimeout(() => setCopiedId(null), 1500);
    };

    const handleToggleMaintenance = (snap: EnvManagerSnapshot) => {
        setSnapshots((prev) =>
            prev.map((s) =>
                s.id === snap.id
                    ? { ...s, maintenanceMode: !s.maintenanceMode, health: !s.maintenanceMode ? 'Maintenance' : 'Operational' }
                    : s
            )
        );
        showToast(`${snap.environment} maintenance mode ${snap.maintenanceMode ? 'disabled' : 'enabled'}`);
    };

    const handleRefreshHealth = (snap: EnvManagerSnapshot) => {
        showToast(`${snap.environment} health refreshed`);
    };

    const toggleChangeSelection = (id: string) => {
        setSelectedChanges((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const handleConfirmReset = () => {
        setIsResetting(true);
        setTimeout(() => {
            setIsResetting(false);
            setResetConfirmOpen(false);
            showToast('Sandbox data has been reset to defaults');
        }, 1200);
    };

    const handleConfirmPromote = () => {
        setIsPromoting(true);
        setTimeout(() => {
            setIsPromoting(false);
            setPromoteModalOpen(false);
            const promotedCount = selectedChanges.size;
            setPendingChanges((prev) => prev.filter((c) => !selectedChanges.has(c.id)));
            setSelectedChanges(new Set());
            showToast(`${promotedCount} change${promotedCount !== 1 ? 's' : ''} promoted to Production`);
        }, 1400);
    };

    const production = snapshots.find((s) => s.environment === 'Production')!;
    const sandbox = snapshots.find((s) => s.environment === 'Sandbox')!;

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
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Sandbox / Production</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Compare environments, manage maintenance mode, and promote tested changes to production.
                    </p>
                </div>
                <button
                    onClick={() => setPromoteModalOpen(true)}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium w-fit"
                >
                    <ArrowUpRight size={16} />
                    Promote Changes
                </button>
            </div>

            {/* Environment cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                {[production, sandbox].map((snap) => {
                    const EnvIcon = snap.environment === 'Production' ? Server : FlaskConical;
                    return (
                        <div key={snap.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`p-2.5 rounded-xl ${snap.environment === 'Production'
                                                ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                                                : 'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400'
                                            }`}
                                    >
                                        <EnvIcon size={20} />
                                    </span>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="font-semibold text-slate-800 dark:text-white">{snap.environment}</h2>
                                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${envManagerEnvBadge[snap.environment]}`}>
                                                {snap.versionTag}
                                            </span>
                                        </div>
                                        <span className="flex items-center gap-1.5 text-xs font-medium mt-1">
                                            <span className={`w-1.5 h-1.5 rounded-full ${envManagerHealthDot[snap.health]}`} />
                                            <span className={`px-2 py-0.5 rounded-full ${envManagerHealthBadge[snap.health]}`}>{snap.health}</span>
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRefreshHealth(snap)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                                    aria-label="Refresh health"
                                >
                                    <RefreshCw size={14} />
                                </button>
                            </div>

                            <div className="flex items-center gap-2 mb-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl px-3 py-2">
                                <code className="flex-1 text-xs text-slate-600 dark:text-slate-300 font-mono truncate">{snap.baseUrl}</code>
                                <button onClick={() => handleCopyUrl(snap)} className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 shrink-0">
                                    {copiedId === snap.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-3">
                                    <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 mb-1">
                                        <KeyRound size={12} />
                                        <span className="text-[11px]">Active Keys</span>
                                    </div>
                                    <p className="text-lg font-bold text-slate-800 dark:text-white">{snap.activeKeys}</p>
                                </div>
                                <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-3">
                                    <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 mb-1">
                                        <Webhook size={12} />
                                        <span className="text-[11px]">Webhooks</span>
                                    </div>
                                    <p className="text-lg font-bold text-slate-800 dark:text-white">{snap.activeWebhooks}</p>
                                </div>
                                <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-3">
                                    <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 mb-1">
                                        <Activity size={12} />
                                        <span className="text-[11px]">Requests Today</span>
                                    </div>
                                    <p className="text-lg font-bold text-slate-800 dark:text-white">{snap.requestsToday.toLocaleString()}</p>
                                </div>
                                <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-3">
                                    <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 mb-1">
                                        <Activity size={12} />
                                        <span className="text-[11px]">Avg Response</span>
                                    </div>
                                    <p className="text-lg font-bold text-slate-800 dark:text-white">{snap.avgResponseMs} ms</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
                                <span>Uptime: {snap.uptime}</span>
                                <span>Last deployed: {snap.lastDeployedAt}</span>
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
                                <div className="flex items-center gap-2">
                                    <Wrench size={14} className="text-slate-400" />
                                    <span className="text-sm text-slate-600 dark:text-slate-300">Maintenance Mode</span>
                                </div>
                                <button
                                    onClick={() => handleToggleMaintenance(snap)}
                                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition shrink-0 ${snap.maintenanceMode ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition ${snap.maintenanceMode ? 'translate-x-5' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>

                            {snap.environment === 'Sandbox' && (
                                <button
                                    onClick={() => setResetConfirmOpen(true)}
                                    className="mt-3 w-full flex items-center justify-center gap-2 text-xs px-3 py-2 rounded-xl border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                                >
                                    <RotateCcw size={13} />
                                    Reset Sandbox Data
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Config diffs */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                    <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-1">Configuration Differences</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Settings that differ between Production and Sandbox.</p>
                    <div className="flex flex-col gap-2">
                        {envManagerConfigDiffs.map((diff) => (
                            <div
                                key={diff.id}
                                className={`border rounded-xl p-3 ${diff.isDifferent ? 'border-amber-200 dark:border-amber-500/30 bg-amber-50/40 dark:bg-amber-500/5' : 'border-slate-100 dark:border-slate-800'
                                    }`}
                            >
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <code className="text-xs font-mono text-slate-700 dark:text-slate-200">{diff.key}</code>
                                    {diff.isDifferent && (
                                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                                            Differs
                                        </span>
                                    )}
                                </div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">{diff.description}</p>
                                <div className="flex items-center gap-4 text-xs">
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        <span className="text-slate-500 dark:text-slate-400">Prod:</span>
                                        <span className="font-medium text-slate-700 dark:text-slate-200">{diff.productionValue}</span>
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                        <span className="text-slate-500 dark:text-slate-400">Sandbox:</span>
                                        <span className="font-medium text-slate-700 dark:text-slate-200">{diff.sandboxValue}</span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pending changes */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                    <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-1">Pending Changes</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Tested in Sandbox and ready to promote to Production.</p>
                    <div className="flex flex-col gap-2">
                        {pendingChanges.map((change) => (
                            <div key={change.id} className="border border-slate-100 dark:border-slate-800 rounded-xl p-3 flex items-start gap-2">
                                {change.testedInSandbox ? (
                                    <CheckCircle2 size={15} className="text-green-500 mt-0.5 shrink-0" />
                                ) : (
                                    <AlertTriangle size={15} className="text-amber-500 mt-0.5 shrink-0" />
                                )}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${envManagerChangeTypeBadge[change.type]}`}>
                                            {change.type}
                                        </span>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">{change.label}</p>
                                    </div>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{change.detail}</p>
                                    {!change.testedInSandbox && (
                                        <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1">Not yet tested in sandbox</p>
                                    )}
                                </div>
                            </div>
                        ))}
                        {pendingChanges.length === 0 && (
                            <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-4">No pending changes. Everything is in sync.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Promote changes modal */}
            {promoteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="font-semibold text-slate-800 dark:text-white">Promote Changes to Production</h2>
                            <button onClick={() => setPromoteModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-5 space-y-3">
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Select which sandbox changes to deploy to production.</p>
                            {pendingChanges.map((change) => {
                                const isSelected = selectedChanges.has(change.id);
                                return (
                                    <button
                                        key={change.id}
                                        onClick={() => toggleChangeSelection(change.id)}
                                        className={`w-full flex items-start gap-3 text-left border rounded-xl p-3 transition ${isSelected
                                                ? 'border-blue-300 dark:border-blue-500/50 bg-blue-50/50 dark:bg-blue-500/5'
                                                : 'border-slate-100 dark:border-slate-800'
                                            }`}
                                    >
                                        {isSelected ? (
                                            <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                                        ) : (
                                            <Circle size={16} className="text-slate-300 dark:text-slate-600 mt-0.5 shrink-0" />
                                        )}
                                        <div>
                                            <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${envManagerChangeTypeBadge[change.type]}`}>
                                                    {change.type}
                                                </span>
                                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{change.label}</p>
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{change.detail}</p>
                                            {!change.testedInSandbox && (
                                                <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1">
                                                    <AlertTriangle size={11} /> Not tested in sandbox — promoting is risky
                                                </p>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                            {pendingChanges.length === 0 && (
                                <p className="text-sm text-slate-400 text-center py-6">No pending changes to promote.</p>
                            )}
                        </div>
                        <div className="flex items-center justify-end gap-2 p-5 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={() => setPromoteModalOpen(false)}
                                className="text-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmPromote}
                                disabled={selectedChanges.size === 0 || isPromoting}
                                className="text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium disabled:opacity-50 flex items-center gap-2"
                            >
                                {isPromoting && <RefreshCw size={14} className="animate-spin" />}
                                {isPromoting ? 'Promoting...' : `Promote ${selectedChanges.size} Change${selectedChanges.size !== 1 ? 's' : ''}`}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reset sandbox confirmation modal */}
            {resetConfirmOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm p-5">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle size={18} className="text-red-600 dark:text-red-400" />
                            <h2 className="font-semibold text-slate-800 dark:text-white">Reset Sandbox Data</h2>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                            This will permanently delete all test transactions, customers, and logs in the Sandbox environment and restore default seed
                            data. This cannot be undone.
                        </p>
                        <div className="flex items-center justify-end gap-2">
                            <button
                                onClick={() => setResetConfirmOpen(false)}
                                className="text-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmReset}
                                disabled={isResetting}
                                className="text-sm px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 font-medium disabled:opacity-50 flex items-center gap-2"
                            >
                                {isResetting && <RefreshCw size={14} className="animate-spin" />}
                                {isResetting ? 'Resetting...' : 'Reset Sandbox'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}