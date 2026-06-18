'use client';

import { useState, useMemo } from 'react';
import {
  CheckCircle, Clock, XCircle, AlertCircle, RefreshCw,
  Search, Download, Eye, Edit, X, Cloud, ChevronLeft, ChevronRight,
  FileText, Globe, Zap, Building2, ShieldCheck, ShieldX,
} from 'lucide-react';
import {
  kycCustomers, kycStats,
  KycCustomer, KycStatus, RiskLevel, KycTier,
} from '@/lib/data';

const statusConfig: Record<KycStatus, { label: string; classes: string; Icon: React.ElementType }> = {
  Approved: { label: 'Approved', classes: 'bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900', Icon: CheckCircle },
  Pending: { label: 'Pending', classes: 'bg-amber-100  text-amber-700  border border-amber-200  dark:bg-amber-950  dark:text-amber-400  dark:border-amber-900', Icon: Clock },
  Rejected: { label: 'Rejected', classes: 'bg-red-100    text-red-700    border border-red-200    dark:bg-red-950    dark:text-red-400    dark:border-red-900', Icon: XCircle },
  'Under Review': { label: 'Under Review', classes: 'bg-blue-100   text-blue-700   border border-blue-200   dark:bg-blue-950   dark:text-blue-400   dark:border-blue-900', Icon: RefreshCw },
  Expired: { label: 'Expired', classes: 'bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-900', Icon: AlertCircle },
};
const riskConfig: Record<RiskLevel, string> = {
  Low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
  Medium: 'bg-amber-100  text-amber-700  dark:bg-amber-950  dark:text-amber-400',
  High: 'bg-red-100    text-red-700    dark:bg-red-950    dark:text-red-400',
};
const avatarConfig: Record<KycCustomer['avatarColor'], string> = {
  blue: 'bg-blue-100   text-blue-700   dark:bg-blue-950   dark:text-blue-400',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
  amber: 'bg-amber-100  text-amber-700  dark:bg-amber-950  dark:text-amber-400',
  red: 'bg-red-100    text-red-700    dark:bg-red-950    dark:text-red-400',
  teal: 'bg-teal-100   text-teal-700   dark:bg-teal-950   dark:text-teal-400',
  pink: 'bg-pink-100   text-pink-700   dark:bg-pink-950   dark:text-pink-400',
};
const docIconMap: Record<string, React.ElementType> = {
  'NID': FileText, 'Passport': Globe, 'Utility Bill': Zap, 'Business Doc': Building2,
};
const docStatusClass: Record<string, string> = {
  Verified: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
  Missing: 'bg-gray-100   text-gray-500   dark:bg-gray-800   dark:text-gray-500',
  Failed: 'bg-red-100    text-red-700    dark:bg-red-950    dark:text-red-400',
  Pending: 'bg-amber-100  text-amber-700  dark:bg-amber-950  dark:text-amber-400',
};
const apiResultClass: Record<string, string> = {
  Passed: 'text-emerald-600 dark:text-emerald-400', Failed: 'text-red-600 dark:text-red-400',
  Pending: 'text-amber-600 dark:text-amber-400', Clear: 'text-emerald-600 dark:text-emerald-400',
  Flagged: 'text-amber-600 dark:text-amber-400', Authentic: 'text-emerald-600 dark:text-emerald-400',
  Invalid: 'text-red-600 dark:text-red-400',
};

function StatCard({ label, value, sub, valueClass = '' }: { label: string; value: string | number; sub: string; valueClass?: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
      <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">{label}</p>
      <p className={`text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white ${valueClass}`}>{value}</p>
      <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">{sub}</p>
    </div>
  );
}

