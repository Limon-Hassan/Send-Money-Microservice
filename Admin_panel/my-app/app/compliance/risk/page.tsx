'use client';

import { useState } from 'react';
import {
  ChevronRight, Search, Download, X, Eye, Pencil, Power, Gauge,
  TrendingUp, TrendingDown, Minus, Users, ShieldAlert,
} from 'lucide-react';
import {
  customerRiskScores,
  riskRules,
  riskManagementStats,
  riskRuleCategoryOptions,
  riskRuleStatusOptions,
  riskLevelOptionsFull,
  CustomerRiskScore,
  RiskRule,
  AlertRiskLevel,
  RiskRuleStatus,
} from '@/lib/data';

import { flagForCountryName } from '@/lib/countries_data';



// ── helpers ───────────────────────────────────────────────────

function CountryFlag({ country, size = 'w-4 h-4' }: { country: string; size?: string }) {
  return (
    <img
      src={flagForCountryName(country)}
      alt={country}
      className={`${size} rounded-full object-cover inline-block shrink-0`}
    />
  );
}



const riskLevelClasses: Record<AlertRiskLevel, string> = {
  Low: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
  Medium: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
  High: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
  Critical: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
};

const ruleStatusClasses: Record<RiskRuleStatus, string> = {
  Active: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
  Inactive: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
};

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
  if (trend === 'up') return <TrendingUp size={12} className="text-red-500 dark:text-red-400" />;
  if (trend === 'down') return <TrendingDown size={12} className="text-emerald-500 dark:text-emerald-400" />;
  return <Minus size={12} className="text-gray-400 dark:text-gray-500" />;
};

const TABS = ['Customer Risk Scores', 'Risk Rules'] as const;

