'use client';

import { useState, useMemo } from 'react';
import {
  Search, ChevronRight, CheckCircle, XCircle, AlertTriangle,
  Clock, ArrowUpRight, Filter, RefreshCw, Bell, X,
  ShieldAlert, Flame, Minus,
} from 'lucide-react';
import {
  pendingTransactions, pendingStats,
  PendingTransaction, PriorityLevel, EscalationStatus,
} from '@/lib/data';
import { flagForCountryName } from '@/lib/countries_data';

const priorityConfig: Record<PriorityLevel, { classes: string; Icon: React.ElementType; label: string }> = {
  Critical: { classes: 'bg-red-100    text-red-700    border-red-200    dark:bg-red-950    dark:text-red-400    dark:border-red-900', Icon: Flame, label: 'Critical' },
  High: { classes: 'bg-amber-100  text-amber-700  border-amber-200  dark:bg-amber-950  dark:text-amber-400  dark:border-amber-900', Icon: ArrowUpRight, label: 'High' },
  Normal: { classes: 'bg-gray-100   text-gray-500   border-gray-200   dark:bg-gray-800   dark:text-gray-400   dark:border-gray-700', Icon: Minus, label: 'Normal' },
};

const escalationConfig: Record<EscalationStatus, { classes: string; label: string } | null> = {
  None: null,
  Escalated: { classes: 'bg-red-100    text-red-700    dark:bg-red-950    dark:text-red-400', label: 'Escalated' },
  'Under Review': { classes: 'bg-blue-100   text-blue-700   dark:bg-blue-950   dark:text-blue-400', label: 'Under Review' },
};

const avatarConfig: Record<string, string> = {
  blue: 'bg-blue-100   text-blue-700   dark:bg-blue-950   dark:text-blue-400',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
  amber: 'bg-amber-100  text-amber-700  dark:bg-amber-950  dark:text-amber-400',
  red: 'bg-red-100    text-red-700    dark:bg-red-950    dark:text-red-400',
  teal: 'bg-teal-100   text-teal-700   dark:bg-teal-950   dark:text-teal-400',
  pink: 'bg-pink-100   text-pink-700   dark:bg-pink-950   dark:text-pink-400',
  rose: 'bg-rose-100   text-rose-700   dark:bg-rose-950   dark:text-rose-400',
};

const fmt = (n: number, c = 'GBP') =>
  `${c === 'GBP' ? '£' : '$'}${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;



function CountryFlag({ country, size = 'w-4 h-4' }: { country: string; size?: string }) {
  return (
    <img
      src={flagForCountryName(country)}
      alt={country}
      className={`${size} rounded-full object-cover inline-block shrink-0`}
    />
  );
}

function WaitBadge({ mins }: { mins: number }) {
  const cls = mins > 90 ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950'
    : mins > 30 ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950'
      : 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950';
  const h = Math.floor(mins / 60), m = mins % 60;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${cls}`}>
      <Clock size={10} /> {h > 0 ? `${h}h ${m}m` : `${m}m`}
    </span>
  );
}

