import dayjs from 'dayjs';
import React from 'react';
import * as UI from 'src/Components';
import {useRecoilValue} from 'recoil';
import {showedDateStore} from '../../../Store';
import {Week} from './Week';

export const Content = () => {
  const showedDate = useRecoilValue(showedDateStore);

  const grid = React.useMemo(
    () => generateDaysGridForDate(showedDate),
    [showedDate],
  );

  const daysGrip = React.useMemo(() => {
    const showedDateMonth = dayjs(showedDate).get('month');

    return grid.map(week =>
      week.map(day => ({
        date: day,
        hidden: dayjs(day).get('month') !== showedDateMonth,
      })),
    );
  }, [grid, showedDate]);

  return (
    <>
      {daysGrip.map((week, indx) => (
        <>
          {indx !== 0 && <UI.HSpacer size={20} />}
          <Week days={week} />
        </>
      ))}
    </>
  );
};

export const generateDaysGridForDate = (date: number) => {
  const currentMonthDate = dayjs(date).startOf('month');
  const nextMonthDate = currentMonthDate.add(1, 'month');

  const daysByWeek: number[][] = [];
  let cursorDate = currentMonthDate.startOf('week');

  while (cursorDate.isBefore(nextMonthDate)) {
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(cursorDate.toDate().getTime());
      cursorDate = cursorDate.add(1, 'day');
    }

    daysByWeek.push(days);
  }

  return daysByWeek;
};
