'use client';

import { useState } from 'react';
import {
  ChevronRight, TrendingUp, TrendingDown, AlertTriangle,
  Eye, EyeOff, RefreshCw, Building2, ArrowUpRight, ArrowDownLeft,
} from 'lucide-react';
import {
  companyWalletAccounts, corridorBalances, walletOverviewStats,
  CompanyWalletAccount, CorridorBalance, CorridorStatus,
} from '@/lib/data';

// ── helpers ───────────────────────────────────────────────────
const statusConfig: Record<CorridorStatus, { classes: string; bar: string; label: string }> = {
  Healthy: { classes: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400', bar: 'bg-emerald-500', label: 'Healthy' },
  Low: { classes: 'bg-amber-100  text-amber-700  dark:bg-amber-950  dark:text-amber-400', bar: 'bg-amber-500', label: 'Low' },
  Critical: { classes: 'bg-red-100    text-red-700    dark:bg-red-950    dark:text-red-400', bar: 'bg-red-500', label: 'Critical' },
};

const typeConfig: Record<string, string> = {
  Operating: 'bg-blue-100   text-blue-700   dark:bg-blue-950   dark:text-blue-400',
  Settlement: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  Reserve: 'bg-teal-100   text-teal-700   dark:bg-teal-950   dark:text-teal-400',
  Float: 'bg-amber-100  text-amber-700  dark:bg-amber-950  dark:text-amber-400',
};

const fmt = (n: number, currency = 'GBP') => {
  const sym: Record<string, string> = { GBP: '£', USD: '$', EUR: '€', BDT: '৳', PKR: '₨', INR: '₹', PHP: '₱', NGN: '₦', AED: 'AED ' };
  return `${sym[currency] ?? ''}${n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

function BalanceBar({ used, total, status }: { used: number; total: number; status: CorridorStatus }) {
  const pct = Math.min((used / total) * 100, 100);
  return (
    <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mt-2">
      <div className={`h-full rounded-full transition-all ${statusConfig[status].bar}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

// ── Account Card ──────────────────────────────────────────────
function AccountCard({ acc, hideBalance }: { acc: CompanyWalletAccount; hideBalance: boolean }) {
  const sc = statusConfig[acc.status];
  const tc = typeConfig[acc.type];
  const usedPct = Math.round(((acc.balance - acc.available) / acc.maxCapacity) * 100);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">{acc.flag}</span>
          <div>
            <p className="text-[13px] font-semibold text-gray-900 dark:text-white">{acc.name}</p>
            <p className="text-[11px] text-gray-400 font-mono">{acc.accountNumber}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${sc.classes}`}>{sc.label}</span>
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${tc}`}>{acc.type}</span>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-[11px] text-gray-400 mb-0.5">Total Balance</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white">
          {hideBalance ? '••••••' : fmt(acc.balance, acc.currency)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
          <p className="text-[10px] text-gray-400 mb-0.5">Available</p>
          <p className="text-[13px] font-semibold text-emerald-600 dark:text-emerald-400">
            {hideBalance ? '••••' : fmt(acc.available, acc.currency)}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
          <p className="text-[10px] text-gray-400 mb-0.5">Reserved</p>
          <p className="text-[13px] font-semibold text-amber-600 dark:text-amber-400">
            {hideBalance ? '••••' : fmt(acc.reserved, acc.currency)}
          </p>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1">
          <span className="text-[10px] text-gray-400">{acc.bankName}</span>
          <span className="text-[10px] text-gray-400">{usedPct}% used</span>
        </div>
        <BalanceBar used={acc.balance - acc.available} total={acc.maxCapacity} status={acc.status} />
        {acc.status !== 'Healthy' && (
          <p className="text-[10px] text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
            <AlertTriangle size={9} />
            {acc.status === 'Critical' ? 'Below minimum threshold!' : 'Approaching minimum threshold'}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function WalletOverviewPage() {
  const [hideBalance, setHideBalance] = useState(false);
  const s = walletOverviewStats;

  return (
    <div className="px-4 py-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[13px] text-gray-400 dark:text-gray-500 mb-1">
            <span>Wallets</span><ChevronRight size={12} />
            <span className="text-gray-900 dark:text-white font-medium">Wallet Overview</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Company Wallet Overview</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Internal fund management, liquidity and settlement accounts</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => setHideBalance(h => !h)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-[12px] font-medium hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
            {hideBalance ? <Eye size={13} /> : <EyeOff size={13} />}
            {hideBalance ? 'Show' : 'Hide'} Balances
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-[12px] font-medium hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
            <RefreshCw size={13} /> Refresh
          </button>
        </div>
      </div>

      {/* summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Balance', value: hideBalance ? '••••••' : `£${(s.totalBalance / 1000).toFixed(0)}k`, sub: 'GBP equivalent', color: 'text-blue-600 dark:text-blue-400', Icon: Building2 },
          { label: 'Available Funds', value: hideBalance ? '••••••' : `£${(s.totalAvailable / 1000).toFixed(0)}k`, sub: 'ready to deploy', color: 'text-emerald-600 dark:text-emerald-400', Icon: TrendingUp },
          { label: 'Daily Inflow', value: hideBalance ? '••••••' : `£${(s.dailyInflow / 1000).toFixed(0)}k`, sub: 'deposits today', color: 'text-emerald-600 dark:text-emerald-400', Icon: ArrowDownLeft },
          { label: 'Daily Outflow', value: hideBalance ? '••••••' : `£${(s.dailyOutflow / 1000).toFixed(0)}k`, sub: 'withdrawals today', color: 'text-red-600 dark:text-red-400', Icon: ArrowUpRight },
        ].map(({ label, value, sub, color, Icon }) => (
          <div key={label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-start justify-between mb-1">
              <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500">{label}</p>
              <Icon size={15} className={color} />
            </div>
            <p className={`text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white ${color}`}>{value}</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* alert banner */}
      {(s.criticalAccounts > 0 || s.lowAccounts > 0) && (
        <div className="flex items-center gap-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl px-4 py-3 mb-6">
          <AlertTriangle size={16} className="text-red-600 dark:text-red-400 shrink-0" />
          <div>
            <p className="text-[13px] font-semibold text-red-700 dark:text-red-400">
              {s.criticalAccounts} critical · {s.lowAccounts} low balance account{s.lowAccounts !== 1 ? 's' : ''}
            </p>
            <p className="text-[12px] text-red-500 dark:text-red-400">Immediate top-up required for PKR Float Account</p>
          </div>
        </div>
      )}

      {/* account cards */}
      <div className="mb-6">
        <h2 className="text-[13px] font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">Account Balances</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {companyWalletAccounts.map(acc => (
            <AccountCard key={acc.id} acc={acc} hideBalance={hideBalance} />
          ))}
        </div>
      </div>

      {/* corridor table */}
      <div>
        <h2 className="text-[13px] font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">Corridor Float Status</h2>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr_1fr] px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500">
            <span>Corridor</span><span>Currency</span><span>Float Balance</span>
            <span>Daily Volume</span><span>Utilization</span><span>Status</span>
          </div>

          {corridorBalances.map(cor => {
            const sc = statusConfig[cor.status];
            return (
              <div key={cor.id} className="border-b border-gray-100 dark:border-gray-700/60 last:border-0">
                {/* desktop */}
                <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr_1fr] px-4 py-3.5 items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{cor.fromFlag}</span>
                    <span className="text-[12px] text-gray-400">→</span>
                    <span className="text-base">{cor.toFlag}</span>
                    <span className="text-[13px] font-medium text-gray-800 dark:text-gray-200">{cor.from} → {cor.to}</span>
                  </div>
                  <span className="text-[12px] font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{cor.currency}</span>
                  <p className={`text-[13px] font-semibold ${hideBalance ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                    {hideBalance ? '••••••' : fmt(cor.balance, cor.currency)}
                  </p>
                  <p className="text-[12px] text-gray-500 dark:text-gray-400">{hideBalance ? '••••••' : fmt(cor.dailyVolume, cor.currency)}</p>
                  <div className="pr-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-[10px] text-gray-400">{cor.utilizationPct}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${sc.bar}`} style={{ width: `${cor.utilizationPct}%` }} />
                    </div>
                  </div>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded w-fit ${sc.classes}`}>{sc.label}</span>
                </div>

                {/* mobile */}
                <div className="sm:hidden px-4 py-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span>{cor.fromFlag}</span><span className="text-gray-400 text-[11px]">→</span><span>{cor.toFlag}</span>
                      <span className="text-[13px] font-medium text-gray-800 dark:text-gray-200">{cor.from} → {cor.to}</span>
                    </div>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${sc.classes}`}>{sc.label}</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[12px] font-semibold text-gray-900 dark:text-white">{hideBalance ? '••••••' : fmt(cor.balance, cor.currency)} {cor.currency}</p>
                    <p className="text-[11px] text-gray-400">{cor.utilizationPct}% used</p>
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${sc.bar}`} style={{ width: `${cor.utilizationPct}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}