import React from 'react';
import {useRecoilValue, useResetRecoilState, useSetRecoilState} from 'recoil';
import {Training} from 'src/Store/Models/Training';
import {useGetRecoilState} from 'src/Utils/Recoil';
import {
  actionHistoryAtom,
  initialTrainingAtom,
  initialTrainingIdAtom,
  screenStateAtom,
  screenTrainingTitleAtom,
} from './Atoms';
import {constructorElementsByIdSelector} from './Selectors';
import {ExerciseWithId, ScreenState, SetWithId} from './Types';

export * from './Atoms';
export * from './Selectors';
export * from './History';

export const useTrainingConstructorStore = () => {
  const setTitle = useSetRecoilState(screenTrainingTitleAtom);
  const resetTitle = useResetRecoilState(screenTrainingTitleAtom);

  const setScreenState = useSetRecoilState(screenStateAtom);
  const resetScreenState = useResetRecoilState(screenStateAtom);

  const resetHistory = useResetRecoilState(actionHistoryAtom);

  const setInitialTrainingId = useSetRecoilState(initialTrainingIdAtom);
  const resetInitialTrainingId = useResetRecoilState(initialTrainingIdAtom);

  const setInitialTraining = useSetRecoilState(initialTrainingAtom);
  const resetInitialTraining = useResetRecoilState(initialTrainingAtom);

  const getInitialTraining = useGetRecoilState(initialTrainingAtom);

  const swithToViewMode = React.useCallback(() => {
    setScreenState(ScreenState.VIEWING);

    const initialTraining = getInitialTraining();
    if (initialTraining) {
      setTitle(initialTraining.title);
    } else {
      resetTitle();
    }

    resetHistory();
  }, [setScreenState, resetTitle, resetHistory, getInitialTraining, setTitle]);

  const switchToEditMode = React.useCallback(() => {
    setScreenState(ScreenState.EDITING);
  }, [setScreenState]);

  const resetAll = React.useCallback(() => {
    resetTitle();
    resetScreenState();
    resetHistory();
    resetInitialTraining();
    resetInitialTrainingId();
  }, [
    resetTitle,
    resetInitialTraining,
    resetScreenState,
    resetHistory,
    resetInitialTrainingId,
  ]);

  const setTitleHandler = React.useCallback(
    (text: string) => {
      setTitle(text.trim());
    },
    [setTitle],
  );

  const setInitialTrainingHandler = React.useCallback(
    (training: Training) => {
      setInitialTraining(training);
      setTitle(training.title);
    },
    [setInitialTraining, setTitle],
  );

  return {
    setInitialTraining: setInitialTrainingHandler,
    resetInitialTraining,

    setInitialTrainingId,
    resetInitialTrainingId,

    setTitle: setTitleHandler,
    resetAll,

    swithToViewMode,
    switchToEditMode,
  };
};

export const useTrainingConstructorExercise = (id: string) => {
  const elements = useRecoilValue(constructorElementsByIdSelector);
  return {exercise: elements[id] as ExerciseWithId};
};

export const useTrainingConstructorSet = (id: string) => {
  const elements = useRecoilValue(constructorElementsByIdSelector);
  return {set: elements[id] as SetWithId};
};
