<template>
  <div class="animated fadeIn">
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
import moment from "moment";

const today = moment();
const defaultYear = today.year();
const defaultMonth = today.month() + 1;

interface Data {
  fields: string[];
  items: any[];
  year: number;
  month: number;
}
interface Methods {}
interface Computed {}
interface Props {}

const options: ThisTypedComponentOptionsWithRecordProps<
  Vue,
  Data,
  Methods,
  Computed,
  Props
> = {
  name: "monthly-record",
  async asyncData(context: Context) {
    const { query, $axios, error } = context;

    const year = Number(query.year) || defaultYear;
    const month = Number(query.month) || defaultMonth;
    const url = `http://localhost:8080/api/monthRecords?year=${year}&month=${month}`;
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
    };
  },
};

export default Vue.extend(options);
</script>

<style scoped>
.card-body {
  padding: 1rem;
}
</style>
