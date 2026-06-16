'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

interface SparklineChartProps {
  data: number[];
  color: string;
}

export default function SparklineChart({ data, color }: SparklineChartProps) {
  return (
    <Line
      data={{
        labels: data.map((_, i) => i + 1),

        datasets: [
          {
            data,

            borderColor: color,

            borderWidth: 1.5,

            tension: 0.45,

            fill: false,

            pointRadius: 2.2,

            pointHoverRadius: 5,

            pointBorderWidth: 1.5,

            pointBackgroundColor: color,

            pointBorderColor: '#ffffff',

            pointHoverBackgroundColor: color,

            pointHoverBorderColor: '#ffffff',
          },
        ],
      }}
      options={{
        responsive: true,

        maintainAspectRatio: false,

        plugins: {
          legend: {
            display: false,
          },

          tooltip: {
            enabled: true,

            displayColors: false,

            backgroundColor: '#111827',

            padding: 10,

            cornerRadius: 8,
          },
        },

        scales: {
          x: {
            display: false,

            grid: {
              display: false,
            },

            border: {
              display: false,
            },
          },

          y: {
            display: false,

            grid: {
              display: false,
            },

            border: {
              display: false,
            },
          },
        },
      }}
    />
  );
}