function DetailPanel({ customer, onClose }: { customer: KycCustomer; onClose: () => void }) {
  const sc = statusConfig[customer.status];
  const StatusIcon = sc.Icon;
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <aside className="fixed right-0 top-0 h-screen w-full max-w-md bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 z-50 overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">KYC Detail</h2>
          <button onClick={onClose} className="w-7 h-7 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer">
            <X size={14} />
          </button>
        </div>
        <div className="p-5 space-y-5">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${avatarConfig[customer.avatarColor]}`}>
              {customer.initials}
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-semibold text-gray-900 dark:text-white truncate">{customer.name}</p>
              <p className="text-[11px] text-gray-400">#{customer.id}</p>
            </div>
            <span className={`ml-auto shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium ${sc.classes}`}>
              <StatusIcon size={10} /> {sc.label}
            </span>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">KYC Information</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                ['KYC Tier', customer.tier], ['Risk Rating', customer.risk],
                ['Submitted', customer.submittedAt], ['Expiry', customer.expiresAt ?? '—'],
                ['Nationality', customer.nationality], ['Occupation', customer.occupation],
                ['Source of Funds', customer.sourceOfFunds], ['Email', customer.email],
              ].map(([k, v]) => (
                <div key={k} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5">
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-0.5">{k}</p>
                  <p className="text-[12px] font-medium text-gray-800 dark:text-gray-200 break-all">{v}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Documents</p>
            <div className="space-y-2">
              {customer.documents.map((doc) => {
                const Icon = docIconMap[doc.type] ?? FileText;
                return (
                  <div key={doc.type} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3 py-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon size={16} className="text-blue-500 dark:text-blue-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[12px] font-medium text-gray-800 dark:text-gray-200 truncate">{doc.label}</p>
                        <p className="text-[10px] text-gray-400">{doc.uploadedAt ? `Uploaded ${doc.uploadedAt}` : 'Not uploaded'}</p>
                      </div>
                    </div>
                    <span className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded ml-2 ${docStatusClass[doc.status]}`}>{doc.status}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Third-party API Verification</p>
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-lg p-3">
              <div className="flex items-center gap-1.5 mb-2.5">
                <Cloud size={12} className="text-blue-500 dark:text-blue-400" />
                <p className="text-[11px] font-medium text-blue-600 dark:text-blue-400">
                  {customer.apiVerification.provider} · {customer.apiVerification.checkedAt ?? 'Not checked'}
                </p>
              </div>
              {[
                ['Identity match', customer.apiVerification.identityMatch],
                ['Face liveness', customer.apiVerification.faceLiveness],
                ['Sanctions check', customer.apiVerification.sanctionsCheck],
                ['Document authenticity', customer.apiVerification.documentAuthenticity],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-1.5 border-b border-blue-100 dark:border-blue-900/30 last:border-0">
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">{k}</span>
                  <span className={`text-[11px] font-semibold ${apiResultClass[v] ?? 'text-gray-500'}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Reviewer Note</p>
            <p className="text-[12px] text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 leading-relaxed">{customer.reviewerNote}</p>
          </div>

          {customer.status !== 'Approved' ? (
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400 text-[13px] font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900 cursor-pointer transition-colors">
                <ShieldCheck size={14} /> Approve
              </button>
              <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-[13px] font-medium hover:bg-red-100 dark:hover:bg-red-900 cursor-pointer transition-colors">
                <ShieldX size={14} /> Reject
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400 text-[13px] font-medium">
              <ShieldCheck size={14} /> KYC Verified & Active
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default function KycStatusPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<KycStatus | 'All'>('All');
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'All'>('All');
  const [tierFilter, setTierFilter] = useState<KycTier | 'All'>('All');
  const [selected, setSelected] = useState<KycCustomer | null>(null);

  const filtered = useMemo(() => kycCustomers.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchRisk = riskFilter === 'All' || c.risk === riskFilter;
    const matchTier = tierFilter === 'All' || c.tier === tierFilter;
    return matchSearch && matchStatus && matchRisk && matchTier;
  }), [search, statusFilter, riskFilter, tierFilter]);

  return (
    <div className="px-4 py-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[13px] text-gray-400 dark:text-gray-500 mb-1">
            <span>Customers</span><ChevronRight size={12} />
            <span className="text-gray-900 dark:text-white font-medium">KYC Status</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">KYC Status</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Third-party verified identity & document management</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-[12px] font-medium hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
            <Download size={13} /> Export
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-500 cursor-pointer transition-colors">
            <RefreshCw size={13} /> Run API Check
          </button>
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        <StatCard label="Total Submitted" value={kycStats.totalSubmitted.toLocaleString()} sub="+42 this week" />
        <StatCard label="Approved" value={kycStats.approved.toLocaleString()} sub={`${kycStats.approvalRate}% rate`} valueClass="text-emerald-600 dark:text-emerald-400" />
        <StatCard label="Pending Review" value={kycStats.pending.toLocaleString()} sub={`↑ ${kycStats.newToday} new today`} valueClass="text-amber-600 dark:text-amber-400" />
        <StatCard label="Rejected" value={kycStats.rejected.toLocaleString()} sub={`${kycStats.rejectRate}% reject rate`} valueClass="text-red-600 dark:text-red-400" />
        <StatCard label="High Risk" value={kycStats.highRisk.toLocaleString()} sub={`↑ ${kycStats.flaggedToday} flagged today`} valueClass="text-orange-600 dark:text-orange-400" />
      </div>

      {/* filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mb-4">
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 sm:flex-1 sm:max-w-xs">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name or ID..."
            className="bg-transparent outline-none text-[13px] text-gray-800 dark:text-gray-200 placeholder-gray-400 w-full" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { value: statusFilter, setValue: (v: string) => setStatusFilter(v as KycStatus | 'All'), options: ['All', 'Approved', 'Pending', 'Rejected', 'Under Review', 'Expired'], placeholder: 'All Status' },
            { value: riskFilter, setValue: (v: string) => setRiskFilter(v as RiskLevel | 'All'), options: ['All', 'Low', 'Medium', 'High'], placeholder: 'All Risk' },
            { value: tierFilter, setValue: (v: string) => setTierFilter(v as KycTier | 'All'), options: ['All', 'Tier 1', 'Tier 2', 'Tier 3'], placeholder: 'All Tiers' },
          ].map(({ value, setValue, options, placeholder }) => (
            <select key={placeholder} value={value} onChange={(e) => setValue(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-[13px] text-gray-600 dark:text-gray-400 outline-none cursor-pointer">
              {options.map((o) => <option key={o} value={o}>{o === 'All' ? placeholder : o}</option>)}
            </select>
          ))}
        </div>
      </div>

      {/* table — desktop / card — mobile */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">

        {/* desktop header — hidden on mobile */}
        <div className="hidden lg:grid grid-cols-[2fr_1.2fr_0.8fr_0.8fr_1.2fr_0.8fr_0.7fr] px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500">
          <span>Customer</span><span>KYC Status</span><span>Tier</span>
          <span>Risk</span><span>Documents</span><span>API Check</span><span>Actions</span>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400 text-[13px]">No customers match the selected filters.</div>
        )}

        {filtered.map((c) => {
          const sc = statusConfig[c.status];
          const StatusIcon = sc.Icon;
          const docKeys = ['NID', 'Passport', 'Utility Bill', 'Business Doc'] as const;
          const docMap = Object.fromEntries(c.documents.map((d) => [d.type, d.status]));
          const apiOverall =
            c.apiVerification.identityMatch === 'Passed' && c.apiVerification.documentAuthenticity === 'Authentic' ? 'Passed' :
              c.apiVerification.identityMatch === 'Pending' ? 'In Queue' :
                c.apiVerification.identityMatch === 'Failed' ? 'Failed' : 'Reviewing';
          const apiChipClass =
            apiOverall === 'Passed' ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900' :
              apiOverall === 'Failed' ? 'bg-red-100    text-red-700    border-red-200    dark:bg-red-950    dark:text-red-400    dark:border-red-900' :
                apiOverall === 'In Queue' ? 'bg-gray-100   text-gray-500   border-gray-200   dark:bg-gray-700   dark:text-gray-400   dark:border-gray-600' :
                  'bg-blue-100   text-blue-700   border-blue-200   dark:bg-blue-950   dark:text-blue-400   dark:border-blue-900';

          return (
            <div key={c.id} onClick={() => setSelected(c)}
              className="border-b border-gray-100 dark:border-gray-700/60 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer transition-colors">

              {/* ── DESKTOP ROW ── */}
              <div className="hidden lg:grid grid-cols-[2fr_1.2fr_0.8fr_0.8fr_1.2fr_0.8fr_0.7fr] px-4 py-3.5 items-center">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 ${avatarConfig[c.avatarColor]}`}>{c.initials}</div>
                  <div>
                    <p className="text-[13px] font-medium text-gray-900 dark:text-white">{c.name}</p>
                    <p className="text-[11px] text-gray-400">#{c.id}</p>
                  </div>
                </div>
                <div><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${sc.classes}`}><StatusIcon size={10} />{sc.label}</span></div>
                <div><span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{c.tier}</span></div>
                <div><span className={`text-[11px] font-medium px-2 py-0.5 rounded ${riskConfig[c.risk]}`}>{c.risk}</span></div>
                <div className="flex gap-1">
                  {docKeys.map((key) => {
                    const st = docMap[key] ?? 'Missing';
                    const short = key === 'NID' ? 'N' : key === 'Passport' ? 'P' : key === 'Utility Bill' ? 'U' : 'B';
                    const cls = st === 'Verified' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' :
                      st === 'Failed' ? 'bg-red-100    text-red-700    dark:bg-red-950    dark:text-red-400' :
                        st === 'Pending' ? 'bg-amber-100  text-amber-700  dark:bg-amber-950  dark:text-amber-400' :
                          'bg-gray-100   text-gray-400   dark:bg-gray-700   dark:text-gray-600';
                    return <div key={key} title={`${key}: ${st}`} className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-semibold ${cls}`}>{short}</div>;
                  })}
                </div>
                <div><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${apiChipClass}`}>{apiOverall}</span></div>
                <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => setSelected(c)} className="w-7 h-7 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer transition-colors"><Eye size={13} /></button>
                  <button className="w-7 h-7 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer transition-colors"><Edit size={13} /></button>
                </div>
              </div>

              {/* ── MOBILE CARD ── */}
              <div className="lg:hidden px-4 py-3.5">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0 ${avatarConfig[c.avatarColor]}`}>{c.initials}</div>
                    <div>
                      <p className="text-[13px] font-medium text-gray-900 dark:text-white">{c.name}</p>
                      <p className="text-[11px] text-gray-400">#{c.id}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${sc.classes}`}><StatusIcon size={10} />{sc.label}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{c.tier}</span>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${riskConfig[c.risk]}`}>{c.risk}</span>
                  <div className="flex gap-1">
                    {docKeys.map((key) => {
                      const st = docMap[key] ?? 'Missing';
                      const short = key === 'NID' ? 'N' : key === 'Passport' ? 'P' : key === 'Utility Bill' ? 'U' : 'B';
                      const cls = st === 'Verified' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' :
                        st === 'Failed' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400' :
                          st === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400' :
                            'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-600';
                      return <div key={key} title={`${key}: ${st}`} className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-semibold ${cls}`}>{short}</div>;
                    })}
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${apiChipClass}`}>{apiOverall}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3 border-t border-gray-100 dark:border-gray-700">
          <p className="text-[12px] text-gray-400">Showing {filtered.length} of {kycStats.totalSubmitted.toLocaleString()} customers</p>
          <div className="flex gap-1">
            {([<ChevronLeft size={12} />, '1', '2', '3', '...', '128', <ChevronRight size={12} />] as const).map((item, i) => (
              <button key={i} className={`w-7 h-7 rounded-md flex items-center justify-center text-[12px] cursor-pointer transition-colors ${i === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-400 hover:text-gray-700 dark:hover:text-white'}`}>{item}</button>
            ))}
          </div>
        </div>
      </div>

      {selected && <DetailPanel customer={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}