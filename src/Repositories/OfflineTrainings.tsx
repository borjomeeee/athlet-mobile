import React from 'react';
import {CreatingTraining, Training} from 'src/Store/Models/Training';
import {getAsJsonFromLocal, setJsonToLocal} from 'src/Utils/MMKV';
import {ITrainingsRepository} from './Interfaces/Trainings';

import {v4 as uuidv4} from 'uuid';

const MY_TRAININGS_KEY = '@@my-trainings';

interface IOfflineTrainingsRepository extends ITrainingsRepository {
  replaceTraining(id: string, training: Training): Promise<Training>;
  replaceTrainings(trainings: Training[]): Promise<void>;
}
export const useOfflineTrainingsRepository =
  (): IOfflineTrainingsRepository => {
    const getMyTrainings = React.useCallback(async () => {
      try {
        return await getAsJsonFromLocal<Training[]>(MY_TRAININGS_KEY);
      } catch (e) {
        return [];
      }
    }, []);

    const getTrainingById = React.useCallback(
      async (id: string) => {
        const trainings = await getMyTrainings();
        const searchingTraining = trainings.find(
          training => training.id === id,
        );

        if (!searchingTraining) {
          // TODO: make good error
          throw new Error('training not found!');
        }

        return searchingTraining;
      },
      [getMyTrainings],
    );

    const createTraining = React.useCallback(
      async (creatingTraining: CreatingTraining) => {
        const trainings = await getMyTrainings();

        const newTraining: Training = {
          id: uuidv4(),

          createdAt: Date.now(),
          updatedAt: Date.now(),

          title: creatingTraining.title,
          elements: creatingTraining.elements,
        };

        await setJsonToLocal(MY_TRAININGS_KEY, [...trainings, newTraining]);
        return newTraining;
      },
      [getMyTrainings],
    );

    const replaceTraining = React.useCallback(
      async (id: string, training: Training) => {
        const trainings = await getMyTrainings();

        await setJsonToLocal(MY_TRAININGS_KEY, [
          ...trainings.filter(t => t.id !== id),
          training,
        ]);

        return training;
      },
      [getMyTrainings],
    );

    const updateTraining = React.useCallback(
      async (id: string, updatingTraining: CreatingTraining) => {
        const replacingTraining: Training = {
          id,

          createdAt: Date.now(),
          updatedAt: Date.now(),

          title: updatingTraining.title,
          elements: updatingTraining.elements,
        };

        return replaceTraining(id, replacingTraining);
      },
      [replaceTraining],
    );

    const removeTraining = React.useCallback(
      async (id: string) => {
        const trainings = await getMyTrainings();
        await setJsonToLocal(
          MY_TRAININGS_KEY,
          trainings.filter(training => training.id !== id),
        );
      },
      [getMyTrainings],
    );

    const replaceTrainings = React.useCallback(
      async (trainings: Training[]) => {
        await setJsonToLocal(MY_TRAININGS_KEY, trainings);
      },
      [],
    );

    return {
      getMyTrainings,
      getTrainingById,
      createTraining,
      updateTraining,
      removeTraining,
      replaceTraining,
      replaceTrainings,
    };
  };
