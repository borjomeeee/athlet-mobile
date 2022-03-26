import React from 'react';
import {BadApiResponseError} from 'src/Api/Exceptions';
import {flow} from 'src/Hooks/Flow';
import {useAuthRepository} from 'src/Repositories/Auth';
import {useAccountStore} from 'src/Store/Account';
import {StackActions, useNavigation} from '@react-navigation/core';
import {NavPaths} from 'src/Navigation/Paths';
import {httpClient} from 'src/Api';

export const useAuthService = () => {
  const navigation = useNavigation();

  const {
    signIn: fetchSignIn,
    signUp: fetchSignUp,
    checkNicknameFree: fetchCheckNicknameFree,
  } = useAuthRepository();
  const {setAccount} = useAccountStore();

  const signIn = React.useCallback(
    (login: string, password: string) =>
      flow(async () => {
        const {user, token} = await fetchSignIn(login, password);

        httpClient.authorize(token);
        setAccount(user);

        navigation.dispatch(StackActions.replace(NavPaths.BottomTab.Self));
      }, 'authService__signIn'),
    [fetchSignIn, setAccount, navigation],
  );

  const signUp = React.useCallback(
    (email: string, nickname: string, password: string) =>
      flow(async () => {
        const {user, token} = await fetchSignUp(email, nickname, password);

        httpClient.authorize(token);
        setAccount(user);

        navigation.dispatch(StackActions.replace(NavPaths.BottomTab.Self));
      }, 'authService__signUp'),
    [fetchSignUp, setAccount, navigation],
  );

  const checkNicknameFree = React.useCallback(
    (nickname: string) =>
      flow(async () => {
        try {
          await fetchCheckNicknameFree(nickname);
          return true;
        } catch (e) {
          if (
            e instanceof BadApiResponseError &&
            e.reason === 'nickname-is-busy'
          ) {
            return false;
          }

          throw e;
        }
      }, 'authService__checkNicknameFree'),
    [fetchCheckNicknameFree],
  );

  const logout = React.useCallback(
    () =>
      flow(async () => {
        httpClient.deauthorize();
        setAccount(undefined);

        navigation.dispatch(StackActions.replace(NavPaths.Auth.SignIn));
      }, 'authService__logout'),
    [setAccount, navigation],
  );

  return {
    signIn,
    signUp,
    checkNicknameFree,
    logout,
  };
};
