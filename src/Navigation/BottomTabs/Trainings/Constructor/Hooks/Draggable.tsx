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

export const useDraggablePosition = (
  id: string,
  exercisesPositions: AnimatedExercisesPositions,
) => {
  const offsetY = useDerivedValue(
    () => exercisesPositions.value[id]?.tempOffsetY || 0,
  );

  return {offsetY};
};

export const useDraggableController = (
  id: string,
  exercisesPositions: AnimatedExercisesPositions,
  scrollViewRef: React.RefObject<Animated.ScrollView>,
  scrollY: Animated.SharedValue<number>,
) => {
  const {replaceExercises} = useTrainingConstructorController();
  const {offsetY} = useDraggablePosition(id, exercisesPositions);

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

  React.useEffect(() => {
    wasMeasured.value = false;
  }, [id, wasMeasured]);

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
            runOnJS(replaceExercises)(exercisesPositions.value);
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
    offsetY,
    draggingGesture,
    layout,
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
  exercisesPositions: AnimatedExercisesPositions,
) {
  'worklet';

  const currentPosition = exercisesPositions.value[currentId];
  const position = exercisesPositions.value[withId];

  if (!currentPosition || !position) {
    return;
  }

  const k = currentPosition.order > position.order ? 1 : -1;

  exercisesPositions.value = {
    ...exercisesPositions.value,
    [withId]: {
      ...position,
      tempOffsetY: position.tempOffsetY + k * (currentPosition.height || 0),
      order: currentPosition.order,
    },
    [currentId]: {
      ...currentPosition,
      tempOffsetY: currentPosition.tempOffsetY - k * (position.height || 0),
      order: position.order,
    },
  };
}
