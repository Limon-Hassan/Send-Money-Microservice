'use client';

import { useState } from 'react';
import {
    Calendar, ChevronDown, Plus, Search, Filter, Eye, MoreVertical, ExternalLink,
    ArrowRight, MessageSquarePlus, BarChart3, Megaphone, Headphones,
    FileText, ShoppingBag, FileCheck, AlertCircle, Wrench, Settings as SettingsIcon,
    Clock3, CheckCircle2, Mail,
} from 'lucide-react';
import {
    Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement,
    Tooltip as ChartTooltip, Legend as ChartLegend, Filler, ChartOptions,
} from 'chart.js';
import { Line as LineChartJS, Doughnut, Bar } from 'react-chartjs-2';
import {
    supportOverviewStats,
    recentSupportTickets,
    recentSupportTicketsTotalCount,
    supportTicketStatusTabs,
    supportTicketCategoryFilterOptions,
    supportTicketPriorityFilterOptions,
    supportTicketAgentFilterOptions,
    activeLiveChats,
    activeLiveChatsCount,
    recentAnnouncements,
    ticketsByCategory,
    ticketsByCategoryTotal,
    ticketsByPriority,
    ticketsByPriorityTotal,
    slaPerformanceThisWeek,
    slaOverviewThisWeek,
    ticketActivityThisWeek,
    topPerformingSupportAgents,
    TicketPriority,
    TicketStatus,
    AnnouncementPriority,
} from '@/lib/data';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement, ChartTooltip, ChartLegend, Filler);

// ── helpers ───────────────────────────────────────────────────
const priorityClasses: Record<TicketPriority, string> = {
    Low: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    Medium: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    High: 'bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400',
    Critical: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
};

const statusClasses: Record<TicketStatus, string> = {
    Open: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    'In Progress': 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    'Pending Reply': 'bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400',
    Resolved: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    Closed: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
};

const announcementPriorityClasses: Record<AnnouncementPriority, string> = {
    Low: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    Medium: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    High: 'bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400',
    Critical: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
};

