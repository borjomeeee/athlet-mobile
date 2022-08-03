import React from 'react';

import {useTrainingConstructorStore} from '../../../Store';
import {useTrainingConstructorChangesController} from '../../Changes';

export const useHeaderOptionsController = () => {
  const {switchToViewMode} = useTrainingConstructorStore();
  const {hasTrainingChanged, requestResetChanges} =
    useTrainingConstructorChangesController();

  const handlePressCancelEditingMode = React.useCallback(async () => {
    const isChanged = hasTrainingChanged();

    if (isChanged) {
      const isConfirmed = await requestResetChanges();

      if (isConfirmed) {
        switchToViewMode();
      }
    } else {
      switchToViewMode();
    }
  }, [hasTrainingChanged, requestResetChanges, switchToViewMode]);

  return {handlePressCancelEditingMode};
};
