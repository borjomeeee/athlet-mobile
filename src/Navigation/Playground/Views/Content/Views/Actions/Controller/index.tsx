import React from 'react';
import {usePlayground} from 'src/Navigation/Playground/Hooks';
import {
  currentIndexStore,
  usePlaygroundStore,
} from 'src/Navigation/Playground/Store';
import {useGetRecoilState} from 'src/Utils/Recoil';

export const useActionsController = () => {
  const {forceClose, goNext} = usePlayground();
  const {setIsPause} = usePlaygroundStore();

  const getCurrentIndex = useGetRecoilState(currentIndexStore);

  const handlePressPause = React.useCallback(() => {
    setIsPause(true);
  }, [setIsPause]);

  const handlePressFinish = React.useCallback(() => {
    forceClose();
  }, [forceClose]);

  const handlePressSkip = React.useCallback(() => {
    goNext(getCurrentIndex());
  }, [goNext, getCurrentIndex]);

  return {handlePressFinish, handlePressPause, handlePressSkip};
};
