'use client';

import { useState } from 'react';
import {
    Save,
    Plus,
    X,
    Trash2,
    Monitor,
    CheckCircle2,
    Fingerprint,
    Globe2,
    Clock,
    ShieldAlert,
} from 'lucide-react';
import {
    defaultPasswordPolicy,
    defaultAuthSecuritySettings,
    ipWhitelistEntries,
    activeSessionsList,
    securityOverviewStats,
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
    const [toast, setToast] = useState<string | null>(null);
    const [passwordPolicy, setPasswordPolicy] = useState(defaultPasswordPolicy);
    const [authSettings, setAuthSettings] = useState(defaultAuthSecuritySettings);
    const [ipList, setIpList] = useState(ipWhitelistEntries);
    const [sessions, setSessions] = useState(activeSessionsList);
    const [showAddIpModal, setShowAddIpModal] = useState(false);
    const [newIp, setNewIp] = useState({ ipAddress: '', label: '' });

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2000);
    };

    const handleAddIp = () => {
        if (!newIp.ipAddress.trim()) {
            showToast('Please enter an IP address.');
            return;
        }
        setIpList([
            {
                id: `ip-${Date.now()}`,
                ipAddress: newIp.ipAddress,
                label: newIp.label || 'Unnamed entry',
                addedBy: 'You',
                addedOn: 'Just now',
            },
            ...ipList,
        ]);
        setNewIp({ ipAddress: '', label: '' });
        setShowAddIpModal(false);
        showToast('IP address whitelisted!');
    };

    const removeIp = (id: string) => {
        setIpList((prev) => prev.filter((ip) => ip.id !== id));
        showToast('IP address removed from whitelist');
    };

    const revokeSession = (id: string) => {
        setSessions((prev) => prev.filter((s) => s.id !== id));
        showToast('Session revoked');
    };

    return (
        <div className="space-y-6">
            {/* Toast */}
            {toast && (
                <div className="fixed top-5 right-5 z-50 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-xl shadow-lg">
                    {toast}
                </div>
            )}

            {/* Add IP Modal */}
            {showAddIpModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                                Whitelist IP Address
                            </h2>
                            <button
                                onClick={() => setShowAddIpModal(false)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                                    IP Address
                                </label>
                                <input
                                    value={newIp.ipAddress}
                                    onChange={(e) =>
                                        setNewIp({ ...newIp, ipAddress: e.target.value })
                                    }
                                    placeholder="e.g. 203.0.113.45"
                                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                                    Label
                                </label>
                                <input
                                    value={newIp.label}
                                    onChange={(e) =>
                                        setNewIp({ ...newIp, label: e.target.value })
                                    }
                                    placeholder="e.g. Head Office Network"
                                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-6">
                            <button
                                onClick={() => setShowAddIpModal(false)}
                                className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddIp}
                                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition"
                            >
                                Add to Whitelist
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Security Settings
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Manage authentication policies, sessions, and access controls.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {securityOverviewStats.map((stat) => (
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
                                className={`text-xs mt-1 ${stat.change > 0
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

            {/* Password Policy */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                    <Fingerprint size={18} className="text-blue-600 dark:text-blue-400" />
                    <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        Password Policy
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    <div>
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                            Minimum Password Length
                        </label>
                        <input
                            type="number"
                            value={passwordPolicy.minLength}
                            onChange={(e) =>
                                setPasswordPolicy({
                                    ...passwordPolicy,
                                    minLength: Number(e.target.value),
                                })
                            }
                            className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                            Password Expiry (days)
                        </label>
                        <input
                            type="number"
                            value={passwordPolicy.expiryDays}
                            onChange={(e) =>
                                setPasswordPolicy({
                                    ...passwordPolicy,
                                    expiryDays: Number(e.target.value),
                                })
                            }
                            className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                            Prevent Reuse of Last N Passwords
                        </label>
                        <input
                            type="number"
                            value={passwordPolicy.preventReuse}
                            onChange={(e) =>
                                setPasswordPolicy({
                                    ...passwordPolicy,
                                    preventReuse: Number(e.target.value),
                                })
                            }
                            className="w-full sm:w-1/2 px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    {[
                        {
                            key: 'requireUppercase' as const,
                            label: 'Require at least one uppercase letter',
                        },
                        {
                            key: 'requireNumber' as const,
                            label: 'Require at least one number',
                        },
                        {
                            key: 'requireSpecialChar' as const,
                            label: 'Require at least one special character',
                        },
                    ].map((rule) => (
                        <div
                            key={rule.key}
                            className="flex items-center justify-between gap-3 py-1"
                        >
                            <span className="text-sm text-slate-600 dark:text-slate-300">
                                {rule.label}
                            </span>
                            <Toggle
                                checked={passwordPolicy[rule.key]}
                                onChange={() =>
                                    setPasswordPolicy({
                                        ...passwordPolicy,
                                        [rule.key]: !passwordPolicy[rule.key],
                                    })
                                }
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-end pt-5">
                    <button
                        onClick={() => showToast('Password policy saved!')}
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition"
                    >
                        <Save size={15} />
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Authentication & Sessions */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                    <Clock size={18} className="text-blue-600 dark:text-blue-400" />
                    <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        Authentication & Session Rules
                    </h2>
                </div>

                <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 mb-5">
                    <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                            Enforce Two-Factor Authentication
                        </p>
                        <p className="text-xs text-slate-400">
                            Require all admin users to enable 2FA on next login.
                        </p>
                    </div>
                    <Toggle
                        checked={authSettings.enforceTwoFactor}
                        onChange={() =>
                            setAuthSettings({
                                ...authSettings,
                                enforceTwoFactor: !authSettings.enforceTwoFactor,
                            })
                        }
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                            Session Timeout (minutes)
                        </label>
                        <input
                            type="number"
                            value={authSettings.sessionTimeoutMinutes}
                            onChange={(e) =>
                                setAuthSettings({
                                    ...authSettings,
                                    sessionTimeoutMinutes: Number(e.target.value),
                                })
                            }
                            className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                            Max Login Attempts
                        </label>
                        <input
                            type="number"
                            value={authSettings.maxLoginAttempts}
                            onChange={(e) =>
                                setAuthSettings({
                                    ...authSettings,
                                    maxLoginAttempts: Number(e.target.value),
                                })
                            }
                            className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                            Lockout Duration (minutes)
                        </label>
                        <input
                            type="number"
                            value={authSettings.lockoutDurationMinutes}
                            onChange={(e) =>
                                setAuthSettings({
                                    ...authSettings,
                                    lockoutDurationMinutes: Number(e.target.value),
                                })
                            }
                            className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                            Remember Device (days)
                        </label>
                        <input
                            type="number"
                            value={authSettings.rememberDeviceDays}
                            onChange={(e) =>
                                setAuthSettings({
                                    ...authSettings,
                                    rememberDeviceDays: Number(e.target.value),
                                })
                            }
                            className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-5">
                    <button
                        onClick={() => showToast('Authentication settings saved!')}
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition"
                    >
                        <Save size={15} />
                        Save Changes
                    </button>
                </div>
            </div>

            {/* IP Whitelist */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between gap-3 p-5 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                        <Globe2 size={18} className="text-blue-600 dark:text-blue-400" />
                        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                            IP Whitelist
                        </h2>
                    </div>
                    <button
                        onClick={() => setShowAddIpModal(true)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-medium transition"
                    >
                        <Plus size={14} />
                        Add IP
                    </button>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {ipList.map((ip) => (
                        <div
                            key={ip.id}
                            className="flex items-center justify-between gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                        >
                            <div>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                    {ip.ipAddress}
                                </p>
                                <p className="text-xs text-slate-400">
                                    {ip.label} • Added by {ip.addedBy} on {ip.addedOn}
                                </p>
                            </div>
                            <button
                                onClick={() => removeIp(ip.id)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                            >
                                <Trash2 size={15} />
                            </button>
                        </div>
                    ))}

                    {ipList.length === 0 && (
                        <div className="p-8 text-center text-sm text-slate-400">
                            No IP addresses whitelisted.
                        </div>
                    )}
                </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 p-5 border-b border-slate-200 dark:border-slate-800">
                    <Monitor size={18} className="text-blue-600 dark:text-blue-400" />
                    <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        Active Sessions
                    </h2>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {sessions.map((s) => (
                        <div
                            key={s.id}
                            className="flex items-center justify-between gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <img
                                    src={s.userAvatar}
                                    alt={s.userName}
                                    className="w-9 h-9 rounded-full object-cover shrink-0"
                                />
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                                            {s.userName}
                                        </p>
                                        {s.isCurrent && (
                                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 shrink-0">
                                                <CheckCircle2 size={10} />
                                                This device
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-400 truncate">
                                        {s.device} • {s.location} • {s.ipAddress}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                                <span className="text-xs text-slate-400 whitespace-nowrap">
                                    {s.lastActive}
                                </span>
                                {!s.isCurrent && (
                                    <button
                                        onClick={() => revokeSession(s.id)}
                                        className="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition whitespace-nowrap"
                                    >
                                        Revoke
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {sessions.length === 0 && (
                        <div className="p-8 text-center text-sm text-slate-400">
                            No active sessions.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;