const statIcon: Record<string, { Icon: React.ElementType; bg: string }> = {
    'total-tickets': { Icon: FileText, bg: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400' },
    'open-tickets': { Icon: Clock3, bg: 'bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400' },
    'pending-replies': { Icon: Mail, bg: 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400' },
    'resolved-today': { Icon: CheckCircle2, bg: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' },
    'avg-response-time': { Icon: Clock3, bg: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400' },
    'live-chats-active': { Icon: Headphones, bg: 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400' },
    'unread-announcements': { Icon: Megaphone, bg: 'bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400' },
};

const sparklineOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    elements: { point: { radius: 2, hoverRadius: 3 } },
    scales: { x: { display: false }, y: { display: false } },
};

function sparklineData(values: number[], color: string) {
    return {
        labels: values.map((_, i) => i),
        datasets: [{
            data: values,
            borderColor: color,
            backgroundColor: `${color}1a`,
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointBackgroundColor: color,
        }],
    };
}

const donutOptions: ChartOptions<'doughnut'> = {
    responsive: true, maintainAspectRatio: false, cutout: '70%',
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
};

// ── 7 Stat Cards Row ─────────────────────────────────────────
function StatCardsRow() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 mb-5">
            {supportOverviewStats.map(s => {
                const { Icon, bg } = statIcon[s.id];
                const isUp = s.change > 0;
                const isFlat = s.change === 0;
                return (
                    <div key={s.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5">
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${bg}`}>
                                <Icon size={14} />
                            </span>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">{s.label}</p>
                        </div>
                        <p className="text-xl font-bold text-gray-900 dark:text-white mb-1">{s.value}</p>
                        <p className={`text-[11px] mb-2 ${isFlat ? 'text-gray-400 dark:text-gray-500' : isUp ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'
                            }`}>
                            {!isFlat && (isUp ? '↑ ' : '↓ ')}{!isFlat && `${Math.abs(s.change)}% `}{s.changeLabel}
                        </p>
                        <div className="h-8">
                            <LineChartJS data={sparklineData(s.trend, s.trendColor)} options={sparklineOptions} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// ── Status Tabs ──────────────────────────────────────────────
function StatusTabs({ active, setActive }: { active: string; setActive: (v: string) => void }) {
    return (
        <div className="flex items-center gap-5 px-4 pt-3 border-b border-gray-100 dark:border-gray-700/60 overflow-x-auto">
            {supportTicketStatusTabs.map(tab => (
                <button
                    key={tab.label}
                    onClick={() => setActive(tab.label)}
                    className={`pb-2.5 text-[13px] font-medium border-b-2 -mb-px transition-colors cursor-pointer whitespace-nowrap ${active === tab.label
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                        : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                        }`}
                >
                    {tab.label}{tab.count !== null && <span className="ml-1 text-gray-400 dark:text-gray-500">{tab.count}</span>}
                </button>
            ))}
        </div>
    );
}

// ── Filter Bar ────────────────────────────────────────────────
function FilterBar({ search, setSearch }: { search: string; setSearch: (v: string) => void }) {
    return (
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700/60">
            <div className="flex items-center gap-2 flex-1 min-w-40 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
                <Search size={14} className="text-gray-400 dark:text-gray-500" />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search tickets..."
                    className="w-full text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
            </div>
            <select className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none">
                {supportTicketCategoryFilterOptions.map(o => <option key={o}>{o}</option>)}
            </select>
            <select className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none">
                {supportTicketPriorityFilterOptions.map(o => <option key={o}>{o}</option>)}
            </select>
            <select className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 cursor-pointer outline-none">
                {supportTicketAgentFilterOptions.map(o => <option key={o}>{o}</option>)}
            </select>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <Filter size={13} /> Filters
            </button>
        </div>
    );
}

// ── Tickets Table ─────────────────────────────────────────────
function TicketsTable({ rows }: { rows: typeof recentSupportTickets }) {
    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-230">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="px-4 py-2.5 font-medium">Ticket ID</th>
                            <th className="px-2 py-2.5 font-medium">Customer</th>
                            <th className="px-2 py-2.5 font-medium">Category</th>
                            <th className="px-2 py-2.5 font-medium">Subject</th>
                            <th className="px-2 py-2.5 font-medium">Priority</th>
                            <th className="px-2 py-2.5 font-medium">Status</th>
                            <th className="px-2 py-2.5 font-medium">Assigned To</th>
                            <th className="px-2 py-2.5 font-medium">Updated</th>
                            <th className="px-2 py-2.5 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(t => (
                            <tr key={t.id} className="border-b border-gray-50 dark:border-gray-700/40 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-700/30">
                                <td className="px-4 py-2.5 text-[12px] text-blue-600 dark:text-blue-400 font-medium whitespace-nowrap">{t.ticketId}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-700 dark:text-gray-300 whitespace-nowrap">{t.customerName}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{t.category}</td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-700 dark:text-gray-300 whitespace-nowrap max-w-55 truncate">{t.subject}</td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${priorityClasses[t.priority]}`}>{t.priority}</span>
                                </td>
                                <td className="px-2 py-2.5 whitespace-nowrap">
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusClasses[t.status]}`}>{t.status}</span>
                                </td>
                                <td className="px-2 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap">{t.assignedTo}</td>
                                <td className="px-2 py-2.5 text-[11.5px] text-gray-400 dark:text-gray-500 whitespace-nowrap">{t.updated}</td>
                                <td className="px-2 py-2.5 text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"><Eye size={13} /></button>
                                        <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><MoreVertical size={14} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-[12px] text-gray-500 dark:text-gray-400">
                <span>Showing 1 to {rows.length} of {recentSupportTicketsTotalCount.toLocaleString()} tickets</span>
                <div className="flex items-center gap-1">
                    <button className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">‹</button>
                    <button className="px-2.5 py-1 rounded bg-blue-600 text-white cursor-pointer">1</button>
                    <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">2</button>
                    <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">3</button>
                    <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">4</button>
                    <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">5</button>
                    <span className="px-1">...</span>
                    <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">156</button>
                    <button className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">›</button>
                </div>
                <select className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded px-2 py-1 text-[12px] text-gray-600 dark:text-gray-300">
                    <option>10 / page</option><option>20 / page</option><option>50 / page</option>
                </select>
            </div>
        </>
    );
}

// ── Live Chat Card ────────────────────────────────────────────
function LiveChatCard() {
    const [tab, setTab] = useState<'Active Chats' | 'Recent Chats'>('Active Chats');
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center justify-between px-4 pt-3.5 pb-2">
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    Live Chat
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> {activeLiveChatsCount} Active
                    </span>
                </h3>
                <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">
                    <ExternalLink size={14} />
                </button>
            </div>
            <div className="flex items-center gap-5 px-4 border-b border-gray-100 dark:border-gray-700/60">
                {(['Active Chats', 'Recent Chats'] as const).map(t => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`pb-2.5 text-[12px] font-medium border-b-2 -mb-px transition-colors cursor-pointer ${tab === t
                            ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                            : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                            }`}
                    >
                        {t}
                    </button>
                ))}
            </div>
            <div className="px-4 py-3 space-y-3 max-h-70 overflow-y-auto">
                {activeLiveChats.map(c => (
                    <div key={c.id} className="flex items-start gap-2.5">
                        <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[11px] font-semibold flex items-center justify-center shrink-0">
                            {c.customerName.split(' ').slice(0, 2).map(w => w[0]).join('')}
                        </span>
                        <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-medium text-gray-800 dark:text-gray-100">{c.customerName}</p>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{c.messagePreview}</p>
                        </div>
                        <div className="text-right shrink-0">
                            <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-1">{c.timeAgo}</p>
                            {c.unreadCount > 0 && (
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-semibold">
                                    {c.unreadCount}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700/60">
                <button className="text-[12px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center gap-1">
                    View All Chats <ArrowRight size={12} />
                </button>
            </div>
        </div>
    );
}

// ── Announcements Card ────────────────────────────────────────
const announcementIcon = (priority: AnnouncementPriority) => {
    if (priority === 'Critical') return AlertCircle;
    if (priority === 'High') return BarChart3;
    if (priority === 'Medium') return FileCheck;
    return ShoppingBag;
};

function AnnouncementsCard() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 dark:border-gray-700/60">
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Announcements</h3>
                <button className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">View All</button>
            </div>
            <div className="px-4 py-3 space-y-3">
                {recentAnnouncements.map(a => {
                    const Icon = announcementIcon(a.priority);
                    return (
                        <div key={a.id} className="flex items-start gap-2.5">
                            <span className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                                <Icon size={14} />
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="text-[12px] font-medium text-gray-800 dark:text-gray-100">{a.title}</p>
                                <p className="text-[11px] text-gray-500 dark:text-gray-400">{a.description}</p>
                            </div>
                            <div className="text-right shrink-0">
                                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${announcementPriorityClasses[a.priority]}`}>{a.priority}</span>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">{a.date}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700/60">
                <button className="text-[12px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center gap-1">
                    View All Announcements <ArrowRight size={12} />
                </button>
            </div>
        </div>
    );
}

// ── Quick Actions ──────────────────────────────────────────────
function QuickActionsCard() {
    const actions = [
        { label: 'Create Ticket', Icon: MessageSquarePlus, color: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400' },
        { label: 'Start Live Chat', Icon: Headphones, color: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' },
        { label: 'View Reports', Icon: BarChart3, color: 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400' },
        { label: 'Add Announcement', Icon: Megaphone, color: 'bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400' },
    ];
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2.5">
                {actions.map(a => (
                    <button key={a.label} className="flex flex-col items-center gap-1.5 border border-gray-100 dark:border-gray-700 rounded-xl py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${a.color}`}>
                            <a.Icon size={15} />
                        </span>
                        <span className="text-[11px] text-gray-600 dark:text-gray-300 text-center leading-tight">{a.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

// ── Tickets by Category donut ─────────────────────────────────
function TicketsByCategoryChart() {
    const data = {
        labels: ticketsByCategory.map(c => c.label),
        datasets: [{ data: ticketsByCategory.map(c => c.count), backgroundColor: ticketsByCategory.map(c => c.color), borderWidth: 0, hoverOffset: 4 }],
    };
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 mb-3">Tickets by Category</h3>
            <div className="flex items-center gap-4">
                <div className="relative w-27.5 h-27.5 shrink-0">
                    <Doughnut data={data} options={donutOptions} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <p className="text-[15px] font-bold text-gray-900 dark:text-white">{ticketsByCategoryTotal.toLocaleString()}</p>
                        <p className="text-[9px] text-gray-400 dark:text-gray-500">Total</p>
                    </div>
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                    {ticketsByCategory.map(c => (
                        <div key={c.label} className="flex items-center justify-between text-[11px] gap-2">
                            <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 truncate">
                                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} /> {c.label}
                            </span>
                            <span className="text-gray-400 dark:text-gray-500 shrink-0 whitespace-nowrap">{c.count} ({c.percent}%)</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ── Tickets by Priority donut ─────────────────────────────────
function TicketsByPriorityChart() {
    const data = {
        labels: ticketsByPriority.map(c => c.label),
        datasets: [{ data: ticketsByPriority.map(c => c.count), backgroundColor: ticketsByPriority.map(c => c.color), borderWidth: 0, hoverOffset: 4 }],
    };
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 mb-3">Tickets by Priority</h3>
            <div className="flex items-center gap-4">
                <div className="relative w-27.5 h-27.5 shrink-0">
                    <Doughnut data={data} options={donutOptions} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <p className="text-[15px] font-bold text-gray-900 dark:text-white">{ticketsByPriorityTotal.toLocaleString()}</p>
                        <p className="text-[9px] text-gray-400 dark:text-gray-500">Total</p>
                    </div>
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                    {ticketsByPriority.map(c => (
                        <div key={c.label} className="flex items-center justify-between text-[11px] gap-2">
                            <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 truncate">
                                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} /> {c.label}
                            </span>
                            <span className="text-gray-400 dark:text-gray-500 shrink-0 whitespace-nowrap">{c.count} ({c.percent}%)</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ── SLA Performance donut ─────────────────────────────────────
function SlaPerformanceChart() {
    const s = slaPerformanceThisWeek;
    const data = {
        labels: ['Met SLA', 'Breached SLA'],
        datasets: [{ data: [s.metCount, s.breachedCount], backgroundColor: ['#22c55e', '#ef4444'], borderWidth: 0, hoverOffset: 4 }],
    };
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 mb-3">SLA Performance (This Week)</h3>
            <div className="flex items-center gap-4 mb-3">
                <div className="relative w-27.5 h-27.5 shrink-0">
                    <Doughnut data={data} options={donutOptions} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <p className="text-[17px] font-bold text-gray-900 dark:text-white">{s.metPercent}%</p>
                        <p className="text-[9px] text-gray-400 dark:text-gray-500">Met</p>
                    </div>
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] gap-2">
                        <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Met SLA</span>
                        <span className="text-gray-400 dark:text-gray-500">{s.metCount} ({s.metPercent}%)</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] gap-2">
                        <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300"><span className="w-2 h-2 rounded-full bg-red-500" /> Breached SLA</span>
                        <span className="text-gray-400 dark:text-gray-500">{s.breachedCount} ({100 - s.metPercent}%)</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500">Avg Response Time</p>
                    <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">{s.avgResponseTime}</p>
                </div>
                <div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500">Avg Resolution Time</p>
                    <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">{s.avgResolutionTime}</p>
                </div>
            </div>
        </div>
    );
}

// ── SLA Overview (mini line charts) ────────────────────────────
function SlaOverviewCard() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 mb-3">SLA Overview (This Week)</h3>
            <div className="grid grid-cols-2 gap-4">
                {slaOverviewThisWeek.map(m => {
                    const isUp = m.change >= 0;
                    return (
                        <div key={m.label}>
                            <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-1">{m.label}</p>
                            <p className="text-[15px] font-bold text-gray-900 dark:text-white">{m.value}</p>
                            <p className={`text-[10px] mb-1.5 ${isUp ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                                {isUp ? '↑' : '↓'} {Math.abs(m.change)}% {m.changeLabel}
                            </p>
                            <div className="h-9">
                                <LineChartJS data={sparklineData(m.trend, '#3b82f6')} options={sparklineOptions} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ── Ticket Activity bar chart ──────────────────────────────────
function TicketActivityChart() {
    const data = {
        labels: ticketActivityThisWeek.labels,
        datasets: [
            { label: 'Created', data: ticketActivityThisWeek.created, backgroundColor: '#3b82f6', borderRadius: 3, barPercentage: 0.6, categoryPercentage: 0.7 },
            { label: 'Resolved', data: ticketActivityThisWeek.resolved, backgroundColor: '#22c55e', borderRadius: 3, barPercentage: 0.6, categoryPercentage: 0.7 },
        ],
    };
    const options: ChartOptions<'bar'> = {
        responsive: true, maintainAspectRatio: false,
        plugins: {
            legend: { display: true, position: 'top', align: 'end', labels: { boxWidth: 8, boxHeight: 8, font: { size: 10 }, color: '#9ca3af' } },
            tooltip: { backgroundColor: '#111827', padding: 8, cornerRadius: 6 },
        },
        scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#9ca3af' } },
            y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 }, color: '#9ca3af' }, beginAtZero: true },
        },
    };
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 mb-3">Ticket Activity (This Week)</h3>
            <div className="h-45">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}

// ── Top Performing Agents ──────────────────────────────────────
function TopPerformingAgentsCard() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Top Performing Agents</h3>
                <button className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">View All</button>
            </div>
            <div className="space-y-3">
                {topPerformingSupportAgents.map(a => {
                    const pct = Math.min(100, Math.round((a.ticketsResolved / a.maxScale) * 100));
                    return (
                        <div key={a.id} className="flex items-center gap-2.5">
                            <span className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-[10px] font-semibold flex items-center justify-center shrink-0">
                                {a.name.split(' ').slice(0, 2).map(w => w[0]).join('')}
                            </span>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-[12px] font-medium text-gray-800 dark:text-gray-100 truncate">{a.name}</p>
                                    <p className="text-[11px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{a.ticketsResolved}</p>
                                </div>
                                <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────
export default function SupportOverviewPage() {
    const [activeStatusTab, setActiveStatusTab] = useState('All');
    const [search, setSearch] = useState('');

    const filteredTickets = recentSupportTickets.filter(t => {
        if (activeStatusTab !== 'All' && t.status !== activeStatusTab) return false;
        if (!search) return true;
        const q = search.toLowerCase();
        return t.ticketId.toLowerCase().includes(q) || t.customerName.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q);
    });

    return (
        <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Support Overview</h1>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-0.5">
                        Manage customer support, live chats and announcements efficiently.
                    </p>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer whitespace-nowrap">
                    <Calendar size={13} /> May 6 - May 12, 2025 <ChevronDown size={13} />
                </button>
            </div>

            <StatCardsRow />

          
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                        <div className="flex items-center justify-between px-4 pt-3.5">
                            <h3 className="text-[14px] font-semibold text-gray-800 dark:text-gray-100">Recent Support Tickets</h3>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 cursor-pointer">
                                <Plus size={13} /> New Ticket
                            </button>
                        </div>
                        <StatusTabs active={activeStatusTab} setActive={setActiveStatusTab} />
                        <FilterBar search={search} setSearch={setSearch} />
                        <TicketsTable rows={filteredTickets} />
                    </div>
                </div>
                <div className="lg:col-span-1 space-y-4">
                    <LiveChatCard />
                    <AnnouncementsCard />
                    <SlaOverviewCard />
                </div>
            </div>

            {/* donut row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <TicketsByCategoryChart />
                <TicketsByPriorityChart />
                <SlaPerformanceChart />

            </div>

            {/* bottom row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <TicketActivityChart />
                <TopPerformingAgentsCard />
                <QuickActionsCard />
            </div>
        </div>
    );
}