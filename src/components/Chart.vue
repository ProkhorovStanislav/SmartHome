<script lang="ts">
import { Bar } from "vue-chartjs";
import { Vue, Component, Prop } from "vue-property-decorator";
import { ScheduleItem, Rate, InputData } from "@/interfaces/index.ts";

@Component({
  extends: Bar
})
export default class ChartComponent extends Vue {
  @Prop() private schedule!: ScheduleItem[];
  @Prop() private inputData!: InputData;

  chart: any;
  renderChart: any;

  mounted() {
    this.renderChart(this.getData(), this.getOptions());
  }

  getData() {
    return {
      labels: this.schedule.map(item => item.hour),
      datasets: [
        {
          label: "Мгн. мощность",
          data: this.schedule.map(item => ({
            x: item.hour,
            y: item.instantaneousPower
          })),
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1
        },
        {
          label: "Макс. мощность",
          type: "line",
          data: this.schedule.map(item => ({
            x: item.hour,
            y: this.inputData.maxPower
          })),
          backgroundColor: "rgba(255, 99, 132, 0)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1
        },
        {
          label: "Относ. стоимость",
          type: "bar",
          backgroundColor: "rgba(255, 159, 64, 0.2)",
          borderColor: "rgba(255, 159, 64, 1)",
          barPercentage: 1.0,
          borderWidth: 1,
          data: this.inputData.rates
            .reduce((acc: any, rate: Rate) => {
              let hour = rate.from;
              let subArray = [];

              while (hour !== rate.to) {
                subArray.push({ x: hour, y: rate.value * 100 });
                hour++;
                if (hour === 24) hour = 0;
              }
              return [...acc, ...subArray];
            }, [])
            .sort((a, b) => a.x - b.x)
        }
      ]
    };
  }

  getOptions() {
    return {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
      responsive: true,
      maintainAspectRatio: false
    };
  }
}
</script>

<style scoped></style>
