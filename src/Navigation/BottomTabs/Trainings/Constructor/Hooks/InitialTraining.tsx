import React from 'react';
import {useRecoilValue} from 'recoil';
import {useAppController} from 'src/Services/App';
import {useTrainingService} from 'src/Services/Trainings';
import {useTrainingConstructorController} from '.';
import {initialTrainingIdAtom} from '../Store';

export const useTrainingConstructorInitialTraining = () => {
  const {loadTraining} = useTrainingService();
  const {setInitialTraining} = useTrainingConstructorController();

  const {defaultHandleError} = useAppController();
  const initialTrainingId = useRecoilValue(initialTrainingIdAtom);

  React.useEffect(() => {
    async function _loadTraining() {
      if (initialTrainingId) {
        const [training, err] = await loadTraining(initialTrainingId);

        if (err) {
          defaultHandleError(err);
          return;
        } else if (training) {
          // setInitialTraining(training);
        }
      }
    }
    _loadTraining();
  }, [initialTrainingId, loadTraining, defaultHandleError, setInitialTraining]);
};
