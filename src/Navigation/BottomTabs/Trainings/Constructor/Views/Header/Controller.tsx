import React from 'react';
import {useTrainingConstructorStore} from '../../Store';

export const useHeaderController = () => {
  const {setTitle} = useTrainingConstructorStore();

  const handleChangeTitle = React.useCallback(
    (newTitle: string) => {
      setTitle(newTitle);
    },
    [setTitle],
  );

  return {handleChangeTitle};
};
