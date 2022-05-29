import {useCalendarStore} from '../../../Store';

export const useDaysGridController = (id: string) => {
  const {showNextMonth, showPrevMonth} = useCalendarStore(id);
  return {showNextMonth, showPrevMonth};
};
