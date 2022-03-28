import React from 'react';
import {httpClient} from 'src/Api';
import {parseDefaultApiResponse} from 'src/Api/Helpers';
import {ApiPaths} from 'src/Api/Paths';
import {canBeNull} from 'src/Store/Models/Common';
import {Exercise, ExerciseScheme} from 'src/Store/Models/Training';
import {z} from 'zod';

export const useExercisesRepository = () => {
  const getExercises = React.useCallback(
    () =>
      httpClient
        .get({url: ApiPaths.getExercises})
        .then(parseDefaultApiResponse)
        .then(data => ({
          exercises: canBeNull(z.array(ExerciseScheme))
            .default([])
            .parse(data.json) as Exercise[],
        })),
    [],
  );

  return {getExercises};
};
