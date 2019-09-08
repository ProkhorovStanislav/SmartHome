export const getNormalizedSchedule = (innerSchedule: Array<{ hour: number }>) =>
  [...innerSchedule].sort((a, b) => a.hour - b.hour);
