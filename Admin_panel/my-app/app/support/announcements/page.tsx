'use client';

import { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Pencil,
  Trash2,
  MoreVertical,
  Megaphone,
} from 'lucide-react';
import {
  allAnnouncements,
  allAnnouncementsTotalCount,
  announcementStatusTabs,
  announcementPriorityOptions,
  announcementAudienceOptions,
  announcementPriorityBadgeStyles,
  announcementStatusBadgeStyles,
  type AnnouncementStatus,
} from '@/lib/data';

const Page = () => {
  const [activeTab, setActiveTab] = useState<AnnouncementStatus | 'All'>(
    'All',
  );

  const filteredAnnouncements =
    activeTab === 'All'
      ? allAnnouncements
      : allAnnouncements.filter((a) => a.status === activeTab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Announcements
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Create and manage announcements for customers and agents.
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition">
          <Plus size={16} />
          New Announcement
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
        {/* Top Filters */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {announcementStatusTabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.status)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition whitespace-nowrap ${activeTab === tab.status
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

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
            <div className="lg:col-span-2 relative">
              <Search
                size={16}
                className="absolute left-3 top-3 text-slate-400"
              />
              <input
                placeholder="Search announcements..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            <select className="px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200">
              {announcementPriorityOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <select className="flex-1 px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200">
                {announcementAudienceOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>

              <button className="px-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <Filter size={15} />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Announcement List (card-style rows) */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className="flex flex-col lg:flex-row lg:items-start gap-4 p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
            >
              {/* Icon */}
              <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                <Megaphone size={18} className="text-blue-600 dark:text-blue-400" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {ann.title}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${announcementPriorityBadgeStyles[ann.priority]}`}
                  >
                    {ann.priority}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${announcementStatusBadgeStyles[ann.status]}`}
                  >
                    {ann.status}
                  </span>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                  {ann.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <img
                      src={ann.authorAvatar}
                      alt={ann.author}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span>{ann.author}</span>
                  </div>
                  <span>•</span>
                  <span>{ann.date}</span>
                  <span>•</span>
                  <span>{ann.audience}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye size={13} />
                    {ann.views.toLocaleString()} views
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0 self-start lg:self-center">
                <button className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition">
                  <Pencil size={15} />
                </button>
                <button className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition">
                  <Trash2 size={15} />
                </button>
                <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                  <MoreVertical size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-5 border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing 1-{filteredAnnouncements.length} of{' '}
            {allAnnouncementsTotalCount} announcements
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