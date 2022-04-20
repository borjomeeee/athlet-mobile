import React from 'react';

import * as UI from 'src/Components';
import {ConfirmDialogProps} from 'src/Components';
import {useModal} from 'src/Lib/ModalRouter';

export const useConfirmDialog = (id: string) => {
  const {show} = useModal(id);

  const requestConfirm = React.useCallback(
    (props: Omit<ConfirmDialogProps, 'id' | 'onAccept' | 'onCancel'>) =>
      new Promise(res => {
        show(UI.ConfirmDialog, {
          ...props,

          onAccept: () => {
            res(true);
          },
          onCancel: () => {
            res(false);
          },
        });
      }),
    [show],
  );

  return {requestConfirm};
};
