<template>
  <div class="animated fadeIn">
    <b-row class="justify-content-sm-center align-items-center my-2">
      <b-button
        :disabled="year<=2000"
        pill
        variant="secondary"
        size="sm"
        class="mx-5"
        @click="$router.push({ query: {'year': year-1}})"
      >&lt;</b-button>
      <span class="h3 my-0">
        <b-form inline>
          <b-form-select v-model="year" :options="years"></b-form-select>年
        </b-form>
      </span>
      <b-button
        :disabled="2050<=year"
        pill
        variant="secondary"
        size="sm"
        class="mx-5"
        @click="$router.push({ query: {'year': year+1}})"
      >&gt;</b-button>
    </b-row>
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
import Vue, { PropOptions } from "vue";
import { ThisTypedComponentOptionsWithRecordProps } from "vue/types/options";
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
      years: Array.from(new Array(51)).map((v, i) => i + 2000),
    };
  },
  watch: {
    year() {
      const query = {
        year: String(this.year),
      };
      this.$router.push({ query });
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, any, any, any, any>);
</script>
