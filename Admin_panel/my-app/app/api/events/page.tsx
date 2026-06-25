'use client';

import { useState, useMemo } from 'react';
import {
    Plus,
    Search,
    ChevronDown,
    Trash2,
    X,
    Calendar,
    ShieldCheck,
    Users,
    TrendingUp,
    PauseCircle,
    PlayCircle,
    Zap,
} from 'lucide-react';
import {
    subsStats,
    subsEventCatalog,
    eventSubscriptionsData,
    subsCategoryColor,
    subsChannelBadge,
    subsStatusBadge,
    subsStatusDot,
    subsCategoryOptions,
    subsChannelOptions,
    subsAvailableSubscribers,
    type SubsEventCategory,
    type SubsChannel,
    type EventSubscriptionRecord,
} from '@/lib/data';

const statIconMap = {
    events: Calendar,
    active: ShieldCheck,
    subscribers: Users,
    top: TrendingUp,
} as const;

const statIconColor: Record<string, string> = {
    events: 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    active: 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400',
    subscribers: 'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
    top: 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
};

export default function EventSubscriptionsPage() {
    const [subscriptions, setSubscriptions] = useState<EventSubscriptionRecord[]>(eventSubscriptionsData);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<'All' | SubsEventCategory>('All');
    const [channelFilter, setChannelFilter] = useState<'All' | SubsChannel>('All');
    const [toast, setToast] = useState<string | null>(null);
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(subsCategoryOptions));
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<EventSubscriptionRecord | null>(null);
    const [testingId, setTestingId] = useState<string | null>(null);

    // form state
    const [formEventKey, setFormEventKey] = useState(subsEventCatalog[0].eventKey);
    const [formSubscriberId, setFormSubscriberId] = useState(subsAvailableSubscribers[0].id);
    const [formChannel, setFormChannel] = useState<SubsChannel>('Webhook');
    const [formDestination, setFormDestination] = useState('');

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const toggleCategoryExpand = (cat: string) => {
        setExpandedCategories((prev) => {
            const next = new Set(prev);
            if (next.has(cat)) next.delete(cat);
            else next.add(cat);
            return next;
        });
    };

    const resetForm = () => {
        setFormEventKey(subsEventCatalog[0].eventKey);
        setFormSubscriberId(subsAvailableSubscribers[0].id);
        setFormChannel('Webhook');
        setFormDestination('');
    };

    const openCreateModal = (eventKey?: string) => {
        resetForm();
        if (eventKey) setFormEventKey(eventKey);
        setCreateModalOpen(true);
    };

    const handleCreateSubmit = () => {
        if (!formDestination.trim()) {
            showToast('Please provide a destination');
            return;
        }
        const event = subsEventCatalog.find((e) => e.eventKey === formEventKey)!;
        const subscriber = subsAvailableSubscribers.find((s) => s.id === formSubscriberId)!;
        const newSub: EventSubscriptionRecord = {
            id: `sub-${Date.now()}`,
            eventKey: event.eventKey,
            eventName: event.name,
            subscriberId: subscriber.id,
            subscriberName: subscriber.name,
            channel: formChannel,
            destination: formDestination.trim(),
            status: 'Active',
            lastTriggered: 'Never',
            createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        };
        setSubscriptions((prev) => [newSub, ...prev]);
        showToast(`Subscription to "${event.name}" created`);
        setCreateModalOpen(false);
    };

    const confirmDelete = () => {
        if (!deleteTarget) return;
        setSubscriptions((prev) => prev.filter((s) => s.id !== deleteTarget.id));
        showToast(`Subscription removed`);
        setDeleteTarget(null);
    };

    const handleTogglePause = (sub: EventSubscriptionRecord) => {
        const nextStatus = sub.status === 'Active' ? 'Paused' : 'Active';
        setSubscriptions((prev) => prev.map((s) => (s.id === sub.id ? { ...s, status: nextStatus } : s)));
        showToast(`Subscription ${nextStatus === 'Active' ? 'resumed' : 'paused'}`);
    };

    const handleTest = (sub: EventSubscriptionRecord) => {
        setTestingId(sub.id);
        setTimeout(() => {
            setTestingId(null);
            showToast(`Test event sent to "${sub.subscriberName}" via ${sub.channel}`);
            setSubscriptions((prev) => prev.map((s) => (s.id === sub.id ? { ...s, lastTriggered: 'Just now' } : s)));
        }, 1000);
    };

    const filteredCatalog = useMemo(() => {
        return subsEventCatalog.filter((ev) => {
            const matchesSearch = searchQuery
                ? ev.name.toLowerCase().includes(searchQuery.toLowerCase()) || ev.eventKey.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            const matchesCategory = categoryFilter === 'All' ? true : ev.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, categoryFilter]);

    const groupedCatalog = useMemo(() => {
        const groups = new Map<string, typeof subsEventCatalog>();
        filteredCatalog.forEach((ev) => {
            const list = groups.get(ev.category) ?? [];
            list.push(ev);
            groups.set(ev.category, list);
        });
        return groups;
    }, [filteredCatalog]);

    const filteredSubscriptions = useMemo(() => {
        return subscriptions.filter((s) => (channelFilter === 'All' ? true : s.channel === channelFilter));
    }, [subscriptions, channelFilter]);

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
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Event Subscriptions</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Browse available system events and manage who is subscribed to them.
                    </p>
                </div>
                <button
                    onClick={() => openCreateModal()}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium w-fit"
                >
                    <Plus size={16} />
                    New Subscription
                </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {subsStats.map((stat) => {
                    const Icon = statIconMap[stat.icon];
                    return (
                        <div
                            key={stat.id}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-3"
                        >
                            <span className={`p-2.5 rounded-xl ${statIconColor[stat.icon]} shrink-0`}>
                                <Icon size={18} />
                            </span>
                            <div className="min-w-0">
                                <p className="text-lg font-bold text-slate-800 dark:text-white truncate">{stat.value}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Event catalog */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-semibold text-slate-800 dark:text-white text-sm">Event Catalog</h2>
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 mb-3 flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 flex-1 min-w-35">
                            <Search size={14} />
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search events..."
                                className="bg-transparent outline-none w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400 text-sm"
                            />
                        </div>
                        <div className="relative flex items-center gap-1 text-sm px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value as 'All' | SubsEventCategory)}
                                className="bg-transparent outline-none pr-1 appearance-none"
                            >
                                <option value="All">All Categories</option>
                                {subsCategoryOptions.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="pointer-events-none" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {Array.from(groupedCatalog.entries()).map(([cat, events]) => {
                            const isExpanded = expandedCategories.has(cat);
                            return (
                                <div key={cat} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                                    <button
                                        onClick={() => toggleCategoryExpand(cat)}
                                        className="w-full flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${subsCategoryColor[cat as SubsEventCategory]}`}>{cat}</span>
                                            <span className="text-xs text-slate-500 dark:text-slate-400">{events.length} events</span>
                                        </div>
                                        <ChevronDown size={14} className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                    </button>
                                    {isExpanded && (
                                        <div className="border-t border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
                                            {events.map((ev) => (
                                                <div key={ev.id} className="flex items-center justify-between gap-2 p-3.5">
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{ev.name}</p>
                                                        <code className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">{ev.eventKey}</code>
                                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{ev.description}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2 shrink-0">
                                                        <span className="text-[11px] text-slate-400 dark:text-slate-500 whitespace-nowrap">{ev.subscriberCount} subs</span>
                                                        <button
                                                            onClick={() => openCreateModal(ev.eventKey)}
                                                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                                                            aria-label="Subscribe"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        {groupedCatalog.size === 0 && (
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-sm">
                                No events match your search.
                            </div>
                        )}
                    </div>
                </div>

                {/* Active subscriptions */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-semibold text-slate-800 dark:text-white text-sm">Active Subscriptions</h2>
                        <div className="relative flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                            <select
                                value={channelFilter}
                                onChange={(e) => setChannelFilter(e.target.value as 'All' | SubsChannel)}
                                className="bg-transparent outline-none pr-1 appearance-none"
                            >
                                <option value="All">All Channels</option>
                                {subsChannelOptions.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={12} className="pointer-events-none" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        {filteredSubscriptions.map((sub) => {
                            const isTesting = testingId === sub.id;
                            return (
                                <div key={sub.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <div>
                                            <code className="text-xs font-mono text-slate-700 dark:text-slate-200">{sub.eventKey}</code>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sub.subscriberName}</p>
                                        </div>
                                        <button
                                            onClick={() => handleTogglePause(sub)}
                                            className="flex items-center gap-1.5 text-[11px] font-medium whitespace-nowrap"
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full ${subsStatusDot[sub.status]}`} />
                                            <span className={`px-2 py-0.5 rounded-full ${subsStatusBadge[sub.status]}`}>{sub.status}</span>
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ${subsChannelBadge[sub.channel]}`}>
                                                {sub.channel}
                                            </span>
                                            <code className="text-[11px] text-slate-400 dark:text-slate-500 font-mono truncate">{sub.destination}</code>
                                        </div>
                                        <div className="flex items-center gap-1 shrink-0">
                                            <button
                                                onClick={() => handleTest(sub)}
                                                disabled={isTesting}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 disabled:opacity-60"
                                                aria-label="Send test event"
                                                title="Send test event"
                                            >
                                                <Zap size={13} className={isTesting ? 'animate-pulse' : ''} />
                                            </button>
                                            <button
                                                onClick={() => handleTogglePause(sub)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                                                aria-label="Toggle pause"
                                            >
                                                {sub.status === 'Paused' ? <PlayCircle size={13} /> : <PauseCircle size={13} />}
                                            </button>
                                            <button
                                                onClick={() => setDeleteTarget(sub)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                                                aria-label="Delete"
                                            >
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2">Last triggered: {sub.lastTriggered}</p>
                                </div>
                            );
                        })}
                        {filteredSubscriptions.length === 0 && (
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-sm">
                                No subscriptions match this filter.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Create subscription modal */}
            {createModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="font-semibold text-slate-800 dark:text-white">New Event Subscription</h2>
                            <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-5 space-y-4">
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Event</label>
                                <select
                                    value={formEventKey}
                                    onChange={(e) => setFormEventKey(e.target.value)}
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                >
                                    {subsEventCatalog.map((ev) => (
                                        <option key={ev.eventKey} value={ev.eventKey}>
                                            {ev.name} ({ev.eventKey})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Subscriber</label>
                                <select
                                    value={formSubscriberId}
                                    onChange={(e) => setFormSubscriberId(e.target.value)}
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                >
                                    {subsAvailableSubscribers.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Channel</label>
                                <div className="flex gap-2">
                                    {subsChannelOptions.map((ch) => (
                                        <button
                                            key={ch}
                                            onClick={() => setFormChannel(ch)}
                                            className={`flex-1 text-sm px-3 py-2 rounded-xl border transition ${formChannel === ch
                                                    ? 'bg-blue-600 border-blue-600 text-white'
                                                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                }`}
                                        >
                                            {ch}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">
                                    {formChannel === 'Webhook' ? 'Webhook URL' : formChannel === 'Email' ? 'Email Address' : 'Destination'}
                                </label>
                                <input
                                    value={formDestination}
                                    onChange={(e) => setFormDestination(e.target.value)}
                                    placeholder={
                                        formChannel === 'Webhook'
                                            ? 'https://example.com/webhook'
                                            : formChannel === 'Email'
                                                ? 'team@example.com'
                                                : 'Dashboard Notifications'
                                    }
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 font-mono"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 p-5 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={() => setCreateModalOpen(false)}
                                className="text-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateSubmit}
                                className="text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium"
                            >
                                Create Subscription
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete confirmation modal */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm p-5">
                        <h2 className="font-semibold text-slate-800 dark:text-white mb-2">Remove Subscription</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                            Are you sure you want to remove this subscription to{' '}
                            <span className="font-medium text-slate-700 dark:text-slate-200">{deleteTarget.eventName}</span> for{' '}
                            <span className="font-medium text-slate-700 dark:text-slate-200">{deleteTarget.subscriberName}</span>?
                        </p>
                        <div className="flex items-center justify-end gap-2">
                            <button
                                onClick={() => setDeleteTarget(null)}
                                className="text-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="text-sm px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 font-medium"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}