<template>
  <div class="table">
    <div class="table-row table-row--header">
      <div>Время</div>
      <div>Приборы</div>
      <div>Энергия</div>
      <div>Тариф</div>
      <div>Сумма</div>
    </div>
    <div v-for="item in schedule" v-bind:key="item.id" class="table-row">
      <div>{{ item.hour }}.00 - {{ item.time.slice(0, 1) }}</div>
      <div>
        {{
          item.devices.reduce(
            (acc, currentItem) =>
              `${acc === "" ? acc : acc + ", "} ${currentItem.name}`,
            ""
          )
        }}
      </div>
      <div>{{ item.instantaneousPower }}</div>
      <div>{{ item.price }}</div>
      <div>
        {{ ((item.instantaneousPower * item.price) / 1000).toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ScheduleItem } from "@/interfaces/index.ts";

@Component
export default class ScheduleTable extends Vue {
  @Prop() private schedule!: ScheduleItem[];
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
