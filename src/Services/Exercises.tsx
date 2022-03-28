import {useExercisesStore} from 'src/Store/Exercises';

export const useExercisesService = () => {
  const {setExercises} = useExercisesStore();
};
