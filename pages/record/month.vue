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

interface Data {
  fields: string[];
  items: any[];
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
    const { $axios, error } = context;

    let items;
    const url = "http://localhost:8080/monthRecords?year=2020&month=6";
    const res = await $axios
      .$get(url)
      .then((res) => {
        items = res;
      })
      .catch((e) =>
        error({ statusCode: 500, message: "failed to get month record" })
      );

    return {
      fields: ["id", "date", "distance", "memo"],
      items,
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
