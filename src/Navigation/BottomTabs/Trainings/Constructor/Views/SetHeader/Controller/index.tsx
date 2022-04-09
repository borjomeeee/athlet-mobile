import React from 'react';
import {useTrainingConstructorStore} from '../../../Store';

export const useSetHeaderController = (id: string) => {
  const {changeSetTitle, processSetTitle} = useTrainingConstructorStore();

  const handleChangeSetTitle = React.useCallback(
    (title: string) => {
      changeSetTitle(id, title);
    },
    [changeSetTitle, id],
  );

  const handleBlurSetTitle = React.useCallback(() => {
    processSetTitle(id);
  }, [processSetTitle, id]);

  return {handleChangeSetTitle, handleBlurSetTitle};
};

export const useSetHeaderOptionsController = (id: string) => {
  const {removeElement, swapElementWithNext, swapElementWithPrevious} =
    useTrainingConstructorStore();

  const handlePressRemoveSet = React.useCallback(() => {
    removeElement(id);
  }, [id, removeElement]);

  const handlePressSwapWithPrevious = React.useCallback(() => {
    swapElementWithPrevious(id);
  }, [swapElementWithPrevious, id]);

  const handlePressSwapWithNext = React.useCallback(() => {
    swapElementWithNext(id);
  }, [swapElementWithNext, id]);

  return {
    handlePressRemoveSet,
    handlePressSwapWithNext,
    handlePressSwapWithPrevious,
  };
};
