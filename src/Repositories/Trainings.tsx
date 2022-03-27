import React from 'react';
import {httpClient} from 'src/Api';
import {parseDefaultApiResponse} from 'src/Api/Helpers';
import {ApiPaths} from 'src/Api/Paths';
import {canBeNull} from 'src/Store/Models/Common';
import {Training, TrainingScheme} from 'src/Store/Models/Training';
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

  return {downloadMyTrainings};
};
