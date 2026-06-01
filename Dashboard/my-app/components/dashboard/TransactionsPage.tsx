"use client";

import React, { useState } from "react";
import {
  History,
  Search,
  Filter,
  Download,
  ChevronDown,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { mockTransactions, formatCurrency } from "@/lib/data";

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [showFilter, setShowFilter] = useState(false);

  const filtered = mockTransactions.filter((tx) => {
    const matchSearch =
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.to.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "All" || tx.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statuses = ["All", "Completed", "Pending", "Failed"];

  return (
    <div className="page-enter p-4 lg:p-6">
      <div className="w-full mx-auto">
        <div className="stagger-1 flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center">
            <History size={18} className="text-[#166634]" />
          </div>
          <h2
            className="text-xl font-bold text-gray-800"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Transactions History
          </h2>
        </div>

        {/* Filters */}
        <div className="stagger-2 flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID or recipient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#166634]/20 focus:border-[#166634]/50 transition"
            />
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
              >
                <Filter size={15} />
                {statusFilter}
                <ChevronDown size={13} className="text-gray-400" />
              </button>
              {showFilter && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                  {statuses.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setStatusFilter(s);
                        setShowFilter(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition ${
                        statusFilter === s
                          ? "bg-[#0a2012] text-white"
                          : "hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
              <Download size={15} />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="stagger-3 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Desktop header */}
          <div className="hidden md:grid grid-cols-5 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
            <span>Transfer ID</span>
            <span>Date & Time</span>
            <span>Receiver</span>
            <span>Amount</span>
            <span>Status</span>
          </div>

          <div className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <History size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No transactions found</p>
              </div>
            ) : (
              filtered.map((tx, i) => (
                <div
                  key={tx.id}
                  className="px-5 py-4 hover:bg-gray-50/50 transition cursor-pointer"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  {/* Mobile layout */}
                  <div className="md:hidden flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] flex items-center justify-center flex-shrink-0">
                      <ArrowUpRight size={16} className="text-[#166634]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-800">{tx.id}</p>
                      <p className="text-xs text-gray-400">
                        To: {tx.to} • {tx.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm text-gray-800">
                        {formatCurrency(tx.amount)}
                      </p>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          tx.status === "Completed"
                            ? "badge-completed"
                            : tx.status === "Pending"
                            ? "badge-pending"
                            : "badge-failed"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden md:grid grid-cols-5 gap-4 items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                        <ArrowUpRight size={14} className="text-[#166634]" />
                      </div>
                      <span className="text-sm font-medium text-blue-600 truncate">
                        {tx.id}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">{tx.date}</p>
                      <p className="text-xs text-gray-400">{tx.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0a2012] to-[#166634] flex items-center justify-center text-white text-xs font-bold">
                        {tx.to.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-700">{tx.to}</span>
                    </div>
                    <span className="font-semibold text-sm text-gray-800">
                      {formatCurrency(tx.amount)} {tx.currency}
                    </span>
                    <span
                      className={`text-xs font-medium px-3 py-1.5 rounded-full inline-block ${
                        tx.status === "Completed"
                          ? "badge-completed"
                          : tx.status === "Pending"
                          ? "badge-pending"
                          : "badge-failed"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Download receipt */}
          <div className="px-5 py-4 border-t border-gray-50 flex items-center justify-center">
            <button className="flex items-center gap-2 text-sm text-[#166634] font-medium hover:gap-3 transition-all">
              <Download size={15} /> Download Receipt
            </button>
          </div>
        </div>
      </div>

      {showFilter && (
        <div className="fixed inset-0 z-40" onClick={() => setShowFilter(false)} />
      )}
    </div>
  );
}
