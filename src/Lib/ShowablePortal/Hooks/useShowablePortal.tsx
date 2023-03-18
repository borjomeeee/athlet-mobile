import React from 'react';
import {ShowableContext} from '../Context';

export const useShowablePortal = () => {
  return React.useContext(ShowableContext);
};
