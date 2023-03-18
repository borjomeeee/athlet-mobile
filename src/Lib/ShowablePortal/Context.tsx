import React from 'react';
import {ShowableComponentPortal} from './Types';

export const ShowableContext = React.createContext<ShowableComponentPortal>(
  {} as any,
);

export const ShowableInstanceContext = React.createContext<{
  id: string;
  props: any;
}>({} as any);
