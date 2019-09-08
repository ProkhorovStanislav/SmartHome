<template>
  <div class="table">
    <div class="table-row table-row--header">
      <div>Прибор</div>
      <div>Стоимость, руб.</div>
    </div>
    <div
      v-for="(price, name, index) in consumedResult.devices"
      v-bind:key="index"
      class="table-row"
    >
      <div>{{ name }}</div>
      <div>{{ price.toFixed(2) }}</div>
    </div>
    <div class="table-row table-row--footer">
      <div>Итог</div>
      <div>{{ consumedResult.total.toFixed(2) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Result } from "@/interfaces/index.ts";

@Component
export default class ConsumedTable extends Vue {
  @Prop() private consumedResult!: Result;
}
</script>

<style scoped>
.table {
  display: table;
  border: 1px solid #999;
}
.table-row {
  display: table-row;
}
.table-row--header div {
  font-weight: 700;
}
.table-row--footer div {
  font-weight: 700;
}
.table-row div {
  display: table-cell;
  padding: 10px;
  vertical-align: middle;
  text-align: center;
  border: 1px solid #999;
}
</style>
