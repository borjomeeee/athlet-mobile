import React from 'react';

import {StackActions, useNavigation} from '@react-navigation/native';
import {NavPaths} from 'src/Navigation/Paths';

export const useTrainingListController = () => {
  const navigation = useNavigation();

  const handlePressCreateTraining = React.useCallback(() => {
    navigation.dispatch(
      StackActions.push(NavPaths.BottomTab.Trainings.Constructor),
    );
  }, [navigation]);

  return {handlePressCreateTraining};
};
