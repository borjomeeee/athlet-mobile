import {useNavigation} from '@react-navigation/core';
import {useRecoilCallback} from 'recoil';
import {useConfirmDialog} from 'src/Hooks/ConfirmDialog';
import {Modals} from 'src/Navigation/BottomTabs/Trainings/Constructor/Const';
import {
  initialTrainingIdAtom,
  useTrainingConstructorStore,
} from 'src/Navigation/BottomTabs/Trainings/Constructor/Store';
import {useAppController} from 'src/Services/App';
import {useTrainingService} from 'src/Services/Trainings';
import {Logger} from 'src/Utils/Logger';

export const useHeaderOptionsOverlayController = () => {
  const navigation = useNavigation();

  const {removeTraining} = useTrainingService();
  const {switchToEditMode} = useTrainingConstructorStore();
  const {defaultHandleError} = useAppController();

  const {requestConfirm} = useConfirmDialog();

  const handlePressDelete = useRecoilCallback(
    ({get}) =>
      async () => {
        const initialTrainingId = get(initialTrainingIdAtom);
        if (!initialTrainingId) {
          Logger.warn(
            '[training constructor] Failed delete training (Undefined training id)',
          );
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
