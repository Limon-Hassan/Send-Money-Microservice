'use client';

import { useState } from 'react';
import {
    Settings2,
    Palette,
    ShieldCheck,
    KeyRound,
    Globe2,
    Mail,
    Save,
    Upload,
    Check,
    AlertTriangle,
} from 'lucide-react';
import {
    platformSettingsTabs,
    platformGeneralDefaults,
    platformBrandingDefaults,
    platformThemeModeOptions,
    platformBrandColorOptions,
    platformKycTiers,
    platformKycBadge,
    platformVerificationDefaults,
    platformSanctionsProviderOptions,
    platform2faDefaults,
    platform2faMethodOptions,
    platformLocalizationDefaults,
    platformLanguageOptions,
    platformCurrencyOptions,
    platformTimezoneOptions,
    platformDateFormatOptions,
    platformEmailSmsDefaults,
    platformSmsProviderOptions,
    type PlatformSettingsTabId,
    type PlatformGeneralConfig,
    type PlatformBrandingConfig,
    type PlatformThemeMode,
    type PlatformVerificationConfig,
    type PlatformTwoFactorPolicy,
    type Platform2faMethod,
    type PlatformLocalizationConfig,
    type PlatformEmailSmsConfig,
} from '@/lib/data';

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
    return (
        <button
            onClick={onChange}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition shrink-0 ${checked ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
        >
            <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition ${checked ? 'translate-x-5' : 'translate-x-1'}`} />
        </button>
    );
}

const tabIconMap: Record<PlatformSettingsTabId, typeof Settings2> = {
    General: Settings2,
    'Branding & Theme': Palette,
    'Verification & KYC': ShieldCheck,
    'Two-Factor Authentication': KeyRound,
    Localization: Globe2,
    'Email & SMS': Mail,
};

export default function PlatformSettingsPage() {
    const [activeTab, setActiveTab] = useState<PlatformSettingsTabId>('General');
    const [toast, setToast] = useState<string | null>(null);

    const [general, setGeneral] = useState<PlatformGeneralConfig>(platformGeneralDefaults);
    const [branding, setBranding] = useState<PlatformBrandingConfig>(platformBrandingDefaults);
    const [verification, setVerification] = useState<PlatformVerificationConfig>(platformVerificationDefaults);
    const [twoFactor, setTwoFactor] = useState<PlatformTwoFactorPolicy>(platform2faDefaults);
    const [localization, setLocalization] = useState<PlatformLocalizationConfig>(platformLocalizationDefaults);
    const [emailSms, setEmailSms] = useState<PlatformEmailSmsConfig>(platformEmailSmsDefaults);
    const [maintenanceConfirmOpen, setMaintenanceConfirmOpen] = useState(false);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const handleSaveAll = () => {
        showToast('Platform settings saved');
    };

    const handleToggleMaintenance = () => {
        if (!general.maintenanceModeEnabled) {
            setMaintenanceConfirmOpen(true);
            return;
        }
        setGeneral((prev) => ({ ...prev, maintenanceModeEnabled: false }));
        showToast('Maintenance mode disabled — platform is live');
    };

    const confirmEnableMaintenance = () => {
        setGeneral((prev) => ({ ...prev, maintenanceModeEnabled: true }));
        showToast('Maintenance mode enabled — the platform is now showing a maintenance banner');
        setMaintenanceConfirmOpen(false);
    };

    const toggle2faMethod = (method: Platform2faMethod) => {
        setTwoFactor((prev) => ({ ...prev, allowedMethods: { ...prev.allowedMethods, [method]: !prev.allowedMethods[method] } }));
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen relative">
            {/* Toast */}
            {toast && (
                <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg dark:bg-white dark:text-slate-900 flex items-center gap-2 max-w-sm">
                    <Check size={14} className="text-green-400 dark:text-green-600 shrink-0" />
                    {toast}
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Settings</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Platform-wide configuration: branding, verification policy, security, and localization.
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

            {/* Maintenance mode banner */}
            {general.maintenanceModeEnabled && (
                <div className="flex items-start gap-3 rounded-2xl p-4 border bg-amber-50 border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/30 mb-6">
                    <AlertTriangle size={18} className="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                    <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-white">Maintenance mode is currently active</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{general.maintenanceMessage}</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr] gap-6">
                {/* Sidebar tabs */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 h-fit lg:sticky lg:top-6">
                    <div className="flex lg:flex-col gap-1 overflow-x-auto">
                        {platformSettingsTabs.map((tab) => {
                            const Icon = tabIconMap[tab];
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex items-center gap-2.5 text-sm px-3.5 py-2.5 rounded-xl transition whitespace-nowrap ${activeTab === tab
                                            ? 'bg-blue-50 text-blue-700 font-medium dark:bg-blue-500/10 dark:text-blue-400'
                                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    <Icon size={16} />
                                    {tab}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-4 max-w-3xl">
                    {/* General */}
                    {activeTab === 'General' && (
                        <>
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6">
                                <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-5">Platform Identity</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Platform Name</label>
                                        <input
                                            value={general.platformName}
                                            onChange={(e) => setGeneral((prev) => ({ ...prev, platformName: e.target.value }))}
                                            className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Legal Entity Name</label>
                                        <input
                                            value={general.legalEntityName}
                                            onChange={(e) => setGeneral((prev) => ({ ...prev, legalEntityName: e.target.value }))}
                                            className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Support Email</label>
                                        <input
                                            value={general.supportEmail}
                                            onChange={(e) => setGeneral((prev) => ({ ...prev, supportEmail: e.target.value }))}
                                            className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Support Phone</label>
                                        <input
                                            value={general.supportPhone}
                                            onChange={(e) => setGeneral((prev) => ({ ...prev, supportPhone: e.target.value }))}
                                            className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6">
                                <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-5">Platform Availability</h2>
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    <div className="flex items-center justify-between gap-3 py-3">
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Maintenance Mode</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Temporarily block access for non-admin users.</p>
                                        </div>
                                        <ToggleSwitch checked={general.maintenanceModeEnabled} onChange={handleToggleMaintenance} />
                                    </div>
                                    <div className="flex items-center justify-between gap-3 py-3">
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">New Registrations</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Allow new customers to sign up for an account.</p>
                                        </div>
                                        <ToggleSwitch
                                            checked={general.newRegistrationsEnabled}
                                            onChange={() => {
                                                setGeneral((prev) => ({ ...prev, newRegistrationsEnabled: !prev.newRegistrationsEnabled }));
                                                showToast(`New registrations ${general.newRegistrationsEnabled ? 'disabled' : 'enabled'}`);
                                            }}
                                        />
                                    </div>
                                </div>
                                {general.maintenanceModeEnabled && (
                                    <div className="mt-3">
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Maintenance Message</label>
                                        <textarea
                                            value={general.maintenanceMessage}
                                            onChange={(e) => setGeneral((prev) => ({ ...prev, maintenanceMessage: e.target.value }))}
                                            rows={2}
                                            className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 resize-none"
                                        />
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* Branding & Theme */}
                    {activeTab === 'Branding & Theme' && (
                        <>
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6">
                                <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-5">Logo & Favicon</h2>
                                <div className="flex flex-wrap gap-6">
                                    <div>
                                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Platform Logo</p>
                                        <div className="flex items-center gap-3">
                                            <img src={branding.logoUrl} alt="Logo" className="w-16 h-16 rounded-xl border border-slate-200 dark:border-slate-700" />
                                            <button
                                                onClick={() => showToast('Logo upload dialog would open here')}
                                                className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                            >
                                                <Upload size={13} /> Upload
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Favicon</p>
                                        <div className="flex items-center gap-3">
                                            <img src={branding.faviconUrl} alt="Favicon" className="w-16 h-16 rounded-xl border border-slate-200 dark:border-slate-700" />
                                            <button
                                                onClick={() => showToast('Favicon upload dialog would open here')}
                                                className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                            >
                                                <Upload size={13} /> Upload
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6">
                                <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-5">Theme</h2>
                                <div className="mb-5">
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">Default Theme Mode</label>
                                    <div className="flex gap-2">
                                        {platformThemeModeOptions.map((mode) => (
                                            <button
                                                key={mode}
                                                onClick={() => {
                                                    setBranding((prev) => ({ ...prev, defaultThemeMode: mode }));
                                                    showToast(`Default theme set to ${mode}`);
                                                }}
                                                className={`flex-1 text-sm px-3 py-2 rounded-xl border transition ${branding.defaultThemeMode === mode
                                                        ? 'bg-blue-600 border-blue-600 text-white'
                                                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                    }`}
                                            >
                                                {mode}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">Primary Brand Color</label>
                                    <div className="flex gap-3">
                                        {platformBrandColorOptions.map((hex) => (
                                            <button
                                                key={hex}
                                                onClick={() => {
                                                    setBranding((prev) => ({ ...prev, primaryColor: hex }));
                                                    showToast(`Primary color updated`);
                                                }}
                                                className="w-8 h-8 rounded-full flex items-center justify-center"
                                                style={{ backgroundColor: hex, boxShadow: branding.primaryColor === hex ? `0 0 0 2px white, 0 0 0 4px ${hex}` : 'none' }}
                                                aria-label={hex}
                                            >
                                                {branding.primaryColor === hex && <Check size={14} className="text-white" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-3 py-3 border-t border-slate-100 dark:border-slate-800">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Allow Users to Override Theme</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Let individual users pick Light/Dark mode for themselves.</p>
                                    </div>
                                    <ToggleSwitch
                                        checked={branding.allowUserThemeOverride}
                                        onChange={() => setBranding((prev) => ({ ...prev, allowUserThemeOverride: !prev.allowUserThemeOverride }))}
                                    />
                                </div>

                                <div className="mt-3">
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Login Page Tagline</label>
                                    <input
                                        value={branding.loginPageTagline}
                                        onChange={(e) => setBranding((prev) => ({ ...prev, loginPageTagline: e.target.value }))}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Verification & KYC */}
                    {activeTab === 'Verification & KYC' && (
                        <>
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6">
                                <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-5">Verification Policy</h2>
                                <div className="divide-y divide-slate-100 dark:divide-slate-800 mb-4">
                                    <div className="flex items-center justify-between gap-3 py-3">
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Require KYC for Signup</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">New customers must complete identity verification before transacting.</p>
                                        </div>
                                        <ToggleSwitch
                                            checked={verification.kycRequiredForSignup}
                                            onChange={() => {
                                                setVerification((prev) => ({ ...prev, kycRequiredForSignup: !prev.kycRequiredForSignup }));
                                                showToast(`KYC requirement ${verification.kycRequiredForSignup ? 'disabled' : 'enabled'}`);
                                            }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between gap-3 py-3">
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">AML Screening</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Automatically screen transactions against sanctions and watchlists.</p>
                                        </div>
                                        <ToggleSwitch
                                            checked={verification.amlScreeningEnabled}
                                            onChange={() => {
                                                setVerification((prev) => ({ ...prev, amlScreeningEnabled: !prev.amlScreeningEnabled }));
                                                showToast(`AML screening ${verification.amlScreeningEnabled ? 'disabled' : 'enabled'}`);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Sanctions List Provider</label>
                                        <select
                                            value={verification.sanctionsListProvider}
                                            onChange={(e) => setVerification((prev) => ({ ...prev, sanctionsListProvider: e.target.value }))}
                                            className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                        >
                                            {platformSanctionsProviderOptions.map((p) => (
                                                <option key={p} value={p}>
                                                    {p}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Manual Review Threshold</label>
                                        <input
                                            value={verification.manualReviewThresholdAmount}
                                            onChange={(e) => setVerification((prev) => ({ ...prev, manualReviewThresholdAmount: e.target.value }))}
                                            className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Document Expiry Reminder (days before)</label>
                                        <input
                                            type="number"
                                            value={verification.documentExpiryReminderDays}
                                            onChange={(e) => setVerification((prev) => ({ ...prev, documentExpiryReminderDays: Number(e.target.value) }))}
                                            className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6">
                                <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-5">KYC Tiers</h2>
                                <div className="flex flex-col gap-3">
                                    {platformKycTiers.map((tier) => (
                                        <div key={tier.id} className="border border-slate-100 dark:border-slate-800 rounded-xl p-3">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${platformKycBadge[tier.level]}`}>{tier.level}</span>
                                                <span className="text-xs text-slate-500 dark:text-slate-400">{tier.transactionLimit}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5 mb-2">
                                                {tier.requiredDocuments.map((doc) => (
                                                    <span key={doc} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                                        {doc}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                                                Auto-approval: <span className={tier.autoApprovalEnabled ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}>{tier.autoApprovalEnabled ? 'Enabled' : 'Manual review required'}</span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Two-Factor Authentication */}
                    {activeTab === 'Two-Factor Authentication' && (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6">
                            <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-5">Two-Factor Authentication Policy</h2>
                            <div className="divide-y divide-slate-100 dark:divide-slate-800 mb-5">
                                <div className="flex items-center justify-between gap-3 py-3">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Enforce 2FA for All Admins</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Every admin account must set up 2FA before accessing the panel.</p>
                                    </div>
                                    <ToggleSwitch
                                        checked={twoFactor.enforceForAllAdmins}
                                        onChange={() => {
                                            setTwoFactor((prev) => ({ ...prev, enforceForAllAdmins: !prev.enforceForAllAdmins }));
                                            showToast(`2FA enforcement for admins ${twoFactor.enforceForAllAdmins ? 'disabled' : 'enabled'}`);
                                        }}
                                    />
                                </div>
                                <div className="flex items-center justify-between gap-3 py-3">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Enforce 2FA for All Customers</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Require customers to enable 2FA before sending money.</p>
                                    </div>
                                    <ToggleSwitch
                                        checked={twoFactor.enforceForAllCustomers}
                                        onChange={() => {
                                            setTwoFactor((prev) => ({ ...prev, enforceForAllCustomers: !prev.enforceForAllCustomers }));
                                            showToast(`2FA enforcement for customers ${twoFactor.enforceForAllCustomers ? 'disabled' : 'enabled'}`);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="mb-5">
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">Allowed Verification Methods</label>
                                <div className="flex flex-wrap gap-2">
                                    {platform2faMethodOptions.map((method) => {
                                        const active = twoFactor.allowedMethods[method];
                                        return (
                                            <button
                                                key={method}
                                                onClick={() => toggle2faMethod(method)}
                                                className={`text-sm px-3 py-2 rounded-xl border transition ${active
                                                        ? 'bg-blue-600 border-blue-600 text-white'
                                                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                    }`}
                                            >
                                                {method}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Grace Period Before Enforcement (days)</label>
                                    <input
                                        type="number"
                                        value={twoFactor.gracePeriodDays}
                                        onChange={(e) => setTwoFactor((prev) => ({ ...prev, gracePeriodDays: Number(e.target.value) }))}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Remember Trusted Device For (days)</label>
                                    <input
                                        type="number"
                                        value={twoFactor.rememberDeviceDays}
                                        onChange={(e) => setTwoFactor((prev) => ({ ...prev, rememberDeviceDays: Number(e.target.value) }))}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Localization */}
                    {activeTab === 'Localization' && (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6">
                            <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-5">Localization Defaults</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Default Language</label>
                                    <select
                                        value={localization.defaultLanguage}
                                        onChange={(e) => setLocalization((prev) => ({ ...prev, defaultLanguage: e.target.value }))}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                    >
                                        {platformLanguageOptions.map((l) => (
                                            <option key={l} value={l}>
                                                {l}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Default Currency</label>
                                    <select
                                        value={localization.defaultCurrency}
                                        onChange={(e) => setLocalization((prev) => ({ ...prev, defaultCurrency: e.target.value }))}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                    >
                                        {platformCurrencyOptions.map((c) => (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Default Timezone</label>
                                    <select
                                        value={localization.defaultTimezone}
                                        onChange={(e) => setLocalization((prev) => ({ ...prev, defaultTimezone: e.target.value }))}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                    >
                                        {platformTimezoneOptions.map((t) => (
                                            <option key={t} value={t}>
                                                {t}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Default Date Format</label>
                                    <select
                                        value={localization.defaultDateFormat}
                                        onChange={(e) => setLocalization((prev) => ({ ...prev, defaultDateFormat: e.target.value }))}
                                        className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                    >
                                        {platformDateFormatOptions.map((f) => (
                                            <option key={f} value={f}>
                                                {f}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">Supported Languages</label>
                                <div className="flex flex-wrap gap-2">
                                    {platformLanguageOptions.map((lang) => {
                                        const active = localization.supportedLanguages.includes(lang);
                                        return (
                                            <button
                                                key={lang}
                                                onClick={() => {
                                                    setLocalization((prev) => ({
                                                        ...prev,
                                                        supportedLanguages: active
                                                            ? prev.supportedLanguages.filter((l) => l !== lang)
                                                            : [...prev.supportedLanguages, lang],
                                                    }));
                                                }}
                                                className={`text-xs px-3 py-1.5 rounded-full border transition ${active
                                                        ? 'bg-blue-600 border-blue-600 text-white'
                                                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                    }`}
                                            >
                                                {lang}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Email & SMS */}
                    {activeTab === 'Email & SMS' && (
                        <>
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6">
                                <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-5">Email Configuration (SMTP)</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                                    <div>
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">SMTP Host</label>
                                        <input
                                            value={emailSms.smtpHost}
                                            onChange={(e) => setEmailSms((prev) => ({ ...prev, smtpHost: e.target.value }))}
                                            className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 font-mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">SMTP Port</label>
                                        <input
                                            type="number"
                                            value={emailSms.smtpPort}
                                            onChange={(e) => setEmailSms((prev) => ({ ...prev, smtpPort: Number(e.target.value) }))}
                                            className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Sender Name</label>
                                        <input
                                            value={emailSms.senderName}
                                            onChange={(e) => setEmailSms((prev) => ({ ...prev, senderName: e.target.value }))}
                                            className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Sender Email</label>
                                        <input
                                            value={emailSms.senderEmail}
                                            onChange={(e) => setEmailSms((prev) => ({ ...prev, senderEmail: e.target.value }))}
                                            className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    <div className="flex items-center justify-between gap-3 py-3">
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Transactional Emails</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Receipts, confirmations, and account alerts.</p>
                                        </div>
                                        <ToggleSwitch
                                            checked={emailSms.transactionalEmailsEnabled}
                                            onChange={() => setEmailSms((prev) => ({ ...prev, transactionalEmailsEnabled: !prev.transactionalEmailsEnabled }))}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between gap-3 py-3">
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Marketing Emails</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Product updates and promotional campaigns.</p>
                                        </div>
                                        <ToggleSwitch
                                            checked={emailSms.marketingEmailsEnabled}
                                            onChange={() => setEmailSms((prev) => ({ ...prev, marketingEmailsEnabled: !prev.marketingEmailsEnabled }))}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6">
                                <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-5">SMS Configuration</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">SMS Provider</label>
                                        <select
                                            value={emailSms.smsProvider}
                                            onChange={(e) => setEmailSms((prev) => ({ ...prev, smsProvider: e.target.value }))}
                                            className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                        >
                                            {platformSmsProviderOptions.map((p) => (
                                                <option key={p} value={p}>
                                                    {p}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">SMS Sender ID</label>
                                        <input
                                            value={emailSms.smsSenderId}
                                            onChange={(e) => setEmailSms((prev) => ({ ...prev, smsSenderId: e.target.value }))}
                                            className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 font-mono"
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Maintenance mode confirmation modal */}
            {maintenanceConfirmOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm p-5">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle size={18} className="text-amber-500" />
                            <h2 className="font-semibold text-slate-800 dark:text-white">Enable Maintenance Mode?</h2>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                            This will block access for all non-admin users immediately and show the maintenance message on the platform.
                        </p>
                        <div className="flex items-center justify-end gap-2">
                            <button
                                onClick={() => setMaintenanceConfirmOpen(false)}
                                className="text-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmEnableMaintenance}
                                className="text-sm px-4 py-2 rounded-xl bg-amber-500 text-white hover:bg-amber-600 font-medium"
                            >
                                Enable Maintenance Mode
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}