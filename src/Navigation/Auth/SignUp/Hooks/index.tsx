import {useNavigation} from '@react-navigation/core';
import {StackActions} from '@react-navigation/native';
import React from 'react';

import {useInputRecoilState} from 'src/Hooks/Form';
import {NavPaths} from 'src/Navigation/Paths';
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

  const handlePressSignUp = React.useCallback(() => {
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
  }, [
    email,
    setEmailError,
    nickname,
    setNicknameError,
    password,
    setPasswordError,
    repeatPassword,
    setRepeatPasswordError,
  ]);

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
    resetForm,
  };
};