// ── Stat cards ────────────────────────────────────────────────
function StatCards() {
  const s = riskManagementStats;
  const cards = [
    { label: 'Total Scored', value: s.totalScored.toLocaleString(), icon: Users, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950' },
    { label: 'Low Risk', value: s.lowRisk.toLocaleString(), icon: ShieldAlert, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950' },
    { label: 'Medium Risk', value: s.mediumRisk.toLocaleString(), icon: ShieldAlert, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950' },
    { label: 'High Risk', value: s.highRisk.toLocaleString(), icon: ShieldAlert, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950' },
    { label: 'Critical Risk', value: s.criticalRisk.toLocaleString(), icon: ShieldAlert, color: 'text-red-700 dark:text-red-300', bg: 'bg-red-100 dark:bg-red-900' },
    { label: 'Avg Risk Score', value: s.avgRiskScore.toString(), icon: Gauge, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950' },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
      {cards.map(c => (
        <div key={c.label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[11px] text-gray-400 dark:text-gray-500">{c.label}</p>
            <span className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${c.bg} ${c.color}`}>
              <c.icon size={12} />
            </span>
          </div>
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
          className={`pb-2.5 text-[13px] font-medium border-b-2 -mb-px transition-colors cursor-pointer whitespace-nowrap ${active === tab
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

// ── Pagination footer (reusable) ──────────────────────────────
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
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
          className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">‹</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button key={p} onClick={() => setPage(p)}
            className={`px-2.5 py-1 rounded cursor-pointer ${p === currentPage ? 'bg-blue-600 text-white' : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
            {p}
          </button>
        ))}
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
          className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">›</button>
      </div>
      <select className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded px-2 py-1 text-[12px] text-gray-600 dark:text-gray-300">
        <option>10 / page</option><option>20 / page</option><option>50 / page</option>
      </select>
    </div>
  );
}

// ── Customer Risk Scores Table ─────────────────────────────────
function CustomerRiskTable({
  rows, search, setSearch, levelFilter, setLevelFilter, onView,
}: {
  rows: CustomerRiskScore[]; search: string; setSearch: (v: string) => void;
  levelFilter: string; setLevelFilter: (v: string) => void; onView: (c: CustomerRiskScore) => void;
}) {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
        <div className="flex items-center gap-2 flex-1 min-w-45 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
          <Search size={14} className="text-gray-400 dark:text-gray-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search customer name or ID..."
            className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>
        <select value={levelFilter} onChange={e => setLevelFilter(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none">
          {riskLevelOptionsFull.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer sm:ml-auto">
          <Download size={13} /> Export
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-230">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
              <th className="px-4 py-2.5 font-medium">Customer</th>
              <th className="px-2 py-2.5 font-medium">Country</th>
              <th className="px-2 py-2.5 font-medium">Risk Score</th>
              <th className="px-2 py-2.5 font-medium">KYC Tier</th>
              <th className="px-2 py-2.5 font-medium">Top Risk Factor</th>
              <th className="px-2 py-2.5 font-medium">Trend</th>
              <th className="px-2 py-2.5 font-medium">Last Assessed</th>
              <th className="px-2 py-2.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map(c => (
              <tr key={c.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <p className="text-[13px] font-medium text-gray-800 dark:text-gray-100">{c.customerName}</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500">{c.customerId}</p>
                </td>
                <td className="px-2 py-2.5 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-600 dark:text-gray-300"><CountryFlag country={c.country}  /> {c.country}</span>
                </td>
                <td className="px-2 py-2.5 whitespace-nowrap">
                  <span className="text-[13px] font-bold text-gray-900 dark:text-white">{c.riskScore}</span>
                  <span className={`ml-1.5 text-[10px] font-medium px-1.5 py-0.5 rounded ${riskLevelClasses[c.riskLevel]}`}>{c.riskLevel}</span>
                </td>
                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{c.kycTier}</td>
                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap max-w-50 truncate">{c.topFactor}</td>
                <td className="px-2 py-2.5 whitespace-nowrap"><TrendIcon trend={c.trend} /></td>
                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{c.lastAssessed}</td>
                <td className="px-2 py-2.5 text-right whitespace-nowrap">
                  <button onClick={() => onView(c)} className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                    <Eye size={13} />
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">No customers match your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <PaginationFooter totalRows={rows.length} label="customers" page={page} setPage={setPage} pageSize={pageSize} />
    </>
  );
}

// ── Risk Rules Table ────────────────────────────────────────────
function RiskRulesTable({
  rows, search, setSearch, categoryFilter, setCategoryFilter, statusFilter, setStatusFilter, onToggleStatus,
}: {
  rows: RiskRule[]; search: string; setSearch: (v: string) => void;
  categoryFilter: string; setCategoryFilter: (v: string) => void;
  statusFilter: string; setStatusFilter: (v: string) => void;
  onToggleStatus: (id: string) => void;
}) {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
        <div className="flex items-center gap-2 flex-1 min-w-45 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
          <Search size={14} className="text-gray-400 dark:text-gray-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search rule name..."
            className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none">
          {riskRuleCategoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none">
          {riskRuleStatusOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-230">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
              <th className="px-4 py-2.5 font-medium">Rule Name</th>
              <th className="px-2 py-2.5 font-medium">Category</th>
              <th className="px-2 py-2.5 font-medium">Weight</th>
              <th className="px-2 py-2.5 font-medium">Triggers (30d)</th>
              <th className="px-2 py-2.5 font-medium">Status</th>
              <th className="px-2 py-2.5 font-medium">Last Updated</th>
              <th className="px-2 py-2.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map(r => (
              <tr key={r.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <p className="text-[13px] font-medium text-gray-800 dark:text-gray-100">{r.name}</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 max-w-65 truncate">{r.description}</p>
                </td>
                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.category}</td>
                <td className="px-2 py-2.5 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${r.weight * 2}%` }} />
                    </div>
                    <span className="text-[12px] text-gray-700 dark:text-gray-200">{r.weight}</span>
                  </div>
                </td>
                <td className="px-2 py-2.5 text-[12px] font-medium text-gray-900 dark:text-white whitespace-nowrap">{r.triggerCount}</td>
                <td className="px-2 py-2.5 whitespace-nowrap">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${ruleStatusClasses[r.status]}`}>{r.status}</span>
                </td>
                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{r.lastUpdated}</td>
                <td className="px-2 py-2.5 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    <button className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"><Pencil size={13} /></button>
                    <button
                      onClick={() => onToggleStatus(r.id)}
                      className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                      title={r.status === 'Active' ? 'Deactivate' : 'Activate'}
                    >
                      <Power size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">No rules match your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <PaginationFooter totalRows={rows.length} label="rules" page={page} setPage={setPage} pageSize={pageSize} />
    </>
  );
}

// ── Customer Detail Modal ───────────────────────────────────────
function CustomerDetailModal({ customer, onClose }: { customer: CustomerRiskScore; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-5" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white">Customer Risk Profile</h3>
          <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><X size={16} /></button>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[14px] font-semibold text-gray-900 dark:text-white">{customer.customerName}</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500">{customer.customerId} · {customer.flag} {customer.country}</p>
          </div>
          <div className="text-right">
            <p className="text-[22px] font-bold text-gray-900 dark:text-white">{customer.riskScore}</p>
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${riskLevelClasses[customer.riskLevel]}`}>{customer.riskLevel}</span>
          </div>
        </div>
        <div className="space-y-2 bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
          {[
            ['KYC Tier', customer.kycTier],
            ['Top Risk Factor', customer.topFactor],
            ['Trend', customer.trend === 'up' ? 'Increasing' : customer.trend === 'down' ? 'Decreasing' : 'Stable'],
            ['Last Assessed', customer.lastAssessed],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between text-[12px]">
              <span className="text-gray-400 dark:text-gray-500">{label}</span>
              <span className="text-gray-700 dark:text-gray-200 font-medium text-right">{value}</span>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="w-full mt-5 px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 cursor-pointer">
          Close
        </button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function RiskManagementPage() {
  const [activeTab, setActiveTab] = useState<string>('Customer Risk Scores');
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('All Levels');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [rules, setRules] = useState(riskRules);
  const [viewing, setViewing] = useState<CustomerRiskScore | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearch('');
    setLevelFilter('All Levels');
    setCategoryFilter('All Categories');
    setStatusFilter('All Status');
  };

  const toggleRuleStatus = (id: string) => {
    setRules(prev => prev.map(r => (r.id === id ? { ...r, status: r.status === 'Active' ? 'Inactive' : 'Active' } : r)));
    showToast('Rule status updated');
  };

  const filteredCustomers = customerRiskScores.filter(c => {
    if (levelFilter !== 'All Levels' && c.riskLevel !== levelFilter) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return c.customerName.toLowerCase().includes(q) || c.customerId.toLowerCase().includes(q);
  });

  const filteredRules = rules.filter(r => {
    if (categoryFilter !== 'All Categories' && r.category !== categoryFilter) return false;
    if (statusFilter !== 'All Status' && r.status !== statusFilter) return false;
    if (!search) return true;
    return r.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Risk Management</h1>
        <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
          <span>Dashboard</span><ChevronRight size={12} />
          <span>KYC & Compliance</span><ChevronRight size={12} />
          <span className="text-gray-700 dark:text-gray-300 font-medium">Risk Management</span>
        </div>
      </div>

      <StatCards />

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
        <PageTabs active={activeTab} setActive={handleTabChange} />
        {activeTab === 'Customer Risk Scores' ? (
          <CustomerRiskTable
            rows={filteredCustomers} search={search} setSearch={setSearch}
            levelFilter={levelFilter} setLevelFilter={setLevelFilter} onView={setViewing}
          />
        ) : (
          <RiskRulesTable
            rows={filteredRules} search={search} setSearch={setSearch}
            categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
            statusFilter={statusFilter} setStatusFilter={setStatusFilter}
            onToggleStatus={toggleRuleStatus}
          />
        )}
      </div>

      {viewing && <CustomerDetailModal customer={viewing} onClose={() => setViewing(null)} />}

      {toast && (
        <div className="fixed bottom-5 right-5 bg-gray-900 dark:bg-gray-700 text-white text-[12px] px-4 py-2.5 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}