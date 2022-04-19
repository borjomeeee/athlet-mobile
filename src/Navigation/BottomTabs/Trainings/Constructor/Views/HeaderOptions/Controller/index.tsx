import React from 'react';
import {useTrainingConstructorChangesController} from '../../../Hooks';
import {useTrainingConstructorStore} from '../../../Store';

export const useHeaderOptionsController = () => {
  const {swithToViewMode} = useTrainingConstructorStore();
  const {hasTrainingChanged, requestResetChanges} =
    useTrainingConstructorChangesController();

  const handlePressCancelEditingMode = React.useCallback(async () => {
    const isChanged = hasTrainingChanged();

    if (isChanged) {
      const isConfirmed = await requestResetChanges();

      if (isConfirmed) {
        swithToViewMode();
      }
    } else {
      swithToViewMode();
    }
  }, [hasTrainingChanged, requestResetChanges, swithToViewMode]);

  return {handlePressCancelEditingMode};
};

export const useHeaderOptionsOverlayController = () => {
  const {switchToEditMode} = useTrainingConstructorStore();

  const handlePressGoToEditMode = React.useCallback(() => {
    switchToEditMode();
  }, [switchToEditMode]);

  return {handlePressGoToEditMode};
};
