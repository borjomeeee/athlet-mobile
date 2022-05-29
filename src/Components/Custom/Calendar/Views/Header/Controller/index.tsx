import {useCalendarAnimations} from '../../../Hooks';

export const useHeaderController = (id: string) => {
  const {toPrevMonth, toNextMonth} = useCalendarAnimations(id);
  return {handlePressNext: toNextMonth, handlePressPrev: toPrevMonth};
};
