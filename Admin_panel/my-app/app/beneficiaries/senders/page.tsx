"use client";
import { useState } from "react";
import {
    sendersData,
    senderStats,
    senderStatusBadge,
    senderKycBadge,
    senderTransferStatusBadge,
    senderAvatarColors,
    sendersTotalCount,
    type SenderRecord,
} from "@/lib/data";

const avatarColor = (initials: string) => {
    const idx = (initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % senderAvatarColors.length;
    return senderAvatarColors[idx];
};

const statIcon = (icon: string) => {
    if (icon === "total") return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 100-8 4 4 0 000 8zm6 0a4 4 0 100-8 4 4 0 000 8z" />
        </svg>
    );
    if (icon === "active") return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
    if (icon === "volume") return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 10v2m9-8a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 100-8 4 4 0 000 8z" />
        </svg>
    );
};

const statIconBg: Record<string, string> = {
    total: "bg-blue-50 text-blue-600",
    active: "bg-green-50 text-green-600",
    volume: "bg-purple-50 text-purple-600",
    avgBeneficiaries: "bg-orange-50 text-orange-600",
};

type TabKey = "Overview" | "Linked Beneficiaries" | "Transfer History" | "Risk & Status";

export default function SenderListPage() {
    const [selectedId, setSelectedId] = useState(sendersData[0].id);
    const [activeTab, setActiveTab] = useState<TabKey>("Overview");
    const [search, setSearch] = useState("");
    const [showDetail, setShowDetail] = useState(false);
    const [toast, setToast] = useState<string | null>(null);
    const [suspendedIds, setSuspendedIds] = useState<string[]>([]);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const filtered = sendersData.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        s.phone.includes(search) ||
        s.customerId.toLowerCase().includes(search.toLowerCase())
    );

    const sender: SenderRecord = sendersData.find(s => s.id === selectedId) || sendersData[0];
    const isSuspended = suspendedIds.includes(sender.id);
    const effectiveStatus = isSuspended ? "Suspended" : sender.status;

    const tabs: TabKey[] = ["Overview", "Linked Beneficiaries", "Transfer History", "Risk & Status"];

    const handleSelectSender = (id: string) => {
        setSelectedId(id);
        setActiveTab("Overview");
        setShowDetail(true);
    };

    const handleToggleSuspend = () => {
        if (isSuspended) {
            setSuspendedIds(prev => prev.filter(id => id !== sender.id));
            showToast(`"${sender.name}" reinstated as Active`);
        } else {
            setSuspendedIds(prev => [...prev, sender.id]);
            showToast(`"${sender.name}" has been suspended`);
        }
    };

    return (
        <div className="space-y-4">
            {/* Toast */}
            {toast && (
                <div className="fixed top-6 right-6 z-50 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-lg shadow-lg">
                    {toast}
                </div>
            )}

            <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Senders</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Dashboard &gt; Beneficiaries &gt; Senders</p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {senderStats.map(stat => (
                    <div key={stat.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-3.5 flex items-center gap-3">
                        <span className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${statIconBg[stat.icon]}`}>
                            {statIcon(stat.icon)}
                        </span>
                        <div className="min-w-0">
                            <p className="text-base font-bold text-gray-900 dark:text-white truncate">{stat.value}</p>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-4 h-full">

                {/* ── Left: Sender list ── */}
                <div className={`w-full lg:w-72 xl:w-80 shrink-0 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col ${showDetail ? "hidden lg:flex" : "flex"}`}>
                    <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search by name, email, phone or ID..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    <div className="px-4 py-2 flex justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
                        <span>Sender</span>
                        <span>Status</span>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {filtered.map(s => {
                            const suspended = suspendedIds.includes(s.id);
                            const displayStatus = suspended ? "Suspended" : s.status;
                            return (
                                <div
                                    key={s.id}
                                    onClick={() => handleSelectSender(s.id)}
                                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${selectedId === s.id ? "bg-blue-50 dark:bg-blue-900/20 border-l-2 border-l-blue-500" : ""}`}
                                >
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${avatarColor(s.avatar)}`}>
                                        {s.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">{s.name}</div>
                                        <div className="text-xs text-gray-400 truncate">{s.email}</div>
                                        <div className="text-xs text-gray-400">{s.totalBeneficiaries} beneficiar{s.totalBeneficiaries === 1 ? "y" : "ies"} · {s.totalSent}</div>
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0">
                                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${senderStatusBadge[displayStatus]}`}>{displayStatus}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 flex items-center justify-between">
                        <span>Showing 1 to {filtered.length} of {sendersTotalCount.toLocaleString()} senders</span>
                    </div>
                    <div className="px-4 pb-3 flex items-center gap-1 text-xs">
                        <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">‹</button>
                        {[1, 2, 3].map(n => (
                            <button key={n} className={`w-6 h-6 rounded text-xs ${n === 1 ? "bg-green-600 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"}`}>{n}</button>
                        ))}
                        <span className="text-gray-400 px-1">…</span>
                        <button className="w-6 h-6 rounded text-xs hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500">186</button>
                        <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">›</button>
                    </div>
                </div>

                {/* ── Right: Sender Detail ── */}
                <div className={`flex-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col min-w-0 ${showDetail ? "flex" : "hidden lg:flex"}`}>
                    <div className="lg:hidden px-4 pt-4">
                        <button onClick={() => setShowDetail(false)} className="flex items-center gap-1 text-sm text-green-600 font-medium mb-3">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to list
                        </button>
                    </div>

                    <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold ${avatarColor(sender.avatar)}`}>
                                        {sender.avatar}
                                    </div>
                                    <span className={`absolute bottom-0.5 right-0.5 w-3.5 h-3.5 border-2 border-white dark:border-gray-900 rounded-full ${effectiveStatus === "Active" ? "bg-green-500" : effectiveStatus === "Suspended" ? "bg-red-500" : "bg-yellow-500"}`}></span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{sender.name}</h2>
                                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${senderStatusBadge[effectiveStatus]}`}>{effectiveStatus}</span>
                                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${senderKycBadge[sender.kycStatus]}`}>KYC: {sender.kycStatus}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-x-3 text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                        <span>{sender.email}</span>
                                        <span>{sender.phone}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <button className="px-3 py-1.5 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200">
                                    View Customer Profile
                                </button>
                                <button
                                    onClick={handleToggleSuspend}
                                    className={`px-3 py-1.5 text-sm font-medium rounded-lg flex items-center gap-1 ${isSuspended ? "bg-green-600 text-white hover:bg-green-700" : "bg-red-600 text-white hover:bg-red-700"}`}
                                >
                                    {isSuspended ? "Reinstate Sender" : "Suspend Sender"}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-xs text-gray-500 dark:text-gray-400">
                            <div><span className="block text-gray-400 dark:text-gray-500">Customer ID</span><span className="font-medium text-gray-700 dark:text-gray-200">{sender.customerId}</span></div>
                            <div><span className="block text-gray-400 dark:text-gray-500">Joined Date</span><span className="font-medium text-gray-700 dark:text-gray-200">{sender.joinedDate}</span></div>
                            <div><span className="block text-gray-400 dark:text-gray-500">Last Sent On</span><span className="font-medium text-gray-700 dark:text-gray-200">{sender.lastSentOn}</span></div>
                            <div><span className="block text-gray-400 dark:text-gray-500">Preferred Corridor</span><span className="font-medium text-gray-700 dark:text-gray-200">{sender.preferredCorridor}</span></div>
                        </div>

                        <div className="flex gap-0 mt-5 overflow-x-auto border-b border-gray-100 dark:border-gray-800">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${activeTab === tab
                                        ? "border-green-600 text-green-600 dark:text-green-400"
                                        : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                        }`}
                                >
                                    {tab === "Overview" && <span className="hidden sm:inline mr-1">📋 </span>}
                                    {tab === "Linked Beneficiaries" && <span className="hidden sm:inline mr-1">👥 </span>}
                                    {tab === "Transfer History" && <span className="hidden sm:inline mr-1">🔄 </span>}
                                    {tab === "Risk & Status" && <span className="hidden sm:inline mr-1">⚠️ </span>}
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                        {activeTab === "Overview" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                                <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-4">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Sent</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">{sender.totalSent}</p>
                                </div>
                                <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-4">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Transfers</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">{sender.totalTransfers}</p>
                                </div>
                                <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-4">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Avg Transfer Amount</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">{sender.avgTransferAmount}</p>
                                </div>
                                <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-4">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Linked Beneficiaries</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">{sender.totalBeneficiaries}</p>
                                </div>

                                <div className="sm:col-span-2 xl:col-span-2 border border-gray-100 dark:border-gray-800 rounded-xl p-4">
                                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Linked Beneficiaries</h3>
                                    <div className="space-y-2.5">
                                        {sender.linkedBeneficiaries.slice(0, 3).map(b => (
                                            <div key={b.id} className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span>{b.countryFlag}</span>
                                                    <span className="text-sm text-gray-700 dark:text-gray-200">{b.name}</span>
                                                    <span className="text-xs text-gray-400">({b.relationship})</span>
                                                </div>
                                                <span className="text-sm font-semibold text-gray-800 dark:text-white">{b.totalSent}</span>
                                            </div>
                                        ))}
                                        {sender.linkedBeneficiaries.length === 0 && <p className="text-xs text-gray-400">No beneficiaries linked yet.</p>}
                                    </div>
                                    {sender.linkedBeneficiaries.length > 0 && (
                                        <button onClick={() => setActiveTab("Linked Beneficiaries")} className="mt-3 text-xs text-green-600 dark:text-green-400 font-medium hover:underline">
                                            View All Beneficiaries →
                                        </button>
                                    )}
                                </div>

                                <div className="sm:col-span-2 xl:col-span-2 border border-gray-100 dark:border-gray-800 rounded-xl p-4">
                                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Recent Transfers</h3>
                                    <div className="space-y-2.5">
                                        {sender.recentTransfers.slice(0, 3).map(t => (
                                            <div key={t.id} className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span>{t.beneficiaryFlag}</span>
                                                    <span className="text-sm text-gray-700 dark:text-gray-200">{t.beneficiaryName}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-semibold text-gray-800 dark:text-white">{t.amount}</span>
                                                    <span className={`px-1.5 py-0.5 text-[11px] rounded-full ${senderTransferStatusBadge[t.status]}`}>{t.status}</span>
                                                </div>
                                            </div>
                                        ))}
                                        {sender.recentTransfers.length === 0 && <p className="text-xs text-gray-400">No transfers yet.</p>}
                                    </div>
                                    {sender.recentTransfers.length > 0 && (
                                        <button onClick={() => setActiveTab("Transfer History")} className="mt-3 text-xs text-green-600 dark:text-green-400 font-medium hover:underline">
                                            View All Transfers →
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "Linked Beneficiaries" && (
                            <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-4">
                                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">Linked Beneficiaries ({sender.linkedBeneficiaries.length})</h3>
                                <div className="space-y-3">
                                    {sender.linkedBeneficiaries.map(b => (
                                        <div key={b.id} className="flex items-center gap-4 p-3 border border-gray-100 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                            <span className="text-2xl">{b.countryFlag}</span>
                                            <div className="flex-1">
                                                <div className="text-sm font-semibold text-gray-800 dark:text-white">{b.name}</div>
                                                <div className="text-xs text-gray-400">{b.relationship} · {b.country}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-semibold text-gray-800 dark:text-white">{b.totalSent}</div>
                                                <div className="text-xs text-gray-400">Last sent {b.lastSentOn}</div>
                                            </div>
                                        </div>
                                    ))}
                                    {sender.linkedBeneficiaries.length === 0 && (
                                        <p className="text-sm text-gray-400 text-center py-6">This sender has not added any beneficiaries yet.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "Transfer History" && (
                            <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-4">
                                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">Transfer History</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800">
                                                <th className="text-left pb-3 font-medium pr-4">Beneficiary</th>
                                                <th className="text-left pb-3 font-medium pr-4">Amount</th>
                                                <th className="text-left pb-3 font-medium pr-4">Fee</th>
                                                <th className="text-left pb-3 font-medium pr-4">Status</th>
                                                <th className="text-left pb-3 font-medium">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                            {sender.recentTransfers.map(t => (
                                                <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                                    <td className="py-3 pr-4 text-gray-700 dark:text-gray-200"><span className="mr-1">{t.beneficiaryFlag}</span>{t.beneficiaryName}</td>
                                                    <td className="py-3 pr-4 font-semibold text-gray-800 dark:text-white">{t.amount}</td>
                                                    <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{t.fee}</td>
                                                    <td className="py-3 pr-4"><span className={`px-1.5 py-0.5 rounded-full ${senderTransferStatusBadge[t.status]}`}>{t.status}</span></td>
                                                    <td className="py-3 text-gray-500 dark:text-gray-400">{t.date}</td>
                                                </tr>
                                            ))}
                                            {sender.recentTransfers.length === 0 && (
                                                <tr><td colSpan={5} className="py-6 text-center text-gray-400">No transfers recorded yet.</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === "Risk & Status" && (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-4">
                                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Account Status</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-400">Current Status</span>
                                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${senderStatusBadge[effectiveStatus]}`}>{effectiveStatus}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-400">KYC Status</span>
                                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${senderKycBadge[sender.kycStatus]}`}>{sender.kycStatus}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-400">Preferred Corridor</span>
                                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">{sender.preferredCorridor}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                                        <button
                                            onClick={handleToggleSuspend}
                                            className={`w-full py-2 text-xs font-semibold rounded-lg ${isSuspended ? "bg-green-600 text-white hover:bg-green-700" : "border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"}`}
                                        >
                                            {isSuspended ? "Reinstate Sender" : "Suspend Sender"}
                                        </button>
                                    </div>
                                </div>

                                <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-4">
                                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Risk Indicators</h4>
                                    <div className="space-y-2">
                                        {[
                                            { label: "Velocity Risk", pct: sender.totalTransfers > 40 ? 35 : 12, level: sender.totalTransfers > 40 ? "Medium" : "Low" },
                                            { label: "Corridor Risk", pct: 18, level: "Low" },
                                            { label: "Behavioral Risk", pct: sender.kycStatus === "Rejected" ? 80 : 10, level: sender.kycStatus === "Rejected" ? "High" : "Low" },
                                        ].map(r => (
                                            <div key={r.label}>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-[11px] text-gray-400">{r.label}</span>
                                                    <span className={`text-[11px] font-semibold ${r.level === "Low" ? "text-green-600 dark:text-green-400" : r.level === "Medium" ? "text-yellow-600 dark:text-yellow-400" : "text-red-600 dark:text-red-400"}`}>{r.level}</span>
                                                </div>
                                                <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${r.level === "Low" ? "bg-green-500" : r.level === "Medium" ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${r.pct}%` }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}