import React from 'react';
import {ApiResponse} from 'src/Api/Responses';
import {BadApiResponseError} from 'src/Api/Exceptions';
import {flow} from 'src/Hooks/Flow';
import {useAuthRepository} from 'src/Repositories/Auth';
import {useAccountStore} from 'src/Store/Account';

export const useAuthService = () => {
  const {
    signIn: fetchSignIn,
    signUp: fetchSignUp,
    checkNicknameFree: fetchCheckNicknameFree,
  } = useAuthRepository();
  const {setAccount} = useAccountStore();

  const signIn = React.useCallback(
    (login: string, password: string) =>
      flow(async () => {
        const user = await fetchSignIn(login, password);
        setAccount(user);
      }),
    [fetchSignIn, setAccount],
  );
  const signUp = React.useCallback(
    (email: string, nickname: string, password: string) =>
      flow(async () => {
        const user = await fetchSignUp(email, nickname, password);
        setAccount(user);
      }),
    [fetchSignUp, setAccount],
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
      }),
    [fetchCheckNicknameFree],
  );

  return {
    signIn,
    signUp,
    checkNicknameFree,
  };
};
