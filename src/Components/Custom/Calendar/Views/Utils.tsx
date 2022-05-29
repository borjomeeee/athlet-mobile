import dayjs from 'dayjs';

export const generateDaysGridForDate = (date: Date) => {
  const selectedDate = date;
  const selectedDateDaysInMonth = dayjs(selectedDate).daysInMonth();

  const startOfMonthDate = dayjs(selectedDate).set('date', 0);
  const endOfMonthDate = startOfMonthDate.add(selectedDateDaysInMonth, 'day');

  const numDaysInMonth = startOfMonthDate.day() + selectedDateDaysInMonth - 1;

  let countingDate = startOfMonthDate.add(-startOfMonthDate.day() + 1, 'day');
  const weeksInMonth = Math.ceil(numDaysInMonth / 7);

  const res: (Date | undefined)[][] = new Array(weeksInMonth)
    .fill(undefined)
    .map(_ => []);

  for (let i = 0; i < weeksInMonth; i++) {
    const currentWeek = res[i];

    for (let j = 0; j < 7; j++) {
      if (
        countingDate.isBefore(startOfMonthDate, 'date') ||
        countingDate.isAfter(endOfMonthDate, 'date') ||
        countingDate.isSame(startOfMonthDate, 'date')
      ) {
        currentWeek.push(undefined);
      } else {
        currentWeek.push(countingDate.toDate());
      }

      countingDate = countingDate.add(1, 'day');
    }
  }

  return res;
};
