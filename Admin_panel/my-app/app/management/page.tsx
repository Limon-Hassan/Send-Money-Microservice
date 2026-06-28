'use client';

import { useState } from 'react';
import {
    Calendar, ChevronDown, ChevronRight, Globe2, Users2, CircleDollarSign,
    CreditCard, Plus, RefreshCw, UserPlus, Landmark, Receipt,
} from 'lucide-react';
import {
    managementCategoryStats,
    managementDateRangeLabel,
    popularCorridorsManagement,
    countryDistributionByRegion,
    countryMapPoints,
    topAgentsManagement,
    recentExchangeRatesManagement,
    activeFeesManagement,
    branchStatusOverview,
    managementQuickActions,
    permissionsByRole,
    managementSystemSummary,
} from '@/lib/data';

import { flagForCountryName } from '@/lib/countries_data';

function CountryFlag({ country, size = 'w-4 h-4' }: { country: string; size?: string }) {
    return (
        <img
            src={flagForCountryName(country)}
            alt={country}
            className={`${size} rounded-full object-cover inline-block shrink-0`}
        />
    );
}

const TABS = ['Countries & Corridors', 'Agents & Branches', 'Exchange Rates', 'Fees & Charges'] as const;

const categoryIcon: Record<string, React.ElementType> = {
    countries: Globe2, agents: Users2, rates: CircleDollarSign, fees: CreditCard,
};

const quickActionIcon: Record<string, React.ElementType> = {
    'Add Country': Globe2, 'Add Corridor': RefreshCw, 'Add Agent': UserPlus,
    'Add Branch': Landmark, 'Add Exchange Rate': CircleDollarSign, 'Add Fee Rule': Receipt,
};

