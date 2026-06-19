'use client';

import { useState } from 'react';
import {
  ChevronRight, MoreVertical, Filter, Calendar, ChevronDown,
  ArrowDownToLine, ArrowUpFromLine, Building2,
} from 'lucide-react';
import {
  companyWalletAccounts,
  companyDeposits,
  companyWithdrawals,
  walletOverviewStats,
  CompanyWalletAccount,
  CompanyDeposit,
  CompanyWithdrawal,
  CorridorStatus,
} from '@/lib/data';

// ── helpers ───────────────────────────────────────────────────
const currencySymbol: Record<string, string> = {
  GBP: '£', USD: '$', EUR: '€', BDT: '৳', PKR: '₨', INR: '₹', PHP: '₱', NGN: '₦', AED: 'AED ',
};

const sym = (code: string) => currencySymbol[code] ?? '';

const fmt = (n: number) =>
  n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const fmtCompact = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
  return n.toFixed(0);
};

const statusBadge: Record<CorridorStatus, string> = {
  Healthy: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
  Low: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
  Critical: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
};

const depositStatusClasses: Record<CompanyDeposit['status'], string> = {
  Confirmed: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
  Pending: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
  Failed: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
};

const withdrawalStatusClasses: Record<CompanyWithdrawal['status'], string> = {
  Completed: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
  Pending: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
  Failed: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
  Cancelled: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
};

function dateTimeParts(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return { date, time };
}

