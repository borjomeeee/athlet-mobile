import React from 'react';
import {ExerciseUtils} from 'src/Store/ModelsUtils/Exercise';
import * as UI from 'src/Components';
import {
  useTrainingConstructorSet,
  useTrainingConstructorHistory,
} from '../../Store';
import {Modals} from '../../Const';
import {bottomSheetsShowablePortal} from 'src/Lib/ShowablePortal/Portal';

export const useSetFooterController = (id: string) => {
  const {set} = useTrainingConstructorSet(id);
  const {addExerciseToSet, replaceSet} = useTrainingConstructorHistory();

  const handlePressAddExercise = React.useCallback(() => {
    bottomSheetsShowablePortal.current?.show(
      Modals.SelectExercise,
      UI.SelectExercise,
      {
        onSelect: exercise => {
          bottomSheetsShowablePortal.current?.show(
            Modals.EditExercise,
            UI.EditExercise,
            {
              exercise: ExerciseUtils.getExerciseElementFromBase(exercise),
              onEdit: editedExercise => {
                addExerciseToSet(id, editedExercise);
              },
            },
          );
        },
      },
    );
  }, [addExerciseToSet, id]);

  const handlePressEditRest = React.useCallback(() => {
    if (!set) {
      return;
    }

    bottomSheetsShowablePortal.current?.show(Modals.EditRest, UI.SelectRest, {
      onSelect: rest => replaceSet(id, {...set, restAfterComplete: rest}),
      defaultRest: set.restAfterComplete,
    });
  }, [set, id, replaceSet]);

  return {handlePressAddExercise, handlePressEditRest};
};
