import {useFlow} from 'src/Hooks/Flow';
import {useTrainingsRepository} from 'src/Repositories/Trainings';
import {CreatingTraining} from 'src/Store/Models/Training';
import {useTrainingStore} from 'src/Store/Trainings';

export const useTrainingsService = () => {
  const {replaceMyTrainings, addTraining, replaceTraining, deleteTraining} =
    useTrainingStore();
  const {
    downloadMyTrainings,
    createTraining: apiCreateTraining,
    updateTraining: apiUpdateTraining,
    removeTraining: apiRemoveTraining,
  } = useTrainingsRepository();

  const getMyTrainings = useFlow(
    async () => {
      const {trainings} = await downloadMyTrainings();
      replaceMyTrainings(trainings);
    },
    [downloadMyTrainings, replaceMyTrainings],
    'trainingsService__getMyTrainings',
  );

  const createTraining = useFlow(
    async (training: CreatingTraining) => {
      const createdTraining = await apiCreateTraining(training);
      addTraining(createdTraining);

      return createdTraining;
    },
    [apiCreateTraining, addTraining],
    'trainingService__createTraining',
  );

  const updateTraining = useFlow(
    async (id: string, training: CreatingTraining) => {
      const updatedTraining = await apiUpdateTraining(id, training);
      replaceTraining(id, updatedTraining);

      return updatedTraining;
    },
    [apiUpdateTraining, replaceTraining],
    'trainingService__updateTraining',
  );

  const removeTraining = useFlow(
    async (id: string) => {
      await apiRemoveTraining(id);
      deleteTraining(id);
    },
    [apiRemoveTraining, deleteTraining],
    'trainingService__deleteTraining',
  );

  return {getMyTrainings, createTraining, updateTraining, removeTraining};
};
