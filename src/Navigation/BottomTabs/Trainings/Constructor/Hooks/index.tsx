import React from 'react';

import {useNavigation} from '@react-navigation/core';

import * as UI from 'src/Components';
import {AddElementBottomSheet} from '../Views/AddElementBottomSheet';
import {useModal} from 'src/Lib/ModalRouter';
import {useTrainingConstructorStore} from '../Store';

export const useTrainingConstructorController = () => {
  const {show: showAddElement, hide: hideAddElement} = useModal('add-element');
  const {show: showSelectExercise} = useModal(
    'trainingConstructor__selectExercise',
  );
  const {show: showEditExercise} = useModal(
    'trainingConstructor__editExercise',
  );

  const handlePressAddElement = React.useCallback(() => {
    showAddElement(AddElementBottomSheet, {});
  }, [showAddElement]);

  const handlePressAddExercise = React.useCallback(() => {
    hideAddElement();
    showSelectExercise(UI.SelectExercise, {
      onSelect: exercise => {
        console.log('hm', exercise);
        showEditExercise(UI.EditExercise, {exercise, onEdit: console.log});
      },
    });
  }, [hideAddElement, showSelectExercise, showEditExercise]);

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
