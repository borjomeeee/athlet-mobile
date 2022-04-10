import React from 'react';

import {useNavigation, useRoute} from '@react-navigation/core';

import {
  useTrainingConstructorStore,
  useTrainingConstructorHistoryStore,
} from '../Store';
import {RouteProp} from '@react-navigation/native';
import {TrainingsStackParamList} from '../../index';
import {BottomTabTrainingsPaths} from 'src/Navigation/Paths';
import {HeaderOptions} from '../Views/HeaderOptions';
import {useModal} from 'src/Lib/ModalRouter';
import {AddElementBottomSheet} from '../Views/AddElementBottomSheet';
import {Modals} from '../Const';
import {ScreenState} from '../Store/Types';

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

  const handlePressCancelEditingMode = React.useCallback(() => {
    setScreenState(ScreenState.VIEWING);

    resetHistory();
    resetTitle();
  }, [setScreenState, resetHistory, resetTitle]);

  const handlePressGoToEditMode = React.useCallback(() => {
    setScreenState(ScreenState.EDITING);
  }, [setScreenState]);

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
    handlePressGoToEditMode,
    handlePressCancelEditingMode,
    reorder,
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
