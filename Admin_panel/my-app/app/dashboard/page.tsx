'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import clsx from 'clsx';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  MoreVertical,
  Send,
  RefreshCw,
  CheckCircle,
  PauseCircle,
  RotateCcw,
  FileText,
  AlertTriangle,
  DollarSign,
  Clock,
  Zap,
  TriangleAlert,
  UsersRound,
  Package,
  CalendarCheck2,
  BadgeDollarSign,
  UserKey,
  Shield,
  Users,
  MapPin,
} from 'lucide-react';

import {
  statsData,
  recentTransactions,
  kycUsers,
  systemAlerts,
  fraudAlerts,
  topCorridors,
  periodTotals,
} from '@/lib/data';
import StatsCards from '@/components/Dashboard/StatsCards';

const TransactionVolumeChart = dynamic(
  () => import('@/components/charts/TransactionVolumeChart'),
  { ssr: false },
);
const TransactionStatusChart = dynamic(
  () => import('@/components/charts/TransactionStatusChart'),
  { ssr: false },
);
const RevenueOverviewChart = dynamic(
  () => import('@/components/charts/RevenueOverviewChart'),
  { ssr: false },
);

const statusColors: Record<string, string> = {
  Completed:
    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Pending:
    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Refunded:
    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
};

const methodIcons: Record<string, string> = {
  card: '💳',
  bank: '🏦',
  cash: '📍',
  wallet: '📱',
};

const alertIcons = {
  high: {
    icon: UsersRound,
    color: 'bg-red-100 dark:bg-red-900/20',
    iconColor: 'text-red-600',
  },
  warning: {
    icon: Package,
    color: 'bg-amber-100 dark:bg-amber-900/20',
    iconColor: 'text-amber-600',
  },
  info: {
    icon: CalendarCheck2,
    color: 'bg-orange-100 dark:bg-orange-900/20',
    iconColor: 'text-orange-600',
  },
  success: {
    icon: BadgeDollarSign,
    color: 'bg-green-100 dark:bg-green-900/20',
    iconColor: 'text-green-600',
  },
};


const FraudIcons = {
  high: {
    icon: UserKey,
    color: 'bg-red-100 dark:bg-red-900/20',
    iconColor: 'text-red-600',
  },
  medium: {
    icon: Shield,
    color: 'bg-amber-300 dark:bg-amber-900/20',
    iconColor: 'text-amber-600',
  },
  mediums: {
    icon: Users,
    color: 'bg-amber-300 dark:bg-amber-900/20',
    iconColor: 'text-amber-600',
  },
  low: {
    icon: MapPin,
    color: 'bg-red-100 dark:bg-red-900/20',
    iconColor: 'text-red-600',
  },
};

const fraudBadge: Record<string, string> = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  medium:
    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  "mediums":
    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  low: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};



const quickActions = [
  { label: 'Create New Transfer', icon: Send, color: "text-green-600", href: '/transactions/all' },
  {
    label: 'Update Exchange Rates',
    icon: RefreshCw,
    color: "text-green-600",
    href: '/management/exchange-rates',
  },
  { label: 'Approve KYC', icon: CheckCircle, color: "text-green-600", href: '/kyc' },
  { label: 'Freeze Account', icon: TriangleAlert, color: "text-red-600", href: '/users' },
  {
    label: 'Refund Transaction',
    icon: RotateCcw,
    color: "text-cyan-600",
    href: '/transactions/failed',
  },
  { label: 'Generate Report', icon: FileText, color: "text-purple-600", href: '/reports' },
];

