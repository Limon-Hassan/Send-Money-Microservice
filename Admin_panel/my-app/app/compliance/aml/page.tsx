'use client';

import { useState } from 'react';
import {
  ChevronRight, Search, Download, X, Eye, ShieldAlert, AlertOctagon, CheckCircle2, Gauge, Check,
} from 'lucide-react';
import {
  amlMonitoringAlerts,
  amlMonitoringStats,
  amlAlertTypeOptions,
  amlRiskLevelOptions,
  amlStatusOptionsFull,
  AmlMonitoringAlert,
  AlertRiskLevel,
  AlertStatus,
} from '@/lib/data';

// ── helpers ───────────────────────────────────────────────────
const riskLevelClasses: Record<AlertRiskLevel, string> = {
  Low: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
  Medium: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
  High: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
  Critical: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
};

const statusClasses: Record<AlertStatus, string> = {
  New: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
  'Under Review': 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
  Escalated: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
  Cleared: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
};

const currencySymbol: Record<string, string> = { BDT: '৳', PHP: '₱', GBP: '£', USD: '$', INR: '₹', EUR: '€', NGN: '₦', AED: 'AED ' };
const sym = (c: string) => currencySymbol[c] ?? '';

// ── Stat cards ────────────────────────────────────────────────
function StatCards() {
  const s = amlMonitoringStats;
  const cards = [
    { label: 'Total Alerts', value: s.totalAlerts, icon: ShieldAlert, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950' },
    { label: 'New', value: s.newAlerts, icon: AlertOctagon, color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950' },
    { label: 'Under Review', value: s.underReview, icon: Gauge, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950' },
    { label: 'Escalated', value: s.escalated, icon: AlertOctagon, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950' },
    { label: 'Cleared', value: s.cleared, icon: CheckCircle2, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950' },
    { label: 'Avg Risk Score', value: s.avgRiskScore, icon: Gauge, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950' },
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

// ── Filter bar ────────────────────────────────────────────────
function FilterBar({
  search, setSearch, typeFilter, setTypeFilter, riskFilter, setRiskFilter, statusFilter, setStatusFilter,
}: {
  search: string; setSearch: (v: string) => void;
  typeFilter: string; setTypeFilter: (v: string) => void;
  riskFilter: string; setRiskFilter: (v: string) => void;
  statusFilter: string; setStatusFilter: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
      <div className="flex items-center gap-2 flex-1 min-w-[180px] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
        <Search size={14} className="text-gray-400 dark:text-gray-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search alert ID, transaction, or customer..."
          className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
      </div>
      <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
        className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none">
        {amlAlertTypeOptions.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <select value={riskFilter} onChange={e => setRiskFilter(e.target.value)}
        className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none">
        {amlRiskLevelOptions.map(r => <option key={r} value={r}>{r}</option>)}
      </select>
      <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
        className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none">
        {amlStatusOptionsFull.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer sm:ml-auto">
        <Download size={13} /> Export
      </button>
    </div>
  );
}

// ── Alerts Table ──────────────────────────────────────────────
function AlertsTable({ rows, onView }: { rows: AmlMonitoringAlert[]; onView: (a: AmlMonitoringAlert) => void }) {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[1080px]">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
              <th className="px-4 py-2.5 font-medium">Alert ID</th>
              <th className="px-2 py-2.5 font-medium">Transaction No.</th>
              <th className="px-2 py-2.5 font-medium">Customer</th>
              <th className="px-2 py-2.5 font-medium">Country</th>
              <th className="px-2 py-2.5 font-medium">Amount</th>
              <th className="px-2 py-2.5 font-medium">Risk Score</th>
              <th className="px-2 py-2.5 font-medium">Alert Type</th>
              <th className="px-2 py-2.5 font-medium">Status</th>
              <th className="px-2 py-2.5 font-medium">Officer</th>
              <th className="px-2 py-2.5 font-medium">Review Date</th>
              <th className="px-2 py-2.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map(r => (
              <tr key={r.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                <td className="px-4 py-2.5 text-[12px] text-blue-600 dark:text-blue-400 font-medium whitespace-nowrap">{r.id}</td>
                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.transactionNo}</td>
                <td className="px-2 py-2.5 whitespace-nowrap">
                  <p className="text-[12px] text-gray-700 dark:text-gray-300">{r.customerName}</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500">{r.customerId}</p>
                </td>
                <td className="px-2 py-2.5 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-600 dark:text-gray-300">{r.flag} {r.country}</span>
                </td>
                <td className="px-2 py-2.5 whitespace-nowrap">
                  <p className="text-[13px] font-semibold text-gray-900 dark:text-white">{sym(r.currency)}{r.amount.toLocaleString()}</p>
                </td>
                <td className="px-2 py-2.5 whitespace-nowrap">
                  <span className="text-[12px] font-semibold text-gray-800 dark:text-gray-100">{r.riskScore}</span>
                  <span className={`ml-1.5 text-[10px] font-medium px-1.5 py-0.5 rounded ${riskLevelClasses[r.riskLevel]}`}>{r.riskLevel}</span>
                </td>
                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.alertType}</td>
                <td className="px-2 py-2.5 whitespace-nowrap">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusClasses[r.status]}`}>{r.status}</span>
                </td>
                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.assignedOfficer}</td>
                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{r.reviewDate}</td>
                <td className="px-2 py-2.5 text-right whitespace-nowrap">
                  <button onClick={() => onView(r)} className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                    <Eye size={13} />
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={11} className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">No alerts match your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
        <span>Showing {pageRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {(currentPage - 1) * pageSize + pageRows.length} of {rows.length} alerts</span>
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
    </>
  );
}

// ── View / Update Alert Modal ───────────────────────────────────
function AlertDetailModal({
  alert, onClose, onUpdateStatus,
}: { alert: AmlMonitoringAlert; onClose: () => void; onUpdateStatus: (id: string, status: AlertStatus) => void }) {
  const [status, setStatus] = useState<AlertStatus>(alert.status);
  const STATUSES: AlertStatus[] = ['New', 'Under Review', 'Escalated', 'Cleared'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg p-5 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white">Alert Details — {alert.id}</h3>
          <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><X size={16} /></button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[14px] font-semibold text-gray-900 dark:text-white">{alert.customerName}</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500">{alert.customerId} · {alert.flag} {alert.country}</p>
          </div>
          <div className="text-right">
            <span className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">{alert.riskScore}</span>
            <span className={`ml-1.5 text-[11px] font-medium px-2 py-0.5 rounded ${riskLevelClasses[alert.riskLevel]}`}>{alert.riskLevel}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
          {[
            ['Transaction No.', alert.transactionNo],
            ['Amount', `${sym(alert.currency)}${alert.amount.toLocaleString()} ${alert.currency}`],
            ['Alert Type', alert.alertType],
            ['Rule Triggered', alert.ruleTriggered],
            ['Assigned Officer', alert.assignedOfficer],
            ['Created At', alert.createdAt],
            ['Review Date', alert.reviewDate],
          ].map(([label, value]) => (
            <div key={label} className="flex items-start justify-between text-[12px] gap-3">
              <span className="text-gray-400 dark:text-gray-500 shrink-0">{label}</span>
              <span className="text-gray-700 dark:text-gray-200 font-medium text-right">{value}</span>
            </div>
          ))}
        </div>

        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1.5 block">Update Status</label>
        <div className="grid grid-cols-2 gap-2 mb-5">
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border text-[12px] font-medium cursor-pointer transition-colors ${status === s
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
            >
              {status === s && <Check size={12} />} {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={onClose} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
            Cancel
          </button>
          <button
            onClick={() => { onUpdateStatus(alert.id, status); onClose(); }}
            className="flex-1 px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function AmlMonitoringPage() {
  const [alerts, setAlerts] = useState(amlMonitoringAlerts);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [riskFilter, setRiskFilter] = useState('All Levels');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [viewing, setViewing] = useState<AmlMonitoringAlert | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const handleUpdateStatus = (id: string, status: AlertStatus) => {
    setAlerts(prev => prev.map(a => (a.id === id ? { ...a, status } : a)));
    showToast(`${id} updated to ${status}`);
  };

  const filteredRows = alerts.filter(a => {
    if (typeFilter !== 'All Types' && a.alertType !== typeFilter) return false;
    if (riskFilter !== 'All Levels' && a.riskLevel !== riskFilter) return false;
    if (statusFilter !== 'All Status' && a.status !== statusFilter) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return a.id.toLowerCase().includes(q) || a.transactionNo.toLowerCase().includes(q) || a.customerName.toLowerCase().includes(q);
  });

  return (
    <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">AML Monitoring</h1>
        <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
          <span>Dashboard</span><ChevronRight size={12} />
          <span>KYC & Compliance</span><ChevronRight size={12} />
          <span className="text-gray-700 dark:text-gray-300 font-medium">AML Monitoring</span>
        </div>
      </div>

      <StatCards />

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
        <FilterBar
          search={search} setSearch={setSearch}
          typeFilter={typeFilter} setTypeFilter={setTypeFilter}
          riskFilter={riskFilter} setRiskFilter={setRiskFilter}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        />
        <AlertsTable rows={filteredRows} onView={setViewing} />
      </div>

      {viewing && (
        <AlertDetailModal alert={viewing} onClose={() => setViewing(null)} onUpdateStatus={handleUpdateStatus} />
      )}

      {toast && (
        <div className="fixed bottom-5 right-5 bg-gray-900 dark:bg-gray-700 text-white text-[12px] px-4 py-2.5 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}