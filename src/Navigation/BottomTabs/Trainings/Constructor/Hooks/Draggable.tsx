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
import {AnimatedExercisesPositions} from '../Types';
import {useWindowDimensions} from 'react-native';

export const useDraggableController = (
  id: string,
  exercisesPositions: AnimatedExercisesPositions,
  scrollViewRef: React.RefObject<Animated.ScrollView>,
  scrollY: Animated.SharedValue<number>,
) => {
  const {replaceExercises} = useTrainingConstructorController();

  const {height: windowHeight} = useWindowDimensions();
  const wasMeasured = useSharedValue(false);

  const isPressed = useSharedValue(false);
  const isDragging = useSharedValue(false);

  const gestureTranslateY = useSharedValue(0);
  const gestureAbsoluteY = useSharedValue(200);

  const scrollSpeed = useSharedValue(0);

  const initialScrollY = useSharedValue(0);
  const startScrollY = useSharedValue(0);

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

  const changed = useDerivedValue(
    () => !!exercisesPositions.value[id]?.changed,
  );
  const offsetY = useDerivedValue(
    () => exercisesPositions.value[id]?.tempOffsetY || 0,
  );

  // TODO: measure when componen height changed
  const layout = React.useCallback(
    (height: number) => {
      runOnUI(() => {
        'worklet';
        if (wasMeasured.value) {
          return;
        }

        wasMeasured.value = true;
        exercisesPositions.value = {
          ...exercisesPositions.value,
          [id]: {...exercisesPositions.value[id], height},
        };
      })();
    },
    [id, exercisesPositions, wasMeasured],
  );

  useAnimatedReaction(
    () => {
      if (!isDragging.value) {
        return id;
      }

      const currentPosition = exercisesPositions.value[id];
      if (!currentPosition) {
        return id;
      }

      for (const key in exercisesPositions.value) {
        const position = exercisesPositions.value[key];
        if (!position) {
          continue;
        }

        if (currentPosition.order > position.order) {
          if (
            currentPosition.offsetY +
              gestureTranslateY.value +
              scrollY.value -
              initialScrollY.value <
            position.offsetY + position.tempOffsetY
          ) {
            return position.id;
          }
        } else if (currentPosition.order < position.order) {
          if (
            currentPosition.offsetY +
              gestureTranslateY.value +
              scrollY.value -
              initialScrollY.value >
            position.offsetY + position.tempOffsetY
          ) {
            return position.id;
          }
        }
      }

      return id;
    },
    newId => {
      if (newId === id) {
        return;
      }

      swap(id, newId, exercisesPositions);
    },
  );

  const draggingGesture = Gesture.Pan()
    .onTouchesDown(() => {
      isPressed.value = true;
    })
    .onStart(() => {
      gestureTranslateY.value = 0;
      gestureAbsoluteY.value = 200;

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

        runOnJS(scrollToDown)(startScrollY, scrollSpeed, -100);
      } else if (e.absoluteY - windowHeight > -120) {
        cancelAnimation(startScrollY);

        scrollSpeed.value = interpolate(
          e.absoluteY - windowHeight,
          [-120, -60],
          [400, 100],
          Extrapolate.CLAMP,
        );

        runOnJS(scrollToDown)(startScrollY, scrollSpeed, 100);
      }

      gestureAbsoluteY.value = e.absoluteY;
      gestureTranslateY.value = e.translationY;
    })
    .onEnd(() => {
      cancelAnimation(startScrollY);

      gestureTranslateY.value = withTiming(
        offsetY.value - (scrollY.value - initialScrollY.value),
        {},
        isFinished => {
          if (isFinished) {
            isDragging.value = false;

            const orderedPositionsIds = Object.values(exercisesPositions.value)
              .sort((pos1, pos2) => pos1.order - pos2.order)
              .map(pos => pos.id);

            runOnJS(replaceExercises)(orderedPositionsIds);
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
      scrollTo(scrollViewRef, 0, initial + start, false);
    },
  );

  return {
    isDragging,
    isPressed,
    gestureTranslateY,
    initialScrollY,
    changed,
    offsetY,
    draggingGesture,
    layout,
  };
};

function scrollToDown(
  scrollY: Animated.SharedValue<number>,
  speed: Animated.SharedValue<number>,
  value: number,
) {
  scrollY.value = withTiming(
    scrollY.value + value,
    {easing: Easing.linear, duration: speed.value},
    finished => {
      if (finished) {
        runOnJS(scrollToDown)(scrollY, speed, value);
      }
    },
  );
}

function swap(
  currentId: string,
  withId: string,
  exercisesPositions: AnimatedExercisesPositions,
) {
  'worklet';

  const currentPosition = exercisesPositions.value[currentId];
  const position = exercisesPositions.value[withId];

  if (!currentPosition || !position) {
    return;
  }

  const diff =
    currentPosition.offsetY +
    currentPosition.tempOffsetY -
    (position.offsetY + position.tempOffsetY);

  exercisesPositions.value = {
    ...exercisesPositions.value,
    [withId]: {
      ...position,
      tempOffsetY: position.tempOffsetY + diff,
      order: currentPosition.order,
      changed: true,
    },
    [currentId]: {
      ...currentPosition,
      tempOffsetY: currentPosition.tempOffsetY - diff,
      order: position.order,
      changed: true,
    },
  };
}
