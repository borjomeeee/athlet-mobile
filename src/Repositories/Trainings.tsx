import React from 'react';
import {httpClient} from 'src/Api';
import {parseDefaultApiResponse} from 'src/Api/Helpers';
import {ApiPaths} from 'src/Api/Paths';
import {canBeNull} from 'src/Store/Models/Common';
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
        trainings: canBeNull(z.array(TrainingScheme))
          .default([])
          .parse(data.json) as Training[],
      }));
  }, []);

  const createTraining = React.useCallback((training: CreatingTraining) => {
    return httpClient
      .post({url: ApiPaths.createTraining, data: training})
      .then(parseDefaultApiResponse)
      .then(data => canBeNull(TrainingScheme).parse(data.json) as Training);
  }, []);

  const updateTraining = React.useCallback(
    (id: string, training: CreatingTraining) => {
      return httpClient
        .post({url: ApiPaths.trainingAction(id), data: training})
        .then(parseDefaultApiResponse)
        .then(data => canBeNull(TrainingScheme).parse(data.json) as Training);
    },
    [],
  );

  return {downloadMyTrainings, createTraining, updateTraining};
};
