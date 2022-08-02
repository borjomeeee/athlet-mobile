import React from 'react';
import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';
import {useHeaderOptionsOverlayController} from './Controller';

export const HeaderOptionsOverlay = () => {
  const {handlePressGoToEditMode, handlePressDelete} =
    useHeaderOptionsOverlayController();

  return (
    <UI.View style={s(`minW:150`)}>
      <UI.OverlayAction onPress={handlePressGoToEditMode}>
        <UI.Text>Изменить</UI.Text>
      </UI.OverlayAction>

      <UI.OverlayAction onPress={handlePressDelete}>
        <UI.Text style={s(`c:red`)}>Удалить</UI.Text>
      </UI.OverlayAction>
    </UI.View>
  );
};
