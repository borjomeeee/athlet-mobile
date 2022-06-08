import React from 'react';
import {TrainingEvent} from 'src/Store/Models/Training';
import {useTrainingEventsStore} from 'src/Store/TrainingsEvents';

export const useTrainingsEventsService = () => {
  const {addTrainingEvent} = useTrainingEventsStore();
  const saveTrainingEvent = React.useCallback(
    (trainingEvent: TrainingEvent) => {
      // TODO
      addTrainingEvent(trainingEvent);
    },
    [addTrainingEvent],
  );
  return {saveTrainingEvent};
};
