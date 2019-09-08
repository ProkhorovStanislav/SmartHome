import { Device } from "@/interfaces/index.ts";

export function getInnerSchedule(
  rates: Array<{ value: number; from: number; to: number }>
) {
  const newSchedule: Array<{
    hour: number;
    time: string;
    price: number;
    devices: Device[];
    instantaneousPower: number;
  }> = [];
  [...rates]
    .sort((a, b) => a.value - b.value)
    .forEach(item => {
      let hour = item.from;
      while (hour !== item.to) {
        newSchedule.push({
          hour,
          time: hour >= 21 || hour < 7 ? "night" : "day",
          price: item.value,
          devices: [],
          instantaneousPower: 0
        });
        hour++;
        if (hour === 24) hour = 0;
      }
    });
  return newSchedule;
}
