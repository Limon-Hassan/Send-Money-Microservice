'use client';

import { useState } from 'react';
import {
    ChevronRight, Search, Plus, Pencil, MoreVertical, X, Receipt, Tag, Power,
} from 'lucide-react';
import {
    managedFeeRules,
    managedPromotions,
    feesChargesStats,
    feeRuleStatusOptions,
    promotionStatusOptions,
    feeChargeTypeOptions,
    ManagedFeeRule,
    ManagedPromotion,
    FeeRuleStatus,
    PromotionStatus,
} from '@/lib/data';
import { flagForCountryName } from '@/lib/countries_data';





// ── helpers ───────────────────────────────────────────────────
const corridorCountryNameMap: Record<string, string> = {
    UK: 'United Kingdom',
    USA: 'United States',
    UAE: 'UAE',
    Bangladesh: 'Bangladesh',
    Pakistan: 'Pakistan',
    India: 'India',
    'Saudi Arabia': 'Saudi Arabia',
    Philippines: 'Philippines',
    Nigeria: 'Nigeria',
    Canada: 'Canada',
};

function CountryFlag({ country, size = 'w-4 h-4' }: { country: string; size?: string }) {
    const mapped = corridorCountryNameMap[country] ?? country;
    return (
        <img
            src={flagForCountryName(mapped)}
            alt={country}
            className={`${size} rounded-full object-cover inline-block shrink-0`}
        />
    );
}

// Renders the two flags + label for a corridor string like "UK → Bangladesh".
function CorridorFlags({ corridor }: { corridor: string }) {
    const parts = corridor.split('→').map(s => s.trim());
    if (parts.length !== 2) {
        return <span className="text-[13px] font-medium text-gray-800 dark:text-gray-100">{corridor}</span>;
    }
    return (
        <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-800 dark:text-gray-100">
            <CountryFlag country={parts[0]} /> <CountryFlag country={parts[1]} /> {corridor}
        </span>
    );
}







const feeStatusClasses: Record<FeeRuleStatus, string> = {
    Active: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    Inactive: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
};

const promoStatusClasses: Record<PromotionStatus, string> = {
    Active: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    Scheduled: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    Expired: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
};

const TABS = ['Fee Rules', 'Promotions'] as const;

const currencySymbol: Record<string, string> = { GBP: '£', USD: '$', EUR: '€', CAD: 'C$', AED: 'AED ', SAR: 'SAR ' };
const sym = (c: string) => currencySymbol[c] ?? '';

// ── Stat cards ────────────────────────────────────────────────
function StatCards() {
    const s = feesChargesStats;
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {[
                { label: 'Total Fee Rules', value: s.totalFeeRules },
                { label: 'Active Fee Rules', value: s.activeFeeRules },
                { label: 'Corridor Fees', value: s.corridorFees },
                { label: 'Active Promotions', value: s.promotions },
            ].map(c => (
                <div key={c.label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5">
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-1">{c.label}</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{c.value}</p>
                </div>
            ))}
        </div>
    );
}

