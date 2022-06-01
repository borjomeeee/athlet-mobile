import React from 'react';
import {usePlayground} from 'src/Navigation/Playground/Hooks';
import {
  currentIndexStore,
  trainingElementsStore,
  usePlaygroundStore,
} from 'src/Navigation/Playground/Store';
import {useGetRecoilState} from 'src/Utils/Recoil';

export const usePlaygroundActionsController = () => {
  const {exit} = usePlayground();

  const getTrainingElements = useGetRecoilState(trainingElementsStore);
  const getCurrentIndex = useGetRecoilState(currentIndexStore);

  const {setCurrentIndex} = usePlaygroundStore();

  const goNext = React.useCallback(() => {
    const currentIndex = getCurrentIndex();
    const elements = getTrainingElements();

    if (currentIndex === elements.length - 1) {
      exit();
    } else {
      setCurrentIndex(i => ++i);
    }
  }, [getCurrentIndex, getTrainingElements, setCurrentIndex, exit]);

  return {goNext, forceFinish: exit};
};
