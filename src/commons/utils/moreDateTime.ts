export function formatElapsedDaysHoursMinutes(totalMinutes: number): string {
  // here everything is measured in minutes

  totalMinutes = Math.abs(totalMinutes);
  const hour = 60;
  const hoursInDay = 24;

  const minutes = totalMinutes % hour;
  const totalHours = (totalMinutes - minutes) / hour;
  const hours = totalHours % hoursInDay;
  const days = (totalHours - hours) / hoursInDay;

  const daysString = days > 0 ? days + ' д.' : '';
  const hoursString = (hours > 0 && days < 4) ? hours + ' ч.' : '';
  const minutesString = (days == 0 && hours < 6) ? minutes + ' м.' : '';
  return `${daysString} ${hoursString} ${minutesString}`
}
