'use client';

import { useState, useMemo } from 'react';
import {
  ChevronRight, Search, ChevronDown, Filter, Pencil, MoreVertical, X,
  Building2, Smartphone, Eye, CreditCard, Edit2, History, Power, Plus,
  Check, Trash2,
} from 'lucide-react';
import {
  paymentMethods,
  paymentCategoryStats,
  PaymentMethod,
  PaymentMethodType,
  PaymentMethodStatus,
} from '@/lib/data';

// ── helpers ───────────────────────────────────────────────────
const statusClasses: Record<PaymentMethodStatus, string> = {
  Active: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
  Inactive: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
};

const categoryIcon: Record<PaymentMethodType, React.ElementType> = {
  'Bank Transfer': Building2,
  'Mobile Wallet': Smartphone,
  'Cash Pickup': Eye,
  'Card Payments': CreditCard,
};

const currencySymbol: Record<string, string> = {
  GBP: '£', USD: '$', EUR: '€', BDT: '৳', PKR: '₨', PHP: '₱', NGN: '₦', GHS: '₵', KES: 'KSh ',
};
const sym = (code: string) => currencySymbol[code] ?? '';

const fmtCompact = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
  return n.toLocaleString();
};

const ALL_CURRENCIES = ['GBP', 'USD', 'EUR', 'BDT', 'PKR', 'PHP', 'NGN', 'GHS', 'KES'];
const ICON_BG_OPTIONS = [
  'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
  'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400',
  'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
  'bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400',
  'bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400',
];

// ── Category summary banner (top) ──────────────────────────────
function CategorySummaryCard({
  type, rows, onAddClick,
}: { type: PaymentMethodType; rows: PaymentMethod[]; onAddClick: () => void }) {
  const stat = paymentCategoryStats.find(c => c.type === type)!;
  const Icon = categoryIcon[type];
  const totalTransactions = rows.reduce((sum, m) => sum + m.transactions, 0);
  const activeCount = rows.filter(m => m.status === 'Active').length;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className={`w-11 h-11 rounded-lg flex items-center justify-center ${stat.iconBg}`}>
            <Icon size={20} />
          </span>
          <div>
            <p className="text-[15px] font-semibold text-gray-900 dark:text-white">{type}</p>
            <p className="text-[12px] text-gray-400 dark:text-gray-500">{rows.length} methods configured</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 sm:gap-8">
          <div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{activeCount}</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500">Active Methods</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.countries}</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500">Countries</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{fmtCompact(totalTransactions)}</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500">Transactions</p>
          </div>
        </div>
        <button
          onClick={onAddClick}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 cursor-pointer whitespace-nowrap"
        >
          <Plus size={14} /> Add {type} Method
        </button>
      </div>
    </div>
  );
}

