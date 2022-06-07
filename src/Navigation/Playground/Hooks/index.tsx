import React from 'react';
import {
  completingElementStore,
  currentIndexStore,
  startTimeStore,
  trainingElementsStore,
  trainingIdStore,
  usePlaygroundStore,
} from '../Store';
import {useRecoilValue} from 'recoil';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {AppPaths, ModalsPaths} from 'src/Navigation/Paths';
import {ModalsGroupParamList} from 'src/Navigation';
import {useTrainingService} from 'src/Services/Trainings';
import {useAppController} from 'src/Services/App';
import {StackActions} from '@react-navigation/native';
import {useGetRecoilState} from 'src/Utils/Recoil';
import {ElementType, ExerciseCompletionType} from 'src/Store/Models/Training';
import {useConfirmDialog} from 'src/Hooks/ConfirmDialog';
import {Modals} from '../Const';

export const usePlayground = () => {
  const {requestConfirm: requestForceCloseConfirm} = useConfirmDialog(
    Modals.ConfirmForceClose,
  );

  const getCompletingElement = useGetRecoilState(completingElementStore);
  const getTrainingElements = useGetRecoilState(trainingElementsStore);
  const getCurrentIndex = useGetRecoilState(currentIndexStore);

  const {
    reset,
    setCompletedElements,
    setCurrentIndex,
    setCompletingElement,
    resetCompletingElement,
    setStartTime,
  } = usePlaygroundStore();

  const navigation = useNavigation();
  const saveCurrent = React.useCallback(() => {
    const completingElement = getCompletingElement();
    if (completingElement) {
      setCompletedElements(completedElements => [
        ...completedElements,
        completingElement,
      ]);
      resetCompletingElement();
    }
  }, [setCompletedElements, resetCompletingElement, getCompletingElement]);

  const exit = React.useCallback(() => {
    const completingElement = getCompletingElement();

    if (
      completingElement &&
      completingElement.type === ElementType.EXERCISE &&
      completingElement.completionType === ExerciseCompletionType.TIME
    ) {
      saveCurrent();
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.dispatch(StackActions.replace(AppPaths.BottomTab));
    }
  }, [getCompletingElement, saveCurrent, navigation]);

  const requestForceClose = React.useCallback(() => {
    return requestForceCloseConfirm({
      title: 'Завершение тренировки',
      description: 'Вы действительно хотите завершить тренировку?',

      acceptText: 'Да, хочу',
      cancelText: 'Отмена',
    });
  }, [requestForceCloseConfirm]);

  const forceClose = React.useCallback(async () => {
    const isConfirmed = await requestForceClose();
    if (isConfirmed) {
      exit();
    }
  }, [requestForceClose, exit]);

  const start = React.useCallback(() => {
    setStartTime(Date.now());
  }, [setStartTime]);

  const goNext = React.useCallback(() => {
    const currentIndex = getCurrentIndex();
    const elements = getTrainingElements();

    saveCurrent();

    if (currentIndex === elements.length - 1) {
      exit();
    } else {
      setCurrentIndex(i => ++i);
    }
  }, [
    getCurrentIndex,
    getTrainingElements,
    setCurrentIndex,
    saveCurrent,
    exit,
  ]);

  return {
    reset,
    exit,
    start,
    goNext,
    setCompletingElement,
    requestForceClose,
    forceClose,
  };
};

type ProfileScreenRouteProp = RouteProp<
  ModalsGroupParamList,
  ModalsPaths.Playground
>;

export const usePlaygroundNavigationEffect = () => {
  const navigation = useNavigation();
  const route = useRoute<ProfileScreenRouteProp>();

  const {requestForceClose} = usePlayground();
  const {setTrainingId} = usePlaygroundStore();
  const getStartTime = useGetRecoilState(startTimeStore);

  React.useEffect(() => {
    const params = route.params;

    if (params?.trainingId) {
      setTrainingId(params?.trainingId);
    }
  }, [route, setTrainingId]);

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', async e => {
        // Training was started
        const isStarted = !!getStartTime();
        if (!isStarted) {
          return;
        }

        e.preventDefault();

        const isConfirmed = await requestForceClose();
        if (isConfirmed) {
          navigation.dispatch(e.data.action);
        }
      }),
    [navigation, getStartTime, requestForceClose],
  );
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
