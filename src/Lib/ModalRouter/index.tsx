import React from 'react';

import * as UI from 'src/Components';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {
  Modal,
  modalsMapStore,
  modalsStore,
  modalsVisibileStoreFamily,
} from 'src/Store/Modals';
import s from '@borjomeeee/rn-styles';
import {Id} from 'src/Utils/Id';

export const useModalRouter = () => {
  const setModals = useSetRecoilState(modalsStore);

  const showModal = React.useCallback(
    <T,>(
      Component: React.FC<T>,
      options: T extends Record<string, unknown>
        ? {id?: string; props: T & {id?: string}}
        : {id?: string; props?: undefined},
    ) => {
      const {id = Id.generate(), props = {}} = options;
      setModals(showedModals => [
        ...showedModals.filter(i => i.id !== options.id),
        {
          id,
          props,
          Component,
        },
      ]);
    },
    [setModals],
  );

  const dismissModal = React.useCallback(
    (id: string) => {
      setModals(showedModals => showedModals.filter(i => i.id !== id));
    },
    [setModals],
  );

  const dismissAll = React.useCallback(() => {
    setModals([]);
  }, [setModals]);

  return {showModal, dismissModal, dismissAll};
};

export const useModalInternal = (id: string) => {
  const {dismissModal} = useModalRouter();
  const [isVisible, setIsVisible] = useRecoilState(
    modalsVisibileStoreFamily(id),
  );

  const _onClose = React.useCallback(() => {
    dismissModal(id);
    setIsVisible(false);
  }, [dismissModal, setIsVisible, id]);

  return {isVisible, _onClose};
};

export const useModal = (id: string) => {
  const {showModal} = useModalRouter();
  const setIsVisible = useSetRecoilState(modalsVisibileStoreFamily(id));

  const show = React.useCallback(
    <T,>(Component: React.FC<T>, props: Omit<T, 'id'>) => {
      setIsVisible(true);
      showModal<T>(Component, {id, props} as any);
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
  const modals = useRecoilValue(modalsMapStore);
  const modal = React.useMemo(() => modals[id] as Modal<T>, [modals, id]);

  return {props: modal.props || {}};
};

export const ModalRouter = () => {
  const modals = useRecoilValue(modalsStore);

  return (
    <>
      {modals.map(({id, props, Component}) => (
        <UI.View key={id} style={s(`abs t:0 r:0 l:0 b:0`)}>
          <Component id={id} {...props} />
        </UI.View>
      ))}
    </>
  );
};
