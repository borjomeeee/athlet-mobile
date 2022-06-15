import {StackActions, useNavigation} from '@react-navigation/core';
import React from 'react';
import {BottomTabAccountPaths} from 'src/Navigation/Paths';

export const useAccountController = () => {
  const navigation = useNavigation();

  const handlePressSettings = React.useCallback(() => {
    navigation.dispatch(StackActions.push(BottomTabAccountPaths.Settings));
  }, [navigation]);

  return {handlePressSettings};
};
