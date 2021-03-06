import React from 'react';
import {
  atom,
  selector,
  useRecoilTransaction_UNSTABLE,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {Training} from 'src/Store/Models/Training';
import {
  IterableTrainingElement,
  TrainingUtils,
} from 'src/Store/ModelsUtils/Training';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';

const createKey = getKeyFabricForDomain('playground');

export const isStartedStore = atom({
  key: createKey('isStarted'),
  default: false,
});

export const isFinishedStore = atom({
  key: createKey('isFinished'),
  default: false,
});

export const startTimeStore = atom({
  key: createKey('startTime'),
  default: undefined as number | undefined,
});

export const trainingIdStore = atom({
  key: createKey('trainingId'),
  default: undefined as string | undefined,
});

export const trainingStore = atom({
  key: createKey('training'),
  default: undefined as Training | undefined,
});

export const trainingElementsStore = selector({
  key: createKey('trainingElements'),
  get: ({get}) => {
    const training = get(trainingStore);
    if (training) {
      return TrainingUtils.iterable(training?.elements);
    }
    return [];
  },
});

export const currentIndexStore = atom({
  key: createKey('completeIndex'),
  default: 0,
});

export const currentElementStore = selector({
  key: createKey('currentElement'),
  get: ({get}) => {
    const elements = get(trainingElementsStore);
    const currentIndex = get(currentIndexStore);

    if (elements.length > currentIndex) {
      return elements[currentIndex];
    }
  },
});

export const nextElementStore = selector({
  key: createKey('nextElement'),
  get: ({get}) => {
    const elements = get(trainingElementsStore);
    const nextIndex = get(currentIndexStore) + 1;

    if (elements.length > nextIndex) {
      return elements[nextIndex];
    }
  },
});

export const completingElementStore = atom({
  key: createKey('completingElement'),
  default: undefined as IterableTrainingElement | undefined,
});

export const completedElementsStore = atom({
  key: createKey('completedElements'),
  default: [] as IterableTrainingElement[],
});

export const isPauseStore = atom({
  key: createKey('isPause'),
  default: false,
});

export const pauseTimeStore = atom({
  key: createKey('pauseTime'),
  default: 0,
});

export const usePlaygroundStore = () => {
  const setIsStarted = useSetRecoilState(isStartedStore);
  const resetIsStarted = useResetRecoilState(isStartedStore);

  const setIsFinished = useSetRecoilState(isFinishedStore);
  const resetIsFinished = useResetRecoilState(isFinishedStore);

  const setStartTime = useSetRecoilState(startTimeStore);
  const resetStartTime = useResetRecoilState(startTimeStore);

  const setTrainingId = useSetRecoilState(trainingIdStore);
  const resetTrainingId = useResetRecoilState(trainingIdStore);

  const setCurrentIndex = useSetRecoilState(currentIndexStore);
  const resetCurrentIndex = useResetRecoilState(currentIndexStore);

  const setTraining = useSetRecoilState(trainingStore);
  const resetTraining = useResetRecoilState(trainingStore);

  const setCompletingElement = useSetRecoilState(completingElementStore);
  const resetCompletingElement = useResetRecoilState(completingElementStore);

  const setCompletedElements = useSetRecoilState(completedElementsStore);
  const resetCompletedElements = useResetRecoilState(completedElementsStore);

  const setIsPause = useSetRecoilState(isPauseStore);
  const resetIsPause = useResetRecoilState(isPauseStore);

  const setPauseTime = useSetRecoilState(pauseTimeStore);
  const resetPauseTime = useResetRecoilState(pauseTimeStore);

  const reset = React.useCallback(() => {
    resetIsStarted();
    resetStartTime();
    resetTrainingId();
    resetCurrentIndex();
    resetTraining();
    resetCompletingElement();
    resetCompletedElements();
    resetIsPause();
    resetPauseTime();
    resetIsFinished();
  }, [
    resetIsStarted,
    resetStartTime,
    resetTrainingId,
    resetCurrentIndex,
    resetTraining,
    resetCompletingElement,
    resetCompletedElements,
    resetPauseTime,
    resetIsPause,
    resetIsFinished,
  ]);

  return {
    setIsStarted,
    setIsFinished,
    setTrainingId,
    setCurrentIndex,
    setStartTime,
    setTraining,
    setCompletingElement,
    setCompletedElements,
    resetCompletingElement,
    setIsPause,
    setPauseTime,
    reset,
  };
};
