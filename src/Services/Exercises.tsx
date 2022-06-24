import React from 'react';
import {asyncCall} from 'src/Hooks/Flow';
import {useOfflineExercisesRepository} from 'src/Repositories/OfflineExercises';
import {useExercisesStore} from 'src/Store/Exercises';

export const useExercisesService = () => {
  const {
    addExercise: addStoreExercise,
    removeExercise: removeStoreExercise,
    setExercises,
  } = useExercisesStore();
  const {
    getExercises: offlineGetExercises,
    addExercise: offlineAddExercise,
    removeExercise: offlineRemoveExercise,
  } = useOfflineExercisesRepository();

  const addExercise = React.useCallback(
    (title: string) =>
      asyncCall(async () => {
        const exercise = await offlineAddExercise(title);
        addStoreExercise(exercise);
        return exercise;
      }),
    [offlineAddExercise, addStoreExercise],
  );

  const getExercises = React.useCallback(
    () =>
      asyncCall(async () => {
        const exercises = await offlineGetExercises();
        setExercises(exercises);
        return exercises;
      }),
    [offlineGetExercises, setExercises],
  );

  const removeExercise = React.useCallback(
    (id: string) => {
      return asyncCall(async () => {
        await offlineRemoveExercise(id);
        removeStoreExercise(id);
      });
    },
    [offlineRemoveExercise, removeStoreExercise],
  );

  return {addExercise, getExercises, removeExercise};
};
