export const getDevicesRankedByPower = (devices: Array<{ power: number }>) =>
  [...devices].sort((a, b) => b.power - a.power);