// ── Category stat cards ───────────────────────────────────────
function CategoryStatCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {managementCategoryStats.map(c => {
                const Icon = categoryIcon[c.key];
                return (
                    <div key={c.key} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2.5">
                                <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${c.iconBg}`}>
                                    <Icon size={16} />
                                </span>
                                <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">{c.title}</p>
                            </div>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 whitespace-nowrap">
                                {c.status}
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{c.value}</p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-3">{c.subLabel}</p>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                            <div>
                                <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">{c.metricA.value}</p>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500">{c.metricA.label}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">{c.metricB.value}</p>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500">{c.metricB.label}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// ── Tabs ──────────────────────────────────────────────────────
function ManagementTabs({ active, setActive }: { active: string; setActive: (v: string) => void }) {
    return (
        <div className="flex items-center gap-6 border-b border-gray-200 dark:border-gray-700 mb-5 overflow-x-auto">
            {TABS.map(tab => (
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

// ── Popular Corridors table ────────────────────────────────────
function PopularCorridorsCard() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 min-h-147.5">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Popular Corridors</h3>
                <button className="text-[12px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">View All</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-125">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="py-2 font-medium">Sending Country</th>
                            <th className="py-2 font-medium">Receiving Country</th>
                            <th className="py-2 font-medium">Currency Pair</th>
                            <th className="py-2 font-medium">Transactions</th>
                            <th className="py-2 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {popularCorridorsManagement.map((c, i) => (
                            <tr key={i} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0">
                                <td className="py-2.5 text-[12px] text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5">
                                        <CountryFlag country={c.sendingCountry} /> {c.sendingCountry}
                                    </span>
                                </td>
                                <td className="py-2.5 text-[12px] text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5">
                                        <CountryFlag country={c.receivingCountry} /> {c.receivingCountry}
                                    </span>
                                </td>
                                <td className="py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{c.currencyPair}</td>
                                <td className="py-2.5 text-[12px] font-medium text-gray-900 dark:text-white whitespace-nowrap">{c.transactions.toLocaleString()}</td>
                                <td className="py-2.5 whitespace-nowrap">
                                    <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">{c.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ── Interactive World Map ──────────────────────────────────────
function WorldMapWidget() {
    const [hovered, setHovered] = useState<typeof countryMapPoints[number] | null>(null);

    const maxTx = Math.max(...countryMapPoints.map(p => p.transactions));
    const radiusFor = (tx: number) => 4 + (tx / maxTx) * 7;

    // tooltip box placement, flipped near right/bottom edges so it stays on-canvas
    const tooltipX = hovered ? (hovered.x > 760 ? hovered.x - 150 : hovered.x + 14) : 0;
    const tooltipY = hovered ? (hovered.y > 420 ? hovered.y - 46 : hovered.y - 8) : 0;

    return (
        <div className="relative">
            <svg viewBox="0 0 1000 500" className="w-full h-auto select-none" style={{ aspectRatio: '2 / 1' }}>
                {/* simplified continent shapes */}
                <g className="fill-gray-100 dark:fill-gray-700">
                    <ellipse cx="220" cy="150" rx="145" ry="95" />
                    <ellipse cx="285" cy="350" rx="65" ry="110" />
                    <ellipse cx="478" cy="130" rx="78" ry="48" />
                    <ellipse cx="515" cy="300" rx="88" ry="118" />
                    <ellipse cx="685" cy="190" rx="185" ry="115" />
                    <ellipse cx="828" cy="385" rx="68" ry="48" />
                </g>

                {/* country points */}
                {countryMapPoints.map(p => (
                    <g
                        key={p.name}
                        onMouseEnter={() => setHovered(p)}
                        onMouseLeave={() => setHovered(null)}
                        className="cursor-pointer"
                    >
                        {/* invisible larger hit area for easier hover */}
                        <circle cx={p.x} cy={p.y} r={14} fill="transparent" />
                        <circle
                            cx={p.x} cy={p.y} r={radiusFor(p.transactions)}
                            className={hovered?.name === p.name ? 'fill-blue-600' : 'fill-blue-400 dark:fill-blue-500'}
                            opacity={hovered && hovered.name !== p.name ? 0.45 : 0.9}
                        />
                        <circle cx={p.x} cy={p.y} r={radiusFor(p.transactions) + 3} className="fill-blue-400 dark:fill-blue-500" opacity={0.15} />
                    </g>
                ))}

                {/* tooltip */}
                {/* tooltip */}
                {hovered && (
                    <g pointerEvents="none">
                        <rect x={tooltipX} y={tooltipY} width={150} height={42} rx={6} className="fill-gray-900 dark:fill-gray-100" opacity={0.95} />
                        <image
                            href={flagForCountryName(hovered.name)}
                            x={tooltipX + 10} y={tooltipY + 7}
                            width={14} height={14}
                            clipPath="circle(7px)"
                        />
                        <text x={tooltipX + 28} y={tooltipY + 17} className="fill-white dark:fill-gray-900" style={{ fontSize: 12, fontWeight: 600 }}>
                            {hovered.name}
                        </text>
                        <text x={tooltipX + 10} y={tooltipY + 32} className="fill-gray-300 dark:fill-gray-600" style={{ fontSize: 10 }}>
                            {hovered.transactions.toLocaleString()} transactions
                        </text>
                    </g>
                )}
            </svg>
        </div>
    );
}

// ── Country Distribution ──────────────────────────────────────
function CountryDistributionCard() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 mb-4">Country Distribution</h3>
            <WorldMapWidget />
            <div className="space-y-3.5 mt-4">
                {countryDistributionByRegion.map(r => (
                    <div key={r.region}>
                        <div className="flex items-center justify-between mb-1">
                            <div>
                                <p className="text-[12px] font-medium text-gray-700 dark:text-gray-300">{r.region}</p>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500">{r.countries} Countries</p>
                            </div>
                            <span className="text-[12px] font-semibold text-gray-700 dark:text-gray-200">{r.pct}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${r.pct}%` }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Top Agents widget ──────────────────────────────────────────
function TopAgentsCard() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Top Agents (By Transactions)</h3>
                <button className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">View All</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-65">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="py-2 font-medium">Agent Name</th>
                            <th className="py-2 font-medium">Transactions</th>
                            <th className="py-2 font-medium">Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topAgentsManagement.map(a => (
                            <tr key={a.agentName} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0">
                                <td className="py-2 text-[12px] text-gray-700 dark:text-gray-300 whitespace-nowrap">{a.agentName}</td>
                                <td className="py-2 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{a.transactions.toLocaleString()}</td>
                                <td className="py-2 text-[12px] font-medium text-gray-900 dark:text-white whitespace-nowrap">{a.volumeCurrency}{a.volume.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ── Recent Exchange Rates widget ───────────────────────────────
function RecentRatesCard() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Recent Exchange Rates</h3>
                <button className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">View All</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-70">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="py-2 font-medium">From</th>
                            <th className="py-2 font-medium">To</th>
                            <th className="py-2 font-medium">Buy Rate</th>
                            <th className="py-2 font-medium">Sell Rate</th>
                            <th className="py-2 font-medium">Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentExchangeRatesManagement.map((r, i) => (
                            <tr key={i} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0">
                                <td className="py-2 text-[12px] text-gray-700 dark:text-gray-300 whitespace-nowrap">{r.from}</td>
                                <td className="py-2 text-[12px] text-gray-700 dark:text-gray-300 whitespace-nowrap">{r.to}</td>
                                <td className="py-2 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.buyRate.toFixed(4)}</td>
                                <td className="py-2 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.sellRate.toFixed(4)}</td>
                                <td className="py-2 text-[11px] text-gray-400 dark:text-gray-500 whitespace-nowrap">{r.updated}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ── Active Fees widget ─────────────────────────────────────────
function ActiveFeesCard() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Active Fees</h3>
                <button className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">View All</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-65">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="py-2 font-medium">Corridor</th>
                            <th className="py-2 font-medium">Fee Type</th>
                            <th className="py-2 font-medium">Charge</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeFeesManagement.map((f, i) => (
                            <tr key={i} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0">
                                <td className="py-2 text-[12px] text-gray-700 dark:text-gray-300 whitespace-nowrap">{f.corridor}</td>
                                <td className="py-2 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{f.feeType}</td>
                                <td className="py-2 text-[12px] font-medium text-gray-900 dark:text-white whitespace-nowrap">{f.charge}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ── Branch Status Overview widget ──────────────────────────────
function BranchStatusCard() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Branch Status Overview</h3>
                <button className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">View All</button>
            </div>
            <div className="space-y-2.5">
                {branchStatusOverview.map(b => (
                    <div key={b.status} className="flex items-center justify-between text-[12px]">
                        <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: b.color }} /> {b.status}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">{b.branches} Branches</span>
                        <span className="font-medium text-gray-800 dark:text-gray-100 w-12 text-right">{b.pct}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Quick Actions widget ───────────────────────────────────────
function QuickActionsCard() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {managementQuickActions.map(a => {
                    const Icon = quickActionIcon[a.label] ?? Plus;
                    return (
                        <button key={a.label} className="flex flex-col items-center gap-2 group cursor-pointer">
                            <span className={`w-11 h-11 rounded-xl flex items-center justify-center ${a.color} group-hover:opacity-80 transition-opacity`}>
                                <Icon size={18} />
                            </span>
                            <span className="text-[10px] text-gray-500 dark:text-gray-400 text-center leading-tight">{a.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// ── Permissions by Role widget ─────────────────────────────────
function PermissionsByRoleCard() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Permissions by Role</h3>
                <button className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">View All</button>
            </div>
            <div className="space-y-3.5">
                {permissionsByRole.map(r => (
                    <div key={r.role}>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[12px] font-medium text-gray-700 dark:text-gray-300">{r.role}</span>
                            <span className="text-[11px] text-gray-400 dark:text-gray-500">{r.description}</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${r.pct}%`, backgroundColor: r.color }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── System Summary widget ──────────────────────────────────────
function SystemSummaryCard() {
    const s = managementSystemSummary;
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 mb-4">System Summary</h3>
            <div className="space-y-3">
                <div className="flex items-center justify-between text-[12px]">
                    <span className="text-gray-500 dark:text-gray-400">Total Users</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{s.totalUsers}</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                    <span className="text-gray-500 dark:text-gray-400">Active Users</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{s.activeUsers}</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                    <span className="text-gray-500 dark:text-gray-400">Total Roles</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{s.totalRoles}</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                    <span className="text-gray-500 dark:text-gray-400">System Status</span>
                    <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> {s.systemStatus}
                    </span>
                </div>
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────
export default function ManagementOverviewPage() {
    const [activeTab, setActiveTab] = useState<string>('Countries & Corridors');

    return (
        <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Management Overview</h1>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-0.5">
                        Manage countries, agents, exchange rates, fees and system configurations.
                    </p>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer whitespace-nowrap">
                    <Calendar size={13} /> {managementDateRangeLabel} <ChevronDown size={13} />
                </button>
            </div>

            <CategoryStatCards />
            <ManagementTabs active={activeTab} setActive={setActiveTab} />

            {activeTab === 'Countries & Corridors' ? (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                        <div className="lg:col-span-2"><PopularCorridorsCard /></div>
                        <div className="lg:col-span-1"><CountryDistributionCard /></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
                        <TopAgentsCard />
                        <RecentRatesCard />
                        <ActiveFeesCard />
                        <BranchStatusCard />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-1"><QuickActionsCard /></div>
                        <div className="lg:col-span-1"><PermissionsByRoleCard /></div>
                        <div className="lg:col-span-1"><SystemSummaryCard /></div>
                    </div>
                </>
            ) : (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-10 text-center text-[13px] text-gray-400 dark:text-gray-500">
                    {activeTab} — coming soon (dedicated page in sidebar)
                </div>
            )}
        </div>
    );
}