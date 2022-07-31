import React from 'react';

import {initialTrainingIdAtom, useTrainingConstructorStore} from '../../Store';

import {useTrainingService} from 'src/Services/Trainings';
import {useNavigation} from '@react-navigation/core';
import {useAppController} from 'src/Services/App';
import {useConfirmDialog} from 'src/Hooks/ConfirmDialog';
import {Modals} from '../../Const';
import {useTrainingConstructorChangesController} from '../../Hooks/Changes';
import {useRecoilCallback} from 'recoil';

export const useHeaderOptionsController = () => {
  const {switchToViewMode} = useTrainingConstructorStore();
  const {hasTrainingChanged, requestResetChanges} =
    useTrainingConstructorChangesController();

  const handlePressCancelEditingMode = React.useCallback(async () => {
    const isChanged = hasTrainingChanged();

    if (isChanged) {
      const isConfirmed = await requestResetChanges();

      if (isConfirmed) {
        switchToViewMode();
      }
    } else {
      switchToViewMode();
    }
  }, [hasTrainingChanged, requestResetChanges, switchToViewMode]);

  return {handlePressCancelEditingMode};
};

export const useHeaderOptionsOverlayController = () => {
  const navigation = useNavigation();

  const {removeTraining} = useTrainingService();
  const {switchToEditMode} = useTrainingConstructorStore();
  const {defaultHandleError} = useAppController();

  const {requestConfirm} = useConfirmDialog(Modals.ConfirmDelete);

  const handlePressDelete = useRecoilCallback(
    ({get}) =>
      async () => {
        const initialTrainingId = get(initialTrainingIdAtom);
        if (!initialTrainingId) {
          return;
        }

        const isConfirmed = await requestConfirm({
          title: 'Удаление тренировки',
          description: 'Вы действительно хотите удалить тренировку?',

          acceptText: 'Да, хочу',
          cancelText: 'Отмена',
        });

        if (!isConfirmed) {
          return;
        }

        const [_, err] = await removeTraining(
          initialTrainingId,
          () => undefined,
        );
        if (err) {
          defaultHandleError(err);
        } else {
          navigation.goBack();
        }
      },
    [defaultHandleError, removeTraining, requestConfirm, navigation],
  );

  return {handlePressGoToEditMode: switchToEditMode, handlePressDelete};
};
