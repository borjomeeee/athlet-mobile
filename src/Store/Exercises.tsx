import React from 'react';
import {atom, selector, useSetRecoilState} from 'recoil';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';
import {Exercise} from './Models/Training';
import exercises from 'src/Lib/LocalData/exercises.json';

const createKey = getKeyFabricForDomain('exercises');
interface ExercisesStore {
  [key: string]: Exercise;
}
export const exercisesStore = atom<ExercisesStore>({
  key: createKey('self'),
  default: exercises as any,
});

export const exercisesIdsStore = selector({
  key: createKey('ids'),
  get: ({get}) => Object.keys(get(exercisesStore)),
});

export const exercisesListStore = selector({
  key: createKey('list'),
  get: ({get}) => Object.values(get(exercisesStore)),
});

export const useExercisesStore = () => {
  const _setExercises = useSetRecoilState(exercisesStore);

  const setExercises = React.useCallback(
    (newExercises: Exercise[]) => {
      const dict: ExercisesStore = {};
      newExercises.forEach(exercise => (dict[exercise.id] = exercise));
      _setExercises(dict);
    },
    [_setExercises],
  );

  return {setExercises};
};
