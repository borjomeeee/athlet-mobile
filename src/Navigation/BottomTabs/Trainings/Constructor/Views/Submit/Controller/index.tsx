import React from 'react';
import {useAppController} from 'src/Services/App';
import {useTrainingService, useTrainingsService} from 'src/Services/Trainings';
import {useGetRecoilState} from 'src/Utils/Recoil';
import {useTrainingConstructorController} from '../../../Hooks';
import {
  constructorElementsSelector,
  initialTrainingIdAtom,
  screenTrainingTitleAtom,
  useTrainingConstructorStore,
} from '../../../Store';

export const useSubmitController = () => {
  const getTrainingId = useGetRecoilState(initialTrainingIdAtom);

  const getTrainingTitle = useGetRecoilState(screenTrainingTitleAtom);
  const getElements = useGetRecoilState(constructorElementsSelector);

  const {swithToViewMode} = useTrainingConstructorStore();
  const {initWithTrainingId} = useTrainingConstructorController();

  const {createTraining} = useTrainingsService();
  const {updateTraining} = useTrainingService();
  const {defaultHandleError} = useAppController();

  const handlePressCreateTraining = React.useCallback(async () => {
    const trainingTitle = getTrainingTitle();
    const elements = getElements();

    if (!trainingTitle) {
      return;
    }

    const [createdTraining, err] = await createTraining({
      title: trainingTitle,
      elements: elements,
    });

    if (err) {
      defaultHandleError(err);
    } else if (createdTraining) {
      initWithTrainingId(createdTraining.id);
    }
  }, [
    defaultHandleError,
    createTraining,
    getTrainingTitle,
    getElements,
    initWithTrainingId,
  ]);

  const handlePressUpdateTraining = React.useCallback(async () => {
    const trainingId = getTrainingId();

    const trainingTitle = getTrainingTitle();
    const elements = getElements();

    if (!trainingId || !trainingTitle) {
      return;
    }

    const [_, err] = await updateTraining(trainingId, {
      title: trainingTitle,
      elements: elements,
    });

    if (err) {
      defaultHandleError(err);
    } else {
      swithToViewMode();
    }
  }, [
    getTrainingId,
    defaultHandleError,
    updateTraining,
    getTrainingTitle,
    getElements,
    swithToViewMode,
  ]);

  return {handlePressCreateTraining, handlePressUpdateTraining};
};
