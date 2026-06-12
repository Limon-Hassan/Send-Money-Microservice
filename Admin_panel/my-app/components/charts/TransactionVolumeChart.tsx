"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, Filler
} from "chart.js";
import { transactionVolumeData } from "@/lib/data";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function TransactionVolumeChart() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: 10,
        callbacks: {
          label: (ctx: any) => ` $${(ctx.raw as number).toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#9ca3af", font: { size: 11 } },
        border: { display: false },
      },
      y: {
        grid: { color: "rgba(156,163,175,0.1)" },
        ticks: {
          color: "#9ca3af",
          font: { size: 11 },
          callback: (v: any) => `$${(v / 1000).toFixed(0)}K`,
        },
        border: { display: false },
      },
    },
  } as const;

  return <Line data={transactionVolumeData} options={options} />;
}
