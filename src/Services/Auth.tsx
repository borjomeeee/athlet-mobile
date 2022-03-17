import {BadApiResponseError} from 'src/Api/Exceptions';
import {useFlow} from 'src/Hooks/Flow';
import {useAuthRepository} from 'src/Repositories/Auth';
import {useAccountStore} from 'src/Store/Account';

export const useAuthService = () => {
  const authRepo = useAuthRepository();

  const {setAccount} = useAccountStore();

  const signIn = useFlow(
    async (login: string, password: string) => {
      const user = await authRepo.signIn(login, password);
      setAccount(user);
    },
    [authRepo],
  );
  const signUp = useFlow(
    async (email: string, nickname: string, password: string) => {
      const user = await authRepo.signUp(email, nickname, password);
      setAccount(user);
    },
    [authRepo, setAccount],
  );

  const checkNicknameFree = useFlow(
    async (nickname: string) => {
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
