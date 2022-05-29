import React from 'react';
import {useCalendarController} from '../../../Hooks';

export const useDayController = (id: string, date: Date | undefined) => {
  const {changeSelectedDate} = useCalendarController(id);
  const handlePress = React.useCallback(() => {
    date && changeSelectedDate(date);
  }, [date, changeSelectedDate]);

  return {handlePress};
};
