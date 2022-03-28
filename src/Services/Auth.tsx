import React from 'react';
import {BadApiResponseError} from 'src/Api/Exceptions';
import {useFlow} from 'src/Hooks/Flow';
import {useAuthRepository} from 'src/Repositories/Auth';
import {useAccountStore} from 'src/Store/Account';
import {StackActions, useNavigation} from '@react-navigation/core';
import {NavPaths} from 'src/Navigation/Paths';
import {httpClient} from 'src/Api';
import {LocalStorage} from 'src/Lib/LocalStorage';
import {ApiResponse} from 'src/Api/Responses';
import {User} from 'src/Store/Models/User';
import {useExercisesService} from './Exercises';

export const useAuthService = () => {
  const navigation = useNavigation();

  const {
    signIn: fetchSignIn,
    signUp: fetchSignUp,
    checkNicknameFree: fetchCheckNicknameFree,
    checkAuth: fetchCheckAuth,
  } = useAuthRepository();
  const {setAccount} = useAccountStore();
  const {getExercises} = useExercisesService();

  const _completeAuth = React.useCallback(
    (user: User, jwtToken: string) => {
      httpClient.authorize(jwtToken);
      LocalStorage.saveJwt(jwtToken);

      setAccount(user);
      // Unnecessary fetchs
      getExercises();

      navigation.dispatch(StackActions.replace(NavPaths.BottomTab.Self));
    },
    [navigation, setAccount, getExercises],
  );

  const checkAuth = useFlow(
    'authService__checkAuth',
    async () => {
      const jwtToken = LocalStorage.getJwt();

      const {user} = await fetchCheckAuth(jwtToken);
      _completeAuth(user, jwtToken);
    },
    [_completeAuth, fetchCheckAuth],
  );

  const signIn = useFlow(
    'authService__signIn',
    async (login: string, password: string) => {
      const {user, token} = await fetchSignIn(login, password);
      _completeAuth(user, token);
    },
    [fetchSignIn, _completeAuth],
  );

  const signUp = useFlow(
    'authService__signUp',
    async (email: string, nickname: string, password: string) => {
      const {user, token} = await fetchSignUp(email, nickname, password);
      _completeAuth(user, token);
    },
    [fetchSignIn, _completeAuth],
  );

  const checkNicknameFree = useFlow(
    'authService__checkNicknameFree',
    async (nickname: string) => {
      try {
        await fetchCheckNicknameFree(nickname);
        return true;
      } catch (e) {
        if (
          e instanceof BadApiResponseError &&
          e.reason === ApiResponse.NICKNAME_IS_BUSY
        ) {
          return false;
        }

        throw e;
      }
    },
    [fetchCheckNicknameFree],
  );

  const logout = useFlow(
    'authService__logout',
    () => {
      httpClient.deauthorize();
      LocalStorage.deleteJwt();

      setAccount(undefined);

      navigation.dispatch(StackActions.replace(NavPaths.Auth.SignIn));
    },
    [fetchSignIn, setAccount, navigation],
  );

  return {
    checkAuth,
    signIn,
    signUp,
    checkNicknameFree,
    logout,
  };
};
