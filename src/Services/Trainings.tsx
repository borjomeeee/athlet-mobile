import React from 'react';

import {flow} from 'src/Hooks/Flow';
import {useTrainingsRepository} from 'src/Repositories/Trainings';
import {useTrainingStore} from 'src/Store/Trainings';

export const useTrainingsService = () => {
  const {setMyTrainings} = useTrainingStore();
  const {downloadMyTrainings} = useTrainingsRepository();

  const getMyTrainings = React.useCallback(
    () =>
      flow(async () => {
        const trainings = await downloadMyTrainings();
        setMyTrainings(trainings);
      }, 'getMyTrainings'),
    [downloadMyTrainings, setMyTrainings],
  );

  return {getMyTrainings};
};
