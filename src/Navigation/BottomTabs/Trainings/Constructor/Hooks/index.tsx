import React from 'react';

import {useNavigation, useRoute} from '@react-navigation/core';

import {
  useTrainingConstructorStore,
  useTrainingConstructorHistoryStore,
  constructorElementsSelector,
  currentTrainingSelector,
  screenTrainingTitleAtom,
} from '../Store';
import {RouteProp} from '@react-navigation/native';
import {TrainingsStackParamList} from '../../index';
import {BottomTabTrainingsPaths} from 'src/Navigation/Paths';
import {HeaderOptions} from '../Views/HeaderOptions';
import {useModal} from 'src/Lib/ModalRouter';
import {AddElementBottomSheet} from '../Views/AddElementBottomSheet';
import {Modals} from '../Const';
import {ScreenState} from '../Store/Types';
import {ConfirmResetChanges} from '../Modals/ConfirmResetChanges';
import {BackButton} from '../Views/BackButton';
import {useRecoilValue} from 'recoil';
import {TrainingUtils} from 'src/Store/ModelsUtils/Training';

export const useTrainingConstructorController = () => {
  const {
    setTitle,
    resetTitle,
    resetTrainingId,
    resetScreenState,
    resetHistory,
    setScreenState,
    setTrainingId,
  } = useTrainingConstructorStore();
  const {reorder} = useTrainingConstructorHistoryStore();
  const {show: showAddElement} = useModal(Modals.AddElement);

  const handlePressAddElement = React.useCallback(() => {
    showAddElement(AddElementBottomSheet, {});
  }, [showAddElement]);

  const handleChangeTitle = React.useCallback(
    (newTitle: string) => {
      setTitle(newTitle);
    },
    [setTitle],
  );

  const reset = React.useCallback(() => {
    resetTitle();
    resetTrainingId();
    resetScreenState();
    resetHistory();
  }, [resetTitle, resetTrainingId, resetScreenState, resetHistory]);

  const initWithTraining = React.useCallback(
    (trainingId: string) => {
      setScreenState(ScreenState.VIEWING);
      setTrainingId(trainingId);
    },
    [setScreenState, setTrainingId],
  );

  return {
    handlePressAddElement,
    handleChangeTitle,
    reorder,
    initWithTraining,
    reset,
  };
};

export const useTrainingConstructorChangesController = () => {
  const {resetHistory, resetTitle} = useTrainingConstructorStore();
  const {show: showConfirmResetChanges} = useModal(Modals.ConfirmResetChanges);

  const constructorTrainingTitle = useRecoilValue(screenTrainingTitleAtom);
  const constructorElements = useRecoilValue(constructorElementsSelector);
  const currentTraining = useRecoilValue(currentTrainingSelector);

  const requestResetChanges = React.useCallback(() => {
    return new Promise<boolean>(res => {
      if (!currentTraining) {
        return res(true);
      }

      if (
        TrainingUtils.equals(
          {
            title: constructorTrainingTitle,
            elements: constructorElements,
          },
          currentTraining,
        )
      ) {
        return res(true);
      }

      showConfirmResetChanges(ConfirmResetChanges, {
        onAccept: () => {
          resetTitle();
          resetHistory();

          res(true);
        },
        onCancel: () => {
          res(false);
        },
      });
    });
  }, [
    resetHistory,
    resetTitle,
    showConfirmResetChanges,
    constructorTrainingTitle,
    constructorElements,
    currentTraining,
  ]);

  return {requestResetChanges};
};

export const useTrainingConstructorHeader = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '',

      headerLeft: () => <BackButton />,
      headerRight: () => <HeaderOptions />,
    });
  }, [navigation]);
};

type ProfileScreenRouteProp = RouteProp<
  TrainingsStackParamList,
  BottomTabTrainingsPaths.Constructor
>;

export const useTrainingConstructorNavigationEffect = () => {
  const route = useRoute<ProfileScreenRouteProp>();

  const {initWithTraining} = useTrainingConstructorController();

  React.useEffect(() => {
    const params = route.params;

    if (params?.trainingId) {
      initWithTraining(params.trainingId);
    }
  }, [route, initWithTraining]);
};
