<template>
  <div class="animated fadeIn">
    <div class="card w-100">
      <div class="card-header">
        <i class="icon-notebook"></i> Year Record
      </div>
      <div class="card-body">
        <bar-chart :x="x" :y="y" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import moment, { Moment } from "moment";
import { MonthRecord } from "@/api-client";
import BarChart from "@/components/charts/BarChart.vue";

const today = moment();
const defaultYear = today.year();

export default Vue.extend({
  name: "year-record",
  watchQuery: ["year"],
  components: {
    BarChart,
  },
  async asyncData(context) {
    const { query, $axios, error, app } = context;

    const year = Number(query.year) || defaultYear;

    const monthRecords: MonthRecord[] = await app.$apiClient
      .getMonthRecords(year)
      .then((res) => res.data)
      .catch((e) => {
        error({ statusCode: 500, message: "failed to get data" });
        return [];
      });

    const x = [...Array(12)].map((_, i) => i + 1);
    let y: number[] = [];
    if (monthRecords) {
      y = x.map((val, index) => monthRecords[index].sum);
    }
    return {
      year,
      monthRecords,
      x,
      y,
    };
  },
});
</script>
