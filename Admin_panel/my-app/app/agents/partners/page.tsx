'use client';

import { useState } from 'react';
import {
    ChevronRight, Search, Plus, Pencil, X, Handshake, Power, Eye, Mail, Phone,
} from 'lucide-react';
import {
    businessPartners,
    businessPartnersStats,
    businessPartnerTypeOptions,
    businessPartnerStatusOptions,
    BusinessPartner,
    BusinessPartnerStatus,
    BusinessPartnerType,
} from '@/lib/data';

// ── helpers ───────────────────────────────────────────────────
const statusClasses: Record<BusinessPartnerStatus, string> = {
    Active: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    Pending: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    Inactive: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
};

const integrationClasses: Record<string, string> = {
    API: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    Manual: 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400',
    'File-based': 'bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400',
};

const fmtCompact = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
    return n.toLocaleString();
};

// ── Stat cards ────────────────────────────────────────────────
function StatCards() {
    const s = businessPartnersStats;
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {[
                { label: 'Total Partners', value: s.totalPartners.toString() },
                { label: 'Active Partners', value: s.activePartners.toString() },
                { label: 'Pending Approval', value: s.pendingPartners.toString() },
                { label: 'Monthly Volume', value: `£${fmtCompact(s.totalMonthlyVolume)}` },
            ].map(c => (
                <div key={c.label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5">
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-1">{c.label}</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{c.value}</p>
                </div>
            ))}
        </div>
    );
}

