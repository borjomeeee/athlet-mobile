import React from 'react';
import {useTrainingConstructorChangesController} from '../../../Hooks';
import {
  initialTrainingIdAtom,
  useTrainingConstructorStore,
} from '../../../Store';

import * as UI from 'src/Components';
import {useModal} from 'src/Lib/ModalRouter';
import {useTrainingsService} from 'src/Services/Trainings';
import {useGetRecoilState} from 'src/Utils/Recoil';
import {useNavigation} from '@react-navigation/core';
import {useAppController} from 'src/Services/App';

export const useHeaderOptionsController = () => {
  const {swithToViewMode} = useTrainingConstructorStore();
  const {hasTrainingChanged, requestResetChanges} =
    useTrainingConstructorChangesController();

  const handlePressCancelEditingMode = React.useCallback(async () => {
    const isChanged = hasTrainingChanged();

    if (isChanged) {
      const isConfirmed = await requestResetChanges();

      if (isConfirmed) {
        swithToViewMode();
      }
    } else {
      swithToViewMode();
    }
  }, [hasTrainingChanged, requestResetChanges, swithToViewMode]);

  return {handlePressCancelEditingMode};
};

export const useHeaderOptionsOverlayController = () => {
  const navigation = useNavigation();

  const {removeTraining} = useTrainingsService();
  const {switchToEditMode} = useTrainingConstructorStore();
  const {defaultHandleError} = useAppController();

  const getTrainingId = useGetRecoilState(initialTrainingIdAtom);

  const {show: showConfirmDelete} = useModal(
    'trainingConstructor__deleteTraining',
  );

  const requestDeleteTraining = React.useCallback(() => {
    return new Promise<boolean>(res => {
      showConfirmDelete(UI.ConfirmDialog, {
        title: 'Удаление тренировки',
        description: 'Вы действительно хотите удалить тренировку?',

        acceptText: 'Да, хочу',
        cancelText: 'Отмена',

        onAccept: () => {
          res(true);
        },
        onCancel: () => {
          res(false);
        },
      });
    });
  }, [showConfirmDelete]);

  const handlePressGoToEditMode = React.useCallback(() => {
    switchToEditMode();
  }, [switchToEditMode]);

  const handlePressDelete = React.useCallback(async () => {
    const initialTrainingId = getTrainingId();
    if (!initialTrainingId) {
      return;
    }

    const isConfirmed = await requestDeleteTraining();

    if (!isConfirmed) {
      return;
    }

    const [_, err] = await removeTraining(initialTrainingId);
    if (err) {
      defaultHandleError(err);
    } else {
      navigation.goBack();
    }
  }, [
    defaultHandleError,
    requestDeleteTraining,
    removeTraining,
    getTrainingId,
    navigation,
  ]);

  return {handlePressGoToEditMode, handlePressDelete};
};
