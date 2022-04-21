import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {StackActions} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {BadApiResponseError} from 'src/Api/Exceptions';
import {ApiResponse} from 'src/Api/Responses';

import {AuthPaths} from 'src/Navigation/Paths';
import {useAppController} from 'src/Services/App';
import {useAuthService} from 'src/Services/Auth';
import {validateEmail} from 'src/Utils/Common';
import {
  emailAtom,
  nicknameAtom,
  passwordAtom,
  repeatPasswordAtom,
  useSignUpStore,
} from '../Store';

export const useSignUpController = () => {
  const {
    setEmail,
    setEmailError,
    setNickname,
    setNicknameError,
    setPassword,
    setPasswordError,
    setRepeatPassword,
    setRepeatPasswordError,
  } = useSignUpStore();

  const email = useRecoilValue(emailAtom);
  const nickname = useRecoilValue(nicknameAtom);
  const password = useRecoilValue(passwordAtom);
  const repeatPassword = useRecoilValue(repeatPasswordAtom);

  const navigation = useNavigation();
  const {checkNicknameFree, signUp} = useAuthService();
  const {defaultHandleError} = useAppController();

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

  const handlePressSignUp = React.useCallback(async () => {
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
    if (error) {
      if (error instanceof BadApiResponseError) {
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
            defaultHandleError(error);
            break;
        }
      } else {
        defaultHandleError(error);
      }
    }
  }, [
    email,
    setEmailError,
    nickname,
    setNicknameError,
    password,
    setPasswordError,
    repeatPassword,
    setRepeatPasswordError,
    signUp,
    defaultHandleError,
  ]);

  const handlePressGoToSignIn = React.useCallback(() => {
    navigation.dispatch(StackActions.replace(AuthPaths.SignIn));
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
