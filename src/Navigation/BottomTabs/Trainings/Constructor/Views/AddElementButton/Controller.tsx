import React from 'react';
import {useModal} from 'src/Lib/ModalRouter';
import {Modals} from '../../Const';
import {AddElementBottomSheet} from '../../Modals/AddElement';

export const useAddElementButtonController = () => {
  const {show: showAddElement} = useModal(Modals.AddElement);

  const handlePressAddElement = React.useCallback(() => {
    showAddElement(AddElementBottomSheet, {});
  }, [showAddElement]);

  return {handlePressAddElement};
};
