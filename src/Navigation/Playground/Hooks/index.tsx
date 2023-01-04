import React from 'react';
import notifee from '@notifee/react-native';
import {
  completedElementsStore,
  completingElementStore,
  currentElementStore,
  currentIndexStore,
  isFinishedStore,
  isStartedStore,
  pauseTimeStore,
  startTimeStore,
  trainingElementsStore,
  trainingIdStore,
  trainingStore,
  usePlaygroundStore,
} from '../Store';
import {useRecoilCallback, useRecoilValue} from 'recoil';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {AppPaths, ModalsPaths} from 'src/Navigation/Paths';
import {useTrainingService} from 'src/Services/Trainings';
import {useAppController} from 'src/Services/App';
import {StackActions} from '@react-navigation/native';
import {useGetRecoilState} from 'src/Utils/Recoil';
import {
  ElementCompletionTypeScheme,
  ElementType,
  ExerciseCompletionType,
} from 'src/Store/Models/Training';
import {useConfirmDialog} from 'src/Hooks/ConfirmDialog';
import {Modals} from '../Const';
import {useModal} from 'src/Lib/ModalRouter';
import {SuccessCompleteTraining} from '../Modals/SuccessCompleteTraining';
import {useTrainingsEventsService} from 'src/Services/TrainingsEvents';
import {v4 as uuidv4} from 'uuid';
import {TrainingUtils} from 'src/Store/ModelsUtils/Training';
import {useTraining} from 'src/Store/Trainings';
import {ExerciseUtils} from 'src/Store/ModelsUtils/Exercise';
import {TimeUtils} from 'src/Store/ModelsUtils/Time';
import dayjs from 'dayjs';
import {Vibration} from 'react-native';
import {updateTrainingNotification} from '../Utils';
import {AccountScreenNavigationProps} from 'src/Navigation/BottomTabs/Account/Types';
import {PlaygroundScreenNavigationProps} from 'src/Navigation/Types';

