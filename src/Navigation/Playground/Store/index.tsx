import React from 'react';
import {atom, selector, useResetRecoilState, useSetRecoilState} from 'recoil';
import {
  ElementType,
  ExerciseElement,
  SetElement,
  Training,
} from 'src/Store/Models/Training';
import {myTrainingsStore} from 'src/Store/Trainings';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';
import {
  PlaygroundElement,
  PlaygroundElementType,
  PlaygroundExercise,
  PlaygroundRest,
} from '../Types';

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
    if (!training) {
      return [];
    }

    const elements: PlaygroundElement[] = [];
    for (let i = 0; i < training.elements.length; i++) {
      if (training.elements[i].type === ElementType.SET) {
        const set = training.elements[i] as SetElement;
        for (let j = 0; j < set.elements.length; j++) {
          elements.push({
            exercise: set.elements[j],
            type: PlaygroundElementType.EXERCISE,
          });

          elements.push({
            duration: set.elements[j].restAfterComplete,
            type: PlaygroundElementType.REST,
          });
        }

        elements.push({
          duration: set.restAfterComplete,
          type: PlaygroundElementType.REST,
        });
      } else {
        const exercise = training.elements[i] as ExerciseElement;
        elements.push({
          exercise,
          type: PlaygroundElementType.EXERCISE,
        });

        elements.push({
          duration: exercise.restAfterComplete,
          type: PlaygroundElementType.REST,
        });
      }
    }

    return elements;
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

  const reset = React.useCallback(() => {
    resetCounter();
    resetStartTime();
    resetTrainingId();
    resetCurrentIndex();
    resetTraining();
  }, [
    resetCounter,
    resetStartTime,
    resetTrainingId,
    resetCurrentIndex,
    resetTraining,
  ]);

  return {
    setTrainingId,
    setCurrentIndex,
    setCounter,
    setStartTime,
    setTraining,
    reset,
  };
};
