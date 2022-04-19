import React from 'react';
import {useRecoilValue} from 'recoil';
import {useAppController} from 'src/Services/App';
import {useTrainingsService} from 'src/Services/Trainings';
import {useGetRecoilState} from 'src/Utils/Recoil';
import {
  constructorElementsSelector,
  trainingIdAtom,
  currentTrainingTitleSelector,
} from '../../../Store';

export const useSubmitController = () => {
  const getTrainingId = useGetRecoilState(trainingIdAtom);

  const getTrainingTitle = useGetRecoilState(currentTrainingTitleSelector);
  const getElements = useGetRecoilState(constructorElementsSelector);

  const {createTraining, updateTraining} = useTrainingsService();
  const {defaultHandleError} = useAppController();

  const handlePressCreateTraining = React.useCallback(async () => {
    const trainingTitle = getTrainingTitle();
    const elements = getElements();

    const [_, err] = await createTraining({
      title: trainingTitle,
      elements: elements,
    });

    if (err) {
      defaultHandleError(err);
    }
  }, [defaultHandleError, createTraining, getTrainingTitle, getElements]);

  const handlePressUpdateTraining = React.useCallback(async () => {
    const trainingId = getTrainingId();

    const trainingTitle = getTrainingTitle();
    const elements = getElements();

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
  }, [
    getTrainingId,
    defaultHandleError,
    updateTraining,
    getTrainingTitle,
    getElements,
  ]);

  return {handlePressCreateTraining, handlePressUpdateTraining};
};
