import React from 'react';
import {atom, selector, useResetRecoilState, useSetRecoilState} from 'recoil';
import {Training} from 'src/Store/Models/Training';
import {
  IterableTrainingElement,
  TrainingUtils,
} from 'src/Store/ModelsUtils/Training';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';

const createKey = getKeyFabricForDomain('playground');

export const counterStore = atom({
  key: createKey('counter'),
  default: 5,
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

export const usePlaygroundStore = () => {
  const setCounter = useSetRecoilState(counterStore);
  const resetCounter = useResetRecoilState(counterStore);

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

  const reset = React.useCallback(() => {
    resetCounter();
    resetStartTime();
    resetTrainingId();
    resetCurrentIndex();
    resetTraining();
    resetCompletingElement();
    resetCompletedElements();
  }, [
    resetCounter,
    resetStartTime,
    resetTrainingId,
    resetCurrentIndex,
    resetTraining,
    resetCompletingElement,
    resetCompletedElements,
  ]);

  return {
    setTrainingId,
    setCurrentIndex,
    setCounter,
    setStartTime,
    setTraining,
    setCompletingElement,
    setCompletedElements,
    reset,
  };
};
