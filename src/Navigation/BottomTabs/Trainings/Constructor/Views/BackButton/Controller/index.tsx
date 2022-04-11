import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useTrainingConstructorChangesController} from '../../../Hooks';

export const useBackButtonController = () => {
  const navigation = useNavigation();
  const {requestResetChanges} = useTrainingConstructorChangesController();

  const handlePress = React.useCallback(async () => {
    const isConfirmed = await requestResetChanges();

    if (isConfirmed) {
      navigation.goBack();
    }
  }, [requestResetChanges, navigation]);

  return {handlePress};
};
