'use client';

import { useState, useMemo } from 'react';
import {
    Search, ChevronRight, CheckCircle, XCircle,
    RefreshCw, X, AlertCircle, Clock,
    DollarSign, Edit3, ChevronLeft,
} from 'lucide-react';
import {
    refundRequests, refundStats,
    RefundRequest, RefundStatus, RefundReason,
} from '@/lib/data';

// ── helpers ───────────────────────────────────────────────────
const statusConfig: Record<RefundStatus, { classes: string; Icon: React.ElementType; label: string }> = {
    Pending: { classes: 'bg-amber-100  text-amber-700  border-amber-200  dark:bg-amber-950  dark:text-amber-400  dark:border-amber-900', Icon: Clock, label: 'Pending' },
    Approved: { classes: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900', Icon: CheckCircle, label: 'Approved' },
    Rejected: { classes: 'bg-red-100    text-red-700    border-red-200    dark:bg-red-950    dark:text-red-400    dark:border-red-900', Icon: XCircle, label: 'Rejected' },
    Processed: { classes: 'bg-blue-100   text-blue-700   border-blue-200   dark:bg-blue-950   dark:text-blue-400   dark:border-blue-900', Icon: RefreshCw, label: 'Processed' },
    Partial: { classes: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-900', Icon: AlertCircle, label: 'Partial' },
};

const reasonConfig: Record<RefundReason, string> = {
    'Transaction Error': 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400',
    'Duplicate Payment': 'bg-blue-100   text-blue-700   dark:bg-blue-950   dark:text-blue-400',
    'Service Not Received': 'bg-red-100    text-red-700    dark:bg-red-950    dark:text-red-400',
    'Unauthorized Transaction': 'bg-red-100    text-red-700    dark:bg-red-950    dark:text-red-400',
    'Wrong Amount': 'bg-amber-100  text-amber-700  dark:bg-amber-950  dark:text-amber-400',
    'Customer Request': 'bg-gray-100   text-gray-600   dark:bg-gray-800   dark:text-gray-400',
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

const fmt = (n: number) =>
    `£${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// ── Action Modal ──────────────────────────────────────────────
function ActionModal({ req, onClose }: { req: RefundRequest; onClose: () => void }) {
    const [action, setAction] = useState<'approve' | 'reject' | null>(null);
    const [refundAmount, setRefundAmount] = useState(req.requestedRefund.toString());
    const [adminNote, setAdminNote] = useState('');
    const [isPartial, setIsPartial] = useState(false);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => { setLoading(false); setDone(true); }, 1200);
    };

    const sc = statusConfig[req.status];
    const StatusIcon = sc.Icon;

    return (
        <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">

                    {/* header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                        <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white">Review Refund Request</h3>
                        <button onClick={onClose} className="w-7 h-7 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer">
                            <X size={14} />
                        </button>
                    </div>

                    {done ? (
                        <div className="p-8 text-center">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 ${action === 'approve' ? 'bg-emerald-100 dark:bg-emerald-950' : 'bg-red-100 dark:bg-red-950'}`}>
                                {action === 'approve'
                                    ? <CheckCircle size={26} className="text-emerald-600 dark:text-emerald-400" />
                                    : <XCircle size={26} className="text-red-600 dark:text-red-400" />}
                            </div>
                            <p className="text-[15px] font-semibold text-gray-900 dark:text-white mb-1">
                                Refund {action === 'approve' ? 'Approved' : 'Rejected'}
                            </p>
                            <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-5">
                                {action === 'approve'
                                    ? `${fmt(parseFloat(refundAmount))} will be refunded to ${req.customerName}.`
                                    : `Request ${req.id} has been rejected.`}
                            </p>
                            <button onClick={onClose} className="px-6 py-2 rounded-lg bg-blue-600 text-white text-[13px] font-medium hover:bg-blue-500 cursor-pointer">
                                Done
                            </button>
                        </div>
                    ) : (
                        <div className="p-6 space-y-4">
                            {/* request summary */}
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0 ${avatarConfig[req.customerAvatarColor]}`}>
                                            {req.customerInitials}
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-semibold text-gray-900 dark:text-white">{req.customerName}</p>
                                            <p className="text-[11px] text-gray-400">{req.customerEmail}</p>
                                        </div>
                                    </div>
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${sc.classes}`}>
                                        <StatusIcon size={10} /> {sc.label}
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    {[
                                        { label: 'Original', value: fmt(req.originalAmount) },
                                        { label: 'Requested', value: fmt(req.requestedRefund) },
                                        { label: 'Ref ID', value: req.id },
                                    ].map(({ label, value }) => (
                                        <div key={label} className="bg-white dark:bg-gray-800 rounded-lg p-2">
                                            <p className="text-[10px] text-gray-400 mb-0.5">{label}</p>
                                            <p className="text-[12px] font-semibold text-gray-900 dark:text-white">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* reason */}
                            <div>
                                <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1.5">Reason</p>
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                                    <p className="text-[12px] font-medium text-gray-700 dark:text-gray-300 mb-1">{req.reason}</p>
                                    <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">{req.reasonDetail}</p>
                                </div>
                            </div>

                            {/* action selector */}
                            {req.status === 'Pending' && (
                                <>
                                    <div>
                                        <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Decision</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button onClick={() => setAction('approve')}
                                                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-medium cursor-pointer transition-all border-2 ${action === 'approve' ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-emerald-400'}`}>
                                                <CheckCircle size={15} /> Approve
                                            </button>
                                            <button onClick={() => setAction('reject')}
                                                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-medium cursor-pointer transition-all border-2 ${action === 'reject' ? 'bg-red-600 border-red-600 text-white' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-red-400'}`}>
                                                <XCircle size={15} /> Reject
                                            </button>
                                        </div>
                                    </div>

                                    {/* refund amount */}
                                    {action === 'approve' && (
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500">Refund Amount</p>
                                                <label className="flex items-center gap-1.5 cursor-pointer">
                                                    <input type="checkbox" checked={isPartial} onChange={e => setIsPartial(e.target.checked)}
                                                        className="accent-blue-600 rounded" />
                                                    <span className="text-[11px] text-gray-500 dark:text-gray-400">Partial refund</span>
                                                </label>
                                            </div>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-gray-400 font-medium">£</span>
                                                <input
                                                    type="number"
                                                    value={refundAmount}
                                                    onChange={e => setRefundAmount(e.target.value)}
                                                    disabled={!isPartial}
                                                    max={req.requestedRefund}
                                                    className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg pl-7 pr-3 py-2.5 text-[13px] text-gray-800 dark:text-gray-200 outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-60"
                                                />
                                            </div>
                                            {isPartial && (
                                                <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1">
                                                    Max refundable: {fmt(req.requestedRefund)}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* admin note */}
                                    {action && (
                                        <div>
                                            <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1.5">Admin Note</p>
                                            <textarea
                                                value={adminNote}
                                                onChange={e => setAdminNote(e.target.value)}
                                                rows={2}
                                                placeholder="Add a note for this decision..."
                                                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-[13px] text-gray-800 dark:text-gray-200 placeholder-gray-400 outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                                            />
                                        </div>
                                    )}

                                    {/* submit */}
                                    {action && (
                                        <button onClick={handleSubmit} disabled={loading}
                                            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-semibold text-white cursor-pointer transition-colors disabled:opacity-60 ${action === 'approve' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-red-600 hover:bg-red-500'}`}>
                                            {loading
                                                ? <><RefreshCw size={14} className="animate-spin" /> Processing...</>
                                                : action === 'approve'
                                                    ? <><CheckCircle size={14} /> Confirm Approve {fmt(parseFloat(refundAmount || '0'))}</>
                                                    : <><XCircle size={14} /> Confirm Reject</>}
                                        </button>
                                    )}
                                </>
                            )}

                            {/* already processed */}
                            {req.status !== 'Pending' && req.adminNote && (
                                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-3">
                                    <p className="text-[11px] text-blue-500 dark:text-blue-400 font-medium mb-1">Admin Note</p>
                                    <p className="text-[12px] text-gray-700 dark:text-gray-300">{req.adminNote}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

// ── Main Page ─────────────────────────────────────────────────
export default function RefundRequestsPage() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<RefundStatus | 'All'>('All');
    const [reasonFilter, setReasonFilter] = useState<RefundReason | 'All'>('All');
    const [selected, setSelected] = useState<RefundRequest | null>(null);

    const filtered = useMemo(() => refundRequests.filter(r => {
        const matchSearch =
            r.customerName.toLowerCase().includes(search.toLowerCase()) ||
            r.id.toLowerCase().includes(search.toLowerCase()) ||
            r.originalTxId.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'All' || r.status === statusFilter;
        const matchReason = reasonFilter === 'All' || r.reason === reasonFilter;
        return matchSearch && matchStatus && matchReason;
    }), [search, statusFilter, reasonFilter]);

    const reasons: (RefundReason | 'All')[] = [
        'All', 'Transaction Error', 'Duplicate Payment', 'Service Not Received',
        'Unauthorized Transaction', 'Wrong Amount', 'Customer Request',
    ];

    return (
        <div className="px-4 py-6">
            {/* header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2 text-[13px] text-gray-400 dark:text-gray-500 mb-1">
                        <span>Transactions</span><ChevronRight size={12} />
                        <span className="text-gray-900 dark:text-white font-medium">Refund Requests</span>
                    </div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Refund Requests</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Review and process customer refund requests with partial refund support</p>
                </div>
                {refundStats.pendingRequests > 0 && (
                    <div className="self-start flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-400 text-[12px] font-medium">
                        <Clock size={13} /> {refundStats.pendingRequests} pending review
                    </div>
                )}
            </div>

            {/* stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                {[
                    { label: 'Total Requests', value: refundStats.totalRequests, sub: 'all time', color: '' },
                    { label: 'Pending Review', value: refundStats.pendingRequests, sub: 'awaiting decision', color: 'text-amber-600 dark:text-amber-400' },
                    { label: 'Approved Today', value: refundStats.approvedToday, sub: 'processed', color: 'text-emerald-600 dark:text-emerald-400' },
                    { label: 'Rejected Today', value: refundStats.rejectedToday, sub: 'declined', color: 'text-red-600 dark:text-red-400' },
                    { label: 'Total Refunded', value: `£${(refundStats.totalRefundedAmount / 1000).toFixed(1)}k`, sub: 'disbursed', color: 'text-blue-600 dark:text-blue-400' },
                    { label: 'Approval Rate', value: `${refundStats.approvalRate}%`, sub: 'of all requests', color: 'text-purple-600 dark:text-purple-400' },
                ].map(({ label, value, sub, color }) => (
                    <div key={label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                        <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">{label}</p>
                        <p className={`text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-tight ${color}`}>{value}</p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">{sub}</p>
                    </div>
                ))}
            </div>

            {/* filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mb-4">
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 sm:flex-1 sm:max-w-sm">
                    <Search size={14} className="text-gray-400 shrink-0" />
                    <input value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search ID, customer, transaction..."
                        className="bg-transparent outline-none text-[13px] text-gray-800 dark:text-gray-200 placeholder-gray-400 w-full" />
                </div>
                <div className="flex gap-2 flex-wrap">
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as RefundStatus | 'All')}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-[13px] text-gray-600 dark:text-gray-400 outline-none cursor-pointer">
                        {(['All', 'Pending', 'Approved', 'Rejected', 'Processed', 'Partial'] as const).map(s => (
                            <option key={s} value={s}>{s === 'All' ? 'All Status' : s}</option>
                        ))}
                    </select>
                    <select value={reasonFilter} onChange={e => setReasonFilter(e.target.value as RefundReason | 'All')}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-[13px] text-gray-600 dark:text-gray-400 outline-none cursor-pointer">
                        {reasons.map(r => <option key={r} value={r}>{r === 'All' ? 'All Reasons' : r}</option>)}
                    </select>
                </div>
            </div>

            {/* table */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">

                {/* desktop header */}
                <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1.5fr_1.2fr_1fr_1fr] px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    <span>Customer</span><span>Original Tx</span><span>Requested</span>
                    <span>Reason</span><span>Status</span><span>Requested At</span><span>Action</span>
                </div>

                {filtered.length === 0 && (
                    <div className="py-16 text-center text-gray-400 text-[13px]">No refund requests match filters.</div>
                )}

                {filtered.map(req => {
                    const sc = statusConfig[req.status];
                    const StatusIcon = sc.Icon;

                    return (
                        <div key={req.id}
                            className="border-b border-gray-100 dark:border-gray-700/60 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">

                            {/* desktop row */}
                            <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1.5fr_1.2fr_1fr_1fr] px-4 py-3.5 items-center">
                                {/* customer */}
                                <div className="flex items-center gap-2.5">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 ${avatarConfig[req.customerAvatarColor]}`}>
                                        {req.customerInitials}
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-medium text-gray-900 dark:text-white">{req.customerName}</p>
                                        <p className="text-[10px] text-gray-400 font-mono">{req.id}</p>
                                    </div>
                                </div>

                                {/* original tx */}
                                <div>
                                    <p className="text-[11px] font-mono text-blue-600 dark:text-blue-400">{req.originalTxId}</p>
                                    <p className="text-[11px] text-gray-400">{fmt(req.originalAmount)}</p>
                                </div>

                                {/* requested amount */}
                                <div>
                                    <p className="text-[13px] font-bold text-gray-900 dark:text-white">{fmt(req.requestedRefund)}</p>
                                    {req.approvedRefund !== null && req.approvedRefund !== req.requestedRefund && (
                                        <p className="text-[10px] text-purple-600 dark:text-purple-400">Approved: {fmt(req.approvedRefund)}</p>
                                    )}
                                </div>

                                {/* reason */}
                                <div>
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${reasonConfig[req.reason]}`}>
                                        {req.reason}
                                    </span>
                                </div>

                                {/* status */}
                                <div>
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${sc.classes}`}>
                                        <StatusIcon size={10} /> {sc.label}
                                    </span>
                                </div>

                                {/* date */}
                                <div>
                                    <p className="text-[12px] text-gray-600 dark:text-gray-400">{req.requestedAt.split('T')[0]}</p>
                                    <p className="text-[10px] text-gray-400">{req.requestedAt.split('T')[1]?.slice(0, 5)}</p>
                                </div>

                                {/* action */}
                                <div onClick={e => e.stopPropagation()}>
                                    <button onClick={() => setSelected(req)}
                                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer transition-colors border ${req.status === 'Pending'
                                            ? 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900'
                                            : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                                        {req.status === 'Pending' ? <><Edit3 size={11} /> Review</> : <><Search size={11} /> View</>}
                                    </button>
                                </div>
                            </div>

                            {/* mobile card */}
                            <div className="lg:hidden px-4 py-3.5 cursor-pointer" onClick={() => setSelected(req)}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2.5">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 ${avatarConfig[req.customerAvatarColor]}`}>
                                            {req.customerInitials}
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-medium text-gray-900 dark:text-white">{req.customerName}</p>
                                            <p className="text-[10px] text-gray-400 font-mono">{req.id}</p>
                                        </div>
                                    </div>
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${sc.classes}`}>
                                        <StatusIcon size={10} /> {sc.label}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[14px] font-bold text-gray-900 dark:text-white">{fmt(req.requestedRefund)}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${reasonConfig[req.reason]}`}>{req.reason}</span>
                                            <span className="text-[11px] text-gray-400">{req.requestedAt.split('T')[0]}</span>
                                        </div>
                                    </div>
                                    <button onClick={e => { e.stopPropagation(); setSelected(req); }}
                                        className="px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-400 text-[11px] font-medium cursor-pointer">
                                        {req.status === 'Pending' ? 'Review' : 'View'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-[12px] text-gray-400">Showing {filtered.length} of {refundStats.totalRequests} refund requests</p>
                    <div className="flex gap-1">
                        {(['‹', '1', '2', '3', '...', '5', '›']).map((item, i) => (
                            <button key={i} className={`w-7 h-7 rounded-md flex items-center justify-center text-[12px] cursor-pointer transition-colors ${i === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-400 hover:text-gray-700 dark:hover:text-white'}`}>
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {selected && <ActionModal req={selected} onClose={() => setSelected(null)} />}
        </div>
    );
}