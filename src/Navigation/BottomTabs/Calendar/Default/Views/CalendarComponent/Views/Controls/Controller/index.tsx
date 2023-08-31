import {useCalendarScreenStore} from '../../../../../Store';

export const useControlsController = () => {
  const {showPrevMonth, showNextMonth} = useCalendarScreenStore();
  return {handlePressPrev: showPrevMonth, handlePressNext: showNextMonth};
};
