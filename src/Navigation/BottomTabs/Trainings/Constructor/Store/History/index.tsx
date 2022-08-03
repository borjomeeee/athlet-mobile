import React from 'react';

import {useSetRecoilState} from 'recoil';
import {SetUtils} from 'src/Store/ModelsUtils/Set';
import {Id} from 'src/Utils/Id';
import {actionHistoryAtom} from '../Atoms';
import {
  ExerciseWithId,
  HistoryAction,
  HistoryActionType,
  SetExerciseWithId,
  SetWithId,
} from '../Types';

export const useTrainingConstructorHistory = () => {
  const setActionHistory = useSetRecoilState(actionHistoryAtom);

  const addToHistory = React.useCallback(
    <T extends HistoryActionType>(action: HistoryAction<T>) => {
      setActionHistory(history => [...history, action]);
    },
    [setActionHistory],
  );

  const addExercise = React.useCallback(
    (exercise: Omit<ExerciseWithId, 'elementId'>) => {
      addToHistory({
        type: HistoryActionType.ADD_EXERCISE,
        payload: {
          exercise: {
            ...exercise,
            elementId: Id.generate(),
          } as ExerciseWithId,
        },
      });
    },
    [addToHistory],
  );

  const addExerciseToSet = React.useCallback(
    (setId: string, exercise: Omit<ExerciseWithId, 'elementId'>) => {
      addToHistory({
        type: HistoryActionType.ADD_EXERCISE_TO_SET,
        payload: {
          setId,
          exercise: {
            ...exercise,
            elementId: Id.generate(),
            setId,
          } as SetExerciseWithId,
        },
      });
    },
    [addToHistory],
  );

  const removeExercise = React.useCallback(
    (id: string) => {
      addToHistory({type: HistoryActionType.REMOVE_EXERCISE, payload: {id}});
    },
    [addToHistory],
  );

  const addSet = React.useCallback(() => {
    addToHistory({
      type: HistoryActionType.ADD_SET,
      payload: {
        set: {
          ...SetUtils.generateElement(),
          elementId: Id.generate(),
        } as SetWithId,
      },
    });
  }, [addToHistory]);

  const removeSet = React.useCallback(
    (id: string) => {
      addToHistory({type: HistoryActionType.REMOVE_SET, payload: {id}});
    },
    [addToHistory],
  );

  const replaceExercise = React.useCallback(
    (id: string, exercise: Omit<ExerciseWithId, 'elementId'>) => {
      addToHistory({
        type: HistoryActionType.REPLACE_EXERCISE,
        payload: {id, exercise: {...exercise, elementId: id} as ExerciseWithId},
      });
    },
    [addToHistory],
  );

  const replaceSet = React.useCallback(
    (id: string, set: SetWithId) => {
      addToHistory({
        type: HistoryActionType.REPLACE_SET,
        payload: {id, set},
      });
    },
    [addToHistory],
  );

  const reorder = React.useCallback(
    (ids: string[]) => {
      addToHistory({type: HistoryActionType.REORDER, payload: {ids}});
    },
    [addToHistory],
  );

  const swapWithPrev = React.useCallback(
    (id: string) => {
      addToHistory({type: HistoryActionType.SWAP_WITH_PREV, payload: {id}});
    },
    [addToHistory],
  );

  const swapWithNext = React.useCallback(
    (id: string) => {
      addToHistory({type: HistoryActionType.SWAP_WITH_NEXT, payload: {id}});
    },
    [addToHistory],
  );

  return {
    addExercise,
    addExerciseToSet,
    removeExercise,
    addSet,
    removeSet,
    replaceExercise,
    replaceSet,
    swapWithPrev,
    swapWithNext,
    reorder,
  };
};
