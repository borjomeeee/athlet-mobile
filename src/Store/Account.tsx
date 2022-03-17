import {atom, useRecoilState} from 'recoil';
import {User} from './Models/User';

export const accountStore = atom<User | undefined>({
  key: 'account',
  default: undefined,
});

export const useAccountStore = () => {
  const [account, setAccount] = useRecoilState(accountStore);
  return {account, setAccount};
};
