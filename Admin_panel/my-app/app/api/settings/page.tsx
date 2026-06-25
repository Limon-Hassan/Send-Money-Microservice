'use client';

import { useState } from 'react';
import { Settings2, Tag, Code2, BookOpen, Save, Copy, Check } from 'lucide-react';
import {
    apiSettingsTabs,
    apiSettingsGeneralDefaults,
    apiSettingsTimezoneOptions,
    apiSettingsDateFormatOptions,
    apiSettingsVersions,
    apiSettingsVersionBadge,
    apiSettingsVersioningDefaults,
    apiSettingsResponseDefaults,
    apiSettingsPageSizeOptions,
    apiSettingsMaxPageSizeOptions,
    apiSettingsDocumentationDefaults,
    apiSettingsCodeLanguageOptions,
    type ApiSettingsTabId,
    type ApiSettingsGeneral,
    type ApiSettingsVersioningConfig,
    type ApiSettingsResponseConfig,
    type ApiSettingsResponseFormat,
    type ApiSettingsCasingStyle,
    type ApiSettingsDocumentation,
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

const tabIconMap: Record<ApiSettingsTabId, typeof Settings2> = {
    General: Settings2,
    Versioning: Tag,
    'Response Defaults': Code2,
    Documentation: BookOpen,
};

export default function ApiSettingsPage() {
    const [activeTab, setActiveTab] = useState<ApiSettingsTabId>('General');
    const [toast, setToast] = useState<string | null>(null);
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const [general, setGeneral] = useState<ApiSettingsGeneral>(apiSettingsGeneralDefaults);
    const [versioning, setVersioning] = useState<ApiSettingsVersioningConfig>(apiSettingsVersioningDefaults);
    const [response, setResponse] = useState<ApiSettingsResponseConfig>(apiSettingsResponseDefaults);
    const [docs, setDocs] = useState<ApiSettingsDocumentation>(apiSettingsDocumentationDefaults);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const handleCopy = (field: string, value: string) => {
        setCopiedField(field);
        showToast('Copied to clipboard');
        setTimeout(() => setCopiedField(null), 1500);
    };

    const handleSaveAll = () => {
        showToast('API settings saved');
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
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">API Settings</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Configure platform-wide defaults, versioning policy, and developer documentation.
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
                {apiSettingsTabs.map((tab) => {
                    const Icon = tabIconMap[tab];
                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex items-center gap-2 text-sm px-3.5 py-2 rounded-xl transition ${activeTab === tab ? 'bg-blue-600 text-white font-medium' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                        >
                            <Icon size={14} />
                            {tab}
                        </button>
                    );
                })}
            </div>

            {/* General */}
            {activeTab === 'General' && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 ">
                    <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-4">General</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                        <div>
                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Platform Name</label>
                            <input
                                value={general.platformName}
                                onChange={(e) => setGeneral((prev) => ({ ...prev, platformName: e.target.value }))}
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
                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Default Timezone</label>
                            <select
                                value={general.defaultTimezone}
                                onChange={(e) => setGeneral((prev) => ({ ...prev, defaultTimezone: e.target.value }))}
                                className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                            >
                                {apiSettingsTimezoneOptions.map((tz) => (
                                    <option key={tz} value={tz}>
                                        {tz}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Default Date Format</label>
                            <select
                                value={general.defaultDateFormat}
                                onChange={(e) => setGeneral((prev) => ({ ...prev, defaultDateFormat: e.target.value }))}
                                className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                            >
                                {apiSettingsDateFormatOptions.map((f) => (
                                    <option key={f} value={f}>
                                        {f}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        <div className="flex items-center justify-between gap-3 py-3">
                            <div>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Public Status Page</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Expose a public uptime and incident status page.</p>
                            </div>
                            <ToggleSwitch
                                checked={general.publicStatusPageEnabled}
                                onChange={() => {
                                    setGeneral((prev) => ({ ...prev, publicStatusPageEnabled: !prev.publicStatusPageEnabled }));
                                    showToast(`Public status page ${general.publicStatusPageEnabled ? 'disabled' : 'enabled'}`);
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between gap-3 py-3">
                            <div>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Maintenance Banner</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Show a maintenance notice banner in the developer dashboard.</p>
                            </div>
                            <ToggleSwitch
                                checked={general.maintenanceBannerEnabled}
                                onChange={() => {
                                    setGeneral((prev) => ({ ...prev, maintenanceBannerEnabled: !prev.maintenanceBannerEnabled }));
                                    showToast(`Maintenance banner ${general.maintenanceBannerEnabled ? 'disabled' : 'enabled'}`);
                                }}
                            />
                        </div>
                    </div>

                    {general.maintenanceBannerEnabled && (
                        <div className="mt-3">
                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Banner Message</label>
                            <textarea
                                value={general.maintenanceBannerMessage}
                                onChange={(e) => setGeneral((prev) => ({ ...prev, maintenanceBannerMessage: e.target.value }))}
                                rows={2}
                                className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 resize-none"
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Versioning */}
            {activeTab === 'Versioning' && (
                <div className="flex flex-col gap-4 max-w-2xl">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                        <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-4">Version Configuration</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Default API Version</label>
                                <select
                                    value={versioning.defaultVersion}
                                    onChange={(e) => setVersioning((prev) => ({ ...prev, defaultVersion: e.target.value }))}
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                >
                                    {apiSettingsVersions.map((v) => (
                                        <option key={v.id} value={v.version}>
                                            {v.version}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Deprecation Notice Period (days)</label>
                                <input
                                    type="number"
                                    value={versioning.deprecationNoticeDays}
                                    onChange={(e) => setVersioning((prev) => ({ ...prev, deprecationNoticeDays: Number(e.target.value) }))}
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Enforce API Version Header</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Reject requests that don't specify an X-Api-Version header.</p>
                            </div>
                            <ToggleSwitch
                                checked={versioning.enforceVersionHeader}
                                onChange={() => {
                                    setVersioning((prev) => ({ ...prev, enforceVersionHeader: !prev.enforceVersionHeader }));
                                    showToast(`Version header enforcement ${versioning.enforceVersionHeader ? 'disabled' : 'enabled'}`);
                                }}
                            />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                        <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-4">API Versions</h2>
                        <div className="flex flex-col gap-2">
                            {apiSettingsVersions.map((v) => (
                                <div key={v.id} className="border border-slate-100 dark:border-slate-800 rounded-xl p-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono font-semibold text-slate-800 dark:text-white text-sm">{v.version}</span>
                                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${apiSettingsVersionBadge[v.status]}`}>{v.status}</span>
                                        </div>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">{v.adoptionPercent}% adoption</span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-2">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${v.adoptionPercent}%` }} />
                                    </div>
                                    <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                                        <span>Released: {v.releasedAt}</span>
                                        {v.sunsetDate && <span className="text-red-500 dark:text-red-400">Sunset: {v.sunsetDate}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Response Defaults */}
            {activeTab === 'Response Defaults' && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 max-w-2xl">
                    <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-4">Response Defaults</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                        <div>
                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Default Response Format</label>
                            <div className="flex gap-2">
                                {(['JSON', 'XML'] as ApiSettingsResponseFormat[]).map((fmt) => (
                                    <button
                                        key={fmt}
                                        onClick={() => setResponse((prev) => ({ ...prev, defaultFormat: fmt }))}
                                        className={`flex-1 text-sm px-3 py-2 rounded-xl border transition ${response.defaultFormat === fmt
                                                ? 'bg-blue-600 border-blue-600 text-white'
                                                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        {fmt}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Field Casing Style</label>
                            <div className="flex gap-2">
                                {(['snake_case', 'camelCase'] as ApiSettingsCasingStyle[]).map((style) => (
                                    <button
                                        key={style}
                                        onClick={() => setResponse((prev) => ({ ...prev, casingStyle: style }))}
                                        className={`flex-1 text-sm px-3 py-2 rounded-xl border font-mono transition ${response.casingStyle === style
                                                ? 'bg-blue-600 border-blue-600 text-white'
                                                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        {style}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Default Page Size</label>
                            <select
                                value={response.defaultPageSize}
                                onChange={(e) => setResponse((prev) => ({ ...prev, defaultPageSize: Number(e.target.value) }))}
                                className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                            >
                                {apiSettingsPageSizeOptions.map((n) => (
                                    <option key={n} value={n}>
                                        {n}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Max Page Size</label>
                            <select
                                value={response.maxPageSize}
                                onChange={(e) => setResponse((prev) => ({ ...prev, maxPageSize: Number(e.target.value) }))}
                                className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                            >
                                {apiSettingsMaxPageSizeOptions.map((n) => (
                                    <option key={n} value={n}>
                                        {n}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        <div className="flex items-center justify-between gap-3 py-3">
                            <div>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Include Request ID Header</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Return an X-Request-Id header on every response for traceability.</p>
                            </div>
                            <ToggleSwitch
                                checked={response.includeRequestIdHeader}
                                onChange={() => {
                                    setResponse((prev) => ({ ...prev, includeRequestIdHeader: !prev.includeRequestIdHeader }));
                                    showToast(`Request ID header ${response.includeRequestIdHeader ? 'disabled' : 'enabled'}`);
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between gap-3 py-3">
                            <div>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Pretty-print JSON</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Format JSON responses with indentation (useful for debugging, increases payload size).</p>
                            </div>
                            <ToggleSwitch
                                checked={response.prettyPrintJson}
                                onChange={() => {
                                    setResponse((prev) => ({ ...prev, prettyPrintJson: !prev.prettyPrintJson }));
                                    showToast(`Pretty-print JSON ${response.prettyPrintJson ? 'disabled' : 'enabled'}`);
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Documentation */}
            {activeTab === 'Documentation' && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 max-w-2xl">
                    <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-4">Documentation Links</h2>
                    <div className="space-y-3 mb-5">
                        {([
                            ['docsUrl', 'API Documentation URL'],
                            ['changelogUrl', 'Changelog URL'],
                            ['statusPageUrl', 'Status Page URL'],
                            ['termsOfServiceUrl', 'Terms of Service URL'],
                            ['supportPortalUrl', 'Support Portal URL'],
                        ] as [keyof ApiSettingsDocumentation, string][]).map(([key, label]) => (
                            <div key={key}>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{label}</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        value={docs[key] as string}
                                        onChange={(e) => setDocs((prev) => ({ ...prev, [key]: e.target.value }))}
                                        className="flex-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 font-mono"
                                    />
                                    <button
                                        onClick={() => handleCopy(key, docs[key] as string)}
                                        className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                        {copiedField === key ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between gap-3 py-3 border-t border-slate-100 dark:border-slate-800">
                        <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Show Code Samples</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Display request code samples alongside endpoint documentation.</p>
                        </div>
                        <ToggleSwitch
                            checked={docs.showCodeSamples}
                            onChange={() => {
                                setDocs((prev) => ({ ...prev, showCodeSamples: !prev.showCodeSamples }));
                                showToast(`Code samples ${docs.showCodeSamples ? 'disabled' : 'enabled'}`);
                            }}
                        />
                    </div>

                    {docs.showCodeSamples && (
                        <div className="mt-3">
                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Default Code Sample Language</label>
                            <select
                                value={docs.defaultCodeLanguage}
                                onChange={(e) => setDocs((prev) => ({ ...prev, defaultCodeLanguage: e.target.value }))}
                                className="w-full sm:w-48 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                            >
                                {apiSettingsCodeLanguageOptions.map((lang) => (
                                    <option key={lang} value={lang}>
                                        {lang}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}