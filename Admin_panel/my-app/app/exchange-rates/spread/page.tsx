'use client';

import { useState } from 'react';
import {
    ChevronRight, Pencil, Check, X, Search, ChevronDown, Filter,
    TrendingUp, TrendingDown, AlertTriangle, Users, History,
} from 'lucide-react';
import {
    spreadRules,
    spreadStats,
    customerTiers,
    spreadChangeLog,
    SpreadRule,
    SpreadRuleStatus,
    CustomerTier,
    SpreadChangeLogEntry,
} from '@/lib/data';


import { flagForCountryName } from '@/lib/countries_data';


// ── helpers ───────────────────────────────────────────────────

const currencyCountryMap: Record<string, string> = {
    GBP: 'United Kingdom',
    USD: 'United States',
    EUR: 'Europe',
    BDT: 'Bangladesh',
    AED: 'UAE',
    INR: 'India',
    PKR: 'Pakistan',
    NGN: 'Nigeria',
    CAD: 'Canada',
    AUD: 'Australia',
    PHP: 'Philippines',
    SAR: 'Saudi Arabia',
};

function CurrencyFlag({ code, size = 'w-4 h-4' }: { code: string; size?: string }) {
    const country = currencyCountryMap[code];
    if (!country) return null;
    return (
        <img
            src={flagForCountryName(country)}
            alt={code}
            className={`${size} rounded-full object-cover inline-block shrink-0`}
        />
    );
}





const statusClasses: Record<SpreadRuleStatus, string> = {
    Active: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    Inactive: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
};

const tierColorClasses: Record<string, string> = {
    gray: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400',
};

