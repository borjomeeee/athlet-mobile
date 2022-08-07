import React from 'react';
import {atom, selector, useRecoilValue, useSetRecoilState} from 'recoil';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';
import {TrainingEvent} from './Models/Training';

const createKey = getKeyFabricForDomain('training events');
export const trainingsEventsStore = atom({
  key: createKey('trainings events'),
  default: {} as Record<string, TrainingEvent>,
});

export const useTrainingEventsStore = () => {
  const setTrainingEvents = useSetRecoilState(trainingsEventsStore);

  const replaceMyTrainingsEvents = React.useCallback(
    (trainingsEvents: TrainingEvent[]) => {
      const dict: Record<string, TrainingEvent> = {};
      trainingsEvents.forEach(
        trainingEvent => (dict[trainingEvent.id] = trainingEvent),
      );
      setTrainingEvents(dict);
    },
    [setTrainingEvents],
  );

  const addTrainingEvent = React.useCallback(
    (trainingEvent: TrainingEvent) => {
      setTrainingEvents(currEvents => ({
        ...currEvents,
        [trainingEvent.id]: trainingEvent,
      }));
    },
    [setTrainingEvents],
  );

  return {addTrainingEvent, replaceMyTrainingsEvents};
};

export const trainingsEventsListSelector = selector({
  key: createKey('trainings events list'),
  get: ({get}) => {
    return Object.values(get(trainingsEventsStore));
  },
});

export const sortedTrainingsEventsListSelector = selector({
  key: createKey('sorted trainings events list'),
  get: ({get}) => {
    return [...get(trainingsEventsListSelector)].sort((ev1, ev2) =>
      (ev2.completedAt || 0) > (ev1.completedAt || 0) ? 1 : -1,
    );
  },
});

export const useTrainingEvent = (id?: string) => {
  const trainingEvents = useRecoilValue(trainingsEventsStore);
  return id ? trainingEvents[id] : undefined;
};
