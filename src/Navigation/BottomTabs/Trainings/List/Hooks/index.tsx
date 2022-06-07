import React from 'react';

import {StackActions, useNavigation} from '@react-navigation/native';
import {BottomTabTrainingsPaths, ModalsPaths} from 'src/Navigation/Paths';

export const useTrainingListController = () => {
  const navigation = useNavigation();

  const handlePressCreateTraining = React.useCallback(() => {
    navigation.dispatch(StackActions.push(BottomTabTrainingsPaths.Constructor));
  }, [navigation]);

  return {handlePressCreateTraining};
};

export const useTrainingListTrainingElementController = (id: string) => {
  const navigation = useNavigation();

  const handlePress = React.useCallback(() => {
    navigation.dispatch(
      StackActions.push(BottomTabTrainingsPaths.Constructor, {
        trainingId: id,
      }),
    );
  }, [id, navigation]);

  const handlePressStart = React.useCallback(() => {
    navigation.dispatch(
      StackActions.push(ModalsPaths.Playground, {trainingId: id}),
    );
  }, [id, navigation]);

  return {handlePress, handlePressStart};
};
