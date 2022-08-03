import {useRecoilCallback} from 'recoil';
import {useAppController} from 'src/Services/App';
import {useTrainingService, useTrainingsService} from 'src/Services/Trainings';
import {useTrainingConstructorController} from '../../Controller';

import {
  constructorElementsSelector,
  initialTrainingIdAtom,
  screenTrainingTitleAtom,
  useTrainingConstructorStore,
} from '../../Store';

export const useSubmitController = () => {
  const {switchToViewMode} = useTrainingConstructorStore();
  const {initWithTrainingId} = useTrainingConstructorController();

  const {createTraining} = useTrainingsService();
  const {updateTraining} = useTrainingService();
  const {defaultHandleError} = useAppController();

  const handlePressCreateTraining = useRecoilCallback(
    ({get}) =>
      async () => {
        if (!get(screenTrainingTitleAtom)) {
          return;
        }

        const [createdTrainingId, err] = await createTraining(
          {
            title: get(screenTrainingTitleAtom),
            elements: get(constructorElementsSelector),
          },
          () => undefined,
        );

        if (err) {
          defaultHandleError(err);
        } else if (createdTrainingId) {
          initWithTrainingId(createdTrainingId);
        }
      },
    [defaultHandleError, createTraining, initWithTrainingId],
  );

  const handlePressUpdateTraining = useRecoilCallback(
    ({get}) =>
      async () => {
        const trainingId = get(initialTrainingIdAtom);
        if (!trainingId || !get(screenTrainingTitleAtom)) {
          return;
        }

        const [_, err] = await updateTraining(
          trainingId,
          {
            title: get(screenTrainingTitleAtom),
            elements: get(constructorElementsSelector),
          },
          () => undefined,
        );

        if (err) {
          defaultHandleError(err);
        } else {
          switchToViewMode();
        }
      },
    [defaultHandleError, updateTraining, switchToViewMode],
  );

  return {handlePressCreateTraining, handlePressUpdateTraining};
};
