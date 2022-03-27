import React from 'react';
import {StackActions, useNavigation} from '@react-navigation/core';

import {useAuthService} from './Auth';
import {NavPaths} from 'src/Navigation/Paths';

export const useAppController = () => {
  const navigation = useNavigation();
  const {checkAuth} = useAuthService();

  const init = React.useCallback(async () => {
    const [_, error] = await checkAuth();
    if (error) {
      navigation.dispatch(StackActions.replace(NavPaths.Auth.Self));
    }
  }, [checkAuth, navigation]);

  return {init};
};
