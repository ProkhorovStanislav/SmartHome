<template>
  <div class="inputWrapper">
    <h2>Входные данные:</h2>
    <div v-if="validatedData.errors" class="inputErrors">
      <InputErrors v-bind:errors="validatedData.errors" />
    </div>
    <div v-if="validatedData.devices" class="inputColumnLeft">
      <InputDevices v-bind:devices="validatedData.devices" />
    </div>
    <div
      v-if="validatedData.rates || validatedData.maxPower"
      class="inputColumnRight"
    >
      <InputTariffZones
        v-if="validatedData.rates"
        v-bind:rates="validatedData.rates"
      />
      <InputAdditionalInfo
        v-if="validatedData.maxPower"
        v-bind:maxPower="validatedData.maxPower"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InputDevices from "@/components/InputDevices.vue";
import InputTariffZones from "@/components/InputTariffZones.vue";
import InputAdditionalInfo from "@/components/InputAdditionalInfo.vue";
import InputErrors from "@/components/InputErrors.vue";
import store from "@/store.ts";

import inputData from "@/mocks/inputData";

import { validateResponseData } from "@/utils/validateResponseData";

@Component({
  components: {
    InputDevices,
    InputTariffZones,
    InputAdditionalInfo,
    InputErrors
  },
  data: () => {
    const validatedData = validateResponseData(inputData);
    store.commit("updateInputData", validatedData);
    return { validatedData };
  },
})
export default class InputContainer extends Vue {}
</script>

<style scoped>
.inputWrapper {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  padding: 30px;
  margin: 0 auto 30px;
  border-radius: 10px;
  border: 1px dashed #999;
}

.inputColumnLeft {
  margin-right: 30px;
}

h2 {
  width: 100%;
  margin: 0 0 15px;
  text-align: left;
}
</style>
