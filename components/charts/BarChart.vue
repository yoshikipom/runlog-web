<script lang='ts'>
import { Bar } from "vue-chartjs";
import Vue from "vue";
import { ChartData, ChartOptions } from "chart.js";

export default Vue.extend({
  extends: Bar,
  props: {
    x: { default: [] },
    y: { default: [] },
  },
  mounted() {
    this.render();
  },
  watch: {
    x() {
      this.render();
    },
    y() {
      this.render();
    },
  },
  methods: {
    render() {
      const data: ChartData = {
        labels: this.x,
        datasets: [
          {
            label: "Month distance record",
            backgroundColor: "#f87979",
            data: this.y,
          },
        ],
      };

      const options: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };

      this.renderChart(data, options);
    },
  },
});
</script>
