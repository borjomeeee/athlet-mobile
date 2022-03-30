import {useFlow} from 'src/Hooks/Flow';
import {useTrainingsRepository} from 'src/Repositories/Trainings';
import {useTrainingStore} from 'src/Store/Trainings';

export const useTrainingsService = () => {
  const {setMyTrainings} = useTrainingStore();
  const {downloadMyTrainings} = useTrainingsRepository();

  const getMyTrainings = useFlow(
    async () => {
      const {trainings} = await downloadMyTrainings();
      setMyTrainings(trainings);
    },
    [downloadMyTrainings, setMyTrainings],
    'trainingsService__getMyTrainings',
  );

  return {getMyTrainings};
};
