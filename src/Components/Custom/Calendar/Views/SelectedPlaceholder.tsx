import s from '@borjomeeee/rn-styles';
import dayjs from 'dayjs';
import React from 'react';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
import {useRecoilValue} from 'recoil';
import {Colors} from 'src/Utils/Styles';
import {CALENDAR_DATE_HEIGHT, CALENDAR_DATE_WIDTH} from '../Const';
import {selectedDateStore} from '../Store';

interface SelectedDateViewProps {
  gridIndex: [number, number];
  layoutWidth: number;
}
const SelectedDateView: React.FC<SelectedDateViewProps> = ({
  gridIndex,
  layoutWidth,
}) => {
  const spaceWidth = (layoutWidth - 7 * 16) / 7;
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(
          gridIndex[1] * (CALENDAR_DATE_WIDTH + spaceWidth) - 4,
        ),
      },
      {
        translateY: withSpring(
          gridIndex[0] * (CALENDAR_DATE_HEIGHT + 2 * 10) + 5,
        ),
      },
    ],
  }));

  const style = React.useMemo(
    () => [
      s(`abs t:0 l:0 zi:-1`, `w:${28} h:${28} br:6 bgc:${Colors.blue}`),
      animatedStyles,
    ],
    [animatedStyles],
  );

  return <Animated.View style={style} />;
};

interface SelectedPlaceholderProps {
  calendarId: string;
  daysGrid: (Date | undefined)[][];
  layoutWidth: number;
}
export const SelectedPlaceholder: React.FC<SelectedPlaceholderProps> = ({
  calendarId,
  daysGrid,
  layoutWidth,
}) => {
  const selectedDate = useRecoilValue(selectedDateStore(calendarId));

  if (daysGrid.length <= 1) {
    return null;
  }

  const lowestDate = daysGrid[0].find(day => !!day);
  const biggestDate = [...daysGrid[daysGrid.length - 1]]
    .reverse()
    .find(day => !!day);

  if (!lowestDate || !biggestDate) {
    return null;
  }

  if (
    dayjs(selectedDate).isBefore(lowestDate) ||
    dayjs(selectedDate).isAfter(biggestDate)
  ) {
    return null;
  }

  const gridIndex = getGridIndexForDate(daysGrid, selectedDate);

  return <SelectedDateView gridIndex={gridIndex} layoutWidth={layoutWidth} />;
};

function getGridIndexForDate(
  daysGrid: (Date | undefined)[][],
  date: Date,
): [number, number] {
  for (let i = 0; i < daysGrid.length; i++) {
    for (let j = 0; j < daysGrid[i].length; j++) {
      if (daysGrid[i][j] && dayjs(daysGrid[i][j]).isSame(date, 'day')) {
        return [i, j];
      }
    }
  }
  return [0, 0];
}
