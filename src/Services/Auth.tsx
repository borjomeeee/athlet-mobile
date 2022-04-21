import React from 'react';
import {BadApiResponseError} from 'src/Api/Exceptions';
import {useFlow} from 'src/Hooks/Flow';
import {useAuthRepository} from 'src/Repositories/Auth';
import {useAccountStore} from 'src/Store/Account';
import {StackActions, useNavigation} from '@react-navigation/core';
import {AuthPaths, AppPaths} from 'src/Navigation/Paths';
import {httpClient} from 'src/Api';
import {LocalStorage} from 'src/Lib/LocalStorage';
import {ApiResponse} from 'src/Api/Responses';
import {User} from 'src/Store/Models/User';
import {useExercisesService} from './Exercises';
import {JwtTokenNotFoundError} from 'src/Utils/Exceptions';

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

      navigation.dispatch(StackActions.replace(AppPaths.BottomTab));
    },
    [navigation, setAccount, getExercises],
  );

  const checkAuth = useFlow(
    async () => {
      try {
        const jwtToken = LocalStorage.getJwt();

        const {user} = await fetchCheckAuth(jwtToken);
        _completeAuth(user, jwtToken);

        return true;
      } catch (e) {
        if (e instanceof JwtTokenNotFoundError) {
          return false;
        }
        throw e;
      }
    },
    [_completeAuth, fetchCheckAuth],
    'authService__checkAuth',
  );

  const signIn = useFlow(
    async (login: string, password: string) => {
      const {user, token} = await fetchSignIn(login, password);
      _completeAuth(user, token);
    },
    [fetchSignIn, _completeAuth],
    'authService__signIn',
  );

  const signUp = useFlow(
    async (email: string, nickname: string, password: string) => {
      const {user, token} = await fetchSignUp(email, nickname, password);
      _completeAuth(user, token);
    },
    [fetchSignUp, _completeAuth],
    'authService__signUp',
  );

  const checkNicknameFree = useFlow(
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
    'authService__checkNicknameFree',
  );

  const logout = useFlow(
    () => {
      httpClient.deauthorize();
      LocalStorage.deleteJwt();

      setAccount(undefined);

      navigation.dispatch(StackActions.replace(AuthPaths.SignIn));
    },
    [setAccount, navigation],
    'authService__logout',
  );

  return {
    checkAuth,
    signIn,
    signUp,
    checkNicknameFree,
    logout,
  };
};
