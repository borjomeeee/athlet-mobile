import React from 'react';
import {atomFamily, useResetRecoilState, useSetRecoilState} from 'recoil';
import {Exercise, ExerciseCompletionType} from 'src/Store/Models/Training';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';

const createKey = getKeyFabricForDomain('editExercise');

export const currentExerciseStoreFamily = atomFamily({
  key: createKey('exerciseBase'),
  default: undefined as Exercise | undefined,
});

export const completionTypeStoreFamily = atomFamily({
  key: createKey('completionType'),
  default: ExerciseCompletionType.REPS,
});

export const repsStoreFamily = atomFamily({
  key: createKey('reps'),
  default: 20,
});

export const timeStoreFamily = atomFamily({
  key: createKey('time'),
  default: 15,
});

export const gymRepsStoreFamily = atomFamily({
  key: createKey('gym reps'),
  default: 10,
});

export const gymWeightStoreFamily = atomFamily({
  key: createKey('gym weight'),
  default: 40,
});

export const useEditExerciseStore = (id: string) => {
  const resetCurrentExercise = useResetRecoilState(
    currentExerciseStoreFamily(id),
  );
  const setCurrentExercise = useSetRecoilState(currentExerciseStoreFamily(id));

  const resetReps = useResetRecoilState(repsStoreFamily(id));
  const resetTime = useResetRecoilState(timeStoreFamily(id));

  const resetGymReps = useResetRecoilState(gymRepsStoreFamily(id));
  const resetGymWeight = useResetRecoilState(gymWeightStoreFamily(id));

  const resetGym = React.useCallback(() => {
    resetGymReps();
    resetGymWeight();
  }, [resetGymReps, resetGymWeight]);

  const setReps = useSetRecoilState(repsStoreFamily(id));
  const setTime = useSetRecoilState(timeStoreFamily(id));
  const setGymReps = useSetRecoilState(gymRepsStoreFamily(id));
  const setGymWeight = useSetRecoilState(gymWeightStoreFamily(id));

  const resetCompletionType = useResetRecoilState(
    completionTypeStoreFamily(id),
  );
  const setCompletionType = useSetRecoilState(completionTypeStoreFamily(id));

  return {
    resetCurrentExercise,
    setCurrentExercise,
    resetCompletionType,
    setCompletionType,
    setReps,
    setTime,
    setGymReps,
    setGymWeight,
    resetReps,
    resetTime,
    resetGym,
  };
};
