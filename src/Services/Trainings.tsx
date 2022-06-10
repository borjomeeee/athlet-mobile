import React from 'react';

import {asyncCall} from 'src/Hooks/Flow';
import {useOfflineTrainingsRepository} from 'src/Repositories/OfflineTrainings';
import {useTrainingsRepository} from 'src/Repositories/Trainings';
import {CreatingTraining} from 'src/Store/Models/Training';
import {
  useTrainingAdditionals,
  useTrainingAdditionalStore,
  useTrainingStore,
} from 'src/Store/Trainings';
import {JobAlreadyStarted} from 'src/Utils/Exceptions';
import {Logger} from 'src/Utils/Logger';

export const useTrainingsService = () => {
  const {replaceMyTrainings, addTraining, replaceTraining} = useTrainingStore();

  const {
    getMyTrainings: offlineGetMyTrainings,
    createTraining: offlineCreateTraining,
    replaceTraining: offlineReplaceTraining,
  } = useOfflineTrainingsRepository();

  const {getMyTrainings: apiGetMyTrainings, createTraining: apiCreateTraining} =
    useTrainingsRepository();

  const getMyTrainings = React.useCallback(
    () =>
      asyncCall(async () => {
        const offlineTrainings = await offlineGetMyTrainings();
        const trainings = await apiGetMyTrainings();

        offlineTrainings.forEach(offlineTraining => {
          if (trainings.some(training => training.id === offlineTraining.id)) {
            return;
          }

          trainings.push(offlineTraining);
        });

        replaceMyTrainings(offlineTrainings);
        return offlineTrainings;
      }),
    [offlineGetMyTrainings, apiGetMyTrainings, replaceMyTrainings],
  );

  const createTraining = React.useCallback(
    (
      training: CreatingTraining,
      onApi: (trainingId: string | undefined, error: Error | undefined) => void,
    ) =>
      asyncCall(async () => {
        const offlineCreatedTraining = await offlineCreateTraining(training);
        addTraining(offlineCreatedTraining);

        // TODO
        if ('is_authorized') {
          apiCreateTraining(training)
            .then(async data => {
              return offlineReplaceTraining(
                offlineCreatedTraining.id,
                data,
              ).then(() => data);
            })
            .catch(e => {
              Logger.error(
                `Replace offline training to api created failed: ${e.message}`,
              );
              throw e;
            })
            .then(createdTraining => {
              replaceTraining(offlineCreatedTraining.id, createdTraining);
              onApi(createdTraining.id, undefined);
            })
            .catch(e => onApi(undefined, e));
        }

        return offlineCreatedTraining.id;
      }),
    [
      offlineCreateTraining,
      offlineReplaceTraining,
      apiCreateTraining,
      addTraining,
      replaceTraining,
    ],
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
    updateTraining: offlineUpdateTraining,
    replaceTraining: offlineReplaceTraining,
    removeTraining: offlineRemoveTraining,
  } = useOfflineTrainingsRepository();

  const {
    updateTraining: apiUpdateTraining,
    removeTraining: apiRemoveTraining,
    getTrainingById,
  } = useTrainingsRepository();

  const {isLoading, isUpdating, isDeleting} = useTrainingAdditionals();

  const updateTraining = React.useCallback(
    (
      id: string,
      training: CreatingTraining,
      onApi: (trainingId: string | undefined, error: Error | undefined) => void,
    ) => {
      if (isUpdating(id)) {
        throw new JobAlreadyStarted('updateTraining');
      }

      return asyncCall(async () => {
        try {
          startUpdating(id);

          const offlineUpdatedTraining = await offlineUpdateTraining(
            id,
            training,
          );
          replaceTraining(id, offlineUpdatedTraining);

          // TODO
          if ('is_authorized') {
            apiUpdateTraining(id, training)
              .then(data => offlineReplaceTraining(id, data))
              .catch(_ =>
                Logger.error('Replace offline training to api updated failed!'),
              )
              .then(updatedTraining => {
                if (updatedTraining) {
                  replaceTraining(id, updatedTraining);
                  onApi(updatedTraining.id, undefined);
                }
              })
              .catch(e => onApi(undefined, e));
          }

          return id;
        } finally {
          finishUpdating(id);
        }
      });
    },
    [
      isUpdating,
      apiUpdateTraining,
      replaceTraining,
      startUpdating,
      finishUpdating,
      offlineUpdateTraining,
      offlineReplaceTraining,
    ],
  );

  const removeTraining = React.useCallback(
    (
      id: string,
      onApi: (trainingId: string | undefined, error: Error | undefined) => void,
    ) => {
      if (isDeleting(id)) {
        throw new JobAlreadyStarted('removeTraining');
      }

      return asyncCall(async () => {
        try {
          startDeleting(id);

          await offlineRemoveTraining(id);
          deleteTraining(id);

          // TODO
          if ('is_authorized') {
            apiRemoveTraining(id)
              .then(() => onApi(id, undefined))
              .catch(e => onApi(undefined, e));
          }

          return id;
        } finally {
          finishDeleting(id);
        }
      });
    },
    [
      isDeleting,
      startDeleting,
      finishDeleting,
      apiRemoveTraining,
      deleteTraining,
      offlineRemoveTraining,
    ],
  );

  const loadTraining = React.useCallback(
    (id: string) => {
      if (isLoading(id)) {
        throw new JobAlreadyStarted('loadTrainingById');
      }

      return asyncCall(async () => {
        try {
          startLoading(id);

          const training = await getTrainingById(id);

          // TODO: add training to нужное place
          addTraining(training);
          return id;
        } finally {
          finishLoading(id);
        }
      });
    },
    [isLoading, addTraining, getTrainingById, startLoading, finishLoading],
  );

  return {updateTraining, removeTraining, loadTraining};
};
