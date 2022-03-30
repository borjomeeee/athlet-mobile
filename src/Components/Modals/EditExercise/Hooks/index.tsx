import {useEditExerciseStore} from '../Store';

export const useEditExerciseController = (id: string) => {
  const {setCompletionType} = useEditExerciseStore(id);
  return {changeCompletionType: setCompletionType};
};
