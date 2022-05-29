import React from 'react';
import dayjs from 'dayjs';
import {
  atom,
  atomFamily,
  selectorFamily,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';

const initialDate = new Date();
const createKey = getKeyFabricForDomain('calendar component');
export const todayDateStore = atom({
  key: createKey('today date'),
  default: initialDate,
});

export const selectedDateStore = atomFamily({
  key: createKey('selectedDate'),
  default: initialDate,
});

export const showedDateStore = atomFamily({
  key: createKey('showedDate'),
  default: initialDate,
});

export const currentDaysGridSelector = selectorFamily({
  key: createKey('currentDaysGrid'),
  get:
    (id: string) =>
    ({get}) => {
      const selectedDate = get(showedDateStore(id));
      const selectedDateDaysInMonth = dayjs(selectedDate).daysInMonth();

      const startOfMonthDate = dayjs(selectedDate).set('date', 0);
      const endOfMonthDate = startOfMonthDate.add(
        selectedDateDaysInMonth,
        'day',
      );

      const numDaysInMonth =
        startOfMonthDate.day() + selectedDateDaysInMonth - 1;

      let countingDate = startOfMonthDate.add(
        -startOfMonthDate.day() + 1,
        'day',
      );
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
    },
});

export const useCalendarStore = (id: string) => {
  const changeSelectedDate = useSetRecoilState(selectedDateStore(id));
  const resetSelectedDate = useResetRecoilState(selectedDateStore(id));

  const changeShowedDate = useSetRecoilState(showedDateStore(id));
  const resetShowedDate = useResetRecoilState(showedDateStore(id));

  const handleChangeSelectDate = React.useCallback(
    (date: Date) => {
      const newSelectedDate = dayjs(date);
      changeSelectedDate(date);
      changeShowedDate(prevDate => {
        const prevD = dayjs(prevDate);
        return prevD
          .add(-prevD.diff(newSelectedDate, 'month'), 'month')
          .toDate();
      });
    },
    [changeSelectedDate, changeShowedDate],
  );

  const showNextMonth = React.useCallback(() => {
    changeShowedDate(date => dayjs(date).add(1, 'month').toDate());
  }, [changeShowedDate]);

  const showPrevMonth = React.useCallback(() => {
    changeShowedDate(date => dayjs(date).add(-1, 'month').toDate());
  }, [changeShowedDate]);

  return {
    resetSelectedDate,
    resetShowedDate,
    changeSelectedDate: handleChangeSelectDate,
    showNextMonth,
    showPrevMonth,
  };
};
