import React from 'react';

import {useNavigation} from '@react-navigation/core';

import {AddElementBottomSheet} from '../Views/AddElementBottomSheet';
import {useModal} from 'src/Lib/ModalRouter';

export const useTrainingConstructorController = () => {
  const {show: showAddElement, hide: hideAddElement} = useModal('add-element');

  const handlePressAddElement = React.useCallback(() => {
    showAddElement(AddElementBottomSheet, {});
  }, [showAddElement]);

  const handlePressAddExercise = React.useCallback(() => {
    hideAddElement();
  }, [hideAddElement]);

  const handlePressAddSet = React.useCallback(() => {
    hideAddElement();
  }, [hideAddElement]);

  return {handlePressAddElement, handlePressAddExercise, handlePressAddSet};
};

export const useTrainingConstructorHeader = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({title: ''});
  }, [navigation]);
};
