import dayjs from 'dayjs';
import {atom, useRecoilCallback} from 'recoil';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';

const initialDate = new Date();
const createKey = getKeyFabricForDomain('calendar component');

export const todayDateStore = atom({
  key: createKey('today date'),
  default: dayjs(initialDate).startOf('month').toDate().getTime(),
});

export const selectedDateStore = atom({
  key: createKey('selectedDate'),
  default: initialDate.getTime(),
});

export const showedDateStore = atom({
  key: createKey('showedDate'),
  default: initialDate.getTime(),
});

export const useCalendarScreenStore = () => {
  const handleChangeSelectDate = useRecoilCallback(
    ({get, set}) =>
      (date: number) => {
        const newSelectedDate = dayjs(date);
        set(selectedDateStore, date);

        const prevShowedDate = dayjs(get(showedDateStore));
        const newShowedDate = prevShowedDate
          .add(-prevShowedDate.diff(newSelectedDate, 'month'), 'month')
          .startOf('month');

        set(showedDateStore, newShowedDate.toDate().getTime());
      },
    [],
  );

  const showNextMonth = useRecoilCallback(
    ({get, set}) =>
      () => {
        const dShowedDate = dayjs(get(showedDateStore));
        set(
          showedDateStore,
          dShowedDate.add(1, 'month').startOf('month').toDate().getTime(),
        );
      },
    [],
  );

  const showPrevMonth = useRecoilCallback(
    ({get, set}) =>
      () => {
        const dShowedDate = dayjs(get(showedDateStore));
        set(
          showedDateStore,
          dShowedDate.add(-1, 'month').startOf('month').toDate().getTime(),
        );
      },
    [],
  );

  const reset = useRecoilCallback(
    ({reset: recoilReset, set}) =>
      () => {
        recoilReset(selectedDateStore);
        recoilReset(showedDateStore);

        set(todayDateStore, new Date().getTime());
      },
    [],
  );

  return {
    reset,
    changeSelectedDate: handleChangeSelectDate,
    showNextMonth,
    showPrevMonth,
  };
};
