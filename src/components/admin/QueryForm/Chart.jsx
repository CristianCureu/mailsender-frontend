import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function Chart({ charData }) {
  return <Bar data={charData} />;
}

export default Chart;
