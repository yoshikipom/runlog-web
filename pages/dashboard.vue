<template>
  <div class="animated fadeIn">
    <b-row class="justify-content-sm-center align-items-center my-2">
      <b-button pill variant="secondary" size="sm" class="mx-5" @click="prev()">&lt;</b-button>
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
        <i class="icon-notebook"></i> Graph
      </div>
      <div class="card-body">
        <stacked-chart :x="x" :y="y" />
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <i class="icon-notebook"></i> Record
      </div>
      <div class="card-body">
        <b-table
          :fields="fields"
          :items="items"
          :outlined="true"
          :small="true"
          :bordered="true"
          :head-variant="'dark'"
        >
          <template v-slot:cell(day)="data">
            <n-link :to="`/record?year=${year}&month=${month}&day=${data.value}`">{{ data.value }}</n-link>
          </template>
          <template v-slot:foot(day)="data">
            <span class="text-danger">{{ data.value }}</span>
          </template>

          <template v-slot:custom-foot>
            <b-tr>
              <b-th></b-th>
              <b-th variant="secondary" class="distance-column">平均: {{ave}}, 合計: {{sum}}</b-th>
              <b-th></b-th>
            </b-tr>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { ThisTypedComponentOptionsWithRecordProps } from "vue/types/options";
import { Context } from "@nuxt/types";
import moment, { Moment } from "moment";
import StackedChart from "@/components/charts/StackedChart.vue";

interface Data {
  fields: any[];
  items: Item[];
  year: number;
  month: number;
  years: number[];
  months: number[];
  selectedDate: string;
  x: number[];
  y: number[];
}
interface Methods {
  prev(): void;
  next(): void;
}
interface Computed {
  prevMonth: Moment;
  nextMonth: Moment;
  sum: number;
  ave: string;
}
interface Props {}

enum DayType {
  WEEKDAY = "",
  SATURDAY = "info",
  SUNDAY = "danger",
  HOLIDAY = "danger",
}

interface Item {
  day: number;
  distance: number;
  memo: string;
  _rowVariant: DayType;
}

const today = moment();
const defaultYear = today.year();
const defaultMonth = today.month() + 1;

const createItems = (
  res: any,
  year: number,
  month: number,
  holidayDict: Map<string, string>
): Item[] => {
  // 月の初日から末日までデフォルト値でitem生成
  const curDate = moment({ year, month: month - 1, date: 1 });
  const items: Item[] = [];
  while (true) {
    if (curDate.month() !== month - 1) {
      break;
    }
    let _rowVariant;
    switch (curDate.day()) {
      case 0:
        _rowVariant = DayType.SUNDAY;
        break;
      case 6:
        _rowVariant = DayType.SATURDAY;
        break;
      default:
        _rowVariant = DayType.WEEKDAY;
        break;
    }
    const curDateStr = curDate.format("YYYY-MM-DD");
    if (holidayDict.hasOwnProperty(curDateStr)) {
      _rowVariant = DayType.HOLIDAY;
    }
    items.push({
      day: curDate.date(),
      distance: 0,
      memo: "",
      _rowVariant,
    });
    curDate.add(1, "days");
  }

  // データがあるところは上書き
  for (const data of res) {
    const day = moment(data.date).date();
    const targetItem = items[day - 1];
    targetItem.distance = data.distance;
    targetItem.memo = data.memo;
  }

  return items;
};

const options: ThisTypedComponentOptionsWithRecordProps<
  Vue,
  Data,
  Methods,
  Computed,
  Props
> = {
  name: "monthly-record",
  components: {
    StackedChart,
  },
  watchQuery: ["year", "month"],
  async asyncData({ route, params, query, req, app }) {
    const year = Number(route.query.year) || defaultYear;
    const month = Number(route.query.month) || defaultMonth;

    let holidayDict: Map<string, string> = new Map();
    const holidayUrl = `/holiday/date.json`;
    await app.$axios
      .$get(holidayUrl)
      .then((res) => (holidayDict = res))
      .catch((e) =>
        alert({ statusCode: 500, message: "failed to get holiday" })
      );

    const selectedMonth: Moment = moment({
      year: year,
      month: month - 1,
      day: 1,
    });
    const monthQuery = selectedMonth.format("YYYY-MM");

    const res = await app.$apiClient
      .getRecords(monthQuery)
      .then((res) => res.data)
      .catch((e) =>
        alert({ statusCode: 500, message: "failed to get month record" })
      );
    const items: Item[] = createItems(res, year, month, holidayDict);

    const x = items.map((item) => item.day);
    const y = [];
    let stacked = 0;
    for (const item of items) {
      stacked += item.distance;
      y.push(stacked);
    }

    return {
      fields: [
        {
          key: "day",
          stickyColumn: true,
          isRowHeader: true,
          thClass: "t-header",
          tdClass: "day-column",
        },
        {
          key: "distance",
          thClass: "t-header",
          tdClass: "distance-column",
        },
        {
          key: "memo",
          thClass: "t-header",
          tdClass: "memo-column",
        },
      ],
      items,
      year,
      month,
      selectedDate: "",
      years: Array.from(new Array(50)).map((v, i) => i + 2000),
      months: Array.from(new Array(12)).map((v, i) => i + 1),
      x,
      y,
    };
  },
  computed: {
    prevMonth() {
      const selectedMonth = moment({ year: this.year, month: this.month - 1 });
      return selectedMonth.add(-1, "month");
    },
    nextMonth() {
      const selectedMonth = moment({ year: this.year, month: this.month - 1 });
      return selectedMonth.add(1, "month");
    },
    sum() {
      return this.items
        .map((item) => item.distance)
        .reduce((result, distance) => result + distance, 0);
    },
    ave() {
      return (this.sum / this.items.length).toFixed(2);
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
        month: String(this.prevMonth.month() + 1),
      };
      this.$router.push({ query });
    },
    next() {
      const query = {
        year: String(this.nextMonth.year()),
        month: String(this.nextMonth.month() + 1),
      };
      this.$router.push({ query });
    },
  },
};

export default Vue.extend(options);
</script>

<style>
.card-body {
  padding: 1rem;
}
a {
  color: black;
}
.t-header {
  text-align: center;
}
.day-column {
  text-align: center;
}
.distance-column {
  text-align: right;
}
</style>
