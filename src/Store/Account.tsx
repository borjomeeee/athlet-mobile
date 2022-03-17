import {atom, useRecoilState} from 'recoil';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';
import {User} from './Models/User';

const createKey = getKeyFabricForDomain('account');

export const accountStore = atom<User | undefined>({
  key: createKey('account'),
  default: undefined,
});

export const useAccountStore = () => {
  const [account, setAccount] = useRecoilState(accountStore);
  return {account, setAccount};
};
