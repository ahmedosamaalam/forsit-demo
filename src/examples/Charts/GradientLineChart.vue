<template>
  <div class="p-3 pb-0 card-header">
    <h6>{{ title }}</h6>
    <!-- eslint-disable vue/no-v-html -->
    <p v-if="description" class="text-sm" v-html="description" />
  </div>
  <div class="p-3 card-body">
    <div class="chart">
      <canvas :id="id" class="chart-canvas" :height="height"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';

export default {
  name: "GradientLineChart",
  props: {
    id: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      default: "300",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    chart: {
      type: Object,
      required: true,
      labels: Array,
      datasets: {
        type: Array,
        label: String,
        data: Array,
      },
    },
  },

  mounted() {
    var ctx = document.getElementById(this.id).getContext("2d");

    var gradientStroke1 = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke1.addColorStop(1, "rgba(203,12,159,0.2)");
    gradientStroke1.addColorStop(0.2, "rgba(72,72,176,0.0)");
    gradientStroke1.addColorStop(0, "rgba(203,12,159,0)");

    let chartStatus = Chart.getChart(this.id);
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    new Chart(ctx, {
      type: "line",
      data: {
        labels: this.chart.labels,
        datasets: this.chart.datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,

        interaction: {
          intersect: false,
          mode: "index",
        },
        // plugins: {
        //   tooltip: false
        // },
        scales: {
          y: {
            grid: {
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5],
            },
            ticks: {
              display: true,
              padding: 10,
              color: "#b2b9bf",
              font: {
                size: 11,
                family: "Open Sans",
                style: "normal",
                lineHeight: 2,
              },
            },
          },
          x: {
            type: "time",
            time: {
              unit: 'month'
            },
            adapters: {
              date: {
                locale: enUS,
              },
            },
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
              borderDash: [5, 5],
            },
            ticks: {
              display: true,
              color: "#b2b9bf",
              padding: 20,
              font: {
                size: 11,
                family: "Open Sans",
                style: "normal",
                lineHeight: 2,
              },
            },
          },
        },
      },
    });
  },
};
</script>
