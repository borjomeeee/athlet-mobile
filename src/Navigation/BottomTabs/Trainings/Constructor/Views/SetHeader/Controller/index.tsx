import React from 'react';
import {
  useTrainingConstructorSet,
  useTrainingConstructorStore,
  useTrainingConstructorStoreNew,
} from '../../../Store';

export const useSetHeaderController = (id: string) => {
  const {replaceSet} = useTrainingConstructorStoreNew();

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

export const useSetHeaderOptionsController = (id: string) => {
  const {swapWithNext, swapWithPrev} = useTrainingConstructorStoreNew();
  const {removeSet} = useTrainingConstructorStoreNew();

  const handlePressRemoveSet = React.useCallback(() => {
    removeSet(id);
  }, [id, removeSet]);

  const handlePressSwapWithPrevious = React.useCallback(() => {
    swapWithPrev(id);
  }, [swapWithPrev, id]);

  const handlePressSwapWithNext = React.useCallback(() => {
    swapWithNext(id);
  }, [swapWithNext, id]);

  return {
    handlePressRemoveSet,
    handlePressSwapWithNext,
    handlePressSwapWithPrevious,
  };
};
