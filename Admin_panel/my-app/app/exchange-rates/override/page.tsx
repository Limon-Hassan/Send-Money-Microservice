'use client';

import { useState } from 'react';
import {
    ChevronRight, ToggleRight, RotateCcw, Clock, AlertTriangle,
    ShieldCheck, CalendarClock, ArrowRight,
} from 'lucide-react';
import {
    currencyRates,
    rateOverrides,
    overrideStats,
    overrideLog,
    overrideDurationOptions,
    RateOverride,
    OverrideStatus,
    OverrideLogEntry,
} from '@/lib/data';

// ── helpers ───────────────────────────────────────────────────
const overrideStatusClasses: Record<OverrideStatus, string> = {
    Active: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    Scheduled: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    Expired: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
    Reverted: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
};

const logActionClasses: Record<OverrideLogEntry['action'], string> = {
    Created: 'bg-emerald-50 text-emerald-500 dark:bg-emerald-950 dark:text-emerald-400',
    Updated: 'bg-blue-50 text-blue-500 dark:bg-blue-950 dark:text-blue-400',
    Reverted: 'bg-amber-50 text-amber-500 dark:bg-amber-950 dark:text-amber-400',
    Expired: 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-400',
};

const fmtDateTime = (iso: string) => {
    const d = new Date(iso);
    return `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
};

// ── Stat cards ────────────────────────────────────────────────
function OverrideStatCards() {
    const s = overrideStats;
    const cards = [
        { label: 'Active Overrides', value: s.activeOverrides, icon: ShieldCheck, color: 'text-emerald-600 dark:text-emerald-400' },
        { label: 'Expiring Soon', value: s.expiringSoon, icon: Clock, color: 'text-amber-600 dark:text-amber-400' },
        { label: 'Total Today', value: s.totalOverridesToday, icon: CalendarClock, color: 'text-blue-600 dark:text-blue-400' },
        { label: 'Avg Duration', value: `${s.avgOverrideDurationHours}h`, icon: RotateCcw, color: 'text-purple-600 dark:text-purple-400' },
    ];
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {cards.map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5">
                    <div className="flex items-center justify-between mb-1">
                        <p className="text-[11px] text-gray-400 dark:text-gray-500">{label}</p>
                        <Icon size={14} className={color} />
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{value}</p>
                </div>
            ))}
        </div>
    );
}

// ── Create Override Form ─────────────────────────────────────
function CreateOverrideForm() {
    const [pairId, setPairId] = useState(currencyRates[0].id);
    const [overrideRate, setOverrideRate] = useState('');
    const [reason, setReason] = useState('');
    const [duration, setDuration] = useState(overrideDurationOptions[2]);
    const [autoRevert, setAutoRevert] = useState(true);

    const pair = currencyRates.find(r => r.id === pairId) ?? currencyRates[0];
    const overrideNum = parseFloat(overrideRate);
    const diffPct = !isNaN(overrideNum) && pair.liveRate
        ? ((overrideNum - pair.liveRate) / pair.liveRate) * 100
        : null;

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 mb-4">Create New Override</h3>

            <div className="space-y-3.5">
                <div>
                    <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Currency Pair</label>
                    <select
                        value={pairId}
                        onChange={e => setPairId(e.target.value)}
                        className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 cursor-pointer"
                    >
                        {currencyRates.map(r => (
                            <option key={r.id} value={r.id}>
                                {r.baseFlag} {r.baseCurrency} / {r.quoteFlag} {r.quoteCurrency}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5">
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-0.5">Live Rate</p>
                        <p className="text-[14px] font-bold text-gray-900 dark:text-white">{pair.liveRate.toFixed(4)}</p>
                    </div>
                    <div>
                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Override Rate</label>
                        <input
                            type="number"
                            step="0.0001"
                            value={overrideRate}
                            onChange={e => setOverrideRate(e.target.value)}
                            placeholder={pair.liveRate.toFixed(4)}
                            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400 dark:focus:border-blue-500"
                        />
                    </div>
                </div>

                {diffPct !== null && (
                    <div className={`flex items-center gap-1.5 text-[12px] font-medium ${diffPct >= 0 ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                        <ArrowRight size={12} className={diffPct < 0 ? 'rotate-90' : '-rotate-90'} />
                        {diffPct >= 0 ? '+' : ''}{diffPct.toFixed(2)}% vs live rate
                    </div>
                )}

                <div>
                    <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Reason for Override</label>
                    <textarea
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                        rows={3}
                        placeholder="Explain why this rate is being overridden (required for audit log)…"
                        className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400 dark:focus:border-blue-500 resize-none"
                    />
                </div>

                <div>
                    <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 block">Duration</label>
                    <select
                        value={duration}
                        onChange={e => setDuration(e.target.value as typeof duration)}
                        className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-[13px] text-gray-700 dark:text-gray-200 cursor-pointer"
                    >
                        {overrideDurationOptions.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>

                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3 py-2.5">
                    <div>
                        <p className="text-[12px] font-medium text-gray-700 dark:text-gray-200">Auto-revert</p>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500">Automatically restore live rate after expiry</p>
                    </div>
                    <button onClick={() => setAutoRevert(v => !v)} className="cursor-pointer">
                        <ToggleRight size={30} className={autoRevert ? 'text-blue-600' : 'text-gray-300 dark:text-gray-600 rotate-180'} />
                    </button>
                </div>

                {autoRevert === false && duration !== 'Until Reverted' && (
                    <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg px-3 py-2">
                        <AlertTriangle size={13} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-amber-700 dark:text-amber-400">
                            Auto-revert is off — this override will stay active past its duration until manually reverted.
                        </p>
                    </div>
                )}

                <button
                    disabled={!overrideRate || !reason}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-blue-600 text-white text-[13px] font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                    Apply Override
                </button>
            </div>
        </div>
    );
}

