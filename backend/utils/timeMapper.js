export const minutesToDate = (weekStart, day, minutes) => {
  const date = new Date(weekStart);

  // day: 0 (Sunday) → 6 (Saturday)
  date.setDate(date.getDate() + day);

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  date.setHours(hours, mins, 0, 0);

  return date;
};
