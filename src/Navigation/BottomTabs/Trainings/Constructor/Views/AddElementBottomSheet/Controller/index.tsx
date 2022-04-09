import React from 'react';
import {useModal} from 'src/Lib/ModalRouter';
import * as UI from 'src/Components';
import {ExerciseUtils} from 'src/Store/ModelsUtils/Exercise';
import {useTrainingConstructorStore} from '../../../Store';
import {ElementType} from 'src/Store/Models/Training';
import {Modals} from '../../../Const';

export const useAddElementBottomSheetController = () => {
  const {addElement} = useTrainingConstructorStore();

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
            addElement(editedExercise);
          },
        });
      },
    });
  }, [hideAddElement, showSelectExercise, showEditExercise, addElement]);

  const handlePressAddSet = React.useCallback(() => {
    hideAddElement();
    addElement({type: ElementType.SET, elements: [], restAfterComplete: 15});
  }, [hideAddElement, addElement]);

  return {handlePressAddExercise, handlePressAddSet};
};
