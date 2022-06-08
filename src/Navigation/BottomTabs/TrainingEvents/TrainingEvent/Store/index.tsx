import React from 'react';
import {atom, useResetRecoilState, useSetRecoilState} from 'recoil';
import {TrainingEvent} from 'src/Store/Models/Training';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';

const createKey = getKeyFabricForDomain('training event screen');

export const trainingEventIdStore = atom({
  key: createKey('training event id'),
  default: undefined as string | undefined,
});

export const trainingEventStore = atom({
  key: createKey('training event'),
  default: undefined as TrainingEvent | undefined,
});

export const useTrainingEventScreenStore = () => {
  const setTrainingEventId = useSetRecoilState(trainingEventIdStore);
  const resetTrainingEventId = useResetRecoilState(trainingEventIdStore);

  const setTrainingEvent = useSetRecoilState(trainingEventStore);
  const resetTrainingEvent = useResetRecoilState(trainingEventStore);

  const reset = React.useCallback(() => {
    resetTrainingEvent();
    resetTrainingEventId();
  }, [resetTrainingEvent, resetTrainingEventId]);

  return {setTrainingEvent, setTrainingEventId, reset};
};
