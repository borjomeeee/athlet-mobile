import React from 'react';
import {runOnUI, useSharedValue} from 'react-native-reanimated';
import {AnimatedExercisesPositions} from '../Types';

export const useDraggableController = (
  exercisesPositions: AnimatedExercisesPositions,
) => {
  const wasMeasured = useSharedValue(false);

  const swap = React.useCallback(
    (currentId: string, withId: string) => {
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
    },
    [exercisesPositions],
  );

  const layout = React.useCallback(
    (id: string, height: number) => {
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
    [exercisesPositions, wasMeasured],
  );

  return {layout, swap};
};