// ── Filter bar ────────────────────────────────────────────────
function FilterBar({
  search, setSearch,
  countryFilter, setCountryFilter, countryOptions,
  currencyFilter, setCurrencyFilter, currencyOptions,
  statusFilter, setStatusFilter,
  onMoreFilters,
}: {
  search: string; setSearch: (v: string) => void;
  countryFilter: string; setCountryFilter: (v: string) => void; countryOptions: number[];
  currencyFilter: string; setCurrencyFilter: (v: string) => void; currencyOptions: string[];
  statusFilter: string; setStatusFilter: (v: string) => void;
  onMoreFilters: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
      <div className="flex items-center gap-2 flex-1 min-w-40 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
        <Search size={14} className="text-gray-400 dark:text-gray-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search methods or provider..."
          className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
      </div>

      <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300">
        <select
          value={countryFilter}
          onChange={e => setCountryFilter(e.target.value)}
          className="bg-transparent outline-none appearance-none pr-1 cursor-pointer"
        >
          <option value="All">All Countries</option>
          {countryOptions.map(c => (
            <option key={c} value={String(c)}>{c} {c === 1 ? 'country' : 'countries'}</option>
          ))}
        </select>
        <ChevronDown size={13} className="pointer-events-none" />
      </div>

      <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300">
        <select
          value={currencyFilter}
          onChange={e => setCurrencyFilter(e.target.value)}
          className="bg-transparent outline-none appearance-none pr-1 cursor-pointer"
        >
          <option value="All">All Currencies</option>
          {currencyOptions.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <ChevronDown size={13} className="pointer-events-none" />
      </div>

      <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="bg-transparent outline-none appearance-none pr-1 cursor-pointer"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <ChevronDown size={13} className="pointer-events-none" />
      </div>

      <button
        onClick={onMoreFilters}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
      >
        <Filter size={13} /> Filters
      </button>
    </div>
  );
}

// ── Methods table ─────────────────────────────────────────────
function MethodsTable({
  rows, selectedId, onSelect, onEdit, onDeactivateToggle, onDelete, openMenuId, setOpenMenuId,
}: {
  rows: PaymentMethod[]; selectedId: string; onSelect: (m: PaymentMethod) => void;
  onEdit: (m: PaymentMethod) => void;
  onDeactivateToggle: (m: PaymentMethod) => void;
  onDelete: (m: PaymentMethod) => void;
  openMenuId: string | null; setOpenMenuId: (id: string | null) => void;
}) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-190">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
              <th className="px-4 py-2.5 font-medium">Method Name</th>
              <th className="px-2 py-2.5 font-medium">Provider / Partner</th>
              <th className="px-2 py-2.5 font-medium">Countries</th>
              <th className="px-2 py-2.5 font-medium">Currencies</th>
              <th className="px-2 py-2.5 font-medium">Fee</th>
              <th className="px-2 py-2.5 font-medium">Status</th>
              <th className="px-2 py-2.5 font-medium">Transactions</th>
              <th className="px-2 py-2.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(m => (
              <tr
                key={m.id}
                onClick={() => onSelect(m)}
                className={`border-b border-gray-50 dark:border-gray-700/40 last:border-0 cursor-pointer transition-colors ${selectedId === m.id ? 'bg-blue-50/60 dark:bg-blue-950/30' : 'hover:bg-gray-50/60 dark:hover:bg-gray-700/30'
                  }`}
              >
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <div className="flex items-center gap-2.5">
                    {(() => {
                      const MIcon = categoryIcon[m.type]; return (
                        <span className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${m.iconBg}`}>
                          <MIcon size={16} />
                        </span>
                      );
                    })()}
                    <p className="text-[13px] font-medium text-gray-800 dark:text-gray-100">{m.name}</p>
                  </div>
                </td>
                <td className="px-2 py-2.5 whitespace-nowrap">
                  <span className="inline-flex items-center gap-2 text-[12px] text-gray-600 dark:text-gray-300">
                    <span className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[9px] font-semibold flex items-center justify-center shrink-0">
                      {m.provider.slice(0, 2).toUpperCase()}
                    </span>
                    {m.provider}
                  </span>
                </td>
                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{m.countryCount}</td>
                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{m.currencies.join(', ')}</td>
                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{m.transactionFeePct.toFixed(2)}%</td>
                <td className="px-2 py-2.5 whitespace-nowrap">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusClasses[m.status]}`}>{m.status}</span>
                </td>
                <td className="px-2 py-2.5 text-[12px] text-gray-700 dark:text-gray-200 font-medium whitespace-nowrap">{m.transactions.toLocaleString()}</td>
                <td className="px-2 py-2.5 text-right whitespace-nowrap">
                  <div className="relative flex items-center justify-end gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); onEdit(m); }}
                      className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                      aria-label="Edit"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === m.id ? null : m.id); }}
                      className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                      aria-label="More"
                    >
                      <MoreVertical size={14} />
                    </button>

                    {openMenuId === m.id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-7 z-20 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 text-left"
                      >
                        <button
                          onClick={() => { onEdit(m); setOpenMenuId(null); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <Edit2 size={13} /> Edit Method
                        </button>
                        <button
                          onClick={() => { onDeactivateToggle(m); setOpenMenuId(null); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <Power size={13} /> {m.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => { onDelete(m); setOpenMenuId(null); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          <Trash2 size={13} /> Remove Method
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">
                  No methods match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
        <span>Showing 1 to {rows.length} of {rows.length} methods</span>
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

// ── Right sidebar: Method Details ──────────────────────────────
function MethodDetailsPanel({
  method, onClose, onEdit, onDeactivateToggle, onViewTransactions, onManageLimits,
}: {
  method: PaymentMethod;
  onClose: () => void;
  onEdit: (m: PaymentMethod) => void;
  onDeactivateToggle: (m: PaymentMethod) => void;
  onViewTransactions: (m: PaymentMethod) => void;
  onManageLimits: (m: PaymentMethod) => void;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Method Details</h3>
        <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">
          <X size={15} />
        </button>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${method.iconBg}`}>
          {(() => { const MIcon = categoryIcon[method.type]; return <MIcon size={18} />; })()}
        </span>
        <div className="flex-1">
          <p className="text-[14px] font-semibold text-gray-900 dark:text-white">{method.name}</p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500">{method.type}</p>
        </div>
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusClasses[method.status]}`}>{method.status}</span>
      </div>

      <div className="space-y-2 mb-4">
        {[
          ['Provider', method.provider],
          ['Countries', `${method.countryCount} ${method.countryCount === 1 ? 'country' : 'countries'}`],
          ['Currencies', method.currencies.join(', ')],
          ['Transaction Fee', `${method.transactionFeePct.toFixed(2)}%`],
          ['Min Transaction', `${sym(method.currencies[0])}${method.minTransaction.toLocaleString()}`],
          ['Max Transaction', `${sym(method.currencies[0])}${method.maxTransaction.toLocaleString()}`],
          ['Daily Limit', `${sym(method.limitCurrency)}${method.dailyLimit.toLocaleString()}`],
          ['Connected On', method.connectedOn],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between text-[12px]">
            <span className="text-gray-400 dark:text-gray-500">{label}</span>
            <span className="text-gray-700 dark:text-gray-200 font-medium text-right">{value}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => onEdit(method)}
        className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer mb-4"
      >
        <Edit2 size={13} /> Edit Method
      </button>

      <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mb-4">
        <h4 className="text-[12px] font-semibold text-gray-700 dark:text-gray-300 mb-3">Performance (This Week)</h4>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <p className="text-[13px] font-bold text-gray-900 dark:text-white">{fmtCompact(method.weeklyTransactions)}</p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-0.5">Transactions</p>
            <p className={`text-[10px] font-medium ${method.weeklyTransactionsChangePct >= 0 ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
              {method.weeklyTransactionsChangePct >= 0 ? '+' : ''}{method.weeklyTransactionsChangePct}%
            </p>
          </div>
          <div>
            <p className="text-[13px] font-bold text-gray-900 dark:text-white">
              {sym(method.weeklyVolumeCurrency)}{fmtCompact(method.weeklyVolume)}
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-0.5">Total Volume</p>
            <p className={`text-[10px] font-medium ${method.weeklyVolumeChangePct >= 0 ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
              {method.weeklyVolumeChangePct >= 0 ? '+' : ''}{method.weeklyVolumeChangePct}%
            </p>
          </div>
          <div>
            <p className="text-[13px] font-bold text-gray-900 dark:text-white">{method.successRatePct}%</p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-0.5">Success Rate</p>
            <p className={`text-[10px] font-medium ${method.successRateChangePct >= 0 ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
              {method.successRateChangePct >= 0 ? '+' : ''}{method.successRateChangePct}%
            </p>
          </div>
        </div>
      </div>

      <h4 className="text-[12px] font-semibold text-gray-700 dark:text-gray-300 mb-2">Quick Actions</h4>
      <div className="space-y-2">
        <button
          onClick={() => onViewTransactions(method)}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
        >
          <History size={13} className="text-blue-500" /> View Transactions
        </button>
        <button
          onClick={() => onManageLimits(method)}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
        >
          <Edit2 size={13} className="text-blue-500" /> Manage Limits
        </button>
        <button
          onClick={() => onDeactivateToggle(method)}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-red-200 dark:border-red-900 text-[12px] font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
        >
          <Power size={13} /> {method.status === 'Active' ? 'Deactivate Method' : 'Activate Method'}
        </button>
      </div>
    </div>
  );
}

// ── Add / Edit Method Modal ─────────────────────────────────────
function MethodFormModal({
  type, initial, onClose, onSave,
}: {
  type: PaymentMethodType;
  initial: PaymentMethod | null; // null = creating new
  onClose: () => void;
  onSave: (m: PaymentMethod) => void;
}) {
  const isEdit = !!initial;
  const [name, setName] = useState(initial?.name ?? '');
  const [provider, setProvider] = useState(initial?.provider ?? '');
  const [countryCount, setCountryCount] = useState(initial?.countryCount ?? 1);
  const [currencies, setCurrencies] = useState<string[]>(initial?.currencies ?? ['GBP']);
  const [transactionFeePct, setTransactionFeePct] = useState(initial?.transactionFeePct ?? 1.0);
  const [minTransaction, setMinTransaction] = useState(initial?.minTransaction ?? 10);
  const [maxTransaction, setMaxTransaction] = useState(initial?.maxTransaction ?? 5000);
  const [dailyLimit, setDailyLimit] = useState(initial?.dailyLimit ?? 10000);
  const [limitCurrency, setLimitCurrency] = useState(initial?.limitCurrency ?? currencies[0] ?? 'GBP');
  const [status, setStatus] = useState<PaymentMethodStatus>(initial?.status ?? 'Active');
  const [error, setError] = useState('');

  const toggleCurrency = (code: string) => {
    setCurrencies(prev => {
      const next = prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code];
      return next.length === 0 ? prev : next; // require at least one
    });
  };

  const handleSave = () => {
    if (!name.trim() || !provider.trim()) {
      setError('Method name and provider are required.');
      return;
    }
    if (currencies.length === 0) {
      setError('Select at least one currency.');
      return;
    }
    const saved: PaymentMethod = {
      id: initial?.id ?? `pm-${type.replace(/\s+/g, '').toLowerCase()}-${Date.now()}`,
      type,
      name: name.trim(),
      provider: provider.trim(),
      iconBg: initial?.iconBg ?? ICON_BG_OPTIONS[Math.floor(Math.random() * ICON_BG_OPTIONS.length)],
      countryCount: Number(countryCount) || 1,
      currencies,
      transactionFeePct: Number(transactionFeePct) || 0,
      status,
      transactions: initial?.transactions ?? 0,
      minTransaction: Number(minTransaction) || 0,
      maxTransaction: Number(maxTransaction) || 0,
      dailyLimit: Number(dailyLimit) || 0,
      limitCurrency: limitCurrency || currencies[0],
      connectedOn: initial?.connectedOn ?? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      weeklyTransactions: initial?.weeklyTransactions ?? 0,
      weeklyTransactionsChangePct: initial?.weeklyTransactionsChangePct ?? 0,
      weeklyVolume: initial?.weeklyVolume ?? 0,
      weeklyVolumeCurrency: initial?.weeklyVolumeCurrency ?? currencies[0],
      weeklyVolumeChangePct: initial?.weeklyVolumeChangePct ?? 0,
      successRatePct: initial?.successRatePct ?? 100,
      successRateChangePct: initial?.successRateChangePct ?? 0,
      icon: '',
      providerLogo: '',
      countries: []
    };
    onSave(saved);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-[14px] font-semibold text-gray-900 dark:text-white">
            {isEdit ? `Edit ${type} Method` : `Add ${type} Method`}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {error && (
            <div className="text-[12px] text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-1 block">Method Name *</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. UK Faster Payments"
                className="w-full text-[13px] px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent outline-none focus:border-blue-500 text-gray-800 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-1 block">Provider / Partner *</label>
              <input
                value={provider}
                onChange={e => setProvider(e.target.value)}
                placeholder="e.g. Barclays"
                className="w-full text-[13px] px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent outline-none focus:border-blue-500 text-gray-800 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-1 block">Countries Supported</label>
              <input
                type="number"
                min={1}
                value={countryCount}
                onChange={e => setCountryCount(Number(e.target.value))}
                className="w-full text-[13px] px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent outline-none focus:border-blue-500 text-gray-800 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-1 block">Transaction Fee (%)</label>
              <input
                type="number"
                step="0.01"
                value={transactionFeePct}
                onChange={e => setTransactionFeePct(Number(e.target.value))}
                className="w-full text-[13px] px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent outline-none focus:border-blue-500 text-gray-800 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-1 block">Min Transaction</label>
              <input
                type="number"
                value={minTransaction}
                onChange={e => setMinTransaction(Number(e.target.value))}
                className="w-full text-[13px] px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent outline-none focus:border-blue-500 text-gray-800 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-1 block">Max Transaction</label>
              <input
                type="number"
                value={maxTransaction}
                onChange={e => setMaxTransaction(Number(e.target.value))}
                className="w-full text-[13px] px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent outline-none focus:border-blue-500 text-gray-800 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-1 block">Daily Limit</label>
              <input
                type="number"
                value={dailyLimit}
                onChange={e => setDailyLimit(Number(e.target.value))}
                className="w-full text-[13px] px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent outline-none focus:border-blue-500 text-gray-800 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-1 block">Limit Currency</label>
              <select
                value={limitCurrency}
                onChange={e => setLimitCurrency(e.target.value)}
                className="w-full text-[13px] px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent outline-none text-gray-800 dark:text-gray-100"
              >
                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">Supported Currencies *</label>
            <div className="flex flex-wrap gap-1.5">
              {ALL_CURRENCIES.map(code => (
                <button
                  key={code}
                  type="button"
                  onClick={() => toggleCurrency(code)}
                  className={`text-[12px] px-2.5 py-1 rounded-full border transition-colors ${currencies.includes(code)
                    ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400'
                    : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">Status</label>
            <div className="flex gap-2">
              {(['Active', 'Inactive'] as PaymentMethodStatus[]).map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`flex-1 text-[12px] py-1.5 rounded-lg border font-medium transition-colors ${status === s
                    ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400'
                    : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[12px] font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 text-[12px] font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          >
            <Check size={13} /> {isEdit ? 'Save Changes' : 'Add Method'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete confirmation modal ───────────────────────────────────
function DeleteConfirmModal({ method, onCancel, onConfirm }: { method: PaymentMethod; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-sm p-5">
        <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white mb-2">Remove Payment Method</h3>
        <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-4">
          Are you sure you want to remove <span className="font-medium text-gray-700 dark:text-gray-200">{method.name}</span>? This cannot be undone.
        </p>
        <div className="flex items-center justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 text-[12px] font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 text-[12px] font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Shared Category Page ───────────────────────────────────────
export default function CashPickupPage() {
  const type: PaymentMethodType = 'Cash Pickup';

  const [methods, setMethods] = useState<PaymentMethod[]>(paymentMethods.filter(m => m.type === type));

  const [search, setSearch] = useState('');
  const [countryFilter, setCountryFilter] = useState('All');
  const [currencyFilter, setCurrencyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [selected, setSelected] = useState<PaymentMethod | undefined>(methods[0]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [modalMode, setModalMode] = useState<'none' | 'add' | 'edit'>('none');
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PaymentMethod | null>(null);

  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const countryOptions = useMemo(
    () => Array.from(new Set(methods.map(m => m.countryCount))).sort((a, b) => a - b),
    [methods]
  );
  const currencyOptions = useMemo(
    () => Array.from(new Set(methods.flatMap(m => m.currencies))).sort(),
    [methods]
  );

  const filteredRows = methods.filter(m => {
    if (search) {
      const q = search.toLowerCase();
      if (!m.name.toLowerCase().includes(q) && !m.provider.toLowerCase().includes(q)) return false;
    }
    if (countryFilter !== 'All' && String(m.countryCount) !== countryFilter) return false;
    if (currencyFilter !== 'All' && !m.currencies.includes(currencyFilter)) return false;
    if (statusFilter !== 'All' && m.status !== statusFilter) return false;
    return true;
  });

  const openAddModal = () => {
    setEditingMethod(null);
    setModalMode('add');
  };

  const openEditModal = (m: PaymentMethod) => {
    setEditingMethod(m);
    setModalMode('edit');
  };

  const closeModal = () => {
    setModalMode('none');
    setEditingMethod(null);
  };

  const handleSaveMethod = (saved: PaymentMethod) => {
    const exists = methods.some(m => m.id === saved.id);
    if (exists) {
      setMethods(prev => prev.map(m => (m.id === saved.id ? saved : m)));
      showToast(`"${saved.name}" updated successfully`);
    } else {
      setMethods(prev => [saved, ...prev]);
      showToast(`"${saved.name}" added successfully`);
    }
    setSelected(saved);
    closeModal();
  };

  const handleDeactivateToggle = (m: PaymentMethod) => {
    const nextStatus: PaymentMethodStatus = m.status === 'Active' ? 'Inactive' : 'Active';
    const updated = { ...m, status: nextStatus };
    setMethods(prev => prev.map(x => (x.id === m.id ? updated : x)));
    if (selected?.id === m.id) setSelected(updated);
    showToast(`"${m.name}" ${nextStatus === 'Active' ? 'activated' : 'deactivated'}`);
  };

  const handleDeleteConfirmed = () => {
    if (!deleteTarget) return;
    setMethods(prev => prev.filter(m => m.id !== deleteTarget.id));
    if (selected?.id === deleteTarget.id) {
      setSelected(methods.find(m => m.id !== deleteTarget.id));
    }
    showToast(`"${deleteTarget.name}" removed`);
    setDeleteTarget(null);
  };

  return (
    <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen relative" onClick={() => setOpenMenuId(null)}>
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-gray-900 text-white text-[12px] px-4 py-2.5 rounded-lg shadow-lg dark:bg-white dark:text-gray-900 flex items-center gap-2">
          <Check size={14} className="text-emerald-400 dark:text-emerald-600" />
          {toast}
        </div>
      )}

      {/* header */}
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">{type}</h1>
        <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
          <span>Dashboard</span><ChevronRight size={12} />
          <span>Payment Methods</span><ChevronRight size={12} />
          <span className="text-gray-700 dark:text-gray-300 font-medium">{type}</span>
        </div>
      </div>

      <CategorySummaryCard type={type} rows={methods} onAddClick={openAddModal} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
            <FilterBar
              search={search} setSearch={setSearch}
              countryFilter={countryFilter} setCountryFilter={setCountryFilter} countryOptions={countryOptions}
              currencyFilter={currencyFilter} setCurrencyFilter={setCurrencyFilter} currencyOptions={currencyOptions}
              statusFilter={statusFilter} setStatusFilter={setStatusFilter}
              onMoreFilters={() => showToast('Advanced filters panel would open here')}
            />
            <MethodsTable
              rows={filteredRows}
              selectedId={selected?.id ?? ''}
              onSelect={setSelected}
              onEdit={openEditModal}
              onDeactivateToggle={handleDeactivateToggle}
              onDelete={(m) => setDeleteTarget(m)}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          {selected && (
            <MethodDetailsPanel
              method={selected}
              onClose={() => setSelected(undefined)}
              onEdit={openEditModal}
              onDeactivateToggle={handleDeactivateToggle}
              onViewTransactions={(m) => showToast(`Opening transaction history for "${m.name}"`)}
              onManageLimits={(m) => openEditModal(m)}
            />
          )}
        </div>
      </div>

      {/* Add / Edit modal */}
      {modalMode !== 'none' && (
        <MethodFormModal
          type={type}
          initial={editingMethod}
          onClose={closeModal}
          onSave={handleSaveMethod}
        />
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <DeleteConfirmModal
          method={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirmed}
        />
      )}
    </div>
  );
}