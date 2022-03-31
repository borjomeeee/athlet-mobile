import React from 'react';
import {atom, atomFamily, selector, useSetRecoilState} from 'recoil';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';

const createKey = getKeyFabricForDomain('modals');

export interface Modal<T extends Record<string, any>> {
  id: string;
  props: T;
  Component: React.FC<T & {id?: string}>;
}

export interface ModalStore {
  [key: string]: Modal<any> | undefined;
}

export const modalsStore = atom<Modal<any>[]>({
  key: createKey('modals'),
  default: [],
});

export const modalsMapStore = selector({
  key: createKey('modalsList'),
  get: ({get}) => {
    const modalsList = get(modalsStore);
    const store: ModalStore = {};
    modalsList.forEach(modal => (store[modal.id] = modal));
    return store;
  },
});

export const modalsVisibileStoreFamily = atomFamily({
  key: createKey('modalsFamily__isVisible'),
  default: false,
});

export const useModalsStore = () => {
  const setModals = useSetRecoilState(modalsStore);

  const addModal = React.useCallback(
    <T,>(modal: Modal<T>) => {
      setModals(modals => [...modals, modal]);
    },
    [setModals],
  );

  const removeModal = React.useCallback(
    (id: string) => {
      setModals(modals => modals.filter(modal => modal.id !== id));
    },
    [setModals],
  );

  return {addModal, removeModal};
};
