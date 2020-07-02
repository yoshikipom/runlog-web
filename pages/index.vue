<script lang="ts">
import Vue from "Vue";
export default Vue.extend({
  fetch({ redirect }) {
    redirect(301, "/dashboard");
  },
});
</script>
