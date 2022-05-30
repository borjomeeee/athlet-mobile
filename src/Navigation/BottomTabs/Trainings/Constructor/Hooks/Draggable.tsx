import React from 'react';
import {Gesture} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  runOnUI,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
  scrollTo,
  cancelAnimation,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {useTrainingConstructorController} from './index';
import {ExerciseValuesStore, ExerciseValues} from '../Types';
import {useWindowDimensions} from 'react-native';
import {AnimationsContext} from '../Store/Animations';

export const useDraggableController = (id: string) => {
  const {positions, scrollViewRef, scrollY} =
    React.useContext(AnimationsContext);

  const {reorder} = useTrainingConstructorController();

  const {height: windowHeight} = useWindowDimensions();

  const isPressed = useSharedValue(false);
  const isDragging = useSharedValue(false);

  const gestureTranslateY = useSharedValue(0);

  const initialScrollY = useSharedValue(0);
  const startScrollY = useSharedValue(0);
  const scrollSpeed = useSharedValue(0);

  const tempOffsetY = useDerivedValue(
    () => positions.value[id]?.tempOffsetY || 0,
  );
  const lastOrder = useDerivedValue(() => positions.value[id]?.order);

  const animatedSortedPositions = useDerivedValue(() =>
    Object.values(positions.value).sort(
      (pos1, pos2) => pos1.tempOrder - pos2.tempOrder,
    ),
  );

  useAnimatedReaction(
    () => isDragging.value,
    isDrag => {
      if (isDrag) {
        initialScrollY.value = scrollY.value;

        scrollSpeed.value = 0;
        startScrollY.value = 0;
      }
    },
  );

  const layout = React.useCallback(
    (height: number) => {
      runOnUI(() => {
        'worklet';
        positions.value = {
          ...positions.value,
          [id]: {...positions.value[id], height},
        };
      })();
    },
    [id, positions],
  );

  const draggingGesture = Gesture.Pan()
    .onTouchesDown(() => {
      isPressed.value = true;
    })
    .onStart(() => {
      gestureTranslateY.value = 0;
      isDragging.value = true;
    })
    .onUpdate(e => {
      if (!isPressed.value || !isDragging.value) {
        return;
      }

      if (e.absoluteY < 120) {
        cancelAnimation(startScrollY);
        scrollSpeed.value = interpolate(
          e.absoluteY,
          [60, 120],
          [100, 400],
          Extrapolate.CLAMP,
        );

        runOnJS(scroll)({
          scrollY: startScrollY,
          speed: scrollSpeed,
          value: -100,
        });
      } else if (e.absoluteY - windowHeight > -120) {
        cancelAnimation(startScrollY);

        scrollSpeed.value = interpolate(
          e.absoluteY - windowHeight,
          [-120, -60],
          [400, 100],
          Extrapolate.CLAMP,
        );

        runOnJS(scroll)({
          scrollY: startScrollY,
          speed: scrollSpeed,
          value: 100,
        });
      }

      gestureTranslateY.value = e.translationY;
    })
    .onEnd(() => {
      cancelAnimation(startScrollY);

      gestureTranslateY.value = withTiming(
        tempOffsetY.value - (scrollY.value - initialScrollY.value),
        {},
        isFinished => {
          if (isFinished) {
            isDragging.value = false;

            const ids = animatedSortedPositions.value.map(val => val.elementId);
            runOnJS(reorder)(ids);
          }
        },
      );
    })
    .onTouchesUp(() => {
      isPressed.value = false;
    });

  useAnimatedReaction(
    () => ({start: startScrollY.value, initial: initialScrollY.value}),
    ({start, initial}) => {
      if (isDragging.value) {
        scrollTo(scrollViewRef, 0, initial + start, false);
      }
    },
  );

  useAnimatedReaction(
    () => gestureTranslateY.value,
    translateX => {
      const currentPosition = positions.value[id];

      if (isDragging.value && currentPosition) {
        const sortedPositions = animatedSortedPositions.value;
        const currentPositionOffset = getOffsetForOrder(
          currentPosition.order,
          sortedPositions,
        );

        let offsetY = 0;
        for (const position of sortedPositions) {
          if (currentPosition.tempOrder < position.tempOrder) {
            if (
              translateX +
                currentPositionOffset +
                scrollY.value -
                initialScrollY.value >
              offsetY
            ) {
              swap(currentPosition.elementId, position.elementId, positions);
              break;
            }
          } else if (currentPosition.tempOrder > position.tempOrder) {
            if (
              translateX +
                currentPositionOffset +
                scrollY.value -
                initialScrollY.value <
              offsetY
            ) {
              swap(currentPosition.elementId, position.elementId, positions);
              break;
            }
          }

          offsetY += position.height;
        }
      }
    },
  );

  return {
    isDragging,
    isPressed,
    gestureTranslateY,
    initialScrollY,
    tempOffsetY,
    draggingGesture,
    layout,
    scrollY,
    lastOrder,
  };
};

function scroll({
  scrollY,
  speed,
  value,
}: {
  scrollY: Animated.SharedValue<number>;
  speed: Animated.SharedValue<number>;
  value: number;
}) {
  scrollY.value = withTiming(
    scrollY.value + value,
    {easing: Easing.linear, duration: speed.value},
    finished => {
      if (finished) {
        runOnJS(scroll)({scrollY, speed, value});
      }
    },
  );
}

function swap(
  currentId: string,
  withId: string,
  exercisesPositions: Animated.SharedValue<ExerciseValuesStore>,
) {
  'worklet';

  const currentPosition = exercisesPositions.value[currentId];
  const position = exercisesPositions.value[withId];

  if (!currentPosition || !position) {
    return;
  }

  const k = currentPosition.tempOrder > position.tempOrder ? 1 : -1;

  exercisesPositions.value = {
    ...exercisesPositions.value,
    [withId]: {
      ...position,
      tempOffsetY: position.tempOffsetY + k * (currentPosition.height || 0),
      tempOrder: currentPosition.tempOrder,
    },
    [currentId]: {
      ...currentPosition,
      tempOffsetY: currentPosition.tempOffsetY - k * (position.height || 0),
      tempOrder: position.tempOrder,
    },
  };
}

function getOffsetForOrder(order: number, positionsList: ExerciseValues[]) {
  'worklet';
  let offsetY = 0;
  for (let i = 0; i < positionsList.length; i++) {
    if (i === order) {
      return offsetY;
    }

    offsetY += positionsList[i].height || 0;
  }
  return 0;
}