// ── Wallet Card ───────────────────────────────────────────────
function WalletCard({ acc }: { acc: CompanyWalletAccount }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl leading-none">{acc.flag}</span>
          <span className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">{acc.name}</span>
        </div>
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded whitespace-nowrap ${statusBadge[acc.status]}`}>
          {acc.status}
        </span>
      </div>

      <p className="text-xl font-bold text-gray-900 dark:text-white">
        {sym(acc.currency)}{fmt(acc.available)}
      </p>
      <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-3">Available Balance</p>

      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <div>
          <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">
            {sym(acc.currency)}{fmt(acc.reserved)}
          </p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500">Hold Balance</p>
        </div>
        <span className="text-[11px] text-gray-400 dark:text-gray-500">{acc.bankName}</span>
      </div>

      <button className="mt-auto w-full border border-gray-200 dark:border-gray-700 rounded-lg py-2 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
        View Details
      </button>
    </div>
  );
}

function TotalBalanceCard() {
  const s = walletOverviewStats;
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
      <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 mb-1">Total Balance (All Accounts)</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        {sym(s.totalBalanceCurrency)}{fmt(s.totalBalance)}
      </p>
      <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-3">{s.totalBalanceCurrency} equivalent</p>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-gray-500 dark:text-gray-400">Available</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {sym(s.totalBalanceCurrency)}{fmt(s.totalAvailable)}
          </span>
        </div>
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-gray-500 dark:text-gray-400">Reserved</span>
          <span className="font-semibold text-amber-600 dark:text-amber-400">
            {sym(s.totalBalanceCurrency)}{fmt(s.totalReserved)}
          </span>
        </div>
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-gray-500 dark:text-gray-400">Daily Inflow</span>
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            {sym(s.totalBalanceCurrency)}{fmtCompact(s.dailyInflow)}
          </span>
        </div>
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-gray-500 dark:text-gray-400">Daily Outflow</span>
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            {sym(s.totalBalanceCurrency)}{fmtCompact(s.dailyOutflow)}
          </span>
        </div>
      </div>
    </div>
  );
}

function FilterBar() {
  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
        All Accounts <ChevronDown size={13} />
      </button>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
        All Status <ChevronDown size={13} />
      </button>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
        <Calendar size={13} /> <span className="hidden sm:inline">This Week</span><span className="sm:hidden">Week</span> <ChevronDown size={13} />
      </button>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer sm:ml-auto">
        <Filter size={13} /> Filters
      </button>
    </div>
  );
}

// ── Deposit Table ─────────────────────────────────────────────
function DepositTable({ rows }: { rows: CompanyDeposit[] }) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[760px]">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
              <th className="px-4 py-2.5 font-medium">ID</th>
              <th className="px-2 py-2.5 font-medium">Account</th>
              <th className="px-2 py-2.5 font-medium">Amount</th>
              <th className="px-2 py-2.5 font-medium">Source</th>
              <th className="px-2 py-2.5 font-medium">Status</th>
              <th className="px-2 py-2.5 font-medium">Received</th>
              <th className="px-2 py-2.5 font-medium">Reference</th>
              <th className="px-2 py-2.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => {
              const { date, time } = dateTimeParts(r.receivedAt);
              return (
                <tr key={r.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                  <td className="px-4 py-2.5 text-[12px] text-blue-600 dark:text-blue-400 font-medium whitespace-nowrap">{r.id}</td>
                  <td className="px-2 py-2.5 text-[12px] text-gray-700 dark:text-gray-300 whitespace-nowrap">{r.accountName}</td>
                  <td className="px-2 py-2.5 text-[12px] text-gray-900 dark:text-white font-semibold whitespace-nowrap">
                    {sym(r.currency)}{fmt(r.amount)}
                  </td>
                  <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.source}</td>
                  <td className="px-2 py-2.5 whitespace-nowrap">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${depositStatusClasses[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{date}<br />{time}</td>
                  <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{r.senderRef}</td>
                  <td className="px-2 py-2.5 text-right">
                    <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">
                      <MoreVertical size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
        <span>Showing 1 to {rows.length} of {rows.length} deposits</span>
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-40" disabled>‹</button>
          <button className="px-2.5 py-1 rounded bg-blue-600 text-white cursor-pointer">1</button>
          <button className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-40" disabled>›</button>
        </div>
        <select className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded px-2 py-1 text-[12px] text-gray-600 dark:text-gray-300">
          <option>10 / page</option>
          <option>20 / page</option>
          <option>50 / page</option>
        </select>
      </div>
    </>
  );
}

// ── Withdrawal Table ──────────────────────────────────────────
function WithdrawalTable({ rows }: { rows: CompanyWithdrawal[] }) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[760px]">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
              <th className="px-4 py-2.5 font-medium">ID</th>
              <th className="px-2 py-2.5 font-medium">Account</th>
              <th className="px-2 py-2.5 font-medium">Amount</th>
              <th className="px-2 py-2.5 font-medium">Type</th>
              <th className="px-2 py-2.5 font-medium">Status</th>
              <th className="px-2 py-2.5 font-medium">Initiated</th>
              <th className="px-2 py-2.5 font-medium">Destination</th>
              <th className="px-2 py-2.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => {
              const { date, time } = dateTimeParts(r.initiatedAt);
              return (
                <tr key={r.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                  <td className="px-4 py-2.5 text-[12px] text-blue-600 dark:text-blue-400 font-medium whitespace-nowrap">{r.id}</td>
                  <td className="px-2 py-2.5 text-[12px] text-gray-700 dark:text-gray-300 whitespace-nowrap">{r.accountName}</td>
                  <td className="px-2 py-2.5 text-[12px] text-gray-900 dark:text-white font-semibold whitespace-nowrap">
                    {sym(r.currency)}{fmt(r.amount)}
                  </td>
                  <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.type}</td>
                  <td className="px-2 py-2.5 whitespace-nowrap">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${withdrawalStatusClasses[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{date}<br />{time}</td>
                  <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{r.destinationBank}</td>
                  <td className="px-2 py-2.5 text-right">
                    <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">
                      <MoreVertical size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
        <span>Showing 1 to {rows.length} of {rows.length} withdrawals</span>
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-40" disabled>‹</button>
          <button className="px-2.5 py-1 rounded bg-blue-600 text-white cursor-pointer">1</button>
          <button className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-40" disabled>›</button>
        </div>
        <select className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded px-2 py-1 text-[12px] text-gray-600 dark:text-gray-300">
          <option>10 / page</option>
          <option>20 / page</option>
          <option>50 / page</option>
        </select>
      </div>
    </>
  );
}

function HistoryPanel({ defaultTab = 'deposit' }: { defaultTab?: 'deposit' | 'withdrawal' }) {
  const [tab, setTab] = useState<'deposit' | 'withdrawal'>(defaultTab);
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
      <div className="flex items-center gap-6 px-4 pt-3 border-b border-gray-100 dark:border-gray-700/60">
        <button
          onClick={() => setTab('deposit')}
          className={`pb-2.5 text-[13px] font-medium border-b-2 -mb-px transition-colors cursor-pointer ${tab === 'deposit'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
        >
          Deposit History
        </button>
        <button
          onClick={() => setTab('withdrawal')}
          className={`pb-2.5 text-[13px] font-medium border-b-2 -mb-px transition-colors cursor-pointer ${tab === 'withdrawal'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
        >
          Withdrawal History
        </button>
      </div>
      <FilterBar />
      {tab === 'deposit'
        ? <DepositTable rows={companyDeposits} />
        : <WithdrawalTable rows={companyWithdrawals} />}
    </div>
  );
}

// ── Recent Activity (merged from deposits + withdrawals) ──────
function RecentActivity() {
  const merged = [
    ...companyDeposits.map(d => ({
      id: d.id,
      type: 'deposit' as const,
      amount: `+ ${sym(d.currency)}${fmt(d.amount)}`,
      account: d.accountName,
      at: d.receivedAt,
    })),
    ...companyWithdrawals.map(w => ({
      id: w.id,
      type: 'withdrawal' as const,
      amount: `- ${sym(w.currency)}${fmt(w.amount)}`,
      account: w.accountName,
      at: w.initiatedAt,
    })),
  ]
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, 6);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
      <h2 className="text-[14px] font-semibold text-gray-800 dark:text-gray-100 mb-5">Recent Wallet Activity</h2>
      <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-2 overflow-x-auto">
        {merged.map((item, idx) => {
          const { date, time } = dateTimeParts(item.at);
          return (
            <div key={item.id} className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 sm:flex-1 relative shrink-0 sm:min-w-[120px]">
              {idx !== 0 && (
                <div className="hidden sm:block absolute top-4 right-1/2 w-full h-px bg-gray-100 dark:bg-gray-700 -z-10" />
              )}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${item.type === 'deposit'
                    ? 'bg-emerald-50 text-emerald-500 dark:bg-emerald-950 dark:text-emerald-400'
                    : 'bg-orange-50 text-orange-500 dark:bg-orange-950 dark:text-orange-400'
                  }`}
              >
                {item.type === 'deposit' ? <ArrowDownToLine size={14} /> : <ArrowUpFromLine size={14} />}
              </div>
              <div className="sm:text-center">
                <p className="text-[12px] font-medium text-gray-700 dark:text-gray-300">
                  {item.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                </p>
                <p className={`text-[13px] font-semibold ${item.type === 'deposit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                  {item.amount}
                </p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">{item.account}</p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500">{date} {time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function WalletOverviewPage() {
  return (
    <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* header */}
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Building2 size={18} className="text-gray-700 dark:text-gray-300" /> Wallet Management
        </h1>
        <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
          <span>Dashboard</span><ChevronRight size={12} />
          <span>Wallets</span><ChevronRight size={12} />
          <span className="text-gray-700 dark:text-gray-300 font-medium">Wallet Overview</span>
        </div>
      </div>

      {/* wallet account cards + total */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {companyWalletAccounts.map(acc => <WalletCard key={acc.id} acc={acc} />)}
        <TotalBalanceCard />
      </div>

      {/* deposit / withdrawal histories */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        <HistoryPanel defaultTab="deposit" />
        <HistoryPanel defaultTab="withdrawal" />
      </div>

      {/* recent activity */}
      <RecentActivity />
    </div>
  );
}