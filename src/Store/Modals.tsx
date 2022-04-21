import React from 'react';
import {
  atom,
  atomFamily,
  useRecoilCallback,
  useRecoilTransaction_UNSTABLE,
} from 'recoil';
import {getKeyFabricForDomain, useGetRecoilState} from 'src/Utils/Recoil';

const createKey = getKeyFabricForDomain('modals');

export interface Modal<T extends Record<string, any>> {
  id: string;
  props: T;
  Component: React.FC<T & {id?: string}>;
}

export const modalsIdsStore = atom<string[]>({
  key: createKey('modalsIdsStore'),
  default: [],
});

export const modalStore = atomFamily<Modal<any> | undefined, string>({
  key: createKey('modalStore'),
  default: _ => undefined,
});

export const modalVisibilityStore = atomFamily<boolean, string>({
  key: createKey('modalVisibilityStore'),
  default: _ => false,
});

export const useModalsStore = () => {
  const getModalsIds = useGetRecoilState(modalsIdsStore);

  const addModal = useRecoilTransaction_UNSTABLE(
    ({set}) =>
      (modal: Modal<any>) => {
        set(modalsIdsStore, prevIds => [...prevIds, modal.id]);

        set(modalStore(modal.id), modal);
        set(modalVisibilityStore(modal.id), true);
      },
    [],
  );

  const removeModal = useRecoilCallback(
    ({set, reset}) =>
      (modalId: string) => {
        set(modalsIdsStore, prevIds => prevIds.filter(id => id !== modalId));
        reset(modalStore(modalId));
      },
    [],
  );

  const removeAll = useRecoilCallback(
    () => () => {
      const modalsIds = getModalsIds();
      modalsIds.forEach(modalId => removeModal(modalId));
    },
    [removeModal],
  );

  return {addModal, removeModal, removeAll};
};
