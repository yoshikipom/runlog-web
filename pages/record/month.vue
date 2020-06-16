<template>
  <div class="animated fadeIn">
    <b-row class="justify-content-md-center align-items-center my-2">
      <b-button pill variant="secondary" size="sm" class="mx-5" @click="prev()">&lt;</b-button>
      <!-- <span class="h3 my-0">{{ year }} 年 {{ month}} 月</span> -->
      <span class="h3 my-0">
        <b-form inline>
          <b-form-select v-model="year" :options="years"></b-form-select>年
          <b-form-select v-model="month" :options="months"></b-form-select>月
        </b-form>
      </span>
      <b-button pill variant="secondary" size="sm" class="mx-5" @click="next()">&gt;</b-button>
    </b-row>
    <div class="card">
      <div class="card-header">
        <i class="icon-notebook"></i> Monthly Record
      </div>
      <div class="card-body">
        <b-table
          :fields="fields"
          :items="items"
          :outlined="true"
          :small="true"
          :head-variant="'dark'"
        ></b-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { ThisTypedComponentOptionsWithRecordProps } from "vue/types/options";
import { Context } from "@nuxt/types";
import moment, { Moment } from "moment";

const today = moment();
const defaultYear = today.year();
const defaultMonth = today.month() + 1;

interface Data {
  fields: string[];
  items: any[];
  year: number;
  month: number;
  years: number[];
  months: number[];
  selectedDate: string;
}
interface Methods {
  prev(): void;
  next(): void;
}
interface Computed {
  prevMonth: Moment;
  nextMonth: Moment;
}
interface Props {}

const options: ThisTypedComponentOptionsWithRecordProps<
  Vue,
  Data,
  Methods,
  Computed,
  Props
> = {
  name: "monthly-record",
  watchQuery: ["year", "month"],
  async asyncData(context: Context) {
    const { query, $axios, error } = context;

    const year = Number(query.year) || defaultYear;
    const month = Number(query.month) || defaultMonth;
    const url = `/api/monthRecords?year=${year}&month=${month}`;
    let items;
    const res = await $axios
      .$get(url)
      .then((res) => (items = res))
      .catch((e) =>
        error({ statusCode: 500, message: "failed to get month record" })
      );

    return {
      fields: ["id", "date", "distance", "memo"],
      items,
      year,
      month,
      selectedDate: "",
      years: Array.from(new Array(50)).map((v, i) => i + 2000),
      months: Array.from(new Array(12)).map((v, i) => i + 1),
    };
  },
  computed: {
    prevMonth() {
      const selectedMonth = moment({ year: this.year, month: this.month });
      return selectedMonth.add(-1, "month");
    },
    nextMonth() {
      const selectedMonth = moment({ year: this.year, month: this.month });
      return selectedMonth.add(1, "month");
    },
  },
  watch: {
    year() {
      const query = {
        year: String(this.year),
        month: String(this.month),
      };
      this.$router.push({ query });
    },
    month() {
      const query = {
        year: String(this.year),
        month: String(this.month),
      };
      this.$router.push({ query });
    },
  },
  methods: {
    prev() {
      const query = {
        year: String(this.prevMonth.year()),
        month: String(this.prevMonth.month()),
      };
      this.$router.push({ query });
    },
    next() {
      const query = {
        year: String(this.nextMonth.year()),
        month: String(this.nextMonth.month()),
      };
      this.$router.push({ query });
    },
  },
};

export default Vue.extend(options);
</script>

<style scoped>
.card-body {
  padding: 1rem;
}
</style>
