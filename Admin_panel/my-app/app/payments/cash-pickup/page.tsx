'use client';

import { useState } from 'react';
import {
  ChevronRight, Search, ChevronDown, Filter, Pencil, MoreVertical, X,
  Building2, Smartphone, Eye, CreditCard, Edit2, History, Power, Plus,
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

// ── Category summary banner (top) ──────────────────────────────
function CategorySummaryCard({ type }: { type: PaymentMethodType }) {
  const stat = paymentCategoryStats.find(c => c.type === type)!;
  const Icon = categoryIcon[type];
  const rows = paymentMethods.filter(m => m.type === type);
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
        <button className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 cursor-pointer whitespace-nowrap">
          <Plus size={14} /> Add {type} Method
        </button>
      </div>
    </div>
  );
}

// ── Filter bar ────────────────────────────────────────────────
function FilterBar({ search, setSearch }: { search: string; setSearch: (v: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
      <div className="flex items-center gap-2 flex-1 min-w-[160px] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
        <Search size={14} className="text-gray-400 dark:text-gray-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search methods or provider..."
          className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
      </div>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
        All Countries <ChevronDown size={13} />
      </button>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
        All Currencies <ChevronDown size={13} />
      </button>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
        All Status <ChevronDown size={13} />
      </button>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
        <Filter size={13} /> Filters
      </button>
    </div>
  );
}

// ── Methods table ─────────────────────────────────────────────
function MethodsTable({
  rows, selectedId, onSelect,
}: { rows: PaymentMethod[]; selectedId: string; onSelect: (m: PaymentMethod) => void }) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[760px]">
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
                  <div className="flex items-center justify-end gap-2">
                    <button className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                      <Pencil size={13} />
                    </button>
                    <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">
                      <MoreVertical size={14} />
                    </button>
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
function MethodDetailsPanel({ method }: { method: PaymentMethod }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Method Details</h3>
        <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">
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

      <button className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer mb-4">
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
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
          <History size={13} className="text-blue-500" /> View Transactions
        </button>
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
          <Edit2 size={13} className="text-blue-500" /> Manage Limits
        </button>
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-red-200 dark:border-red-900 text-[12px] font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer">
          <Power size={13} /> {method.status === 'Active' ? 'Deactivate Method' : 'Activate Method'}
        </button>
      </div>
    </div>
  );
}

// ── Shared Category Page ───────────────────────────────────────
export default function CashPickupPage() {
  const type: PaymentMethodType = 'Cash Pickup';
  const [search, setSearch] = useState('');
  const categoryRows = paymentMethods.filter(m => m.type === type);
  const [selected, setSelected] = useState<PaymentMethod>(categoryRows[0]);

  const filteredRows = categoryRows.filter(m => {
    if (!search) return true;
    const q = search.toLowerCase();
    return m.name.toLowerCase().includes(q) || m.provider.toLowerCase().includes(q);
  });

  return (
    <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* header */}
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">{type}</h1>
        <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
          <span>Dashboard</span><ChevronRight size={12} />
          <span>Payment Methods</span><ChevronRight size={12} />
          <span className="text-gray-700 dark:text-gray-300 font-medium">{type}</span>
        </div>
      </div>

      <CategorySummaryCard type={type} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
            <FilterBar search={search} setSearch={setSearch} />
            <MethodsTable rows={filteredRows} selectedId={selected?.id ?? ''} onSelect={setSelected} />
          </div>
        </div>

        <div className="lg:col-span-1">
          {selected && <MethodDetailsPanel method={selected} />}
        </div>
      </div>
    </div>
  );
}