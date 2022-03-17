import React from 'react';
import {useAuthService} from 'src/Services/Auth';

export const useSignInStore = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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
    () => signIn({login: email, password}),
    [email, password, signIn],
  );

  return {
    handleChangeEmail: setEmail,
    handleChangePassword: setPassword,

    handlePressSignIn,
  };
};
