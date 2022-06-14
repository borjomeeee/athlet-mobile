import React from 'react';
import {useRecoilValue} from 'recoil';
import {useAppController} from 'src/Services/App';
import {useTrainingService} from 'src/Services/Trainings';
import {useTrainingConstructorController} from '../Controller';
import {initialTrainingIdAtom} from '../Store';
import {useTraining} from 'src/Store/Trainings';

export const useTrainingConstructorInitialTraining = () => {
  const {loadTraining} = useTrainingService();
  const {setInitialTraining} = useTrainingConstructorController();

  const {defaultHandleError} = useAppController();
  const initialTrainingId = useRecoilValue(initialTrainingIdAtom);

  const {training} = useTraining(initialTrainingId);

  React.useEffect(() => {
    if (training) {
      setInitialTraining(training);
    }
  }, [training, setInitialTraining]);

  // React.useEffect(() => {
  //   async function _loadTraining() {
  //     if (initialTrainingId) {
  //       const [training, err] = await loadTraining(initialTrainingId);

  //       if (err) {
  //         defaultHandleError(err);
  //         return;
  //       } else if (training) {
  //         // setInitialTraining(training);
  //       }
  //     }
  //   }
  //   _loadTraining();
  // }, [initialTrainingId, loadTraining, defaultHandleError, setInitialTraining]);
};
