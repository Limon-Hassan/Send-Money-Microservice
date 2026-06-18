'use client';

import { useState, useMemo } from 'react';
import {
  Search, ChevronRight, XCircle, RefreshCw,
  Bell, BellOff, AlertTriangle, X, ShieldX,
  Ban, Wifi, CreditCard, DollarSign, Lock,
  TrendingDown, CheckCircle,
} from 'lucide-react';
import {
  failedTransactions, failedStats,
  FailedTransaction, FailureReason,
} from '@/lib/data';

// ── helpers ───────────────────────────────────────────────────
const reasonConfig: Record<FailureReason, { classes: string; Icon: React.ElementType }> = {
  'Insufficient Funds': { classes: 'bg-amber-100  text-amber-700  dark:bg-amber-950  dark:text-amber-400', Icon: DollarSign },
  'KYC Rejected': { classes: 'bg-red-100    text-red-700    dark:bg-red-950    dark:text-red-400', Icon: ShieldX },
  'Bank Declined': { classes: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400', Icon: CreditCard },
  'Fraud Detected': { classes: 'bg-red-100    text-red-700    dark:bg-red-950    dark:text-red-400', Icon: AlertTriangle },
  'Invalid Account': { classes: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400', Icon: Ban },
  'Limit Exceeded': { classes: 'bg-blue-100   text-blue-700   dark:bg-blue-950   dark:text-blue-400', Icon: TrendingDown },
  'Network Error': { classes: 'bg-gray-100   text-gray-600   dark:bg-gray-800   dark:text-gray-400', Icon: Wifi },
  'Compliance Block': { classes: 'bg-red-100    text-red-700    dark:bg-red-950    dark:text-red-400', Icon: Lock },
};

const avatarConfig: Record<string, string> = {
  blue: 'bg-blue-100   text-blue-700   dark:bg-blue-950   dark:text-blue-400',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
  amber: 'bg-amber-100  text-amber-700  dark:bg-amber-950  dark:text-amber-400',
  red: 'bg-red-100    text-red-700    dark:bg-red-950    dark:text-red-400',
  teal: 'bg-teal-100   text-teal-700   dark:bg-teal-950   dark:text-teal-400',
  pink: 'bg-pink-100   text-pink-700   dark:bg-pink-950   dark:text-pink-400',
  rose: 'bg-rose-100   text-rose-700   dark:bg-rose-950   dark:text-rose-400',
};

const fmt = (n: number) =>
  `£${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// ── Detail Panel ──────────────────────────────────────────────
function FailedDetailPanel({ tx, onClose }: { tx: FailedTransaction; onClose: () => void }) {
  const rc = reasonConfig[tx.failureReason];
  const ReasonIcon = rc.Icon;
  const [retrying, setRetrying] = useState(false);
  const [notifying, setNotifying] = useState(false);
  const [retried, setRetried] = useState(false);
  const [notified, setNotified] = useState(tx.notified);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => { setRetrying(false); setRetried(true); }, 1500);
  };
  const handleNotify = () => {
    setNotifying(true);
    setTimeout(() => { setNotifying(false); setNotified(true); }, 1000);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <aside className="fixed right-0 top-0 h-screen w-full max-w-md bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 z-50 overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">Failed Transaction</h2>
          <button onClick={onClose} className="w-7 h-7 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer">
            <X size={14} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* failure hero */}
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center mx-auto mb-2">
              <XCircle size={22} className="text-red-600 dark:text-red-400" />
            </div>
            <p className="text-[12px] text-red-500 dark:text-red-400 mb-1 font-medium uppercase tracking-wider">Transaction Failed</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{fmt(tx.amount)}</p>
            <p className="text-[11px] text-gray-400 mt-1">{tx.failedAt.replace('T', ' ')}</p>
          </div>

          {/* customer */}
          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Customer</p>
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0 ${avatarConfig[tx.customerAvatarColor]}`}>
                {tx.customerInitials}
              </div>
              <div>
                <p className="text-[13px] font-semibold text-gray-900 dark:text-white">{tx.customerName}</p>
                <p className="text-[11px] text-gray-400">{tx.customerEmail}</p>
                <p className="text-[11px] text-gray-400">#{tx.customerId}</p>
              </div>
            </div>
          </div>

          {/* transaction details */}
          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Transaction Details</p>
            <div className="space-y-0">
              {[
                ['Transaction ID', tx.id],
                ['Recipient', `${tx.recipientFlag} ${tx.recipient}`],
                ['Country', tx.recipientCountry],
                ['Method', tx.method],
                ['Channel', tx.channel],
                ['Amount', fmt(tx.amount)],
                ['Fee', tx.fee > 0 ? fmt(tx.fee) : 'Free'],
                ['Retry Count', `${tx.retryCount} time${tx.retryCount !== 1 ? 's' : ''}`],
              ].map(([k, v], i) => (
                <div key={k} className={`flex justify-between items-center py-2 ${i < 7 ? 'border-b border-gray-100 dark:border-gray-700/50' : ''}`}>
                  <span className="text-[12px] text-gray-400 dark:text-gray-500 shrink-0 w-28">{k}</span>
                  <span className="text-[12px] font-medium text-gray-800 dark:text-gray-200 text-right break-all ml-2">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* failure reason */}
          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Failure Reason</p>
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${rc.classes}`}>
                  <ReasonIcon size={13} />
                </div>
                <span className={`text-[12px] font-semibold ${rc.classes.split(' ').filter(c => c.startsWith('text-') || c.startsWith('dark:text-')).join(' ')}`}>
                  {tx.failureReason}
                </span>
              </div>
              <p className="text-[12px] text-gray-600 dark:text-gray-300 leading-relaxed">{tx.failureDetail}</p>
            </div>
          </div>

          {/* notification status */}
          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Customer Notification</p>
            <div className={`flex items-center justify-between p-3 rounded-lg border ${notified ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900' : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900'}`}>
              <div className="flex items-center gap-2">
                {notified
                  ? <Bell size={14} className="text-emerald-600 dark:text-emerald-400" />
                  : <BellOff size={14} className="text-amber-600 dark:text-amber-400" />}
                <span className={`text-[12px] font-medium ${notified ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
                  {notified ? 'Customer notified' : 'Not yet notified'}
                </span>
              </div>
              {!notified && (
                <button onClick={handleNotify} disabled={notifying}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-medium cursor-pointer transition-colors disabled:opacity-60">
                  {notifying ? <RefreshCw size={10} className="animate-spin" /> : <Bell size={10} />}
                  {notifying ? 'Sending...' : 'Notify Now'}
                </button>
              )}
            </div>
          </div>

          {/* actions */}
          <div className="space-y-2 pt-1">
            {tx.canRetry && !retried && (
              <button onClick={handleRetry} disabled={retrying}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white text-[13px] font-medium cursor-pointer transition-colors">
                {retrying
                  ? <><RefreshCw size={14} className="animate-spin" /> Retrying...</>
                  : <><RefreshCw size={14} /> Retry Transaction</>}
              </button>
            )}
            {retried && (
              <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400 text-[13px] font-medium">
                <CheckCircle size={14} /> Retry Initiated
              </div>
            )}
            {!tx.canRetry && (
              <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-400 text-[13px]">
                <Ban size={14} /> Cannot Retry — {tx.failureReason}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function FailedTransactionsPage() {
  const [search, setSearch] = useState('');
  const [reasonFilter, setReasonFilter] = useState<FailureReason | 'All'>('All');
  const [retryFilter, setRetryFilter] = useState<'All' | 'Can Retry' | 'No Retry'>('All');
  const [selected, setSelected] = useState<FailedTransaction | null>(null);

  const filtered = useMemo(() => failedTransactions.filter(t => {
    const matchSearch =
      t.customerName.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.recipient.toLowerCase().includes(search.toLowerCase());
    const matchReason = reasonFilter === 'All' || t.failureReason === reasonFilter;
    const matchRetry = retryFilter === 'All' ||
      (retryFilter === 'Can Retry' && t.canRetry) ||
      (retryFilter === 'No Retry' && !t.canRetry);
    return matchSearch && matchReason && matchRetry;
  }), [search, reasonFilter, retryFilter]);

  const reasons: (FailureReason | 'All')[] = [
    'All', 'Insufficient Funds', 'KYC Rejected', 'Bank Declined',
    'Fraud Detected', 'Invalid Account', 'Limit Exceeded', 'Network Error', 'Compliance Block',
  ];

  return (
    <div className="px-4 py-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[13px] text-gray-400 dark:text-gray-500 mb-1">
            <span>Transactions</span><ChevronRight size={12} />
            <span className="text-gray-900 dark:text-white font-medium">Failed</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Failed Transactions</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Review failure reasons, retry eligible transactions and notify customers</p>
        </div>
        {failedStats.notNotified > 0 && (
          <div className="self-start flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-400 text-[12px] font-medium">
            <BellOff size={13} /> {failedStats.notNotified} customers not notified
          </div>
        )}
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[
          { label: 'Total Failed', value: failedStats.totalFailed, sub: 'all time', color: 'text-red-600 dark:text-red-400' },
          { label: 'Failed Today', value: failedStats.failedToday, sub: 'last 24 hours', color: 'text-red-600 dark:text-red-400' },
          { label: 'Failure Rate', value: `${failedStats.rejectRate}%`, sub: 'of all transactions', color: 'text-orange-600 dark:text-orange-400' },
          { label: 'Retry Success', value: failedStats.retrySuccess, sub: 'recovered via retry', color: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Lost Volume', value: `£${(failedStats.totalLostVolume / 1000).toFixed(1)}k`, sub: 'potential revenue', color: 'text-purple-600 dark:text-purple-400' },
          { label: 'Top Reason', value: failedStats.topReason, sub: 'most common failure', color: 'text-amber-600 dark:text-amber-400' },
        ].map(({ label, value, sub, color }) => (
          <div key={label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">{label}</p>
            <p className={`text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-tight ${color}`}>{value}</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mb-4">
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 sm:flex-1 sm:max-w-sm">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search ID, customer, recipient..."
            className="bg-transparent outline-none text-[13px] text-gray-800 dark:text-gray-200 placeholder-gray-400 w-full" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select value={reasonFilter} onChange={e => setReasonFilter(e.target.value as FailureReason | 'All')}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-[13px] text-gray-600 dark:text-gray-400 outline-none cursor-pointer">
            {reasons.map(r => <option key={r} value={r}>{r === 'All' ? 'All Reasons' : r}</option>)}
          </select>
          <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            {(['All', 'Can Retry', 'No Retry'] as const).map(f => (
              <button key={f} onClick={() => setRetryFilter(f)}
                className={`px-3 py-1.5 text-[12px] font-medium cursor-pointer transition-colors ${retryFilter === f ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">

        {/* desktop header */}
        <div className="hidden lg:grid grid-cols-[2fr_1.4fr_1fr_1.5fr_0.8fr_0.8fr_1.2fr] px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500">
          <span>Customer</span><span>Recipient</span><span>Amount</span>
          <span>Failure Reason</span><span>Retries</span><span>Notified</span><span>Actions</span>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400 text-[13px]">No failed transactions match filters.</div>
        )}

        {filtered.map(tx => {
          const rc = reasonConfig[tx.failureReason];
          const ReasonIcon = rc.Icon;

          return (
            <div key={tx.id} onClick={() => setSelected(tx)}
              className="border-b border-gray-100 dark:border-gray-700/60 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer transition-colors">

              {/* desktop row */}
              <div className="hidden lg:grid grid-cols-[2fr_1.4fr_1fr_1.5fr_0.8fr_0.8fr_1.2fr] px-4 py-3.5 items-center">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 ${avatarConfig[tx.customerAvatarColor]}`}>
                    {tx.customerInitials}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-gray-900 dark:text-white">{tx.customerName}</p>
                    <p className="text-[10px] text-gray-400 font-mono">{tx.id}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[12px] font-medium text-gray-700 dark:text-gray-300">{tx.recipientFlag} {tx.recipient}</p>
                  <p className="text-[10px] text-gray-400">{tx.recipientCountry}</p>
                </div>

                <div>
                  <p className="text-[13px] font-bold text-red-600 dark:text-red-400">{fmt(tx.amount)}</p>
                  <p className="text-[10px] text-gray-400">{tx.failedAt.split('T')[0]}</p>
                </div>

                <div>
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-medium ${rc.classes}`}>
                    <ReasonIcon size={11} /> {tx.failureReason}
                  </span>
                </div>

                <div className="text-[12px] text-gray-500 dark:text-gray-400">
                  {tx.retryCount > 0 ? `${tx.retryCount}×` : '—'}
                </div>

                <div>
                  {tx.notified
                    ? <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400"><Bell size={11} /> Sent</span>
                    : <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400"><BellOff size={11} /> Pending</span>}
                </div>

                <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                  {tx.canRetry && (
                    <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-400 text-[11px] font-medium hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer transition-colors">
                      <RefreshCw size={11} /> Retry
                    </button>
                  )}
                  {!tx.notified && (
                    <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-400 text-[11px] font-medium hover:bg-amber-100 dark:hover:bg-amber-900 cursor-pointer transition-colors">
                      <Bell size={11} /> Notify
                    </button>
                  )}
                  {!tx.canRetry && tx.notified && (
                    <span className="text-[11px] text-gray-400 px-2">No action</span>
                  )}
                </div>
              </div>

              {/* mobile card */}
              <div className="lg:hidden px-4 py-3.5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 ${avatarConfig[tx.customerAvatarColor]}`}>
                      {tx.customerInitials}
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-gray-900 dark:text-white">{tx.customerName}</p>
                      <p className="text-[10px] text-gray-400 font-mono">{tx.id}</p>
                    </div>
                  </div>
                  <p className="text-[14px] font-bold text-red-600 dark:text-red-400">{fmt(tx.amount)}</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[12px] text-gray-500 dark:text-gray-400">{tx.recipientFlag} {tx.recipient} · {tx.recipientCountry}</p>
                  <p className="text-[11px] text-gray-400">{tx.failedAt.split('T')[0]}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-medium ${rc.classes}`}>
                    <ReasonIcon size={10} /> {tx.failureReason}
                  </span>
                  <div className="flex gap-1.5" onClick={e => e.stopPropagation()}>
                    {tx.canRetry && (
                      <button className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-[11px] font-medium cursor-pointer">
                        ↺ Retry
                      </button>
                    )}
                    {!tx.notified && (
                      <button className="px-2 py-1 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 text-[11px] font-medium cursor-pointer">
                        🔔 Notify
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3 border-t border-gray-100 dark:border-gray-700">
          <p className="text-[12px] text-gray-400">Showing {filtered.length} of {failedStats.totalFailed} failed transactions</p>
          <div className="flex gap-1">
            {(['‹', '1', '2', '3', '...', '10', '›']).map((item, i) => (
              <button key={i} className={`w-7 h-7 rounded-md flex items-center justify-center text-[12px] cursor-pointer transition-colors ${i === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-400 hover:text-gray-700 dark:hover:text-white'}`}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selected && <FailedDetailPanel tx={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}