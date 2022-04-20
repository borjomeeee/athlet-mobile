import React from 'react';
import {httpClient} from 'src/Api';
import {parseDefaultApiResponse} from 'src/Api/Helpers';
import {ApiPaths} from 'src/Api/Paths';
import {
  Training,
  CreatingTraining,
  TrainingScheme,
} from 'src/Store/Models/Training';
import {z} from 'zod';

export const useTrainingsRepository = () => {
  const downloadMyTrainings = React.useCallback(() => {
    return httpClient
      .get({url: ApiPaths.getMyTrainings})
      .then(parseDefaultApiResponse)
      .then(data => ({
        trainings: z.array(TrainingScheme).parse(data.json) as Training[],
      }));
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
      .then(parseDefaultApiResponse);
  }, []);

  return {downloadMyTrainings, createTraining, updateTraining, removeTraining};
};
