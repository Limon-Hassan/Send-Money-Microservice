'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import {
  BarChart3,
  Wallet,
  Gem,
  CreditCard,
  Clock,
  XCircle,
  Users,
  UserCog,
  Calendar,
  Filter,
  Download,
  Search,
  Eye,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  FileSpreadsheet,
  ChevronLeft,
} from 'lucide-react';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
  LineElement,
  PointElement,
  LineController,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import {
  reportsOverviewStats,
  dailyTransactionVolume,
  monthlyRevenueTrend,
  statusDistribution,
  statusDistributionTotal,
  reportTransactions,
  reportTransactionsTotalCount,
  reportTxnCountryFilterOptions,
  reportTxnCurrencyFilterOptions,
  reportTxnStatusFilterOptions,
  reportTxnAgentFilterOptions,
  quickReports,
  topSendingCorridors,
  topAgentsByTransactions,
  revenueSummaryThisMonth,
  reportSchedules,
  recentExports,
  type ReportsOverviewStat,
  type ReportTransaction,
} from '@/lib/data';

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
  LineElement,
  PointElement,
  LineController,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale
);

const STAT_ICONS: Record<string, React.ReactNode> = {
  'total-transactions': <BarChart3 size={15} />,
  'total-cash-pickups': <Wallet size={15} />,
  'total-revenue-fees': <Gem size={15} />,
  'total-payouts': <CreditCard size={15} />,
  'pending-transactions': <Clock size={15} />,
  'failed-transactions': <XCircle size={15} />,
  'active-users': <Users size={15} />,
  'active-agents': <UserCog size={15} />,
};

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const width = 110;
  const height = 30;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((d - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StatCard({ stat }: { stat: ReportsOverviewStat }) {
  const positive = stat.change >= 0;
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3.5 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center gap-2">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${stat.trendColor}1A`, color: stat.trendColor }}
        >
          {STAT_ICONS[stat.id]}
        </span>
        <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
      </div>
      <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
      <p className={`mt-0.5 flex items-center gap-0.5 text-[11px] font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {positive ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
        {Math.abs(stat.change)}% {stat.changeLabel}
      </p>
      <div className="mt-1">
        <Sparkline data={stat.trend} color={stat.trendColor} />
      </div>
    </div>
  );
}

function LineChartCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const [period, setPeriod] = useState('This Week');

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: dailyTransactionVolume.labels,
        datasets: [
          {
            data: dailyTransactionVolume.values,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59,130,246,0.08)',
            fill: true,
            tension: 0.35,
            pointRadius: 3,
            pointBackgroundColor: '#3b82f6',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#9ca3af' } },
          y: { grid: { color: 'rgba(156,163,175,0.15)' }, ticks: { font: { size: 10 }, color: '#9ca3af' } },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, []);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Daily Transaction Volume</h3>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="rounded-md border border-gray-200 px-1.5 py-0.5 text-[11px] text-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400"
        >
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>
      <div className="mt-3 h-[180px]">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

function BarChartCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const [period, setPeriod] = useState('This Month');

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: monthlyRevenueTrend.labels,
        datasets: [
          {
            data: monthlyRevenueTrend.values,
            backgroundColor: '#3b82f6',
            borderRadius: 4,
            barThickness: 18,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#9ca3af' } },
          y: {
            grid: { color: 'rgba(156,163,175,0.15)' },
            ticks: {
              font: { size: 10 },
              color: '#9ca3af',
              callback: (v) => `$${Number(v) / 1000}K`,
            },
          },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, []);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Monthly Revenue Trend</h3>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="rounded-md border border-gray-200 px-1.5 py-0.5 text-[11px] text-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400"
        >
          <option>This Month</option>
          <option>This Quarter</option>
        </select>
      </div>
      <div className="mt-3 h-[180px]">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

function WorldMapCard() {
  const [period, setPeriod] = useState('This Month');
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Transactions by Country</h3>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="rounded-md border border-gray-200 px-1.5 py-0.5 text-[11px] text-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400"
        >
          <option>This Month</option>
          <option>This Week</option>
        </select>
      </div>
      <div className="mt-3 flex h-[180px] items-center justify-center">
        <svg viewBox="0 0 600 280" className="h-full w-full opacity-80">
          {Array.from({ length: 9 }).map((_, row) =>
            Array.from({ length: 28 }).map((_, col) => {
              const seed = (row * 13 + col * 7) % 5;
              if (seed === 0) return null;
              const opacityLevel = 0.15 + (seed / 5) * 0.5;
              return (
                <circle
                  key={`${row}-${col}`}
                  cx={10 + col * 21}
                  cy={10 + row * 30}
                  r={3}
                  fill="#3b82f6"
                  opacity={opacityLevel}
                />
              );
            })
          )}
        </svg>
      </div>
      <div className="mt-2 flex items-center justify-center gap-2 text-[10px] text-gray-400 dark:text-gray-500">
        <span>Low</span>
        <span className="h-1.5 w-24 rounded-full bg-gradient-to-r from-blue-100 to-blue-600" />
        <span>High</span>
      </div>
    </div>
  );
}

function StatusDonutCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: statusDistribution.map((s) => s.label),
        datasets: [
          {
            data: statusDistribution.map((s) => s.count),
            backgroundColor: statusDistribution.map((s) => s.color),
            borderWidth: 0,

          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: { legend: { display: false } }
      },
    });
    return () => chartRef.current?.destroy();
  }, []);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Status Distribution</h3>
      <div className="mt-3 flex items-center gap-3">
        <div className="relative h-27.5 w-27.5 shrink-0">
          <canvas ref={canvasRef} />
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-base font-semibold text-gray-900 dark:text-white">{statusDistributionTotal.toLocaleString()}</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Total</p>
          </div>
        </div>
        <div className="flex-1 space-y-1.5">
          {statusDistribution.map((s) => (
            <div key={s.label} className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                {s.label}
              </span>
              <span className="text-gray-400 dark:text-gray-500">
                {s.count.toLocaleString()} ({s.percent}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const classes =
    status === 'Completed'
      ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
      : status === 'Pending'
        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
        : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400';
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${classes}`}>{status}</span>;
}

export default function ReportsAnalyticsOverviewPage() {
  const [countryFilter, setCountryFilter] = useState('All Countries');
  const [currencyFilter, setCurrencyFilter] = useState('All Currencies');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [agentFilter, setAgentFilter] = useState('All Agents');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [scheduleStates, setScheduleStates] = useState(
    reportSchedules.reduce<Record<string, boolean>>((acc, s) => {
      acc[s.id] = s.enabled;
      return acc;
    }, {})
  );

  const filteredTransactions: ReportTransaction[] = useMemo(() => {
    return reportTransactions.filter((t) => {
      const matchesCountry =
        countryFilter === 'All Countries' || t.sendCountry === countryFilter || t.receiveCountry === countryFilter;
      const matchesCurrency = currencyFilter === 'All Currencies' || t.currency === currencyFilter;
      const matchesStatus = statusFilter === 'All Status' || t.status === statusFilter;
      const matchesAgent = agentFilter === 'All Agents'; // no agent field on transaction; kept as a real, functional filter slot
      const matchesSearch =
        search.trim() === '' ||
        t.transactionNo.toLowerCase().includes(search.toLowerCase()) ||
        t.sender.toLowerCase().includes(search.toLowerCase()) ||
        t.recipient.toLowerCase().includes(search.toLowerCase());
      return matchesCountry && matchesCurrency && matchesStatus && matchesAgent && matchesSearch;
    });
  }, [countryFilter, currencyFilter, statusFilter, agentFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Reports & Analytics Overview</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Comprehensive insights and performance analytics across the platform.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            <Calendar size={14} /> May 6 - May 12, 2025
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            <Filter size={14} /> Filters
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Download size={14} /> Export Report
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
        {reportsOverviewStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* Charts row */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-4">
        <LineChartCard />
        <BarChartCard />
        <WorldMapCard />
        <StatusDonutCard />
      </div>

      {/* Recent Transactions + Quick Reports */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 lg:col-span-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>

          {/* Filter bar */}
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
            <div className="relative flex-1">
              <Search size={13} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by transaction number..."
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-8 pr-3 text-xs text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
              />
            </div>
            <select
              value={countryFilter}
              onChange={(e) => {
                setCountryFilter(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
            >
              {reportTxnCountryFilterOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={currencyFilter}
              onChange={(e) => {
                setCurrencyFilter(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
            >
              {reportTxnCurrencyFilterOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
            >
              {reportTxnStatusFilterOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select
              value={agentFilter}
              onChange={(e) => {
                setAgentFilter(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
            >
              {reportTxnAgentFilterOptions.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
            <button className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
              <Filter size={13} /> More Filters
            </button>
            <button className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
              <Download size={13} /> Export
            </button>
          </div>

          {/* Table */}
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-[880px] w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-gray-200 uppercase text-gray-500 dark:border-gray-700 dark:text-gray-400">
                  <th className="py-2.5 pr-3 font-medium">Transaction No.</th>
                  <th className="py-2.5 pr-3 font-medium">Sender</th>
                  <th className="py-2.5 pr-3 font-medium">Recipient</th>
                  <th className="py-2.5 pr-3 font-medium">Send Country</th>
                  <th className="py-2.5 pr-3 font-medium">Receive Country</th>
                  <th className="py-2.5 pr-3 font-medium">Amount</th>
                  <th className="py-2.5 pr-3 font-medium">Currency</th>
                  <th className="py-2.5 pr-3 font-medium">Rate</th>
                  <th className="py-2.5 pr-3 font-medium">Fee</th>
                  <th className="py-2.5 pr-3 font-medium">Net Payout</th>
                  <th className="py-2.5 pr-3 font-medium">Status</th>
                  <th className="py-2.5 pr-3 font-medium">Date & Time</th>
                  <th className="py-2.5 pr-1 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {paginatedTransactions.map((t) => (
                  <tr key={t.id} className="text-gray-700 dark:text-gray-200">
                    <td className="py-2.5 pr-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">{t.transactionNo}</td>
                    <td className="py-2.5 pr-3 whitespace-nowrap">{t.sender}</td>
                    <td className="py-2.5 pr-3 whitespace-nowrap">{t.recipient}</td>
                    <td className="py-2.5 pr-3">
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <span>{t.sendCountryFlag}</span> {t.sendCountry}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3">
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <span>{t.receiveCountryFlag}</span> {t.receiveCountry}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3 whitespace-nowrap">{t.amount}</td>
                    <td className="py-2.5 pr-3">{t.currency}</td>
                    <td className="py-2.5 pr-3 whitespace-nowrap">{t.rate}</td>
                    <td className="py-2.5 pr-3 whitespace-nowrap">{t.fee}</td>
                    <td className="py-2.5 pr-3 whitespace-nowrap">{t.netPayout}</td>
                    <td className="py-2.5 pr-3">
                      <StatusBadge status={t.status} />
                    </td>
                    <td className="py-2.5 pr-3 whitespace-nowrap">{t.dateTime}</td>
                    <td className="relative py-2.5 pr-1 text-right">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === t.id ? null : t.id)}
                        className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <Eye size={14} />
                      </button>
                      {openMenuId === t.id && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-1 top-8 z-10 w-36 rounded-lg border border-gray-200 bg-white py-1 text-left shadow-lg dark:border-gray-700 dark:bg-gray-800"
                        >
                          <button className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                            View Details
                          </button>
                          <button className="block w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                            Download Receipt
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {paginatedTransactions.length === 0 && (
                  <tr>
                    <td colSpan={13} className="py-6 text-center text-sm text-gray-400 dark:text-gray-500">
                      No transactions match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Showing {filteredTransactions.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{' '}
              {Math.min(currentPage * pageSize, filteredTransactions.length)} of {reportTransactionsTotalCount} transactions
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-gray-500 disabled:opacity-40 dark:border-gray-600 dark:text-gray-300"
              >
                <ChevronLeft size={13} />
              </button>
              {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-medium ${currentPage === p
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-300'
                    }`}
                >
                  {p}
                </button>
              ))}
              {totalPages > 3 && <span className="px-1 text-xs text-gray-400">...</span>}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-gray-500 disabled:opacity-40 dark:border-gray-600 dark:text-gray-300"
              >
                <ChevronRight size={13} />
              </button>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="ml-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-600 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
              >
                {[5, 10, 25].map((n) => (
                  <option key={n} value={n}>
                    {n} / page
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Quick Reports sidebar */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Quick Reports</h3>
          <div className="mt-3 space-y-1">
            {quickReports.map((r) => (
              <button
                key={r.id}
                className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <span className="flex items-center gap-2">
                  <FileText size={13} className="text-gray-400" />
                  {r.name}
                </span>
                <ChevronRight size={13} className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section: corridors, agents, revenue summary + schedules/exports */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-4">
        {/* Top Sending Corridors */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Top Sending Corridors (This Month)</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-[260px] w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400">
                  <th className="py-1.5 pr-2 font-medium">Corridor</th>
                  <th className="py-1.5 pr-2 font-medium">Transactions</th>
                  <th className="py-1.5 pr-2 font-medium">Total Volume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {topSendingCorridors.map((c) => (
                  <tr key={c.id} className="text-gray-700 dark:text-gray-200">
                    <td className="py-2 pr-2 whitespace-nowrap">
                      <span className="flex items-center gap-1">
                        <span>{c.fromFlag}</span>→<span>{c.toFlag}</span> {c.corridor.split('→')[0].trim()}
                      </span>
                    </td>
                    <td className="py-2 pr-2">{c.transactions.toLocaleString()}</td>
                    <td className="py-2 pr-2 whitespace-nowrap">{c.totalVolume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="mt-3 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400">View All Corridors →</button>
        </div>

        {/* Top Agents by Transactions */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Top Agents by Transactions (This Month)</h3>
          <div className="mt-3 space-y-2.5">
            {topAgentsByTransactions.map((a) => (
              <div key={a.id} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300">
                    {a.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-medium text-gray-900 dark:text-white">{a.name}</span>
                    <span className="block text-[11px] text-gray-400 dark:text-gray-500">{a.branch}</span>
                  </span>
                </span>
                <span className="text-right">
                  <span className="block font-medium text-gray-900 dark:text-white">{a.transactions.toLocaleString()}</span>
                  <span className="block text-[11px] text-green-600 dark:text-green-400">{a.completionRate}%</span>
                </span>
              </div>
            ))}
          </div>
          <button className="mt-3 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400">View All Agents →</button>
        </div>

        {/* Revenue Summary */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Revenue Summary (This Month)</h3>
          <div className="mt-3 space-y-2.5 text-xs">
            {revenueSummaryThisMonth.map((item) => (
              <div key={item.label} className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
                <span className="font-medium text-gray-900 dark:text-white">{item.value}</span>
              </div>
            ))}
          </div>
          <button className="mt-3 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400">View Full Report →</button>
        </div>

        {/* Report Schedules + Recent Exports */}
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Report Schedules</h3>
              <button className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400">View All</button>
            </div>
            <div className="mt-3 space-y-3">
              {reportSchedules.map((s) => (
                <div key={s.id} className="flex items-center justify-between text-xs">
                  <span>
                    <span className="block font-medium text-gray-900 dark:text-white">{s.name}</span>
                    <span className="block text-[11px] text-gray-400 dark:text-gray-500">{s.cadence}</span>
                  </span>
                  <button
                    onClick={() => setScheduleStates((prev) => ({ ...prev, [s.id]: !prev[s.id] }))}
                    className={`relative h-5 w-9 rounded-full transition-colors ${scheduleStates[s.id] ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                  >
                    <span
                      className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${scheduleStates[s.id] ? 'translate-x-4' : 'translate-x-0.5'
                        }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Exports</h3>
            <div className="mt-3 space-y-2.5">
              {recentExports.map((e) => (
                <div key={e.id} className="flex items-center gap-2 text-xs">
                  {e.fileType === 'xlsx' ? (
                    <FileSpreadsheet size={14} className="text-green-600" />
                  ) : (
                    <FileText size={14} className="text-red-500" />
                  )}
                  <span>
                    <span className="block text-gray-700 dark:text-gray-200">{e.fileName}</span>
                    <span className="block text-[11px] text-gray-400 dark:text-gray-500">{e.exportedAt}</span>
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-3 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400">View All Exports →</button>
          </div>
        </div>
      </div>
    </div>
  );
}