import React from 'react';
import {useTrainingConstructorChangesController} from '../../../Hooks';
import {useTrainingConstructorStore} from '../../../Store';
import {ScreenState} from '../../../Store/Types';

export const useHeaderOptionsController = () => {
  const {setScreenState} = useTrainingConstructorStore();
  const {requestResetChanges} = useTrainingConstructorChangesController();

  const handlePressCancelEditingMode = React.useCallback(async () => {
    const isConfirmed = await requestResetChanges();

    if (isConfirmed) {
      setScreenState(ScreenState.VIEWING);
    }
  }, [setScreenState, requestResetChanges]);

  return {handlePressCancelEditingMode};
};

export const useHeaderOptionsOverlayController = () => {
  const {setScreenState} = useTrainingConstructorStore();

  const handlePressGoToEditMode = React.useCallback(() => {
    setScreenState(ScreenState.EDITING);
  }, [setScreenState]);

  return {handlePressGoToEditMode};
};
