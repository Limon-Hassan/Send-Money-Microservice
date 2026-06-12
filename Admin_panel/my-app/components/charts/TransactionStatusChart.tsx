"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { transactionStatusData } from "@/lib/data";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TransactionStatusChart() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "72%",
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: 10,
        callbacks: {
          label: (ctx: any) => ` ${ctx.label}: ${ctx.raw.toLocaleString()}`,
        },
      },
    },
  } as const;

  return <Doughnut data={transactionStatusData} options={options} />;
}