const flagEmojis: Record<string, string> = {
  USA: '🇺🇸',
  UAE: '🇦🇪',
  UK: '🇬🇧',
  'Saudi Arabia': '🇸🇦',
  Malaysia: '🇲🇾',
};

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Here's what's happening with your platform today.
        </p>
      </div>

      <div className="">
        <StatsCards />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-3">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-bold text-lg text-gray-800 dark:text-gray-200">
              Transaction Volume
            </h2>
            <select className="text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 outline-none">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="mb-1">
            <div className="text-[28px] font-bold text-gray-900 dark:text-white">
              $4,256,540
            </div>
            <div className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
              <TrendingUp size={11} /> +11.5% from last week
            </div>
          </div>
          <div className="h-48">
            <TransactionVolumeChart />
          </div>
          <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            {periodTotals.map((p, index) => (
              <div key={p.label} className="text-center  dark:border-gray-700">
                <div className="text-[16px] text-gray-400">{p.label}</div>
                <div
                  className={`text-lg font-semibold ${index === 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-600 dark:text-gray-400'
                    }`}
                >
                  {p.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
          <h2 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-3">
            Transactions by Status
          </h2>
          <div className="flex items-center justify-between mt-8">
            <div className="relative w-60 h-60 flex items-center justify-center">
              <TransactionStatusChart />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  24,752
                </div>
                <div className="text-xs text-gray-400">Total</div>
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  label: 'Completed',
                  count: '18,752',
                  pct: '75.8%',
                  color: '#16a34a',
                },
                {
                  label: 'Pending',
                  count: '3,124',
                  pct: '12.6%',
                  color: '#f59e0b',
                },
                {
                  label: 'Failed',
                  count: '1,563',
                  pct: '6.3%',
                  color: '#ef4444',
                },
                {
                  label: 'Refunded',
                  count: '1,313',
                  pct: '5.3%',
                  color: '#6366f1',
                },
              ].map(s => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 text-[15px]"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: s.color }}
                  />

                  <div className="flex flex-col mt-4">
                    <span className="flex-1 text-gray-600 dark:text-gray-400">
                      {s.label}
                    </span>
                    <div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {s.count}
                      </span>
                      <span className="text-gray-400 w-10 text-right">
                        ({s.pct})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
          <h2 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-3">
            Quick Actions
          </h2>
          <div className="space-y-1">
            {quickActions.map(a => (
              <Link
                key={a.label}
                href={a.href}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg dark:bg-gray-700 flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-white transition-colors">
                  <a.icon
                    size={24}
                    className={`${a.color} dark:text-gray-400 group-hover:text-white`}
                  />
                </div>
                <span className="text-xs text-gray-700 dark:text-gray-300 flex-1">
                  {a.label}
                </span>
                <ArrowRight
                  size={16}
                  className="text-gray-500 dark:text-gray-600 group-hover:text-brand transition-colors"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-bold text-lg text-gray-800 dark:text-gray-200">
              Recent Transactions
            </h2>
            <Link
              href="/transactions/all"
              className="text-xs text-brand hover:underline font-medium"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  {[
                    'TRID',
                    'User',
                    'From → To',
                    'Amount',
                    'Method',
                    'Status',
                    'Time',
                    '',
                  ].map(h => (
                    <th
                      key={h}
                      className="px-3 py-2.5 text-left text-[13px] font-medium text-gray-500 dark:text-gray-500 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                {recentTransactions.map(tx => (
                  <tr
                    key={tx.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                  >
                    <td className="px-3 py-2.5 font-mono text-gray-500 dark:text-gray-400 whitespace-nowrap font-bold text-[16px]">
                      {tx.id}
                    </td>
                    <td className="px-3 py-2.5 font-medium text-gray-600 dark:text-gray-200 whitespace-nowrap">
                      {tx.user}
                    </td>
                    <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      {tx.from} → {tx.to}
                    </td>
                    <td className="px-3 py-2.5 font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">
                      {tx.amount}
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap flex items-center gap-1  text-gray-600 dark:text-gray-400 text-[13px]">
                      <span className="text-lg">
                        {methodIcons[tx.methodType]}
                      </span>
                      <span className="">
                        {tx.method}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <span
                        className={clsx(
                          'px-2 py-0.5 rounded-full text-[13px] font-medium',
                          statusColors[tx.status],
                        )}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-gray-400 dark:text-gray-500 whitespace-nowrap font-bold">
                      {tx.time}
                    </td>
                    <td className="px-3 py-2.5">
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <MoreVertical size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-bold text-lg text-gray-800 dark:text-gray-200">
              System Alerts
            </h2>
            <Link
              href="/compliance/aml"
              className="text-xs text-brand hover:underline font-medium"
            >
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
            {systemAlerts.map((a, i) => {
              let Icon = alertIcons[a.type].icon;

              return (

                <div
                  key={i}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                >
                  <div
                    className={clsx(
                      'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                      alertIcons[a.type].color
                    )}
                  >
                    <Icon
                      size={18}
                      className={alertIcons[a.type].iconColor}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-semibold text-gray-800 dark:text-gray-200">
                      {a.title}
                    </div>
                    <div className="text-[12px] font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                      {a.description}
                    </div>
                  </div>
                  <div className="text-[13px] text-gray-400 mt-1">{a.time}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-bold text-lg text-gray-800 dark:text-gray-200">
              KYC Verification
            </h2>
            <Link
              href="/kyc"
              className="text-xs text-brand hover:underline font-medium"
            >
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
            {kycUsers.map((u, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-xs font-bold text-brand shrink-0">
                  {u.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium text-gray-800 dark:text-gray-200 truncate">
                    {u.name}
                  </div>
                  <div className="flex items-center justify-between ">
                    <div className="text-[12px] text-gray-400 font-medium truncate">
                      {u.email}
                    </div>
                    <div className="text-[12px] text-gray-400 font-medium">{u.date}</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[12px] font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 whitespace-nowrap">
                  {u.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-bold text-lg text-gray-800 dark:text-gray-200">
              Fraud Detection & Alerts
            </h2>
            <Link
              href="/compliance/fraud"
              className="text-xs text-brand hover:underline font-medium"
            >
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
            {fraudAlerts.map((a, i) => {
              let Icon = FraudIcons[a.type].icon;
              return (
                <div key={i} className="flex items-start gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                  <div className={`w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center ${FraudIcons[a.type].color}`}>
                    <Icon
                      size={18}
                      className={FraudIcons[a.type].iconColor}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-medium text-gray-800 dark:text-gray-200">
                        {a.title}
                      </span>
                      <span
                        className={clsx(
                          'px-1.5 py-0.5 rounded text-[10px] font-bold uppercase',
                          fraudBadge[a.type],
                        )}
                      >
                        {a.type}
                      </span>
                    </div>

                    <div className="text-[13px] font-medium text-gray-400 mt-0.5">
                      {a.description}
                    </div>
                    <div className="text-[13px] font-medium text-gray-400">{a.time}</div>

                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-gray-800 dark:text-gray-200">
              Revenue Overview
            </h2>
            <select className="text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 outline-none">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { label: 'Total Revenue', value: '$425,780', pct: '+15.7%' },
              { label: 'Total Fees', value: '$28,450', pct: '+12.3%' },
              { label: 'Net Profit', value: '$235,460', pct: '+10.2%' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  {s.value}
                </div>
                <div className="text-[10px] text-green-600 dark:text-green-400">
                  {s.pct}
                </div>
                <div className="text-[9px] text-gray-400 leading-tight mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <div className="h-70">
            <RevenueOverviewChart />
          </div>
        </div>

        {/* Top Corridors */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-semibold text-gray-800 dark:text-gray-200">
              Top Corridors
            </h2>
            <span className="text-[10px] text-gray-400">(This Month)</span>
            <Link
              href="/management/countries"
              className="text-xs text-brand hover:underline font-medium"
            >
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
            {topCorridors.map((c, i) => (
              <div key={i} className="px-4 py-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-700 dark:text-gray-300 flex items-center gap-1">
                    {flagEmojis[c.from] || '🌍'} {c.from} →{' '}
                    {flagEmojis['Bangladesh'] || '🇧🇩'} BD
                  </span>
                  <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                    {c.amount}
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand rounded-full transition-all"
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between py-3 text-[11px] text-gray-400 border-t border-gray-100 dark:border-gray-800">
        <span>© 2025 TheSendMoney. All rights reserved.</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />{' '}
            Secure
          </span>
          <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />{' '}
            Reliable
          </span>
          <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />{' '}
            Fast
          </span>
        </div>
      </div>
    </div >
  );
}
