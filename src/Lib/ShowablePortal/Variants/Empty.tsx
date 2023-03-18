import React from 'react';
import {ShowableComponentProps} from '../Types';

export const blankShowable =
  (Component: React.FC<Partial<ShowableComponentProps>>) =>
  (props: ShowableComponentProps) => {
    React.useImperativeHandle(
      props.componentRef,
      React.useCallback(() => ({close: () => undefined}), []),
    );

    return <Component {...props} />;
  };
