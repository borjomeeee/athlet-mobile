import {RouteProp, useRoute} from '@react-navigation/core';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {BottomTabTrainingsEventsPaths} from 'src/Navigation/Paths';
import {useTrainingEvent} from 'src/Store/TrainingsEvents';
import {TrainingsEventsStackParamList} from '../..';
import {trainingEventIdStore, useTrainingEventScreenStore} from '../Store';

export const useTrainingEventController = () => {
  const {reset} = useTrainingEventScreenStore();
  return {reset};
};

type TrainingEventRouteProp = RouteProp<
  TrainingsEventsStackParamList,
  BottomTabTrainingsEventsPaths.TrainingEvent
>;

export const useTrainingEventNavigationEffect = () => {
  const route = useRoute<TrainingEventRouteProp>();

  const {setTrainingEventId, setTrainingEvent} = useTrainingEventScreenStore();

  const trainingEventId = useRecoilValue(trainingEventIdStore);
  const trainingEvent = useTrainingEvent(trainingEventId);

  React.useEffect(() => {
    const params = route.params;

    if (params?.id) {
      setTrainingEventId(params?.id);
    }
  }, [setTrainingEventId, route]);

  React.useEffect(() => {
    if (trainingEvent) {
      setTrainingEvent(trainingEvent);
    }
  }, [trainingEvent, setTrainingEvent]);
};
