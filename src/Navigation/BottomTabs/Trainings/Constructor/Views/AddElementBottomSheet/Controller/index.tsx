import React from 'react';
import {useModal} from 'src/Lib/ModalRouter';
import * as UI from 'src/Components';
import {ExerciseUtils} from 'src/Store/ModelsUtils/Exercise';
import {useTrainingConstructorHistoryStore} from '../../../Store';
import {Modals} from '../../../Const';

export const useAddElementBottomSheetController = () => {
  const {addExercise, addSet} = useTrainingConstructorHistoryStore();

  const {hide: hideAddElement} = useModal(Modals.AddElement);
  const {show: showSelectExercise} = useModal(Modals.SelectExercise);
  const {show: showEditExercise} = useModal(Modals.EditExercise);

  const handlePressAddExercise = React.useCallback(() => {
    hideAddElement();
    showSelectExercise(UI.SelectExercise, {
      onSelect: exercise => {
        showEditExercise(UI.EditExercise, {
          exercise: ExerciseUtils.getExerciseElementFromBase(exercise),
          onEdit: editedExercise => {
            addExercise(editedExercise);
          },
        });
      },
    });
  }, [hideAddElement, showSelectExercise, showEditExercise, addExercise]);

  const handlePressAddSet = React.useCallback(() => {
    hideAddElement();
    addSet();
  }, [hideAddElement, addSet]);

  return {handlePressAddExercise, handlePressAddSet};
};
