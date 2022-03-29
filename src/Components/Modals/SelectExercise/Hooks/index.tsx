import React from 'react';
import {useSelectExerciseStore} from '../Store';

export const useSelectExerciseController = (id: string) => {
  const {setSearchValue} = useSelectExerciseStore(id);

  const reset = React.useCallback(() => {
    setSearchValue('');
  }, [setSearchValue]);

  return {handleChangeSearchValue: setSearchValue, reset};
};
