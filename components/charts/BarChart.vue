<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar, 
  props: {
    x: {default: []},
    y: {default: []}
  },
   mounted () {
    this.renderChart({
      labels: this.x,
      datasets: [
        {
          label: 'Month distance record',
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
