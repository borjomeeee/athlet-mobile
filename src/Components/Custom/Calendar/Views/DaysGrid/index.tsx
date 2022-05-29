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
  useAnimatedReaction,
} from 'react-native-reanimated';
import {useRecoilValue} from 'recoil';
import {View} from 'src/Components/Common';
import {useCalendarAnimated, useCalendarAnimations} from '../../Hooks';
import {showedDateStore} from '../../Store';
import {generateDaysGridForDate} from '../Utils';
import {Week} from '../Week';

interface DaysGridProps {
  daysGrid: (Date | undefined)[][];
  calendarId: string;
}
export const DaysGrid: React.FC<DaysGridProps> = ({daysGrid, calendarId}) => {
  return (
    <View style={s(`container ofh`)}>
      {daysGrid.map(week => (
        <Week key={week.join(' ')} calendarId={calendarId} dates={week} />
      ))}
    </View>
  );
};

interface DaysGridContentProps {
  showedDate: number;
  calendarId: string;
}
export const DaysGridContent: React.FC<DaysGridContentProps> = React.memo(
  ({showedDate, calendarId}) => {
    const {screen} = useDimensions();

    const {translateX, isAnimating} = useCalendarAnimated();
    const {toPrevMonth, toNextMonth} = useCalendarAnimations(calendarId);

    const {onLayout: onCurrentLayout, ...currentLayout} = useLayout();
    const {onLayout: onNextLayout, ...nextLayout} = useLayout();
    const {onLayout: onPrevLayout, ...prevLayout} = useLayout();

    const isMounted = useSharedValue(false);
    const screenTranslateX = useSharedValue(0);

    useAnimatedReaction(
      () => translateX.value,
      trX => {
        screenTranslateX.value = interpolate(
          trX,
          [-1, 0, 1],
          [-screen.width, 0, screen.width],
          Extrapolate.CLAMP,
        );
      },
    );

    const containerHeight = useDerivedValue(() =>
      isMounted.value
        ? interpolate(
            translateX.value,
            [-1, 0, 1],
            [nextLayout.height, currentLayout.height, prevLayout.height],
          )
        : undefined,
    );

    const prevDaysGrid = React.useMemo(
      () =>
        generateDaysGridForDate(dayjs(showedDate).add(-1, 'month').toDate()),
      [showedDate],
    );

    const currentDaysGrid = React.useMemo(
      () => generateDaysGridForDate(new Date(showedDate)),
      [showedDate],
    );

    const nextDaysGrid = React.useMemo(
      () => generateDaysGridForDate(dayjs(showedDate).add(1, 'month').toDate()),
      [showedDate],
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
          screenTranslateX.value = 0;
        } else if (translateX.value > 1 / 4) {
          runOnJS(toPrevMonth)();
          screenTranslateX.value = 0;
        } else {
          translateX.value = withTiming(0, {}, isFinished => {
            if (isFinished) {
              isAnimating.value = false;
            }
          });
        }
      });

    const containerStyles = useAnimatedStyle(() => ({
      transform: [{translateX: screenTranslateX.value}],
      height: containerHeight.value,
    }));

    const prevDaysGridStyles = React.useMemo(
      () => [s(`abs t:0 r:0 l:0`), {transform: [{translateX: -screen.width}]}],
      [screen],
    );

    const nextDaysGridStyles = React.useMemo(
      () => [s(`abs t:0 r:0 l:0`), {transform: [{translateX: screen.width}]}],
      [screen],
    );

    React.useEffect(() => {
      if (currentLayout.height && nextLayout.height && prevLayout.height) {
        isMounted.value = true;
      }
    }, [currentLayout.height, nextLayout.height, prevLayout.height, isMounted]);

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={containerStyles}>
          <View style={prevDaysGridStyles} onLayout={onPrevLayout}>
            <DaysGrid calendarId={calendarId} daysGrid={prevDaysGrid} />
          </View>
          <View onLayout={onCurrentLayout}>
            <DaysGrid calendarId={calendarId} daysGrid={currentDaysGrid} />
          </View>
          <View style={nextDaysGridStyles} onLayout={onNextLayout}>
            <DaysGrid calendarId={calendarId} daysGrid={nextDaysGrid} />
          </View>
        </Animated.View>
      </GestureDetector>
    );
  },
);

interface DaysGridContainerProps {
  id: string;
}
export const DaysGridContainer: React.FC<DaysGridContainerProps> = React.memo(
  ({id}) => {
    const showedDate = useRecoilValue(showedDateStore(id));
    return (
      <DaysGridContent
        key={showedDate.toISOString()}
        calendarId={id}
        showedDate={showedDate.getTime()}
      />
    );
  },
);
