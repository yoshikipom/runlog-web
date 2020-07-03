<template>
  <div class="animated fadeIn">
    <div class="col text-center">
      <b-form-radio-group
        id="radiosBtn"
        class="mx-auto text-center mb-3"
        style="width: 200px;"
        buttons
        button-variant="outline-secondary"
        v-model="selected"
        name="radiosBtn"
        size="lg"
      >
        <b-form-radio value="month">Month</b-form-radio>
        <b-form-radio value="year">Year</b-form-radio>
      </b-form-radio-group>
    </div>

    <b-card>
      <main-chart-example class="chart-wrapper" style="height:300px;margin-top:40px;" height="300"></main-chart-example>
    </b-card>
  </div>
</template>

<script>
import MainChartExample from '~/components/dashboard/MainChartExample'

export default {
  name: 'dashboard',
  components: {
    MainChartExample,
  },
  data: function () {
    return {
      selected: 'month',
    }
  },
  methods: {
  }
}
</script>