// ── Tabs ──────────────────────────────────────────────────────
function PageTabs({ active, setActive }: { active: string; setActive: (v: string) => void }) {
    return (
        <div className="flex items-center gap-6 px-4 pt-3 border-b border-gray-100 dark:border-gray-700/60">
            {TABS.map(tab => (
                <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={`pb-2.5 text-[13px] font-medium border-b-2 -mb-px transition-colors cursor-pointer ${active === tab
                            ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                            : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}

// ── Filter bar ────────────────────────────────────────────────
function FilterBar({
    search, setSearch, placeholder, statusFilter, setStatusFilter, statusOptions, onAddClick, addLabel,
}: {
    search: string; setSearch: (v: string) => void; placeholder: string;
    statusFilter: string; setStatusFilter: (v: string) => void; statusOptions: string[];
    onAddClick: () => void; addLabel: string;
}) {
    return (
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
            <div className="flex items-center gap-2 flex-1 min-w-[160px] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
                <Search size={14} className="text-gray-400 dark:text-gray-500" />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder={placeholder}
                    className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
            </div>
            <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none"
            >
                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button
                onClick={onAddClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 cursor-pointer sm:ml-auto"
            >
                <Plus size={13} /> {addLabel}
            </button>
        </div>
    );
}

// ── Pagination footer ────────────────────────────────────────
function PaginationFooter({
    totalRows, label, page, setPage, pageSize,
}: { totalRows: number; label: string; page: number; setPage: (n: number | ((p: number) => number)) => void; pageSize: number }) {
    const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
    const currentPage = Math.min(page, totalPages);
    const from = totalRows === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const to = Math.min(currentPage * pageSize, totalRows);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
            <span>Showing {from} to {to} of {totalRows} {label}</span>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`px-2.5 py-1 rounded cursor-pointer ${p === currentPage ? 'bg-blue-600 text-white' : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    >
                        {p}
                    </button>
                ))}
                <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >›</button>
            </div>
            <select className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded px-2 py-1 text-[12px] text-gray-600 dark:text-gray-300">
                <option>10 / page</option><option>20 / page</option><option>50 / page</option>
            </select>
        </div>
    );
}

// ── Fee Rules Table ───────────────────────────────────────────
function FeeRulesTable({ rows, onToggleStatus }: { rows: ManagedFeeRule[]; onToggleStatus: (id: string) => void }) {
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-215">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="px-4 py-2.5 font-medium">Corridor</th>
                            <th className="px-2 py-2.5 font-medium">Charge Type</th>
                            <th className="px-2 py-2.5 font-medium">Charge</th>
                            <th className="px-2 py-2.5 font-medium">Min / Max Fee</th>
                            <th className="px-2 py-2.5 font-medium">Updated</th>
                            <th className="px-2 py-2.5 font-medium">Status</th>
                            <th className="px-2 py-2.5 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageRows.map(f => (
                            <tr key={f.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                                <td className="px-4 py-2.5 whitespace-nowrap">
                                    <CorridorFlags corridor={f.corridor} />
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{f.chargeType}</td>
                                <td className="px-2 py-2.5 text-[13px] font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                                    {f.chargeType === 'Fixed' ? `${sym(f.currency)}${f.amount.toFixed(2)}` : `${f.amount.toFixed(2)}%`}
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                    {f.chargeType === 'Percentage' ? `${sym(f.currency)}${f.minFee.toFixed(2)} – ${sym(f.currency)}${f.maxFee.toFixed(2)}` : '—'}
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{f.updatedOn}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${feeStatusClasses[f.status]}`}>{f.status}</span>
                                </td>
                                <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"><Pencil size={13} /></button>
                                        <button
                                            onClick={() => onToggleStatus(f.id)}
                                            className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                                            title={f.status === 'Active' ? 'Deactivate' : 'Activate'}
                                        >
                                            <Power size={13} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 && (
                            <tr><td colSpan={7} className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">No fee rules match your search.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
            <PaginationFooter totalRows={rows.length} label="fee rules" page={page} setPage={setPage} pageSize={pageSize} />
        </>
    );
}

// ── Promotions Table ──────────────────────────────────────────
function PromotionsTable({ rows, onToggleStatus }: { rows: ManagedPromotion[]; onToggleStatus: (id: string) => void }) {
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-230">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="px-4 py-2.5 font-medium">Promotion</th>
                            <th className="px-2 py-2.5 font-medium">Corridor</th>
                            <th className="px-2 py-2.5 font-medium">Discount</th>
                            <th className="px-2 py-2.5 font-medium">Period</th>
                            <th className="px-2 py-2.5 font-medium">Usage</th>
                            <th className="px-2 py-2.5 font-medium">Status</th>
                            <th className="px-2 py-2.5 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageRows.map(p => {
                            const usagePct = p.usageLimit > 0 ? Math.min(100, Math.round((p.usageCount / p.usageLimit) * 100)) : 0;
                            return (
                                <tr key={p.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                                    <td className="px-4 py-2.5 whitespace-nowrap">
                                        <p className="text-[13px] font-medium text-gray-800 dark:text-gray-100">{p.title}</p>
                                        <p className="text-[10px] text-gray-400 dark:text-gray-500 max-w-55 truncate">{p.description}</p>
                                    </td>
                                    <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{p.corridor}</td>
                                    <td className="px-2 py-2.5 text-[13px] font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">{p.discountPct}%</td>
                                    <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{p.startDate} – {p.endDate}</td>
                                    <td className="px-2 py-2.5 whitespace-nowrap min-w-27.5">
                                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-1">{p.usageCount.toLocaleString()} / {p.usageLimit.toLocaleString()}</p>
                                        <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden w-24">
                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${usagePct}%` }} />
                                        </div>
                                    </td>
                                    <td className="px-2 py-2.5 whitespace-nowrap">
                                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${promoStatusClasses[p.status]}`}>{p.status}</span>
                                    </td>
                                    <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"><Pencil size={13} /></button>
                                            <button
                                                onClick={() => onToggleStatus(p.id)}
                                                className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                                                title={p.status === 'Active' ? 'Expire now' : 'Activate'}
                                            >
                                                <Power size={13} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {rows.length === 0 && (
                            <tr><td colSpan={7} className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">No promotions match your search.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
            <PaginationFooter totalRows={rows.length} label="promotions" page={page} setPage={setPage} pageSize={pageSize} />
        </>
    );
}

// ── Add Fee Rule Modal ─────────────────────────────────────────
function AddFeeRuleModal({
    onClose, onAdd,
}: { onClose: () => void; onAdd: (corridor: string, chargeType: string, amount: number, currency: string, minFee: number, maxFee: number) => void }) {
    const [corridor, setCorridor] = useState('');
    const [chargeType, setChargeType] = useState<string>('Fixed');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('GBP');
    const [minFee, setMinFee] = useState('');
    const [maxFee, setMaxFee] = useState('');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-sm p-5" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Receipt size={15} className="text-blue-600" /> Add Fee Rule
                    </h3>
                    <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><X size={16} /></button>
                </div>
                <div className="space-y-3">
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Corridor</label>
                        <input value={corridor} onChange={e => setCorridor(e.target.value)} placeholder="e.g. UK → Bangladesh"
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Charge Type</label>
                            <select value={chargeType} onChange={e => setChargeType(e.target.value)}
                                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 cursor-pointer">
                                {feeChargeTypeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Currency</label>
                            <input value={currency} onChange={e => setCurrency(e.target.value.toUpperCase())} maxLength={3}
                                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                        </div>
                    </div>
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">{chargeType === 'Fixed' ? 'Fee Amount' : 'Fee Percentage (%)'}</label>
                        <input type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00"
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                    </div>
                    {chargeType === 'Percentage' && (
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Min Fee</label>
                                <input type="number" step="0.01" value={minFee} onChange={e => setMinFee(e.target.value)} placeholder="0.00"
                                    className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                            </div>
                            <div>
                                <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Max Fee</label>
                                <input type="number" step="0.01" value={maxFee} onChange={e => setMaxFee(e.target.value)} placeholder="0.00"
                                    className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2 mt-5">
                    <button onClick={onClose} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">Cancel</button>
                    <button
                        disabled={!corridor || !amount}
                        onClick={() => { onAdd(corridor, chargeType, parseFloat(amount) || 0, currency, parseFloat(minFee) || 0, parseFloat(maxFee) || 0); onClose(); }}
                        className="flex-1 px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Add Fee Rule
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Add Promotion Modal ────────────────────────────────────────
function AddPromotionModal({
    onClose, onAdd,
}: { onClose: () => void; onAdd: (title: string, description: string, discountPct: number, corridor: string, startDate: string, endDate: string, usageLimit: number) => void }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [discountPct, setDiscountPct] = useState('');
    const [corridor, setCorridor] = useState('All Corridors');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [usageLimit, setUsageLimit] = useState('');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-sm p-5 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Tag size={15} className="text-blue-600" /> Add Promotion
                    </h3>
                    <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><X size={16} /></button>
                </div>
                <div className="space-y-3">
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Title</label>
                        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Eid Special Discount"
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                    </div>
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Description</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={2} placeholder="Short description of this promotion"
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400 resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Discount (%)</label>
                            <input type="number" value={discountPct} onChange={e => setDiscountPct(e.target.value)} placeholder="0"
                                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                        </div>
                        <div>
                            <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Usage Limit</label>
                            <input type="number" value={usageLimit} onChange={e => setUsageLimit(e.target.value)} placeholder="0"
                                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                        </div>
                    </div>
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Corridor</label>
                        <input value={corridor} onChange={e => setCorridor(e.target.value)} placeholder="e.g. UK → Bangladesh or All Corridors"
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Start Date</label>
                            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                        </div>
                        <div>
                            <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">End Date</label>
                            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-5">
                    <button onClick={onClose} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">Cancel</button>
                    <button
                        disabled={!title || !discountPct || !startDate || !endDate}
                        onClick={() => {
                            onAdd(title, description, parseFloat(discountPct) || 0, corridor || 'All Corridors', startDate, endDate, parseInt(usageLimit) || 0);
                            onClose();
                        }}
                        className="flex-1 px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Add Promotion
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────
export default function FeesChargesPage() {
    const [activeTab, setActiveTab] = useState<string>('Fee Rules');
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [feeRules, setFeeRules] = useState(managedFeeRules);
    const [promotions, setPromotions] = useState(managedPromotions);
    const [showAddFee, setShowAddFee] = useState(false);
    const [showAddPromo, setShowAddPromo] = useState(false);
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setStatusFilter('All Status');
        setSearch('');
    };

    const toggleFeeStatus = (id: string) => {
        setFeeRules(prev => prev.map(f => (f.id === id ? { ...f, status: f.status === 'Active' ? 'Inactive' : 'Active' } : f)));
        showToast('Fee rule status updated');
    };

    const togglePromoStatus = (id: string) => {
        setPromotions(prev => prev.map(p => (p.id === id ? { ...p, status: p.status === 'Active' ? 'Expired' : 'Active' } : p)));
        showToast('Promotion status updated');
    };

    const handleAddFeeRule = (corridor: string, chargeType: string, amount: number, currency: string, minFee: number, maxFee: number) => {
        setFeeRules(prev => [
            {
                id: `FEE-${Date.now()}`, corridor, sendingFlag: '🏳️', receivingFlag: '🏳️',
                chargeType: chargeType as ManagedFeeRule['chargeType'], amount, currency, minFee, maxFee,
                status: 'Active', updatedOn: 'Just now',
            },
            ...prev,
        ]);
        showToast(`Fee rule for ${corridor} added`);
    };

    const handleAddPromotion = (title: string, description: string, discountPct: number, corridor: string, startDate: string, endDate: string, usageLimit: number) => {
        setPromotions(prev => [
            {
                id: `PRM-${Date.now()}`, title, description, discountPct, corridor, startDate, endDate,
                usageCount: 0, usageLimit, status: 'Scheduled',
            },
            ...prev,
        ]);
        showToast(`${title} added`);
    };

    const filteredFeeRules = feeRules.filter(f => {
        if (statusFilter !== 'All Status' && f.status !== statusFilter) return false;
        return !search || f.corridor.toLowerCase().includes(search.toLowerCase());
    });

    const filteredPromotions = promotions.filter(p => {
        if (statusFilter !== 'All Status' && p.status !== statusFilter) return false;
        if (!search) return true;
        const q = search.toLowerCase();
        return p.title.toLowerCase().includes(q) || p.corridor.toLowerCase().includes(q);
    });

    return (
        <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="mb-5">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Fees & Charges</h1>
                <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                    <span>Dashboard</span><ChevronRight size={12} />
                    <span>Management</span><ChevronRight size={12} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Fees & Charges</span>
                </div>
            </div>

            <StatCards />

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                <PageTabs active={activeTab} setActive={handleTabChange} />
                {activeTab === 'Fee Rules' ? (
                    <>
                        <FilterBar
                            search={search} setSearch={setSearch} placeholder="Search corridor..."
                            statusFilter={statusFilter} setStatusFilter={setStatusFilter} statusOptions={feeRuleStatusOptions}
                            onAddClick={() => setShowAddFee(true)} addLabel="Add Fee Rule"
                        />
                        <FeeRulesTable rows={filteredFeeRules} onToggleStatus={toggleFeeStatus} />
                    </>
                ) : (
                    <>
                        <FilterBar
                            search={search} setSearch={setSearch} placeholder="Search promotion or corridor..."
                            statusFilter={statusFilter} setStatusFilter={setStatusFilter} statusOptions={promotionStatusOptions}
                            onAddClick={() => setShowAddPromo(true)} addLabel="Add Promotion"
                        />
                        <PromotionsTable rows={filteredPromotions} onToggleStatus={togglePromoStatus} />
                    </>
                )}
            </div>

            {showAddFee && <AddFeeRuleModal onClose={() => setShowAddFee(false)} onAdd={handleAddFeeRule} />}
            {showAddPromo && <AddPromotionModal onClose={() => setShowAddPromo(false)} onAdd={handleAddPromotion} />}

            {toast && (
                <div className="fixed bottom-5 right-5 bg-gray-900 dark:bg-gray-700 text-white text-[12px] px-4 py-2.5 rounded-lg shadow-lg z-50">
                    {toast}
                </div>
            )}
        </div>
    );
}