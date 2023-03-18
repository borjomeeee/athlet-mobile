import React from 'react';

import {OverlayRef} from 'src/Lib/Overlay/Types';
import {useShowableInstance} from 'src/Lib/ShowablePortal/Hooks/useShowableInstance';
import {useAppController} from 'src/Services/App';
import {useExercisesService} from 'src/Services/Exercises';
import {Exercise} from 'src/Store/Models/Training';
import {SelectExerciseProps} from '../../Types';

export const useExerciseController = (modalId: string, exercise: Exercise) => {
  const overlayRef = React.useRef<OverlayRef>(null);

  const {defaultHandleError} = useAppController();
  const {removeExercise} = useExercisesService();

  const {close, props} = useShowableInstance<SelectExerciseProps>();

  const handlePress = React.useCallback(() => {
    props.onSelect?.(exercise);
    close();
  }, [props, close, exercise]);

  const handleLongPress = React.useCallback(() => {
    overlayRef.current?.show();
  }, []);

  const handlePressRemove = React.useCallback(async () => {
    const [_, err] = await removeExercise(exercise.id);

    if (err) {
      defaultHandleError(err);
    }
  }, [exercise, defaultHandleError, removeExercise]);

  return {overlayRef, handlePress, handleLongPress, handlePressRemove};
};
