'use client';

import { useState } from 'react';
import {
    Plus,
    Search,
    Copy,
    Pencil,
    Trash2,
    MoreVertical,
    Zap,
} from 'lucide-react';
import {
    quickReplyItems,
    quickReplyItemsTotalCount,
    quickReplyCategoryTabs,
    quickReplyCategoryBadgeStyles,
    type QuickReplyCategory,
} from '@/lib/data';

const Page = () => {
    const [activeTab, setActiveTab] = useState<QuickReplyCategory | 'All'>(
        'All',
    );
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const filteredReplies =
        activeTab === 'All'
            ? quickReplyItems
            : quickReplyItems.filter((r) => r.category === activeTab);

    const handleCopy = (id: string, message: string) => {
        navigator.clipboard?.writeText(message).catch(() => { });
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 1500);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Quick Replies
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Manage canned responses agents can use to reply faster.
                    </p>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition">
                    <Plus size={16} />
                    New Quick Reply
                </button>
            </div>

            {/* Main Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                {/* Top Filters */}
                <div className="p-5 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        {quickReplyCategoryTabs.map((tab) => (
                            <button
                                key={tab.label}
                                onClick={() => setActiveTab(tab.category)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition whitespace-nowrap ${activeTab === tab.category
                                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                            >
                                {tab.label}
                                {tab.count !== null && (
                                    <span className="ml-1.5 text-xs opacity-70">
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="relative max-w-md">
                        <Search
                            size={16}
                            className="absolute left-3 top-3 text-slate-400"
                        />
                        <input
                            placeholder="Search by shortcut, title or message..."
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                    </div>
                </div>

                {/* Quick Reply Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-5">
                    {filteredReplies.map((reply) => (
                        <div
                            key={reply.id}
                            className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:border-slate-300 dark:hover:border-slate-700 transition flex flex-col"
                        >
                            <div className="flex items-start justify-between gap-2 mb-2">
                                <div className="flex items-center gap-2 min-w-0">
                                    <div className="shrink-0 w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                                        <Zap size={14} className="text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                                            {reply.title}
                                        </p>
                                        <code className="text-xs text-blue-600 dark:text-blue-400">
                                            {reply.shortcut}
                                        </code>
                                    </div>
                                </div>

                                <span
                                    className={`shrink-0 px-2 py-0.5 rounded-full text-[11px] font-medium ${quickReplyCategoryBadgeStyles[reply.category]}`}
                                >
                                    {reply.category}
                                </span>
                            </div>

                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
                                {reply.message}
                            </p>

                            <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <img
                                        src={reply.createdByAvatar}
                                        alt={reply.createdBy}
                                        className="w-5 h-5 rounded-full object-cover"
                                    />
                                    <span>{reply.createdBy}</span>
                                    <span>•</span>
                                    <span>{reply.usageCount.toLocaleString()} uses</span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => handleCopy(reply.id, reply.message)}
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition"
                                        title="Copy message"
                                    >
                                        <Copy size={14} />
                                    </button>
                                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition">
                                        <Pencil size={14} />
                                    </button>
                                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition">
                                        <Trash2 size={14} />
                                    </button>
                                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                                        <MoreVertical size={14} />
                                    </button>
                                </div>
                            </div>

                            {copiedId === reply.id && (
                                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-2">
                                    Copied to clipboard!
                                </p>
                            )}
                        </div>
                    ))}

                    {filteredReplies.length === 0 && (
                        <div className="lg:col-span-2 p-10 text-center text-sm text-slate-400">
                            No quick replies found in this category.
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-5 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Showing 1-{filteredReplies.length} of {quickReplyItemsTotalCount}{' '}
                        quick replies
                    </p>

                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <button
                                key={num}
                                className={`w-8 h-8 rounded-lg border text-sm transition ${num === 1
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;