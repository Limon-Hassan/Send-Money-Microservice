'use client';

import { useState, useMemo } from 'react';
import {
    Search, ChevronRight, Download, ArrowUpRight,
    CheckCircle, Clock, XCircle, Ban, X, Building2,
} from 'lucide-react';
import { companyWithdrawals, CompanyWithdrawal, WithdrawalType } from '@/lib/data';

const statusConfig = {
    Completed: { classes: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900', Icon: CheckCircle },
    Pending: { classes: 'bg-amber-100  text-amber-700  border-amber-200  dark:bg-amber-950  dark:text-amber-400  dark:border-amber-900', Icon: Clock },
    Failed: { classes: 'bg-red-100    text-red-700    border-red-200    dark:bg-red-950    dark:text-red-400    dark:border-red-900', Icon: XCircle },
    Cancelled: { classes: 'bg-gray-100   text-gray-500   border-gray-200   dark:bg-gray-800   dark:text-gray-400   dark:border-gray-700', Icon: Ban },
};

const typeConfig: Record<WithdrawalType, string> = {
    'Internal Transfer': 'bg-blue-100   text-blue-700   dark:bg-blue-950   dark:text-blue-400',
    'Settlement Payout': 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
    'Partner Payment': 'bg-teal-100   text-teal-700   dark:bg-teal-950   dark:text-teal-400',
    'Fee Withdrawal': 'bg-amber-100  text-amber-700  dark:bg-amber-950  dark:text-amber-400',
};

const fmt = (n: number, c = 'GBP') => {
    const sym: Record<string, string> = { GBP: '£', USD: '$', EUR: '€', BDT: '৳', PKR: '₨', INR: '₹' };
    return `${sym[c] ?? ''}${n.toLocaleString()}`;
};

function DetailPanel({ wdr, onClose }: { wdr: CompanyWithdrawal; onClose: () => void }) {
    const sc = statusConfig[wdr.status];
    const StatusIcon = sc.Icon;
    return (
        <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
            <aside className="fixed right-0 top-0 h-screen w-full max-w-md bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 z-50 overflow-y-auto">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
                    <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">Withdrawal Detail</h2>
                    <button onClick={onClose} className="w-7 h-7 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer">
                        <X size={14} />
                    </button>
                </div>
                <div className="p-5 space-y-5">
                    {/* hero */}
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl p-4 text-center">
                        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center mx-auto mb-2">
                            <ArrowUpRight size={22} className="text-red-600 dark:text-red-400" />
                        </div>
                        <p className="text-[12px] text-red-500 font-medium uppercase tracking-wider mb-1">{wdr.type}</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">−{fmt(wdr.amount, wdr.currency)}</p>
                        <div className="mt-2">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-medium border ${sc.classes}`}>
                                <StatusIcon size={11} /> {wdr.status}
                            </span>
                        </div>
                    </div>

                    <div>
                        <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Withdrawal Information</p>
                        <div className="space-y-0 divide-y divide-gray-100 dark:divide-gray-700">
                            {[
                                ['Withdrawal ID', wdr.id],
                                ['Account', wdr.accountName],
                                ['Type', wdr.type],
                                ['Destination Bank', wdr.destinationBank],
                                ['Destination Acc', wdr.destinationAccount],
                                ...(wdr.corridor ? [['Corridor', wdr.corridor]] : []),
                                ['Initiated By', wdr.initiatedBy],
                                ['Initiated At', wdr.initiatedAt.replace('T', ' ')],
                                ['Processed At', wdr.processedAt ? wdr.processedAt.replace('T', ' ') : '—'],
                            ].map(([k, v]) => (
                                <div key={k} className="flex justify-between items-center py-2.5">
                                    <span className="text-[12px] text-gray-400 dark:text-gray-500">{k}</span>
                                    <span className="text-[12px] font-medium text-gray-800 dark:text-gray-200 text-right max-w-[60%] break-all">{v}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {wdr.note && (
                        <div>
                            <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Note</p>
                            <p className="text-[12px] text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 leading-relaxed">{wdr.note}</p>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}

export default function WithdrawalHistoryPage() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');
    const [selected, setSelected] = useState<CompanyWithdrawal | null>(null);

    const filtered = useMemo(() => companyWithdrawals.filter(w => {
        const matchSearch = w.id.toLowerCase().includes(search.toLowerCase()) ||
            w.destinationBank.toLowerCase().includes(search.toLowerCase()) ||
            w.accountName.toLowerCase().includes(search.toLowerCase()) ||
            (w.corridor ?? '').toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'All' || w.status === statusFilter;
        const matchType = typeFilter === 'All' || w.type === typeFilter;
        return matchSearch && matchStatus && matchType;
    }), [search, statusFilter, typeFilter]);

    const totalOut = filtered.filter(w => w.status === 'Completed').reduce((s, w) => s + w.amount, 0);

    return (
        <div className="px-4 py-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2 text-[13px] text-gray-400 dark:text-gray-500 mb-1">
                        <span>Wallets</span><ChevronRight size={12} />
                        <span className="text-gray-900 dark:text-white font-medium">Withdrawal History</span>
                    </div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Withdrawal History</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Internal withdrawals and settlement payouts</p>
                </div>
                <button className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-[12px] font-medium hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                    <Download size={13} /> Export
                </button>
            </div>

            {/* stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                    { label: 'Total Withdrawals', value: companyWithdrawals.length, sub: 'all records', color: '' },
                    { label: 'Completed', value: companyWithdrawals.filter(w => w.status === 'Completed').length, sub: 'successfully processed', color: 'text-emerald-600 dark:text-emerald-400' },
                    { label: 'Pending', value: companyWithdrawals.filter(w => w.status === 'Pending').length, sub: 'awaiting processing', color: 'text-amber-600 dark:text-amber-400' },
                    { label: 'Total Outflow', value: `£${(totalOut / 1000).toFixed(0)}k`, sub: 'GBP equivalent', color: 'text-red-600 dark:text-red-400' },
                ].map(({ label, value, sub, color }) => (
                    <div key={label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                        <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">{label}</p>
                        <p className={`text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white ${color}`}>{value}</p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">{sub}</p>
                    </div>
                ))}
            </div>

            {/* type breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {(['Settlement Payout', 'Internal Transfer', 'Partner Payment', 'Fee Withdrawal'] as WithdrawalType[]).map(type => {
                    const count = companyWithdrawals.filter(w => w.type === type).length;
                    const total = companyWithdrawals.filter(w => w.type === type).reduce((s, w) => s + w.amount, 0);
                    return (
                        <div key={type} className={`rounded-xl p-3 border ${typeConfig[type].replace('text-', 'border-').split(' ')[0]} bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`}>
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${typeConfig[type]}`}>{type}</span>
                            <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">{count}</p>
                            <p className="text-[11px] text-gray-400">£{(total / 1000).toFixed(0)}k total</p>
                        </div>
                    );
                })}
            </div>

            {/* filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mb-4">
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 sm:flex-1 sm:max-w-sm">
                    <Search size={14} className="text-gray-400 shrink-0" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search ID, bank, corridor..."
                        className="bg-transparent outline-none text-[13px] text-gray-800 dark:text-gray-200 placeholder-gray-400 w-full" />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {[
                        { value: statusFilter, set: setStatusFilter, opts: ['All', 'Completed', 'Pending', 'Failed', 'Cancelled'], ph: 'All Status' },
                        { value: typeFilter, set: setTypeFilter, opts: ['All', 'Settlement Payout', 'Internal Transfer', 'Partner Payment', 'Fee Withdrawal'], ph: 'All Types' },
                    ].map(({ value, set, opts, ph }) => (
                        <select key={ph} value={value} onChange={e => set(e.target.value)}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-[13px] text-gray-600 dark:text-gray-400 outline-none cursor-pointer">
                            {opts.map(o => <option key={o} value={o}>{o === 'All' ? ph : o}</option>)}
                        </select>
                    ))}
                </div>
            </div>

            {/* table */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <div className="hidden lg:grid grid-cols-[2fr_1.5fr_1fr_1.2fr_1.2fr_1fr_1fr] px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    <span>Withdrawal ID</span><span>Account</span><span>Amount</span>
                    <span>Type</span><span>Destination</span><span>Status</span><span>Initiated At</span>
                </div>

                {filtered.length === 0 && <div className="py-16 text-center text-gray-400 text-[13px]">No withdrawals found.</div>}

                {filtered.map(wdr => {
                    const sc = statusConfig[wdr.status];
                    const StatusIcon = sc.Icon;
                    return (
                        <div key={wdr.id} onClick={() => setSelected(wdr)}
                            className="border-b border-gray-100 dark:border-gray-700/60 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer transition-colors">

                            {/* desktop */}
                            <div className="hidden lg:grid grid-cols-[2fr_1.5fr_1fr_1.2fr_1.2fr_1fr_1fr] px-4 py-3.5 items-center">
                                <div>
                                    <p className="text-[12px] font-semibold text-blue-600 dark:text-blue-400 font-mono">{wdr.id}</p>
                                    <p className="text-[10px] text-gray-400">{wdr.initiatedBy}</p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Building2 size={13} className="text-gray-400 shrink-0" />
                                    <p className="text-[12px] text-gray-700 dark:text-gray-300 truncate">{wdr.accountName}</p>
                                </div>
                                <p className="text-[14px] font-bold text-red-600 dark:text-red-400">−{fmt(wdr.amount, wdr.currency)}</p>
                                <div>
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${typeConfig[wdr.type]}`}>{wdr.type}</span>
                                    {wdr.corridor && <p className="text-[10px] text-gray-400 mt-0.5">{wdr.corridor}</p>}
                                </div>
                                <div>
                                    <p className="text-[12px] font-medium text-gray-700 dark:text-gray-300 truncate">{wdr.destinationBank}</p>
                                    <p className="text-[10px] text-gray-400 font-mono">{wdr.destinationAccount}</p>
                                </div>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border w-fit ${sc.classes}`}>
                                    <StatusIcon size={10} /> {wdr.status}
                                </span>
                                <div>
                                    <p className="text-[12px] text-gray-600 dark:text-gray-400">{wdr.initiatedAt.split('T')[0]}</p>
                                    <p className="text-[10px] text-gray-400">{wdr.initiatedAt.split('T')[1]?.slice(0, 5)}</p>
                                </div>
                            </div>

                            {/* mobile */}
                            <div className="lg:hidden px-4 py-3.5">
                                <div className="flex items-center justify-between mb-1.5">
                                    <div>
                                        <p className="text-[12px] font-semibold text-blue-600 dark:text-blue-400 font-mono">{wdr.id}</p>
                                        <p className="text-[11px] text-gray-500 dark:text-gray-400">{wdr.accountName}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[14px] font-bold text-red-600 dark:text-red-400">−{fmt(wdr.amount, wdr.currency)}</p>
                                        <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium border ${sc.classes}`}>
                                            <StatusIcon size={9} /> {wdr.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${typeConfig[wdr.type]}`}>{wdr.type}</span>
                                        {wdr.corridor && <span className="text-[11px] text-gray-400">{wdr.corridor}</span>}
                                    </div>
                                    <p className="text-[11px] text-gray-400">{wdr.initiatedAt.split('T')[0]}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-[12px] text-gray-400">Showing {filtered.length} of {companyWithdrawals.length} withdrawals</p>
                    <div className="flex gap-1">
                        {(['‹', '1', '›']).map((item, i) => (
                            <button key={i} className={`w-7 h-7 rounded-md flex items-center justify-center text-[12px] cursor-pointer ${i === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-400'}`}>
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {selected && <DetailPanel wdr={selected} onClose={() => setSelected(null)} />}
        </div>
    );
}