import React from 'react';
import * as UI from 'src/Components';
import {ExerciseUtils} from 'src/Store/ModelsUtils/Exercise';
import {useTrainingConstructorHistory} from '../../Store';
import {Modals} from '../../Const';
import {bottomSheetsShowablePortal} from 'src/Lib/ShowablePortal/Portal';

export const useAddElementBottomSheetController = () => {
  const {addExercise, addSet} = useTrainingConstructorHistory();

  const handlePressAddExercise = React.useCallback(() => {
    bottomSheetsShowablePortal.current?.close(Modals.AddElement);

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
                addExercise(editedExercise);
              },
            },
          );
        },
      },
    );
  }, [addExercise]);

  const handlePressAddSet = React.useCallback(() => {
    bottomSheetsShowablePortal.current?.close(Modals.AddElement);
    addSet();
  }, [addSet]);

  return {handlePressAddExercise, handlePressAddSet};
};
