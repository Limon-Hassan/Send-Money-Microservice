'use client';

import { useState } from 'react';
import {
    ShieldCheck,
    Plus,
    Trash2,
    X,
    Globe,
    KeyRound,
    Network,
    Webhook,
    ScrollText,
    AlertTriangle,
    Save,
} from 'lucide-react';
import {
    apiSecurityTabs,
    apiSecurityGeneralSettings,
    apiSecurityAllowedOrigins,
    apiSecurityAuthDefaults,
    apiSecuritySignatureAlgorithmOptions,
    apiSecurityIpSettingsDefaults,
    apiSecurityIpAllowlist,
    apiSecurityWebhookDefaults,
    apiSecurityRotationDaysOptions,
    apiSecurityAuditDefaults,
    apiSecurityRetentionDaysOptions,
    apiSecurityEventBadge,
    apiSecurityRecentEvents,
    type ApiSecurityTabId,
    type ApiSecurityToggleSetting,
    type ApiSecurityAuthSettings,
    type ApiSecurityIpSettings,
    type ApiSecurityIpRule,
    type ApiSecurityWebhookSettings,
    type ApiSecurityAuditSettings,
} from '@/lib/data';

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
    return (
        <button
            onClick={onChange}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition shrink-0 ${checked ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
        >
            <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition ${checked ? 'translate-x-5' : 'translate-x-1'}`}
            />
        </button>
    );
}

const tabIconMap: Record<ApiSecurityTabId, typeof ShieldCheck> = {
    General: Globe,
    Authentication: KeyRound,
    'IP Access': Network,
    'Webhook Security': Webhook,
    'Audit & Compliance': ScrollText,
};

export default function ApiSecuritySettingsPage() {
    const [activeTab, setActiveTab] = useState<ApiSecurityTabId>('General');
    const [toast, setToast] = useState<string | null>(null);

    // General
    const [generalSettings, setGeneralSettings] = useState<ApiSecurityToggleSetting[]>(apiSecurityGeneralSettings);
    const [allowedOrigins, setAllowedOrigins] = useState<string[]>(apiSecurityAllowedOrigins);
    const [newOrigin, setNewOrigin] = useState('');
    const [confirmDisableId, setConfirmDisableId] = useState<string | null>(null);

    // Authentication
    const [authSettings, setAuthSettings] = useState<ApiSecurityAuthSettings>(apiSecurityAuthDefaults);

    // IP Access
    const [ipSettings, setIpSettings] = useState<ApiSecurityIpSettings>(apiSecurityIpSettingsDefaults);
    const [ipAllowlist, setIpAllowlist] = useState<ApiSecurityIpRule[]>(apiSecurityIpAllowlist);
    const [newIpLabel, setNewIpLabel] = useState('');
    const [newIpRange, setNewIpRange] = useState('');

    // Webhook security
    const [webhookSettings, setWebhookSettings] = useState<ApiSecurityWebhookSettings>(apiSecurityWebhookDefaults);

    // Audit
    const [auditSettings, setAuditSettings] = useState<ApiSecurityAuditSettings>(apiSecurityAuditDefaults);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const handleToggleGeneral = (setting: ApiSecurityToggleSetting) => {
        if (setting.critical && setting.enabled) {
            setConfirmDisableId(setting.id);
            return;
        }
        setGeneralSettings((prev) => prev.map((s) => (s.id === setting.id ? { ...s, enabled: !s.enabled } : s)));
        showToast(`${setting.label} ${setting.enabled ? 'disabled' : 'enabled'}`);
    };

    const confirmDisableCritical = () => {
        if (!confirmDisableId) return;
        const setting = generalSettings.find((s) => s.id === confirmDisableId);
        setGeneralSettings((prev) => prev.map((s) => (s.id === confirmDisableId ? { ...s, enabled: false } : s)));
        showToast(`${setting?.label} disabled`);
        setConfirmDisableId(null);
    };

    const handleAddOrigin = () => {
        if (!newOrigin.trim()) return;
        if (allowedOrigins.includes(newOrigin.trim())) {
            showToast('Origin already in the allowlist');
            return;
        }
        setAllowedOrigins((prev) => [...prev, newOrigin.trim()]);
        showToast(`Origin "${newOrigin.trim()}" added`);
        setNewOrigin('');
    };

    const handleRemoveOrigin = (origin: string) => {
        setAllowedOrigins((prev) => prev.filter((o) => o !== origin));
        showToast(`Origin "${origin}" removed`);
    };

    const handleAddIpRule = () => {
        if (!newIpLabel.trim() || !newIpRange.trim()) {
            showToast('Please provide a label and IP range');
            return;
        }
        const newRule: ApiSecurityIpRule = {
            id: `ip-${Date.now()}`,
            label: newIpLabel.trim(),
            ipRange: newIpRange.trim(),
            appliesTo: 'All Keys',
            addedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        };
        setIpAllowlist((prev) => [newRule, ...prev]);
        showToast(`IP rule "${newRule.label}" added`);
        setNewIpLabel('');
        setNewIpRange('');
    };

    const handleRemoveIpRule = (id: string) => {
        const rule = ipAllowlist.find((r) => r.id === id);
        setIpAllowlist((prev) => prev.filter((r) => r.id !== id));
        showToast(`IP rule "${rule?.label}" removed`);
    };

    const handleSaveAll = () => {
        showToast('Security settings saved');
    };

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
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Security Settings</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Configure transport, authentication, and access-control policies for the API platform.
                    </p>
                </div>
                <button
                    onClick={handleSaveAll}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium w-fit"
                >
                    <Save size={16} />
                    Save Changes
                </button>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-1 mb-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1.5 w-fit">
                {apiSecurityTabs.map((tab) => {
                    const Icon = tabIconMap[tab];
                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex items-center gap-2 text-sm px-3.5 py-2 rounded-xl transition ${activeTab === tab
                                    ? 'bg-blue-600 text-white font-medium'
                                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                        >
                            <Icon size={14} />
                            {tab}
                        </button>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 flex flex-col gap-4">
                    {/* General */}
                    {activeTab === 'General' && (
                        <>
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                                <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-4">General Security</h2>
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {generalSettings.map((setting) => (
                                        <div key={setting.id} className="flex items-center justify-between gap-3 py-3">
                                            <div>
                                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{setting.label}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{setting.description}</p>
                                            </div>
                                            <ToggleSwitch checked={setting.enabled} onChange={() => handleToggleGeneral(setting)} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                                <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-1">Allowed CORS Origins</h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Only these domains may make cross-origin requests to the API.</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {allowedOrigins.map((origin) => (
                                        <span
                                            key={origin}
                                            className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono"
                                        >
                                            {origin}
                                            <button onClick={() => handleRemoveOrigin(origin)} className="text-slate-400 hover:text-red-600 dark:hover:text-red-400">
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                    {allowedOrigins.length === 0 && <p className="text-xs text-slate-400">No origins added yet.</p>}
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        value={newOrigin}
                                        onChange={(e) => setNewOrigin(e.target.value)}
                                        placeholder="https://example.com"
                                        className="flex-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 font-mono"
                                    />
                                    <button
                                        onClick={handleAddOrigin}
                                        className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        <Plus size={14} /> Add
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Authentication */}
                    {activeTab === 'Authentication' && (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                            <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-4">Authentication & Tokens</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Access Token Expiry (minutes)</label>
                                    <input
                                        type="number"
                                        value={authSettings.accessTokenExpiryMinutes}
                                        onChange={(e) => setAuthSettings((prev) => ({ ...prev, accessTokenExpiryMinutes: Number(e.target.value) }))}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Refresh Token Expiry (days)</label>
                                    <input
                                        type="number"
                                        value={authSettings.refreshTokenExpiryDays}
                                        onChange={(e) => setAuthSettings((prev) => ({ ...prev, refreshTokenExpiryDays: Number(e.target.value) }))}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Signature Algorithm</label>
                                    <select
                                        value={authSettings.signatureAlgorithm}
                                        onChange={(e) =>
                                            setAuthSettings((prev) => ({ ...prev, signatureAlgorithm: e.target.value as ApiSecurityAuthSettings['signatureAlgorithm'] }))
                                        }
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                    >
                                        {apiSecuritySignatureAlgorithmOptions.map((alg) => (
                                            <option key={alg} value={alg}>
                                                {alg}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Max Failed Auth Attempts</label>
                                    <input
                                        type="number"
                                        value={authSettings.maxFailedAuthAttempts}
                                        onChange={(e) => setAuthSettings((prev) => ({ ...prev, maxFailedAuthAttempts: Number(e.target.value) }))}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                <div className="flex items-center justify-between gap-3 py-3">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Rotate Refresh Tokens on Use</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Issue a new refresh token every time the old one is used.</p>
                                    </div>
                                    <ToggleSwitch
                                        checked={authSettings.rotateRefreshTokens}
                                        onChange={() => {
                                            setAuthSettings((prev) => ({ ...prev, rotateRefreshTokens: !prev.rotateRefreshTokens }));
                                            showToast(`Refresh token rotation ${authSettings.rotateRefreshTokens ? 'disabled' : 'enabled'}`);
                                        }}
                                    />
                                </div>
                                <div className="flex items-center justify-between gap-3 py-3">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Require Request Signing</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Reject requests that are not signed with the configured algorithm.</p>
                                    </div>
                                    <ToggleSwitch
                                        checked={authSettings.requireRequestSigning}
                                        onChange={() => {
                                            setAuthSettings((prev) => ({ ...prev, requireRequestSigning: !prev.requireRequestSigning }));
                                            showToast(`Request signing requirement ${authSettings.requireRequestSigning ? 'disabled' : 'enabled'}`);
                                        }}
                                    />
                                </div>
                                <div className="flex items-center justify-between gap-3 py-3">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Require 2FA for Key Generation</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Admins must confirm with 2FA before generating a new API key.</p>
                                    </div>
                                    <ToggleSwitch
                                        checked={authSettings.require2faForKeyGeneration}
                                        onChange={() => {
                                            setAuthSettings((prev) => ({ ...prev, require2faForKeyGeneration: !prev.require2faForKeyGeneration }));
                                            showToast(`2FA requirement for key generation ${authSettings.require2faForKeyGeneration ? 'disabled' : 'enabled'}`);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* IP Access */}
                    {activeTab === 'IP Access' && (
                        <>
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                                <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-4">IP Access Control</h2>
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    <div className="flex items-center justify-between gap-3 py-3">
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Enforce IP Allowlist</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Only allow requests from IPs explicitly listed below.</p>
                                        </div>
                                        <ToggleSwitch
                                            checked={ipSettings.enforceAllowlist}
                                            onChange={() => {
                                                setIpSettings((prev) => ({ ...prev, enforceAllowlist: !prev.enforceAllowlist }));
                                                showToast(`IP allowlist enforcement ${ipSettings.enforceAllowlist ? 'disabled' : 'enabled'}`);
                                            }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between gap-3 py-3">
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Block Unrecognized IPs by Default</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Automatically deny traffic from IPs never seen before.</p>
                                        </div>
                                        <ToggleSwitch
                                            checked={ipSettings.blockUnknownIps}
                                            onChange={() => {
                                                setIpSettings((prev) => ({ ...prev, blockUnknownIps: !prev.blockUnknownIps }));
                                                showToast(`Block unrecognized IPs ${ipSettings.blockUnknownIps ? 'disabled' : 'enabled'}`);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                                <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-4">IP Allowlist</h2>
                                <div className="flex flex-col gap-2 mb-4">
                                    {ipAllowlist.map((rule) => (
                                        <div
                                            key={rule.id}
                                            className="flex items-center justify-between gap-3 border border-slate-100 dark:border-slate-800 rounded-xl px-3 py-2.5"
                                        >
                                            <div>
                                                <p className="text-sm text-slate-700 dark:text-slate-200">{rule.label}</p>
                                                <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                                                    {rule.ipRange} · {rule.appliesTo}
                                                </p>
                                            </div>
                                            <button onClick={() => handleRemoveIpRule(rule.id)} className="text-slate-400 hover:text-red-600 dark:hover:text-red-400">
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    ))}
                                    {ipAllowlist.length === 0 && <p className="text-xs text-slate-400">No IP rules added yet.</p>}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <input
                                        value={newIpLabel}
                                        onChange={(e) => setNewIpLabel(e.target.value)}
                                        placeholder="Label, e.g. HQ Office Network"
                                        className="text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                    />
                                    <div className="flex items-center gap-2">
                                        <input
                                            value={newIpRange}
                                            onChange={(e) => setNewIpRange(e.target.value)}
                                            placeholder="203.0.113.0/24"
                                            className="flex-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 font-mono"
                                        />
                                        <button
                                            onClick={handleAddIpRule}
                                            className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shrink-0"
                                        >
                                            <Plus size={14} /> Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Webhook Security */}
                    {activeTab === 'Webhook Security' && (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                            <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-4">Webhook Security</h2>
                            <div className="divide-y divide-slate-100 dark:divide-slate-800 mb-4">
                                <div className="flex items-center justify-between gap-3 py-3">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Sign Outgoing Payloads</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Include an HMAC signature header with every webhook delivery.</p>
                                    </div>
                                    <ToggleSwitch
                                        checked={webhookSettings.signPayloads}
                                        onChange={() => {
                                            setWebhookSettings((prev) => ({ ...prev, signPayloads: !prev.signPayloads }));
                                            showToast(`Payload signing ${webhookSettings.signPayloads ? 'disabled' : 'enabled'}`);
                                        }}
                                    />
                                </div>
                                <div className="flex items-center justify-between gap-3 py-3">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Verify TLS Certificates</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Reject delivery to endpoints with invalid or self-signed certificates.</p>
                                    </div>
                                    <ToggleSwitch
                                        checked={webhookSettings.verifyTlsCertificates}
                                        onChange={() => {
                                            setWebhookSettings((prev) => ({ ...prev, verifyTlsCertificates: !prev.verifyTlsCertificates }));
                                            showToast(`TLS certificate verification ${webhookSettings.verifyTlsCertificates ? 'disabled' : 'enabled'}`);
                                        }}
                                    />
                                </div>
                                <div className="flex items-center justify-between gap-3 py-3">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Retry Failed Deliveries</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Automatically retry with exponential backoff on non-2xx responses.</p>
                                    </div>
                                    <ToggleSwitch
                                        checked={webhookSettings.retryOnFailure}
                                        onChange={() => {
                                            setWebhookSettings((prev) => ({ ...prev, retryOnFailure: !prev.retryOnFailure }));
                                            showToast(`Delivery retries ${webhookSettings.retryOnFailure ? 'disabled' : 'enabled'}`);
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Auto-rotate Signing Secrets Every</label>
                                <select
                                    value={webhookSettings.autoRotateSecretsDays}
                                    onChange={(e) => {
                                        setWebhookSettings((prev) => ({ ...prev, autoRotateSecretsDays: Number(e.target.value) }));
                                        showToast(`Secret rotation interval set to ${e.target.value} days`);
                                    }}
                                    className="w-full sm:w-48 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                >
                                    {apiSecurityRotationDaysOptions.map((d) => (
                                        <option key={d} value={d}>
                                            {d} days
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Audit & Compliance */}
                    {activeTab === 'Audit & Compliance' && (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                            <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-4">Audit & Compliance</h2>
                            <div className="mb-4">
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Log Retention Period</label>
                                <select
                                    value={auditSettings.logRetentionDays}
                                    onChange={(e) => {
                                        setAuditSettings((prev) => ({ ...prev, logRetentionDays: Number(e.target.value) }));
                                        showToast(`Log retention set to ${e.target.value} days`);
                                    }}
                                    className="w-full sm:w-48 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                >
                                    {apiSecurityRetentionDaysOptions.map((d) => (
                                        <option key={d} value={d}>
                                            {d} days
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                <div className="flex items-center justify-between gap-3 py-3">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Mask PII in Logs</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Redact card numbers, national IDs, and phone numbers in stored logs.</p>
                                    </div>
                                    <ToggleSwitch
                                        checked={auditSettings.maskPiiInLogs}
                                        onChange={() => {
                                            setAuditSettings((prev) => ({ ...prev, maskPiiInLogs: !prev.maskPiiInLogs }));
                                            showToast(`PII masking ${auditSettings.maskPiiInLogs ? 'disabled' : 'enabled'}`);
                                        }}
                                    />
                                </div>
                                <div className="flex items-center justify-between gap-3 py-3">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Log Full Request Body</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Store the complete request payload, not just metadata. Increases storage usage.</p>
                                    </div>
                                    <ToggleSwitch
                                        checked={auditSettings.logFullRequestBody}
                                        onChange={() => {
                                            setAuditSettings((prev) => ({ ...prev, logFullRequestBody: !prev.logFullRequestBody }));
                                            showToast(`Full request body logging ${auditSettings.logFullRequestBody ? 'disabled' : 'enabled'}`);
                                        }}
                                    />
                                </div>
                                <div className="flex items-center justify-between gap-3 py-3">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Notify on Key Revocation</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Send an email alert to admins whenever an API key is revoked.</p>
                                    </div>
                                    <ToggleSwitch
                                        checked={auditSettings.notifyOnKeyRevocation}
                                        onChange={() => {
                                            setAuditSettings((prev) => ({ ...prev, notifyOnKeyRevocation: !prev.notifyOnKeyRevocation }));
                                            showToast(`Key revocation notifications ${auditSettings.notifyOnKeyRevocation ? 'disabled' : 'enabled'}`);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar: recent security events */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 h-fit">
                    <div className="flex items-center gap-2 mb-4">
                        <ShieldCheck size={16} className="text-blue-600 dark:text-blue-400" />
                        <h2 className="font-semibold text-slate-800 dark:text-white text-sm">Recent Security Events</h2>
                    </div>
                    <div className="space-y-3">
                        {apiSecurityRecentEvents.map((event) => (
                            <div key={event.id} className="flex items-start gap-2">
                                <span className={`mt-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium shrink-0 ${apiSecurityEventBadge[event.severity]}`}>
                                    {event.severity}
                                </span>
                                <div>
                                    <p className="text-xs text-slate-600 dark:text-slate-300">{event.message}</p>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{event.timestamp}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Confirm disable critical setting modal */}
            {confirmDisableId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm p-5">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle size={18} className="text-red-600 dark:text-red-400" />
                            <h2 className="font-semibold text-slate-800 dark:text-white">Disable Critical Setting?</h2>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                            Disabling{' '}
                            <span className="font-medium text-slate-700 dark:text-slate-200">
                                {generalSettings.find((s) => s.id === confirmDisableId)?.label}
                            </span>{' '}
                            may expose your API to additional risk. Are you sure you want to continue?
                        </p>
                        <div className="flex items-center justify-end gap-2">
                            <button
                                onClick={() => setConfirmDisableId(null)}
                                className="text-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDisableCritical}
                                className="text-sm px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 font-medium"
                            >
                                Disable Anyway
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}