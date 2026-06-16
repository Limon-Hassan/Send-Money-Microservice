'use client';

import {
  DollarSign,
  ArrowLeftRight,
  Wallet,
  TrendingUp,
  Users,
  BadgeCheck,
} from 'lucide-react';

import SparklineChart from './SparklineChart';

interface Props {
  stat: {
    label: string;
    value: string;
    change: string;
    positive: boolean;
    color: string;
  };
}

const config = {
  green: {
    icon: DollarSign,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    chartColor: '#22c55e',

    sparkline: [8, 7, 11, 10, 8, 10, 9, 14, 12, 8, 11, 9, 15, 13, 8, 12, 9, 12],
  },

  blue: {
    icon: ArrowLeftRight,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    chartColor: '#3b82f6',

    sparkline: [4, 6, 10, 5, 7, 6, 8, 6, 10, 7, 9, 7, 5, 8, 6, 9],
  },

  purple: {
    icon: Wallet,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    chartColor: '#9333ea',

    sparkline: [8, 7, 10, 8, 7, 5, 8, 11, 9, 6, 8, 11, 8, 10, 12],
  },

  yellow: {
    icon: TrendingUp,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    chartColor: '#f59e0b',

    sparkline: [5, 8, 7, 10, 6, 5, 6, 11, 7, 5, 8, 12, 9, 6, 8, 10],
  },

  cyan: {
    icon: Users,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    chartColor: '#16a34a',

    sparkline: [6, 8, 11, 9, 6, 5, 8, 11, 8, 6, 10, 12, 10, 6, 9, 11],
  },

  red: {
    icon: BadgeCheck,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    chartColor: '#ef4444',

    sparkline: [7, 10, 9, 11, 8, 10, 13, 9, 6, 9, 11, 8, 6, 9, 11, 7, 9],
  },
};

export default function StatCard({ stat }: Props) {
  const item = config[stat.color as keyof typeof config];

  const Icon = item.icon;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.iconBg}`}
        >
          <Icon className={item.iconColor} size={22} />
        </div>

        <span className="text-sm text-gray-500">{stat.label}</span>
      </div>

      <h3 className="mt-4 text-3xl font-bold">{stat.value}</h3>

      <div
        className={`mt-2 text-sm font-medium ${
          stat.positive ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {stat.change}
        <span className="text-gray-400 ml-1">from last week</span>
      </div>

      <div className="h-9.5 mt-4">
        <SparklineChart data={item.sparkline} color={item.chartColor} />
      </div>
    </div>
  );
}
