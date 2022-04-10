import React from 'react';
import {StackActions, useNavigation} from '@react-navigation/core';

import * as UI from 'src/Components';
import {useAuthService} from './Auth';
import {AppPaths} from 'src/Navigation/Paths';
import {
  BadApiResponseError,
  BadNetworkConnectionError,
} from 'src/Api/Exceptions';
import {ApiResponse} from 'src/Api/Responses';
import {LocalStorage} from 'src/Lib/LocalStorage';
import {useModal} from 'src/Lib/ModalRouter';

export const useAppController = () => {
  const navigation = useNavigation();
  const {checkAuth} = useAuthService();

  const {show: showBadNetworkConnection} = useModal('bad-network-connection');
  const {show: showBadApiResponse} = useModal('bad-api-response');

  const handleAuthorizationError = React.useCallback(() => {
    LocalStorage.deleteJwt();
    navigation.dispatch(StackActions.replace(AppPaths.Auth));
  }, [navigation]);

  const defaultHandleError = React.useCallback(
    (error: Error) => {
      if (error instanceof BadNetworkConnectionError) {
        showBadNetworkConnection(UI.BadNetworkConnection, {});
      } else if (error instanceof BadApiResponseError) {
        if (error.reason === ApiResponse.AUTHORIZATION_ERROR) {
          handleAuthorizationError();
          return;
        }
        showBadApiResponse(UI.BadApiResponse, {});
      } else {
        showBadApiResponse(UI.BadApiResponse, {});
      }
    },
    [showBadNetworkConnection, showBadApiResponse, handleAuthorizationError],
  );

  const init = React.useCallback(async () => {
    const [_, error] = await checkAuth();
    if (error) {
      handleAuthorizationError();
      if (
        error instanceof BadApiResponseError &&
        error.reason === ApiResponse.AUTHORIZATION_ERROR
      ) {
        return;
      }

      defaultHandleError(error);
    }
  }, [checkAuth, defaultHandleError, handleAuthorizationError]);

  return {init, defaultHandleError};
};