// ── Filter bar ────────────────────────────────────────────────
function FilterBar({
    search, setSearch, typeFilter, setTypeFilter, statusFilter, setStatusFilter, onAddClick,
}: {
    search: string; setSearch: (v: string) => void;
    typeFilter: string; setTypeFilter: (v: string) => void;
    statusFilter: string; setStatusFilter: (v: string) => void;
    onAddClick: () => void;
}) {
    return (
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
            <div className="flex items-center gap-2 flex-1 min-w-[180px] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
                <Search size={14} className="text-gray-400 dark:text-gray-500" />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search partner name or contact..."
                    className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
            </div>
            <select
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none"
            >
                {businessPartnerTypeOptions.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none"
            >
                {businessPartnerStatusOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button
                onClick={onAddClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 cursor-pointer sm:ml-auto"
            >
                <Plus size={13} /> Add Partner
            </button>
        </div>
    );
}

// ── Partners Table ────────────────────────────────────────────
function PartnersTable({
    rows, onToggleStatus, onView,
}: { rows: BusinessPartner[]; onToggleStatus: (id: string) => void; onView: (p: BusinessPartner) => void }) {
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[980px]">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="px-4 py-2.5 font-medium">Partner</th>
                            <th className="px-2 py-2.5 font-medium">Type</th>
                            <th className="px-2 py-2.5 font-medium">Country</th>
                            <th className="px-2 py-2.5 font-medium">Contact</th>
                            <th className="px-2 py-2.5 font-medium">Integration</th>
                            <th className="px-2 py-2.5 font-medium">Commission</th>
                            <th className="px-2 py-2.5 font-medium">Monthly Volume</th>
                            <th className="px-2 py-2.5 font-medium">Status</th>
                            <th className="px-2 py-2.5 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageRows.map(p => (
                            <tr key={p.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                                <td className="px-4 py-2.5 whitespace-nowrap">
                                    <div className="flex items-center gap-2.5">
                                        <span className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-[10px] font-semibold flex items-center justify-center">
                                            {p.name.split(' ').slice(0, 2).map(w => w[0]).join('')}
                                        </span>
                                        <p className="text-[13px] font-medium text-gray-800 dark:text-gray-100">{p.name}</p>
                                    </div>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{p.type}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-600 dark:text-gray-300">{p.flag} {p.country}</span>
                                </td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <p className="text-[12px] text-gray-700 dark:text-gray-300">{p.contactPerson}</p>
                                    <p className="text-[10px] text-gray-400 dark:text-gray-500">{p.email}</p>
                                </td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${integrationClasses[p.integrationType]}`}>{p.integrationType}</span>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] font-medium text-gray-900 dark:text-white whitespace-nowrap">{p.commissionRatePct}%</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-700 dark:text-gray-200 whitespace-nowrap">{p.volumeCurrency}{p.monthlyVolume.toLocaleString()}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusClasses[p.status]}`}>{p.status}</span>
                                </td>
                                <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => onView(p)} className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                                            <Eye size={13} />
                                        </button>
                                        <button className="text-gray-400 dark:text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer">
                                            <Pencil size={13} />
                                        </button>
                                        <button
                                            onClick={() => onToggleStatus(p.id)}
                                            className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                                            title={p.status === 'Active' ? 'Deactivate' : 'Activate'}
                                        >
                                            <Power size={13} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 && (
                            <tr><td colSpan={9} className="px-4 py-10 text-center text-[12px] text-gray-400 dark:text-gray-500">No partners match your search.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
                <span>Showing {pageRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {(currentPage - 1) * pageSize + pageRows.length} of {rows.length} partners</span>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >‹</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`px-2.5 py-1 rounded cursor-pointer ${p === currentPage ? 'bg-blue-600 text-white' : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                        >
                            {p}
                        </button>
                    ))}
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >›</button>
                </div>
                <select className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded px-2 py-1 text-[12px] text-gray-600 dark:text-gray-300">
                    <option>10 / page</option><option>20 / page</option><option>50 / page</option>
                </select>
            </div>
        </>
    );
}

// ── View Partner Modal ───────────────────────────────────────────
function ViewPartnerModal({ partner, onClose }: { partner: BusinessPartner; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-5" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white">Partner Details</h3>
                    <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><X size={16} /></button>
                </div>
                <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-[13px] font-semibold flex items-center justify-center">
                        {partner.name.split(' ').slice(0, 2).map(w => w[0]).join('')}
                    </span>
                    <div>
                        <p className="text-[14px] font-semibold text-gray-900 dark:text-white">{partner.name}</p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500">{partner.type}</p>
                    </div>
                </div>
                <div className="space-y-2 mb-4">
                    {[
                        ['Country', `${partner.flag} ${partner.country}`],
                        ['Contact Person', partner.contactPerson],
                        ['Email', partner.email],
                        ['Phone', partner.phone],
                        ['Integration Type', partner.integrationType],
                        ['Commission Rate', `${partner.commissionRatePct}%`],
                        ['Monthly Volume', `${partner.volumeCurrency}${partner.monthlyVolume.toLocaleString()}`],
                        ['Partner Since', partner.partnerSince],
                    ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between text-[12px]">
                            <span className="text-gray-400 dark:text-gray-500">{label}</span>
                            <span className="text-gray-700 dark:text-gray-200 font-medium text-right">{value}</span>
                        </div>
                    ))}
                    <div className="flex items-center justify-between text-[12px]">
                        <span className="text-gray-400 dark:text-gray-500">Status</span>
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusClasses[partner.status]}`}>{partner.status}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <a href={`mailto:${partner.email}`} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        <Mail size={13} /> Email
                    </a>
                    <a href={`tel:${partner.phone}`} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        <Phone size={13} /> Call
                    </a>
                </div>
                <button onClick={onClose} className="w-full mt-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 cursor-pointer">
                    Close
                </button>
            </div>
        </div>
    );
}

// ── Add Partner Modal ─────────────────────────────────────────
function AddPartnerModal({
    onClose, onAdd,
}: { onClose: () => void; onAdd: (name: string, type: string, country: string, contactPerson: string, email: string, phone: string) => void }) {
    const [name, setName] = useState('');
    const [type, setType] = useState('Bank');
    const [country, setCountry] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-sm p-5 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Handshake size={15} className="text-blue-600" /> Add Partner
                    </h3>
                    <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><X size={16} /></button>
                </div>
                <div className="space-y-3">
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Partner Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Wise"
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                    </div>
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Partner Type</label>
                        <select value={type} onChange={e => setType(e.target.value)}
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 cursor-pointer">
                            {businessPartnerTypeOptions.filter(t => t !== 'All Types').map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Country</label>
                        <input value={country} onChange={e => setCountry(e.target.value)} placeholder="e.g. United Kingdom"
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                    </div>
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Contact Person</label>
                        <input value={contactPerson} onChange={e => setContactPerson(e.target.value)} placeholder="Full name"
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Email</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="contact@partner.com"
                                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                        </div>
                        <div>
                            <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Phone</label>
                            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+44 ..."
                                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-5">
                    <button onClick={onClose} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">Cancel</button>
                    <button
                        disabled={!name || !country || !email}
                        onClick={() => { onAdd(name, type, country, contactPerson, email, phone); onClose(); }}
                        className="flex-1 px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Add Partner
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────
export default function PartnerListPage() {
    const [partners, setPartners] = useState(businessPartners);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('All Types');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [showAddPartner, setShowAddPartner] = useState(false);
    const [viewing, setViewing] = useState<BusinessPartner | null>(null);
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

    const toggleStatus = (id: string) => {
        setPartners(prev => prev.map(p => (p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p)));
        showToast('Partner status updated');
    };

    const handleAddPartner = (name: string, type: string, country: string, contactPerson: string, email: string, phone: string) => {
        setPartners(prev => [
            {
                id: `PTN-${Date.now()}`, name, type: type as BusinessPartnerType, country, flag: '🏳️',
                contactPerson: contactPerson || '—', email, phone: phone || '—',
                commissionRatePct: 1.0, integrationType: 'Manual', monthlyVolume: 0, volumeCurrency: '£',
                status: 'Pending', partnerSince: 'Just now',
            },
            ...prev,
        ]);
        showToast(`${name} added — pending approval`);
    };

    const filteredRows = partners.filter(p => {
        if (typeFilter !== 'All Types' && p.type !== typeFilter) return false;
        if (statusFilter !== 'All Status' && p.status !== statusFilter) return false;
        if (!search) return true;
        const q = search.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.contactPerson.toLowerCase().includes(q);
    });

    return (
        <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="mb-5">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Partner List</h1>
                <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                    <span>Dashboard</span><ChevronRight size={12} />
                    <span>Agents & Partners</span><ChevronRight size={12} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Partner List</span>
                </div>
            </div>

            <StatCards />

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                <FilterBar
                    search={search} setSearch={setSearch}
                    typeFilter={typeFilter} setTypeFilter={setTypeFilter}
                    statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                    onAddClick={() => setShowAddPartner(true)}
                />
                <PartnersTable rows={filteredRows} onToggleStatus={toggleStatus} onView={setViewing} />
            </div>

            {showAddPartner && <AddPartnerModal onClose={() => setShowAddPartner(false)} onAdd={handleAddPartner} />}
            {viewing && <ViewPartnerModal partner={viewing} onClose={() => setViewing(null)} />}

            {toast && (
                <div className="fixed bottom-5 right-5 bg-gray-900 dark:bg-gray-700 text-white text-[12px] px-4 py-2.5 rounded-lg shadow-lg z-50">
                    {toast}
                </div>
            )}
        </div>
    );
}