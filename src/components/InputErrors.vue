<template>
  <ul>
    <li v-for="error in errors" v-bind:key="error" class="inputErrorsList">
      {{ error }}
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class InputAdditionalInfo extends Vue {
  @Prop() private errors!: string;
}
</script>

<style scoped>
.inputErrorsList {
  padding-top: 20px;
}
</style>
