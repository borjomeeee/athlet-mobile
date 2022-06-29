import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {CreatingTrainingEvent, TrainingEvent} from 'src/Store/Models/Training';
import {getAsJsonFromLocal, setJsonToLocal} from 'src/Utils/MMKV';
import {ITrainingsEventsRepository} from './Interfaces/TrainingsEvents';

const MY_TRAININGS_EVENTS_KEY = '@@my-trainings-events';
export const useOfflineTrainingsEventsRepository =
  (): ITrainingsEventsRepository => {
    const getMyEvents = React.useCallback(async () => {
      try {
        return await getAsJsonFromLocal<TrainingEvent[]>(
          MY_TRAININGS_EVENTS_KEY,
        );
      } catch (e) {
        return [];
      }
    }, []);

    const createEvent = React.useCallback(
      async (creatingTrainingEvent: CreatingTrainingEvent) => {
        const trainingsEvents = await getMyEvents();

        const newTrainingEvent: TrainingEvent = {
          id: uuidv4(),

          completedAt: Date.now(),
          duration: creatingTrainingEvent.duration,

          initialTraining: creatingTrainingEvent.initialTraining,
          completedElements: creatingTrainingEvent.completedElements,
        };

        await setJsonToLocal(MY_TRAININGS_EVENTS_KEY, [
          ...trainingsEvents,
          newTrainingEvent,
        ]);
        return newTrainingEvent;
      },
      [getMyEvents],
    );

    return {getMyEvents, createEvent};
  };
