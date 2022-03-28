import React from 'react';
import {atom, useSetRecoilState} from 'recoil';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';

const createKey = getKeyFabricForDomain('sign in screen');

export const emailAtom = atom({
  key: createKey('email'),
  default: '',
});

export const emailErrorAtom = atom({
  key: createKey('emailError'),
  default: '',
});

export const passwordAtom = atom({
  key: createKey('password'),
  default: '',
});

export const passwordErrorAtom = atom({
  key: createKey('passwordError'),
  default: '',
});

export const useSignInStore = () => {
  const setEmail = useSetRecoilState(emailAtom);
  const setPassword = useSetRecoilState(passwordAtom);

  const setEmailError = useSetRecoilState(emailErrorAtom);
  const setPasswordError = useSetRecoilState(passwordErrorAtom);

  const handleChangeEmail = React.useCallback(
    (text: string) => {
      setEmail(text.trim());
      setEmailError('');
    },
    [setEmail, setEmailError],
  );

  const handleChangePassword = React.useCallback(
    (text: string) => {
      setPassword(text.trim());
      setPasswordError('');
    },
    [setPassword, setPasswordError],
  );

  return {
    setEmail: handleChangeEmail,
    setEmailError,
    setPassword: handleChangePassword,
    setPasswordError,
  };
};
