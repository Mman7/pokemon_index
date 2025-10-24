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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

let defaultChartLineColor = "black";
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  defaultChartLineColor = "white";
}
export default function RadarChart({
  pokemonName,
  stats,
}: {
  pokemonName: string;
  stats: any;
}) {
  const labelName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

  const baseStats: object[] = [
    stats[0]["base_stat"],
    stats[1]["base_stat"],
    stats[2]["base_stat"],
    stats[3]["base_stat"],
    stats[4]["base_stat"],
    stats[5]["base_stat"],
  ];

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

  return <Radar options={options} data={dataset} />;
}

const options = {
  responsive: true,
  //   maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: defaultChartLineColor },
    },
    title: {
      display: true,
      text: "Pokemon Stats",
      color: defaultChartLineColor,
    },
  },
  elements: {
    line: { borderWidth: 2 },
  },
  scales: {
    r: {
      min: 0, // start from 0
      max: 100, // fixed max = 100
      grid: {
        color: defaultChartLineColor, // ← circular grid lines
      },
      angleLines: {
        color: defaultChartLineColor, // ← radial (spoke) lines
      },
      pointLabels: {
        color: defaultChartLineColor, // category labels
      },
      ticks: {
        color: defaultChartLineColor, // numeric labels (0–100)
        backdropColor: "transparent", // no gray boxes behind numbers
      },
    },
  },
};
