import React from 'react';
import {
  useTrainingConstructorSet,
  useTrainingConstructorHistory,
} from '../../Store';

export const useSetHeaderController = (id: string) => {
  const {replaceSet} = useTrainingConstructorHistory();

  const {set} = useTrainingConstructorSet(id);
  const handleChangeSetTitle = React.useCallback((title: string) => {
    // TODO: hmmm
    return;
  }, []);

  const handleBlurSetTitle = React.useCallback(() => {
    // TODO: remove
  }, []);

  return {handleChangeSetTitle, handleBlurSetTitle};
};
