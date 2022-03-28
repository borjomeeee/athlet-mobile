import React from 'react';
import {useSignInController} from '../Hooks';

import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';
import {useRecoilValue} from 'recoil';
import {
  emailAtom,
  emailErrorAtom,
  passwordAtom,
  passwordErrorAtom,
} from '../Store';

export const Content = () => {
  const email = useRecoilValue(emailAtom);
  const emailError = useRecoilValue(emailErrorAtom);
  const password = useRecoilValue(passwordAtom);
  const passwordError = useRecoilValue(passwordErrorAtom);

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
