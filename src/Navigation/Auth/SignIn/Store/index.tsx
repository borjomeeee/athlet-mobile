import {atom} from 'recoil';
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
