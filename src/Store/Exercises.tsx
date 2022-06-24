import React from 'react';
import {atom, selector, useSetRecoilState} from 'recoil';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';
import {Exercise} from './Models/Training';

const createKey = getKeyFabricForDomain('exercises');
interface ExercisesStore {
  [key: string]: Exercise;
}
export const exercisesStore = atom<ExercisesStore>({
  key: createKey('self'),
  default: {},
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

  const addExercise = React.useCallback(
    (exercise: Exercise) => {
      _setExercises(currExercises => ({
        ...currExercises,
        [exercise.id]: exercise,
      }));
    },
    [_setExercises],
  );

  const removeExercise = React.useCallback(
    (id: string) => {
      _setExercises(currExercises => {
        const newExercises = {...currExercises};
        delete newExercises[id];

        return newExercises;
      });
    },
    [_setExercises],
  );

  return {addExercise, setExercises, removeExercise};
};
