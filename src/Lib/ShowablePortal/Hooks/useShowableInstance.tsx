import React from 'react';
import {ShowableInstanceContext} from '../Context';
import {useShowable} from './useShowable';

export const useShowableInstance = <Props,>() => {
  const context = React.useContext(ShowableInstanceContext) as {
    id: string;
    props: Props;
  };
  const methods = useShowable(context.id);

  return {...context, ...methods};
};
