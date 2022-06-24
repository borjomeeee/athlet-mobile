import React from 'react';
import {Exercise} from 'src/Store/Models/Training';
import {Id} from 'src/Utils/Id';
import {getAsJsonFromLocal, setJsonToLocal} from 'src/Utils/MMKV';
import {IExercisesRepository} from './Interfaces/Exercises';

const MY_EXERCISES_KEY = '@@my-exercises';
export const useOfflineExercisesRepository = (): IExercisesRepository => {
  const getExercises = React.useCallback(async () => {
    try {
      return await getAsJsonFromLocal<Exercise[]>(MY_EXERCISES_KEY);
    } catch (e) {
      return [];
    }
  }, []);

  const addExercise = React.useCallback(
    async (name: string) => {
      const exercise: Exercise = {id: Id.generate(), title: name};
      const exercises = await getExercises();

      await setJsonToLocal(MY_EXERCISES_KEY, [...exercises, exercise]);
      return exercise;
    },
    [getExercises],
  );

  const removeExercise = React.useCallback(
    async (id: string) => {
      const exercises = await getExercises();
      await setJsonToLocal(
        MY_EXERCISES_KEY,
        exercises.filter(exercise => exercise.id !== id),
      );
    },
    [getExercises],
  );

  return {getExercises, addExercise, removeExercise};
};
