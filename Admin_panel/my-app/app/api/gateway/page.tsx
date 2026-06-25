'use client';

import { useState } from 'react';
import {
    Settings2,
    Database,
    Timer,
    Network,
    Save,
    Trash2,
    Plus,
    X,
    RefreshCw,
    Activity,
} from 'lucide-react';
import {
    gatewaySettingsTabs,
    gatewayGeneralDefaults,
    gatewayMaxBodySizeOptions,
    gatewayCachingDefaults,
    gatewayTtlOptions,
    gatewayCacheStats,
    gatewayTimeoutsDefaults,
    gatewayLbStrategyOptions,
    gatewayUpstreamHealthBadge,
    gatewayUpstreamHealthDot,
    gatewayUpstreamServers,
    gatewayLbDefaults,
    type GatewaySettingsTabId,
    type GatewayGeneralConfig,
    type GatewayCachingConfig,
    type GatewayTimeoutsConfig,
    type GatewayLbConfig,
    type GatewayLbStrategy,
    type GatewayUpstreamServer,
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

const tabIconMap: Record<GatewaySettingsTabId, typeof Settings2> = {
    General: Settings2,
    Caching: Database,
    'Timeouts & Retries': Timer,
    'Load Balancing': Network,
};

export default function GatewaySettingsPage() {
    const [activeTab, setActiveTab] = useState<GatewaySettingsTabId>('General');
    const [toast, setToast] = useState<string | null>(null);

    const [general, setGeneral] = useState<GatewayGeneralConfig>(gatewayGeneralDefaults);
    const [caching, setCaching] = useState<GatewayCachingConfig>(gatewayCachingDefaults);
    const [timeouts, setTimeouts] = useState<GatewayTimeoutsConfig>(gatewayTimeoutsDefaults);
    const [lbConfig, setLbConfig] = useState<GatewayLbConfig>(gatewayLbDefaults);
    const [upstreams, setUpstreams] = useState<GatewayUpstreamServer[]>(gatewayUpstreamServers);
    const [isPurging, setIsPurging] = useState(false);
    const [newHost, setNewHost] = useState('');
    const [newWeight, setNewWeight] = useState(10);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const handleSaveAll = () => {
        showToast('Gateway settings saved');
    };

    const handlePurgeCache = () => {
        setIsPurging(true);
        setTimeout(() => {
            setIsPurging(false);
            showToast('Cache purged successfully');
        }, 1000);
    };

    const handleAddUpstream = () => {
        if (!newHost.trim()) {
            showToast('Please provide a host address');
            return;
        }
        const newServer: GatewayUpstreamServer = {
            id: `up-${Date.now()}`,
            host: newHost.trim(),
            weight: newWeight,
            health: 'Healthy',
            activeConnections: 0,
        };
        setUpstreams((prev) => [...prev, newServer]);
        showToast(`Upstream "${newServer.host}" added`);
        setNewHost('');
        setNewWeight(10);
    };

    const handleRemoveUpstream = (id: string) => {
        const server = upstreams.find((u) => u.id === id);
        setUpstreams((prev) => prev.filter((u) => u.id !== id));
        showToast(`Upstream "${server?.host}" removed`);
    };

    const handleUpdateWeight = (id: string, weight: number) => {
        setUpstreams((prev) => prev.map((u) => (u.id === id ? { ...u, weight } : u)));
    };

    const handleRecheckHealth = (server: GatewayUpstreamServer) => {
        showToast(`Re-checked health for ${server.host}: ${server.health}`);
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
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Gateway Settings</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Configure the API gateway's transport, caching, resilience, and routing behavior.
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
                {gatewaySettingsTabs.map((tab) => {
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
                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Gateway Name</label>
                            <input
                                value={general.gatewayName}
                                onChange={(e) => setGeneral((prev) => ({ ...prev, gatewayName: e.target.value }))}
                                className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 font-mono"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Listen Protocol</label>
                            <div className="flex gap-2">
                                {(['HTTPS', 'HTTP'] as const).map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setGeneral((prev) => ({ ...prev, listenProtocol: p }))}
                                        className={`flex-1 text-sm px-3 py-2 rounded-xl border transition ${general.listenProtocol === p
                                                ? 'bg-blue-600 border-blue-600 text-white'
                                                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Max Request Body Size</label>
                            <select
                                value={general.maxRequestBodyMb}
                                onChange={(e) => setGeneral((prev) => ({ ...prev, maxRequestBodyMb: Number(e.target.value) }))}
                                className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                            >
                                {gatewayMaxBodySizeOptions.map((mb) => (
                                    <option key={mb} value={mb}>
                                        {mb} MB
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        <div className="flex items-center justify-between gap-3 py-3">
                            <div>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Enable Gzip Compression</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Compress response bodies to reduce bandwidth usage.</p>
                            </div>
                            <ToggleSwitch
                                checked={general.enableGzipCompression}
                                onChange={() => {
                                    setGeneral((prev) => ({ ...prev, enableGzipCompression: !prev.enableGzipCompression }));
                                    showToast(`Gzip compression ${general.enableGzipCompression ? 'disabled' : 'enabled'}`);
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between gap-3 py-3">
                            <div>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Enable Request Logging</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Log every request that passes through the gateway.</p>
                            </div>
                            <ToggleSwitch
                                checked={general.enableRequestLogging}
                                onChange={() => {
                                    setGeneral((prev) => ({ ...prev, enableRequestLogging: !prev.enableRequestLogging }));
                                    showToast(`Request logging ${general.enableRequestLogging ? 'disabled' : 'enabled'}`);
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between gap-3 py-3">
                            <div>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Strip Upstream Headers</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Remove internal headers set by upstream services before returning to clients.</p>
                            </div>
                            <ToggleSwitch
                                checked={general.stripUpstreamHeaders}
                                onChange={() => {
                                    setGeneral((prev) => ({ ...prev, stripUpstreamHeaders: !prev.stripUpstreamHeaders }));
                                    showToast(`Strip upstream headers ${general.stripUpstreamHeaders ? 'disabled' : 'enabled'}`);
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Caching */}
            {activeTab === 'Caching' && (
                <div className="flex flex-col gap-4 max-w-2xl">
                    <div className="grid grid-cols-3 gap-3">
                        {gatewayCacheStats.map((stat) => (
                            <div key={stat.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3">
                                <p className="text-lg font-bold text-slate-800 dark:text-white">{stat.value}</p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold text-slate-800 dark:text-white text-sm">Response Caching</h2>
                            <button
                                onClick={handlePurgeCache}
                                disabled={isPurging}
                                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 disabled:opacity-60"
                            >
                                {isPurging && <RefreshCw size={12} className="animate-spin" />}
                                {isPurging ? 'Purging...' : 'Purge Cache'}
                            </button>
                        </div>

                        <div className="divide-y divide-slate-100 dark:divide-slate-800 mb-4">
                            <div className="flex items-center justify-between gap-3 py-3">
                                <div>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Enable Response Caching</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Cache eligible upstream responses at the gateway layer.</p>
                                </div>
                                <ToggleSwitch
                                    checked={caching.enableResponseCaching}
                                    onChange={() => {
                                        setCaching((prev) => ({ ...prev, enableResponseCaching: !prev.enableResponseCaching }));
                                        showToast(`Response caching ${caching.enableResponseCaching ? 'disabled' : 'enabled'}`);
                                    }}
                                />
                            </div>
                            <div className="flex items-center justify-between gap-3 py-3">
                                <div>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Cache by Query Parameters</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Treat requests with different query strings as separate cache entries.</p>
                                </div>
                                <ToggleSwitch
                                    checked={caching.cacheByQueryParams}
                                    onChange={() => {
                                        setCaching((prev) => ({ ...prev, cacheByQueryParams: !prev.cacheByQueryParams }));
                                        showToast(`Cache by query params ${caching.cacheByQueryParams ? 'disabled' : 'enabled'}`);
                                    }}
                                />
                            </div>
                            <div className="flex items-center justify-between gap-3 py-3">
                                <div>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Cache GET Requests Only</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Never cache POST, PUT, PATCH, or DELETE responses.</p>
                                </div>
                                <ToggleSwitch
                                    checked={caching.cacheableMethodsOnlyGet}
                                    onChange={() => {
                                        setCaching((prev) => ({ ...prev, cacheableMethodsOnlyGet: !prev.cacheableMethodsOnlyGet }));
                                        showToast(`GET-only caching ${caching.cacheableMethodsOnlyGet ? 'disabled' : 'enabled'}`);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Default TTL</label>
                                <select
                                    value={caching.defaultTtlSeconds}
                                    onChange={(e) => setCaching((prev) => ({ ...prev, defaultTtlSeconds: Number(e.target.value) }))}
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                >
                                    {gatewayTtlOptions.map((t) => (
                                        <option key={t} value={t}>
                                            {t} seconds
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Bypass Cache Header</label>
                                <input
                                    value={caching.bypassCacheHeader}
                                    onChange={(e) => setCaching((prev) => ({ ...prev, bypassCacheHeader: e.target.value }))}
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 font-mono"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Timeouts & Retries */}
            {activeTab === 'Timeouts & Retries' && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 max-w-2xl">
                    <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-4">Timeouts & Retries</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                        <div>
                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Connect Timeout (ms)</label>
                            <input
                                type="number"
                                value={timeouts.connectTimeoutMs}
                                onChange={(e) => setTimeouts((prev) => ({ ...prev, connectTimeoutMs: Number(e.target.value) }))}
                                className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Read Timeout (ms)</label>
                            <input
                                type="number"
                                value={timeouts.readTimeoutMs}
                                onChange={(e) => setTimeouts((prev) => ({ ...prev, readTimeoutMs: Number(e.target.value) }))}
                                className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Max Retries</label>
                            <input
                                type="number"
                                value={timeouts.maxRetries}
                                onChange={(e) => setTimeouts((prev) => ({ ...prev, maxRetries: Number(e.target.value) }))}
                                className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Retry on Status Codes</label>
                            <input
                                value={timeouts.retryOnStatusCodes}
                                onChange={(e) => setTimeouts((prev) => ({ ...prev, retryOnStatusCodes: e.target.value }))}
                                className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 font-mono"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 py-3 border-t border-slate-100 dark:border-slate-800">
                        <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Enable Circuit Breaker</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Temporarily stop routing to an upstream after repeated failures.</p>
                        </div>
                        <ToggleSwitch
                            checked={timeouts.circuitBreakerEnabled}
                            onChange={() => {
                                setTimeouts((prev) => ({ ...prev, circuitBreakerEnabled: !prev.circuitBreakerEnabled }));
                                showToast(`Circuit breaker ${timeouts.circuitBreakerEnabled ? 'disabled' : 'enabled'}`);
                            }}
                        />
                    </div>

                    {timeouts.circuitBreakerEnabled && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 pt-3">
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Error Threshold (%)</label>
                                <input
                                    type="number"
                                    value={timeouts.circuitBreakerErrorThresholdPercent}
                                    onChange={(e) => setTimeouts((prev) => ({ ...prev, circuitBreakerErrorThresholdPercent: Number(e.target.value) }))}
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Cooldown Period (seconds)</label>
                                <input
                                    type="number"
                                    value={timeouts.circuitBreakerCooldownSeconds}
                                    onChange={(e) => setTimeouts((prev) => ({ ...prev, circuitBreakerCooldownSeconds: Number(e.target.value) }))}
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Load Balancing */}
            {activeTab === 'Load Balancing' && (
                <div className="flex flex-col gap-4 max-w-2xl">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                        <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-4">Load Balancing Strategy</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Strategy</label>
                                <select
                                    value={lbConfig.strategy}
                                    onChange={(e) => setLbConfig((prev) => ({ ...prev, strategy: e.target.value as GatewayLbStrategy }))}
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                >
                                    {gatewayLbStrategyOptions.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Health Check Interval (sec)</label>
                                <input
                                    type="number"
                                    value={lbConfig.healthCheckIntervalSeconds}
                                    onChange={(e) => setLbConfig((prev) => ({ ...prev, healthCheckIntervalSeconds: Number(e.target.value) }))}
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Health Check Path</label>
                            <input
                                value={lbConfig.healthCheckPath}
                                onChange={(e) => setLbConfig((prev) => ({ ...prev, healthCheckPath: e.target.value }))}
                                className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 font-mono"
                            />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                        <h2 className="font-semibold text-slate-800 dark:text-white text-sm mb-4">Upstream Servers</h2>
                        <div className="flex flex-col gap-2 mb-4">
                            {upstreams.map((server) => (
                                <div key={server.id} className="border border-slate-100 dark:border-slate-800 rounded-xl p-3">
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <code className="text-sm font-mono text-slate-700 dark:text-slate-200">{server.host}</code>
                                        <div className="flex items-center gap-2">
                                            <span className="flex items-center gap-1.5 text-[11px] font-medium">
                                                <span className={`w-1.5 h-1.5 rounded-full ${gatewayUpstreamHealthDot[server.health]}`} />
                                                <span className={`px-2 py-0.5 rounded-full ${gatewayUpstreamHealthBadge[server.health]}`}>{server.health}</span>
                                            </span>
                                            <button
                                                onClick={() => handleRecheckHealth(server)}
                                                className="p-1 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                                                aria-label="Recheck health"
                                            >
                                                <Activity size={13} />
                                            </button>
                                            <button
                                                onClick={() => handleRemoveUpstream(server.id)}
                                                className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                                                aria-label="Remove"
                                            >
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                                        <span>{server.activeConnections} active connections</span>
                                        <div className="flex items-center gap-2 flex-1">
                                            <span className="whitespace-nowrap">Weight:</span>
                                            <input
                                                type="range"
                                                min={0}
                                                max={100}
                                                value={server.weight}
                                                onChange={(e) => handleUpdateWeight(server.id, Number(e.target.value))}
                                                className="flex-1"
                                            />
                                            <span className="w-8 text-right">{server.weight}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {upstreams.length === 0 && <p className="text-xs text-slate-400 text-center py-4">No upstream servers configured.</p>}
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                value={newHost}
                                onChange={(e) => setNewHost(e.target.value)}
                                placeholder="10.0.2.14:8080"
                                className="flex-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 font-mono"
                            />
                            <input
                                type="number"
                                value={newWeight}
                                onChange={(e) => setNewWeight(Number(e.target.value))}
                                className="w-20 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                            />
                            <button
                                onClick={handleAddUpstream}
                                className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shrink-0"
                            >
                                <Plus size={14} /> Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}