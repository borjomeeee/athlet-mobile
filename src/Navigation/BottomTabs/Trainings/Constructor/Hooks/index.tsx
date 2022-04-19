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
import {ConfirmResetChanges} from '../Modals/ConfirmResetChanges';
import {BackButton} from '../Views/BackButton';
import {useRecoilValue} from 'recoil';
import {TrainingUtils} from 'src/Store/ModelsUtils/Training';

export const useTrainingConstructorController = () => {
  const {setTitle, initWithTrainingId, resetAll} =
    useTrainingConstructorStore();
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

  return {
    handlePressAddElement,
    handleChangeTitle,
    reorder,
    initWithTrainingId,
    reset: resetAll,
  };
};

export const useTrainingConstructorChangesController = () => {
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
          res(true);
        },
        onCancel: () => {
          res(false);
        },
      });
    });
  }, [
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

  const {initWithTrainingId} = useTrainingConstructorController();

  React.useLayoutEffect(() => {
    const params = route.params;

    if (params?.trainingId) {
      initWithTrainingId(params.trainingId);
    }
  }, [route, initWithTrainingId]);
};
