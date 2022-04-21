import React from 'react';
import {atom, selector, useRecoilValue, useSetRecoilState} from 'recoil';
import {getKeyFabricForDomain, useGetRecoilState} from 'src/Utils/Recoil';
import {Training} from './Models/Training';

const createKey = getKeyFabricForDomain('trainings');

type TrainingsStore = {[key: string]: Training};
export const myTrainingsStore = atom<TrainingsStore>({
  key: createKey('myTrainings'),
  default: {},
});
type TrainingAdditional = {
  isLoading?: boolean;
  isUpdating?: boolean;
  isDeleting?: boolean;
};
type TrainingsAdditionalsStore = {[key: string]: TrainingAdditional};
export const myTrainingsAdditionalStore = atom<TrainingsAdditionalsStore>({
  key: createKey('myTrainingsAdditional'),
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

  const deleteTraining = React.useCallback(
    (id: string) => {
      setMyTrainings(currentTrainings => {
        const newCurrentTrainings = {...currentTrainings};
        delete newCurrentTrainings[id];

        return newCurrentTrainings;
      });
    },
    [setMyTrainings],
  );

  return {
    replaceMyTrainings,
    addTraining,
    replaceTraining,
    deleteTraining,
  };
};

export const useTrainingAdditionalStore = () => {
  const setTrainingsAdditionals = useSetRecoilState(myTrainingsAdditionalStore);

  const startAction = React.useCallback(
    (id: string, key: keyof TrainingAdditional, value: boolean) => {
      setTrainingsAdditionals(currentAdditionals => ({
        ...currentAdditionals,
        [id]: {...currentAdditionals[id], [key]: value},
      }));
    },
    [setTrainingsAdditionals],
  );

  const startLoading = React.useCallback(
    (id: string) => startAction(id, 'isLoading', true),
    [startAction],
  );

  const finishLoading = React.useCallback(
    (id: string) => startAction(id, 'isLoading', false),
    [startAction],
  );

  const startUpdating = React.useCallback(
    (id: string) => startAction(id, 'isUpdating', true),
    [startAction],
  );

  const finishUpdating = React.useCallback(
    (id: string) => startAction(id, 'isUpdating', false),
    [startAction],
  );

  const startDeleting = React.useCallback(
    (id: string) => startAction(id, 'isDeleting', true),
    [startAction],
  );

  const finishDeleting = React.useCallback(
    (id: string) => startAction(id, 'isDeleting', false),
    [startAction],
  );

  return {
    startLoading,
    finishLoading,
    startDeleting,
    finishDeleting,
    startUpdating,
    finishUpdating,
  };
};

export const useTraining = (id: string | undefined) => {
  const trainings = useRecoilValue(myTrainingsStore);
  return {training: id ? trainings[id] : undefined};
};

export const useTrainingAdditionals = () => {
  const getAdditionals = useGetRecoilState(myTrainingsAdditionalStore);

  const isLoading = React.useCallback(
    (id: string | undefined) => {
      const additionals = getAdditionals();
      return id ? additionals[id]?.isLoading : false;
    },
    [getAdditionals],
  );

  const isUpdating = React.useCallback(
    (id: string | undefined) => {
      const additionals = getAdditionals();
      return id ? additionals[id]?.isUpdating : false;
    },
    [getAdditionals],
  );

  const isDeleting = React.useCallback(
    (id: string | undefined) => {
      const additionals = getAdditionals();
      return id ? additionals[id]?.isDeleting : false;
    },
    [getAdditionals],
  );

  return {isLoading, isUpdating, isDeleting};
};

export const myTrainingsIds = selector({
  key: createKey('myTrainings__ids'),
  get: ({get}) => Object.keys(get(myTrainingsStore)),
});

export const myTrainingsList = selector({
  key: createKey('myTrainings__list'),
  get: ({get}) => Object.values(get(myTrainingsStore)),
});
