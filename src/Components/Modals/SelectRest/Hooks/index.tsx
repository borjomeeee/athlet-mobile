import React from 'react';
import {useRecoilValue} from 'recoil';
import {useShowableInstance} from 'src/Lib/ShowablePortal/Hooks/useShowableInstance';
import {restStoreFamily, useSelectRestStore} from '../Store';
import {SelectRestProps} from '../Types';

export const useSelectRestController = (id: string) => {
  const {setRest, resetRest} = useSelectRestStore(id);
  return {handleChangeRest: setRest, reset: resetRest};
};

export const useSelectRestSubmitController = (id: string) => {
  const {close, props} = useShowableInstance<SelectRestProps>();

  const rest = useRecoilValue(restStoreFamily(id));

  const handlePressSubmit = React.useCallback(() => {
    props.onSelect?.(rest);
    close();
  }, [props, close, rest]);

  return {handlePressSubmit};
};
