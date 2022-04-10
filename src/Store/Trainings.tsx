import React from 'react';
import {atom, selector, useSetRecoilState} from 'recoil';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';
import {Training} from './Models/Training';

const createKey = getKeyFabricForDomain('trainings');

type TrainingsStore = {[key: string]: Training};
export const myTrainingsStore = atom<TrainingsStore>({
  key: createKey('myTrainings'),
  default: {},
});

export const useTrainingStore = () => {
  const setMyTrainings = useSetRecoilState(myTrainingsStore);

  const replaceMyTrainings = React.useCallback(
    (trainings: Training[]) => {
      const dict: TrainingsStore = {};
      trainings.forEach(training => (dict[training.id] = training));
      setMyTrainings(dict);
    },
    [setMyTrainings],
  );

  const addTraining = React.useCallback(
    (training: Training) => {
      setMyTrainings(currentTrainings => ({
        ...currentTrainings,
        [training.id]: training,
      }));
    },
    [setMyTrainings],
  );

  const replaceTraining = React.useCallback(
    (id: string, training: Training) => {
      setMyTrainings(currentTrainings => ({
        ...currentTrainings,
        [id]: training,
      }));
    },
    [setMyTrainings],
  );

  return {
    replaceMyTrainings,
    addTraining,
    replaceTraining,
  };
};

export const myTrainingsIds = selector({
  key: createKey('myTrainings__ids'),
  get: ({get}) => Object.keys(get(myTrainingsStore)),
});

export const myTrainingsList = selector({
  key: createKey('myTrainings__list'),
  get: ({get}) => Object.values(get(myTrainingsStore)),
});
