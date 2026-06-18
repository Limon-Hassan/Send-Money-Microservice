'use client';

import { useState, useMemo } from 'react';
import {
    Search, Download, ChevronRight, ChevronLeft, X,
    ArrowUpRight, ArrowDownLeft, ArrowLeftRight, RefreshCw,
    Plus, Minus, AlertCircle, Clock, CheckCircle, XCircle,
    Ban, PauseCircle, Receipt, Filter,
} from 'lucide-react';
import {
    transactions, transactionStats,
    TransactionHistory, TransactionType, TransactionStatus,
} from '@/lib/data';

// ── config ────────────────────────────────────────────────────
const statusConfig: Record<TransactionStatus, { label: string; classes: string; Icon: React.ElementType }> = {
    Completed: { label: 'Completed', classes: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900', Icon: CheckCircle },
    Pending: { label: 'Pending', classes: 'bg-amber-100  text-amber-700  border-amber-200  dark:bg-amber-950  dark:text-amber-400  dark:border-amber-900', Icon: Clock },
    Failed: { label: 'Failed', classes: 'bg-red-100    text-red-700    border-red-200    dark:bg-red-950    dark:text-red-400    dark:border-red-900', Icon: XCircle },
    Refunded: { label: 'Refunded', classes: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-900', Icon: RefreshCw },
    Cancelled: { label: 'Cancelled', classes: 'bg-gray-100   text-gray-500   border-gray-200   dark:bg-gray-800   dark:text-gray-400   dark:border-gray-700', Icon: Ban },
    'On Hold': { label: 'On Hold', classes: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-900', Icon: PauseCircle },
};

const typeConfig: Record<TransactionType, { Icon: React.ElementType; color: string; bg: string }> = {
    'Send Money': { Icon: ArrowUpRight, color: 'text-red-600    dark:text-red-400', bg: 'bg-red-50    dark:bg-red-950' },
    'Receive': { Icon: ArrowDownLeft, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950' },
    'Top Up': { Icon: Plus, color: 'text-blue-600   dark:text-blue-400', bg: 'bg-blue-50   dark:bg-blue-950' },
    'Withdraw': { Icon: Minus, color: 'text-amber-600  dark:text-amber-400', bg: 'bg-amber-50  dark:bg-amber-950' },
    'Refund': { Icon: RefreshCw, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950' },
    'Exchange': { Icon: ArrowLeftRight, color: 'text-teal-600   dark:text-teal-400', bg: 'bg-teal-50   dark:bg-teal-950' },
    'Fee': { Icon: Receipt, color: 'text-gray-500   dark:text-gray-400', bg: 'bg-gray-100  dark:bg-gray-800' },
};

const avatarConfig: Record<string, string> = {
    blue: 'bg-blue-100   text-blue-700   dark:bg-blue-950   dark:text-blue-400',
    purple: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
    green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
    amber: 'bg-amber-100  text-amber-700  dark:bg-amber-950  dark:text-amber-400',
    red: 'bg-red-100    text-red-700    dark:bg-red-950    dark:text-red-400',
    teal: 'bg-teal-100   text-teal-700   dark:bg-teal-950   dark:text-teal-400',
    pink: 'bg-pink-100   text-pink-700   dark:bg-pink-950   dark:text-pink-400',
    indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400',
    rose: 'bg-rose-100   text-rose-700   dark:bg-rose-950   dark:text-rose-400',
};

const currencySymbol: Record<string, string> = {
    GBP: '£', USD: '$', EUR: '€', BDT: '৳', PKR: '₨', INR: '₹', PHP: '₱', NGN: '₦', NPR: 'Rs',
};
const fmt = (n: number, c: string) =>
    `${currencySymbol[c] ?? ''}${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// ── detail panel ─────────────────────────────────────────────
function TransactionPanel({ tx, onClose }: { tx: TransactionHistory; onClose: () => void }) {
    const sc = statusConfig[tx.status as TransactionStatus];
    const tc = typeConfig[tx.type as TransactionType];
    const StatusIcon = sc.Icon;
    const TypeIcon = tc.Icon;

    return (
        <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
            <aside className="fixed right-0 top-0 h-screen w-full max-w-md bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 z-50 overflow-y-auto">
                {/* header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                    <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">Transaction Detail</h2>
                    <button onClick={onClose} className="w-7 h-7 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer">
                        <X size={14} />
                    </button>
                </div>

                <div className="p-5 space-y-5">
                    {/* type + amount hero */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${tc.bg}`}>
                            <TypeIcon size={22} className={tc.color} />
                        </div>
                        <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400 mb-1">{tx.type}</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{fmt(tx.amount, tx.currency)}</p>
                        {tx.fee > 0 && <p className="text-[12px] text-gray-400 mt-1">+ {fmt(tx.fee, tx.feeCurrency)} fee</p>}
                        <div className="mt-3">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-medium border ${sc.classes}`}>
                                <StatusIcon size={11} /> {sc.label}
                            </span>
                        </div>
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
                                <p className="text-[11px] text-gray-400">#{tx.customerId}</p>
                            </div>
                        </div>
                    </div>

                    {/* transaction details */}
                    <div>
                        <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Transaction Details</p>
                        <div className="space-y-1">
                            {[
                                ['Reference', tx.reference],
                                ['Channel', tx.channel],
                                ['Created', tx.createdAt.replace('T', ' ')],
                                ['Completed', tx.completedAt ? tx.completedAt.replace('T', ' ') : '—'],
                                ...(tx.recipient ? [['Recipient', `${tx.recipientFlag ?? ''} ${tx.recipient}`]] : []),
                                ...(tx.recipientCountry ? [['Destination', tx.recipientCountry]] : []),
                                ...(tx.exchangeRate ? [['Exchange Rate', `1 ${tx.fromCurrency} = ${tx.exchangeRate} ${tx.toCurrency}`]] : []),
                            ].map(([k, v]) => (
                                <div key={k} className="flex items-start justify-between py-2 border-b border-gray-100 dark:border-gray-700/50 last:border-0">
                                    <span className="text-[12px] text-gray-400 dark:text-gray-500 shrink-0 w-28">{k}</span>
                                    <span className="text-[12px] font-medium text-gray-800 dark:text-gray-200 text-right break-all ml-2">{v}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* amounts breakdown */}
                    <div>
                        <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Amount Breakdown</p>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden">
                            {[
                                ['Amount', fmt(tx.amount, tx.currency)],
                                ['Fee', tx.fee > 0 ? fmt(tx.fee, tx.feeCurrency) : 'Free'],
                                ['Total', fmt(tx.amount + tx.fee, tx.currency)],
                            ].map(([k, v], i) => (
                                <div key={k} className={`flex justify-between px-3 py-2.5 ${i === 2 ? 'border-t border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700' : 'border-b border-gray-100 dark:border-gray-700/50'}`}>
                                    <span className={`text-[12px] ${i === 2 ? 'font-semibold text-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'}`}>{k}</span>
                                    <span className={`text-[12px] ${i === 2 ? 'font-bold text-gray-900 dark:text-white' : 'font-medium text-gray-700 dark:text-gray-300'}`}>{v}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* note */}
                    {tx.note && (
                        <div>
                            <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Note</p>
                            <p className="text-[12px] text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 leading-relaxed">{tx.note}</p>
                        </div>
                    )}

                    {/* actions */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                        {tx.status === 'Pending' || tx.status === 'On Hold' ? (
                            <>
                                <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400 text-[13px] font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900 cursor-pointer transition-colors">
                                    <CheckCircle size={13} /> Approve
                                </button>
                                <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-[13px] font-medium hover:bg-red-100 dark:hover:bg-red-900 cursor-pointer transition-colors">
                                    <XCircle size={13} /> Cancel
                                </button>
                            </>
                        ) : tx.status === 'Completed' ? (
                            <>
                                <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-900 text-purple-700 dark:text-purple-400 text-[13px] font-medium hover:bg-purple-100 dark:hover:bg-purple-900 cursor-pointer transition-colors">
                                    <RefreshCw size={13} /> Refund
                                </button>
                                <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-[13px] font-medium hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors">
                                    <Download size={13} /> Receipt
                                </button>
                            </>
                        ) : (
                            <div className="col-span-2 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-gray-400 text-[13px]">
                                <AlertCircle size={13} /> No actions available
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}

// ── main page ─────────────────────────────────────────────────
export default function TransactionHistoryPage() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<TransactionStatus | 'All'>('All');
    const [typeFilter, setTypeFilter] = useState<TransactionType | 'All'>('All');
    const [dateFilter, setDateFilter] = useState<'Today' | 'Week' | 'Month' | 'All'>('All');
    const [selected, setSelected] = useState<TransactionHistory | null>(null);

    const filtered = useMemo(() => transactions.filter((t) => {
        const matchSearch =
            t.customerName.toLowerCase().includes(search.toLowerCase()) ||
            t.id.toLowerCase().includes(search.toLowerCase()) ||
            t.reference.toLowerCase().includes(search.toLowerCase()) ||
            (t.recipient ?? '').toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'All' || t.status === statusFilter;
        const matchType = typeFilter === 'All' || t.type === typeFilter;
        return matchSearch && matchStatus && matchType;
    }), [search, statusFilter, typeFilter]);

    const statCards = [
        { label: 'Total Today', value: transactionStats.totalToday, sub: 'all types', color: '' },
        { label: 'Volume Today', value: `£${(transactionStats.volumeToday / 1000).toFixed(1)}k`, sub: 'GBP equivalent', color: 'text-blue-600 dark:text-blue-400' },
        { label: 'Completed', value: transactionStats.completedToday, sub: `${transactionStats.successRate}% success rate`, color: 'text-emerald-600 dark:text-emerald-400' },
        { label: 'Pending', value: transactionStats.pendingNow, sub: 'awaiting processing', color: 'text-amber-600 dark:text-amber-400' },
        { label: 'Failed', value: transactionStats.failedToday, sub: `${transactionStats.refundedToday} refunded`, color: 'text-red-600 dark:text-red-400' },
    ];

    return (
        <div className="px-4 py-6">
            {/* header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2 text-[13px] text-gray-400 dark:text-gray-500 mb-1">
                        <span>Customers</span><ChevronRight size={12} />
                        <span className="text-gray-900 dark:text-white font-medium">Transaction History</span>
                    </div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Transaction History</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">All customer transactions across every channel</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-[12px] font-medium hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                        <Download size={13} /> Export
                    </button>
                </div>
            </div>

            {/* stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
                {statCards.map(({ label, value, sub, color }) => (
                    <div key={label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                        <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">{label}</p>
                        <p className={`text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white ${color}`}>{value}</p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">{sub}</p>
                    </div>
                ))}
            </div>

            {/* filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mb-4">
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 sm:flex-1 sm:max-w-sm">
                    <Search size={14} className="text-gray-400 shrink-0" />
                    <input value={search} onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search ID, customer, recipient..."
                        className="bg-transparent outline-none text-[13px] text-gray-800 dark:text-gray-200 placeholder-gray-400 w-full" />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {/* date quick filter */}
                    <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        {(['All', 'Today', 'Week', 'Month'] as const).map((d) => (
                            <button key={d} onClick={() => setDateFilter(d)}
                                className={`px-3 py-1.5 text-[12px] font-medium cursor-pointer transition-colors ${dateFilter === d ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                                {d}
                            </button>
                        ))}
                    </div>
                    <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as TransactionType | 'All')}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-[13px] text-gray-600 dark:text-gray-400 outline-none cursor-pointer">
                        {['All', 'Send Money', 'Receive', 'Top Up', 'Withdraw', 'Refund', 'Exchange', 'Fee'].map(o => (
                            <option key={o} value={o}>{o === 'All' ? 'All Types' : o}</option>
                        ))}
                    </select>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as TransactionStatus | 'All')}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-[13px] text-gray-600 dark:text-gray-400 outline-none cursor-pointer">
                        {['All', 'Completed', 'Pending', 'Failed', 'Refunded', 'Cancelled', 'On Hold'].map(o => (
                            <option key={o} value={o}>{o === 'All' ? 'All Status' : o}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* table */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                {/* desktop header */}
                <div className="hidden lg:grid grid-cols-[2.2fr_1.4fr_1.2fr_1.2fr_1fr_1fr_0.7fr] px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    <span>Transaction</span><span>Customer</span><span>Type</span>
                    <span>Amount</span><span>Status</span><span>Date</span><span>Action</span>
                </div>

                {filtered.length === 0 && (
                    <div className="py-16 text-center text-gray-400 text-[13px]">No transactions match the filters.</div>
                )}

                {filtered.map((tx) => {
                    const sc = statusConfig[tx.status];
                    const tc = typeConfig[tx.type];
                    const StatusIcon = sc.Icon;
                    const TypeIcon = tc.Icon;
                    const isDebit = tx.type === 'Send Money' || tx.type === 'Withdraw' || tx.type === 'Fee';

                    return (
                        <div key={tx.id} onClick={() => setSelected(tx)}
                            className="border-b border-gray-100 dark:border-gray-700/60 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer transition-colors">

                            {/* desktop row */}
                            <div className="hidden lg:grid grid-cols-[2.2fr_1.4fr_1.2fr_1.2fr_1fr_1fr_0.7fr] px-4 py-3.5 items-center">
                                {/* transaction id + recipient */}
                                <div>
                                    <p className="text-[12px] font-semibold text-gray-900 dark:text-white font-mono">{tx.id}</p>
                                    <p className="text-[11px] text-gray-400 mt-0.5">
                                        {tx.recipient ? `${tx.recipientFlag ?? ''} ${tx.recipient}` : tx.note ? tx.note.slice(0, 30) + '…' : '—'}
                                    </p>
                                </div>
                                {/* customer */}
                                <div className="flex items-center gap-2">
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 ${avatarConfig[tx.customerAvatarColor]}`}>
                                        {tx.customerInitials}
                                    </div>
                                    <div>
                                        <p className="text-[12px] font-medium text-gray-800 dark:text-gray-200">{tx.customerName}</p>
                                        <p className="text-[10px] text-gray-400">{tx.channel}</p>
                                    </div>
                                </div>
                                {/* type */}
                                <div className="flex items-center gap-1.5">
                                    <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${tc.bg}`}>
                                        <TypeIcon size={13} className={tc.color} />
                                    </div>
                                    <span className="text-[12px] font-medium text-gray-700 dark:text-gray-300">{tx.type}</span>
                                </div>
                                {/* amount */}
                                <div>
                                    <p className={`text-[13px] font-bold ${isDebit ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                        {isDebit ? '−' : '+'}{fmt(tx.amount, tx.currency)}
                                    </p>
                                    {tx.fee > 0 && <p className="text-[10px] text-gray-400">fee {fmt(tx.fee, tx.feeCurrency)}</p>}
                                </div>
                                {/* status */}
                                <div>
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${sc.classes}`}>
                                        <StatusIcon size={10} /> {sc.label}
                                    </span>
                                </div>
                                {/* date */}
                                <div>
                                    <p className="text-[12px] text-gray-600 dark:text-gray-400">{tx.createdAt.split('T')[0]}</p>
                                    <p className="text-[10px] text-gray-400">{tx.createdAt.split('T')[1]?.slice(0, 5)}</p>
                                </div>
                                {/* action */}
                                <div onClick={(e) => e.stopPropagation()}>
                                    <button onClick={() => setSelected(tx)}
                                        className="px-2.5 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 text-[11px] font-medium hover:text-gray-800 dark:hover:text-white cursor-pointer transition-colors">
                                        View
                                    </button>
                                </div>
                            </div>

                            {/* mobile card */}
                            <div className="lg:hidden px-4 py-3.5">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2.5">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${tc.bg}`}>
                                            <TypeIcon size={15} className={tc.color} />
                                        </div>
                                        <div>
                                            <p className="text-[12px] font-semibold text-gray-900 dark:text-white">{tx.type}</p>
                                            <p className="text-[10px] text-gray-400 font-mono">{tx.id}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-[13px] font-bold ${isDebit ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                            {isDebit ? '−' : '+'}{fmt(tx.amount, tx.currency)}
                                        </p>
                                        <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium border ${sc.classes}`}>
                                            <StatusIcon size={9} /> {sc.label}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-semibold ${avatarConfig[tx.customerAvatarColor]}`}>
                                            {tx.customerInitials}
                                        </div>
                                        <span className="text-[11px] text-gray-500 dark:text-gray-400">{tx.customerName}</span>
                                    </div>
                                    <span className="text-[11px] text-gray-400">{tx.createdAt.split('T')[0]}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-[12px] text-gray-400">Showing {filtered.length} of {transactionStats.totalToday.toLocaleString()} transactions</p>
                    <div className="flex gap-1">
                        {([<ChevronLeft size={12} />, '1', '2', '3', '...', '29', <ChevronRight size={12} />] as const).map((item, i) => (
                            <button key={i} className={`w-7 h-7 rounded-md flex items-center justify-center text-[12px] cursor-pointer transition-colors ${i === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-400 hover:text-gray-700 dark:hover:text-white'}`}>
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {selected && <TransactionPanel tx={selected} onClose={() => setSelected(null)} />}
        </div>
    );
}