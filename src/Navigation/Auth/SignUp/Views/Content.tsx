import React from 'react';

import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';
import {useSignUpController} from '../Hooks';
import {useDebounce} from 'src/Hooks/Common';
import {useRecoilValue} from 'recoil';
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

export const Content = () => {
  const email = useRecoilValue(emailAtom);
  const emailError = useRecoilValue(emailErrorAtom);
  const nickname = useRecoilValue(nicknameAtom);
  const nicknameError = useRecoilValue(nicknameErrorAtom);
  const password = useRecoilValue(passwordAtom);
  const passwordError = useRecoilValue(passwordErrorAtom);
  const repeatPassword = useRecoilValue(repeatPasswordAtom);
  const repeatPasswordError = useRecoilValue(repeatPasswordErrorAtom);

  const {
    handlePressSignUp,
    handleChangeEmail,
    handleChangeNickname,
    handleChangePassword,
    handleChangeRepeatPassword,
    checkNickname,
  } = useSignUpController();

  const debouncedNickname = useDebounce(nickname, 500);

  React.useEffect(() => {
    if (debouncedNickname.length === 0) {
      return;
    }

    checkNickname(debouncedNickname);
  }, [debouncedNickname, checkNickname]);

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
        label={nicknameError ? nicknameError : 'Никнейм'}
        error={nicknameError}
        hideErrorText
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
