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
  const dDate = dayjs(date);
  const month = dayjs(date).get('month');

  const daysByWeek: number[][] = [];
  let cursorDate = dDate.startOf('week');
  console.log(cursorDate);
  while (
    cursorDate.get('month') <= month &&
    cursorDate.get('year') === dDate.get('year')
  ) {
    daysByWeek.push([]);

    for (let i = 0; i < 7; i++) {
      daysByWeek[daysByWeek.length - 1].push(cursorDate.toDate().getTime());
      cursorDate = cursorDate.add(1, 'day');
    }
  }

  return daysByWeek;
};
