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
import {JobAlreadyStarted} from 'src/Utils/Exceptions';
import {useExercisesService} from './Exercises';
import {useTrainingsService} from './Trainings';
import {useTrainingsEventsService} from './TrainingsEvents';
import {bottomSheetsShowablePortal} from 'src/Lib/ShowablePortal/Portal';

export const useAppController = () => {
  const navigation = useNavigation();

  const {getExercises} = useExercisesService();
  const {getMyTrainings} = useTrainingsService();
  const {getMyTrainingsEvents} = useTrainingsEventsService();

  const handleAuthorizationError = React.useCallback(() => {
    LocalStorage.deleteJwt();
    navigation.dispatch(StackActions.replace(AppPaths.Auth));
  }, [navigation]);

  const defaultHandleError = React.useCallback(
    (error: Error) => {
      if (error instanceof JobAlreadyStarted) {
        return;
      } else if (error instanceof BadNetworkConnectionError) {
        bottomSheetsShowablePortal.current?.show(
          'bad-network-connection',
          UI.BadNetworkConnection,
          {},
        );
      } else if (error instanceof BadApiResponseError) {
        if (error.reason === ApiResponse.AUTHORIZATION_ERROR) {
          handleAuthorizationError();
          return;
        }

        bottomSheetsShowablePortal.current?.show(
          'bad-api-response',
          UI.BadApiResponse,
          {},
        );
      } else {
        bottomSheetsShowablePortal.current?.show(
          'bad-api-response',
          UI.BadApiResponse,
          {},
        );
      }
    },
    [handleAuthorizationError],
  );

  const init = React.useCallback(async () => {
    // const [res, error] = await checkAuth();
    // if (!res) {
    //   handleAuthorizationError();
    //   return;
    // }

    // if (error) {
    //   handleAuthorizationError();
    //   if (
    //     error instanceof BadApiResponseError &&
    //     error.reason === ApiResponse.AUTHORIZATION_ERROR
    //   ) {
    //     return;
    //   }

    //   defaultHandleError(error);
    // }

    // TODO: remove
    getExercises();
    getMyTrainings();
    getMyTrainingsEvents();

    requestAnimationFrame(() => {
      navigation.dispatch(StackActions.replace(AppPaths.BottomTab));
    });
  }, [navigation, getExercises, getMyTrainings, getMyTrainingsEvents]);

  return {init, defaultHandleError};
};
