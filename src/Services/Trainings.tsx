import {useFlow} from 'src/Hooks/Flow';
import {useTrainingsRepository} from 'src/Repositories/Trainings';
import {CreatingTraining} from 'src/Store/Models/Training';
import {
  useTrainingAdditionals,
  useTrainingAdditionalStore,
  useTrainingStore,
} from 'src/Store/Trainings';

export const useTrainingsService = () => {
  const {replaceMyTrainings, addTraining} = useTrainingStore();
  const {downloadMyTrainings, createTraining: apiCreateTraining} =
    useTrainingsRepository();

  const getMyTrainings = useFlow(
    async () => {
      const {trainings} = await downloadMyTrainings();
      replaceMyTrainings(trainings);

      return trainings;
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

  return {getMyTrainings, createTraining};
};

export const useTrainingService = () => {
  const {addTraining, replaceTraining, deleteTraining} = useTrainingStore();
  const {
    startLoading,
    finishLoading,
    startUpdating,
    finishUpdating,
    startDeleting,
    finishDeleting,
  } = useTrainingAdditionalStore();

  const {
    updateTraining: apiUpdateTraining,
    removeTraining: apiRemoveTraining,
    getTrainingById,
  } = useTrainingsRepository();

  const {isLoading, isUpdating, isDeleting} = useTrainingAdditionals();

  const updateTraining = useFlow(
    async (id: string, training: CreatingTraining) => {
      if (isUpdating(id)) {
        return;
      }

      try {
        startUpdating(id);

        const updatedTraining = await apiUpdateTraining(id, training);
        replaceTraining(id, updatedTraining);

        return updatedTraining;
      } finally {
        finishUpdating(id);
      }
    },
    [
      isUpdating,
      apiUpdateTraining,
      replaceTraining,
      startUpdating,
      finishUpdating,
    ],
    'trainingService__updateTraining',
  );

  const removeTraining = useFlow(
    async (id: string) => {
      if (isDeleting(id)) {
        return;
      }

      try {
        startDeleting(id);

        await apiRemoveTraining(id);
        deleteTraining(id);

        return id;
      } finally {
        finishDeleting(id);
      }
    },
    [
      isDeleting,
      startDeleting,
      finishDeleting,
      apiRemoveTraining,
      deleteTraining,
    ],
    'trainingService__deleteTraining',
  );

  const loadTrainingById = useFlow(
    async (id: string) => {
      if (isLoading(id)) {
        return;
      }

      try {
        startLoading(id);

        const training = await getTrainingById(id);
        addTraining(training);

        return training;
      } finally {
        finishLoading(id);
      }
    },
    [isLoading, addTraining, getTrainingById, startLoading, finishLoading],
  );

  return {updateTraining, removeTraining, loadTrainingById};
};
