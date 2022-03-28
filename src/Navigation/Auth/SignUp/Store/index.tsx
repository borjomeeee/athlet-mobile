import {atom} from 'recoil';
import {useInputRecoilState} from 'src/Hooks/Form';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';

const createKey = getKeyFabricForDomain('sign up screen');

export const emailAtom = atom({
  key: createKey('email'),
  default: '',
});

export const emailErrorAtom = atom({
  key: createKey('emailError'),
  default: '',
});

export const nicknameAtom = atom({
  key: createKey('nickname'),
  default: '',
});

export const nicknameErrorAtom = atom({
  key: createKey('nicknameError'),
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

export const repeatPasswordAtom = atom({
  key: createKey('repeatPassword'),
  default: '',
});

export const repeatPasswordErrorAtom = atom({
  key: createKey('repeatPasswordError'),
  default: '',
});

export const useSignUpStore = () => {
  const {setValue: setEmail, setError: setEmailError} = useInputRecoilState(
    emailAtom,
    emailErrorAtom,
  );

  const {setValue: setNickname, setError: setNicknameError} =
    useInputRecoilState(nicknameAtom, nicknameErrorAtom);

  const {setValue: setPassword, setError: setPasswordError} =
    useInputRecoilState(passwordAtom, passwordErrorAtom);

  const {setValue: setRepeatPassword, setError: setRepeatPasswordError} =
    useInputRecoilState(repeatPasswordAtom, repeatPasswordErrorAtom);

  return {
    setEmail,
    setEmailError,

    setNickname,
    setNicknameError,

    setPassword,
    setPasswordError,

    setRepeatPassword,
    setRepeatPasswordError,
  };
};