function ConfirmModal({
  type, count, onConfirm, onCancel,
}: { type: 'approve' | 'reject'; count: number; onConfirm: () => void; onCancel: () => void }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onCancel} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl w-full max-w-sm p-6 shadow-xl">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${type === 'approve' ? 'bg-emerald-100 dark:bg-emerald-950' : 'bg-red-100 dark:bg-red-950'}`}>
            {type === 'approve'
              ? <CheckCircle size={22} className="text-emerald-600 dark:text-emerald-400" />
              : <XCircle size={22} className="text-red-600 dark:text-red-400" />}
          </div>
          <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white text-center mb-1">
            {type === 'approve' ? 'Approve' : 'Reject'} {count} Transaction{count > 1 ? 's' : ''}?
          </h3>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 text-center mb-5">
            {type === 'approve'
              ? 'Selected transactions will be approved and processed immediately.'
              : 'Selected transactions will be rejected and customers will be notified.'}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={onCancel} className="py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-[13px] font-medium hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
              Cancel
            </button>
            <button onClick={onConfirm} className={`py-2.5 rounded-lg text-white text-[13px] font-medium cursor-pointer transition-colors ${type === 'approve' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-red-600 hover:bg-red-500'}`}>
              Confirm {type === 'approve' ? 'Approve' : 'Reject'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function EscalateModal({ tx, onClose }: { tx: PendingTransaction; onClose: () => void }) {
  const [note, setNote] = useState('');
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl w-full max-w-sm p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white">Escalate Transaction</h3>
            <button onClick={onClose} className="w-7 h-7 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer">
              <X size={13} />
            </button>
          </div>
          <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-1">Transaction</p>
          <p className="text-[13px] font-semibold text-gray-900 dark:text-white mb-4 font-mono">{tx.id}</p>
          <label className="text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5 block">Escalation Note</label>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            rows={3}
            placeholder="Describe the reason for escalation..."
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-[13px] text-gray-800 dark:text-gray-200 placeholder-gray-400 outline-none focus:ring-1 focus:ring-blue-500 resize-none mb-4"
          />
          <div className="grid grid-cols-2 gap-2">
            <button onClick={onClose} className="py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-[13px] font-medium hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">Cancel</button>
            <button onClick={onClose} className="py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-[13px] font-medium cursor-pointer transition-colors">
              Escalate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function PendingTransactionsPage() {
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<PriorityLevel | 'All'>('All');
  const [escalationFilter, setEscalationFilter] = useState<EscalationStatus | 'All'>('All');
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [confirmModal, setConfirmModal] = useState<'approve' | 'reject' | null>(null);
  const [escalateTarget, setEscalateTarget] = useState<PendingTransaction | null>(null);

  const filtered = useMemo(() => pendingTransactions.filter(t => {
    const matchSearch = t.customerName.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.recipient.toLowerCase().includes(search.toLowerCase());
    const matchPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    const matchEscalation = escalationFilter === 'All' || t.escalation === escalationFilter;
    return matchSearch && matchPriority && matchEscalation;
  }), [search, priorityFilter, escalationFilter]);

  const toggleCheck = (id: string) =>
    setCheckedIds(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  const toggleAll = () =>
    setCheckedIds(prev => prev.size === filtered.length ? new Set() : new Set(filtered.map(t => t.id)));

  const selectedCount = checkedIds.size;

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[13px] text-gray-400 dark:text-gray-500 mb-1">
            <span>Transactions</span><ChevronRight size={12} />
            <span className="text-gray-900 dark:text-white font-medium">Pending</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Pending Transactions</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Review, approve, reject or escalate pending transactions</p>
        </div>
        <button className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-[12px] font-medium hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Pending', value: pendingStats.totalPending, sub: `${pendingStats.escalatedCount} escalated`, color: '' },
          { label: 'Critical', value: pendingStats.criticalCount, sub: 'immediate action needed', color: 'text-red-600 dark:text-red-400' },
          { label: 'High Priority', value: pendingStats.highCount, sub: 'action within 1 hour', color: 'text-amber-600 dark:text-amber-400' },
          { label: 'Avg Wait Time', value: `${pendingStats.avgWaitMins}m`, sub: `oldest: ${pendingStats.oldestMins}m`, color: 'text-blue-600 dark:text-blue-400' },
        ].map(({ label, value, sub, color }) => (
          <div key={label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">{label}</p>
            <p className={`text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white ${color}`}>{value}</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* filters + bulk actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mb-4">
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 sm:flex-1 sm:max-w-xs">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search ID, customer, recipient..."
            className="bg-transparent outline-none text-[13px] text-gray-800 dark:text-gray-200 placeholder-gray-400 w-full" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value as PriorityLevel | 'All')}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-[13px] text-gray-600 dark:text-gray-400 outline-none cursor-pointer">
            {['All', 'Critical', 'High', 'Normal'].map(o => <option key={o} value={o}>{o === 'All' ? 'All Priority' : o}</option>)}
          </select>
          <select value={escalationFilter} onChange={e => setEscalationFilter(e.target.value as EscalationStatus | 'All')}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-[13px] text-gray-600 dark:text-gray-400 outline-none cursor-pointer">
            {['All', 'None', 'Escalated', 'Under Review'].map(o => <option key={o} value={o}>{o === 'All' ? 'All Escalation' : o}</option>)}
          </select>
        </div>

        {/* bulk action bar */}
        {selectedCount > 0 && (
          <div className="flex items-center gap-2 ml-auto bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg px-3 py-2">
            <span className="text-[12px] font-medium text-blue-700 dark:text-blue-400">{selectedCount} selected</span>
            <button onClick={() => setConfirmModal('approve')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[11px] font-medium hover:bg-emerald-500 cursor-pointer transition-colors">
              <CheckCircle size={11} /> Approve All
            </button>
            <button onClick={() => setConfirmModal('reject')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-600 text-white text-[11px] font-medium hover:bg-red-500 cursor-pointer transition-colors">
              <XCircle size={11} /> Reject All
            </button>
            <button onClick={() => setCheckedIds(new Set())} className="text-blue-400 hover:text-blue-600 cursor-pointer">
              <X size={13} />
            </button>
          </div>
        )}
      </div>

      {/* table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">

        {/* desktop header */}
        <div className="hidden lg:grid grid-cols-[2.5rem_2fr_1.4fr_1fr_1fr_0.8fr_0.8fr_1.4fr] px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 items-center gap-2">
          <input type="checkbox" className="accent-blue-600 rounded"
            checked={checkedIds.size === filtered.length && filtered.length > 0} onChange={toggleAll} />
          <span>Customer</span><span>Recipient</span><span>Amount</span>
          <span>Priority</span><span>Wait</span><span>Escalation</span><span>Actions</span>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400 text-[13px]">No pending transactions match filters.</div>
        )}

        {filtered.map(tx => {
          const pc = priorityConfig[tx.priority];
          const ec = escalationConfig[tx.escalation];
          const PriorityIcon = pc.Icon;
          const isChecked = checkedIds.has(tx.id);

          return (
            <div key={tx.id}
              className={`border-b border-gray-100 dark:border-gray-700/60 last:border-0 transition-colors ${isChecked ? 'bg-blue-50/60 dark:bg-blue-950/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}>

              {/* desktop row */}
              <div className="hidden lg:grid grid-cols-[2.5rem_2fr_1.4fr_1fr_1fr_0.8fr_0.8fr_1.4fr] px-4 py-3.5 items-center gap-2">
                <input type="checkbox" className="accent-blue-600 rounded" checked={isChecked}
                  onChange={() => toggleCheck(tx.id)} />

                {/* customer */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 ${avatarConfig[tx.customerAvatarColor]}`}>
                    {tx.customerInitials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-gray-900 dark:text-white truncate">{tx.customerName}</p>
                    <p className="text-[10px] text-gray-400 font-mono">{tx.id}</p>
                  </div>
                </div>

                {/* recipient */}
                <div>
                  <p className="text-[12px] font-medium text-gray-700 dark:text-gray-300 truncate inline-flex items-center gap-1.5">
                    <CountryFlag country={tx.recipientCountry} /> {tx.recipient}
                  </p>
                  <p className="text-[10px] text-gray-400">{tx.recipientCountry} · {tx.method}</p>
                </div>

                {/* amount */}
                <div>
                  <p className="text-[13px] font-bold text-gray-900 dark:text-white">{fmt(tx.amount, tx.currency)}</p>
                  {tx.fee > 0 && <p className="text-[10px] text-gray-400">fee {fmt(tx.fee)}</p>}
                </div>

                {/* priority */}
                <div>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${pc.classes}`}>
                    <PriorityIcon size={10} /> {pc.label}
                  </span>
                </div>

                {/* wait */}
                <div><WaitBadge mins={tx.waitingMins} /></div>

                {/* escalation */}
                <div>
                  {ec ? (
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${ec.classes}`}>{ec.label}</span>
                  ) : (
                    <span className="text-[10px] text-gray-400">—</span>
                  )}
                </div>

                {/* actions */}
                <div className="flex items-center gap-1.5">
                  <button onClick={() => setConfirmModal('approve')}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400 text-[11px] font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900 cursor-pointer transition-colors">
                    <CheckCircle size={11} /> Approve
                  </button>
                  <button onClick={() => setConfirmModal('reject')}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-[11px] font-medium hover:bg-red-100 dark:hover:bg-red-900 cursor-pointer transition-colors">
                    <XCircle size={11} /> Reject
                  </button>
                  <button onClick={() => setEscalateTarget(tx)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-900 text-orange-700 dark:text-orange-400 text-[11px] font-medium hover:bg-orange-100 dark:hover:bg-orange-900 cursor-pointer transition-colors">
                    <ShieldAlert size={11} /> Escalate
                  </button>
                </div>
              </div>

              {/* mobile card */}
              <div className="lg:hidden px-4 py-3.5">
                <div className="flex items-start gap-2.5 mb-2">
                  <input type="checkbox" className="accent-blue-600 rounded mt-1" checked={isChecked} onChange={() => toggleCheck(tx.id)} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 ${avatarConfig[tx.customerAvatarColor]}`}>
                          {tx.customerInitials}
                        </div>
                        <div>
                          <p className="text-[13px] font-medium text-gray-900 dark:text-white">{tx.customerName}</p>
                          <p className="text-[10px] text-gray-400 font-mono">{tx.id}</p>
                        </div>
                      </div>
                      <p className="text-[14px] font-bold text-gray-900 dark:text-white">{fmt(tx.amount)}</p>
                    </div>
                    <div className="flex items-center justify-between mb-2.5">
                      <p className="text-[12px] text-gray-500 dark:text-gray-400 inline-flex items-center gap-1.5">
                        <CountryFlag country={tx.recipientCountry} /> {tx.recipient} · {tx.recipientCountry}
                      </p>
                      <WaitBadge mins={tx.waitingMins} />
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${pc.classes}`}>
                        <PriorityIcon size={10} /> {pc.label}
                      </span>
                      {ec && <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${ec.classes}`}>{ec.label}</span>}
                      <div className="flex gap-1 ml-auto">
                        <button onClick={() => setConfirmModal('approve')} className="px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[11px] font-medium cursor-pointer">✓ Approve</button>
                        <button onClick={() => setConfirmModal('reject')} className="px-2 py-1 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 text-[11px] font-medium cursor-pointer">✕ Reject</button>
                        <button onClick={() => setEscalateTarget(tx)} className="px-2 py-1 rounded bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400 text-[11px] font-medium cursor-pointer">↑ Escalate</button>
                      </div>
                    </div>
                  </div>
                </div>
                {tx.reason && (
                  <p className="text-[11px] text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded px-2 py-1.5 ml-10">{tx.reason}</p>
                )}
              </div>
            </div>
          );
        })}

        {/* pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3 border-t border-gray-100 dark:border-gray-700">
          <p className="text-[12px] text-gray-400">Showing {filtered.length} of {pendingStats.totalPending.toLocaleString()} pending transactions</p>
          <div className="flex gap-1">
            {(['‹', '1', '2', '3', '...', '22', '›']).map((item, i) => (
              <button key={i} className={`w-7 h-7 rounded-md flex items-center justify-center text-[12px] cursor-pointer transition-colors ${i === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-400 hover:text-gray-700 dark:hover:text-white'}`}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* modals */}
      {confirmModal && (
        <ConfirmModal
          type={confirmModal}
          count={selectedCount || 1}
          onConfirm={() => { setCheckedIds(new Set()); setConfirmModal(null); }}
          onCancel={() => setConfirmModal(null)}
        />
      )}
      {escalateTarget && (
        <EscalateModal tx={escalateTarget} onClose={() => setEscalateTarget(null)} />
      )}
    </div>
  );
}