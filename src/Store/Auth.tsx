import {atom} from 'recoil';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';

const createKey = getKeyFabricForDomain('account');

export const isAuthorizedStore = atom({
  key: createKey('isAuthorized'),
  default: false,
});

export const jwtTokenStore = atom<string | undefined>({
  key: createKey('jwtToken'),
  default: undefined,
});
