import React from 'react';
import {useTrainingConstructorHistoryStore} from '../../../../Store';

export const useSetHeaderOverlayController = (id: string) => {
  const {swapWithNext, swapWithPrev, removeSet} =
    useTrainingConstructorHistoryStore();

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
