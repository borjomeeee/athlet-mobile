import React from 'react';

import * as UI from 'src/Components';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {modalsStore} from 'src/Store/Modals';
import s from '@borjomeeee/rn-styles';

export const useModalRouter = () => {
  const setModals = useSetRecoilState(modalsStore);

  const showModal = React.useCallback(
    <T,>(
      Component: React.FC<T>,
      options: T extends Record<string, unknown>
        ? {id?: string; props: T & {id?: string}}
        : {id?: string; props?: undefined},
    ) => {
      const {id = Date.now().toString(), props = {}} = options;
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
