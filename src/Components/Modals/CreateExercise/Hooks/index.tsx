import React from 'react';
import {useShowableInstance} from 'src/Lib/ShowablePortal/Hooks/useShowableInstance';
import {useGetRecoilState} from 'src/Utils/Recoil';
import {exerciseNameStoreFamily, useCreateExerciseStore} from '../Store';
import {CreateExerciseProps} from '../Types';

export const useCreateExerciseController = (id: string) => {
  const {reset, setExerciseName, setExerciseNameError} =
    useCreateExerciseStore(id);

  const getExerciseName = useGetRecoilState(exerciseNameStoreFamily(id));
  const {close, props} = useShowableInstance<CreateExerciseProps>();

  const handlePressSubmit = React.useCallback(() => {
    const exerciseName = getExerciseName();
    if (exerciseName.length === 0) {
      setExerciseNameError('Название не может быть пустым!');
    } else {
      props.onCreate?.(exerciseName);
      close();
    }
  }, [getExerciseName, setExerciseNameError, props, close]);

  return {handleChangeExerciseName: setExerciseName, handlePressSubmit, reset};
};
