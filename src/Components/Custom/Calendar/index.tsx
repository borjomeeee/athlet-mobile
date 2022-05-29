import React from 'react';
import {useSharedValue} from 'react-native-reanimated';

import {CalendarAnimatedContext, useCalendarController} from './Hooks';
import {Content} from './Views/Content';

interface CalendarProps {
  id: string;

  initialSelectedDate?: Date;
}
export const Calendar: React.FC<CalendarProps> = ({
  id,
  initialSelectedDate,
}) => {
  const isAnimating = useSharedValue(false);
  const translateX = useSharedValue(0);

  const {init} = useCalendarController(id);

  const contextValue = React.useMemo(
    () => ({translateX, isAnimating}),
    [translateX, isAnimating],
  );

  React.useLayoutEffect(() => {
    initialSelectedDate && init(initialSelectedDate);
  }, [init, initialSelectedDate]);

  return (
    <CalendarAnimatedContext.Provider value={contextValue}>
      <Content id={id} />
    </CalendarAnimatedContext.Provider>
  );
};
