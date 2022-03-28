import {atom, atomFamily} from 'recoil';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';

const createKey = getKeyFabricForDomain('modals');

export interface Modal<T extends Record<string, any>> {
  id: string;
  props: T;
  Component: React.FC<T & {id?: string}>;
}

export const modalsStore = atom<Modal<any>[]>({
  key: createKey('modals'),
  default: [],
});

export const modalsVisibileStoreFamily = atomFamily({
  key: createKey('modalsFamily__isVisible'),
  default: false,
});
