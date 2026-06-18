'use client';

import { useState, useMemo } from 'react';
import {
    Search, Download, ArrowUpRight, ArrowDownLeft, ArrowLeftRight,
    Snowflake, AlertTriangle, CheckCircle, ChevronRight, X,
    Eye, EyeOff,
} from 'lucide-react';
import {
    customerWallets, walletStats,
    CustomerWallet, WalletCurrency, WalletStatus,
} from '@/lib/data';

const statusConfig: Record<WalletStatus, { classes: string; Icon: React.ElementType; label: string }> = {
    Active: { classes: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900', Icon: CheckCircle, label: 'Active' },
    Frozen: { classes: 'bg-blue-100    text-blue-700    border-blue-200    dark:bg-blue-950    dark:text-blue-400    dark:border-blue-900', Icon: Snowflake, label: 'Frozen' },
    Suspended: { classes: 'bg-red-100     text-red-700     border-red-200     dark:bg-red-950     dark:text-red-400     dark:border-red-900', Icon: AlertTriangle, label: 'Suspended' },
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
function fmt(amount: number, code: string) {
    return `${currencySymbol[code] ?? ''}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
function LimitBar({ used, limit, label }: { used: number; limit: number; label: string }) {
    const pct = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
    const color = pct > 80 ? 'bg-red-500' : pct > 50 ? 'bg-amber-500' : 'bg-emerald-500';
    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-[10px] text-gray-400 dark:text-gray-500">{label}</span>
                <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400">{Math.round(pct)}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}

function WalletModal({ customer, onClose }: { customer: CustomerWallet; onClose: () => void }) {
    const [activeAction, setActiveAction] = useState<'topup' | 'withdraw' | 'transfer' | null>(null);
    const [selectedWallet, setSelectedWallet] = useState<WalletCurrency>(customer.wallets[0]);
    const [amount, setAmount] = useState('');
    const [hideBalance, setHideBalance] = useState(false);
    const sc = statusConfig[customer.status];
    const StatusIcon = sc.Icon;
    const actionConfig = {
        topup: { label: 'Top Up', Icon: ArrowDownLeft, color: 'bg-emerald-600 hover:bg-emerald-500', inputLabel: 'Amount to add' },
        withdraw: { label: 'Withdraw', Icon: ArrowUpRight, color: 'bg-blue-600    hover:bg-blue-500', inputLabel: 'Amount to withdraw' },
        transfer: { label: 'Transfer', Icon: ArrowLeftRight, color: 'bg-purple-600  hover:bg-purple-500', inputLabel: 'Amount to transfer' },
    };
    return (
        <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto shadow-xl">
                    {/* header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10 rounded-t-2xl sm:rounded-t-2xl">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${avatarConfig[customer.avatarColor]}`}>{customer.initials}</div>
                            <div className="min-w-0">
                                <p className="text-[14px] font-semibold text-gray-900 dark:text-white truncate">{customer.name}</p>
                                <p className="text-[11px] text-gray-400 truncate">#{customer.customerId}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <span className={`hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium border ${sc.classes}`}><StatusIcon size={10} />{sc.label}</span>
                            <button onClick={onClose} className="w-7 h-7 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer"><X size={14} /></button>
                        </div>
                    </div>

                    <div className="p-5 space-y-4">
                        {/* total balance card */}
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 sm:p-5 text-white">
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-[12px] font-medium opacity-80 uppercase tracking-wider">Total Balance</p>
                                <button onClick={() => setHideBalance(!hideBalance)} className="opacity-70 hover:opacity-100">{hideBalance ? <EyeOff size={14} /> : <Eye size={14} />}</button>
                            </div>
                            <p className="text-2xl sm:text-3xl font-bold">
                                {hideBalance ? '••••••' : `£${customer.totalBalanceGBP.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                            </p>
                            <p className="text-[11px] opacity-60 mt-1">{customer.wallets.length} wallet{customer.wallets.length > 1 ? 's' : ''} · Last active {customer.lastActivity}</p>
                        </div>

                        {/* quick actions */}
                        {customer.status === 'Active' && (
                            <div className="grid grid-cols-3 gap-2">
                                {(['topup', 'withdraw', 'transfer'] as const).map((action) => {
                                    const cfg = actionConfig[action];
                                    const Icon = cfg.Icon;
                                    return (
                                        <button key={action} onClick={() => setActiveAction(activeAction === action ? null : action)}
                                            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] sm:text-[13px] font-medium text-white transition-colors cursor-pointer ${activeAction === action ? cfg.color + ' ring-2 ring-offset-1 ring-blue-400' : cfg.color}`}>
                                            <Icon size={14} /> <span className="hidden sm:inline">{cfg.label}</span><span className="sm:hidden">{cfg.label.split(' ')[0]}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {/* action form */}
                        {activeAction && customer.status === 'Active' && (
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                                <p className="text-[12px] font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">{actionConfig[activeAction].label} — {selectedWallet.code}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                                    <div>
                                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Select Wallet</label>
                                        <select value={selectedWallet.code} onChange={(e) => setSelectedWallet(customer.wallets.find(w => w.code === e.target.value) ?? customer.wallets[0])}
                                            className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none">
                                            {customer.wallets.map(w => <option key={w.code} value={w.code}>{w.flag} {w.code} — {fmt(w.balance, w.code)}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">{actionConfig[activeAction].inputLabel}</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-gray-400 font-medium">{currencySymbol[selectedWallet.code]}</span>
                                            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00"
                                                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg pl-7 pr-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:ring-1 focus:ring-blue-500" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className={`flex-1 py-2 rounded-lg text-[13px] font-medium text-white cursor-pointer ${actionConfig[activeAction].color}`}>Confirm {actionConfig[activeAction].label}</button>
                                    <button onClick={() => { setActiveAction(null); setAmount(''); }} className="px-4 py-2 rounded-lg text-[13px] font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 cursor-pointer">Cancel</button>
                                </div>
                            </div>
                        )}

                        {/* currency wallets */}
                        <div>
                            <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">Currency Wallets</p>
                            <div className="space-y-3">
                                {customer.wallets.map((w) => (
                                    <div key={w.code} className="bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl p-3 sm:p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2.5">
                                                <span className="text-xl">{w.flag}</span>
                                                <div>
                                                    <p className="text-[13px] font-semibold text-gray-900 dark:text-white">{w.name}</p>
                                                    <p className="text-[11px] text-gray-400">{w.code}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[14px] sm:text-[15px] font-bold text-gray-900 dark:text-white">{hideBalance ? '••••' : fmt(w.balance, w.code)}</p>
                                                {w.onHold > 0 && <p className="text-[11px] text-amber-600 dark:text-amber-400">{fmt(w.onHold, w.code)} on hold</p>}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <LimitBar used={w.dailyUsed} limit={w.dailyLimit} label="Daily limit used" />
                                            <LimitBar used={w.monthlyUsed} limit={w.monthlyLimit} label="Monthly limit used" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function WalletBalancePage() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<WalletStatus | 'All'>('All');
    const [selected, setSelected] = useState<CustomerWallet | null>(null);

    const filtered = useMemo(() => customerWallets.filter((c) => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.customerId.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'All' || c.status === statusFilter;
        return matchSearch && matchStatus;
    }), [search, statusFilter]);

    return (
        <div className="px-4 py-6">
            {/* header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2 text-[13px] text-gray-400 dark:text-gray-500 mb-1">
                        <span>Customers</span><ChevronRight size={12} /><span className="text-gray-900 dark:text-white font-medium">Wallet Balance</span>
                    </div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Wallet Balance</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Multi-currency wallet overview for all customers</p>
                </div>
                <button className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-[12px] font-medium hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                    <Download size={13} /> Export
                </button>
            </div>

            {/* stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                    { label: 'Total Wallets', value: walletStats.totalWallets.toLocaleString(), sub: 'across all customers', color: '' },
                    { label: 'Active Wallets', value: walletStats.activeWallets.toLocaleString(), sub: `${walletStats.frozenWallets} frozen`, color: 'text-emerald-600 dark:text-emerald-400' },
                    { label: 'Total Balance', value: `£${(walletStats.totalBalanceGBP / 1000).toFixed(1)}k`, sub: 'GBP equivalent', color: 'text-blue-600 dark:text-blue-400' },
                    { label: 'Activity Today', value: `£${(walletStats.topUpToday / 1000).toFixed(1)}k`, sub: `£${(walletStats.withdrawToday / 1000).toFixed(1)}k withdrawn`, color: 'text-purple-600 dark:text-purple-400' },
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
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 sm:flex-1 sm:max-w-xs">
                    <Search size={14} className="text-gray-400 shrink-0" />
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search customer name or ID..."
                        className="bg-transparent outline-none text-[13px] text-gray-800 dark:text-gray-200 placeholder-gray-400 w-full" />
                </div>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as WalletStatus | 'All')}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-[13px] text-gray-600 dark:text-gray-400 outline-none cursor-pointer">
                    {['All', 'Active', 'Frozen', 'Suspended'].map(o => <option key={o} value={o}>{o === 'All' ? 'All Status' : o}</option>)}
                </select>
            </div>

            {/* table — desktop / card — mobile */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                {/* desktop header */}
                <div className="hidden lg:grid grid-cols-[2fr_1fr_1.5fr_1.2fr_1fr_0.8fr] px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    <span>Customer</span><span>Status</span><span>Total Balance</span><span>Currencies</span><span>Last Activity</span><span>Action</span>
                </div>

                {filtered.length === 0 && <div className="py-16 text-center text-gray-400 text-[13px]">No wallets match the filters.</div>}

                {filtered.map((c) => {
                    const sc = statusConfig[c.status];
                    const StatusIcon = sc.Icon;
                    return (
                        <div key={c.id} onClick={() => setSelected(c)}
                            className="border-b border-gray-100 dark:border-gray-700/60 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer transition-colors">

                            {/* desktop row */}
                            <div className="hidden lg:grid grid-cols-[2fr_1fr_1.5fr_1.2fr_1fr_0.8fr] px-4 py-3.5 items-center">
                                <div className="flex items-center gap-2.5">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 ${avatarConfig[c.avatarColor]}`}>{c.initials}</div>
                                    <div>
                                        <p className="text-[13px] font-medium text-gray-900 dark:text-white">{c.name}</p>
                                        <p className="text-[11px] text-gray-400">#{c.customerId}</p>
                                    </div>
                                </div>
                                <div><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${sc.classes}`}><StatusIcon size={10} />{sc.label}</span></div>
                                <div>
                                    <p className="text-[14px] font-semibold text-gray-900 dark:text-white">£{c.totalBalanceGBP.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                                    <p className="text-[11px] text-gray-400">GBP equivalent</p>
                                </div>
                                <div className="flex items-center gap-1 flex-wrap">
                                    {c.wallets.map(w => <span key={w.code} title={`${w.name}: ${fmt(w.balance, w.code)}`} className="text-base leading-none">{w.flag}</span>)}
                                    <span className="text-[11px] text-gray-400 ml-1">{c.wallets.length}w</span>
                                </div>
                                <div className="text-[12px] text-gray-500 dark:text-gray-400">{c.lastActivity}</div>
                                <div onClick={(e) => e.stopPropagation()}>
                                    <button onClick={() => setSelected(c)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-400 text-[11px] font-medium hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer transition-colors">
                                        <ArrowUpRight size={11} /> View
                                    </button>
                                </div>
                            </div>

                            {/* mobile card */}
                            <div className="lg:hidden px-4 py-3.5">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2.5">
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0 ${avatarConfig[c.avatarColor]}`}>{c.initials}</div>
                                        <div>
                                            <p className="text-[13px] font-medium text-gray-900 dark:text-white">{c.name}</p>
                                            <p className="text-[11px] text-gray-400">#{c.customerId}</p>
                                        </div>
                                    </div>
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${sc.classes}`}><StatusIcon size={10} />{sc.label}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[14px] font-bold text-gray-900 dark:text-white">£{c.totalBalanceGBP.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                                        <div className="flex gap-1 mt-1">
                                            {c.wallets.map(w => <span key={w.code} className="text-sm">{w.flag}</span>)}
                                            <span className="text-[11px] text-gray-400 ml-1">{c.lastActivity}</span>
                                        </div>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); setSelected(c); }}
                                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-400 text-[11px] font-medium cursor-pointer">
                                        <ArrowUpRight size={11} /> View
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-[12px] text-gray-400">Showing {filtered.length} of {walletStats.totalWallets.toLocaleString()} wallets</p>
                    <div className="flex gap-1">
                        {(['‹', '1', '2', '3', '...', '384', '›']).map((item, i) => (
                            <button key={i} className={`w-7 h-7 rounded-md flex items-center justify-center text-[12px] cursor-pointer transition-colors ${i === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-400 hover:text-gray-700 dark:hover:text-white'}`}>{item}</button>
                        ))}
                    </div>
                </div>
            </div>

            {selected && <WalletModal customer={selected} onClose={() => setSelected(null)} />}
        </div>
    );
}