const fmtDateTime = (iso: string) => {
    const d = new Date(iso);
    return `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
};

const fmtVolume = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
    return n.toString();
};

// ── Stat cards ────────────────────────────────────────────────
function SpreadStatCards() {
    const s = spreadStats;
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5">
                <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-1">Average Spread</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{s.averageSpreadPct}%</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">Across all pairs</p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5">
                <div className="flex items-center justify-between mb-1">
                    <p className="text-[11px] text-gray-400 dark:text-gray-500">Highest Spread</p>
                    <TrendingUp size={13} className="text-red-500 dark:text-red-400" />
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{s.highestSpreadPct}%</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 truncate">{s.highestSpreadPair}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5">
                <div className="flex items-center justify-between mb-1">
                    <p className="text-[11px] text-gray-400 dark:text-gray-500">Lowest Spread</p>
                    <TrendingDown size={13} className="text-emerald-500 dark:text-emerald-400" />
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{s.lowestSpreadPct}%</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 truncate">{s.lowestSpreadPair}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5">
                <div className="flex items-center justify-between mb-1">
                    <p className="text-[11px] text-gray-400 dark:text-gray-500">Needs Review</p>
                    <AlertTriangle size={13} className="text-amber-500 dark:text-amber-400" />
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{s.pairsNeedingReview}</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">Pairs above max limit</p>
            </div>
        </div>
    );
}

// ── Filter bar ────────────────────────────────────────────────
function FilterBar({ search, setSearch }: { search: string; setSearch: (v: string) => void }) {
    return (
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
            <div className="flex items-center gap-2 flex-1 min-w-40 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
                <Search size={14} className="text-gray-400 dark:text-gray-500" />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search currency pair..."
                    className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                All Status <ChevronDown size={13} />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <Filter size={13} /> Filters
            </button>
        </div>
    );
}

// ── Spread Rules Table (inline editable spread %) ──────────────
function SpreadRulesTable({ rows, search, setSearch }: { rows: SpreadRule[]; search: string; setSearch: (v: string) => void }) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [draftValue, setDraftValue] = useState('');

    const startEdit = (r: SpreadRule) => {
        setEditingId(r.id);
        setDraftValue(r.currentSpreadPct.toFixed(2));
    };
    const cancelEdit = () => {
        setEditingId(null);
        setDraftValue('');
    };

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
            <FilterBar search={search} setSearch={setSearch} />
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-230">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="px-4 py-2.5 font-medium">Currency Pair</th>
                            <th className="px-2 py-2.5 font-medium">Current Spread</th>
                            <th className="px-2 py-2.5 font-medium">Min / Max Limit</th>
                            <th className="px-2 py-2.5 font-medium">Default</th>
                            <th className="px-2 py-2.5 font-medium">Monthly Volume</th>
                            <th className="px-2 py-2.5 font-medium">Last Updated</th>
                            <th className="px-2 py-2.5 font-medium">Status</th>
                            <th className="px-2 py-2.5 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(r => {
                            const isEditing = editingId === r.id;
                            const draftNum = parseFloat(draftValue);
                            const outOfRange = !isNaN(draftNum) && (draftNum < r.minSpreadPct || draftNum > r.maxSpreadPct);
                            const aboveMax = r.currentSpreadPct > r.maxSpreadPct;

                            return (
                                <tr key={r.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                                    <td className="px-4 py-2.5 whitespace-nowrap">
                                        <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-800 dark:text-gray-100">
                                            <CurrencyFlag code={r.baseCurrency} /><CurrencyFlag code={r.quoteCurrency} />
                                            {r.baseCurrency} / {r.quoteCurrency}
                                        </span>
                                    </td>
                                    <td className="px-2 py-2.5 whitespace-nowrap">
                                        {isEditing ? (
                                            <div className="flex items-center gap-1.5">
                                                <input
                                                    autoFocus
                                                    type="number"
                                                    step="0.01"
                                                    value={draftValue}
                                                    onChange={e => setDraftValue(e.target.value)}
                                                    className={`w-20 border rounded-lg px-2 py-1 text-[12px] bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 outline-none ${outOfRange ? 'border-red-400 dark:border-red-600' : 'border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500'
                                                        }`}
                                                />
                                                <span className="text-[12px] text-gray-400">%</span>
                                                <button onClick={cancelEdit} className="text-emerald-600 dark:text-emerald-400 hover:opacity-70 cursor-pointer">
                                                    <Check size={14} />
                                                </button>
                                                <button onClick={cancelEdit} className="text-gray-400 dark:text-gray-500 hover:opacity-70 cursor-pointer">
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className={`text-[13px] font-semibold ${aboveMax ? 'text-red-500 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                                                {r.currentSpreadPct.toFixed(2)}%
                                            </span>
                                        )}
                                        {isEditing && outOfRange && (
                                            <p className="text-[10px] text-red-500 dark:text-red-400 mt-0.5">
                                                Outside {r.minSpreadPct}%–{r.maxSpreadPct}% limit
                                            </p>
                                        )}
                                    </td>
                                    <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                        {r.minSpreadPct.toFixed(2)}% – {r.maxSpreadPct.toFixed(2)}%
                                    </td>
                                    <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.defaultSpreadPct.toFixed(2)}%</td>
                                    <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">
                                        {r.volumeCurrency} {fmtVolume(r.monthlyVolume)}
                                    </td>
                                    <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                        {r.lastUpdated}<br /><span className="text-[10px]">by {r.updatedBy}</span>
                                    </td>
                                    <td className="px-2 py-2.5 whitespace-nowrap">
                                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusClasses[r.status]}`}>{r.status}</span>
                                    </td>
                                    <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                        {!isEditing && (
                                            <button
                                                onClick={() => startEdit(r)}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-[11px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                            >
                                                <Pencil size={11} /> Edit
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
                <span>Showing 1 to {rows.length} of {rows.length} currency pairs</span>
                <select className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded px-2 py-1 text-[12px] text-gray-600 dark:text-gray-300">
                    <option>10 / page</option>
                    <option>20 / page</option>
                    <option>50 / page</option>
                </select>
            </div>
        </div>
    );
}

// ── Customer Tier discount cards ───────────────────────────────
function CustomerTierCards({ tiers }: { tiers: CustomerTier[] }) {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
                <Users size={15} className="text-gray-500 dark:text-gray-400" />
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Customer Tier Spread Discounts</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {tiers.map(t => (
                    <div key={t.tier} className="border border-gray-100 dark:border-gray-700 rounded-lg p-3">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${tierColorClasses[t.color]}`}>{t.tier}</span>
                        <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                            {t.spreadDiscountPct > 0 ? `-${t.spreadDiscountPct}%` : 'Standard'}
                        </p>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500">spread discount</p>
                        <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                            <p className="text-[11px] text-gray-500 dark:text-gray-400">
                                {t.monthlyVolumeThreshold > 0 ? `£${(t.monthlyVolumeThreshold / 1000).toFixed(0)}k+/mo` : 'Any volume'}
                            </p>
                            <p className="text-[11px] text-gray-400 dark:text-gray-500">{t.customerCount.toLocaleString()} customers</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Spread Change Log ──────────────────────────────────────────
