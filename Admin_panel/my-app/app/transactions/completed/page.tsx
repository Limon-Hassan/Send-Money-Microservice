'use client';

import { useState, useMemo } from 'react';
import {
  Search, Download, ChevronRight, CheckCircle,
  Receipt, X, Clock, ArrowDownLeft, ChevronLeft,
} from 'lucide-react';
import {
  completedTransactions, completedStats, CompletedTransaction,
} from '@/lib/data';

// ── helpers ───────────────────────────────────────────────────
const avatarConfig: Record<string, string> = {
  blue: 'bg-blue-100   text-blue-700   dark:bg-blue-950   dark:text-blue-400',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
  amber: 'bg-amber-100  text-amber-700  dark:bg-amber-950  dark:text-amber-400',
  teal: 'bg-teal-100   text-teal-700   dark:bg-teal-950   dark:text-teal-400',
  pink: 'bg-pink-100   text-pink-700   dark:bg-pink-950   dark:text-pink-400',
  rose: 'bg-rose-100   text-rose-700   dark:bg-rose-950   dark:text-rose-400',
};

const fmt = (n: number) =>
  `£${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// ── Receipt Modal ─────────────────────────────────────────────
function ReceiptModal({ tx, onClose }: { tx: CompletedTransaction; onClose: () => void }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl w-full max-w-sm shadow-xl overflow-hidden">

          {/* receipt header */}
          <div className="bg-emerald-600 px-6 py-5 text-white text-center relative">
            <button onClick={onClose} className="absolute right-4 top-4 w-7 h-7 rounded-md bg-white/20 flex items-center justify-center hover:bg-white/30 cursor-pointer">
              <X size={13} />
            </button>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2">
              <CheckCircle size={24} className="text-white" />
            </div>
            <p className="text-[13px] font-medium opacity-80 mb-1">Transaction Completed</p>
            <p className="text-3xl font-bold">{fmt(tx.amount)}</p>
            {tx.fee > 0 && <p className="text-[12px] opacity-70 mt-1">+ {fmt(tx.fee)} fee</p>}
          </div>

          {/* receipt body */}
          <div className="p-5">
            <div className="space-y-0">
              {[
                ['Receipt ID', tx.receiptId],
                ['Transaction', tx.id],
                ['Customer', tx.customerName],
                ['Recipient', `${tx.recipientFlag} ${tx.recipient}`],
                ['Country', tx.recipientCountry],
                ['Method', tx.method],
                ['Channel', tx.channel],
                ['Processing', `${tx.processingMins} min`],
                ['Completed At', tx.completedAt.replace('T', ' ')],
              ].map(([k, v], i) => (
                <div key={k} className={`flex justify-between items-center py-2.5 ${i < 8 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}>
                  <span className="text-[12px] text-gray-400 dark:text-gray-500">{k}</span>
                  <span className="text-[12px] font-medium text-gray-800 dark:text-gray-200 text-right max-w-[55%] break-all">{v}</span>
                </div>
              ))}
            </div>

            {/* total */}
            <div className="mt-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl p-3 flex justify-between items-center">
              <span className="text-[13px] font-semibold text-emerald-700 dark:text-emerald-400">Total Charged</span>
              <span className="text-[15px] font-bold text-emerald-700 dark:text-emerald-400">{fmt(tx.amount + tx.fee)}</span>
            </div>

            {/* actions */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-[13px] font-medium hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors">
                <Download size={13} /> Download
              </button>
              <button onClick={onClose} className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-emerald-600 text-white text-[13px] font-medium hover:bg-emerald-500 cursor-pointer transition-colors">
                <CheckCircle size={13} /> Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function CompletedTransactionsPage() {
  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState<'Today' | 'Week' | 'Month' | 'All'>('All');
  const [receiptTx, setReceiptTx] = useState<CompletedTransaction | null>(null);

  const filtered = useMemo(() => completedTransactions.filter(t => {
    const matchSearch =
      t.customerName.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.recipient.toLowerCase().includes(search.toLowerCase()) ||
      t.recipientCountry.toLowerCase().includes(search.toLowerCase());
    const matchMethod = methodFilter === 'All' || t.method === methodFilter;
    return matchSearch && matchMethod;
  }), [search, methodFilter]);

  const methods = ['All', ...Array.from(new Set(completedTransactions.map(t => t.method)))];

  return (
    <div className="px-4 py-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[13px] text-gray-400 dark:text-gray-500 mb-1">
            <span>Transactions</span><ChevronRight size={12} />
            <span className="text-gray-900 dark:text-white font-medium">Completed</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Completed Transactions</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Successfully processed transactions with receipt download</p>
        </div>
        <button className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-[12px] font-medium hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
          <Download size={13} /> Export CSV
        </button>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[
          { label: 'Completed Today', value: completedStats.totalCompleted, sub: 'transactions', color: '' },
          { label: 'Total Volume', value: `£${(completedStats.totalVolume / 1000).toFixed(1)}k`, sub: 'GBP equivalent', color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Success Rate', value: `${completedStats.successRate}%`, sub: 'of all transactions', color: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Avg Processing', value: `${completedStats.avgProcessingMins}m`, sub: 'per transaction', color: 'text-purple-600 dark:text-purple-400' },
          { label: 'Total Fees', value: `£${completedStats.totalFees.toLocaleString()}`, sub: 'collected today', color: 'text-amber-600 dark:text-amber-400' },
          { label: 'Top Corridor', value: completedStats.topCorridor, sub: 'by volume', color: 'text-teal-600 dark:text-teal-400' },
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
            placeholder="Search ID, customer, recipient, country..."
            className="bg-transparent outline-none text-[13px] text-gray-800 dark:text-gray-200 placeholder-gray-400 w-full" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {/* date filter */}
          <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            {(['All', 'Today', 'Week', 'Month'] as const).map(d => (
              <button key={d} onClick={() => setDateFilter(d)}
                className={`px-3 py-1.5 text-[12px] font-medium cursor-pointer transition-colors ${dateFilter === d ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                {d}
              </button>
            ))}
          </div>
          <select value={methodFilter} onChange={e => setMethodFilter(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-[13px] text-gray-600 dark:text-gray-400 outline-none cursor-pointer">
            {methods.map(m => <option key={m} value={m}>{m === 'All' ? 'All Methods' : m}</option>)}
          </select>
        </div>
      </div>

      {/* table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">

        {/* desktop header */}
        <div className="hidden lg:grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_0.8fr_0.8fr] px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500">
          <span>Customer</span><span>Recipient</span><span>Amount</span>
          <span>Method</span><span>Completed At</span><span>Processing</span><span>Receipt</span>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400 text-[13px]">No completed transactions match filters.</div>
        )}

        {filtered.map(tx => (
          <div key={tx.id}
            className="border-b border-gray-100 dark:border-gray-700/60 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">

            {/* desktop row */}
            <div className="hidden lg:grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_0.8fr_0.8fr] px-4 py-3.5 items-center">
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
                <p className="text-[13px] font-bold text-emerald-600 dark:text-emerald-400">{fmt(tx.amount)}</p>
                {tx.fee > 0 && <p className="text-[10px] text-gray-400">fee {fmt(tx.fee)}</p>}
              </div>

              <div>
                <span className="text-[11px] font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                  {tx.method}
                </span>
              </div>

              <div>
                <p className="text-[12px] text-gray-600 dark:text-gray-400">{tx.completedAt.split('T')[0]}</p>
                <p className="text-[10px] text-gray-400">{tx.completedAt.split('T')[1]?.slice(0, 5)}</p>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-gray-400">
                <Clock size={10} /> {tx.processingMins}m
              </div>

              <div>
                <button onClick={() => setReceiptTx(tx)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400 text-[11px] font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900 cursor-pointer transition-colors">
                  <Receipt size={11} /> Receipt
                </button>
              </div>
            </div>

            {/* mobile card */}
            <div className="lg:hidden px-4 py-3.5">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 ${avatarConfig[tx.customerAvatarColor]}`}>
                    {tx.customerInitials}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-gray-900 dark:text-white">{tx.customerName}</p>
                    <p className="text-[10px] text-gray-400 font-mono">{tx.id}</p>
                  </div>
                </div>
                <p className="text-[14px] font-bold text-emerald-600 dark:text-emerald-400">{fmt(tx.amount)}</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[12px] text-gray-500 dark:text-gray-400">{tx.recipientFlag} {tx.recipient} · {tx.recipientCountry}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{tx.method}</span>
                    <span className="text-[11px] text-gray-400">{tx.completedAt.split('T')[0]}</span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-0.5"><Clock size={9} />{tx.processingMins}m</span>
                  </div>
                </div>
                <button onClick={() => setReceiptTx(tx)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400 text-[11px] font-medium cursor-pointer">
                  <Receipt size={11} /> Receipt
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3 border-t border-gray-100 dark:border-gray-700">
          <p className="text-[12px] text-gray-400">Showing {filtered.length} of {completedStats.totalCompleted.toLocaleString()} completed transactions</p>
          <div className="flex gap-1">
            {(['‹', '1', '2', '3', '...', '25', '›']).map((item, i) => (
              <button key={i} className={`w-7 h-7 rounded-md flex items-center justify-center text-[12px] cursor-pointer transition-colors ${i === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-400 hover:text-gray-700 dark:hover:text-white'}`}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {receiptTx && <ReceiptModal tx={receiptTx} onClose={() => setReceiptTx(null)} />}
    </div>
  );
}