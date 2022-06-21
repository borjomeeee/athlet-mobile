import React from 'react';
import {atomFamily, useResetRecoilState, useSetRecoilState} from 'recoil';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';

const createKey = getKeyFabricForDomain('create exercise');
export const exerciseNameStoreFamily = atomFamily({
  key: createKey('exercise title'),
  default: '',
});

export const exerciseNameErrorStoreFamily = atomFamily({
  key: createKey('exercise name error'),
  default: undefined as string | undefined,
});

export const useCreateExerciseStore = (id: string) => {
  const _setExerciseName = useSetRecoilState(exerciseNameStoreFamily(id));
  const resetExerciseName = useResetRecoilState(exerciseNameStoreFamily(id));

  const setExerciseNameError = useSetRecoilState(
    exerciseNameErrorStoreFamily(id),
  );
  const resetExerciseNameError = useResetRecoilState(
    exerciseNameErrorStoreFamily(id),
  );

  const setExerciseName = React.useCallback(
    (name: string) => {
      _setExerciseName(name);
      resetExerciseNameError();
    },
    [_setExerciseName, resetExerciseNameError],
  );

  const reset = React.useCallback(() => {
    resetExerciseName();
    resetExerciseNameError();
  }, [resetExerciseName, resetExerciseNameError]);

  return {setExerciseName, setExerciseNameError, reset};
};
