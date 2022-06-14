import React from 'react';

import {
  useTrainingConstructorStore,
  useTrainingConstructorHistoryStore,
} from './Store';

export const useTrainingConstructorController = () => {
  const {
    resetAll,
    setInitialTraining,
    resetInitialTraining,

    switchToViewMode,
    setInitialTrainingId,
  } = useTrainingConstructorStore();
  const {reorder} = useTrainingConstructorHistoryStore();

  const initWithTrainingId = React.useCallback(
    (trainingId: string) => {
      setInitialTrainingId(trainingId);
      switchToViewMode();
    },
    [setInitialTrainingId, switchToViewMode],
  );

  return {
    setInitialTraining,
    resetInitialTraining,

    initWithTrainingId,

    reorder,
    reset: resetAll,
  };
};
