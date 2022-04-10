import React from 'react';
import {useRecoilValue} from 'recoil';
import {useAppController} from 'src/Services/App';
import {useTrainingsService} from 'src/Services/Trainings';
import {
  trainingElementsStore,
  trainingIdStore,
  trainingTitleStore,
} from '../../../Store';

export const useSubmitController = () => {
  const trainingId = useRecoilValue(trainingIdStore);

  const trainingTitle = useRecoilValue(trainingTitleStore);
  const trainingElements = useRecoilValue(trainingElementsStore);

  const {createTraining, updateTraining} = useTrainingsService();
  const {defaultHandleError} = useAppController();

  const handlePressCreateTraining = React.useCallback(async () => {
    const [_, err] = await createTraining({
      title: trainingTitle,
      elements: trainingElements,
    });

    if (err) {
      defaultHandleError(err);
    }
  }, [defaultHandleError, createTraining, trainingTitle, trainingElements]);

  const handlePressUpdateTraining = React.useCallback(async () => {
    if (!trainingId) {
      return;
    }

    const [_, err] = await updateTraining(trainingId, {
      title: trainingTitle,
      elements: trainingElements,
    });

    if (err) {
      defaultHandleError(err);
    }
  }, [
    trainingId,
    defaultHandleError,
    updateTraining,
    trainingTitle,
    trainingElements,
  ]);

  return {handlePressCreateTraining, handlePressUpdateTraining};
};
