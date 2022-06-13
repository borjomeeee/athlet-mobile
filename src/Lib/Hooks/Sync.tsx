import React from 'react';
import {useRecoilValue} from 'recoil';
import {useOfflineTrainingsRepository} from 'src/Repositories/OfflineTrainings';
import {myTrainingsList, useTrainingStore} from 'src/Store/Trainings';

export const useSyncLocalStorage = () => {
  const [trainingsLoaded, setTrainingsLoaded] = React.useState(false);
  //   const [exercisesLoaded, setExercisesLoaded] = React.useState(false);
  //   const [trainingsEventsLoaded, setTrainingsEventsLoaded] =
  //     React.useState(false);

  const {getMyTrainings, replaceTrainings} = useOfflineTrainingsRepository();
  const {replaceMyTrainings} = useTrainingStore();
  const trainingsList = useRecoilValue(myTrainingsList);

  React.useEffect(() => {
    async function load() {
      const trainings = await getMyTrainings();

      replaceMyTrainings(trainings);
      setTrainingsLoaded(true);
    }

    load();
  }, [getMyTrainings, replaceMyTrainings]);

  React.useEffect(() => {
    if (trainingsLoaded) {
      replaceTrainings(trainingsList);
    }
  }, [trainingsList, trainingsLoaded, replaceTrainings]);
};
