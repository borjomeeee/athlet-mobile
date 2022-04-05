import React from 'react';
import {Gesture} from 'react-native-gesture-handler';
import {
  runOnJS,
  runOnUI,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useTrainingConstructorController} from './index';
import {AnimatedExercisesPositions} from '../Types';

export const useDraggableController = (
  id: string,
  exercisesPositions: AnimatedExercisesPositions,
) => {
  const {replaceExercises} = useTrainingConstructorController();

  const wasMeasured = useSharedValue(false);

  const isPressed = useSharedValue(false);
  const isDragging = useSharedValue(false);

  const gestureTranslateY = useSharedValue(0);

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
            currentPosition.offsetY + gestureTranslateY.value <
            position.offsetY + position.tempOffsetY
          ) {
            return position.id;
          }
        } else if (currentPosition.order < position.order) {
          if (
            currentPosition.offsetY + gestureTranslateY.value >
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
      isDragging.value = true;
    })
    .onUpdate(e => {
      gestureTranslateY.value = e.translationY;
    })
    .onEnd(() => {
      gestureTranslateY.value = withTiming(offsetY.value, {}, isFinished => {
        if (isFinished) {
          isDragging.value = false;

          const orderedPositionsIds = Object.values(exercisesPositions.value)
            .sort((pos1, pos2) => pos1.order - pos2.order)
            .map(pos => pos.id);

          runOnJS(replaceExercises)(orderedPositionsIds);
        }
      });
    })
    .onTouchesUp(() => {
      isPressed.value = false;
    });

  return {
    isDragging,
    isPressed,
    gestureTranslateY,
    changed,
    offsetY,
    draggingGesture,
    layout,
  };
};

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
