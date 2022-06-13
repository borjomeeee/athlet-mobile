import React from 'react';
import {httpClient} from 'src/Api';
import {parseDefaultApiResponse} from 'src/Api/Helpers';
import {ApiPaths} from 'src/Api/Paths';
import {
  Training,
  CreatingTraining,
  TrainingScheme,
} from 'src/Store/Models/Training';
import {noop} from 'src/Utils/Common';
import {z} from 'zod';

import {ITrainingsRepository} from './Interfaces/Trainings';

export const useTrainingsRepository = (): ITrainingsRepository => {
  const getMyTrainings = React.useCallback(() => {
    return httpClient
      .get({url: ApiPaths.getMyTrainings})
      .then(parseDefaultApiResponse)
      .then(data => z.array(TrainingScheme).parse(data.json) as Training[]);
  }, []);

  const getTrainingById = React.useCallback((id: string) => {
    return httpClient
      .get({url: ApiPaths.trainingAction(id)})
      .then(parseDefaultApiResponse)
      .then(data => TrainingScheme.parse(data.json) as Training);
  }, []);

  const createTraining = React.useCallback((training: CreatingTraining) => {
    return httpClient
      .post({url: ApiPaths.createTraining, data: training})
      .then(parseDefaultApiResponse)
      .then(data => TrainingScheme.parse(data.json) as Training);
  }, []);

  const updateTraining = React.useCallback(
    (id: string, training: CreatingTraining) => {
      return httpClient
        .post({url: ApiPaths.trainingAction(id), data: training})
        .then(parseDefaultApiResponse)
        .then(data => TrainingScheme.parse(data.json) as Training);
    },
    [],
  );

  const removeTraining = React.useCallback((id: string) => {
    return httpClient
      .delete({url: ApiPaths.trainingAction(id)})
      .then(parseDefaultApiResponse)
      .then(noop);
  }, []);

  return {
    getMyTrainings,
    getTrainingById,
    createTraining,
    updateTraining,
    removeTraining,
  };
};
