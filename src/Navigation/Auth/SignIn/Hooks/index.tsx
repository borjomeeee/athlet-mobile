import {StackActions, useNavigation} from '@react-navigation/core';
import React from 'react';
import {useRecoilState} from 'recoil';
import {BadApiResponseError} from 'src/Api/Exceptions';
import {ApiResponse} from 'src/Api/Responses';
import {NavPaths} from 'src/Navigation/Paths';

import {useAuthService} from 'src/Services/Auth';
import {validateEmail} from 'src/Utils/Common';
import {
  emailAtom,
  emailErrorAtom,
  passwordAtom,
  passwordErrorAtom,
} from '../Store';

export const useSignInStore = () => {
  const [email, setEmail] = useRecoilState(emailAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);

  const [emailError, setEmailError] = useRecoilState(emailErrorAtom);
  const [passwordError, setPasswordError] = useRecoilState(passwordErrorAtom);

  const handleChangeEmail = React.useCallback(
    (text: string) => {
      setEmail(text.trim());
      setEmailError('');
    },
    [setEmail, setEmailError],
  );

  const handleChangePassword = React.useCallback(
    (text: string) => {
      setPassword(text.trim());
      setPasswordError('');
    },
    [setPassword, setPasswordError],
  );

  return {
    email,
    setEmail: handleChangeEmail,

    emailError,
    setEmailError,

    password,
    setPassword: handleChangePassword,

    passwordError,
    setPasswordError,
  };
};

export const useSignInController = () => {
  const {
    email,
    password,
    setEmail,
    setEmailError,
    setPassword,
    setPasswordError,
  } = useSignInStore();

  const navigation = useNavigation();
  const {signIn} = useAuthService();

  const handlePressSignIn = React.useCallback(async () => {
    if (email.trim().length === 0) {
      return setEmailError('Поле не должно быть пустым');
    } else if (password.length === 0) {
      return setPasswordError('Поле не должно быть пустым');
    }

    if (!validateEmail(email)) {
      return setEmailError('Введите валидный email');
    }

    const [_, error] = await signIn(email, password);
    if (error && error instanceof BadApiResponseError && error.reason) {
      switch (error.reason) {
        case ApiResponse.INCORRECT_DATA:
          setEmailError('Неверные логин или пароль');
          break;
        case ApiResponse.INVALID_EMAIL:
          setEmailError('Введите валидный email');
          break;
        default:
          setEmailError(error.reason);
          break;
      }
    }
  }, [email, password, signIn, setEmailError, setPasswordError]);

  const handlePressGoToSignUp = React.useCallback(() => {
    navigation.dispatch(StackActions.replace(NavPaths.Auth.SignUp));
  }, [navigation]);

  const resetForm = React.useCallback(() => {
    setEmail('');
    setPassword('');
  }, [setEmail, setPassword]);

  return {
    handleChangeEmail: setEmail,
    handleChangePassword: setPassword,

    handlePressSignIn,
    handlePressGoToSignUp,
    resetForm,
  };
};
