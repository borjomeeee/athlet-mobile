import {useNavigation} from '@react-navigation/core';
import React from 'react';

export const useBackButtonController = () => {
  const navigation = useNavigation();

  const handlePress = React.useCallback(async () => {
    navigation.goBack();
  }, [navigation]);

  return {handlePress};
};
