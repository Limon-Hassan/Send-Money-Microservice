'use client';

import { useState } from 'react';
import {
    DatabaseBackup,
    Download,
    RotateCcw,
    Save,
    CheckCircle2,
    XCircle,
    Loader2,
    X,
    AlertTriangle,
} from 'lucide-react';
import {
    backupHistory,
    backupStatusBadgeStyles,
    backupTypeBadgeStyles,
    defaultBackupSchedule,
    backupFrequencyOptions,
    incrementalFrequencyOptions,
    availableRestorePoints,
    backupOverviewStats,
    type BackupEntry,
} from '@/lib/data';

const Toggle = ({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: () => void;
}) => (
    <button
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition shrink-0 ${checked ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
    >
        <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : ''
                }`}
        />
    </button>
);

const Page = () => {
    const [backups, setBackups] = useState(backupHistory);
    const [schedule, setSchedule] = useState(defaultBackupSchedule);
    const [isBackingUp, setIsBackingUp] = useState(false);
    const [restoreTarget, setRestoreTarget] = useState<string | null>(null);
    const [isRestoring, setIsRestoring] = useState(false);
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const handleManualBackup = () => {
        setIsBackingUp(true);
        showToast('Manual backup started...');
        setTimeout(() => {
            const newBackup: BackupEntry = {
                id: `bkp-${Date.now()}`,
                name: 'Manual Backup',
                type: 'Full',
                status: 'Success',
                sizeGb: 48.5,
                startedAt: 'Just now',
                duration: '21 min',
                triggeredBy: 'You (Manual)',
                storageLocation: 'AWS S3 (ap-southeast-1)',
            };
            setBackups([newBackup, ...backups]);
            setIsBackingUp(false);
            showToast('Manual backup completed successfully!');
        }, 2200);
    };

    const handleRestore = () => {
        if (!restoreTarget) return;
        setIsRestoring(true);
        setTimeout(() => {
            setIsRestoring(false);
            setRestoreTarget(null);
            showToast('System restored successfully!');
        }, 2200);
    };

    const handleDownload = (backup: BackupEntry) => {
        showToast(`Downloading ${backup.name} (${backup.sizeGb} GB)...`);
    };

    const restorePointInfo = availableRestorePoints.find(
        (r) => r.id === restoreTarget,
    );

    return (
        <div className="space-y-6">
            {/* Toast */}
            {toast && (
                <div className="fixed top-5 right-5 z-50 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-xl shadow-lg">
                    {toast}
                </div>
            )}

            {/* Restore Confirm Modal */}
            {restoreTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-sm p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <AlertTriangle size={20} className="text-amber-500" />
                            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                                Restore from this point?
                            </h2>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                            Restoring to{' '}
                            <span className="font-medium text-slate-700 dark:text-slate-200">
                                {restorePointInfo?.label}
                            </span>{' '}
                            will overwrite current data. This action cannot be undone.
                        </p>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setRestoreTarget(null)}
                                disabled={isRestoring}
                                className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRestore}
                                disabled={isRestoring}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-medium transition disabled:opacity-70"
                            >
                                {isRestoring && <Loader2 size={14} className="animate-spin" />}
                                {isRestoring ? 'Restoring...' : 'Restore Now'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Backup & Recovery
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Manage automated backups and restore points.
                    </p>
                </div>

                <button
                    onClick={handleManualBackup}
                    disabled={isBackingUp}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl text-sm font-medium transition"
                >
                    {isBackingUp ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <DatabaseBackup size={16} />
                    )}
                    {isBackingUp ? 'Backing up...' : 'Run Manual Backup'}
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {backupOverviewStats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4"
                    >
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                            {stat.label}
                        </p>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">
                            {stat.value}
                        </p>
                        {stat.change !== 0 ? (
                            <p
                                className={`text-xs mt-1 ${stat.change <= 0
                                        ? 'text-emerald-600 dark:text-emerald-400'
                                        : 'text-red-500'
                                    }`}
                            >
                                {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}%{' '}
                                <span className="text-slate-400">{stat.changeLabel}</span>
                            </p>
                        ) : (
                            <p className="text-xs mt-1 text-slate-400">{stat.changeLabel}</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Backup Schedule */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-5">
                    Backup Schedule
                </h2>

                <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 mb-5">
                    <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                            Automatic Backups
                        </p>
                        <p className="text-xs text-slate-400">
                            Enable scheduled full and incremental backups.
                        </p>
                    </div>
                    <Toggle
                        checked={schedule.autoBackupEnabled}
                        onChange={() =>
                            setSchedule({
                                ...schedule,
                                autoBackupEnabled: !schedule.autoBackupEnabled,
                            })
                        }
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                            Full Backup Frequency
                        </label>
                        <select
                            value={schedule.fullBackupFrequency}
                            onChange={(e) =>
                                setSchedule({ ...schedule, fullBackupFrequency: e.target.value })
                            }
                            disabled={!schedule.autoBackupEnabled}
                            className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 disabled:opacity-50"
                        >
                            {backupFrequencyOptions.map((opt) => (
                                <option key={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                            Incremental Backup Frequency
                        </label>
                        <select
                            value={schedule.incrementalFrequency}
                            onChange={(e) =>
                                setSchedule({ ...schedule, incrementalFrequency: e.target.value })
                            }
                            disabled={!schedule.autoBackupEnabled}
                            className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 disabled:opacity-50"
                        >
                            {incrementalFrequencyOptions.map((opt) => (
                                <option key={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                            Retention Period (days)
                        </label>
                        <input
                            type="number"
                            value={schedule.retentionDays}
                            onChange={(e) =>
                                setSchedule({
                                    ...schedule,
                                    retentionDays: Number(e.target.value),
                                })
                            }
                            className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                            Storage Provider
                        </label>
                        <input
                            value={schedule.storageProvider}
                            disabled
                            className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-500 dark:text-slate-400"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-5">
                    <button
                        onClick={() => showToast('Backup schedule saved!')}
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition"
                    >
                        <Save size={15} />
                        Save Schedule
                    </button>
                </div>
            </div>

            {/* Restore Points */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-5">
                    Available Restore Points
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {availableRestorePoints.map((rp) => (
                        <div
                            key={rp.id}
                            className="flex items-center justify-between gap-3 p-4 rounded-xl border border-slate-100 dark:border-slate-800"
                        >
                            <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                        {rp.date}
                                    </p>
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${backupTypeBadgeStyles[rp.type]}`}
                                    >
                                        {rp.type}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 truncate">{rp.label}</p>
                                <p className="text-xs text-slate-400">{rp.sizeGb} GB</p>
                            </div>

                            <button
                                onClick={() => setRestoreTarget(rp.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition shrink-0"
                            >
                                <RotateCcw size={13} />
                                Restore
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Backup History */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        Backup History
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-225">
                        <thead className="bg-slate-50 dark:bg-slate-800/50">
                            <tr className="text-left text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                <th className="px-5 py-3">Backup Name</th>
                                <th className="px-5 py-3">Type</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3">Size</th>
                                <th className="px-5 py-3">Started</th>
                                <th className="px-5 py-3">Duration</th>
                                <th className="px-5 py-3 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {backups.map((b) => (
                                <tr
                                    key={b.id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                                >
                                    <td className="px-5 py-3">
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">
                                            {b.name}
                                        </p>
                                        <p className="text-xs text-slate-400">{b.triggeredBy}</p>
                                    </td>

                                    <td className="px-5 py-3">
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${backupTypeBadgeStyles[b.type]}`}
                                        >
                                            {b.type}
                                        </span>
                                    </td>

                                    <td className="px-5 py-3">
                                        <span
                                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium w-fit whitespace-nowrap ${backupStatusBadgeStyles[b.status]}`}
                                        >
                                            {b.status === 'Success' && <CheckCircle2 size={12} />}
                                            {b.status === 'Failed' && <XCircle size={12} />}
                                            {b.status === 'In Progress' && (
                                                <Loader2 size={12} className="animate-spin" />
                                            )}
                                            {b.status}
                                        </span>
                                    </td>

                                    <td className="px-5 py-3 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                        {b.sizeGb > 0 ? `${b.sizeGb} GB` : '-'}
                                    </td>

                                    <td className="px-5 py-3 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                        {b.startedAt}
                                    </td>

                                    <td className="px-5 py-3 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                        {b.duration}
                                    </td>

                                    <td className="px-5 py-3">
                                        <div className="flex items-center justify-center">
                                            <button
                                                onClick={() => handleDownload(b)}
                                                disabled={b.status !== 'Success'}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition disabled:opacity-30 disabled:hover:bg-transparent"
                                            >
                                                <Download size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Page;