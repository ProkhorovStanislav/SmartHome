<template>
  <div class="mainScreenWrapper">
    <InputContainer />
    <OutputContainer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InputContainer from "@/components/InputContainer.vue";
import OutputContainer from "@/components/OutputContainer.vue";

@Component({
  components: {
    InputContainer,
    OutputContainer
  }
})
export default class MainScreen extends Vue {}
</script>

<style scoped></style>
