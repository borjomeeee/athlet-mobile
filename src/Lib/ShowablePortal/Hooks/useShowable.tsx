import React from 'react';
import {ShowableComponentProps} from '../Types';
import {useShowablePortal} from './useShowablePortal';

export const useShowable = (id: string) => {
  const {show: _show, close: _close, update: _update} = useShowablePortal();

  const show = React.useCallback(
    <Props,>(
      Component: React.FC<Props & ShowableComponentProps>,
      props: Exclude<Props, ShowableComponentProps>,
    ) => {
      _show(id, Component, props);
    },
    [id, _show],
  );

  const update = React.useCallback(
    <T,>(props: T) => {
      _update(id, props);
    },
    [id, _update],
  );

  const close = React.useCallback(() => {
    _close(id);
  }, [id, _close]);

  return {show, update, close};
};
