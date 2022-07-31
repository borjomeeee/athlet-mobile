import React from 'react';
import {useRecoilCallback} from 'recoil';
import {useConfirmDialog} from 'src/Hooks/ConfirmDialog';
import {TrainingUtils} from 'src/Store/ModelsUtils/Training';
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

  const hasTrainingChanged = useRecoilCallback(
    ({get}) =>
      () => {
        if (!get(isEditingSelector)) {
          return false;
        }

        const initialTraining = get(initialTrainingAtom);
        if (!initialTraining) {
          return false;
        }

        if (
          TrainingUtils.equals(
            {
              title: get(screenTrainingTitleAtom),
              elements: get(constructorElementsSelector),
            },
            initialTraining,
          )
        ) {
          return false;
        }

        return true;
      },
    [],
  );

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
