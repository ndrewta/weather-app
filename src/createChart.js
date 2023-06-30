import Chart from "chart.js/auto";
import ps from "./pubsub";

let currentChart;

export default function createChart() {
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

  function updateChart(newData) {
    const datasets = newData.datasets[0].data;
    const { labels } = newData;
    const { options } = newData;
    currentChart.data.datasets[0].data = datasets;
    currentChart.data.labels = labels;
    currentChart.options = options;
    currentChart.update();
  }

  function newChart(obj) {
    const { canvas } = obj;
    const timeData = obj.time;

    // Filter out data
    const filteredData = filterData(timeData);

    // Label data
    const data = {
      labels: filteredData.timeArr,
      datasets: [
        {
          label: "Highs",
          data: filteredData.tempsArr,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };

    // Create chart
    if (currentChart) {
      updateChart(data);
    } else {
      currentChart = new Chart(canvas, {
        type: "line",
        data,
      });
    }

    ps.publish("chart-created", currentChart);
  }

  ps.subscribe("update-chart", newChart);
}
