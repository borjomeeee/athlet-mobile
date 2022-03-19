import {useNavigation} from '@react-navigation/core';
import {StackActions} from '@react-navigation/native';
import React from 'react';
import {BadApiResponseError} from 'src/Api/Exceptions';
import {ApiResponse} from 'src/Api/Responses';
import {flow} from 'src/Hooks/Flow';

import {useInputRecoilState} from 'src/Hooks/Form';
import {NavPaths} from 'src/Navigation/Paths';
import {useAuthService} from 'src/Services/Auth';
import {validateEmail} from 'src/Utils/Common';
import {
  emailAtom,
  emailErrorAtom,
  nicknameAtom,
  nicknameErrorAtom,
  passwordAtom,
  passwordErrorAtom,
  repeatPasswordAtom,
  repeatPasswordErrorAtom,
} from '../Store';

export const useSignUpStore = () => {
  const {
    value: email,
    setValue: setEmail,
    error: emailError,
    setError: setEmailError,
  } = useInputRecoilState(emailAtom, emailErrorAtom);

  const {
    value: nickname,
    setValue: setNickname,
    error: nicknameError,
    setError: setNicknameError,
  } = useInputRecoilState(nicknameAtom, nicknameErrorAtom);

  const {
    value: password,
    setValue: setPassword,
    error: passwordError,
    setError: setPasswordError,
  } = useInputRecoilState(passwordAtom, passwordErrorAtom);

  const {
    value: repeatPassword,
    setValue: setRepeatPassword,
    error: repeatPasswordError,
    setError: setRepeatPasswordError,
  } = useInputRecoilState(repeatPasswordAtom, repeatPasswordErrorAtom);

  return {
    email,
    setEmail,

    emailError,
    setEmailError,

    nickname,
    setNickname,

    nicknameError,
    setNicknameError,

    password,
    setPassword,

    passwordError,
    setPasswordError,

    repeatPassword,
    setRepeatPassword,

    repeatPasswordError,
    setRepeatPasswordError,
  };
};

export const useSignUpController = () => {
  const {
    email,
    setEmail,
    setEmailError,
    nickname,
    setNickname,
    setNicknameError,
    password,
    setPassword,
    setPasswordError,
    repeatPassword,
    setRepeatPassword,
    setRepeatPasswordError,
  } = useSignUpStore();

  const navigation = useNavigation();
  const {checkNicknameFree, signUp} = useAuthService();

  const checkNickname = React.useCallback(
    async (value: string) => {
      const [free, error] = await checkNicknameFree(value);
      if (error) {
        return;
      }

      if (!free) {
        return setNicknameError('Никнейм занят');
      }
    },
    [checkNicknameFree, setNicknameError],
  );

  const handlePressSignUp = React.useCallback(
    () =>
      flow(async () => {
        if (email.length === 0) {
          return setEmailError('Поле не должно быть пустым');
        } else if (nickname.length === 0) {
          return setNicknameError('Поле не должно быть пустым');
        } else if (password.length === 0) {
          return setPasswordError('Поле не должно быть пустым');
        } else if (repeatPassword.length === 0) {
          return setRepeatPasswordError('Поле не должно быть пустым');
        }

        if (!validateEmail(email)) {
          return setEmailError('Введите валидный email');
        }

        if (repeatPassword !== password) {
          return setRepeatPasswordError('Пароли не совпадают');
        }

        const [_, error] = await signUp(email, nickname, password);
        if (error && error instanceof BadApiResponseError && error.reason) {
          switch (error.reason) {
            case ApiResponse.INVALID_EMAIL:
              setEmailError('Введите валидный email');
              break;
            case ApiResponse.INVALID_PASSWORD:
              setPasswordError('Введите валидный пароль');
              break;
            case ApiResponse.INVALID_NICKANAME:
              setNicknameError('Введите валидный никнейм');
              break;
            case ApiResponse.EMAIL_IS_BUSY:
              setEmailError('Email занят');
              break;
            case ApiResponse.NICKNAME_IS_BUSY:
              setNicknameError('Никнейм занят');
              break;
            default:
              console.error('get unhandled api response!');
              break;
          }
        }
      }),
    [
      email,
      setEmailError,
      nickname,
      setNicknameError,
      password,
      setPasswordError,
      repeatPassword,
      setRepeatPasswordError,
      signUp,
    ],
  );

  const handlePressGoToSignIn = React.useCallback(() => {
    navigation.dispatch(StackActions.replace(NavPaths.Auth.SignIn));
  }, [navigation]);

  const resetForm = React.useCallback(() => {
    setEmail('');
    setNickname('');
    setPassword('');
    setRepeatPassword('');
  }, [setEmail, setNickname, setPassword, setRepeatPassword]);

  return {
    handlePressSignUp,
    handleChangeEmail: setEmail,
    handleChangeNickname: setNickname,
    handleChangePassword: setPassword,
    handleChangeRepeatPassword: setRepeatPassword,
    handlePressGoToSignIn,
    checkNickname,
    resetForm,
  };
};
