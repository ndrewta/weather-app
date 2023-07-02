import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import ps from "./pubsub";

Chart.register(ChartDataLabels);
let currentChart;

export default function createChart() {
  function filterData(data) {
    // Filter out temp and time data in 3 hour intervals
    let tempsArr = [];
    let timeArr = [];
    let maxValue;

    for (let i = 0; i < data.length; i += 3) {
      tempsArr.push(data[i].temp_c);

      let time = new Date(data[i].time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      });
      timeArr.push(time);
    }

    maxValue = Math.max(...tempsArr);
    return { tempsArr, timeArr, maxValue };
  }

  function updateChart(newData, options) {
    const datasets = newData.datasets[0].data;
    const { labels } = newData;
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
    const maxValue = filteredData.maxValue + 1;

    // Label data
    const data = {
      labels: filteredData.timeArr,
      datasets: [
        {
          label: "Highs",
          data: filteredData.tempsArr,
          fill: true,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: true,
            drawOnChartArea: false,
          },
          ticks: {
            font: {
              size: 25,
            },
          },
        },
        y: {
          display: false,
          max: maxValue,
        },
      },
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {
          display: false,
        },
        datalabels: {
          anchor: "start",
          align: "top",
          font: {
            size: 25,
          },
          labels: {
            title: {
              font: {
                weight: "bold",
              },
            },
            value: {
              color: "green",
            },
          },
        },
      },
    };

    // Create chart
    if (currentChart) {
      updateChart(data, options);
    } else {
      currentChart = new Chart(canvas, {
        type: "line",
        data,
        options,
      });
    }

    ps.publish("chart-created", currentChart);
  }

  ps.subscribe("update-chart", newChart);
}
