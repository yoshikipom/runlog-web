<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    x: {default: []},
    y: {default: []}
  },
  mounted () {
    this.renderChart({
      labels: this.x,
      datasets: [
        {
          lineTension: 0,
          label: 'Stacked Chart',
          backgroundColor: '#f87979',
          data: this.y
        }
      ]
    }, 
    {
      responsive: true, 
      maintainAspectRatio: false, 
      scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              }
            }
          ]
        }
    })
  }
}
</script>
