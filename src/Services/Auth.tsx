import {BadApiResponseError} from 'src/Api/Exceptions';
import {useFlow} from 'src/Hooks/Flow';
import {useAuthRepository} from 'src/Repositories/Auth';
import {useAccountStore} from 'src/Store/Account';

export const useAuthService = () => {
  const authRepo = useAuthRepository();

  const {setAccount} = useAccountStore();

  const signIn = useFlow<{login: string; password: string}>(
    async ({login, password}) => {
      const user = await authRepo.signIn(login, password);
      setAccount(user);
    },
    [authRepo],
  );
  const signUp = useFlow<{email: string; nickname: string; password: string}>(
    async ({email, nickname, password}) => {
      const user = await authRepo.signUp(email, nickname, password);
      setAccount(user);
    },
    [authRepo, setAccount],
  );

  const checkNicknameFree = useFlow<{nickname: string}>(
    async ({nickname}) => {
      try {
        await authRepo.checkNicknameFree(nickname);
        return true;
      } catch (e) {
        if (
          e instanceof BadApiResponseError &&
          e.reason === 'nickname-is-busy'
        ) {
          return false;
        }

        throw e;
      }
    },
    [authRepo],
  );

  return {signIn, signUp, checkNicknameFree};
};
