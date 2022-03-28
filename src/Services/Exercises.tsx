import {useFlow} from 'src/Hooks/Flow';
import {useExercisesRepository} from 'src/Repositories/Exercises';
import {useExercisesStore} from 'src/Store/Exercises';

export const useExercisesService = () => {
  const {getExercises: fetchGetExercises} = useExercisesRepository();
  const {setExercises} = useExercisesStore();

  const getExercises = useFlow(
    'exercisesService__downloadExercises',
    async () => {
      const {exercises} = await fetchGetExercises();
      setExercises(exercises);
    },
    [setExercises, fetchGetExercises],
  );

  return {getExercises};
};
