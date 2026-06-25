'use client';

import { useState } from 'react';
import {
    Database,
    Server,
    Code2,
    HardDrive,
    Workflow,
    MessageSquare,
    Mail,
    Zap,
    RefreshCw,
    AlertCircle,
    CheckCircle2,
    Clock,
    X,
    Power,
    Loader2,
} from 'lucide-react';
import {
    systemServicesHealth,
    resourceUsageMetrics,
    uptimeHistoryThisWeek,
    recentSystemIncidents,
    systemHealthOverviewStats,
    type ServiceHealthStatus,
} from '@/lib/data';

const serviceIconMap: Record<string, React.ElementType> = {
    Database,
    Server,
    Code2,
    HardDrive,
    Workflow,
    MessageSquare,
    Mail,
    Zap,
};

const statusStyles: Record<ServiceHealthStatus, string> = {
    Healthy:
        'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    Degraded:
        'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    Down: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
};

const statusDotColor: Record<ServiceHealthStatus, string> = {
    Healthy: 'bg-emerald-500',
    Degraded: 'bg-amber-500',
    Down: 'bg-red-500',
};

const incidentStatusStyles: Record<string, string> = {
    Resolved:
        'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    Monitoring:
        'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    Investigating: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
};

const impactStyles: Record<string, string> = {
    Minor: 'text-slate-400',
    Major: 'text-amber-500',
    Critical: 'text-red-500',
};

