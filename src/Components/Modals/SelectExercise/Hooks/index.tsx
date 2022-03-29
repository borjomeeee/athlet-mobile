import {useSelectExerciseStore} from '../Store';

export const useSelectExerciseController = (id: string) => {
  const {setSearchValue} = useSelectExerciseStore(id);
  return {handleChangeSearchValue: setSearchValue};
};
