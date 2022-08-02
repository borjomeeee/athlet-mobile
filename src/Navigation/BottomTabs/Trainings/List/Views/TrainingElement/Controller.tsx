import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {BottomTabTrainingsPaths, ModalsPaths} from 'src/Navigation/Paths';
import {PlaygroundScreenNavigation} from 'src/Navigation';
import {ConstructorScreenNavigation} from '../../..';

export const useTrainingElementController = (id: string) => {
  const navigation = useNavigation<
    PlaygroundScreenNavigation & ConstructorScreenNavigation
  >();

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
