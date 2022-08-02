import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {BottomTabTrainingsPaths} from 'src/Navigation/Paths';
import {TrainingsListScreenNavigation} from '../index';

export const useTrainingListController = () => {
  const navigation = useNavigation<TrainingsListScreenNavigation>();

  const handlePressCreateTraining = React.useCallback(() => {
    navigation.navigate(BottomTabTrainingsPaths.Constructor);
  }, [navigation]);

  return {handlePressCreateTraining};
};
