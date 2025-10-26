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

let defaultChartLineColor = "lightblue";
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
}: {
  pokemonName: string;
  stats: any;
}) {
  const labelName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
  const [maxValue, setMaxValue] = useState<number>(100);
  const baseStats: number[] = [
    stats[0]["base_stat"],
    stats[1]["base_stat"],
    stats[2]["base_stat"],
    stats[3]["base_stat"],
    stats[4]["base_stat"],
    stats[5]["base_stat"],
  ];
  useEffect(() => {
    for (let index = 0; index < baseStats.length; index++) {
      const element = baseStats[index];
      if (element > 100) setMaxValue(150);
      if (element > 150) setMaxValue(200);
      if (element > 200) setMaxValue(250);
    }
  }, []);

  const dataset = {
    labels: [
      "HP",
      "Attack",
      "Defense",
      "Special-Attack",
      "Special-Defense",
      "Speed",
    ],
    datasets: [
      {
        label: labelName,
        data: baseStats,
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
          color: defaultChartLineColor, // numeric labels (0–100)
          backdropColor: "transparent", // no gray boxes behind numbers
        },
      },
    },
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Stats</h1>
      <Radar options={options} data={dataset} />
    </div>
  );
}
