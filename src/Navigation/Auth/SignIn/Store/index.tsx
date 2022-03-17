import {atom} from 'recoil';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';

const createKey = getKeyFabricForDomain('sign in screen');

export const emailAtom = atom({
  key: createKey('email'),
  default: '',
});

export const passwordAtom = atom({
  key: createKey('password'),
  default: '',
});
