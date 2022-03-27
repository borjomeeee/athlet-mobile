import React from 'react';
import {StackActions, useNavigation} from '@react-navigation/core';

import * as UI from 'src/Components';
import {useAuthService} from './Auth';
import {NavPaths} from 'src/Navigation/Paths';
import {
  BadApiResponseError,
  BadNetworkConnectionError,
} from 'src/Api/Exceptions';
import {useModalRouter} from 'src/Lib/ModalRouter';
import {ApiResponse} from 'src/Api/Responses';
import {LocalStorage} from 'src/Lib/LocalStorage';

export const useAppController = () => {
  const navigation = useNavigation();
  const {checkAuth} = useAuthService();
  const {showModal} = useModalRouter();

  const defaultHandleError = React.useCallback(
    (error: Error) => {
      if (error instanceof BadNetworkConnectionError) {
        showModal(UI.BadNetworkConnection, {id: 'bad-network-connection'});
      } else if (error instanceof BadApiResponseError) {
        showModal(UI.BadApiResponse, {id: 'bad-api-response'});
      }
    },
    [showModal],
  );

  const init = React.useCallback(async () => {
    const [_, error] = await checkAuth();
    if (error) {
      if (
        error instanceof BadApiResponseError &&
        error.reason === ApiResponse.AUTHORIZATION_ERROR
      ) {
        LocalStorage.deleteJwt();
      } else {
        defaultHandleError(error);
      }

      navigation.dispatch(StackActions.replace(NavPaths.Auth.Self));
    }
  }, [checkAuth, navigation, defaultHandleError]);

  return {init, defaultHandleError};
};
