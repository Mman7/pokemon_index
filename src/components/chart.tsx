import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

let defaultChartLineColor = "#1AEEF4";
let textColor = "black";

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  textColor = "white";
}
export default function RadarChart({
  pokemonName,
  stats,
  statsLabel,
}: {
  pokemonName: string;
  stats: number[];
  statsLabel: string[];
}) {
  const labelName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
  const [maxValue, setMaxValue] = useState<number>(100);

  useEffect(() => {
    for (let index = 0; index < stats.length; index++) {
      const element = stats[index];
      if (element > 100) setMaxValue(150);
      if (element > 150) setMaxValue(200);
      if (element > 200) setMaxValue(250);
    }
  }, []);

  const dataset = {
    labels: statsLabel,
    datasets: [
      {
        label: labelName,
        data: stats,
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#ffffff",
        pointHoverBackgroundColor: "#fffffff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };
  const options = {
    responsive: true,
    //   maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: textColor },
      },
      title: {
        display: true,
        text: "Pokemon Stats",
        color: textColor,
      },
    },
    elements: {
      line: { borderWidth: 2 },
    },
    scales: {
      r: {
        min: 0, // start from 0
        max: maxValue, // fixed max = 100
        grid: {
          color: defaultChartLineColor, // ← circular grid lines
        },
        angleLines: {
          color: defaultChartLineColor, // ← radial (spoke) lines
        },
        pointLabels: {
          color: textColor, // category labels
        },
        ticks: {
          color: textColor, // numeric labels (0–100)
          backdropColor: "transparent", // no gray boxes behind numbers
        },
      },
    },
  };

  return (
    <div className="w-full gap-6 rounded-2xl p-6 shadow-xl dark:backdrop-brightness-120">
      <h1 className="text-center text-2xl font-bold md:text-start">Stats</h1>
      <Radar options={options} data={dataset} />
    </div>
  );
}
