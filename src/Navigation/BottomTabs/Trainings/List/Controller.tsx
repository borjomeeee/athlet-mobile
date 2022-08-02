import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {BottomTabTrainingsPaths} from 'src/Navigation/Paths';
import {TrainingsListScreenNavigationProps} from '../Types';

export const useTrainingListController = () => {
  const navigation =
    useNavigation<TrainingsListScreenNavigationProps['navigation']>();

  const handlePressCreateTraining = React.useCallback(() => {
    navigation.navigate(BottomTabTrainingsPaths.Constructor);
  }, [navigation]);

  return {handlePressCreateTraining};
};
