import React from 'react';

import {useNavigation, useRoute} from '@react-navigation/core';

import {
  useTrainingConstructorStore,
  useTrainingConstructorHistoryStore,
  constructorElementsSelector,
  screenTrainingTitleAtom,
  isEditingSelector,
  initialTrainingAtom,
  initialTrainingIdAtom,
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
import {TrainingUtils} from 'src/Store/ModelsUtils/Training';
import {useGetRecoilState} from 'src/Utils/Recoil';
import {useRecoilValue} from 'recoil';
import {myTrainingById} from 'src/Store/Trainings';
import {useTrainingsService} from 'src/Services/Trainings';

export const useTrainingConstructorController = () => {
  const {
    setTitle,
    resetAll,
    swithToViewMode,
    setInitialTraining,
    resetInitialTraining,

    setInitialTrainingId,
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

  const initWithTrainingId = React.useCallback(
    (trainingId: string) => {
      setInitialTrainingId(trainingId);
      swithToViewMode();
    },
    [setInitialTrainingId, swithToViewMode],
  );

  return {
    handlePressAddElement,
    handleChangeTitle,

    setInitialTraining,
    resetInitialTraining,

    initWithTrainingId,

    reorder,
    reset: resetAll,
  };
};

export const useTrainingConstructorChangesController = () => {
  const {show: showConfirmResetChanges} = useModal(Modals.ConfirmResetChanges);

  const getConstructorTrainingTitle = useGetRecoilState(
    screenTrainingTitleAtom,
  );
  const getConstructorElements = useGetRecoilState(constructorElementsSelector);
  const getInitialTraining = useGetRecoilState(initialTrainingAtom);

  const getIsEditing = useGetRecoilState(isEditingSelector);

  const hasTrainingChanged = React.useCallback(() => {
    if (!getIsEditing()) {
      return false;
    }

    const initialTraining = getInitialTraining();
    const constructorTrainingTitle = getConstructorTrainingTitle();
    const constructorElements = getConstructorElements();

    if (!initialTraining) {
      return false;
    }

    if (
      TrainingUtils.equals(
        {
          title: constructorTrainingTitle,
          elements: constructorElements,
        },
        initialTraining,
      )
    ) {
      return false;
    }

    return true;
  }, [
    getConstructorTrainingTitle,
    getConstructorElements,
    getInitialTraining,
    getIsEditing,
  ]);

  const requestResetChanges = React.useCallback(() => {
    return new Promise<boolean>(res => {
      showConfirmResetChanges(ConfirmResetChanges, {
        onAccept: () => {
          res(true);
        },
        onCancel: () => {
          res(false);
        },
      });
    });
  }, [showConfirmResetChanges]);

  return {requestResetChanges, hasTrainingChanged};
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
  const navigation = useNavigation();
  const route = useRoute<ProfileScreenRouteProp>();

  const {initWithTrainingId} = useTrainingConstructorController();
  const {requestResetChanges, hasTrainingChanged} =
    useTrainingConstructorChangesController();

  React.useEffect(() => {
    const params = route.params;

    if (params?.trainingId) {
      initWithTrainingId(params?.trainingId);
    }
  }, [route, initWithTrainingId]);

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', async e => {
        const isChanged = hasTrainingChanged();
        if (!isChanged) {
          return;
        }

        e.preventDefault();

        const isConfirmed = await requestResetChanges();
        if (isConfirmed) {
          navigation.dispatch(e.data.action);
        }
      }),
    [navigation, hasTrainingChanged, requestResetChanges],
  );
};

export const useTrainingConstructorInitialTraining = () => {
  const {getMyTrainings} = useTrainingsService();

  const {setInitialTraining, resetInitialTraining} =
    useTrainingConstructorController();

  const initialTrainingId = useRecoilValue(initialTrainingIdAtom);
  const myTrainingWithInitialTrainingId = useRecoilValue(
    myTrainingById(initialTrainingId),
  );

  React.useEffect(() => {
    if (initialTrainingId) {
      // TODO: replace to load specific training
      getMyTrainings();
    }
  }, [initialTrainingId, getMyTrainings]);

  React.useEffect(() => {
    if (myTrainingWithInitialTrainingId) {
      setInitialTraining(myTrainingWithInitialTrainingId);
      return () => resetInitialTraining();
    }
  }, [
    setInitialTraining,
    myTrainingWithInitialTrainingId,
    resetInitialTraining,
  ]);
};
