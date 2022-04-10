import React from 'react';

import {useNavigation, useRoute} from '@react-navigation/core';

import {useTrainingConstructorStore} from '../Store';
import {RouteProp} from '@react-navigation/native';
import {TrainingsStackParamList} from '../..';
import {BottomTabTrainingsPaths} from 'src/Navigation/Paths';
import {ScreenState} from '../Types';
import {HeaderOptions} from '../Views/HeaderOptions';
import {useModal} from 'src/Lib/ModalRouter';
import {AddElementBottomSheet} from '../Views/AddElementBottomSheet';
import {Modals} from '../Const';

export const useTrainingConstructorController = () => {
  const {
    resetElements,
    setTitle,
    resetTitle,
    resetTrainingId,
    resetScreenState,
    setScreenState,
    setTrainingId,
    replaceExercises,
  } = useTrainingConstructorStore();
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

  const handlePressCancelEditingMode = React.useCallback(() => {
    setScreenState(ScreenState.VIEWING);
  }, [setScreenState]);

  const handlePressGoToEditMode = React.useCallback(() => {
    setScreenState(ScreenState.EDITING);
  }, [setScreenState]);

  const reset = React.useCallback(() => {
    resetElements();
    resetTitle();
    resetTrainingId();
    resetScreenState();
  }, [resetElements, resetTitle, resetTrainingId, resetScreenState]);

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
    handlePressGoToEditMode,
    handlePressCancelEditingMode,
    replaceExercises,
    initWithTraining,
    reset,
  };
};

export const useTrainingConstructorHeader = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
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
