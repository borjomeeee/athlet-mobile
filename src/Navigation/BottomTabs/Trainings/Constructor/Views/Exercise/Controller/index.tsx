import React from 'react';
import * as UI from 'src/Components';
import {useModal} from 'src/Lib/ModalRouter';
import {TrainingUtils} from 'src/Store/ModelsUtils/Training';
import {Modals} from '../../../Const';
import {
  useTrainingConstructorExercise,
  useTrainingConstructorStore,
} from '../../../Store';

export const useTrainingExerciseController = (id: string) => {
  const {replaceExercise, changeExerciseRest, removeExercise} =
    useTrainingConstructorStore();

  const {show: showEditRest} = useModal(Modals.EditRest);
  const {show: showEditExercise} = useModal(Modals.EditExercise);

  const {exercise} = useTrainingConstructorExercise(id);

  const handlePress = React.useCallback(() => {
    if (!exercise || TrainingUtils.isSet(exercise)) {
      return;
    }

    showEditExercise(UI.EditExercise, {
      onEdit: newExercise => {
        replaceExercise(id, newExercise);
      },
      exercise: exercise,
    });
  }, [showEditExercise, id, exercise, replaceExercise]);

  const handlePressEditRest = React.useCallback(() => {
    if (!exercise) {
      return;
    }

    showEditRest(UI.SelectRest, {
      onSelect: rest => changeExerciseRest(id, rest),
      defaultRest: exercise.restAfterComplete,
    });
  }, [showEditRest, exercise, id, changeExerciseRest]);

  const handlePressRemove = React.useCallback(() => {
    removeExercise(id);
  }, [id, removeExercise]);

  return {handlePress, handlePressEditRest, handlePressRemove};
};
