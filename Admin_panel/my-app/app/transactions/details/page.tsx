'use client';

import { useState } from 'react';
import {
  Search, ChevronRight, CheckCircle, XCircle, Clock,
  RefreshCw, AlertCircle, PauseCircle, Ban,
  ArrowUpRight, ArrowDownLeft, ArrowLeftRight,
  Plus, Minus, Receipt, Shield,
  Smartphone, Globe, Download, ChevronDown, ChevronUp,
  User, Building2, Hash, Calendar,
} from 'lucide-react';
import { transactionDetails, TransactionDetail } from '@/lib/data';

// ── config ────────────────────────────────────────────────────
const statusConfig: Record<string, { classes: string; Icon: React.ElementType }> = {
  Completed: { classes: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900', Icon: CheckCircle },
  Pending: { classes: 'bg-amber-100  text-amber-700  border-amber-200  dark:bg-amber-950  dark:text-amber-400  dark:border-amber-900', Icon: Clock },
  Failed: { classes: 'bg-red-100    text-red-700    border-red-200    dark:bg-red-950    dark:text-red-400    dark:border-red-900', Icon: XCircle },
  Refunded: { classes: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-900', Icon: RefreshCw },
  Cancelled: { classes: 'bg-gray-100   text-gray-500   border-gray-200   dark:bg-gray-800   dark:text-gray-400   dark:border-gray-700', Icon: Ban },
  'On Hold': { classes: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-900', Icon: PauseCircle },
};

const typeConfig: Record<string, { Icon: React.ElementType; color: string; bg: string }> = {
  'Send Money': { Icon: ArrowUpRight, color: 'text-red-600    dark:text-red-400', bg: 'bg-red-100    dark:bg-red-950' },
  'Receive': { Icon: ArrowDownLeft, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-950' },
  'Top Up': { Icon: Plus, color: 'text-blue-600   dark:text-blue-400', bg: 'bg-blue-100   dark:bg-blue-950' },
  'Withdraw': { Icon: Minus, color: 'text-amber-600  dark:text-amber-400', bg: 'bg-amber-100  dark:bg-amber-950' },
  'Refund': { Icon: RefreshCw, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-950' },
  'Exchange': { Icon: ArrowLeftRight, color: 'text-teal-600   dark:text-teal-400', bg: 'bg-teal-100   dark:bg-teal-950' },
  'Fee': { Icon: Receipt, color: 'text-gray-500   dark:text-gray-400', bg: 'bg-gray-100   dark:bg-gray-700' },
};

const avatarConfig: Record<string, string> = {
  blue: 'bg-blue-100   text-blue-700   dark:bg-blue-950   dark:text-blue-400',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
  amber: 'bg-amber-100  text-amber-700  dark:bg-amber-950  dark:text-amber-400',
  teal: 'bg-teal-100   text-teal-700   dark:bg-teal-950   dark:text-teal-400',
  pink: 'bg-pink-100   text-pink-700   dark:bg-pink-950   dark:text-pink-400',
  rose: 'bg-rose-100   text-rose-700   dark:bg-rose-950   dark:text-rose-400',
};

const roleConfig: Record<string, string> = {
  System: 'bg-blue-100   text-blue-700   dark:bg-blue-950   dark:text-blue-400',
  Admin: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  Customer: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
  API: 'bg-amber-100  text-amber-700  dark:bg-amber-950  dark:text-amber-400',
};

const fmt = (n: number, c = 'GBP') =>
  `${c === 'GBP' ? '£' : c === 'USD' ? '$' : c === 'EUR' ? '€' : ''}${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// ── Section wrapper ───────────────────────────────────────────
function Section({ title, icon: Icon, children, collapsible = false }: {
  title: string; icon: React.ElementType; children: React.ReactNode; collapsible?: boolean;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <div
        className={`flex items-center justify-between px-5 py-3.5 border-b border-gray-100 dark:border-gray-700 ${collapsible ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50' : ''}`}
        onClick={() => collapsible && setOpen(o => !o)}
      >
        <div className="flex items-center gap-2">
          <Icon size={15} className="text-gray-400 dark:text-gray-500" />
          <h3 className="text-[13px] font-semibold text-gray-800 dark:text-white">{title}</h3>
        </div>
        {collapsible && (open ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />)}
      </div>
      {open && <div className="p-5">{children}</div>}
    </div>
  );
}

// ── Timeline ──────────────────────────────────────────────────
function Timeline({ steps }: { steps: TransactionDetail['timeline'] }) {
  return (
    <div className="relative">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        const dotColor =
          step.status === 'completed' ? 'bg-emerald-500 border-emerald-200 dark:border-emerald-900' :
            step.status === 'active' ? 'bg-blue-500    border-blue-200    dark:border-blue-900' :
              step.status === 'failed' ? 'bg-red-500     border-red-200     dark:border-red-900' :
                'bg-gray-300    border-gray-200    dark:border-gray-700';
        const lineColor =
          step.status === 'completed' ? 'bg-emerald-200 dark:bg-emerald-900' :
            step.status === 'failed' ? 'bg-red-200     dark:bg-red-900' :
              'bg-gray-200    dark:bg-gray-700';
        return (
          <div key={i} className="flex gap-4 relative">
            {/* dot + line */}
            <div className="flex flex-col items-center shrink-0 w-6">
              <div className={`w-3 h-3 rounded-full border-2 shrink-0 mt-0.5 z-10 ${dotColor}`} />
              {!isLast && <div className={`w-0.5 flex-1 mt-1 ${lineColor}`} />}
            </div>
            {/* content */}
            <div className={`pb-5 flex-1 min-w-0 ${isLast ? '' : ''}`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-0.5">
                <p className="text-[13px] font-semibold text-gray-900 dark:text-white">{step.label}</p>
                <p className="text-[11px] text-gray-400 shrink-0">{step.timestamp.replace('T', ' ')}</p>
              </div>
              <p className="text-[12px] text-gray-500 dark:text-gray-400">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Audit Log ─────────────────────────────────────────────────
function AuditLog({ entries }: { entries: TransactionDetail['auditLog'] }) {
  return (
    <div className="space-y-2">
      {entries.map((entry, i) => (
        <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/40 rounded-lg">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded shrink-0 mt-0.5 ${roleConfig[entry.role]}`}>
            {entry.role}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5">
              <p className="text-[12px] font-medium text-gray-800 dark:text-gray-200">{entry.action}</p>
              <p className="text-[10px] text-gray-400 shrink-0">{entry.timestamp.replace('T', ' ')}</p>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">{entry.performedBy}</p>
            {entry.note && (
              <p className="text-[11px] text-blue-600 dark:text-blue-400 mt-0.5 italic">{entry.note}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Detail View ───────────────────────────────────────────────
function DetailView({ tx }: { tx: TransactionDetail }) {
  const sc = statusConfig[tx.status];
  const tc = typeConfig[tx.type];
  const StatusIcon = sc.Icon;
  const TypeIcon = tc.Icon;

  return (
    <div className="space-y-4">
      {/* hero card */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${tc.bg}`}>
              <TypeIcon size={26} className={tc.color} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{fmt(tx.amount, tx.currency)}</h2>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-medium border ${sc.classes}`}>
                  <StatusIcon size={11} /> {tx.status}
                </span>
              </div>
              <p className="text-[13px] text-gray-500 dark:text-gray-400">{tx.type} · {tx.channel}</p>
              <p className="text-[12px] text-gray-400 font-mono mt-0.5">{tx.id}</p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-[12px] font-medium hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors">
              <Download size={13} /> Receipt
            </button>
          </div>
        </div>

        {/* exchange info */}
        {tx.type === 'Exchange' && tx.exchangeRate && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">From</p>
              <p className="text-[15px] font-bold text-gray-900 dark:text-white">{fmt(tx.amount, tx.fromCurrency)}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Rate</p>
              <p className="text-[13px] font-semibold text-teal-600 dark:text-teal-400">1 {tx.fromCurrency} = {tx.exchangeRate} {tx.toCurrency}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">To</p>
              <p className="text-[15px] font-bold text-gray-900 dark:text-white">{fmt(tx.convertedAmount!, tx.toCurrency)}</p>
            </div>
          </div>
        )}
      </div>

      {/* 2 col grid — info + recipient */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* transaction info */}
        <Section title="Transaction Information" icon={Hash}>
          <div className="space-y-0 divide-y divide-gray-100 dark:divide-gray-700">
            {[
              ['Reference', tx.reference],
              ['Amount', fmt(tx.amount, tx.currency)],
              ['Fee', tx.fee > 0 ? fmt(tx.fee, tx.currency) : 'Free'],
              ['Total Charged', fmt(tx.totalCharged, tx.currency)],
              ['Channel', tx.channel],
              ['Created', tx.createdAt.replace('T', ' ')],
              ['Completed', tx.completedAt ? tx.completedAt.replace('T', ' ') : '—'],
              ['IP Address', tx.ipAddress],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between items-center py-2.5">
                <span className="text-[12px] text-gray-400 dark:text-gray-500">{k}</span>
                <span className="text-[12px] font-medium text-gray-800 dark:text-gray-200 text-right max-w-[55%] break-all">{v}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* customer + recipient */}
        <div className="space-y-4">
          <Section title="Customer" icon={User}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${avatarConfig[tx.customerAvatarColor]}`}>
                {tx.customerInitials}
              </div>
              <div>
                <p className="text-[14px] font-semibold text-gray-900 dark:text-white">{tx.customerName}</p>
                <p className="text-[11px] text-gray-400">#{tx.customerId}</p>
              </div>
            </div>
            <div className="space-y-0 divide-y divide-gray-100 dark:divide-gray-700">
              {[
                ['Email', tx.customerEmail],
                ['Phone', tx.customerPhone],
                ['KYC', tx.customerKyc],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center py-2">
                  <span className="text-[12px] text-gray-400 dark:text-gray-500">{k}</span>
                  <span className="text-[12px] font-medium text-gray-800 dark:text-gray-200 text-right break-all max-w-[60%]">{v}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Recipient" icon={Building2}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl shrink-0">
                {tx.recipientFlag}
              </div>
              <div>
                <p className="text-[14px] font-semibold text-gray-900 dark:text-white">{tx.recipientName}</p>
                <p className="text-[11px] text-gray-400">{tx.recipientCountry}</p>
              </div>
            </div>
            <div className="space-y-0 divide-y divide-gray-100 dark:divide-gray-700">
              {([
                ['Bank', tx.recipientBank],
                ['Account', tx.recipientAccount],
                ['Phone', tx.recipientPhone],
              ] as [string, string | undefined][])
                .filter((item): item is [string, string] => Boolean(item[1]))
                .map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center py-2">
                    <span className="text-[12px] text-gray-400 dark:text-gray-500">{k}</span>
                    <span className="text-[12px] font-medium text-gray-800 dark:text-gray-200">{v}</span>
                  </div>
                ))}
            </div>
          </Section>
        </div>
      </div>

      {/* device info */}
      <Section title="Device & Session" icon={Smartphone}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-3 flex-1 bg-gray-50 dark:bg-gray-700/40 rounded-lg p-3">
            <Smartphone size={18} className="text-gray-400 shrink-0" />
            <div>
              <p className="text-[11px] text-gray-400 mb-0.5">Device</p>
              <p className="text-[12px] font-medium text-gray-800 dark:text-gray-200">{tx.deviceInfo}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-1 bg-gray-50 dark:bg-gray-700/40 rounded-lg p-3">
            <Globe size={18} className="text-gray-400 shrink-0" />
            <div>
              <p className="text-[11px] text-gray-400 mb-0.5">IP Address</p>
              <p className="text-[12px] font-medium text-gray-800 dark:text-gray-200 font-mono">{tx.ipAddress}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* note */}
      {tx.note && (
        <Section title="Note" icon={Calendar}>
          <p className="text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed">{tx.note}</p>
        </Section>
      )}

      {/* timeline */}
      <Section title="Transaction Timeline" icon={Clock} collapsible>
        <Timeline steps={tx.timeline} />
      </Section>

      {/* audit log */}
      <Section title="Audit Log" icon={Shield} collapsible>
        <AuditLog entries={tx.auditLog} />
      </Section>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function TransactionDetailsPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<TransactionDetail | null>(null);

  const filtered = transactionDetails.filter(tx =>
    tx.id.toLowerCase().includes(search.toLowerCase()) ||
    tx.customerName.toLowerCase().includes(search.toLowerCase())
  );

  if (selected) {
    return (
      <div className="px-4 py-6">
        {/* back nav */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setSelected(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-[12px] font-medium hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
            ← Back
          </button>
          <div className="flex items-center gap-2 text-[13px] text-gray-400 dark:text-gray-500">
            <span>Transactions</span><ChevronRight size={12} />
            <span>Transaction Details</span><ChevronRight size={12} />
            <span className="text-gray-900 dark:text-white font-medium font-mono">{selected.id}</span>
          </div>
        </div>
        <DetailView tx={selected} />
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[13px] text-gray-400 dark:text-gray-500 mb-1">
            <span>Transactions</span><ChevronRight size={12} />
            <span className="text-gray-900 dark:text-white font-medium">Transaction Details</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Transaction Details</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Search any transaction to view full timeline, receipt and audit log</p>
        </div>
      </div>

      {/* search */}
      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 mb-6 max-w-lg">
        <Search size={16} className="text-gray-400 shrink-0" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by Transaction ID or customer name..."
          className="bg-transparent outline-none text-[14px] text-gray-800 dark:text-gray-200 placeholder-gray-400 w-full" />
      </div>

      {/* transaction list */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        <div className="hidden sm:grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr] px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500">
          <span>Transaction</span><span>Customer</span><span>Amount</span><span>Status</span><span>Date</span>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Search size={32} className="text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-[13px] text-gray-400">No transactions found. Try a different ID or name.</p>
          </div>
        )}

        {filtered.map(tx => {
          const sc = statusConfig[tx.status];
          const tc = typeConfig[tx.type];
          const StatusIcon = sc.Icon;
          const TypeIcon = tc.Icon;
          return (
            <div key={tx.id} onClick={() => setSelected(tx)}
              className="border-b border-gray-100 dark:border-gray-700/60 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer transition-colors">

              {/* desktop */}
              <div className="hidden sm:grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr] px-4 py-4 items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${tc.bg}`}>
                    <TypeIcon size={16} className={tc.color} />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-gray-900 dark:text-white font-mono">{tx.id}</p>
                    <p className="text-[11px] text-gray-400">{tx.type} · {tx.channel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 ${avatarConfig[tx.customerAvatarColor]}`}>
                    {tx.customerInitials}
                  </div>
                  <p className="text-[13px] text-gray-700 dark:text-gray-300">{tx.customerName}</p>
                </div>
                <p className="text-[13px] font-bold text-gray-900 dark:text-white">{fmt(tx.amount, tx.currency)}</p>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border w-fit ${sc.classes}`}>
                  <StatusIcon size={10} /> {tx.status}
                </span>
                <p className="text-[12px] text-gray-500 dark:text-gray-400">{tx.createdAt.split('T')[0]}</p>
              </div>

              {/* mobile */}
              <div className="sm:hidden px-4 py-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${tc.bg}`}>
                      <TypeIcon size={14} className={tc.color} />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-gray-900 dark:text-white font-mono">{tx.id}</p>
                      <p className="text-[10px] text-gray-400">{tx.customerName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-bold text-gray-900 dark:text-white">{fmt(tx.amount, tx.currency)}</p>
                    <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium border ${sc.classes}`}>
                      <StatusIcon size={9} /> {tx.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}