import React from 'react';
import {
  completingElementStore,
  usePlaygroundStore,
} from 'src/Navigation/Playground/Store';
import {ElementType, ExerciseCompletionType} from 'src/Store/Models/Training';
import {useGetRecoilState} from 'src/Utils/Recoil';

export const useCurrentElementController = () => {
  const getCompletingElement = useGetRecoilState(completingElementStore);
  const {setCompletingElement} = usePlaygroundStore();

  const handleChangeReps = React.useCallback(
    (reps: number) => {
      const element = getCompletingElement();
      if (
        element &&
        element.type === ElementType.EXERCISE &&
        (element.completionType === ExerciseCompletionType.REPS ||
          element.completionType === ExerciseCompletionType.GYM)
      ) {
        setCompletingElement({...element, reps});
      }
    },
    [setCompletingElement, getCompletingElement],
  );

  const handleChangeTime = React.useCallback(
    (time: number) => {
      const element = getCompletingElement();
      if (
        element &&
        element.type === ElementType.EXERCISE &&
        element.completionType === ExerciseCompletionType.TIME
      ) {
        setCompletingElement({...element, time});
      }
    },
    [setCompletingElement, getCompletingElement],
  );

  const handleChangeRest = React.useCallback(
    (duration: number) => {
      const element = getCompletingElement();
      if (element && element.type === ElementType.REST) {
        setCompletingElement({...element, duration});
      }
    },
    [setCompletingElement, getCompletingElement],
  );

  return {handleChangeReps, handleChangeTime, handleChangeRest};
};
