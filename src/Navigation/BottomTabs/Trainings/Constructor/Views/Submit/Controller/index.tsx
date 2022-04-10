import React from 'react';
import {useRecoilValue} from 'recoil';
import {useAppController} from 'src/Services/App';
import {useTrainingsService} from 'src/Services/Trainings';
import {
  constructorElementsSelector,
  trainingIdAtom,
  currentTrainingTitleSelector,
} from '../../../Store';

export const useSubmitController = () => {
  const trainingId = useRecoilValue(trainingIdAtom);

  const trainingTitle = useRecoilValue(currentTrainingTitleSelector);
  const elements = useRecoilValue(constructorElementsSelector);

  const {createTraining, updateTraining} = useTrainingsService();
  const {defaultHandleError} = useAppController();

  const handlePressCreateTraining = React.useCallback(async () => {
    const [_, err] = await createTraining({
      title: trainingTitle,
      elements: elements,
    });

    if (err) {
      defaultHandleError(err);
    }
  }, [defaultHandleError, createTraining, trainingTitle, elements]);

  const handlePressUpdateTraining = React.useCallback(async () => {
    if (!trainingId) {
      return;
    }

    const [_, err] = await updateTraining(trainingId, {
      title: trainingTitle,
      elements: elements,
    });

    if (err) {
      defaultHandleError(err);
    }
  }, [trainingId, defaultHandleError, updateTraining, trainingTitle, elements]);

  return {handlePressCreateTraining, handlePressUpdateTraining};
};
