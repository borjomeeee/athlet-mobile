import React from 'react';
import {bottomSheetsShowablePortal} from 'src/Lib/ShowablePortal/Portal';
import {Modals} from '../../Const';
import {AddElementBottomSheet} from '../../Modals/AddElement';

export const useAddElementButtonController = () => {
  const handlePressAddElement = React.useCallback(() => {
    bottomSheetsShowablePortal.current?.show(
      Modals.AddElement,
      AddElementBottomSheet,
      {},
    );
  }, []);

  return {handlePressAddElement};
};
