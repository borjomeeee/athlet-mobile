import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {BottomTabTrainingsPaths, ModalsPaths} from 'src/Navigation/Paths';
import {TrainingsListScreenNavigationProps} from '../../../Types';

export const useTrainingElementController = (id: string) => {
  const navigation =
    useNavigation<TrainingsListScreenNavigationProps['navigation']>();

  const handlePress = React.useCallback(() => {
    navigation.navigate(BottomTabTrainingsPaths.Constructor, {
      trainingId: id,
    });
  }, [id, navigation]);

  const handlePressStart = React.useCallback(() => {
    navigation.navigate(ModalsPaths.Playground, {trainingId: id});
  }, [id, navigation]);

  return {handlePress, handlePressStart};
};
