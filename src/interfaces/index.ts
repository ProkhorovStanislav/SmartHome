export interface InputData {
  devices: Device[];
  rates: Rate[];
  maxPower: number;
}

export interface Device {
  hourPrice: number;
  name: string;
  power: number;
  id: string;
  duration: number;
}

export interface Rate {
  from: number;
  to: number;
  value: number;
}

export interface ScheduleItem {
  devices: Device[];
  instantaneousPower: number;
  hour: number;
  price: number;
  time: string;
}

export interface ResultForDeviceItem {
  [propName: string]: number;
}

export interface Result {
  total: number;
  devices: ResultForDeviceItem;
}
