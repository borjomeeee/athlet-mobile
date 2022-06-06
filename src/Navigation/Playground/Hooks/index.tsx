import React from 'react';
import {
  completingElementStore,
  currentIndexStore,
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

export const usePlayground = () => {
  const getCompletingElement = useGetRecoilState(completingElementStore);

  const {reset, setCompletedElements, setStartTime} = usePlaygroundStore();
  const navigation = useNavigation();

  const saveCurrent = React.useCallback(() => {
    const completingElement = getCompletingElement();
    if (completingElement) {
      setCompletedElements(completedElements => [
        ...completedElements,
        completingElement,
      ]);
    }
  }, [setCompletedElements, getCompletingElement]);

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

  const getTrainingElements = useGetRecoilState(trainingElementsStore);
  const getCurrentIndex = useGetRecoilState(currentIndexStore);

  const {setCurrentIndex, setCompletingElement} = usePlaygroundStore();

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

  return {reset, exit, start, goNext, setCompletingElement};
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