function SpreadChangeLogPanel({ rows }: { rows: SpreadChangeLogEntry[] }) {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
                <History size={15} className="text-gray-500 dark:text-gray-400" />
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Spread Change Log</h3>
            </div>
            <div className="space-y-4 max-h-105 overflow-y-auto pr-1">
                {rows.map((log, idx) => {
                    const increased = log.toPct > log.fromPct;
                    return (
                        <div key={log.id} className="flex gap-3 relative">
                            {idx !== rows.length - 1 && (
                                <div className="absolute left-3.75 top-7 -bottom-4 w-px bg-gray-100 dark:bg-gray-700" />
                            )}
                            <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${increased ? 'bg-red-50 text-red-500 dark:bg-red-950 dark:text-red-400' : 'bg-emerald-50 text-emerald-500 dark:bg-emerald-950 dark:text-emerald-400'
                                }`}>
                                {increased ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                            </span>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-0.5 flex-wrap">
                                    <p className="text-[12px] font-medium text-gray-800 dark:text-gray-100 flex items-center gap-1.5 flex-wrap">
                                        {log.pairLabel.split('/').map((code, i) => (
                                            <CurrencyFlag key={i} code={code.trim()} />
                                        ))}
                                        {log.pairLabel}
                                        <span className={`ml-2 font-semibold ${increased ? 'text-red-500 dark:text-red-400' : 'text-emerald-500 dark:text-emerald-400'}`}>
                                            {log.fromPct.toFixed(2)}% → {log.toPct.toFixed(2)}%
                                        </span>
                                    </p>
                                    <span className="text-[10px] text-gray-400 dark:text-gray-500 whitespace-nowrap">{fmtDateTime(log.timestamp)}</span>
                                </div>
                                <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-0.5">{log.note}</p>
                                <p className="text-[11px] text-gray-400 dark:text-gray-500">by {log.changedBy}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────
export default function SpreadManagementPage() {
    const [search, setSearch] = useState('');

    const filteredRows = spreadRules.filter(r => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
            r.baseCurrency.toLowerCase().includes(q) ||
            r.quoteCurrency.toLowerCase().includes(q) ||
            `${r.baseCurrency}/${r.quoteCurrency}`.toLowerCase().includes(q)
        );
    });

    return (
        <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* header */}
            <div className="mb-5">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Spread Management</h1>
                <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                    <span>Dashboard</span><ChevronRight size={12} />
                    <span>Exchange Rates</span><ChevronRight size={12} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Spread Management</span>
                </div>
            </div>

            <SpreadStatCards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 space-y-4">
                    <SpreadRulesTable rows={filteredRows} search={search} setSearch={setSearch} />
                    <CustomerTierCards tiers={customerTiers} />
                </div>

                <div className="lg:col-span-1">
                    <SpreadChangeLogPanel rows={spreadChangeLog} />
                </div>
            </div>
        </div>
    );
}