import React from 'react';
import {useRecoilValue} from 'recoil';
import {useShowableInstance} from 'src/Lib/ShowablePortal/Hooks/useShowableInstance';
import {bottomSheetsShowablePortal} from 'src/Lib/ShowablePortal/Portal';

import {
  ElementType,
  ExerciseCompletionType,
  ExerciseElement,
} from 'src/Store/Models/Training';
import {SelectExercise} from '../../SelectExercise';
import {
  completionTypeStoreFamily,
  currentExerciseStoreFamily,
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

  const changeCurrentExercise = React.useCallback(
    (exercise: ExerciseElement) => {
      setCurrentExercise(exercise.baseExercise);
      setCompletionType(exercise.completionType);

      switch (exercise.completionType) {
        case ExerciseCompletionType.REPS:
          setReps(exercise.reps);
          break;
        case ExerciseCompletionType.TIME:
          setTime(exercise.time);
          break;
        case ExerciseCompletionType.GYM:
          setGymReps(exercise.reps);
          setGymWeight(exercise.kg);
          break;
      }
    },
    [
      setCurrentExercise,
      setCompletionType,
      setReps,
      setTime,
      setGymReps,
      setGymWeight,
    ],
  );

  const handlePressEditExercise = React.useCallback(() => {
    bottomSheetsShowablePortal.current?.show(
      `${id} -> editExercise__selectExercise`,
      SelectExercise,
      {
        onSelect: exercise => {
          setCurrentExercise(exercise);
          setCompletionType(ExerciseCompletionType.REPS);
        },
      },
    );
  }, [id, setCurrentExercise, setCompletionType]);

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
  const {close, props} = useShowableInstance<EditExerciseProps>();

  const currentExercise = useRecoilValue(currentExerciseStoreFamily(id));
  const selectedCompletionType = useRecoilValue(completionTypeStoreFamily(id));

  const selectedReps = useRecoilValue(repsStoreFamily(id));
  const selectedTime = useRecoilValue(timeStoreFamily(id));
  const selectedGymReps = useRecoilValue(gymRepsStoreFamily(id));
  const selectedGymWeight = useRecoilValue(gymWeightStoreFamily(id));

  const handleSubmit = React.useCallback(() => {
    if (!currentExercise) {
      return;
    }

    switch (selectedCompletionType) {
      case ExerciseCompletionType.REPS:
        props.onEdit?.({
          restAfterComplete: 60_000,
          baseExercise: currentExercise,
          type: ElementType.EXERCISE,
          completionType: ExerciseCompletionType.REPS,
          reps: selectedReps,
        });
        break;
      case ExerciseCompletionType.TIME:
        props.onEdit?.({
          restAfterComplete: 60_000,
          baseExercise: currentExercise,
          type: ElementType.EXERCISE,
          completionType: ExerciseCompletionType.TIME,
          time: selectedTime,
        });
        break;
      case ExerciseCompletionType.GYM:
        props.onEdit?.({
          restAfterComplete: 60_000,
          baseExercise: currentExercise,
          type: ElementType.EXERCISE,
          completionType: ExerciseCompletionType.GYM,
          reps: selectedGymReps,
          kg: selectedGymWeight,
        });
        break;
    }

    close();
  }, [
    props,
    currentExercise,
    selectedCompletionType,
    selectedReps,
    selectedTime,
    selectedGymReps,
    selectedGymWeight,
    close,
  ]);

  return {handleSubmit};
};
