<template>
  <div class="animated fadeIn">
    <b-alert
      dismissible
      variant="success"
      :show="successMsg!==''"
      @dismissed="successMsg=''"
    >{{successMsg}}</b-alert>
    <b-alert
      dismissible
      fade
      variant="danger"
      :show="errorMsg!==''"
      @dismissed="errorMsg=''"
    >{{errorMsg}}</b-alert>

    <b-row class="justify-content-sm-center align-items-center my-2">
      <b-button pill variant="secondary" size="sm" class="mx-5" @click="prev()">&lt;</b-button>
      <span class="h3 my-0">{{year}}年 {{month}}月 {{day}}日</span>
      <b-button pill variant="secondary" size="sm" class="mx-5" @click="next()">&gt;</b-button>
    </b-row>

    <div class="card">
      <div class="card-header">
        <i class="icon-notebook"></i> Daily Record
      </div>
      <div class="card-body">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group id="input-group-1" label="Distance:" label-for="distance">
            <b-form-input
              id="distance"
              v-model="form.distance"
              type="number"
              step="0.1"
              required
              placeholder="Enter distance"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Memo:" label-for="memo">
            <b-form-input id="memo" v-model="form.memo" placeholder="Enter memo"></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { Record } from "@/api-client";
import { ThisTypedComponentOptionsWithRecordProps } from "vue/types/options";
import { Context } from "@nuxt/types";
import moment, { Moment } from "moment";

interface Data {
  form: Record;
  show: boolean;
  selectedDate: Moment;
  year: number;
  month: number;
  day: number;
  successMsg: string;
  errorMsg: string;
}

interface Methods {
  onSublimit(): void;
  onReset(): void;
  prev(): void;
  next(): void;
}

interface Computed {
  prevDate: Moment;
  nextDate: Moment;
}
interface Props {}

const today = moment();
const defaultYear = today.year();
const defaultMonth = today.month() + 1;
const defaultDay = today.date();

export default Vue.extend({
  name: "daily-record",
  watchQuery: ["year", "month", "day"],
  async asyncData(context: Context) {
    const { query, error, app } = context;

    const year = Number(query.year) || defaultYear;
    const month = Number(query.month) || defaultMonth;
    const day = Number(query.day) || defaultDay;

    const selectedDate: Moment = moment({ year, month: month - 1, day });

    const res: Record = await app.$apiClient
      .getDayRecord(year, month, day)
      .then((res) => res.data)
      .catch((e) => {
        return {
          date: selectedDate.format("YYYY-MM-DD"),
          distance: 0,
          memo: "",
        };
      });

    return {
      form: {
        date: res.date,
        distance: res.distance,
        memo: res.memo,
      },
      show: true,
      selectedDate,
      year,
      month,
      day,
      successMsg: "",
      errorMsg: "",
    };
  },
  computed: {
    prevDate() {
      const selectedDate = moment({
        year: this.year,
        month: this.month - 1,
        date: this.day,
      });
      return selectedDate.add(-1, "day");
    },
    nextDate() {
      const selectedDate = moment({
        year: this.year,
        month: this.month - 1,
        date: this.day,
      });
      return selectedDate.add(1, "day");
    },
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      await this.$apiClient
        .postRecord(this.form)
        .then((res) => (this.successMsg = "Saved successfully"))
        .catch((e) => (this.errorMsg = "Failed to save"));
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.distance = 0;
      this.form.memo = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    prev() {
      const query = {
        year: String(this.prevDate.year()),
        month: String(this.prevDate.month() + 1),
        day: String(this.prevDate.date()),
      };
      this.$router.push({ query });
    },
    next() {
      const query = {
        year: String(this.nextDate.year()),
        month: String(this.nextDate.month() + 1),
        day: String(this.nextDate.date()),
      };
      this.$router.push({ query });
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, Data, Methods, Computed, Props>);
</script>
