export function diffMsBetweenDates(date1: Date, date2: Date): number {
  return date2.getTime() - date1.getTime();
}
