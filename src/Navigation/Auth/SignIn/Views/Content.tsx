import React from 'react';
import {useSignInController, useSignInStore} from '../Hooks';

import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';

export const Content = () => {
  const {email, password} = useSignInStore();
  const {handleChangeEmail, handleChangePassword, handlePressSignIn} =
    useSignInController();

  return (
    <UI.View>
      <UI.Text style={s(`P5 medium`)}>Вход</UI.Text>

      <UI.HSpacer size={40} />

      <UI.EmailInput
        value={email}
        onChangeText={handleChangeEmail}
        placeholder="Введите email ..."
        label="Email"
      />
      <UI.PasswordInput
        value={password}
        onChangeText={handleChangePassword}
        placeholder="Введите пароль ..."
        label="Пароль"
      />

      <UI.HSpacer size={20} />

      <UI.Button label="Войти" onPress={handlePressSignIn} />
    </UI.View>
  );
};
