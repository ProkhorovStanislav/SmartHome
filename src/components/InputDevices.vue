<template>
  <div class="table">
    <div class="table-row table-row--header">
      <div>Название</div>
      <div>Мощность</div>
      <div>Цикл</div>
      <div>Д/H</div>
    </div>
    <div v-for="item in devices" v-bind:key="item.id" class="table-row">
      <div>{{ item.name }}</div>
      <div>{{ item.power }}</div>
      <div>{{ item.duration }}</div>
      <div>{{ item.mode || "---" }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class InputDevices extends Vue {
  @Prop() private devices!: Array<object>;
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
