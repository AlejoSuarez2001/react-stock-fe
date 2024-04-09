import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function LineChart({ stockPriceHistory }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  const prices =
    stockPriceHistory && stockPriceHistory.historical
      ? stockPriceHistory.historical.map((entry) => entry.close).slice(0, 30)
      : [];

  const data = {
    labels: Array.from({ length: prices.length }, (_, i) => i + 1),
    datasets: [
      {
        data: prices.reverse(),
        borderColor: "#6188ff",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
