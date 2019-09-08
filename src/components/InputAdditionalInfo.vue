<template>
  <div class="inputAdditionalInfo">
    <div>
      <b>Макс. мощн.: {{ maxPower }}Вт</b>
    </div>
    <div><b>День 07:00 - 21:00</b></div>
    <div><b>Ночь 21:00 - 07:00</b></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class InputAdditionalInfo extends Vue {
  @Prop() private maxPower!: string;
}
</script>

<style scoped>
.inputAdditionalInfo {
  padding-top: 20px;
}
</style>
