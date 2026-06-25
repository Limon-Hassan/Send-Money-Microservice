'use client';

import { useState } from 'react';
import {
    Mail,
    MessageSquare,
    Bell,
    Monitor,
    Save,
    Search,
} from 'lucide-react';
import {
    notificationChannels,
    notificationEventRules,
    notificationEventCategoryTabs,
    notificationCategoryBadgeStyles,
    notificationOverviewStats,
    type NotificationEventCategory,
    type NotificationChannel,
} from '@/lib/data';

const channelIconMap: Record<string, React.ElementType> = {
    Mail,
    MessageSquare,
    Bell,
    Monitor,
};

const Toggle = ({
    checked,
    onChange,
    disabled,
}: {
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
}) => (
    <button
        onClick={onChange}
        disabled={disabled}
        className={`relative w-10 h-6 rounded-full transition shrink-0 ${checked ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
            } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
    >
        <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${checked ? 'translate-x-4' : ''
                }`}
        />
    </button>
);

const Page = () => {
    const [channels, setChannels] = useState(notificationChannels);
    const [rules, setRules] = useState(notificationEventRules);
    const [activeCategory, setActiveCategory] = useState<
        NotificationEventCategory | 'All'
    >('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2000);
    };

    const toggleChannel = (id: NotificationChannel) => {
        setChannels((prev) =>
            prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c)),
        );
        const channel = channels.find((c) => c.id === id);
        showToast(
            channel?.enabled
                ? `${channel.label} disabled`
                : `${channel?.label} enabled`,
        );
    };

    const toggleEventChannel = (
        ruleId: string,
        channel: NotificationChannel,
    ) => {
        setRules((prev) =>
            prev.map((r) =>
                r.id === ruleId
                    ? {
                        ...r,
                        channels: { ...r.channels, [channel]: !r.channels[channel] },
                    }
                    : r,
            ),
        );
    };

    const filteredRules = rules.filter((r) => {
        const categoryMatch =
            activeCategory === 'All' || r.category === activeCategory;
        const searchMatch =
            !searchQuery ||
            r.event.toLowerCase().includes(searchQuery.toLowerCase());
        return categoryMatch && searchMatch;
    });

    return (
        <div className="space-y-6">
            {/* Toast */}
            {toast && (
                <div className="fixed top-5 right-5 z-50 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-xl shadow-lg">
                    {toast}
                </div>
            )}

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Notification Settings
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Configure delivery channels and event-based notification rules.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {notificationOverviewStats.map((stat) => (
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
                            <p className="text-xs mt-1 text-emerald-600 dark:text-emerald-400">
                                ↑ {stat.change}%{' '}
                                <span className="text-slate-400">{stat.changeLabel}</span>
                            </p>
                        ) : (
                            <p className="text-xs mt-1 text-slate-400">{stat.changeLabel}</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Notification Channels */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-5">
                    Notification Channels
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {channels.map((channel) => {
                        const Icon = channelIconMap[channel.icon] ?? Bell;
                        return (
                            <div
                                key={channel.id}
                                className={`flex items-center justify-between gap-3 p-4 rounded-xl border transition ${channel.enabled
                                        ? 'border-blue-200 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-500/5'
                                        : 'border-slate-100 dark:border-slate-800'
                                    }`}
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div
                                        className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${channel.enabled
                                                ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
                                                : 'bg-slate-100 text-slate-400 dark:bg-slate-800'
                                            }`}
                                    >
                                        <Icon size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                            {channel.label}
                                        </p>
                                        <p className="text-xs text-slate-400 truncate">
                                            {channel.description}
                                        </p>
                                    </div>
                                </div>

                                <Toggle
                                    checked={channel.enabled}
                                    onChange={() => toggleChannel(channel.id)}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Event Rules Matrix */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-4">
                        Event Notification Rules
                    </h2>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        {notificationEventCategoryTabs.map((tab) => (
                            <button
                                key={tab.label}
                                onClick={() => setActiveCategory(tab.category)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition whitespace-nowrap ${activeCategory === tab.category
                                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="relative max-w-md">
                        <Search
                            size={16}
                            className="absolute left-3 top-3 text-slate-400"
                        />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search events..."
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-200">
                        <thead className="bg-slate-50 dark:bg-slate-800/50">
                            <tr className="text-left text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                <th className="px-5 py-3">Event</th>
                                <th className="px-5 py-3">Category</th>
                                <th className="px-5 py-3 text-center">Email</th>
                                <th className="px-5 py-3 text-center">SMS</th>
                                <th className="px-5 py-3 text-center">Push</th>
                                <th className="px-5 py-3 text-center">In-App</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filteredRules.map((rule) => (
                                <tr
                                    key={rule.id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                                >
                                    <td className="px-5 py-3">
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">
                                            {rule.event}
                                        </p>
                                        <p className="text-xs text-slate-400 max-w-65 truncate">
                                            {rule.description}
                                        </p>
                                    </td>

                                    <td className="px-5 py-3">
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${notificationCategoryBadgeStyles[rule.category]}`}
                                        >
                                            {rule.category}
                                        </span>
                                    </td>

                                    {(['email', 'sms', 'push', 'inApp'] as const).map((ch) => {
                                        const channelEnabled = channels.find(
                                            (c) => c.id === ch,
                                        )?.enabled;
                                        return (
                                            <td key={ch} className="px-5 py-3 text-center">
                                                <div className="flex justify-center">
                                                    <Toggle
                                                        checked={rule.channels[ch] && !!channelEnabled}
                                                        disabled={!channelEnabled}
                                                        onChange={() => toggleEventChannel(rule.id, ch)}
                                                    />
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}

                            {filteredRules.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-5 py-10 text-center text-sm text-slate-400"
                                    >
                                        No events match your search or filter.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end p-5 border-t border-slate-200 dark:border-slate-800">
                    <button
                        onClick={() => showToast('Notification rules saved!')}
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition"
                    >
                        <Save size={15} />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;