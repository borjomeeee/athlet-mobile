import React from 'react';
import {atom, selector, useSetRecoilState} from 'recoil';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';
import {TrainingEvent} from './Models/Training';

const createKey = getKeyFabricForDomain('training events');
export const trainingsEventsStore = atom({
  key: createKey('trainings events'),
  default: {} as Record<string, TrainingEvent>,
});

export const useTrainingEventsStore = () => {
  const setTrainingEvents = useSetRecoilState(trainingsEventsStore);

  const addTrainingEvent = React.useCallback(
    (trainingEvent: TrainingEvent) => {
      setTrainingEvents(currEvents => ({
        ...currEvents,
        [trainingEvent.id]: trainingEvent,
      }));
    },
    [setTrainingEvents],
  );

  return {addTrainingEvent};
};

export const trainingsEventsListSelector = selector({
  key: createKey('trainings events list'),
  get: ({get}) => {
    return Object.values(get(trainingsEventsStore));
  },
});
