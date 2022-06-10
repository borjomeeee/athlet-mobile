import React from 'react';
import {
  completedElementsStore,
  completingElementStore,
  currentIndexStore,
  isStartedStore,
  pauseTimeStore,
  startTimeStore,
  trainingElementsStore,
  trainingIdStore,
  trainingStore,
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
import {useModal} from 'src/Lib/ModalRouter';
import {SuccessCompleteTraining} from '../Modals/SuccessCompleteTraining';
import {useTrainingsEventsService} from 'src/Services/TrainingsEvents';
import {v4 as uuidv4} from 'uuid';
import {TrainingUtils} from 'src/Store/ModelsUtils/Training';

export const usePlayground = () => {
  const {saveTrainingEvent} = useTrainingsEventsService();
  const {requestConfirm: requestForceCloseConfirm} = useConfirmDialog(
    Modals.ConfirmForceClose,
  );

  const {show: showSuccessCompleteTraining} = useModal(
    Modals.SuccessCompleteTraining,
  );

  const getTraining = useGetRecoilState(trainingStore);
  const getCompletedElements = useGetRecoilState(completedElementsStore);
  const getCompletingElement = useGetRecoilState(completingElementStore);
  const getTrainingElements = useGetRecoilState(trainingElementsStore);
  const getCurrentIndex = useGetRecoilState(currentIndexStore);
  const getStartTime = useGetRecoilState(startTimeStore);
  const getPauseTime = useGetRecoilState(pauseTimeStore);

  const {
    reset,
    setCurrentIndex,
    setCompletingElement,
    setCompletedElements,
    setStartTime,
    setIsStarted,
    resetCompletingElement,
  } = usePlaygroundStore();

  const navigation = useNavigation();

  const exit = React.useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.dispatch(StackActions.replace(AppPaths.BottomTab));
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

  const save = React.useCallback(() => {
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

    saveTrainingEvent({
      id: uuidv4(),

      duration: Date.now() - startTime - pauseTime,
      completedElements: TrainingUtils.fromIterable(completedElements),
      initialTraining: {
        id: training.id,
        author: training.author,
        elements: training.elements,
        title: training.title,
      },
    });
  }, [
    getCompletingElement,
    getCompletedElements,
    saveTrainingEvent,
    getStartTime,
    getPauseTime,
    getTraining,
  ]);

  const saveAndClose = React.useCallback(() => {
    setIsStarted(false);

    // bug: navigation back called before isStarted value assigned
    setTimeout(() => {
      save();
      exit();
    }, 0);
  }, [setIsStarted, save, exit]);

  const forceClose = React.useCallback(async () => {
    const isConfirmed = await requestForceClose();
    if (isConfirmed) {
      saveAndClose();
    }
  }, [requestForceClose, saveAndClose]);

  const start = React.useCallback(() => {
    setStartTime(Date.now());
    setIsStarted(true);
  }, [setStartTime, setIsStarted]);

  const goNext = React.useCallback(() => {
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
      saveAndClose();
      showSuccessCompleteTraining(SuccessCompleteTraining, {});
    } else {
      setCurrentIndex(i => ++i);
    }
  }, [
    getCurrentIndex,
    getTrainingElements,
    setCurrentIndex,
    getCompletingElement,
    setCompletedElements,
    saveAndClose,
    showSuccessCompleteTraining,
    resetCompletingElement,
  ]);

  return {
    reset,
    exit,
    start,
    goNext,
    setCompletingElement,
    requestForceClose,
    forceClose,
    save,
    saveAndClose,
  };
};

type ProfileScreenRouteProp = RouteProp<
  ModalsGroupParamList,
  ModalsPaths.Playground
>;

export const usePlaygroundNavigationEffect = () => {
  const navigation = useNavigation();
  const route = useRoute<ProfileScreenRouteProp>();

  const {requestForceClose, save} = usePlayground();
  const {setTrainingId} = usePlaygroundStore();

  const getIsStarted = useGetRecoilState(isStartedStore);

  React.useEffect(() => {
    const params = route.params;

    if (params?.trainingId) {
      setTrainingId(params?.trainingId);
    }
  }, [route, setTrainingId]);

  React.useEffect(() => {
    const callback = async (e: any) => {
      const isStarted = getIsStarted();
      if (!isStarted) {
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
  }, [navigation, save, getIsStarted, requestForceClose]);
};

export const usePlaygroundInitialTraining = () => {
  const {loadTraining} = useTrainingService();
  const {setTraining} = usePlaygroundStore();

  const {defaultHandleError} = useAppController();
  const trainingId = useRecoilValue(trainingIdStore);

  React.useEffect(() => {
    async function _loadTraining() {
      if (trainingId) {
        const [training, err] = await loadTraining(trainingId);

        if (err) {
          defaultHandleError(err);
          return;
        } else if (training) {
          // setTraining(training);
        }
      }
    }
    _loadTraining();
  }, [trainingId, loadTraining, defaultHandleError, setTraining]);
};
