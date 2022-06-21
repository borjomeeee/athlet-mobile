import React from 'react';
import {useModal, useModalProps} from 'src/Lib/ModalRouter';
import {useGetRecoilState} from 'src/Utils/Recoil';
import {exerciseNameStoreFamily, useCreateExerciseStore} from '../Store';

export const useCreateExerciseController = (id: string) => {
  const {reset, setExerciseName, setExerciseNameError} =
    useCreateExerciseStore(id);

  const getExerciseName = useGetRecoilState(exerciseNameStoreFamily(id));

  const {hide} = useModal(id);
  const {props} = useModalProps<{onCreate: (name: string) => void}>(id);

  const handlePressSubmit = React.useCallback(() => {
    const exerciseName = getExerciseName();
    if (exerciseName.length === 0) {
      setExerciseNameError('Название не может быть пустым!');
    } else {
      props.onCreate?.(exerciseName);
      hide();
    }
  }, [getExerciseName, setExerciseNameError, props, hide]);

  return {handleChangeExerciseName: setExerciseName, handlePressSubmit, reset};
};
