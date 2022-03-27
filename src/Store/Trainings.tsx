import React from 'react';
import {atom, selector, useRecoilState} from 'recoil';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';
import {Training} from './Models/Training';

const createKey = getKeyFabricForDomain('trainings');

type TrainingsStore = {[key: string]: Training};
export const myTrainingsStore = atom<TrainingsStore>({
  key: createKey('myTrainings'),
  default: {},
});

export const useTrainingStore = () => {
  const [myTrainings, _setMyTrainings] = useRecoilState(myTrainingsStore);

  const setMyTrainings = React.useCallback(
    (trainings: Training[]) => {
      const dict: TrainingsStore = {};
      trainings.forEach(training => (dict[training.id] = training));
      _setMyTrainings(dict);
    },
    [_setMyTrainings],
  );

  return {
    myTrainings,
    setMyTrainings,
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
