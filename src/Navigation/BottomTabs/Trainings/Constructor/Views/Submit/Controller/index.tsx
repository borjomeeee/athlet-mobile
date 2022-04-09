import React from 'react';
import {useTrainingConstructorStore} from '../../../Store';

export const useSubmitController = () => {
  const {setScreenState} = useTrainingConstructorStore();

  const handlePressSubmit = React.useCallback(() => undefined, []);
  return {handlePressSubmit};
};
