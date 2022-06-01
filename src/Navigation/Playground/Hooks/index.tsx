import React from 'react';
import {counterStore, trainingIdStore, usePlaygroundStore} from '../Store';
import {useRecoilValue} from 'recoil';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {AppPaths, ModalsPaths} from 'src/Navigation/Paths';
import {ModalsGroupParamList} from 'src/Navigation';
import {useTrainingService} from 'src/Services/Trainings';
import {useAppController} from 'src/Services/App';
import {StackActions} from '@react-navigation/native';

export const usePlayground = () => {
  const {reset} = usePlaygroundStore();
  const navigation = useNavigation();

  const exit = React.useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.dispatch(StackActions.replace(AppPaths.BottomTab));
    }
  }, [navigation]);

  return {reset, exit};
};

export const usePlaygroundCountdown = () => {
  const countdownRef = React.useRef<NodeJS.Timer | null>(null);

  const counter = useRecoilValue(counterStore);
  const {setCounter, setStartTime} = usePlaygroundStore();

  const start = React.useCallback(() => {
    if (!countdownRef.current) {
      countdownRef.current = setInterval(() => {
        setCounter(i => --i);
      }, 1000);
    }
  }, [setCounter]);

  const end = React.useCallback(() => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
  }, []);

  React.useEffect(() => {
    start();
    return () => end();
  }, [start, end]);

  React.useEffect(() => {
    if (counter === 0) {
      setStartTime(Date.now());
      end();
    }
  }, [counter, setStartTime, end]);
};

type ProfileScreenRouteProp = RouteProp<
  ModalsGroupParamList,
  ModalsPaths.Playground
>;

export const usePlaygroundNavigationEffect = () => {
  const route = useRoute<ProfileScreenRouteProp>();

  const {setTrainingId} = usePlaygroundStore();

  React.useEffect(() => {
    const params = route.params;

    if (params?.trainingId) {
      setTrainingId(params?.trainingId);
    }
  }, [route, setTrainingId]);
};

export const usePlaygroundInitialTraining = () => {
  const {loadTrainingById} = useTrainingService();
  const {setTraining} = usePlaygroundStore();

  const {defaultHandleError} = useAppController();
  const trainingId = useRecoilValue(trainingIdStore);

  React.useEffect(() => {
    async function loadTraining() {
      if (trainingId) {
        const [training, err] = await loadTrainingById(trainingId);

        if (err) {
          defaultHandleError(err);
          return;
        } else if (training) {
          setTraining(training);
        }
      }
    }
    loadTraining();
  }, [trainingId, loadTrainingById, defaultHandleError, setTraining]);
};
