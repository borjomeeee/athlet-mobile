import React from 'react';
import {useRecoilValue} from 'recoil';

import {useModal, useModalProps} from 'src/Lib/ModalRouter';
import {
  ElementType,
  Exercise,
  ExerciseCompletionType,
} from 'src/Store/Models/Training';
import {SelectExercise} from '../../SelectExercise';
import {
  completionTypeStoreFamily,
  gymRepsStoreFamily,
  gymWeightStoreFamily,
  repsStoreFamily,
  timeStoreFamily,
  useEditExerciseStore,
} from '../Store';
import {EditExerciseProps} from '../Types';

export const useEditExerciseController = (id: string) => {
  const {
    resetCurrentExercise,
    setCurrentExercise,
    resetCompletionType,
    setCompletionType,
    setGymReps,
    setGymWeight,
    setReps,
    setTime,
    resetGym,
    resetReps,
    resetTime,
  } = useEditExerciseStore(id);

  const {show} = useModal(`${id} -> editExercise__selectExercise`);
  const changeCurrentExercise = React.useCallback(
    (exercise: Exercise) => {
      setCurrentExercise(exercise);
      setCompletionType(exercise.completionType);
    },
    [setCurrentExercise, setCompletionType],
  );

  const handlePressEditExercise = React.useCallback(() => {
    show(SelectExercise, {
      onSelect: exercise => {
        changeCurrentExercise(exercise);
      },
    });
  }, [show, changeCurrentExercise]);

  const reset = React.useCallback(() => {
    resetCurrentExercise();
    resetCompletionType();

    resetGym();
    resetReps();
    resetTime();
  }, [
    resetCurrentExercise,
    resetCompletionType,
    resetGym,
    resetReps,
    resetTime,
  ]);

  return {
    changeCurrentExercise,

    handleChangeCompletionType: setCompletionType,
    handleChangeReps: setReps,
    handleChangeTime: setTime,
    handleChangeGymReps: setGymReps,
    handleChangeGymWeight: setGymWeight,

    handlePressEditExercise,

    resetGym,
    resetTime,
    resetReps,

    reset,
  };
};

export const useEditExerciseSubmitController = (id: string) => {
  const {hide} = useModal(id);
  const {props} = useModalProps<Omit<EditExerciseProps, 'id'>>(id);
  const selectedCompletionType = useRecoilValue(completionTypeStoreFamily(id));

  const selectedReps = useRecoilValue(repsStoreFamily(id));
  const selectedTime = useRecoilValue(timeStoreFamily(id));
  const selectedGymReps = useRecoilValue(gymRepsStoreFamily(id));
  const selectedGymWeight = useRecoilValue(gymWeightStoreFamily(id));

  const handleSubmit = React.useCallback(() => {
    if (!props.exercise) {
      return;
    }

    switch (selectedCompletionType) {
      case ExerciseCompletionType.REPS:
        props.onEdit?.({
          ...props.exercise,
          type: ElementType.EXERCISE,
          completionType: ExerciseCompletionType.REPS,
          reps: selectedReps,
          restAfterComplete: 15,
        });
        break;
      case ExerciseCompletionType.TIME:
        props.onEdit?.({
          ...props.exercise,
          type: ElementType.EXERCISE,
          completionType: ExerciseCompletionType.TIME,
          time: selectedTime,
          restAfterComplete: 15,
        });
        break;
      case ExerciseCompletionType.GYM:
        props.onEdit?.({
          ...props.exercise,
          type: ElementType.EXERCISE,
          completionType: ExerciseCompletionType.GYM,
          reps: selectedGymReps,
          kg: selectedGymWeight,
          restAfterComplete: 15,
        });
        break;
    }

    hide();
  }, [
    props,
    selectedCompletionType,
    selectedReps,
    selectedTime,
    selectedGymReps,
    selectedGymWeight,
    hide,
  ]);

  return {handleSubmit};
};
