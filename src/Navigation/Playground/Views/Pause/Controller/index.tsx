import React from 'react';
import {usePlayground} from 'src/Navigation/Playground/Hooks';
import {usePlaygroundStore} from 'src/Navigation/Playground/Store';

export const usePauseController = () => {
  const {forceClose} = usePlayground();
  const {setIsPause, setPauseTime} = usePlaygroundStore();

  const handlePressFinish = React.useCallback(() => {
    forceClose();
  }, [forceClose]);

  const completePause = React.useCallback(
    (time: number) => {
      setIsPause(false);
      setPauseTime(currTime => currTime + time);
    },
    [setIsPause, setPauseTime],
  );

  return {handlePressFinish, completePause};
};
