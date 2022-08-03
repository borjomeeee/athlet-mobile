import React from 'react';
import {useRoute} from '@react-navigation/core';
import {TrainingEventScreenNavigationProps} from '../../Types';
import {trainingEventIdStore, useTrainingEventScreenStore} from '../Store';
import {useRecoilValue} from 'recoil';
import {useTrainingEvent} from 'src/Store/TrainingsEvents';

export const useTrainingEventNavigationEffect = () => {
  const route = useRoute<TrainingEventScreenNavigationProps['route']>();

  const {setTrainingEventId, setTrainingEvent} = useTrainingEventScreenStore();

  const trainingEventId = useRecoilValue(trainingEventIdStore);
  const trainingEvent = useTrainingEvent(trainingEventId);

  React.useEffect(() => {
    if (route.params?.id) {
      setTrainingEventId(route.params.id);
    }
  }, [setTrainingEventId, route]);

  React.useEffect(() => {
    if (trainingEvent) {
      setTrainingEvent(trainingEvent);
    }
  }, [trainingEvent, setTrainingEvent]);
};
