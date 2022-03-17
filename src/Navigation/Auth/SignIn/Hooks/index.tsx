import React from 'react';
import {useRecoilState} from 'recoil';

import {useAuthService} from 'src/Services/Auth';
import {emailAtom, passwordAtom} from '../Store';

export const useSignInStore = () => {
  const [email, setEmail] = useRecoilState(emailAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);

  return {
    email,
    setEmail,

    password,
    setPassword,
  };
};

export const useSignInController = () => {
  const {email, password, setEmail, setPassword} = useSignInStore();
  const {signIn} = useAuthService();

  const handlePressSignIn = React.useCallback(
    () => signIn(email, password),
    [email, password, signIn],
  );

  const resetForm = React.useCallback(() => {
    setEmail('');
    setPassword('');
  }, [setEmail, setPassword]);

  return {
    handleChangeEmail: setEmail,
    handleChangePassword: setPassword,

    handlePressSignIn,
    resetForm,
  };
};
