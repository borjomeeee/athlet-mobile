import React from 'react';
import {useTrainingConstructorChangesController} from '../../../Hooks';
import {useTrainingConstructorStore} from '../../../Store';

export const useHeaderOptionsController = () => {
  const {swithToViewMode} = useTrainingConstructorStore();
  const {requestResetChanges} = useTrainingConstructorChangesController();

  const handlePressCancelEditingMode = React.useCallback(async () => {
    const isConfirmed = await requestResetChanges();

    if (isConfirmed) {
      swithToViewMode();
    }
  }, [requestResetChanges, swithToViewMode]);

  return {handlePressCancelEditingMode};
};

export const useHeaderOptionsOverlayController = () => {
  const {switchToEditMode} = useTrainingConstructorStore();

  const handlePressGoToEditMode = React.useCallback(() => {
    switchToEditMode();
  }, [switchToEditMode]);

  return {handlePressGoToEditMode};
};
