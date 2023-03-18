import React from 'react';

import * as UI from 'src/Components';
import {ConfirmDialogProps} from 'src/Components';
import {confirmDialogShowablePortal} from 'src/Lib/ShowablePortal/Portal';

export const useConfirmDialog = () => {
  const requestConfirm = React.useCallback(
    (props: Omit<ConfirmDialogProps, 'onAccept' | 'onCancel'>) =>
      new Promise<boolean>(res => {
        confirmDialogShowablePortal.current?.show(
          'confirm-dialog',
          UI.ConfirmDialog,
          {
            ...props,

            onAccept: () => {
              confirmDialogShowablePortal.current?.close('confirm-dialog');
              res(true);
            },
            onCancel: () => {
              confirmDialogShowablePortal.current?.close('confirm-dialog');
              res(false);
            },
          },
        );
      }),
    [],
  );

  return {requestConfirm};
};
