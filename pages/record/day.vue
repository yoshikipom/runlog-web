<template>
  <div class="animated fadeIn">
    <div class="card">
      <div class="card-header">
        <i class="icon-notebook"></i> Daily Record
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <div class="p-3 mb-3 bg-primary">Primary</div>
          </div>
          <div class="col-md-4">
            <div class="p-3 mb-3 bg-secondary">Secondary</div>
          </div>
          <div class="col-md-4">
            <div class="p-3 mb-3 bg-success">Success</div>
          </div>
          <div class="col-md-4">
            <div class="p-3 mb-3 bg-danger">Danger</div>
          </div>
          <div class="col-md-4">
            <div class="p-3 mb-3 bg-warning">Warning</div>
          </div>
          <div class="col-md-4">
            <div class="p-3 mb-3 bg-info">Info</div>
          </div>
          <div class="col-md-4">
            <div class="p-3 mb-3 bg-light">Light</div>
          </div>
          <div class="col-md-4">
            <div class="p-3 mb-3 bg-dark">Dark</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
      <b-table
        :striped="striped"
        :bordered="bordered"
        :borderless="borderless"
        :outlined="outlined"
        :small="small"
        :hover="hover"
        :dark="dark"
        :fixed="fixed"
        :foot-clone="footClone"
        :no-border-collapse="noCollapse"
        :items="items"
        :fields="fields"
        :head-variant="headVariant"
        :table-variant="tableVariant"
      ></b-table>
    </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { ThisTypedComponentOptionsWithRecordProps } from "vue/types/options";

interface Data {}
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
  name: "colors",
  data() {
      return {
        fields: ['first_name', 'last_name', 'age'],
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' }
        ],
        tableVariants: [
          'primary',
          'secondary',
          'info',
          'danger',
          'warning',
          'success',
          'light',
          'dark'
        ],
        striped: false,
        bordered: false,
        borderless: false,
        outlined: true,
        small: true,
        hover: false,
        dark: false,
        fixed: false,
        footClone: false,
        headVariant: 'dark',
        tableVariant: '',
        noCollapse: false
      }
    }
};

export default Vue.extend(options);
</script>

<style scoped>
.card-body {
  padding: 1rem;
}
</style>
