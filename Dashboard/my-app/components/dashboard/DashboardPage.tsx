"use client";

import React from "react";
import {
  ArrowUpRight,
  TrendingUp,
  Shield,
  Send,
  Eye,
  EyeOff,
  ChevronRight,
} from "lucide-react";
import { mockUser, mockTransactions, formatCurrency } from "@/lib/data";
import { NavItem } from "@/types";

interface DashboardPageProps {
  onNavigate: (item: NavItem) => void;
}

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const [showBalance, setShowBalance] = React.useState(true);
  const recent = mockTransactions.slice(0, 3);

  return (
    <div className="page-enter p-4 lg:p-6 space-y-6">
      {/* Welcome */}
      <div className="stagger-1 flex items-start justify-between">
        <div>
          <h2
            className="text-2xl lg:text-3xl font-bold text-gray-800"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Welcome Back, {mockUser.name.split(" ")[0]} 👋
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Here&apos;s what&apos;s happening with your account today.
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="stagger-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Wallet balance */}
        <div className="sm:col-span-1 bg-gradient-to-br from-[#0a2012] to-[#166534] rounded-2xl p-5 text-white relative overflow-hidden card-hover">
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/5" />
          <div className="absolute -right-2 -bottom-8 w-32 h-32 rounded-full bg-[#7ffe4a]/10" />
          <p className="text-white/70 text-xs font-medium uppercase tracking-wide">
            Wallet Balance
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span
              className="text-3xl font-bold"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {showBalance
                ? formatCurrency(mockUser.walletBalance)
                : "••••••"}
            </span>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-white/60 hover:text-white transition"
            >
              {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="text-white/50 text-xs mt-1">Available Balance</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs bg-[#7ffe4a]/20 text-[#7ffe4a] px-2 py-0.5 rounded-full">
              USD
            </span>
            <span className="text-white/50 text-xs flex items-center gap-1">
              <TrendingUp size={12} /> +2.4% this month
            </span>
          </div>
        </div>

        {/* Send money quick */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 card-hover flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center mb-3">
              <Send size={18} className="text-[#166534]" />
            </div>
            <p className="font-semibold text-gray-800">Send Money</p>
            <p className="text-xs text-gray-400 mt-1">Fast & secure transfer</p>
          </div>
          <button
            onClick={() => onNavigate("send-money")}
            className="btn-primary mt-4 w-full bg-[#0a2012] text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#166534]"
          >
            <Send size={15} /> Send Now
          </button>
        </div>

        {/* Verification */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 card-hover flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center mb-3">
              <Shield size={18} className="text-[#166534]" />
            </div>
            <p className="font-semibold text-gray-800">Verification Status</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-600 font-semibold text-sm">
                Verified
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Your account is fully verified
            </p>
          </div>
          <button
            onClick={() => onNavigate("kyc-verification")}
            className="mt-4 text-xs text-[#166534] font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            View Details <ChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="stagger-3 bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <h3
            className="font-semibold text-gray-800"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Recent Transactions
          </h3>
          <button
            onClick={() => onNavigate("transactions-history")}
            className="text-xs text-[#166534] font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            View All <ArrowUpRight size={13} />
          </button>
        </div>

        <div className="divide-y divide-gray-50">
          {recent.map((tx, i) => (
            <div
              key={tx.id}
              className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition cursor-pointer"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] flex items-center justify-center flex-shrink-0">
                <span className="text-[#166534] font-bold text-sm">
                  {tx.to.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-800 truncate">
                  TRID: {tx.id}
                </p>
                <p className="text-xs text-gray-400 truncate">To: {tx.to}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-semibold text-sm text-gray-800">
                  {formatCurrency(tx.amount)}
                </p>
                <div className="flex items-center justify-end gap-1 mt-0.5">
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
                <p className="text-xs text-gray-400 mt-0.5">
                  {tx.date}, {tx.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick stats */}
      <div className="stagger-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Sent", value: "$12,450", change: "+8.2%", up: true },
          { label: "This Month", value: "$1,000", change: "+15%", up: true },
          { label: "Avg. Fee", value: "$2.99", change: "-0.5%", up: false },
          { label: "Recipients", value: "24", change: "+3", up: true },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-4 border border-gray-100 card-hover"
          >
            <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
            <p
              className="text-xl font-bold text-gray-800 mt-1"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {stat.value}
            </p>
            <span
              className={`text-xs font-medium mt-1 inline-block ${
                stat.up ? "text-green-600" : "text-red-500"
              }`}
            >
              {stat.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
