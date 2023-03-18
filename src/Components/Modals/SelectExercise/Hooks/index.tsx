import React from 'react';
import {bottomSheetsShowablePortal} from 'src/Lib/ShowablePortal/Portal';
import {useAppController} from 'src/Services/App';
import {useExercisesService} from 'src/Services/Exercises';
import {CreateExercise} from '../../CreateExercise';
import {Modals} from '../Const';
import {useSelectExerciseStore} from '../Store';

export const useSelectExerciseController = (id: string) => {
  const {setSearchValue} = useSelectExerciseStore(id);

  const {defaultHandleError} = useAppController();
  const {addExercise} = useExercisesService();

  const reset = React.useCallback(() => {
    setSearchValue('');
  }, [setSearchValue]);

  const handlePressCreateExercise = React.useCallback(() => {
    bottomSheetsShowablePortal.current?.show(
      Modals.CreateExercise,
      CreateExercise,
      {
        onCreate: async name => {
          const [_, err] = await addExercise(name);

          if (err) {
            defaultHandleError(err);
          }
        },
      },
    );
  }, [addExercise, defaultHandleError]);

  return {
    handleChangeSearchValue: setSearchValue,
    handlePressCreateExercise,
    reset,
  };
};

export const useSelectExerciseComponentController = (exerciseId: string) => {
  const {defaultHandleError} = useAppController();
  const {removeExercise} = useExercisesService();

  const handlePressRemoveExercise = React.useCallback(async () => {
    const [_, err] = await removeExercise(exerciseId);

    if (err) {
      defaultHandleError(err);
    }
  }, [removeExercise, defaultHandleError, exerciseId]);

  return {handlePressRemoveExercise};
};
