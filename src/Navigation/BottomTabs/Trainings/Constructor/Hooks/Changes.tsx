import React from 'react';
import {useConfirmDialog} from 'src/Hooks/ConfirmDialog';
import {TrainingUtils} from 'src/Store/ModelsUtils/Training';
import {useGetRecoilState} from 'src/Utils/Recoil';
import {Modals} from '../Const';
import {
  constructorElementsSelector,
  initialTrainingAtom,
  isEditingSelector,
  screenTrainingTitleAtom,
} from '../Store';

export const useTrainingConstructorChangesController = () => {
  const {requestConfirm: requestResetConfirm} = useConfirmDialog(
    Modals.ConfirmResetChanges,
  );

  const getConstructorTrainingTitle = useGetRecoilState(
    screenTrainingTitleAtom,
  );
  const getConstructorElements = useGetRecoilState(constructorElementsSelector);
  const getInitialTraining = useGetRecoilState(initialTrainingAtom);

  const getIsEditing = useGetRecoilState(isEditingSelector);

  const hasTrainingChanged = React.useCallback(() => {
    if (!getIsEditing()) {
      return false;
    }

    const initialTraining = getInitialTraining();
    const constructorTrainingTitle = getConstructorTrainingTitle();
    const constructorElements = getConstructorElements();

    if (!initialTraining) {
      return false;
    }

    if (
      TrainingUtils.equals(
        {
          title: constructorTrainingTitle,
          elements: constructorElements,
        },
        initialTraining,
      )
    ) {
      return false;
    }

    return true;
  }, [
    getConstructorTrainingTitle,
    getConstructorElements,
    getInitialTraining,
    getIsEditing,
  ]);

  const requestResetChanges = React.useCallback(() => {
    return requestResetConfirm({
      title: 'Отмена создания тренировки',
      description:
        'Вы действительно хотите выйти из режима создания тренировки?',

      acceptText: 'Да, хочу',
      cancelText: 'Отмена',
    });
  }, [requestResetConfirm]);

  return {requestResetChanges, hasTrainingChanged};
};
