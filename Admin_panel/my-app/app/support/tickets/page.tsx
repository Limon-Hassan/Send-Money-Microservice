'use client';

import { useState } from 'react';
import { Plus, Search, Filter, Eye, MoreVertical } from 'lucide-react';
import {
  allSupportTickets,
  allSupportTicketsTotalCount,
  supportTicketStatusTabsFull,
  supportTicketCategoryOptions,
  supportTicketPriorityOptions,
  supportTicketAgentOptions,
  priorityBadgeStyles,
  statusBadgeStyles,
  type TicketStatus2,
} from '@/lib/data';

const Page = () => {
  const [activeTab, setActiveTab] = useState<TicketStatus2 | 'All'>('All');

  const filteredTickets =
    activeTab === 'All'
      ? allSupportTickets
      : allSupportTickets.filter((t) => t.status === activeTab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Support Tickets
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage and track all customer support tickets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
            Export CSV
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition">
            <Plus size={16} />
            New Ticket
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
        {/* Top Filters */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {supportTicketStatusTabsFull.map((tab) => (
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

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
            <div className="lg:col-span-2 relative">
              <Search
                size={16}
                className="absolute left-3 top-3 text-slate-400"
              />
              <input
                placeholder="Search tickets..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            <select className="px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200">
              {supportTicketCategoryOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>

            <select className="px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200">
              {supportTicketPriorityOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <select className="flex-1 px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200">
                {supportTicketAgentOptions.map((opt) => (
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-300">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr className="text-left text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="px-5 py-4">Ticket ID</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Subject</th>
                <th className="px-5 py-4">Priority</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Assigned To</th>
                <th className="px-5 py-4">Updated</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                >
                  <td className="px-5 py-4 text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">
                    {ticket.ticketId}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={ticket.customerAvatar}
                        alt={ticket.customerName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">
                        {ticket.customerName}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    {ticket.category}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300 max-w-55 truncate">
                    {ticket.subject}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${priorityBadgeStyles[ticket.priority]}`}
                    >
                      {ticket.priority}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusBadgeStyles[ticket.status]}`}
                    >
                      {ticket.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <img
                        src={ticket.assignedAvatar}
                        alt={ticket.assignedTo}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-300">
                        {ticket.assignedTo}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {ticket.updated}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-5 border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing 1-{filteredTickets.length} of{' '}
            {allSupportTicketsTotalCount.toLocaleString()} tickets
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