'use client';

import { useState, useMemo } from 'react';
import {
    Search, ChevronRight, Download, ArrowDownLeft,
    CheckCircle, Clock, XCircle, X, Building2, ChevronLeft,
} from 'lucide-react';
import { companyDeposits, CompanyDeposit } from '@/lib/data';

const statusConfig = {
    Confirmed: { classes: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900', Icon: CheckCircle },
    Pending: { classes: 'bg-amber-100  text-amber-700  border-amber-200  dark:bg-amber-950  dark:text-amber-400  dark:border-amber-900', Icon: Clock },
    Failed: { classes: 'bg-red-100    text-red-700    border-red-200    dark:bg-red-950    dark:text-red-400    dark:border-red-900', Icon: XCircle },
};

const fmt = (n: number, c = 'GBP') => {
    const sym: Record<string, string> = { GBP: '£', USD: '$', EUR: '€', BDT: '৳', PKR: '₨', INR: '₹' };
    return `${sym[c] ?? ''}${n.toLocaleString()}`;
};

function DetailPanel({ dep, onClose }: { dep: CompanyDeposit; onClose: () => void }) {
    const sc = statusConfig[dep.status];
    const StatusIcon = sc.Icon;
    return (
        <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
            <aside className="fixed right-0 top-0 h-screen w-full max-w-md bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 z-50 overflow-y-auto">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
                    <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">Deposit Detail</h2>
                    <button onClick={onClose} className="w-7 h-7 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer">
                        <X size={14} />
                    </button>
                </div>
                <div className="p-5 space-y-5">
                    {/* hero */}
                    <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-xl p-4 text-center">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mx-auto mb-2">
                            <ArrowDownLeft size={22} className="text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <p className="text-[12px] text-emerald-500 dark:text-emerald-400 font-medium uppercase tracking-wider mb-1">Deposit</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{fmt(dep.amount, dep.currency)}</p>
                        <div className="mt-2">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-medium border ${sc.classes}`}>
                                <StatusIcon size={11} /> {dep.status}
                            </span>
                        </div>
                    </div>

                    {/* details */}
                    <div>
                        <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Deposit Information</p>
                        <div className="space-y-0 divide-y divide-gray-100 dark:divide-gray-700">
                            {[
                                ['Deposit ID', dep.id],
                                ['Account', dep.accountName],
                                ['Source', dep.source],
                                ['Sender Bank', dep.senderBank],
                                ['Sender Ref', dep.senderRef],
                                ['Received At', dep.receivedAt.replace('T', ' ')],
                                ['Confirmed At', dep.confirmedAt ? dep.confirmedAt.replace('T', ' ') : '—'],
                            ].map(([k, v]) => (
                                <div key={k} className="flex justify-between items-center py-2.5">
                                    <span className="text-[12px] text-gray-400 dark:text-gray-500">{k}</span>
                                    <span className="text-[12px] font-medium text-gray-800 dark:text-gray-200 text-right max-w-[60%] break-all">{v}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {dep.note && (
                        <div>
                            <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Note</p>
                            <p className="text-[12px] text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 leading-relaxed">{dep.note}</p>
                        </div>
                    )}

                    <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-[13px] font-medium cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        <Download size={13} /> Download Receipt
                    </button>
                </div>
            </aside>
        </>
    );
}

export default function DepositHistoryPage() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sourceFilter, setSourceFilter] = useState('All');
    const [selected, setSelected] = useState<CompanyDeposit | null>(null);

    const filtered = useMemo(() => companyDeposits.filter(d => {
        const matchSearch = d.id.toLowerCase().includes(search.toLowerCase()) ||
            d.senderBank.toLowerCase().includes(search.toLowerCase()) ||
            d.accountName.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'All' || d.status === statusFilter;
        const matchSource = sourceFilter === 'All' || d.source === sourceFilter;
        return matchSearch && matchStatus && matchSource;
    }), [search, statusFilter, sourceFilter]);

    const totalDeposited = filtered.filter(d => d.status === 'Confirmed').reduce((sum, d) => sum + d.amount, 0);

    return (
        <div className="px-4 py-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2 text-[13px] text-gray-400 dark:text-gray-500 mb-1">
                        <span>Wallets</span><ChevronRight size={12} />
                        <span className="text-gray-900 dark:text-white font-medium">Deposit History</span>
                    </div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Deposit History</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Bank deposits into company accounts</p>
                </div>
                <button className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-[12px] font-medium hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                    <Download size={13} /> Export
                </button>
            </div>

            {/* stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                    { label: 'Total Deposits', value: companyDeposits.length, sub: 'all records', color: '' },
                    { label: 'Confirmed', value: companyDeposits.filter(d => d.status === 'Confirmed').length, sub: 'successfully received', color: 'text-emerald-600 dark:text-emerald-400' },
                    { label: 'Pending', value: companyDeposits.filter(d => d.status === 'Pending').length, sub: 'awaiting confirmation', color: 'text-amber-600 dark:text-amber-400' },
                    { label: 'Total Confirmed', value: `£${(totalDeposited / 1000).toFixed(0)}k`, sub: 'GBP equivalent', color: 'text-blue-600 dark:text-blue-400' },
                ].map(({ label, value, sub, color }) => (
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
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search ID, bank, account..."
                        className="bg-transparent outline-none text-[13px] text-gray-800 dark:text-gray-200 placeholder-gray-400 w-full" />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {[
                        { value: statusFilter, set: setStatusFilter, opts: ['All', 'Confirmed', 'Pending', 'Failed'], ph: 'All Status' },
                        { value: sourceFilter, set: setSourceFilter, opts: ['All', 'Bank Transfer', 'SWIFT', 'SEPA', 'Faster Payments', 'CHAPS'], ph: 'All Sources' },
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
                <div className="hidden lg:grid grid-cols-[2fr_1.5fr_1fr_1.2fr_1fr_1fr] px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    <span>Deposit ID</span><span>Account</span><span>Amount</span>
                    <span>Source / Bank</span><span>Status</span><span>Received At</span>
                </div>

                {filtered.length === 0 && <div className="py-16 text-center text-gray-400 text-[13px]">No deposits found.</div>}

                {filtered.map(dep => {
                    const sc = statusConfig[dep.status];
                    const StatusIcon = sc.Icon;
                    return (
                        <div key={dep.id} onClick={() => setSelected(dep)}
                            className="border-b border-gray-100 dark:border-gray-700/60 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer transition-colors">

                            {/* desktop */}
                            <div className="hidden lg:grid grid-cols-[2fr_1.5fr_1fr_1.2fr_1fr_1fr] px-4 py-3.5 items-center">
                                <div>
                                    <p className="text-[12px] font-semibold text-blue-600 dark:text-blue-400 font-mono">{dep.id}</p>
                                    <p className="text-[10px] text-gray-400">{dep.senderRef}</p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Building2 size={13} className="text-gray-400 shrink-0" />
                                    <p className="text-[12px] text-gray-700 dark:text-gray-300 truncate">{dep.accountName}</p>
                                </div>
                                <p className="text-[14px] font-bold text-emerald-600 dark:text-emerald-400">+{fmt(dep.amount, dep.currency)}</p>
                                <div>
                                    <p className="text-[12px] font-medium text-gray-700 dark:text-gray-300">{dep.source}</p>
                                    <p className="text-[10px] text-gray-400">{dep.senderBank}</p>
                                </div>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border w-fit ${sc.classes}`}>
                                    <StatusIcon size={10} /> {dep.status}
                                </span>
                                <div>
                                    <p className="text-[12px] text-gray-600 dark:text-gray-400">{dep.receivedAt.split('T')[0]}</p>
                                    <p className="text-[10px] text-gray-400">{dep.receivedAt.split('T')[1]?.slice(0, 5)}</p>
                                </div>
                            </div>

                            {/* mobile */}
                            <div className="lg:hidden px-4 py-3.5">
                                <div className="flex items-center justify-between mb-1.5">
                                    <div>
                                        <p className="text-[12px] font-semibold text-blue-600 dark:text-blue-400 font-mono">{dep.id}</p>
                                        <p className="text-[11px] text-gray-500 dark:text-gray-400">{dep.accountName}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[14px] font-bold text-emerald-600 dark:text-emerald-400">+{fmt(dep.amount, dep.currency)}</p>
                                        <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium border ${sc.classes}`}>
                                            <StatusIcon size={9} /> {dep.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-[11px] text-gray-400">{dep.source} · {dep.senderBank}</p>
                                    <p className="text-[11px] text-gray-400">{dep.receivedAt.split('T')[0]}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-[12px] text-gray-400">Showing {filtered.length} of {companyDeposits.length} deposits</p>
                    <div className="flex gap-1">
                        {(['‹', '1', '2', '›']).map((item, i) => (
                            <button key={i} className={`w-7 h-7 rounded-md flex items-center justify-center text-[12px] cursor-pointer ${i === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-400'}`}>
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {selected && <DetailPanel dep={selected} onClose={() => setSelected(null)} />}
        </div>
    );
}