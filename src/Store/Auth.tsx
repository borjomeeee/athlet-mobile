import {atom} from 'recoil';

export const isAuthorizedStore = atom({
  key: 'isAuthorized',
  default: false,
});

export const jwtTokenStore = atom<string | undefined>({
  key: 'jwtToken',
  default: undefined,
});
