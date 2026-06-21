'use client';

import { useState } from 'react';
import {
  ChevronRight, Search, Download, X, Eye, FileText, AlertOctagon, LogIn, Users, Calendar,
} from 'lucide-react';
import {
  auditLogDetails,
  auditLogsStats,
  auditModuleOptions,
  auditSeverityOptions,
  AuditLogDetail,
  AuditLogSeverity,
} from '@/lib/data';


const severityClasses: Record<AuditLogSeverity, string> = {
  Info: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
  Warning: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
  Critical: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
};

const moduleClasses: Record<string, string> = {
  Transactions: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
  'Exchange Rates': 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
  'Pickup Requests': 'bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400',
  Authentication: 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400',
  Customers: 'bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400',
  Agents: 'bg-pink-50 text-pink-600 dark:bg-pink-950 dark:text-pink-400',
  'Payment Methods': 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400',
  KYC: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
  Settings: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  Wallets: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400',
};

// ── Stat cards ────────────────────────────────────────────────
function StatCards() {
  const s = auditLogsStats;
  const cards = [
    { label: 'Total Events Today', value: s.totalEventsToday.toLocaleString(), icon: FileText, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950' },
    { label: 'Critical Events', value: s.criticalEvents.toString(), icon: AlertOctagon, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950' },
    { label: 'Failed Logins', value: s.failedLogins.toString(), icon: LogIn, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950' },
    { label: 'Unique Users', value: s.uniqueUsers.toString(), icon: Users, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950' },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
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
  search, setSearch, moduleFilter, setModuleFilter, severityFilter, setSeverityFilter,
}: {
  search: string; setSearch: (v: string) => void;
  moduleFilter: string; setModuleFilter: (v: string) => void;
  severityFilter: string; setSeverityFilter: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
      <div className="flex items-center gap-2 flex-1 min-w-45 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
        <Search size={14} className="text-gray-400 dark:text-gray-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search user, action, or IP address..."
          className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
      </div>
      <select value={moduleFilter} onChange={e => setModuleFilter(e.target.value)}
        className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none">
        {auditModuleOptions.map(m => <option key={m} value={m}>{m}</option>)}
      </select>
      <select value={severityFilter} onChange={e => setSeverityFilter(e.target.value)}
        className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none">
        {auditSeverityOptions.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
        <Calendar size={13} /> <span className="hidden sm:inline">Date Range</span>
      </button>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer sm:ml-auto">
        <Download size={13} /> Export
      </button>
    </div>
  );
}

// ── Logs Table ────────────────────────────────────────────────
function LogsTable({ rows, onView }: { rows: AuditLogDetail[]; onView: (l: AuditLogDetail) => void }) {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-245">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
              <th className="px-4 py-2.5 font-medium">Time</th>
              <th className="px-2 py-2.5 font-medium">User</th>
              <th className="px-2 py-2.5 font-medium">Action</th>
              <th className="px-2 py-2.5 font-medium">Module</th>
              <th className="px-2 py-2.5 font-medium">Severity</th>
              <th className="px-2 py-2.5 font-medium">IP Address</th>
              <th className="px-2 py-2.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map(l => (
              <tr key={l.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                <td className="px-4 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{l.time}</td>
                <td className="px-2 py-2.5 whitespace-nowrap">
                  <p className="text-[12px] text-gray-700 dark:text-gray-300">{l.user}</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500">{l.userRole}</p>
                </td>
                <td className="px-2 py-2.5 text-[12px] text-gray-700 dark:text-gray-200 font-medium whitespace-nowrap">{l.action}</td>
                <td className="px-2 py-2.5 whitespace-nowrap">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${moduleClasses[l.module]}`}>{l.module}</span>
                </td>
                <td className="px-2 py-2.5 whitespace-nowrap">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${severityClasses[l.severity]}`}>{l.severity}</span>
                </td>
                <td className="px-2 py-2.5 text-[11.5px] text-gray-400 dark:text-gray-500 whitespace-nowrap font-mono">{l.ipAddress}</td>
                <td className="px-2 py-2.5 text-right whitespace-nowrap">
                  <button onClick={() => onView(l)} className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                    <Eye size={13} />
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">No logs match your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
        <span>Showing {pageRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {(currentPage - 1) * pageSize + pageRows.length} of {rows.length} logs</span>
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

// ── Log Detail Modal ────────────────────────────────────────────
function LogDetailModal({ log, onClose }: { log: AuditLogDetail; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-5" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white">Audit Log Detail</h3>
          <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><X size={16} /></button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${severityClasses[log.severity]}`}>{log.severity}</span>
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${moduleClasses[log.module]}`}>{log.module}</span>
        </div>

        <div className="space-y-2 mb-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
          {[
            ['Action', log.action],
            ['User', `${log.user} (${log.userRole})`],
            ['Time', log.time],
            ['IP Address', log.ipAddress],
            ['Record ID', log.recordId ?? '—'],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between text-[12px]">
              <span className="text-gray-400 dark:text-gray-500">{label}</span>
              <span className="text-gray-700 dark:text-gray-200 font-medium text-right">{value}</span>
            </div>
          ))}
        </div>

        <div>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-1">Details</p>
          <p className="text-[12px] text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 rounded-lg p-3">{log.details}</p>
        </div>

        <button onClick={onClose} className="w-full mt-5 px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 cursor-pointer">
          Close
        </button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function AuditLogsPage() {
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All Modules');
  const [severityFilter, setSeverityFilter] = useState('All Severity');
  const [viewing, setViewing] = useState<AuditLogDetail | null>(null);

  const filteredRows = auditLogDetails.filter(l => {
    if (moduleFilter !== 'All Modules' && l.module !== moduleFilter) return false;
    if (severityFilter !== 'All Severity' && l.severity !== severityFilter) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return l.user.toLowerCase().includes(q) || l.action.toLowerCase().includes(q) || l.ipAddress.includes(q);
  });

  return (
    <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Audit Logs</h1>
        <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
          <span>Dashboard</span><ChevronRight size={12} />
          <span>KYC & Compliance</span><ChevronRight size={12} />
          <span className="text-gray-700 dark:text-gray-300 font-medium">Audit Logs</span>
        </div>
      </div>

      <StatCards />

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
        <FilterBar
          search={search} setSearch={setSearch}
          moduleFilter={moduleFilter} setModuleFilter={setModuleFilter}
          severityFilter={severityFilter} setSeverityFilter={setSeverityFilter}
        />
        <LogsTable rows={filteredRows} onView={setViewing} />
      </div>

      {viewing && <LogDetailModal log={viewing} onClose={() => setViewing(null)} />}
    </div>
  );
}