'use client';

import { useState } from 'react';
import {
    ChevronRight, Search, ChevronDown, Filter, Download, Eye, Pencil, Trash2,
    FileText, Clock3, CheckCircle2, XCircle, Calendar, X, Check,
} from 'lucide-react';
import {
    allPickupRequests,
    cashPickupDashboardStats,
    CashPickupRequest,
    CashPickupStatus,
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




const statusClasses: Record<CashPickupStatus, string> = {
    Pending: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    Approved: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    Completed: 'bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400',
    Cancelled: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
};

const currencySymbol: Record<string, string> = { BDT: '৳', PHP: '₱', INR: '₹', AED: 'AED ' };
const sym = (c: string) => currencySymbol[c] ?? '';

const STATUS_TABS = ['All', 'Pending', 'Approved', 'Completed', 'Cancelled'] as const;

// ── Stat strip ────────────────────────────────────────────────
function StatStrip() {
    const s = cashPickupDashboardStats;
    const items = [
        { label: 'Total', value: s.totalRequests, Icon: FileText, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950' },
        { label: 'Pending', value: s.pendingRequests, Icon: Clock3, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950' },
        { label: 'Approved', value: s.approvedRequests, Icon: CheckCircle2, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950' },
        { label: 'Completed', value: s.completedRequests, Icon: CheckCircle2, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-950' },
        { label: 'Cancelled', value: s.cancelledRequests, Icon: XCircle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950' },
    ];
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
            {items.map(it => (
                <div key={it.label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5 flex items-center gap-3">
                    <span className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${it.bg} ${it.color}`}>
                        <it.Icon size={16} />
                    </span>
                    <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{it.value.toLocaleString()}</p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500">{it.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ── Status tabs ───────────────────────────────────────────────
function StatusTabs({ active, setActive }: { active: string; setActive: (v: string) => void }) {
    return (
        <div className="flex items-center gap-6 px-4 pt-3 border-b border-gray-100 dark:border-gray-700/60 overflow-x-auto">
            {STATUS_TABS.map(tab => (
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

// ── Filter bar ────────────────────────────────────────────────
function FilterBar({ search, setSearch }: { search: string; setSearch: (v: string) => void }) {
    return (
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
            <div className="flex items-center gap-2 flex-1 min-w-45 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
                <Search size={14} className="text-gray-400 dark:text-gray-500" />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by transaction number, name, mobile..."
                    className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                All Countries <ChevronDown size={13} />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                All Agents <ChevronDown size={13} />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <Calendar size={13} /> <span className="hidden sm:inline">Date Range</span> <ChevronDown size={13} />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <Filter size={13} /> Filters
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer sm:ml-auto">
                <Download size={13} /> Export
            </button>
        </div>
    );
}

// ── Requests Table ────────────────────────────────────────────
function RequestsTable({
    rows, onView, onEdit, onDelete, onBulkApprove, onBulkCancel, onBulkExport,
}: {
    rows: CashPickupRequest[];
    onView: (r: CashPickupRequest) => void;
    onEdit: (r: CashPickupRequest) => void;
    onDelete: (r: CashPickupRequest) => void;
    onBulkApprove: (ids: string[]) => void;
    onBulkCancel: (ids: string[]) => void;
    onBulkExport: (ids: string[]) => void;
}) {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const allSelected = rows.length > 0 && rows.every(r => selectedIds.has(r.id));

    const toggleAll = () => {
        if (allSelected) setSelectedIds(new Set());
        else setSelectedIds(new Set(rows.map(r => r.id)));
    };
    const toggleOne = (id: string) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    return (
        <>
            {selectedIds.size > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-2.5 bg-blue-50 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900 text-[12px]">
                    <span className="text-blue-700 dark:text-blue-300 font-medium">{selectedIds.size} selected</span>
                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            onClick={() => { onBulkApprove([...selectedIds]); setSelectedIds(new Set()); }}
                            className="px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 cursor-pointer"
                        >
                            Approve
                        </button>
                        <button
                            onClick={() => onBulkExport([...selectedIds])}
                            className="px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 cursor-pointer"
                        >
                            Export Selected
                        </button>
                        <button
                            onClick={() => { onBulkCancel([...selectedIds]); setSelectedIds(new Set()); }}
                            className="px-2.5 py-1 rounded-lg border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-245">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="px-4 py-2.5 font-medium w-8">
                                <input type="checkbox" checked={allSelected} onChange={toggleAll}
                                    className="w-3.5 h-3.5 rounded border-gray-300 dark:border-gray-600 cursor-pointer accent-blue-600" />
                            </th>
                            <th className="px-2 py-2.5 font-medium">Transaction Number</th>
                            <th className="px-2 py-2.5 font-medium">Sender Name</th>
                            <th className="px-2 py-2.5 font-medium">Recipient Name</th>
                            <th className="px-2 py-2.5 font-medium">Country</th>
                            <th className="px-2 py-2.5 font-medium">City</th>
                            <th className="px-2 py-2.5 font-medium">Mobile</th>
                            <th className="px-2 py-2.5 font-medium">Amount</th>
                            <th className="px-2 py-2.5 font-medium">Pickup Date</th>
                            <th className="px-2 py-2.5 font-medium">Agent Name</th>
                            <th className="px-2 py-2.5 font-medium">Status</th>
                            <th className="px-2 py-2.5 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(r => (
                            <tr key={r.id} className={`border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30 ${selectedIds.has(r.id) ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                                }`}>
                                <td className="px-4 py-2.5">
                                    <input type="checkbox" checked={selectedIds.has(r.id)} onChange={() => toggleOne(r.id)}
                                        className="w-3.5 h-3.5 rounded border-gray-300 dark:border-gray-600 cursor-pointer accent-blue-600" />
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-blue-600 dark:text-blue-400 font-medium whitespace-nowrap">{r.id}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-700 dark:text-gray-300 whitespace-nowrap">{r.senderName}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-700 dark:text-gray-300 whitespace-nowrap">{r.recipientName}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-600 dark:text-gray-300">
                                        <CountryFlag country={r.country} /> {r.country}
                                    </span>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{r.city}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{r.mobile}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <p className="text-[13px] font-semibold text-gray-900 dark:text-white">{sym(r.currency)}{r.amount.toLocaleString()}</p>
                                    <p className="text-[10px] text-gray-400 dark:text-gray-500">{r.currency}</p>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{r.pickupDate}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.agentName}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusClasses[r.status]}`}>{r.status}</span>
                                </td>
                                <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => onView(r)} className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                                            <Eye size={13} />
                                        </button>
                                        <button onClick={() => onEdit(r)} className="text-gray-400 dark:text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer">
                                            <Pencil size={13} />
                                        </button>
                                        <button onClick={() => onDelete(r)} className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 cursor-pointer">
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 && (
                            <tr>
                                <td colSpan={12} className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">
                                    No requests match your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
                <span>Showing 1 to {rows.length} of {cashPickupDashboardStats.totalRequests.toLocaleString()} requests</span>
                <div className="flex items-center gap-1">
                    <button className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">‹</button>
                    <button className="px-2.5 py-1 rounded bg-blue-600 text-white cursor-pointer">1</button>
                    <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">2</button>
                    <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">3</button>
                    <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">4</button>
                    <span className="px-1">...</span>
                    <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">125</button>
                    <button className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">›</button>
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

// ── View Details Modal ───────────────────────────────────────
function ViewModal({ request, onClose }: { request: CashPickupRequest; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
            <div
                className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-5 max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white">Request Details</h3>
                    <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">
                        <X size={16} />
                    </button>
                </div>
                <div className="space-y-2.5">
                    {[
                        ['Transaction Number', request.id],
                        ['Sender Name', request.senderName],
                        ['Recipient Name', request.recipientName],
                        ['Country', `${request.countryFlag} ${request.country}`],
                        ['City', request.city],
                        ['Mobile', request.mobile],
                        ['Amount', `${sym(request.currency)}${request.amount.toLocaleString()} ${request.currency}`],
                        ['Pickup Date', request.pickupDate],
                        ['Agent Name', request.agentName],
                    ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between text-[12px]">
                            <span className="text-gray-400 dark:text-gray-500">{label}</span>
                            <span className="text-gray-700 dark:text-gray-200 font-medium text-right">{value}</span>
                        </div>
                    ))}
                    <div className="flex items-center justify-between text-[12px]">
                        <span className="text-gray-400 dark:text-gray-500">Status</span>
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusClasses[request.status]}`}>{request.status}</span>
                    </div>
                </div>
                <button onClick={onClose} className="w-full mt-5 px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 cursor-pointer">
                    Close
                </button>
            </div>
        </div>
    );
}

// ── Edit Status Modal ─────────────────────────────────────────
function EditModal({
    request, onClose, onSave,
}: { request: CashPickupRequest; onClose: () => void; onSave: (id: string, status: CashPickupStatus) => void }) {
    const [status, setStatus] = useState<CashPickupStatus>(request.status);
    const STATUSES: CashPickupStatus[] = ['Pending', 'Approved', 'Completed', 'Cancelled'];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
            <div
                className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-5"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white">Edit Request — {request.id}</h3>
                    <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">
                        <X size={16} />
                    </button>
                </div>

                <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-1">
                    {request.senderName} → {request.recipientName} · {sym(request.currency)}{request.amount.toLocaleString()}
                </p>

                <label className="text-[11px] text-gray-400 dark:text-gray-500 mt-4 mb-1 block">Status</label>
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
                        onClick={() => { onSave(request.id, status); onClose(); }}
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
export default function AllRequestsPage() {
    const [requests, setRequests] = useState<CashPickupRequest[]>(allPickupRequests);
    const [activeStatus, setActiveStatus] = useState<string>('All');
    const [search, setSearch] = useState('');
    const [viewing, setViewing] = useState<CashPickupRequest | null>(null);
    const [editing, setEditing] = useState<CashPickupRequest | null>(null);
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2500);
    };

    const updateStatus = (id: string, status: CashPickupStatus) => {
        setRequests(prev => prev.map(r => (r.id === id ? { ...r, status } : r)));
        showToast(`${id} updated to ${status}`);
    };

    const handleDelete = (r: CashPickupRequest) => {
        if (window.confirm(`Delete request ${r.id}? This cannot be undone.`)) {
            setRequests(prev => prev.filter(x => x.id !== r.id));
            showToast(`${r.id} deleted`);
        }
    };

    const handleBulkApprove = (ids: string[]) => {
        setRequests(prev => prev.map(r => (ids.includes(r.id) ? { ...r, status: 'Approved' } : r)));
        showToast(`${ids.length} request(s) approved`);
    };

    const handleBulkCancel = (ids: string[]) => {
        setRequests(prev => prev.map(r => (ids.includes(r.id) ? { ...r, status: 'Cancelled' } : r)));
        showToast(`${ids.length} request(s) cancelled`);
    };

    const handleBulkExport = (ids: string[]) => {
        showToast(`Exporting ${ids.length} request(s)…`);
    };

    const filteredRows = requests.filter(r => {
        if (activeStatus !== 'All' && r.status !== activeStatus) return false;
        if (!search) return true;
        const q = search.toLowerCase();
        return (
            r.id.toLowerCase().includes(q) ||
            r.senderName.toLowerCase().includes(q) ||
            r.recipientName.toLowerCase().includes(q) ||
            r.mobile.includes(q)
        );
    });

    return (
        <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* header */}
            <div className="mb-5">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">All Requests</h1>
                <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                    <span>Dashboard</span><ChevronRight size={12} />
                    <span>Cash Pickup</span><ChevronRight size={12} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">All Requests</span>
                </div>
            </div>

            <StatStrip />

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                <StatusTabs active={activeStatus} setActive={setActiveStatus} />
                <FilterBar search={search} setSearch={setSearch} />
                <RequestsTable
                    rows={filteredRows}
                    onView={setViewing}
                    onEdit={setEditing}
                    onDelete={handleDelete}
                    onBulkApprove={handleBulkApprove}
                    onBulkCancel={handleBulkCancel}
                    onBulkExport={handleBulkExport}
                />
            </div>

            {viewing && <ViewModal request={viewing} onClose={() => setViewing(null)} />}
            {editing && <EditModal request={editing} onClose={() => setEditing(null)} onSave={updateStatus} />}

            {toast && (
                <div className="fixed bottom-5 right-5 bg-gray-900 dark:bg-gray-700 text-white text-[12px] px-4 py-2.5 rounded-lg shadow-lg z-50">
                    {toast}
                </div>
            )}
        </div>
    );
}