import React from 'react';

import {httpClient} from 'src/Api';
import {ApiPaths} from 'src/Api/Paths';
import {parseDefaultApiResponse} from 'src/Api/Helpers';
import {User} from 'src/Store/Models/User';

export const useAuthRepository = () => {
  const signIn = React.useCallback((login: string, password: string) => {
    return httpClient
      .post({
        url: ApiPaths.signIn,
        data: {login, password},
      })
      .then(parseDefaultApiResponse)
      .then(data => data.json as User);
  }, []);

  const signUp = React.useCallback(
    (email: string, nickname: string, password: string) => {
      return httpClient
        .post({
          url: ApiPaths.signUp,
          data: {email, nickname, password},
        })
        .then(parseDefaultApiResponse)
        .then(data => data.json as User);
    },
    [],
  );

  const checkNicknameFree = (nickname: string) => {
    return httpClient
      .post({
        url: ApiPaths.checkNickname,
        data: {nickname},
      })
      .then(parseDefaultApiResponse);
  };

  return {signIn, signUp, checkNicknameFree};
};
