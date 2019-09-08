import { Device, ScheduleItem, Result } from "@/interfaces/index.ts";

export function getConsumedResult(schedule: ScheduleItem[]) {
  const result: Result = {
    total: 0,
    devices: {}
  };

  schedule.forEach((scheduleItem: ScheduleItem) => {
    scheduleItem.devices &&
      scheduleItem.devices.forEach((device: Device) => {
        result.total = +(result.total + device.hourPrice).toFixed(5);
        result.devices[device.name] = result.devices[device.name]
          ? +(result.devices[device.name] + device.hourPrice).toFixed(5)
          : device.hourPrice;
      });
  });

  return result;
}
