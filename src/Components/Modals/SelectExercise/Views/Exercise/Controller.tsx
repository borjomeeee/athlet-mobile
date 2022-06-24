import React from 'react';

import {useModal, useModalProps} from 'src/Lib/ModalRouter';
import {OverlayRef} from 'src/Lib/Overlay/Types';
import {useAppController} from 'src/Services/App';
import {useExercisesService} from 'src/Services/Exercises';
import {Exercise} from 'src/Store/Models/Training';

export const useExerciseController = (modalId: string, exercise: Exercise) => {
  const overlayRef = React.useRef<OverlayRef>(null);

  const {defaultHandleError} = useAppController();
  const {removeExercise} = useExercisesService();

  const {hide} = useModal(modalId);
  const {props} =
    useModalProps<{onSelect: (exercise: Exercise) => void}>(modalId);

  const handlePress = React.useCallback(() => {
    props.onSelect?.(exercise);
    hide();
  }, [props, hide, exercise]);

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
