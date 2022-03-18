import React from 'react';
import {useSignInController, useSignInStore} from '../Hooks';

import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';

export const Content = () => {
  const {email, emailError, password, passwordError} = useSignInStore();
  const {handleChangeEmail, handleChangePassword, handlePressSignIn} =
    useSignInController();

  return (
    <UI.View>
      <UI.Text style={s(`P5 medium`)}>Вход</UI.Text>

      <UI.HSpacer size={40} />

      <UI.DefaultInputWithLabel
        Variant={UI.EmailVariant}
        value={email}
        onChangeText={handleChangeEmail}
        placeholder="Введите email ..."
        label="Email"
        error={emailError}
      />
      <UI.PasswordInput
        value={password}
        onChangeText={handleChangePassword}
        placeholder="Введите пароль ..."
        label="Пароль"
        error={passwordError}
      />

      <UI.HSpacer size={20} />

      <UI.Button label="Войти" onPress={handlePressSignIn} />
    </UI.View>
  );
};
