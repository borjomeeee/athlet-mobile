import React from 'react';
import * as UI from 'src/Components';
import {bottomSheetsShowablePortal} from 'src/Lib/ShowablePortal/Portal';
import {TrainingUtils} from 'src/Store/ModelsUtils/Training';
import {Modals} from '../../Const';
import {
  useTrainingConstructorExercise,
  useTrainingConstructorHistory,
} from '../../Store';

export const useTrainingExerciseController = (id: string) => {
  const {removeExercise, replaceExercise} = useTrainingConstructorHistory();

  const {exercise} = useTrainingConstructorExercise(id);

  const handlePress = React.useCallback(() => {
    if (!exercise || TrainingUtils.isSet(exercise)) {
      return;
    }

    bottomSheetsShowablePortal.current?.show(
      Modals.EditExercise,
      UI.EditExercise,
      {
        onEdit: newExercise => {
          replaceExercise(id, {
            ...newExercise,
            restAfterComplete: exercise.restAfterComplete,
          });
        },
        exercise: exercise,
      },
    );
  }, [id, exercise, replaceExercise]);

  const handlePressRest = React.useCallback(() => {
    if (!exercise) {
      return;
    }

    bottomSheetsShowablePortal.current?.show(Modals.EditRest, UI.SelectRest, {
      onSelect: rest =>
        replaceExercise(id, {
          ...exercise,
          restAfterComplete: rest,
        }),
      defaultRest: exercise.restAfterComplete,
    });
  }, [exercise, id, replaceExercise]);

  const handlePressRemove = React.useCallback(() => {
    removeExercise(id);
  }, [id, removeExercise]);

  return {handlePress, handlePressRest, handlePressRemove};
};
