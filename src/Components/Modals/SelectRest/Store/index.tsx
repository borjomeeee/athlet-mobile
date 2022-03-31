import {atomFamily, useResetRecoilState, useSetRecoilState} from 'recoil';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';

const createKey = getKeyFabricForDomain('selectRest');
export const restStoreFamily = atomFamily({
  key: createKey('rest'),
  default: 15,
});

export const useSelectRestStore = (id: string) => {
  const resetRest = useResetRecoilState(restStoreFamily(id));
  const setRest = useSetRecoilState(restStoreFamily(id));
  return {setRest, resetRest};
};
