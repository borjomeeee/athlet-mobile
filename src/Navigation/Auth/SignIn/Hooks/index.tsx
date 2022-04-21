import {StackActions, useNavigation} from '@react-navigation/core';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {BadApiResponseError} from 'src/Api/Exceptions';
import {ApiResponse} from 'src/Api/Responses';
import {AuthPaths} from 'src/Navigation/Paths';
import {useAppController} from 'src/Services/App';

import {useAuthService} from 'src/Services/Auth';
import {validateEmail} from 'src/Utils/Common';
import {emailAtom, passwordAtom, useSignInStore} from '../Store';

export const useSignInController = () => {
  const email = useRecoilValue(emailAtom);
  const password = useRecoilValue(passwordAtom);

  const {setEmail, setEmailError, setPassword, setPasswordError} =
    useSignInStore();

  const navigation = useNavigation();
  const {signIn} = useAuthService();

  const {defaultHandleError} = useAppController();

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
    if (error) {
      if (error instanceof BadApiResponseError) {
        switch (error.reason) {
          case ApiResponse.INCORRECT_DATA:
            setEmailError('Неверные логин или пароль');
            break;
          case ApiResponse.INVALID_EMAIL:
            setEmailError('Введите валидный email');
            break;
          default:
            defaultHandleError(error);
            break;
        }
      } else {
        defaultHandleError(error);
      }
    }
  }, [
    email,
    password,
    signIn,
    setEmailError,
    setPasswordError,
    defaultHandleError,
  ]);

  const handlePressGoToSignUp = React.useCallback(() => {
    navigation.dispatch(StackActions.replace(AuthPaths.SignUp));
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
