import {useRecoilCallback, useRecoilValue} from 'recoil';
import {Training} from 'src/Store/Models/Training';
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
  const switchToViewMode = useRecoilCallback(
    ({get, set, reset}) =>
      () => {
        set(screenStateAtom, ScreenState.VIEWING);

        const initialTraining = get(initialTrainingAtom);
        if (initialTraining) {
          set(screenTrainingTitleAtom, initialTraining.title);
        } else {
          reset(screenTrainingTitleAtom);
        }

        reset(actionHistoryAtom);
      },
    [],
  );

  const switchToEditMode = useRecoilCallback(
    ({set}) =>
      () => {
        set(screenStateAtom, ScreenState.EDITING);
      },
    [],
  );

  const resetAll = useRecoilCallback(
    ({reset}) =>
      () => {
        reset(initialTrainingIdAtom);
        reset(initialTrainingAtom);
        reset(screenStateAtom);
        reset(screenTrainingTitleAtom);
        reset(actionHistoryAtom);
      },
    [],
  );

  const setTitleHandler = useRecoilCallback(
    ({set}) =>
      (text: string) => {
        set(screenTrainingTitleAtom, text.trimLeft());
      },
    [],
  );

  const setInitialTrainingHandler = useRecoilCallback(
    ({set}) =>
      (training: Training) => {
        set(initialTrainingAtom, training);
        set(screenTrainingTitleAtom, training.title);
      },
    [],
  );

  return {
    setInitialTraining: setInitialTrainingHandler,

    setTitle: setTitleHandler,
    resetAll,

    switchToViewMode,
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