export const usePlayground = () => {
  const {defaultHandleError} = useAppController();
  const {saveTrainingEvent} = useTrainingsEventsService();
  const {requestConfirm: requestForceCloseConfirm} = useConfirmDialog(
    Modals.ConfirmForceClose,
  );

  const {show: showSuccessCompleteTraining} = useModal(
    Modals.SuccessCompleteTraining,
  );

  const getIsFinished = useGetRecoilState(isFinishedStore);
  const getTraining = useGetRecoilState(trainingStore);
  const getCompletedElements = useGetRecoilState(completedElementsStore);
  const getCompletingElement = useGetRecoilState(completingElementStore);
  const getTrainingElements = useGetRecoilState(trainingElementsStore);
  const getCurrentIndex = useGetRecoilState(currentIndexStore);
  const getStartTime = useGetRecoilState(startTimeStore);
  const getPauseTime = useGetRecoilState(pauseTimeStore);
  const getCurrentElement = useGetRecoilState(currentElementStore);

  const {
    reset,
    setCurrentIndex,
    setCompletingElement,
    setCompletedElements,
    setStartTime,
    setIsFinished,
    setIsStarted,
    resetCompletingElement,
  } = usePlaygroundStore();

  const navigation = useNavigation();

  const exit = React.useCallback(() => {
    console.log('exit');
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  const requestForceClose = React.useCallback(() => {
    return requestForceCloseConfirm({
      title: 'Завершение тренировки',
      description: 'Вы действительно хотите завершить тренировку?',

      acceptText: 'Да, хочу',
      cancelText: 'Отмена',
    });
  }, [requestForceCloseConfirm]);

  const save = React.useCallback(async () => {
    const training = getTraining();
    if (!training) {
      return;
    }

    const completingElement = getCompletingElement();

    const startTime = getStartTime();
    if (!startTime) {
      return;
    }
    const pauseTime = getPauseTime();

    let completedElements = getCompletedElements();

    if (
      completingElement &&
      ((completingElement.type === ElementType.EXERCISE &&
        completingElement.completionType === ExerciseCompletionType.TIME) ||
        completingElement.type === ElementType.REST)
    ) {
      completedElements = [...completedElements, completingElement];
    }

    const [event, e] = await saveTrainingEvent({
      duration: Date.now() - startTime - pauseTime,
      completedElements: TrainingUtils.fromIterable(completedElements),
      initialTraining: {
        id: training.id,
        author: training.author,
        elements: training.elements,
        title: training.title,
      },

      // idempotanceKey: uuidv4(),
    });

    if (e) {
      defaultHandleError(e);
      return;
    } else if (!event) {
      return;
    }

    return event.id;
  }, [
    getCompletingElement,
    getCompletedElements,
    saveTrainingEvent,
    getStartTime,
    getPauseTime,
    getTraining,
    defaultHandleError,
  ]);

  const saveAndClose = React.useCallback(() => {
    setIsFinished(true);
    notifee.stopForegroundService();

    return save();
  }, [setIsFinished, save]);

  const forceClose = React.useCallback(async () => {
    const isConfirmed = await requestForceClose();
    if (isConfirmed) {
      saveAndClose();
    }
  }, [requestForceClose, saveAndClose]);

  const start = React.useCallback(async () => {
    setStartTime(Date.now());
    setIsStarted(true);

    notifee.registerForegroundService(_ => {
      return new Promise(res => {
        updateTrainingNotification(
          'Тренрировка началась',
          'Тренировка началась',
        );
      });
    });

    Vibration.vibrate();
  }, [setStartTime, setIsStarted]);

  const updateNotification = React.useCallback(async () => {
    const completingElement = getCompletingElement();
    const currentElement = getCurrentElement();

    if (
      completingElement?.type === ElementType.EXERCISE &&
      completingElement.completionType !== ExerciseCompletionType.TIME
    ) {
      let value = '';
      if (ExerciseUtils.isRepsExercise(completingElement)) {
        value = `${completingElement.reps} раз.`;
      } else if (ExerciseUtils.isGymExercise(completingElement)) {
        value = `${completingElement.reps} x ${completingElement.kg} кг.`;
      }

      updateTrainingNotification(
        'Идет тренировка',
        `${completingElement.baseExercise.title} - цель ${value}`,
      );
    } else if (
      completingElement?.type === ElementType.EXERCISE &&
      completingElement.completionType === ExerciseCompletionType.TIME
    ) {
      const diffTime = (currentElement as any).time - completingElement.time;

      updateTrainingNotification(
        'Идет тренировка',
        `${completingElement.baseExercise.title}, осталось ${dayjs
          .duration({
            minutes: Math.floor(diffTime / 1000 / 60),
            seconds: (diffTime / 1000) % 60,
          })
          .format('mm:ss')}`,
      );
    } else if (completingElement?.type === ElementType.REST) {
      const diffTime =
        (currentElement as any).duration - completingElement.duration;

      updateTrainingNotification(
        'Идет тренировка',
        `Отдых, осталось ${dayjs
          .duration({
            minutes: Math.floor(diffTime / 1000 / 60),
            seconds: (diffTime / 1000) % 60,
          })
          .format('mm:ss')}`,
      );
    }
  }, [getCompletingElement, getCurrentElement]);

  const goNext = React.useCallback(
    async (vibrate?: boolean) => {
      const isFinished = getIsFinished();
      if (isFinished) {
        return;
      }

      if (vibrate) {
        Vibration.vibrate();
      }

      const currentIndex = getCurrentIndex();
      const elements = getTrainingElements();

      const completingElement = getCompletingElement();
      if (completingElement) {
        setCompletedElements(currElements => [
          ...currElements,
          completingElement,
        ]);
        resetCompletingElement();
      }

      if (currentIndex === elements.length - 1) {
        const id = await saveAndClose();
        showSuccessCompleteTraining(SuccessCompleteTraining, {
          trainingEventId: id!,
        });
      } else {
        setCurrentIndex(i => ++i);
      }
    },
    [
      getCurrentIndex,
      getTrainingElements,
      setCurrentIndex,
      getCompletingElement,
      setCompletedElements,
      saveAndClose,
      showSuccessCompleteTraining,
      resetCompletingElement,
      getIsFinished,
    ],
  );

  return {
    reset,
    exit,
    start,
    goNext,
    setCompletingElement,
    requestForceClose,
    updateNotification,
    forceClose,
    save,
    saveAndClose,
  };
};

export const usePlaygroundNavigationEffect = () => {
  const navigation = useNavigation();
  const route = useRoute<PlaygroundScreenNavigationProps['route']>();

  const {requestForceClose, exit, save} = usePlayground();
  const {setTrainingId} = usePlaygroundStore();

  const getIsStarted = useGetRecoilState(isStartedStore);
  const getIsFinished = useGetRecoilState(isFinishedStore);

  const isFinished = useRecoilValue(isFinishedStore);

  React.useEffect(() => {
    setTrainingId(route.params?.trainingId);
  }, [route, setTrainingId]);

  React.useEffect(() => {
    const callback = async (e: any) => {
      const isStarted = getIsStarted();
      const _isFinished = getIsFinished();

      if (!isStarted || _isFinished) {
        return;
      }

      e.preventDefault();

      const isConfirmed = await requestForceClose();
      if (isConfirmed) {
        save();
        navigation.dispatch(e.data.action);
      }
    };

    navigation.addListener('beforeRemove', callback);
    return () => navigation.removeListener('beforeRemove', callback);
  }, [navigation, save, getIsStarted, getIsFinished, requestForceClose]);

  React.useEffect(() => {
    if (isFinished) {
      exit();
    }
  }, [exit, isFinished]);
};

export const usePlaygroundInitialTraining = () => {
  const {loadTraining} = useTrainingService();
  const {setTraining} = usePlaygroundStore();

  const {defaultHandleError} = useAppController();
  const trainingId = useRecoilValue(trainingIdStore);

  const {training} = useTraining(trainingId);

  React.useEffect(() => {
    if (training) {
      setTraining(training);
    }
  }, [training, setTraining]);

  // React.useEffect(() => {
  //   async function _loadTraining() {
  //     if (trainingId) {
  //       const [training, err] = await loadTraining(trainingId);

  //       if (err) {
  //         defaultHandleError(err);
  //         return;
  //       } else if (training) {
  //         // setTraining(training);
  //       }
  //     }
  //   }
  //   _loadTraining();
  // }, [trainingId, loadTraining, defaultHandleError, setTraining]);
};
