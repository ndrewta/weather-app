import Chart from "chart.js/auto";
import ps from "./pubsub";

let currentChart;

export default function createChart() {
  function destroyChart(chart) {
    // Destroy chart
    chart.destroy();
  }

  function filterData(data) {
    // Filter out temp and time data in 3 hour intervals
    let tempsArr = [];
    let timeArr = [];

    for (let i = 0; i < data.length; i += 3) {
      tempsArr.push(data[i].temp_c);

      let time = new Date(data[i].time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      });
      timeArr.push(time);
    }
    return { tempsArr, timeArr };
  }

  function newChart(obj) {
    const { canvas } = obj;
    const timeData = obj.time;
    // Destroy previous chart if it exists
    if (currentChart) {
      destroyChart(currentChart);
      currentChart = null;
    }

    // Filter out data
    const filteredData = filterData(timeData);

    // Label data
    const labels = filteredData.timeArr;
    const data = {
      labels,
      datasets: [
        {
          label: "Highs",
          data: filteredData.tempsArr,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    // Create chart
    const chart = new Chart(canvas, {
      type: "line",
      data,
    });
    currentChart = chart;
    ps.publish("chart-created", chart);
  }

  ps.subscribe("update-chart", newChart);
}
