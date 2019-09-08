<template>
  <div class="table">
    <div class="table-row table-row--header">
      <div>Интервал</div>
      <div>Д/H</div>
      <div>Цена</div>
    </div>
    <div v-for="item in rates" v-bind:key="item.id" class="table-row">
      <div>{{ item.from }}.00 - {{ item.to }}.00</div>
      <div>{{ getTimesOfDay(item.from, item.to) }}</div>
      <div>{{ item.value }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class InputTariffZones extends Vue {
  @Prop() private rates!: Array<object>;

  getTimesOfDay = (from: number, to: number) =>
    from >= 21 || to <= 7 ? "н" : "д";
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
