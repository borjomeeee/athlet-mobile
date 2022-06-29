import React from 'react';
import {asyncCall} from 'src/Hooks/Flow';
import {useOfflineTrainingsEventsRepository} from 'src/Repositories/OfflineTrainingsEvents';
import {CreatingTrainingEvent, TrainingEvent} from 'src/Store/Models/Training';
import {useTrainingEventsStore} from 'src/Store/TrainingsEvents';

export const useTrainingsEventsService = () => {
  const {addTrainingEvent, replaceMyTrainingsEvents} = useTrainingEventsStore();
  const {getMyEvents, createEvent} = useOfflineTrainingsEventsRepository();

  const saveTrainingEvent = React.useCallback(
    (creatingTrainingEvent: CreatingTrainingEvent) =>
      asyncCall(async () => {
        const trainingEvent = await createEvent(creatingTrainingEvent);
        addTrainingEvent(trainingEvent);
      }),
    [createEvent, addTrainingEvent],
  );

  const getMyTrainingsEvents = React.useCallback(
    () =>
      asyncCall(async () => {
        const trainingEvents = await getMyEvents();
        replaceMyTrainingsEvents(trainingEvents);
        return trainingEvents;
      }),
    [replaceMyTrainingsEvents, getMyEvents],
  );

  return {saveTrainingEvent, getMyTrainingsEvents};
};