const Page = () => {
    const [services, setServices] = useState(systemServicesHealth);
    const [incidents, setIncidents] = useState(recentSystemIncidents);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [toast, setToast] = useState<string | null>(null);
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
        null,
    );
    const [restartingId, setRestartingId] = useState<string | null>(null);
    const [incidentFilter, setIncidentFilter] = useState<
        'All' | 'Resolved' | 'Open'
    >('All');

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2000);
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setServices((prev) =>
                prev.map((s) => ({ ...s, lastChecked: 'Just now' })),
            );
            setIsRefreshing(false);
            showToast('System health refreshed!');
        }, 900);
    };

    const handleRestartService = (id: string) => {
        setRestartingId(id);
        showToast('Restarting service...');
        setTimeout(() => {
            setServices((prev) =>
                prev.map((s) =>
                    s.id === id
                        ? {
                            ...s,
                            status: 'Healthy',
                            responseTime:
                                s.id === 'svc-005' ? '95ms' : s.responseTime,
                            lastChecked: 'Just now',
                        }
                        : s,
                ),
            );
            setRestartingId(null);
            const svc = services.find((s) => s.id === id);
            showToast(`${svc?.name} restarted and back to Healthy!`);
        }, 1800);
    };

    const healthyCount = services.filter((s) => s.status === 'Healthy').length;
    const selectedService = services.find((s) => s.id === selectedServiceId);

    const filteredIncidents = incidents.filter((inc) => {
        if (incidentFilter === 'All') return true;
        if (incidentFilter === 'Resolved') return inc.status === 'Resolved';
        return inc.status !== 'Resolved';
    });

    const resolveIncident = (id: string) => {
        setIncidents((prev) =>
            prev.map((inc) =>
                inc.id === id
                    ? { ...inc, status: 'Resolved' as const, resolvedAt: 'Just now' }
                    : inc,
            ),
        );
        showToast('Incident marked as resolved!');
    };

    return (
        <div className="space-y-6">
            {/* Toast */}
            {toast && (
                <div className="fixed top-5 right-5 z-50 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-xl shadow-lg">
                    {toast}
                </div>
            )}

            {/* Service Detail Modal */}
            {selectedService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                                    {(() => {
                                        const Icon = serviceIconMap[selectedService.icon] ?? Server;
                                        return <Icon size={18} />;
                                    })()}
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                                        {selectedService.name}
                                    </h2>
                                    <p className="text-xs text-slate-400">
                                        {selectedService.description}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedServiceId(null)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <span
                            className={`flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-xs font-medium mb-4 ${statusStyles[selectedService.status]}`}
                        >
                            <span
                                className={`w-1.5 h-1.5 rounded-full ${statusDotColor[selectedService.status]}`}
                            />
                            {selectedService.status}
                        </span>

                        <div className="grid grid-cols-3 gap-3 mb-5">
                            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3">
                                <p className="text-[11px] text-slate-400 mb-0.5">Uptime</p>
                                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    {selectedService.uptime}
                                </p>
                            </div>
                            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3">
                                <p className="text-[11px] text-slate-400 mb-0.5">Response</p>
                                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    {selectedService.responseTime}
                                </p>
                            </div>
                            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3">
                                <p className="text-[11px] text-slate-400 mb-0.5">Checked</p>
                                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    {selectedService.lastChecked}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSelectedServiceId(null)}
                                className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => handleRestartService(selectedService.id)}
                                disabled={restartingId === selectedService.id}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl text-sm font-medium transition"
                            >
                                {restartingId === selectedService.id ? (
                                    <Loader2 size={14} className="animate-spin" />
                                ) : (
                                    <Power size={14} />
                                )}
                                {restartingId === selectedService.id
                                    ? 'Restarting...'
                                    : 'Restart Service'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        System Health
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Real-time status of all platform services and infrastructure.
                    </p>
                </div>

                <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl text-sm font-medium transition"
                >
                    <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                    {isRefreshing ? 'Refreshing...' : 'Refresh Status'}
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {systemHealthOverviewStats.map((stat) => (
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
                                className={`text-xs mt-1 ${stat.change >= 0
                                        ? 'text-emerald-600 dark:text-emerald-400'
                                        : 'text-red-500'
                                    }`}
                            >
                                {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)}%{' '}
                                <span className="text-slate-400">{stat.changeLabel}</span>
                            </p>
                        ) : (
                            <p className="text-xs mt-1 text-slate-400">{stat.changeLabel}</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Services Grid */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        Service Status
                    </h2>
                    <span className="text-xs text-slate-400">
                        {healthyCount} / {services.length} healthy
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {services.map((svc) => {
                        const Icon = serviceIconMap[svc.icon] ?? Server;
                        const isRestarting = restartingId === svc.id;
                        return (
                            <button
                                key={svc.id}
                                onClick={() => setSelectedServiceId(svc.id)}
                                className="text-left border border-slate-100 dark:border-slate-800 rounded-xl p-4 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition"
                            >
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="shrink-0 w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                                            <Icon size={16} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                                                {svc.name}
                                            </p>
                                            <p className="text-[11px] text-slate-400 truncate">
                                                {svc.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <span
                                    className={`flex items-center gap-1.5 w-fit px-2 py-0.5 rounded-full text-[11px] font-medium mb-3 ${statusStyles[svc.status]}`}
                                >
                                    {isRestarting ? (
                                        <Loader2 size={10} className="animate-spin" />
                                    ) : (
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full ${statusDotColor[svc.status]}`}
                                        />
                                    )}
                                    {isRestarting ? 'Restarting...' : svc.status}
                                </span>

                                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                                    <div>
                                        <p>Uptime</p>
                                        <p className="text-slate-700 dark:text-slate-200 font-medium">
                                            {svc.uptime}
                                        </p>
                                    </div>
                                    <div>
                                        <p>Response</p>
                                        <p className="text-slate-700 dark:text-slate-200 font-medium">
                                            {svc.responseTime}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-2">
                                    Checked {svc.lastChecked}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Resource Usage + Uptime History */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Resource Usage */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                    <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-5">
                        Resource Usage
                    </h2>
                    <div className="space-y-4">
                        {resourceUsageMetrics.map((res) => (
                            <div key={res.id}>
                                <div className="flex items-center justify-between text-xs mb-1.5">
                                    <span className="text-slate-600 dark:text-slate-300 font-medium">
                                        {res.label}
                                    </span>
                                    <span className="text-slate-400">{res.detail}</span>
                                </div>
                                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all"
                                        style={{
                                            width: `${res.usedPercent}%`,
                                            backgroundColor: res.color,
                                        }}
                                    />
                                </div>
                                <p className="text-[11px] text-slate-400 mt-1">
                                    {res.usedPercent}% used
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Uptime History */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                    <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-5">
                        Uptime History <span className="text-slate-400 font-normal">(This Week)</span>
                    </h2>
                    <div className="flex items-end justify-between gap-2 h-32">
                        {uptimeHistoryThisWeek.map((day) => (
                            <div
                                key={day.label}
                                className="flex-1 flex flex-col items-center gap-2"
                            >
                                <div className="w-full h-24 flex items-end bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                                    <div
                                        className={`w-full rounded-lg transition-all ${day.uptime >= 99.5
                                                ? 'bg-emerald-500'
                                                : day.uptime >= 98
                                                    ? 'bg-amber-500'
                                                    : 'bg-red-500'
                                            }`}
                                        style={{
                                            height: `${Math.max((day.uptime - 95) * 20, 8)}%`,
                                        }}
                                    />
                                </div>
                                <span className="text-[10px] text-slate-400">{day.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Incidents */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        Recent Incidents
                    </h2>
                    <div className="flex items-center gap-2">
                        {(['All', 'Open', 'Resolved'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setIncidentFilter(f)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${incidentFilter === f
                                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredIncidents.map((inc) => (
                        <div key={inc.id} className="flex items-start gap-3 p-4">
                            <div className="shrink-0 mt-0.5">
                                {inc.status === 'Resolved' ? (
                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                ) : (
                                    <AlertCircle size={16} className="text-amber-500" />
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                        {inc.title}
                                    </p>
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${incidentStatusStyles[inc.status]}`}
                                    >
                                        {inc.status}
                                    </span>
                                    <span
                                        className={`text-[11px] font-medium ${impactStyles[inc.impact]}`}
                                    >
                                        {inc.impact} impact
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400">
                                    Affected: {inc.affectedServices.join(', ')}
                                </p>
                                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                    <Clock size={11} />
                                    Started {inc.startedAt}
                                    {inc.resolvedAt && ` • Resolved ${inc.resolvedAt}`}
                                </p>
                            </div>

                            {inc.status !== 'Resolved' && (
                                <button
                                    onClick={() => resolveIncident(inc.id)}
                                    className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition whitespace-nowrap"
                                >
                                    Mark Resolved
                                </button>
                            )}
                        </div>
                    ))}

                    {filteredIncidents.length === 0 && (
                        <div className="p-8 text-center text-sm text-slate-400">
                            No incidents in this filter.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;