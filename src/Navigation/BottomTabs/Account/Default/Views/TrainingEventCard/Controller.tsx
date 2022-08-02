import {StackActions, useNavigation} from '@react-navigation/core';
import React from 'react';
import {BottomTabAccountPaths} from 'src/Navigation/Paths';

export const useTrainingEventController = (trainingEventId: string) => {
  const navigation = useNavigation();
  const handlePress = React.useCallback(() => {
    navigation.dispatch(
      StackActions.push(BottomTabAccountPaths.TrainingEvent, {
        id: trainingEventId,
      }),
    );
  }, [trainingEventId, navigation]);

  return {handlePress};
};
