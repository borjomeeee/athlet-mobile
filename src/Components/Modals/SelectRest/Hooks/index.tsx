import React from 'react';
import {useRecoilValue} from 'recoil';
import {useModal, useModalProps} from 'src/Lib/ModalRouter';
import {restStoreFamily, useSelectRestStore} from '../Store';
import {SelectRestProps} from '../Types';

export const useSelectRestController = (id: string) => {
  const {setRest, resetRest} = useSelectRestStore(id);
  return {handleChangeRest: setRest, reset: resetRest};
};

export const useSelectRestSubmitController = (id: string) => {
  const {hide} = useModal(id);
  const {props} = useModalProps<Omit<SelectRestProps, 'id'>>(id);

  const rest = useRecoilValue(restStoreFamily(id));

  const handlePressSubmit = React.useCallback(() => {
    props.onSelect?.(rest);
    hide();
  }, [props, hide, rest]);

  return {handlePressSubmit};
};
