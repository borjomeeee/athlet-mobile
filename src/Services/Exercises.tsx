import {useFlow} from 'src/Hooks/Flow';
import {useExercisesRepository} from 'src/Repositories/Exercises';
import {useExercisesStore} from 'src/Store/Exercises';
import {Exercise} from 'src/Store/Models/Training';

export const useExercisesService = () => {
  const {getExercises: fetchGetExercises} = useExercisesRepository();
  const {setExercises} = useExercisesStore();

  const getExercises = useFlow(
    async () => {
      // const {exercises} = await fetchGetExercises();
      // setExercises(exercises);
    },
    [],
    'exercisesService__downloadExercises',
  );

  return {getExercises};
};
