import React from 'react';

import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';
import {useSignUpController, useSignUpStore} from '../Hooks';

export const Content = () => {
  const {
    email,
    emailError,
    nickname,
    nicknameError,
    password,
    passwordError,
    repeatPassword,
    repeatPasswordError,
  } = useSignUpStore();

  const {
    handlePressSignUp,
    handleChangeEmail,
    handleChangeNickname,
    handleChangePassword,
    handleChangeRepeatPassword,
  } = useSignUpController();

  return (
    <UI.View>
      <UI.Text style={s(`P5 medium`)}>Регистрация</UI.Text>

      <UI.HSpacer size={40} />

      <UI.DefaultInputWithLabel
        Variant={UI.EmailVariant}
        value={email}
        onChangeText={handleChangeEmail}
        placeholder="Введите email ..."
        label="Email"
        error={emailError}
      />

      <UI.DefaultInputWithLabel
        value={nickname}
        onChangeText={handleChangeNickname}
        placeholder="Введите никнейм ..."
        label="Никнейм"
        error={nicknameError}
      />

      <UI.PasswordInput
        value={password}
        onChangeText={handleChangePassword}
        placeholder="Введите пароль ..."
        label="Пароль"
        error={passwordError}
      />

      <UI.PasswordInput
        value={repeatPassword}
        onChangeText={handleChangeRepeatPassword}
        placeholder="Введите пароль еще раз ..."
        label="Повторите пароль"
        error={repeatPasswordError}
      />

      <UI.HSpacer size={20} />

      <UI.Button label="Зарегистрироваться" onPress={handlePressSignUp} />
    </UI.View>
  );
};
