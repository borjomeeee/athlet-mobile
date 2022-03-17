import {useAccountStore} from 'src/Store/Account';

export const useAccount = () => {
  const {account} = useAccountStore();
  return {account};
};
