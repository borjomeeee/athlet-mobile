import React from 'react';
import {useRecoilValue, useResetRecoilState, useSetRecoilState} from 'recoil';
import {TrainingUtils} from 'src/Store/ModelsUtils/Training';
import {
  actionHistoryAtom,
  screenStateAtom,
  screenTrainingTitleAtom,
  trainingIdAtom,
} from './Atoms';
import {constructorElementsSelector} from './Selectors';
import {SetWithId} from './Types';
import {findExercise} from './Utils';

export * from './Atoms';
export * from './Selectors';
export * from './History';

export const useTrainingConstructorStore = () => {
  const setTitle = useSetRecoilState(screenTrainingTitleAtom);
  const resetTitle = useResetRecoilState(screenTrainingTitleAtom);

  const setTrainingId = useSetRecoilState(trainingIdAtom);
  const setScreenState = useSetRecoilState(screenStateAtom);

  const resetTrainingId = useResetRecoilState(trainingIdAtom);
  const resetScreenState = useResetRecoilState(screenStateAtom);

  const resetHistory = useResetRecoilState(actionHistoryAtom);

  const setTitleHandler = React.useCallback(
    (text: string) => {
      setTitle(text.trim());
    },
    [setTitle],
  );

  return {
    setTitle: setTitleHandler,

    resetTitle,
    resetTrainingId,
    resetScreenState,
    resetHistory,

    setTrainingId,
    setScreenState,
  };
};

export const useTrainingConstructorExercise = (id: string) => {
  const elements = useRecoilValue(constructorElementsSelector);

  const exercise = React.useMemo(
    () => findExercise(elements, id),
    [elements, id],
  );

  return {exercise};
};

export const useTrainingConstructorSet = (id: string) => {
  const elements = useRecoilValue(constructorElementsSelector);

  const set = React.useMemo(
    () =>
      elements.find(el => TrainingUtils.isSet(el) && el.elementId === id) as
        | SetWithId
        | undefined,
    [elements, id],
  );

  return {set};
};
