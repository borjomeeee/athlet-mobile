import React from 'react';
import {usePlayground} from 'src/Navigation/Playground/Hooks';
import {usePlaygroundStore} from 'src/Navigation/Playground/Store';

export const useActionsController = () => {
  const {forceClose, goNext} = usePlayground();
  const {setIsPause} = usePlaygroundStore();

  const handlePressPause = React.useCallback(() => {
    setIsPause(true);
  }, [setIsPause]);

  const handlePressFinish = React.useCallback(() => {
    forceClose();
  }, [forceClose]);

  const handlePressSkip = React.useCallback(() => {
    goNext();
  }, [goNext]);

  return {handlePressFinish, handlePressPause, handlePressSkip};
};
