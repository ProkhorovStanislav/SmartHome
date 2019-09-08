<template>
  <div class="outputWrapper">
    <h2>Выходные данные:</h2>
    <!--    <div v-if="result.outputErrors" class="outputErrors">-->
    <!--      &lt;!&ndash;      <OutputErrors v-bind:errors="result.outputErrors" />&ndash;&gt;-->
    <!--    </div>-->
    <div v-if="outputData.schedule" class="outputColumnLeft">
      <ScheduleTable v-bind:schedule="outputData.schedule" />
    </div>
    <div v-if="outputData.consumedResult" class="outputColumnRight">
      <ConsumedTable v-bind:consumedResult="outputData.consumedResult" />
    </div>
    <div v-if="outputData.schedule" class="outputChart">
      <Chart
        v-bind:schedule="outputData.schedule"
        v-bind:inputData="outputData.inputData"
        :styles="chartStyles"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ScheduleTable from "@/components/ScheduleTable.vue";
import ConsumedTable from "@/components/ConsumedTable.vue";
import Chart from "@/components/Chart.vue";
import { getInnerSchedule } from "@/utils/getInnerSchedule";
import { getNormalizedSchedule } from "@/utils/getNormalizedSchedule";
import { getDevicesRankedByPower } from "@/utils/getDevicesRankedByPower";
import { getConsumedResult } from "@/utils/getConsumedResult";

import { mapState } from "vuex";
import OutputErrors from "@/components/OutputErrors.vue";

@Component({
  components: {
    ScheduleTable,
    ConsumedTable,
    Chart
  },
  computed: {
    chartStyles() {
      return {
        height: "50vh",
        width: "60vw",
        position: "relative"
      };
    }
  }
})
export default class OutputContainer extends Vue {
  get outputData() {
    const inputData = this.$store.state.inputData;

    // Получение базового шаблона расписания, отсортированного по возрастанию тарифа
    const innerSchedule = getInnerSchedule(inputData.rates);

    // Коллекция уже обратотанных приборов
    const processedDevices = new Set();

    // Для приборов, которым не хватит места в расписании
    const notAddedDevices = [];

    // Устройства,отсортированные по убыванию потребляемой мгновенной мощности
    const devicesRankedByPower = getDevicesRankedByPower(inputData.devices);

    // Добавление в расписание устройств с длительным циклом работы
    devicesRankedByPower.forEach(device => tryAddDeviceToSchedule(device, 20));

    // Добавление в расписание устройств в порядке убывания потребляемой мгновенной мощности
    devicesRankedByPower.forEach(device => tryAddDeviceToSchedule(device));

    const consumedResult = getConsumedResult(innerSchedule);

    const normalizedSchedule = getNormalizedSchedule(innerSchedule);

    // Добавление приборо-часа в расписание при соблюдении условий ТЗ, в недобавленные, если добавление невозможно
    function tryAddDeviceToSchedule(device: any, minDuration = 0) {
      let hours = 0;
      if (device.duration > minDuration && !processedDevices.has(device.id)) {
        processedDevices.add(device.id);
        hours = device.duration;
        innerSchedule.forEach(itemSchedule => {
          if (
            itemSchedule.instantaneousPower + device.power <=
              inputData.maxPower &&
            hours &&
            (device.mode === undefined || device.mode === itemSchedule.time)
          ) {
            itemSchedule.devices.push({
              ...device,
              hourPrice: (device.power * itemSchedule.price) / 1000
            });
            itemSchedule.instantaneousPower += device.power;
            hours--;
          }
        });
        if (hours) {
          notAddedDevices.push({ name: device.name, hours });
        }
      }
    }

    return {
      schedule: normalizedSchedule,
      consumedResult,
      inputData
    };
  }
}
</script>

<style scoped>
.outputWrapper {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  padding: 30px;
  margin: 0 auto;
  border-radius: 10px;
  border: 1px dashed #999;
}

.outputColumnLeft {
  margin-right: 30px;
}

.outputChart {
  width: 60vw;
  padding-top: 50px;
}
h2 {
  width: 100%;
  margin: 0 0 15px;
  text-align: left;
}
</style>
