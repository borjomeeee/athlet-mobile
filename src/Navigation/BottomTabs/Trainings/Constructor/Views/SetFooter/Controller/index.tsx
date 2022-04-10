import React from 'react';
import {useModal} from 'src/Lib/ModalRouter';
import {ExerciseUtils} from 'src/Store/ModelsUtils/Exercise';
import * as UI from 'src/Components';
import {
  useTrainingConstructorSet,
  useTrainingConstructorHistoryStore,
} from '../../../Store';
import {Modals} from '../../../Const';

export const useSetFooterController = (id: string) => {
  const {set} = useTrainingConstructorSet(id);
  const {addExerciseToSet, replaceSet} = useTrainingConstructorHistoryStore();

  const {show: showSelectExercise} = useModal(Modals.SelectExercise);
  const {show: showEditExercise} = useModal(Modals.EditExercise);

  const handlePressAddExercise = React.useCallback(
    () =>
      showSelectExercise(UI.SelectExercise, {
        onSelect: exercise => {
          showEditExercise(UI.EditExercise, {
            exercise: ExerciseUtils.getExerciseElementFromBase(exercise),
            onEdit: editedExercise => {
              addExerciseToSet(id, editedExercise);
            },
          });
        },
      }),
    [showSelectExercise, showEditExercise, addExerciseToSet, id],
  );

  const {show: showEditRest} = useModal('trainingConstructor__editRest');

  const handlePressEditRest = React.useCallback(() => {
    if (!set) {
      return;
    }

    showEditRest(UI.SelectRest, {
      onSelect: rest => replaceSet(id, {...set, restAfterComplete: rest}),
      defaultRest: set.restAfterComplete,
    });
  }, [showEditRest, set, id, replaceSet]);

  return {handlePressAddExercise, handlePressEditRest};
};