// ── Active Overrides Table ──────────────────────────────────
function ActiveOverridesTable({ rows }: { rows: RateOverride[] }) {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Active &amp; Scheduled Overrides</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-190">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="px-4 py-2.5 font-medium">Pair</th>
                            <th className="px-2 py-2.5 font-medium">Live Rate</th>
                            <th className="px-2 py-2.5 font-medium">Override Rate</th>
                            <th className="px-2 py-2.5 font-medium">Diff</th>
                            <th className="px-2 py-2.5 font-medium">Set By</th>
                            <th className="px-2 py-2.5 font-medium">Expires</th>
                            <th className="px-2 py-2.5 font-medium">Status</th>
                            <th className="px-2 py-2.5 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(r => (
                            <tr key={r.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                                <td className="px-4 py-2.5 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-800 dark:text-gray-100">
                                        <span>{r.baseFlag}</span><span>{r.quoteFlag}</span>
                                        {r.baseCurrency} / {r.quoteCurrency}
                                    </span>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{r.liveRate.toFixed(4)}</td>
                                <td className="px-2 py-2.5 text-[13px] font-semibold text-gray-900 dark:text-white whitespace-nowrap">{r.overrideRate.toFixed(4)}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[12px] font-medium ${r.diffPct >= 0 ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                                        {r.diffPct >= 0 ? '+' : ''}{r.diffPct.toFixed(2)}%
                                    </span>
                                </td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-600 dark:text-gray-300">
                                        <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[9px] font-semibold flex items-center justify-center">
                                            {r.setByInitials}
                                        </span>
                                        {r.setBy}
                                    </span>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                    {r.expiresAt ? fmtDateTime(r.expiresAt) : 'Manual only'}
                                </td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${overrideStatusClasses[r.status]}`}>{r.status}</span>
                                </td>
                                <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                    {(r.status === 'Active' || r.status === 'Scheduled') ? (
                                        <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-[11px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                                            <RotateCcw size={11} /> Revert
                                        </button>
                                    ) : (
                                        <span className="text-[11px] text-gray-300 dark:text-gray-600">—</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ── Override Activity Log ───────────────────────────────────
function OverrideActivityLog({ rows }: { rows: OverrideLogEntry[] }) {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 mb-4">Override Activity Log</h3>
            <div className="space-y-4 max-h-140 overflow-y-auto pr-1">
                {rows.map((log, idx) => (
                    <div key={log.id} className="flex gap-3 relative">
                        {idx !== rows.length - 1 && (
                            <div className="absolute left-3.75 top-7 -bottom-4 w-px bg-gray-100 dark:bg-gray-700" />
                        )}
                        <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold ${logActionClasses[log.action]}`}>
                            {log.action[0]}
                        </span>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-0.5 flex-wrap">
                                <p className="text-[12px] font-medium text-gray-800 dark:text-gray-100">
                                    {log.action} <span className="text-gray-400 dark:text-gray-500">·</span> {log.pairFlags} {log.pairLabel}
                                </p>
                                <span className="text-[10px] text-gray-400 dark:text-gray-500 whitespace-nowrap">{fmtDateTime(log.timestamp)}</span>
                            </div>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-0.5">{log.note}</p>
                            <p className="text-[11px] text-gray-400 dark:text-gray-500">
                                Rate: <span className="font-medium text-gray-600 dark:text-gray-300">{log.rate.toFixed(4)}</span> · by {log.performedBy}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────
export default function ManualOverridePage() {
    return (
        <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* header */}
            <div className="mb-5">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Manual Override</h1>
                <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                    <span>Dashboard</span><ChevronRight size={12} />
                    <span>Exchange Rates</span><ChevronRight size={12} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Manual Override</span>
                </div>
            </div>

            <OverrideStatCards />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-1">
                    <CreateOverrideForm />
                </div>
                <div className="lg:col-span-2 space-y-4">
                    <ActiveOverridesTable rows={rateOverrides} />
                    <OverrideActivityLog rows={overrideLog} />
                </div>
            </div>
        </div>
    );
}