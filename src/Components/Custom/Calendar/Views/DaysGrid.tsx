import s from '@borjomeeee/rn-styles';
import {useDimensions, useLayout} from '@react-native-community/hooks';
import dayjs from 'dayjs';
import React from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  Extrapolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import {useRecoilValue} from 'recoil';
import {View} from 'src/Components/Common';
import {useCalendarAnimated, useCalendarAnimations} from '../Controller';
import {showedDateStore} from '../Store';
import {generateDaysGridForDate} from './Utils';
import {Week} from './Week';

interface DaysGridProps {
  daysGrid: (Date | undefined)[][];
}
export const DaysGrid: React.FC<DaysGridProps> = ({daysGrid}) => {
  return (
    <View style={s(`container ofh`)}>
      {daysGrid.map(week => (
        <Week key={week.join(' ')} dates={week} />
      ))}
    </View>
  );
};

interface DaysGridContentProps {
  id: string;
  showedDate: Date;
}
export const DaysGridContent: React.FC<DaysGridContentProps> = ({
  showedDate,
  id,
}) => {
  const {screen} = useDimensions();

  const {translateX, isAnimating} = useCalendarAnimated();
  const {toPrevMonth, toNextMonth} = useCalendarAnimations(id);

  const {onLayout: onCurrentLayout, ...currentLayout} = useLayout();
  const {onLayout: onNextLayout, ...nextLayout} = useLayout();
  const {onLayout: onPrevLayout, ...prevLayout} = useLayout();

  const isOnlyMounted = useSharedValue(true);

  const screenTranslateX = useDerivedValue(() =>
    interpolate(
      translateX.value,
      [-1, 0, 1],
      [-screen.width, 0, screen.width],
      Extrapolate.CLAMP,
    ),
  );

  const containerHeight = useDerivedValue(() =>
    isOnlyMounted.value
      ? undefined
      : interpolate(
          translateX.value,
          [-1, 0, 1],
          [nextLayout.height, currentLayout.height, prevLayout.height],
        ),
  );

  const prevDaysGrid = generateDaysGridForDate(
    dayjs(showedDate).add(-1, 'month').toDate(),
  );

  const currentDaysGrid = generateDaysGridForDate(showedDate);

  const nextDaysGrid = generateDaysGridForDate(
    dayjs(showedDate).add(1, 'month').toDate(),
  );

  const gesture = Gesture.Pan()
    .onStart(() => {
      if (isAnimating.value) {
        return;
      }

      translateX.value = 0;
    })
    .onUpdate(e => {
      if (isAnimating.value) {
        return;
      }

      translateX.value = e.translationX / screen.width;
    })
    .onEnd(() => {
      if (isAnimating.value) {
        return;
      }

      if (translateX.value < -1 / 4) {
        runOnJS(toNextMonth)();
      } else if (translateX.value > 1 / 4) {
        runOnJS(toPrevMonth)();
      } else {
        translateX.value = withTiming(0, {}, isFinished => {
          if (isFinished) {
            isAnimating.value = false;
          }
        });
      }
    });

  const containerStyles = useAnimatedStyle(
    () => ({
      transform: [
        {translateX: isOnlyMounted.value ? 0 : screenTranslateX.value},
      ],

      height: containerHeight.value,
    }),
    [],
  );

  const prevDaysGridStyles = React.useMemo(
    () => [s(`abs t:0 r:0 l:0`), {transform: [{translateX: -screen.width}]}],
    [screen],
  );

  const nextDaysGridStyles = React.useMemo(
    () => [s(`abs t:0 r:0 l:0`), {transform: [{translateX: screen.width}]}],
    [screen],
  );

  React.useEffect(() => {
    translateX.value = 0;
  }, [translateX]);

  React.useEffect(() => {
    if (currentLayout.height && prevLayout.height && nextLayout.height) {
      isOnlyMounted.value = false;
    }
  }, [isOnlyMounted, currentLayout, prevLayout, nextLayout]);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={containerStyles}>
        <View style={prevDaysGridStyles} onLayout={onPrevLayout}>
          <DaysGrid daysGrid={prevDaysGrid} />
        </View>
        <View onLayout={onCurrentLayout}>
          <DaysGrid daysGrid={currentDaysGrid} />
        </View>
        <View style={nextDaysGridStyles} onLayout={onNextLayout}>
          <DaysGrid daysGrid={nextDaysGrid} />
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

interface DaysGridContainerProps {
  id: string;
}
export const DaysGridContainer: React.FC<DaysGridContainerProps> = ({id}) => {
  const showedDate = useRecoilValue(showedDateStore(id));

  return (
    <DaysGridContent
      key={showedDate.toISOString()}
      id={id}
      showedDate={showedDate}
    />
  );
};
