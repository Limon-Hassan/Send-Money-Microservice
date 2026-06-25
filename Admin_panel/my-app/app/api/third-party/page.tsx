'use client';

import { useState, useMemo } from 'react';
import {
    Search,
    ChevronDown,
    X,
    Plug,
    CheckCircle2,
    AlertOctagon,
    Layers,
    Eye,
    EyeOff,
    Copy,
    Check,
    Zap,
    Settings,
    ExternalLink,
    Unplug,
} from 'lucide-react';
import {
    thirdPartyStats,
    thirdPartyServicesData,
    thirdPartyStatusBadge,
    thirdPartyStatusDot,
    thirdPartyCategoryColor,
    thirdPartyCategoryOptions,
    type ThirdPartyService,
    type ThirdPartyCategory,
    type ThirdPartyStatus,
} from '@/lib/data';

const statIconMap = {
    total: Layers,
    connected: CheckCircle2,
    error: AlertOctagon,
    categories: Plug,
} as const;

const statIconColor: Record<string, string> = {
    total: 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    connected: 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400',
    error: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400',
    categories: 'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
};

export default function ThirdPartyServicesPage() {
    const [services, setServices] = useState<ThirdPartyService[]>(thirdPartyServicesData);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<'All' | ThirdPartyCategory>('All');
    const [statusFilter, setStatusFilter] = useState<'All' | ThirdPartyStatus>('All');
    const [toast, setToast] = useState<string | null>(null);
    const [configureTarget, setConfigureTarget] = useState<ThirdPartyService | null>(null);
    const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set());
    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    const [testingId, setTestingId] = useState<string | null>(null);
    const [disconnectTarget, setDisconnectTarget] = useState<ThirdPartyService | null>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const toggleReveal = (credKey: string) => {
        setRevealedKeys((prev) => {
            const next = new Set(prev);
            if (next.has(credKey)) next.delete(credKey);
            else next.add(credKey);
            return next;
        });
    };

    const handleCopy = (credKey: string) => {
        setCopiedKey(credKey);
        showToast('Credential copied to clipboard');
        setTimeout(() => setCopiedKey(null), 1500);
    };

    const handleTestConnection = (service: ThirdPartyService) => {
        setTestingId(service.id);
        setTimeout(() => {
            setTestingId(null);
            if (service.status === 'Error') {
                showToast(`Test failed: ${service.name} returned an authentication error`);
            } else if (service.status === 'Disconnected') {
                showToast(`${service.name} is not connected. Configure credentials first.`);
            } else {
                showToast(`${service.name} connection test succeeded`);
            }
        }, 1100);
    };

    const handleConnectToggle = (service: ThirdPartyService) => {
        if (service.status === 'Connected' || service.status === 'Error') {
            setDisconnectTarget(service);
            return;
        }
        setServices((prev) => prev.map((s) => (s.id === service.id ? { ...s, status: 'Connected', lastSynced: 'Just now' } : s)));
        showToast(`${service.name} connected`);
    };

    const confirmDisconnect = () => {
        if (!disconnectTarget) return;
        setServices((prev) =>
            prev.map((s) => (s.id === disconnectTarget.id ? { ...s, status: 'Disconnected', lastSynced: 'Never' } : s))
        );
        showToast(`${disconnectTarget.name} disconnected`);
        setDisconnectTarget(null);
    };

    const filteredServices = useMemo(() => {
        return services.filter((s) => {
            const matchesSearch = searchQuery
                ? s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.provider.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            const matchesCategory = categoryFilter === 'All' ? true : s.category === categoryFilter;
            const matchesStatus = statusFilter === 'All' ? true : s.status === statusFilter;
            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [services, searchQuery, categoryFilter, statusFilter]);

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen relative">
            {/* Toast */}
            {toast && (
                <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg dark:bg-white dark:text-slate-900">
                    {toast}
                </div>
            )}

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Third Party Services</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Manage external service integrations, credentials, and connection health.
                </p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {thirdPartyStats.map((stat) => {
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
                        placeholder="Search by service or provider..."
                        className="bg-transparent outline-none w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                    />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value as 'All' | ThirdPartyCategory)}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Categories</option>
                        {thirdPartyCategoryOptions.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as 'All' | ThirdPartyStatus)}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Connected">Connected</option>
                        <option value="Disconnected">Disconnected</option>
                        <option value="Error">Error</option>
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
            </div>

            {/* Service cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredServices.map((service) => {
                    const isTesting = testingId === service.id;
                    return (
                        <div key={service.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col gap-3">
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-3">
                                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${service.iconColor}`}>
                                        {service.iconLetter}
                                    </span>
                                    <div>
                                        <p className="font-semibold text-slate-800 dark:text-white text-sm">{service.name}</p>
                                        <p className="text-xs text-slate-400 dark:text-slate-500">{service.provider}</p>
                                    </div>
                                </div>
                                <span className={`flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${thirdPartyStatusBadge[service.status]}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${thirdPartyStatusDot[service.status]}`} />
                                    {service.status}
                                </span>
                            </div>

                            <span className={`text-[11px] px-2 py-0.5 rounded-full w-fit ${thirdPartyCategoryColor[service.category]}`}>{service.category}</span>

                            <p className="text-xs text-slate-500 dark:text-slate-400">{service.description}</p>

                            <div className="flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
                                <div>
                                    <p className="text-slate-400 dark:text-slate-500">Monthly Usage</p>
                                    <p className="font-medium text-slate-700 dark:text-slate-200">{service.monthlyUsageLabel}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-slate-400 dark:text-slate-500">Last Synced</p>
                                    <p className="font-medium text-slate-700 dark:text-slate-200">{service.lastSynced}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                                <button
                                    onClick={() => handleTestConnection(service)}
                                    disabled={isTesting}
                                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-60"
                                >
                                    <Zap size={12} className={isTesting ? 'animate-pulse' : ''} />
                                    {isTesting ? 'Testing...' : 'Test'}
                                </button>
                                <button
                                    onClick={() => setConfigureTarget(service)}
                                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                >
                                    <Settings size={12} />
                                    Configure
                                </button>
                                <button
                                    onClick={() => handleConnectToggle(service)}
                                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium ml-auto ${service.status === 'Connected' || service.status === 'Error'
                                            ? 'border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                >
                                    {service.status === 'Connected' || service.status === 'Error' ? (
                                        <>
                                            <Unplug size={12} /> Disconnect
                                        </>
                                    ) : (
                                        <>
                                            <Plug size={12} /> Connect
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}

                {filteredServices.length === 0 && (
                    <div className="sm:col-span-2 lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center text-slate-400 text-sm">
                        No services match your filters.
                    </div>
                )}
            </div>

            {/* Configure modal */}
            {configureTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${configureTarget.iconColor}`}>
                                    {configureTarget.iconLetter}
                                </span>
                                <div>
                                    <h2 className="font-semibold text-slate-800 dark:text-white">{configureTarget.name}</h2>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">{configureTarget.provider}</p>
                                </div>
                            </div>
                            <button onClick={() => setConfigureTarget(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-5 space-y-4">
                            <p className="text-sm text-slate-600 dark:text-slate-300">{configureTarget.description}</p>

                            {configureTarget.credentials.map((cred) => {
                                const isRevealed = revealedKeys.has(`${configureTarget.id}-${cred.key}`);
                                const credId = `${configureTarget.id}-${cred.key}`;
                                return (
                                    <div key={cred.key}>
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{cred.label}</label>
                                        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl px-3 py-2">
                                            <code className="flex-1 text-xs text-slate-600 dark:text-slate-300 font-mono truncate">
                                                {cred.valueFull ? (isRevealed ? cred.valueFull : cred.valuePreview) : cred.valuePreview}
                                            </code>
                                            {cred.valueFull && (
                                                <>
                                                    <button onClick={() => toggleReveal(credId)} className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 shrink-0">
                                                        {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                                                    </button>
                                                    <button onClick={() => handleCopy(credId)} className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 shrink-0">
                                                        {copiedKey === credId ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            <a
                                href={configureTarget.docsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:underline w-fit"
                            >
                                <ExternalLink size={12} /> View {configureTarget.name} API documentation
                            </a>
                        </div>

                        <div className="flex items-center justify-end gap-2 p-5 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={() => setConfigureTarget(null)}
                                className="text-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    showToast(`${configureTarget.name} credentials updated`);
                                    setConfigureTarget(null);
                                }}
                                className="text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium"
                            >
                                Save Credentials
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Disconnect confirmation modal */}
            {disconnectTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm p-5">
                        <h2 className="font-semibold text-slate-800 dark:text-white mb-2">Disconnect {disconnectTarget.name}</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                            Are you sure you want to disconnect <span className="font-medium text-slate-700 dark:text-slate-200">{disconnectTarget.name}</span>?
                            Any feature relying on this integration will stop working until reconnected.
                        </p>
                        <div className="flex items-center justify-end gap-2">
                            <button
                                onClick={() => setDisconnectTarget(null)}
                                className="text-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDisconnect}
                                className="text-sm px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 font-medium"
                            >
                                Disconnect
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}