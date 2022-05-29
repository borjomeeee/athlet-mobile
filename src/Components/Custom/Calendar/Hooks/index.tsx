import React from 'react';

import Animated, {
  runOnJS,
  useAnimatedReaction,
  withTiming,
} from 'react-native-reanimated';
import {useRecoilValue} from 'recoil';
import {showedDateStore, useCalendarStore} from '../Store';

// Can i create multiple same providers?
// Answer: yes!
export const CalendarAnimatedContext = React.createContext<{
  translateX: Animated.SharedValue<number>;
  isAnimating: Animated.SharedValue<boolean>;
}>(undefined as any);

export const useCalendarAnimated = () => {
  return React.useContext(CalendarAnimatedContext);
};

export const useCalendarAnimations = (id: string) => {
  const {translateX, isAnimating} = useCalendarAnimated();
  const {showNextMonth, showPrevMonth} = useCalendarStore(id);

  const toPrevMonth = React.useCallback(() => {
    if (isAnimating.value) {
      return;
    }

    translateX.value = withTiming(1, {}, isFinished => {
      if (isFinished) {
        isAnimating.value = false;
        runOnJS(showPrevMonth)();
      }
    });
  }, [translateX, showPrevMonth, isAnimating]);

  const toNextMonth = React.useCallback(() => {
    if (isAnimating.value) {
      return;
    }

    translateX.value = withTiming(-1, {}, isFinished => {
      if (isFinished) {
        isAnimating.value = false;
        runOnJS(showNextMonth)();
      }
    });
  }, [translateX, showNextMonth, isAnimating]);

  return {isAnimating, translateX, toPrevMonth, toNextMonth};
};

export const useCalendarController = (id: string) => {
  const {changeSelectedDate} = useCalendarStore(id);

  const init = React.useCallback(
    (initialSelectedDate: Date) => {
      changeSelectedDate(initialSelectedDate);
    },
    [changeSelectedDate],
  );

  return {init, changeSelectedDate};
};

export const useCalendarStateAnimationsSync = (id: string) => {
  const showedDate = useRecoilValue(showedDateStore(id));
  const {translateX} = useCalendarAnimated();

  useAnimatedReaction(
    () => undefined,
    () => {
      translateX.value = 0;
    },
    [showedDate],
  );
};
