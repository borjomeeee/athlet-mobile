import React from 'react';

import {httpClient} from 'src/Api';
import {ApiPaths} from 'src/Api/Paths';
import {parseDefaultApiResponse} from 'src/Api/Helpers';
import {User, UserScheme} from 'src/Store/Models/User';
import {ParseJWTFromResponseError} from 'src/Api/Exceptions';
import {HttpRequestBaseResult} from 'src/Api/Types';

export const useAuthRepository = () => {
  const signIn = React.useCallback((login: string, password: string) => {
    return httpClient
      .post({
        url: ApiPaths.signIn,
        data: {login, password},
      })
      .then(parseDefaultApiResponse)
      .then(data => ({
        user: UserScheme.parse(data.json) as User,
        token: parseJWTFromResponse(data),
      }));
  }, []);

  const signUp = React.useCallback(
    (email: string, nickname: string, password: string) => {
      return httpClient
        .post({
          url: ApiPaths.signUp,
          data: {email, nickname, password},
        })
        .then(parseDefaultApiResponse)
        .then(data => ({
          user: UserScheme.parse(data.json) as User,
          token: parseJWTFromResponse(data),
        }));
    },
    [],
  );

  const checkNicknameFree = React.useCallback((nickname: string) => {
    return httpClient
      .post({
        url: ApiPaths.checkNickname,
        data: {nickname},
      })
      .then(parseDefaultApiResponse);
  }, []);

  return {signIn, signUp, checkNicknameFree};
};

const parseJWTFromResponse = (result: HttpRequestBaseResult) => {
  const {response} = result;

  const authorizationHeader = response.headers.get('Authorization');
  if (!authorizationHeader) {
    throw new ParseJWTFromResponseError(
      result,
      'Authorization header not found!',
    );
  }

  const prefix = 'Bearer ';
  if (!authorizationHeader.startsWith(prefix)) {
    throw new ParseJWTFromResponseError(
      result,
      `Bad authorization header value: ${authorizationHeader}`,
    );
  }

  const token = authorizationHeader.replace(prefix, '');
  return token;
};
