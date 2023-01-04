import React from 'react';

import * as UI from 'src/Components';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {
  modalsIdsStore,
  modalStore,
  modalVisibilityStore,
  useModalsStore,
} from 'src/Store/Modals';
import s from '@borjomeeee/rn-styles';

import {Id} from 'src/Utils/Id';
import Animated from 'react-native-reanimated';
import {Keyboard} from 'react-native';

export const useModalRouter = () => {
  const {addModal, removeModal, removeAll} = useModalsStore();

  const showModal = React.useCallback(
    <T extends {id: string}>(
      Component: React.FC<T>,
      options: {id?: string; props: T},
    ) => {
      const {id = Id.generate(), props = {}} = options;
      addModal({
        id,
        props,
        Component,
      });
    },
    [addModal],
  );

  const dismissModal = React.useCallback(
    (id: string) => {
      removeModal(id);
    },
    [removeModal],
  );

  const dismissAll = React.useCallback(() => {
    removeAll();
  }, [removeAll]);

  return {showModal, dismissModal, dismissAll};
};

export const useModalInternal = (id: string) => {
  const {dismissModal} = useModalRouter();
  const isVisible = useRecoilValue(modalVisibilityStore(id));

  const _onClose = React.useCallback(() => {
    dismissModal(id);
  }, [dismissModal, id]);

  return {isVisible, _onClose};
};

export const useModal = (id: string) => {
  const {showModal} = useModalRouter();
  const setIsVisible = useSetRecoilState(modalVisibilityStore(id));

  const show = React.useCallback(
    <T extends {id: string}>(Component: React.FC<T>, props: Omit<T, 'id'>) => {
      Keyboard.dismiss();

      setIsVisible(true);
      showModal(Component, {id, props: {id, ...props} as T});
    },
    [showModal, setIsVisible, id],
  );

  const hide = React.useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  return {
    show,
    hide,
  };
};

export const useModalProps = <T extends Record<string, any> = any>(
  id: string,
): {props: Partial<T>} => {
  const modal = useRecoilValue(modalStore(id));
  return {props: modal?.props || {}};
};

interface ModalProps {
  id: string;
}
export const Modal: React.FC<ModalProps> = ({id}) => {
  const modal = useRecoilValue(modalStore(id));

  if (!modal) {
    return null;
  }

  const {props, Component} = modal;
  return (
    <UI.View style={s(`abs t:0 r:0 l:0 b:0`)}>
      <Component id={id} {...props} />
    </UI.View>
  );
};

export const ModalRouter = () => {
  const modals = useRecoilValue(modalsIdsStore);

  return (
    <UI.View style={s(`abs t:0 l:0 r:0 b:0`)} pointerEvents="box-none">
      {modals.map(id => (
        <Modal key={id} id={id} />
      ))}
    </UI.View>
  );
};
